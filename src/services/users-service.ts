import type { User } from "../model/user";
import api from "./api.service";

export const getUser = () => {
    return api.get(`users`);
}

export const getUserById = (userId: string) => {
    return api.get(`users/${userId}`);
}

export const addUser = (user: User) => {
    return api.post(`users`, user);
}