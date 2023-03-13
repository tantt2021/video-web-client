<template>
    <div class="recommend-container">
        <div class="scroll">
            <ul @keyup.enter="next" ref="videoList">
                <li v-for="(item,idx) in 9" :key="idx"><video src="../assets/video/樱花草.mp4" autoplay ></video></li>
            </ul>
        </div>
        <div class="nav">
            <ul>
                <li><like-outlined />11</li>
                <li><message-outlined />22</li>
                <li><star-outlined />33</li>
                <li><share-alt-outlined />44</li>
            </ul>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { LikeOutlined, MessageOutlined, ShareAltOutlined, StarOutlined } from '@ant-design/icons-vue';
import { onMounted, ref } from "vue";

// 切换下一个视频
let videoList = ref(null);
// 当前视频的索引
let idx = ref(1);
let current = ref(0);

onMounted(() => {
    
    // 上下切换
    document.addEventListener("keydown", switchVideo);
    
});

// 按键切视频
const switchVideo = (e) => {
    
    // 方向键上
    if (e.keyCode == 38) {
        if (current.value !== 0) {
            current.value--;
            videoList.value.style.transform = `translateY(-${620 * current.value}px)`;
        }
    } else if (e.keyCode == 40) {
        // 方向键--下
        current.value++;
        videoList.value.style.transform = `translateY(-${620 * current.value}px)`;
    } else if (e.keyCode == 37) {
        // 方向键--左
        // console.log("按下了方向键--左")
    } else if (e.keyCode == 39) {
        // 方向键--右
        console.log("按下了方向键--右")
    }
}; 

const next = () => {
    
}

watch(() => idx.value, () => {
    console.log(idx.value,'1');
    if (videoList.value) {
        videoList.value.style.transform = `translateY(-${620 * idx.value}px)`;
    }
});
</script>

<style lang="scss" scoped>
.recommend-container{
    background-color: #000;
    backdrop-filter: blur(10px);
    height: 100%;
    .scroll{
        overflow-y: hidden;
        position: relative;
        height: 100%;
        width: 100%;
        ul {
            margin: 0;
            height: 100%;
            transition:all .5s;
            position: absolute;
            width: 100%; 
            li{
                height: 100%;
                // display: block;
                width: 100%;
                video{
                    width: 100%;
                    height: 100%;
                }
            }
        }
    }
    
    .nav{
        position:fixed;
        right: 2rem;
        top:37.5%;
        color: #fff;
        ul {
            li{
                margin-top: 2rem;
                display: flex;
                flex-direction: column;
            }
        }
    }
}
</style>