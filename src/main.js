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
import validate from './plugins/Validate'
import keypress from './plugins/Keypress'
import utils from './plugins/Utils'
import filters from './plugins/filters'
import axios from './plugins/axios'
import router from './router'

// Pinia and pinia-plugin-persistedstate
import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'

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
  baseUrl: 'http://localhost:3333'
  // eslint-disable-next-line max-len
  // token: ''
})

// Vue Router
app.use(router)

app.mount('#app')
