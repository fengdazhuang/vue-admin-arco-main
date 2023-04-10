export default {
  path: 'visualization',
  name: 'visualization',
  component: () => import('@/views/backStage/visualization/index.vue'),
  meta: {
    locale: 'menu.visualization',
    requiresAuth: true,
    icon: 'icon-apps',
  },
  children: [
    {
      path: 'data-analysis',
      name: 'dataAnalysis',
      component: () => import('@/views/backStage/visualization/data-analysis/index.vue'),
      meta: {
        locale: 'menu.visualization.dataAnalysis',
        requiresAuth: true,
        roles: ['admin'],
      },
    },
    {
      path: 'multi-dimension-data-analysis',
      name: 'multiDimensionDataAnalysis',
      component: () =>
        import('@/views/backStage/visualization/multi-dimension-data-analysis/index.vue'),
      meta: {
        locale: 'menu.visualization.multiDimensionDataAnalysis',
        requiresAuth: true,
        roles: ['admin'],
      },
    },
  ],
};
