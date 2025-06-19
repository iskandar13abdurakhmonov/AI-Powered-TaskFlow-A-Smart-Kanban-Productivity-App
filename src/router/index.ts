export const routes = [
    {
        path: '/',
        component: () => import('../pages/Kanban.vue'),
        children: [
            {
                path: '/home',
                name: 'Home',
                component: () => import('../pages/Kanban.vue')
            },
        ]
    },
]
