import React from "react";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import NavBar from "./Common/NavBar";
import Drawer from "./Common/Drawer";
import { Outlet } from "react-router-dom";
import { Alert, Grid, Snackbar } from "@mui/material";
import { LIGHT_THEME } from "./theme";
import { useDispatch, useSelector } from "react-redux";
import { ALERTS_SELECTOR, removeAlert } from "./store/slices/application";

export default function Home({ onToggleColourMode, currentTheme }) {
  const alerts = useSelector(ALERTS_SELECTOR);
  const dispatch = useDispatch();
  const [open, setOpen] = React.useState(true);
  const toggleDrawer = () => {
    setOpen(!open);
  };
  const dismissAlert = (alertId) => {
    dispatch(removeAlert(alertId));
  };

  return (
    <Box sx={{ display: "flex" }}>
      <NavBar
        open={open}
        toggleDrawer={toggleDrawer}
        onToggleColourMode={onToggleColourMode}
        currentTheme={currentTheme}
      />
      <Drawer open={open} toggleDrawer={toggleDrawer} />
      <Box
        component="main"
        sx={{
          backgroundColor:
            currentTheme.palette.mode === LIGHT_THEME
              ? currentTheme.palette.grey[200]
              : currentTheme.palette.grey[800],
          flexGrow: 1,
          height: "100vh",
          overflow: "auto",
        }}
      >
        <Toolbar />
        <Grid container justifyContent="center" sx={{ mt: 4, mb: 4 }}>
          <Grid item xs={12} lg={11}>
            {<Outlet />}
          </Grid>
        </Grid>
        {alerts.map((alert) => (
          <Snackbar
            key={alert.id}
            open
            onClose={() => dismissAlert(alert.id)}
            autoHideDuration={alert.autoHideDuration}
          >
            <Alert severity={alert.type} sx={{ width: "100%" }}>
              {alert.message}
            </Alert>
          </Snackbar>
        ))}
      </Box>
    </Box>
  );
}
