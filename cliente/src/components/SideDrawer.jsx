// src/components/SideDrawer.jsx
import React from "react";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Collapse from "@mui/material/Collapse";
import Divider from "@mui/material/Divider";
import Toolbar from "@mui/material/Toolbar";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";

import DashboardIcon from "@mui/icons-material/Dashboard";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import PeopleIcon from "@mui/icons-material/People";
import Inventory2Icon from "@mui/icons-material/Inventory2";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import SettingsIcon from "@mui/icons-material/Settings";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";

const defaultWidth = 240;

export default function SideDrawer({ mobileOpen = false, onMobileClose = () => {}, drawerWidth = defaultWidth, onNavigate }) {
  const theme = useTheme();
  const mdUp = useMediaQuery(theme.breakpoints.up("md"));

  const [openVentas, setOpenVentas] = React.useState(false);
  const [openClientes, setOpenClientes] = React.useState(false);
  const [openProveedores, setOpenProveedores] = React.useState(false);
  const [openInventario, setOpenInventario] = React.useState(false);

  // Toggle para los headers (stopPropagation evita cierres inesperados en mobile)
  const handleToggle = (setter) => (e) => {
    e.stopPropagation();
    setter((s) => !s);
  };

  // Sub-item click: navegacion opcional y cierre en mobile
  const handleSubItemClick = (path) => (e) => {
    e.stopPropagation();
    // Si te pasaron onNavigate (p. ej. navigate de react-router), llámalo
    if (typeof onNavigate === "function") {
      onNavigate(path);
    } else {
      // fallback: solo registro (el usuario puede reemplazar por navigate)
      // console.log("Navigate to", path);
    }
    // Si está en modo móvil (temporary), cerramos el Drawer
    if (!mdUp) {
      onMobileClose();
    }
  };

  const content = (
    <div>
      <Toolbar />
      <Divider />
      <List>
        <ListItem disablePadding>
          <ListItemButton onClick={() => { if (!mdUp) onMobileClose(); /* opcional: navegar al dashboard */ }}>
            <ListItemIcon><DashboardIcon /></ListItemIcon>
            <ListItemText primary="Dashboard" />
          </ListItemButton>
        </ListItem>

        {/* VENTAS */}
        <ListItem disablePadding>
          <ListItemButton onClick={handleToggle(setOpenVentas)} aria-expanded={openVentas}>
            <ListItemIcon><ShoppingCartIcon /></ListItemIcon>
            <ListItemText primary="Ventas" />
            {openVentas ? <ExpandLess /> : <ExpandMore />}
          </ListItemButton>
        </ListItem>
        <Collapse in={openVentas} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <ListItem disablePadding>
              <ListItemButton sx={{ pl: 4 }} onClick={handleSubItemClick("/ventas/crear")}>Crear Venta</ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton sx={{ pl: 4 }} onClick={handleSubItemClick("/ventas/historial")}>Historial de Ventas</ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton sx={{ pl: 4 }} onClick={handleSubItemClick("/ventas/opciones")}>Opciones de Venta</ListItemButton>
            </ListItem>
          </List>
        </Collapse>

        {/* CLIENTES */}
        <ListItem disablePadding>
          <ListItemButton onClick={handleToggle(setOpenClientes)} aria-expanded={openClientes}>
            <ListItemIcon><PeopleIcon /></ListItemIcon>
            <ListItemText primary="Clientes" />
            {openClientes ? <ExpandLess /> : <ExpandMore />}
          </ListItemButton>
        </ListItem>
        <Collapse in={openClientes} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <ListItem disablePadding>
              <ListItemButton sx={{ pl: 4 }} onClick={handleSubItemClick("/clientes/ver")}>Ver Clientes</ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton sx={{ pl: 4 }} onClick={handleSubItemClick("/clientes/crear")}>Crear / Editar</ListItemButton>
            </ListItem>
          </List>
        </Collapse>

        {/* PROVEEDORES */}
        <ListItem disablePadding>
          <ListItemButton onClick={handleToggle(setOpenProveedores)} aria-expanded={openProveedores}>
            <ListItemIcon><LocalShippingIcon /></ListItemIcon>
            <ListItemText primary="Proveedores" />
            {openProveedores ? <ExpandLess /> : <ExpandMore />}
          </ListItemButton>
        </ListItem>
        <Collapse in={openProveedores} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <ListItem disablePadding>
              <ListItemButton sx={{ pl: 4 }} onClick={handleSubItemClick("/proveedores/ver")}>Ver Proveedores</ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton sx={{ pl: 4 }} onClick={handleSubItemClick("/proveedores/editar")}>Editar Proveedores</ListItemButton>
            </ListItem>
          </List>
        </Collapse>

        {/* INVENTARIO */}
        <ListItem disablePadding>
          <ListItemButton onClick={handleToggle(setOpenInventario)} aria-expanded={openInventario}>
            <ListItemIcon><Inventory2Icon /></ListItemIcon>
            <ListItemText primary="Inventario" />
            {openInventario ? <ExpandLess /> : <ExpandMore />}
          </ListItemButton>
        </ListItem>
        <Collapse in={openInventario} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <ListItem disablePadding>
              <ListItemButton sx={{ pl: 4 }} onClick={handleSubItemClick("/inventario/ver")}>Ver Inventario</ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton sx={{ pl: 4 }} onClick={handleSubItemClick("/inventario/editar")}>Editar Inventario</ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton sx={{ pl: 4 }} onClick={handleSubItemClick("/inventario/historial")}>Historial Inventario</ListItemButton>
            </ListItem>
          </List>
        </Collapse>

        <Divider sx={{ my: 1 }} />

        <ListItem disablePadding>
          <ListItemButton onClick={handleSubItemClick("/configuracion")}>
            <ListItemIcon><SettingsIcon /></ListItemIcon>
            <ListItemText primary="Configuración" />
          </ListItemButton>
        </ListItem>
      </List>
    </div>
  );

  // permanent on mdUp, temporary on small screens
  return mdUp ? (
    <Drawer
      variant="permanent"
      open
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        "& .MuiDrawer-paper": { width: drawerWidth, boxSizing: "border-box" },
      }}
    >
      {content}
    </Drawer>
  ) : (
    <Drawer
      variant="temporary"
      open={Boolean(mobileOpen)}
      onClose={onMobileClose}
      ModalProps={{ keepMounted: true }}
      sx={{
        "& .MuiDrawer-paper": { width: drawerWidth, boxSizing: "border-box" },
      }}
    >
      {content}
    </Drawer>
  );
}
