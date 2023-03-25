<template>
    <div>
        <img src="../../assets/img/侧耳.jpg" alt="">
      <img v-for="(image, index) in images" :key="index" :src="`${image.src}`" class="lazy-image" ref="image" />
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        images: [
          { src: '../../assets/img/侧耳.jpg', loaded: false },
          { src: '../../assets/img/侧耳.jpg', loaded: false },
          { src: '../../assets/img/侧耳.jpg', loaded: false },
          { src: '../../assets/img/侧耳.jpg', loaded: false },
          { src: '../../assets/img/侧耳.jpg', loaded: false },
        ],
      };
    },
    mounted() {
      const images = this.$refs.image;
      const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const lazyImage = entry.target;
            lazyImage.src = lazyImage.dataset.src;
            lazyImage.addEventListener('load', () => {
              lazyImage.classList.add('fade-in');
            });
            observer.unobserve(lazyImage);
          }
        });
      });
  
      images.forEach((image) => {
        observer.observe(image);
      });
    },
  };
  </script>
  
  <style scoped>
  .lazy-image {
    opacity: 0;
    transition: opacity 0.3s;
  }
  
  .fade-in {
    opacity: 1;
  }
  </style>
  