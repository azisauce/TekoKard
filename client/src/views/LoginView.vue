<template>
  <div class="login-container">
    <div class="login-card">
      <h1 class="title">Welcome Back</h1>
      <p class="subtitle">Sign in to your account</p>

      <form @submit.prevent="handleLogin" class="login-form">
        <div class="form-group">
          <label for="email">Email</label>
          <input
            id="email"
            v-model="form.email"
            type="email"
            required
            placeholder="Enter your email"
            :disabled="isLoading"
          />
        </div>

        <div class="form-group">
          <label for="password">Password</label>
          <input
            id="password"
            v-model="form.password"
            type="password"
            required
            placeholder="Enter your password"
            :disabled="isLoading"
          />
        </div>

        <div v-if="error" class="error-message">
          {{ error }}
        </div>

        <button type="submit" :disabled="isLoading" class="login-button">
          <span v-if="isLoading">Loading...</span>
          <span v-else>Sign In</span>
        </button>

        <div class="additional-options">
          <router-link to="/register" class="register-link">
            Don't have an account? Sign up
          </router-link>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

export default {
  name: 'LoginView',
  data() {
    return {
      form: {
        email: '',
        password: ''
      }
    };
  },
  computed: {
    ...mapGetters('auth', ['isLoading', 'getError']),
    error() {
      return this.getError;
    }
  },
  methods: {
    ...mapActions('auth', ['login']),
    async handleLogin() {
      try {
        await this.login(this.form);
        // this.$router.push('/dashboard');
        console.log('Login successful');
      } catch (error) {
        // Error is already handled by the store
        console.error('Login failed:', error);
      }
    }
  }
};
</script>

<style scoped>
.login-container {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #f5f5f5;
  padding: 1rem;
}

.login-card {
  background: white;
  padding: 2rem;
  border-radius: 12px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 400px;
}

.title {
  font-size: 1.8rem;
  font-weight: 600;
  color: #2c3e50;
  margin-bottom: 0.5rem;
  text-align: center;
}

.subtitle {
  color: #666;
  text-align: center;
  margin-bottom: 2rem;
}

.form-group {
  margin-bottom: 1.5rem;
}

label {
  display: block;
  margin-bottom: 0.5rem;
  color: #2c3e50;
  font-weight: 500;
}

input {
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #ddd;
  border-radius: 6px;
  font-size: 1rem;
  transition: border-color 0.2s;
}

input:focus {
  outline: none;
  border-color: #3498db;
}

.login-button {
  width: 100%;
  padding: 0.75rem;
  background-color: #3498db;
  color: white;
  border: none;
  border-radius: 6px;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.2s;
}

.login-button:hover:not(:disabled) {
  background-color: #2980b9;
}

.login-button:disabled {
  background-color: #95a5a6;
  cursor: not-allowed;
}

.error-message {
  color: #e74c3c;
  margin-bottom: 1rem;
  text-align: center;
  font-size: 0.9rem;
}

.additional-options {
  margin-top: 1.5rem;
  text-align: center;
}

.register-link {
  color: #3498db;
  text-decoration: none;
  font-size: 0.9rem;
}

.register-link:hover {
  text-decoration: underline;
}
</style>