<template>
  <v-container class="error__container">
    <div class="d-flex flex-column gap-4 text-center px-5">
      <h2 class="text-2xl font-weight-semibold text--primary d-flex align-center justify-center">
        Page Not Found
      </h2>
      <p class="text-sm">
        we couldn't find the page you are looking for
      </p>
      <div>
        <v-btn
          :to="{ name: 'ProductCategory' }"
          color="primary"
          class="mb-4">
          Back to home
        </v-btn>
      </div>
    </div>
  </v-container>
</template>

<script setup>
</script>

<style lang="scss">
</style>

<style scoped>
.error__container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
}
</style>
