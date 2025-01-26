import UserService from '@/services/UserService';

export default class UserController {
    constructor(store) {
        this.store = store;
    }

    async loadUsers() {
        try {
            const users = await UserService.fetchUsers();
            this.store.commit('user/setUsers', users);
        } catch (error) {
            this.store.commit('user/setError', error.message);
        }
    }
}