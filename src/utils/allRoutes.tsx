import { Route } from "react-router-dom";
import { Customer } from "../pages/Customer";
import { Item } from "../pages/Item";
import { AddMeasurement, Measurement } from "../pages/Measurement";
import { Permissions, Role, User } from "../pages/Security";
import { Project } from "../pages/Projects";
import {
  ProjectProgress,
  ProjectProgressDetail,
} from "../pages/ProjectProgress";
import { AddQuotation, Quotation } from "../pages/Quotation";

const PATHS = {
  users: "/security/user",
  roles: "/security/role",
  permissions: "/security/role/permissions/:id",
  customers: "/customer",
  items: "/item",
  measurements: "/measurement",
  projects: "/project",
  addMeasurement: "/add-measurement",
  projectProgress: "/project-progress",
  projectProgressDetail: "/project-progress-detail",
  quotations: "/quotation",
  addQuotation: "/add-quotation",
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
    route: <Route element={<User />} path={PATHS.users} />,
  },
  roles: {
    name: "roles",
    displayText: "Roles",
    path: PATHS.roles,
    route: <Route element={<Role />} path={PATHS.roles} />,
  },
  permissions: {
    name: "permissions",
    displayText: "Permissions",
    path: PATHS.permissions,
    route: <Route element={<Permissions />} path={PATHS.permissions} />,
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
    displayText: "Items",
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
    displayText: "Projects",
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
    displayText: "Measurement List",
    path: PATHS.measurements,
    route: <Route element={<Measurement />} path={PATHS.measurements} />,
  },
  addMeasurement: {
    name: "addMeasurement",
    displayText: "Measurements",
    path: PATHS.addMeasurement,
    route: <Route element={<AddMeasurement />} path={PATHS.addMeasurement} />,
  },

  // PROJECT PROGRESS
  projectProgress: {
    name: "projectProgress",
    displayText: "Project Progress",
    route: null,
  },
  projectProgressView: {
    name: "projectProgressView",
    displayText: "Project Progress",
    path: PATHS.projectProgress,
    route: <Route element={<ProjectProgress />} path={PATHS.projectProgress} />,
  },
  projectProgressDetail: {
    name: "projectProgressDetail",
    displayText: "Project Progress Detail",
    path: PATHS.projectProgressDetail,
    route: (
      <Route
        element={<ProjectProgressDetail />}
        path={PATHS.projectProgressDetail}
      />
    ),
  },

  // QUOTATION
  quotation: {
    name: "quotation",
    displayText: "Quotations",
    route: null,
  },
  quotations: {
    name: "quotations",
    displayText: "Quotation List",
    path: PATHS.quotations,
    route: <Route element={<Quotation />} path={PATHS.quotations} />,
  },
  addQuotation: {
    name: "addQuotation",
    displayText: "Quotations",
    path: PATHS.addQuotation,
    route: <Route element={<AddQuotation />} path={PATHS.addQuotation} />,
  },
};
