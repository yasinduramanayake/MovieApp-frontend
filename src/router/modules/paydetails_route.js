export default [
    {
      path: '/paydetails',
      name: 'paydetails',
      component: () => import('@/views/payment/paydetails.vue'),
      meta: {
        layout: 'full',
        redirectIfLoggedIn: true,
        noAuth: true,
      },
    },
  ]