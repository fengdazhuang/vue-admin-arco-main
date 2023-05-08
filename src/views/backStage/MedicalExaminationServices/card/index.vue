<template>
  <div class="container">
    <Breadcrumb :items="['医检管理', '检测数据']" />
      <div class="main-right">
          <a-card :style="{width:'100%'}" class="general-card card" title="检测数据">
              <a-row style="margin-bottom: 16px">
                  <a-col :flex="1">
                      <a-form
                              :model="form"
                              :label-col-props="{ span: 6 }"
                              :wrapper-col-props="{ span: 18 }"
                              label-align="left"
                      >           <a-row :gutter="16">
                          <a-col :span="9">
                              <a-form-item field="country"  label="国籍">
                                  <a-tree-select :data="TreeCountryData" v-model="form.country" placeholder="请选择检测类型"/>
                              </a-form-item>
                          </a-col>
                              <a-col :span="9">
                                  <a-form-item field="name"  label="姓名">
                                      <a-input v-model="form.name" placeholder="请输入姓名" />
                                  </a-form-item>
                              </a-col>

                              <a-col :span="9">
                                  <a-form-item field="examinationType"  label="检查类型">
                                      <a-tree-select :data="TreeExaminationType" v-model="form.examinationType" placeholder="请选择检测类型"/>
                                  </a-form-item>
                              </a-col>



                              <a-col :span="9">
                                  <a-form-item field="examinationResult"  label="检测结果">
                                      <a-tree-select :data="TreeExaminationResult" v-model="form.examinationResult" placeholder="请选择检测类型"/>
                                  </a-form-item>
                              </a-col>
                          <a-col :span="9">
                              <a-form-item field="examinationTime"  label="日期">
                                      <a-date-picker
                                              v-model="form.examinationTime"
                                              format="YYYY-MM-DD"
                                              @ok="onOk"
                                      />
                              </a-form-item>
                          </a-col>

                          <a-space  :size="9">
                              <a-button type="primary" :style="{margin:'0 0 0 20px'}" @click="handlePageExamination">
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
              <a-table
                      size="large"
                      row-key="id"
                      :loading="loading"
                      :pagination="pagination"
                      :data="playerList"
                      :bordered="false"
                      @page-change="onPageChange"
                      :row-selection="rowSelection"
                      @selection-change="handleGetId"
              >
                  <template #columns>
                      <a-table-column
                              title="姓名"
                              data-index="name"
                      >

                      </a-table-column>
                      <a-table-column
                              title="国籍"
                              data-index="country"
                      />
                      <a-table-column
                              title="检查地点"
                              data-index="examinationPosition"
                      >
                      </a-table-column>
                      <a-table-column
                              title="检查结果"
                              data-index="examinationResult"
                      >
                          <template #cell="{ record }">
                              <span :style="{color:(record.examinationResult===0? 'red':record.examinationResult===1? 'green':'orange')}">{{record.examinationResultText}}</span>
                          </template>
                      </a-table-column>
                      <a-table-column
                              title="检查时间"
                              data-index="examinationTime"
                      >
                      </a-table-column>
                      <a-table-column
                              title="检测人员"
                              data-index="inspector"
                      >
                      </a-table-column>
                      <a-table-column
                              title="样品编号"
                              data-index="sampleNumber"
                      >
                      </a-table-column>
                      <a-table-column
                              title="检测类型"
                              data-index="examinationType"
                      >
                      </a-table-column>

                      <a-table-column
                              title="操作"
                              data-index="operations"
                      >
                          <template #cell="{ record }">
                              <a-button @click="handleSubmitResult(record,1)" type="text" status="danger">删除</a-button>

                          </template>
                      </a-table-column>
                  </template>
              </a-table>
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
import useLoading from "../../../../hooks/loading";
export default defineComponent({
    setup(){
        const { loading,setLoading } = useLoading(true);
        const basePagination: Pagination = {
            pageNumber: 1,
            pageSize: 15,
        };
        const pagination = reactive({
            ...basePagination,
        });
        const form = ref({
            country:'',
            name:'',
            examinationResult:'',
            examinationType:'',
            examinationTime:''
        })
        const time = ref()
        const TreeExaminationType = [
            {
                key:0,
                title:'赛内检查'
            },
            {
                key:1,
                title:'赛外检查'
            }
        ]
        const TreeCountryData = [
            {
                key:'中国',
                title:'中国'
            },
            {
                key:'巴基斯坦',
                title:'巴基斯坦'
            },
            {
                key:'韩国',
                title:'韩国'
            }
        ]
        const TreeExaminationResult = [
            {
                key:0,
                title:'异常'
            },
            {
                key:1,
                title:'正常'
            },
            {
                key:2,
                title:'检测中'
            }
        ]
      const playerList = ref([])
        const reset = ()=>{
            form.value = {
                country:'',
                name:'',
                examinationResult:'',
                examinationType:'',
                examinationTime:''
            }
        }
        const handlePageExamination = async ()=>{
            setLoading(true)
            const useParams = {
                params:{
                    pageNumber:1,
                    pageSize:15,
                    examinationType:form.value.examinationType,
                    examinationResult:form.value.examinationResult,
                    country:form.value.country,
                    examinationTime:form.value.examinationTime,
                    name:form.value.name,
                }
            }
            const {data} = await pageResult(useParams)
            data.records.forEach(item=>{
                if(item.examinationType===0) {
                    item.examinationType = '赛内检查'
                } else {
                    item.examinationType = '赛外检查'
                }
                if (item.examinationResult===0) {
                    item.examinationResultText = '异常'
                } else if(item.examinationResult===1) {
                    item.examinationResultText = '正常'
                } else if(item.examinationResult===2) {
                    item.examinationResultText= '检测中'
                }
            })
            console.log('data',data)
            playerList.value = data.records
            setLoading(false)
            reset()
        }
        handlePageExamination()
        const onOk = ()=>{
            console.log('time',time.value)
        }
        return {
            playerList,
            form,
            TreeExaminationType,
            TreeExaminationResult,
            handlePageExamination,
            time,
            onOk,
            pagination,
            reset,
            loading,
            TreeCountryData
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
