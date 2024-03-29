<template>
  <v-row
    class="gap-3 pa-3"
    align="center"
    justify="center"
    no-gutters>
    <v-col clos="auto">
      <span>
        {{ (pagination?.page - 1) * pagination?.perPage + 1 }}
        -
        {{
          pagination?.page * pagination?.perPage > pagination?.total
            ? pagination?.total
            : pagination?.page * pagination?.perPage
        }}
        of
        {{ pagination?.total }}
      </span>
    </v-col>
    <v-spacer class="d-none d-md-block" />
    <v-col
      v-if="!hidePerPage"
      cols="auto"
      class="d-flex align-center gap-4">
      <v-select-page
        v-model="perPage"
        :items="perPageItems"
        item-title="title"
        item-value="value"
        menu-icon="mdi-chevron-down"
        rounded />
    </v-col>
    <v-col cols="auto">
      <v-pagination
        v-model="page"
        :length="pagination?.totalPage || 1"
        :total-visible="4"
        rounded="circle"
        size="small"
        show-first-last-page
        :class="{ 'single-page': pagination?.totalPage === 1 }" />
    </v-col>
  </v-row>
</template>

<script>
export default {
  name: 'PaginationComponent',
  props: {
    modelValue: {
      type: Object,
      default: () => ({
        perPage: 10,
        page: 1,
        totalPage: 1,
        total: 0
      }),
      required: true
    },
    hidePerPage: {
      type: Boolean
    },
    hideGoToPage: {
      type: Boolean
    }
  },
  data() {
    return {
      goToPageValue: this.modelValue.page,
      perPageItems: [
        {
          title: '10',
          value: 10
        },
        {
          title: '25',
          value: 25
        },
        {
          title: '50',
          value: 50
        },
        {
          title: 'All',
          value: 99999
        }
      ]
    }
  },
  computed: {
    page: {
      get() {
        return this.pagination.page
      },
      set(val) {
        this.goToPageValue = val
        this.$emit('update:modelValue', {
          ...this.pagination,
          page: val
        })
      }
    },
    perPage: {
      get() {
        return this.pagination.perPage
      },
      set(val) {
        this.$emit('update:modelValue', {
          ...this.pagination,
          page: 1,
          perPage: val
        })
      }
    },
    pagination() {
      return this.modelValue
    }
  },
  methods: {
    checkMaxPages() {
      if (this.goToPageValue > this.pagination.totalPage) {
        this.goToPageValue = this.pagination.totalPage
      }
      if (this.goToPageValue < 1) {
        this.goToPageValue = 1
      }
    },
    goToPageEnter() {
      this.checkMaxPages()
      this.goToPage(this.goToPageValue)
    },
    goToPage(value) {
      if (value > this.pagination.totalPage || value < 1) return
      this.page = value
    }
  }
}
</script>

<style lang="scss" scoped>
.single-page {
  :nth-child(3) {
    border-radius: 99px !important;

    button {
      border-radius: 99px !important;
      border: 1px solid #0280d9;
      color: white;
      background: #0280d9;
    }
  }
}
</style>
