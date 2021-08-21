export default [
  {
    path: '/paydetails/:baseprice/:name/:seats/:total',
    name: 'payment',
    component: () => import('@/views/payment/paydetails.vue'),
    meta: {
      layout: 'full',
      redirectIfLoggedIn: true,
      noAuth: true,
    },
  },
]
