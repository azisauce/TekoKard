const db = require('../database');

class User {
    static async create(userData) {
        this.validateUserData(userData);
        return db('users')
            .insert(userData)
            .returning('*');
    }

    static async findAll() {
        return db('users').select('*');
    }

    static async findById(id) {
        return db('users')
            .where({ id: parseInt(id) })
            .first();
    }

    static async findByEmail(email) {
        return db('users')
            .where({ email })
            .first();
    }

    static async update(id, userData) {
        this.validateUserData(userData);
        return db('users')
            .where({ id: parseInt(id) })
            .update(userData)
            .returning('*');
    }

    static async delete(id) {
        return db('users')
            .where({ id: parseInt(id) })
            .del();
    }

    // Helper method to validate user data
    static validateUserData(userData) {
        const requiredFields = ['username', 'email'];
        const missingFields = requiredFields.filter(field => !userData[field]);
        
        if (missingFields.length > 0) {
            throw new Error(`Missing required fields: ${missingFields.join(', ')}`);
        }

        if (userData.email && !userData.email.includes('@')) {
            throw new Error('Invalid email format');
        }

        return true;
    }
}

module.exports = User;
