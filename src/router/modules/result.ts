export default {
  path: 'result',
  name: 'result',
  component: () => import('@/views/backStage/result/index.vue'),
  meta: {
    locale: 'menu.result',
    icon: 'icon-check-circle',
    requiresAuth: true,
  },
  children: [
    {
      path: 'success',
      name: 'success',
      component: () => import('@/views/backStage/result/success/index.vue'),
      meta: {
        locale: 'menu.result.success',
        requiresAuth: true,
        roles: ['admin'],
      },
    },
    {
      path: 'error',
      name: 'error',
      component: () => import('@/views/backStage/result/error/index.vue'),
      meta: {
        locale: 'menu.result.error',
        requiresAuth: true,
        roles: ['admin'],
      },
    },
  ],
};
