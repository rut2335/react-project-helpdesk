import { AppBar, Box, Button, Container, Toolbar, Typography, Link as MuiLink, Stack } from "@mui/material";
import { Outlet, useNavigate } from "react-router-dom";
import { useAuth } from "../context/authContext";
import SupportAgentIcon from '@mui/icons-material/SupportAgent';
import HomeIcon from '@mui/icons-material/Home';

const Layout = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
            <AppBar position="sticky" elevation={0} sx={{ backgroundColor: '#1976d2', borderBottom: '1px solid rgba(255,255,255,0.1)', boxShadow: '0 4px 12px rgba(25, 118, 210, 0.2)' }}>
                <Container maxWidth="xl">
                    <Toolbar disableGutters>
                        <SupportAgentIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
                        <Typography
                            variant="h6"
                            noWrap
                            component="a"
                            onClick={() => navigate('/')}
                            sx={{
                                mr: 2,
                                display: { xs: 'none', md: 'flex' },
                                fontFamily: 'monospace',
                                fontWeight: 700,
                                letterSpacing: '.1rem',
                                color: 'inherit',
                                textDecoration: 'none',
                                cursor: 'pointer',
                                flexGrow: 1
                            }}
                        >
                            TICKETING
                        </Typography>

                        <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
                            <Button 
                                color="inherit" 
                                startIcon={<HomeIcon />}
                                onClick={() => navigate('/')}
                                sx={{ mr: 1, fontWeight: 'bold' }}
                            >
                                דף הבית
                            </Button>

                            {!user ? (
                                <>
                                    <Button color="inherit" onClick={() => navigate('/login')}>התחברות</Button>
                                    <Button variant="outlined" color="inherit" onClick={() => navigate('/register')} sx={{ borderColor: 'white', '&:hover': { borderColor: 'white', bgcolor: 'rgba(255,255,255,0.1)' } }}>הרשמה</Button>
                                </>
                            ) : (
                                <>
                                    <Button color="inherit" onClick={() => navigate('/dashboard')}>דאשבורד</Button>
                                    
                                    {user.role === 'admin' && (
                                        <>
                                            <Button color="inherit" onClick={() => navigate('/dashboard/tickets')}>פניות</Button>
                                            <Button color="inherit" onClick={() => navigate('/dashboard/users')}>משתמשים</Button>
                                            <Button color="inherit" onClick={() => navigate('/dashboard/statusPriority')}>הגדרות</Button>
                                        </>
                                    )}

                                    {user.role === 'customer' && (
                                        <Button color="inherit" onClick={() => navigate('/dashboard/tickets/new')}>פנייה חדשה</Button>
                                    )}
                                    
                                    {user.role === 'agent' && (
                                         <Button color="inherit" onClick={() => navigate('/dashboard/tickets')}>פניות</Button>
                                    )}

                                    <Button 
                                        color="error" 
                                        variant="contained" 
                                        size="small"
                                        onClick={handleLogout} 
                                        sx={{ ml: 2, borderRadius: 20, px: 3, boxShadow: 'none', fontWeight: 'bold' }}
                                    >
                                        יציאה
                                    </Button>
                                </>
                            )}
                        </Box>
                    </Toolbar>
                </Container>
            </AppBar>

            <Box component="main" sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
                <Outlet />
            </Box>

            <Box component="footer" sx={{ py: 3, px: 2, mt: 'auto', backgroundColor: '#f8f9fa', borderTop: '1px solid #e0e0e0' }}>
                <Container maxWidth="sm">
                    <Box sx={{ textAlign: 'center' }}>
                        
                        <Stack direction="row" justifyContent="center" alignItems="center" spacing={1} sx={{ mb: 1 }}>
                            <SupportAgentIcon sx={{ color: '#1976d2' }} />
                            <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#1976d2' }}>
                                TICKETING
                            </Typography>
                        </Stack>

                        <Typography variant="body2" color="text.secondary">
                            {'All rights reserved © Ruti Shlezinger 2025'}
                        </Typography>
                    </Box>
                </Container>
            </Box>
        </Box>
    );
};

export default Layout;