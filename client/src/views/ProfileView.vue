<template>
  <div class="profile">
    <h1>Hello World</h1>
    <button @click="handleLogout" class="logout-btn">
      Logout
    </button>
  </div>
</template>

<script>
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';

export default {
  name: 'ProfileView',
  setup() {
    const store = useStore();
    const router = useRouter();

    const handleLogout = async () => {
      try {
        await store.dispatch('auth/logout');
        router.push('/login');
      } catch (error) {
        console.error('Logout failed:', error);
      }
    };

    return {
      handleLogout
    };
  }
}
</script>

<style scoped>
.profile {
  padding: 20px;
}

.logout-btn {
  background-color: #dc3545;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 4px;
  cursor: pointer;
  font-size: 1rem;
  margin-top: 20px;
  transition: background-color 0.2s;
}

.logout-btn:hover {
  background-color: #c82333;
}
</style>
