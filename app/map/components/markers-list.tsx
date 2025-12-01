import { Marker } from "@react-google-maps/api";
import { HospitalNode } from "../model/mst-response";

interface Props {
  hospitals: HospitalNode[];
}

export default function MarkersList({ hospitals }: Props) {
  return (
    <>
      {hospitals.map((h) => (
        <Marker
          key={h.id}
          position={{ lat: h.latitude, lng: h.longitude }}
        />
      ))}
    </>
  );
}
