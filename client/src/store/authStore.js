import { defineStore } from 'pinia';
import AuthService from '@/services/auth.service';

export const useAuthStore = defineStore('auth',{
    state: () => ({
        user: JSON.parse(localStorage.getItem('user')) || null,
        accessToken: localStorage.getItem('accessToken') || null,
        refreshToken: localStorage.getItem('refreshToken') || null,
        currentTeam: JSON.parse(localStorage.getItem('currentTeam')) || null
    }),
    actions: {
        async login({ email, password }) {
            try {
                const data = await AuthService.login(email, password);
                this.user = data.user;
                this.accessToken = data.accessToken;
                this.refreshToken = data.refreshToken;
                this.currentTeam = data.team;

                return data;
            } catch (error) {
                console.error('Login failed:', error);
                throw error;
            }
        },
        async register({fullname, username, email, password}) {
            try {
                const data = await AuthService.register(fullname, username, email, password);
                this.user = data.user;
                this.accessToken = data.accessToken;
                this.refreshToken = data.refreshToken;
                return data;
            } catch (error) {
                console.error('Registration failed:', error);
                throw error;
            }
        },
        async refreshToken() {
            try {
                const data = await AuthService.refreshToken();
                if (data) {
                    this.accessToken = data.accessToken;
                }
            } catch (error) {
                this.logout();
                throw error;
            }
        },
        logout() {
            AuthService.logout();
            this.user = null;
            this.accessToken = null;
            this.refreshToken = null;
            this.currentTeam = null;
        },
        getAccessToken() {
            return this.accessToken;
        },
        isTokenExpired() {
            return AuthService.isTokenExpired(this.accessToken);
        }
    }
});
