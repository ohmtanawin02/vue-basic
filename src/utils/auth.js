import jwtDecode from 'jwt-decode'
import Cookies from 'js-cookie'

const storageKey = 'AccessToken'

const getAuth = () => {
  const auth = Cookies.get(storageKey)

  return auth
}

const getAuthDecode = () => {
  const auth = Cookies.get(storageKey)

  return auth ? jwtDecode(auth) : null
}

const setAuthUser = (token, expire = 0) => {
  Cookies.set(storageKey, token, {
    expires: new Date(+expire),
    sameSite: 'strict'
  })

  return getAuth()
}

const clearAuth = () => {
  Cookies.remove(storageKey)
}

const getAuthToken = () => {
  let token = {}
  if (Cookies.get(storageKey)) {
    token = {
      key: 'Authorization',
      value: `Bearer ${Cookies.get(storageKey)}`
    }
  }

  return token
}

const setUserData = (data) => {
  window.localStorage.setItem('user_data', JSON.stringify(data))
}

export function getUser() {
  const user = window.localStorage.getItem('user_data')

  return user ? JSON.parse(user) : null
}

export default {
  setAuthUser,
  getAuth,
  getAuthToken,
  clearAuth,
  getAuthDecode,
  setUserData
}

export { setAuthUser, getAuth, getAuthToken, clearAuth, getAuthDecode, setUserData }
