<template>
  <div class="star">
    <a-tabs v-model:activeKey="activeKey">
      <a-tab-pane :key="idx" :tab="item" v-for="(item,idx) in tabArr" class="Favorites" >
        <!-- <VideoItem v-for="item in 11" :key="item"/> -->
      </a-tab-pane>
    </a-tabs>
    <p>没有更多了......</p>
  </div>
  <div class="discover-list">
      
  </div>
</template>

<script lang="ts" setup>
import VideoItem from "@/components/VideoItem.vue";
import {ref,onUpdated} from "vue";
useHead({
  title: '收藏',
  meta: [
    { name: 'description', content: 'My amazing site.' }
  ],
})
let activeKey = ref(0);

let tabArr = ref(["默认收藏夹"]);
onUpdated(()=>{
  alert(activeKey.value);
});
</script>

<style lang="scss" scoped>
.star{
  .Favorites{
    display:flex;
    flex-wrap:wrap;
  }
  p{
      padding: 1rem;
      color: #6e6c6c;
      text-align: center;
  }
}
:global(.star .ant-tabs-content-top,.message .ant-tabs-content){
  height: 100%;
        overflow: scroll;

}
:global(.star .ant-tabs-nav-wrap){
  padding: 0 1rem;
}

:global(.star .ant-tabs-top > .ant-tabs-nav){
  margin: 0;
}
</style>
