export default {
    path: 'medicine',
    name: 'medicine',
    component: () => import('@/views/backStage/medicine/index.vue'),
    meta: {
        locale: 'menu.cure',
        requiresAuth: true,
        icon: 'icon-list',
    },
    children: [
        {
            path: 'storage',
            name: 'storage',
            component: () => import('@/views/backStage/medicine/card/index.vue'),
            meta: {
                locale: '药品库存',
                requiresAuth: true,
                roles: ['*'],
            },
        },
        {
            path: 'register', // The midline path complies with SEO specifications
            name: 'register',
            component: () => import('@/views/backStage/medicine/step/index.vue'),
            meta: {
                locale: '就诊登记',
                requiresAuth: true,
                roles: ['*'],
            },
        },

    ],
};
