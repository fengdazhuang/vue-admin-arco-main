export default {
  path: 'personnel',
  name: 'personnel',
  component: () => import('@/views/backStage/personnel/index.vue'),
  meta: {
    locale: 'menu.personnel',
    requiresAuth: true,
    icon: 'icon-exclamation-circle',
  },
  children: [
    {
      path: 'player',
      name: 'player',
      component: () => import('@/views/backStage/personnel/player/index.vue'),
      meta: {
        locale: '运动员',
        requiresAuth: true,
        roles: ['admin'],
      },
    },
    {
      path: 'judge',
      name: 'judge',
      component: () => import('@/views/backStage/personnel/judge/index.vue'),
      meta: {
        locale: '裁判',
        requiresAuth: true,
        roles: ['*'],
      },
    },
    {
      path: 'admin',
      name: 'admin',
      component: () => import('@/views/backStage/personnel/admin/index.vue'),
      meta: {
        locale: '管理员',
        requiresAuth: true,
        roles: ['*'],
      },
    },
  ],
};
