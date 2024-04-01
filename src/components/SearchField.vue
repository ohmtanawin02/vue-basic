<template>
  <div>
    <v-text-field
      v-bind="$attrs"
      @keypress.enter="$emit('click:search')">
      <template #append-inner>
        <v-btn
          color="primary"
          variant="flat"
          height="44"
          class="px-0"
          @click="$emit('click:search')">
          <v-icon size="large"> mdi-magnify </v-icon>
        </v-btn>
      </template>
    </v-text-field>
  </div>
</template>

<script>
export default {
  name: 'SearchField',
  props: {}
}
</script>

<style lang="scss" scoped>
:deep(.v-field--appended) {
  padding-inline-end: 0px;
}
:deep(.v-btn--size-default) {
  min-width: 56px;
}
</style>
