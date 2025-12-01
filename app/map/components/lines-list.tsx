import { Polyline } from "@react-google-maps/api";
import { HospitalNode, HospitalEdge } from "../model/mst-response";

interface Props {
    hospitals: HospitalNode[];
    edges: HospitalEdge[];
}

export default function LinesList({ hospitals, edges }: Props) {
    // Convertimos hospital_internal_code -> coordenadas
    const mapHospitals = Object.fromEntries(
        hospitals.map((h: HospitalNode) => [h.id, h])
    );

    return (
        <>
            {edges.map((edge: HospitalEdge, i: number) => {
                const from = mapHospitals[edge.from_hospital_id];
                const to = mapHospitals[edge.to_hospital_id];

                if (!from || !to) return null;

                return (
                    <Polyline
                        key={i}
                        path={[
                            { lat: from.latitude, lng: from.longitude },
                            { lat: to.latitude, lng: to.longitude },
                        ]}
                        options={{
                            strokeColor: "#2563eb",
                            strokeWeight: 3,
                            strokeOpacity: 0.9,
                        }}
                    />
                );
            })}
        </>
    );
}
