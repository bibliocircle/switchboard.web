import React from "react";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Container from "@mui/material/Container";
import NavBar from "./Common/NavBar";
import Drawer from "./Common/Drawer";
import { Outlet } from "react-router-dom";
import { Grid } from "@mui/material";
import { LIGHT_THEME } from "./theme";

export default function Home({ onToggleColourMode, currentTheme }) {
  const [open, setOpen] = React.useState(true);
  const toggleDrawer = () => {
    setOpen(!open);
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
        <Grid container justifyContent="center" sx={{mt: 4, mb: 4 }}>
          <Grid item xs={12} lg={10}>
          {<Outlet />}
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}
