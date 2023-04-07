<template>
  <div>
    <div class="messge">
      <div
        class="avatar"
        @mouseenter="changeAvatar = true"
        @mouseleave="changeAvatar = false"
        @click="dialog = '更换头像'"
      >
        <img :src="publicUser.avatar" alt=""/>
        <div class="avatar-mask" v-show="changeAvatar">更换头像</div>
      </div>
      <div class="description">
        <h3>{{ publicUser.uname }}</h3>
        <input v-model="publicUser.description" maxlength="15" @keyup.enter="submitDescription" @blur="submitDescription"/>
      </div>
      <ul class="data">
        <li>
          <strong>点赞数</strong>
          {{ publicUser.likeCount }}
        </li>
        <li>
          <strong>播放量</strong>
          {{ publicUser.views }}
        </li>
      </ul>
      <button @click="dialog = '修改资料'">修改资料</button>
    </div>

    <main>
      <nav>
        <ul class="nav-list">
          <li
            :key="idx"
            v-for="(item, idx) in tabArr"
            @click="active = idx"
            :class="{ active: active === idx }"
          >
            {{ item }}
          </li>
        </ul>
        <ul class="data-list">
          <li @click="active=3" :class="{ active: active === 3 }">
            关注数 {{ upList.length }}
          </li>
          <li @click="active=4" :class="{ active: active === 4 }">
            粉丝量 {{ followers.length }}
          </li>
        </ul>
      </nav>
      <article>
        <div v-if="active === 1">
          <action-item />
          <action-item>
            <action-video-item />
          </action-item>
          <action-item></action-item>
        </div>
        <div v-else-if="active === 3">
          <user-list :userList="upList"></user-list>
        </div>
        <div v-else-if="active === 4">
          <user-list :userList="followers"></user-list>
        </div>
        <div class="list" v-else-if="active===0">
          <video-item 
            v-if="portfolio.length>0" 
            v-for="item in portfolio" 
            :key="item" 
            :config="item"
          />
            <a-empty :description="null" v-else/>
        </div>
        <div class="list" v-else-if="active===2">
          <video-item 
            v-if="portfolio.length>0" 
            v-for="item in portfolio" 
            :key="item" 
            :config="item"
          />
            <a-empty :description="null" v-else/>
        </div>
      </article>
    </main>
    <a-modal
      v-model:visible="modalVisible"
      :title="dialog"
      @ok="editUserInformation"
      class="modal"
      @cancel="dialog = ''"
      centered
    >
      <div class="modal-box">
        <ul v-if="dialog === '修改资料'">
          <li>
            <label for="uname">昵称</label>
            <a-input
              v-model:value="publicUser.uname"
              placeholder="Basic usage"
              id="uname"
            />
          </li>
          <li>
            <label for="description">我的签名</label>
            <a-textarea
              v-model:value="publicUser.description"
              placeholder="Autosize height with  minimum and maximum number of lines"
              :auto-size="{ minRows: 2, maxRows: 5 }"
              :maxlength="25"
            />
          </li>
          <li>
            <label for="sex">性别</label>
            <a-radio-group
              v-model:value="publicUser.sex"
              :options="options1"
              id="sex"
            />
          </li>
        </ul>
        <a-upload
          v-else-if="dialog === '更换头像'"
          v-model:file-list="fileList"
          name="avatar"
          list-type="picture-card"
          class="avatar-uploader"
          :show-upload-list="false"
          action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
          :before-upload="beforeUpload"
          @change="handleAva"
        >
          <img v-if="imageUrl" :src="imageUrl" alt="avatar" />
          <div v-else>
            <loading-outlined v-if="loading"></loading-outlined>
            <plus-outlined v-else></plus-outlined>
            <div class="ant-upload-text">Upload</div>
          </div>
        </a-upload>
      </div>
    </a-modal>
  </div>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import VideoItem from "@/components/VideoItem.vue";
import ActionItem from "@/components/ActionItem.vue";
import ActionVideoItem from "@/components/ActionVideoItem.vue";
import UserList from "@/components/UserList.vue";
import { PlusOutlined, LoadingOutlined } from "@ant-design/icons-vue";
import type { UploadChangeParam, UploadProps } from "ant-design-vue";
import { message } from "ant-design-vue";
import useStore from "~~/store";
import { editInformation } from "~~/api/userEditMessage";
import { getVideos } from "~~/api/video";
import {getFollowing,getFans} from "~~/api/data";
import {getUserPublicInfo} from "~~/api/userEditMessage";
import type {PublicUserType} from "@/types";

useHead({
  title: '个人中心',
  meta: [
    { name: 'description', content: 'My amazing site.' }
  ],
})
const route = useRoute();


const { user } = useStore();
let publicUser = ref<PublicUserType>({});

// // 获取用户的视频数据
let portfolio = ref([]);

await getVideos({authorId:route.params.id}).then(
  res=>{
    portfolio.value = res.data;
  }
)




// 个签
const submitDescription = async () => {
  console.log(publicUser.value.description,"提交");
  let res = await editInformation({
    id:publicUser.value.id,
    description:publicUser.value.description,
  });
  console.log(res,"修改个签");
}
// 修改多项信息
const editUserInformation = async () => {
  dialog.value = '';
  let res = await editInformation({
    id:publicUser.value.id,
    uname:publicUser.value.uname,
    description:publicUser.value.description,
    sex:publicUser.value.sex,
  })
}


// // tab栏
let tabArr = ref(["作品", "动态", "收藏"]);
// // 修改用户信息
// const editUserMess = () => {};
// // 修改用户信息显示

// // 性别
let sex = ref("保密");
let options1 = ref(["男", "女", "保密"]);


// // 头像
let changeAvatar = ref(false);
let fileList = ref([]);
let loading = ref(false);
let AvatarDialogVisible = ref(false);
const imageUrl = ref("");
const handleAva = () => {
  AvatarDialogVisible.value = false;
  loading.value = true;
};
const beforeUpload = (file: UploadProps["fileList"][number]) => {
  const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
  if (!isJpgOrPng) {
    message.error("You can only upload JPG file!");
  }
  const isLt2M = file.size / 1024 / 1024 < 2;
  if (!isLt2M) {
    message.error("Image must smaller than 2MB!");
  }
  return isJpgOrPng && isLt2M;
};

// // 粉丝信息，关注的人的信息
// let dataDetailVisible = ref(false);

let dialog = ref("");
let modalVisible = ref(false);
watch(()=>dialog.value,(newV) => {
  if (newV === "修改资料" || newV === "更换头像") {
    modalVisible.value = true;
    dialog.value = newV;
  } else {
    modalVisible.value = false;
  }
});

// // 关注列表和粉丝列表
let upList = ref<PublicUserType[]>([]);
let followers = ref<PublicUserType[]>([]);

let active = ref(0);
// // main里面的内容显示
// let content = ref("video");


// 用户的具体信息
await getUserPublicInfo({id:route.params.id}).then(
  res => {
    publicUser.value = res.data;
    
  }
)
  
// // 关注列表
// await getFollowing({userId:publicUser.value.id}).then(
//   res => {
//     console.log(res.data,'getFollowing');
//     upList.value = res.data;
//   }
// )
// // 粉丝列表
// await getFans({userId:publicUser.value.id}).then(
//   res => {
//     console.log(res.data,'getFans');
//     followers.value = res.data;
//   }
// )


</script>

<style lang="scss" scoped>
.messge {
  padding-top: 5rem;
  display: flex;
  padding-left: 2rem;
  .avatar {
    position: relative;
    img {
      height: 4rem;
      border-radius: 0.5rem;
    }
    .avatar-mask {
      position: absolute;
      text-align: center;
      font-size: 0.5rem;
      line-height: 4rem;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background-color: #8b8989;
      border-radius: 0.5rem;
      opacity: 0.5;
    }
  }

  .description {
    flex-grow: 1;
    margin-left: 1rem;
    h3 {
      line-height: 2rem;
      font-weight: bold;
      padding-left: 0.5rem;
    }
    input {
      border: 0;
      width: 100%;
      transition: all 0.5s;
      border-radius: 0.3rem;
      font-weight: 400;
      padding: 0 0.5rem;

      &:focus {
        border: 1px solid #44bc87;
        box-shadow: -1px -1px -1rem 0.1rem rgb(164, 163, 163);
        background-color: #b6e0ce;
      }
      &:hover {
        border: 1px solid #44bc87;
        box-shadow: -1px -1px -1rem 0.1rem rgb(164, 163, 163);
        background-color: #b6e0ce;

      }
    }
  }
  .data {
    display: flex;
    justify-content: space-around;
    // flex-grow: 1;
    li {
      margin-right: 2rem;
      strong {
        color: rgb(59, 150, 91);
      }
    }
  }
  button {
    margin-top: 1rem;
    font-size: 0.9rem;
    margin-right: 2rem;
    padding: 0 0.5rem;
    &:hover {
      color: #44bc87;
    }
  }
}
main {
  margin-left: 2rem;

  // .up-fans{
  //   display:flex;
  //   line-height: 100%;
  //   margin: 0;
  //   .user{
  //     margin-right:2rem;
  //     cursor: pointer;
  //   }
  // }
  nav {
    display: flex;
    .nav-list {
      display: flex;
      flex-grow: 1;
      margin-bottom: 0;
      li {
        margin-left: 2rem;
        line-height: 3rem;
      }
    }
    .data-list {
      display: flex;
      margin-bottom: 0;

      li {
        margin-right: 3rem;
        line-height: 3rem;
      }
    }
    .active {
      color: #44bc87;
    }
  }
  article {
    .list {
      display: flex;
      flex-wrap: wrap;
    }
  }
}
.modal {
  display: flex;
  ul li {
    padding: 0.5rem;
    label {
      width: 5rem;
      display: inline-block;
      text-align: justify;
      text-align-last: justify;
      padding-right: 0.5rem;
    }
    textarea,
    input {
      // margin-left:5rem;
      width: 80%;
    }
  }
}
:global(.modal .ant-btn span) {
  line-height: 100%;
  // padding:.3rem .5rem;
}
</style>
