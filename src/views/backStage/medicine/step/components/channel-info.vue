<template>

    <div>
            <a-form
                    ref="formRef"
                    :model="formData"
                    class="form"
                    :label-col-props="{ span: 6 }"
                    :wrapper-col-props="{ span: 18 }"
            >
                <a-form-item
                        field="doctorRemark"
                        label="医生备注"
                        :rules="[
        {
          required: true,
          message: '请输入医生备注',
        },
      ]"
                >

                    <a-textarea
                            v-model="formData.doctorRemark"
                            placeholder="请输入医生备注"
                    />
                </a-form-item>

                <a-button @click="handleMedicine" :style="{width: '100px',height:'50px',margin: '10px auto'}" type="primary" status="success">开药</a-button>
                <a-modal width="800px" v-model:visible="visible" @cancel="handleCancel($refs)" @ok="handleConfirm($refs)"  unmountOnClose>
                    <template #title>
                        开药
                    </template>
                    <div>
                        <a-form  :model="form" :style="{width:'600px'}">
                            <a-form-item field="medicine" label="药品"
                                         :rules="[{required:true,message:'请开药'}]"
                                         :validate-trigger="['change','input']"
                            >
                                <a-tree-select :data="treeData" v-model="form.medicine" placeholder="请选择药品"/>

                            </a-form-item>
                            <a-form-item field="count" label="数量"
                                         :rules="[{required:true,message:'药品数量'}]"
                                         :validate-trigger="['change','input']"
                            >
                                <a-input v-model="count" placeholder="请输入数量"></a-input>

                            </a-form-item>
<!--                            <a-form-item field="count"-->
<!--                                                       :rules="[{required:true,message:'药品数量'}]"-->
<!--                                                       :validate-trigger="['change','input']"-->
<!--                        >-->

<!--                        </a-form-item>-->
<!--                            <TodoList></TodoList>-->
                        </a-form>
                    </div>
                </a-modal>

                <a-form-item
                        field="isReferral"
                        label="是否转诊"
                        :rules="[{ required: true }]"
                >
                    <a-radio-group v-model="formData.isReferral">
                        <a-radio :value="1">是</a-radio>
                        <a-radio :value="0">否</a-radio>
                    </a-radio-group>
                </a-form-item>
                <a-form-item
                        v-show="formData.isReferral === 1 ? 1:0"
                        field="hospital"
                        label="转诊医院"
                        :rules="[
        {
          required: true,
          message: '请输入就诊医院',
        }
      ]">
                    <a-input v-model="formData.hospital" placeholder="请输入转诊医院"></a-input>
                </a-form-item>
                <a-form-item
                        field="doctorName"
                        label="医生"
                        :rules="[
        {
          required: true,
          message: '医生姓名',
        }
      ]"
                        row-class="keep-margin"
                >
                    <a-input
                            v-model="formData.doctorName"
                            placeholder="请输入医生姓名"
                    />
                </a-form-item>
                <a-form-item>
                    <a-space>
                        <a-button type="secondary" @click="goPrev">
                            上一步
                        </a-button>
                        <a-button type="primary" @click="onNextClick($refs)">
                            提交
                        </a-button>
                    </a-space>
                </a-form-item>
            </a-form>
        </div>



</template>

<script lang="ts">
    import {defineComponent, getCurrentInstance, ref} from 'vue';
import { FormInstance } from '@arco-design/web-vue/es/form';
import { ChannelInfoModel } from '@/api/form';
    import {pageMedicine, queryMedicines, replenishInventory} from '@/api/medicine'
// import TodoList from '@/components/TodoList/index.vue'

export default defineComponent({
    // components:{TodoList},
  emits: ['changeStep'],
  setup(props, ctx) {
      const treeData = ref([
      ])
      const ctx1 = getCurrentInstance()
      const {globalProperties} = ctx1.appContext.config
      const visible = ref(false)
      const form = ref({
          medicine:''
      })
    const formRef = ref<FormInstance>();
      const count = ref()
    const formData = ref<ChannelInfoModel>({
        isReferral:0,
        doctorName: '',
        doctorRemark: '',
        hospital:'',
        medicine:[]
    });
      const reset2 = () =>{
          formData.value = {
              isReferral:0,
              doctorName: '',
              doctorRemark: '',
              hospital:'',
              medicine:[]
          }
      }
      const tData = ref({})
      const handleData = (data)=>{
          tData.value = data
          // formData.value = {
          //     ...data
          // }
          console.log('data',data)
      }
    const handleMedicine = ()=>{
        visible.value = true
    }
    const handleCancel = ()=>{}
     const handlePageMedicine = async ()=>{
         const {data} =  await queryMedicines()
         data.forEach(item=>{
             treeData.value.push({
                 key:item.id,
                 title:item.name
             })
         })
     }
      handlePageMedicine()
      const handleConfirm = async ()=>{

      }
    const onNextClick = async ($ref) => {
      const res = await formRef.value?.validate();
      if (!res) {
        ctx.emit('changeStep', 'submit', { ...formData.value });
      }
        // formData.value.medicine = [
        //     {
        //         id:form.value.medicine,
        //         count:count.value
        //     }
        // ] +''
      // const body = {
      //     ...formData.value,
      //     identityType:0,
      //     identityTypeId:1,
      //     timeType:0,
      //     situation:'身体不舒服'
      // }
      //   await replenishInventory(body)

    };
    const goPrev = () => {
      ctx.emit('changeStep', 'backward');
    };
      // globalProperties.$EventBus.on('reset2',reset2)
      globalProperties.$EventBus.on('handleData',handleData)
    return {
      formData,
      formRef,
      onNextClick,
      goPrev,
        visible,
        handleMedicine,
        form,
        handleCancel,
        handleConfirm,
        treeData,
        count
    };
  },
});
</script>

<style scoped lang="less">
.container {
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
  width: 540px;
}

.form-content {
  padding: 8px 50px 0 30px;
}
</style>
