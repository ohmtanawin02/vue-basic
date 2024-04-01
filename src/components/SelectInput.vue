<template>
  <div class="select-input">
    <label
      v-if="label"
      class="label font-400">
      {{ label }}
      <strong
        v-if="required"
        class="error">
        *
      </strong>
    </label>
    <v-select
      v-bind="$attrs"
      :hide-details="!$attrs['error-messages']" />
  </div>
</template>

<script>
export default {
  name: 'SelectInput',
  props: {
    label: {
      type: String,
      default: ''
    },
    required: {
      type: Boolean,
      default: false
    }
  }
}
</script>
