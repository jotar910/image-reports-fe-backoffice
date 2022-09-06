import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import useUserGuard from './user.guard';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'ReportsList',
    component: () => import(/* webpackChunkName: "ReportsListView" */ '../views/ReportsListView.vue'),
    meta: { transition: 'slide-left' }
  },
  {
    path: '/prev',
    name: 'UIShowcasePrev',
    component: () => import(/* webpackChunkName: "showCaseOne" */ '../views/UIShowcaseView.vue'),
    meta: { transition: 'slide-left' }
  },
  {
    path: '/next',
    name: 'UIShowcaseNext',
    component: () => import(/* webpackChunkName: "showCaseTwo" */ '../views/UIShowcaseView2.vue'),
    meta: { transition: 'slide-right' }
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import(/* webpackChunkName: "login" */ '../views/UIShowcaseView3.vue'),
    meta: { transition: 'fade' }
  }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});

export default useUserGuard(router);
