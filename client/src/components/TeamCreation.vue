<template>
  <div class="team-creation" :class="{ 'loading': loading }">
    <form @submit.prevent="handleSubmit">
      <div class="form-group">
        <label for="teamName">Team Name</label>
        <input 
          type="text" 
          id="teamName"
          v-model="teamData.name"
          class="form-control"
          required
          :disabled="loading"
        />
      </div>
      
      <div class="form-group">
        <label for="teamTag">Team Tag</label>
        <input 
          type="text" 
          id="teamTag"
          v-model="teamData.tag"
          class="form-control"
          maxlength="20"
          required
          :disabled="loading"
        />
      </div>
      <div v-if="error" class="error-message">{{ error }}</div>
      <button type="submit" class="btn btn-primary" :disabled="loading">
        {{ loading ? 'Creating...' : 'Create Team' }}
      </button>
    </form>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import { useRouter } from 'vue-router';

export default {
  name: 'TeamCreation',
  data() {

    return {
      teamData: {
        name: '',
        tag: ''
      }
    }
  },
  computed: {
    ...mapState('teams', ['loading', 'error'])
  },
  methods: {
    ...mapActions('teams', ['createTeam']),
    async handleSubmit() {
      try {
        const router = useRouter()
        await this.createTeam(this.teamData);
        this.$emit('team-created');
        // Reset form
        this.teamData = {
          name: '',
          tag: ''
        };
        console.log('Registration completed')

        router.push('/register/details')
      
      } catch (error) {
        console.error('Failed to create team:', error);
      }
    }
  }
}
</script>

<style scoped>
.team-creation {
  max-width: 400px;
  margin: 0 auto;
  padding: 1rem;
}

.team-creation.loading {
  opacity: 0.5;
  pointer-events: none;
}

.form-group {
  margin-bottom: 1rem;
}

.form-group label {
  display: block;
  margin-bottom: 0.5rem;
}

.form-control {
  width: 100%;
  padding: 0.5rem;
  border: 1px solid #ddd;
  border-radius: 4px;
}

.btn {
  width: 100%;
  padding: 0.5rem;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.error-message {
    color: red;
    margin-top: 0.5rem;
}

.btn:hover {
  background-color: #0056b3;
}
</style>
