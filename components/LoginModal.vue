<template>
  <a-modal
    v-model:visible="visible"
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
          placeholder="请输入邮箱"
          autocomplete="on"
          size="large"
          type="email"
          required
        />
        <a-input-password
          prefix="密码"
          v-model:value="password"
          placeholder="请输入密码"
          autocomplete="on"
          size="large"
          type="password"
          required
        />
        <input
          type="button"
          class="regiAndlogin"
          @click="register"
          autocomplete="off"
          value="注册"
          :disabled="!validated"
        />
        <input
          type="button"
          class="regiAndlogin"
          @click="login"
          autocomplete="off"
          value="登录"
          :disabled="!validated"
        />
      </form>
      <template v-else>
        <a-input-search
          v-model:value="email"
          placeholder="请输入邮箱"
          @search="getVerificationCode"
          size="large"
          type="email"
          required
        >
          <template #enterButton>
            <a-button :disabled="oneMinute" style="width: 10rem">
              {{ getCode }}
            </a-button>
          </template>
        </a-input-search>
        <a-input-number
          required
          prefix="验证码"
          v-model:value="verificationCode"
          id="inputNumber"
          size="large"
          :controls="false"
        />
        <button class="regiAndlogin" @click="submit" :disabled="codeValidate">
          登录/注册
        </button>
      </template>
    </div>
  </a-modal>
</template>

<script setup lang="ts">
import { ref, inject } from "vue";
import type { Ref } from "vue";
import { message } from "ant-design-vue";
import { isNull, check, CHECK } from "@/utils/validate";

import useStore from "../store";
import { LockFilled } from "@ant-design/icons-vue";
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
let verificationCode = ref<string>();

let visible = inject("loginVisible");
const handleOk = () => {
  visible.value = false;
  emit("update:value", false);
};

// 注册
const register = async () => {
  if (!validate()) return;
  let res = await user.register({
    userName: userName.value,
    password: password.value,
  });
  console.log("register", res);
  if (res.data.msg === "用户已存在") {
    message.warn(res.data.msg);
  } else {
    message.success("成为萌新", 2.5);
    visible.value = false;
    emit("update:value", false);
    // userName.value = "";
    // password.value = "";
  }
};

// 登录
const login = async () => {
  if (!validate()) return;
  let res = await user.login({
    userName: userName.value,
    password: password.value,
  });
  if (res.data !== null) {
    message.success("成功上岸", 2.5);
    visible.value = false;
    emit("update:value", false);
    userName.value = "";
    password.value = "";
  } else {
    message.error("登陆失败", 2.5);
  }
};

// 验证码
let getCode = ref("获取验证码");
let oneMinute = ref(false);
let correctCode = ref("0000000000");
const submit = async () => {
  console.log(verificationCode.value, correctCode.value);

  if (verificationCode.value?.toString() === correctCode.value) {
    // message.success("验证成功");
    //
    let res = await user.loginByEmail({ userName: email.value });
    console.log(res, "验证码进入");
    if (res.data instanceof Object) {
      // 正常注册登录
      message.success("success");
      visible.value = false;
      emit("update:value", false);
    }
  } else {
    message.error("验证码错误");
  }
};
// 获取验证码
const getVerificationCode = async () => {
  if (!CHECK("email", email.value)) {
    message.warn("请输入正确邮箱");
    return;
  }
  let res = await user.loginByCode({ email: email.value });
  // console.log(res.data.loginCode, "code");
  correctCode.value = res.data.loginCode;
  let oneMin = 60;
  getCode.value = "60s";
  oneMinute.value = true;
  let timer = setInterval(() => {
    oneMin--;
    getCode.value = oneMin + "s";
    if (oneMin <= 0) {
      clearInterval(timer);
      oneMinute.value = false;
      getCode.value = "重新获取验证码";
    }
  }, 1000);
};

let validated = computed(() => {
  console.log(validate());
  return validate();
});
let codeValidate = computed(() => {
  console.log(verificationCode.value);

  if (
    CHECK("email", email.value) === false ||
    verificationCode.value === null ||
    verificationCode.value === undefined
  ) {
    return true;
  }
  return false;
  // return CHECK("email", email.value) === false && verificationCode.value === "";
});
const validate = () => {
  if (isNull(userName.value.trim(), password.value.trim())) {
    return false;
  }
  let tip1 = CHECK("email", userName.value);
  let tip2 = CHECK("password", password.value);
  if (!tip1 || !tip2) {
    return false;
  }
  return true;
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
  input:disabled {
    background-color: #ddd;
  }
  button:disabled {
    background-color: #ddd;
  }
}
:global(.ant-input-number-affix-wrapper) {
  width: 28.2rem;
}
</style>
