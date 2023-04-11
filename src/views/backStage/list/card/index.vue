<template>
  <div class="container">
    <Breadcrumb :items="['menu.list', 'menu.list.cardList']" />
    <a-row :gutter="20" align="stretch">
      <a-col :span="24">
        <a-card class="general-card" :title="$t('menu.list.cardList')">
          <a-row justify="space-between">
            <a-col :span="24">
              <a-tabs :default-active-tab="1" type="rounded">
                <a-tab-pane key="1" :title="$t('cardList.tab.title.all')">
                  <a-col :span="6" class="list-col" @click="handleCreate()">
                    <div class="card-wrap empty-wrap">
                      <a-card :bordered="false" hoverable>
                        <a-result :status="null" :title="$t('cardList.content.action')">
                          <template #icon>
                            <icon-plus style="font-size: 20px" />
                          </template>
                        </a-result>
                      </a-card>
                    </div>
                  </a-col>
                  <QualityInspection :data="dataCompetitive" />
                  <TheService :data="dataBall"/>
                  <RulesPreset :data="dataAdversarial"/>
                  <WaterCompetition :data="dataWaterCompetition" />
                </a-tab-pane>

                <a-tab-pane key="2" :title="$t('cardList.tab.title.competitiveCompetition')">
                  <QualityInspection :data="dataCompetitive"/>
                </a-tab-pane>
                <a-tab-pane key="3" :title="$t('cardList.tab.title.ballGames')">
                  <TheService :data="dataBall"/>
                </a-tab-pane>
                <a-tab-pane key="4" :title="$t('cardList.tab.title.adversarialCompetition')">
                  <RulesPreset :data="dataAdversarial"/>
                </a-tab-pane>
                <a-tab-pane key="5" :title="$t('cardList.tab.title.waterCompetition')">
                  <WaterCompetition :data="dataWaterCompetition" />
                </a-tab-pane>
              </a-tabs>
            </a-col>
            <a-input-search
              :placeholder="$t('cardList.searchInput.placeholder')"
              style="width: 240px; position: absolute; top: 60px; right: 20px"
            />
          </a-row>
        </a-card>
      </a-col>
    </a-row>
    <a-modal v-model:visible="visible" @ok="handleSubmit($refs.formSubmit)" @cancel="handleCancel($refs.formSubmit)">
      <template #title>
        创建项目
      </template>
      <div>
        <a-form ref="formSubmit" :model="form" :style="{ width: '400px' }" @submit="handleSubmit">
          <a-form-item field="type"  label="项目类型">
            <a-tree-select :data="treeData" v-model="form.type" placeholder="请选择项目类型"/>
        </a-form-item>
          <a-form-item field="name"  label="项目名称">
          <a-input
              v-model="form.name"
              placeholder="请输入项目名称"
          />

        </a-form-item>
          <a-form-item field="info"  label="项目简介">
            <a-textarea v-model="form.info" placeholder="请输入项目简介" auto-size />
          </a-form-item>
          <a-form-item label="项目图片">
            <a-space direction="vertical" :style="{ width: '100%' }">
              <div class="choose-cover">
                <div class="uploader-comp">
                  <div id="block-choose" class="block-choose" :style="coverStyle">
                    <img :src="imgSrc"  style="width: 100px; height: 100px; align-self: center;" v-show="isImg"/>
                  </div>
                  <input type="file" @change="uploadCover()" @mouseover="mouseOver" @mouseout="mouseOut" ref="inputPic" class="inputPic" accept="image/jpeg,image/jpg,image/png">
                </div>
                <div style="margin-top: 10px; color: #9b9d9e;">请上传JPG、JPEG、PNG格式的封面图噢~</div>
              </div>
            </a-space>
          </a-form-item>
          <a-form-item field="principal" label="负责人">
          <a-input v-model="form.principal" placeholder="请输入负责人" />
        </a-form-item>
        </a-form>
      </div>
    </a-modal>
  </div>
</template>

<script lang="ts">
/* eslint-disable */
import axios from 'axios';
import { IconEdit, IconPlus } from '@arco-design/web-vue/es/icon'
import {defineComponent, reactive,ref,getCurrentInstance} from 'vue';
import QualityInspection from './components/quality-inspection.vue';
import TheService from './components/the-service.vue';
import RulesPreset from './components/reules-preset.vue';
import WaterCompetition from "./components/WaterCompetition.vue";
import { addComInfo, getComInfos,uploadImg} from '@/api/list';
export default defineComponent({
  components: {
    QualityInspection,
    TheService,
    RulesPreset,
    WaterCompetition,
    IconEdit,
    IconPlus
  },
  setup(props) {

    // axios.defaults.baseURL='http://localhost:8004';
    const ctx1 = getCurrentInstance()
    const  visible = ref(false)
    let data = ref([])
    let dataCompetitive = ref([])
    let dataBall = ref([])
    let dataAdversarial = ref([])
    let dataWaterCompetition = ref([])
    const  formSubmit = ref([])
    const inputPic = ref(null)

    const form = reactive({
      type:'',
      name:'',
      principal:'',
      info:'',
      picture:'',
    })
    const treeData = [
      {
        key: '竞技性比赛',
        title: '竞技性比赛'
      },
      {
        key: '球类比赛',
        title: '球类比赛'
      },
      {
        key: '对抗性比赛',
        title: '对抗性比赛'
      },{
        key: '水上比赛',
        title: '水上比赛'
      },


    ]

    const imgSrc = ref('@/assets/images/img1.jpg')
    const isImg = ref(false)
    const handleCreate = ()=>{
      visible.value = true
      console.log('create cate')
    }
    const handleSubmit = async (formSubmit)=>{
      console.log('value1',form)
      const res = await addComInfo(form)
      formSubmit.resetFields()
      getComCategorys()
      visible.value = false
      isImg.value = false
      console.log('form.value.picture1111',form.picture)
    }
    const handleCancel = (formSubmit)=>{
      formSubmit.resetFields()
      visible.value = false
      isImg.value = false
    }


    const getComCategorys = async ()=>{
      const res =  await getComInfos()
      data.value = res.data
      dataCompetitive.value = res.data.filter(item=>{
        return item.type==='竞技性比赛'
      })
      dataBall.value = res.data.filter(item=>{
        return item.type === '球类比赛'
      })
      dataAdversarial.value = res.data.filter(item=>{
        return item.type==='对抗性比赛'
      })
      dataWaterCompetition.value = res.data.filter(item=>{
        return item.type === '水上比赛'
      })
      // console.log('dataService.value',dataService.value )
      // console.log('data',data.value)
    }

    const uploadCover = (e)=> {
      var me = ctx1.ctx;

      let f = inputPic.value.files[0];

      let multiForm = new FormData() ; 		//创建一个form对象
      multiForm.append('files', f, f.name);  	//append 向form表单添加数据

      // 请求后端获得最新数据
      var fsServerUrl = 'http://localhost:8009';
      axios.defaults.withCredentials = true;
      var fileServer = fsServerUrl + '/file/uploadFiles';

      axios.post(
          fileServer,
          multiForm,
          {
            headers: {
              'Content-Type': 'multipart/form-data',
            }
          })
          .then(res => {
            console.log('resImg',res)
            if (res.code === 200) {
              var imagesList = res.data;
              if (imagesList.length < 1) {
                alert("张图片上传失败，请保证图片不能为空，并且符合 jpg/png/jpeg 的后缀格式！");
              } else {
                imgSrc.value = imagesList[0];
                form.picture = imagesList[0]
                isImg.value = true

              }
            } else {
              alert(res.data.msg);
            }
          });
    }

    getComCategorys()
    return {
      // getComCategorys
      data,
      dataCompetitive,
      dataBall,
      dataAdversarial,
      dataWaterCompetition,
      handleCreate,
      visible,
      handleSubmit,
      handleCancel,
      form,
      treeData,
      inputPic,
      uploadCover,
      imgSrc,
      isImg,
      formSubmit
      // f
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
