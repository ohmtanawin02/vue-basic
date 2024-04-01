<template>
  <div class="main-container">
    <div class="d-flex algin-center mb-4">
      <div class="d-flex align-center gap-1"> 
        <v-btn
          icon="mdi-chevron-left"
          variant="plain"
          :ripple="false"
          class="bg-transparent ml-n3"
          @click="goBack()" />
        <h3 class="title"> Edit Product </h3>
      </div>
      <v-spacer />
    </div>
    <ProductForm
      :form="form"
      :categories="categories"
      :loading="loading"
      :confirm-loading="submitting"
      mode="edit"
      @update:value="updateForm($event)"
      @click:submit="submit()"
      @click:cancel="onClickCancel()"
       />
  </div>
</template>

<script>
import ProductForm from '@/views/product/components/ProductForm.vue';
import { snackbarStore } from '@/store/snackbar'
import ProductCategoryProvider from '@/resources/provider/product-category-provider'
import ProductProvider from '@/resources/provider/product'

const ProductService = new ProductProvider()
const ProductCategoryService = new ProductCategoryProvider()
export default {
  name:'ProductEdit',
  components:{
    ProductForm
  },
  setup: () => ({
    snackbarStore: snackbarStore()
  }),
  data() {
    return {
      loading: false,
      submitting: false,
      deleteLoading: false,
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
    this.getOne()
  },
  methods: {
    goBack() {
      this.$router.push({
        name: 'ProductId',
        params: {
          id: this.$route.params.id
        }
      })
    },
    setLoading(val) {
      this.loading = val
    },
    setSubmitting(val) {
      this.submitting = val
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
    async getOne() {
      try {
        this.setLoading(true)
        const { data } = await ProductService.getOne(this.$route.params.id)

        this.form = { 
          name:data.name,
          price:data.price,
          category:data.category?.id,
          detail:data.detail
         }
      } catch (error) {
        console.error('[ERROR] get product by id', error)
      } finally {
        this.setLoading(false)
      }
    },
    async submit() {
      try {
        this.setSubmitting(true)
        await ProductService.update(this.$route.params.id, {
          name:this.form.name,
          price:this.form.price,
          category:this.form.category,
          detail:this.form.detail
        })
        this.snackbarStore.showSnackbar('Update product successfully', 'success')
        this.goBack()
      } catch (error) {
        console.error('[ERROR] submit update product => ', error)
        this.SnackbarStore.showSnackbar(error, 'error')
      } finally {
        this.setSubmitting(false)
      }
    }
  }
}
</script>

<style></style>
