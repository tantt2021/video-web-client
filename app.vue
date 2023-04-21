<template>
  <div class="root">
    <Layout/>
  </div>
</template>
<script lang="ts" setup>
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
