// src/App.jsx
import React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import TopBar from "./components/TopBar";
import SideDrawer from "./components/SideDrawer";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";

const drawerWidth = 240;

export default function App() {
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const theme = useTheme();
  const mdUp = useMediaQuery(theme.breakpoints.up("md"));

  const handleDrawerToggle = () => {
    setMobileOpen((o) => !o);
  };

  const handleLogout = () => {
    // aquí tu lógica: authService.doLogOut(); navigate('/login');
    console.log("Cerrar sesión");
  };

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <TopBar userName="Alex Arenas" profilePicUrl="" onLogout={handleLogout} onMenuClick={handleDrawerToggle} />
      <SideDrawer mobileOpen={mobileOpen} onMobileClose={handleDrawerToggle} />

      {/* Main content: deja espacio a la izquierda si la pantalla es grande (drawer permanente) */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          mt: "64px", // espacio para AppBar fijo
          ml: { md: `${drawerWidth}px` }, // desliza contenido a la derecha en desktop
        }}
      >
        <Toolbar /> {/* offset extra */}
        <h1>Bienvenido al POS</h1>
        <p>Aquí va tu contenido principal.</p>
      </Box>
    </Box>
  );
}
