export default [
  {
    path: "/booking",
    name: "booking",
    component: () => import("@/views/Bookings/UserView/booking.vue"),
    meta: {
      layout: "full",
      redirectIfLoggedIn: true,
      noAuth: true,
    },
  },

  {
    path: "/mybooking",
    name: "mybooking",
    component: () => import("@/views/Bookings/UserView/mybookings.vue"),
    meta: {
      layout: "full",
      redirectIfLoggedIn: true,
      noAuth: true,
    },
  },

  {
    path: "/Allbookings",
    name: "Allbookings",
    component: () => import("@/views/Bookings/AdminView/index.vue"),
    meta: {
      pageTitle: "Bookings",
      breadcrumb: [
        {
          text: "All Bookings",
          active: true,
        },
      ],
    },
  },
];
