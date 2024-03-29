<template>
  <div class="main-container">
    <v-form
      ref="form"
      @submit.prevent="submit()">
      <TitleGlobal
        title="Edit product category"
        :back-to="{ name: 'ProductCategoryId', params: { id: $route.params.id } }" />
        <div class="d-flex flex-column gap-6">
        <v-card
          :loading="loading"
          class="py-6 px-8"
          border
          flat>
          <v-card-title class="font-weight-regular pa-0 pb-6"> Product category details </v-card-title>
          <v-card-text class="pa-0">
            <v-row>
              <v-col
                cols="12"
                sm="4">
                <label class="label font-400">
                  Product category name
                  <strong class="error">*</strong>
                </label>
                <v-text-field
                  v-model="form.name"
                  :rules="[$validate.required]"
                  required
                  hide-details />
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>
      </div>
      <div class="d-flex py-8 gap-5">
        <v-btn
          :loading="loading"
          variant="flat"
          type="submit">
          Save
        </v-btn>
        <v-btn-cancel
          :to="{ name: 'ProductCategoryId', params: { id: $route.params.id } }"
          :disabled="loading"
          :active="false" />
      </div>
    </v-form>
  </div>
</template>

<script>
import TitleGlobal from '@/components/TitleGlobal.vue';
import { snackbarStore } from '@/store/snackbar';
import ProductCategoryProvider from '@/resources/provider/product-category-provider';

const productCategoryService = new ProductCategoryProvider()

export default{
  name: 'ProductCategoryEdit',
  components:{TitleGlobal},
  setup: () => ({
    snackbarStore:snackbarStore()
  }),
  data() {
    return {
      loading: false,
      submitting: false,
      form: {
        name: ''
      }
    }
  },
  mounted() {
    this.getOne()
  },
  methods: {
    setLoading(val) {
      this.loading = val
    },
    setSubmitting(val) {
      this.submitting = val
    },
    async getOne() {
      try {
        this.setLoading(true)
        const { data } = await productCategoryService.getOne(this.$route.params.id)
        this.form = { name:data.name }
      } catch (error) {
        console.error('[ERROR] get product category by id', error)
        this.snackbarStore.showSnackbar(error, 'error')
      } finally {
        this.setLoading(false)
      }
    },
    async submit() {
      try {
        this.setSubmitting(true)
        const { valid } = await this.$refs.form.validate()
        if(!valid) return
        await productCategoryService.update(this.$route.params.id, this.form)
        this.snackbarStore.showSnackbar('Update product category successfully', 'success')
        this.$router.replace({ name: 'ProductCategoryId', params: { id: this.$route.params.id } })
      } catch (error) {
        console.error('[ERROR] update product category', error)
        this.snackbarStore.showSnackbar(error, 'error')
      } finally {
        this.setSubmitting(false)
      }
    }
  }


}
</script>
