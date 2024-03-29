<template>
  <div class="d-flex align-center gap-3 pb-3">
    <div class="d-flex align-center gap-1">
      <slot name="back-button">
        <v-btn
          v-if="backTo"
          icon="mdi-chevron-left"
          variant="plain"
          :ripple="false"
          :to="backTo"
          class="bg-transparent ml-n3"/>
      </slot>
      <h3 class="title">{{  title }}</h3>
    </div>
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'TitleGlobal',
  props: {
    to: {
      type: [Boolean, Object],
      default: null
    },
    title: {
      type: String,
      default: ''
    },
    backTo: {
      type: [Boolean, Object],
      default: null
    }
  },
  data() {
    return {
      items: []
    }
  },
  methods: {}
}
</script>

<style scoped>
.title {
  color: #0280d9;
  font-size: 20px;
  font-weight: 400;
}
</style>