import {
  Monitor,
  Groups,
  LocalOffer,
  HorizontalRule,
  Security,
} from "@mui/icons-material";

export const NAVBAR_ROUTES = [
  {
    displayText: "Dashboard",
    route: "/",
    icon: <Monitor />,
  },
  {
    displayText: "Vendor",
    route: "/vendor",
    icon: <Groups />,
  },
  {
    displayText: "Item",
    icon: <LocalOffer />,
    submenuRoutes: [
      {
        displayText: "Item Request",
        route: "/item",
        icon: <HorizontalRule />,
      },
    ],
  },
  {
    displayText: "Project",
    icon: <LocalOffer />,
    submenuRoutes: [
      {
        displayText: "Project",
        route: "/project",
        icon: <HorizontalRule />,
      },
    ],
  },
  {
    displayText: "Security",
    icon: <Security />,
    submenuRoutes: [
      {
        displayText: "User",
        route: "/security/user",
        icon: <HorizontalRule />,
      },
      {
        displayText: "Role",
        route: "/security/role",
        icon: <HorizontalRule />,
      },
    ],
  },
];
