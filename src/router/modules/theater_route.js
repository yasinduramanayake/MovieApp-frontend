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
]
