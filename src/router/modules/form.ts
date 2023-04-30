export default {
  path: 'form',
  name: 'form',
  component: () => import('@/views/backStage/form/index.vue'),
  meta: {
    locale: 'menu.form',
    icon: 'icon-settings',
    requiresAuth: true,
  },
  children: [
    {
      path: 'step',
      name: 'step',
      component: () => import('@/views/backStage/form/step/index.vue'),
      meta: {
        locale: '志愿者管理',
        requiresAuth: true,
        roles: ['admin'],
      },
    },
    {
      path: 'group',
      name: 'group',
      component: () => import('@/views/backStage/form/group/index.vue'),
      meta: {
        locale: '志愿者审核',
        requiresAuth: true,
        roles: ['admin'],
      },
    },
    {
      path: 'VolunteerServicePoints',
      name: 'VolunteerServicePoints',
      component: () => import('@/views/backStage/form/search-table/index.vue'),
      meta: {
        locale: '志愿方向',
        requiresAuth: true,
        roles: ['admin'],
      },
    },
    {
      path: 'VolunteerServicePosition',
      name: 'VolunteerServicePosition',
      component: () => import('@/views/backStage/form/position/index.vue'),
      meta: {
        locale: '志愿服务点',
        requiresAuth: true,
        roles: ['admin'],
      },
    },
  ],
};
