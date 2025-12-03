"use client";

import { useState, useEffect } from "react";
import { api } from "./api";

// Mapear tipos de sangre a IDs
const bloodTypeMap: { [key: string]: number } = {
  "O+": 1,
  "O-": 2,
  "A+": 3,
  "A-": 4,
  "B+": 5,
  "B-": 6,
  "AB+": 7,
  "AB-": 8,
};

export default function DonationForm() {
  const [userId, setUserId] = useState<number>(1);
  const [bloodAmount, setBloodAmount] = useState("");
  const [hospital, setHospital] = useState("");
  const [bloodType, setBloodType] = useState("");
  const [confirmationCode, setConfirmationCode] = useState("");
  const [hospitals, setHospitals] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const id = parseInt(localStorage.getItem("user_id") || "1");
    setUserId(id);
  }, []);

  useEffect(() => {
    const loadHospitals = async () => {
      try {
        const hosp = await api.getHospitals();
        setHospitals(hosp);
        console.log("Hospitales cargados:", hosp.length);
      } catch (error) {
        console.error("Error loading hospitals:", error);
      }
    };
    loadHospitals();
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!bloodAmount || !hospital || !bloodType || !confirmationCode) {
      alert("Por favor, completa todos los campos.");
      return;
    }
    setLoading(true);
    try {
      const bloodTypeId = bloodTypeMap[bloodType];
      if (!bloodTypeId) {
        alert("Tipo de sangre inválido.");
        return;
      }
      const donationData = {
        user_id: userId,
        hospital_id: parseInt(hospital),
        blood_type_id: bloodTypeId,
        volume_ml: parseInt(bloodAmount),
        donation_date: new Date().toISOString().split('T')[0],
        donor_type: "voluntario", // Hardcodeado
      };
      const result = await api.createDonation(donationData);
      console.log("Donación registrada para usuario ID:", userId, "en hospital ID:", hospital);
      alert("Donación registrada exitosamente!");
      // Reset form
      setBloodAmount("");
      setHospital("");
      setBloodType("");
      setConfirmationCode("");
    } catch (error) {
      console.error("Error creando donación:", error);
      alert("Error registrando donación.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center bg-(--bg-dark) text-(--text) p-4">
      <div className="w-full max-w-md p-8 sm:p-10">
        <h2 className="text-3xl font-bold text-center mb-8">
          Registrar donación
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Campo: Cantidad de sangre */}
          <div>
            <label
              htmlFor="bloodAmount"
              className="block text-sm font-medium text-white mb-2"
            >
              Cantidad de sangre en mililitros
            </label>
            <input
              type="number"
              id="bloodAmount"
              value={bloodAmount}
              onChange={(e) => setBloodAmount(e.target.value)}
              placeholder=""
              required
              className="w-full bg-gray-800 border border-gray-700 rounded-lg p-3 text-white placeholder-gray-500 transition duration-300"
            />
          </div>

          {/* Campo: Tipo de sangre */}
          <div>
            <label
              htmlFor="bloodType"
              className="block text-sm font-medium text-white mb-2"
            >
              Tipo de sangre
            </label>
            <select
              id="bloodType"
              value={bloodType}
              onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setBloodType(e.target.value)}
              required
              className="w-full bg-gray-800 border border-gray-700 rounded-lg p-3 text-white appearance-none pr-10 cursor-pointer transition duration-300"
            >
              <option value="" disabled>
                Selecciona tipo
              </option>
              {Object.keys(bloodTypeMap).map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
          </div>

          {/* Campo: Hospital */}
          <div>
            <label
              htmlFor="hospital"
              className="block text-sm font-medium text-white mb-2"
            >
              Hospital
            </label>
            <div className="relative">
              <select
                id="hospital"
                value={hospital}
                onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setHospital(e.target.value)}
                required
                className="w-full bg-gray-800 border border-gray-700 rounded-lg p-3 text-white appearance-none pr-10 cursor-pointer transition duration-300"
              >
                <option value="" disabled>
                  Selecciona un hospital
                </option>
                {hospitals.map((h: any) => (
                  <option key={h.id} value={h.id}>
                    {h.name}
                  </option>
                ))}
              </select>
              {/* Icono de flecha */}
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-gray-400">
                <svg
                  className="w-5 h-5"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M5.23 7.21a.75.75 0 011.06.02L10 10.94l3.71-3.71a.75.75 0 111.06 1.06l-4.25 4.25a.75.75 0 01-1.06 0L5.21 8.27a.75.75 0 01.02-1.06z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
            </div>
          </div>

          {/* Campo: Código de confirmación */}
          <div>
            <label
              htmlFor="confirmationCode"
              className="block text-sm font-medium text-white mb-2"
            >
              Código de confirmación
            </label>
            <input
              type="text"
              id="confirmationCode"
              value={confirmationCode}
              onChange={(e) => setConfirmationCode(e.target.value)}
              placeholder=""
              required
              className="w-full bg-gray-800 border border-gray-700 rounded-lg p-3 text-white placeholder-gray-500 transition duration-300"
            />
          </div>

          {/* Botón */}
          <div className="pt-4">
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-red-700 hover:bg-red-600 text-white font-semibold py-3 rounded-lg shadow-lg transition duration-300 cursor-pointer"
            >
              {loading ? "Registrando..." : "Registrar Donación"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
