<template>
  <div class="drag-container">
    <div class="drag-element" draggable="true" @dragstart="dragStart">
      <!-- 拖拽元素的内容 -->
      <div id="span">11111</div>
    </div>
    
    <div class="drop-target" @dragover.prevent @drop="dropElement">
      <!-- 放置目标的内容 -->
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    dragStart(event) {
      event.dataTransfer.setData("text/plain", event.target.id);
    },
    dropElement(event) {
      event.preventDefault();
      const elementId = event.dataTransfer.getData("text/plain");
      const element = document.querySelector(".drag-element");
      event.target.appendChild(element);
      element.style.position = "absolute";
      element.style.top = `${event.clientY-element.offsetHeight}px`;
      element.style.left = `${event.clientX-element.offsetWidth}px`;

      console.log("Dropped at: " + event.clientX + ", " + event.clientY);
    }
  }
};
</script>

<style>
.drag-container {
  /* 拖拽容器的样式 */
}

.drag-element {
  /* 拖拽元素的样式 */
  background-color: #44bc87;
  width: 5rem;
  height: 5rem;
}

.drop-target {
  /* 放置目标的样式 */
  position: relative;
  height: 50rem;
  background-color: #ddd;
  
}
</style>
