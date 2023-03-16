<template>
  <div class="music">
    music
    <marque :style="{ top: Math.random() * 10 + '%' }">111</marque>
    <marque :style="{ top: Math.random() * 10 + '%' }">111</marque>
    <marque :style="{ top: Math.random() * 10 + '%' }">111</marque>
    <marque :style="{ top: Math.random() * 10 + '%' }">111</marque>
    <marque :style="{ top: Math.random() * 10 + '%' }">111</marque>
    <!-- <marque>222</marque> -->
  </div>
</template>

<script lang="ts" setup>
import marque from "~~/components/Marque.vue";
</script>

<style lang="scss">
.music {
  position: relative;
  height: 100%;
  width: 100%;
  overflow: hidden;
}
</style>
