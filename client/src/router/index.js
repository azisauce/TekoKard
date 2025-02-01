import { createRouter, createWebHistory } from 'vue-router'
// import axios from 'axios'
import LoginView from '../views/LoginView.vue'
import RegisterView from '../views/RegisterView.vue'
import ProfileView from '../views/ProfileView.vue'

const routes = [
  {
    path: '/',
    redirect: '/login'
  },
  {
    path: '/login',
    name: 'login',
    component: LoginView
  },
  {
    path: '/register',
    name: 'register',
    component: RegisterView
  },
  {
    path: '/profile',
    name: 'profile',
    component: ProfileView
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach(async (to, from, next) => {
  const accessToken = localStorage.getItem('accessToken');
  const refreshToken = localStorage.getItem('refreshToken');
  
  
  // Always allow access to public routes
  if (to.name === 'login' || to.name === 'register' || to.path === '/') {
    if (accessToken && refreshToken) {
      return next({ name: 'profile' });
    }
    return next();
  }
  
  // Protected route logic
  if (!accessToken || !refreshToken) {
    console.log('No tokens provided.');
    return next({ name: 'login' });
  }
  
  return next();
})

export default router
