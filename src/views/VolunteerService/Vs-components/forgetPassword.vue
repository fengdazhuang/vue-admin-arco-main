<template>
    <div class="re-con">
        <div class="content">
            <h1 style="font-size: 32px" class="txt">忘记密码</h1>

            <el-row :gutter="15">
                <el-form
                        ref="elForm"
                        :model="formData"
                        :rules="rules"
                        size="medium"
                        label-width="150px"
                        label-position="left"
                >

                    <div class="container">

                        <el-col :span="24">
                            <el-form-item label="电子邮箱" prop="email" :rules="[{required:true,message:'请输入电子邮箱'},{ pattern: reg_Email, message: ' 请填写您常用的电子邮箱。邮箱最多80个字符，只能由字母、数字、半角句号、中划线或下划线组成 ', trigger: ['blur', 'change'] }]">
                                <el-input
                                        v-model="formData.email"
                                        placeholder="请输入电子邮箱"
                                        clearable
                                        :style="{ width: '5rem' }"
                                >
                                </el-input>
                            </el-form-item>
                        </el-col>
                    </div>
                    <div class="container">
                        <div class="verification">
                            <el-col :span="20">
                                <el-form-item label="邮箱验证码" prop="code" :rules="[{required:true,message:'请输入验证码'}]">
                                    <el-input
                                            v-model="formData.code"
                                            placeholder="请输入邮箱验证码"
                                            clearable
                                    ></el-input>
                                </el-form-item>
                            </el-col>
                            <el-col :span="3">
                                <el-form-item label-width="-15px">
                                    <el-button @click="handleValidateCode" type="primary" size="medium" class="ver-btn">
                                        获取验证码
                                    </el-button>
                                </el-form-item>
                            </el-col>
                        </div>
                        <p>请填与电子邮箱收到的验证码</p>
                    </div>
                    <div class="container">
                        <el-col :span="24">
                            <el-form-item label="密码" prop="password" :rules="[{required:true,message:'请输入密码'},{ pattern: reg_Password, message: '只能输入6-20个字母、数字、下划线', trigger: ['blur', 'change'] }]">
                                <el-input
                                        v-model="formData.password"
                                        placeholder="请输入密码"
                                        clearable
                                        show-password
                                        :style="{ width: '100%' }"
                                ></el-input>
                            </el-form-item>
                        </el-col>
                    </div>
                    <div class="container">
                        <el-col :span="24">
                            <el-form-item label="确认密码" prop="confirmPassword" :rules="[{required:true,message:'请输入确认密码'}]">
                                <el-input
                                        v-model="formData.confirmPassword"
                                        placeholder="请输入确认密码"
                                        clearable
                                        show-password
                                        :style="{ width: '100%' }"
                                ></el-input>
                            </el-form-item>
                        </el-col>
                        <p>为确保填写正确，需要再次填写您的密码，请勿复制粘贴</p>
                    </div>
                    <div class="read1">
                        <input type="radio" :checked="isChecked" @click="isChecked = !isChecked" name="" id="" value="1" />
                        <span
                        >我已阅读并同意<a herf="https://www.csdn.net/" class="link">2022年杭州亚运会和亚残运会赛会志愿者申请人信息采集和隐私保护改策</a></span
                        >
                    </div>
                    <div class="read2">
                        <input type="radio"  :checked="isChecked2" @click="isChecked2 = !isChecked2"  name="" value="2" />
                        <span>我同意使用注册的电子邮箱接收杭州亚组委相关信息</span>
                    </div>
                    <div class="btn">
                        <el-col :span="12">
                            <el-form-item label="">
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
                            <el-form-item label="">
                                <el-button type="primary" @click="handleSubmit" size="medium" class="re-submit">
                                    提交
                                </el-button>
                            </el-form-item>
                        </el-col>
                    </div>

                    <!-- <el-col :span="24">
                    <el-form-item size="large">
                      <el-button type="primary" @click="submitForm">提交</el-button>
                      <el-button @click="resetForm">重置</el-button>
                    </el-form-item>
                  </el-col> -->
                </el-form>
            </el-row>
        </div>
    </div>
</template>
<script>
    /* eslint-disable */
    import {sendCode,register,forgetPassword} from '@/api/volunteer'
    import {regEmail,regPassword} from '@/api/regret'
    import {reactive,getCurrentInstance,ref} from "vue";
    import {useRouter} from 'vue-router'
    import { Message} from '@arco-design/web-vue';



    export default {
        components: {},
        props: [],
        data() {
            return {
                rules: {
                    email: [
                        {
                            required: true,
                            message: "请输入电子邮箱",
                            trigger: "blur",
                        },
                    ],
                    code: [
                        {
                            required: true,
                            message: "请输入邮箱验证码",
                            trigger: "blur",
                        },
                    ],
                    password: [
                        {
                            required: true,
                            message: "请输入密码",
                            trigger: "blur",
                        },
                    ],
                    confirmPassword: [
                        {
                            required: true,
                            message: "请输入确认密码",
                            trigger: "blur",
                        },
                    ],
                },
            };
        },
        computed: {},
        watch: {},
        created() {},
        mounted() {},
        setup() {
            const reg_Email = regEmail
            const reg_Password = regPassword
            const isChecked = ref(false)
            const isChecked2 = ref(false)
            const {ctx} = getCurrentInstance()
            const formData= reactive({
                email: '',
                code: '',
                password: '',
                confirmPassword: '',
            })
            const router = useRouter()
            const handleSubmit = ()=>{
                if (formData.password != formData.confirmPassword) {
                    Message.error('两次密码不一致')
                    return
                }
                console.log('isChecked.value',isChecked.value)
                console.log('isChecked.value2',isChecked2.value)
                if(!isChecked.value || !isChecked2.value) {
                    Message.error('请选择同意协议协议')
                    return
                }
                ctx.$refs.elForm.validate(async (validate)=>{
                    if (validate) {
                        const body = {
                            email:formData.email,
                            password:formData.password,
                            validateCode:formData.code
                        }
                        const res = await forgetPassword(body)
                        if(res.code===200) {
                            router.push('/re-login')
                        }
                        ctx.$refs.elForm.resetFields()
                    }
                })

            }
            const OpenPage = () => {
                // window.open("#/re-login");
                router.push('/re-login')
            };
            const handleValidateCode = async ()=>{
                const body = {
                    email:formData.email,
                    type:1
                }
                await sendCode(body)
            }
            return {
                OpenPage,
                handleValidateCode,
                formData,
                handleSubmit,
                reg_Email,
                reg_Password,
                isChecked,
                isChecked2

            };
        },
        methods: {
            submitForm() {
                this.$refs["elForm"].validate((valid) => {
                    if (!valid) return;
                    // TODO 提交表单
                });
            },
            resetForm() {
                this.$refs["elForm"].resetFields();
            },
        },
    };
</script>
<style lang="scss" scoped>
  .re-con {
    width: 100%;
    height: 8rem;
    background-color: rgb(255, 255, 255);
    display: flex;
    justify-content: center;
    // align-items: center;
    margin-top: 1rem;
    .content {
      width: 60%;
      height: 6rem;
      display: flex;
      position: relative;
      justify-content: center;
      align-items: center;
      flex-direction: column;
      padding-top: 1rem;
      .txt {
        position: absolute;
        left: 1.55rem;
        top: 0.4rem;
        display: block;
      }
      p {
        font-size: 12px;
        color: rgb(193, 193, 193);
        position: absolute;
        left: 1.6rem;
      }
      .container {
        height: 1rem;

        width: 100%;
      }
      .verification {
        display: flex;
        align-items: center;
        justify-content: space-between;
        position: relative;
        .ver-btn {
          position: absolute;
          left: -20px;
          height: 40px;
        }
      }
      input[type="radio"] {
        width: 15px;
        height: 15px;
        margin: 0 4px 0 0;
        position: relative;
      }

      .read1 {
        position: absolute;
        display: flex;
        font-size: 12px;
        color: black;
        left: 1.6rem;
        margin-top: 10px;
        .link{
          color: rgb(133, 181, 197);
        }
      }
      .read2 {
        display: flex;

        position: absolute;
        font-size: 12px;
        color: black;
        left: 1.6rem;
        top: 4.5rem;
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
        .re-submit {
          width: 120px;
          height: 40px;
        }
      }
      .el-input {
        height: 50px;
      }
    }
  }
</style>
