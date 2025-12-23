import type { NewTicket } from "../model/tickets";
import api from "./api.service";

export const Ticketservice = () => {
    return api.get('tickets');
}

export const GetTicketById = (ticketId: number) => {
    return api.get(`tickets/${ticketId}`);
}

export const AddTicket = (ticket: NewTicket) => {
    return api.post('tickets', ticket);
}

export const deleteTicketById = (ticketId: number) => {
    return api.delete(`tickets/${ticketId}`);
}

export const updateTicketById = (ticketId: number, updatedTicket: Partial<NewTicket>) => {
    return api.patch(`tickets/${ticketId}`, updatedTicket);
}
