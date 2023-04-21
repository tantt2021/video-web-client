<template>
  <div class="platform">
    <a-slider id="test" v-model:value="progress" :disabled="true" class="progress" v-show="uploading"/>
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
        @reject="videoFormat"
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
          <img :src="result.dataURL" v-if="originCoverFile!==null" alt="" :style="{width:'10rem',paddingRight:'1rem'}">
          <a-button type="primary" @click="showModal">{{originCoverFile!==null?'重新设置封面':'点击设置封面'}}</a-button>
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
    
    <div class="cropper-class">
    <a-modal v-model:visible="uploadCovervisible" title="裁切封面" @ok="handleOk" @cancel="handleModalClose" style="top: 40px" :width="700" class="teleport">
      <div class="upload-body" >
          <input
            ref="uploadInput"
            type="file"
            accept="image/jpg, image/jpeg, image/png, image/gif"
            @change="selectFile"
            v-if="!isShowModal"
          />
          <div class="cropper" v-else>
          
            <div class="modal-wrap">
              <div class="modal-mask"></div>
                <div class="modal-scroll-view">
                  <div class="modal">
                    <div class="modal-title">
                      <p class="title">图片裁切</p>
                      
                    </div>
                  
                    <div class="modal-content">
                      <!-- The component imported from `vue-picture-cropper` plugin -->
                      <VuePictureCropper
                        :boxStyle="{
                          width: '100%',
                          height: '100%',
                          backgroundColor: '#f8f8f8',
                          margin: 'auto',
                        }"
                        :img="pic"
                        :options="{
                          viewMode: 1,
                          dragMode: 'crop',
                          aspectRatio: 16 / 9,
                        }"
                        @ready="ready"
                      />
                    </div>
                    <div class="tools">
                        <a-button class="btn" @click="isShowModal = false">重新上传</a-button>
                        <a-button class="btn primary" @click="getResult">裁切</a-button>
                      </div>
                  </div>
                </div>
            </div>

            <!-- 展示 -->
            <section class="section" v-if="result.dataURL && result.blobURL">
              <!-- <p>A preview of the cropped Base64 image:</p>
              <div class="preview">
                <img :src="result.dataURL" />
              </div> -->
              <p>效果预览</p>
              <div class="preview">
                <img :src="result.blobURL" />
              </div>
            </section>
          </div>
      </div>
      <template #footer>
        <a-button key="submit" type="primary"  @click="handleOk"  v-if="isShowModal">确定</a-button>
      </template>
    </a-modal>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import { InboxOutlined } from "@ant-design/icons-vue";
import { message } from "ant-design-vue";
import {uploadVideo, uploadLargeFileInfo} from "@/api/video";
import type { UploadChangeParam, UploadProps,Upload } from 'ant-design-vue';
import useStore from "~~/store";
import {uploadChunk} from "@/utils/sliceUpload";
import VuePictureCropper, { cropper } from 'vue-picture-cropper'
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
const videoFormat = (fileList) => {
  message.error("请上传视频文件");
  
}
const handleChange = (info: UploadChangeParam) => {
  // 获取源文件
  console.log(info,"info");
  if(info.file.type !== 'video/mp4'){
    return;
  }
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
  // console.log(e.target);
};
const beforeuploadVideoFile = (file: UploadProps['fileList'][number]) =>{
  console.log("beforeuploadVideoFile");
  console.log(file);
  
  if(file.type !== 'video/mp4'){
    message.error(`${file.name} is not a mp4 file`);
    videoFile.value = [];
    videoFile.length = 0;
    return false;
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
const customRequest = async (file: UploadProps['fileList'][number]) => {
  console.log(file,'file');
  const form = new FormData()
  form.append('file', file.file)
  form.append('contractName', file.file.name)
  form.append('description', file.file.name)
  console.log(form,'form');
}
const uploading = ref<boolean>(false);

let progress = ref(0);   //进度条

const resetUpload = () => {
  // 页面元素重置
  uploading.value = false;
  videoFile.value = [];
  formState.title = '';
  formState.introduction = '';
  formState.types = [];
  formState.duration = 0;
  videoCover.value = [];
  result.dataURL = '';
  pic.value = '';
  originCoverFile.value = null;
  isShowModal.value = false;
  if (!uploadInput.value) return
    uploadInput.value.value = '';
}


const handleUpload = async () => {
  if(originFile.value.size < 104857600 ){
    // 文件大小 < 100MB 直接上传
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
    console.log(originFile.value,"大小");
    
    let res = await uploadVideo(formData);
    console.log(res);
    if(res.msg==='请求成功'){
      resetUpload();
      message.success('发布成功！到动态或个人主页查看新发布视频吧~');
    }else{
      message.error('upload error.');
    }
  }else{
    uploading.value = true;
    let largeVideoInfo = new FormData();
    largeVideoInfo.append('img', originCoverFile.value);
    largeVideoInfo.append('author', user.username);
    largeVideoInfo.append('authorEmail', user.email);
    largeVideoInfo.append('authorId', user.id);
    largeVideoInfo.append('duration', formState.duration);
    largeVideoInfo.append('introduction', formState.introduction);
    largeVideoInfo.append('title', formState.title);
    largeVideoInfo.append('type', formState.types.join("&&"));
    await uploadLargeFileInfo(largeVideoInfo).then(
      async(res) => {
        console.log(res);
        let filename = res.data.videoFile.slice(29,res.data.videoFile.length);
        console.log("handleUpload切片上传",originFile.value.size);
        const formData = new FormData();
        // 上传切片文件
        // 循环上传，
        // 计算文件总分片数
        let chunks = [];
        let chunkSize = 8 * 1024 * 1024; // 8M切片大小
        let currentChunk = 0;   //当前切片索引
        let uploadedChunks = []; // 已上传的切片
        const totalChunks = Math.ceil(originFile.value.size / chunkSize);
        // 生成分片列表
        for(let i = 0; i < totalChunks; i++){
          const start = i * chunkSize;
          const end = start + chunkSize;
          const chunk = originFile.value.slice(start,end);
          chunks.push(chunk);
        }
        // 逐一上传
        while(currentChunk < totalChunks){
          const chunk = chunks[currentChunk];
          let formData = new FormData();
          formData.append('chunk',chunk);
          formData.append('filename',filename);
          formData.append('index',currentChunk.toString());
          formData.append('total',totalChunks.toString());
          
          let res = await uploadChunk(formData)
          if (res.status === 'success' && currentChunk === totalChunks - 1) {
            progress.value = res.progress * 100 / totalChunks;
            console.log(progress.value);
            
            uploadedChunks.push(currentChunk);
            currentChunk++;
            // 告知成功
            resetUpload();
            message.success('发布成功！到动态或个人主页查看新发布视频吧~');
          }else if (res.status === 'success') {
            progress.value = res.progress * 100 /totalChunks;
            console.log(progress.value);
            
            uploadedChunks.push(currentChunk);
            currentChunk++;
          } else if (res.status === 'exist') {
            uploadedChunks.push(currentChunk);
            currentChunk++;
            console.log('该分片已存在，跳过上传');
          } else {
            console.log('上传分片失败')
            break;
          }

        }
      }
    )
    
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
  if(inputValue.value.length>10){
    message.error("请输入小于10个字！");
  }else if(formState.types.indexOf(inputValue.value)===-1&&inputValue.value.trim()!==''){
    formState.types.push(inputValue.value);
    inputVisible.value = false;
    setTimeout(()=>{
      inputValue.value = '';
    },0);
  }else{
    inputVisible.value = false;
  }
  
};
const handleClose = (removedTag: number) => {
  console.log(removedTag);
  
  formState.types.splice(removedTag,1);
};
const showInput = () => {

    inputVisible.value = true;
    

  nextTick(()=>{
  inputRef.value.focus();
  })

  // }
};
// 封面上传
let uploadCovervisible = ref(false);
const showModal = () => {
  uploadCovervisible.value = true;
}
const handleOk = () => {
  // 确定封面
  uploadCovervisible.value = false;
  console.log(uploadCovervisible.value,'111');
  

}
const videoCover = ref([]);
function getBase64(img: Blob, callback: (base64Url: string) => void) {
  const reader = new FileReader();
  reader.addEventListener('load', () => callback(reader.result as string));
  reader.readAsDataURL(img);
}
let originCoverFile = ref(null);

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


// 上传裁切封面
const isShowModal = ref<boolean>(false)
const uploadInput = ref<HTMLInputElement | null>(null)
const pic = ref<string>('')
const result = reactive({
  dataURL: '',
  blobURL: '',
})

    /**
     * Select the picture to be cropped
   */
function selectFile(e: Event) {
  // Reset last selection and results
  pic.value = ''
  result.dataURL = ''
  result.blobURL = ''
  // Get selected files
  const { files } = e.target as HTMLInputElement
  if (!files || !files.length) return
    
  // Convert to dataURL and pass to the cropper component
  const file = files[0]
  console.log(typeof file,"typeof file");
  
  const reader = new FileReader()
  reader.readAsDataURL(file)
  reader.onload = () => {
    // Update the picture source of the `img` prop
    pic.value = String(reader.result)
    // Show the modal
    isShowModal.value = true
    // Clear selected files of input element
    if (!uploadInput.value) return
    uploadInput.value.value = ''

  }
  getResult();
}

    /**
     * Get cropping results
     */
async function getResult() {
  if (!cropper) return
  const base64 = cropper.getDataURL()
  const blob: Blob | null = await cropper.getBlob()
  if (!blob) return
  const file = await cropper.getFile({
    fileName: 'Test file name, optional',
  })
  console.log({ base64, blob, file })
  result.dataURL = base64
  result.blobURL = URL.createObjectURL(blob)
  originCoverFile.value = file;
  videoCover.value.splice(0,1,originCoverFile.value);
  // isShowModal.value = false
}
function ready() {
  console.log('Cropper is ready.')
  getResult();  //加载后就裁切一次
}

// 关闭窗口的回调,清除
const handleModalClose = () => {
  // pic.value = '';
  isShowModal.value = false;
  uploadInput.value = '';
}
</script>

<style lang="scss" scoped>
.teleport img{
  width: 100%;
}
.platform {
  .progress{
    position: fixed;
    top: 2.5rem;
    width: calc(100% - 220px);
  }
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
.cover{
  // width: 200px;
  height: 200px;

}
.upload-body{
  // height: 300px;
  // display: flex;
  .cropper{
    display: flex;
    justify-content: space-around;
    .modal-scroll-view{
      .modal{
        .modal-title{
          div + div {
            padding: .5rem 0;
          }
        }
        .modal-content{
          padding-bottom: .5rem;
        }
        .tools{
          button + button {
            margin-left: .5rem;
          }
        }
      }
    }
  }
}
.modal-content,.section{
  width: 200px;
}
:global(.ant-upload.ant-upload-drag){
  width: 49%;
  margin: 0 auto;
}
.cropper-class{
  font-size:10rem;
  img{
    width: 100%;
  }
}
</style>
