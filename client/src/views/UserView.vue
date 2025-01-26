<template>
    <div class="user-view">
        <h1>Users</h1>
        <button class="add-user-btn" @click="handleAddUser">
            Add User (Clicked {{ clickCount }} times)
        </button>
        <div v-if="error" class="error">{{ error }}</div>
        <ul v-else-if="users.length" class="user-list">
            <li v-for="user in users" :key="user.id">
                {{ user.name }}
            </li>
        </ul>
        <p v-else>No users found</p>
    </div>
</template>

<script>
import { useStore } from 'vuex';
import { computed, onMounted } from 'vue';
import UserController from '@/controllers/UserController';
import { useUserActions } from '@/composables/users/useUserActions';
import '@/assets/styles/views/user-view.css';

export default {
    setup() {
        const store = useStore();
        const userController = new UserController(store);

        const { handleAddUser, clickCount } = useUserActions();

        const users = computed(() => store.state.user.users);
        const error = computed(() => store.state.user.error);

        onMounted(() => {
            userController.loadUsers();
        });

        return {
            users,
            error,
            handleAddUser,
            clickCount
        };
    }
}
</script>