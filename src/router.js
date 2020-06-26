import { createRouter, createWebHistory } from 'vue-router';
import Home from './pages/home.vue';
import Second from './pages/second.vue';
import { scrollWaiter } from './scroll-waiter';

export const routerHistory = createWebHistory();
export const router = createRouter({
  history: routerHistory,
  strict: true,
  routes: [
    { path: '/home', redirect: '/' },
    {
      path: '/',
      component: Home,
    },
    {
      path: '/second',
      component: Second,
    },
  ],
  async scrollBehavior(to, from, savedPosition) {
    await scrollWaiter.wait();

    if (savedPosition) {
      return savedPosition
    } else {
      // TODO: check if parent in common that works with alias
      if (to.matched.every((record, i) => from.matched[i] !== record))
        return { left: 0, top: 0 }
    }
    return false
  },
});
