<template>
    <div>
        <up-info/>
        <p>39元活动仅限一天！版型设计、图案风格都非常好看！！</p>
        <img src="../../assets/img/侧耳.jpg" alt="">
        <a-menu v-model:selectedKeys="current" mode="horizontal">
            <a-menu-item key="comment">
              <template #icon>
                <message-outlined />
              </template>
              评论
            </a-menu-item>
            <a-menu-item key="transmit">
              <template #icon>
                <share-alt-outlined />
              </template>
              转发
            </a-menu-item>
        </a-menu>
        <comment v-if="current[0]==='comment'"/>  
        <transmit v-else/>  
    </div>
</template>



<script lang="ts" setup>
import {ref} from "vue";
import {ShareAltOutlined,MessageOutlined} from '@ant-design/icons-vue';

const current = ref<string[]>(['transmit']);
</script>