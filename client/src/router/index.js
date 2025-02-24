import { createRouter, createWebHistory } from 'vue-router'
import ProfileView from '../views/ProfileView.vue'
import WelcomeView from '../views/WelcomeView.vue'
import FeedView from '../views/FeedView.vue'

const routes = [
  {
    path: '/',
    redirect: '/welcome'
  },
  {
    path: '/welcome',
    name: 'welcome',
    component: WelcomeView
  },
  {
    path: '/profile',
    name: 'profile',
    component: ProfileView
  },
  {
    path: '/feed',
    name: 'feed',
    component: FeedView
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

// router.beforeEach(async (to, from, next) => {
//   const accessToken = localStorage.getItem('accessToken');
//   const refreshToken = localStorage.getItem('refreshToken');
//   const currentTeamJson = localStorage.getItem('currentTeam');
//   const currentTeam = currentTeamJson ? JSON.parse(currentTeamJson) : null;
  
//   // Define public routes
//   const publicRoutes = ['login', 'register-form','home'];

//   // Allow access to public routes
//   if (publicRoutes.includes(to.name) || to.name === 'register-details') {
//     // If user is authenticated and has teams, redirect to profile
//     if (accessToken && refreshToken && currentTeam && to.name !== 'profile') {
//       console.log('Redirecting to profile');
//       return next({ name: 'profile' });
//     }
//     // If we have tokens but no teams, redirect to register-details
//     // BUT only if we're not already going there
//     if (accessToken && refreshToken && (!currentTeam) && to.name !== 'register-details') {
//       console.log('Redirecting to register-details');
//       return next({ name: 'register-details' });
//     }
//     return next();
//   }

//   // If we have tokens but no teams, redirect to register-details
//   // BUT only if we're not already going there
//   if (accessToken && refreshToken && (!currentTeam) && to.name !== 'register-details') {
//     console.log('Redirecting to register-details');
//     return next({ name: 'register-details' });
//   }

  
//   // Protected route logic
//   if (!accessToken || !refreshToken) {
//     console.log('No tokens found, redirecting to login');
//     return next({ name: 'login' });
//   }

//   return next();
// })

export default router
