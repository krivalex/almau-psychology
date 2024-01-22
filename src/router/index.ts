import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  // @ts-ignore
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'all-tests',
      component: () => import('@/views/AllTestsView.vue'),
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('@/views/LoginView.vue'),
    },
    {
      path: '/test/:id',
      name: 'test',
      component: () => import('@/views/TestView.vue'),
    },
    {
      path: '/result/:id',
      name: 'result',
      component: () => import('@/views/ResultView.vue'),
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'not-found',
      component: () => import('@/views/NotFoundView.vue'),
    },
  ],
})

export default router
