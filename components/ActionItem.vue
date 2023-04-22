<template>
    <div class="action-info" >
        <div class="up-info">
            <img :src="content?.avatar" class="avatar" alt="">
            <div class="up-mess">
                <h4 v-if="content?.user !== user.id" @click="navigateTo(`/user/${content?.user}`)">{{ content?.uname }}</h4>
                <h4 v-else @click="navigateTo(`/user/self`)">{{ content?.uname }}</h4>
                <p>{{content?.createTime.slice(0,10)}}</p>
            </div>

            <a-dropdown placement="bottom">
                <a class="ant-dropdown-link dropdown" @click.prevent.stop :style="{ height: '50%' }">
                    <ellipsis-outlined />
                </a>
                <template #overlay>
                    <a-menu v-if="content?.user !== user.id">
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
                    <a-menu v-else>
                        <a-menu-item>
                            <span @click="delDynamic">删除</span>
                        </a-menu-item>
                    </a-menu>
                </template>
            </a-dropdown>
        </div>
        <slot>
            <main>
                <p class="content" v-html="contentText">
                </p>
                <div  :class="{'four-pic':isFourPic,'img-container':!isFourPic}">
                <!-- <div class="four-pic"> -->
                    <!-- <div class="img-box" v-for="(item,idx) in imgArr" :key="idx" > -->
                            <img :src="item" alt="" v-for="(item,idx) in imgArr" :key="idx">
                    <!-- </div> -->
                </div>
            </main>
        </slot>
        <div class="operate">
            <div>
                <like-outlined />
                {{ content?.likeCount }}
            </div>
            
            <div  @click="showCommentArea" :style="{color:commentVisible?'#44bc87':''}">
                <message-outlined/>
                {{ content?.commentCount }}
            </div>
        </div>
        <div v-if="commentVisible">
            <div class="mycomment">
                <img :src="user.avatar" alt="">
                <div class="textarea">
                    <a-textarea  v-model:value="comment" placeholder="友善评论，尽情发言" />
                    <AppPickerComposition @updateEmoji="updateEmoji"/>
                </div>
                <button @click="submitComment">发布</button>
            </div>
            <comment :commentList="levelComment" :dynamicId="content?.id" @add-comment="sonAddComment" fatherType="dynamic"/>
        </div>
    </div>
</template>
<script lang="ts" setup>
import { EllipsisOutlined,MessageOutlined,LikeOutlined,ShareAltOutlined, LockFilled } from "@ant-design/icons-vue";
import type {TextDynaimcType} from "@/types";
import useStore from "~/store";
import {DELDynamic} from "@/api/dynamic";
import { getComment, addComment } from "~/api/data";
import Comment from "./Comment.vue";
import type { CommentType } from "@/types";
import { message } from "ant-design-vue";
import AppPickerComposition from "~/components/AppPickerComposition.vue";


const { user } = useStore();
const props = defineProps({
    content:{
        type:Object as PropType<TextDynaimcType>,
    }
})
const emit = defineEmits(["reload"]);

// 动态的图片
let imgArr = computed(()=>{
    if(props.content?.imgArr==='')
        return [];
    
    let arr = props.content?.imgArr.split("&&");
    arr?.splice(arr.length - 1 ,1);
    console.log(arr,"arr");
    
    return arr;
});

let isFourPic = ref(false);
watch(()=>imgArr.value,()=>{
    isFourPic.value = imgArr.value?.length === 4
},{
    immediate:true
})

// 动态插入br
const contentText = computed(()=>{
    console.log(props.content?.content);
    // return props.content?.content;
    return props.content?.content.replace(/(\r\n|\n)/g, '<br/>');
})

// 删除动态
const delDynamic = async () => {
    await DELDynamic({
        id:props.content?.id,
        img:props.content?.imgArr
    }).then(
        res => {
            // 触发父函数刷新页面
            emit("reload");
        }
    )
}   

// 评论区
let commentList = reactive<CommentType[]>([]);
let levelComment = computed(()=>{
  let arr:CommentType[] = [];
  commentList.forEach(item=>{
      if(item.parent_id === ''){
        arr.push(item);
      }
  })
  arr.forEach(item=>item.sonComment = []);   // 一级评论表
  commentList.forEach(item=>{
    if(item.parent_id !== ''){
        arr.forEach(father=>{
          if(father.id === item.parent_id){
            // 给二级评论设置reply_username，根据parent_id找到评论，对应用户名
            commentList.forEach(temp=>{
              if(item.reply_user_id.indexOf(temp.user_id)===0){
                item.reply_username = temp.uname;
              }
            })
            father.sonComment.push(item);
          }
        })
      }
  })
  return arr;
});

let commentVisible = ref(false);
watch(()=>commentVisible.value,(n)=>{
    if(n){
        getComment({dynamic_id:props.content?.id}).then(
          res => {
            Object.assign(commentList,res.data);
            // 转化成父子评论
          }
        )
    }
});
let comment = ref("");
const updateEmoji = (emoji:any) => {
    console.log(emoji);
    
    comment.value += emoji;
    console.log(comment.value);
    
}
const showCommentArea = () => {
    commentVisible.value = !commentVisible.value;
}
const submitComment = () => {
    console.log(comment.value);
    if(comment.value.trim()===''){
      message.error("评论内容不能为空");
      return;
    }

    addComment({
      content : comment.value,
      user_id : user.id,
      parent_id : '',
      dynamic_id : props.content?.id,
      reply_user_id:"",
      type: 'dynamic',
    }).then(
      res => {
        message.success("发表评论成功！");
        getComment({dynamic_id:props.content?.id}).then(
          res => {
            Object.assign(commentList,res.data);
            // 转化成父子评论
          }
        )
        comment.value = '';

      }
    )
    
}
// 子组件添加评论
const sonAddComment = () => {
  getComment({dynamic_id:props.content?.id}).then(
    res => {
      Object.assign(commentList,res.data);
      // 转化成父子评论
    }
  )
  
}
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
        display: flex;
        margin-top: .8rem;
        // margin-left: 2rem;
        color: #7e7c7c;
        div {
            cursor: pointer;
            & ~ div{
                margin-left:3rem;
            }
        }
    }
    .mycomment {
      border-radius: 8px;
      padding: 10px;
      margin: 10px;
      display: flex;
      img{
        height: 3rem;
        // width: 100%;
        border-radius: 50%;
        margin-right: 1rem;
        margin: 0.5rem;
      }
      .textarea{
        flex: 1;
        textarea{
            flex: 1;
            height: 5rem;
        }
      }
      button{
        height: 3rem;
        padding: .5rem 1rem;
        background-color: #44bc87;
        border-radius: .4rem;
        &:hover{
          background-color: #7dc8a8;
        }
      }

      .reviewers {
        margin-bottom: 15px;
        margin-left: 15px;
        margin-top: 5px;
      }
      .avatar{
        height: 50px;
        width: 50px;
        border-radius: 5px;
        overflow: hidden;
        display: inline-block;
        margin-right: 1rem;
        float: left;
        // margin-top: .5rem;
        img{
          width: 100%;
          height: 100%;
        }
      }
      .functionButton {
        margin: 10px 10px;
        border: none;
        background-color: transparent;
        float: right;
        &:hover{
          color: skyblue;
          cursor: pointer;
        }
      }

    }
}
main{
    p{
        margin-top: .5rem;
    }
    .img-container{
        // display: flex;
        // flex-grow: 0;
        // .img-box{
        overflow: hidden;
            img{
                height: 7rem;
                width: 7rem;
                margin-bottom: .2rem;
                margin-right: .2rem;
                // width: 100%;
                // height: 100%;
                object-fit: cover;    
                float: left;
                &:nth-child(3n+1){
                    clear: both;
                }
            }

            // + .img-box{
                // margin-left: 1rem;
            // }
        // }

    }
    .four-pic{
        height: 14.4rem;
        width: 14.4rem;
        img{
            height: 7rem;
            width: 7rem;
            margin-bottom: .2rem;
            margin-right: .2rem;
            // width: 100%;
            // height: 100%;
            object-fit: cover;    
            float: left;
            // &:nth-child(3n+1){
            //     clear: both;
            // }
        }
    }
    
    
}
a {
    font-weight: 400;
    font-size: 1rem;
}
</style>