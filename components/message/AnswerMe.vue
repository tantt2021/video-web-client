<template>
    <div class="answer-me">
        <answer-item v-for="item in answerMe" :key="item.id" :content="item"/>    
        <p>没有更多了......</p>

    </div>
</template>

<script setup lang="ts">
import AnswerItem from "./item/AnswerItem.vue";
import {getMessage} from "@/api/message";
import type { MessageType } from "~~/types";
import useStore from "~~/store";
let {user} = useStore();
let answerMe = ref<MessageType[]>([]);
answerMe.value = await getMessage({type:"reply",id:user.id});
console.log("test",answerMe.value );

</script>

<style lang="scss" scoped>
.answer-me{
    padding: 1rem;
    p{
            padding: 1rem;
            color: #6e6c6c;
            text-align: center;
            font-size:.8rem;
        }
}
</style>