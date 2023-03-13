<template>
    <div class="like-view">
        <like-item/>
        <like-item/>
        <like-item/>
        <like-item/>
        <like-item/>
        <like-item/>
        <like-item/>
        <like-item/>
        <like-item/>
        <p>没有更多了......</p>
    </div>
</template>


<script lang="ts" setup>
import LikeItem from "./item/LikeItem.vue";
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