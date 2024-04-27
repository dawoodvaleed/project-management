const paths = {
    user: '/security/user',
    role: '/security/role',
    customers: '/customer',
    item: '/item',
    projects: '/project',
    measurement: '/measurement'
}

export const permissions = {
    security: {
        name: 'security',
        displayText: 'Security',
    },
    users: {
        name: 'users',
        displayText: 'Users',
        path: paths.user
    },
    roles: {
        name: 'roles',
        displayText: 'Roles',
        path: paths.role
    },

    customers: {
        name: 'customers',
        displayText: 'Customers',
        path: paths.customers
    },

    item: {
        name: 'item',
        displayText: 'Item',
    },
    items: {
        name: 'items',
        displayText: 'Items',
        path: paths.item
    },


    project: {
        name: 'project',
        displayText: 'Project',
    },
    projects: {
        name: 'projects',
        displayText: 'Projects',
        path: paths.projects
    },
    measurements: {
        name: 'measurements',
        displayText: 'Measurements',
        path: paths.measurement
    },
}
