const User = require('../models/user.model');

class UserRepository {
    async create(userData) {
        try {
            return await User.create(userData);
        } catch (error) {
            throw new Error('Error creating user: ' + error.message);
        }
    }

    async findAll() {
        try {
            return await User.findAll();
        } catch (error) {
            throw new Error('Error fetching users: ' + error.message);
        }
    }

    async findById(id) {
        try {
            const user = await User.findById(id);
            if (!user) {
                throw new Error('User not found');
            }
            return user;
        } catch (error) {
            throw new Error('Error fetching user: ' + error.message);
        }
    }

    async findByEmail(email) {
        return User.findByEmail(email);
    }

    async update(id, userData) {
        try {
            // Model will handle validation
            const updatedUser = await User.update(id, userData);
            if (!updatedUser || updatedUser.length === 0) {
                throw new Error('User not found');
            }
            return updatedUser[0];
        } catch (error) {
            throw new Error('Error updating user: ' + error.message);
        }
    }

    async delete(id) {
        try {
            const result = await User.delete(id);
            if (result === 0) {
                throw new Error('User not found');
            }
            return true;
        } catch (error) {
            throw new Error('Error deleting user: ' + error.message);
        }
    }
}

module.exports = new UserRepository();
