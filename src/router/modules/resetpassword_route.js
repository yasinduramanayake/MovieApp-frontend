export default [
  {
    path: '/resetpassword',
    name: 'resetpassword',
    component: () => import('@/views/resetpassword.vue'),
    meta: {
      layout: 'full',
      redirectIfLoggedIn: true,
      noAuth: true,
    },
  },
]
