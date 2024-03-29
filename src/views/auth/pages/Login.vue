<template>
  <div class="d-flex justify-center px-3 px-md-0">
    <div class="form">
      <div class="form-primary">
        <div class="form-title">
          <div class="title-1">Welcome</div>
        </div>
        <v-form v-model="formValid">
          <div class="border">
            <div class="user-input">
              <TextField
                v-model="form.email"
                :rules="[$validate.required, $validate.email]"
                auto-focus
                label="E-mail"
                class="input-field" />
              <div style="padding-top: 1rem">
                <TextField
                  v-model="form.password"
                  :rules="[$validate.required]"
                  :append-inner-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                  :type="show1 ? 'text' : 'password'"
                  @click:append-inner="show1 = !show1"
                  class="input-field" />
              </div>
              <v-btn
                :loading="loading"
                :disabled="!formValid"
                variant="flat"
                block
                @click="login()"
                class="login-btn">
                Log in
              </v-btn>
            </div>
          </div>
        </v-form>
      </div>
    </div>
  </div>
</template>

<script>
import TextField from '@/components/TextField.vue'
import AuthProvider from '@/resources/provider/auth-provider'
import { snackbarStore } from '@/store/snackbar'
import { userStore } from '@/store/user'
import { setAuthUser } from '@/utils/auth'

const AuthService = new AuthProvider()

export default {
  name: 'LoginPage',
  components: { TextField },
  setup: () => ({
    userStore: userStore(),
    snackbarStore: snackbarStore()
  }),
  data() {
    return {
      show1: false,
      form: {
        email: '',
        password: ''
      },
      loading: false,
      formValid: false
    }
  },
  methods: {
    setLoading(val) {
      this.loading = val
    },
    async login() {
      try {
        this.setLoading(true)
        const response = await AuthService.login(this.form)
        this.userStore.setUser(response)
        setAuthUser(response.accessToken, response.tokenExpire)
        this.$router.replace({ name: 'ProductCategoriesList' })
      } catch (error) {
        console.error('[ERROR] - function login: ', error)
        this.snackbarStore.showSnackbar(error, 'error')
      } finally {
        this.setLoading(false)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.form {
  display: flex;
  flex-direction: column;
  height: 100vh;
  @media screen and (min-width: 960px) {
    padding: 0 100px;
  }

  .form-primary {
    height: 100%;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }

  .border {
    border: 2px solid;
    border-radius: 24px;
    padding: 2rem;
  }

  .title-1 {
    color: rgb(var(--v-theme-secondary));
    font-size: 32px;
    font-weight: 400;
  }

  .input-field {
    width: 20rem;
  }

  .login-btn {
    margin-top: 1rem;
  }
}
</style>
