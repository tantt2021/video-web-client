<template>
    <div class="transmit-content">
        <img src="../assets/img/yatou.png" alt="">
        <h4>{{ uname}}</h4>
        <p>{{transmitContent}}</p>
        <div class="transmit-content-other">
            <span>48min前</span>
            <button @click="$emit('submit',{uname,transmitContent} )">转发</button>
        </div>
    </div>
</template>

<script lang="ts" setup>
import type { SizeType } from 'ant-design-vue/es/config-provider';
// import { emit } from "vue";
let size = ref<SizeType>("small");
let uname = ref("tantt");
let transmitContent = ref("content111");
</script>

<style lang="scss" scoped>
.transmit-content{
    position: relative;
    padding-left: 2.5rem;
    margin: 1rem;
    img{
        position: absolute;
        width: 2rem;
        height:2rem;
        border-radius:.5rem;
        left: 0;
    }
    .transmit-content-other{
        display: flex;
        justify-content: space-between;
        
        button,span{
            font-size: .8rem;

        }
        button{
            color: #44bc87;
        }
    }

}
</style>