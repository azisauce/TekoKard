import { createStore } from 'vuex';
import user from './UserStore';

export default createStore({
    modules: {
        user
    }
});