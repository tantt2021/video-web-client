<template>
  <div class="header">
    <NuxtLink to="/"><strong>QOOT</strong></NuxtLink>
    <div class="search">
      <input type="text" placeholder="搜索" v-model="keyword" />
      <button @click="search"><search-outlined /></button>

      <button class="audio" @click="audioSearch"><audio-outlined /></button>
    </div>

    <div v-if="hasLogin" class="right-entry">
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
        <a-popover placement="bottom" v-model:visible="userMenuVisible">
          <template #content>
            <button @click="logout">退出登录</button>
          </template>
          <template #title>
            <div class="user-flex-data">
              <div class="user-data">
                <strong>{{ user.views }}</strong>
                <p>关注</p>
              </div>
              <div class="user-data">
                <strong>{{ user.views }}</strong>
                <p>粉丝</p>
              </div>
            </div>
          </template>
          <div @click="userMenuVisible = !userMenuVisible">
            <img
              src="../assets/img/yatou.png"
              alt=""
              :style="{ width: '1.5rem', borderRadius: '50%' }"
            />
            个人空间
          </div>
        </a-popover>
      </NuxtLink>
    </div>
    <div v-else class="right-entry">
      <button @click="openLoginModal">
        <robot-outlined />
        登录
      </button>
      <!-- 登录窗口 -->
    </div>
    <LoginModal></LoginModal>
  </div>
</template>

<script lang="ts">
import { ref, provide, onMounted } from "vue";
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
import { message } from "ant-design-vue";
</script>

<script setup lang="ts">
import useStore from "../store";
const { user } = useStore();

let keyword = ref<string>("");
// 搜索
const search = () => {
  navigateTo("/search");
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
const openLoginModal = () => {
  loginVisible.value = true;
};
let hasLogin = ref(false);
watch(
  () => user.username,
  (n) => {
    if (n !== "" && n !== undefined) {
      hasLogin.value = true;
    } else {
      hasLogin.value = false;
    }
  },
  { immediate: true, deep: true }
);
provide("loginVisible", loginVisible);
// 退出登录
const logout = () => {
  user.logout();
  message.success("已退出登录", 2.5);
};

// 用户个人中心菜单
const userMenuVisible = ref(false);
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

:global(.ant-popover-title span) {
  padding: 0 1rem;
}
.user-flex-data {
  display: flex;
  justify-content: space-between;
  padding-top: 1rem;
  .user-data {
    strong {
      color: #44bc87;
    }
    p {
      color: #757575;
    }
  }
}
p {
  text-align: center;
  cursor: pointer;
}
:global(.ant-popover-inner-content) {
  text-align: center;
}
</style>
