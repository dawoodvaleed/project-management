import { Route } from "react-router-dom";
import { Customer } from "../pages/Customer";
import { Role } from "../pages/Security";
import { Item } from "../pages/Item";
import { Measurement } from "../pages/Measurement";
import { Project } from "../pages/Projects";

const PATHS = {
  users: "/security/user",
  roles: "/security/role",
  customers: "/customer",
  items: "/item",
  measurements: "/measurement",
  projects: "/project",
};

export const ALL_ROUTES = {
  // SECURITY
  security: {
    name: "security",
    displayText: "Security",
    route: null,
  },
  users: {
    name: "users",
    displayText: "Users",
    path: PATHS.users,
    route: <Route element={<Customer />} path={PATHS.users} />,
  },
  roles: {
    name: "roles",
    displayText: "Roles",
    path: PATHS.roles,
    route: <Route element={<Role />} path={PATHS.roles} />,
  },

  // CUSTOMER
  customers: {
    name: "customers",
    displayText: "Customers",
    path: PATHS.customers,
    route: <Route element={<Customer />} path={PATHS.customers} />,
  },

  // ITEM
  item: {
    name: "item",
    displayText: "Item",
    route: null,
  },
  items: {
    name: "items",
    displayText: "Items",
    path: PATHS.items,
    route: <Route element={<Item />} path={PATHS.items} />,
  },

  // PROJECT
  project: {
    name: "project",
    displayText: "Project",
    route: null,
  },
  projects: {
    name: "projects",
    displayText: "Projects",
    path: PATHS.projects,
    route: <Route element={<Project />} path={PATHS.projects} />,
  },
  measurements: {
    name: "measurements",
    displayText: "Measurements",
    path: PATHS.measurements,
    route: <Route element={<Measurement />} path={PATHS.measurements} />,
  },
};
