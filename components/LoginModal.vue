<template>
        <a-modal v-model:visible="newValue" width="500px" title="登录" @ok="handleOk"  :footer="null">
      <div class="loginModal">
        <h4>
        <span @click="change('pwd')" :style="{color:`${loginWay ==='pwd'?'#44bc87':'#000'}`}">密码登录</span> |
        <span @click="change('phone')" :style="{color:`${loginWay ==='phone'?'#44bc87':'#000'}`}">短信登录</span>
        </h4>
       <template v-if="loginWay==='pwd'">
         <a-input prefix="账号" v-model:value="userName" placeholder="请输入账号"/>
         <br>
         <br>
         <a-input-password prefix="密码" v-model:value="password" placeholder="请输入密码" />
         <br>
         <button class="regiAndlogin" @click="register">注册</button>
         <button class="regiAndlogin" @click="login">登录</button>
       </template>
       <template v-else>
        <a-input-search
          v-model:value="phone"
          placeholder="请输入手机号"
          size="large"
          @search="getVerificationCode"
        > 
        

          <template #enterButton>
            <a-button>{{"获取验证码"}}</a-button>
          </template>

        </a-input-search>
        <br>
        <br>
        <a-input prefix="验证码" />
        <button class="regiAndlogin">登录/注册</button>

       </template>
      
      </div>
      
    </a-modal>
</template>

<script setup lang="ts">
import { ref, inject } from "vue";
import type { Ref } from 'vue'
const emit = defineEmits(['update:value']);
let props = defineProps({
    value:{
        type:Boolean,
        default:false,
    }
});

// 切换登陆方式
let loginWay = ref<string>("pwd");
const change = (val:string) => {
  loginWay.value = val;
}

// 账号信息
let userName = ref<string>("");
let password = ref<string>("");

let phone = ref<number>();
// 获取验证码
const getVerificationCode = () => {
  
}
let newValue = inject<Ref<boolean>>("loginVisible");

const handleOk = (e: MouseEvent) => {
  console.log(e);
  newValue.value = false;
  emit("update:value", false);
      // props.visible = false;
};

// 注册
const register = () => {
  
}

// 登录
const login = () => {
  console.log(userName.value,password.value);
}


</script>

<style lang="scss" scoped>
.loginModal {
  text-align:center;
    h4{
      text-align:center;
    }
    span{
      cursor: pointer;
    }
    .regiAndlogin{
      padding: 0 5rem;
      border: 1px solid rgb(149, 139, 139);
      margin-top: 20px;
    }
    button + button{
      float: right;
    }
  }
</style>