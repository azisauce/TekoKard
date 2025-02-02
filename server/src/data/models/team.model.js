const db = require('../database');

class Team {
    static async create(teamData, { transaction } = {}) {
        const query = db('teams')
            .insert(teamData)
            .returning('*');
            
        return transaction ? query.transacting(transaction) : query;
    }

    static async addTeamMember(teamMemberData, { transaction } = {}) {
        console.log(teamMemberData);
        const query = db('user_teams')
            .insert(teamMemberData)
            .returning('*');
            
        return transaction ? query.transacting(transaction) : query;
    }

    static async findTeamByUserId(userId, { transaction } = {}) {
        const query = db('user_teams')
            .where({ user_id: userId })
            .first();
            
        return transaction ? query.transacting(transaction) : query;
    }

    static async findTeamByTag(tag, { transaction } = {}) {
        const query = db('teams')
            .where(tag)
            .first();
            
        return transaction ? query.transacting(transaction) : query;
    }
}

module.exports = Team;