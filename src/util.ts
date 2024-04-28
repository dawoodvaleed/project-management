export const formatDate = (date: string) => new Date(date).toLocaleDateString("en-GB");

export const PERMISSIONS = {
    // SECURITY
    security: {
      name: "security",
      displayText: "Security",
    },
    users: {
      name: "users",
      displayText: "Users",
      path: "/security/user",
    },
    roles: {
      name: "roles",
      displayText: "Roles",
      path: "/security/role",
    },
  
    // CUSTOMER
    customers: {
      name: "customers",
      displayText: "Customers",
      path: "/customer",
    },
  
    // ITEM
    item: {
      name: "item",
      displayText: "Item",
    },
    items: {
      name: "items",
      displayText: "Items",
      path: "/item",
    },
  
    // PROJECT
    project: {
      name: "project",
      displayText: "Project",
    },
    projects: {
      name: "projects",
      displayText: "Projects",
      path: "/project",
    },
    measurements: {
      name: "measurements",
      displayText: "Measurements",
      path: "/measurement",
    },
  };
  