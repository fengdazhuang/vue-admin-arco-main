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
        <div class="content" :style="{height:'13rem'}">
            <div class="re-con">
                <div class="content">
                    <h1 style="font-size: 32px" class="txt">简介预览</h1>

                    <el-button type="primary" class="position"  @click="handleEdit" v-show="isBtn">启动编辑</el-button>
                    <el-row :gutter="15">
                        <el-form
                                ref="elForm"
                                :model="userInfo"
                                size="medium"
                                label-width="100px"
                                label-position="left"
                        >
                            <el-col :span="24">
                                <el-form-item label="姓名" prop="name"
                                              :rules="[{required:true,message:'请输入姓名'}]"
                                >
                                    <el-input
                                            :disabled="isEdit"
                                            v-model="userInfo.name"
                                            clearable
                                            placeholder="请输入姓名"
                                            :style="{ width: '5rem' }"
                                    >
                                    </el-input>
                                </el-form-item>
                            </el-col>
                            <el-col :span="24">
                                <el-form-item label="照片" >
                                        <div class="choose-cover">
                                            <div class="uploader-comp">
                                                <div id="block-choose" class="block-choose" :style="coverStyle">
                                                    <img :src="userInfo.photo" style="width: 100px; height: 100px; align-self: center;" v-show="!isImg" >
                                                    <img :src="imgSrc"   style="width: 100px; height: 100px; align-self: center;" v-show="isImg"/>

                                                  </div>
                                                <input type="file" :disabled="isEdit" @change="uploadCover()" @mouseover="mouseOver" @mouseout="mouseOut" ref="inputPic" class="inputPic" accept="image/jpeg,image/jpg,image/png">
                                            </div>
                                            <div style="margin-top: 10px; color: #9b9d9e;">请上传JPG、JPEG、PNG格式的封面图噢~</div>
                                        </div>
                                </el-form-item>
                            </el-col>
                            <el-col :span="24">
                                <el-form-item label="志愿者编号" prop="id">
                                    <el-input
                                            :disabled="true"
                                            v-model="userInfo.id"
                                            clearable
                                            :style="{ width: '5rem' }"
                                    >
                                    </el-input>
                                </el-form-item>
                            </el-col>
                            <el-col :span="24">
                                <el-form-item label="电子邮箱" prop="email" :rules="[{required:true,message:'请输入验证码'},{ pattern: reg_Email, message: ' 请填写您常用的电子邮箱。邮箱最多80个字符，只能由字母、数字、半角句号、中划线或下划线组成 ', trigger: ['blur', 'change'] }]">
                                    <el-input
                                            :disabled="isEdit"
                                            v-model="userInfo.email"
                                            placeholder="请输入电子邮箱"
                                            clearable
                                            :style="{ width: '5rem' }"
                                    >
                                    </el-input>
                                </el-form-item>
                            </el-col>
                            <el-col :span="24">
                                <el-form-item :disabled="isEdit" label="性别" prop="sex" :rules="[{required:true,message:'请选择性别'}]">
                                    <el-radio-group v-model="userInfo.sex" class="ml-4">
                                        <el-radio :label="1" size="large">男</el-radio>
                                        <el-radio :label="0" size="large">女</el-radio>
                                    </el-radio-group>
                                </el-form-item>
                            </el-col>
                            <el-col :span="24">
                                <a-form-item prop="age" label="年龄"
                                             :rules="[{required:true,message:'请输入年龄'}]"
                                             placeholder="请输入年龄"
                                             :validate-trigger="['change','input']"
                                >
                                    <el-input-number :disabled="isEdit" v-model="userInfo.age" :min="1" :style="{margin:'0 0 0 0.45rem'}" :max="100" @change="handleChange" />
                                </a-form-item>
                            </el-col>
                            <el-col :span="24">
                                <el-form-item label="职业" prop="profession" :rules="[{required:true,message:'请输入职业'}]">
                                    <el-input
                                            :disabled="isEdit"
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
                                    <el-select :disabled="isEdit" v-model="userInfo.certificateType" class="m-2" placeholder="请选择证件类型" size="large">
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
                                            :disabled="isEdit"
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
                                            :disabled="isEdit"
                                            v-model="userInfo.address"
                                            placeholder="请输入家庭地址"
                                            clearable
                                            :style="{ width: '5rem' }"
                                    >
                                    </el-input>
                                </el-form-item>
                            </el-col>
                            <el-col :span="24">
                                <el-form-item label="简介" prop="comment" :rules="[{required:true,message:'请输入简介'}]">
                                    <el-input
                                            :disabled="isEdit"
                                            v-model="userInfo.comment"
                                            placeholder="请输入简介"
                                            clearable
                                            :style="{ width: '5rem' }"
                                    >
                                    </el-input>
                                </el-form-item>
                            </el-col>
                            <div class="btn">
                                <el-col :span="12">
                                    <el-form-item>
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
                                        <el-button @click="handleChangeInfo" v-show="isBtn" type="primary" size="medium" class="re-login">
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
        <div class="footer">
            <Bottom></Bottom>
        </div>
    </div>
</template>

<script>
    /* eslint-disable */
    import axios from 'axios'
    import {reactive, ref,getCurrentInstance} from "vue";
    import {useRouter} from "vue-router";
    import {modifyInfo,queryVolunteer} from'@/api/volunteer'
    import Bottom from '@/views/VolunteerService/Vs-components/footer.vue'
    import { Message } from '@arco-design/web-vue';
    import {getVolDirections} from "@/api/volunteer";
    import {regEmail} from '@/api/regret'

    export default {
        name: "VolunteerService",
        components:{Bottom},
        setup() {
            const ctx1 = getCurrentInstance()
            const router = useRouter()
            const  reg_Email = regEmail
            const {ctx} = getCurrentInstance()
            const elForm = ref(null)
            const isBtn = ref(true)
            let volunteerInfo = reactive(JSON.parse(window.sessionStorage.getItem('volunteerInfo')))
            const nowVolunteerInfo = ref()
            let userInfo = ref({
                email: '',
                password: '',
                validateCode:'',
                key:'',
                name:'',
                photo:'',
                sex:'',
                age:'',
                profession:'',
                certificateType:'',
                certificateNumber:'',
                address:'',
                comment:'',
                id:'',
                volunteerType:''
            });
          const imgSrc = ref('')
            const handleQueryVolunteer = async ()=>{
                const useParams = {
                    params:{
                        id:volunteerInfo.id
                    }
                }
                const {data} = await queryVolunteer(useParams)
                nowVolunteerInfo.value = data
                console.log()
                userInfo.value = {
                    email: nowVolunteerInfo.value.email,
                    password: nowVolunteerInfo.value.password,
                    validateCode:'',
                    key:'',
                    name:nowVolunteerInfo.value.name,
                    photo:nowVolunteerInfo.value.photo,
                    sex:nowVolunteerInfo.value.sex,
                    age:nowVolunteerInfo.value.age,
                    profession:nowVolunteerInfo.value.profession,
                    certificateType:nowVolunteerInfo.value.certificateType,
                    certificateNumber:nowVolunteerInfo.value.certificateNumber,
                    address:nowVolunteerInfo.value.address,
                    comment:nowVolunteerInfo.value.comment,
                    id:nowVolunteerInfo.value.id,
                    volunteerType:nowVolunteerInfo.value.volunteerType

                };
                if (data.process ===2 || data.process ===3) {
                    isBtn.value = false
                }
                // userInfo = data
            }
            handleQueryVolunteer()


            const value = ref('')
            const isEdit = ref(true)
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

            const isImg = ref(false)
          const startImg = ref(true)
           const showImg = ref(false)
            const inputPic = ref(null)
            const activeIndex = ref("0");
            const treeDataService = ref([])
            const handleSelect = (key, keyPath) => {
                console.log(key, keyPath);
            };
            const handleGetVolDirections = async (volunteerType)=>{
                const useParams = {
                    params:{
                        volunteerType
                    }
                }
                const {data} = await getVolDirections(useParams)
                data.forEach(item=>{
                    treeDataService.value.push({
                        key:item.name,
                        title:item.name
                    })
                })
            }
            handleGetVolDirections(1)
            // const uploadCover = (e)=> {
            //     imgSrc.value='@/assets/images/img1.jpg'
            //     userInfo.value.photo = '@/assets/images/img1.jpg'
            //     isImg.value = true
            // }
            const uploadCover = (e)=> {
              var me = ctx1.ctx;

              let f = inputPic.value.files[0];

              let multiForm = new FormData() ; 		//创建一个form对象
              multiForm.append('files', f, f.name);  	//append 向form表单添加数据

              // 请求后端获得最新数据
              var fsServerUrl = 'http://localhost:8009';
              axios.defaults.withCredentials = true;
              var fileServer = fsServerUrl + '/api9/file/uploadFiles';

              axios.post(
                  fileServer,
                  multiForm,
                  {
                    headers: {
                      'Content-Type': 'multipart/form-data',
                    }
                  })
                  .then(res => {
                    console.log('resImg',res)
                    if (res.code === 200) {
                      var imagesList = res.data;
                      if (imagesList.length < 1) {
                        alert("张图片上传失败，请保证图片不能为空，并且符合 jpg/png/jpeg 的后缀格式！");
                      } else {
                        imgSrc.value = imagesList[0];
                        userInfo.value.photo = imagesList[0];
                        // form.photo = imagesList[0]
                        startImg.value = false
                        isImg.value = true
                        if (isImg.value === true) {
                          showImg.value = false
                        } else {
                          showImg.value = true
                        }
                      }
                    } else {
                      alert(res.data.msg);
                    }
                  });
            }
            //   const uploadCover = (e)=> {
            //       imgSrc.value='@/assets/images/img1.jpg'
            //       form.photo = '@/assets/images/img1.jpg'
            //       isImg.value = true
            //   }

            const handleEdit = () =>{
                isEdit.value = !isEdit.value
                console.log('isEdit.value',isEdit.value)
            }
            const handleChangeInfo =  ()=>{
                ctx.$refs.elForm.validate(async (validate)=>{
                    if (validate) {
                        const body = {
                            address:userInfo.value.address,
                            age:+userInfo.value.age,
                            certificateNumber:userInfo.value.certificateNumber,
                            certificateType:userInfo.value.certificateType,
                            comment:userInfo.value.comment,
                            id:userInfo.value.id,
                            name:userInfo.value.name,
                            photo:userInfo.value.photo,
                            profession:userInfo.value.profession,
                            sex:+userInfo.value.sex,
                        }
                        await modifyInfo(body)

                        Message.success('提交成功')
                        isEdit.value = true
                        handleQueryVolunteer()
                        router.push('/ind-center')
                        // volunteerInfo = data
                    } else {
                        Message.error('提交失败')
                    }
                })

            }
            const OpenPage = ()=>{
                router.push('/ind-center')
            }
            return {
                activeIndex,
                handleSelect,
                userInfo,
                uploadCover,
                inputPic,
                certificateTypes,
                value,
                handleChangeInfo,
                elForm,
                isImg,
                imgSrc,
                isEdit,
                handleEdit,
                treeDataService,
                isBtn,
                reg_Email,
                OpenPage,
              startImg
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
    //height: 7rem;
    background-color: rgb(255, 255, 255);
    display: flex;
    justify-content: center;
    // align-items: center;
    margin-top: 1rem;
    .content {
      position: relative;
      width: 60%;
      height: 13rem;
      display: flex;
      position: relative;
      justify-content: center;
      align-items: center;
      flex-direction: column;
      .position {
        position: absolute;
        right: 5%;
        top: 7%;
      }
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
