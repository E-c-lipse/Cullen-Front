"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { api } from "../components/api";

export default function Login() {
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!name.trim()) {
      alert("Por favor, ingresa tu nombre.");
      return;
    }
    setLoading(true);
    try {
      const user = await api.getUserByName(name.trim());
      localStorage.setItem("user_id", user.id.toString());
      localStorage.setItem("user_name", user.name);
      router.push("/");
    } catch (error) {
      console.error("Error en login:", error);
      alert("Usuario no encontrado.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white p-4">
      <div className="w-full max-w-md p-8 sm:p-10">
        <h2 className="text-3xl font-bold text-center mb-8">Iniciar Sesión</h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-white mb-2">
              Nombre
            </label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Ingresa tu nombre"
              required
              className="w-full bg-gray-800 border border-gray-700 rounded-lg p-3 text-white placeholder-gray-500 focus:ring-red-500 focus:border-red-500 transition duration-150"
            />
          </div>

          <div className="pt-4">
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-red-700 hover:bg-red-800 text-white font-semibold py-3 rounded-lg shadow-lg transition duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 focus:ring-offset-gray-900"
              style={{
                backgroundColor: "#a81930",
                boxShadow: "0 4px 10px rgba(168, 25, 48, 0.4)",
              }}
            >
              {loading ? "Iniciando..." : "Iniciar Sesión"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
