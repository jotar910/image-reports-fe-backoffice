import { App } from 'vue';
import { Router } from 'vue-router';
import AuthenticationInjector, { AuthenticationService } from '@/data/authentication.data';

export default (app: App, router: Router) => {
  router.beforeEach((to, from, next) => {
    const service = app._context.provides[AuthenticationInjector] as AuthenticationService;
    const isLoginRoute = to.name === 'Login';
    const isLoggedIn = service.isLoggedIn();

    if (isLoginRoute) {
      if (isLoggedIn) {
        next({ name: 'ReportsList' });
      } else {
        next();
      }
      return;
    }

    if (!isLoggedIn) {
      next({ name: 'Login' });
    } else {
      next();
    }
  });
  return router;
};
