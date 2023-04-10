export default {
  path: 'profile',
  name: 'profile',
  component: () => import('@/views/backStage/profile/index.vue'),
  meta: {
    locale: 'menu.profile',
    requiresAuth: true,
    icon: 'icon-file',
  },
  children: [
    {
      path: 'basic',
      name: 'basic',
      component: () => import('@/views/backStage/profile/basic/index.vue'),
      meta: {
        locale: 'menu.profile.basic',
        requiresAuth: true,
        roles: ['admin'],
      },
    },
  ],
};
