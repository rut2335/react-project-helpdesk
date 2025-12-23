import { useEffect, useState } from "react";
import { getPriorities, getStatuses, postPriority, postStatus } from "../services/priorityAndStatus";
import type { PriorityAndStatus } from "../model/prioritiesAndStatus";
import {
    Typography, Box, List, ListItem, ListItemText,
    ListItemAvatar, Avatar, IconButton, Paper, Tooltip
} from '@mui/material';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import LabelImportantIcon from '@mui/icons-material/LabelImportant'; 
import LabelIcon from '@mui/icons-material/Label';
import Swal from "sweetalert2";

const PriorityStatus = () => {

    const [statusList, setStatusList] = useState<PriorityAndStatus[]>([]);
    const [priorityList, setPriorityList] = useState<PriorityAndStatus[]>([]);

    useEffect(() => {
        const fetchPriorityStatus = async () => {
            try {
                const statusRes = await getStatuses();
                const priorityRes = await getPriorities();
                if (statusRes?.data) setStatusList(statusRes.data);
                if (priorityRes?.data) setPriorityList(priorityRes.data);
            } catch (error) {
                console.error("Failed to fetch data", error);
            }
        }
        fetchPriorityStatus();
    }, []);

    const addStatus = () => {
        Swal.fire({
            title: "הוסף סטטוס חדש",
            input: "text",
            confirmButtonText: "שמור",
            cancelButtonText: "ביטול",
            showCancelButton: true,
            inputValidator: (value) => {
                if (!value) return 'נא להזין שם לסטטוס';
            },
            preConfirm: async (name) => {
                try {
                    await postStatus(name);
                    setStatusList(prev => [...prev, { id: prev.length + 1, name }]);
                    return name;
                } catch (error) {
                    Swal.showValidationMessage(`שגיאה: ${error}`);
                }
            }
        }).then((result) => {
            if (result.isConfirmed) {
                Swal.fire({
                    icon: "success",
                    title: "נוסף בהצלחה",
                    timer: 1500,
                    showConfirmButton: false
                });
            }
        });
    }

    
    const addPriority = () => {
        Swal.fire({
            title: "הוסף עדיפות חדשה",
            input: "text",
            confirmButtonText: "שמור",
            cancelButtonText: "ביטול",
            showCancelButton: true,
            inputValidator: (value) => {
                if (!value) return 'נא להזין שם לעדיפות';
            },
            preConfirm: async (name) => {
                try {
                    await postPriority(name);
                    setPriorityList(prev => [...prev, { id: prev.length + 1, name }]);
                    return name;
                } catch (error) {
                    Swal.showValidationMessage(`שגיאה: ${error}`);
                }
            }
        }).then((result) => {
            if (result.isConfirmed) {
                Swal.fire({
                    icon: "success",
                    title: "נוסף בהצלחה",
                    timer: 1500,
                    showConfirmButton: false
                });
            }
        });
    }

    const ModernListItem = ({ text, icon, colorBg, colorMain }: any) => (
        <ListItem 
            sx={{ 
                py: 1.5, 
                px: 2,
                transition: 'all 0.2s',
                borderRadius: 1,
                '&:hover': { 
                    bgcolor: 'rgba(0, 0, 0, 0.03)', 
                }
            }}
        >
            <ListItemAvatar>
                <Avatar sx={{ 
                    bgcolor: colorBg, 
                    color: colorMain, 
                    width: 36, 
                    height: 36 
                }}>
                    {icon}
                </Avatar>
            </ListItemAvatar>
            <ListItemText 
                primary={text} 
                primaryTypographyProps={{ 
                    fontWeight: 500, 
                    color: '#2c3e50' 
                }}
            />
        </ListItem>
    );

    return (
        <Box sx={{ 
            minHeight: '100vh', 
            bgcolor: '#f4f6f8',
            display: 'flex',            
            alignItems: 'center',       
            justifyContent: 'center',   
            p: 2                        
        }}>
            
            <Box sx={{ 
                width: '100%',
                maxWidth: '900px', // רוחב מקסימלי כדי שזה ייראה טוב במרכז
                display: 'grid', 
                gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, 
                gap: 4 
            }}>

                <Paper 
                    elevation={2} 
                    sx={{ 
                        borderRadius: 3, 
                        overflow: 'hidden', 
                        bgcolor: 'white' 
                    }}
                >
                    <Box sx={{ 
                        p: 2.5, 
                        display: 'flex', 
                        justifyContent: 'space-between', 
                        alignItems: 'center',
                        borderBottom: '1px solid rgba(0,0,0,0.06)'
                    }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                            <Typography variant="h6" fontWeight="600" color="text.primary">
                                עדיפויות
                            </Typography>
                            <Typography variant="caption" sx={{ bgcolor: '#ffebee', color: '#ef5350', px: 1, py: 0.5, borderRadius: 1, fontWeight: 'bold' }}>
                                {priorityList.length}
                            </Typography>
                        </Box>
                        
                        <Tooltip title="הוסף עדיפות">
                            <IconButton 
                                onClick={addPriority}
                                sx={{ 
                                    color: '#ef5350',
                                    '&:hover': { bgcolor: '#ffebee' }
                                }}
                            >
                                <AddCircleOutlineIcon sx={{ fontSize: 28 }} />
                            </IconButton>
                        </Tooltip>
                    </Box>

                    <List sx={{ px: 1, pb: 2 }}>
                        {priorityList.map((priority) => (
                            <ModernListItem 
                                key={priority.id} 
                                text={priority.name} 
                                icon={<LabelImportantIcon fontSize="small" />}
                                colorBg="#ffebee" 
                                colorMain="#ef5350" 
                            />
                        ))}
                    </List>
                </Paper>

                <Paper 
                    elevation={2} 
                    sx={{ 
                        borderRadius: 3, 
                        overflow: 'hidden', 
                        bgcolor: 'white' 
                    }}
                >
                    <Box sx={{ 
                        p: 2.5, 
                        display: 'flex', 
                        justifyContent: 'space-between', 
                        alignItems: 'center',
                        borderBottom: '1px solid rgba(0,0,0,0.06)'
                    }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                            <Typography variant="h6" fontWeight="600" color="text.primary">
                                סטטוסים
                            </Typography>
                            <Typography variant="caption" sx={{ bgcolor: '#e1f5fe', color: '#039be5', px: 1, py: 0.5, borderRadius: 1, fontWeight: 'bold' }}>
                                {statusList.length}
                            </Typography>
                        </Box>

                        <Tooltip title="הוסף סטטוס">
                            <IconButton 
                                onClick={addStatus}
                                sx={{ 
                                    color: '#039be5',
                                    '&:hover': { bgcolor: '#e1f5fe' }
                                }}
                            >
                                <AddCircleOutlineIcon sx={{ fontSize: 28 }} />
                            </IconButton>
                        </Tooltip>
                    </Box>

                    <List sx={{ px: 1, pb: 2 }}>
                        {statusList.map((status) => (
                            <ModernListItem 
                                key={status.id} 
                                text={status.name} 
                                icon={<LabelIcon fontSize="small" />} 
                                colorBg="#e1f5fe" 
                                colorMain="#039be5" 
                            />
                        ))}
                    </List>
                </Paper>

            </Box>
        </Box>
    )
}

export default PriorityStatus;