<template>
  <div class="main-container">
    <v-form
      ref="form"
      @submit.prevent="submit">
      <TitleGlobal
        title="Product category"
        :back-to="{ name: 'ProductCategoriesList'}" />
      <div class="d-flex flex-column gap-6">
        <div class="card-container">
          <div class="card-container__title">Product Category</div>
          <v-row>
            <v-col
              cols="12"
              sm="4">
              <label class="label font-400">
                Category
                <strong class="error">*</strong>
              </label>
              <v-text-field
                v-model="form.name"
                :rules="[$validate.required]"
                required
                hide-details />
            </v-col>
          </v-row>
        </div>
      </div>
      <div class="d-flex py-8 gap-5">
        <v-btn
          :loading="loading"
          type="submit"
          variant="flat">
          Save
        </v-btn>
        <v-btn-cancel
          :to="{ name: 'ProductCategoriesList' }"
          :disabled="loading"
          :active="false" />
      </div>
    </v-form>
  </div>
</template>

<script>
import ProductCategoryProvider from '@/resources/provider/product-category-provider'
import { snackbarStore } from '@/store/snackbar'
import TitleGlobal from '@/components/TitleGlobal.vue'

const ProductCategoryService = new ProductCategoryProvider()

export default {
  name: 'ProductCategoryCreate',
  components: {TitleGlobal},
  setup: () => ({
    SnackbarStore: snackbarStore()
  }),
  data() {
    return {
      loading: false,
      form: {
        name: ''
      }
    }
  },
  methods: {
    setLoading(val) {
      this.loading = val
    },
    async submit() {
      try {
        this.setLoading(true)
        const { valid } = await this.$refs.form.validate()
        if (!valid) return
        await ProductCategoryService.create(this.form)
        this.SnackbarStore.showSnackbar('Create product category successfully', 'success')
        this.$router.replace({ name: 'ProductCategoriesList' })
      } catch (error) {
        console.error('[ERROR] submit create category', error)
        this.SnackbarStore.showSnackbar(error, 'error')
      } finally {
        this.setLoading(false)
      }
    }
  }
}
</script>
