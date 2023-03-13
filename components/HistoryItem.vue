<template>
    <div class="history-item">
        <img src="../assets/img/侧耳.jpg" alt="">
        <div class="history-item-mess">
            <h4>video</h4>
            <div class="operate"><delete-outlined /></div>
            <p>
                <span>tantt</span>
                <span>time</span>
            </p>
        </div>
    </div>
</template>

<script setup lang="ts">
import {DeleteOutlined} from '@ant-design/icons-vue';
</script>

<style lang="scss" scoped>
.history-item{
    display: flex;
    padding: .8rem;
    border-bottom: 1px solid #ddd;
    img{
        width: 12rem;
        // height: 15rem;
    }
    .history-item-mess{
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        margin-left: 2rem;
        flex-grow:1;
        h4{
            font-weight: bold;
            &:hover{
                color: #44bc87;
            }
        }
        .operate{
            overflow: hidden;
            span{
                float: right;
                font-size: .8rem;
                &:hover{
                    color: #44bc87;
                }
            }
        }
        p{
            margin: 0;
            span{
                margin-right: 5rem;
                color: #5e5e5e;
                &:nth-child(1):hover{
                    color: #44bc87;
                }   
            }
        }
    }
}
</style>