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
        <h3>{{ user.username }}</h3>
        <input v-model="user.description" maxlength="15" />
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
            关注数 {{ user.views }}
          </li>
          <li @click="active = 4" :class="{ active: active === 4 }">
            粉丝量 {{ user.views }}
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
        <div v-else class="list">
          <video-item v-for="item in 9" :key="item" />
        </div>
      </article>
      <!-- <a-tabs v-model:activeKey="activeKey" > -->

      <!-- <a-tab-pane :key="idx" v-for="(item, idx) in tabArr" :tab="item"> -->
      <!-- 作品和收藏是同个组件，动态是滚动盒子 -->

      <!-- </a-tab-pane>
        <a-tab-pane key="1" tab="Tab 1" :style="{float:'right'}">Content of Tab Pane 1</a-tab-pane> -->

      <!-- <template #rightExtra>
          <a-tabs v-model:activeKey="activeKey">
            <a-tab-pane key="1" tab="Tab 1"></a-tab-pane>
            <a-tab-pane key="2" tab="Tab 2"></a-tab-pane>
            <a-tab-pane key="3" tab="Tab 3"></a-tab-pane>
          </a-tabs> -->

      <!-- <ul class="up-fans">
            <li  class="user" @click="content='user'">
              <strong>关注数</strong>
              {{ publicData.follow }}
            </li>
            <li class="user">
              <strong>粉丝</strong>
              {{ publicData.fans }}
            </li>
          </ul> -->
      <!-- </template> -->
      <!-- </a-tabs> -->
    </main>
    <!-- 编辑信息 -->
    <a-modal
      v-model:visible="modalVisible"
      :title="dialog"
      @ok="dialog = ''"
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
          <li>
            <label for="birth">出生日期</label>
            <a-date-picker v-model:value="user.birth" />
          </li>
          <!-- <li>
                <label for="school">所在学校</label>

            </li> -->
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
import dayjs, { Dayjs } from "dayjs";
import { PlusOutlined, LoadingOutlined } from "@ant-design/icons-vue";
import type { UploadChangeParam, UploadProps } from "ant-design-vue";
import { message } from "ant-design-vue";
import useStore from "../../store";
const { user } = useStore();

let activeKey = ref(0);
let listData = ref(0);
// 个人数据
let publicData = ref({
  follow: 12,
  fans: 1,
  thumbsUp: 12,
  views: 12000,
});
// 昵称
let uname = ref("特调酒");
// 个签
let description = ref("do you want to build a snowman");

// tab栏
let tabArr = ref(["作品", "动态", "收藏"]);
// 修改用户信息
const editUserMess = () => {};
// 修改用户信息显示
let modal1Visible = ref(false);
const setModal1Visible = (visible: boolean) => {
  dialog.value = visible;
};
// 性别
let sex = ref("保密");
let options1 = ref(["男", "女", "保密"]);

// 出生日期
const dateFormat = "YYYY-MM-DD";
let birth = ref<Dayjs>(dayjs("2015-06-06", dateFormat));

//头像
let changeAvatar = ref(false);
let fileList = ref([]);
let loading = ref(false);
const changeAva = () => {
  dialog.value = "";
};
let AvatarDialogVisible = ref(false);
const imageUrl = ref<string>("");
const handleAva = () => {
  // alert("更换成功");
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
let modalVisible = computed(() => {
  if (dialog.value === "修改资料" || dialog.value === "更换头像") {
    return true;
  } else {
    return false;
  }
});
let upList = ref(["t", "a", "n", "a", "a", "a", "a"]);
let followers = ref(["q", "l", "y"]);

let active = ref(0);
// main里面的内容显示
let content = ref("video");
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
      line-height: 1rem;
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
:global(.modal span) {
  // line-height:100%;
}
:global(.modal .ant-btn span) {
  line-height: 100%;
  // padding:.3rem .5rem;
}
</style>
