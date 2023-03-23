<template>
  <div class="music">
    music
    <canvas id="canvas" width="150" height="150"></canvas>
    <a-slider id="test" v-model:value="value1" :disabled="disabled" @change="change" :step="value1"/>
  </div>
</template>

<script lang="ts" setup>
import { onMounted } from 'vue';
function draw() {
  var canvas = document.getElementById("canvas");
  if (canvas.getContext) {
    var ctx = canvas.getContext("2d");

    ctx.beginPath();
    ctx.moveTo(75, 50);
    ctx.lineTo(100, 75);
    ctx.lineTo(100, 25);
    ctx.fill();
  }
}
let value1 = ref(0);
let disabled = ref(false);
const change = () => {
  console.log(value1.value);
  
}
onMounted(() => {
  draw();
  setInterval(()=>{
    value1.value+=0.01;
  },20);
});
</script>

<style lang="scss">
.music {
  position: relative;
  height: 100%;
  width: 100%;
  overflow: hidden;
}
</style>
