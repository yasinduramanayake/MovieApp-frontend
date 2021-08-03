export default [
  {
    path: '/movies',
    name: 'movies',
    component: () => import('@/views/Movies/index.vue'),
    meta: {
      pageTitle: 'Movies',
      breadcrumb: [
        {
          text: 'Movies',
          active: true,
        },
      ],
    },
  },
]
