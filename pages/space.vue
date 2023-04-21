<template>
    <div class="space">
      <div class="myself">
        <div class="edit">
          <a-textarea v-model:value="textValue" placeholder="分享你此刻的心情吧~"
            :auto-size="{ minRows: 2, maxRows: 50 }" :bordered="false"/>
        </div>
        <div class="plugin">
          <div class="left">
            <smile-outlined />
            <a-popover title="上传图片" trigger="click" placement="bottom">
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
                <picture-outlined />
            </a-popover>
            <!-- <span>@</span> -->
            <clock-circle-filled />
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
        <action-item v-for="item in dynamics" :key="item.id" :content="item"/>

        <!-- <a-menu v-model:selectedKeys="current" mode="horizontal">
          <a-menu-item key="all"  @click="navigateTo('/space/all')">
            
            <template #icon>
              <mail-outlined />
            </template>
            全部
          </a-menu-item>
          <a-menu-item key="text" @click="navigateTo('/space/text')">
            <template #icon>
              <mail-outlined />
            </template>
            文字
          </a-menu-item>
          <a-menu-item key="video" @click="navigateTo('/space/video')">
            <template #icon>
              <mail-outlined />
            </template>
            视频
          </a-menu-item>
        </a-menu> -->
        <!-- <suspense>
          <nuxt-page></nuxt-page>
        </suspense> -->
      </div>
    </div>
  </template>
  
  
<script lang="ts" setup>
import { ref } from "vue";
import {useRouter } from "vue-router";
import ActionItem from "@/components/ActionItem.vue";
import { getDynamic,addDynamic } from "~/api/dynamic";
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
useHead({
title: '动态',
meta: [
    { name: 'description', content: 'My amazing site.' }
  ],
})
const {user} = useStore();  
// 动态文字
let textValue = ref("");

// 导航
const current = ref<string[]>(['all']);

// 动态内容
let dynamics = ref<TextDynaimcType[]>([]);
await getDynamic({userId:user.id})
.then(
  res => {
    dynamics.value = res.data;
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
      // dynamicImgs.value = null;
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
          span{
            cursor: pointer;
            ~span {
              margin-left: 1rem;
              
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
      background-color: #b0dda7;
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