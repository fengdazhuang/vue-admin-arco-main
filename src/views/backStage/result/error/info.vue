<template>
    <div class="info-container">
        <div class="container">
            <img  src="src\assets\game-img\bgc\banner.jpg" alt="" class="bgc-img" />
        </div>
        <div class="info-content">
            <div class="text-content">
                <div class="title">{{ info.name }}</div>
                <div class="time-show">{{info.createTime}}</div>
                <div class="line"></div>
            </div>
            <div class="content" v-html="info.info">

            </div>
            <img
                    :src="info.picture || info.articleCover"
                    alt=""
                    class="image"
            />
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
                        <img src="@/assets/footer-icon/icon_wb_f.png" alt="" />
                    </li>
                    <li>
                        <img src="@/assets/footer-icon/icon_wx_f.png" alt="" />
                    </li>
                    <li>
                        <img src="@/assets/footer-icon/icon_dy_f.png" alt="" />
                    </li>
                    <li>
                        <img src="@/assets/footer-icon/icon_tt_f.png" alt="" />
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
export default {
  name: "info",
    setup(){
        const date = new Date()
      const info = JSON.parse(window.sessionStorage.getItem('item'))
        console.log('info',info)
        if (info.title) {
            info.name = info.title
        }
        if (info.content) {
            info.info = info.content
        }
        info.createTime = `${date.getFullYear()}年${date.getMonth() + 1}月${date.getDay()}日`
        return {
          info
        }
    }
};
</script>

<style lang="scss" scoped>
  //@import '@/assets/style/global.scss';
  .content {
    margin-top: 30px;
    width: 80%;
    text-indent: 2em;
    font-size: 20px;
    line-height: 40px;
  }
.container {
  position: relative;
   height: 100%;
  width: 100%;

  .bgc-img {
    display: block;
    width: 100%;
  }
}
.info-content {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 100%;
  .text-content {
    width: 80%;
    margin-top: 70px;
    .title {
      font-weight: 900;
      font-size: 50px;
      margin-bottom: 20px;

    }
    .time-show {
      font-size: 20px;
      line-height: 30px;
      color: #929292;
    }
    .line {
      width: 100%;
      height: 1px;
      background-color: rgb(210, 210, 210);
    }
  }
  p {
    display: inline-block;
    width: 80%;
    text-indent: 2em;
    font-size: 20px;
    line-height: 40px;
    margin-top: 50px;
  }
  .image {
    height: auto;
    width: auto;
    margin: px2rem(50px) 0 px2rem(50px) 0;
  }
}
li {
  list-style: none;
}
//.footer {
//  display: flex;
//  .footer-left {
//    width: 50%;
//    .mgs {
//      margin: 30px 0px 20px 120px;
//      li {
//        line-height: 35px;
//        margin: 10px;
//      }
//    }
//    .icon {
//      margin: 30px 0px 20px 120px;
//      display: flex;
//      li {
//        margin-right: 10px;
//      }
//    }
//  }
//  .footer-right {
//    .Re_link {
//      dt {
//        font-size: 16px;
//        font-weight: 900;
//        padding-bottom: 30px;
//      }
//    }
//
//  }
//}
  .footer {
    height: px2rem(242px);
    background-image: url("@/assets/footerbgc.png");
    background-position: center center;
    // background-repeat: no-repeat;
    background-size: cover;
    background-color: rgb(244, 244, 244);
    display: flex;
    justify-content: center;
    align-items: center;
    height: 500px;
    position: relative;
    .footer-left {
      font-size: 14px;
      width: 50%;
      height: 80%;
      position: relative;
      .mgs {
        display: block;
        position: absolute;
        margin: 30px 0px 20px 120px;

        li {
          line-height: 35px;
          margin: 10px;
        }
      }
      .icon {
        list-style: none;
        position: absolute;
        margin: 250px 0px 0px 130px;
        li {
          display: inline;
          margin-right: 10px;
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
      height: 500px;
      list-style: none;
      position: relative;
      .Re_link {
        position: absolute;
        margin: 100px 0px 0px 130px;
        dt {
          font-size: 16px;
          font-weight: 900;
          padding-bottom: 30px;
        }
        li {
          a {
            display: block;
            color: #000;
            padding-top: 15px;
          }
        }
      }
      .Pr_events {
        position: absolute;

        margin: 100px 0px 0px 430px;

        dt {
          font-size: 16px;
          font-weight: 900;
          padding-bottom: 30px;
        }
        li {
          a {
            display: block;
            color: #000;
            padding-top: 15px;
          }
        }
      }
      .right-bot {
        margin: 400px 200px 0 0;
        p {
          display: block;
          text-align: right;
          font-size: 12px;
          line-height: 30px;
          color: #929292;
        }
      }
    }
  }
</style>
