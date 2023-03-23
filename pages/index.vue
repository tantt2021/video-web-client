<template>
  <div class="recommend-container">
    <div class="scroll">
      <ul @keyup.enter="next" ref="videoList">
        <li v-for="(item, idx) in 9" :key="idx">
          <div class="pause" v-show="!play"><caret-right-outlined/></div>
          <video
            src="../assets/video/樱花草.mp4"
            :autoplay="false"
            @click="controlPlay"
            @keydown.space="controlPlay"
            tabindex="0"
            ref="video"
          ></video>
        </li>
      </ul>
    </div>
    <div class="nav">
      <ul>
        <li @click="thumbup" :class="{ thumbup: isThumbup }">
          <like-outlined />
          {{ thumbupCount }}
        </li>
        <li @click="showComment">
          <message-outlined />
          22
        </li>
        <li @click="addStar" :class="{ thumbup: hasStar }">
          <star-outlined />
          {{ starCount }}
        </li>
        <li>
          <share-alt-outlined />
          44
        </li>
      </ul>
      <a-drawer
        title="评论"
        placement="right"
        :closable="false"
        :visible="commentVisible"
        @close="onClose"
      >
        <comment />
      </a-drawer>
    </div>
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
import Comment from "@/components/Comment";

// 切换下一个视频
let videoList = ref(null);
// 当前视频的索引
let idx = ref(1);
let current = ref(0);

onMounted(() => {
  // 上下切换
  document.addEventListener("keydown", switchVideo);
  console.log("video", video.value);
});

// 按键切视频
const switchVideo = (e) => {
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
    if (current.value < 8) {
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
    console.log("按下了方向键--右");
  }
};

const next = () => {};

watch(
  () => current.value,
  (n, o) => {
    // 当前视窗中video播放
    video.value[n].play();
    video.value[o].pause();
  }
);
let video = ref([]);
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
      li {
        height: 100%;
        // display: block;
        width: 100%;
        transform: translate(0);
        video {
          width: 100%;
          height: 100%;
        }
        .pause{
          position: fixed;
          left: 50%;
          top: 50%;
          transform:translate(-50%,-50%);
          font-size: 3rem;
          color: #fff;
        }
      }
    }
  }

  .nav {
    position: fixed;
    right: 2rem;
    top: 20%;
    // top: 16.5%;
    // transform: translateY(100%);
    color: #fff;
    font-size: 2vw;
    ul {
      li {
        margin-top: 2rem;
        display: flex;
        flex-direction: column;
      }
    }
    .thumbup {
      color: #44bc87;
    }
  }
}
</style>
