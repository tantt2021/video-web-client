<template>
  <div class="portrait" v-if="status">
    <div class="portrait-container">
      <div class="portrait-select" ref="select">
        <p>请上传图片</p>
        <input
          type="file"
          accept="image/jpeg,image/jpg,image/png"
          ref="input"
          @change="getInput"
        />
        <canvas class="portrait-canvas" ref="myCanvas" width="0" height="0">
        </canvas>
        <div class="curtain" v-show="curtain">
          <span></span>
        </div>
      </div>
      <div class="portrait-option">
        <div><button class="portrait-bnt-1" @click="cInput">上传</button></div>
        <div>
          <button class="portrait-bnt-2" @click="enlarge(true)">放大</button>
          <button class="portrait-bnt-2" @click="enlarge(false)">缩小</button>
        </div>
        <div>
          <button
            class="portrait-bnt-2"
            @mousedown="moveCol(true)"
            @mouseup="clearTimer"
            @mouseout="clearTimer"
          >
            上移
          </button>
          <button
            class="portrait-bnt-2"
            @mousedown="moveCol(false)"
            @mouseup="clearTimer"
            @mouseout="clearTimer"
          >
            下移
          </button>
          <button
            class="portrait-bnt-2"
            @mousedown="moveRow(true)"
            @mouseup="clearTimer"
            @mouseout="clearTimer"
          >
            左移
          </button>
          <button
            class="portrait-bnt-2"
            @mousedown="moveRow(false)"
            @mouseup="clearTimer"
            @mouseout="clearTimer"
          >
            右移
          </button>
        </div>
        <div class="portrait-warn">
          <p>{{ text }}</p>
        </div>
        <div>
          <button class="portrait-bnt-1" @click="cancel">取消</button>
          <button class="portrait-bnt-1" @click="updatePortrait">确定</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { portraitText } from "@/const/const.js";
import { setPortrait } from "@/api/apis/user.js";
export default {
  name: "Portrait",
  data() {
    return {
      status: false,
      image: null,
      width: 0,
      height: 0,
      x: 0,
      y: 0,
      text: "",
      multiple: 1,
      timer: null,
      curtain: false,
      updataFlag: false,
    };
  },
  mounted() {
    this.setPortrait();
  },
  methods: {
    setPortrait() {
      this.$bus.$on("$setPortrait", () => {
        this.status = true;
        this.text = portraitText[0];
      });
    },
    cInput() {
      if (this.updataFlag) return;
      this.$refs.input.click();
    },
    getInput() {
      if (this.$refs.input.files[0]) {
        const file = this.$refs.input.files[0];
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = (e) => {
          const base64 = e.target.result;
          const img = new Image();
          img.src = base64;
          img.onload = () => {
            this.width = img.width;
            this.height = img.height;
            this.image = img;
            this.paint();
            this.text = portraitText[1];
          };
        };
      }
    },
    paint() {
      const canvas = this.$refs.myCanvas;
      if (canvas.getContext) {
        let width = this.$refs.select.offsetWidth;
        let height = this.$refs.select.offsetHeight;
        if (this.width < this.height) {
          height = height * (this.height / this.width);
          canvas.width = width;
          canvas.height = height;
          this.y = (height - width) / 2;
          this.x = 0;
          canvas.style.top = -1 * this.y + "px";
          canvas.style.left = "0px";
        } else {
          width = width * (this.width / this.height);
          canvas.height = height;
          canvas.width = width;
          this.y = 0;
          this.x = (width - height) / 2;
          canvas.style.top = "0px";
          canvas.style.left = -1 * this.x + "px";
        }
        const ctx = canvas.getContext("2d");
        ctx.drawImage(this.image, 0, 0, width, height);
        this.height = height;
        this.width = width;
      }
    },
    enlarge(flag) {
      if (this.updataFlag) return;
      const vWidth = this.$refs.select.offsetWidth;
      let height = this.height;
      let width = this.width;
      if (flag) {
        this.text = portraitText[1];
        this.multiple += 0.1;
        this.y += vWidth * 0.05;
        this.x += vWidth * 0.05;
      } else {
        if (this.multiple == 1) {
          this.text = portraitText[2];
          return;
        }
        this.y -= vWidth * 0.05;
        this.y = this.y > 0 ? this.y : 0;
        this.x -= vWidth * 0.05;
        this.x = this.x > 0 ? this.x : 0;
        this.multiple -= 0.1;
      }
      width = this.multiple * this.width;
      height = this.multiple * this.height;
      if (this.multiple == 1) {
        if (width < height) this.x = 0;
        else this.y = 0;
      }
      this.rePaint(width, height);
    },
    rePaint(width, height) {
      const canvas = this.$refs.myCanvas;
      if (canvas.getContext) {
        canvas.width = width;
        canvas.height = height;
        canvas.style.left = -1 * this.x + "px";
        canvas.style.top = -1 * this.y + "px";
        const ctx = canvas.getContext("2d");
        ctx.drawImage(this.image, 0, 0, width, height);
      }
    },
    moveRow(flag) {
      if (this.updataFlag) return;
      this.timer = setInterval(() => {
        if (flag) {
          if (
            this.x + this.$refs.select.offsetWidth <
            this.$refs.myCanvas.width
          ) {
            this.text = portraitText[1];
            this.x += 5;
            this.x =
              this > this.$refs.myCanvas.width - this.$refs.select.offsetWidth
                ? this.$refs.myCanvas.width - this.$refs.select.offsetWidth
                : this.x;
          } else {
            this.text = portraitText[3];
            return;
          }
        } else {
          if (this.x > 0) {
            this.text = portraitText[1];
            this.x -= 5;
            this.x = this.x > 0 ? this.x : 0;
          } else {
            this.text = portraitText[3];
            return;
          }
        }
        this.$refs.myCanvas.style.left = -1 * this.x + "px";
      }, 35);
    },
    moveCol(flag) {
      if (this.updataFlag) return;
      this.timer = setInterval(() => {
        if (flag) {
          if (
            this.y + this.$refs.select.offsetWidth <
            this.$refs.myCanvas.height
          ) {
            this.text = portraitText[1];
            this.y += 5;
            this.y =
              this.y >
              this.$refs.myCanvas.height - this.$refs.select.offsetWidth
                ? this.$refs.myCanvas.height - this.$refs.select.offsetWidth
                : this.y;
          } else {
            this.text = portraitText[3];
            return;
          }
        } else {
          if (this.y > 0) {
            this.text = portraitText[1];
            this.y -= 5;
            this.y = this.y > 0 ? this.y : 0;
          } else {
            this.text = portraitText[3];
            return;
          }
        }
        this.$refs.myCanvas.style.top = -1 * this.y + "px";
      }, 35);
    },
    clearTimer() {
      clearInterval(this.timer);
    },
    cancel() {
      this.status = false;
      this.image = null;
      this.width = 0;
      this.height = 0;
      this.x = 0;
      this.y = 0;
      this.updataFlag = false;
    },
    getPortrait() {
      const canvas = this.$refs.myCanvas;
      const width = this.$refs.select.offsetWidth;
      if (canvas.getContext) {
        const ctx = canvas.getContext("2d");
        const imageData = ctx.getImageData(this.x, this.y, width, width);
        const portrait = document.createElement("canvas");
        portrait.height = width;
        portrait.width = width;
        const pctx = portrait.getContext("2d");
        pctx.putImageData(imageData, 0, 0);
        return portrait.toDataURL();
      }
    },
    updatePortrait() {
      if (this.updataFlag || !this.image) return;
      const portrait = this.getPortrait();
      const form = {
        id: this.$store.state.id,
        portrait: portrait,
      };
      this.updataFlag = true;
      this.curtain = true;
      this.text = portraitText[4];
      setPortrait(form, this.success, this.error);
    },
    success(Res) {
      if (Res.res == "0") {
        this.error(Res);
        return;
      }
      setTimeout(() => {
        this.curtain = false;
        this.updataFlag = false;
        this.$bus.$emit("warn", portraitText[5]);
        this.$bus.$emit("$getUser");
        this.cancel();
      }, 2000);
    },
    error(Err) {
      this.updataFlag = false;
      this.curtain = false;
      this.text = portraitText[1];
      console.log(Err);
      this.$bus.$emit("warn", portraitText[6]);
    },
  },
};
</script>

<style lang="scss" scoped>
.portrait {
  display: flex;
  position: absolute;
  top: 0rem;
  justify-content: center;
  align-items: center;
  background-color: rgba($color: black, $alpha: 0.5);
  height: 100%;
  width: 100%;
  z-index: 9999;
}
.portrait-container {
  display: flex;
  padding: 2rem;
  width: 36rem;
  height: 24rem;
  background-color: white;
  border-radius: 0.2rem;
}
.portrait-select {
  position: relative;
  height: 20rem;
  width: 20rem;
  border: 1px solid darkcyan;
  overflow: hidden;
  p {
    position: relative;
    top: 50%;
    color: darkcyan;
    transform: translateY(-50%);
  }
  input {
    display: none;
  }
  canvas {
    position: absolute;
  }
}
.portrait-option {
  width: calc(100% - 20rem);
  padding: 0rem 1rem;
  div {
    margin-bottom: 0.5rem;
  }
  button {
    margin: 0.1rem;
    height: 1.8rem;
    background-color: transparent;
    border: 1px solid darkcyan;
    color: darkcyan;
    transition-duration: 0.3s;
    &:hover {
      color: white;
      background-color: darkcyan;
    }
  }
}
.portrait-bnt-1 {
  width: 8.2rem;
}
.portrait-bnt-2 {
  width: 4rem;
}
.portrait-warn {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 6rem;
  color: black;
  opacity: 0.6;
}
.curtain {
  position: absolute;
  top: 0rem;
  left: 0rem;
  width: 100%;
  height: 100%;
  background-color: rgba($color: black, $alpha: 0.5);
  span {
    display: block;
    position: absolute;
    top: 50%;
    left: 50%;
    width: 5rem;
    height: 5rem;
    border: 0.4rem dodgerblue solid;
    border-right-color: transparent;
    border-radius: 2.5rem;
    animation: rotate 0.8s infinite;
  }
}
@keyframes rotate {
  0% {
    transform: translateX(-50%) translateY(-50%) rotateZ(0deg);
  }
  100% {
    transform: translateX(-50%) translateY(-50%) rotateZ(360deg);
  }
}
</style>