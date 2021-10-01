import Vue from 'vue'
import VueRouter from 'vue-router'
import dashboardRoute from './modules/dashboard_route'
import errorRoute from './modules/error_route'
import loginRoute from './modules/login_route'
import moviesRoute from './modules/movies_route'
import membersRoute from './modules/members_route'
import registerRoute from './modules/register_route'
import paydetailsRoute from './modules/paydetails_route'
import bookingRoute from './modules/booking_route'
import theaterRoute from './modules/theater_route'
import forgetRoute from './modules/forgetpassword_route'
import resetRoute from './modules/resetpassword_route'

Vue.use(VueRouter)

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  scrollBehavior() {
    return { x: 0, y: 0 }
  },
  routes: [
    ...dashboardRoute,
    ...moviesRoute,
    ...loginRoute,
    ...errorRoute,
    ...membersRoute,
    ...registerRoute,
    ...paydetailsRoute,
    ...bookingRoute,
    ...theaterRoute,
    ...forgetRoute,
    ...resetRoute
  ],
})

export default router
