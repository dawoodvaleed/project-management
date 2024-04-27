import {
  Monitor,
  Groups,
  LocalOffer,
  HorizontalRule,
  Security,
} from "@mui/icons-material";
import { permissions } from "../../config/Permissions";

export type MenuRoute = {
  name: string
  displayText: string
  route?: string
  icon: React.ReactNode
  submenuRoutes?: SubmenuRoute[]
}

export type SubmenuRoute = {
  name: string
  displayText: string
  route: string
  icon: React.ReactNode
}

export const NAVBAR_ROUTES = [
  {
    displayText: "Dashboard",
    route: "/",
    icon: <Monitor />,
  },
];

export const PROTECTED_ROUTES: MenuRoute[] = [
  {
    name: permissions.customers.name,
    displayText: permissions.customers.displayText,
    route: permissions.customers.path,
    icon: <Groups />,
  },
  {
    name: permissions.item.name,
    displayText: permissions.item.displayText,
    icon: <LocalOffer />,
    submenuRoutes: [
      {
        name: permissions.items.name,
        displayText: permissions.items.displayText,
        route: permissions.items.path,
        icon: <HorizontalRule />,
      },
    ],
  },
  {
    name: permissions.project.name,
    displayText: permissions.project.displayText,
    icon: <LocalOffer />,
    submenuRoutes: [
      {
        name: permissions.projects.name,
        displayText: permissions.projects.displayText,
        route: permissions.projects.path,
        icon: <HorizontalRule />,
      },

      {
        name: permissions.measurements.name,
        displayText: permissions.measurements.displayText,
        route: permissions.measurements.path,
        icon: <HorizontalRule />,
      },
    ],
  },
  {
    name: permissions.security.name,
    displayText: permissions.security.displayText,
    icon: <Security />,
    submenuRoutes: [
      {
        name: permissions.users.name,
        displayText: permissions.users.displayText,
        route: permissions.users.path,
        icon: <HorizontalRule />,
      },
      {
        name: permissions.roles.name,
        displayText: permissions.roles.displayText,
        route: permissions.roles.path,
        icon: <HorizontalRule />,
      },
    ],
  },
];
