<template>
  <div class="discover-list">
    <!-- <h3>精选推荐</h3> -->
    <div class="recommend">
      <video-item v-for="(item,idx) in recommendList" :key="idx" :config="item"></video-item>
    </div>
  </div>
</template>

<script lang="ts" setup>
import VideoItem from "@/components/VideoItem.vue";
import { getAllVideos } from "~~/api/video";
import type { Video } from "~~/types";
useHead({
title: '推荐',
meta: [
  { name: 'description', content: 'My amazing site.' }
],
})

let recommendList = ref<Video[]>([]);
// 获取推荐视频
await getAllVideos().then(
res=>{
  recommendList.value = res.data;
}
)
</script>

<style lang="scss" scoped>
.discover-list{
  // display:flex;
  // flex-wrap:wrap;
  padding: 1rem;
  .recommend , .guess-you-like{
    display: flex;
    flex-wrap: wrap;
  }
}

</style>