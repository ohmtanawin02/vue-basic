<template>
  <v-form
    id="form"
    ref="form"
    class="d-flex flex-column gap-6">
    <v-card
      :loading="loading"
      class="py-6 px-8"
      border
      flat>
      <v-card-title class="font-weight-regular pa-0 pb-6"> Product Details </v-card-title>
      <v-card-text class="pa-0">
        <v-row>
          <v-col
            cols="12"
            md="4">
            <label class="label font-400">
              Name
              <strong class="error">*</strong>
            </label>
            <v-text-field
              :model-value="form.name"
              :rules="[$validate.required]"
              required
              hide-details
              @update:model-value="updateValue('name', $event)" />
          </v-col>
          <v-col
            cols="12"
            md="4">
            <label class="label font-400">
              Price
              <strong class="error">*</strong>
            </label>
            <v-text-field
              :model-value="form.price"
              :rules="[$validate.required]"
              required
              hide-details
              @update:model-value="updateValue('price', $event)" />
          </v-col>
          <v-col
            cols="12"
            md="4">
            <label class="label font-400">
              Category
              <strong class="error">*</strong>
            </label>
            <v-autocomplete
              :model-value="form.category"
              :rules="[$validate.required]"
              :items="categories"
              item-title="name"
              item-value="id"
              menu-icon="mdi-chevron-down"
              required
              hide-details
              @update:model-value="updateValue('category', $event)" />
          </v-col>
          <v-col
            cols="12"
            md="6">
            <label class="label font-400">
              Detail
            </label>
            <v-textarea
              :model-value="form.detail"
              @update:model-value="updateValue('detail', $event)" />
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>
    <div class="d-flex gap-6">
      <v-btn
        :loading="confirmLoading"
        :disabled="loading"
        variant="flat"
        @click="submit()"
        class="mr-4">
        Save
      </v-btn>
      <v-btn
        :active="false"
        :disabled="confirmLoading"
        @click="onClickCancel()">
        Cancel
      </v-btn>
      <v-spacer />
    </div>
  </v-form>
</template>

<script>
export default {
  name: 'ProductForm',
  components: {
  },
  props: {
    mode: {
      type: String,
      validator: (val) => ['create', 'edit'].includes(val),
      default: 'create'
    },
    loading: {
      type: Boolean,
      default: false
    },
    confirmLoading: {
      type: Boolean,
      default: false
    },
    categories: {
      type: Array,
      default: () => []
    },
    form: {
      type: Object,
      default: () => ({})
    }
  },

  methods: {
    onClickCancel() {
      this.$emit('click:cancel')
    },
    updateValue(name, value) {
      this.$emit('update:value', { name, value })
    },
    async submit() {
      const { valid } = await this.$refs.form.validate()
      if (!valid) return
      this.$emit('click:submit')
    }
  }
}
</script>

<style scoped>

</style>
