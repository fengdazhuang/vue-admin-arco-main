<template>
    <div class="basic-layout">
        <div class="header">
            <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" :ellipsis="false" @select="handleSelect">
                <el-menu-item>
                    <img class="bg-logo1" src="@/assets/images/logo1.png" alt="">
                </el-menu-item>
                <div class="flex-grow" />
                <el-menu-item index="0" class="common">
                    <router-link to="index">首页</router-link>
                </el-menu-item>
                <el-menu-item index="1" class="common">
                    <router-link to="information">资讯</router-link>
                </el-menu-item>
                <el-menu-item index="2" class="common">
                    <router-link to="competition">赛事</router-link>
                </el-menu-item>
                <el-menu-item @click="PageOpen()" index="3" class="common">
                    志愿服务
                </el-menu-item>
                <el-menu-item index="4" class="common">
                    <router-link to="backStage" >后台管理</router-link>
                </el-menu-item>
            </el-menu>
        </div>
        <div class="content">
            <router-view></router-view>
        </div>
        <div class="footer">
            <div class="footer-left">
                <!-- 文字 -->
                <ul class="mgs">
                    <li>2022年第19届亚运会组委会</li>
                    <li>中国浙江省杭州市上城区富春路150号昆仑中心B座</li>
                    <li>邮编：310016</li>
                    <li>邮箱：info@hangzhou2022.cn</li>
                </ul>
                <!-- 图标 -->
                <ul class="icon">
                    <li>
                        <img src="../assets/footer-icon/icon_wb_f.png" alt="" />
                    </li>
                    <li>
                        <img src="../assets/footer-icon/icon_wx_f.png" alt="" />
                    </li>
                    <li>
                        <img src="../assets/footer-icon/icon_dy_f.png" alt="" />
                    </li>
                    <li>
                        <img src="../assets/footer-icon/icon_tt_f.png" alt="" />
                    </li>
                </ul>
            </div>
            <div class="footer-right">
                <!-- 相关链接 -->
                <dl class="Re_link">
                    <dt><b>相关链接</b></dt>
                    <li><a href="https://olympics.com/en/">国际奥委会</a></li>
                    <li><a href="https://ocasia.org/">亚奥理事会</a></li>
                    <li><a href="http://www.olympic.cn/">中国奥委会</a></li>
                    <li><a href="https://www.sport.gov.cn/">国家体育总局</a></li>
                </dl>
                <!-- 历届赛事 -->
                <dl class="Pr_events">
                    <dt><b>历届赛事</b></dt>
                    <li><a href="#javascript">第18届2018年雅加达亚运会</a></li>
                    <li><a href="#javascript">第17届2014年仁川亚运会</a></li>
                    <li><a href="#javascript">第16届2010年广州亚运会</a></li>
                    <li><a href="#javascript">第15届2006年多哈亚运会</a></li>
                </dl>
                <!-- 商标专利 -->
                <div class="right-bot">
                    <p>
                        Copyright © The 19th Asian Games Hangzhou 2022 Organising Committee
                        All Rights Reserved
                    </p>
<!--                    eslint-disable-->
                    <p>备案号：浙ICP备11041366号-13   浙公网安备：33010302003135号</p>
                </div>
            </div>
        </div>
    </div>
</template>

  <script>
  /* eslint-disable */
import { ref } from 'vue'
export default {
    name: 'home',
    setup () {
        const activeIndex = ref('0')
        const handleSelect = (key, keyPath) => {
            console.log(key, keyPath)
        }
        const PageOpen = () => {
            window.open("#/ind-index");
        };
        return {
            activeIndex,
            handleSelect,
            PageOpen
        }
    }


}
  </script>

<style lang="scss">
@import '@/assets/style/global.scss';
.ser-btn{
  font-size: 18px;
  border: none;
  border-radius: 20px;
  background-color: rgb(255, 255, 255);
  height: 30px;
  width: 100px;
  margin-top: 0.3rem;
  margin-right: 0.1rem;
}
.ser-btn:hover{
  color: rgb(119, 165, 255);
  background-color: rgb(236, 245, 255);
}
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
              width: px2rem(72px);
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
</style>
