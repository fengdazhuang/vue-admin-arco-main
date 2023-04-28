<template>
        <div class="brief-introduction">
            <el-card :style="{height:'100%'}">
                <el-descriptions class="title" title="简介" :column="2" border>
                    <template #extra>
                        <el-button type="primary" @click="handleEdit(updateAdminInfo)">
                            编辑
                        </el-button>
                    </template>
                    <el-descriptions-item>
                        <template #label>
                            <i class="el-icon-picture-outline"></i>
                            头像
                        </template>
                        <img class="img" src="@/assets/images/img1.jpg" alt="" />
                    </el-descriptions-item>
                    <el-descriptions-item>
                        <template #label>
                            <i class="el-icon-user"></i>
                            用户名
                        </template>
                        {{updateAdminInfo.username}}
                    </el-descriptions-item>
                    <el-descriptions-item>
                        <template #label>
                            <i class="el-icon-s-custom"></i>
                            昵称
                        </template>
                        {{updateAdminInfo.name}}
                    </el-descriptions-item>
                    <el-descriptions-item>
                        <template #label>
                            <i class="el-icon-odometer"></i>
                            年龄
                        </template>
                        {{updateAdminInfo.age}}
                    </el-descriptions-item>
                    <el-descriptions-item>
                        <template #label>
                            <i class="el-icon-male"></i>
                            <i class="el-icon-female"></i>
                            性别
                        </template>
                        <el-tag size="small">{{updateAdminInfo.sex}}</el-tag>
                    </el-descriptions-item>
                    <el-descriptions-item>
                        <template #label>
                            <i class="el-icon-message"></i>
                            邮箱Email
                        </template>
                        {{updateAdminInfo.email}}
                    </el-descriptions-item>
                    <el-descriptions-item>
                        <template #label>
                            <i class="el-icon-mobile-phone"></i>
                            手机号码
                        </template>
                        {{updateAdminInfo.phone}}
                    </el-descriptions-item>
                    <el-descriptions-item>
                        <template #label>
                            <i class="el-icon-location-outline"></i>
                            地区
                        </template>
                        {{updateAdminInfo.province}}
                    </el-descriptions-item>
                    <el-descriptions-item>
                        <template #label>
                            <i class="el-icon-office-building"></i>
                            职业
                        </template>
                        AI
                    </el-descriptions-item>
                    <el-descriptions-item>
                        <template #label>
                            <i class="el-icon-basketball"></i>
                            兴趣爱好
                        </template>
                        乒乓球
                    </el-descriptions-item>
                    <el-descriptions-item>
                        <template #label>
                            <i class="el-icon-magic-stick"></i>
                            个性签名
                        </template>
                        我真帅
                    </el-descriptions-item>
                    <el-descriptions-item>
                        <template #label>
                            <i class="el-icon-date"></i>
                            登录日期
                        </template>
                            {{updateAdminInfo.loginTime}}
                    </el-descriptions-item>
                    <el-descriptions-item>
                        <template #label>
                            <i class="el-icon-date"></i>
                            注册日期
                        </template>
                        {{updateAdminInfo.createTime}}
                    </el-descriptions-item>
                    <el-descriptions-item>
                        <template #label>
                            <i class="el-icon-date"></i>
                            学校
                        </template>
                        {{updateAdminInfo.school}}
                    </el-descriptions-item>
                </el-descriptions>
            </el-card>

            <el-dialog
                    v-model="dialogVisible"
                    title="修改个人信息"
                    width="50%"
            >
                <el-form :model="form"  label-width="100px">
                    <div class="updateinfo">
                        <div class="left">
                            <el-form-item label="头像" prop="photo">
                                <div class="choose-cover">
                                    <div class="uploader-comp">
                                        <div id="block-choose" class="block-choose">
                                            <img :src="imgSrc"  style="width: 100px; height: 100px; align-self: center;" v-show="isImg"/>
                                        </div>
                                        <input type="file" @change="uploadCover()" @mouseover="mouseOver" @mouseout="mouseOut" ref="inputPic" class="inputPic" accept="image/jpeg,image/jpg,image/png">
                                    </div>
                                    <div style="margin-top: 10px; color: #9b9d9e;">请上传JPG、JPEG、PNG格式的封面图噢~</div>
                                </div>
                            </el-form-item>
                            <el-form-item label="账号密码" prop="password">
                                <el-input v-model="form.password"></el-input>
                            </el-form-item>
                            <el-form-item label="昵称" prop="name">
                                <el-input v-model="form.name"></el-input>
                            </el-form-item>
                            <el-form-item label="年龄" prop="age">
                                <el-input v-model="form.age"></el-input>
                            </el-form-item>
                            <el-form-item label="性别" prop="sex">
                                <el-radio-group v-model="form.sex" class="ml-4">
                                    <el-radio label="男"  size="large">男</el-radio>
                                    <el-radio label="女" size="large">女</el-radio>
                                </el-radio-group>
                            </el-form-item>
                            <el-form-item label="邮箱" prop="email">
                                <el-input v-model="form.email"></el-input>
                            </el-form-item>

                        </div>
                        <div class="right">
                            <el-form-item label="用户编号" prop="id">
                                <el-input v-model="form.id" disabled></el-input>
                            </el-form-item>
                            <el-form-item label="账号" prop="account">
                                <el-input v-model="form.account" disabled></el-input>
                            </el-form-item>
                            <el-form-item label="地区" prop="province">
                                <el-input v-model="form.province"></el-input>
                            </el-form-item>
                            <el-form-item label="兴趣爱好" prop="hobby">
                                <el-input v-model="form.hobby"></el-input>
                            </el-form-item>
                            <el-form-item label="职业" prop="work">
                                <el-input v-model="form.work"></el-input>
                            </el-form-item>
                            <el-form-item label="个性签名" prop="design">
                                <el-input v-model="form.design"></el-input>
                            </el-form-item>
                            <el-form-item label="手机号码" prop="phone">
                                <el-input v-model="form.phone"></el-input>
                            </el-form-item>
                            <el-form-item label="学校" prop="school">
                                <el-input v-model="form.school"></el-input>
                            </el-form-item>
                        </div>
                    </div>
                </el-form>
                <template #footer>
                     <span class="dialog-footer">
                         <el-button @click="dialogVisible = false">取消</el-button>
                        <el-button type="primary" @click="handleChangeUserInfo">
                            提交
                        </el-button>
                    </span>
                </template>
            </el-dialog>
        </div>

</template>

<script lang="ts">
    /* eslint-disable */
    import {ref,reactive} from 'vue'
    import {modifyInfo,getInfo} from '@/api/user'

    import { ElMessageBox } from 'element-plus'

    export default {
        name:'UserInfo',
        components:{
            // PersonalDia
        },
        setup(){
            const dialogVisible = ref(false)

            const updateAdminInfo = ref({})
            const imgSrc = ref('@/assets/images/img1.jpg')
            const isImg = ref(false)
            const inputPic = ref(null)
            let adminInfo = reactive(JSON.parse(window.sessionStorage.getItem('adminInfo')))
            if (adminInfo.sex === 1) {
                adminInfo.sex = '男'
            } else  {
                adminInfo.sex = '女'
            }
            let form =  reactive({
                photo: adminInfo.picture,
                password: adminInfo.password,
                age: adminInfo.age,
                email:adminInfo.email,
                sex: adminInfo.sex,
                id: adminInfo.id,
                account: "",
                area: "",
                hobby: "",
                work: "",
                design: "",
                createTime:adminInfo.createTime,
                loginTime:adminInfo.loginTime,
                name:adminInfo.name,
                phone:adminInfo.phone,
                province:adminInfo.province,
                school:adminInfo.school,
                status:adminInfo.status,
                username:adminInfo.username
            })
            const handleEdit = (updateAdminInfo)=>{
                // form = {
                //     photo: updateAdminInfo.value.picture,
                //     password: updateAdminInfo.value.password,
                //     age: updateAdminInfo.value.age,
                //     email:updateAdminInfo.value.email,
                //     sex: updateAdminInfo.value.sex,
                //     id: updateAdminInfo.value.id,
                //     account: "",
                //     area: "",
                //     hobby: "",
                //     work: "",
                //     design: "",
                //     createTime:updateAdminInfo.value.createTime,
                //     loginTime:updateAdminInfo.value.loginTime,
                //     name:updateAdminInfo.value.name,
                //     phone:updateAdminInfo.value.phone,
                //     province:updateAdminInfo.value.province,
                //     school:updateAdminInfo.value.school,
                //     status:updateAdminInfo.value.status,
                //     username:updateAdminInfo.value.username
                // }
                dialogVisible.value = true
            }
            const handlGetInfo = async ()=>{
                const useParams = {
                    params:{
                        id:adminInfo.id
                    }
                }
                const {data} = await getInfo(useParams)

                    if(data.sex===1) {
                        data.sex = '男'
                    } else {
                        data.sex = '女'
                    }

                updateAdminInfo.value = data
                console.log('updateAdminInfo.value',updateAdminInfo.value)
                    adminInfo = updateAdminInfo.value
            }
            handlGetInfo()
            const handleChangeUserInfo = async ()=>{
                dialogVisible.value = false
                if(form.sex === '男') {
                    form.sex = 1
                } else {
                    form.sex = 0
                }
                const body = {
                    age:+form.age,
                    createTime:form.createTime,
                    email:form.email,
                    id:form.id,
                    loginTime:form.loginTime,
                    name:form.name,
                    password:form.password,
                    phone:form.phone,
                    picture:form.photo,
                    province:form.province,
                    school:form.school,
                    sex:form.sex,
                    status:form.status,
                    username:form.username
                }
                const res = await modifyInfo(body)
                    handlGetInfo()
            }
            // const uploadCover = (e)=> {
            //   var me = ctx1.ctx;
            //
            //   let f = inputPic.value.files[0];
            //
            //   let multiForm = new FormData() ; 		//创建一个form对象
            //   multiForm.append('files', f, f.name);  	//append 向form表单添加数据
            //
            //   // 请求后端获得最新数据
            //   var fsServerUrl = 'http://localhost:8009';
            //   axios.defaults.withCredentials = true;
            //   var fileServer = fsServerUrl + '/api9/file/uploadFiles';
            //
            //   axios.post(
            //       fileServer,
            //       multiForm,
            //       {
            //         headers: {
            //           'Content-Type': 'multipart/form-data',
            //         }
            //       })
            //       .then(res => {
            //         console.log('resImg',res)
            //         if (res.code === 200) {
            //           var imagesList = res.data;
            //           if (imagesList.length < 1) {
            //             alert("张图片上传失败，请保证图片不能为空，并且符合 jpg/png/jpeg 的后缀格式！");
            //           } else {
            //             imgSrc.value = imagesList[0];
            //             form.photo = imagesList[0]
            //             isImg.value = true
            //           }
            //         } else {
            //           alert(res.data.msg);
            //         }
            //       });
            // }
            const uploadCover = (e)=> {
                imgSrc.value='@/assets/images/img1.jpg'
                form.photo = '@/assets/images/img1.jpg'
                isImg.value = true
            }
            const handleClose = (done: () => void) => {
                ElMessageBox.confirm('Are you sure to close this dialog?')
                    .then(() => {
                        done()
                    })
                    .catch(() => {
                        // catch error
                    })
            }
            return {
                handleEdit,
                dialogVisible,
                handleClose,
                form,
                handleChangeUserInfo,
                uploadCover,
                inputPic,
                imgSrc,
                isImg,
                updateAdminInfo
            }
        }
    }

</script>

<style lang="scss"  scoped>
  .brief-introduction {
    height: 580px;
  }
    img {
      width: 120px;
      height: 120px;
    }
  .updateinfo {
    //height: 350px;
    overflow: auto;
  }
  .left {
    width: 45%;
    float: left;
  }
  .right {
    overflow: hidden;
  }
</style>
