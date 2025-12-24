import { Box, Button, Container, Typography, Grid, Paper, Stack } from "@mui/material";
import { useNavigate } from "react-router-dom";
import RocketLaunchIcon from '@mui/icons-material/RocketLaunch';
import SecurityIcon from '@mui/icons-material/Security';
import SpeedIcon from '@mui/icons-material/Speed';
import SupportAgentIcon from '@mui/icons-material/SupportAgent';

const LandingPage = () => {
    const navigate = useNavigate();

    return (
        <Box sx={{ width: '100%', overflowX: 'hidden' }}>
            
            <Box sx={{ 
                minHeight: '90vh', 
                display: 'flex', 
                alignItems: 'center', 
                background: 'linear-gradient(120deg, #fdfbfb 0%, #ebedee 100%)',
                position: 'relative',
                py: 4
            }}>
                <Box sx={{
                    position: 'absolute',
                    top: 0,
                    right: 0,
                    width: '50%',
                    height: '100%',
                    background: 'linear-gradient(135deg, rgba(25, 118, 210, 0.03) 0%, rgba(25, 118, 210, 0.1) 100%)',
                    clipPath: 'polygon(20% 0%, 100% 0, 100% 100%, 0% 100%)',
                    zIndex: 0
                }} />

                <Container maxWidth="xl" sx={{ position: 'relative', zIndex: 1 }}> 
                    <Paper 
                        elevation={0} 
                        sx={{ 
                            p: { xs: 4, md: 8 }, 
                            borderRadius: 6, 
                            border: '1px solid rgba(255, 255, 255, 0.8)', 
                            background: 'rgba(255, 255, 255, 0.4)', 
                            backdropFilter: 'blur(20px)', 
                            boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.05)', 
                            width: '100%'
                        }}
                    >
                        <Grid container spacing={4} alignItems="center">
                            
                            <Grid size={{ xs: 12, md: 7 }} sx={{ textAlign: { xs: 'center', md: 'right' } }}>
                                <Typography 
                                    variant="h1" 
                                    component="h1" 
                                    sx={{ 
                                        fontWeight: 900, 
                                        color: '#1a237e',
                                        fontSize: { xs: '3rem', md: '4.5rem' }, // פונט גדול ומרשים
                                        mb: 1,
                                        lineHeight: 1,
                                        letterSpacing: '-1.5px'
                                    }}
                                >
                                    מערכת הפניות
                                </Typography>
                                <Typography 
                                    variant="h1" 
                                    component="span" 
                                    sx={{ 
                                        fontWeight: 900,
                                        fontSize: { xs: '3rem', md: '4.5rem' },
                                        background: 'linear-gradient(45deg, #1976d2 30%, #42a5f5 90%)', // גרדיאנט כחול בטקסט
                                        WebkitBackgroundClip: 'text',
                                        WebkitTextFillColor: 'transparent',
                                        display: 'block',
                                        mb: 3
                                    }}
                                >
                                    המתקדמת והמהירה
                                </Typography>
                                
                                <Typography variant="h5" sx={{ color: '#546e7a', mb: 6, fontWeight: 300, fontSize: '1.4rem', maxWidth: '800px', ml: 'auto' }}>
                                    הפלטפורמה המובילה לניהול שירות לקוחות. 
                                    עיצוב מודרני, חווית משתמש נקייה וביצועים ללא פשרות.
                                </Typography>
                                
                                <Stack direction={{ xs: 'column', sm: 'row' }} spacing={3} justifyContent={{ xs: 'center', md: 'flex-start' }}>
                                    <Button 
                                        variant="contained" 
                                        size="large" 
                                        onClick={() => navigate('/login')}
                                        sx={{ 
                                            borderRadius: '50px',
                                            px: 6,
                                            py: 1.8,
                                            fontSize: '1.2rem',
                                            fontWeight: 'bold',
                                            boxShadow: '0 20px 40px rgba(25, 118, 210, 0.2)',
                                            transition: 'all 0.3s',
                                            '&:hover': { transform: 'translateY(-3px)', boxShadow: '0 25px 50px rgba(25, 118, 210, 0.3)' }
                                        }}
                                    >
                                        התחל עכשיו
                                    </Button>
                                    <Button 
                                        variant="text" 
                                        size="large" 
                                        onClick={() => navigate('/register')}
                                        sx={{ 
                                            borderRadius: '50px',
                                            px: 4,
                                            fontSize: '1.2rem',
                                            fontWeight: 'medium',
                                            color: '#546e7a',
                                            '&:hover': { bgcolor: 'rgba(0,0,0,0.03)', color: '#1976d2' }
                                        }}
                                    >
                                        אין לך משתמש? הירשם
                                    </Button>
                                </Stack>
                            </Grid>
                            
                            <Grid size={{ xs: 12, md: 5 }} sx={{ display: 'flex', justifyContent: 'center', position: 'relative' }}>
                                <Box className="floating-rocket"> 
                                    <RocketLaunchIcon 
                                        sx={{ 
                                            fontSize: { xs: 200, md: 400 }, 
                                            color: '#1976d2', 
                                            filter: 'drop-shadow(0px 30px 60px rgba(25, 118, 210, 0.25))', 
                                            opacity: 0.9
                                        }} 
                                    />
                                </Box>
                            </Grid>
                        </Grid>
                    </Paper>
                </Container>
            </Box>

            <Container maxWidth="xl" sx={{ py: 12, bgcolor: '#ffffff' }}>
                <Box sx={{ textAlign: 'center', mb: 10 }}>
                    <Typography variant="h3" fontWeight={800} sx={{ color: '#1a237e', mb: 2 }}>
                        למה לבחור בנו?
                    </Typography>
                    <Typography variant="h6" color="text.secondary" sx={{ maxWidth: '700px', mx: 'auto' }}>
                        טכנולוגיה שנועדה לשרת אותך
                    </Typography>
                </Box>
                
                <Grid container spacing={6} justifyContent="center">
                    {[
                        { icon: <SpeedIcon sx={{ fontSize: 60 }} />, title: "ביצועים", desc: "מערכת אולטרה-מהירה.", color: '#00B0FF' },
                        { icon: <SecurityIcon sx={{ fontSize: 60 }} />, title: "אבטחה", desc: "תקני אבטחה מחמירים.", color: '#00E676' },
                        { icon: <SupportAgentIcon sx={{ fontSize: 60 }} />, title: "שירות", desc: "כלי ניהול חכמים.", color: '#651FFF' }
                    ].map((item, index) => (
                        <Grid size={{ xs: 12, md: 3 }} key={index}>
                            <Box 
                                sx={{ 
                                    p: 4, 
                                    textAlign: 'center', 
                                    transition: 'all 0.3s ease',
                                    borderRadius: 4,
                                    '&:hover': { 
                                        bgcolor: '#f8fdff',
                                        transform: 'translateY(-10px)'
                                    }
                                }}
                            >
                                <Box sx={{ 
                                    width: 100, height: 100, 
                                    borderRadius: '30%', 
                                    bgcolor: `${item.color}10`, 
                                    color: item.color,
                                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                                    mx: 'auto', mb: 3,
                                    boxShadow: `0 10px 20px ${item.color}20`
                                }}>
                                    {item.icon}
                                </Box>
                                <Typography variant="h4" fontWeight="bold" gutterBottom sx={{ fontSize: '1.8rem' }}>
                                    {item.title}
                                </Typography>
                                <Typography variant="body1" color="text.secondary" sx={{ fontSize: '1.1rem' }}>
                                    {item.desc}
                                </Typography>
                            </Box>
                        </Grid>
                    ))}
                </Grid>
            </Container>
        </Box>
    );
};

export default LandingPage;