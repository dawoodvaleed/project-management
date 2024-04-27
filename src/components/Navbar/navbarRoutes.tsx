import {
  Monitor,
  Groups,
  LocalOffer,
  HorizontalRule,
  Security,
} from "@mui/icons-material";
import { paths, permissions } from "../../config/Permissions";

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
    route: paths.customer,
    icon: <Groups />,
  },
  {
    name: permissions.items.name,
    displayText: permissions.items.displayText,
    icon: <LocalOffer />,
    submenuRoutes: [
      {
        name: permissions.itemRequest.name,
        displayText: permissions.itemRequest.displayText,
        route: paths.item,
        icon: <HorizontalRule />,
      },
    ],
  },
  {
    name: permissions.projects.name,
    displayText: permissions.projects.displayText,
    icon: <LocalOffer />,
    submenuRoutes: [
      {
        name: permissions.projects.name,
        displayText: permissions.projects.displayText,
        route: paths.project,
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
        route: paths.user,
        icon: <HorizontalRule />,
      },
      {
        name: permissions.roles.name,
        displayText: permissions.roles.displayText,
        route: paths.role,
        icon: <HorizontalRule />,
      },
    ],
  },
];
