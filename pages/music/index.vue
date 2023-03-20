<template>
  <div class="music">
    music
    <canvas id="canvas" width="150" height="150"></canvas>
  </div>
</template>

<script lang="ts" setup>
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
onMounted(() => {
  draw();
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
