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
    <div class="content">
      <history-item v-if="history.length" v-for="item in history" :key="item.id" :content="item" @del-history="deleteHistory"></history-item>
      <a-empty v-else/>
    </div>
    <h1 ref="getMore" class="get-more" v-if="history.length>5">
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
import useStore from "../../store"; 
import {getHistorys,delHistory} from "@/api/history";
import type {HistoryType} from "@/types";
useHead({
  title: '历史记录',
  meta: [
    { name: 'description', content: 'My amazing site.' }
  ],
})
let value = ref("");
const onSearch = () => {

}
// 路由
const router = useRouter();


// 请求用户的历史记录
const { user } = useStore();
console.log(user.id,"id");
let history = ref<HistoryType[]>([]);
const getHistory = async () => {
  history.value = await getHistorys({userId:user.id});
  console.log(history.value,"history");
  
}
getHistory();

// 删除历史记录
const deleteHistory = async (e:string) => {
  console.log("delHistory",e);
  await delHistory({id:e}).then(
    res=>{
      console.log(res,"删除成功");
      history.value = history.value.filter(v=>v.id!==e);
    }
  )
}

// 滚动加载
let getMore = ref<Element|null>(null);

let observer: IntersectionObserver | null = null;
onMounted(()=>{
  if(history.value.length>5){
    observer = new IntersectionObserver(entries=>{
      entries.forEach(entry=>{
        if(entry.isIntersecting){
          setTimeout(()=>{
            // history.value.push({});
          },1000);
        }else{
          console.log("hidden");

        }
      })
    })
    if(getMore.value)
      observer.observe(getMore.value);
  }
})
onUnmounted(()=>{
  if(observer)
    // 不为空则为IntersectionObserver
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
    padding-top: 1rem;
    float: right;
    button{
      font-size: .5rem;
      padding: .2rem 1rem;
      border: 1px solid #44bc87;
      color: #44bc87;
      margin-left: 1rem;  
    }
  }
  .content{
    padding: 1rem;
  }
  .get-more{
    margin: 1rem 0;
    text-align: center;
  }
}
</style>
