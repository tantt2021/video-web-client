<template>
    <div>
        music
        <!-- <marquee behavior="" direction="row" >111111111</marquee>
        <marquee behavior="" direction="row" >111111111</marquee>
        <marquee behavior="" direction="row" >111111111</marquee>
    <marquee behavior="" direction="row" >111111111</marquee> -->
        <p>
            {{ res}}
        </p>
    </div>
</template>


<script lang="ts" setup>
import { ref } from "vue";
import {get} from "@/composables/request.ts";
// const res = await useAsyncData("get", () => $fetch("http://127.0.0.1:3005/video"));
// const res = await useFetch("http://127.0.0.1:3005/video",{method:"get"});
// console.log(res.data);
const res = await get("http://127.0.0.1:3005/video");
// let arr = ref(res);

</script>