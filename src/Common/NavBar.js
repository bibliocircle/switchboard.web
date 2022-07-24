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
import { drawerWidth } from "./Drawer";
import { useSelector } from "react-redux";
import { getUserFullName } from "../utils/strings";
import { DARK_THEME } from "../theme";
import { Logout } from "@mui/icons-material";

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
  const user = useSelector((s) => s.user.loggedInUser);
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
          color={(theme) =>
            theme.palette.mode === DARK_THEME
              ? theme.palette.getContrastText(theme.palette.background.paper)
              : theme.palette.background.paper
          }
          noWrap
          sx={{ flexGrow: 1 }}
        >
          Switchboard
        </Typography>
        <IconButton color="inherit" onClick={onToggleColourMode}>
          {currentTheme.palette.mode === "dark" ? (
            <Tooltip title="Switch to Light Mode">
              <LightModeIcon
                sx={{
                  color: (theme) =>
                    theme.palette.getContrastText(
                      theme.palette.background.paper
                    ),
                }}
              />
            </Tooltip>
          ) : (
            <Tooltip title="Switch to Dark Mode">
              <DarkModeIcon
                sx={{ color: (theme) => theme.palette.text.primary }}
              />
            </Tooltip>
          )}
        </IconButton>
        <Button endIcon={<Logout />} variant="text" sx={{ color: "#000" }}>
           {getUserFullName({
            firstName: user?.firstName,
            lastName: user?.lastName,
          })} · Log out
        </Button>
      </Toolbar>
    </AppBar>
  );
}
