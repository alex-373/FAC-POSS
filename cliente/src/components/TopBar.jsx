// src/components/TopBar.jsx
import React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import Avatar from "@mui/material/Avatar";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Divider from "@mui/material/Divider";
import Box from "@mui/material/Box";
import MenuIcon from "@mui/icons-material/Menu";
import PersonIcon from "@mui/icons-material/Person";
import SettingsIcon from "@mui/icons-material/Settings";
import LogoutIcon from "@mui/icons-material/Logout";

export default function TopBar({ userName, profilePicUrl, onLogout, onMenuClick }) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleMenuOpen = (e) => setAnchorEl(e.currentTarget);
  const handleMenuClose = () => setAnchorEl(null);

  return (
    <AppBar position="fixed" sx={{ bgcolor: "background.paper", color: "text.primary", boxShadow: 1 }}>
      <Toolbar sx={{ justifyContent: "space-between", minHeight: 64 }}>
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          {/* Botón de menú: visible en pantallas pequeñas */}
          <IconButton
            edge="start"
            color="inherit"
            aria-label="menu"
            onClick={onMenuClick}
            sx={{ mr: 1, display: { md: "none" } }}
          >
            <MenuIcon />
          </IconButton>

          <Typography variant="h6" noWrap sx={{ fontWeight: "bold", color: "primary.main" }}>
            Mi Aplicación
          </Typography>
        </Box>

        <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
          <Typography variant="body1" sx={{ display: { xs: "none", sm: "block" } }}>
            {userName || "Invitado"}
          </Typography>

          <IconButton onClick={handleMenuOpen} size="small" aria-controls={open ? "account-menu" : undefined}>
            <Avatar src={profilePicUrl} sx={{ width: 40, height: 40, bgcolor: "primary.light" }}>
              <PersonIcon />
            </Avatar>
          </IconButton>

          <Menu
            id="account-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleMenuClose}
            PaperProps={{ elevation: 3, sx: { mt: 1.5, minWidth: 180, borderRadius: 2 } }}
            transformOrigin={{ horizontal: "right", vertical: "top" }}
            anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
          >
            <MenuItem onClick={handleMenuClose}>
              <PersonIcon fontSize="small" sx={{ mr: 1 }} /> Ver perfil
            </MenuItem>
            <MenuItem onClick={handleMenuClose}>
              <SettingsIcon fontSize="small" sx={{ mr: 1 }} /> Configuración
            </MenuItem>
            <Divider />
            <MenuItem onClick={() => { handleMenuClose(); if (onLogout) onLogout(); }}>
              <LogoutIcon fontSize="small" sx={{ mr: 1, color: "error.main" }} /> Cerrar sesión
            </MenuItem>
          </Menu>
        </Box>
      </Toolbar>
    </AppBar>
  );
}
