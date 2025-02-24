<template>
    <sideBar />
    <v-container class="welcome-container">
        <div class="title">
            <h1>For</h1>
            <h1>Better</h1>
            <h1 style="color: #E52020">Communication</h1>
        </div>
        <p>
            Share feedback,propose ideas, and spark discussions—anonymously or not.
            Engage your team with reactions and comments to drive innovation effortlessly.
        </p>
        <v-btn @click="dialog = { open: true, type: 'register' }">Sign Up</v-btn>
    </v-container>
    <RegistrationDialog v-if="dialog.type === 'register'" v-model="dialog" />
    <LoginDialog v-if="dialog.type === 'login'" v-model="dialog" />
</template>

<script>
import sideBar from '../components/layout/SideBar.vue'
import RegistrationDialog from '../components/RegistrationDialog.vue'
import LoginDialog from '../components/LoginDialog.vue'
import { VBtn } from 'vuetify/components'
import { ref } from 'vue'

export default {
  name: 'WelcomeView',
  components: {
    sideBar,
    RegistrationDialog,
    LoginDialog,
    VBtn,
  },
  setup() {
    const dialog = ref({ open: false, type: '' })
    return {
      dialog
    }
  }
}
</script>

<style scoped>
    .welcome-container {
        position: absolute;
        bottom: 110px;
        left: 50px;
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        height: 350px;
        width: 50%;
        max-width: 500px;
        gap: 20px;
        .title {
            display: flex;
            flex-direction: column;
            align-items: flex-start;
            h1 {
                height: 35px;
                margin: 0px;
            }
        }
        p {
            text-align: start;
        }
        .v-btn {
            border-radius: 20px;
            box-shadow: none;
            background-color: #E52020;
            color: white;
            font-weight: 700;
            text-transform: capitalize;
        }
        .v-btn:hover {
            background-color: #cd2020;
        }
    }
    v-dialog {
        background-color: red;
    }
</style>