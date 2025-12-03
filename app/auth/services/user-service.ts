import { http } from "@/app/shared/services/http";
import { User } from "@/app/model/user";

export const userService = {
  login: (name: string): Promise<User> =>
    http.post(`/users/login?name=${encodeURIComponent(name)}`),

  getSummary: (userId: number) =>
    http.get(`/users/${userId}/summary`),

  getHistory: (userId: number, limit?: number) =>
    http.get(`/users/${userId}/history${limit ? `?limit=${limit}` : ""}`),

  updateHospital: (userId: number, hospitalId: number) =>
    http.patch(`/users/${userId}/hospital`, { hospital_id: hospitalId }),
};
