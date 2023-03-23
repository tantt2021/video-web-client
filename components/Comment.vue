<template>
  <div class="comment">
    <!-- 别人的评论 -->
    <div class="commentSection">
      <ul>
        <li v-for="(comment, index) in commentList" :key="comment._id" class="independentArea">
          <div class="whole">
            <div class="avatar">
              
              <img :src="comment.avatar" alt="" @click="navigateTo('/user/self')"/>
            </div>
            <h4>{{ comment.username }}</h4>
            <p>{{ comment.commentContent }}</p>
            <label>{{ rightTime(comment.commentTime) }}</label>
            <label class="operate-comment">
              <like-two-tone two-tone-color="#44bc87" />
              <em>999</em>

              <dislike-outlined />
              <em>333</em>
            </label>
            <button @click="(tempNum = index), (replyToName = comment.username)" class="reply">
              回复
            </button>

          </div>
          <!-- 评论的评论 -->
          <ul class="sonComment">
            <li v-for="sonComment in comment.discussList" :key="sonComment._id">
              <div class="avatar">
                <img :src="sonComment.avatar" alt="" @click="navigateTo('/user/self')"/>
              </div>

              <h4>
                {{ sonComment.username }}
                <span :style="{
                  color: 'skyblue',
                }">
                  回复
                </span>
                {{ sonComment.replyObject }}
              </h4>
              <p>{{ sonComment.commentContent }}</p>

              <label>{{ sonComment.commentTime }}</label>
              <label class="operate-comment">
                <like-two-tone two-tone-color="#44bc87" />
                <em>999</em>

                <dislike-outlined />
                <em>333</em>
              </label>
              <!-- <label
                @click="like(sonComment, index2)"
                :class="{ active2: sonComment.isLike }"
                ></label
              >
              {{ sonComment.likeNum }} -->
              <button @click="(tempNum = index), (replyToName = sonComment.username)" class="reply">
                回复
              </button>
            </li>
          </ul>

          <!-- 准备发表对评论的评论 -->
          <div class="mycomment" v-if="tempNum === index">
            <div class="reviewers">
              <div class="avatar">
                <img src="../assets/img/yatou.png" alt="avatar" />
              </div>
              <a-textarea v-model:value="textarea2" placeholder="畅所欲言~" allow-clear :style="{ width: '80%' }" />

            </div>
            <button class="functionButton">表情</button>
            <button class="functionButton">图片</button>
            <button @click="commit('1级评论')" class="commit">
              发送
            </button>

          </div>
        </li>
      </ul>
      <h5 style="color: skyblue">已经到底了...</h5>
    </div>
  </div>
</template>

<script>
import dayjs from "dayjs";
import { LikeTwoTone, DislikeOutlined } from '@ant-design/icons-vue';

export default {
  props: ["articleId", "father"],
  components: {
    LikeTwoTone, DislikeOutlined,
  },
  activated() {
    // this.initComment();
  },
  mounted() {
    // this.initComment();
    // this.getUserMess();
  },
  data() {
    return {
      username: "",
      title: "",
      html: "",
      email: "",
      titleArr: [],
      countArr: [],
      textarea1: "",
      textarea2: "",
      showEditCommentOthers: false,
      commentList: [
        {
          avatar: new URL('../assets/img/yatou.png', import.meta.url).href,
          username: "tantt",
          commentTime: "2022",
          commentContent: "这是评论1",
          discussList: [
            {
              avatar: new URL('../assets/img/yatou.png', import.meta.url).href,
              username: "tantt",
              commentTime: "2023.3.22 19:35",
              commentContent: "这是评论1",
              replyObject: "tantt",
            }
          ]
        },
        {
          avatar: new URL('../assets/img/yatou.png', import.meta.url).href,
          username: "tantt",
          commentTime: "2022",
          commentContent: "这是评论1",
          discussList: [
            {
              avatar: new URL('../assets/img/yatou.png', import.meta.url).href,
              username: "tantt",
              commentTime: "2022",
              commentContent: "这是评论1",
              replyObject: "tantt",
            }
          ]
        }
      ],
      tempNum: Number,
      replyToName: "",
      imgUrl: "../assets/img/yatou.png",
      logo: false,
    };
  },
  // watch: {
  //   commentList: {
  //     deep: true,
  //     handler(newV, oldV) {},
  //   },
  // },
  computed: {
    rightTime() {
      return function (time) {
        return dayjs(time).format("YYYY-MM-DD HH:mm");
      };
    },
    avatar() {
      var temp = "";
      if (this.commentList.length === 0) temp = this.imgUrl; //没有评论
      else {
        for (let i = 0; i < this.commentList.length; i++) {
          if (this.commentList[i].discussList.length > 0) {
            //有子评论
            for (let j = 0; j < this.commentList[i].discussList.length; j++) {
              if (this.commentList[i].username === this.username) {
                //有自己的评论  自己的评论是一级评论
                temp = this.commentList[i].avatar;
                // break;
              } else if (
                this.commentList[i].discussList[j].username === this.username
              ) {
                //自己的评论是二级评论
                return this.commentList[i].discussList[j].avatar;
                // break;
              } else {
                // 有评论但没有自己的
                // this.logo = true;
                temp = this.imgUrl;
              }
            }
          } else {
            //没有子评论
            if (this.commentList[i].username === this.username) {
              //有自己的评论  自己的评论是一级评论
              temp = this.commentList[i].avatar;
              break;
            } else {
              temp = this.imgUrl;
            }
          }
        }
      }
      return temp;
    },
    // fold(){
    //   return
    // }
  },
  methods: {
    async commit(current) {
      if (this.avatar === this.imgUrl) {
        this.imgUrl = "";
      }
      if (this.father !== "leaveWord") {
        if (current === "1级评论") {
          if (
            this.username === "" ||
            this.email == "" ||
            this.textarea1.trim() === ""
          ) {
            this.$message({
              message: "请填写完整信息",
              type: "warning",
            });
            this.imgUrl = "../assets/img/yatou.png";
          } else {
            await axios
              .post(`http://127.0.0.1:3000/addComment`, {
                articleId: this.articleId,
                commentContent: this.textarea1,
                username: this.username,
                email: this.email,
                commentTime: this.rightTime(Date.now()),
                // likeNum: 0,
                replyNum: 0,
                state: 1,
                parentId: 0,
                // isLike: false,
                avatar: this.avatar,
              })
              .then((res) => {
                console.log(res);
                this.textarea1 = "";
                this.$message({
                  message: "发表评论成功",
                  type: "success",
                });
                this.imgUrl = "../assets/img/yatou.png";
              })
              .catch(function (err) {
                console.log(err);
              });

            this.initComment();
          }
        } else {
          if (
            this.username === "" ||
            this.email === "" ||
            this.textarea2.trim() === ""
          ) {
            this.$message({
              type: "warning",
              message: "请填写完整信息",
            });
          } else {
            console.log("2级评论,对评论的回复");
            console.log(current);
            await axios
              .post(`http://127.0.0.1:3000/addComment`, {
                articleId: this.articleId,
                commentContent: this.textarea2,
                username: this.username,
                email: this.email,
                commentTime: this.rightTime(Date.now()),
                // likeNum: 0,
                replyNum: 0,
                state: 1,
                parentId: 1,
                // isLike: false,
                replyObject: this.replyToName,
                fatherId: current._id,
                avatar: this.avatar,
              })
              .then((res) => {
                console.log(res);
                this.initComment();
                this.imgUrl = "../assets/img/yatou.png";
              })
              .catch((err) => {
                console.log(err);
              });
            this.tempNum = Number;
            this.textarea2 = "";
          }
        }
      } else {
        // 留言
        if (current === "1级评论") {
          if (
            this.username === "" ||
            this.email == "" ||
            this.textarea1.trim() === ""
          ) {
            this.$message({
              message: "请填写完整信息",
              type: "warning",
            });
            this.imgUrl = "../assets/img/yatou.png";
          } else {
            //留言
            await axios
              .post(`http://127.0.0.1:3000/addLeaveword`, {
                commentContent: this.textarea1,
                username: this.username,
                email: this.email,
                commentTime: this.rightTime(Date.now()),
                // likeNum: 0,
                replyNum: 0,
                state: 1,
                parentId: 0,
                avatar: this.avatar,
                // isLike: false,
              })
              .then((res) => {
                console.log("发布成功", res);
                this.textarea1 = "";

                this.$message({
                  message: "发表评论成功",
                  type: "success",
                });
                this.imgUrl = "../assets/img/yatou.png";
              })
              .catch(function (err) {
                console.log(err);
              });

            this.initComment();
          }
        } else {
          if (
            this.username === "" ||
            this.email === "" ||
            this.textarea2.trim() === ""
          ) {
            this.$message({
              type: "warning",
              message: "请填写完整信息",
            });
          } else {
            console.log("2级评论,对评论的回复");
            console.log(current);
            await axios
              .post(`http://127.0.0.1:3000/addLeaveword`, {
                commentContent: this.textarea2,
                username: this.username,
                email: this.email,
                commentTime: this.rightTime(Date.now()),
                // likeNum: 0,
                replyNum: 0,
                state: 1,
                parentId: 1,
                // isLike: false,
                replyObject: this.replyToName,
                fatherId: current._id,
                avatar: this.avatar,
              })
              .then((res) => {
                console.log(res);
                this.initComment();
                this.imgUrl = "../assets/img/yatou.png";
              })
              .catch((err) => {
                console.log(err);
              });
            this.tempNum = Number;
            this.textarea2 = "";
          }
        }
      }

      // await axios.post(`http://127.0.0.1:3000/addComment`,{
      // })
    },
    async initComment() {
      if (this.father !== "leaveWord") {
        await axios
          .post(`http://127.0.0.1:3000/comments`, {
            articleId: this.articleId,
            // commentContent: this.commentContent,
            // username: this.username,
          })
          .then(
            (response) => {
              console.log("请求评论成功", response.data);
              if (response.data.msg === "hasComment")
                this.commentList = response.data.res;
              this.$emit("get", this.commentList.length);
              console.log(this.commentList);
            },
            (error) => {
              console.log(error.message);
            }
          );
      } else {
        await axios.get(`http://127.0.0.1:3000/getLeaveword`).then(
          (response) => {
            console.log("请求留言成功", response.data);
            if (response.data.msg === "hasleaveword")
              this.commentList = response.data.res;
            console.log(this.commentList);
          },
          (error) => {
            console.log(error.message);
          }
        );
      }
    },
    // getUserMess() {
    //   if (this.$store.state.user.username) {
    //     this.username = this.$store.state.user.username;
    //     this.email = localStorage.getItem("email");
    //   }
    // },
    orFold(index, list) {
      if (list.length > 3) this.fold[index] = true;
      else this.fold[index] = false;
    },
  },
};
</script>

<style scoped lang="scss">
* {
  /* 解决边距合并 */
  /* overflow: hidden; */
}

.avatar {
  height: 2rem;
  width: 2rem;
  border-radius: 5px;
  overflow: hidden;
  display: inline-block;
  margin-right: 25px;
  float: left;
  margin-right: .5rem;
}

.avatar img {
  width: 100%;
  height: 100%;
}

.commentSection h5 {
  text-align: center;
  font-weight: 400;
}

.comment {
  width: 100%;
  /* margin: 10px 0 20px 7vw; */
  // margin: 15px 0;
  /* height: 20%; */
  background-color: #fff;
  // padding: 20px;
  /* box-shadow: 0 0 7px 2px #d0d0d0; */
  opacity: 0.9;
  border-radius: 8px;
  animation: refresh1 0.5s;
}

.comment h2 {
  margin-bottom: 15px;
}

.comment .commentarea {
  margin: 15px 0;
  border: 1px solid #000;
  position: relative;
  min-height: 64px;
  box-sizing: border-box;
  line-height: 32px;
  font-size: 14px;
  /* resize: both; 可调整大小*/
  word-break: break-word;
  /*断行规则*/
  -webkit-user-modify: read-write;
  /* 可在div中写数据 */
  /* overflow-wrap: break-word; */
  padding: 10px;
  border-radius: 8px;
}

.functionButton {
  margin: 10px 10px;
  border: none;
  background-color: transparent;
  
}

.functionButton:hover {
  color: skyblue;
  cursor: pointer;
}

.commit {
  float: right;
  margin: 5px 0px;
}


.reviewers {
  margin-bottom: 15px;
  margin-left: 15px;
  margin-top: 5px;
}

.mycomment {
  border-radius: 8px;
  padding: 10px;
  margin: 10px;
}

.commentSection {
}

.commentSection ul {
  padding: 0 15px;
  margin: 10px 0;
}

.independentArea {
  // border-top: 1px solid #ddd;
  animation: move3 0.5s;

  p {
    font-weight: 400;
    font-size: 1rem;
  }
}

.commentSection h5,
h4 {
  margin-bottom: 10px;
  margin-top: 5px;
}

.commentSection label {
  /* color: blue; */
  font-family: "Linearicons-Free";
  user-select: none;
  margin-right: 5px;
  color: #b3b3b3;
  font-weight: 400;
  font-size: .8rem;
}

.commentSection .reply {
  float: right;
  outline: none;
  border: none;
  background-color: transparent;
  color: #44bc87;
}

.commentSection p {
  // margin: 15px 0;
  padding-left: 2.5rem;
  margin: 0;
}

/* .active2 {
  user-select: none;
  color: #44bc87 !important;
  animation: scale 0.3s;
} */
.sonComment {
  /* background-color: #ddd; */
  border-left: 5px solid #ddd;
  padding: 15px 0;
  .operate-comment {
    margin-left: 1rem;
    white-space: nowrap;
    span~span {
      margin-left: 1rem;
    }
  }
}

.sonComment li {
  animation: move3 0.5s;
}

.whole {
  margin: 1rem 0;

  .operate-comment {
    margin-left: 1rem;
    white-space: nowrap;
    span~span {
      margin-left: 1rem;
    }
  }
}

@media screen and (max-width: 1518px) {
  .comment {
    width: 100%;
    text-align: left;
    // margin: 20px auto;
  }
}
</style>
