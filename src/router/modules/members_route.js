export default [
  {
    path: '/members',
    name: 'members',
    component: () => import('@/views/Members/AdminSide/index.vue'),
    meta: {
      pageTitle: 'Members',
      breadcrumb: [
        {
          text: 'All Members',
          active: true,
        },
      ],
    },
  },
  {
    path: '/userprofile',
    name: 'userprofille',
    component: () => import('@/views/Members/UserSide/profile.vue'),
    meta: {
      layout: 'full',
    },
  },
]
