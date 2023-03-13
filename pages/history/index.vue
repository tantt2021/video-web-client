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
    <history-item></history-item>
    <history-item></history-item>
    <history-item></history-item>
    <history-item></history-item>
    <history-item></history-item>
  </div>
</div>
</template>

<script lang="ts" setup>
import HistoryItem from "@/components/HistoryItem.vue";

let value = ref("");
const onSearch = () => {

}
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
}
</style>
