export const paths = {
    user: '/security/user',
    role: '/security/role',
    customer: '/customer',
    item: '/item',
    project: '/project'
}

export const permissions = {
    security: {
        name: 'security',
        displayText: 'Security',
        allowedPaths: []
    },
    users: {
        name: 'users',
        displayText: 'Users',
        allowedPaths: [paths.user]
    },
    roles: {
        name: 'roles',
        displayText: 'Roles',
        allowedPaths: [paths.role]
    },

    customers: {
        name: 'customers',
        displayText: 'Customer',
        allowedPaths: [paths.customer]
    },

    items: {
        name: 'items',
        displayText: 'Item',
        allowedPaths: [paths.item]
    },
    
    itemRequest: {
        name: 'itemRequest',
        displayText: 'ItemRequest',
        allowedPaths: [paths.item]
    },

    projects: {
        name: 'projects',
        displayText: 'Project',
        allowedPaths: [paths.project]
    },
}
