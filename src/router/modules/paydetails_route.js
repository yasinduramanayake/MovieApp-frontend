export default [
  {
    path: '/paydetails/:movie_name/:seats/:total/:time/:theater_name',
    name: 'payment',
    component: () => import('@/views/payment/paydetails.vue'),
    meta: {
      layout: 'full',
      redirectIfLoggedIn: true,
      noAuth: true,
    },
  },
]
