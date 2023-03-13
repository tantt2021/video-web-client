<template>
  <div class="CHAT">
    <div class="chat-win">
      <div v-for="(item, idx) in messageList" :key="idx" class="box">
        <div :class="{ 'chat-send': item.type, 'chat-receive': !item.type }">
          {{ item.data }}
        </div>
      </div>
    </div>
    <div class="chat-textarea">
      <textarea v-model="input" placeholder="" />
    
      <div>
        <SmileOutlined/>
        <PictureOutlined/>
        <button>发送</button>

      </div>
      <!-- <a-textarea v-model:value="input" placeholder="Basic usage" :rows="4" /> -->
    </div>
  </div>
</template>

<script lang="ts" setup>
import { defineProps, ref } from "vue";
import {
    SmileOutlined,
    PictureOutlined,
    
  } from '@ant-design/icons-vue';
let props = defineProps({
  messageList: {
    type: Array,
    default: [],
  },
});
let input = ref("");

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