import api from "./api.service";
import type { Inputs, InputOfRegister } from "../model/input";

export const loginService = (data: Inputs) => {
    return api.post('auth/login', data);
}

export const registerService = (data: InputOfRegister) => {
    return api.post('auth/register', data);
}