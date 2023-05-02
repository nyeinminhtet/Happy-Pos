import React, { useContext, useState } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
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
import { MenuContent } from "../Contents/Menu_Contents";
import FastfoodIcon from "@mui/icons-material/Fastfood";

const sidebarMenuItems = [
  { id: 1, label: "Orders", icon: <FastfoodIcon />, route: "/orders" },
  { id: 2, label: "Menus", icon: <LocalDiningIcon />, route: "/menus" },
  {
    id: 3,
    label: "Menu Categories",
    icon: <CategoryIcon />,
    route: "/menu_categories",
  },
  { id: 4, label: "Addons", icon: <LunchDiningIcon />, route: "/addons" },
  {
    id: 5,
    label: "Addon Categories",
    icon: <ClassIcon />,
    route: "/addon_categories",
  },
  { id: 6, label: "Settings", icon: <SettingsIcon />, route: "/settings" },
];

interface Props {
  title?: string;
}

const MenuAppBar = ({ title }: Props) => {
  const [showNavigation, setShowNavigation] = useState(false);
  const { accessToken, locations } = useContext(MenuContent);
  const selectedLocationId = localStorage.getItem("locationId");
  const selectedLocation = locations.find(
    (location) => String(location.id) === selectedLocationId
  );
  return (
    <Box>
      <AppBar position="static">
        <Toolbar
          sx={{
            display: "flex",
            alignItems: "center",
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <IconButton
              size="large"
              edge="start"
              aria-label="menu"
              onClick={() => setShowNavigation((prev) => !prev)}
            >
              <MenuIcon htmlColor="white" fontSize="large" />
            </IconButton>
            <h2 style={{ fontSize: "1.2rem", marginLeft: "10px" }}>
              {selectedLocation ? selectedLocation.name : ""}
            </h2>
          </Box>
          <h2 style={{ margin: "0 auto" }}>{title ? title : "အဝ စားမယ် "}</h2>
          <Link
            to={accessToken ? "/logout" : "/login"}
            style={{ textDecoration: "none" }}
          >
            <Button variant="outlined" sx={{ color: "white" }}>
              {accessToken ? "Log out" : "Login"}
            </Button>
          </Link>
        </Toolbar>
      </AppBar>
      <Drawer
        anchor="left"
        open={showNavigation}
        onClose={() => setShowNavigation(false)}
        disablePortal
      >
        <List>
          {sidebarMenuItems.slice(0, 5).map((item) => (
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
