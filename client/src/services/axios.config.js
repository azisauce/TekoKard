import axios from 'axios';
import store from '@/store';
import AuthService from './auth.service';

// Request interceptor
axios.interceptors.request.use(
    config => {
        const token = AuthService.getAccessToken();
        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`;
        }
        return config;
    },
    error => {
        return Promise.reject(error);
    }
);

// Response interceptor
axios.interceptors.response.use(
    response => response,
    async error => {
        const originalRequest = error.config;

        if (originalRequest.url?.includes('auth/login')) {
            const customErrorMessage = error.response?.data?.error || 'Login failed';
            return Promise.reject(new Error(customErrorMessage)); 
        }

        // If the error is not 401 or the request was for refreshing token, reject
        if (error.response?.status !== 401 || originalRequest.url?.includes('auth/refresh')) {
            return Promise.reject(error);
        }

        try {
            // Try to refresh the token
            const data = await store.dispatch('auth/refreshToken');
            
            // If token refresh was successful, retry the original request
            if (data?.accessToken) {
                originalRequest.headers['Authorization'] = `Bearer ${data.accessToken}`;
                return axios(originalRequest);
            }
        } catch (refreshError) {
            // If refresh token fails, logout user and redirect to login
            store.dispatch('auth/logout');
            return Promise.reject(refreshError);
        }
    }
);
