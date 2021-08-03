export default [
    {
      path: '/paydetails',
      name: '',
      component: () => import('@/views/payment/paydetails.vue'),
      meta: {
        layout: 'full',
        redirectIfLoggedIn: true,
        noAuth: true,
      },
    },
  ]