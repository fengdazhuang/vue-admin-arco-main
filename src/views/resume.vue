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
                    <h1 style="font-size: 32px" class="txt">简介预览</h1>
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
                                <el-form-item label="姓名" prop="name"
                                              :rules="[{required:true,message:'请输入姓名'}]"
                                >
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
                                <el-form-item label="照片" prop="photo" :rules="[{required:true,message:'请选择照片'}]">
                                        <div class="choose-cover">
                                            <div class="uploader-comp">
                                                <div id="block-choose" class="block-choose" :style="coverStyle">
                                                    <img :src="imgSrc"  style="width: 100px; height: 100px; align-self: center;" v-show="isImg"/>
                                                </div>
                                                <input type="file" @change="uploadCover()" @mouseover="mouseOver" @mouseout="mouseOut" ref="inputPic" class="inputPic" accept="image/jpeg,image/jpg,image/png">
                                            </div>
                                            <div style="margin-top: 10px; color: #9b9d9e;">请上传JPG、JPEG、PNG格式的封面图噢~</div>
                                        </div>
                                </el-form-item>
                            </el-col>
                            <el-col :span="24">
                                <el-form-item label="电子邮箱" prop="email" :rules="[{required:true,message:'请输入电子邮箱'}]">
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
                                <el-form-item label="性别" prop="sex" :rules="[{required:true,message:'请选择性别'}]">
                                    <el-radio-group v-model="userInfo.sex" class="ml-4">
                                        <el-radio label="1" size="large">男</el-radio>
                                        <el-radio label="2" size="large">女</el-radio>
                                    </el-radio-group>
                                </el-form-item>
                            </el-col>
                            <el-col :span="24">
                                <a-form-item prop="age" label="年龄"
                                             :rules="[{required:true,message:'请输入年龄'}]"
                                             :placeholder="请输入年龄"
                                             :validate-trigger="['change','input']"
                                >
                                    <el-input-number v-model="userInfo.age" :min="1" :style="{margin:'0 0 0 0.45rem'}" :max="10" @change="handleChange" />
                                </a-form-item>
                            </el-col>
                            <el-col :span="24">
                                <el-form-item label="职业" prop="profession" :rules="[{required:true,message:'请输入职业'}]">
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
                                <el-form-item label="证件类型" prop="certificateType" :rules="[{required:true,message:'请选择证件类型'}]">
                                    <el-select v-model="value" class="m-2" placeholder="请选择证件类型" size="large">
                                        <el-option
                                                v-for="item in certificateTypes"
                                                :key="item.value"
                                                :label="item.label"
                                                :value="item.value"
                                        />
                                    </el-select>
                                </el-form-item>
                            </el-col>
                            <el-col :span="24">
                                <el-form-item label="身份证号" prop="certificateNumber" :rules="[{required:true,message:'请输入身份证号'}]">
                                    <el-input
                                            v-model="userInfo.certificateNumber"
                                            placeholder="请输入身份证号"
                                            clearable
                                            :style="{ width: '5rem' }"
                                    >
                                    </el-input>
                                </el-form-item>
                            </el-col>
                            <el-col :span="24">
                                <el-form-item label="地址" prop="address" :rules="[{required:true,message:'请输入家庭地址'}]">
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
                                        <el-button @click="handleChangeInfo" type="primary" size="medium" class="re-login">
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
    import {modifyInfo} from'@/api/volunteer'

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
            const value = ref('')
            const certificateTypes = [
                {
                    value: '中华人民共和国居民身份证',
                    label: '中华人民共和国居民身份证',
                },
                {
                    value: '台湾居民往来大陆通行证',
                    label: '台湾居民往来大陆通行证',
                },
                {
                    value: '港澳居民来往内地通行证',
                    label: '港澳居民来往内地通行证',
                },
                {
                    value: '护照',
                    label: '护照',
                },
                {
                    value: '香港身份证',
                    label: '香港身份证',
                },
                {
                    value: '澳门身份证',
                    label: '澳门身份证',
                },
                {
                    value: '港澳居民居住证',
                    label: '港澳居民居住证',
                },
                {
                    value: '台湾居民居住证',
                    label: '台湾居民居住证',
                },
                {
                    value: '中华人民共和国外国人永久居留身份证',
                    label: '中华人民共和国外国人永久居留身份证',
                },

            ]
            const imgSrc = ref('@/assets/images/img1.jpg')
            const isImg = ref(false)
            const inputPic = ref(null)
            const activeIndex = ref("0");
            const handleSelect = (key, keyPath) => {
                console.log(key, keyPath);
            };
            const uploadCover = (e)=> {
                imgSrc.value='@/assets/images/img1.jpg'
                userInfo.photo = '@/assets/images/img1.jpg'
                isImg.value = true
            }
            const handleChangeInfo = async ()=>{
                const body = {
                    address:'111',
                    age:18,
                    certificateNumber:'111',
                    certificateType:'111',
                    comment:'111',
                    id:111,
                    name:'111',
                    photo:'111',
                    profession:'111',
                    sex:'1'
                }
                await modifyInfo(body)
            }
            return {
                activeIndex,
                handleSelect,
                userInfo,
                uploadCover,
                inputPic,
                certificateTypes,
                value,
                handleChangeInfo
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
