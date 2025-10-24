import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { StyledEngineProvider } from '@mui/material/styles';
import Login from './Login';
import SignUp from './SignUp';
import App from './App';

// Proteger rutas
const ProtectedRoute = ({ children }) => {
    const token = localStorage.getItem('authToken') || sessionStorage.getItem('authToken');
    return token ? children : <Navigate to="/login" />;
};

ReactDOM.createRoot(document.querySelector("#root")).render(
    <React.StrictMode>
        <StyledEngineProvider injectFirst>
            <BrowserRouter>
                <Routes>
                    <Route path="/login" element={<Login />} />
                    <Route path="/signup" element={<SignUp />} />
                    <Route path="/" element={
                        <ProtectedRoute>
                            <App />
                        </ProtectedRoute>
                    } />
                </Routes>
            </BrowserRouter>
        </StyledEngineProvider>
    </React.StrictMode>
);