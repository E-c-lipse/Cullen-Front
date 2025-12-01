export interface User {
    id: number;
    name: string;
    sex: 'M' | 'F';
    age: number;
    blood_type_id: number;
    department: string;
    macro_region: string;
    credits: number;
    hospital_id: number;
}