<template>
  <div class="live-demo">
    <!-- Select a picture for cropping -->
    <section class="section">
      <p>
        Click the button to select the picture first, and it will enter the
        cutting process.
      </p>

      <!-- Set a button that invokes selecting an image -->
      <button class="select-picture">
        <span>Select Picture</span>
        <input
          ref="uploadInput"
          type="file"
          accept="image/jpg, image/jpeg, image/png, image/gif"
          @change="selectFile"
        />
      </button>
    </section>

    <!-- Crop result preview -->
    <section class="section" v-if="result.dataURL && result.blobURL">
      <p>A preview of the cropped Base64 image:</p>
      <div class="preview">
        <img :src="result.dataURL" />
      </div>
      <p>A preview of the cropped blob image:</p>
      <div class="preview">
        <img :src="result.blobURL" />
      </div>
      <p>Press F12 to see the printed base64 / blob / file results.</p>
    </section>

    <!-- A Popup for cropping -->
    <!-- You can replace it with the framework's Modal component -->
    <div class="modal-wrap" v-if="isShowModal">
      <div class="modal-mask"></div>
      <div class="modal-scroll-view">
        <div class="modal">
          <div class="modal-title">
            <span class="title">Picture Cropping</span>
            <div class="tools">
              <button class="btn" @click="isShowModal = false">Cancel</button>
              <button class="btn" @click="clear">Clear</button>
              <button class="btn" @click="reset">Reset</button>
              <button class="btn primary" @click="getResult">Crop</button>
            </div>
          </div>

          <div class="modal-content">
            <!-- The component imported from `vue-picture-cropper` plugin -->
            <VuePictureCropper
              :boxStyle="{
                width: '100%',
                height: '100%',
                backgroundColor: '#f8f8f8',
                margin: 'auto',
              }"
              :img="pic"
              :options="{
                viewMode: 1,
                dragMode: 'crop',
                aspectRatio: 16 / 9,
              }"
              @ready="ready"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
// Replace `../../lib` with `vue-picture-cropper`
import VuePictureCropper, { cropper } from 'vue-picture-cropper'

const isShowModal = ref<boolean>(false)
    const uploadInput = ref<HTMLInputElement | null>(null)
    const pic = ref<string>('')
    const result = reactive({
      dataURL: '',
      blobURL: '',
    })

    /**
     * Select the picture to be cropped
     */
    function selectFile(e: Event) {
      // Reset last selection and results
      pic.value = ''
      result.dataURL = ''
      result.blobURL = ''

      // Get selected files
      const { files } = e.target as HTMLInputElement
      if (!files || !files.length) return
      
      // Convert to dataURL and pass to the cropper component
      const file = files[0]
      const reader = new FileReader()
      reader.readAsDataURL(file)
      reader.onload = () => {
        // Update the picture source of the `img` prop
        pic.value = String(reader.result)

        // Show the modal
        isShowModal.value = true

        // Clear selected files of input element
        if (!uploadInput.value) return
        uploadInput.value.value = ''
      }
    }

    /**
     * Get cropping results
     */
    async function getResult() {
      if (!cropper) return
      const base64 = cropper.getDataURL()
      const blob: Blob | null = await cropper.getBlob()
      if (!blob) return

      const file = await cropper.getFile({
        fileName: 'Test file name, optional',
      })

      console.log({ base64, blob, file })
      result.dataURL = base64
      result.blobURL = URL.createObjectURL(blob)
      isShowModal.value = false
    }

    /**
     * Clear the crop box
     */
    function clear() {
      if (!cropper) return
      cropper.clear()
    }

    /**
     * Reset the default cropping area
     */
    function reset() {
      if (!cropper) return
      cropper.reset()
    }

    /**
     * The ready event passed to Cropper.js
     */
    function ready() {
      console.log('Cropper is ready.')
    }
</script>

<style scoped>
.modal-content,.section{
  width: 200px;
}
/* img{
  width: 100%;
} */
</style>