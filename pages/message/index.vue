<template>
  <div class="message">
    <a-tabs v-model:activeKey="activeKey" >
      <a-tab-pane :tab="item" v-for="(item,idx) in nav" :key="idx" :style="{width: 'calc(100vw -  224px)'}">
        <!-- {{idx}} -->
        <component :is="otherNav[activeKey]"></component>
      </a-tab-pane>
    
      
    </a-tabs>
    
</div>
</template>

<script lang="ts">
import { ref } from "vue";
import Chat from "@/components/message/Chat.vue";
import Qme from "@/components/message/Qme.vue";
import AnswerMe from "@/components/message/AnswerMe.vue";
import LikeView from "@/components/message/LikeView.vue";
import MessSetting from "@/components/message/MessSetting.vue";
import SystemNotification from "@/components/message/SystemNotification.vue";
export default {
  components: {
    AnswerMe,
    Chat,
    LikeView,
    MessSetting,
    Qme,
    SystemNotification
  }
}
</script>


<script lang="ts" setup>

let activeKey = ref(0);

let current = ref("");
const toggle = (item: string) => {
  console.log(current.value);
  
  current.value = item;
}
let nav = ref(['系统通知', '回复我的', '@我的', '我的消息', '收到的赞', '消息设置']);
let otherNav = ['SystemNotification','AnswerMe','Qme','Chat','LikeView','MessSetting'];

</script>

<style lang="scss" scoped>
.message{
  display:flex;
  width: calc(100vw - 200px);
  height: 100%;
}


:global(.message .ant-tabs-content-top,.message .ant-tabs-content){
  height: 100%;
        overflow: scroll;

}
:global(.message .ant-tabs-nav-wrap){
  padding: 0 1rem;
}

:global(.message .ant-tabs-top > .ant-tabs-nav){
  margin: 0;
}


</style>