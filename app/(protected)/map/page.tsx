import MapWrapper from "./components/map-wrapper";
import { MSTResponse } from "./model/mst-response";

export default async function Page() {
  const res = await fetch(
    "http://localhost:8000/requests/mst?macro_region=Costa"
  );

  if (!res.ok) {
    throw new Error("Error al cargar el MST");
  }

  const data: MSTResponse = await res.json();

  return (
    <div className="pt-20 p-8 space-y-4">
      <h1 className="text-xl font-bold">Red de Logística de la Costa</h1>
      <p className="text-(--text-muted) mb-8">
        Representación de las conexiones más cortas entre centros de salud.
      </p>

      <MapWrapper hospitals={data.nodes} edges={data.edges} />
    </div>
  );
}
