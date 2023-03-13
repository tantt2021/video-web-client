<template>
    <div class="like-item" @mouseenter="active=true" @mouseleave="active=false">
        <p><span>推土机、特调酒 </span>等总计2人赞了我的的评论</p>
        <span class="like-time">2023.2.22 00:39</span>

        <div v-show="active" class="operate">
            <button><delete-outlined /> 删除该通知</button>
            <button><stop-outlined /> 不再通知</button>
        </div>
    </div>
</template>

<script lang="ts" setup>
import {
    DeleteOutlined,
    StopOutlined,
} from '@ant-design/icons-vue';
import {ref} from "vue";

let active = ref(false);
</script>


<style lang="scss" scoped>
.like-item{
    padding: .5rem 1rem;
    border-bottom: 1px solid #ddd;
    p{
        span{
            font-weight: bold;
        }
    }
    .like-time{
        color: #a4a2a2;
        font-size: .8rem;
    }
    .operate{
        display:inline-block;
        button{
            span{
                height:.5rem;
                vertical-align: sub;

            }
            // vertical-align: top;
            margin-left: 2rem;
            color: #bcbcbc;
            font-size: .7rem;

            &:hover{
                color: #44bc87;
            }
        }
    }
}
</style>