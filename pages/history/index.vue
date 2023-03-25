<template>
  <div>
    <div class="history-operate">
      <a-input-search
        v-model:value="value"
        placeholder="input search text"
        style="width: 200px"
        @search="onSearch"
      />
      <button size="small">暂停记录历史</button>
      <button size="small">清空历史</button>
    </div>
    <div>
      <history-item v-for="(item,idx) in historyList" :key="idx"></history-item>
    </div>
    <h1 ref="getMore" class="get-more">
      拼命加载
      <LoadingOutlined />
    </h1>
  </div>
</template>

<script lang="ts" setup>
import HistoryItem from "@/components/HistoryItem.vue";
import {
  LoadingOutlined,
} from '@ant-design/icons-vue';
let value = ref("");
const onSearch = () => {

}

// 滚动加载
let historyList = ref([1,2,2,3,4,4,5,]);
let getMore = ref(null);
const observer = new IntersectionObserver(entries=>{
  entries.forEach(entry=>{
    if(entry.isIntersecting){
      setTimeout(()=>{
        historyList.value.push(1);
        historyList.value.push(1);
        historyList.value.push(1);
        historyList.value.push(1);
      },1000);
    }else{
      console.log("hidden");
      
    }
  })
})
onMounted(()=>{
  observer.observe(getMore.value);
})
onUnmounted(()=>{
  observer.disconnect();
})
</script>

<style lang="scss" scoped>
  div{
    position: relative;
    clear: right;

  .history-operate{
    display:flex;
    line-height:100%;
    margin-right: 3rem;
    // position: relative;
    // right: 0;
    float: right;
    button{
      // padding: .5rem;
      font-size: .5rem;
      padding: .2rem 1rem;
      border: 1px solid #44bc87;
      color: #44bc87;
      margin-left: 1rem;  
    }
  }
  .get-more{
    margin: 1rem 0;
    text-align: center;
  }
}
</style>
