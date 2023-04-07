<template>
<div class="video-controls">
    <!-- 进度条 -->
    <div>
        <a-slider 
          id="test" 
          v-model:value="sliderValue" 
          :disabled="sliderDisabled" 
          @change="sliderChange"
          :tip-formatter="formatter"
          :max="duration"
          :step="0.001"
        />
    </div>

    <div class="operate">
      <div>
      <span  @click="handlePlay" class="play-pause" @click.once="$emit('addHistory')">
          <caret-right-outlined v-if="!play"/>
          <pause-outlined v-else/>
      </span>
      <span>{{formatTime(currentTime)}} / {{ formatTime(duration) }}</span>
      </div>
      <div class="send-marquee" v-show="fullScreen">
        <span @click="MarqueeVisible=!MarqueeVisible">
          <img src="../assets/svg/svgexport-51.svg" alt="" v-show="MarqueeVisible">
          <img src="../assets/svg/svgexport-52.svg" alt="" v-show="!MarqueeVisible">
        </span>
        <span>
          <img src="../assets/svg/svgexport-53.svg" alt="">
        </span>
        <a-input-search
            v-model:value="marquee"
            placeholder="畅所欲言,严禁网暴"
            enter-button="发送"
            @search="onSearch"
            style="width:80%"
        />
      </div>

      <div class="right-area">
        <!-- 画质 -->
        <a-dropdown placement="top" :getPopupContainer="(triggerNode)=>triggerNode.parentNode">
          <a-button>自动</a-button>
          <template #overlay>
            <a-menu>
              <a-menu-item v-for="(item,idx) in clarity" :key="idx">
               {{item}}
              </a-menu-item>
            </a-menu>
          </template>
        </a-dropdown>
        <!-- 播放速度 -->
        <a-dropdown placement="top" :getPopupContainer="(triggerNode)=>triggerNode.parentNode">
          <a-button>倍速</a-button>
          <template #overlay>
            <a-menu  @click="onClick">
              <a-menu-item v-for="(item,idx) in speed" :key="idx">
                  {{item}}
              </a-menu-item>
            </a-menu>
          </template>
        </a-dropdown>
        <!-- 音量 -->
        <a-popover :getPopupContainer="(triggerNode)=>triggerNode.parentNode">
          <template #content >
            <div style="display: inline-block; height: 5rem" >
              <a-slider v-model:value="sound" vertical  />
            </div>
          </template>
          <a-button><sound-outlined /></a-button>
        </a-popover>
        <!-- 设置 -->
        <a-dropdown placement="top" :getPopupContainer="(triggerNode)=>triggerNode.parentNode">
          <a-button><setting-outlined /></a-button>
          <template #overlay>
            <a-menu>
              <a-menu-item v-for="(item,idx) in setting" :key="idx">
                  {{item.attributes}} <a-switch v-model:checked="item.checked" />
              </a-menu-item>
            </a-menu>
          </template>
        </a-dropdown>
        <!-- 全屏 -->
        <a-button @click="handleScreen">
          <!-- 对应非全屏 -->
          <fullscreen-outlined  v-if="!fullScreen"/>
          <fullscreen-exit-outlined v-else/>
        </a-button>
         
      </div>
    </div>
</div>
</template>

<script lang="ts" setup>
import {
  CaretRightOutlined,
  FullscreenOutlined,
  SoundOutlined,
  SettingOutlined,
  PauseOutlined,
  FullscreenExitOutlined,
} from '@ant-design/icons-vue';
import {watch,onMounted} from "vue";
import {formatTime} from "@/utils/index";

const emit = defineEmits([
  "handlePlay",
  "handleScreen",
  "handleChangeslider",
  "changeVideoPlaybackRate",
  "changeAutoloop",
  "changeVolume",
  "addHistory"
]);

const props = defineProps({
  duration: {
    type: Number,
    default:0,
  },
  currentTime:{
    type:Number,
    default:0,
  },
  play:{
    type:Boolean,
    default:false,
  },
  autoloop: {
    type: Boolean,
    default:false,
  },
  fullScreen:Boolean,
  
});
onMounted(()=>{

});
// 进度条
let sliderValue = ref((props.currentTime));
// 进度条提示
let formatter = (value: number) => {
  return formatTime(props.currentTime);
};
// 监听播放时长，改变进度条
let NumberDuration = ref(0);
watch(()=>props.currentTime,()=>{
    // 视频时长的数字形式 
    // let minArr = props.duration.split(":");
    // NumberDuration.value = +minArr[0] * 60 + +minArr[1];
    // minArr = props.currentTime.split(":");
    // 视频当前播放时长的数字形式 
    // let cu = +minArr[0] * 60 + +minArr[1];
    // 进度条的形式
    // sliderValue.value =  cu / NumberDuration.value * 1000;
});
let sliderDisabled = ref(false);
// 进度条被拖动
const sliderChange = (e) => {
  // e/100*NumberDuration.value就是NUmberCurrentTime;
  // 改变currentTime  
  console.log(e,'eeee');
  
  sliderValue.value = e;
  emit("handleChangeslider",+e);
}

watch(()=>props.currentTime,()=>{
  sliderValue.value = props.currentTime;
})

// 播放
const handlePlay = () => {
  // play.value = !play.value;/
  emit('handlePlay', !props.play);
}

// 播放速度
let speed = ref(['2.0x', '1.5x', '1.25x', '1.0x', '0.75x', '0.5x']);
const onClick = ({key}) => {
  emit('changeVideoPlaybackRate',speed.value[key]);
}

// 清晰度
let clarity = ref(['1080p 60帧', '1080p 高清', '720p 高清', '480p 清晰', '360p 流畅', '自动(720p)']);

// 音量
let sound = ref(0);
watch(()=>sound.value,()=>{
  emit("changeVolume",sound.value);
})


// setting
let setting = ref([
  {
    attributes: "洗脑循环",
    checked: false,
  },
  // {
  //   attributes: "自动开播",
  //   checked: false,
  // },
  
]);
watch(() => setting.value[0].checked, () => {
  emit("changeAutoloop",setting.value[0].checked);
})
// 全屏
const handleScreen = () =>{
  if(!props.fullScreen){
    emit("handleScreen",true);
    
  } else {
    emit("handleScreen",false);
  }
}

// 弹幕
let marquee = ref("");
let MarqueeVisible = ref(false);
const onSearch = () => {

}
</script>

<style lang="scss" scoped>
.video-controls{
    position: absolute;
    bottom: 0rem;
    color:#fff;
    // background-color: #fff;
    width: 100%;
    height: 4rem;
    line-height: 3rem;
    padding: 0 .8rem;
    z-index:1;
    #test{
          margin:0;
    }
    // display: flex;
    // justify-content: space-between;
    .operate{
      display: flex;
      justify-content: space-between;
      span{
          line-height:100%;
          // font-size: .8rem;
          vertical-align:middle;
          user-select: none;
      }
      .play-pause{
        font-size: 1.5rem;
        margin-right: 1rem;
      }
      .send-marquee{
        flex-grow: 1;
        margin-left: 2rem;
        span{
          margin-right: .5rem;
        }
      }
      .right-area{
          // float:right;
          // z-index:1;
          button,span{
              line-height: 100%;
              background-color: transparent;
              color: #fff;
              border: 0;
          }
      }
      
    }

    
}
</style>