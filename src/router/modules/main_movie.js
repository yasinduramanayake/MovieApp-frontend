export default [
    {
      path: '/movie',
      name: 'movie',
      component: () => import('@/views/MainMovie.vue'),
      meta: {
        layout: 'full',
        redirectIfLoggedIn: true,
        noAuth: true,
      },
    },
  ]
  