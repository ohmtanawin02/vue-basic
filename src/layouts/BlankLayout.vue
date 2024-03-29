<template>
  <v-app>
    <Snackbar/>
    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script>
import Snackbar from '@/components/Snackbar.vue';
export default {
  name:'BlankLayout',
  components: {
    Snackbar
  }
}
</script>
