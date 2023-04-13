<template>
  <div class="recommend-container">
    <div class="scroll">
      <ul @keyup.enter="next" ref="videoList">
        <li v-for="item in videoArr" :key="item.id" class="video-item">
          <div class="pause" v-show="!play"><caret-right-outlined/></div>
            <video
              :src="item.videoFile"
              :autoplay="false"
              @click="controlPlay"
              @keydown.space="controlPlay"
              tabindex="0"
              ref="video"
            >
            </video>
          <div class="nav">
            <ul>
              <li>
                <img src="../assets/img/yatou.png" alt="" @click="navigateTo(`/user/${item.authorId}`)">
              </li>
              <li @click="thumbup" :class="{ thumbup: isThumbup }">
                <like-outlined />
                {{ item.likeCount }}
              </li>
              <li @click="showComment">
                <message-outlined />
                0
              </li>
              <li @click="addStar" :class="{ thumbup: hasStar }">
                <star-outlined />
                {{ item.starCount }}
              </li>
              <li>
                <share-alt-outlined />
                0
              </li>
            </ul>
            
          </div>
        </li>
      </ul>
    </div>
    <a-drawer
      title="评论"
      placement="right"
      :closable="false"
      :visible="commentVisible"
      @close="onClose"
      class="comment-area"
    >
      <div class="show-comment">
      
        <comment scenario="short">
          <a-textarea
            v-model:value="commentContent"
            placeholder="Autosize height based on content lines"
            auto-size
          >
          </a-textarea>
          <div class="comment-operate">
            <svg xmlns:xlink="http://www.w3.org/1999/xlink" width="36" height="36" xmlns="http://www.w3.org/2000/svg" class="" viewBox="0 0 36 36"><path fill-rule="evenodd" clip-rule="evenodd" d="M10.559 10.14c-2.612 2.392-3.566 5.145-3.566 8.376C6.993 21.817 8.836 29 19.215 29c1.505 0 2.974-.21 4.405-.654 1.57-.487 2.783-1.277 3.798-2.173l.15-.133c.29-.258.606-.537.86-.898.426-.523.71-.905.741-1.198.032-.293.008-.551-.189-.74-.197-.19-.517-.267-.876-.123-.322.129-.663.434-1.02.753l-.125.11c-2.434 2.134-5.158 3.007-7.744 3.007-8.219 0-10.095-5.489-10.095-8.435 0-2.947.856-4.956 2.606-6.798 1.75-1.843 4.62-2.723 7.25-2.723 5.681 0 7.745 4.598 7.745 6.964 0 3.145-1.802 4.54-2.591 5.076-.592.402-1.213.517-1.549.517h-.01c-.365 0-.89 0-1.03-.517-.09-.34.08-1.06.263-1.828.097-.405.197-.824.262-1.207l.94-4.722c.014-.092.021-.177.021-.254 0-.72-.146-1.1-1.103-1.1-.46 0-.77.074-.931.222-.161.148-.274.44-.34.878-.365-.487-.734-.815-1.107-.984-.343-.155-.833-.233-1.468-.233-1.636 0-3.053.783-4.252 2.349-1.103 1.439-1.654 2.977-1.654 4.613 0 1.277.358 2.398 1.074 3.365.796 1.065 1.833 1.597 3.112 1.597 1.095 0 2.147-.366 3.155-1.1.453.74 1.23 1.177 2.323 1.111 5.654-.339 6.962-5.275 6.896-7.783C28.647 12.75 26.288 7 18.976 7c-3.382 0-5.806.747-8.417 3.14zm3.702 9.173c-.068-1.127.093-1.976.814-3.235 1.171-2.046 2.576-2.537 3.502-2.428.898.107 1.128.5 1.27.743l.014.023c.142.24.367.648.367 1.225 0 .938-.292 1.839-.922 3.398-.732 1.84-1.483 2.19-2.4 2.4-1.512.348-2.576-.999-2.645-2.126z" fill="#44bc87" fill-opacity="0.34"></path></svg>
            <svg xmlns:xlink="http://www.w3.org/1999/xlink" width="36" height="36" fill="none" xmlns="http://www.w3.org/2000/svg" class="" viewBox="0 0 36 36"><path fill-rule="evenodd" clip-rule="evenodd" d="M27 18a9 9 0 11-18 0 9 9 0 0118 0zm-9 11c6.075 0 11-4.925 11-11S24.075 7 18 7 7 11.925 7 18s4.925 11 11 11zm-2-13.5c0 1.105-.672 2-1.5 2s-1.5-.895-1.5-2 .672-2 1.5-2 1.5.895 1.5 2zm5.5 2c.828 0 1.5-.895 1.5-2s-.672-2-1.5-2-1.5.895-1.5 2 .672 2 1.5 2zM18 22.03c-1.657 0-3-.96-3-2.143 0-1.183 6-1.183 6 0 0 1.184-1.343 2.143-3 2.143z" fill="#44bc87" fill-opacity="0.34"></path></svg>
            <svg xmlns:xlink="http://www.w3.org/1999/xlink" width="36" height="36" v-show="commentContent!==''" fill="none" xmlns="http://www.w3.org/2000/svg" class="" viewBox="0 0 36 36"><path fill-rule="evenodd" clip-rule="evenodd" d="M17.5 30C23.851 30 29 24.851 29 18.5S23.851 7 17.5 7 6 12.149 6 18.5 11.149 30 17.5 30zm-5.16-13.883a1.16 1.16 0 001.64 1.64l2.395-2.394v8.838a1.16 1.16 0 002.321 0v-8.839l1.028 1.028 1.368 1.368a1.16 1.16 0 001.64-1.641l-4.219-4.22a1.382 1.382 0 00-1.954 0l-4.22 4.22z" fill="blue" fill-opacity="0.4"></path></svg>
          </div>
        </comment>
      </div>
    </a-drawer>
  </div>
</template>



<script lang="ts" setup>
import {
  LikeOutlined,
  MessageOutlined,
  ShareAltOutlined,
  StarOutlined,
} from "@ant-design/icons-vue";
import { onMounted, ref } from "vue";
import Comment from "@/components/Comment.vue";
import { getAllVideos } from "~~/api/video";
import type { Video } from "~~/types";
useHead({
  title: '首页',
  meta: [
    { name: 'description', content: 'My amazing site.' }
  ],
  // bodyAttrs: {
  //   class: 'test'
  // },
  // script: [ { innerHTML: 'console.log(\'Hello world\')' } ]
})
const route = useRoute();
// 切换下一个视频
let videoList = ref<HTMLElement>();
// 当前视频的索引
let current = ref(0);

let videoArr = ref<Video[]>([]);
await getAllVideos().then(
  res=>{
    videoArr.value = res.data;
  }
)

onMounted(() => {
  // 上下切换 
  if(route.path==='/'){
    document.addEventListener("keydown", switchVideo);
    document.addEventListener("keyup", controlVideo);
  }
    
  // 循环播放
  video.value[current.value].onended = () => {
    // play.value = false;
    // handlePlay(autoloop.value);
    video.value[current.value].play();
  };
});


// 按键切视频
const switchVideo = (e:KeyboardEvent) => {
  if (!videoList.value) return
  let height = video.value[0].offsetHeight;
  console.log(height,"height");
  
  // 方向键上
  if (e.keyCode == 38) {
    if (current.value !== 0) {
      current.value--;
      videoList.value.style.transform = `translateY(-${
        height * current.value
      }px)`;
    }
  } else if (e.keyCode == 40) {
    // 方向键--下
    if (current.value < videoArr.value.length - 1) {
      current.value++;

      videoList.value.style.transform = `translateY(-${
        height * current.value
      }px)`;
    }
  } else if (e.keyCode == 37) {
    // 方向键--左
    // console.log("按下了方向键--左")
  } else if (e.keyCode == 39) {
    // 方向键--右
    video.value[current.value].playbackRate = 2;
  }
};

// 按键keyup恢复原本速度
const controlVideo = (e:KeyboardEvent) => {
  if(e.keyCode == 39){
    video.value[current.value].playbackRate = 1;
  }
}

const next = () => {};

watch(
  () => current.value,
  (n, o) => {
    // 当前视窗中video播放
    video.value[n].play();
    play.value = true;
    video.value[o].pause();
    video.value[current.value].onended = () => {
      // play.value = false;
      // handlePlay(autoloop.value);
      video.value[current.value].play();
    };
  }
);

let video = ref<HTMLVideoElement[]>([]);
let play = ref(false);
const controlPlay = () => {
  if (video.value[current.value].paused) {
    video.value[current.value].play();
    play.value = true;
  }else {
    video.value[current.value].pause();
    play.value = false;
  }
};

// 短视频三大操作
// 点赞
let isThumbup = ref(false);
let thumbupCount = ref(11);
const thumbup = () => {
  isThumbup.value = !isThumbup.value;
  isThumbup.value ? (thumbupCount.value += 1) : (thumbupCount.value -= 1);
};
// 评论
let commentVisible = ref(false);
let commentContent = ref("");
const showComment = () => {
  commentVisible.value = !commentVisible.value;
};
const onClose = () => {
  commentVisible.value = false;
};
// 添加收藏
let starCount = ref(22);
let hasStar = ref(false);
const addStar = () => {
  hasStar.value = !hasStar.value;
  hasStar.value ? (starCount.value += 1) : (starCount.value -= 1);
};
</script>

<style lang="scss" scoped>
.recommend-container {
  background-color: #000;
  backdrop-filter: blur(10px);
  height: 100%;
  width: 100%;

  .scroll {
    overflow-y: hidden;
    position: relative;
    height: 100%;
    width: 100%;
    ul {
      margin: 0;
      height: 100%;
      transition: all 0.5s;
      position: absolute;
      width: 100%;
      
      .video-item {
        height: 100%;
        // display: block;
        width: 100%;
        transform: translate(0);
        video {
          width: 100%;
          height: 100%;
          outline: none;
        }
        .pause{
          position: fixed;
          left: 50%;
          top: 50%;
          transform:translate(-50%,-50%);
          font-size: 3rem;
          color: #fff;
        }
        .nav {
          position: absolute;
          color: #fff;
          font-size: 1rem;
          text-align: center;
          right: .5rem;
          top: 20%; 
          height: 10rem;
          width: 5vw;
          ul {
            li {
              margin-bottom: 1rem;
              display: flex;
              flex-direction: column;
              img{
                width: 2rem;
                height: 2rem;
                border-radius: 50%;
                margin: auto;
                margin-bottom: 1rem;
              }
            }
          }
          .thumbup {
            color: #44bc87;
          }
          .comment-area{
            background-color: #ddd;
            .show-comment{
              height: 100%;
              overflow-y: scroll;
              .comment-operate{
                float: right;
              }
            }
          }
        
        }
      }
    }
    
  }

  
}
:global(.ant-drawer-body,){
  padding-bottom: 0;

}
:global(.ant-drawer-header){
  border: none;
}
</style>
