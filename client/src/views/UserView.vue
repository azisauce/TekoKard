<template>
    <div class="user-view">
        <h1>Users</h1>
        <button class="add-user-btn" @click="handleAddUser">
            Add User (Clicked {{ clickCount }} times)
        </button>
        <div v-if="error" class="error">{{ error }}</div>
        <div class="input-container">
            <input 
                v-model="inputValue" 
                @input="handleInput"
                type="text" 
                placeholder="Type something..."
                class="custom-input"
            />
        </div>
        <div class="user-list-container">
            <ul v-if="users.length" class="user-list">
                <li v-for="user in users" :key="user.id">
                    {{ user.name }}
                </li>
            </ul>
            <p v-else>No users found</p>
        </div>
    </div>
</template>

<script>
import { useStore } from 'vuex';
import { computed, onMounted } from 'vue';
import UserController from '@/controllers/UserController';
import { useUserActions } from '@/composables/users/useUserActions';
import { useInputHandler } from '@/composables/users/useInputHandler';
import '@/assets/styles/views/user-view.css';

export default {
    setup() {
        const store = useStore();
        const userController = new UserController(store);

        const { handleAddUser, clickCount } = useUserActions();
        const { inputValue, handleInput } = useInputHandler();

        const users = computed(() => store.state.user.users);
        const error = computed(() => store.state.user.error);

        onMounted(() => {
            userController.loadUsers();
        });

        return {
            users,
            error,
            handleAddUser,
            clickCount,
            inputValue,
            handleInput
        };
    }
}
</script>

<style scoped>
.input-container {
    margin: 20px 0;
}

.custom-input {
    padding: 8px 12px;
    border: 2px solid #ddd;
    border-radius: 6px;
    font-size: 16px;
    width: 100%;
    max-width: 300px;
    transition: border-color 0.3s ease;
}

.custom-input:focus {
    outline: none;
    border-color: #4CAF50;
    box-shadow: 0 0 5px rgba(76, 175, 80, 0.2);
}

.custom-input::placeholder {
    color: #999;
}
</style>