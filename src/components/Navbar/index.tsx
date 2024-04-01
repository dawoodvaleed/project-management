import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

import { styled, useTheme, Theme, CSSObject } from "@mui/material/styles";
import {
  Toolbar,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  IconButton,
  Collapse,
  Divider,
  Drawer as MuiDrawer,
  AppBar as MuiAppBar,
  AppBarProps as MuiAppBarProps,
} from "@mui/material";
import {
  Menu,
  ChevronLeft,
  ChevronRight,
  Monitor,
  Groups,
  Logout,
  ExpandLess,
  ExpandMore,
  LocalOffer,
  FiberManualRecord,
} from "@mui/icons-material";

const drawerWidth = 200;

const openedMixin = (theme: Theme): CSSObject => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme: Theme): CSSObject => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

export const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
}));

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})<AppBarProps>(({ theme, open }) => ({
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

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));

const NAVBAR_ROUTES = [
  {
    displayText: "Dashboard",
    route: "/",
    icon: <Monitor />,
  },
  {
    displayText: "Vendors",
    route: "/vendor",
    icon: <Groups />,
  },
  {
    displayText: "Items",
    icon: <LocalOffer />,
    submenuRoutes: [
      {
        displayText: "Items Request",
        route: "/item",
        icon: <FiberManualRecord />,
      },
    ],
  },
  {
    displayText: "Projects",
    icon: <LocalOffer />,
    submenuRoutes: [
      {
        displayText: "Projects",
        route: "/project",
        icon: <FiberManualRecord />,
      },
    ],
  },
];

export const NavBar = () => {
  const navigate = useNavigate();
  const theme = useTheme();

  const [open, setOpen] = useState(true);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const [drawerStateSetting, setDrawerStateSetting] = useState(
    NAVBAR_ROUTES.filter((navRoute) => navRoute.submenuRoutes).map(
      ({ displayText }) => ({
        id: displayText,
        open: false,
      })
    )
  );

  const handleClick = (id: string) => {
    setDrawerStateSetting(
      drawerStateSetting.map((item) =>
        item.id === id ? { ...item, open: !item.open } : item
      )
    );
  };

  return (
    <>
      <AppBar position="fixed" open={open}>
        <Toolbar>
          <IconButton
            color="inherit"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{
              marginRight: 5,
              ...(open && { display: "none" }),
            }}
          >
            <Menu />
          </IconButton>
          <h3>Arch Vision Interior</h3>
        </Toolbar>
      </AppBar>
      <Drawer variant="permanent" open={open}>
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "rtl" ? <ChevronRight /> : <ChevronLeft />}
          </IconButton>
        </DrawerHeader>
        <List>
          {NAVBAR_ROUTES.map(({ displayText, route, icon, submenuRoutes }) => (
            <>
              <ListItem
                key={displayText}
                disablePadding
                sx={{ display: "block" }}
              >
                <ListItemButton
                  onClick={() => {
                    if (!submenuRoutes && route) {
                      navigate(route);
                    } else {
                      handleClick(displayText);
                    }
                  }}
                  sx={{
                    minHeight: 48,
                    justifyContent: open ? "initial" : "center",
                    px: 2.5,
                  }}
                >
                  <ListItemIcon
                    sx={{
                      minWidth: 0,
                      mr: open ? 3 : "auto",
                      justifyContent: "center",
                    }}
                  >
                    {icon}
                  </ListItemIcon>
                  <ListItemText
                    primary={displayText}
                    sx={{ opacity: open ? 1 : 0 }}
                  />
                  {submenuRoutes &&
                    (drawerStateSetting.find((item) => item.id === displayText)
                      ?.open ? (
                      <ExpandLess />
                    ) : (
                      <ExpandMore />
                    ))}
                </ListItemButton>
                {submenuRoutes?.map(
                  ({
                    icon: submenuIcon,
                    displayText: submenuDisplayText,
                    route: submenuRoute,
                  }) => (
                    <Collapse
                      in={
                        drawerStateSetting.find(
                          (item) => item.id === displayText
                        )?.open
                      }
                      timeout="auto"
                      unmountOnExit
                    >
                      <List disablePadding key={submenuDisplayText}>
                        <ListItemButton
                          sx={{
                            minHeight: 48,
                            justifyContent: open ? "initial" : "center",
                            px: 2.5,
                          }}
                          onClick={() => navigate(submenuRoute)}
                        >
                          <ListItemIcon
                            sx={{
                              minWidth: 0,
                              mr: open ? 3 : "auto",
                              justifyContent: "center",
                            }}
                          >
                            {submenuIcon}
                          </ListItemIcon>
                          <ListItemText
                            primary={submenuDisplayText}
                            sx={{ opacity: open ? 1 : 0 }}
                          />
                        </ListItemButton>
                      </List>
                    </Collapse>
                  )
                )}
              </ListItem>

              <Divider />
            </>
          ))}
          <ListItem key="Logout" disablePadding sx={{ display: "block" }}>
            <ListItemButton
              onClick={() => {
                Cookies.remove("authToken");
                navigate("/login");
              }}
              sx={{
                minHeight: 48,
                justifyContent: open ? "initial" : "center",
                px: 2.5,
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: open ? 3 : "auto",
                  justifyContent: "center",
                }}
              >
                <Logout />
              </ListItemIcon>
              <ListItemText primary="Logout" sx={{ opacity: open ? 1 : 0 }} />
            </ListItemButton>
          </ListItem>
        </List>
      </Drawer>
    </>
  );
};
