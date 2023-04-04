<template>
    <div class="notification">
        <p>
            <strong>UP荣誉周报</strong>
            <span>2023.1.21 22:00</span>
        </p>
        <p>{{ content.message_text }}</p>
    </div>
</template>

<script lang="ts" setup>
const props = defineProps(["content"]);
</script>

<style lang="scss" scoped>
.notification{
    padding:1rem 1rem .5rem;
    border-bottom: 1px solid #ddd;
    p{
        font-size: .8rem;
        margin-top: .5rem;
        strong,span{
            font-size: .8rem;

        }
        span{
            margin-left: 1rem;
            color: #a1a1a1;
            font-weight: 500;
        }
        margin:0;
    }
}
</style>