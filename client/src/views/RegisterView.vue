<template>
  <div class="register-container">
    <RegisterForm />
  </div>
</template>

<script>
import RegisterForm from '@/components/RegisterForm.vue'

export default {
  name: 'RegisterView',
  components: {
    RegisterForm
  }
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