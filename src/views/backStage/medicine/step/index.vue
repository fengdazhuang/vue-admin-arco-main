<template>
  <div class="container">
    <Breadcrumb :items="['医疗管理', '就诊登记']" />
    <a-spin :loading="loading" style="width: 100%">
      <a-card class="general-card">
        <template #title>
            就诊登记
        </template>
        <div class="wrapper">
          <a-steps
            v-model:current="step"
            style="width: 580px"
            line-less
            class="steps"
          >
            <a-step description="详情信息">
              填写基本信息
            </a-step>
            <a-step description="就诊">
              正在就诊
            </a-step>
            <a-step description="成功">
              就诊完成
            </a-step>
          </a-steps>
          <keep-alive>
            <BaseInfo v-if="step === 1" @change-step="changeStep" />
            <ChannelInfo v-else-if="step === 2" @change-step="changeStep" />
            <Success v-else-if="step === 3" @change-step="changeStep" />
          </keep-alive>
        </div>
      </a-card>
    </a-spin>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import useLoading from '@/hooks/loading';
import {
  submitChannelForm,
  BaseInfoModel,
  ChannelInfoModel,
  UnitChannelModel,
} from '@/api/form';
import BaseInfo from './components/base-info.vue';
import ChannelInfo from './components/channel-info.vue';
import Success from './components/success.vue';

export default defineComponent({
  components: {
    BaseInfo,
    ChannelInfo,
    Success,
  },
  setup() {
    const { loading, setLoading } = useLoading(false);
    const step = ref(1);
    const submitModel = ref<UnitChannelModel>({} as UnitChannelModel);
    const submitForm = async () => {
      setLoading(true);
      try {
        await submitChannelForm(submitModel.value); // The moack api default success
        step.value = 3;
        submitModel.value = {} as UnitChannelModel; // init
      } catch (err) {
        // you can report use errorHandler or other
      } finally {
        setLoading(false);
      }
    };
    const changeStep = (
      direction: string | number,
      model: BaseInfoModel | ChannelInfoModel
    ) => {
      if (typeof direction === 'number') {
        step.value = direction;
        return;
      }

      if (direction === 'forward' || direction === 'submit') {
        submitModel.value = {
          ...submitModel.value,
          ...model,
        };
        if (direction === 'submit') {
          submitForm();
          return;
        }
        step.value += 1;
      } else if (direction === 'backward') {
        step.value -= 1;
      }
    };
    return {
      loading,
      step,
      changeStep,
    };
  },
});
</script>

<style scoped lang="less">
.wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 64px 0;
  background-color: var(--color-bg-2);
  :deep(.arco-form) {
    .arco-form-item {
      &:last-child {
        margin-top: 20px;
      }
    }
  }
}

.steps {
  margin-bottom: 76px;
}
</style>
