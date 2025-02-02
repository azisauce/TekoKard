const db = require('../database');

class RefreshToken {
    static async create(tokenData, { transaction } = {}) {
        const query = db('refresh_tokens')
            .insert(tokenData)
            .returning('*');
            
        return transaction ? query.transacting(transaction) : query;
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

    static async delete(token, { transaction } = {}) {
        const query = db('refresh_tokens')
            .where({ token })
            .del();
            
        return transaction ? query.transacting(transaction) : query;
    }

    static async deleteAllForUser(userId, { transaction } = {}) {
        const query = db('refresh_tokens')
            .where({ user_id: userId })
            .del();
            
        return transaction ? query.transacting(transaction) : query;
    }
}

module.exports = RefreshToken;
