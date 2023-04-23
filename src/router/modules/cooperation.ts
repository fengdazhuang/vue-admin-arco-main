export default {
    path: 'cooperation',
    name: 'cooperation',
    component: () => import('@/views/backStage/cooperation/index.vue'),
    meta: {
        locale: '系统管理',
        requiresAuth: true,
        icon: 'icon-dashboard',
    },
    children:[
        {
            path: 'cooperationchild',
            name: 'cooperationchild',
            component:()=> import('@/views/backStage/cooperation/cooperationChild/index.vue'),
            meta: {
                locale: '合作伙伴',
                requiresAuth: true,
                icon: 'icon-dashboard',
            },
        }
    ]
};
