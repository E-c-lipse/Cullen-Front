"use client";

import { useState, useEffect } from "react";
import { api } from "./api";

// Mapear tipos de sangre a IDs (basado en seed)
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

interface HospitalSuggestion {
  hospital_id: number;
  hospital_name: string;
  distance_km: number;
  available_volume_ml: number;
}

const RedemptionFlow = () => {
  const [userId, setUserId] = useState<number>(1);
  const [step, setStep] = useState(1); // 1: Formulario, 2: Resultados, 3: Confirmación
  const [bloodAmount, setBloodAmount] = useState("450");
  const [bloodType, setBloodType] = useState("O+");
  const [selectedHospital, setSelectedHospital] = useState<number | null>(null);
  const [availableHospitals, setAvailableHospitals] = useState<HospitalSuggestion[]>([]);
  const [loading, setLoading] = useState(false);
  const [cost, setCost] = useState<number>(0);
  const [requestId, setRequestId] = useState<number | null>(null);

  useEffect(() => {
    const id = parseInt(localStorage.getItem("user_id") || "1");
    setUserId(id);
  }, []);

  const handleConsult = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!bloodAmount || !bloodType) {
      alert("Por favor, ingresa la cantidad y el tipo de sangre.");
      return;
    }
    setLoading(true);
    try {
      const bloodTypeId = bloodTypeMap[bloodType];
      if (!bloodTypeId) {
        alert("Tipo de sangre inválido.");
        return;
      }
      const nearest = await api.getNearestHospitals(
        userId,
        bloodTypeId,
        parseInt(bloodAmount),
        3
      );
      const suggestions = Array.isArray(nearest?.suggestions) ? nearest.suggestions : [];
      setAvailableHospitals(suggestions);
      setSelectedHospital(null);
      console.log("Hospitales cercanos obtenidos:", suggestions.length);

      // Evaluar costo usando evaluateFlow
      const evalRes = await api.evaluateFlow({
        user_id: userId,
        blood_type_id: bloodTypeId,
        required_volume_ml: parseInt(bloodAmount),
      });
      const estimatedCredits =
        evalRes?.estimated_cost ?? 0;
      setCost(estimatedCredits);

      setStep(2);
    } catch (error: any) {
      console.error("Error consultando:", error);
      alert(`Error al consultar disponibilidad: ${error.message || error}`);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateRequest = async () => {
    if (!selectedHospital) return;
    try {
      const bloodTypeId = bloodTypeMap[bloodType];
      const request = await api.createRequest({
        user_id: userId,
        blood_type_id: bloodTypeId,
        volume_ml: parseInt(bloodAmount),
      });
      setRequestId(request.id);
      setStep(3);
    } catch (error) {
      console.error("Error creando request:", error);
      alert("Error creando solicitud.");
    }
  };

  const handleConfirm = async () => {
    if (!requestId || !selectedHospital) return;
    try {
      await api.confirmRequest(requestId, selectedHospital);
      console.log("Canje confirmado para request ID:", requestId, "en hospital ID:", selectedHospital);
      alert("Canje confirmado exitosamente!");
      // Reset o redirigir
      setStep(1);
    } catch (error: any) {
      console.error("Error confirmando:", error);
      alert(`Error confirmando canje: ${error.message || error}`);
    }
  };

  const handleBack = () => {
    if (step === 3) setStep(2);
    else setStep(1);
  };

  // ----------------------------------------------------
  // VISTA 1: FORMULARIO DE CONSULTA
  // ----------------------------------------------------
  const FormView = () => (
    <div className="flex w-full justify-center">
      <form
        onSubmit={handleConsult}
        className="space-y-6 max-w-140 p-12 bg-(--bg) rounded-xl border border-(--bg-lighter) shadow-s"
      >
        <h2 className="mb-5">Canjear Créditos</h2>

        {/* Campo: Cantidad de sangre */}
        <div>
          <label htmlFor="amount" className="block mb-2">
            <p className="p-med text-(--text-muted)">
              Cantidad de sangre en mililitros
            </p>
          </label>
          <input
            type="number"
            id="amount"
            value={bloodAmount}
            onChange={(e) => setBloodAmount(e.target.value)}
            required
            className="w-full bg-(--bg) border border-(--bg-lighter) rounded-lg p-3 text-(--text) shadow-s"
          />
        </div>

        {/* Campo: Tipo de sangre (Selector) */}
        <div>
          <label htmlFor="bloodType" className="block mb-2">
            <p className="p-med text-(--text-muted)">Tipo de sangre</p>
          </label>
          <select
            id="bloodType"
            value={bloodType}
            onChange={(e) => setBloodType(e.target.value)}
            required
            className="w-full bg-(--bg) border border-(--bg-lighter) rounded-lg p-3 text-(--text) appearance-none pr-10 cursor-pointer"
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

        {/* Botón Consultar */}
        <div className="pt-6">
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-(--primary) hover:bg-(--primary-95) transition duration-300 p-3 rounded-lg cursor-pointer shadow-s"
          >
            {loading ? "Consultando..." : "Consultar"}
          </button>
        </div>
      </form>
    </div>
  );

  // ----------------------------------------------------
  // VISTA 2: RESULTADOS Y SELECCIÓN DE HOSPITAL
  // ----------------------------------------------------
  const ResultsView = () => (
    <div className="space-y-6">
      <div className="grid md:grid-cols-2 gap-8">
        {/* Columna Izquierda: Datos Fijos de la Solicitud */}
        <div className="space-y-6">
          <h2 className="text-3xl font-bold mb-8">Canjear Créditos</h2>

          <div>
            <label className="block text-sm font-medium text-white mb-2">
              Cantidad de sangre en mililitros
            </label>
            <input
              type="text"
              readOnly
              value={bloodAmount}
              className="w-full bg-gray-800 border border-gray-700 rounded-lg p-3 text-white cursor-default"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-white mb-2">
              Tipo de sangre
            </label>
            <input
              type="text"
              readOnly
              value={bloodType}
              className="w-full bg-gray-800 border border-gray-700 rounded-lg p-3 text-white cursor-default"
            />
          </div>
        </div>

        {/* Columna Derecha: Resultados y Selección */}
        <div className="space-y-6">
          <h2 className="text-2xl font-bold mb-4">
            Resultados de disponibilidad en hospitales cercanos
          </h2>
          <p className="text-gray-400 text-sm">
            Seleccione una de las opciones disponibles:
          </p>

          <form>
            {/* Lista de Hospitales */}
            <div className="space-y-3">
              {availableHospitals.map((hospital) => (
                <label
                  key={hospital.hospital_id}
                  className="flex items-center justify-between bg-gray-800 p-4 rounded-lg cursor-pointer hover:bg-gray-700 transition duration-150"
                >
                  <div className="flex items-center space-x-3">
                    {/* Icono de Hospital */}
                    <svg
                      className="w-6 h-6 text-red-500"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M4 7v10h16V7M4 7h16M4 7l-2-2m22 2l-2-2m-2-3l2-2m-20 0l-2 2m2 3h16"
                      ></path>
                    </svg>

                    <div>
                      <p className="font-semibold text-white">
                        {hospital.hospital_name}
                      </p>
                      <p className="text-xs text-gray-400">
                        {hospital.distance_km.toFixed(1)} km - {hospital.available_volume_ml} ml disponible
                      </p>
                    </div>
                  </div>

                  {/* Radio Button */}
                  <input
                    type="radio"
                    name="hospitalSelection"
                    value={hospital.hospital_id}
                    checked={selectedHospital === hospital.hospital_id}
                    onChange={() => setSelectedHospital(hospital.hospital_id)}
                    className="form-radio h-5 w-5 text-red-600 bg-gray-900 border-gray-600 focus:ring-red-500"
                  />
                </label>
              ))}
            </div>

            {/* Costo y Botones de Acción */}
            <div className="mt-8 space-y-3">
              <p className="font-semibold text-lg">
                Costo estimado: <span className="text-red-500">{cost} créditos</span>
              </p>

              <button
                type="button"
                disabled={!selectedHospital}
                onClick={handleCreateRequest}
                className={`w-full text-white font-semibold py-3 rounded-lg transition duration-200 ${
                  selectedHospital
                    ? "bg-red-700 hover:bg-red-800"
                    : "bg-gray-600 cursor-not-allowed"
                }`}
              >
                Crear solicitud
              </button>

              <button
                type="button"
                onClick={handleBack}
                className="w-full bg-transparent border border-gray-500 text-gray-400 font-semibold py-3 rounded-lg hover:bg-gray-700 transition duration-200"
              >
                Volver a consultar
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );

  // ----------------------------------------------------
  // VISTA 3: CONFIRMACIÓN
  // ----------------------------------------------------
  const ConfirmationView = () => (
    <div className="space-y-6 max-w-2xl mx-auto">
      <h2 className="text-3xl font-bold mb-8 text-center">Confirmar Canje</h2>
      <div className="bg-gray-800 p-6 rounded-lg">
        <p className="mb-4">
          ¿Confirmar el canje de {bloodAmount} ml de {bloodType} en{" "}
          {availableHospitals.find((h) => h.hospital_id === selectedHospital)?.hospital_name}?
        </p>
        <p className="text-red-500 font-semibold">Costo: {cost} créditos</p>
      </div>
      <div className="flex space-x-4">
        <button
          onClick={handleConfirm}
          className="flex-1 bg-red-700 hover:bg-red-800 text-white font-semibold py-3 rounded-lg transition duration-200"
        >
          Confirmar
        </button>
        <button
          onClick={handleBack}
          className="flex-1 bg-transparent border border-gray-500 text-gray-400 font-semibold py-3 rounded-lg hover:bg-gray-700 transition duration-200"
        >
          Volver
        </button>
      </div>
    </div>
  );

  return (
    <div className="flex items-start justify-center bg-gray-900 text-white pt-14 px-6 sm:px-10">
      <div className="max-w-5xl pt-10">
        {step === 1 && <FormView />}
        {step === 2 && <ResultsView />}
        {step === 3 && <ConfirmationView />}
      </div>
    </div>
  );
};

export default RedemptionFlow;
