import notification from '@/ApiConstance/toast'
export default {
  init(router, store) {
    router.beforeEach(async (to, _, next) => {
      await store.dispatch('autoLogin')

<<<<<<< HEAD
      const { isLogedIn } = store.getters;

      if (to.meta.redirectIfLoggedIn && isLogedIn) {
        next({
          path: "/dashboard",
          replace: true,
        });
      }

      if (!to.meta.noAuth && !isLogedIn) {
        next({
          path: "/",
          replace: true,
        });
      }

      return next();
    });
  },
};
=======
      //   if (!canNavigate(to)) {
      //     if (!isLoggedIn) return next({ name: 'auth-login' })
      //     return next({ name: 'misc-not-authorized' })
      //   }

      const { isLogedIn } = store.getters

      if (to.meta.redirectIfLoggedIn && isLogedIn) {
        if (localStorage.role === 'admin') {
          next({
            path: '/dashboard',
            replace: true,
          })
        }
      }

      if (!to.meta.noAuth & !isLogedIn) {
        if (to.name !== 'register') {
          notification.toast(
            'You required login before enter this page',
            'error',
          )
          next({
            path: '/',
            replace: true,
          })
        } else {
          next()
        }
      }

      return next()
    })
  },
}
>>>>>>> dfc8461f8983b098141dff28ea3938c36f2c481a
