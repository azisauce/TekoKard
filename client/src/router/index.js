import { createRouter, createWebHistory } from 'vue-router'
import LoginView from '../views/LoginView.vue'
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
    component: () => import('../views/RegisterView.vue'),
    children: [
      {
        path: '',
        name: 'register-form',
        component: () => import('../components/RegisterForm.vue')
      },
      {
        path: 'details',
        name: 'register-details',
        component: () => import('../components/ProfileDetails.vue')
      }
    ]
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
  const teamsJson = localStorage.getItem('teams');
  const teams = teamsJson ? JSON.parse(teamsJson) : null;
  
  // Define public routes
  const publicRoutes = ['login', 'register-form'];

  // Allow access to public routes
  if (publicRoutes.includes(to.name) || to.name === 'register-details') {
    // If user is authenticated and has teams, redirect to profile
    if (accessToken && refreshToken && teams && to.name !== 'profile') {
      return next({ name: 'profile' });
    }
    return next();
  }
  // If we have tokens but no teams, redirect to register-details
  // BUT only if we're not already going there
  if (accessToken && refreshToken && (!teams) && to.name !== 'register-details') {
    console.log('Redirecting to register-details');
    return next({ name: 'register-details' });
  }

  
  // Protected route logic
  if (!accessToken || !refreshToken) {
    console.log('No tokens found, redirecting to login');
    return next({ name: 'login' });
  }

  return next();
})

export default router
