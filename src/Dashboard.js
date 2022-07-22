import React, { useEffect } from "react";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Container from "@mui/material/Container";
import { useDispatch, useSelector } from "react-redux";
import { loginCompleted } from "./store/slices/user";
import NavBar from "./Common/NavBar";
import Drawer from "./Common/Drawer";
import { Typography } from "@mui/material";

export default function Dashboard({ onToggleColourMode, currentTheme }) {
  const [open, setOpen] = React.useState(true);
  const user = useSelector((s) => s.user);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(loginCompleted({ name: "foo" }));
  }, [dispatch]);
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
            currentTheme.palette.mode === "light"
              ? currentTheme.palette.grey[100]
              : currentTheme.palette.grey[900],
          flexGrow: 1,
          height: "100vh",
          overflow: "auto",
        }}
      >
        <Toolbar />
        <Container maxWidth="xl" sx={{ mt: 4, mb: 4 }}>
          <Typography variant="h6">{user.name}</Typography>
          <Typography variant="body1">{currentTheme.palette.text.primary}</Typography>
        </Container>
      </Box>
    </Box>
  );
}
