import { ref } from 'vue'
import { defineStore } from 'pinia'

export const snackbarStore = defineStore('snackbar', () => {
  const msg = ref('')
  const color = ref('success')
  const show = ref(false)
  const type = ref('success')
  const icon = ref(null)
  const showSnackbar = (
    text = 'Unexpected error occurred',
    actionType = 'success',
    actionColor,
    actionIcon
  ) => {
    let innerText = text
    if (actionType === 'error') {
      innerText = text?.response?.data?.message || text?.message || text
    }
    msg.value = innerText
    show.value = true
    color.value = actionColor || actionType
    type.value = actionType
    icon.value = actionIcon
  }
  return { msg, color, show, showSnackbar }
})
