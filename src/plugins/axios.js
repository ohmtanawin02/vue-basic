import axios from 'axios'

export default {
  install: (app, options) => {
    const createAxios = axios.create({
      withCredentials: false,
      baseURL: options.baseUrl,
      headers: {
        'Content-Type': 'application/json',
        Authorization: options.token ? `Bearer ${options.token}` : ''
      }
    })
    app.config.globalProperties.$axios = createAxios
    app.provide('$axios', createAxios)
  }
}
