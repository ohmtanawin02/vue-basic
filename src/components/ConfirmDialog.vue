<template>
  <v-dialog
    v-model="dialog"
    width="500">
    <template v-slot:activator="{ props }">
      <slot :props="props"></slot>
    </template>
    <v-card>
      <v-card-title class="d-flex w-full">
        <span> {{ title }} </span>
        <v-spacer />
        <v-icon
          size="small"
          @click="close()">
          mdi-close-circle-outline
        </v-icon>
      </v-card-title>
      <v-card-text>
        {{ subtitle }}
      </v-card-text>
      <v-divider />
      <v-card-actions class="justify-end">
        <v-btn
          color="secondary"
          class="mr-3"
          @click="close()">
          Cancel
        </v-btn>
        <v-btn
          :color="confirmColorBtn"
          variant="flat"
          @click="confirm()">
          {{ confirmTextBtn }}
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: 'ConfirmDialog',
  props: {
    title: {
      type: String,
      default: ''
    },
    subtitle: {
      type: String,
      default: ''
    },
    confirmTextBtn: {
      type: String,
      default: ''
    },
    confirmColorBtn: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      dialog: false
    }
  },
  methods: {
    close() {
      this.dialog = false
    },
    confirm() {
      this.$emit('click:confirm')
      this.close()
    }
  }
}
</script>

<style scoped>
.w-full {
  width: 100%;
}
</style>
