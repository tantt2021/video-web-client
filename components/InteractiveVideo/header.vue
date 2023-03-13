<template>
    <header class="header">
        <div>
            <a-popconfirm
              title="系统可能未保存您做的修改,确定离开？"
              ok-text="确定"
              cancel-text="取消"
              @confirm="quitConfirm"
              @cancel="quitCancel"
            >
                <left-outlined/>

            </a-popconfirm>
            <img src="../../assets/svg/Previous.svg" alt="">
            <img src="../../assets/svg/NextStep.svg" alt="">
        </div>
        <div class="scale">
            <zoom-in-outlined />
            <zoom-out-outlined />
        </div>
        <div>
            <play-square-outlined @click="videoPreview=true"/>
            <history-outlined />
            <button>提交</button>
        </div>
    </header>
    <a-modal
      v-model:visible="videoPreview"
      title="视频预览"
      centered
      class="modal"
    >
      <template #footer>
        
      </template>
      <video src="../../assets/video/樱花草.mp4"    controls></video>
    </a-modal>
</template>

<script setup lang="ts">
import { LeftOutlined, ZoomOutOutlined, ZoomInOutlined, PlaySquareOutlined, HistoryOutlined } from '@ant-design/icons-vue';
import { message } from 'ant-design-vue';
import {ref} from "vue";
const router = useRouter();


const quitConfirm = (e: MouseEvent) => {
  
  message.success('Click on Yes');
  router.go(-1);
};
const quitCancel = (e: MouseEvent) => {
//   message.error('Click on No');
};

// 视频预览
let videoPreview = ref(false);
</script>

<style lang="scss">
.header{
    display: flex;
    justify-content: space-between;
    padding: 0 2rem;
    border-bottom: 1px solid #ddd;
    height: 3.5rem;
    line-height: 3.5rem;
    background-color: #fff;
    .scale{
        // line-height: 100%;
    }
    span ~ span{
        margin-left: 2rem;
    }
    img{
        margin-left: 2rem;
    }
    button{
        margin-left: 2rem;
        color: #44bc87;
        border: 1px solid #44bc87;
        padding: .2rem 1rem;
    }
}
.modal{
    video{
        width: 100%;
    }
}
</style>