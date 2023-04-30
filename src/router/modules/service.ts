export default {
    path: 'service',
    name: 'service',
    component: () => import('@/views/backStage/list/index.vue'),
    meta: {
        locale: 'menu.service',
        requiresAuth: true,
        icon: 'icon-list',
    },
    children: [
        {
            path: 'search-table', // The midline path complies with SEO specifications
            name: 'searchTable',
            component: () => import('@/views/backStage/list/search-table/index.vue'),
            meta: {
                locale: '兴奋剂检测服务',
                requiresAuth: true,
                roles: ['*'],
            },
        },
        {
            path: 'card',
            name: 'card',
            component: () => import('@/views/backStage/list/card/index.vue'),
            meta: {
                locale: '医疗服务',
                requiresAuth: true,
                roles: ['*'],
            },
        },
    ],
};
