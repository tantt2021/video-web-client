<template>
    <div class="video-detail">

        <div class="left-container">
            <h1>{{ title }}</h1>
            <!-- 视频基本数据 -->
            <div class="video-data">
                <img src="../../assets/svg/bfl.svg" alt=""> <em>111</em>
                <img src="../../assets/svg/dm.svg" alt=""> <em>22</em>
                <img src="../../assets/svg/time.svg" alt=""> <em>2023.2.27 13:14</em>
            </div>
            <div class="video" @mouseenter="controlsVisible = true" @mouseleave="controlsVisible = false" ref="videoBox" >
                <!-- v-show="controlsVisible"  -->

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
                    />
                <video src="../../assets/video/樱花草.mp4" ref="video" @click="handlePlay(!play)" @dblclick="handleScreen(!fullScreen)">
                    11111111111
                </video>

            </div>
            <marquee>111111111</marquee>

            <!-- 发弹幕 -->
            <div class="interaction">
                <span>xx人在看,已装填xxx条弹幕</span>
                <a-input-search v-model:value="marquee" placeholder="发个弹幕试试吧~" enter-button="发送" @search="onSearch"
                    maxLength="14" :style="{ width: '15rem' }" />
            </div>
            <!-- 点赞收藏 -->
            <div class="operate">
                <div>
                    <like-two-tone two-tone-color="#44bc87"/>
                    <em>999</em>
                    <star-two-tone two-tone-color="#44bc87"/>
                    <em>333</em>
                    <share-alt-outlined />
                    <em>123</em>
                </div>
                <div class="complain">
                    <warning-outlined /><em>投诉</em>
                </div>
                
            </div>
            <div class="tag-list">
                <a-tag>Tag 1</a-tag>
                <a-tag>Tag 1</a-tag>
                <a-tag>Tag 1</a-tag>
            </div>
            <!-- 评论 -->
            <comment/>
        </div>
        <div class="right-container">
            <div class="up-info">
                <img src="../../assets/img/yatou.png" @click="navigateTo('/user/self')"/>
                <div class="up-description">
                    <h4 @click="navigateTo('/user/self')">tantt</h4>
                    <p>eat chicken</p>
                </div>
                <a-button :type="subscribe === '关注' ? 'primary' : ''" class="subscribe" @click="addSubscribe">{{subscribe}}</a-button>

            </div>
            <div class="recommend-list">
                <span>更多视频</span>
                <video-card/>
                <video-card/>
                <video-card/>
                <video-card/>
                <video-card/>
                <video-card/>
            </div>
        </div>
    </div>

</template>

<script lang="ts" setup>
import { ref,onMounted,onBeforeUnmount,onActivated } from "vue";
import { LikeTwoTone, StarTwoTone, ShareAltOutlined, WarningOutlined } from '@ant-design/icons-vue';
import comment from "@/components/Comment.vue";
import VideoCard from "@/components/VideoCard.vue";
import Controls from "@/components/Controls.vue";
import {formatTime} from "@/utils/index.ts";
let title = ref("title");



// 关注
let subscribe = ref("关注");
let addSubscribe = () => {
    subscribe.value = subscribe.value === '已关注' ? '关注' : '已关注';
}

// 控制条的显隐
let controlsVisible = ref(false);

// 播放暂停
let video = ref(null);
let play = ref(false);
const handlePlay = (e:boolean) => {
    if (video.value.paused&&e) {
        // 播放
        video.value.play();
        play.value = e;
        resetInterval();
        
    } else {
        video.value.pause();
        clearInterval(timer);
        play.value = e;

    }
}
const resetInterval = () => {
    timer = setInterval(() => {
        currentTime.value = formatTime(video.value.currentTime);
    }, 500);
}

// 全屏
let videoBox = ref(null);
let fullScreen = ref(false);
const handleScreen = (e: boolean) => {
    let requestMethod = videoBox.value.requestFullScreen || videoBox.value.webkitRequestFullScreen || videoBox.value.mozRequestFullScreen || videoBox.value.msRequestFullscreen;
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
	    } else if (document.webkitCancelFullScreen) { 
	    	document.webkitCancelFullScreen(); 
	    } 
    }
}



// 定时器定时访问播放时长
let currentTime = ref("00 : 00");
let timer;

// 视频时长
let duration = ref("0");

// 进度条点击
const handleChangeslider = (e:number) => {
    // e就是currentTime
    currentTime.value = formatTime(e);
    video.value.currentTime = e;
}

// 改变播放速度
const changeVideoPlaybackRate = (e: string) => {
    e = e.slice(0, e.length - 1);
    video.value.playbackRate = e;
}

// 播放自动循环
let autoloop = ref(false);
const changeAutoloop = (e:boolean) => {
    autoloop.value = e; 
} 

// 改变音量
const changeVolume = (e:number) => {
    video.value.volume = e / 100;    
};

// 发送弹幕
let marqueeArr = ref([]);
// 弹幕
let marquee = ref("");
const sendMarquee = () => {
    marqueeArr.value.push(marquee.value);
    marquee.value = "";
};

onMounted(() => {
    console.log(document);
    
    // 格式化视频时长
    duration.value = formatTime(video.value.duration);
    // 循环播放
    video.value.onended = () => {
        play.value = false;
        handlePlay(autoloop.value);
    };
    // webkit
    document.addEventListener('webkitfullscreenchange', () => {
        const isFullScreen = document.fullScreen || document.mozFullScreen || document.webkitIsFullScreen
        if (isFullScreen) {
          //  进入全屏
            fullScreen.value = true;
          
        } else {
          //  退出全屏
            fullScreen.value = false;
        }
    })
    // firefox
    document.addEventListener('fullscreenchange', () => {
        const isFullScreen = document.fullScreen || document.mozFullScreen || document.webkitIsFullScreen
        if (isFullScreen) {
          //  进入全屏
            fullScreen.value = true;
          console.log("进");
          
        } else {
          //  退出全屏
            fullScreen.value = false;
          console.log("退");

        }
    })

});
onBeforeUnmount(() => {
    // 卸载前清楚定时器
    clearInterval(timer);
});

</script>

<style lang="scss" scoped>
.video-detail {
    display: flex;
    .left-container {
        width: 58rem;
        .video-data {
            margin-bottom: 1rem;
            font-size: .8rem;

            img {
                vertical-align: text-bottom;

                &~img {
                    margin-left: 1rem;
                }
            }

            em {
                color: #918f8f;
            }
        }
        .video{
            position:relative;
            video {
                width: 100%;
                height:100%;
            }
        }
        

        .interaction {
            display: flex;
            justify-content: space-between;
            
        }
        .operate{
            display: flex;
            justify-content: space-between;
            line-height: 3rem;
            border-bottom: 1px solid #ddd;
            span ~ span{
                margin-left: 3rem;
            }
            .complain{
                // float: right;
            }
        }

    }




    .right-container {
        width: 25rem;
        height: 50rem;
        margin-left: 2rem;
        .up-info{
            display: flex;
            img{
                cursor: pointer;
                height: 3rem;
                border-radius: .5rem;
            }
            .up-description{
                margin-left: .5rem;
                flex-grow: 1;
                h4{
                    // margin: 0;
                    line-height: 1rem;
                    &:hover{
                        color: #44bc87;
                    }
                }
                p{
                    font-weight: 400;
                    font-size: 1rem;
                    color: #918f8f;
                }
                
            }
            .subscribe{
                    float: right;
                    line-height: 1rem;
                }
        }
    }
    span{
        font-weight:400;
    }
}

    //所有控件
video::-webkit-media-controls-enclosure{ 
    display: none;
}
//观看的当前时间
video::-webkit-media-controls-current-time-display{
    display: none;            
}
</style>