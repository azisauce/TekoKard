const db = require('../database');

class RefreshToken {
    static async create(tokenData) {
        return db('refresh_tokens')
            .insert(tokenData)
            .returning('*');
    }

    static async findByToken(token) {
        return db('refresh_tokens')
            .where({ token })
            .first();
    }

    static async findByUserId(userId) {
        return db('refresh_tokens')
            .where({ user_id: userId })
            .first();
    }

    static async delete(token) {
        return db('refresh_tokens')
            .where({ token })
            .del();
    }

    static async deleteAllForUser(userId) {
        return db('refresh_tokens')
            .where({ user_id: userId })
            .del();
    }
}

module.exports = RefreshToken;
