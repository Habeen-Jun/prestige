import { Link } from "react-router-dom";
import { useState } from "react";

import { styled } from "@mui/material/styles";
import { Box, Typography, Tooltip } from "@mui/material";

import MuiDrawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";

import Divider from "@mui/material/Divider";
import MenuList from "@mui/material/MenuList";
import MenuItem from "@mui/material/MenuItem";
import Fade from "@mui/material/Fade";

import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

import { PiSignOutDuotone } from "react-icons/pi";
import { PiUserListDuotone } from "react-icons/pi";
import { PiPresentationDuotone } from "react-icons/pi";
import { PiQuestionDuotone } from "react-icons/pi";
import { supabase } from "../hooks/supabase";


const drawerWidth = 240;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(10)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(10)} + 1px)`,
  },
});

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",

  ".MuiDrawer-paper": {
    borderRight: "1px dashed lightgrey",
  },

  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
    ".toggle-button": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
    ".toggle-button": closedMixin(theme),
  }),
}));

const SidebarItem = ({ open, title, icon, route, onClick }) => {
  return (
    <StyledMenuItem
      component={Link}
      to={route}
      selected={window.location.pathname.includes(route)}
      onClick={onClick}
      open={open}
    >
      <Tooltip
        title={title}
        arrow
        placement="right"
        disableInteractive
        sx={{ backgroundColor: "white", color: "black" }}
      >
        <ListItemIcon className="menu-icon" sx={{ fontSize: 25 }}>
          {icon}
        </ListItemIcon>
      </Tooltip>
      <Fade in={open} timeout={100}>
        <ListItemText
          primary={title}
          sx={{ opacity: open ? 1 : 0, transition: "opacity 0.5s ease" }}
        />
      </Fade>
    </StyledMenuItem>
  );
};

const SideNavBar = () => {
  const [open, setOpen] = useState(false);

  const handleToggle = () => {
    setOpen(!open);
  };

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut()
  }

  return (
    <>
      <Drawer variant="permanent" open={open}>
        <Box
          className="toggle-button"
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "flex-end",
            mt: "35px",
            position: "fixed",
            zIndex: 1101,
            left: "13px",
          }}
        >
          <IconButton
            onClick={handleToggle}
            sx={{
              width: "1.5rem",
              height: "1.5rem",
              border: "1px dashed lightgrey",
              background: "white",
            }}
          >
            {open ? (
              <ArrowBackIosNewIcon sx={{ fontSize: "0.7rem" }} />
            ) : (
              <ArrowForwardIosIcon sx={{ fontSize: "0.7rem" }} />
            )}
          </IconButton>
        </Box>
        <MenuList
          sx={{
            width: "15rem",
            padding: "1rem",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            height: "100%",
          }}
        >
          <Box sx={{ mt: "20px" }}>
            <DashboardTitle open={open} sx={{ ml: 0.7, mb: 3 }}>
                ADMIN
            </DashboardTitle>
            <SidebarItem
                open={open}
                title="Users"
                icon={<PiUserListDuotone />}
                route="/adminuser"
            />
            <SidebarItem
              open={open}
              title="Problem"
              icon={<PiQuestionDuotone />}
              route="dashboard/problem"
            />
            <SidebarItem
              open={open}
              title="Test"
              icon={<PiPresentationDuotone />}
              route="dashboard/test"
            />
          </Box>
          <Box>
            <Divider sx={{ m: "10px 0px" }} />
            <SidebarItem
              open={open}
              title="Log Out"
              icon={<PiSignOutDuotone />}
              onClick={handleLogout}
            />
          </Box>
        </MenuList>
      </Drawer>
    </>
  );
};

const StyledMenuItem = styled(MenuItem)(({ theme, open }) => ({
  color: "grey",
  borderRadius: "0.5rem",
  padding: "0.8rem 2.5rem 0.8rem 1rem",
  marginBottom: "10px",
  width: open ? "100%" : theme.spacing(7),
  transition: "width 0.2s ease", // Smoothly transition the width
  overflow: "hidden",

  "&.Mui-selected": {
    color: "var(--green)",
    ".menu-icon": {
      color: "var(--green)",
    },
  },
}));

const DashboardTitle = styled(Typography)(({ theme, open }) => ({
  color: "grey",
  fontWeight: "bold",
  marginBottom: "0.4rem",
  fontSize: "0.8rem",
  wordSpacing: "5px",
  width: open ? "100%" : theme.spacing(7),
  transition: "width 0.2s ease",
  overflow: "hidden",
}));


export default SideNavBar;