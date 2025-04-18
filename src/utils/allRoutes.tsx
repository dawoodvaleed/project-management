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
import { InvoiceRequest, InvoiceRequestDetail, InvoicePost, ShortBillRequest, ShortBillPost, ShortBillDetails  } from "../pages/Invoice";
import { MaintenanceProjects } from "../pages/Maintenance";

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
  invoiceRequest: "/invoice-request",
  invoiceRequestDetail: "/invoice-request-detail",
  invoicePost: "/invoice-post",
  ShortBillRequest: "/short-bill-request",
  ShortBillPost: "/short-bill-post",
  ShortBillDetails: "/short-bill-detail",
  maintenanceProjects: "/maintenance-project",
  maintenanceMeasurements: "/maintenance-measurement",
  addMaintenanceMeasurement: "/add-maintenance-measurement",
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
    route: <Route element={<Measurement projectType="NEW" />} path={PATHS.measurements} />,
  },
  addMeasurement: {
    name: "addMeasurement",
    displayText: "Measurements",
    path: PATHS.addMeasurement,
    route: <Route element={<AddMeasurement projectType="NEW" />} path={PATHS.addMeasurement} />,
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

  // INVOICE
  invoice: {
    name: "invoice",
    displayText: "Invoice",
    route: null,
  },
  invoiceRequest: {
    name: "invoiceRequest",
    displayText: "Invoice Request",
    path: PATHS.invoiceRequest,
    route: <Route element={<InvoiceRequest />} path={PATHS.invoiceRequest} />,
  },
  invoiceRequestDetail: {
    name: "invoiceRequestDetail",
    displayText: "Invoice Request Detail",
    path: PATHS.invoiceRequestDetail,
    route: <Route element={<InvoiceRequestDetail />} path={PATHS.invoiceRequestDetail} />,
  },
  invoicePost: {
    name: "invoicePost",
    displayText: "Invoice Post",
    path: PATHS.invoicePost,
    route: <Route element={<InvoicePost />} path={PATHS.invoicePost} />,
  },
  ShortBillRequest: {
    name: "ShortBillRequest",
    displayText: "Short Bill Request",
    path: PATHS.ShortBillRequest,
    route: <Route element={<ShortBillRequest />} path={PATHS.ShortBillRequest} />,
  },
  ShortBillPost: {
    name: "ShortBillPost",
    displayText: "Short Bill Post",
    path: PATHS.ShortBillPost,
    route: <Route element={<ShortBillPost />} path={PATHS.ShortBillPost} />,
  },
  ShortBillDetails: {
    name: "ShortBillDetails",
    displayText: "Short Bill Details",
    path: PATHS.ShortBillDetails,
    route: <Route element={<ShortBillDetails />} path={PATHS.ShortBillDetails} />,
  },

  // MAINTENANCE
  maintenance: {
    name: "maintenance",
    displayText: "Maintenance",
    route: null,
  },
  maintenanceProjects: {
    name: "maintenanceProjects",
    displayText: "Repair & Maintenance",
    path: PATHS.maintenanceProjects,
    route: <Route element={<MaintenanceProjects />} path={PATHS.maintenanceProjects} />,
  },
  maintenanceMeasurements: {
    name: "maintenanceMeasurements",
    displayText: "Measurement List",
    path: PATHS.maintenanceMeasurements,
    route: <Route element={<Measurement projectType="MAINTENANCE" />} path={PATHS.maintenanceMeasurements} />,
  },
  addMaintenanceMeasurement: {
    name: "addMaintenanceMeasurement",
    displayText: "Measurements",
    path: PATHS.addMaintenanceMeasurement,
    route: <Route element={<AddMeasurement projectType="MAINTENANCE" />} path={PATHS.addMaintenanceMeasurement} />,
  },
};
