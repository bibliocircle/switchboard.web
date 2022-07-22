import React from "react";
import { styled } from "@mui/material/styles";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";
import { Button, Tooltip } from "@mui/material";
import { grey } from "@mui/material/colors";
import { drawerWidth } from "./Drawer";

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  background: theme.palette.mojito,
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

export default function NavBar({
  toggleDrawer,
  open,
  onToggleColourMode,
  currentTheme,
}) {
  return (
    <AppBar position="absolute" open={open}>
      <Toolbar
        sx={{
          pr: "24px", // keep right padding when drawer closed
        }}
      >
        <IconButton
          edge="start"
          color="inherit"
          aria-label="open drawer"
          onClick={toggleDrawer}
          sx={{
            marginRight: "36px",
            ...(open && { display: "none" }),
          }}
        >
          <MenuIcon />
        </IconButton>
        <Typography
          component="h1"
          variant="h6"
          color="inherit"
          noWrap
          sx={{ flexGrow: 1 }}
        >
          Switchboard
        </Typography>
        <IconButton color="inherit" onClick={onToggleColourMode}>
          {currentTheme.palette.mode === "dark" ? (
            <Tooltip title="Switch to Light Mode">
              <LightModeIcon sx={{ color: grey[700]}}/>
            </Tooltip>
          ) : (
            <Tooltip title="Switch to Dark Mode">
              <DarkModeIcon sx={{ color: grey[700]}}/>
            </Tooltip>
          )}
        </IconButton>
        <Button variant="text" sx={{ color: "#000"}}>
          Log out
        </Button>
      </Toolbar>
    </AppBar>
  );
}
