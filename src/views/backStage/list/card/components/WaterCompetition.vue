<template>
  <div class="list-wrap">

    <a-typography-title class="block-title" :heading="6">
      {{ $t('cardList.tab.title.waterCompetition') }}
    </a-typography-title>
    <a-row class="list-row" :gutter="24">
<!--      <a-col :span="6" class="list-col" @click="handleCreate()">-->
<!--        <div class="card-wrap empty-wrap">-->
<!--          <a-card :bordered="false" hoverable>-->
<!--            <a-result :status="null" :title="$t('cardList.content.action')">-->
<!--              <template #icon>-->
<!--                <icon-plus style="font-size: 20px" />-->
<!--              </template>-->
<!--            </a-result>-->
<!--          </a-card>-->
<!--        </div>-->
<!--      </a-col>-->
      <a-col
        v-for="item in data"
        :key="item.id"
        :span="6"
        class="list-col"
      >
        <CardWrap
          :loading="loading"
          :name="item.name"
          :img="item.picture"
          :createTime="item.createTime"
          :principal="item.principal"
          :default-value="item.enable"
          :action-type="item.actionType"
          :icon="item.icon"
          :open-txt="$t('cardList.content.inspection')"
          :close-txt="$t('cardList.content.delete')"
          :show-tag="false"
        >
          <a-descriptions
            style="margin-top: 16px"
            :data="item.data"
            layout="inline-horizontal"
            :column="2"
          />
          <template #skeleton>
            <a-skeleton :animation="true">
              <a-skeleton-line
                :widths="['50%', '50%', '100%', '40%']"
                :rows="4"
              />
              <a-skeleton-line :widths="['40%']" :rows="1" />
            </a-skeleton>
          </template>
        </CardWrap>
      </a-col>
    </a-row>
<!--    <a-modal v-model:visible="visible" @ok="handleSubmit" @cancel="handleCancel">-->
<!--      <template #title>-->
<!--        添加比赛项目-->
<!--      </template>-->
<!--      <div>-->
<!--        <a-form :model="form" :style="{ width: '400px' }" @submit="handleSubmit">-->
<!--          <a-form-item field="addCompetitionCategory"  label="项目类型">-->
<!--            <a-tree-select :data="treeData" v-model="form.addCompetitionCategory" placeholder="请选择项目类型"/>-->
<!--          </a-form-item>-->
<!--          <a-form-item field="competitionCategoryId" label="项目ID">-->
<!--            <a-input-->
<!--                v-model="form.competitionCategoryId"-->
<!--                placeholder="请输入项目类型ID"-->
<!--            />-->
<!--          </a-form-item>-->
<!--            <a-form-item field="info"  label="项目简介">-->
<!--              <a-textarea v-model="form.info" placeholder="请输入项目简介" auto-size />-->
<!--          </a-form-item>-->
<!--          <a-form-item field="name"  label="项目名称">-->
<!--            <a-input-->
<!--                v-model="form.name"-->
<!--                placeholder="请输入项目名称"-->
<!--            />-->
<!--          </a-form-item>-->
<!--            <a-form-item label="项目图片">-->
<!--              <a-space direction="vertical" :style="{ width: '100%' }">-->
<!--                <a-upload-->
<!--                    action="/"-->
<!--                    :fileList="file ? [file] : []"-->
<!--                    :show-file-list="false"-->
<!--                    @change="onChange"-->
<!--                    @progress="onProgress"-->
<!--                >-->
<!--                  <template #upload-button>-->
<!--                    <div-->
<!--                        :class="`arco-upload-list-item${-->
<!--                        file && file.status === 'error' ? ' arco-upload-list-item-error' : ''-->
<!--                          }`">-->
<!--                      <div-->
<!--                          class="arco-upload-list-picture custom-upload-avatar"-->
<!--                          v-if="file && file.url"-->
<!--                      >-->
<!--                        <img :src="file.url" />-->
<!--                        <div class="arco-upload-list-picture-mask">-->
<!--                          <IconEdit />-->
<!--                        </div>-->
<!--                        <a-progress-->
<!--                            v-if="file.status === 'uploading' && file.percent < 100"-->
<!--                            :percent="file.percent"-->
<!--                            type="circle"-->
<!--                            size="mini"-->
<!--                            :style="{-->
<!--                position: 'absolute',-->
<!--                left: '50%',-->
<!--                top: '50%',-->
<!--                transform: 'translateX(-50%) translateY(-50%)',-->
<!--              }"-->
<!--                        />-->
<!--                      </div>-->
<!--                      <div class="arco-upload-picture-card" v-else>-->
<!--                        <div class="arco-upload-picture-card-text">-->
<!--                          <IconPlus />-->
<!--                          <div style="margin-top: 10px; font-weight: 600">Upload</div>-->
<!--                        </div>-->
<!--                      </div>-->
<!--                    </div>-->
<!--                  </template>-->
<!--                </a-upload>-->
<!--              </a-space>-->
<!--            </a-form-item>-->
<!--          <a-form-item field="principal" label="负责人">-->
<!--            <a-input v-model="form.principal" placeholder="请输入负责人" />-->
<!--          </a-form-item>-->
<!--        </a-form>-->
<!--      </div>-->
<!--    </a-modal>-->
  </div>
</template>

<script lang="ts">
// import { IconEdit, IconPlus } from '@arco-design/web-vue/es/icon';
import { defineComponent,ref } from 'vue';
import { queryInspectionList, ServiceRecord ,addComInfo} from '@/api/list';
import useRequest from '@/hooks/request';
// import axios from "axios";
import {useUserStore} from "@/store";
import CardWrap from './card-wrap.vue';



export default defineComponent({
  components: {
    CardWrap,
    // IconPlus,
    // IconEdit
  },
  props:{
    data:Array
  },
  setup(props) {
    // axios.defaults.baseURL='http://localhost:8004';
    const userStore = useUserStore();
    const defaultValue: ServiceRecord[] = new Array(3).fill({});
    const { loading, response: renderData } = useRequest<ServiceRecord[]>(
      queryInspectionList,
      defaultValue
    );
    const form = ref({
      competitionCategoryId:'',
      info:'',
      name:'',
      picture:'1111',
      principal:'',

    })
    const treeData = [
      {
        key: 'node1',
        title: '内容质检',

      },
      {
        key: 'node3',
        title: 'Node3',
        children: [
          {
            key: 'node4',
            title: 'Node4',
          },
          {
            key: 'node5',
            title: 'Node5',
          },
        ],
      },
    ]
    const visible = ref(false)
    const handleCreate =  ()=>{

      visible.value = true
      console.log('create')
    }
    const handleSubmit = async ()=>{
      console.log('form',form)
      const res = await addComInfo(form.value)
      console.log('resCom',res)
      visible.value = false
    }
    const handleCancel = ()=>{
      visible.value = false
    }
    const file = ref();

    const onChange = (_, currentFile) => {
      file.value = {
        ...currentFile,
        // url: URL.createObjectURL(currentFile.file),
      };
    };
    const onProgress = (currentFile) => {
      file.value = currentFile;
    };
    // console.log('props',props.data)
    // const items = ref([])
    // items.value = props.data
    // let data= []
    // const getComCategorys = async ()=>{
    //   const res =  await userStore.getComcategorys()
    //   data = res.data
    //   console.log('data1',data)
    //
    // }
    //
    // getComCategorys()
    // console.log('data111111',data)


    return {
      loading,
      renderData,
      handleCreate,
      visible,
      handleSubmit,
      handleCancel,
      form,
      file,
      onChange,
      onProgress,
      treeData
    };
  },
});
</script>

<style scoped lang="less">
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
