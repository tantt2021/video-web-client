<template>
    <div class="answer-item">
        <img src="../../../assets/img/yatou.png" alt="">
        <div class="answer-content">
            <p>
                <strong>推土机</strong>
                回复了 我 的评论
            </p>
            <p>式子这都不会</p>
            <div>
                <span>2022.2.3 12:33</span>
                <button><MessageOutlined/> 回复</button>
                <button><LikeOutlined/> 点赞</button>
            </div>
        </div>
        
    </div>
</template>
<script lang="ts" setup>
import { EllipsisOutlined,MessageOutlined,LikeOutlined,ShareAltOutlined } from "@ant-design/icons-vue";
</script>

<style lang="scss" scoped>
.answer-item{
    display: flex;
    border-bottom: 1px solid #ddd;
    padding-bottom: .5rem;
    img{
        width: 2rem;
        height: 2rem;
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