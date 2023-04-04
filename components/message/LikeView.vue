<template>
    <div class="like-view">

        <like-item v-if="thumbupArr.length>0" v-for="item in thumbupArr" :content="item"/>
        <a-empty v-else />
        <p>没有更多了......</p>
    </div>
</template>


<script lang="ts" setup>
import LikeItem from "./item/LikeItem.vue";
import {getMessage} from "@/api/message";
import type { MessageType } from "~~/types";
import useStore from "~~/store";
let {user} = useStore();

let thumbupArr = ref<MessageType[]>([]);
thumbupArr.value = await getMessage({id:user.id,type:"thumbup"});
</script>

<style lang="scss" scoped>
    .like-view{
        p{
            padding: 1rem;
            color: #6e6c6c;
            text-align: center;
        }
    }
</style>