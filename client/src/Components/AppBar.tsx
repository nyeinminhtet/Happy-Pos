import React, { useState } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import {
  Divider,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import { Link } from "react-router-dom";
import LunchDiningIcon from "@mui/icons-material/LunchDining";
import LocalDiningIcon from "@mui/icons-material/LocalDining";
import SettingsIcon from "@mui/icons-material/Settings";
import ClassIcon from "@mui/icons-material/Class";
import CategoryIcon from "@mui/icons-material/Category";

const sidebarMenuItems = [
  { id: 1, label: "Menus", icon: <LocalDiningIcon />, route: "/menus" },
  {
    id: 2,
    label: "Menu Categories",
    icon: <CategoryIcon />,
    route: "/menu_categories",
  },
  { id: 3, label: "Addons", icon: <LunchDiningIcon />, route: "/addons" },
  {
    id: 4,
    label: "Addon Categories",
    icon: <ClassIcon />,
    route: "/addon_categories",
  },
  { id: 5, label: "Settings", icon: <SettingsIcon />, route: "/settings" },
];

const MenuAppBar = () => {
  const [showNavigation, setShowNavigation] = useState(false);

  const pageTitle = sidebarMenuItems.find(
    (item) => item.route === window.location.pathname
  )?.label;
  return (
    <Box>
      <AppBar position="static">
        <Toolbar
          sx={{
            display: "flex",
            alignItems: "center",
          }}
        >
          <IconButton
            size="large"
            edge="start"
            aria-label="menu"
            onClick={() => setShowNavigation((prev) => !prev)}
          >
            <MenuIcon htmlColor="white" fontSize="large" />
          </IconButton>
          <h2 style={{ margin: "0 auto" }}>
            {pageTitle ? pageTitle : "အဝ စားမယ် "}
          </h2>
        </Toolbar>
      </AppBar>
      <Drawer
        anchor="left"
        open={showNavigation}
        onClose={() => setShowNavigation(false)}
        disablePortal
      >
        <List>
          {sidebarMenuItems.slice(0, 4).map((item) => (
            <Link
              key={item.id}
              to={item.route}
              style={{ textDecoration: "none", color: "#313131" }}
            >
              <ListItem disablePadding>
                <ListItemButton>
                  <ListItemIcon>{item.icon}</ListItemIcon>
                  <ListItemText primary={item.label} />
                </ListItemButton>
              </ListItem>
            </Link>
          ))}
        </List>
        <Divider />
        <List>
          {sidebarMenuItems.slice(-1).map((item) => (
            <Link
              key={item.id}
              to={item.route}
              style={{ textDecoration: "none", color: "#313131" }}
            >
              <ListItem disablePadding>
                <ListItemButton>
                  <ListItemIcon>{item.icon}</ListItemIcon>
                  <ListItemText primary={item.label} />
                </ListItemButton>
              </ListItem>
            </Link>
          ))}
        </List>
      </Drawer>
    </Box>
  );
};
export default MenuAppBar;
