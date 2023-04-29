<template>
  <a-card
    class="general-card"
    :title="$t('workplace.recently.visited')"
    :header-style="{ paddingBottom: '0' }"
    :body-style="{ paddingTop: '26px' }"
  >
    <div style="margin-bottom: -1rem">
      <a-row :gutter="8">
        <a-col @click="handleToDes(link.path)" v-for="link in links" :key="link.text" :span="8" class="wrapper">
          <div class="icon">
            <component :is="link.icon" />
          </div>
          <a-typography-paragraph class="text">
            {{ $t(link.text) }}
          </a-typography-paragraph>
        </a-col>
      </a-row>
    </div>
  </a-card>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import {useRouter} from "vue-router";

const links = [
  {
    text: 'workplace.contentManagement',
    icon: 'icon-storage',
      path:'/backStage/result/success'
  },
  {
    text: 'workplace.contentStatistical',
    icon: 'icon-file',
      path:'/backStage/visualization/data-analysis'
  },
  {
    text: 'workplace.advanced',
    icon: 'icon-settings',
      path:'/backStage/form/group'
  },
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

<style lang="less" scoped></style>
