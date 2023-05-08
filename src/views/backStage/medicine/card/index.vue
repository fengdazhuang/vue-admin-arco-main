<template>
  <div class="container">
    <Breadcrumb :items="['医疗管理', '就诊登记']" />
      <div class="main-right">
          <a-card :style="{width:'100%'}" class="general-card card" title="药品库存">
              <a-row style="margin-bottom: 16px">
                  <a-col :flex="1">
                      <a-form
                              :model="medicineName"
                              :label-col-props="{ span: 6 }"
                              :wrapper-col-props="{ span: 18 }"
                              label-align="left"
                      >           <a-row :gutter="16">
                              <a-col :span="9">
                                  <a-form-item field="name"  label="药品名称">
                                      <a-input v-model="medicineName" placeholder="请输入药品名称" />
                                  </a-form-item>
                              </a-col>
                          <a-space  :size="9">
                              <a-button type="primary" :style="{margin:'0 0 0 20px'}" @click="handleSearch">
                                  <template #icon>
                                      <icon-search />
                                  </template>
                                  查询
                              </a-button>
                              <a-button @click="reset">
                                  <template #icon>
                                      <icon-refresh />
                                  </template>
                                  重置
                              </a-button>
                          </a-space>
                      </a-row>
                      </a-form>
                  </a-col>
              </a-row>
              <a-divider style="margin-top: 20px" />
              <a-row style="margin-bottom: 16px">
                  <a-col :span="16">
                      <a-space>
                          <a-button @click="handleCreate()" type="primary">新增</a-button>
                          <a-modal width="800px" v-model:visible="visible" @cancel="handleCancel($refs)" @ok="handleConfirm($refs)"  unmountOnClose>
                              <template #title>
                                  添加药品
                              </template>
                              <div>
                                  <a-form ref="formRef"  :model="form" :style="{width:'600px'}">
                                      <a-form-item field="name" label="药品"
                                                   :rules="[{required:true,message:'请输入药品名称'}]"
                                                   :validate-trigger="['change','input']"
                                      >
                                          <a-input v-model="form.name" placeholder="药品名称" />
                                      </a-form-item>

                                      <a-form-item field="maker" label="厂家"
                                                   :rules="[{required:true,message:'请输入厂家'}]"
                                                   :validate-trigger="['change','input']"
                                      >
                                          <a-input v-model="form.maker" placeholder="厂家" />
                                      </a-form-item>
                                      <a-form-item field="specs" label="规格"
                                                   :rules="[{required:true,message:'请输入药品规格'}]"
                                                   :validate-trigger="['change','input']"
                                      >
                                          <a-input v-model="form.specs" placeholder="规格" />
                                      </a-form-item>
                                      <a-form-item field="efficacy" label="疗效"
                                                   :rules="[{required:true,message:'请输入疗效'}]"
                                                   :validate-trigger="['change','input']"
                                      >
                                          <a-input v-model="form.efficacy" placeholder="疗效" />
                                      </a-form-item>
                                      <a-form-item>
                                          <a-space>
                                              <a-button type="primary" status="danger" @click="$refs.formRef.resetFields()">重置</a-button>
                                          </a-space>
                                      </a-form-item>
                                  </a-form>
                              </div>
                          </a-modal>
                      </a-space>
                  </a-col>
              </a-row>
              <a-table
                      size="large"
                      row-key="id"
                      :loading="loading"
                      :pagination="pagination"
                      :data="medicineList"
                      :bordered="false"
                      @page-change="onPageChange"

              >
                  <template #columns>
                      <a-table-column
                              title="名称"
                              data-index="name"
                      >
                      </a-table-column>
                      <a-table-column
                              title="厂家"
                              data-index="maker"
                      >
                      </a-table-column>
                      <a-table-column
                              title="规格"
                              data-index="specs"
                      >
                      </a-table-column>
                      <a-table-column
                              title="库存"
                              data-index="inventory"
                      >
                      </a-table-column>
                      <a-table-column
                              title="疗效"
                              data-index="efficacy"
                      >
                      </a-table-column>
                      <a-table-column
                              title="操作"
                              data-index="operations"
                      >
                          <template #cell>
                              <a-button @click="handleStorage($refs)" type="text">补充库存</a-button>
                              <a-button @click="handleCheck" type="text" status="danger">出入清单</a-button>
                          </template>
                      </a-table-column>
                  </template>
              </a-table>
              <a-modal width="800px"  v-model:visible="showModel1" @cancel="handleCancel1" @ok="handleConfirm1($refs)"  unmountOnClose>
                  <template #title>
                      补充库存
                  </template>
                  <div>

                      <a-form setFields="" ref="formStorage" :model="form1" :style="{width:'600px'}">
                          <a-form-item  label="添加量"
                                       :rules="[{required:true,message:'phoneNumber is required'},{minLength:5,message:'不能少于5位数字'}]"
                                       :validate-trigger="['change','input']"
                          >
                              <a-input  placeholder="请输入添加量" />
                          </a-form-item>
                          <a-form-item  label="采购总价"
                                        :rules="[{required:true,message:'phoneNumber is required'},{minLength:5,message:'不能少于5位数字'}]"
                                        :validate-trigger="['change','input']"
                          >
                              <a-input  placeholder="请输入采购总价" />
                          </a-form-item>
                      </a-form>
                  </div>
              </a-modal>
              <a-modal width="800px" v-model:visible="showModel2" @cancel="handleCancel2" @ok="handleConfirm2($refs)"  unmountOnClose>
                  <template #title>
                      出入清单
                  </template>
                  <div>

                      <a-form setFields="" :model="form2" :style="{width:'600px'}">
<!--                          <a-form-item field="name" label="姓名"-->
<!--                                       :rules="[{required:true,message:'name is required'},{minLength:2,message:'姓名不能少于两位'}]"-->
<!--                                       :validate-trigger="['change','input']"-->
<!--                          >-->
<!--                              <a-input v-model="form.name" placeholder="请输入你的姓名" />-->
<!--                          </a-form-item>-->
<!--                          <a-form-item label="照片">-->
<!--                              <a-image-->
<!--                                      :src="form.photo"-->
<!--                              />-->
<!--                          </a-form-item>-->
<!--                          <a-form-item field="competitionName" label="参赛项目"-->
<!--                                       :rules="[{required:true,message:'name is required'},{minLength:2,message:'姓名不能少于两位'}]"-->
<!--                                       :validate-trigger="['change','input']"-->
<!--                          >-->
<!--                              <a-tree-select :data="treeData" v-model="form.competitionName" placeholder="请选择参赛项目"/>-->
<!--                          </a-form-item>-->
<!--                          <a-form-item field="email" label="电子邮箱"-->
<!--                                       :rules="[{required:true,message:'phoneNumber is required'},{minLength:5,message:'不能少于5位数字'}]"-->
<!--                                       :validate-trigger="['change','input']"-->
<!--                          >-->
<!--                              <a-input v-model="form.email" placeholder="请输入电子邮箱" />-->
<!--                          </a-form-item>-->
<!--                          <a-form-item field="country" label="国籍" :rules="[{required:true,message:'国籍不能为空'}]">-->
<!--                              <a-select v-model="form.country" placeholder="请选择国籍" allow-clear>-->
<!--                                  <a-option value="中国">中国</a-option>-->
<!--                                  <a-option value="巴基斯坦">巴基斯坦</a-option>-->
<!--                                  <a-option value="韩国">韩国</a-option>-->
<!--                              </a-select>-->
<!--                          </a-form-item>-->
<!--                          <a-form-item field="sex" label="性别" :rules="[{required:true,message:'不能为空'}]">-->
<!--                              <a-radio-group v-model="form.sex">-->
<!--                                  <a-radio value="1">男</a-radio>-->
<!--                                  <a-radio value="0">女</a-radio>-->
<!--                              </a-radio-group>-->
<!--                          </a-form-item>-->
<!--                          <a-form-item>-->
<!--                              <a-space>-->
<!--                                  &lt;!&ndash; <a-button html-type="submit" type="primary">提交</a-button> &ndash;&gt;-->
<!--                                  <a-button type="primary" status="danger" @click="$refs.formRef.resetFields()">重置</a-button>-->
<!--                              </a-space>-->
<!--                          </a-form-item>-->
                      </a-form>
                  </div>
              </a-modal>
          </a-card>
      </div>
  </div>
</template>

<script lang="ts">
/* eslint-disable */
import axios from 'axios';
import { IconEdit, IconPlus } from '@arco-design/web-vue/es/icon'
import {defineComponent, reactive,ref,getCurrentInstance} from 'vue';
import { pageResult} from "@/api/dope";
import {Pagination} from "../../../../types/global";
import {pageMedicine, queryMedicines,addMedicine} from '@/api/medicine'
import useLoading from "../../../../hooks/loading";

export default defineComponent({
    setup(){
        const { loading,setLoading } = useLoading(true);
        const visible = ref(false)
        const showModel1 = ref(false)
        const showModel2 = ref(false)
        const form = ref({
            name:'',
            maker:'',
            specs:'',
            efficacy:''
        })
        const form1 = ref({})
        const form2 = ref({})
        const medicineName = ref('')
        const medicineList = ref([])
        const handleCreate = ()=>{
            visible.value = true
        }
        const handleCancel = ($ref)=>{
            visible.value = false
            form.value={
                name:'',
                maker:'',
                specs:'',
                efficacy:''
            }
        }
        const handlePageMedicine = async ()=>{
            const useParams = {
                params:{
                    pageNumber:1,
                    pageSize:15,
                    name:medicineName.value
                }
            }
            const {data} =  await pageMedicine(useParams)
            medicineList.value = data.records
        }
        handlePageMedicine()
        const handleConfirm = async ($ref)=>{
            $ref.formRef.validate((valid)=>{
                if(!valid ) {
                    visible.value = false
                    $ref.formRef.resetFields()
                }else {
                    visible.value = true
                }
            })
            const body = {
                name:form.value.name,
                maker:form.value.maker,
                specs:form.value.specs,
                efficacy:form.value.efficacy
            }
            await addMedicine(body)
            handlePageMedicine()
        }
        const handleStorage = ()=>{
            showModel1.value = true
        }
        const handleCheck = ()=>{
            showModel2.value = true
        }
        const handleSearch = ()=>{
            handlePageMedicine()
        }
        const handleCancel1 = ()=>{
            showModel1.value = false
        }
        const handleConfirm1 = ($ref)=>{
            $ref.formStorage.validate((valid)=>{
                if(!valid ) {
                    showModel1.value = false
                    $ref.formStorage.resetFields()
                }else {
                    showModel1.value = true
                }
            })

            console.log(1111)
        }

        const handleCancel2 = ()=>{
            showModel2.value = false
        }
        const handleConfirm2 = ()=>{
            showModel2.value = false
        }
        return {
            medicineName,
            medicineList,
            showModel1,
            showModel2,
            form1,
            form2,
            handleCancel1,
            handleCancel2,
            handleConfirm1,
            handleConfirm2,
            handleStorage,
            handleCheck,
            handleCreate,
            form,
            visible,
            handleCancel,
            handleConfirm,
            handleSearch
            // loading
        }
    }
});
</script>

<style scoped lang="less">
.container {
  :deep(.arco-list-content) {
    overflow-x: hidden;
  }

  :deep(.arco-card-meta-title) {
    font-size: 14px;
  }
}
:deep(.arco-list-col) {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;
}

:deep(.arco-list-item) {
  width: 33%;
}

:deep(.block-title) {
  margin: 0 0 12px 0;
  font-size: 14px;
}
:deep(.list-wrap) {
  // min-height: 140px;
  .list-row {
    align-items: stretch;
    .list-col {
      margin-bottom: 16px;
    }
  }
  :deep(.arco-space) {
    width: 100%;
    .arco-space-item {
      &:last-child {
        flex: 1;
      }
    }
  }
}
.card-wrap {
  height: 100%;
  transition: all 0.3s;
  border: 1px solid var(--color-neutral-3);
  &:hover {
    transform: translateY(-4px);
  }
  :deep(.arco-card-meta-description) {
    color: rgb(var(--gray-6));
    .arco-descriptions-item-label-inline {
      font-weight: normal;
      font-size: 12px;
      color: rgb(var(--gray-6));
    }
    .arco-descriptions-item-value-inline {
      color: rgb(var(--gray-8));
    }
  }
}
.empty-wrap {
  height: 200px;
  border-radius: 4px;
  :deep(.arco-card) {
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 4px;
    .arco-result-title {
      color: rgb(var(--gray-6));
    }
  }
}
</style>
