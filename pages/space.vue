<template>
    <div>
      <div class="edit">
        <a-textarea v-model:value="textValue" placeholder="Autosize height with minimum and maximum number of lines"
          :auto-size="{ minRows: 2, maxRows: 50 }" />
      </div>
      <div class="plugin">
        <div class="left">
          <smile-outlined />
          <picture-outlined />
          <span>@</span>
          <clock-circle-filled />
        </div>
        <div class="right">
          <a-dropdown>
            <a class="ant-dropdown-link" @click.prevent>
              可以评论
            </a>
            <template #overlay>
              <a-menu>
                <a-menu-item>
                  <a href="javascript:;">可以评论</a>
                </a-menu-item>
                <a-menu-item>
                  <a href="javascript:;">禁止评论</a>
                </a-menu-item>
              </a-menu>
            </template>
          </a-dropdown>
          <a-button type="primary" class="submit">发布</a-button>
        </div>
      </div>
      <p v-if="false">有新动态，点击查看</p>
      <div class="newest-action">
        <a-menu v-model:selectedKeys="current" mode="horizontal">
          <a-menu-item key="all"  @click="navigateTo('/space/all')">
            
            <template #icon>
              <mail-outlined />
            </template>
            全部
          </a-menu-item>
          <a-menu-item key="text" @click="navigateTo('/space/text')">
            <template #icon>
              <mail-outlined />
            </template>
            文字
          </a-menu-item>
          <a-menu-item key="video" @click="navigateTo('/space/video')">
            <template #icon>
              <mail-outlined />
            </template>
            视频
          </a-menu-item>
        </a-menu>
        <nuxt-page></nuxt-page>
      </div>
    </div>
  </template>
  
  
  <script lang="ts" setup>
  import { ref } from "vue";
  import {useRouter } from "vue-router";
  import {
    SmileOutlined,
    PictureOutlined,
    ClockCircleFilled,
    MailOutlined,
    
  } from '@ant-design/icons-vue';
  
  // 动态文字
  let textValue = ref("");
  
  // 导航
  const current = ref<string[]>(['all']);

  const router = useRouter();;
  router.push('/space/all');
  </script>
  
  <style lang="scss" scoped>
  .edit{
    padding: 0 1rem;
  }
  .plugin {
    display: flex;
    justify-content: space-between;
    margin-top: .5rem;
    padding: 0 1rem;
  
    .left {
      span~span {
        margin-left: 1rem;
  
      }
    }
  
    .right {
  
      // float:right;
      button {
        line-height: 100%;
      }
  
      .submit {
        margin-left: 2rem;
      }
    }
  
  }
  p{
    text-align: center;
    background-color: #b0dda7;
    font-weight: 400;
    padding: .3rem 0;
    margin: .5rem 0;
  }
  a {
    font-weight: 400;
    font-size: .8rem;
  
  }
  </style>