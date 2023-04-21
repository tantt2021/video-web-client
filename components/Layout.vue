<template>
  <div class="layout-box"> 
    <a-layout class="layout" auto-height>
      <a-layout>
        <Header v-if="route.path!=='/studio'"></Header>
        <a-layout-content :style="{ padding: '0', background: '#f6f6f6', minHeight: '280px',overflowY:'auto',height:route.path!=='/studio'?'calc(100vh - 3.5rem)':'100vh' }" class="layout-content">

          <client-only>
            <Suspense>
              <nuxt-page></nuxt-page>

              <template #fallback>
                <div>加载中......</div>
              </template>
            </Suspense>
            <template #placeholder>
              <div class="loading">
                <!-- <loading-outlined /> -->
                ...
              </div>
            </template>
          </client-only>
        </a-layout-content>

        
      </a-layout>
    </a-layout>
    <!-- <transition name="" mode=""> -->
      <button class="toTop" @click="toTop" v-show="show"><up-outlined /></button>
  </div>    
    <!-- </transition> -->
  </template>
  <script lang="ts" setup>
  import {  ref, reactive,onMounted} from 'vue';
  import {
    UserOutlined,
    VideoCameraOutlined,
    CustomerServiceOutlined,
    LikeOutlined,
    LoadingOutlined,
    PlaySquareOutlined,
    CrownOutlined,
    FireOutlined,
    UpOutlined,
  } from '@ant-design/icons-vue';
  const route = useRoute();

  
  let collapsed = ref<boolean>(false);
  

  
  // 回顶按钮
  const toTop = () => {
    window.scrollTo({
      top: 0,
      behavior:'smooth',
    });
  }
  const resize = ()=>{
      if(window.innerWidth < 1000){
        collapsed.value = true;
      }else{
        collapsed.value = false;

      }
      
    };

  let show = ref(false);
  onMounted(() => {
    window.addEventListener("scroll", () => {
      let html = document.documentElement;
      if (html.scrollTop > 500) {
        show.value = true;
      } else {
        show.value = false;
      }
    });
    resize();
    window.addEventListener("resize",resize);
  });
  </script>
  <style scoped lang="scss">
  .toTop{
    position: fixed;
    right: 1rem;
    bottom: 3rem;
    border: 1px solid #ddd;
    padding: .5rem;
  }
  .layout-box{
    height: calc(100vh - 3.5rem);

    .layout {
      user-select: none;
      width: 100%;
      display: flex;
      flex-direction: row;
      
    }
  }

  .loading{
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
    font-size: 3rem;
  }
  .layout-content{
    /* width: 100%; */
  }

  </style>
    