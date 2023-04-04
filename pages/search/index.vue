<template>
    <div class="search">
        <a-input-search
          v-model:value="keyword"
          placeholder="请输入搜索关键字"
          enter-button="搜索"
          size="large"
          @search="onSearch"
          style="width:'100%'"
        />

        <a-tabs v-model:activeKey="activeKey">
          <a-tab-pane :key="idx" :tab="item" v-for="(item,idx) in tabArr">{{ item }}</a-tab-pane>
          
        </a-tabs>
    </div>
</template>

<script lang="ts" setup>
import {ref} from "vue";
useHead({
  title: '搜索',
  meta: [
    { name: 'description', content: 'My amazing site.' }
  ],
})
let keyword = ref("");
const onSearch = () => {

};

// 
let tabArr = ref(['综合','视频','用户']);
</script>

<style lang="scss" scoped>
.search{
    padding: 2rem;
    text-align: center;
    span{
        width: 50rem;
    }
}

</style>