export default {
  path: 'dashboard',
  name: 'dashboard',
  component: () => import('@/views/backStage/dashboard/index.vue'),
  redirect:'/workplace',
  meta: {
    locale: 'menu.dashboard',
    requiresAuth: true,
    icon: 'icon-dashboard',
  },
  children: [
    {
      path: 'workplace',
      name: 'workplace',
      component: () => import('@/views/backStage/dashboard/workplace/index.vue'),
      meta: {
        locale: 'menu.dashboard.workplace',
        requiresAuth: true,
        roles: ['*'],
      },
    },
    /** simple */
    {
      path: 'monitor',
      name: 'monitor',
      component: () => import('@/views/backStage/dashboard/monitor/index.vue'),
      meta: {
        locale: 'menu.dashboard.monitor',
        requiresAuth: true,
        roles: ['admin'],
      },
    },
    /** simple end */
  ],
};
