import { Box, Typography, Grid, Card, CardActionArea, Container } from "@mui/material";
import { useAuth } from "../context/authContext";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import AssignmentIcon from '@mui/icons-material/Assignment';

function AgentDashboard() {
    const context = useAuth();
    const user = context?.user;
    const navigate = useNavigate();
    const location = useLocation();

    if (!user) return <div>Please log in.</div>;

    const isMainDashboard = location.pathname.endsWith('/dashboard') || location.pathname.endsWith('/dashboard/');

    return (
        <Container maxWidth="lg">
            {isMainDashboard && (
                <Box sx={{ mt: 5, textAlign: 'center' }}>
                    <Typography variant="h3" fontWeight="bold" sx={{ mb: 1, color: '#2c3e50' }}>
                        אזור סוכנים
                    </Typography>
                    <Typography variant="h5" color="text.secondary" sx={{ mb: 6 }}>
                        שלום {user.name}, מוכן לעבודה?
                    </Typography>
                    
                    <Grid container justifyContent="center">
                         <Grid size={{ xs: 12, md: 6 }}>
                            <Card elevation={0} sx={{ borderRadius: 4, border: '1px solid #e0e0e0', transition: '0.3s', '&:hover': { transform: 'translateY(-8px)', boxShadow: '0 12px 24px rgba(0,0,0,0.1)' } }}>
                                <CardActionArea onClick={() => navigate('tickets')} sx={{ p: 6, textAlign: 'center' }}>
                                    <Box sx={{ width: 80, height: 80, borderRadius: '50%', bgcolor: '#fff3e0', display: 'flex', alignItems: 'center', justifyContent: 'center', mx: 'auto', mb: 3 }}>
                                        <AssignmentIcon sx={{ fontSize: 40, color: '#ed6c02' }} />
                                    </Box>
                                    <Typography variant="h4" fontWeight="bold" gutterBottom>מאגר הפניות</Typography>
                                    <Typography color="text.secondary">כניסה למאגר הפניות לטיפול ועדכון סטטוסים</Typography>
                                </CardActionArea>
                            </Card>
                        </Grid>
                    </Grid>
                </Box>
            )}
            <Box sx={{ mt: 4 }}>
                <Outlet />
            </Box>
        </Container>
    )
}
export default AgentDashboard;