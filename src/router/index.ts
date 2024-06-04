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
      component: () => import('@/modules/auth/LoginView.vue'),
    },
    {
      path: '/login-options',
      name: 'login-options',
      component: () => import('@/modules/auth/LoginRedirectView.vue'),
    },
    {
      path: '/after-register',
      name: 'after-register',
      component: () => import('@/modules/auth/AfterRegisterRedirectView.vue'),
    },
    {
      path: '/test/:id',
      name: 'test',
      component: () => import('@/modules/tests/TestView.vue'),
    },
    {
      path: '/result/:id',
      name: 'result',
      component: () => import('@/modules/tests/ResultView.vue'),
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'not-found',
      component: () => import('@/views/NotFoundView.vue'),
    },
    {
      path: '/admin-cabinet',
      name: 'admin-cabinet',
      component: () => import('@admin/AdminCabinetView.vue'),
    },
  ],
})

export default router
