import notification from '@/ApiConstance/toast'

export default {
  init(router, store) {
    router.beforeEach(async (to, _, next) => {
      await store.dispatch('autoLogin')

      //   if (!canNavigate(to)) {
      //     if (!isLoggedIn) return next({ name: 'auth-login' })
      //     return next({ name: 'misc-not-authorized' })
      //   }

      const { isLogedIn } = store.getters

      if (to.meta.redirectIfLoggedIn && isLogedIn) {
        if (localStorage.role === 'User') {
          next()
        } else {
          next({
            path: '/dashboard',
            replace: true,
          })
        }
      }
        
      if (!to.meta.noAuth & !isLogedIn) {
        notification.toast('You required login before enter this page', 'error')
        next({
          path: '/',
          replace: true,
        })
      } else {
        next()
      }
      return next()
    })
  },
}
