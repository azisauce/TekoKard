const Team = require('../../data/models/team.model');
const db = require('../../data/database');

class TeamService {
    async createTeam(data) {
        const transaction = await db.transaction();
        try {
            const teamData = {
                name: data.name,
                tag: data.tag,
            }
            console.log('teamData',teamData);
            const [team] = await Team.create(teamData, { transaction });
            
            const teamMember = await Team.addTeamMember({user_id: data.userId, team_id: team.team_id}, { transaction });
            await transaction.commit();
            return team;
        } catch (error) {
            await transaction.rollback();
            console.error('Error creating team:', error);
            const errorMessage = error.response?.data?.error || 'Failed to create team';
            throw new Error(errorMessage);
        }
    }

    async findTeamByTeamTag(teamTag) {
        try {
            const team = await Team.findTeamByTag(teamTag);
            console.log('what service return:',team);
            
            return team;
        } catch (error) {
            console.error('Error finding team:', error);
            throw new Error('Failed to find team');
        }
    }
}

module.exports = new TeamService();
