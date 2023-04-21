<template>
  <div class="CHAT">
    <div class="chat-win">
      <div v-for="(item, idx) in messageList" :key="idx" class="box">
        <div :class="{ 'chat-send': (item.sender_id===user.id), 'chat-receive': (item.receiver_id===user.id) }">
          {{ item.message_text }}
        </div>
      </div>
    </div>
    <div class="chat-textarea">
      <textarea v-model="input" placeholder="" @keyup.enter="submit" />
    
      <div>
        <button @click="submit">发送</button>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import {  ref } from "vue";
import useStore from "~~/store";
import { message } from "ant-design-vue";
import type {MessageType} from "@/types/message";

const {user} = useStore();
const emit = defineEmits(["send-message"]);
let props = defineProps({
  messageList: {
    type: Array<MessageType>,
    default: [],
  },
});
// 发送消息
let input = ref("");
const submit = () => {
  if(input.value.trim() === ''){
    message.error("不可发送空白消息");
    input.value = '';
    return;
  }
  // 发送消息
  emit("send-message",{message_text:input.value});
  input.value = "";
}
</script>


<style scoped lang="scss">
.CHAT {
  width: 100%;
  height: 100%;
  flex: 1;
  display: flex;
  flex-direction: column;
  .chat-win {
    display: flex;
    flex-direction: column;
    padding: 1.5rem;
    background-color: #f4fff5;   
    height: 22rem;
    overflow: auto;
    .box {
        color: #000;
        word-break: break-all;
      .chat-send {
        float: right;
        background-color: #bdf1da;
        margin: 1rem 0;
        padding: .2rem .5rem;
        border-radius: .5rem;
        margin: .5rem 0;

      }

      .chat-receive {
        float: left;
        background-color: #ffffff;
        padding: .2rem .5rem;
        border-radius: .5rem;
        margin: .5rem 0;

      }
    }
  }
  .chat-textarea {
    flex: 1;
    border-top: 1px solid #ddd;
    height: 100%;
    position: relative;
    padding: 0.5rem 1rem;
    
    textarea {
      resize: none;
      width: 100%;
      height: 73%;
        
      outline: none;
      border: none;
    }
    span{
        vertical-align:top;

    }
    span ~ span{
        margin-left:1.5rem;
    }
    button{
        float: right;
        background-color: #ddd;
        padding: .1rem 1rem;
        border-radius: .2rem;
        font-size: .8rem;
        color: #0a9657;
    }
  }
}
</style>