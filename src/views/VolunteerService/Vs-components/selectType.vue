<template>
    <div class="re-con">
        <div class="content">
            <h1 style="font-size: 32px" class="txt">选择志愿者类型</h1>
<!--            {{formData}}111-->
            <el-row :gutter="15">
                <el-form
                        ref="elForm"
                        :model="formData"
                        :rules="rules"
                        size="medium"
                        label-width="150px"
                        label-position="left"
                >
                    <el-form-item prop="volunteerType" :rules="[{required:true,message:'请选择志愿者类型'}]">
                        <div class="container">
                        <el-col :span="24">
                            <el-select :style="{width:'6rem'}" v-model="formData.volunteerType" class="m-2" placeholder="请选择志愿者类型" size="large">
                                <el-option
                                        v-for="item in options"
                                        :key="item.value"
                                        :label="item.label"
                                        :value="item.value"
                                />
                            </el-select>
                        </el-col>
                    </div>
                    </el-form-item>
                    <div class="btn">
                        <el-col :span="12">
                            <el-form-item label="" prop="field118">
                                <el-button @click="handleJump" type="primary" size="medium" class="re-return">
                                    个人中心
                                </el-button>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item label="" prop="field119">
                                <el-button type="primary" @click="handleSubmit" size="medium" class="re-submit">
                                    提交
                                </el-button>
                            </el-form-item>
                        </el-col>
                    </div>

                </el-form>
            </el-row>
        </div>
    </div>
</template>
<script>
    /* eslint-disable */
    import {reactive, ref} from 'vue'
    import {chooseVolType,queryVolunteer} from '@/api/volunteer'
    import {useRouter} from "vue-router";
    import { Message } from '@arco-design/web-vue';

    export default {
        components: {},
        props: [],
        data() {
            return {
                rules: {
                    field114: [
                        {
                            required: true,
                            message: "请输入密码",
                            trigger: "blur",
                        },
                    ],
                    field115: [
                        {
                            required: true,
                            message: "请输入新密码",
                            trigger: "blur",
                        },
                    ],
                    field116: [
                        {
                            required: true,
                            message: "请输入确认密码",
                            trigger: "blur",
                        },
                    ],
                    field117: [
                        {
                            required: true,
                            message: "请输入确认密码",
                            trigger: "blur",
                        },
                    ],
                    field118: [
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


            const volunteerInfo = ref(JSON.parse(window.sessionStorage.getItem('volunteerInfo')))
            const nowVolunteerInfo = ref({
                volunteerType:''
            })
            const formData = reactive({
                volunteerType: ''
            })
            const handleQueryVolunteer = async ()=>{
                const useParams = {
                    params:{
                        id:volunteerInfo.value.id
                    }
                }
                const {data} = await queryVolunteer(useParams)
                nowVolunteerInfo.value = data
                formData.volunteerType = nowVolunteerInfo.value.volunteerType
                if (formData.volunteerType === 0) {
                    formData.volunteerType = '赛会志愿者'
                } else if (formData.volunteerType === 1) {
                    formData.volunteerType = '城市志愿者'
                }
            }
            handleQueryVolunteer()


            const value = ref('')

            const options = [
                {
                    value: '0',
                    label: '赛会志愿者',
                },
                {
                    value: '1',
                    label: '城市志愿者',
                }
            ]
            const router = useRouter()


            const handleSubmit = async ()=>{
                const useParams = {
                    params:{
                        id:volunteerInfo.value.id,
                        volunteerType:formData.volunteerType
                    }
                }
                const res =  await chooseVolType({},useParams)

                handleQueryVolunteer()

                if(res.code === 200) {
                    Message.success('提交成功')
                    router.push('/ind-center')
                }
            }
            const handleJump = ()=>{
                router.push('/ind-center')
            }
            const OpenPage = () => {
                window.open("#/re-login");
            };
            return {
                OpenPage,
                options,
                value,
                handleSubmit,
                handleJump,
                formData,
                nowVolunteerInfo
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
      height: 3rem;
      display: flex;
      position: relative;
      justify-content: center;
      align-items: center;
      flex-direction: column;
      padding-top: 1rem;
      .txt {
        position: absolute;
        left: 1.53rem;
        top: 0.5rem;
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
      input[type="radio"] {
        width: 15px;
        height: 15px;
        margin: 0 4px 0 0;
        position: relative;
      }

      .btn {
        display: flex;
        justify-content: center;
        align-items: center;
        margin-top: 0.5rem;

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
