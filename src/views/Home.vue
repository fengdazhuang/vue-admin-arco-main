<template>
    <div class="basic-layout">
        <div class="header">
            <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" :ellipsis="false" @select="handleSelect">
                <el-menu-item>
                    <img class="bg-logo1"  src="@/assets/images/logo1.png" alt="">
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
                <el-menu-item index="5" class="common">
                    <router-link to="recognize" >运动员签到</router-link>
                </el-menu-item>
            </el-menu>
        </div>
        <div class="content">
            <router-view></router-view>
        </div>
        <div class="hzhb">
            <!-- 官方合作伙伴 -->
            <div class="title-gfhzhb">
                <img src="../assets/image/title_gfhzhb.png" alt="" />
            </div>
            <div class="main">
                <ul class="gfhzhb_lists">
                    <template v-for="item in FriendLinksList" :key="item.id">
                        <li v-if="item.status===1? 0:1">
                        <a :href="item.url" target="_blank">
                            <img :style="{width:'100%',height:'100%'}" :src="item.logo" alt="" />
                        </a>
                    </li>
                    </template>
<!--                    <li>-->
<!--                        <a href="http://www.10086.cn" target="_blank">-->
<!--                            <img src="../assets/image/zgydlogo.png" alt="" />-->
<!--                        </a>-->
<!--                    </li>-->
<!--                    <li>-->
<!--                        <a href="https://www.189.cn" target="_blank">-->
<!--                            <img src="../assets/image/zgdxlogo4.png" />-->
<!--                        </a>-->
<!--                    </li>-->

<!--                    <li>-->
<!--                        <a href="http://www.icbc.com.cn/icbc" target="_blank">-->
<!--                            <img src="../assets/image/logo_fsyh2.png" alt=""-->
<!--                            /></a>-->
<!--                    </li>-->
<!--                    <li>-->
<!--                        <a href="https://www.loongair.cn/#/web/home" target="_blank">-->
<!--                            <img src="../assets/image/logo_clhk2.png" alt=""-->
<!--                            /></a>-->
<!--                    </li>-->
<!--                    <li>-->
<!--                        <a href="https://www.alibabagroup.com/" target="_blank">-->
<!--                            <img src="../assets/image/logo_albb2.png" alt=""-->
<!--                            /></a>-->
<!--                    </li>-->
<!--                    <li>-->
<!--                        <a href="https://www.antfin.com/" target="_blank">-->
<!--                            <img src="../assets/image/logo_zfb2.png" alt=""-->
<!--                            /></a>-->
<!--                    </li>-->
<!--                    <li>-->
<!--                        <a href="http://www.361sport.com/" target="_blank">-->
<!--                            <img src="../assets/image/logo_3612.png" alt=""-->
<!--                            /></a>-->
<!--                    </li>-->
<!--                    <li>-->
<!--                        <a href="http://www.cpic.com.cn/" target="_blank">-->
<!--                            <img src="../assets/image/logo_tpybx3.png" alt=""-->
<!--                            /></a>-->
<!--                    </li>-->
<!--                    <li>-->
<!--                        <a href="https://www.dbappsecurity.com.cn" target="_blank">-->
<!--                            <img src="../assets/image/logo_ah3.png" alt=""-->
<!--                            /></a>-->
<!--                    </li>-->
<!--                    <li>-->
<!--                        <a href="https://bornan.sport/" target="_blank">-->
<!--                            <img src="../assets/image/logo_bnty2.png"-->
<!--                            /></a>-->
<!--                    </li>-->
                </ul>
                <div class="cl"></div>
            </div>
            <!-- 官方赞助商 -->
<!--            <div class="title-gfzzs">-->
<!--                <img src="../assets/image/title_gfzzs.png" alt="" />-->
<!--            </div>-->
<!--            <div class="main">-->
<!--                <ul class="gfzzs_lists">-->
<!--                    <li>-->
<!--                        <a href="https://www.yto.net.cn" target="_blank">-->
<!--                            <img src="../assets/image/logo_yt2.png" alt="" style="" />-->
<!--                        </a>-->
<!--                    </li>-->

<!--                    <li>-->
<!--                        <a href="https://www.wahaha.com.cn/#/" target="_blank">-->
<!--                            <img src="../assets/image/logo_wahaha2.png" alt="" />-->
<!--                        </a>-->
<!--                    </li>-->
<!--                    <li>-->
<!--                        <a href="https://www.hikvision.com/cn/" target="_blank">-->
<!--                            <img src="../assets/image/logo_hkws2.png" alt="" />-->
<!--                        </a>-->
<!--                    </li>-->
<!--                    <li>-->
<!--                        <a href="https://www.canon.com.cn/" target="_blank">-->
<!--                            <img src="../assets/image/logo_canon3.png" alt="" />-->
<!--                        </a>-->
<!--                    </li>-->
<!--                </ul>-->
<!--                <div class="cl"></div>-->
<!--            </div>-->
<!--            <div class="all_zzs">-->
<!--                <a href="" target="_blank" class="hzhb-qbzzqy">-->
<!--                    <img src="../assets/image/hzhb_qbzzqy.png" alt="" />-->
<!--                </a>-->
<!--                <a href="" target="_blank" class="hzhb-swfw">-->
<!--                    <img src="../assets/image/hzhb_swfw.png" alt="" />-->
<!--                </a>-->
<!--            </div>-->
            <!-- 特许经营 -->
            <div class="title-txjy">
                <img src="../assets/image/title_txjy.png" alt="" />
            </div>
            <div class="main">
                <ul class="txjy_lists">
                    <li>
                        <a
                                href="https://hzyyh.tmall.com/?spm=a1z10.1-b-s.1997427721.d4918089.5db0257eiVsQT7"
                                target="_blank"
                        >
                            <img src="../assets/image/04hzhb_qjd.jpg" alt="" />
                        </a>
                    </li>
                    <li style="margin-right: 0">
                        <a href="http://tx.hangzhou2022.cn" target="_blank">
                            <img src="../assets/image/04hzhb_fwcx.jpg" alt="" />
                        </a>
                    </li>
                </ul>
                <div class="cl"></div>
            </div>
            <div class="main">
                <div class="hzhb-line"></div>
            </div>
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
  import {reactive, ref} from 'vue'
import {getFriendLinks} from '@/api/system'
  import {useRouter} from "vue-router";

export default {
    name: 'home',
    setup () {
        const router = useRouter()
        let FriendLinksList = ref([])
        const activeIndex = ref('0')
        const handleToIndex = ()=>{
            console.log(111)
            router.push('/')
        }
        const handleSelect = (key, keyPath) => {
            console.log(key, keyPath)
        }
        const handleGetFriendLinks = async ()=>{
            const {data} = await getFriendLinks()
            FriendLinksList.value = data
            console.log('FriendLinksList.value',FriendLinksList.value)
            console.log('FriendLinksList',FriendLinksList.value)
        }
        handleGetFriendLinks()
        const PageOpen = () => {
            window.open("#/ind-index");
        };
        return {
            activeIndex,
            handleSelect,
            PageOpen,
            FriendLinksList,
            handleToIndex
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
              //width: px2rem(72px);
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
.hzhb {
  color: #000000;
  font-size: 14px;
  font-family: "microsoft yahei", Arial, Helvetica, sans-serif;
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
  transition: all 0.4s ease 0s;
  margin: 0;
  padding: 0;
  font-style: normal;
  font-weight: normal;
  outline: none;
  background: #f4f4f4;
  padding-top: 2.9%;
  .title-gfhzhb {
    padding: 0;
    font-style: normal;
    font-weight: normal;
    outline: none;
    user-select: none;
    width: auto;
    margin: 0 auto 3.4%;
    img {
      color: #000000;

      font-style: normal;
      font-weight: normal;
      user-select: none;
      border: none;
      outline: none;
      display: block;
      width: 12.96% !important;
      height: auto;
      margin: 0 auto 3.4%;
    }
  }
  .main {
    padding: 0;
    font-style: normal;
    font-weight: normal;
    outline: none;
    width: 1400px;
    margin: 0 auto;
    position: relative;
    padding-bottom: 3.9%;
    border-bottom: none;
    .gfhzhb_lists {
      margin: 0;
      padding: 0;
      font-style: normal;
      font-weight: normal;
      list-style: none;
      width: 1230px;
      margin-left: 100px;
      text-align: center;
      li {
        margin: 0;
        padding: 0;
        font-style: normal;
        font-weight: normal;
        list-style: none;
        width: 220px;
        height: 105px;
        border: 1px solid #dad7e6;
        text-align: center;
        overflow: hidden;
        background: #fff;
        margin-bottom: 20px;
        float: none;
        display: inline-block;
        margin-right: 30px;
        a {
          display: inline-block;
          width: 100%;
          height: 100%;
        }
      }
    }
    .cl {
      margin: 0;
      padding: 0;
      font-style: normal;
      font-weight: normal;
      outline: none;
      clear: both;
      height: 0;
    }
  }
  .title-gfzzs {
    padding: 0;
    font-style: normal;
    font-weight: normal;
    outline: none;
    user-select: none;
    width: auto;
    margin: 0 auto 3.4%;
    img {
      user-select: none;
      border: none;
      vertical-align: top;
      outline: none;
      display: block;
      width: 10.78% !important;
      height: auto;
      margin: 0 auto 3.4%;
    }
  }
  .gfzzs_lists {
    margin: 0;
    padding: 0;

    list-style: none;
    font-size: 0;
    text-align: center;
    li {
      font-size: 0;
      margin: 0;
      padding: 0;

      list-style: none;
      width: 183px;
      height: 99px;
      border: 1px solid #dad7e6;
      text-align: center;
      overflow: hidden;
      background: #fff;
      margin-right: 19px;
      margin-bottom: 16px;
      display: inline-block;
    }
  }
  .all_zzs {
    padding: 0;

    outline: none;
    display: block;
    width: 100%;
    margin: 0 auto 3.9%;
    text-align: center;
    font-size: 0;
    .hzhb-qbzzqy {
      text-align: center;
      font-size: 0;
      transition: all 0.4s ease 0s;
      color: #000000;
      text-decoration: none;
      outline: none;
      display: inline-block;
      img {
        text-align: center;
        font-size: 0;
        color: #000000;
        transition: all 0.4s ease 0s;
        border: none;
        vertical-align: top;
        outline: none;
        display: block;
        width: 100%;
        margin: 0;
        height: auto;
      }
    }
    .hzhb-swfw {
      text-align: center;
      font-size: 0;
      transition: all 0.4s ease 0s;
      color: #000000;
      text-decoration: none;
      outline: none;
      display: inline-block;
      img {
        text-align: center;
        font-size: 0;
        color: #000000;
        transition: all 0.4s ease 0s;
        border: none;
        outline: none;
        display: block;
        width: 100%;
        margin: 0;
        height: auto;
      }
    }
  }
  .title-txjy {
    padding: 0;

    outline: none;
    user-select: none;
    width: auto;
    margin: 0 auto 3.4%;
    img {
      user-select: none;
      transition: all 0.4s ease 0s;
      border: none;
      vertical-align: top;
      outline: none;
      display: block;
      width: 8.69% !important;
      height: auto;
      margin: 0 auto 3.4%;
    }
  }
  .main {
    padding: 0;

    outline: none;
    width: 1400px;
    margin: 0 auto;
    position: relative;
    padding-bottom: 3.9%;
    border-bottom: none;
    ul {
      margin: 0;
      padding: 0;
      list-style: none;
      font-size: 0;
      text-align: center;
      li {
        font-size: 0;
        margin: 0;
        padding: 0;
        list-style: none;
        width: 184px;
        height: 100px;
        margin-right: 40px;
        display: inline-block;
      }
    }
  }
}
</style>
