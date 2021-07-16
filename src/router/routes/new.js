export default [
  {
    path: '/page2',
    name: 'page-2',
    component: () => import('@/views/new/new.vue'),
    meta: {
      pageTitle: 'New',
      breadcrumb: [
        {
          text: 'New Page',
        },
        {
          text: 'New',
          active: true,
        },
      ],
    },
  },
]
