export default {
  path: 'list',
  name: 'list',
  component: () => import('@/views/backStage/list/index.vue'),
  meta: {
    locale: 'menu.list',
    requiresAuth: true,
    icon: 'icon-list',
  },
  children: [
    {
      path: 'search-table', // The midline path complies with SEO specifications
      name: 'searchTable',
      component: () => import('@/views/backStage/list/search-table/index.vue'),
      meta: {
        locale: '比赛场地',
        requiresAuth: true,
        roles: ['*'],
      },
    },
    {
      path: 'card',
      name: 'card',
      component: () => import('@/views/backStage/list/card/index.vue'),
      meta: {
        locale: '项目分类',
        requiresAuth: true,
        roles: ['*'],
      },
    },
  ],
};
