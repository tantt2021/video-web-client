<template>
  <div class="video-detail">
    <div class="left-container">
      <h1>{{ title }}</h1>
      <!-- 视频基本数据 -->
      <div class="video-data">
        <img src="../../assets/svg/bfl.svg" alt="" />
        <em>{{ videoData.views }}</em>
        <img src="../../assets/svg/dm.svg" alt="" />
        <em>{{ videoData.marqueeCount }}</em>
        <img src="../../assets/svg/time.svg" alt="" />
        <em>{{ videoData.createTime }}</em>
      </div>
      <div
        class="video"
        @mouseenter="controlsVisible = true"
        @mouseleave="controlsVisible = false"
        ref="videoBox"
      >
      <div class="pause" v-show="!play"><caret-right-outlined/></div>
        <!-- v-show="controlsVisible"  -->
        <div class="marque-box">
          <div
            v-for="(stream, idx) in barrageStreamList"
            :key="idx"
            class="train"
          >
            <marque v-for="(item, itemIdx) in stream" :key="itemIdx">
              {{ item }}
            </marque>
          </div>
        </div>
        <controls
          v-show="controlsVisible"
          @handlePlay="handlePlay"
          @handleScreen="handleScreen"
          @handleChangeslider="handleChangeslider"
          :duration="duration"
          :currentTime="currentTime"
          :play="play"
          @changeVideoPlaybackRate="changeVideoPlaybackRate"
          @changeAutoloop="changeAutoloop"
          @changeVolume="changeVolume"
          :fullScreen="fullScreen"
          @add-history="submitHistoryAndViews"
        />
        <video
          :src="videoData.videoFile"
          ref="video"
          @click="handlePlay(!play)"
          @click.once="submitHistoryAndViews"
          @dblclick="handleScreen(!fullScreen)"
        >
        </video>
      </div>

      <!-- 发弹幕 -->
      <div class="interaction">
        <div>xx人在看,已装填xxx条弹幕</div>
        <a-input-search
          v-model:value="marquee"
          placeholder="发个弹幕试试吧~"
          enter-button="发送"
          @search="submitMarque"
          maxLength="14"
          :style="{ width: '15rem' }"
        />
      </div>
      <!-- 点赞收藏 -->
      <div class="operate">
        <div>
          <like-two-tone :two-tone-color="likeColor" @click="thumbup"/>
          <em>{{ videoData.likeCount }}</em>
          <star-two-tone :two-tone-color="starColor" @click="collect"/>
          <em>{{ videoData.starCount }}</em>
          <share-alt-outlined :style="{color:shareColor}" @click="share"/>
          <em>{{ videoData.shareCount }}</em>
        </div>
        <div class="complain">
          <warning-outlined />
          <em>投诉</em>
        </div>
      </div>
      <div class="tag-list">
        <a-tag v-for="(item,idx) in type" :key="idx">{{ item }}</a-tag>
      </div>
      <!-- 评论 -->
      <h3>评论区</h3>
      <div class="mycomment">
        <div class="reviewers">
          <div class="avatar">
            <img src="../../assets/img/yatou.png" alt="avatar" />
          </div>
          <a-textarea v-model:value="textarea1" placeholder="畅所欲言~" allow-clear :style="{ width: '90%' }" />

        </div>
        <button class="functionButton">表情</button>
        <button class="functionButton">图片</button>
        <button class="functionButton">
          发送
        </button>
      </div>
      <comment />
    </div>
    <div class="right-container">
      <div class="up-info">
        <img
          src="../../assets/img/yatou.png"
          @click="navigateTo(`/user/${videoData.authorId}`)"
          v-if="videoData.authorId!==user.id"
        />
        <img
          src="../../assets/img/yatou.png"
          @click="navigateTo('/user/self')"
          v-else
        />
        <div class="up-description">
          <h4 @click="navigateTo(`/user/${videoData.authorId}`)" v-if="videoData.authorId!==user.id">{{ videoData.author }}</h4>
          <h4 @click="navigateTo('/user/self')" v-else>{{ videoData.author }}</h4>
          <!-- <p>{{ videoData.author }}</p> -->
        </div>
        <a-button
          :type="subscribe === '关注' ? 'primary' : 'dashed'"
          class="subscribe"
          @click="addSubscribe"
          v-if="videoData.authorId!==user.id"
        >
          {{ subscribe }}
        </a-button>
      </div>
      <div class="recommend-list">
        <span>更多视频</span>
        <video-card :width="10"/>
        <video-card :width="10"/>
        <video-card :width="10"/>
        <video-card :width="10"/>
        <video-card :width="10"/>
        <video-card :width="10"/>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted, onBeforeUnmount, onActivated } from "vue";
import {
  LikeTwoTone,
  StarTwoTone,
  ShareAltOutlined,
  WarningOutlined,
  CaretRightOutlined,
} from "@ant-design/icons-vue";
import comment from "@/components/Comment.vue";
import VideoCard from "@/components/VideoCard.vue";
import Controls from "@/components/Controls.vue";
import { formatTime } from "@/utils/index";
import Marque from "@/components/Marque.vue";
import { getVideo,addVideoViews } from "~~/api/video";
import { addHistory } from "~~/api/history";
import { addStar,isStar,cancelStar,isLike,toggleLike,handleFollow } from "~~/api/data";
import type {Video} from "@/types";
import useStore from "~~/store";
import {storeToRefs} from "pinia";

let {user} = useStore();
// 
let {pause_history} = storeToRefs(user);
const route = useRoute();
let videoData = ref<Video>({});
let title = ref("");


// 是否已关注
let subscribe = ref("关注");
let addSubscribe = () => {
  handleFollow({userId:user.id,followId:videoData.value.authorId}).then(
    res=>{
      console.log(res,"关注");
      
    }
  )
  subscribe.value = subscribe.value === "已关注" ? "关注" : "已关注";
};

// 控制条的显隐
let controlsVisible = ref(false);

// 播放暂停
let video = ref<HTMLVideoElement>();
let play = ref(false);
const handlePlay = (e: boolean) => {
  if(!video.value) return
  if (video.value.paused && e) {
    // 播放
    video.value.play();
    
    
    play.value = e;
    resetInterval();
  } else {
    video.value.pause();
    clearInterval(timer);
    play.value = e;
  }
};
const resetInterval = () => {
  timer = setInterval(() => {
    if(!video.value) return
    currentTime.value = video.value.currentTime;
  }, 50);
};

// 全屏
let videoBox = ref<HTMLElement>();
let fullScreen = ref(false);
const handleScreen = (e: boolean) => {
  if(!videoBox.value) return
  let requestMethod =
    videoBox.value.requestFullscreen ||
    videoBox.value.webkitRequestFullScreen ||
    videoBox.value.mozRequestFullScreen ||
    videoBox.value.msRequestFullscreen;
  if (e) {
    fullScreen.value = true;
    // videoBox.value.webkitRequestFullScreen();
    // mozFullScreen
    requestMethod.call(videoBox.value);
  } else {
    fullScreen.value = false;

    if (document.exitFullscreen) {
      document.exitFullscreen();
    } else if (document.msExitFullscreen) {
      document.msExitFullscreen();
    } else if (document.mozCancelFullScreen) {
      document.mozCancelFullScreen();
    } else if (document.webkitExitFullscreen) {
      document.webkitCancelFullScreen();
    }
  }
};

// 添加历史播放记录
let once = true;
const submitHistoryAndViews = () => {

  // 添加播放量
  addVideoViews({id:route.params.id});
  // 当前没有禁止记录历史
  if(!pause_history.value && once){
      
      // 添加历史记录
      addHistory({userId:user.id,videoId:route.params.id}).then(
        res=>{
          console.log(res);
          once = false;
        }
      )
    }
}


// 定时器定时访问播放时长
let currentTime = ref(0);
let timer;

// 视频时长
let duration = ref(0);

// 进度条点击
const handleChangeslider = (e: number) => {
  if(!video.value) return

  // e就是currentTime
  currentTime.value = e;
  video.value.currentTime = e;
};

// 改变播放速度
const changeVideoPlaybackRate = (e: string) => {
  if(!video.value) return
  e = e.slice(0, e.length - 1);
  video.value.playbackRate = parseFloat(e);
};

// 播放自动循环
let autoloop = ref(false);
const changeAutoloop = (e: boolean) => {
  autoloop.value = e;
};

// 改变音量
const changeVolume = (e: number) => {
  if(!video.value) return
  video.value.volume = e / 100;
};

// 发送弹幕
let marqueeArr = ref<string[]>([]);
// 弹幕
let marquee = ref("");
const sendMarquee = () => {
  marqueeArr.value.push(marquee.value);
  marquee.value = "";
};
let aa;
onMounted(() => {
  // 格式化视频时长
  // duration.value = video.value.duration;
  // 循环播放
  if(!video.value) return
  video.value.onended = () => {
    play.value = false;
    handlePlay(autoloop.value);
  };
  // webkit 监听全屏
  document.addEventListener("webkitfullscreenchange", () => {
    const isFullScreen =
      document.fullScreen ||
      document.mozFullScreen ||
      document.webkitIsFullScreen;
    if (isFullScreen) {
      //  进入全屏
      fullScreen.value = true;
    } else {
      //  退出全屏
      fullScreen.value = false;
    }
  });
  // firefox
  document.addEventListener("fullscreenchange", () => {
    const isFullScreen =
      document.fullScreen ||
      document.mozFullScreen ||
      document.webkitIsFullScreen;
    if (isFullScreen) {
      //  进入全屏
      fullScreen.value = true;
    } else {
      //  退出全屏
      fullScreen.value = false;
    }
  });
  // 计算弹幕轨道数量
  getBarrageStreamList();
  window.addEventListener("resize", getBarrageStreamList);

  // 模拟数据
  aa = setInterval(() => {
    let r = Math.floor(Math.random() * barrageStreamListNum.value);
    barrageStreamList.value[r].push("111111");
    // barrageStreamList.value[r].push("2222");
  }, 2000);
});
onBeforeUnmount(() => {
  // 卸载前清楚定时器
  clearInterval(timer);
  clearInterval(aa);
  window.removeEventListener("resize", getBarrageStreamList);
});

// 轨道数量
let barrageStreamListNum = ref(0);
let barrageStreamList = ref([]);
const getBarrageStreamList = () => {
  //   计算轨道数量
  barrageStreamListNum.value = Math.floor(
    (video.value.getBoundingClientRect().height - 100) / 36
  );
  //   初始化轨道;
  for (let i = 0; i < barrageStreamListNum.value; i++) {
    barrageStreamList.value.push([]);
  }
};
watch(
  () => barrageStreamList,
  (n) => {
    if (n.length) {
      // 获得了随机轨道下标
      let randomNum = Math.floor(Math.random() * barrageStreamListNum.value);
      //   弹幕推动到随机轨道
      barrageStreamList[randomNum].value.push(n[n.value.length - 1]);
      // 5s从该轨道删除该弹幕
      setTimeout(() => {
        barrageStreamList[randomNum].shift();
      }, 5000);
    }
  },
  {
    // immediate: true,
    deep: true,
  }
);

// 发送弹幕
const submitMarque = () => {};

// 评论内容
let  textarea1 = ref("");


await getVideo({id:route.params.id,userId:user.id}).then(
  res => {
    videoData.value = res.data.videoInfo;
    if(res.data.isFollow!==null){
      subscribe.value = "已关注";
    }
  }
)
title.value = videoData.value.title;
duration.value = videoData.value.duration;

// 请求用户信息

// 
let type = computed(()=>{
  return videoData.value.type.split("&&");
})
 

//  点赞
let likeColor = ref("#000");
await isLike({userId:user.id,videoId:route.params.id}).then(
  res => {
    if(res.data==="该用户已点赞此视频"){
      likeColor.value = "#44bc87";
    }else{
      likeColor.value = "#000";
    }
  }
)
const thumbup = async () => {
  // 请求添加点赞数据
  await toggleLike({userId:user.id,videoId:route.params.id});
  if(likeColor.value === "#000"){
    likeColor.value = '#44bc87';
    videoData.value.likeCount+=1;

  }else{
    likeColor.value = '#000';
    videoData.value.likeCount-=1;
  }
}
// 收藏
let starColor = ref("#000");
await isStar({userId:user.id,videoId:route.params.id}).then(
  res=>{
    if(res.data==='该用户没收藏此视频'){
      starColor.value = "#000";
    }else{
      starColor.value = "#44bc87";

    }
  }
)
const collect = async () => {
  // 请求加入收藏夹

  if(starColor.value === "#000"){
    await addStar({userId:user.id,videoId:route.params.id});
    starColor.value = '#44bc87';
    
    videoData.value.starCount+=1;

  }else{
    // 请求取消收藏
    await cancelStar({userId:user.id,videoId:route.params.id});
    starColor.value = '#000';
    videoData.value.starCount-=1;
  }


}
// 分享
let shareColor = ref("#000");
const share = () => {
  // 请求分享
  if(shareColor.value === "#000"){
    shareColor.value = '#44bc87';
    // videoData.value.starCount+=1;

  }else{
    shareColor.value = '#000';
    // videoData.value.shareCount-=1;
  }
}
</script>

<style lang="scss" scoped>
.video-detail {
  display: flex;
  padding-top: 1rem;
  // padding-right: 1rem;
  .left-container {
    width: 63rem;
    height: 20rem;
    h1{
      margin: 0 1rem;
    }
    .video-data {
      margin: .5rem 1rem; 
      font-size: 0.8rem;

      img {
        vertical-align: text-bottom;

        & ~ img {
          margin-left: 1rem;
        }
      }

      em {
        color: #918f8f;
      }
    }
    .video {
      position: relative;
      overflow: hidden;
      // width: 100%;
      height: 100%;
      background-color: #000;
      video {
        width: 100%;
        height: 100%;
      }
      .pause{
        position: absolute;
        background-color: rgba($color: #44bc87, $alpha: .7);
        width: 5rem;
        text-align: center;
        border-radius: 1rem;
        left: 50%;
        top: 50%;
        transform:translate(-50%,-50%);
        font-size: 3rem;
        color: #fff;
      }
    }
    .marque-box {
      position: absolute;
      height: 100%;
      width: 100%;
      .train {
        height: 36px;
      }
    }

    .interaction {
      display: flex;
      justify-content: space-between;
      padding: .5rem;
      box-shadow: 0px .5rem 1rem 1px #ddd;
      div{
        line-height: 2rem;
      }
    }
    .operate {
      display: flex;
      justify-content: space-between;
      line-height: 3rem;
      border-bottom: 1px solid #ddd;
      padding-left: 1rem;

      span ~ span {
        margin-left: 3rem;
      }
      
      .complain {
        // float: right;
      }
    }
    h3{
        margin: 0 1rem;
      }
    .tag-list{
      margin: 1rem .5rem;
    }
  }

  .right-container {
    width: 20rem;
    height: 50rem;
    margin-left: 2rem;
    .up-info {
      display: flex;
      img {
        cursor: pointer;
        height: 3rem;
        border-radius: 0.5rem;
      }
      .up-description {
        margin-left: 0.5rem;
        flex-grow: 1;
        h4 {
          // margin: 0;
          line-height: 1rem;
          &:hover {
            color: #44bc87;
          }
        }
        p {
          font-weight: 400;
          font-size: 1rem;
          color: #918f8f;
        }
      }
      .subscribe {
        float: right;
        line-height: 1rem;
      }
    }
  }
  span {
    font-weight: 400;
  }
}
.mycomment {
  // border: 1px solid #ddd;
  border-radius: 8px;
  padding: 10px;
  margin: 10px;
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
    &:hover{
      color: skyblue;
      cursor: pointer;
    }
    &:nth-child(4){
      float: right;
    }
  }

}

//所有控件
video::-webkit-media-controls-enclosure {
  display: none;
}
//观看的当前时间
video::-webkit-media-controls-current-time-display {
  display: none;
}
</style>
