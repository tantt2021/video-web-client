<template>
  <div id="popular">

    <p>各个领域中新奇好玩的优质内容都在这里~</p>

    <div class="popular">
        <videoCard/>
        <videoCard/>
        <videoCard/>
        <videoCard/>
        <videoCard/>
        <videoCard/>
        <videoCard/>
    </div>
    <p class="end">没有更多了......</p>
  </div>

</template>

<script setup lang="ts">
// 无限滚动
import videoCard from "@/components/VideoCard.vue";
useHead({
  title: '排行榜',
  meta: [
    { name: 'description', content: 'My amazing site.' }
  ],
})
</script>

<style lang="scss" scoped>
#popular{
  padding: 1rem;
  .popular{
      flex: 1;
      display: flex;
      flex-wrap: wrap;
      // padding-left: 13rem;
  }
  .end{
      text-align: center;
      padding: 1rem 0;
      font-size: .8rem;
      color: #777;
  }
}

</style>