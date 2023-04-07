<template>
    <div class="history-item">
        <img :src="content.cover" alt="" @click="navigateTo(`/detail/${content.videoId}`)">
        <div class="history-item-mess">
            <h4 @click="navigateTo(`/detail/${content.videoId}`)">{{content.title}}</h4>
            <a-popconfirm
              title="确认删除该历史记录吗?"
              ok-text="确定"
              cancel-text="取消"
              @confirm="confirmDel"
              @cancel="cancelDel"
              placement="topRight"
            >
                <span class="operate"><delete-outlined /></span>
            </a-popconfirm>
            <p>
                <span @click="navigateTo(`/user/${content.authorId}`)" class="user">{{ content.author }}</span>
                <span>{{ time }}</span>
            </p>
        </div>
    </div>
</template>

<script setup lang="ts">
import {DeleteOutlined} from '@ant-design/icons-vue';
import { message } from 'ant-design-vue';
const props = defineProps(["content"]);
const emits = defineEmits(["del-history"]);

// 删除历史记录
const confirmDel = () => {
    emits("del-history",props.content.id);
    message.success('删除成功');
}
const cancelDel = () => {

}

let time = computed(()=>{
    let date = new Date(props.content.watchedAt);
    let year = date.getFullYear();
    let month = date.getMonth() + 1;
    let day = date.getDate();
    return `${year}-${month}-${day}`;
});

</script>

<style lang="scss" scoped>
.history-item{
    display: flex;
    padding: .8rem;
    border-bottom: 1px solid #ddd;
    img{
        width: 12rem;
        height: 8rem;
        cursor: pointer;
    }
    .history-item-mess{
        // display: flex;
        // flex-direction: column;
        // justify-content: space-between;
        margin-left: 2rem;
        // flex-grow:1;
        width: 100%;
        position: relative;
        h4{
            font-weight: bold;
            padding-bottom: 4rem;
            cursor: pointer;
            &:hover{
                color: #44bc87;
            }
        }
        .operate{
            position: absolute;
            right: 2rem;
            width: 1rem;
            height: 1rem;
            span{
                position: absolute;
                right: 0;
                vertical-align: middle;
                &:hover{
                    color: #44bc87;
                }
            }
        }
        p{
            margin: 0;
            width: 30rem;
            span{
                display: inline-block;
                width: 10rem;
                margin-right: 5rem;
                color: #a6a2a2;
                
            }
            .user{
                cursor: pointer;
                &:hover{
                    color: #44bc87;

                }
            }
        }
    }
}
</style>