<template>
  <a-card
    class="general-card"
    :title="$t('workplace.quick.operation')"
    :header-style="{ paddingBottom: '0' }"
    :body-style="{ padding: '24px 20px 0 20px' }"
  >
    <template #extra>
      <a-link>{{ $t('workplace.quickOperation.setup') }}</a-link>
    </template>
    <a-row :gutter="8">
      <a-col @click="handleToDes(link.path)" v-for="link in links" :key="link" :span="8" class="wrapper">
        <div class="icon">
          <component :is="link.icon" />
        </div>
        <a-typography-paragraph class="text">
          {{ $t(link.text) }}
        </a-typography-paragraph>
      </a-col>
    </a-row>
    <a-divider class="split-line" style="margin: 0" />
  </a-card>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import {useRouter} from 'vue-router'

const links = [
  { text: 'workplace.contentManagement', icon: 'icon-file' ,path:'/backStage/result/success'},
  { text: 'workplace.contentStatistical', icon: 'icon-storage',path:'/backStage/visualization/data-analysis' },
  { text: 'workplace.advanced', icon: 'icon-settings' ,path:'/backStage/form/group'},
  { text: 'workplace.onlinePromotion', icon: 'icon-mobile',path:'/backStage/cooperation/cooperationchild' },
  { text: 'workplace.contentPutIn', icon: 'icon-fire',path:'/backStage/result/error' },
];

export default defineComponent({
  setup() {
      const router = useRouter()
      const handleToDes = (path)=>{
          router.push(path)
      }
    return {
      links,
        handleToDes
    };
  },
});
</script>

<style scoped lang="less"></style>
