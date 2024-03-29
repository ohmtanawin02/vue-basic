<template>
  <div class="label-text-field">
    <label
      v-if="label"
      class="font-400">
      {{ label }}
      <strong
        v-if="required"
        class="error">
        *
      </strong>
    </label>
    <slot>
      <v-text-field v-bind="$attrs" />
    </slot>
  </div>
</template>

<script>
export default {
  name: 'TextField',
  props: {
    label: {
      type: String,
      default: ''
    },
    typeInput: {
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

<style></style>
