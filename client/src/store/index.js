import { createStore } from 'vuex';
import user from './UserStore';
import auth from './modules/auth';

export default createStore({
    modules: {
        user,
        auth
    }
});