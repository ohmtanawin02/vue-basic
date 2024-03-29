/**
 * main.js
 *
 * Bootstraps Vuetify and other plugins then mounts the App`
 */

// Components
import App from './App.vue'

// Composables
import { createApp } from 'vue'

// Plugins
import dayjs from './plugins/dayjs'
import vuetify from './plugins/vuetify'
import validate from './plugins/validate'
import keypress from './plugins/keypress'
import utils from './plugins/utils'
import filters from './plugins/filters'
import axios from './plugins/axios'
import router from './router'

// Pinia and pinia-plugin-persistedstate
import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'

import './assets/main.css'
import '@/assets/styles/style.scss'


const app = createApp(App)

app.use(dayjs)
app.use(vuetify)
app.use(validate)
app.use(keypress)
app.use(utils)
app.use(filters)

// Pinia
const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)
app.use(pinia)

// Axios
app.use(axios, {
  baseUrl: 'http://localhost:3333',
  // eslint-disable-next-line max-len
  token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InRhbmF3aW4uakBlbWFpbC5jb20iLCJmaXJzdE5hbWUiOiJ0YW5hd2luIiwibGFzdE5hbWUiOiJqZW5rdW5uYXBoYXQiLCJpZCI6IjEiLCJpYXQiOjE3MTE3Mjc2OTIsImV4cCI6MTcxMjMzMjQ5Mn0.g2YuO0N_g0zAnlkAPaWYvrUf0CKKnjPj4uJgWhoxcJM'
})

// Vue Router
app.use(router)

app.mount('#app')
