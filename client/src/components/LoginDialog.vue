<template>
    <v-dialog v-model="dialogModel" width="800">
        <v-card>
            <v-card-item class="card-content">
                <v-btn class="btn-close" @click="closeDialog">
                    <v-icon>mdi-close</v-icon>
                </v-btn>
                <v-card-title>
                    <h2>Welcome Back!</h2>
                </v-card-title>
                <v-card-subtitle>
                    <p>Please enter your details</p>
                </v-card-subtitle>
                <v-card-text>
                  <v-form v-model="valid" @submit.prevent="handleLogin">
                    <v-alert v-if="error" type="error" class="mb-3">{{ error }}</v-alert>
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
                    Don't have an accout yet? <span @click="toggleLoginDialog">Sign up then !</span>
                </v-card-text>
            </v-card-item>
            <v-card-item class="card-photo">
              <v-img
                    :src="require('@/assets/images/LoginPeeps.png')"
                    alt="Login"
                    width="350"
                    height="300"
                ></v-img>
            </v-card-item>
        </v-card>
    </v-dialog>
</template>

<script>
import { computed, ref } from 'vue'
import { useAuthStore } from '@/store/authStore';
import {
    VDialog,
    VCard,
    VCardItem,
    VCardTitle,
    VCardSubtitle,
    VForm,
    VTextField,
    VLabel,
    VImg,
    VAlert,
    VCardText,
    VBtn,
    VIcon
 } from 'vuetify/components'


export default {
  name: 'LoginDialog',
  components: {
    VDialog,
    VCard,
    VCardItem,
    VCardTitle,
    VCardSubtitle,
    VCardText,
    VForm,
    VTextField,
    VLabel,
    VImg,
    VAlert,
    VBtn,
    VIcon
  },
  props: {
    modelValue: Object
  },
  emits: ['update:modelValue'],
  setup(props, { emit }) {
    const authStore = useAuthStore();
    const dialogModel = computed({
      get: () => props.modelValue?.open,
      set: (value) => emit('update:modelValue', { open: value })
    });
    const error = ref('')
    const loading = ref(false)
    const showPassword = ref(false)
    const form = ref({
      email: '',
      password: '',
    });
    const valid = ref(false);
    const togglePasswordVisibility = () => {
    showPassword.value = !showPassword.value;
    };

    const emailRules = [
        (v) => !!v || 'Email is required',
        (v) => /.+@.+\..+/.test(v) || 'E-mail must be valid',
    ];

    const passwordRules = [
        (v) => !!v || 'Password is required',
    ];

    const closeDialog = () => {
      emit('update:modelValue', { open: false, type: 'login' });
    };

    const toggleLoginDialog = () => {
      emit('update:modelValue', { open: true, type: 'register' });
    };

    const handleLogin = async () => {
      try {
        loading.value = true
        error.value = ''
        
        // await store.dispatch('auth/login', form.value);
        await authStore.login(form.value);
        console.log('Login successful');  
        // router.push({ name: 'profile' })
      } catch (err) {
        console.log('Login failed');  
        console.log('err.message: ',err.message);
        if (err.message && err.message === 'Invalid credentials') {
          error.value = 'Oops! wrong passsword. Please try again.'
        } else {
          error.value = err.message || 'Oops! something went wrong. Please try again.'
        }
      } finally {
        loading.value = false
      }
    };

    return {
      dialogModel,
      closeDialog,
      toggleLoginDialog,
      form,
      togglePasswordVisibility,
      emailRules,
      passwordRules,
      loading,
      showPassword,
      error,
      valid,
      handleLogin
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
    .v-alert {
      background-color: #E52020;
      height: 60px;
    }
    .v-btn {
        box-shadow: none;
        border-radius: 20px;
    }
    .btn-close {
        position: absolute;
        right: 15px;
        font-size: 110%;
        background-color: transparent;
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
        transform: scaleX(-1);
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