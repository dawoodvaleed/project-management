import {
  Monitor,
  Groups,
  LocalOffer,
  HorizontalRule,
  Security,
} from "@mui/icons-material";
import { PERMISSIONS } from "../../util";

export type MenuRoute = {
  name: string;
  displayText: string;
  route?: string;
  icon: React.ReactNode;
  submenuRoutes?: SubmenuRoute[];
};

export type SubmenuRoute = {
  name: string;
  displayText: string;
  route: string;
  icon: React.ReactNode;
};

export const UNPROTECTED_ROUTES = [
  {
    displayText: "Dashboard",
    route: "/",
    icon: <Monitor />,
  },
];

export const PROTECTED_ROUTES: MenuRoute[] = [
  {
    name: PERMISSIONS.customers.name,
    displayText: PERMISSIONS.customers.displayText,
    route: PERMISSIONS.customers.path,
    icon: <Groups />,
  },
  {
    name: PERMISSIONS.item.name,
    displayText: PERMISSIONS.item.displayText,
    icon: <LocalOffer />,
    submenuRoutes: [
      {
        name: PERMISSIONS.items.name,
        displayText: PERMISSIONS.items.displayText,
        route: PERMISSIONS.items.path,
        icon: <HorizontalRule />,
      },
    ],
  },
  {
    name: PERMISSIONS.project.name,
    displayText: PERMISSIONS.project.displayText,
    icon: <LocalOffer />,
    submenuRoutes: [
      {
        name: PERMISSIONS.projects.name,
        displayText: PERMISSIONS.projects.displayText,
        route: PERMISSIONS.projects.path,
        icon: <HorizontalRule />,
      },

      {
        name: PERMISSIONS.measurements.name,
        displayText: PERMISSIONS.measurements.displayText,
        route: PERMISSIONS.measurements.path,
        icon: <HorizontalRule />,
      },
    ],
  },
  {
    name: PERMISSIONS.security.name,
    displayText: PERMISSIONS.security.displayText,
    icon: <Security />,
    submenuRoutes: [
      {
        name: PERMISSIONS.users.name,
        displayText: PERMISSIONS.users.displayText,
        route: PERMISSIONS.users.path,
        icon: <HorizontalRule />,
      },
      {
        name: PERMISSIONS.roles.name,
        displayText: PERMISSIONS.roles.displayText,
        route: PERMISSIONS.roles.path,
        icon: <HorizontalRule />,
      },
    ],
  },
];
