<template>
  <div class="img-input">
    <div
      class="image-input-block"
      @click="openVfileInput()">
      <div
        v-if="preview || imageUrl"
        class="box-img">
        <v-img
          :width="160"
          :height="160"
          aspect-ratio="1"
          :src="preview || imageUrl">
        </v-img>
      </div>
      <div
        v-else
        class="box-empty cursor-pointer">
        <v-icon color="secondary">mdi-image-area</v-icon>
      </div>
      <div class="input-overlay"> Change Image </div>
    </div>
    <div
      v-show="label"
      class="max-w-324 mt-2">
      <div class="label font-400">
        {{ label }}
        <strong
          v-if="required"
          class="error">
          *
        </strong>
      </div>
      <v-file-input
        id="fileUpload"
        variant="outlined"
        density="compact"
        hide-details
        rounded="lg"
        placeholder="s"
        prepend-icon=""
        prepend-inner-icon="mdi-camera"
        accept="image/png, image/jpeg, image/bmp"
        clearable
        @click:clear="clearPreview()"
        @update:model-value="setPreview($event)">
      </v-file-input>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ImgInput',
  props: {
    label: {
      type: String,
      defalut: null
    },
    required: {
      type: Boolean,
      defalut: false
    },
    imageUrl: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      preview: '',
      value: ''
    }
  },
  methods: {
    input(files) {
      let file = files[0]
      this.$emit('input', file)

      setTimeout(() => {
        if (file) {
          const reader = new FileReader()
          reader.onload = () => {
            this.preview = reader.result
            this.$emit('preview', this.preview)
          }
          reader.readAsDataURL(file)
        }
      }, 100)
    },
    openVfileInput() {
      let fileUpload = document.getElementById('fileUpload')
      if (fileUpload != null) {
        fileUpload.click()
      }
    },
    setPreview(files = []) {
      if (files[0]) {
        this.preview = URL.createObjectURL(files[0])
      }
    },
    clearPreview() {
      if (this.preview) {
        URL.revokeObjectURL(this.preview)
      }
      this.preview = ''
    }
  }
}
</script>

<style scoped lang="scss">
.image-input-block {
  display: inline-block;
  position: relative;
  cursor: pointer;

  .input-overlay {
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    padding: 8px;
    color: white;
    text-align: center;
    background: #0280d9;
    border-radius: 0 0 8px 8px;
  }

  .box-empty {
    width: 176px;
    height: 176px;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #f9fafb;
    border: 1px dashed #0280d9;
    border-radius: 8px;
    &:hover {
      background-color: #e3e6e8;
    }
  }

  .box-img {
    background-color: white;
    border: 1px dashed #0280d9;
    display: inline-block;
    padding: 8px;
    border-radius: 8px;
    cursor: pointer;
    &:hover {
      opacity: 0.7;
    }
  }
}
</style>
