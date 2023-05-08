<template>
  <div class="success-wrap">
    <a-result
      status="success"
      title="就诊完成"
      subtitle="愿您早日康复！"
    />
    <a-space :size="16">
      <a-button key="again" type="primary" @click="oneMore">
        再次就诊
      </a-button>
    </a-space>
  </div>
</template>

<script lang="ts">
    import {defineComponent, getCurrentInstance} from 'vue';

export default defineComponent({
  emits: ['changeStep'],
  setup(props, ctx) {
      const ctx1 = getCurrentInstance()
      const {globalProperties} = ctx1.appContext.config
    const oneMore = () => {
        globalProperties.$EventBus.emit('reset1')
        globalProperties.$EventBus.emit('reset2')
      ctx.emit('changeStep', 1);

    };
    return {
      oneMore,
    };
  },
});
</script>

<style scoped lang="less">
.success-wrap {
  text-align: center;
}
:deep(.arco-result) {
  padding-top: 0;
}
.details-wrapper {
  width: 895px;
  margin-top: 54px;
  padding: 20px;
  text-align: left;
  background-color: var(--color-fill-2);
}
</style>
