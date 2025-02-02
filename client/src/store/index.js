import { createStore } from 'vuex';
import user from './UserStore';
import auth from './modules/auth';
import teams from './modules/teams';

export default createStore({
    modules: {
        user,
        auth,
        teams
    }
});