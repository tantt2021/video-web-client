<template>
  <div id="live">
    <test @hu="hu">
      </test>
  </div>
</template>

<script lang="ts" setup>
import test from "@/components/Test.vue";

const hu = (e)=>{
  console.log(e+222);
  
}
</script>

<style>
#live{
  
}
</style>