export const routes = [
    {
        path: '/',
        component: () => import('../layouts/DefaultLayout.vue'),
        children: [
            {
                path: '/home',
                name: 'Home',
                component: () => import('../pages/Kanban.vue')
            },
        ]
    },
]
