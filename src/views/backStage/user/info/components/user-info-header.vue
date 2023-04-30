<template>
  <div class="header">
    <a-space :size="12" direction="vertical" align="center">
      <a-avatar :size="64">
        <template #trigger-icon>
          <icon-camera />
        </template>
        <img :src="updateAdminInfo.picture" />
      </a-avatar>
      <a-typography-title :heading="6" style="margin: 0">
        {{ adminInfo.username }}
      </a-typography-title>
      <div class="user-msg">
        <a-space :size="18">
          <div>
            <icon-user />
            <a-typography-text>IT</a-typography-text>
          </div>
          <div>
            <icon-home />
            <a-typography-text>
              管理员
            </a-typography-text>
          </div>
          <div>
            <icon-location />
            <a-typography-text>杭州</a-typography-text>
          </div>
        </a-space>
      </div>
    </a-space>
  </div>
</template>

<script lang="ts">
import {defineComponent, getCurrentInstance, ref} from 'vue';
import { useUserStore } from '@/store';
import {getInfo} from "@/api/user";

export default defineComponent({
  setup() {
    const ctx1 = getCurrentInstance()
    const {globalProperties} = ctx1.appContext.config
    const userStore = useUserStore();
    const adminInfo = JSON.parse(window.sessionStorage.getItem('adminInfo'))
    const updateAdminInfo = ref({})
    const handlGetInfo = async ()=>{
      const useParams = {
        params:{
          id:adminInfo.id
        }
      }
      const {data} = await getInfo(useParams)

      if(data.sex===1) {
        data.sex = '男'
      } else {
        data.sex = '女'
      }

      updateAdminInfo.value = data
    }
    handlGetInfo()
    globalProperties.$EventBus.on('handlGetInfo',handlGetInfo)
    return {
      userInfo: userStore,
        adminInfo,
      updateAdminInfo

    };
  },
});
</script>

<style scoped lang="less">
.header {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 204px;
  color: var(--gray-10);
  background: url(//p3-armor.byteimg.com/tos-cn-i-49unhts6dw/41c6b125cc2e27021bf7fcc9a9b1897c.svg~tplv-49unhts6dw-image.image)
    no-repeat;
  background-size: cover;
  border-radius: 4px;

  :deep(.arco-avatar-trigger-icon-button) {
    color: rgb(var(--arcoblue-6));

    :deep(.arco-icon) {
      vertical-align: -1px;
    }
  }
  .user-msg {
    .arco-icon {
      color: rgb(var(--gray-10));
    }
    .arco-typography {
      margin-left: 6px;
    }
  }
}
</style>
