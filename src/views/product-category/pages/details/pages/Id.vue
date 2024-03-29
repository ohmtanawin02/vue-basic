<template>
  <div class="main-container">
    <TitleGlobal
      title="Product category detail"
      :back-to="{ name: 'ProductCategoriesList' }">
      <v-spacer />
      <v-btn-edit :to="{ name: 'ProductCategoryEdit', params: { id: $route.params.id } }" style="margin-right: 1rem;">
        Edit
      </v-btn-edit>
      <DeleteButton
        :item-name="detail.name"
        @delete="removeProductCategory()" />
    </TitleGlobal>
    <div class="d-flex flex-column gap-6">
      <v-card
        :loading="loading"
        class="py-6 px-8"
        border
        flat>
        <v-card-title class="font-weight-regular pa-0 pb-2"> Product Category Details </v-card-title>
        <v-card-text class="pa-0">
          <v-row>
            <v-col>
              <div class="label">Category name</div>
              <div class="font-400"> {{ detail.name }} </div>
            </v-col>
          </v-row>
        </v-card-text>
      </v-card>
    </div>
  </div>
</template>

<script>
import TitleGlobal from '@/components/TitleGlobal.vue'
import DeleteButton from '@/components/DeleteButton.vue'
import ProductCategoryProvider from '@/resources/provider/product-category-provider'

const ProductCategoryService = new ProductCategoryProvider()

export default {
  name: 'ProductCategoryId',
  components: {
    TitleGlobal,
    DeleteButton
  },
  data() {
    return {
      loading: false,
      detail: {
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
    async getOne() {
      try {
        this.setLoading(true)
        const { data } = await ProductCategoryService.getOne(this.$route.params.id)
        this.detail = { ...data }
      } catch (error) {
        console.error('[ERROR] get product category by id', error)
      } finally {
        this.setLoading(false)
      }
    },
    async removeProductCategory() {
      try {
        this.setLoading(true)
        await ProductCategoryService.deleteData(this.$route.params.id)
        this.$router.replace({ name: 'ProductCategoriesList' })
      } catch (error) {
        console.error('[ERROR] delete product category by id', error)
      } finally {
        this.setLoading(false)
      }
    }
  }
}
</script>


<style scoped>

.label {
  font-weight:bold
}

</style>