import axios from 'axios';
import AuthService from '@/services/auth.service';

const user = JSON.parse(localStorage.getItem('user'));
const initialState = user
    ? { status: { loggedIn: true }, user, token: localStorage.getItem('token'), loading: false, error: null }
    : { status: { loggedIn: false }, user: null, token: null, loading: false, error: null };

export default {
  namespaced: true,
  state: initialState,
  mutations: {
    SET_TOKEN(state, token) {
      state.token = token;
      if (token) {
        localStorage.setItem('token', token);
      } else {
        localStorage.removeItem('token');
      }
    },
    SET_USER(state, user) {
      state.user = user;
      if (user) {
        localStorage.setItem('user', JSON.stringify(user));
      } else {
        localStorage.removeItem('user');
      }
    },
    SET_LOADING(state, loading) {
      state.loading = loading;
    },
    SET_ERROR(state, error) {
      state.error = error;
    },
    loginSuccess(state, user) {
      state.status.loggedIn = true;
      state.user = user;
    },
    loginFailure(state) {
      state.status.loggedIn = false;
      state.user = null;
    },
    registerSuccess(state, user) {
      state.status.loggedIn = true;
      state.user = user;
    },
    registerFailure(state) {
      state.status.loggedIn = false;
      state.user = null;
    },
    logout(state) {
      state.status.loggedIn = false;
      state.user = null;
      state.token = null;
    }
  },
  actions: {
    async login({ commit }, { email, password }) {
      try {
        commit('SET_LOADING', true);
        commit('SET_ERROR', null);
        
        const data = await AuthService.login(email, password);
        
        commit('SET_TOKEN', data.token);
        commit('loginSuccess', data.user);
        
        // Set default auth header for future requests
        axios.defaults.headers.common['Authorization'] = `Bearer ${data.token}`;
        
        return Promise.resolve(data);
      } catch (error) {
        commit('SET_ERROR', error.message || 'Login failed');
        commit('loginFailure');
        return Promise.reject(error);
      } finally {
        commit('SET_LOADING', false);
      }
    },

    async register({ commit }, { username, email, password }) {
      try {
        commit('SET_LOADING', true);
        commit('SET_ERROR', null);
        
        const data = await AuthService.register(username, email, password);
        
        commit('SET_TOKEN', data.token);
        commit('registerSuccess', data.user);

        // Set default auth header for future requests
        axios.defaults.headers.common['Authorization'] = `Bearer ${data.token}`;
        
        return Promise.resolve(data);
      } catch (error) {
        commit('SET_ERROR', error.message || 'Registration failed');
        commit('registerFailure');
        return Promise.reject(error);
      } finally {
        commit('SET_LOADING', false);
      }
    },

    async refreshToken({ commit }) {
      try {
        const data = await AuthService.refreshToken();
        commit('SET_TOKEN', data.token);
        return Promise.resolve(data);
      } catch (error) {
        commit('logout');
        return Promise.reject(error);
      }
    },

    async logout({ commit }) {
      try {
        await AuthService.logout();
      } finally {
        commit('logout');
        delete axios.defaults.headers.common['Authorization'];
      }
    }
  },
  getters: {
    isLoggedIn: state => state.status.loggedIn,
    currentUser: state => state.user,
    getToken: state => state.token,
    isLoading: state => state.loading,
    getError: state => state.error
  }
};
