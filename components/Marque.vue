<template>
  <div class="marque">
    <slot></slot>
  </div>
</template>

<script setup>
import {} from "vue";
</script>

<style scoped lang="scss">
.marque {
  position: absolute;
  animation: marquee 5s linear forwards;
  color: #fff;
  font-size: 1.5rem;
}
@keyframes marquee {
  0% {
    right: 0;
    transform: translateX(100%);
  }
  100% {
    right: 100%;
  }
}
</style>
