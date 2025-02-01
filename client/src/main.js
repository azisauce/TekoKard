import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './assets/styles/main.css'
import './services/axios.config'

createApp(App).use(store).use(router).mount('#app')
