import { createRouter, createWebHistory } from 'vue-router'
import UsersView from '../views/UsersView.vue'
import TestsView from '../views/TestsView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'users',
      component: UsersView,
    },
    {
      path: '/test',
      name: 'tests',
      component: TestsView,
    },
  ],
})

export default router
