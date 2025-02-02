import axios from 'axios';

const API_URL = 'http://localhost:3000/api/auth/';

class AuthService {
    async login(email, password) {
        const response = await axios.post(API_URL + 'login', {
            email,
            password
        });
        if (response.data.accessToken) {
            localStorage.setItem('user', JSON.stringify(response.data.user));
            localStorage.setItem('accessToken', response.data.accessToken);
            localStorage.setItem('refreshToken', response.data.refreshToken);
            localStorage.setItem('currentTeam', JSON.stringify(response.data.team));
        }
        return response.data;
    }

    async register(fullname, username, email, password) {
        const response = await axios.post(API_URL + 'register', {
            fullname,
            username,
            email,
            password
        });
        if (response.data.accessToken) {
            localStorage.setItem('user', JSON.stringify(response.data.user));
            localStorage.setItem('accessToken', response.data.accessToken);
            localStorage.setItem('refreshToken', response.data.refreshToken);
        }
        return response.data;
    }

    async refreshToken() {
        const refreshToken = localStorage.getItem('refreshToken');
        if (!refreshToken) {
            return null;
        }

        try {
            const response = await axios.post(API_URL + 'refresh', { refreshToken });
            if (response.data.accessToken) {
                localStorage.setItem('accessToken', response.data.accessToken);
            }
            return response.data;
        } catch (error) {
            this.logout();
            throw error;
        }
    }

    logout() {
        const refreshToken = localStorage.getItem('refreshToken');
        if (refreshToken) {
            // Try to logout on server
            axios.post(API_URL + 'logout', { refreshToken }).catch(console.error);
        }
        localStorage.removeItem('user');
        localStorage.removeItem('currentTeam');
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
    }

    getCurrentUser() {
        return JSON.parse(localStorage.getItem('user'));
    }

    getAccessToken() {
        return localStorage.getItem('accessToken');
    }

    isTokenExpired(token) {
        if (!token) return true;
        
        try {
            const payload = JSON.parse(atob(token.split('.')[1]));
            return payload.exp * 1000 < Date.now();
        } catch {
            return true;
        }
    }
}

export default new AuthService();
