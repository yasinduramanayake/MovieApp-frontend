export default [
  {
    path: '/movies',
    name: 'movies',
    component: () => import('@/views/Movies/AdminSide/index.vue'),
    meta: {
      pageTitle: 'Movies',
      breadcrumb: [
        {
          text: 'All Movies',
          active: true,
        },
      ],
    },
  },

  {
    path: '/movie',
    name: 'movie',
    component: () => import('@/views/Movies/UserSide/EnglishMovie.vue'),
    meta: {
      layout: 'full',
      redirectIfLoggedIn: true,
      noAuth: true,
    },
  },

  {
    path: '/tamilmovies',
    name: 'tamilmovies',
    component: () => import('@/views/Movies/UserSide/TamilMovie.vue'),
    meta: {
      layout: 'full',
      redirectIfLoggedIn: true,
      noAuth: true,
    },
  },
]
