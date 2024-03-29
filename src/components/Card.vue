<template>
  <v-card>
    <v-row>
      <v-col cols="6">
        <v-img :src="item.image" alt="Product Image" width="100%" />
      </v-col>
      <v-col cols="6">
        <v-card-title>{{ item.title }}</v-card-title>
        <v-card-text>
          <p>{{ item.description }}</p>
          <span>Price: ฿ {{ item.price }}</span>
        </v-card-text>
      </v-col>
    </v-row>
  </v-card>
</template>

<script>
export default {
  props: {
    item: Object
  }
};
</script>

<style scoped>
</style>
