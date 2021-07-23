import Vue from "vue";
import VueRouter from "vue-router";

// Routes
import { canNavigate } from "@/libs/acl/routeProtection";
import { isUserLoggedIn } from "@/AuthChecking/middleware";
import dashboard from "./routes/dashboard";
import pages from "./routes/pages";
import news from "./routes/new";

Vue.use(VueRouter);

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  scrollBehavior() {
    return { x: 0, y: 0 };
  },
  routes: [
    { path: "/", redirect: { name: "dashboard-ecommerce" } },
    ...dashboard,
    ...pages,
    ...news,
    {
      path: "*",
      redirect: "error-404"
    }
  ]
});

// router.beforeEach((to, _, next) => {
//   const isLoggedIn = isUserLoggedIn();
//
//   if (!canNavigate(to)) {
//     // Redirect to login if not logged in
//     if (isLoggedIn === null) return next({ name: "auth-login" });
//
//     // If logged in => not authorized
//     return next({ name: "misc-not-authorized" });
//   }
//
//   // Redirect if logged in
//   if (isLoggedIn !== null) {
//     return next({ name: "dashboard-ecommerce" });
//   }
//
//   return next();
// });

export default router;
