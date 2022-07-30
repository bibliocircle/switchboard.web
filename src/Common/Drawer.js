import React from "react";
import { styled } from "@mui/material/styles";
import MuiDrawer from "@mui/material/Drawer";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import ListSubheader from "@mui/material/ListSubheader";
import DashboardIcon from "@mui/icons-material/Dashboard";
import WorkspacesIcon from "@mui/icons-material/Workspaces";
import PeopleIcon from "@mui/icons-material/People";
import HandymanIcon from '@mui/icons-material/Handyman';
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import MiscellaneousServicesIcon from "@mui/icons-material/MiscellaneousServices";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useQuery } from "@apollo/client";
import { GET_USER_WORKSPACES } from "../gql/queries/workspaces";
import { LOGGED_IN_USER_SELECTOR } from "../store/slices/user";

export const drawerWidth = 240;

const StyledDrawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  "& .MuiDrawer-paper": {
    position: "relative",
    whiteSpace: "nowrap",
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    boxSizing: "border-box",
    ...(!open && {
      overflowX: "hidden",
      transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      width: theme.spacing(7),
      [theme.breakpoints.up("sm")]: {
        width: theme.spacing(9),
      },
    }),
  },
}));

export default function Drawer({ open, toggleDrawer }) {
  const user = useSelector(LOGGED_IN_USER_SELECTOR);
  const { loading, error, data } = useQuery(GET_USER_WORKSPACES, {
    skip: !user,
  });

  return (
    <StyledDrawer variant="permanent" open={open}>
      <Toolbar
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "flex-end",
          px: [1],
        }}
      >
        <IconButton onClick={toggleDrawer}>
          <ChevronLeftIcon />
        </IconButton>
      </Toolbar>
      <Divider />
      <List component="nav">
        <ListItemButton component={Link} to="/">
          <ListItemIcon>
            <DashboardIcon />
          </ListItemIcon>
          <ListItemText primary="Dashboard" />
        </ListItemButton>
        <ListItemButton component={Link} to="/mockservices">
          <ListItemIcon>
            <MiscellaneousServicesIcon />
          </ListItemIcon>
          <ListItemText primary="Templates" />
        </ListItemButton>
        <ListItemButton component={Link} to="/workspaces">
          <ListItemIcon>
            <WorkspacesIcon />
          </ListItemIcon>
          <ListItemText primary="All Workspaces" />
        </ListItemButton>
        <ListItemButton component={Link} to="/users">
          <ListItemIcon>
            <PeopleIcon />
          </ListItemIcon>
          <ListItemText primary="Users" />
        </ListItemButton>
        <Divider sx={{ my: 1 }} />
        {user && (
          <React.Fragment>
            <ListSubheader component="div" inset>
              Your Workspaces
            </ListSubheader>
            {data?.userWorkspaces?.map((ws) => (
              <ListItemButton key={ws.id} component={Link} to={`/workspace/${ws.id}`}>
                <ListItemIcon>
                  <HandymanIcon />
                </ListItemIcon>
                <ListItemText primary={ws.name} />
              </ListItemButton>
            ))}
          </React.Fragment>
        )}
      </List>
    </StyledDrawer>
  );
}
