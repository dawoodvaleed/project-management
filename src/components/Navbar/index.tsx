import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

import { styled, Theme, CSSObject } from "@mui/material/styles";
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
  Typography,
  Drawer as MuiDrawer,
  AppBar as MuiAppBar,
  AppBarProps as MuiAppBarProps,
} from "@mui/material";
import {
  Menu,
  ChevronLeft,
  Logout,
  ExpandLess,
  ExpandMore,
} from "@mui/icons-material";
import {
  MenuRoute,
  UNPROTECTED_ROUTES,
  PROTECTED_ROUTES,
} from "./navbarRoutes";

const drawerWidth = 260;

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

export const NavBar = () => {
  const navigate = useNavigate();

  const [open, setOpen] = useState(true);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };
  const permissionsStr = Cookies.get("permissions") || "";
  const permissions = permissionsStr.split(
    ","
  ) as (keyof typeof PROTECTED_ROUTES)[];

  const filterByPermission = (routes: any) =>
    routes.filter((route: any) => permissions.includes(route.name));
  const mapSubMenu = (routes: MenuRoute[]) =>
    routes.map((route) => {
      let submenu;
      if (route.submenu?.length) {
        submenu = filterByPermission(route.submenu);
        return { ...route, submenu };
      }
      return route;
    });

  const ALL_NAV_ROUTES = UNPROTECTED_ROUTES.concat(
    filterByPermission(mapSubMenu(PROTECTED_ROUTES))
  );
  const [drawerStateSetting, setDrawerStateSetting] = useState(
    ALL_NAV_ROUTES.filter((navRoute: any) => navRoute.submenu).map(
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
            <ChevronLeft />
          </IconButton>
        </DrawerHeader>
        <List>
          {ALL_NAV_ROUTES.map(({ displayText, path, icon, submenu }: any) => (
            <>
              <ListItem
                key={displayText}
                disablePadding
                sx={{ display: "block" }}
              >
                <ListItemButton
                  onClick={() => {
                    if (!submenu && path) {
                      navigate(path);
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
                    disableTypography
                    primary={
                      <Typography variant="body1" sx={{ fontWeight: "bold" }}>
                        {displayText}
                      </Typography>
                    }
                    sx={{ opacity: open ? 1 : 0 }}
                  />
                  {submenu &&
                    (drawerStateSetting.find((item) => item.id === displayText)
                      ?.open ? (
                      <ExpandLess />
                    ) : (
                      <ExpandMore />
                    ))}
                </ListItemButton>
                {submenu?.map(
                  ({
                    icon: submenuIcon,
                    displayText: submenuDisplayText,
                    path: submenuPath,
                  }: any) => (
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
                          onClick={() => navigate(submenuPath)}
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
                Cookies.remove("permissions");
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
              <ListItemText
                disableTypography
                primary={
                  <Typography variant="body1" sx={{ fontWeight: "bold" }}>
                    Logout
                  </Typography>
                }
                sx={{ opacity: open ? 1 : 0 }}
              />
            </ListItemButton>
          </ListItem>
        </List>
      </Drawer>
    </>
  );
};
