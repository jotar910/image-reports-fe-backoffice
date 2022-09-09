import { App } from 'vue';
import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import userGuard from '@/router/user.guard';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'ReportsList',
    component: () => import(/* webpackChunkName: "ReportsList" */ '../views/ReportsListView.vue'),
    meta: { transition: 'slide-left' }
  },
  {
    path: '/:id(\\d+)',
    name: 'ReportDetails',
    component: () => import(/* webpackChunkName: "ReportDetails" */ '../views/ReportDetailsView.vue'),
    meta: { transition: 'slide-right' }
  },
  {
    path: '/logout',
    name: 'Logout',
    component: () => import(/* webpackChunkName: "Logout" */ '../views/LogoutView.vue')
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import(/* webpackChunkName: "Login" */ '../views/LoginView.vue')
  },
  {
    path: '/:catchAll(.*)',
    redirect: '/'
  }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});

export default {
  install: (app: App) => {
    app.use(userGuard(app, router));
  }
};
