<template>
  <div class="re-con">
    <div class="content">
      <h1 style="font-size: 32px" class="txt">修改密码</h1>

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
              <el-form-item label="密码" prop="field115">
                <el-input
                  v-model="formData.field102"
                  placeholder="请输入密码"
                  clearable
                  show-password
                  :style="{ width: '5rem' }"
                ></el-input>
              </el-form-item>
            </el-col>
          </div>

          <div class="container">
            <el-col :span="24">
              <el-form-item label="新密码" prop="field116">
                <el-input
                  v-model="formData.field114"
                  placeholder="请输入新密码"
                  clearable
                  show-password
                  :style="{ width: '5rem' }"
                ></el-input>
              </el-form-item>
            </el-col>
            <p>
              密码格式要求：长应8一20个字符，且必须同时包含大写、小写字母、数字和特殊字符
            </p>
          </div>
          <div class="container">
            <el-col :span="24">
              <el-form-item label="请确认密码" prop="field117">
                <el-input
                  v-model="formData.field103"
                  placeholder="请输入确认密码"
                  clearable
                  show-password
                  :style="{ width: '5rem' }"
                ></el-input>
              </el-form-item>
            </el-col>
            <p>为确保填写正确，需要再次填写您的密码，请勿复制粘贴</p>
          </div>

          <div class="btn">
            <el-col :span="12">
              <el-form-item label="" prop="field118">
                <el-button type="primary" size="medium" class="re-return">
                  返回
                </el-button>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="" prop="field119">
                <el-button type="primary" @click="handleChangePassword" size="medium" class="re-submit">
                  确认
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
    import {modifyPassword} from '@/api/volunteer'
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
      const handleChangePassword =  async ()=>{
          const body = {
              id:111,
              newPassword:'admin',
              oldPassword:'admin'
          }
          await modifyPassword(body)
      }
    const OpenPage = () => {
      window.open("#/re-login");
    };
    return {
      OpenPage,
        handleChangePassword
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
      left: 1.53rem;
      top: 0.9rem;
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
