<template>
    <div class="re-con">
        <div class="content">
            <h1 style="font-size: 32px" class="txt">选择志愿者类型</h1>

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
                            <el-select :style="{width:'6rem'}" v-model="value" class="m-2" placeholder="请选择志愿者类型" size="large">
                                <el-option
                                        v-for="item in options"
                                        :key="item.value"
                                        :label="item.label"
                                        :value="item.value"
                                />
                            </el-select>
                        </el-col>
                    </div>
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
    import { ref } from 'vue'
    import {chooseVolType} from '@/api/volunteer'
    import {useRouter} from "vue-router";

    export default {
        components: {},
        props: [],
        data() {
            return {
                formData: {
                    field114: undefined,
                    field115: undefined,
                    field116: undefined,
                    field117: undefined,
                    field118: undefined,
                },
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


            const value = ref('')

            const options = [
                {
                    value: '赛会志愿者',
                    label: '赛会志愿者',
                },
                {
                    value: '城市志愿者',
                    label: '城市志愿者',
                }
            ]
            const router = useRouter()
            const handleSubmit = async ()=>{
                const useParams = {
                    params:{
                        id:111,
                        volunteerType:1
                    }
                }
                await chooseVolType({},useParams)
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
                handleJump
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
