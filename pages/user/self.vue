<template>
  <div>
    <div class="messge">
      <div
        class="avatar"
        @mouseenter="changeAvatar = true"
        @mouseleave="changeAvatar = false"
        @click="dialog = '更换头像'"
      >
        <img src="../../assets/img/yatou.png" alt="" />
        <div class="avatar-mask" v-show="changeAvatar">更换头像</div>
      </div>
      <div class="description">
        <h3>{{ user.email }}</h3>
        <input v-model="user.description" maxlength="15" @keyup.enter="submitDescription" @blur="submitDescription"/>
      </div>
      <ul class="data">
        <li>
          <strong>点赞数</strong>
          {{ user.likeCount }}
        </li>
        <li>
          <strong>播放量</strong>
          {{ user.views }}
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
          <li @click="active = 3" :class="{ active: active === 3 }">
            关注数 {{ upList.length }}
          </li>
          <li @click="active= 4" :class="{ active: active === 4 }">
            粉丝量 {{ followers.length }}
          </li>
        </ul>
      </nav>
      <article>
            
        <div v-if="active===0" class="list" >
          <video-item v-if="portfolio.length>0" v-for="item in portfolio" :key="item" :config="item" type="work" @del-video="deleteVideo"/>
          <a-empty v-else></a-empty>
        </div>
        <div v-else-if="active===2" class="list">
          <video-item v-if="starList.length>0" v-for="item in starList" :key="item" :config="item" @cancel-star="uncollect" type="star"/>
          <a-empty v-else></a-empty>
        </div>
        <div v-else-if="active === 1">
          <action-item />
          <action-item>
            <action-video-item />
          </action-item>
          <action-item></action-item>
        </div>
        <div v-else-if="active === 3">
          <user-list :userList="upList" @updateFollowing="updateFollowing" type="follow"></user-list>
        </div>
        <div v-else-if="active === 4">
          <user-list :userList="followers" type="fans"></user-list>
        </div>
        
      </article>
    </main>
    <!-- 编辑信息 -->
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
              v-model:value="user.username"
              placeholder="Basic usage"
              id="uname"
            />
          </li>
          <li>
            <label for="description">我的签名</label>
            <a-textarea
              v-model:value="user.description"
              placeholder="Autosize height with  minimum and maximum number of lines"
              :auto-size="{ minRows: 2, maxRows: 5 }"
              :maxlength="25"
            />
          </li>
          <li>
            <label for="sex">性别</label>
            <a-radio-group
              v-model:value="user.sex"
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
import useStore from "../../store";
import {editInformation} from "../../api/userEditMessage";
import { getVideos,delVideo } from "~~/api/video";
import {getFollowing,getFans,findStar,cancelStar} from "~~/api/data";
import type {PublicUserType,Video} from "@/types";

useHead({
  title: '个人中心',
  meta: [
    { name: 'description', content: 'My amazing site.' }
  ],
})
const { user } = useStore();

// 获取用户的视频数据
let res = await getVideos({authorId:user.id});
let portfolio = ref(res.data);

// 获取用户收藏夹
let starList = ref(await findStar({userId:user.id}));


let activeKey = ref(0);
let listData = ref(0);
// 个人数据
let publicData = ref({
  follow: 12,
  fans: 1,
  thumbsUp: 12,
  views: 12000,
});
// 个签
const submitDescription = async () => {
  let res = await editInformation({
    id:user.id,
    description:user.description,
  });
}
// 修改多项信息
const editUserInformation = async () => {
  dialog.value = '';
  let res = await editInformation({
    id:user.id,
    uname:user.username,
    description:user.description,
    sex:user.sex,
  })
}


// tab栏
let tabArr = ref(["作品", "动态", "收藏"]);
// 修改用户信息
const editUserMess = () => {};
// 修改用户信息显示

// 性别
let sex = ref("保密");
let options1 = ref(["男", "女", "保密"]);


// 头像
let changeAvatar = ref(false);
let fileList = ref([]);
let loading = ref(false);
let AvatarDialogVisible = ref(false);
const imageUrl = ref<string>("");
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

// 粉丝信息，关注的人的信息
let dataDetailVisible = ref(false);

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

// 关注列表和粉丝列表
let upList = ref<PublicUserType[]>([]);
let followers = ref<PublicUserType[]>([]);

let active = ref(0);
// main里面的内容显示
let content = ref("video");


// 关注列表
console.log(user.id,'1111');

await getFollowing({userId:user.id}).then(
  res => {
    upList.value = res.data;
  }
)
const updateFollowing = (e:string)=> {
  console.log(e,"following");
  upList.value = upList.value.filter(item=>item.id!==e);
}
// 粉丝列表
await getFans({userId:user.id}).then(
  res => {
    followers.value = res.data;
  }
)
// 取消收藏
const uncollect = async (e:string) => {
  console.log(e,"取消收藏的视频id");
  console.log(user.id);
  await cancelStar({userId:user.id,videoId:e}).then(
    res=>{
      console.log(res,"取消收藏回复");
      starList.value = starList.value.filter((item:Video)=>item.id!==e);
    }
  )
}

const deleteVideo = async (e:string) => {
  console.log(e,"删除的视频id");
  await delVideo({id:e}).then(
    res => {
      console.log(res,"删除视频成功");
      portfolio.value = portfolio.value.filter((item:Video) =>  item.id!==e);
    }
  )
  
} 
</script>
<style lang="scss" scoped>
.messge {
  padding-top: 5rem;
  display: flex;
  padding-left: 2rem;
  background: linear-gradient(white, #c3f0c9);
  padding-bottom: 1rem;
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
      }
      &:hover {
        border: 1px solid #44bc87;
        box-shadow: -1px -1px -1rem 0.1rem rgb(164, 163, 163);
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
:global(.modal span) {
  // line-height:100%;
}
:global(.modal .ant-btn span) {
  line-height: 100%;
  // padding:.3rem .5rem;
}
</style>
