<template>
  <div>
    <router-view :key="$route.fullPath" />
  </div>
</template>

<script>

export default {
  name: 'Product'
}
</script>
