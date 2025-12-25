import { TextField, InputAdornment, IconButton } from '@mui/material';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { useForm, type SubmitHandler } from "react-hook-form";
import { loginService } from "../services/auth-service";
import type { Inputs } from '../model/input';
import { useNavigate } from 'react-router-dom';
import { useAuth } from "../context/authContext";
import { useState } from 'react';
import EmailIcon from '@mui/icons-material/Email';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

function Login() {

    const { register, handleSubmit, setError, formState: { errors, isSubmitting } } = useForm<Inputs>();
    const navigate = useNavigate();
    const { login: setAuthLogin } = useAuth();
    
    const [showPassword, setShowPassword] = useState(false);

    const onSubmitLogin: SubmitHandler<Inputs> = async data => {
        try {
            const response = await loginService(data);
            setAuthLogin(response.data.user, response.data.token);
            navigate('/dashboard');
        }
        catch (error) {
            console.error("Login failed", error);
            setError("email", { type: "server", message: "האימייל או הסיסמה שגויים" });
            setError("password", { type: "server", message: "האימייל או הסיסמה שגויים" });
        }
    }

    return <>
        {
            <Box
                sx={{ minHeight: '100vh', display: 'flex', alignItems: 'center',
                    justifyContent: 'center', backgroundColor: '#f5f5f5',}}>
                <Box
                    sx={{ backgroundColor: 'white', borderRadius: '16px', padding: '40px',
                        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)', maxWidth: '400px', width: '90%',}}>
                    <Box sx={{ mb: 4, textAlign: 'center' }}>
                        <Box component="h1" sx={{ fontSize: '28px', fontWeight: 700, color: '#1a1a1a', mb: 1 }}>
                            התחברות
                        </Box>
                        <Box component="p" sx={{ fontSize: '14px', color: '#666' }}>
                            הזן את פרטי החשבון שלך
                        </Box>
                    </Box>

                    <Box  component="form" onSubmit={handleSubmit(onSubmitLogin)}  noValidate
                        autoComplete="off" sx={{ '& .MuiTextField-root': { m: 0, width: '100%' } }}>
                        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                            <TextField
                                id="filled-textarea-email"
                                label="אימייל"
                                placeholder="example@email.com"
                                type="email"
                                variant="filled"
                                {...register("email", {
                                    required: "יש להזין אימייל",
                                    pattern: {
                                        value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                                        message: "פורמט אימייל לא תקין"
                                    }
                                })}
                                error={!!errors.email}
                                helperText={errors.email?.message as string || ''}
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <EmailIcon />
                                        </InputAdornment>
                                    ),
                                }}
                            />

                            <TextField
                                id="filled-multiline-static"
                                label="סיסמה"
                                placeholder="הזן סיסמה"
                                type={showPassword ? 'text' : 'password'}
                                variant="filled"
                                {...register("password", {
                                    required: "יש להזין סיסמה",
                                    pattern: {
                                        value: /^(?=.*[A-Za-z])[A-Za-z0-9!@#$%^&*()_\-+=]{5,}$/,
                                        message: "הסיסמה חייבת להכיל לפחות 4 תווים, אותיות ומספרים"
                                    }
                                })}
                                error={!!errors.password}
                                helperText={errors.password?.message as string || ''}
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <IconButton
                                                onClick={() => setShowPassword(!showPassword)}
                                                edge="start"
                                            >
                                                {showPassword ? <VisibilityOff /> : <Visibility />}
                                            </IconButton>
                                        </InputAdornment>
                                    )
                                }}
                            />
                        </Box>

                        <Button
                            type="submit"
                            variant="contained"
                            size="medium"
                            disabled={isSubmitting}
                            sx={{ mt: 3, width: '100%' }}
                        >
                            {isSubmitting ? 'מתחבר...' : 'התחברות'}
                        </Button>

                        <Box sx={{ mt: 2, textAlign: 'center', fontSize: '14px' }}>
                            עדיין לא רשום? <a href="/register" style={{ color: '#1976d2', textDecoration: 'none' }}>הירשם</a>
                        </Box>
                    </Box>
                </Box>
            </Box>
        }
    </>;
}

export default Login;