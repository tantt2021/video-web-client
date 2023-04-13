<template>
  <div class="header">
    <div class="search">
      <input type="text" placeholder="搜索" v-model="keyword" />
      <button @click="search"><search-outlined /></button>

      <button class="audio" @click="audioSearch"><audio-outlined /></button>
    </div>

    <div v-if="hasLogin" class="right-entry">
      <NuxtLink to="/message">
        <mail-two-tone two-tone-color="#44bc87" />
        <strong>消息</strong>
      </NuxtLink>
      <NuxtLink to="/star">
        <star-two-tone two-tone-color="#44bc87" />
        <strong>收藏</strong>
      </NuxtLink>
      <NuxtLink to="/history">
        <clock-circle-two-tone two-tone-color="#44bc87"/>
        <strong>历史记录</strong>
      </NuxtLink>
      <!-- 创作中心 -->
      <a-dropdown>
        <NuxtLink class="ant-dropdown-link" @click.prevent>
          <alert-two-tone two-tone-color="#44bc87" />
          <strong>创作中心</strong>
        </NuxtLink>
        <template #overlay>
          <a-menu>
            <a-menu-item>
              <nuxt-link to="/platform">视频投稿</nuxt-link>
            </a-menu-item>
            <a-menu-item>
              <nuxt-link to="/studio">互动视频创作</nuxt-link>
            </a-menu-item>
          </a-menu>
        </template>
      </a-dropdown>
      <!-- 个人中心 -->
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
              class="avatar"
              />
            <strong>{{ user.username }}</strong>
          </div>
        </a-popover>
      </NuxtLink>
    </div>
    <div v-else class="right-entry">
      <button @click="openLoginModal">
        <robot-outlined />
        <strong>登录</strong>
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
const router = useRouter();
const logout = () => {
  user.logout();
  router.push('/');
  message.success("已退出登录", 2.5);

};

// 用户个人中心菜单
const userMenuVisible = ref(false);
</script>

<style lang="scss" scoped>
.header {
  background-color: #fff;
  padding: 0 2rem;
  display: flex;
  justify-content: space-between;
  height: 3.5rem;
  line-height: 3.5rem;
  flex-wrap: nowrap;
  
  .search {
    flex-shrink: 0;
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
    flex-shrink: 0;

    // width: 30rem;
    a {
      // transition: all 0.5s;
      display: inline-block;
      padding: 0rem 1rem;
      &:hover span  {
        animation: linkHover 0.5s ;
      }
      &:hover img{
        animation: linkHover 0.5s ;
      }
      strong{
        vertical-align: middle;
      }
      .avatar{
        width: 1.5rem;
        border-radius: 50%;
        margin-right: .3rem;
      }
    }
    button {
      float: right;
      border: 0;
      padding-right: 1rem;
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

@media screen and (max-width:720px) {
  a strong{
    display: none;
  }
}
@media screen and (max-width:550px) {
  .header .right-entry a{
    padding: 0 .5rem;
  }
}
</style>
