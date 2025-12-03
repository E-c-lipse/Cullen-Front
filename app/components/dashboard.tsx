"use client";

import { useEffect, useState } from "react";
import Card from "./ui/card/card";
import { api } from "./api";
import { useAuth } from "../auth/contexts/auth-context";

interface HistoryEntry {
  timestamp: string;
  entry_type: "donation" | "redemption";
  hospital_name: string;
  volume_ml: number;
  credits_change: number;
}

interface UserSummary {
  user_id: number;
  name: string;
  credits: number;
  hospital_id: number;
  hospital_name: string;
  total_donations: number;
  total_redemptions: number;
}

export default function Dashboard() {
  const { user } = useAuth(); // Get user from AuthContext
  const [summary, setSummary] = useState<UserSummary | null>(null);
  const [history, setHistory] = useState<HistoryEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedHospital, setSelectedHospital] = useState<number | null>(null);
  const [hospitals, setHospitals] = useState<any[]>([]);

  useEffect(() => {
    if (!user) return; // Wait for user to be loaded
    const loadData = async () => {
      try {
        const [summaryRes, historyRes, hospitalsRes] = await Promise.all([
          api.getUserSummary(user.id),
          api.getUserHistory(user.id, 10),
          api.getHospitals(),
        ]);
        setSummary(summaryRes);
        setHistory(historyRes.entries);
        setHospitals(hospitalsRes);
        console.log("Usuario cargado:", summaryRes.name);
      } catch (error) {
        console.error("Error loading dashboard data:", error);
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, [user]);

  const handleHospitalChange = async () => {
    if (!selectedHospital || !user) return;
    try {
      await api.updateUserHospital(user.id, selectedHospital);
      console.log("Hospital cambiado exitosamente a ID:", selectedHospital);
      // Recargar resumen
      const summaryRes = await api.getUserSummary(user.id);
      setSummary(summaryRes);
    } catch (error) {
      console.error("Error updating hospital:", error);
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="pt-16 px-4">
      <div className="max-w-7xl mx-auto mt-5">
        <header className="grid md:grid-cols-4 gap-5 mb-10 items-center">
          <div className="col-span-3">
            <h2 className="mb-4">Bienvenido, {summary?.name || "Usuario"}</h2>
            <p className="text-(--text-muted)">
              Aquí tienes un resumen de tu actividad reciente.
            </p>
          </div>
          <div className="bg-(--bg) shadow-s p-8 rounded-xl flex flex-col justify-between border border-(--bg-lighter)">
            <p className="text-(--text-muted)">Créditos totales</p>
            <div className="flex justify-between items-center mt-2">
              <span className="text-5xl font-semibold">{summary?.credits || 0}</span>
              <i className="fa-solid fa-coins fa-2xl"></i>
            </div>
          </div>
        </header>

        <section className="mb-10">
          <h4 className="text-2xl font-semibold mb-5">
            Historial de Donaciones y Canjes
          </h4>
          <div className="border border-(--bg-lighter) rounded-xl overflow-auto shadow-s">
            <table className="min-w-full divide-y divide-(--bg-lighter)">
              <thead className="bg-(--bg-light)">
                <tr>
                  <th className="px-6 py-3 text-left p-med">Fecha</th>
                  <th className="px-6 py-3 text-left p-med">Tipo</th>
                  <th className="px-6 py-3 text-left p-med">Hospital</th>
                  <th className="px-6 py-3 text-center p-med">Créditos</th>
                </tr>
              </thead>
              <tbody className="bg-(--bg) divide-y divide-(--bg-light)">
                {history.map((item: HistoryEntry, index: number) => (
                  <tr
                    key={index}
                    className="hover:bg-(--bg-light) transition-all duration-300"
                  >
                    <td className="px-6 py-4 text-(--text)">
                      {new Date(item.timestamp).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 text-(--text)">
                      {item.entry_type === "donation" ? "Donación" : "Canje"}
                    </td>
                    <td className="px-6 py-4 text-(--text)">
                      {item.hospital_name}
                    </td>
                    <td
                      className={`px-6 py-4 text-center ${item.credits_change > 0 ? "text-green-500" : "text-red-500"
                        }`}
                    >
                      {item.credits_change > 0 ? "+" : ""}{item.credits_change}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section className="mb-10">
          <h4 className="text-2xl font-semibold mb-5">Hospital actual</h4>
          <div className="flex flex-col sm:flex-row gap-10 items-start sm:items-center">
            <Card
              body={summary?.hospital_name || "Hospital desconocido"}
              footer="Dirección no disponible"
            />

            <div>
              <p className="p-bold mb-4">Cambio de hospital</p>
              <div className="flex gap-4 w-full sm:w-auto">
                <select
                  value={selectedHospital || ""}
                  onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setSelectedHospital(Number(e.target.value))}
                  className="bg-(--bg) text-(--text) border border-(--bg-lighter) py-3 px-4 rounded-lg appearance-none cursor-pointer"
                >
                  <option disabled value="">Seleccionar hospital...</option>
                  {hospitals.map((h: any) => (
                    <option key={h.id} value={h.id}>
                      {h.name}
                    </option>
                  ))}
                </select>

                <button
                  onClick={handleHospitalChange}
                  className="bg-red-700 hover:bg-red-600 transition duration-300 p-3 rounded-full flex items-center justify-center w-12 h-12 cursor-pointer"
                >
                  <i className="fa-solid fa-rotate-right"></i>
                </button>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
