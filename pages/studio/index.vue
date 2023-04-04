<template>
  <div class="interactive-video">
      <Header />
      <button class="video-collection" @click="videoCollectionVisible=true">视频分P<right-outlined /></button>
      <button class="video-collection" @click="plotModuleVisible=true">剧情模块</button>
  </div>

  <!-- 视频分P -->
  <a-drawer
    v-model:visible="videoCollectionVisible"
    class="custom-class"
    title="视频分P"
    placement="left"
    @after-visible-change="afterVisibleChange"
    :mask="false"
  >
      <a-input-search
        v-model:value="inputValue"
        placeholder="input search text"
        style="width: 100%"
        @search="onSearch"
      />
      <div class="video-list">
        <div class="video-simple-item" v-for="(item,idx) in filterVideoList" :key="idx" draggable="true">
          <div class="video-idx">P{{idx+1}}</div>
          <div class="video-item">{{item}}</div>
        </div>
      </div>
  </a-drawer>

  <!-- 剧情模块 -->
  <a-drawer
    v-model:visible="plotModuleVisible"
    class="custom-class"
    title="剧情模块"
    placement="right"
    @after-visible-change="afterplotModuleVisibleChange"
  >
      <template #extra>
        <a-button type="primary" @click="submit">应用</a-button>
      </template>
      <p>设置</p>
      <span>剧情模块名称 </span>
      <a-input prefix="" :style="{width:'70%'}" />
      <br/>
      <br/>
      <span>设置剧情素材 </span>
      <a-dropdown placement="bottom">
        <a-button :style="{width:'70%',position:'relative'}" class="selected">
          P1黄昏与猫
          <DownOutlined :style="{position:'absolute',right:'.5rem',top:'35%'}" class="icon"/>
        </a-button>
        <template #overlay>
          <a-menu>
            <a-menu-item>
                p1
            </a-menu-item>
            <a-menu-item>
                p1
            </a-menu-item>
            <a-menu-item>
                p1
            </a-menu-item>
          </a-menu>
        </template>
    </a-dropdown>
      
  </a-drawer>
</template>
<script lang="ts" setup>
import Header from "@/components/InteractiveVideo/header.vue";
import {DownOutlined,RightOutlined} from "@ant-design/icons-vue";
import {computed} from "vue";
useHead({
title: '创作中心/互动视频创作',
meta: [
  { name: 'description', content: 'My amazing site.' }
],
})
const videoCollectionVisible = ref<boolean>(false);

const afterVisibleChange = (bool: boolean) => {
    console.log('visible', bool);
};

const showDrawer = () => {
  videoCollectionVisible.value = true;
};

let inputValue = ref("");
const onSearch = () => {

};

let plotModuleVisible = ref<boolean>(false);
const submit = () => {
plotModuleVisible.value = false;
}
const afterplotModuleVisibleChange = (bool: boolean) => {
    console.log('visible', bool);
};
let videoList = ref(["海边日落","黄昏与猫","樱花草","红玫瑰","小花花"]);
let filterVideoList = computed(()=>{
return videoList.value.filter((item) => item.indexOf(inputValue.value)!==-1);
 
});
</script>

<style lang="scss" scoped>
.interactive-video{
  background: #b4e0df;
  background-image:
      linear-gradient(rgba(138, 138, 138, 0.1) 1px, transparent 0),
      linear-gradient(90deg, rgba(138, 138, 138, 0.1) 1px, transparent 0);
  background-size: 15px 15px, 15px 15px, 75px 75px, 75px 75px;
  height: 100vmin;
  .video-collection{
      border:1px solid #000;
      padding: .5rem 1rem;
      margin:1rem;
  }

  
}
span{
  line-height: 100%;
}
:global(.custom-class span){
  line-height: 100%;
}
.custom-class {
.video-list{
  margin:2rem 0;
  .video-simple-item{
    display: flex;
    margin-bottom: 1rem;
    &:hover{
      background-color: #f5f5f5;
    }
    .video-idx{
      background-color: rgb(206, 255, 208);
      padding: .5rem;

    }
    .video-item{
      // flex-grow: 1;
      width: 100%;
      vertical-align: middle;
      // line-height: 100%;
      padding: .5rem;

    }
  
}
}

span{
  vertical-align: middle;
}
}
.icon{
transition: all .2s;
}
.selected span{
// transform:scale(70%);
}
.selected:hover span{
transform: rotate(180deg);
// font-size: .1rem;
// background-color: #667554;
}

</style>