<template>
    <div class="discover-list">
        <VideoItem v-for="item in 8" :key="item"/>
    </div>
</template>

<script lang="ts" setup>
import VideoItem from "@/components/VideoItem.vue";
</script>

<style lang="scss" scoped>
.discover-list{
    display:flex;
    flex-wrap:wrap;
}
</style>