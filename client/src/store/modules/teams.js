import teamService from '@/services/team.service';

const initialState = {
  teams: [],
  currentTeam: null,
  loading: false,
  error: null
};

export default {
  namespaced: true,
  state: initialState,
  mutations: {
    SET_TEAMS(state, teams) {
      state.teams = teams;
      if (teams) {
        localStorage.setItem('teams', JSON.stringify(teams));
      } else {
        localStorage.removeItem('teams');
      }
    },
    ADD_TEAM(state, team) {
      state.teams.push(team);
      if (team) {
        localStorage.setItem('teams', JSON.stringify(state.teams));
      } else {
        localStorage.removeItem('teams');
      }
    },
    SET_CURRENT_TEAM(state, team) {
      state.currentTeam = team;
    },
    SET_LOADING(state, loading) {
      state.loading = loading;
    },
    SET_ERROR(state, error) {
      state.error = error;
    }
  },
  actions: {
    async createTeam({ commit, rootState }, teamData) {
      try {
        commit('SET_LOADING', true);
        commit('SET_ERROR', null);
        const user = rootState.auth.user;
        const teamDataWithUser = {
          ...teamData,
          userId: user.user_id
        };
        const response = await teamService.createTeam(teamDataWithUser);
        const newTeam = response;
        commit('ADD_TEAM', newTeam);
        commit('SET_CURRENT_TEAM', newTeam);
        return newTeam;
      } catch (error) {
        const errorMessage = error.response?.data?.error || 'Failed to create team';
        commit('SET_ERROR', errorMessage);
        throw errorMessage;
      } finally {
        commit('SET_LOADING', false);
      }
    }
  },
  getters: {
    getAllTeams: state => state.teams,
    getCurrentTeam: state => state.currentTeam,
    isLoading: state => state.loading,
    getError: state => state.error
  }
};
