<template>
  <div class="common">
    <div class="container">
      <div class="head">
        <div class="head-left">
          <p style="font-size: 24px; margin-top: 0.1rem; margin-left: 20px">
            个人中心
          </p>
          <div class="user">
            <el-icon style="font-size: 24px"><User /></el-icon>
            <p style="font-size: 14px; margin-top: 0.1rem">志愿者编号</p>
              <p style="font-size: 14px; margin-top: 0.1rem" @click="previewResume">简历预览</p>
          </div>

        </div>
        <div class="head-right">
          <p></p>
        </div>
      </div>
      <div class="main">
        <div class="main-up">
          <span style="font-size: 24px">招募进展</span>
          <span style="font-size: 12px; color: rgb(184, 184, 182)"
            >选择志愿者类型后呈现</span
          >
        </div>
        <div style="height: 4rem" class="main-fo">
          <el-steps :active="3" direction="vertical">
            <el-step title="Step 1" description="哈哈哈哈哈" />
            <el-step title="Step 2" />
            <el-step title="Step 3" />
          </el-steps>
        </div>
      </div>
    </div>
      <a-modal width="800px" v-model:visible="showModel" @cancel="handleCancel" @ok="handleConfirm($refs,'edit')"  unmountOnClose>
          <template #title>
              简介预览
          </template>
          <div>

              <a-form setFields="" ref="formRef" :size="form.size" :model="form" :style="{width:'600px'}" @submit="handleSubmit">
                  <a-form-item field="name" label="姓名"
                               :rules="[{required:true,message:'name is required'},{minLength:2,message:'姓名不能少于两位'}]"
                               :validate-trigger="['change','input']"
                  >
                      <a-input v-model="form.name" placeholder="请输入你的姓名" />
                  </a-form-item>
                  <a-form-item field="competitionName" label="参赛项目"
                               :rules="[{required:true,message:'name is required'},{minLength:2,message:'姓名不能少于两位'}]"
                               :validate-trigger="['change','input']"
                  >
                      <a-tree-select :data="treeData" v-model="form.competitionName" placeholder="请选择参赛项目"/>
                  </a-form-item>
                  <a-form-item field="photo" label="上传照片">
                      <a-space direction="vertical" :style="{ width: '100%' }">
                          <div class="choose-cover">
                              <div class="uploader-comp">
                                  <div id="block-choose" class="block-choose" :style="coverStyle">
                                      <img :src="imgSrc"  style="width: 100px; height: 100px; align-self: center;" v-show="isImg"/>
                                  </div>
                                  <input type="file" @change="uploadCover()" @mouseover="mouseOver" @mouseout="mouseOut" ref="inputPic" class="inputPic" accept="image/jpeg,image/jpg,image/png">
                              </div>
                              <div style="margin-top: 10px; color: #9b9d9e;">请上传JPG、JPEG、PNG格式的封面图噢~</div>
                          </div>
                      </a-space>
                  </a-form-item>
                  <a-form-item field="email" label="电子邮箱"
                               :rules="[{required:true,message:'phoneNumber is required'},{minLength:5,message:'不能少于5位数字'}]"
                               :validate-trigger="['change','input']"
                  >
                      <a-input v-model="form.email" placeholder="请输入电子邮箱" />
                  </a-form-item>
                  <a-form-item field="country" label="国籍" :rules="[{required:true,message:'国籍不能为空'}]">
                      <a-select v-model="form.country" placeholder="请选择国籍" allow-clear>
                          <a-option value="中国">中国</a-option>
                          <a-option value="巴基斯坦">巴基斯坦</a-option>
                          <a-option value="韩国">韩国</a-option>
                      </a-select>
                  </a-form-item>
                  <a-form-item field="sex" label="性别" :rules="[{required:true,message:'不能为空'}]">
                      <a-radio-group v-model="form.sex">
                          <a-radio value="1">男</a-radio>
                          <a-radio value="0">女</a-radio>
                      </a-radio-group>
                  </a-form-item>
                  <a-form-item>
                      <a-space>
                          <!-- <a-button html-type="submit" type="primary">提交</a-button> -->
                          <a-button type="primary" status="danger" @click="$refs.formRef.resetFields()">重置</a-button>
                      </a-space>
                  </a-form-item>
              </a-form>
          </div>
      </a-modal>
  </div>
</template>

<script>
    import {reactive, ref} from 'vue'

export default {
  name: "ind-center",
    setup(){
        const form = reactive({
            competitionName:'',
            name: '',
            photo:'@/assets/images/img1.jpg',
            country: '',
            sex:1,
            email:''
        });
      const showModel= ref(false)
        const handleCancel=()=>{
            showModel.value = false
        }
        const handleConfirm = ()=>{
            showModel.value = false
        }
      const previewResume = ()=>{
          window.open('#/resume')
          // showModel.value = !showModel.value
      }
        return {
          previewResume,
            showModel,
            form,
            handleCancel,
            handleConfirm
        }
    }
};
</script>

<style lang="scss" scoped>
body {
  background-color: rgb(247, 248, 250);
}
.el-step__icon {
  position: relative;
  top: -95px !important;
}
.common {
  width: 100%;
  height: 12rem;
  display: flex;
  justify-content: center;
  .container {
    width: 9rem;
    height: 12rem;
    justify-content: center;
    align-items: center;
    margin-top: 0.5rem;
    .head {
      width: 9rem;
      height: 2rem;
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      .head-left {
        width: 4rem;
        height: 1.5rem;
        background-color: rgb(255, 255, 255);
        display: flex;

        flex-direction: column;
        .user {
          display: flex;
          height: 0.5rem;
          align-items: center;
          flex-direction: row;
          margin-top: 10px;
          margin-left: 20px;
        }
      }
      .head-right {
        width: 4rem;
        height: 1.5rem;
        background-color: rgb(255, 255, 255);
      }
    }
    .main {
      display: flex;
      position: relative;
      width: 9rem;
      height: 7rem;
      margin-top: 0.5rem;
      margin-bottom: 20px;
      flex-direction: column;
      align-items: center;
      background-color: rgb(255, 255, 255);

      .main-up {
        display: flex;
        align-items: center;
        justify-content: space-between;
        height: 0.5rem;
        width: 9rem;
        background-color: #fff;

      }
      .main-fo {
        width: 9rem;
        position: absolute;
        left: 1rem;
        top: 1rem;
      }

    }
  }
}
</style>
