<template>
    <div class="space">
      <div class="myself">
        <div class="edit">
          <a-textarea v-model:value="textValue" placeholder="分享你此刻的心情吧~"
            :auto-size="{ minRows: 2, maxRows: 50 }" :bordered="false"/>
        </div>
        <div class="plugin">
          <div class="left">
            <a-popover title="上传图片" trigger="click" placement="bottom" @visibleChange="visibleChange">
              <template #content>
                <a-upload
                  v-model:file-list="dynamicImgs"
                  list-type="picture-card"
                  :before-upload="beforeUpload"
                  @change="handleChange"
                  
                >
                  <div v-if="dynamicImgs.length < 9">
                    <plus-outlined />
                    <div style="margin-top: 8px">Upload</div>
                  </div>
                </a-upload>
              </template>
              <button><picture-outlined :class="{active}" @click="active=!active" /></button>
                
            </a-popover>
            <!-- <button><clock-circle-filled /></button> -->
            <AppPickerComposition @updateEmoji="updateEmoji"/>
            
          </div>
          <div class="right">
            <a-dropdown>
              <a class="ant-dropdown-link" @click.prevent>
                可以评论
              </a>
              <template #overlay>
                <a-menu>
                  <a-menu-item>
                    <a href="javascript:;">可以评论</a>
                  </a-menu-item>
                  <a-menu-item>
                    <a href="javascript:;">禁止评论</a>
                  </a-menu-item>
                </a-menu>
              </template>
            </a-dropdown>
            <a-button :disabled="!canSubmit" type="primary" class="submit" @click="submitDynamic">发布</a-button>
          </div>
        </div>
      </div>
      <p v-if="false">有新动态，点击查看</p>
      <div class="newest-action">
        <action-item v-for="item in dynamics" :key="item.id" :content="item" @reload="refreshDynamics"/>
      </div>
      <p>没有更多啦，去看看其他的吧</p>

    </div>
  </template>
  
  
<script lang="ts" setup>
import { ref } from "vue";
import {useRouter } from "vue-router";
import ActionItem from "@/components/ActionItem.vue";
import { getDynamic,addDynamic } from "~/api/dynamic";
import {isLike} from "~/api/data";
import useStore from "~/store";
import type {TextDynaimcType} from "@/types";
import { message } from "ant-design-vue";
import {getBase64} from "@/utils/file";
import type { UploadChangeParam, UploadProps } from 'ant-design-vue';
import {
  SmileOutlined,
  PictureOutlined,
  ClockCircleFilled,
  MailOutlined,
  
} from '@ant-design/icons-vue';
import AppPickerComposition from "~/components/AppPickerComposition.vue";
useHead({
title: '动态',
meta: [
    { name: 'description', content: 'My amazing site.' }
  ],
})
const {user} = useStore();  
// 动态文字
let textValue = ref("");
const updateEmoji = (emoji:any) => {
  textValue.value += emoji;
};

// 点击了控制图片按钮高亮
let active = ref(false);
const visibleChange = (visible:boolean) => {
  active.value = visible;
}

// 导航
const current = ref<string[]>(['all']);

// 动态内容
let dynamics = ref<TextDynaimcType[]>([]);
await getDynamic({userId:user.id})
.then(
  res => {
    dynamics.value = res.data;
    // 查询点赞记录
    isLike({
      userId:user.id,
      type:'dynamic'
    }).then(
      res => {
        console.log("点赞记录",res);        
      }
    )
  }
)
// 发布动态
const submitDynamic = () => {
  let form = new FormData();
  console.log(dynamicImgs.value,"图片");
  let arr = [];
  for(let i = 0;i<dynamicImgs.value?.length;i++){
    form.append("img",dynamicImgs.value[i].originFileObj);

  }
  form.append("user",user.id);
  form.append("content",textValue.value);
  form.append("type","text");
  // form.append("img",dynamicImgs.value[0].originFileObj);
  
  addDynamic(form).then(
    res => {
      message.success("发布成功！");
      textValue.value = '';
      dynamicImgs.value = [];
      getDynamic({userId:user.id}).then(
        res => {
          // 刷新，
          dynamics.value = res.data;
        }
      )
    }
  )
}

// 是否可提交
let canSubmit = computed(()=>{
  // 加上或者图片不为空
  return textValue.value !== '';
});


// 上传图片的数组
let dynamicImgs = ref<UploadProps['fileList']>([]);

const beforeUpload: UploadProps['beforeUpload'] = file => {
  // 上传前的回调函数，可以在这个函数中进行一些额外的验证和操作。
  // console.log(file,"beforeUpload");
  return false;
  
};
const handleChange = (info: UploadChangeParam) => {
  console.log(info,"handleChange");
  console.log(dynamicImgs.value);
  
};

// 子组件触发刷新，重新获取
const refreshDynamics = () => {
  getDynamic({userId:user.id}).then(
    res => {
      // 刷新，
      dynamics.value = res.data;
    }
  )
}



</script>
  
<style lang="scss" scoped>
  .space{
    margin: 0 10rem;
    padding: 1rem 0;
    .myself{
      box-shadow: 0px 0px 10px 0px #ddd;
      background-color: #fff;

      .edit{
        padding: 1rem;

      }
      .plugin {
        display: flex;
      
        justify-content: space-between;
        margin: 1rem 0;
        padding: 0 1rem;
        padding-bottom: 1rem;

        .left {
          button{
            cursor: pointer;
            ~button {
              margin-left: .5rem;
            }
          }
          
        }
      
        .right {
        
          // float:right;
          button {
            line-height: 100%;
          }
        
          .submit {
            margin-left: 2rem;
          }
        }
      
      }
    }
    .newest-action{
      box-shadow: 0px 0px 10px 0px #ddd;
      
    }
    p{
      text-align: center;
      // background-color: #b0dda7;
      background-color: #f6f6f6;
      color: #706e6e;
      font-weight: 400;
      padding: .3rem 0;
      margin: .5rem 0;
    }
    a {
      font-weight: 400;
      font-size: .8rem;
    
    }
  }

</style>