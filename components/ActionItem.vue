<template>
    <div class="action-info" >
        <div class="up-info">
            <img :src="content?.avatar" class="avatar" alt="">
            <div class="up-mess">
                <h4 @click="navigateTo(`/user/${content?.user}`)">{{ content?.uname }}</h4>
                <p>{{content?.createTime.slice(0,10)}}</p>
            </div>

            <a-dropdown placement="bottom">
                <a class="ant-dropdown-link dropdown" @click.prevent.stop :style="{ height: '50%' }">
                    <ellipsis-outlined />
                </a>
                <template #overlay>
                    <a-menu>
                        <a-menu-item>
                            <a href="javascript:;">取消关注</a>
                        </a-menu-item>
                        <a-menu-item>
                            <a href="javascript:;">举报</a>
                        </a-menu-item>
                        <a-menu-item>
                            <a href="javascript:;">拉黑</a>
                        </a-menu-item>
                    </a-menu>
                </template>
            </a-dropdown>
        </div>
        <slot>
            <main @click="navigateTo('/characte')">
                <p>
                    {{ content?.content }}
                </p>
                <div class="img-container">
                    <div class="img-box" v-for="(item,idx) in imgArr" :key="idx" >
                        <img :src="item" alt="">
                    </div>
                </div>
            </main>
        </slot>
        <div class="operate">
            <like-outlined />
            {{ content?.likeCount }}
            <message-outlined />
            {{ content?.commentCount }}
        </div>
    </div>
</template>
<script lang="ts" setup>
import { EllipsisOutlined,MessageOutlined,LikeOutlined,ShareAltOutlined, LockFilled } from "@ant-design/icons-vue";
import type {TextDynaimcType} from "@/types";
const props = defineProps({
    content:{
        type:Object as PropType<TextDynaimcType>,
    }
})


// 动态的图片
let imgArr = computed(()=>{
    if(props.content?.imgArr==='')
        return [];
    
    let arr = props.content?.imgArr.split("&&");
    arr?.splice(arr.length - 1 ,1);
    return arr;
});
</script>
  
<style lang="scss" scoped>
.action-info {
    padding: 1rem;
    border-bottom: 1px #ddd solid;
    background-color: #fff;
    .up-info {
        display: flex;

        .avatar {
            width: 3rem;
            height: 3rem;
        }

        .up-mess {
            margin-left: 1rem;
            flex-grow: 1;

            h4 {
                margin: 0;
                cursor: pointer;
                &:hover{
                    color:#44bc87;
                }
            }
            p {
                font-weight: 400;
                font-size: .8rem;
                color: #7e7c7c;
            }
        }

        .dropdown {
            height: 50%;

        }

    }
    .operate{
        margin-top: .8rem;
        // margin-left: 2rem;
        color: #7e7c7c;
        span {
            & ~ span{
                margin-left:3rem;
            }
        }
    }
}
main{
    p{
        margin-top: 1rem;
    }
    .img-container{
        display: flex;
        flex-grow: 0;
        .img-box{
            height: 10rem;
            width: 10rem;
            img{
                width: 100%;
                height: 100%;
                object-fit: cover;    
            }
            + .img-box{
                margin-left: 1rem;
            }
        }

    }
    
    
}
a {
    font-weight: 400;
    font-size: 1rem;
}
</style>