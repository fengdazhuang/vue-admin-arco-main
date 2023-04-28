<template>
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
            <el-form-item label="密码" prop="password">
              <el-input
                v-model="userInfo.password"
                placeholder="请输入密码"
                clearable
                :style="{ width: '5rem' }"
              >
              </el-input>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="验证码" prop="validateCode">
              <el-input
                v-model="userInfo.validateCode"
                placeholder="请输入验证码"
                clearable
                suffix-icon="el-icon-refresh-left"
                :style="{ width: '2rem' }"
              ></el-input>
                <el-image @click="handleChangeValidateCode" :style="{ margin:'0 0 0 .4rem',width: '1rem', height: '0.5rem'}" :src="img" :fit="fit" />
            </el-form-item>
          </el-col>
          <div class="re-link">
            <a>忘记密码</a>
            <a @click="OpenPage2()">新用户注册</a>
          </div>
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
                  登录
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
    import { useUserStore } from '@/store';
    import {useRouter} from 'vue-router'
    import {reactive, ref,getCurrentInstance} from "vue";
    import { Message } from '@arco-design/web-vue';

export default {
  components: {},
  props: [],
  data() {
    return {
      formData: {
          email: undefined,
          password: undefined,
          validateCode: undefined,
      },
      rules: {
          email: [
          {
            required: true,
            message: "请输入电子邮箱",
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
          validateCode: [
          {
            required: true,
            message: "请输入验证码",
            trigger: "blur",
          },
        ],
      },
    };
  },
  setup() {
      const {ctx} = getCurrentInstance()
      const userStore = useUserStore();
      const img = ref('')
      const userInfo = reactive({
          email: 'admin@qq.com',
          password: 'admin',
          validateCode:'',
          key:''
      });
      const router = useRouter();
      const handleLogin = ()=>{
          ctx.$refs.elForm.validate(async (validate)=>{
              if (validate) {
                  ctx.$refs.elForm.resetFields()
                  Message.success('登录成功')
                  const  res =  await userStore.loginVolunteer(userInfo);
                  if (res.code === 200) {
                      router.push('/ind-center')
                  }
              }
          })

      }
    const OpenPage = () => {
      window.open("#/ind-index");
    };
    const OpenPage2 = () => {
      window.open("#/re-register");
    };

      const getValidateCode = async ()=>{
          const  res =  await userStore.getValidateCode();
          console.log(res)
          img.value = res.data.validateCode
          userInfo.key=res.data.key
      }
      getValidateCode()
      const handleChangeValidateCode =  async ()=>{
          const  res =  await userStore.getValidateCode();
          img.value = res.data.validateCode
          userInfo.key=res.data.key
      }
    return {
      OpenPage,
      OpenPage2,
        handleChangeValidateCode,
        img,
        handleLogin,
        userInfo
    };
  },
  methods: {
    submitForm() {
      this.$refs["elForm"].validate((valid) => {
        if (!valid) return '';
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
  height: 7rem;
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
