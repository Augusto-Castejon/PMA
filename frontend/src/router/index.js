import { createRouter, createWebHistory } from 'vue-router';

const routes = [
  {
    path: '/activity',
    name: 'ActivityManager',
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
