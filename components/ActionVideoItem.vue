<template>
    <!-- <slot>   -->
        <div >
            <p>谢谢</p>
            <div class="box" @mouseenter="enter=true"   @mouseleave="enter=false" @click="navigateTo('/detail')">
                <div class="img-box">
                    <img src="../assets/img/侧耳.jpg" alt="">
                    <div v-show="enter">
                        <em>7:23</em>
                        <a-tooltip placement="top">
                          <template #title>
                            <span v-if="successAdd">稍后再看</span>
                            <span v-else>已加稍后再看</span>
                          </template>
                          <plus-square-outlined @click.stop="addToWarehouse" v-if="successAdd"/>
                          <check-square-outlined @click.stop="addToWarehouse" v-else/>
                        </a-tooltip>
                    </div>
                </div>
                <div class="video-decription">
                    <h4>千元机吊打iPhone!震惊！让我们走进K50|【up朱】</h4>
                    <p>千元机吊打iPhone!震惊！究竟是道德的沦丧还是价格的缺失</p>
                    <div class="video-mess">
                        <img src="../assets/svg/bfl.svg" alt=""> <em>111</em>
                        <img src="../assets/svg/dm.svg" alt=""> <em>22</em>
                    </div>
                </div>
            </div>
        </div>
    <!-- </slot> -->
</template>

<script lang="ts" setup>
import { PlusSquareOutlined,CheckSquareOutlined } from "@ant-design/icons-vue";
import { ref } from "vue";

let enter = ref(false);

let successAdd = ref(false);
// 加入稍后再看
const addToWarehouse = () => {
    // 图标切换
    successAdd.value = !successAdd.value;
    // 加入稍后再看逻辑

}
</script>



<style lang="scss" scoped>
p{
    margin: 0;
}
.box{
    display: flex;
    border: 1px solid #44bc87;
    &:hover h4{
        color: #44bc87;
        transition: all .5s;

    }
    &:hover .img-box::after{
        opacity: 1;
    }
    .img-box{
        position: relative;
        img{
            width: 15rem;
            position: relative;

        }
        span{
            position: absolute;
            left: 1rem;
            bottom: .5rem;
            color: #fff;
            font-size: .8rem;
        }
        em{
            position: absolute;
            right: 1rem;
            bottom: .5rem;
            color: #fff;
            font-size: .8rem;
        }
        &::after{
            transition: all .5s;
            opacity: 0;
            z-index: -1;
            content: "";
            position: absolute;
            left: 0;
            right: 0;
            bottom: 0;
            top: 0;
            box-shadow: inset 0rem 0rem 1rem .5rem rgba(97, 97, 97, 0.5);
        }
    }
    .video-decription{
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        margin-left: 1rem;
        p{
            color: #777676;
        }
        .video-mess{
            img{
                width: 1.1rem;
                & ~ img{
                    margin-left: 3rem;
                }
            }
            em{
                font-size: .8rem;
                
            }
        }
    }
    
}
</style>