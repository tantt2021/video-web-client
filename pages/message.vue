<template>
  <div class="message">
    <!-- <a-tabs v-model:activeKey="activeKey" > -->
      <!-- <a-tab-pane :tab="item" v-for="(item,idx) in nav" :key="idx">
        <component :is="otherNav[activeKey]"></component>
      </a-tab-pane> -->
      <div class="newest-action">
        <a-menu v-model:selectedKeys="current" mode="horizontal">
          <a-menu-item key="chat"  @click="navigateTo('/message/chat')">
            <template #icon>
            </template>
            我的消息
          </a-menu-item>
          <a-menu-item key="comment" @click="navigateTo('/message/comment')">
            <template #icon>
            </template>
            评论
          </a-menu-item>
          <a-menu-item key="otherInfo" @click="navigateTo('/message/otherInfo')">
            <template #icon>
            </template>
            其他消息
          </a-menu-item>
          <!-- <a-menu-item key="messSetting" @click="navigateTo('/message/messSetting')">
            <template #icon>
            </template>
            消息设置
          </a-menu-item> -->
        </a-menu>
        <suspense>
          <nuxt-page></nuxt-page>
        </suspense>
      </div>
    <!-- </a-tabs> -->
    
</div>
</template>

<script lang="ts">
import { ref } from "vue";
import Chat from "@/components/message/Chat.vue";
import AnswerMe from "@/components/message/AnswerMe.vue";
import LikeView from "@/components/message/LikeView.vue";
import MessSetting from "@/components/message/MessSetting.vue";
export default {
  components: {
    AnswerMe,
    Chat,
    LikeView,
    MessSetting,
  }
}
</script>


<script lang="ts" setup>
useHead({
  title: '消息',
  meta: [
    { name: 'description', content: 'My amazing site.' }
  ],
})
let route = useRoute();
let activeKey = ref(0);

let current = ref<string[]>(['chat']);
onMounted(()=>{
  console.log(route);
  
});

let nav = ref(['回复我的', '我的消息', '其他通知']);
let otherNav = ['AnswerMe','Chat','LikeView'];

</script>

<style lang="scss" scoped>
.message{
  // display:flex;
  width: 100%;
  height: 100%;
  .newest-action{
    width: 100%;
    height: 100%;
  }
}


:global(.message .ant-tabs-content-top,.message .ant-tabs-content){
  height: 100%;
        // overflow: scroll;

}
:global(.message .ant-tabs-nav-wrap){
  padding: 0 1rem;
}

:global(.message .ant-tabs-top > .ant-tabs-nav){
  margin: 0;
}

:global(.ant-tabs,.ant-tabs-top){
  width: 100%;
}
:global(.ant-tabs-content-holder){
  overflow: auto;
}
</style>