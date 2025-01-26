<template>
    <div class="user-view">
        <h1>Users</h1>
        <div v-if="error" class="error">{{ error }}</div>
        <ul v-else-if="users.length">
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

export default {
    setup() {
        const store = useStore();
        const userController = new UserController(store);

        const users = computed(() => store.state.users);
        const error = computed(() => store.state.error);

        onMounted(() => {
            userController.loadUsers();
        });

        return {
            users,
            error
        };
    }
}
</script>