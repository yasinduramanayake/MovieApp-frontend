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
    path: '/english_movie',
    name: 'movie',
    component: () => import('@/views/Movies/UserSide/EnglishMovie.vue'),
    meta: {
      layout: 'full',
      redirectIfLoggedIn: true,
      noAuth: true,
    },
  },

  {
    path: '/tamil_movies',
    name: 'tamil_movies',
    component: () => import('@/views/Movies/UserSide/TamilMovie.vue'),
    meta: {
      layout: 'full',
      redirectIfLoggedIn: true,
      noAuth: true,
    },
  },

  {
    path: '/hindi_movies',
    name: 'hindi_movies',
    component: () => import('@/views/Movies/UserSide/HindiMovie.vue'),
    meta: {
      layout: 'full',
      redirectIfLoggedIn: true,
      noAuth: true,
    },
  },
]
