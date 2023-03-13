<template>
  <div class="header">
    <NuxtLink to="/"><strong>QOOT</strong></NuxtLink>
    <div class="search">
      <input type="text" placeholder="搜索" v-model="keyword" />
      <button @click="search"><search-outlined /></button>

      <button class="audio" @click="audioSearch"><audio-outlined /></button>
    </div>

    <div v-if="!loginVisible" class="right-entry">
      <NuxtLink to="/message">
        <mail-two-tone two-tone-color="#44bc87" />
        消息
      </NuxtLink>
      <NuxtLink to="/star">
        <star-two-tone two-tone-color="#44bc87" />
        收藏
      </NuxtLink>
      <!-- <NuxtLink to="history">
        <clock-circle-two-tone two-tone-color="#44bc87"/>
        历史记录
      </NuxtLink> -->
      <NuxtLink to="/platform">
        <alert-two-tone two-tone-color="#44bc87" />
        创作中心
      </NuxtLink>
      <NuxtLink to="/user/self">
        <!-- <a-avatar :src="avatar" />  -->
        <img src="../assets/img/yatou.png" alt="" :style="{width: '1.5rem',borderRadius:'50%'}">
        个人空间
      </NuxtLink>
    </div>
    <div v-else class="right-entry">
      <button @click="login">
        <robot-outlined />
        登录
      </button>
      <!-- 登录窗口 -->
    </div>
    <LoginModal></LoginModal>
  </div>
</template>

<script lang="ts">
import { ref, provide,onMounted } from "vue";
import {
  SearchOutlined,
  MailTwoTone,
  StarTwoTone,
  ClockCircleTwoTone,
  AlertTwoTone,
  HomeTwoTone,
  RobotOutlined,
  AudioOutlined,
} from "@ant-design/icons-vue";
import LoginModal from "./LoginModal.vue";
</script>

<script setup lang="ts">
onMounted(() => {
  // console.log($nuxt.$route.path);
  
})

let keyword = ref<string>("");
// 搜索
const search = () => {
  navigateTo('/search');
};

// 语音搜索
const audioSearch = () => {
  alert("语音搜索");
};

// 登录窗口
let loginVisible = ref<boolean>(false);
const handleOk = (e: MouseEvent) => {
  console.log(e);
  loginVisible.value = false;
};
const login = () => {
  loginVisible.value = true;
  
}

provide("loginVisible", loginVisible);

</script>

<style lang="scss" scoped>
.header {
  // margin: 0 2rem;
  display: flex;
  justify-content: space-between;
  height: 3.5rem;
  line-height: 3.5rem;
  .search {
    input {
      outline: none;
      height: 2rem;
      margin: 0.75rem 0;
      border: 1px solid #44bc87;
      border-right: none;
      width: 50%;
      padding: 0.5rem;
      font-weight: 400;
    }
    button {
      // float: right;
      vertical-align: bottom;
      height: 2rem;
      margin: 0.75rem 0;
      line-height: 2rem;
      border-radius: 0;
      border: 1px solid #44bc87;
      padding: 0 1rem;
      background-color: #44bc87;
      color: #fff;
    }
    .audio {
      border: none;
      background-color: rgb(214, 249, 234);
      margin-left: 1rem;
      border-radius: 20px;
      padding: 0 0.48rem;
      // background-color: transparent;
      color: #44bc87;
    }
  }
  .right-entry {
    width: 30rem;
    a {
      // transition: all 0.5s;
      display: inline-block;
      padding: 0rem 1rem;
      &:hover {
        animation: linkHover 0.5s;
      }
    }
    button {
      float: right;
      border: 0;
    }
  }
}
</style>
