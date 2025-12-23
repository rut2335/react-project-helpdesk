import { Box, Button, Typography, Container } from "@mui/material";
import { useNavigate } from "react-router-dom";
import SentimentVeryDissatisfiedIcon from '@mui/icons-material/SentimentVeryDissatisfied';

const NotFound = () => {
    const navigate = useNavigate();

    return (
        <Container maxWidth="md">
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    minHeight: '60vh',
                    textAlign: 'center',
                    mt: 5
                }}
            >
                <SentimentVeryDissatisfiedIcon sx={{ fontSize: 100, color: '#ffcc80', mb: 2 }} />
                
                <Typography variant="h1" sx={{ fontWeight: 900, color: '#37474f', fontSize: { xs: '4rem', md: '6rem' } }}>
                    404
                </Typography>
                
                <Typography variant="h4" sx={{ mb: 2, fontWeight: 'bold', color: '#546e7a' }}>
                    אופס! נראה שהלכת לאיבוד
                </Typography>
                
                <Typography variant="body1" color="text.secondary" paragraph sx={{ maxWidth: '500px', mb: 4, fontSize: '1.1rem' }}>
                    העמוד שחיפשת עבר דירה, נמחק, או שאולי הוא מעולם לא היה קיים.
                    אל דאגה, אנחנו כאן כדי להחזיר אותך הביתה.
                </Typography>

                <Button 
                    variant="contained" 
                    size="large"
                    onClick={() => navigate('/')}
                    sx={{ 
                        borderRadius: '50px', 
                        padding: '12px 36px', 
                        fontSize: '1.1rem',
                        textTransform: 'none',
                        background: 'linear-gradient(45deg, #FF8E53 30%, #FE6B8B 90%)',
                        boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)'
                    }}
                >
                    חזרה לעמוד הבית
                </Button>
            </Box>
        </Container>
    )
}

export default NotFound;