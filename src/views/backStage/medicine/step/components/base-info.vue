<template>
  <a-form
    ref="formRef"
    :model="formData"
    class="form"
    :label-col-props="{ span: 6 }"
    :wrapper-col-props="{ span: 18 }"
  >
    <a-form-item
      field="identityType"
      label="身份类型"
      :rules="[
        {
          required: true,
          message: '请选择身份类型',
        }
      ]"
    >
        <a-tree-select :data="treeData" v-model="formData.identityType" placeholder="请选择身份类型"/>
    </a-form-item>
    <a-form-item
      field="identityId"
      label="赛场ID"
      :rules="[
        {
          required: true,
          message: '请输入赛场ID',
        },
      ]"
    >
      <a-input
        v-model="formData.identityId"
        placeholder="请输入赛场ID"
      >
      </a-input>
    </a-form-item>
    <a-form-item
      field="timeType"
      label="就诊时间类型"
      :rules="[
        {
          required: true,
          message: '请选择就诊时间类型',
        },
      ]"
    >
        <a-radio-group v-model="formData.timeType">
            <a-radio :value="0">赛中</a-radio>
            <a-radio :value="1">赛外</a-radio>
        </a-radio-group>
    </a-form-item>
    <a-form-item
      field="situation"
      label="病情描述"
      :rules="[
        {
          required: true,
          message: '请输入病情描述',
        }
      ]"
      row-class="keep-margin"
    >
        <a-textarea
                v-model="formData.situation"
                placeholder="请输入医生备注"
        />
    </a-form-item>
    <a-form-item>
      <a-button type="primary" @click="onNextClick">
        下一步
      </a-button>
    </a-form-item>
  </a-form>
</template>

<script lang="ts">
    import {defineComponent, getCurrentInstance, ref} from 'vue';
import { FormInstance } from '@arco-design/web-vue/es/form';
import { BaseInfoModel } from '@/api/form';

export default defineComponent({
  emits: ['changeStep'],
  setup(props, ctx) {
      const ctx1 = getCurrentInstance()
      const {globalProperties} = ctx1.appContext.config
      const treeData = [
          {
              key:0,
              title:'运动员',
          },
          {
              key:1,
              title:'裁判'
          },
          {
              key:2,
              title:'志愿者'
          },
          {
              key:3,
              title:'管理人员'
          },
          {
              key:4,
              title:'观众'
          },
          {
              key:5,
              title:'其他'
          }
      ]
    const formRef = ref<FormInstance>();
    const formData = ref<BaseInfoModel>({
        identityType: '',
        identityTypeId: '',
        timeType: 0,
        situation: '',
    });
    const reset1 = () =>{
        formData.value = {
            identityType: '',
            identityTypeId: '',
            timeType: 0,
            situation: '',
        }
    }
    const onNextClick = async () => {
      const res = await formRef.value?.validate();
      if (!res) {
        ctx.emit('changeStep', 'forward', { ...formData.value });
      }
        globalProperties.$EventBus.emit('handleData',111111)
    };
      globalProperties.$EventBus.on('reset1',reset1)
    return {
      formData,
      formRef,
      onNextClick,
        treeData
    };
  },
});
</script>

<style scoped lang="less">
.container {
  padding: 20px;
  .keep-margin {
    margin-bottom: 20px;
  }
}

.wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 64px 0;
  background-color: var(--color-bg-2);
}

.steps {
  margin-bottom: 36px;
}

.form {
  width: 500px;
}

.form-content {
  padding: 8px 50px 0 30px;
}
</style>
