<template>
  <DefaultLayout
  v-if="layoutName === 'default'"
  class="layout-default" />
  <BlankLayout
  v-else-if="layoutName === 'blank'"
  class="layout-blank" />
</template>

<script>
import DefaultLayout from '@/layouts/DefaultLayout.vue'
import BlankLayout from  '@/layouts/BlankLayout.vue'


export default {
components: {
  DefaultLayout,
  BlankLayout
},
computed: {
  layoutName() {
    const layout = this.$route?.meta?.layout || ''
    return layout?.toLowerCase() || 'default'
  }
}
}
</script>
