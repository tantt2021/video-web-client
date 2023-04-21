<template>
  <div class="platform">
    <ul class="nav">
      <li :class="{active:active===0}" @click="active=0">
        发布视频
      </li>
       <!-- | 
      <li :class="{active:active===1}" @click="active=1">
        草稿箱
      </li> -->
    </ul>
    <div v-show="active===0">
      <a-upload-dragger
        :customRequest="customRequest"
        v-model:fileList="videoFile"
        name="file"
        @change="handleChange"
        @drop="handleDrop"
        :supportServerRender="true"
        :before-upload="beforeuploadVideoFile"
        :max-count="1"
        :accept="'.mp4,.mov'"
      >
        <p class="ant-upload-drag-icon">
          <inbox-outlined></inbox-outlined>
        </p>
        <p class="ant-upload-text">拖拽视频到此处 或 点击选择视频文件上传</p>
        <p class="ant-upload-hint">
          支持单个视频上传、严禁上传私密资料或其他文件
        </p>
      </a-upload-dragger>
      <!-- 视频信息 -->
      <a-form
        class="form"
        :model="formState"
        name="validate_video"
        v-bind="formItemLayout"
        @finishFailed="onFinishFailed"
        @finish="onFinish"
      >
        <a-form-item label="封面"
        name="封面">
          <a-upload
            :customRequest="customRequest"
            v-model:file-list="videoCover"
            name="avatar"
            list-type="picture-card"
            class="avatar-uploader"
            :show-upload-list="true"
            :before-upload="beforeUploadCover"
            :maxCount="1"
            @change="coverChange"
            :accept="'.jpg,.jpeg,.png,.img'"
          >
            <img v-if="imageUrl" :src="imageUrl" alt="avatar" />
            <div>
              <loading-outlined v-if="loading"></loading-outlined>
              <plus-outlined v-else></plus-outlined>
              <div class="ant-upload-text">Upload</div>
            </div>
          </a-upload>
        </a-form-item>
        <a-form-item label="视频标题">
          <a-input v-model:value="formState.title" />
        </a-form-item>
        <a-form-item label="标签">
          <a-tag v-for="(tag, index) in formState.types" :key="tag" :closable="true" @close="handleClose(index)">
            {{ tag }}
          </a-tag>
          <a-input
            v-if="inputVisible"
            ref="inputRef"
            v-model:value="inputValue"
            type="text"
            size="small"
            :style="{ width: '78px' }"
            @blur="handleInputConfirm"
            @keyup.enter="handleInputConfirm"
          />
          <a-tag v-else style="background: #fff; border-style: dashed" @click="showInput">
            <plus-outlined />
            New Tag
          </a-tag>
        </a-form-item>
        <a-form-item label="视频简介">
          <a-input v-model:value="formState.introduction" />
        </a-form-item>
      </a-form>
      <div class="submit">
        <a-button
          type="primary"
          :disabled="requireInformation"
          :loading="uploading"
          @click="handleUpload"
        >
          {{ uploading ? '正在上传' : '开始上传' }}
        </a-button>
        <!-- <a-button :disabled="requireInformation">存草稿</a-button> -->
      </div>
    </div>
    <div v-show="active===1">
      <a-empty/>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import { InboxOutlined } from "@ant-design/icons-vue";
import { message } from "ant-design-vue";
import {uploadVideo} from "@/api/video";
import type { UploadChangeParam, UploadProps,Upload } from 'ant-design-vue';
import useStore from "~~/store";
useHead({
  title: '视频投稿',
  meta: [
    { name: 'description', content: 'My amazing site.' }
  ],
})
const {user} = useStore();
let videoFile = ref<UploadProps['fileList']>([]);
let originFile = ref(null);  //

let active = ref(0);
const handleChange = (info: UploadChangeParam) => {
  // 获取源文件
  originFile.value = info.fileList[0].originFileObj;

  const status = info.file.status;
  if (status !== "uploading") {
    
  }
  if (status === "done") {
    message.success(`${info.file.name} file uploaded successfully.`);
  } else if (status === "error") {
    message.error(`${info.file.name} file upload failed.`);
  }
};
const handleDrop = (e: DragEvent) => {
  console.log(e);
};
const beforeuploadVideoFile = (file: UploadProps['fileList'][number]) =>{
  console.log("beforeuploadVideoFile");
  console.log(file);
  
  if(file.type !== 'video/mp4'){
    message.error(`${file.name} is not a mp4 file`);
    videoFile.value = [];
    return false || Upload.LIST_IGNORE;;
  }
  const formdata = new FormData();
  formdata.append('name','test');
  formdata.append('file',file);

  // 获取上传视频的播放时长
  let audioElement = new Audio(URL.createObjectURL(file));
  formState.duration = audioElement.duration;
  audioElement.addEventListener('loadedmetadata', () => {
      formState.duration = audioElement.duration // 时长为秒，取整
      console.log(audioElement.duration, '上传视频的时长')
  })

  return false;
}
const customRequest = (file: UploadProps['fileList'][number]) => {
  console.log(file,'file');
  const form = new FormData()
  form.append('file', file.file)
  form.append('contractName', file.file.name)
  form.append('description', file.file.name)
  console.log(form,'form');
}
const uploading = ref<boolean>(false);
const handleUpload = async () => {
  console.log("handleUpload");
  const formData = new FormData();
  formData.append('video',originFile.value);
  formData.append('img', originCoverFile.value);
  formData.append('author', user.username);
  formData.append('authorEmail', user.email);
  formData.append('authorId', user.id);
  formData.append('duration', formState.duration);
  formData.append('introduction', formState.introduction);
  formData.append('title', formState.title);
  formData.append('type', formState.types.join("&&"));
  uploading.value = true;

  let res = await uploadVideo(formData);
  console.log(res);
  if(res.msg==='请求成功'){
    uploading.value = false;
    videoFile.value = [];
    formState.title = '';
    formState.introduction = '';
    formState.types = [];
    formState.duration = 0;
    videoCover.value = [];
    message.success('发布成功！到动态或个人主页查看新发布视频吧~');
  }else{
    message.error('upload error.');
  }

};
// 表单
const loading = ref<boolean>(false);
const imageUrl = ref<string>('');
const formItemLayout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 14 },
};
const formState = reactive<Record<string, any>>({
  title:'',
  introduction:'',
  types :  [],
  duration:0,
});
const onFinish = (values: any) => {
  console.log('Success:', values);
};
const onFinishFailed = (errorInfo: any) => {
  console.log('Failed:', errorInfo);
};
// 输入标签
const inputRef = ref(null);
let inputVisible = ref(false);
let inputValue = ref("");
const handleInputConfirm = () => {
  if(formState.types.indexOf(inputValue.value)===-1){
    formState.types.push(inputValue.value);
    inputVisible.value = false;
    setTimeout(()=>{
      inputValue.value = '';
    },0);
  }
  
};
const handleClose = (removedTag: number) => {
  console.log(removedTag);
  
  formState.types.splice(removedTag,1);
};
const showInput = () => {
  nextTick(()=>{

    inputVisible.value = true;
  })

  inputRef.value.focus();
  // }
};
// 封面上传
const videoCover = ref([]);
function getBase64(img: Blob, callback: (base64Url: string) => void) {
  const reader = new FileReader();
  reader.addEventListener('load', () => callback(reader.result as string));
  reader.readAsDataURL(img);
}
let originCoverFile = ref(null);
const coverChange = (info: UploadChangeParam) => {
  console.log(info,"tar");
  originCoverFile.value = info.fileList[0].originFileObj;
  
  if (info.file.status === 'uploading') {
    loading.value = true;
    return;
  }

  if (info.file.status === 'done') {
    // Get this url from response in real world.
    getBase64(info.file.originFileObj, (base64Url: string) => {
      imageUrl.value = base64Url;
      loading.value = false;
    });
  }
  if (info.file.status === 'error') {
    loading.value = false;
    message.error('upload error');
  }
};
const beforeUploadCover = (file: UploadProps['fileList'][number]) => {
  console.log("beforeUploadCover");
  const formdata = new FormData();
  formdata.append('name','test');
  formdata.append('file',file);
  return false;
};

// 是否可上传，验证
let requireInformation = computed(()=>{
  if(
      videoFile.value.length>0
      &&formState.title!==''
      &&formState.introduction!==''
      &&formState.types.length>0
      &&videoCover.value.length>0){
        return false;
      }
  return true;
});
</script>

<style lang="scss" scoped>
.platform {
  margin: 1rem;
  .nav{
    display: flex;
    li{
      font-weight: bold;
      padding: 0 1rem;
      cursor: pointer;
    }
    .active{
      color: #44bc87;
    }
  }
  .form{
    padding: 1rem;
  }

  .submit{
    display: flex;
    justify-content: center;
     button + button{
      margin-left: 2rem;
    }
    padding-bottom: 1rem;
  }
}
:global(.ant-upload.ant-upload-drag){
  width: 49%;
  margin: 0 auto;
}
</style>
