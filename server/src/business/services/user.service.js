const userRepository = require('../../data/repositories/user.repository');

class UserService {
    async createUser(userData) {
        try {
            return await userRepository.create(userData);
        } catch (error) {
            throw new Error('Error creating user: ' + error.message);
        }
    }

    async getAllUsers() {
        try {
            return await userRepository.findAll();
        } catch (error) {
            throw new Error('Error fetching users: ' + error.message);
        }
    }

    async getUserById(id) {
        try {
            return await userRepository.findById(id);
        } catch (error) {
            throw new Error('Error fetching user: ' + error.message);
        }
    }

    async updateUser(id, userData) {
        try {
            return await userRepository.update(id, userData);
        } catch (error) {
            throw new Error('Error updating user: ' + error.message);
        }
    }

    async deleteUser(id) {
        try {
            return await userRepository.delete(id);
        } catch (error) {
            throw new Error('Error deleting user: ' + error.message);
        }
    }
}

module.exports = new UserService();
