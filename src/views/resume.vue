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
            <div class="re-con">
                <div class="content">
                    <h1 style="font-size: 32px" class="txt">登录</h1>
                    <el-row :gutter="15">
                        <el-form
                                ref="elForm"
                                :model="userInfo"
                                :rules="rules"
                                size="medium"
                                label-width="100px"
                                label-position="left"
                        >
                            <el-col :span="24">
                                <el-form-item label="姓名" prop="name">
                                    <el-input
                                            v-model="userInfo.name"
                                            clearable
                                            placeholder="请输入姓名"
                                            :style="{ width: '5rem' }"
                                    >
                                    </el-input>
                                </el-form-item>
                            </el-col>
                            <el-col :span="24">
                                <el-form-item label="照片" prop="photo">
                                    <el-input
                                            v-model="userInfo.photo"
                                            clearable
                                            :style="{ width: '5rem' }"
                                    >
                                    </el-input>
                                </el-form-item>
                            </el-col>
                            <el-col :span="24">
                                <el-form-item label="电子邮箱" prop="email">
                                    <el-input
                                            v-model="userInfo.email"
                                            placeholder="请输入电子邮箱"
                                            clearable
                                            :style="{ width: '5rem' }"
                                    >
                                    </el-input>
                                </el-form-item>
                            </el-col>
                            <el-col :span="24">
                                <el-form-item label="性别" prop="sex">
                                    <el-radio-group v-model="userInfo.sex" class="ml-4">
                                        <el-radio label="1" size="large">男</el-radio>
                                        <el-radio label="2" size="large">女</el-radio>
                                    </el-radio-group>
                                </el-form-item>
                            </el-col>
                            <el-col :span="24">
                                <el-form-item label="年龄" prop="age">
                                    <el-input
                                            v-model="userInfo.age"
                                            placeholder="请输入年龄"
                                            clearable
                                            :style="{ width: '5rem' }"
                                    >
                                    </el-input>
                                </el-form-item>
                            </el-col>
                            <el-col :span="24">
                                <el-form-item label="职业" prop="profession">
                                    <el-input
                                            v-model="userInfo.profession"
                                            placeholder="请输入职业"
                                            clearable
                                            :style="{ width: '5rem' }"
                                    >
                                    </el-input>
                                </el-form-item>
                            </el-col>
                            <el-col :span="24">
                                <el-form-item label="身份证类型" prop="certificateType">
                                    <el-input
                                            v-model="userInfo.certificateType"
                                            placeholder="请选择证件类型"
                                            clearable
                                            :style="{ width: '5rem' }"
                                    >
                                    </el-input>
                                </el-form-item>
                            </el-col>
                            <el-col :span="24">
                                <el-form-item label="身份证号" prop="certificateNumber">
                                    <el-input
                                            v-model="userInfo.certificateNumber"
                                            placeholder="请输入身份号"
                                            clearable
                                            :style="{ width: '5rem' }"
                                    >
                                    </el-input>
                                </el-form-item>
                            </el-col>
                            <el-col :span="24">
                                <el-form-item label="地址" prop="address">
                                    <el-input
                                            v-model="userInfo.address"
                                            placeholder="请输入家庭地址"
                                            clearable
                                            :style="{ width: '5rem' }"
                                    >
                                    </el-input>
                                </el-form-item>
                            </el-col>
                            <div class="btn">
                                <el-col :span="12">
                                    <el-form-item label="" prop="field106">
                                        <el-button
                                                type="primary"
                                                size="medium"
                                                class="re-return"
                                                @click="OpenPage()"
                                        >
                                            返回
                                        </el-button>
                                    </el-form-item>
                                </el-col>
                                <el-col :span="12">
                                    <el-form-item label="" prop="field107">
                                        <el-button @click="handleLogin" type="primary" size="medium" class="re-login">
                                            提交
                                        </el-button>
                                    </el-form-item>
                                </el-col>
                            </div>

                        </el-form>
                    </el-row>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import {reactive, ref} from "vue";

    export default {
        name: "VolunteerService",
        setup() {
            const userInfo = reactive({
                email: 'admin@qq.com',
                password: 'admin',
                validateCode:'',
                key:'',
                name:'',
                photo:'',
                sex:'',
                age:'',
                profession:'',
                certificateType:'',
                certificateNumber:'',
                address:''
            });
            const activeIndex = ref("0");
            const handleSelect = (key, keyPath) => {
                console.log(key, keyPath);
            };
            return {
                activeIndex,
                handleSelect,
                userInfo
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
  .re-con {
    width: 100%;
    height: 7rem;
    background-color: rgb(255, 255, 255);
    display: flex;
    justify-content: center;
    // align-items: center;
    margin-top: 1rem;
    .content {
      width: 60%;
      height: 10rem;
      display: flex;
      position: relative;
      justify-content: center;
      align-items: center;
      flex-direction: column;
      .txt {
        position: absolute;
        left: 1.75rem;
        top: 0.5rem;
      }
      .btn {
        display: flex;
        justify-content: center;
        align-items: center;
        margin-top: 1rem;

        .re-return {
          width: 120px;
          height: 40px;
        }
        .re-login {
          width: 120px;
          height: 40px;
        }
      }
      .el-input {
        height: 50px;
      }
      .re-link {
        width: 80%;
        display: flex;
        position: absolute;
        justify-content: space-between;
        align-items: center;
        margin-top: 10px;
        left: 1.1rem;

        a {
          font-size: 16px;
          color: rgb(157, 220, 249);
        }
      }
    }
  }
</style>
