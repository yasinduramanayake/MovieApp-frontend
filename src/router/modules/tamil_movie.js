export default [
    {
      path: '/tamilmovies',
      name: 'tamilmovies',
      component: () => import('@/views/tamilMovie.vue'),
      meta: {
        layout: 'full',
        redirectIfLoggedIn: true,
        noAuth: true,
      },
    },
  ]
  