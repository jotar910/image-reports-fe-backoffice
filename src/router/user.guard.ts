import { Router } from 'vue-router';

export default (router: Router) => {
  router.beforeEach((to, from, next) => {
    if (to.name !== 'Login' && !localStorage.getItem('user')) {
      next({ name: 'Login' });
    } else {
      next();
    }
  });
  return router;
};
