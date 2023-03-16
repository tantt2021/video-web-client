<template>
  <div>music</div>
</template>

<script lang="ts" setup>
import useStore from "@/store";
let { user } = useStore();
console.log(user.username + "111");
watch(
  () => user,
  (n, o) => {
    console.log(n);
  },
  { deep: true, immediate: true }
);
</script>
