<template>
<div class="transmit">
    <div class="edit">
        <img src="../assets/img/yatou.png" alt="">
        <a-textarea
          v-model:value="transmitContent"
          placeholder="请输入内容"
          :auto-size="{ minRows: 2, maxRows: 5 }"
        />
    </div>
    <div class="transmit-operate">
        <smile-outlined />
        <button>转发</button>
    </div>
    <div class="transmit-content">
        <transmit-item @submit="selectTransmit"></transmit-item>
        <transmit-item @submit="selectTransmit"></transmit-item>
    </div>
</div>
</template>

<script lang="ts" setup>
 import {
    SmileOutlined,
    
  } from '@ant-design/icons-vue';
import { ref } from "vue";
import TransmitItem from "@/components/TransmitItem.vue";
let transmitContent = ref("");

// 选择转发谁的内容
const selectTransmit = (content) => {
    // transmitContent.value = content;
    console.log(content);
    transmitContent.value = `//@${content.uname}:${content.transmitContent}`;
}
</script>

<style lang="scss" scoped>
.transmit{
    padding: 2rem;
    .edit{
        display: flex;
        img{
            width: 2rem;
            height: 2rem;
            border-radius: .5rem;
            margin-right: .5rem;
        }
    }
    .transmit-operate{
        margin-top: 1rem;
        display: flex;
        justify-content: space-between;
        border-bottom: 1px solid #ddd;
        padding-bottom: 1rem;
        button{
            line-height: 100%;
            background-color: #44bc87;
            padding: .4rem .5rem;
            border-radius: .2rem;
            font-size: .8rem;
            color: #fff;
        }
    }
    .transmit-content{

    }
}

</style>