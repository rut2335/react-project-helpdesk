import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { useForm, type SubmitHandler } from "react-hook-form";
import { TextField } from "@mui/material";
import type { TicketResponse } from '../model/tickets';
import { useNavigate } from 'react-router';
import { useAuth } from '../context/authContext';
import { useTickets } from '../context/ticketContext';
import { useEffect, useState } from 'react';
import { getPriorities } from '../services/priorityAndStatus';
import type { PriorityAndStatus } from '../model/prioritiesAndStatus';

const AddTickets = () => {

    const navigate = useNavigate();
    const { register, handleSubmit, formState: { errors } } = useForm<TicketResponse>();

    const [priority, setPriority] = useState<PriorityAndStatus[]>([]);

    const context = useAuth();
    const user = context?.user;
    const { addNewTicket: setAddTicket1 } = useTickets();

    useEffect(() => {
        const fetchPriorities = async () => {
            try {
                setPriority((await getPriorities()).data);
            }
            catch (error) {
                console.error("Failed to fetch priorities", error);
            }
        }
        fetchPriorities();
    }, []);

    const onSubmit: SubmitHandler<TicketResponse> = async (data: TicketResponse) => {
        try {

            data.assigned_to = user?.id || 0;
            setAddTicket1(data);
            navigate('/dashboard');
        }
        catch (error) {
            console.error("Adding ticket failed", error);
        }
    }


    return <>
        {
            <Box
                sx={{
                    minHeight: '100vh', display: 'flex', alignItems: 'center',
                    justifyContent: 'center', backgroundColor: '#f5f5f5',
                }}>
                <Box
                    sx={{
                        backgroundColor: 'white', borderRadius: '16px', padding: '40px',
                        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)', maxWidth: '400px', width: '90%',
                    }}>
                    <Box sx={{ mb: 4, textAlign: 'center' }}>
                        <Box component="h1" sx={{ fontSize: '28px', fontWeight: 700, color: '#1a1a1a', mb: 1 }}>
                            הוספת פנייה חדשה
                        </Box>
                        <Box component="p" sx={{ fontSize: '14px', color: '#666' }}>
                            הזן את פרטי הפנייה שלך
                        </Box>
                    </Box>

                    <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate
                        autoComplete="off" sx={{ '& .MuiTextField-root': { m: 0, width: '100%' } }}>
                        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                            <TextField
                                id="filled-textarea-email"
                                label="כותרת הפנייה"
                                placeholder="title"
                                variant="filled"
                                {...register("subject", {
                                    required: "יש להזין כותרת",
                                })}
                                error={!!errors.subject}
                                helperText={errors.subject?.message as string || ''}
                            />

                            <TextField
                                id="filled-multiline-static"
                                label="תיאור הפנייה"
                                placeholder="description"
                                variant="filled"
                                {...register("description", {
                                    required: "יש להזין תיאור",
                                })}
                                error={!!errors.description}
                                helperText={errors.description?.message as string || ''}
                            />
                            <select style={{ padding: '10px', borderRadius: '4px', border: '1px solid #ccc' }}
                                defaultValue=""
                                {...register("priority_id", {
                                    required: "יש להזין עדיפות",
                                })}
                            >
                                <option value="" disabled>בחר עדיפות</option>
                                {priority.map((prio) => (
                                    <option key={prio.id} value={prio.id}>{prio.name}</option>
                                ))}
                            </select>


                        </Box>

                        <Button
                            type="submit"
                            variant="contained"
                            size="medium"
                            sx={{ mt: 3, width: '100%' }}
                        >
                            שלח פנייה
                        </Button>
                    </Box>
                </Box>
            </Box>

        }
    </>;



}

export default AddTickets;