"use client";

import { GoogleMap, LoadScript } from "@react-google-maps/api";
import MarkersList from "./markers-list";
import LinesList from "./lines-list";
import { HospitalNode, HospitalEdge } from "../model/mst-response";

interface Props {
    hospitals: HospitalNode[];
    edges: HospitalEdge[];
}

export default function MapWrapper({ hospitals, edges }: Props) {
    const center = {
        lat: hospitals[0]?.latitude ?? -12.0464,
        lng: hospitals[0]?.longitude ?? -77.0428,
    };

    return (
        <div className="w-full h-[600px] rounded-2xl overflow-hidden border">
            <LoadScript googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_KEY!}>
                <GoogleMap
                    mapContainerClassName="w-full h-full"
                    zoom={6}
                    center={center}
                    options={{
                        streetViewControl: false,
                        mapTypeControl: false,
                    }}
                >
                    <MarkersList hospitals={hospitals} />
                    <LinesList hospitals={hospitals} edges={edges} />
                </GoogleMap>
            </LoadScript>
        </div>
    );
}
