import axios from 'axios';

const API_URL = 'http://localhost:3000/api/teams/';

class TeamService {
    async createTeam(teamData) {
        const response = await axios.post(API_URL, teamData);
        return response.data;
    }

    async findTeamByTeamTag(teamTag) {
        console.log('Attempting to find team with tag:', teamTag);
        try {
            const response = await axios.get(API_URL + teamTag.name);
            return response.data;
        } catch (error) {
            console.error('Error in findTeamByTeamTag:', error);
            throw error;
        }
    }
}

export default new TeamService();
