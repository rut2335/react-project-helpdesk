import api from "./api.service";

export const getPriorities = () => {
    return api.get(`priorities`);
}

export const getStatuses = () => {
    return api.get(`statuses`);
}

export const postPriority = (priority: string) => {
    return api.post(`priorities`, { name: priority });
}   

export const postStatus = (status: string) => {
    return api.post(`statuses`, { name: status });
}
