<template>
    <v-dialog v-model="dialogModel" width="800">
        <v-card>
            <v-card-item class="card-photo">
                <v-img
                    :src="require('@/assets/images/registrationPeeps.png')"
                    alt="Registration"
                    width="350"
                    height="400"
                ></v-img>
            </v-card-item>
            <v-card-item class="card-content">
                <v-btn class="btn-close" @click="closeDialog">
                    <v-icon>mdi-close</v-icon>
                </v-btn>
                <v-card-title>
                    <h2>Join Us!</h2>
                </v-card-title>
                <v-card-subtitle>
                    <p>Please enter your details</p>
                </v-card-subtitle>
                
                <v-card-text>
                    <v-form v-model="valid"  @submit.prevent="handleRegister">
                        <v-alert v-if="error" type="error" class="mb-3">{{ error }}</v-alert>
                        <v-label>Fullname</v-label>
                        <v-text-field
                            v-model="form.fullname"
                            :rules="fullnameRules"
                            label="Enter your fullname"
                            required
                        ></v-text-field>
                        <v-label>Username</v-label>
                        <v-text-field
                            v-model="form.username"
                            :rules="usernameRules"
                            label="Enter your username"
                            required
                        ></v-text-field>
                        <v-label>Email</v-label>
                        <v-text-field
                            v-model="form.email"
                            :rules="emailRules"
                            label="Enter your email"
                            required
                        ></v-text-field>
                        <v-label>Password</v-label>
                        <v-text-field
                            v-model="form.password"
                            :rules="passwordRules"
                            label="Enter your password"
                            :type="showPassword ? 'text' : 'password'"
                            :append-inner-icon="showPassword ? 'mdi-eye-off' : 'mdi-eye'"
                            @click:append-inner="togglePasswordVisibility"
                            required
                        ></v-text-field>
                        <v-btn
                            class="btn-submit"
                            type="submit"
                            block
                            :loading="loading"
                            :disabled="!valid || loading"
                        >
                            Submit
                        </v-btn>
                    </v-form>
                </v-card-text>
                <v-card-text class="signin-option">
                    You already have an accout? <span @click="toggleLoginDialog">Sign in then !</span>
                </v-card-text>
            </v-card-item>
        </v-card>
    </v-dialog>
</template>

<script>
import { computed } from 'vue'
import {
    VDialog,
    VBtn,
    VCard,
    VCardItem,
    VCardTitle,
    VCardSubtitle,
    VCardText,
    VForm,
    VTextField,
    VLabel,
    VImg,
    VAlert
 } from 'vuetify/components'
import { ref } from 'vue'
import { useAuthStore } from '@/store/authStore';


export default {
  name: 'RegistrationDialog',
  components: {
    VDialog,
    VBtn,
    VCard,
    VCardItem,
    VCardTitle,
    VCardSubtitle,
    VCardText,
    VForm,
    VTextField,
    VLabel,
    VImg,
    VAlert
  },
  props: {
    modelValue: Object
  },
  emits: ['update:modelValue'],
  setup(props, { emit }) {
    const authStore = useAuthStore();
    const valid = ref(false);
    const form = ref({
      fullname: '',
      email: '',
      password: '',
      username: '',
    })
    const error = ref('')
    const loading = ref(false)
    const showPassword = ref(false)

    const togglePasswordVisibility = () => {
    showPassword.value = !showPassword.value;
    };
    // Fullname rules
    const fullnameRules = [
        (v) => !!v || 'Fullname is required',
        (v) => (v && v.length >= 3) || 'Fullname must be at least 3 characters',
        (v) => (v && v.length <= 50) || 'Fullname must be less than 50 characters',
    ];

    // Username rules
    const usernameRules = [
        (v) => !!v || 'Username is required',
        (v) => (v && v.length >= 3) || 'Username must be at least 3 characters',
        (v) => (v && v.length <= 15) || 'Username must be less than 15 characters',
        (v) => /^[a-zA-Z0-9_]+$/.test(v) || 'Username can only contain letters, numbers, and underscores',
    ];

    // Email rules
    const emailRules = [
        (v) => !!v || 'Email is required',
        (v) => /.+@.+\..+/.test(v) || 'E-mail must be valid',
    ];

    // Password rules
    const passwordRules = [
        (v) => !!v || 'Password is required',
        (v) => (v && v.length >= 8) || 'Password must be at least 8 characters',
        (v) => /[A-Z]/.test(v) || 'Password must contain at least one uppercase letter',
        (v) => /[a-z]/.test(v) || 'Password must contain at least one lowercase letter',
        (v) => /\d/.test(v) || 'Password must contain at least one number',
    ];
    const handleRegister = async () => {
      try {
        loading.value = true
        error.value = ''

        await authStore.register({
          fullname: form.value.fullname,
          username: form.value.username,
          email: form.value.email,
          password: form.value.password
        })

        console.log('Registration successful')
        
        // router.push('/register/details')
      } catch (err) {
        console.log('Registration failed');  
        console.log('err.message: ',err.message);
        error.value = err.response?.data?.message || err.message || 'Registration failed'
      } finally {
        loading.value = false
      }
    };
    const dialogModel = computed({
      get: () => props.modelValue?.open,
      set: (value) => emit('update:modelValue', { open: value })
    });

    const closeDialog = () => {
      emit('update:modelValue', { open: false, type: 'register' });
    };

    const toggleLoginDialog = () => {
      emit('update:modelValue', { open: true, type: 'login' });
    };

    return {
      dialogModel,
      closeDialog,
      valid,
      handleRegister,
      form,
      error,
      loading,
      fullnameRules,
      usernameRules,
      emailRules,
      passwordRules,
      togglePasswordVisibility,
      showPassword,
      toggleLoginDialog
    };
  }
}
</script>

<style scoped>
    .v-card {
        background-color: white;
        border-radius: 20px !important;
        display: flex;
        flex-direction: row !important;
        .v-card-item {
            width: 50%;
        }
        .card-photo {
            background-color: #F9CB43;
        }
    }
    .v-btn {
        box-shadow: none;
        border-radius: 20px;
    }
    .btn-close {
        position: absolute;
        right: 15px;
        font-size: 110%;
    }
    .btn-submit {
        height: 40px;
        padding: 0px;
        background-color: #E52020;
        color: white;
        text-transform: capitalize;
        font-weight: 600;
        margin-top: 1rem;
    }
    h2 {
        text-align: center;
        font-weight: 600;
    }
    p {
        text-align: center;
    }
    .v-img {
        height: 100%;
    }
    .signin-option {
        padding: 0px;
        text-align: center;
        color: #2c3e50;
        span {
            cursor: pointer;
            text-decoration: underline;
            transition: all 0.2s;
        }
        span:hover {
            color: #cd2020;
        }
    }
</style>