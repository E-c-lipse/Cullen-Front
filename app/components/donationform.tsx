"use client";

import { useState } from "react";

export default function DonationForm() {
  const [bloodAmount, setBloodAmount] = useState("");
  const [hospital, setHospital] = useState("");
  const [confirmationCode, setConfirmationCode] = useState("");

  const handleSubmit = (e: any) => {
    e.preventDefault();
    // Aquí iría la lógica para enviar la donación
    console.log({ bloodAmount, hospital, confirmationCode });
    alert("Función de consulta activada. Verifica la consola.");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white p-4">
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
              className="w-full bg-gray-800 border border-gray-700 rounded-lg p-3 text-white placeholder-gray-500 focus:ring-red-500 focus:border-red-500 transition duration-150"
            />
          </div>

          {/* Campo: Hospital (Selector) */}
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
                onChange={(e) => setHospital(e.target.value)}
                required
                className="w-full bg-gray-800 border border-gray-700 rounded-lg p-3 text-white appearance-none pr-10 focus:ring-red-500 focus:border-red-500 cursor-pointer transition duration-150"
              >
                <option value="" disabled>
                  Selecciona un hospital
                </option>
                <option value="dos_de_mayo">
                  Hospital Nacional Dos de Mayo
                </option>
                <option value="cusco">Hospital Regional Cusco</option>
                <option value="otro">Otro Hospital</option>
              </select>
              {/* Icono de flecha para el selector */}
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
              className="w-full bg-gray-800 border border-gray-700 rounded-lg p-3 text-white placeholder-gray-500 focus:ring-red-500 focus:border-red-500 transition duration-150"
            />
          </div>

          {/* Botón de Consultar/Enviar */}
          <div className="pt-4">
            <button
              type="submit"
              className="w-full bg-red-700 hover:bg-red-800 text-white font-semibold py-3 rounded-lg shadow-lg transition duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 focus:ring-offset-gray-900"
              // Simulando el color rojo profundo del diseño
              style={{
                backgroundColor: "#a81930",
                boxShadow: "0 4px 10px rgba(168, 25, 48, 0.4)",
              }}
            >
              Consultar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
