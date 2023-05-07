<template>
  <div class="card-wrap">
    <a-card v-if="loading" :bordered="false" hoverable>
      <slot name="skeleton"></slot>
    </a-card>
    <a-card v-else :bordered="false" hoverable>
      <a-space align="start">
        <a-avatar
          v-if="icon"
          :size="24"
          style="margin-right: 8px; background-color: #626aea"
        >
          <icon-filter />
        </a-avatar>
        <a-card-meta>
          <template #title>
            <a-typography-text style="margin-right: 10px">
              项目名称：{{ name }}
            </a-typography-text>
            <template v-if="showTag">
              <a-tag
                v-if="open && isExpires === false"
                size="small"
                color="green"
              >
                <template #icon>
                  <icon-check-circle-fill />
                </template>
                <span>{{ tagText }}</span>
              </a-tag>
              <a-tag v-else-if="isExpires" size="small" color="red">
                <template #icon>
                  <icon-check-circle-fill />
                </template>
                <span>{{ expiresTagText }}</span>
              </a-tag>
            </template>
          </template>
          <template #description >
            <div class="card-img-container">
              <div :style="{margin:'25px 0 0 0'}">
              负责人：{{ principal }}
            </div>
              <div :style="{margin:'25px 0 0 0'}">
              创建时间：{{ createTime }}
            </div>
              <img class="card-img" :src="img"/>
            </div>
            <slot></slot>
          </template>

        </a-card-meta>
      </a-space>
      <template #actions>
<!--        <a-switch v-if="actionType === 'switch'" v-model="open" />-->
<!--        <a-space v-else-if="actionType === 'button'">-->
<!--          <template v-if="isExpires">-->
<!--            <a-button type="outline" @click="renew">-->
<!--              {{ expiresText }}-->
<!--            </a-button>-->
<!--          </template>-->
<!--          <template v-else>-->
<!--            <a-button v-if="open" @click="toggle()">-->
<!--              {{ closeTxt }}-->
<!--            </a-button>-->
<!--            <a-button v-else-if="!open" type="outline" @click="toggle()">-->
<!--              {{ openTxt }}-->
<!--            </a-button>-->
<!--          </template>-->
<!--        </a-space>-->
        <div>
          <a-space>
            <a-button @click="handleDelete(id)">
              {{ closeTxt }}
            </a-button>
            <a-button type="primary" @click="handleEdit">
              编辑
            </a-button>
          </a-space>
        </div>
      </template>
    </a-card>
      <a-modal v-model:visible="visible" @ok="handleSubmit()" @cancel="handleCancel($refs.formSubmit)">
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
                                  <div id="block-choose" class="block-choose">
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
    import {defineComponent, ref, getCurrentInstance, reactive} from 'vue';
import { useToggle } from '@vueuse/core';
    import { deleteComInfo,modifyComInfo} from '@/api/list'

export default defineComponent({
  props: {
      id:{
        type:Number
      },
    img:{
      type:String,
      default:'../../../../../src/assets/images/img1.jpg'
    },
    loading: {
      type: Boolean,
      default: false,
    },
    name: {
      type: String,
      default: '',
    },
    principal: {
      type: String,
      default: '',
    },
      type:{
          type:String
      },
      info:{
          type:String
      },
      picture:{
          type:String
      },
    createTime:{
      type:String
    },
    actionType: {
      type: String,
      default: '',
    },
    defaultValue: {
      type: Boolean,
      default: false,
    },
    openTxt: {
      type: String,
      default: '',
    },
    closeTxt: {
      type: String,
      default: '',
    },
    expiresText: {
      type: String,
      default: '',
    },
    icon: {
      type: String,
      default: '',
    },
    showTag: {
      type: Boolean,
      default: true,
    },
    tagText: {
      type: String,
      default: '',
    },
    expires: {
      type: Boolean,
      default: false,
    },
    expiresTagText: {
      type: String,
      default: '',
    },
  },
  setup(props) {
    const [open, toggle] = useToggle(props.defaultValue);
    const isExpires = ref(props.expires);
    const renew = () => {
      isExpires.value = false;
    };
      const  visible = ref(false)
      const ctx1 = getCurrentInstance()
      const {globalProperties} = ctx1.appContext.config
    const date = new Date()
      const form = reactive({
          id:props.id,
          type:props.type,
          name:props.name,
          principal:props.principal,
          info:props.info,
          picture:props.picture,
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
      const handleCancel = (formSubmit)=>{
          visible.value = false
          // isImg.value = false
      }
      const handleSubmit = async ()=>{
          visible.value = false
          await modifyComInfo(form)
          globalProperties.$EventBus.emit('getComCategorys')
      }
    const handleDelete = async (id)=>{
        const useParams = {
            params:{
                id
            }
        }
      await deleteComInfo(useParams)
        globalProperties.$EventBus.emit('getComCategorys')
    }

    const handleEdit = async ()=>{
        visible.value = true
      console.log('edit')
    }
    return {
      open,
      toggle,
      isExpires,
      renew,
      date,
      handleDelete,
      handleEdit,
        visible,
        form,
        treeData,
        handleCancel,
        handleSubmit
    };
  },
});
</script>

<style scoped lang="less">
.card-wrap {
  height: 100%;
  transition: all 0.3s;
  border: 1px solid var(--color-neutral-3);
  border-radius: 4px;
  &:hover {
    transform: translateY(-4px);
    // box-shadow: 4px 4px 10px rgba(0, 0, 0, 0.1);
  }
  :deep(.arco-card) {
    height: 100%;
    border-radius: 4px;
    .arco-card-body {
      height: 100%;
      .arco-space {
        width: 100%;
        height: 100%;
        .arco-space-item {
          height: 100%;
          &:last-child {
            flex: 1;
          }
          .arco-card-meta {
            height: 100%;
            display: flex;
            flex-flow: column;
            .arco-card-meta-content {
              flex: 1;
              .arco-card-meta-description {
                margin-top: 8px;
                color: rgb(var(--gray-6));
                line-height: 20px;
                font-size: 12px;
              }
            }
            .arco-card-meta-footer {
              margin-top: 0;
            }
          }
        }
      }
    }
  }
  :deep(.arco-card-meta-title) {
    display: flex;
    align-items: center;

    // To prevent the shaking
    line-height: 28px;
  }
  :deep(.arco-skeleton-line) {
    &:last-child {
      display: flex;
      justify-content: flex-end;
      margin-top: 20px;
    }
  }
}

.card-img-container {
  position: relative;
  .card-img {
    display: block;
    position: absolute;
    width: 90px;
    height: 90px;
    top: -80%;
    right:-35%;
  }
}

</style>
