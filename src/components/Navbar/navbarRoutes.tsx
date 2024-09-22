import {
  Monitor,
  Groups,
  LocalOffer,
  HorizontalRule,
  Security,
  SignalCellularAlt,
} from "@mui/icons-material";
import { ALL_ROUTES } from "../../utils/allRoutes";

export type MenuRoute = {
  name: string;
  displayText: string;
  path?: string;
  icon: React.ReactNode;
  submenu?: Submenu[];
};

export type Submenu = {
  name: string;
  displayText: string;
  path: string;
  icon: React.ReactNode;
};

export const UNPROTECTED_ROUTES = [
  {
    displayText: "Dashboard",
    path: "/",
    icon: <Monitor />,
  },
];

export const PROTECTED_ROUTES = [
  { icon: <Groups />, ...ALL_ROUTES.customers },
  {
    icon: <LocalOffer />,
    submenu: [{ icon: <HorizontalRule />, ...ALL_ROUTES.items }],
    ...ALL_ROUTES.item,
  },
  {
    icon: <SignalCellularAlt />,
    submenu: [
      { icon: <HorizontalRule />, ...ALL_ROUTES.projectProgressView },
      { icon: <HorizontalRule />, ...ALL_ROUTES.projectProgressDetail },
    ],
    ...ALL_ROUTES.projectProgress,
  },
  {
    icon: <LocalOffer />,
    submenu: [
      { icon: <HorizontalRule />, ...ALL_ROUTES.projects },
      { icon: <HorizontalRule />, ...ALL_ROUTES.addMeasurement },
      { icon: <HorizontalRule />, ...ALL_ROUTES.measurements },
    ],
    ...ALL_ROUTES.project,
  },
  {
    icon: <Security />,
    submenu: [
      { icon: <HorizontalRule />, ...ALL_ROUTES.users },
      { icon: <HorizontalRule />, ...ALL_ROUTES.roles },
    ],
    ...ALL_ROUTES.security,
  },
];
