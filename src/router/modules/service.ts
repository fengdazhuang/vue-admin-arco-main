export default {
    path: 'service',
    name: 'service',
    component: () => import('@/views/backStage/MedicalExaminationServices/index.vue'),
    meta: {
        locale: 'menu.service',
        requiresAuth: true,
        icon: 'icon-list',
    },
    children: [
        {
            path: 'dopeTest', // The midline path complies with SEO specifications
            name: 'dopeTest',
            component: () => import('@/views/backStage/MedicalExaminationServices/search-table/index.vue'),
            meta: {
                locale: '兴奋剂检测',
                requiresAuth: true,
                roles: ['*'],
            },
        },
        {
            path: 'checkData',
            name: 'checkData',
            component: () => import('@/views/backStage/MedicalExaminationServices/card/index.vue'),
            meta: {
                locale: '检测数据',
                requiresAuth: true,
                roles: ['*'],
            },
        },
    ],
};
