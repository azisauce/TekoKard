<template>
    <div class="profile-details">
        <div class="team-question">
            <div>Do you have a team?</div>
            <div class="button-group">
                <button @click="hasTeam = true" :class="{ active: hasTeam === true }">Yes</button>
                <button @click="hasTeam = false" :class="{ active: hasTeam === false }">No</button>
            </div>
        </div>

        <div v-if="hasTeam === true" class="team-name-section">
            <div>Great! What's the name of your team?</div>
            <input v-model="teamName" type="text" placeholder="Enter team name" />
            <button @click="handleFindTeam" class="submit-button" :disabled="!teamName">Find Team</button>
            <div v-if="error" class="error-message">{{ error }}</div>
            <div v-if="teamSubmitted" class="success-message">OK! We will inform your admins</div>
        </div>

        <div v-if="hasTeam === false" class="create-team-section">
            <div>Would you like to create a new team?</div>
            <TeamCreation @create-team="createTeam" :isLoading="isLoading" />
            <div v-if="error" class="error-message">{{ error }}</div>
        </div>
    </div>
</template>

<script>
import { ref } from 'vue'
import { useStore } from 'vuex'
import TeamCreation from './TeamCreation.vue'

export default {
    name: 'ProfileDetails',
    components: {
        TeamCreation
    },
    setup() {
        const store = useStore()
        const hasTeam = ref(null)
        const teamName = ref('')
        const error = ref(null)
        const isLoading = ref(false)
        const teamSubmitted = ref(false)

        const createTeam = async (teamData) => {
            try {

                isLoading.value = true
                error.value = null
                
                const result = await store.dispatch('teams/createTeam', teamData)
                hasTeam.value = true
                teamName.value = result.name
            } catch (err) {
                error.value = err.message
                console.error('Error creating team:', err)
            } finally {
                isLoading.value = false
            }
        }

        const handleFindTeam = async () => {
            if (teamName.value) {
                try {
                    error.value = null;
                    const result = await store.dispatch('teams/findTeam', { name: teamName.value });
                    // Reset the form after successful find
                    teamName.value = '';
                    hasTeam.value = !!result;
                    teamSubmitted.value = true;
                } catch (err) {
                    error.value = err.response?.data?.error || 'Failed to find team with that tag';
                    console.error('Failed to find team:', err);
                }
            }
        }

        return {
            hasTeam,
            teamName,
            createTeam,
            handleFindTeam,
            error,
            isLoading,
            teamSubmitted
        }
    }
}
</script>

<style scoped>
.profile-details {
    padding: 1rem;
}

.team-question, .team-name-section, .create-team-section {
    margin-bottom: 1rem;
}

.button-group {
    margin-top: 0.5rem;
    display: flex;
    gap: 1rem;
}

button {
    padding: 0.5rem 1rem;
    border: 1px solid #ccc;
    border-radius: 4px;
    cursor: pointer;
    background-color: white;
    transition: all 0.2s;
}

button.active {
    background-color: #4CAF50;
    color: white;
    border-color: #4CAF50;
}

button:hover {
    background-color: #f0f0f0;
}

button.active:hover {
    background-color: #45a049;
}

input {
    margin-top: 0.5rem;
    padding: 0.5rem;
    border: 1px solid #ccc;
    border-radius: 4px;
    width: 100%;
    max-width: 300px;
}

.error-message {
    color: #dc3545;
    margin-top: 0.5rem;
    font-size: 0.9rem;
}

.loading {
    opacity: 0.7;
    pointer-events: none;
}

.submit-button {
    margin-top: 10px;
    padding: 8px 16px;
    background-color: #4CAF50;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
}

.submit-button:disabled {
    background-color: #cccccc;
    cursor: not-allowed;
}

.submit-button:hover:not(:disabled) {
    background-color: #45a049;
}

.success-message {
    color: #2ecc71;
    margin-top: 0.5rem;
    font-size: 0.9rem;
}
</style>