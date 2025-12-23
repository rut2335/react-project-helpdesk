import { createContext, useContext, useState, useEffect, useCallback, useMemo, type ReactNode } from 'react';
import { AddTicket, deleteTicketById, Ticketservice, updateTicketById } from '../services/ticket-service';
import type { TicketResponse } from '../model/tickets';
import { useAuth } from './authContext';
import Loading from '../components/loading';

interface TicketsContextType {
    tickets: TicketResponse[];
    loading: boolean;
    refreshTickets: () => Promise<void>;
    addNewTicket: (ticket: TicketResponse) => Promise<void>;
    updateTicketContext: (ticketId: number, updatedFields: Partial<TicketResponse>) => Promise<void>;
    removeTicket: (ticketId: number) => Promise<void>;
}

const TicketsContext = createContext<TicketsContextType | undefined>(undefined);

export const TicketsProvider = ({ children }: { children: ReactNode }) => {
    const [tickets, setTickets] = useState<TicketResponse[]>([]);
    const [loading, setLoading] = useState(true);
    const { user } = useAuth();

    const fetchTickets = useCallback(async () => {
        setLoading(true);
        try {
            const response = await Ticketservice();
            setTickets(response.data);
        } catch (error) {
            console.error("Error fetching tickets:", error);
        } finally {
            setLoading(false);
        }
    }, []);

    const addTicket = useCallback(async (ticket: TicketResponse) => {
        try {
            const response = await AddTicket(ticket);
            setTickets(prevTickets => [...prevTickets, response.data]);
        } catch (error) {
            console.error("Error adding ticket:", error);
            throw error;
        }
    }, []);

    const removeItem = useCallback(async (ticketId: number) => {
        try {
            await deleteTicketById(ticketId);
            setTickets(prevTickets => prevTickets.filter(ticket => ticket.id !== ticketId));
        } catch (error) {
            console.error("Error deleting ticket:", error);
            throw error;
        }
    }, []);

    const updateItem = useCallback(async (ticketId: number, updatedFields: Partial<TicketResponse>) => {
        try {
            await updateTicketById(ticketId, updatedFields);
            setTickets(prevTickets => prevTickets.map(ticket =>
                ticket.id === ticketId ? { ...ticket, ...updatedFields } : ticket
            ));
        } catch (error) {
            console.error("Error updating ticket:", error);
            throw error;
        }
    }, []);

    useEffect(() => {
        if (user) {
            fetchTickets();
        } else {
            setTickets([]);
            setLoading(false);
        }
    }, [user, fetchTickets]);

    const contextValue = useMemo(() => ({
        tickets,
        loading,
        refreshTickets: fetchTickets,
        addNewTicket: addTicket,
        updateTicketContext: updateItem,
        removeTicket: removeItem,
    }), [tickets, loading, fetchTickets, addTicket, updateItem, removeItem]);

    return (
        <TicketsContext.Provider value={contextValue}>
            {loading ? <Loading /> : children}
        </TicketsContext.Provider>
    );
};

export const useTickets = () => {
    const context = useContext(TicketsContext);
    if (!context) {
        throw new Error("useTickets must be used within a TicketsProvider");
    }
    return context;
};