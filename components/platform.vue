<template>
  <div class="platform">
    <h4>发布视频</h4>
    <a-tabs v-model:activeKey="activeKey">
      <a-tab-pane  :tab="item" v-for="(item,idx) in tabs" :key="idx">
        <a-upload-dragger
          v-if="idx===0"
          v-model:fileList="fileList"
          name="file"
          :multiple="true"
          action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
          @change="handleChange"
          @drop="handleDrop"
          :style="{height:'70rem'}"
        >
          <p class="ant-upload-drag-icon">
            <inbox-outlined></inbox-outlined>
          </p>
          <p class="ant-upload-text">Click or drag file to this area to upload</p>
          <p class="ant-upload-hint">
            Support for a single or bulk upload. Strictly prohibit from uploading company data    or   other
            band files
          </p>
        </a-upload-dragger>
        <template v-else>
          <interactive-video @click="navigateTo('/studio')"/>
        </template>
      </a-tab-pane>
    </a-tabs>
    
  </div>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import { InboxOutlined } from '@ant-design/icons-vue';
import { message } from 'ant-design-vue';
import type { UploadChangeParam } from 'ant-design-vue';
import InteractiveVideo from "@/components/InteractiveVideo/InteractiveVideo.vue";

let fileList = ref([]);
const handleChange = (info: UploadChangeParam) => {
      const status = info.file.status;
      if (status !== 'uploading') {
        console.log(info.file, info.fileList);
      }
      if (status === 'done') {
        message.success(`${info.file.name} file uploaded successfully.`);
      } else if (status === 'error') {
        message.error(`${info.file.name} file upload failed.`);
      }
}
const handleDrop = (e: DragEvent) => {
  console.log(e);
}

let activeKey = ref('1');

let tabs = ref(["视频投稿","互动视频投稿"]);
</script>

<style lang="scss" scoped>
.platform{
  margin: 1rem;
  h4{
    // padding: 0 1rem;
  }

}
</style>
