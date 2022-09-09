import { App } from 'vue';
import { Router } from 'vue-router';
import AuthenticationInjector, { AuthenticationService } from '@/data/authentication.data';

export default (app: App, router: Router) => {
  router.beforeEach((to, from, next) => {
    const service = app._context.provides[AuthenticationInjector] as AuthenticationService;
    if (to.name !== 'Login' && !service.isLoggedIn()) {
      next({ name: 'Login' });
    } else {
      next();
    }
  });
  return router;
};
