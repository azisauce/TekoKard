import axios from 'axios';
import User from '@/models/User';

const baseURL = 'http://localhost:3000/api/users';

export default class UserService {
    static async fetchUsers() {
        try {
            const response = await axios.get(baseURL);
            return response.data.map(User.fromJson);
        } catch (error) {
            console.error('Error fetching users:', error);
            throw error;
        }
    }
}