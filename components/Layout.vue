<template>
  <div class="layout-box"> 
    <a-layout class="layout" auto-height>
      <a-layout-sider v-model:collapsed="collapsed" :trigger="null" collapsible >
        
        <a-menu v-model:selectedKeys="selectedKeys" theme="light" :style="{backgroundColor:'#f6f6f6'}" mode="inline"  class="menu">
          <a-menu-item @click="navigateTo('/')">
              <span>QOOT</span>
          </a-menu-item>
          <a-menu-item key="1" @click="navigateTo('/')">
              <like-outlined />
              <span>首页</span>
          </a-menu-item>
          <a-menu-item key="2" @click="navigateTo('/discover')">
              <user-outlined/>
              <span>推荐</span>
          </a-menu-item>
          
          <a-menu-item key="3" @click="navigateTo('/popular')">
              <fire-outlined />
              <span>排行榜</span>
          </a-menu-item>
          <a-menu-item key="4" @click="navigateTo('/space')">
              <crown-outlined />
              <span>动态</span>
          </a-menu-item>
          <!-- 分割线 -->
          <a-divider style="border-color: #44bc87"  />
          <a-menu-item key="6" @click="navigateTo('/music')">
              <customer-service-outlined />
              <span>音乐</span>
          </a-menu-item>
          <a-menu-item key="7" @click="navigateTo('/live')">
              <video-camera-outlined />
              <span>直播</span>
          </a-menu-item>
          <a-menu-item key="8" @click="navigateTo('/movie')">
              <play-square-outlined />
              <span>电影</span>
          </a-menu-item>
        </a-menu>
      </a-layout-sider>
      <a-layout>
        <Header v-if="route.path!=='/studio'"></Header>

        <a-layout-content :style="{ padding: '0', background: '#fff', minHeight: '280px',overflowY:'auto',height:route.path!=='/studio'?'calc(100vh - 3.5rem)':'100vh' }" class="layout-content">
          <nuxt-page></nuxt-page>
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
    // ClockCircleOutlined,
    PlaySquareOutlined,
    CrownOutlined,
    FireOutlined,
    UpOutlined,
  } from '@ant-design/icons-vue';
  const route = useRoute();

  
  const selectedKeys = ref<string[]>(['1']);
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
      .home{
        padding: 0 2rem;
        span{
          font-weight: bolder;
        }
      }
    }
  }
  .menu{
    height: 100%;
  }
  .layout-content{
    /* width: 100%; */
  }
  
  #components-layout-demo-custom-trigger .trigger {
    font-size: 18px;
    line-height: 64px;
    padding: 0 24px;
    cursor: pointer;
    transition: color 0.3s;
  }
  
  #components-layout-demo-custom-trigger .trigger:hover {
    color: #1890ff;
  }
  
  #components-layout-demo-custom-trigger .logo {
    height: 32px;
    background: rgba(255, 255, 255, 0.3);
    margin: 16px;
  }
  
  .site-layout .site-layout-background {
    background: #fff;
  }
  
  :global(.menu .ant-divider-horizontal ){
    width: 60%;
    min-width: 76%;
    margin: 0 auto;
  }
  </style>
    