<template>
        <div class="brief-introduction">
            <el-card :style="{height:'100%'}">
                <el-descriptions class="title" title="简介" :column="2" border>
                    <template #extra>
                        <el-button type="primary" @click="dialogVisible = true">
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
                        冯大壮
                    </el-descriptions-item>
                    <el-descriptions-item>
                        <template #label>
                            <i class="el-icon-s-custom"></i>
                            昵称
                        </template>
                        admin
                    </el-descriptions-item>
                    <el-descriptions-item>
                        <template #label>
                            <i class="el-icon-odometer"></i>
                            年龄
                        </template>
                        20
                    </el-descriptions-item>
                    <el-descriptions-item>
                        <template #label>
                            <i class="el-icon-male"></i>
                            <i class="el-icon-female"></i>
                            性别
                        </template>
                        <el-tag size="small">男}</el-tag>
                    </el-descriptions-item>
                    <el-descriptions-item>
                        <template #label>
                            <i class="el-icon-message"></i>
                            邮箱Email
                        </template>
                        666qq.com
                    </el-descriptions-item>
                    <el-descriptions-item>
                        <template #label>
                            <i class="el-icon-mobile-phone"></i>
                            手机号码
                        </template>
                        18860358585
                    </el-descriptions-item>
                    <el-descriptions-item>
                        <template #label>
                            <i class="el-icon-location-outline"></i>
                            地区
                        </template>
                        河南焦作
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
                            注册日期
                        </template>
                            2023-04-18
                    </el-descriptions-item>
                </el-descriptions>
            </el-card>

            <el-dialog
                    v-model="dialogVisible"
                    title="修改个人信息"
                    width="50%"
            >
                <el-form :model="form" :rules="rules" ref="form" label-width="100px">
                    <div class="updateinfo">
                        <div class="left">
                            <el-form-item label="头像" prop="avatar">
                                <img style="width:150px;height:110px" :src="form.avatar" />
                            </el-form-item>
                            <el-form-item label="账号密码" prop="password">
                                <el-input v-model="form.password"></el-input>
                            </el-form-item>
                            <el-form-item label="昵称" prop="nickname">
                                <el-input v-model="form.nickname"></el-input>
                            </el-form-item>
                            <el-form-item label="年龄" prop="age">
                                <el-input v-model="form.age"></el-input>
                            </el-form-item>
                            <el-form-item label="性别" prop="sex">
                                <el-switch
                                        v-model="form.sex"
                                        active-color="#13ce66"
                                        inactive-color="#ff4949"
                                        active-text="男"
                                        inactive-text="女"
                                        :active-value= "1"
                                        :inactive-value= "0"
                                >
                                </el-switch>
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
                            <el-form-item label="地区" prop="area">
                                <el-input v-model="form.area"></el-input>
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
                            <el-form-item label="手机号码" prop="mobilePhoneNumber">
                                <el-input v-model="form.mobilePhoneNumber"></el-input>
                            </el-form-item>
                        </div>
                    </div>
                </el-form>
                <template #footer>
                     <span class="dialog-footer">
                         <el-button @click="dialogVisible = false">取消</el-button>
                        <el-button type="primary" @click="dialogVisible = false">
                            提交
                        </el-button>
                    </span>
                </template>
            </el-dialog>
        </div>

</template>

<script lang="ts">
    import {ref,reactive} from 'vue'

    // import PersonalDia from './PersonalDia.vue'
    import { ElMessageBox } from 'element-plus'

    export default {
        name:'UserInfo',
        components:{
            // PersonalDia
        },
        setup(){
            const isShow = ref(true)
            const handleEdit = ()=>{
                isShow.value = !isShow.value
                console.log('isshow',isShow.value)
            }

            const form =  reactive({
                avatar: "",
                password: "",
                nickname: "",
                age: Number,
                email: "",
                mobilePhoneNumber: "",
                sex: Number,
                id: Number,
                account: "",
                area: "",
                hobby: "",
                work: "",
                design: "",
            })
            const dialogVisible = ref(false)

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
                isShow,
                dialogVisible,
                handleClose,
                form

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
