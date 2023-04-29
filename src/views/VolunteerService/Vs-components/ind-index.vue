<template>
  <div class="content">
    <div class="up-container">
      <!-- 视频 -->
      <div class="vid"></div>
      <!-- 文字 -->
      <div class="txt">
        <el-icon class="icon"><Service /></el-icon>
        <p>赛会志愿者补充招募正在进行中！</p>
      </div>
      <div class="fo-container">
        <p>欢迎报名杭州2022年亚运会和亚残运会赛会志愿者</p>
        <span class="fo-content">
            <button class="fo-content" @click="PageOpen()">注册登录</button>
            <button class="fo-content" @click="ToPersonal">个人中心</button>
        </span>
      </div>
    </div>
  </div>
</template>

<script>
    /* eslint-disable */
export default {
  name: "ind-index",
  setup() {
    const PageOpen = () => {
      window, open("#/re-login");
    };
    const ToPersonal = ()=>{
        window.open('#/ind-center')
    }
    return{
      PageOpen,
        ToPersonal
    }
  },
};
</script>

<style lang="scss" scoped>
.content {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgb(255, 255, 255);
  .up-container {
    width: 80%;
    // display: flex;
    // justify-content: center;
    // align-items: center;
    .vid {
      width: 100%;
      height: 4rem;
      //background-color: black;
      display: block;
      margin-top: 0.5rem;
      background-image: url("@/assets/images/volunteer.jpg");
      background-size: 100%;
    }
    .txt {
      font-size: 16px;
      padding-top: 0.2rem;
      justify-content: center;
      align-items: center;
      display: flex;
      background-color: rgb(246, 247, 251);
      .icon {
        margin-right: 0.1rem;
      }
    }
    .fo-container {
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
      height: 2rem;
      width: 100%;
      margin-top: 0.7rem;
      margin-bottom: 1rem;
      background-color: rgb(247, 248, 252);
      button {
        font-size: 0.14rem !important;
      }
      p {
        margin-top: 0.2rem;
        font-size: 28px;
      }
      span {
        button {
          height: 30px;
          width: 80px;
          color: rgb(207, 203, 203);
          background-color: rgb(46, 151, 244);
          border: none;
        }
      }
    }
  }
}
</style>
