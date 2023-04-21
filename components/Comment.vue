<template>
  <div id="comment">
    <ul>
      <li v-for="(item, index1) in commentList" :key="index1">
        <div class="comment">
          <img :src="item.avatar" alt="" class="avatar" @click="navigateTo(`/user/${item.user_id}`)">
          <div class="comment-content">
            <h4 @click="navigateTo(`/user/${item.user_id}`)">{{ item.uname }}</h4>
            <p>{{ item.content }}</p>
            <div class="time-operate">
              <span>{{ item.createTime.slice(0,10) }}</span>
              <like-two-tone @click="handleLike" :two-tone-color="like?'#44bc87':'#ddd'" :class="{highLight:like}"/>
              {{ item.upvotes }}
              <dislike-outlined @click="handleUnlike" :class="{highLight:unlike}"/>
              {{ item.downvotes }}
              <span @click="showCommentTextarea(index1)" class="answer">回复</span>
            </div>
          </div>
        </div>
        <ul class="son-comment">
          <li v-if="item.sonComment!==undefined" v-for="(son, index2) in item.sonComment" :key="index2">
            <div class="comment">
              <img :src="son.avatar" alt="" class="avatar" @click="navigateTo(`/user/${son.user_id}`)">
              <div class="comment-content">
                <h4>
                  <span @click="navigateTo(`/user/${son.user_id}`)">
                    {{ son.uname }}
                  </span> 
                  回复 
                  {{ son.reply_username }}
                </h4>
                <p>{{ son.content }}</p>
                <div class="time-operate">
                  <span>{{ son.createTime.slice(0,10) }}</span>
                  <like-two-tone @click="handleLike" :two-tone-color="like?'#44bc87':'#ddd'" :class="{highLight:like}"/>
                  {{ son.upvotes }}
                  <dislike-outlined @click="handleUnlike" :class="{highLight:unlike}"/>
                  {{ son.downvotes }}
                  <span @click="showCommentTextarea(index1,index2)" class="answer">回复</span>
                </div>
              </div>
            </div>
             <!-- 发表对评论的评论 -->
            <!-- <div class="son-comment-area" v-show="active===index2">
              <img :src="user.avatar" alt="">
              <input type="text" v-model="sonComment" :placeholder="placeholder">
              <button @click="submitSonComment">发布</button>
            </div> -->
          </li>
          
        </ul>
        <!-- 发表对评论的评论 -->
        <div class="son-comment-area" v-show="active===index1">
          <img :src="user.avatar" alt="">
          <input type="text" v-model="sonComment" :placeholder="placeholder">
          <button @click="submitSonComment()">发布</button>
        </div>
      </li>
      
    </ul>
  </div>
  

</template>

<script lang="ts" setup>
import { LikeTwoTone, DislikeOutlined } from '@ant-design/icons-vue';
import type {CommentType} from "@/types";
import useStore from '~/store';
import {addComment} from "@/api/data";
import { message } from 'ant-design-vue';
import { emit } from 'process';
const {user} = useStore();
let props = defineProps({
  commentList:{
    type:Array<CommentType>,
    default:[]
  },
  videoId:{
    type:String,
    default:"",
  },
  scenario:{
    type:String
  }
});
const emits = defineEmits(["add-comment"]);




// 展示评论输入框
let active = ref<number>();
let sonIdx = ref<number>();
const showCommentTextarea = (idx1:number,idx2?:number) => {
  if(idx2!==undefined){
    sonIdx.value = idx2;
    // 回复子评论
    
    active.value = idx1;
    placeholder.value = `回复${props.commentList[active.value].sonComment[idx2].uname}`;
  }else{
    sonIdx.value = NaN;
    // 回复一级评论

    active.value = idx1;
    placeholder.value = `回复${props.commentList[active.value].uname}`;
  }
  
}


// 点赞评论
let like = ref(false);
let unlike = ref(false);
const handleLike = () => {
  like.value = !like.value;
  unlike.value = false;
  // 请求
}
const handleUnlike = () => {
  unlike.value = !unlike.value;
  like.value = false;
  // 请求
}

// 发表子评论
let sonComment = ref("");
const submitSonComment = () => {
  if(sonComment.value.trim()===''){
    message.error("评论内容不能为空");
    return;
  }

  
  // reply_user_id
  let reply_user_id = "";
  if(sonIdx.value>-1){
    // 回复子评论，需要检查props.commentList[active.value].sonComment是否是空数组
    if(props.commentList[active.value].sonComment.length===0){
      reply_user_id = props.commentList[active.value].user_id;
    }else{
      reply_user_id = props.commentList[active.value].sonComment[sonIdx.value].user_id;
    }
  }else{
    // 回复一级评论
    reply_user_id = props.commentList[active.value].user_id;
  }
  // 请求添加评论
  addComment({
    content: sonComment.value,
    user_id: user.id,
    parent_id: props.commentList[active.value].id,
    dynamic_id: props.videoId,
    reply_user_id,
    type: "video"
  }).then(res=>{
    message.success("发表评论成功！");
    emits("add-comment");
    sonComment.value = "";
  })
}
  
let placeholder = ref("");
// watch(()=>active.value,(n)=>{
//   placeholder.value = `回复${props.commentList[n].uname}`;
// });
</script>

<style lang="scss" scoped>
#comment{
  margin: 12px;
  ul{
    li{
      
      .comment{
        display: flex;
        .avatar{
          width: 4rem;
          height: 4rem;
          padding: .5rem;
          border-radius: 50%;
          cursor: pointer;

        }
        .comment-content{
          h4{
            display: inline-block;
            margin: 1rem 0;
            span{
              color: #44bc87;
              cursor: pointer;
              &:hover{
                color: #11909e;
              }
            }
            
          }
          p{
            margin: 0;
          }
          .time-operate{
            color: #ddd;
            span + span{
              padding-left: 1rem;
            }
            .highLight{
              color: #44bc87;
            }
            .answer:hover{
              color: #44bc87;
              
            }
          }
        }
      }
      .son-comment{
        width: 90%;
        margin: 0 auto;
      }
    }
    .son-comment-area{
      height: 3rem;
      display: flex;
      margin: 1rem 3rem;
      img{
        height: 100%;
        // width: 100%;
        border-radius: 50%;
      }
      input{
        flex: 1;
        height: 100%;
        padding: .2rem .7rem;
        margin: 0 1rem;
        background-color: #eee;
        border: none;
        border-radius: .4rem;
      }
      button{
        height: 100%;
        padding: .5rem 1rem;
        background-color: #44bc87;
        border-radius: .4rem;
        &:hover{
          background-color: #7dc8a8;
        }

      }
    }
  }
}
</style>