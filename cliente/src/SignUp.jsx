import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import {
    Avatar,
    Button,
    TextField,
    Link,
    Paper,
    Box,
    Grid,
    Typography,
    CssBaseline,
    Alert,
    CircularProgress,
    InputAdornment,
    IconButton,
} from '@mui/material';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

export default function SignUp() {
    const navigate = useNavigate();
    const [formData, setFormData] = React.useState({
        username: '',
        email: '',
        password: ''
    });
    const [showPassword, setShowPassword] = React.useState(false);
    const [loading, setLoading] = React.useState(false);
    const [error, setError] = React.useState('');

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        setError('');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validaciones
        if (formData.username.length < 3) {
            setError('El usuario debe tener al menos 3 caracteres');
            return;
        }

        if (formData.password.length < 6) {
            setError('La contraseña debe tener al menos 6 caracteres');
            return;
        }

        setLoading(true);

        try {
            const response = await axios.post(
                'http://localhost:5000/api/auth/register',
                formData
            );

            if (response.data.success) {
                localStorage.setItem('authToken', response.data.token);
                localStorage.setItem('username', response.data.user.username);
                navigate('/');
            }
        } catch (err) {
            setError(err.response?.data?.message || 'Error al crear la cuenta');
        } finally {
            setLoading(false);
        }
    };

    return (
        <Grid
            container
            component="main"
            sx={{
                height: '100vh',
                background: 'url(/fondologin.png)',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat'
            }}
        >
            <CssBaseline />
            <Grid
                item
                xs={11}
                sm={8}
                md={5}
                lg={4}
                xl={3}
                component={Paper}
                elevation={10}
                sx={{
                    p: 2,           // Padding reducido
                    m: 'auto',
                    borderRadius: 3,
                    maxWidth: '450px'  // Ancho máximo fijo
                }}
            >
                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <Avatar sx={{ m: 1, bgcolor: 'secondary.main', width: 56, height: 56 }}>
                        <PersonAddIcon fontSize="large" />
                    </Avatar>
                    <Typography component="h1" variant="h5" fontWeight="bold">
                        Crear Cuenta
                    </Typography>

                    {error && (
                        <Alert severity="error" sx={{ mt: 2, width: '100%' }}>
                            {error}
                        </Alert>
                    )}

                    <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2, width: '70%' }}>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            size="small"
                            label="Usuario"
                            name="username"
                            autoFocus
                            value={formData.username}
                            onChange={handleChange}
                            disabled={loading}
                            inputProps={{ minLength: 3 }}
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth

                            size="small"
                            label="Email"
                            name="email"
                            type="email"
                            value={formData.email}
                            onChange={handleChange}
                            disabled={loading}
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            size="small"
                            label="Contraseña"
                            name="password"
                            type={showPassword ? 'text' : 'password'}
                            value={formData.password}
                            onChange={handleChange}
                            disabled={loading}
                            inputProps={{ minLength: 6 }}
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <IconButton onClick={() => setShowPassword(!showPassword)}>
                                            {showPassword ? <VisibilityOff /> : <Visibility />}
                                        </IconButton>
                                    </InputAdornment>
                                ),
                            }}
                        />
                        <Button
                            type="submit"
                            fullWidth
                            size="small"
                            variant="contained"
                            disabled={loading}
                            sx={{ mt: 3, mb: 2, py: 1.5 }}
                        >
                            {loading ? <CircularProgress size={24} /> : 'Crear Cuenta'}
                        </Button>
                        <Grid container justifyContent="center">
                            <Link href="/login" variant="body2">
                                ¿Ya tienes cuenta? Inicia sesión
                            </Link>
                        </Grid>
                    </Box>
                </Box>
            </Grid>
        </Grid>
    );
}