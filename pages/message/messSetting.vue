<template>
    <div class="mess-setting">
        <div class="set-item">
            <p>    
                <strong>消息提醒</strong>（关闭后，消息将不再进行提醒）
            </p>
            <a-radio-group v-model:value="remind" :options="options1" />
        </div>
        <div class="set-item">
            <p>
                <strong>回复我的消息提醒</strong>（接受谁的评论消息提醒）
            </p>
            <a-radio-group v-model:value="answer" :options="options2" />
        </div>
        <div class="set-item">

            <p>
                <strong>@我的消息提醒</strong>（接受谁的@消息提醒）
            </p>
            <a-radio-group v-model:value="Q" :options="options2" />
        </div>
        <div class="set-item">
            <p>
                <strong>收到的赞消息提醒</strong>
            </p>
            <a-radio-group v-model:value="like" :options="options1" />
        </div>
        <div class="set-item">
            <p>
                <strong>收到未关注人消息</strong>
            </p>
            <a-radio-group v-model:value="strange" :options="options1" />
        </div>
    </div>
</template>

<script lang="ts" setup>
import {ref} from "vue";
let remind = ref("关闭");
let answer = ref("不接受任何消息提醒");
let Q = ref("不接受任何消息提醒");
let like = ref("关闭");
let strange = ref("关闭");

const value1 = ref<string>('关闭');
const options1 = ['开启', '关闭'];
const options2 = ['所有人', '关注的人', '不接受任何消息提醒'];
</script>


<style lang="scss" scoped>
.mess-setting{
    padding: 1rem;
    .set-item{
        margin-bottom: 1rem;
        color: #777;
        strong{
            color:#000;
        }
    }
}
</style>