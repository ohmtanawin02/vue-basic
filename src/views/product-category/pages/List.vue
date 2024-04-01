<template>
  <div class="main-container">
    <TitleGlobal
      title="Product category">
      <v-spacer />
      <v-btn-create
        :to="{ name: 'ProductCategoryCreate' }"
        :disabled="loading">
        Create Category 
      </v-btn-create>
    </TitleGlobal>
    <div class="card-table-container">
      <v-data-table
        :loading="loading"
        :headers="headers"
        :items="items"
        :items-per-page="pagination.perPage"
        height="685"
        fixed-header
        no-filter
        class="elevation-0"
        @click:row="handleClickRow">
        <template #bottom>
          <v-divider />
          <Pagination
            v-if="items.length"
            v-model="pagination"
            @update:model-value="updateQueries()" />
        </template>
      </v-data-table>
    </div>
  </div>
</template>

<script>
import Pagination from '@/components/Pagination.vue'
import ProductCategoryProvider from '@/resources/provider/product-category-provider'
import TitleGlobal from '@/components/TitleGlobal.vue'

const ProductCategoryService = new ProductCategoryProvider()
export default {
  name: 'ProductCategoriesList',
  components: { Pagination, TitleGlobal },
  data() {
    return {
      headers: [
        {
          title: 'Name',
          key: 'name'
        }
      ],
      items: [],
      pagination: {
        perPage: 10,
        page: 1,
        totalPage: 1,
        total: 0
      },
      loading: false
    }
  },
  created() {
    this.setQueries()
  },
  mounted() {
    this.getProductCategories()
  },
  methods: {
    setQueries() {
      this.pagination = {
        page: Number(this.$route?.query?.page) || 1,
        perPage: Number(this.$route?.query?.limit) || 10
      }
    },
    updateQueries() {
      this.$router.push({
        name: 'ProductCategoriesList',
        query: {
          page: this.pagination.page,
          limit: this.pagination.perPage
        }
      })
    },
    setLoading(val) {
      this.loading = val
    },
    handleClickRow(e, { item: { id } }) {
      this.$router.push({ name: 'ProductCategoryId', params: { id } })
    },
    async getProductCategories() {
      try {
        this.setLoading(true)
        const response = await ProductCategoryService.getAll({
          page: this.pagination.page,
          limit: this.pagination.perPage
        })
        this.items = response.data
        this.pagination.total = response?.totalDocs || 0
        this.pagination.totalPage =
          response?.totalPage || Math.ceil(response.totalDocs / this.pagination.perPage)
      } catch (error) {
        console.error('[ERROR] get product categories => ', error)
      } finally {
        this.setLoading(false)
      }
    }
  }
}
</script>
