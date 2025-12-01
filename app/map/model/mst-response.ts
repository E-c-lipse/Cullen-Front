export interface HospitalNode {
    id: number;
    name: string;
    department: string;
    latitude: number;
    longitude: number;
}

export interface HospitalEdge {
    from_hospital_id: number;
    to_hospital_id: number;
    distance_km: number;
}

export interface MSTResponse {
    macro_region: string;
    nodes: HospitalNode[];
    edges: HospitalEdge[];
    total_distance_km: number;
}
