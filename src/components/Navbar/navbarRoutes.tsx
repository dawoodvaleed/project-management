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
    displayText: "Customer",
    route: "/customer",
    icon: <Groups />,
  },
  {
    displayText: "Item",
    icon: <LocalOffer />,
    submenuRoutes: [
      {
        displayText: "Item",
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
      {
        displayText: "Measurement",
        route: "/measurement",
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
