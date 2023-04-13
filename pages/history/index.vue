<template>
  <div>
    <div class="history-operate">
      <a-input-search
        v-model:value="value"
        placeholder="input search text"
        style="width: 200px"
        @search="onSearch"
      />
      <button size="small" @click="pauseRecord">{{controlRecord}}</button>
      <a-popconfirm
        title="清空之后就什么都没有了哦~"
        ok-text="确定"
        cancel-text="取消"
        @confirm="confirmDel"
        @cancel="cancelDel"
      >
        <button size="small">清空历史</button>
      </a-popconfirm>
    </div>
    <div v-if="pause_history===1" class="stop-his-tip">
      <h1>已暂停记录</h1>
      <p>记录历史播放功能已暂停</p>
    </div>
    <div class="content">
      <history-item v-if="filterHistory.length" v-for="item in filterHistory" :key="item.id" :content="item" @del-history="deleteHistory"></history-item>
      <a-empty v-else/>
    </div>
    <h1 ref="getMore" class="get-more" v-show="getMoreVisible">
      拼命加载
      <LoadingOutlined />
    </h1>
    <h1 class="get-more" v-show="filterHistory.length>0&&!getMoreVisible">
      已经到底了...
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
import { message } from "ant-design-vue";
import {storeToRefs} from "pinia";
import { editInformation } from "~~/api/userEditMessage";
useHead({
  title: '历史记录',
  meta: [
    { name: 'description', content: 'My amazing site.' }
  ],
})
let value = ref("");
let filterHistory = ref<HistoryType[]>([]);
let historyLength = ref(5);
const onSearch = () => {
  filterHistory.value = history.value.filter(
    (item)=>item.title.indexOf(value.value)!==-1
  );
}
// 路由
const router = useRouter();


// 请求用户的历史记录
const { user } = useStore();
console.log(user.id,"id");
let history = ref<HistoryType[]>([]);
const getHistory = async () => {
  history.value = await getHistorys({userId:user.id});
  console.log("his",history.value);
  
  filterHistory.value = history.value.slice(0,historyLength.value);
}
watch(()=>historyLength.value,(n)=>{
  console.log(n);
  
  filterHistory.value = history.value.slice(0,historyLength.value);

});
// 删除历史记录
const deleteHistory = async (e:string) => {
  console.log("delHistory",e);
  await delHistory({id:e}).then(
    res=>{
      console.log(res,"删除成功");
      history.value = history.value.filter(v=>v.id!==e);
      filterHistory.value = history.value.slice(0,historyLength.value);
    }
  )
}



const confirmDel = async () => {
  if(history.value.length<1){
    message.warning('历史记录已空');
    return;
  }
  await delHistory({userId:user.id}).then(
    res=>{
      message.success('全部删除成功');
      filterHistory.value = history.value = [];

    }
  )
};
const cancelDel = () => {

}

// 暂停记录历史
let {pause_history,id} = storeToRefs(user);
const pauseRecord = () => {
  // user.handlePause_istory();
  pause_history.value = pause_history.value?0:1;

  editInformation({id,pause_history:pause_history.value});
  if(pause_history.value)
    message.success("已暂停记录");
  else
    message.success("已恢复记录");
}
let controlRecord = computed(() => {
  if(pause_history.value){
    return "继续记录历史";
  }else{
    return "暂停记录历史";
  }
});
// 滚动加载
let getMore = ref<Element|null>(null);
let getMoreVisible = ref(false);

let observer: IntersectionObserver | null = null;
onMounted(async ()=>{
  history.value = await getHistorys({userId:user.id});
  
  filterHistory.value = history.value.slice(0,historyLength.value);

  console.log(history.value.length,filterHistory.value.length);

  if(filterHistory.value.length<history.value.length){
    getMoreVisible.value = true;
    observer = new IntersectionObserver(entries=>{
      entries.forEach(entry=>{
        if(entry.isIntersecting){
          // 加载，filterHistory长度增加
          setTimeout(()=>{
            // 增加展示长度
            let diff = history.value.length - filterHistory.value.length;
            if(diff>5){
              historyLength.value+=5;
              filterHistory.value = history.value.slice(0,historyLength.value+5);
            }else if(diff>0){
              filterHistory.value = history.value.slice(0,historyLength.value+diff);
            }else{
              // 已全部加载，设置隐藏
              getMoreVisible.value = false;

            }
          },1000)
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
  .stop-his-tip{
    p,h1{
      text-align: center;
    }
    h1{
      padding-top: 3rem;
    }
    p{
      color: #bbb ;
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
