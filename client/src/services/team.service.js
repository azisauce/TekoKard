import axios from 'axios';

const API_URL = 'http://localhost:3000/api/teams/';

class TeamService {
    async createTeam(teamData) {
        const response = await axios.post(API_URL, teamData);
        return response.data;
    }
}

export default new TeamService();
