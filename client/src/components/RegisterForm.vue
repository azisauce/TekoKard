<template>
  <form @submit.prevent="handleRegister" class="register-form">
    <h2>Create Account</h2>
    
    <div class="form-group">
      <label for="username">Username</label>
      <input
        type="text"
        id="username"
        v-model="form.username"
        required
        class="form-control"
      />
    </div>

    <div class="form-group">
      <label for="email">Email</label>
      <input
        type="email"
        id="email"
        v-model="form.email"
        required
        class="form-control"
      />
    </div>

    <div class="form-group">
      <label for="password">Password</label>
      <input
        type="password"
        id="password"
        v-model="form.password"
        required
        class="form-control"
      />
    </div>

    <div class="form-group">
      <label for="confirmPassword">Confirm Password</label>
      <input
        type="password"
        id="confirmPassword"
        v-model="form.confirmPassword"
        required
        class="form-control"
      />
    </div>

    <div v-if="error" class="error-message">
      {{ error }}
    </div>

    <button type="submit" :disabled="loading" class="submit-btn">
      {{ loading ? 'Creating Account...' : 'Sign Up' }}
    </button>

    <router-link to="/login" class="login-link">
      Already have an account? Sign in
    </router-link>
  </form>
</template>

<script>
import { ref } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'

export default {
  name: 'RegisterForm',
  setup() {
    const store = useStore()
    const router = useRouter()
    
    const form = ref({
      username: '',
      email: '',
      password: '',
      confirmPassword: ''
    })
    
    const error = ref('')
    const loading = ref(false)

    const handleRegister = async () => {
      if (form.value.password !== form.value.confirmPassword) {
        error.value = 'Passwords do not match'
        return
      }

      try {
        loading.value = true
        error.value = ''
        
        await store.dispatch('auth/register', {
          username: form.value.username,
          email: form.value.email,
          password: form.value.password
        })

        console.log('Registration successful')
        
        router.push('/profile')
      } catch (err) {
        error.value = err.message || 'Registration failed'
      } finally {
        loading.value = false
      }
    }

    return {
      form,
      error,
      loading,
      handleRegister
    }
  }
}
</script>

<style scoped>
.register-form {
  width: 100%;
  max-width: 400px;
  padding: 30px;
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

h2 {
  text-align: center;
  margin-bottom: 30px;
  color: #333;
}

.form-group {
  margin-bottom: 20px;
}

label {
  display: block;
  margin-bottom: 8px;
  color: #555;
}

.form-control {
  width: 100%;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 16px;
}

.form-control:focus {
  outline: none;
  border-color: #4CAF50;
}

.error-message {
  color: #f44336;
  margin-bottom: 20px;
  text-align: center;
}

.submit-btn {
  width: 100%;
  padding: 12px;
  background: #4CAF50;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 16px;
  cursor: pointer;
  transition: background 0.3s;
}

.submit-btn:hover {
  background: #45a049;
}

.submit-btn:disabled {
  background: #cccccc;
  cursor: not-allowed;
}

.login-link {
  display: block;
  text-align: center;
  margin-top: 20px;
  color: #4CAF50;
  text-decoration: none;
}

.login-link:hover {
  text-decoration: underline;
}
</style>
