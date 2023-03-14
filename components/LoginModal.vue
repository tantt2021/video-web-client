<template>
  <a-modal
    v-model:visible="newValue"
    width="500px"
    title="登录"
    @ok="handleOk"
    :footer="null"
  >
    <div class="loginModal">
      <h4>
        <span
          @click="change('pwd')"
          :style="{ color: `${loginWay === 'pwd' ? '#44bc87' : '#000'}` }"
        >
          密码登录
        </span>
        |
        <span
          @click="change('email')"
          :style="{ color: `${loginWay === 'email' ? '#44bc87' : '#000'}` }"
        >
          邮箱登录
        </span>
      </h4>
      <form v-if="loginWay === 'pwd'">
        <a-input
          prefix="账号"
          v-model:value="userName"
          placeholder="请输入账号"
          autocomplete="on"
          size="large"
        />
        <a-input-password
          prefix="密码"
          v-model:value="password"
          placeholder="请输入密码"
          autocomplete="on"
          size="large"
        />
        <br />
        <!-- <button class="regiAndlogin" @click="register">注册</button> -->
        <!-- <button class="regiAndlogin" @click="login">登录</button> -->
        <input
          type="button"
          class="regiAndlogin"
          @click="register"
          autocomplete="off"
          value="注册"
        />
        <input
          type="button"
          class="regiAndlogin"
          @click="login"
          autocomplete="off"
          value="登录"
        />
      </form>
      <template v-else>
        <a-input-search
          v-model:value="email"
          placeholder="请输入邮箱"
          @search="getVerificationCode"
          size="large"
        >
          <template #enterButton>
            <a-button>{{ "获取验证码" }}</a-button>
          </template>
        </a-input-search>
        <a-input
          prefix="验证码"
          size="large"
          v-model:value="verificationCode"
        />
        <button class="regiAndlogin" @click="submit">登录/注册</button>
      </template>
    </div>
  </a-modal>
</template>

<script setup lang="ts">
import { ref, inject } from "vue";
import type { Ref } from "vue";
import { message } from "ant-design-vue";

import useStore from "../store";
const { user } = useStore();

const emit = defineEmits(["update:value"]);
let props = defineProps({
  value: {
    type: Boolean,
    default: false,
  },
});

// 切换登陆方式
let loginWay = ref<string>("pwd");
const change = (val: string) => {
  loginWay.value = val;
};

// 账号信息
let userName = ref<string>("");
let password = ref<string>("");
let email = ref<string>("");
let verificationCode = ref<string>("");
// 获取验证码
const getVerificationCode = () => {};
let newValue = inject("loginVisible");
const handleOk = () => {
  newValue.value = false;
  emit("update:value", false);
};

// 注册
const register = async () => {
  if (isNull()) return;
  let res = await user.register({
    username: userName.value,
    password: password.value,
  });
  if (res.data) {
    message.success("成为萌新", 2.5);
    newValue.value = false;
    emit("update:value", false);
    userName.value = "";
    password.value = "";
  } else {
    message.error("成为萌新失败", 2.5);
  }
};

// 登录
const login = async () => {
  if (isNull()) return;
  let res = await user.login({
    username: userName.value,
    password: password.value,
  });
  if (res.data !== null) {
    message.success("成功上岸", 2.5);
    newValue.value = false;
    emit("update:value", false);
    userName.value = "";
    password.value = "";
  } else {
    message.error("登陆失败", 2.5);
  }
};

const submit = () => {
  if (isNull()) return;
};

// 判断为空
const isNull = () => {
  // 密码验证
  if (loginWay.value === "pwd") {
    if (userName.value.trim() === "" || password.value.trim() === "") {
      message.error("请正确填写！");
      return true;
    } else {
      return false;
    }
  } else {
    if (email.value.trim() === "" || verificationCode.value.trim() === "") {
      message.error("请正确填写！");
      return true;
    } else {
      return false;
    }
  }
};
</script>

<style lang="scss" scoped>
.loginModal {
  text-align: center;
  font-size: 1rem;
  h4 {
    text-align: center;
  }
  span {
    cursor: pointer;
    margin: 1rem 0;
  }
  .regiAndlogin {
    padding: 0.5rem 5rem;
    border: 1px solid rgb(149, 139, 139);
    margin: 1rem 1rem;
    background-color: #44bc87;
    color: #fff;
    border-radius: 0.2rem;
    border: none;
  }
}
</style>
