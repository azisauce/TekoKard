<template>
    <v-container id="main-nav">
        <v-list>
        <v-list-item>
            <v-list-item-title class="explicit-logo">
                Teko<b>Kard</b>
            </v-list-item-title>
        </v-list-item>
        <v-list-item>
            <v-list-item-title class="list-costumized-item">About</v-list-item-title>
        </v-list-item>
        <v-list-item>
            <v-list-item-title class="list-costumized-item">Contact</v-list-item-title>
        </v-list-item>
        <v-list-item>
            <v-list-item-title>
                <v-btn @click="dialog = { open: true, type: 'login' }">Sign In</v-btn>
            </v-list-item-title>
        </v-list-item>
        </v-list>


    </v-container>
    <LoginDialog v-if="dialog.type === 'login'" v-model="dialog" />
    <RegistrationDialog v-if="dialog.type === 'register'" v-model="dialog" />
</template>

<script>
import LoginDialog from '../LoginDialog.vue'
import RegistrationDialog from '../RegistrationDialog.vue'
import { VBtn } from 'vuetify/components'
import { ref } from 'vue'

export default {
    name: 'sideBar',
    components: {
        VBtn,
        LoginDialog,
        RegistrationDialog
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
    #main-nav {
        position: absolute;
        left: 50%;
        left: 50%;
        top: 5%;
        transform: translate(-50%, -50%);
        width: 350px;
        height: 51px;
        padding: 10px;
        border-radius: 20px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        background-color: white;
        color: black;
        box-shadow: 0px 2px 1px #0000001a;
        @media screen and (max-width: 400px) {
            width: 300px;
        }
    }
    .v-list {
        display: flex;
        justify-content: space-between;
        width: 100%;
        align-items: center;
        font-size: 15px;
        padding: 0px;
        @media screen and (max-width: 400px) {
            font-size: 14px;
        }
        .v-list-item {
            cursor: pointer;
            transition: 0.2s;
            padding: 0px 2px !important;
        }
    }
    .v-btn {
        border-radius: 20px;
        box-shadow: none;
        background-color: #E52020;
        color: white;
        font-weight: 700;
        text-transform: capitalize;
        @media screen and (max-width: 400px) {
            font-size: 13px;
        }
    }
    .v-btn:hover {
        background-color: #cd2020;
    }
    .explicit-logo {
        font-size: 18px !important;
        letter-spacing: -1px;
        font-weight: 400;
        .b {
            font-weight: 800;
        }
    }
    .list-costumized-item {
        font-size: 14px !important;
        color: #2c3e50;
    }
    .list-costumized-item:hover {
        font-weight: 500 !important;
        transition: 0.2s;
    }
</style>