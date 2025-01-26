export default {
    namespaced: true,
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
};