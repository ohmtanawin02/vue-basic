// Utilities
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const userStore = defineStore(
  'user',
  () => {
    const accessToken = ref('')
    const tokenExpire = ref(0)
    const user = ref({
      firstName: '',
      lastName: '',
      email: '',
      role: '',
      sub: 0,
      type: '',
      accessToken: '',
      tokenExpire: 0
    })

    const setUser = (payload) => {
      accessToken.value = payload.accessToken
      tokenExpire.value = payload.tokenExpire
      user.value = payload
    }
    const clearUser = () => {
      accessToken.value = ''
      tokenExpire.value = 0
      user.value = {
        firstName: '',
        lastName: '',
        email: '',
        role: '',
        sub: 0,
        type: '',
        accessToken: '',
        tokenExpire: 0
      }
    }

    const fullName = () => `${user.value.firstName} ${user.value.lastName}`
    return {
      accessToken,
      tokenExpire,
      user,
      setUser,
      clearUser,
      fullName
    }
  },
  {
    persist: true
  }
)
