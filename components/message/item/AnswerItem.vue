<template>
    <!--  -->
    <div class="answer-item" @click="navigateTo(`/detail/${content.target_id}`)">
        <img :src="content.avatar" alt="" @click="navigateTo(`/user/${content.sender_id}`)">
        <div class="answer-content">
            <p>
                <strong  @click="navigateTo(`/user/${content.sender_id}`)">{{ content.sender_uname }}</strong>
                回复了 我 的评论
            </p>
            <p>{{ content.message_text }}</p>
            <div>
                <span>{{ content.createTime.slice(0,10) }}</span>
            </div>
        </div>
        
    </div>
</template>
<script lang="ts" setup>
import { EllipsisOutlined,MessageOutlined,LikeOutlined,ShareAltOutlined } from "@ant-design/icons-vue";

const props = defineProps(["content"]);

</script>

<style lang="scss" scoped>
.answer-item{
    display: flex;
    border-bottom: 1px solid #ddd;
    padding-bottom: .5rem;
    img{
        width: 2rem;
        height: 2rem;
        cursor: pointer;
    }
    .answer-content{
        padding-left: 1rem;
        p{
            font-size: .9rem;
            color: #777;

            margin: 0;
        }
        span{
            color: #777;
            font-size: .9rem;
        
        }
        strong{
            color: #000;
            cursor: pointer;
        }
        button{
            font-size: .8rem;
            margin-left: 1rem;
            &:hover ,&:hover span{
                color: #44bc87;
            }
        }
    }
}
</style>