<template>
  <div class="register-container">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'RegisterView'
}
</script>

<style scoped>
.register-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  padding: 20px;
}
</style>