<template>
  <div class="main-container">
    <div class="d-flex flex-column flex-md-row gap-6">
      <div class="flex-grow-1 input-search-320">
        <SearchField
          v-model="filters.search"
          placeholder="Search"
          hide-details
          @click:search="searchFilter()"
          style="padding-bottom: 0.5rem" />
      </div>
      <v-spacer class="d-none d-md-block" />
      <v-btn-export
        :loading="exporting"
        :disabled="loading"
        @click="exportData()"
        style="margin-right: 1rem" />
      <v-btn-create
        :to="{ name: 'ProductCreate' }"
        :disabled="loading || exporting">
        Product
      </v-btn-create>
    </div>
    <div class="card-table-container">
      <v-data-table
        v-model="selected"
        :loading="loading"
        :headers="headers"
        :items="items"
        :items-per-page="pagination.perPage"
        density="compact"
        height="600"
        item-value="id"
        fixed-header
        show-select
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
import SearchField from '@/components/SearchField.vue'
import ProductProvider from '@/resources/provider/product'
import { snackbarStore } from '@/store/snackbar'

const ProductService = new ProductProvider()

export default {
  name: 'ProductList',
  components: {
    Pagination,
    SearchField
  },
  setup: () => ({
    snackbarStore: snackbarStore()
  }),
  data() {
    return {
      selected: [],
      headers: [
        {
          title: 'Product code.',
          key: 'code'
        },
        {
          title: 'Name',
          key: 'name'
        },
        {
          title: 'Price',
          key: 'price'
        },
        {
          title: 'Category',
          key: 'category.name'
        }
      ],
      items: [],
      pagination: {
        perPage: 10,
        page: 1,
        totalPage: 1,
        total: 0
      },
      loading: false,
      exporting: false
    }
  },
  created() {
    this.setQueries()
  },
  mounted() {
    this.getProducts()
  },
  methods: {
    setQueries() {
      this.pagination = {
        page: Number(this.$route?.query?.page) || 1,
        perPage: Number(this.$route?.query?.limit) || 10
      }
      this.filters = {
        search: this.$route?.query?.search !== undefined ? this.$route.query.search : ''
      }
    },
    updateQueries() {
      this.$router.replace({
        name: 'ProductList',
        query: {
          ...this.filters,
          page: this.pagination.page,
          limit: this.pagination.perPage
        }
      })
      this.getProducts()
    },
    setLoading(val) {
      this.loading = val
    },
    handleClickRow(e, { item: { id } }) {
      this.$router.push({ name: 'ProductId', params: { id } })
    },
    searchFilter() {
      this.pagination.page = 1
      this.updateQueries()
    },
    async getProducts() {
      try {
        this.setLoading(true)
        const response = await ProductService.getAll({
          page: this.pagination.page,
          limit: this.pagination.perPage,
          search: this.filters.search
        })
        this.items = response.data
        this.pagination.total = response?.totalDocs || 0
        this.pagination.totalPage =
          response?.totalPage || Math.ceil(response.totalDocs / this.pagination.perPage)
      } catch (error) {
        console.error('[ERROR] get products =>', error)
        this.snackbarStore.showSnackbar(error, 'error')
      } finally {
        this.setLoading(false)
      }
    },
    async exportData() {
      try {
        this.exporting = true
        const productIds = this.selected.length ? this.selected : [] 
        const response = await ProductService.getExportData({
          productIds
        })
        const fileURL = window.URL.createObjectURL(new Blob([response]))
        const fileLink = document.createElement('a')
        fileLink.href = fileURL

        const fileName = `products-${this.$dayjs().format('YYYY-MM-DD')}.xlsx`
        fileLink.setAttribute('download', fileName)
        fileLink.setAttribute('target', '_blank')
        document.body.appendChild(fileLink)
        fileLink.click()
        fileLink.remove()
        this.snackbarStore.showSnackbar('Export products successfully', 'success')
      } catch (error) {
        console.error('[ERROR] export products data => ', error)
        this.SnackbarStore.showSnackbar(error, 'error')
      } finally {
        this.exporting = false
      }
    }
  }
}
</script>

<style></style>
