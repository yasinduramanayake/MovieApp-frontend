export default [
  {
    path: '/forgetpassword',
    name: 'forgetpassword',
    component: () => import('@/views/forgetpassword.vue'),
    meta: {
      layout: 'full',
      redirectIfLoggedIn: true,
      noAuth: true,
    },
  },
]
