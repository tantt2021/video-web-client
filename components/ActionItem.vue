<template>
    <div class="action-info" >
        <div class="up-info">
            <img src="../assets/img/yatou.png" alt="">
            <div class="up-mess">
                <h4>tantt</h4>
                <p>42min前·投稿了文章</p>
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
                    【源码】飞行的钢铁侠loading加载动画
                    实例：飞行的钢铁侠loading加载动画技术栈：HTML+CSS效果：源码：【html】飞行的钢铁侠
                </p>
                <img src="../assets/img/侧耳.jpg" alt="">
            </main>
        </slot>
        <div class="operate">
            <like-outlined />
            <em>1</em>
            <message-outlined />
            <em>2</em>
            <share-alt-outlined />
            <em>3</em>
        </div>
    </div>
</template>
<script lang="ts" setup>
import {useSlots,onMounted} from "vue";
import { EllipsisOutlined,MessageOutlined,LikeOutlined,ShareAltOutlined } from "@ant-design/icons-vue";

// const slots = useSlots();
onMounted(()=>{
    // if (slots.default()) {
    //     console.log(slots.default());
        
    // }
    
});

</script>
  
<style lang="scss" scoped>
.action-info {
    padding: 1rem;
    border-bottom: 1px #ddd solid;
    .up-info {
        display: flex;

        img {
            width: 3rem;
            height: 3rem;
        }

        .up-mess {
            margin-left: 1rem;
            flex-grow: 1;

            h4 {
                margin: 0;
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
    img{
        // margin-top: 1rem;
        width: 20rem;
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
    img{
        margin-top: 1rem;
    }
}
a {
    font-weight: 400;
    font-size: 1rem;
}
</style>