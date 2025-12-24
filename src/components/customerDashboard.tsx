import { Box, Typography, Grid, Card, CardActionArea, Container } from "@mui/material";
import { useAuth } from "../context/authContext";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import HistoryIcon from '@mui/icons-material/History';

const CustomerDashboard = () => {
    const context = useAuth();
    const navigate = useNavigate();
    const location = useLocation();
    const user = context?.user;

    if (!user) return <div>Please log in.</div>;
    
    // בודק אם אנחנו בנתיב הראשי
    const isMainDashboard = location.pathname.endsWith('/dashboard') || location.pathname.endsWith('/dashboard/');

    return (
        <Container maxWidth="lg">
             {isMainDashboard && (
                <Box sx={{ mt: 5, textAlign: 'center' }}>
                    <Typography variant="h3" fontWeight="bold" sx={{ mb: 1, color: '#2c3e50' }}>
                        היי {user.name},
                    </Typography>
                    <Typography variant="h5" color="text.secondary" sx={{ mb: 6 }}>
                        איך נוכל לעזור לך היום?
                    </Typography>

                    <Grid container spacing={4} justifyContent="center">
                        {/* כרטיס פתיחת פניה */}
                        <Grid size={{ xs: 12, md: 5 }}>
                            <Card 
                                elevation={0} 
                                sx={{ 
                                    borderRadius: 4, 
                                    border: '1px solid #e0e0e0',
                                    transition: 'all 0.3s ease',
                                    '&:hover': { transform: 'translateY(-8px)', boxShadow: '0 12px 24px rgba(0,0,0,0.1)', borderColor: 'primary.main' }
                                }}
                            >
                                <CardActionArea onClick={() => navigate('tickets/new')} sx={{ p: 5, textAlign: 'center' }}>
                                    <Box sx={{ 
                                        width: 80, height: 80, borderRadius: '50%', 
                                        bgcolor: '#e8f5e9', display: 'flex', alignItems: 'center', justifyContent: 'center', 
                                        mx: 'auto', mb: 3 
                                    }}>
                                        <AddCircleOutlineIcon sx={{ fontSize: 40, color: '#2e7d32' }} />
                                    </Box>
                                    <Typography variant="h5" fontWeight="bold" gutterBottom>פנייה חדשה</Typography>
                                    <Typography color="text.secondary">נתקלת בבעיה? פתח קריאה והצוות שלנו יטפל בה</Typography>
                                </CardActionArea>
                            </Card>
                        </Grid>

                        {/* כרטיס הפניות שלי */}
                        <Grid size={{ xs: 12, md: 5 }}>
                            <Card 
                                elevation={0}
                                sx={{ 
                                    borderRadius: 4, 
                                    border: '1px solid #e0e0e0',
                                    transition: 'all 0.3s ease',
                                    '&:hover': { transform: 'translateY(-8px)', boxShadow: '0 12px 24px rgba(0,0,0,0.1)', borderColor: 'primary.main' }
                                }}
                            >
                                <CardActionArea onClick={() => navigate('tickets')} sx={{ p: 5, textAlign: 'center' }}>
                                    <Box sx={{ 
                                        width: 80, height: 80, borderRadius: '50%', 
                                        bgcolor: '#e3f2fd', display: 'flex', alignItems: 'center', justifyContent: 'center', 
                                        mx: 'auto', mb: 3 
                                    }}>
                                        <HistoryIcon sx={{ fontSize: 40, color: '#1976d2' }} />
                                    </Box>
                                    <Typography variant="h5" fontWeight="bold" gutterBottom>הפניות שלי</Typography>
                                    <Typography color="text.secondary">צפייה בסטטוס פניות קודמות והיסטוריית טיפול</Typography>
                                </CardActionArea>
                            </Card>
                        </Grid>
                    </Grid>
                </Box>
             )}
            
            {/* כאן מוצג התוכן הפנימי (רשימת פניות, טופס חדש וכו') */}
            <Box sx={{ mt: 4 }}>
                <Outlet />
            </Box>
        </Container>
    )
}
export default CustomerDashboard;