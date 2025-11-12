"use client";

import { useState } from "react";

const availableHospitals = [
  {
    id: 1,
    name: "Hospital Nacional Arzobispo Loayza",
    distance: 1.2,
    cost: 180,
  },
  { id: 2, name: "Hospital Nacional Dos de Mayo", distance: 2.0, cost: 180 },
  { id: 3, name: "Hospital Cayetano Heredia", distance: 3.5, cost: 180 },
];

const RedemptionFlow = () => {
  // Estados para el flujo de la aplicación
  const [step, setStep] = useState(1); // 1: Formulario, 2: Resultados
  const [bloodAmount, setBloodAmount] = useState("450"); // Valor por defecto para simular
  const [bloodType, setBloodType] = useState("O+"); // Valor por defecto para simular
  const [selectedHospital, setSelectedHospital] = useState<number | null>(null);

  // Funciones de manejo
  const handleConsult = (e: any) => {
    e.preventDefault();
    // Validación mínima: Aquí se enviaría la solicitud al backend
    if (bloodAmount && bloodType) {
      setStep(2);
      setSelectedHospital(null); // Reiniciar selección al mostrar resultados
    } else {
      alert("Por favor, ingresa la cantidad y el tipo de sangre.");
    }
  };

  const handleBack = () => {
    setStep(1);
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
            <option value="O+">O+</option>
            <option value="A+">A+</option>
            {/* ... más tipos */}
          </select>
        </div>

        {/* Botón Consultar */}
        <div className="pt-6">
          <button
            type="submit"
            className="w-full bg-(--primary) hover:bg-(--primary-95) text-(--text) font-medium py-3 rounded-lg transition duration-300 cursor-pointer shadow-s"
          >
            Consultar
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
            Seleccione una de las tres opciones:
          </p>

          <form>
            {/* Lista de Hospitales */}
            <div className="space-y-3">
              {availableHospitals.map((hospital) => (
                <label
                  key={hospital.id}
                  className="flex items-center justify-between bg-gray-800 p-4 rounded-lg cursor-pointer hover:bg-gray-700 transition duration-150"
                >
                  <div className="flex items-center space-x-3">
                    {/* Icono de Hospital (usando un SVG de placeholder) */}
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
                        {hospital.name}
                      </p>
                      <p className="text-xs text-gray-400">
                        {hospital.distance} km
                      </p>
                    </div>
                  </div>

                  {/* Radio Button */}
                  <input
                    type="radio"
                    name="hospitalSelection"
                    value={hospital.id}
                    checked={selectedHospital === hospital.id}
                    onChange={() => setSelectedHospital(hospital.id)}
                    className="form-radio h-5 w-5 text-red-600 bg-gray-900 border-gray-600 focus:ring-red-500"
                  />
                </label>
              ))}
            </div>

            {/* Costo y Botones de Acción */}
            <div className="mt-8 space-y-3">
              <p className="font-semibold text-lg">
                Costo: <span className="text-red-500">180 créditos</span>
              </p>

              <button
                type="button"
                disabled={!selectedHospital}
                className={`w-full text-white font-semibold py-3 rounded-lg transition duration-200 ${
                  selectedHospital
                    ? "bg-red-700 hover:bg-red-800"
                    : "bg-gray-600 cursor-not-allowed"
                }`}
                style={{
                  backgroundColor: selectedHospital ? "#a81930" : undefined,
                }}
              >
                Continuar
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

  return (
    // Contenedor principal para centrar la vista
    <div className="flex items-start justify-center bg-gray-900 text-white pt-14 px-6 sm:px-10">
      <div className="max-w-5xl pt-10">
        {step === 1 && <FormView />}
        {step === 2 && <ResultsView />}
      </div>
    </div>
  );
};

export default RedemptionFlow;
