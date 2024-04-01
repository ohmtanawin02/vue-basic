<template>
  <div class="main-container">
    <TitleGlobal
      title="New Product"
      :back-to="{ name: 'ProductList' }" />
    <ProductForm
      :form="form"
      :categories="categories"
      :confirmLoading="loading"
      @update:value="updateForm($event)"
      @click:submit="submit()"
      @click:cancel="onClickCancel()" />
  </div>
</template>

<script>
import { snackbarStore } from '@/store/snackbar'

import TitleGlobal from '@/components/TitleGlobal.vue'
import ProductForm from '@/views/product/components/ProductForm.vue'

import ProductCategoryProvider from '@/resources/provider/product-category-provider'
import ProductProvider from '@/resources/provider/product'

const ProductCategoryService = new ProductCategoryProvider()
const ProductService = new ProductProvider()

export default {
  name: 'ProductCreate',
  components: {
    TitleGlobal,
    ProductForm
  },
  setup: () => ({
    snackbarStore: snackbarStore()
  }),
  data() {
    return {
      loading: false,
      form: {
        name:'',
        price:null,
        category:null,
        detail:''
      },
      categories: []
    }
  },
  mounted() {
    this.getProductCategories()
  },
  methods: {
    setLoading(val) {
      this.loading = val
    },
    updateForm({ name, value }) {
      if (Array.isArray(value)) {
        this.form[name] = [...value]
      } else {
        this.form[name] = value
      }
    },
    onClickCancel() {
      this.$router.push({ name: 'ProductList' })
    },
    async getProductCategories() {
      try {
        const response = await ProductCategoryService.getAll()
        this.categories = response.data
      } catch (error) {
        console.error('[ERROR] get product categories', error)
        this.snackbarStore.showSnackbar(error, 'error')
      }
    },
    async submit() {
      try {
        this.setLoading(true)
        await ProductService.create({
          ...this.form
        })
        this.snackbarStore.showSnackbar('Create product successfully', 'success')
        this.$router.replace({ name: 'ProductList' })
      } catch (error) {
        console.error('[ERROR] submit create product => ', error)
        this.snackbarStore.showSnackbar(error, 'error')
      } finally {
        this.setLoading(false)
      }
    }
  }
}
</script>

<style></style>
