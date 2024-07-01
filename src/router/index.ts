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
      component: () => import('@auth/LoginView.vue'),
    },
    {
      path: '/login-options',
      name: 'login-options',
      component: () => import('@auth/LoginRedirectView.vue'),
    },
    {
      path: '/after-register',
      name: 'after-register',
      component: () => import('@auth/AfterRegisterRedirectView.vue'),
    },
    {
      path: '/test/:id',
      name: 'test',
      component: () => import('@test/TestView.vue'),
    },
    {
      path: '/result/:id',
      name: 'result',
      component: () => import('@test/ResultView.vue'),
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
    {
      path: '/term-of-use',
      name: 'term-of-use',
      component: () => import('@/views/TermsOfUseView.vue'),
    },
  ],
})

export default router
