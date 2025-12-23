import type { TicketResponse } from "../model/tickets";
import { Box, IconButton, Tooltip, Grid, Card, CardContent, Typography, Chip, CardActions, Divider, Avatar } from "@mui/material";
import { useTickets } from "../context/ticketContext";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/authContext";
import Swal from "sweetalert2";
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import VisibilityIcon from '@mui/icons-material/Visibility';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import { useEffect, useState, useMemo } from "react";
import type { PriorityAndStatus } from "../model/prioritiesAndStatus";
import { getPriorities, getStatuses } from "../services/priorityAndStatus";
import { getUser } from "../services/users-service";
import type { User } from "../model/user";

const getPriorityColor = (priority: string) => {
    switch (priority?.toLowerCase()) {
        case 'high': return '#ffebee';
        case 'medium': return '#fff3e0';
        case 'low': return '#e8f5e9';
        default: return '#f5f5f5';
    }
};

const getPriorityTextColor = (priority: string) => {
    switch (priority?.toLowerCase()) {
        case 'high': return '#c62828';
        case 'medium': return '#ef6c00';
        case 'low': return '#2e7d32';
        default: return '#757575';
    }
};

const Tickets = () => {
    const { user } = useAuth();
    const isAdmin = user?.role === 'admin';
    const isAgent = user?.role === 'agent';
    const { tickets, loading, removeTicket, updateTicketContext } = useTickets();
    const navigate = useNavigate();
    
    const [priority, setPriority] = useState<PriorityAndStatus[]>([]);
    const [status, setStatus] = useState<PriorityAndStatus[]>([]);
    const [agent, setAgent] = useState<User[]>([]);

    const sortedTickets = useMemo(() => {
        return [...tickets].sort((a, b) => b.id - a.id);
    }, [tickets]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [pRes, sRes] = await Promise.all([getPriorities(), getStatuses()]);
                setPriority(pRes.data);
                setStatus(sRes.data);
                if (isAdmin) {
                    const uRes = await getUser();
                    setAgent(uRes.data.filter((u: User) => u.role === 'agent'));
                }
            } catch (e) {
                console.error(e);
            }
        };
        fetchData();
    }, [isAdmin]);

    const deleteTicket = (ticketId: number, e: React.MouseEvent) => {
        e.stopPropagation();
        Swal.fire({
            title: "מחיקת פניה",
            text: "האם למחוק את הפניה?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#d33",
            confirmButtonText: "כן, מחק",
            cancelButtonText: "ביטול"
        }).then(async (result) => {
            if (result.isConfirmed) {
                await removeTicket(ticketId);
                Swal.fire("נמחק!", "", "success");
            }
        });
    }

    const updateTicket = (ticketId: number, e: React.MouseEvent) => {
        e.stopPropagation();
        
        const selectStyle = `
            display: block; width: 100%; padding: 12px; font-size: 16px; margin-bottom: 20px; 
            border-radius: 8px; border: 1px solid #cfd8dc; background-color: #fff; box-sizing: border-box;
            box-shadow: 0 2px 5px rgba(0,0,0,0.05);
        `;
        const labelStyle = `display: block; margin-bottom: 8px; font-weight: 600; text-align: right; color: #455a64;`;

        const statusOptions = status.map(s => `<option value="${s.id}">${s.name}</option>`).join('');
        const priorityOptions = priority.map(p => `<option value="${p.id}">${p.name}</option>`).join('');
        let adminHtml = '';
        if (isAdmin) {
             const agentOptions = agent.map(a => `<option value="${a.id}">${a.name}</option>`).join('');
             adminHtml = `<label style="${labelStyle}">סוכן מטפל</label><select id="assignedTo" style="${selectStyle}"><option value="" disabled selected>בחר סוכן</option>${agentOptions}</select>`;
        }

        Swal.fire({
            title: '<span style="color:#1976d2; font-weight:bold;">ניהול פניה</span>',
            html: `
            <div style="text-align: right; direction: rtl; padding: 10px;">
                <label style="${labelStyle}">סטטוס</label><select id="statusId" style="${selectStyle}"><option value="" disabled selected>בחר סטטוס</option>${statusOptions}</select>
                <label style="${labelStyle}">עדיפות</label><select id="priorityId" style="${selectStyle}"><option value="" disabled selected>בחר עדיפות</option>${priorityOptions}</select>
                ${adminHtml}
            </div>`,
            showCancelButton: true,
            confirmButtonText: "שמור שינויים",
            cancelButtonText: "ביטול",
            confirmButtonColor: '#1976d2',
            customClass: {
                popup: 'rounded-popup'
            },
            preConfirm: async () => {
                const statusEl = document.getElementById('statusId') as HTMLSelectElement;
                const priorityEl = document.getElementById('priorityId') as HTMLSelectElement;
                const assignedToEl = document.getElementById('assignedTo') as HTMLSelectElement;
                
                const updated: any = {};
                if(statusEl?.value) { updated.status_id = Number(statusEl.value); updated.status_name = status.find(s=>s.id===Number(statusEl.value))?.name }
                if(priorityEl?.value) { updated.priority_id = Number(priorityEl.value); updated.priority_name = priority.find(p=>p.id===Number(priorityEl.value))?.name }
                if(assignedToEl?.value) updated.assigned_to = Number(assignedToEl.value);

                if (Object.keys(updated).length === 0) return false;
                await updateTicketContext(ticketId, updated);
            }
        });
    }

    if (loading) return <div>Loading...</div>;

    return (
        <Box sx={{ p: 4 }}>
            <Box sx={{ mb: 5, textAlign: 'center' }}>
                <Typography variant="h3" sx={{ fontWeight: 900, color: '#1976d2', mb: 1, letterSpacing: '-1px' }}>
                    פניות פתוחות
                </Typography>
                <Typography variant="h6" color="text.secondary" sx={{ fontWeight: 300 }}>
                    ניהול משימות ופניות בצורה חכמה
                </Typography>
            </Box>
            
            <Grid container spacing={4} alignItems="stretch">
                {sortedTickets.map((ticket: TicketResponse) => (
                    <Grid item xs={12} md={6} lg={4} key={ticket.id} sx={{ display: 'flex' }}>
                        <Card 
                            elevation={0}
                            sx={{ 
                                width: '100%',
                                display: 'flex', 
                                flexDirection: 'column',
                                justifyContent: 'space-between',
                                borderRadius: '24px', 
                                border: '1px solid rgba(25, 118, 210, 0.15)', 
                                bgcolor: '#ffffff',
                                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                                position: 'relative',
                                overflow: 'visible',
                                '&:hover': {
                                    transform: 'translateY(-10px)', 
                                    boxShadow: '0 20px 40px -10px rgba(25, 118, 210, 0.25)', 
                                    borderColor: '#1976d2'
                                }
                            }}
                        >
                            <CardContent sx={{ p: 3, flexGrow: 1 }}>
                                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                                    {/* תגית עדיפות מעוצבת */}
                                    <Chip 
                                        label={ticket.priority_name} 
                                        size="small"
                                        sx={{ 
                                            bgcolor: getPriorityColor(ticket.priority_name || "low"),
                                            color: getPriorityTextColor(ticket.priority_name || "low"),
                                            fontWeight: 800,
                                            borderRadius: '8px',
                                            textTransform: 'uppercase',
                                            fontSize: '0.7rem',
                                            px: 1
                                        }}
                                    />
                                    {/* ID מעוצב */}
                                    <Avatar 
                                        sx={{ 
                                            width: 32, 
                                            height: 32, 
                                            bgcolor: '#e3f2fd', 
                                            color: '#1976d2', 
                                            fontSize: '0.8rem', 
                                            fontWeight: 'bold' 
                                        }}
                                    >
                                        #{ticket.id}
                                    </Avatar>
                                </Box>

                                {/* כותרת */}
                                <Typography variant="h5" sx={{ 
                                    fontWeight: 800, 
                                    mb: 1.5, 
                                    color: '#2c3e50', 
                                    lineHeight: 1.2,
                                    fontSize: '1.4rem'
                                }}>
                                    {ticket.subject}
                                </Typography>
                                
                                {/* תיאור */}
                                <Typography variant="body1" color="text.secondary" sx={{ 
                                    mb: 3, 
                                    lineHeight: 1.6,
                                    display: '-webkit-box',
                                    overflow: 'hidden',
                                    WebkitBoxOrient: 'vertical',
                                    WebkitLineClamp: 3, 
                                    fontSize: '0.95rem'
                                }}>
                                    {ticket.description}
                                </Typography>

                                {/* שורה אמצעית: תאריך וסטטוס */}
                                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mt: 'auto', pt: 2, borderTop: '1px dashed #eee' }}>
                                    <Box sx={{ display: 'flex', alignItems: 'center', color: '#90a4ae', fontSize: '0.85rem' }}>
                                        <AccessTimeIcon sx={{ fontSize: 16, mr: 0.5 }} />
                                        {new Date(ticket.created_at).toLocaleDateString()}
                                    </Box>
                                    
                                    <Chip 
                                        label={ticket.status_name} 
                                        variant="outlined"
                                        size="small"
                                        sx={{ 
                                            borderRadius: '12px', 
                                            borderColor: '#90caf9', 
                                            color: '#1976d2', 
                                            fontWeight: 600,
                                            bgcolor: 'rgba(25, 118, 210, 0.04)'
                                        }}
                                    />
                                </Box>
                            </CardContent>

                            {/* כפתורים */}
                            <CardActions sx={{ p: 2, justifyContent: 'flex-end', gap: 1 }}>
                                <Tooltip title="צפייה בפרטים">
                                    <IconButton 
                                        onClick={() => navigate(`/dashboard/tickets/${ticket.id}`)}
                                        sx={{ 
                                            bgcolor: '#f5f5f5', 
                                            color: '#1976d2',
                                            borderRadius: '12px',
                                            '&:hover': { bgcolor: '#1976d2', color: 'white' }
                                        }}
                                    >
                                        <VisibilityIcon fontSize="small" />
                                    </IconButton>
                                </Tooltip>

                                {(isAdmin || isAgent) && (
                                    <>
                                        <Tooltip title="עריכה">
                                            <IconButton 
                                                onClick={(e) => updateTicket(ticket.id, e)}
                                                sx={{ 
                                                    bgcolor: '#f5f5f5', 
                                                    color: '#f57c00',
                                                    borderRadius: '12px',
                                                    '&:hover': { bgcolor: '#f57c00', color: 'white' }
                                                }}
                                            >
                                                <EditOutlinedIcon fontSize="small" />
                                            </IconButton>
                                        </Tooltip>
                                        
                                        {isAdmin && (
                                            <Tooltip title="מחיקה">
                                                <IconButton 
                                                    onClick={(e) => deleteTicket(ticket.id, e)}
                                                    sx={{ 
                                                        bgcolor: '#ffebee', 
                                                        color: '#d32f2f',
                                                        borderRadius: '12px',
                                                        '&:hover': { bgcolor: '#d32f2f', color: 'white' }
                                                    }}
                                                >
                                                    <DeleteOutlineIcon fontSize="small" />
                                                </IconButton>
                                            </Tooltip>
                                        )}
                                    </>
                                )}
                            </CardActions>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </Box>
    );
}

export default Tickets;