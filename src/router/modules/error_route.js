export default [
  {
<<<<<<< HEAD
    path: '/error-404',
    name: 'error-404',
    component: () => import('@/views/error/Error404.vue'),
=======
    path: "/error-404",
    name: "error-404",
    component: () => import("@/views/error/Error404.vue"),
>>>>>>> pubudi
    meta: {
      layout: "full",
      noAuth: true,
    },
  },

  {
    path: "*",
    redirect: "error-404",
    meta: {
      noAuth: true,
    },
  },
];
