<template>
  <v-app>
    <HeaderBar />
    <!-- <TheNavBar /> -->
    <Snackbar />
    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script>
import Snackbar from '@/components/Snackbar.vue'
import HeaderBar from '@/components/HeaderBar.vue'

export default {
  name: 'DefaultLayout',
  components: {
    Snackbar,
    HeaderBar
    // TheNavBar
  }
}
</script>

<style>
.v-main {
  background-color: #f9fafb;
  /* #B2C8DF */
  padding-left: 24px;
}
</style>
