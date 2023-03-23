<template>
    <div>
      <p>视窗宽度: {{ windowWidth }}</p>
      <p>依赖视窗宽度的数据: {{ dataDependentOnWindowWidth }}</p>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        dataDependentOnWindowWidth: null,
        windowWidth: window.innerWidth,
      };
    },
    mounted() {
      window.addEventListener('resize', this.handleResize);
    },
    beforeUnmount() {
      window.removeEventListener('resize', this.handleResize);
    },
    methods: {
      handleResize() {
        this.windowWidth = window.innerWidth;
      },
    },
    watch: {
      windowWidth(newWidth) {
        this.dataDependentOnWindowWidth = newWidth * 2;
      },
    },
  };
  </script>