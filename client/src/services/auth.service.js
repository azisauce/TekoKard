import axios from 'axios';

const API_URL = 'http://localhost:3000/api/auth/';

class AuthService {
    async login(credentials) {
        try {
            const response = await axios.post(API_URL + 'login', credentials);
            return response.data;
        } catch (error) {
            throw error.response?.data || error.message;
        }
    }

    async register(userData) {
        const response = await axios.post(API_URL + 'register', userData);
        return response.data;
    }

    async logout() {
        try {
            await axios.post(API_URL + 'logout');
            localStorage.removeItem('token');
            localStorage.removeItem('user');
        } catch (error) {
            console.error('Logout error:', error);
            // Still remove items even if server request fails
            localStorage.removeItem('token');
            localStorage.removeItem('user');
        }
    }

    getAuthHeader() {
        const token = localStorage.getItem('token');
        return token ? { Authorization: `Bearer ${token}` } : {};
    }
}

export default new AuthService();
