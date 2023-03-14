<template>
    <div class="interactive-video">
        <Header/>
        <button class="video-collection" @click="videoCollectionVisible=true">视频分P</button>
        <button class="video-collection" @click="plotModuleVisible=true">视频分P</button>
    </div>

    <!-- 视频分P -->
    <a-drawer
      v-model:visible="videoCollectionVisible"
      class="custom-class"
      title="视频分P"
      placement="left"
      @after-visible-change="afterVisibleChange"
    >
        <a-input-search
          v-model:value="inputValue"
          placeholder="input search text"
          style="width: 200px"
          @search="onSearch"
        />
      
    </a-drawer>

    <!-- 剧情模块 -->
    <a-drawer
      v-model:visible="plotModuleVisible"
      class="custom-class"
      title="剧情模块"
      placement="right"
      @after-visible-change="afterplotModuleVisibleChange"
    >
        <p>设置</p>
        剧情模块名称<a-input prefix="" :style="{width:'70%'}" />
        设置剧情素材<a-dropdown placement="bottom">
        <a-button :style="{width:'70%'}">qqqbbb<DownOutlined /></a-button>
        <template #overlay>
          <a-menu>
            <a-menu-item>
              <a target="_blank" rel="noopener noreferrer" href="http://www.alipay.com/">
                1st menu item
              </a>
            </a-menu-item>
            <a-menu-item>
              <a target="_blank" rel="noopener noreferrer" href="http://www.taobao.com/">
                2nd menu item
              </a>
            </a-menu-item>
            <a-menu-item>
              <a target="_blank" rel="noopener noreferrer" href="http://www.tmall.com/">
                3rd menu item
              </a>
            </a-menu-item>
          </a-menu>
        </template>
      </a-dropdown>
        
    </a-drawer>
</template>
<script lang="ts" setup>
import Header from "@/components/InteractiveVideo/header.vue";
import {DownOutlined} from "@ant-design/icons-vue";

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

const afterplotModuleVisibleChange = (bool: boolean) => {
      console.log('visible', bool);
};


</script>

<style lang="scss" scoped>
.interactive-video{
    .video-collection{
        border:1px solid #000;
        padding: .5rem 1rem;
        margin:1rem;
    }

    
}
span{
    line-height: 100%;
}
:global(.interactive-video button){
    line-height: 100%;
}

</style>