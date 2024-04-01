<template>
  <div class="main-container">
    <TitleGlobal
      title="Product detail"
      :back-to="{ name: 'ProductList' }">
      <v-spacer />
      <v-btn-edit
        :to="{ name: 'ProductEdit', params: { id: $route.params.id } }"
        style="margin-right: 1rem">
        Edit
      </v-btn-edit>
      <DeleteButton
        :item-name="form.name"
        @delete="removeProduct()" />
    </TitleGlobal>
    <div class="d-flex flex-column gap-6">
      <v-card
        :loading="loading"
        class="py-6 px-8"
        border
        flat>
        <v-card-title class="font-weight-regular pa-0 pb-2"> Product Details </v-card-title>
        <v-card-text class="pa-0">
          <v-row>
            <v-col
              cols="12"
              md="4">
              <div class="label">Name</div>
              <div class="font-400"> {{ form.name }} </div>
            </v-col>
            <v-col
              cols="12"
              md="4">
              <div class="label">Price</div>
              <div class="font-400"> {{ form.price }} </div>
            </v-col>
            <v-col
              cols="12"
              md="4">
              <div class="label">Category</div>
              <div class="font-400"> {{ form.category?.name || ''}} </div>
            </v-col>
            <v-col
              cols="12"
              md="4">
              <div class="label">Detail</div>
              <div class="font-400"> {{ form.detail }} </div>
            </v-col>
          </v-row>
        </v-card-text>
      </v-card>
    </div>
  </div>
</template>

<script>
import ProductProvider from '@/resources/provider/product'
import TitleGlobal from '@/components/TitleGlobal.vue'
import DeleteButton from '@/components/DeleteButton.vue'

const ProductService = new ProductProvider()

export default {
  name: 'ProductId',
  components: {
    TitleGlobal,
    DeleteButton
  },
  data() {
    return {
      loading: false,
      form: {
        name: '',
        price: null,
        category: null,
        detail: ''
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
    async getOne() {
      try {
        this.setLoading(true)
        const { data } = await ProductService.getOne(this.$route.params.id)
        this.form = { ...data }
      } catch (error) {
        console.error('[ERROR] get product by id', error)
      } finally {
        this.setLoading(false)
      }
    },
    async removeProduct() {
      try {
        this.setLoading(true)
        await ProductService.deleteData(this.$route.params.id)
        this.$router.replace({ name: 'ProductList' })
      } catch (error) {
        console.error('[ERROR] delete product by id', error)
      } finally {
        this.setLoading(false)
      }
    }
  }
}
</script>

<style scoped>
.label {
  font-weight: bold;
}
</style>
