<template>
  <div class="login-form-wrapper">
    <div class="login-form-title">{{ $t('login.form.title') }}</div>
    <div class="login-form-sub-title">{{ $t('login.form.title') }}</div>
<!--    <div class="login-form-error-msg">{{ errorMessage }}</div>-->
    <a-form
      ref="loginForm"
      :model="userInfo"
      class="login-form"
      layout="vertical"
      @submit="handleSubmit({ errors: undefined, values: userInfo })"
    >
      <a-form-item
        field="username"
        :rules="[{ required: true, message: $t('login.form.userName.errMsg') }]"
        :validate-trigger="['change', 'blur']"
        hide-label
      >
        <a-input
          v-model="userInfo.username"
          :placeholder="$t('login.form.userName.placeholder')"
          @keyup.enter="handleSubmit({ errors: undefined, values: userInfo })"
        >
          <template #prefix>
            <icon-user />
          </template>
        </a-input>
      </a-form-item>
      <a-form-item
        field="password"
        :rules="[{ required: true, message: $t('login.form.password.errMsg') }]"
        :validate-trigger="['change', 'blur']"
        hide-label
      >
        <a-input-password
          v-model="userInfo.password"
          :placeholder="$t('login.form.password.placeholder')"
          allow-clear
          @keyup.enter="handleSubmit"
        >
          <template #prefix>
            <icon-lock />
          </template>
        </a-input-password>
      </a-form-item>
      <a-form-item
          field="validateCode"
          :rules="[{ required: true, message: $t('login.form.validateCode.errMsg') }]"
          :validate-trigger="['change', 'blur']"
          hide-label
      >
        <a-input

            v-model="userInfo.validateCode"
            :placeholder="$t('login.form.validateCode.placeholder')"
            @keyup.enter="handleSubmit({ errors: undefined, values: userInfo })"
        >
          <template #prefix>
            <icon-safe />
          </template>
        </a-input>
      </a-form-item>
      <a-form-item>
        <a-image
            @click="handleChangeValidateCode()"
            :preview-visible="visible2"
            @preview-visible-change="() => { visible2 = false }"
            width="100"
            :src="img"
        />
      </a-form-item>
      <a-space :size="16">
        <div>
          <input type="checkbox"  :style="{position:'relative',top:'3px'}" :checked="isChecked2" @click="isChecked2 = !isChecked2"  name="" value="2" />
          <span :style="{fontSize:'12px',margin:'0 0 0 10px'}">十天内自动登录</span>
        </div>
        <div class="login-form-password-actions">
          <!--  <a-checkbox checked="rememberPassword" @change="setRememberPassword">
            {{ $t('login.form.rememberPassword') }}
          </a-checkbox> -->
          <a-link>{{ $t('login.form.forgetPassword') }}</a-link>
        </div>
      </a-space>
      <a-button :style="{margin:'10px 0 0 0'}" type="primary" html-type="submit" long :loading="loading">
        {{ $t('login.form.login') }}
      </a-button>
    </a-form>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, reactive, onMounted} from 'vue';
import { useRouter } from 'vue-router';
import { Message } from '@arco-design/web-vue';
import { ValidatedError } from '@arco-design/web-vue/es/form/interface';
import { useI18n } from 'vue-i18n';
import { useUserStore } from '@/store';
import useLoading from '@/hooks/loading';
import { LoginData } from '@/api/user';

export default defineComponent({
  setup() {
    const router = useRouter();
    const { t } = useI18n();
    const errorMessage = ref('');
    const { loading, setLoading } = useLoading();
    const userStore = useUserStore();
    const  visible2 = ref(false)
    const userInfo = reactive({
      username: 'admin',
      password: 'admin',
      validateCode:'',
      key:''
    });
    const img = ref('')
    const getValidateCode = async ()=>{
      const  res =  await userStore.getValidateCode();
      console.log(res)
      img.value = res.data.validateCode
        console.log('img.value111',typeof img.value)
      userInfo.key=res.data.key
        console.log(userInfo)
    }
    getValidateCode()
    console.log('img',img)
    console.log(111)

  const handleChangeValidateCode =  async ()=>{
    const  res =  await userStore.getValidateCode();
    img.value = res.data.validateCode
    userInfo.key=res.data.key
  }
    const handleSubmit = async ({
      errors,
      values,
    }: {
      errors: Record<string, ValidatedError> | undefined;
      values: LoginData;
    }) => {

      if (!errors) {
        setLoading(true);
        try {
          const  res =  await userStore.login(values);
          window.sessionStorage.setItem('adminInfo',JSON.stringify(res.data))
          if(res.code===200) {
            const { redirect, ...othersQuery } = router.currentRoute.value.query;
            router.push({
              name: (redirect as string) || 'workplace',
              query: {
                ...othersQuery,
              },
            });
            Message.success(t('login.form.login.success'));
          }

        } catch (err) {
          errorMessage.value = (err as Error).message;
        } finally {
          setLoading(false);
        }
      }
    };
    // 演示地址自动登录
    onMounted(() => {

      // setTimeout(() => {
      //   handleSubmit({ errors: undefined, values: userInfo });
      // }, 3000);
    });
    const setRememberPassword = () => {
      //
    };
    return {
      loading,
      userInfo,
      errorMessage,
      handleSubmit,
      setRememberPassword,
      img,
      handleChangeValidateCode,
      visible2
    };
  },
});
</script>

<style lang="less" scoped>
.login-form {
  &-wrapper {
    width: 320px;
  }

  &-title {
    color: var(--color-text-1);
    font-weight: admin;
    font-size: 24px;
    line-height: 32px;
  }

  &-sub-title {
    color: var(--color-text-3);
    font-size: 16px;
    line-height: 24px;
  }

  &-error-msg {
    height: 32px;
    color: rgb(var(--red-6));
    line-height: 32px;
  }

  &-password-actions {
    display: flex;
    justify-content: space-between;
  }

  &-register-btn {
    color: var(--color-text-3) !important;
  }
}
</style>
