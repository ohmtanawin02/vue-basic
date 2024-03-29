<template>
  <v-container fluid>
    <v-row class="product-list">
      <v-col v-for="item in items" :key="item.id" cols="3">
        <ProductCard :product="product" />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import ProductCard from '@/components/ProductCard.vue'

export default {
  name: 'ProductListMock',
  components: {
    ProductCard
  },
  data() {
    return {
      items: [
        {
          id: 1,
          image: 'src/assets/images/boo-sleepy-monsters-inc-110217.jpg',
          title: 'Product 1',
          description: 'This is a description for product 1',
          price: 19.99
        },
        {
          id: 2,
          image: 'src/assets/images/boo-sleepy-monsters-inc-110217.jpg',
          title: 'Product 2',
          description: 'This is a description for product 2',
          price: 24.50
        },
        {
          id: 3,
          image: 'src/assets/images/boo-sleepy-monsters-inc-110217.jpg',
          title: 'Product 3',
          description: 'This is a description for product 3',
          price: 39.95
        },
        {
          id: 4,
          image: 'src/assets/images/boo-sleepy-monsters-inc-110217.jpg',
          title: 'Product 4',
          description: 'This is a description for product 4',
          price: 15.75
        }
      ]
    };
  }
};
</script>

<style scoped>
.product-list {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
}

.product-list .v-col {
  margin-bottom: 20px; 
}
</style>
