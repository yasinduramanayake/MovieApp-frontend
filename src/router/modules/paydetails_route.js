export default [
  {
    path: '/paydetails',
    name: 'payment',
    component: () => import('@/views/payment/paydetails.vue'),
    meta: {
      layout: 'full',
      redirectIfLoggedIn: true,
      noAuth: true,
    },
  },
]
