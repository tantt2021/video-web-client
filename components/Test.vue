<template>
  <div class="" @click="click">test</div>
</template>

<script lang="ts" setup>
const emit = defineEmits(["hu"]);
const click = () => {
  emit("hu",'1111');
}
</script>

<style scoped lang="scss"></style>
