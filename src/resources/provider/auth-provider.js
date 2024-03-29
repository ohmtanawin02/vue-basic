import HttpRequest from "../http-request";

class AuthProvider extends HttpRequest {
  login (payload) {
    return this.post('auth/login', payload)
  }
}

export default AuthProvider