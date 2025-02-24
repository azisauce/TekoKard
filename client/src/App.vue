<template>
  <router-view />
</template>

<script>

export default {
  name: 'App',
  computed: {
    isAuthRoute() {
      return ['/login', '/register'].includes(this.$route.path)
    }
  }
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
  background-color: #F6F8FF;
  height: 100vh;
  width: 100vw;
}
</style>
