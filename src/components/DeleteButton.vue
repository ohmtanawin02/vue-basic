<template>
  <v-dialog
    v-model="dialog"
    width="500">
    <template v-slot:activator="{ props }">
      <v-btn
        v-bind="props"
        color="error">
        Delete
      </v-btn>
    </template>
    <v-card>
      <v-card-title class="d-flex justify-space-between w-full">
        Delete
        <v-icon
          size="small"
          @click="close()">
          mdi-close-circle-outline
        </v-icon>
      </v-card-title>
      <v-card-text>
        Are you sure to delete <strong> {{ itemName }} </strong> ?
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
          variant="flat"
          color="error"
          @click="confirm()">
          Delete
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: 'DeleteButton',
  props: {
    itemName: {
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
      this.$emit('delete')
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
