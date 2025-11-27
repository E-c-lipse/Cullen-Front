const API_BASE = "http://localhost:8000";

export const api = {
  // Users
  getUserSummary: async (userId: number) => {
    try {
      const res = await fetch(`${API_BASE}/users/${userId}/summary`);
      if (!res.ok) throw new Error(`HTTP ${res.status}: ${res.statusText}`);
      return await res.json();
    } catch (error) {
      console.error("Error en getUserSummary:", error);
      throw error;
    }
  },
  getUserByName: async (name: string) => {
    try {
      const res = await fetch(`${API_BASE}/users/by_name?name=${encodeURIComponent(name)}`);
      if (!res.ok) throw new Error(`HTTP ${res.status}: ${res.statusText}`);
      return await res.json();
    } catch (error) {
      console.error("Error en getUserByName:", error);
      throw error;
    }
  },
  getUserHistory: async (userId: number, limit?: number) => {
    try {
      const res = await fetch(`${API_BASE}/users/${userId}/history${limit ? `?limit=${limit}` : ""}`);
      if (!res.ok) throw new Error(`HTTP ${res.status}: ${res.statusText}`);
      return await res.json();
    } catch (error) {
      console.error("Error en getUserHistory:", error);
      throw error;
    }
  },
  updateUserHospital: async (userId: number, hospitalId: number) => {
    try {
      const res = await fetch(`${API_BASE}/users/${userId}/hospital`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ hospital_id: hospitalId })
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}: ${res.statusText}`);
      return await res.json();
    } catch (error) {
      console.error("Error en updateUserHospital:", error);
      throw error;
    }
  },

  // Hospitals
  getHospitals: async () => {
    try {
      const res = await fetch(`${API_BASE}/hospitals`);
      if (!res.ok) throw new Error(`HTTP ${res.status}: ${res.statusText}`);
      return await res.json();
    } catch (error) {
      console.error("Error en getHospitals:", error);
      throw error;
    }
  },
  getNearestHospitals: async (userId: number, bloodTypeId: number, requiredVolumeMl: number, limit?: number) => {
    try {
      const res = await fetch(`${API_BASE}/hospitals/nearest?user_id=${userId}&blood_type_id=${bloodTypeId}&required_volume_ml=${requiredVolumeMl}&limit=${limit || 3}`);
      if (!res.ok) throw new Error(`HTTP ${res.status}: ${res.statusText}`);
      return await res.json();
    } catch (error) {
      console.error("Error en getNearestHospitals:", error);
      throw error;
    }
  },

  // Requests
  createRequest: async (data: { user_id: number; blood_type_id: number; volume_ml: number }) => {
    try {
      const res = await fetch(`${API_BASE}/requests`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}: ${res.statusText}`);
      return await res.json();
    } catch (error) {
      console.error("Error en createRequest:", error);
      throw error;
    }
  },
  evaluateFlow: async (data: { user_id: number; blood_type_id: number; required_volume_ml: number }) => {
    try {
      const res = await fetch(`${API_BASE}/requests/evaluate`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) {
        const text = await res.text();
        try {
          const err = JSON.parse(text);
          throw new Error(err.detail || err.message || 'Error desconocido');
        } catch {
          throw new Error(text);
        }
      }
      return await res.json();
    } catch (error) {
      console.error("Error in evaluateFlow:", error);
      throw error;
    }
  },
  confirmRequest: async (requestId: number, hospitalId: number) => {
    try {
      const res = await fetch(`${API_BASE}/requests/${requestId}/confirm`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ hospital_id: hospitalId })
      });
      if (!res.ok) {
        const text = await res.text();
        try {
          const err = JSON.parse(text);
          throw new Error(err.detail || err.message || 'Error desconocido');
        } catch {
          throw new Error(text);
        }
      }
      return await res.json();
    } catch (error) {
      console.error("Error en confirmRequest:", error);
      throw error;
    }
  },

  // Donations
  createDonation: async (data: { user_id: number; hospital_id: number; blood_type_id: number; volume_ml: number; donation_date: string; donor_type: string }) => {
    try {
      const res = await fetch(`${API_BASE}/donations`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}: ${res.statusText}`);
      return await res.json();
    } catch (error) {
      console.error("Error en createDonation:", error);
      throw error;
    }
  },

  // Inventory
  getInventorySummary: async (hospitalId?: number, bloodTypeId?: number) => {
    try {
      const params = new URLSearchParams();
      if (hospitalId) params.append("hospital_id", hospitalId.toString());
      if (bloodTypeId) params.append("blood_type_id", bloodTypeId.toString());
      const res = await fetch(`${API_BASE}/inventory/summary?${params}`);
      if (!res.ok) throw new Error(`HTTP ${res.status}: ${res.statusText}`);
      return await res.json();
    } catch (error) {
      console.error("Error en getInventorySummary:", error);
      throw error;
    }
  },
  adjustInventory: async (hospitalId: number, bloodTypeId: number, deltaVolumeMl: number) => {
    try {
      const res = await fetch(`${API_BASE}/inventory/adjust`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ hospital_id: hospitalId, blood_type_id: bloodTypeId, delta_volume_ml: deltaVolumeMl })
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}: ${res.statusText}`);
      return await res.json();
    } catch (error) {
      console.error("Error en adjustInventory:", error);
      throw error;
    }
  },
};
