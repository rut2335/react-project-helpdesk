import { Box, Typography, Card, CardActionArea, Container } from "@mui/material";
import { useAuth } from "../context/authContext";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import PeopleIcon from '@mui/icons-material/People';
import ListAltIcon from '@mui/icons-material/ListAlt';
import SettingsIcon from '@mui/icons-material/Settings';
import Grid from '@mui/material/Grid';


function AdminDashboard() {
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
                        ממשק ניהול
                    </Typography>
                    <Typography variant="h5" color="text.secondary" sx={{ mb: 6 }}>
                        שלום {user.name}, ברוך הבא למערכת הניהול
                    </Typography>

                    <Grid container spacing={4} justifyContent="center">
                        <Grid  size={{ xs: 12, md: 4 }} >
                            <Card elevation={0} sx={{ borderRadius: 4, border: '1px solid #e0e0e0', transition: '0.3s', '&:hover': { transform: 'translateY(-8px)', boxShadow: '0 12px 24px rgba(0,0,0,0.1)' } }}>
                                <CardActionArea onClick={() => navigate('tickets')} sx={{ p: 4, textAlign: 'center' }}>
                                    <Box sx={{ width: 70, height: 70, borderRadius: '50%', bgcolor: '#e3f2fd', display: 'flex', alignItems: 'center', justifyContent: 'center', mx: 'auto', mb: 2 }}>
                                        <ListAltIcon sx={{ fontSize: 35, color: '#1976d2' }} />
                                    </Box>
                                    <Typography variant="h6" fontWeight="bold">ניהול פניות</Typography>
                                    <Typography variant="body2" color="text.secondary">צפייה בכל הפניות במערכת</Typography>
                                </CardActionArea>
                            </Card>
                        </Grid>
                        
                        <Grid  size={{ xs: 12, md: 4 }}>
                            <Card elevation={0} sx={{ borderRadius: 4, border: '1px solid #e0e0e0', transition: '0.3s', '&:hover': { transform: 'translateY(-8px)', boxShadow: '0 12px 24px rgba(0,0,0,0.1)' } }}>
                                <CardActionArea onClick={() => navigate('users')} sx={{ p: 4, textAlign: 'center' }}>
                                    <Box sx={{ width: 70, height: 70, borderRadius: '50%', bgcolor: '#e8f5e9', display: 'flex', alignItems: 'center', justifyContent: 'center', mx: 'auto', mb: 2 }}>
                                        <PeopleIcon sx={{ fontSize: 35, color: '#2e7d32' }} />
                                    </Box>
                                    <Typography variant="h6" fontWeight="bold">משתמשים</Typography>
                                    <Typography variant="body2" color="text.secondary">ניהול משתמשים והרשאות</Typography>
                                </CardActionArea>
                            </Card>
                        </Grid>

                        <Grid  size={{ xs: 12, md: 4 }}>
                            <Card elevation={0} sx={{ borderRadius: 4, border: '1px solid #e0e0e0', transition: '0.3s', '&:hover': { transform: 'translateY(-8px)', boxShadow: '0 12px 24px rgba(0,0,0,0.1)' } }}>
                                <CardActionArea onClick={() => navigate('statusPriority')} sx={{ p: 4, textAlign: 'center' }}>
                                    <Box sx={{ width: 70, height: 70, borderRadius: '50%', bgcolor: '#fff3e0', display: 'flex', alignItems: 'center', justifyContent: 'center', mx: 'auto', mb: 2 }}>
                                        <SettingsIcon sx={{ fontSize: 35, color: '#ed6c02' }} />
                                    </Box>
                                    <Typography variant="h6" fontWeight="bold">הגדרות</Typography>
                                    <Typography variant="body2" color="text.secondary">ניהול סטטוסים ועדיפויות</Typography>
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
    );
}
export default AdminDashboard;