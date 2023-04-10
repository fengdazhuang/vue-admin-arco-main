export default {
  path: 'user',
  name: 'user',
  component: () => import('@/views/backStage/user/index.vue'),
  meta: {
    locale: 'menu.user',
    icon: 'icon-user',
    requiresAuth: true,
  },
  children: [
    {
      path: 'info',
      name: 'info',
      component: () => import('@/views/backStage/user/info/index.vue'),
      meta: {
        locale: 'menu.user.info',
        requiresAuth: true,
        roles: ['*'],
      },
    },
    {
      path: 'setting',
      name: 'setting',
      component: () => import('@/views/backStage/user/setting/index.vue'),
      meta: {
        locale: 'menu.user.setting',
        requiresAuth: true,
        roles: ['*'],
      },
    },
  ],
};
