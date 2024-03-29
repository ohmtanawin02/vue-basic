import axios from 'axios'
import { onRequest, onRequestError, onResponse, onResponseError } from './interceptors'

class HttpRequest {
  constructor(url = import.meta.env.VITE_API) {
    this.axiosInstance = axios.create({
      baseURL: url,
      timeout: 120000,
      headers: {
        'Content-Type': 'application/json'
      }
    })

    this.axiosInstance.interceptors.request.use(onRequest, onRequestError)
    this.axiosInstance.interceptors.response.use(onResponse, onResponseError)
  }

  setHeader(header) {
    this.axiosInstance.defaults.headers.common[header.key] = header.value
    this.axiosInstance.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'
  }

  get(endpoint, data, config) {
    const params = {
      params: data
    }
    const newParams = Object.assign(params, config)

    return this.axiosInstance.get(endpoint, newParams)
  }

  post(endpoint, data, config) {
    return this.axiosInstance.post(endpoint, data, config)
  }

  put(endpoint, data, config) {
    return this.axiosInstance.put(endpoint, data, config)
  }

  patch(endpoint, data, config) {
    return this.axiosInstance.patch(endpoint, data, config)
  }

  remove(endpoint, data, config) {
    const params = { data }
    const newParams = Object.assign(params, config)

    return this.axiosInstance.delete(endpoint, newParams)
  }

  delete(endpoint, id, config) {
    const params = {
      params: {
        id
      }
    }
    const newParams = Object.assign(params, config)

    return this.axiosInstance.delete(endpoint, newParams)
  }

  deleteWithBody(endpoint, data, config) {
    const params = {
      params: {
        ...data
      }
    }
    const newParams = Object.assign(params, config)

    return this.axiosInstance.delete(endpoint, newParams)
  }

  download(endPoint, data) {
    return this.axiosInstance.get(endPoint, {
      params: data,
      responseType: 'blob'
    })
  }
}

export default HttpRequest
