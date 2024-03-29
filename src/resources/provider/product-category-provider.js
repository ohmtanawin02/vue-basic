import { getAuthToken } from '@/utils/auth'
import HttpRequest from '../http-request'

export default class ProductCategoryProvider extends HttpRequest {
  urlPrefix = 'product-category'

  getAll(query) {
    this.setHeader(getAuthToken())
    return this.get(`${this.urlPrefix}`, query)
  }

  getOne(id) {
    this.setHeader(getAuthToken())
    return this.get(`${this.urlPrefix}/${id}`)
  }

  create(payload) {
    this.setHeader(getAuthToken())
    return this.post(`${this.urlPrefix}`, payload)
  }

  update(id, payload) {
    this.setHeader(getAuthToken())
    return this.put(`${this.urlPrefix}/${id}`, payload)
  }

  deleteData(id) {
    this.setHeader(getAuthToken())
    return this.delete(`${this.urlPrefix}/${id}`)
  }
}
