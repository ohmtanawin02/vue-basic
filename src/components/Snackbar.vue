<template>
  <v-snackbar
    v-model="store.show"
    :color="store.color"
    location="top center"
    :rounded="8">
    <v-icon
      v-if="icons"
      :color="store.color">
      {{ icons }}
    </v-icon>
    {{ store.msg }}
  </v-snackbar>
</template>

<script setup>
import { snackbarStore } from '@/store/snackbar'
import { computed } from 'vue'

const store = snackbarStore()
const icons = computed(() => {
  switch (store.type) {
    case 'success':
      return 'mdi-check-circle-outline'
    case 'error':
      return 'mdi-close-circle-outline'
    default:
      return store.icon
  }
})
</script>

<style></style>
