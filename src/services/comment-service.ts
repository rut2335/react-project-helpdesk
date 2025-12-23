import api from "./api.service";

export const getCommentsByTicketId = (ticketId: string) => {
    return api.get(`tickets/${ticketId}/comments`);
}

export const addComment = (ticketId: string, content: string) => {
    return api.post(`tickets/${ticketId}/comments`, { content });
}
