<template>
    <div class="q-me">
        <a-empty :image="simpleImage" />
    </div>
</template>
<script lang="ts" setup>
import { Empty } from 'ant-design-vue';
let simpleImage = Empty.PRESENTED_IMAGE_SIMPLE;
</script>

<style lang="scss" scoped>
.q-me{
    // margin: 2rem 0;
}
</style>