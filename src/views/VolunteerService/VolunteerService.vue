<template>
  <div class="basic-layout">
    <div class="header">
      <el-menu
        :default-active="activeIndex"
        class="el-menu-demo"
        mode="horizontal"
        :ellipsis="false"
        @select="handleSelect"
      >
        <el-menu-item>
          <img class="bg-logo1" src="@/assets/images/logo1.png" alt="" />
        </el-menu-item>
        <div class="flex-grow" />
        <el-menu-item index="0" class="common">
          <router-link to="ind-index">首页</router-link>
        </el-menu-item>
        <el-menu-item index="1" class="common">
          <router-link to="Ind-center">个人中心</router-link>
        </el-menu-item>
      </el-menu>
    </div>
    <div class="content">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";

export default {
  name: "VolunteerService",
  setup() {
    const activeIndex = ref("0");
    const handleSelect = (key, keyPath) => {
      console.log(key, keyPath);
    };
    return {
      activeIndex,
      handleSelect,
    };
  },
};
</script>

<style lang="scss">
@import "@/assets/style/global.scss";
.flex-grow {
  flex-grow: 0.7;
}
// .border {
//     border: ;
// }
.basic-layout {
  .header {
    height: px2rem(90px);
    .el-menu-demo {
      height: 100%;
      .bg-logo1 {
        width: px2rem(312px);
        height: px2rem(73px);
        margin-left: px2rem(45px);
      }
      .common {
        position: relative;
        top: 50%;
        height: px2rem(30px);
        font-size: px2rem(18px);
        border-radius: px2rem(15px);
        border: 0;
        transform: translateY(-50%);
        line-height: px2rem(30px);
        text-align: center;
        margin-right: px2rem(25px);
      }
      .is-active {
        background-color: #1d21a9;
        color: #fff !important;
      }
    }
  }
  .content {
    background-color: rgb(248, 248, 248);
  }
  .footer {
    height: px2rem(242px);
    background-image: url("../assets/footerbgc.png");
    background-position: center center;
    // background-repeat: no-repeat;
    background-size: cover;
    background-color: rgb(244, 244, 244);
    display: flex;
    justify-content: center;
    align-items: center;
    height: 5rem;
    position: relative;
    .footer-left {
      font-size: 14px;
      width: 50%;
      height: 80%;
      position: relative;
      .mgs {
        display: block;
        position: absolute;
        margin: px2rem(30px) 0px px2rem(20px) px2rem(120px);

        li {
          line-height: px2rem(35px);
          margin: px2rem(10px);
        }
      }
      .icon {
        list-style: none;
        position: absolute;
        margin: px2rem(250px) 0px 0px px2rem(130px);
        li {
          display: inline;
          margin-right: px2rem(10px);
          img {
            width: 50px;
            height: 50px;
          }
        }
      }
    }
    .footer-right {
      font-size: 14px;
      width: 50%;
      height: 5rem;
      list-style: none;
      position: relative;
      .Re_link {
        position: absolute;
        margin: px2rem(100px) 0px 0px px2rem(130px);
        dt {
          font-size: 16px;
          font-weight: 900;
          padding-bottom: px2rem(30px);
        }
        li {
          a {
            display: block;
            color: #000;
            padding-top: px2rem(15px);
          }
        }
      }
      .Pr_events {
        position: absolute;

        margin: px2rem(100px) 0px 0px px2rem(430px);

        dt {
          font-size: 16px;
          font-weight: 900;
          padding-bottom: px2rem(30px);
        }
        li {
          a {
            display: block;
            color: #000;
            padding-top: px2rem(15px);
          }
        }
      }
      .right-bot {
        margin: 4rem 2rem 0 0rem;
        p {
          display: block;
          text-align: right;
          font-size: 12px;
          line-height: px2rem(30px);
          color: #929292;
        }
      }
    }
  }
}
// 设置文字不能选中
body {
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}
</style>
