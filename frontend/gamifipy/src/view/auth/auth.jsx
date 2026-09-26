import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import GoogleIcon from '@mui/icons-material/Google';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import CircularProgress from '@mui/material/CircularProgress';
import Alert from '@mui/material/Alert';
import ResetPassword from '../../components/ResetPassword';
import './auth.css'
import { API_URL } from '../../config';

function Auth() {
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState(false);
    const [guestLoading, setGuestLoading] = useState(false);
    const [openResetPassword, setOpenResetPassword] = useState(false);
    const [values, setValues] = useState({
        email: '',
        password: '',
    });

    useEffect(() => {
        if (error) {
            const timer = setTimeout(() => {
                setError(false);
            }, 3000);
            return () => clearTimeout(timer);
        }
    }, [error]);

    const handleRegister = () => {
        navigate("/register", { replace: true });
    }

    const openResetDialog = () => {
        setOpenResetPassword(true);
    }

    const closeResetDialog = () => {
        setOpenResetPassword(false);
    }

    const handleLogin = async () => {
        try {
            const response = await fetch(`${API_URL}/auth/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email: values.email,
                    password: values.password,
                }),
            })
            if (!response.ok) {
                throw new Error('Error en la autenticación');
            }
            const data = await response.json();
            localStorage.setItem('token', data.access_token);
            localStorage.setItem("refresh_token", data.refresh_token);
            navigate("/levels", { replace: true })
        } catch (error) {
            console.error('Error al iniciar sesión:', error);
            setError('Error al iniciar sesión. Verifica tus credenciales.');
            setValues({ email: '', password: '' });
        }
    }

    const handleGuestLogin = async () => {
        setGuestLoading(true);
        try {
            const response = await fetch(`${API_URL}/auth/guest`, { method: 'POST' });
            if (!response.ok) {
                throw new Error('Error al crear la cuenta de invitado');
            }
            const data = await response.json();
            localStorage.setItem('token', data.access_token);
            localStorage.setItem("refresh_token", data.refresh_token);
            navigate("/levels", { replace: true })
        } catch (error) {
            console.error('Error al entrar como invitado:', error);
            setError('No se pudo entrar como invitado. Intenta de nuevo en unos segundos.');
        } finally {
            setGuestLoading(false);
        }
    }

    const handleGoogleLogin = () => {
        window.location.href = `${API_URL}/auth/login/google`;
    };

    const handleChange = (prop) => (event) => {
        setValues({ ...values, [prop]: event.target.value });
    };

    const handleClickShowPassword = () => {
        setShowPassword((show) => !show);
    };

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    return (
        <div>
            {/* Alert flotante */}
            {error && (
                <Box
                    sx={{
                        position: 'fixed',
                        top: 20,
                        right: 20,
                        zIndex: 9999,
                    }}
                >
                    <Alert
                        severity="error"
                        variant="filled"
                        onClose={() => setError(false)}
                        sx={{
                            color: 'black',
                            backgroundColor: '#f44336',
                        }}
                    >
                        {error}
                    </Alert>
                </Box>
            )}

            {/* Contenedor principal */}
            <Box
                sx={{
                    height: '100vh',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                }}
            >
                <Paper
                    elevation={8}
                    sx={{
                        width: 600,
                        minHeight: 700,
                        backgroundColor: 'transparent',
                        backdropFilter: 'blur(10px)',
                        padding: 3,
                    }}
                >
                    {/* Titulo */}
                    <div className='auth-Title'>
                        <h1>GamifyPy</h1>
                    </div>

                    {/* Texto de bienvenida */}
                    <Typography
                        variant="h6"
                        sx={{
                            textAlign: 'center',
                            color: 'white',
                            mt: 4,
                            mb: 2,
                            fontWeight: 300,
                        }}
                    >
                        ¡Bienvenido de regreso!
                    </Typography>

                    <Typography
                        variant="body2"
                        sx={{
                            textAlign: 'center',
                            color: 'rgba(255, 255, 255, 0.7)',
                            mb: 2,
                        }}
                    >
                        Ingresa tus credenciales para acceder a tu cuenta
                    </Typography>

                    {/* Formulario */}
                    <Box
                        component="form"
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            mt: 3,
                            '& .MuiTextField-root': {
                                m: 2,
                                width: '30ch',
                            },
                        }}
                        noValidate
                        autoComplete="off"
                    >
                        <TextField
                            id="email"
                            label="Correo Electrónico"
                            variant="standard"
                            value={values.email}
                            onChange={handleChange('email')}
                            InputLabelProps={{
                                sx: {
                                    color: 'white',
                                    '&.Mui-focused': {
                                        color: 'white',
                                    },
                                },
                            }}
                            InputProps={{
                                sx: {
                                    color: 'white',
                                    '&:before': {
                                        borderBottomColor: 'rgba(255, 255, 255, 0.42)',
                                    },
                                    '&:hover:not(.Mui-disabled):before': {
                                        borderBottomColor: 'rgba(255, 255, 255, 0.87)',
                                    },
                                    '&:after': {
                                        borderBottomColor: 'white',
                                    },
                                },
                            }}
                        />
                        <TextField
                            id="password"
                            label="Contraseña"
                            variant="standard"
                            type={showPassword ? 'text' : 'password'}
                            value={values.password}
                            onChange={handleChange('password')}
                            InputProps={{
                                sx: {
                                    color: 'white',
                                    '&:before': {
                                        borderBottomColor: 'rgba(255, 255, 255, 0.42)',
                                    },
                                    '&:hover:not(.Mui-disabled):before': {
                                        borderBottomColor: 'rgba(255, 255, 255, 0.87)',
                                    },
                                    '&:after': {
                                        borderBottomColor: 'white',
                                    },
                                },
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <IconButton
                                            aria-label={
                                                showPassword ? 'Ocultar contraseña' : 'Mostrar contraseña'
                                            }
                                            onClick={handleClickShowPassword}
                                            onMouseDown={handleMouseDownPassword}
                                            sx={{ color: 'white' }}
                                        >
                                            {showPassword ? <VisibilityOff /> : <Visibility />}
                                        </IconButton>
                                    </InputAdornment>
                                ),
                            }}
                            InputLabelProps={{
                                sx: {
                                    color: 'white',
                                    '&.Mui-focused': {
                                        color: 'white',
                                    },
                                },
                            }}
                        />

                        {/* Botón de Iniciar Sesión */}
                        <Button
                            variant="contained"
                            sx={{
                                mt: 3,
                                mb: 1,
                                width: '40ch',
                                backgroundColor: 'rgba(255, 255, 255, 0.2)',
                                backdropFilter: 'blur(10px)',
                                color: 'white',
                                border: '1px solid rgba(255, 255, 255, 0.3)',
                                '&:hover': {
                                    backgroundColor: 'rgba(255, 255, 255, 0.3)',
                                },
                            }}
                            onClick={handleLogin}
                        >
                            Iniciar Sesión
                        </Button>

                        {/* Divider */}
                        <Box sx={{ width: '30ch', my: 2 }}>
                            <Divider sx={{ color: 'rgba(255, 255, 255, 0.5)' }}>
                                <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.7)' }}>
                                    o
                                </Typography>
                            </Divider>
                        </Box>

                        {/* Botón de Google */}
                        <Button
                            variant="outlined"
                            startIcon={<GoogleIcon />}
                            sx={{
                                mt: 1,
                                mb: 1,
                                width: '40ch',
                                color: 'white',
                                borderColor: 'rgba(255, 255, 255, 0.5)',
                                backgroundColor: 'rgba(255, 255, 255, 0.1)',
                                '&:hover': {
                                    borderColor: 'rgba(255, 255, 255, 0.8)',
                                    backgroundColor: 'rgba(255, 255, 255, 0.2)',
                                },
                            }}
                            onClick={handleGoogleLogin}
                        >
                            Continuar con Google
                        </Button>

                        {/* Botón de Invitado */}
                        <Button
                            variant="text"
                            startIcon={guestLoading ? <CircularProgress size={18} sx={{ color: 'white' }} /> : <PersonOutlineIcon />}
                            disabled={guestLoading}
                            sx={{
                                mt: 0,
                                mb: guestLoading ? 1 : 3,
                                width: '40ch',
                                color: 'rgba(255, 255, 255, 0.85)',
                                '&:hover': {
                                    backgroundColor: 'rgba(255, 255, 255, 0.1)',
                                },
                                '&.Mui-disabled': {
                                    color: 'rgba(255, 255, 255, 0.6)',
                                },
                            }}
                            onClick={handleGuestLogin}
                        >
                            {guestLoading ? 'Preparando la demo...' : 'Probar como invitado'}
                        </Button>
                        {guestLoading && (
                            <Typography
                                variant="caption"
                                sx={{ color: 'rgba(255, 255, 255, 0.6)', mb: 3, textAlign: 'center' }}
                            >
                                El servidor puede tardar hasta 1 minuto en despertar la primera vez.
                            </Typography>
                        )}

                        {/* Enlaces inferiores */}
                        <Box sx={{ textAlign: 'center' }}>
                            <Typography
                                variant="body2"
                                sx={{
                                    color: 'rgba(255, 255, 255, 0.8)',
                                    cursor: 'pointer',
                                    mb: 1,
                                    '&:hover': {
                                        color: 'white',
                                        textDecoration: 'underline',
                                    },
                                }}
                                onClick={() => openResetDialog()}
                            >
                                ¿Olvidaste tu contraseña?
                            </Typography>
                            <ResetPassword
                                open={openResetPassword}
                                handleClose={closeResetDialog}
                            />

                            <Typography
                                variant="body2"
                                sx={{
                                    color: 'rgba(255, 255, 255, 0.7)',
                                }}
                            >
                                ¿No tienes cuenta?{' '}
                                <span
                                    style={{
                                        color: 'white',
                                        cursor: 'pointer',
                                        textDecoration: 'underline',
                                    }}
                                    onClick={handleRegister}
                                >
                                    Regístrate
                                </span>
                            </Typography>
                        </Box>
                    </Box>
                </Paper>
            </Box>
        </div>
    )
}

export default Auth;
