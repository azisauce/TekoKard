import axios from 'axios';

const API_URL = 'http://localhost:3000/api/auth/';

/**
 * Service for handling authentication-related operations including login, registration,
 * token management, and user session handling.
 */
class AuthService {
    /**
     * Authenticates a user with their email and password.
     * @param {string} email - The user's email address
     * @param {string} password - The user's password
     * @returns {Promise<Object>} Response data containing user info and tokens
     */
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

    /**
     * Registers a new user in the system.
     * @param {string} fullname - The user's full name
     * @param {string} username - The user's chosen username
     * @param {string} email - The user's email address
     * @param {string} password - The user's chosen password
     * @returns {Promise<Object>} Response data containing the new user info and tokens
     */
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

    /**
     * Refreshes the access token using the stored refresh token.
     * @returns {Promise<Object|null>} New token data or null if refresh token is missing
     * @throws {Error} If token refresh fails
     */
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

    /**
     * Logs out the current user by clearing local storage and notifying the server.
     * Attempts to invalidate the refresh token on the server but continues with
     * local logout even if server request fails.
     */
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

    /**
     * Retrieves the currently logged-in user's information from local storage.
     * @returns {Object|null} The user object or null if no user is logged in
     */
    getCurrentUser() {
        return JSON.parse(localStorage.getItem('user'));
    }

    /**
     * Retrieves the current access token from local storage.
     * @returns {string|null} The access token or null if not present
     */
    getAccessToken() {
        return localStorage.getItem('accessToken');
    }

    /**
     * Checks if a JWT token is expired by decoding its payload.
     * @param {string} token - The JWT token to check
     * @returns {boolean} True if the token is expired or invalid, false otherwise
     */
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
