<template>
<!--    eslint-disable-->
  <div class="container">
    <img src="src\assets\game-img\bgc\banner.jpg" alt="" class="bgc-img" />
  </div>
  <div class="info-content">
    <div class="text-content">
      <div class="title">徐坤篮球</div>
      <div class="time-show">2022/04/07 16:32</div>
      <div class="line"></div>
    </div>
    <p>
      4月10日晚，2022-23赛季CBA季后赛打响，浙江东阳光解锁新主场黄龙体育馆。最终，凭借胡金秋和孙铭徽的出色发挥，浙江东阳光以103比81战胜山西男篮，顺利取得季后赛的开门红，一只脚跨进了八强的大门。
    </p>
    <img
      src="https://www.hangzhou2022.cn/xwzx/jdxw/ttxw/202304/W020230411614786011282.png"
      alt=""
      class="image"
    />
    <p>
      在诸暨结束常规赛后，浙江东阳光从本赛季季后赛开始，正式开启未来5年的黄龙主场之旅。时隔多年重新回到杭州作战，整支球队都显得非常兴奋，从第一节开始就火力全开，孙铭徽在外线接连命中三分，胡金秋则把对方的内线搅得天翻地覆，浙江东阳光迅速建立起两位数的优势，并一度把分差扩大到近20分。
    </p>
    <p>
      　尽管山西男篮随后在前NBA球员费尔德的带领下奋起反击，挽回了一些劣势，但无奈独木难支，其他球员手感不佳，无力挽回败局。当第四节开始，分差依旧在20分的时候，比赛的胜负已经失去了悬念，浙江东阳光也在最后5分钟换上了轮换阵容，锻炼替补队员。
      　　
    </p>
    <p>
      最终，浙江东阳光取得一场22分的大胜，胡金秋得到了全场最高的28分和12个篮板，孙铭徽入账25分、6个篮板和8次助攻，朱俊龙则砍下了15分和10个篮板的两双数据。全队抢下68个篮板球，创造了队史季后赛篮板球纪录。赛后，浙江东阳光主教练王博表示，球队在前场篮板球方面做得不错，是取胜的重要原因，希望队员保持专注，在接下去的比赛中不要放松。
    </p>
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
</template>

<script>
export default {
  name: "info",
};
</script>

<style lang="scss" scoped>
  @import '@/assets/style/global.scss';
.container {
  position: relative;
  // height: 100%;
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
</style>
