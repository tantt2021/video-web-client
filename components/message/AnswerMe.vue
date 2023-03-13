<template>
    <div class="answer-me">
        <answer-item/>    
        <answer-item/>    
        <answer-item/>    
        <answer-item/>    
        <answer-item/>    
        <answer-item/>    
        <answer-item/>    
        <answer-item/>    
        <answer-item/>  
        <p>没有更多了......</p>

    </div>
</template>

<script setup lang="ts">
import AnswerItem from "./item/AnswerItem.vue";

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