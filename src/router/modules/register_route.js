export default [
  {
    path: '/register',
    name: 'register',
    component: () => import('@/views/register.vue'),
    meta: {
      layout: 'full',
      redirectIfLoggedIn: true,
      noAuth: true,
    },
  },
]
