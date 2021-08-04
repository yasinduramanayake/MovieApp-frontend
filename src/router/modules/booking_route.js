export default [
    {
      path: '/booking',
      name: 'booking',
      component: () => import('@/views/payment/booking.vue'),
      meta: {
        layout: 'full',
        redirectIfLoggedIn: true,
        noAuth: true,
      },
    },
  ]