// src/Login.jsx
import React, { useState } from "react";
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
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function Login() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({ username: "", password: "" });
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        setError("");
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const response = await axios.post("http://localhost:3000/api/auth/login", formData);

            if (response.data.success) {
                localStorage.setItem("authToken", response.data.token);
                localStorage.setItem("username", response.data.user.username);
                navigate("/");
            }
        } catch (err) {
            setError(err.response?.data?.message || "Credenciales incorrectas");
        } finally {
            setLoading(false);
        }
    };

    return (
        <Grid
            container
            component="main"
            sx={{
                height: "100vh",
                background: 'url(/fondologin.png)',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat'
            }}
        >
            <CssBaseline />
            <Grid
                item
                xs={9}
                sm={5}
                md={3}
                lg={2}
                component={Paper}
                elevation={10}
                sx={{
                    p: 2,           // Padding reducido
                    m: 'auto',
                    borderRadius: 3,
                    maxWidth: '450px'  // Ancho máximo fijo

                }}
            >
                <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                    <Avatar sx={{ m: 1, bgcolor: "primary.main", width: 56, height: 56 }}>
                        <LockOutlinedIcon fontSize="large" />
                    </Avatar>
                    <Typography component="h1" variant="h5" fontWeight="bold">
                        Iniciar Sesión
                    </Typography>

                    {error && <Alert severity="error" sx={{ mt: 2, width: "100%" }}>{error}</Alert>}

                    <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3, width: "100%" }}>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            label="Usuario"
                            name="username"
                            autoFocus
                            value={formData.username}
                            onChange={handleChange}
                            disabled={loading}
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            label="Contraseña"
                            name="password"
                            type={showPassword ? "text" : "password"}
                            value={formData.password}
                            onChange={handleChange}
                            disabled={loading}
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
                        <Button type="submit" fullWidth variant="contained" disabled={loading} sx={{ mt: 3, mb: 2, py: 1.5 }}>
                            {loading ? <CircularProgress size={24} /> : "Entrar"}
                        </Button>
                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={6}>
                                <Link href="#" variant="body2">¿Olvidaste tu contraseña?</Link>
                            </Grid>
                            <Grid item xs={12} sm={6} textAlign={{ sm: "right" }}>
                                <Link href="/signup" variant="body2">Crear cuenta</Link>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
            </Grid>
        </Grid>
    );
}