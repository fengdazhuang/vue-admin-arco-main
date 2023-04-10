export default {
  path: '/login',
  name: 'login',
  component: () => import('@/views/backStage/login/index.vue'),
  meta: {
    title: '',
    requiresAuth: false,
  },
};
