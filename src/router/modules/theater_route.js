export default [
  {
    path: '/theaters',
    name: 'theaters',
    component: () => import('@/views/Theaters/AdminView/index.vue'),
    meta: {
      pageTitle: 'Theaters',
      breadcrumb: [
        {
          text: 'All Theaters',
          active: true,
        },
      ],
    },
  },
  {
    path: '/theaterdetails/:name/:type/:theaters',
    name: 'theaterdetails',
    component: () => import('@/views/Theaters/UserView/index.vue'),
    meta: {
      layout: 'full',
      redirectIfLoggedIn: true,
      noAuth: true,
    },
  },
]
