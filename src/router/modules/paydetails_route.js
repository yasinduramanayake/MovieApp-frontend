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

  {
    path: '/mypaydetails',
    name: 'mypayment',
    component: () => import('@/views/payment/mypayments.vue'),
    meta: {
      layout: 'full',
      redirectIfLoggedIn: true,
      noAuth: true,
    },
  },
]
