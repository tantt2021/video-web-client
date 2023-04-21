<template>
  <div class="root">
    <Layout/>
  </div>
</template>
<script lang="ts" setup>
import 'emoji-mart-vue-fast/css/emoji-mart.css'
// Note: component needs to be imported from /src subfolder:
// import AppPickerOptions from './AppPickerOptions'
// import AppPickerComposition from './components/AppPickerComposition.vue';
useHead({
  link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
})
let route = useRoute();

</script>

<style lang="scss" scoped>
.root {
  // max-width: 2560px;
  // min-width: 580px;
  margin: 0 auto;

}
</style>
