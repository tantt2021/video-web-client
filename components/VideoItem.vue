<template>
    <div class="video-item">
        <router-link :to="`/detail/${config.id}`">
            <img :src="config.cover" alt="">
            <div class="mask"></div>
            <div class="data">
                <div class="data-item">
                    <img src="../assets/svg/bfl.svg" alt="">
                    <span>{{ config.views }}</span>
                </div>
                <div class="data-item">
                    <img src="../assets/svg/dm.svg" alt="">
                    <span>{{ config.marqueeCount }}</span>
                </div>
            </div>
            
        </router-link>
        <div class="video-info">
            <a  href="http://169.254.227.78:3000/history">{{ config.title }}</a>
                
                <a-popconfirm
                  :title="popconfirm"
                  ok-text="确定"
                  cancel-text="取消"
                  @confirm="confirm"
                  v-if="type==='work'||type==='star'"
                >
                  <button><export-outlined /></button>
                </a-popconfirm>
            <p>
                <NuxtLink :to="`/user/${config.authorId}`" >{{ config.author }}</NuxtLink>
                ·<span> {{ time }}</span>
            </p>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { ExportOutlined } from '@ant-design/icons-vue';
import { message } from 'ant-design-vue';
const props = defineProps(["config","type"]);
const emit = defineEmits(["cancel-star","del-video"])

// 时间格式化
let time:String;
if(props.config)
    time = props.config.createTime.substring(0,10);

// 删除视频、取消收藏
const confirm = (e: MouseEvent) => {
    if(props.type==='star'){
        // 取消收藏的api
        emit("cancel-star",props.config.id);
        message.success('取消收藏成功');
    }else{
        // 删除视频的api
        emit("del-video",props.config.id);
        message.success('成功删除视频');

    }
};
// popconfirm提示
let popconfirm = computed(()=>{
    return props.type==='star' ? '确认取消收藏吗？':'确认删除作品吗？'
});
</script>

<style lang="scss" scoped>
.video-item{
    margin:.5rem 1.5rem;
    a{
        display: inline-block;
        position: relative;
        background-color: #ddd;
        border-radius: .5rem;
        .mask{

            position: absolute;
            bottom: 0;
            left: 0;
            top: 80%;
            right: 0;
            background: linear-gradient(to bottom,transparent,#686868);
            border-bottom-left-radius: .5rem;
            border-bottom-right-radius: .5rem;
        }
        .data{
            // float: left;
            position: absolute;
            top: 3.3rem;
            display: flex;
            .data-item{
                padding: 0 .5rem;
            }
            img{
                width: 1rem;
                margin: 0 .3rem;
            }
            span{
                font-weight: 400;
                font-size: .8rem;
                color: #fff;
                vertical-align: middle;
            }
        }
    }
    img{
        width: 15rem;
        height: 8rem;
        border-radius: .5rem;
    }
    .video-info{
        position: relative;
        a{
            background-color: transparent;

            font-weight: 400;
            font-size: 1rem;
            &:hover{
                color: #44bc87;
            }
        }
        p{
            color: #c6c7c8;
        }
        span{
            font-weight: 400;
            font-size: 1rem;

        }
        button{
            position: absolute;
            bottom: 0rem;
            right: 0rem;
            color: #818181;
        }
    }
}
:global(.ant-popover-inner-content){
    text-align: left;
}
</style>