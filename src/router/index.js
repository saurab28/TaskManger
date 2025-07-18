import { createRouter, createWebHistory } from 'vue-router'
import LoginView from '../Components/LoginView.vue'
import DashBoard from '../Components/DashBoard.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'LoginView',
      component: LoginView,
    },
    {
      path: '/dashboard',
      name: 'DashBoard',
      component: DashBoard,
    },
  ],
})

export default router
