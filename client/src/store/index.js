import { createStore } from 'vuex';

export default createStore({
    state() {
        return {
            users: [],
            error: null
        };
    },
    mutations: {
        setUsers(state, users) {
            state.users = users;
            state.error = null;
        },
        setError(state, error) {
            state.error = error;
            state.users = [];
        }
    }
});