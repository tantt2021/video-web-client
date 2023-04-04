<template>
    <div v-if="systemNotificationArr.length>0">
        <notification-item v-for="(item,idx) in systemNotificationArr" :key="idx" :content="item"/>
        <p>没有更多了......</p>
    </div>
    <a-empty v-else/>
</template>

<script lang="ts" setup>
import NotificationItem from "./item/NotificationItem.vue";
import type {MessageType} from "@/types";
import {getMessage} from "@/api/message";
import useStore from "~~/store";
let {user} = useStore();
let systemNotificationArr = ref<MessageType[]>([]);
systemNotificationArr.value = await getMessage({type:"systemNotification",id:user.id});



</script>

<style lang="scss" scoped>
    p{
        text-align: center;
        padding: 1rem;
        color: #777;
        font-size: .8rem;
    }
</style>