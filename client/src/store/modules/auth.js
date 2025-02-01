import axios from 'axios';
import AuthService from '@/services/auth.service';

export default {
  namespaced: true,
  state: {
    token: localStorage.getItem('token') || null,
    user: JSON.parse(localStorage.getItem('user')) || null,
    loading: false,
    error: null
  },
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
    }
  },
  actions: {
    async login({ commit }, credentials) {
      try {
        commit('SET_LOADING', true);
        commit('SET_ERROR', null);
        
        const data = await AuthService.login(credentials);
        
        commit('SET_TOKEN', data.token);
        commit('SET_USER', data.user);
        
        // Set default auth header for future requests
        axios.defaults.headers.common['Authorization'] = `Bearer ${data.token}`;
        
        return data;
      } catch (error) {
        commit('SET_ERROR', error.message || 'Login failed');
        throw error;
      } finally {
        commit('SET_LOADING', false);
      }
    },
    
    async register({ commit }, userData) {
      try {
        commit('SET_LOADING', true);
        commit('SET_ERROR', null);
        
        const data = await AuthService.register(userData);
        commit('SET_TOKEN', data.token);
        commit('SET_USER', data.user);

        // Set default auth header for future requests
        axios.defaults.headers.common['Authorization'] = `Bearer ${data.token}`;
        
        return true;
      } catch (error) {
        commit('SET_ERROR', error.message || 'Registration failed');
        throw error;
      } finally {
        commit('SET_LOADING', false);
      }
    },

    async logout({ commit }) {
      try {
        await AuthService.logout();
      } finally {
        commit('SET_TOKEN', null);
        commit('SET_USER', null);
        delete axios.defaults.headers.common['Authorization'];
      }
    }
  },
  getters: {
    isAuthenticated: state => !!state.token,
    getUser: state => state.user,
    isLoading: state => state.loading,
    getError: state => state.error
  }
};
