<template>
  <div id="app" :class="{ 'welcome-route': isWelcomeRoute }">
    <NavBar />
    <router-view />
  </div>
</template>

<script>
import NavBar from './components/layout/NavBar.vue'
export default {
  name: 'App',
  computed: {
    isAuthRoute() {
      return ['/login', '/register'].includes(this.$route.path)
    },
    isWelcomeRoute() {
      return this.$route.path === '/welcome'
    }
  },
  components: {
    NavBar
  },
}
</script>

<style>
html {
  overflow-y: hidden !important;
}
#app {
  font-family: 'Inter', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  background-color: #F8F7F7;
  height: 100vh;
  width: 100vw;
  display: flex;
}

#app.welcome-route {
  background-color: #F6F8FF;
}
</style>
