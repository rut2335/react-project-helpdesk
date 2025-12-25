import { Box, Button, TextField, InputAdornment, IconButton } from "@mui/material";
import { useForm, type SubmitHandler } from "react-hook-form";
import type { InputOfRegister } from "../model/input";
import { useNavigate } from "react-router-dom";
import { loginService, registerService } from "../services/auth-service";
import { useAuth } from "../context/authContext";
import { useState } from "react";
import PersonIcon from '@mui/icons-material/Person';
import EmailIcon from '@mui/icons-material/Email';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

function Register() {

    const { register, handleSubmit, setError, formState: { errors, isSubmitting } } = useForm<InputOfRegister>();
    const navigate = useNavigate();
    const { login: setAuthLogin } = useAuth();
    
    const [showPassword, setShowPassword] = useState(false);

    const onSubmit: SubmitHandler<InputOfRegister> = async data => {
        try {
            await registerService(data);

            const loginResponse = await loginService({
                email: data.email,
                password: data.password
            });

            setAuthLogin(loginResponse.data.user, loginResponse.data.token);
            navigate('/dashboard');
        }
        catch (error) {
            console.error("Register failed", error);
            setError("email", { type: "server", message: "האימייל כבר קיים במערכת" });
        }
    }
    return <>
        {
            <Box
                sx={{
                    minHeight: '100vh',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: '#f5f5f5',
                }}
            >
                <Box
                    sx={{
                        backgroundColor: 'white',
                        borderRadius: '16px',
                        padding: '40px',
                        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
                        maxWidth: '400px',
                        width: '90%',
                    }}
                >
                    <Box sx={{ mb: 4, textAlign: 'center' }}>
                        <Box component="h1" sx={{ fontSize: '28px', fontWeight: 700, color: '#1a1a1a', mb: 1 }}>
                            הרשמה
                        </Box>
                        <Box component="p" sx={{ fontSize: '14px', color: '#666' }}>
                            צור חשבון חדש
                        </Box>
                    </Box>

                    <Box
                        component="form"
                        onSubmit={handleSubmit(onSubmit)}
                        noValidate
                        autoComplete="off"
                        sx={{ '& .MuiTextField-root': { m: 0, width: '100%' } }}
                    >
                        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                            <TextField
                                id="filled-textarea-name"
                                label="שם"
                                placeholder="הזן שם מלא"
                                variant="filled"
                                {...register("name", {
                                    required: "יש להזין שם",
                                    pattern: {
                                        value: /^[א-תA-Za-z\s]+$/,
                                        message: "השם יכול להכיל רק אותיות ורווחים"
                                    }
                                })}
                                error={!!errors.name}
                                helperText={errors.name?.message as string || ''}
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <PersonIcon />
                                        </InputAdornment>
                                    ),
                                }}
                            />

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
                                        value: /^(?=.*[A-Za-z])[A-Za-z0-9!@#$%^&*()_\-+=]{4,}$/,
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
                            {isSubmitting ? 'טוען...' : 'הרשמה'}
                        </Button>

                        <Box sx={{ mt: 2, textAlign: 'center', fontSize: '14px' }}>
                            כבר יש לך חשבון? <a href="/login" style={{ color: '#1976d2', textDecoration: 'none' }}>התחבר</a>
                        </Box>
                    </Box>
                </Box>
            </Box>
        }

    </>;
}
export default Register;