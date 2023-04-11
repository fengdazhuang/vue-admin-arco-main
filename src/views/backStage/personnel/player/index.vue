<template>
  <div class="container">
    <Breadcrumb :items="['menu.list', 'menu.list.searchTable']" />
    <div class="main">

      <div class="tree-container">
        <div class="tree-search">
          <h3>赛事筛选</h3>
          <a-input class="inputCSS" :style="{width:'230px'}" placeholder="Please enter something" allow-clear>
            <template #prefix>
              <icon-user />
            </template>
          </a-input>
        </div>


<!--        <tree />-->
        <a-tree
            ref="treeRef"
            @click="handlegetData($refs.treeRef)"
            class="tree"
            :checkable="true"
            v-model:checked-keys="checkedKeys"
            :check-strictly="checkStrictly"
            :data="treeData"
        />
      </div>
      <a-card class="general-card card" :title="$t('menu.list.searchTable')">
        <a-row>
          <a-col :flex="1">
            <a-form
                :model="formModel"
                :label-col-props="{ span: 6 }"
                :wrapper-col-props="{ span: 18 }"
                label-align="left"
            >           <a-row :gutter="16">
              <a-col :span="6">
                <a-form-item field="name"  :label="$t('searchTable.form.name')">
                  <a-input
                      v-model="formModel.name"
                      :placeholder="$t('searchTable.form.name.placeholder')"
                  />
                </a-form-item>
              </a-col>
              <a-col :span="6">
                <a-form-item field="country"  label="国家">
                  <a-tree-select :data="treeDataCountry" v-model="formModel.country" placeholder="请选择国家"/>
                </a-form-item>
              </a-col>
              <a-col :flex="'86px'" style="text-align: right">
                <a-space  :size="18">
                  <a-button type="primary" :style="{margin:'0 0 0 20px'}" @click="search">
                    <template #icon>
                      <icon-search />
                    </template>
                    {{ $t('searchTable.form.search') }}
                  </a-button>
                  <a-button @click="reset">
                    <template #icon>
                      <icon-refresh />
                    </template>
                    {{ $t('searchTable.form.reset') }}
                  </a-button>
                </a-space>
              </a-col>
            </a-row>
            </a-form>
          </a-col>

        </a-row>
        <a-divider style="margin-top: 0" />
        <a-row style="margin-bottom: 16px">
          <a-col :span="16">
            <a-space>
              <a-button @click="handleCreate()" type="primary">新增</a-button>
              <a-modal width="800px" v-model:visible="visible" @cancel="handleCancel" @ok="handleConfirm($refs,'add')"  unmountOnClose>
                <template #title>
                  添加运动员
                </template>
                <div>
                  <a-form ref="formRef" :size="form.size" :model="form" :style="{width:'600px'}" @submit="handleSubmit">
                    <a-form-item field="name" label="姓名"
                                 :rules="[{required:true,message:'name is required'},{minLength:2,message:'姓名不能少于两位'}]"
                                 :validate-trigger="['change','input']"
                    >
                      <a-input v-model="form.name" placeholder="请输入你的姓名" />
                    </a-form-item>
                    <a-form-item field="photo" label="上传照片">
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
<!--                    <a-form-item field="age" label="年龄"-->
<!--                                 :rules="[{required:true,message:'age is required'},{type:'number', max:200,message:'age is max than 200'}]"-->
<!--                    >-->
<!--                      <a-input-number v-model="form.age" placeholder="请输入你的年龄" />-->
<!--                    </a-form-item>-->
                    <a-form-item field="email" label="电子邮箱"
                                 :rules="[{required:true,message:'phoneNumber is required'},{minLength:5,message:'不能少于5位数字'}]"
                                 :validate-trigger="['change','input']"
                    >
                      <a-input v-model="form.email" placeholder="电子邮箱" />
                    </a-form-item>
                    <a-form-item field="country" label="国籍" :rules="[{required:true,message:'国籍不能为空'}]">
                      <a-select v-model="form.country" placeholder="请选择国籍" allow-clear>
                        <a-option value="中国">中国</a-option>
                        <a-option value="巴基斯坦">巴基斯坦</a-option>
                        <a-option value="韩国">韩国</a-option>
                      </a-select>
                    </a-form-item>
                    <a-form-item field="sex" label="性别" :rules="[{required:true,message:'must select one'}]">
                      <a-radio-group v-model="form.sex">
                        <a-radio value="1">男</a-radio>
                        <a-radio value="0">女</a-radio>
                      </a-radio-group>
                    </a-form-item>
                    <a-form-item field="competitionName" label="参赛项目">
                      <a-tree-select :data="treeData" v-model="form.competitionName" placeholder="请选择参赛项目"/>
                    </a-form-item>
                    <a-form-item>
                      <a-space>
                        <!-- <a-button html-type="submit" type="primary">提交</a-button> -->
                        <a-button type="primary" status="danger" @click="$refs.formRef.resetFields()">重置</a-button>
                      </a-space>
                    </a-form-item>
                  </a-form>
                </div>
              </a-modal>
              <!-- <a-upload action="/">
                <template #upload-button>
                  <a-button>
                    {{ $t('searchTable.operation.import') }}
                  </a-button>
                </template>
              </a-upload> -->
            </a-space>
          </a-col>
        </a-row>
        <a-table
            row-key="id"
            :loading="loading"
            :pagination="pagination"
            :data="PlayerList"
            :bordered="false"
            @page-change="onPageChange"
            :row-selection="rowSelection"
        >
          <template #columns>
            <a-table-column
                @click="handleConsole()"
                :title="$t('searchTable.columns.number')"
                data-index="id"
            />
            <a-table-column
                :title="$t('searchTable.columns.name')"
                data-index="name"
            />
            <a-table-column
                :title="$t('searchTable.columns.contentType')"
                data-index="sex"
            >
<!--              <template #cell="{ record }">-->
<!--                <a-space>-->
<!--                  <a-avatar-->
<!--                      v-if="record.contentType === 'img'"-->
<!--                      :size="16"-->
<!--                      shape="square"-->
<!--                  >-->
<!--                    <img-->
<!--                        alt="avatar"-->
<!--                        src="//p3-armor.byteimg.com/tos-cn-i-49unhts6dw/581b17753093199839f2e327e726b157.svg~tplv-49unhts6dw-image.image"-->
<!--                    />-->
<!--                  </a-avatar>-->
<!--                  <a-avatar-->
<!--                      v-else-if="record.contentType === 'horizontalVideo'"-->
<!--                      :size="16"-->
<!--                      shape="square"-->
<!--                  >-->
<!--                    <img-->
<!--                        alt="avatar"-->
<!--                        src="//p3-armor.byteimg.com/tos-cn-i-49unhts6dw/77721e365eb2ab786c889682cbc721c1.svg~tplv-49unhts6dw-image.image"-->
<!--                    />-->
<!--                  </a-avatar>-->
<!--                  <a-avatar v-else :size="16" shape="square">-->
<!--                    <img-->
<!--                        alt="avatar"-->
<!--                        src="//p3-armor.byteimg.com/tos-cn-i-49unhts6dw/ea8b09190046da0ea7e070d83c5d1731.svg~tplv-49unhts6dw-image.image"-->
<!--                    />-->
<!--                  </a-avatar>-->
<!--                  {{ $t(`searchTable.form.contentType.${record.contentType}`) }}-->
<!--                </a-space>-->
<!--              </template>-->
            </a-table-column>
            <a-table-column
                :title="$t('searchTable.columns.filterType1')"
                data-index="competitionName"
            >
            </a-table-column>
            <a-table-column
                title="电子邮箱"
                data-index="email"
            />
            <a-table-column
                :title="$t('searchTable.columns.image')"
                data-index="photo"
            >
              <template #cell="{ record }">
                <a-space>
                  <a-avatar
                      :size="40"
                      shape="square"
                  >
                    <img
                        alt="avatar"
                        :src="record.photo"
                    />
                  </a-avatar>
<!--                  {{ $t(`searchTable.form.contentType.${record.contentType}`) }}-->
                </a-space>
              </template>
            </a-table-column>
            <a-table-column
                :title="$t('searchTable.columns.count')"
                data-index="country"
            />
            <a-table-column
                :title="$t('searchTable.columns.createdTime')"
                data-index="createTime"
            />
            <!-- <a-table-column
              :title="$t('searchTable.columns.status')"
              data-index="status"
            >
              <template #cell="{ record }">
                <span v-if="record.status === 'offline'" class="circle"></span>
                <span v-else class="circle pass"></span>
                {{ $t(`searchTable.form.status.${record.status}`) }}
              </template>
            </a-table-column> -->
            <a-table-column
                :title="$t('searchTable.columns.operations')"
                data-index="operations"
            >
              <template #cell="{ record }">
                <a-button @click="handleClick1(record)" type="text">编辑</a-button>

                <a-button @click="handleDelete(record)" v-permission="['admin']" type="text" status="danger" size="small">
                  {{ $t('searchTable.columns.operations.delete') }}
                </a-button>
              </template>
            </a-table-column>
          </template>
        </a-table>
        <a-modal width="800px" v-model:visible="showModel" @cancel="handleCancel1" @ok="handleConfirm1($refs,'edit')"  unmountOnClose>
          <template #title>
            编辑管理员信息
          </template>
          <div>

            <a-form setFields="" ref="formRef" :size="form.size" :model="form" :style="{width:'600px'}" @submit="handleSubmit">
              <a-form-item field="name" label="姓名"
                           :rules="[{required:true,message:'name is required'},{minLength:2,message:'姓名不能少于两位'}]"
                           :validate-trigger="['change','input']"
              >
                <a-input v-model="form.name" placeholder="请输入你的姓名" />
              </a-form-item>
              <a-form-item field="competitionName" label="参赛项目"
                           :rules="[{required:true,message:'name is required'},{minLength:2,message:'姓名不能少于两位'}]"
                           :validate-trigger="['change','input']"
              >
                <a-tree-select :data="treeData" v-model="form.competitionName" placeholder="请选择参赛项目"/>
              </a-form-item>
              <a-form-item field="photo" label="上传照片">
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
<!--              <a-form-item field="age" label="年龄"-->
<!--                           :rules="[{required:true,message:'age is required'},{type:'number', max:200,message:'age is max than 200'}]"-->
<!--              >-->


<!--                <a-input-number v-model="form.age" placeholder="请输入你的年龄" />-->
<!--              </a-form-item>-->
              <a-form-item field="email" label="电子邮箱"
                           :rules="[{required:true,message:'phoneNumber is required'},{minLength:5,message:'不能少于5位数字'}]"
                           :validate-trigger="['change','input']"
              >
                <a-input v-model="form.email" placeholder="请输入电子邮箱" />
              </a-form-item>
              <a-form-item field="country" label="国籍" :rules="[{required:true,message:'国籍不能为空'}]">
                <a-select v-model="form.country" placeholder="请选择国籍" allow-clear>
                  <a-option value="中国">中国</a-option>
                  <a-option value="巴基斯坦">巴基斯坦</a-option>
                  <a-option value="韩国">韩国</a-option>
                </a-select>
              </a-form-item>
              <a-form-item field="sex" label="性别" :rules="[{required:true,message:'不能为空'}]">
                <a-radio-group v-model="form.sex">
                  <a-radio value="1">男</a-radio>
                  <a-radio value="0">女</a-radio>
                </a-radio-group>
              </a-form-item>
              <a-form-item>
                <a-space>
                  <!-- <a-button html-type="submit" type="primary">提交</a-button> -->
                  <a-button type="primary" status="danger" @click="$refs.formRef.resetFields()">重置</a-button>
                </a-space>
              </a-form-item>
            </a-form>
          </div>
        </a-modal>
      </a-card>
    </div>

    
  </div>
</template>

<script lang="ts">
/* eslint-disable */
import { defineComponent, computed, ref, reactive,getCurrentInstance } from 'vue';
import { useI18n } from 'vue-i18n';
import useLoading from '@/hooks/loading';
import { queryPolicyList, PolicyRecord, PolicyParams } from '@/api/list';
import { addPlayer,deletePlayer,listPlayers,queryPlayer,updatePlayer} from '@/api/user';
import { Pagination, Options } from '@/types/global';
import axios from "axios";
// import { FormInstance } from '@arco-design/web-vue/es/form';
// import tree from "../player/tree.vue";
const generateFormModel = () => {
  return {
    name: '',
    // contentType: '',
    // filterType: '',
    // createdTime: [],
    // status: '',
    country:''
  };
};
export default defineComponent({
  // components:{tree},
  setup() {
    const { loading, setLoading } = useLoading(true);
    const { t } = useI18n();
    const renderData = ref<PolicyRecord[]>([]);
    const formModel = ref(generateFormModel());
    const basePagination: Pagination = {
      pageNumber: 1,
      pageSize: 20,
    };
    const pagination = reactive({
      ...basePagination,
    });
    const handleConsole = ()=>{
      console.log(1111);
    }
    const ctx1 = getCurrentInstance()
    const {ctx} = getCurrentInstance()
    const contentTypeOptions = computed<Options[]>(() => [
      {
        label: t('searchTable.form.contentType.img'),
        value: 'img',
      },
      {
        label: t('searchTable.form.contentType.horizontalVideo'),
        value: 'horizontalVideo',
      },
      {
        label: t('searchTable.form.contentType.verticalVideo'),
        value: 'verticalVideo',
      },
    ]);
    const filterTypeOptions = computed<Options[]>(() => [
      {
        label: t('searchTable.form.filterType.artificial'),
        value: 'artificial',
      },
      {
        label: t('searchTable.form.filterType.rules'),
        value: 'rules',
      },
    ]);
    const statusOptions = computed<Options[]>(() => [
      {
        label: t('searchTable.form.status.online'),
        value: 'online',
      },
      {
        label: t('searchTable.form.status.offline'),
        value: 'offline',
      },
    ]);
    const visible = ref(false);
    const showModel = ref(false)
    const formRef = ref();
    const treeRef = ref()
    const data = ref({})
    const PlayerList = ref([])
    const imgSrc = ref('')
    const isImg = ref(false)
    const inputPic = ref(null)
    const date = new Date()
    
    const form = reactive({
      competitionName:'',
      name: '',
      photo:'',
      country: '',
      sex:1,
      email:''
    });

    const fetchData = async (
        params: PolicyParams = { competitionName:'',country:'',name:'',pageNumber: 1, pageSize: 20 }
    ) => {
      setLoading(true);
      try {
        let useParams = {
          params:{...params}
        }
        const { data } = await listPlayers(useParams);
        data.records.forEach(item =>{
          // item.sex
          if(item.sex===1) {
            item.sex = '男'
          } else {
            item.sex = '女'
          }
          item.createTime = `${date.getFullYear()}年${date.getMonth()}月${date.getDay()}日${date.getHours()}时${date.getMinutes()}分`
        })
        PlayerList.value = data.records
        // renderData.value = data.list;
        pagination.pageNumber = params.pageNumber;
        pagination.total = data.total;
      } catch (err) {
        // you can report use errorHandler or other
      } finally {
        setLoading(false);
      }
    };
    const handleCreate = () => {
      visible.value = true;
      ctx.$nextTick(() => {
                Object.assign(form, {
                  competitionName:'',
                  name: '',
                  photo:'',
                  country: '',
                  sex:1,
                  email:''
                });
            });
      // formRef1.value?.validate();
    };
    
    const handleClick1 = (row) => {
      console.log('rowrowrow',row)
      isImg.value = true
      imgSrc.value = row.photo
      if (row.sex==='男') {
        row.sex = '1'
      } else {
        row.sex = '0'
      }
      showModel.value = true;
      console.log('rowrowrow1111',row)
      ctx.$nextTick(() => {
        Object.assign(form, row);
      });
      // console.log(form.value);
      
      // console.log('row.value',row);
      
    };
    const handleDelete = (row)=>{
      const params={
        params:{

        }
      }
    }
    const rowSelection = reactive({
      type: 'checkbox',
      showCheckedAll: true,
      onlyCurrent: false
    });
    // const handleBeforeOk = async () => {
    //   await new Promise(resolve => setTimeout(resolve, 3000));
    //   return true;
    // };
    const handleCancel = () => {
      visible.value = false;
      ctx.$nextTick(() => {
                Object.assign(form, {
                  competitionName:'',
                  name: '',
                  photo:'',
                  country: '',
                  sex:1,
                  email:''
                });
            });
    }
    const handleCancel1 = () => {
      showModel.value = false;
      ctx.$nextTick(() => {
                Object.assign(form, {
                  competitionName:'',
                  name: '',
                  photo:'',
                  country: '',
                  sex:1,
                  email:''
                });
            });
    }
    const handleSubmit = async ({values, errors}) => {
      visible.value = false
    }
    const handleConfirm = async ($ref,type)=> {
      /* eslint-disable */
      console.log('formData',form)
      const res = await addPlayer(form)
      console.log('resAdd',res)
      visible.value = false
      imgSrc.value = ''
      isImg.value = false
      fetchData()
      $ref.formRef.validate((valid)=>{

        if(type==='edit') {
            if(!valid ) {
              showModel.value = false
              $ref.formRef.resetFields()
            }else {
              showModel.value = true
            }
        } else {
            if(!valid ) {
              visible.value = false
              $ref.formRef.resetFields()
            }else {
              visible.value = true
            }
        }
      })
    }
    const handleConfirm1 = async ($ref,type)=> {
      /* eslint-disable */
      console.log('formDataEdit',form)
      const res = await updatePlayer(form)
      console.log('resAdd',res)
      visible.value = false
      fetchData()
      $ref.formRef.validate((valid)=>{

        if(type==='edit') {
          if(!valid ) {
            showModel.value = false
            $ref.formRef.resetFields()
          }else {
            showModel.value = true
          }
        } else {
          if(!valid ) {
            visible.value = false
            $ref.formRef.resetFields()
          }else {
            visible.value = true
          }
        }

      })


    }
    const options = [
      {
        value: 'beijing',
        label: 'Beijing',
        children: [
          {
            value: 'chaoyang',
            label: 'ChaoYang',
            children: [
              {
                value: 'datunli',
                label: 'Datunli',
              },
            ],
          },
          {
            value: 'haidian',
            label: 'Haidian',
          },
          {
            value: 'dongcheng',
            label: 'Dongcheng',
          },
          {
            value: 'xicheng',
            label: 'XiCheng',
          },
        ],
      },
      {
        value: 'shanghai',
        label: 'Shanghai',
        children: [
          {
            value: 'shanghaishi',
            label: 'Shanghai',
            children: [
              {
                value: 'huangpu',
                label: 'Huangpu',
              },
            ],
          },
        ],
      },
    ];
    const treeDataCountry = [
      {
        key:'1',
        title:'中国'
      },
      {
        key:'2',
        title:'巴基斯坦'
      },{
        key:'3',
        title:'韩国'
      }

    ]
    const treeData = [
      {
        key: '竞技性比赛',
        title: '竞技性比赛',
        children: [
          {
            key: '100米',
            title: '100米',
          },
        ],
      },
      {
        key: '球类比赛',
        title: '球类比赛',
        children: [
          {
            key: '乒乓球',
            title: '乒乓球',
          },
          {
            key: '篮球',
            title: '篮球',
          },
        ],
      },
      {
        key: '对抗性比赛',
        title: '对抗性比赛',
        children: [
          {
            key: '拔河',
            title: '拔河',
          },
          {
            key: '橄榄球',
            title: '橄榄球',
          },
        ],
      },
      {
        key: '水上比赛',
        title: '水上比赛',
        children: [
          {
            key: '划船',
            title: '划船',
          },
          {
            key: '龙舟',
            title: '龙舟',
          },
        ],
      },
    ]
    const checkedKeys = ref([]);
    const checkStrictly = ref(false);
    const  handlegetData = (treeRef)=>{
      const node = treeRef.getSelectedNodes()
      let nodes = treeRef.getCheckedNodes()
      // console.log('node',node[0].title)
      console.log('nodes',nodes)
    }

    const uploadCover = (e)=> {
      var me = ctx1.ctx;

      let f = inputPic.value.files[0];

      let multiForm = new FormData() ; 		//创建一个form对象
      multiForm.append('files', f, f.name);  	//append 向form表单添加数据

      // 请求后端获得最新数据
      var fsServerUrl = 'http://localhost:8009';
      axios.defaults.withCredentials = true;
      var fileServer = fsServerUrl + '/api9/file/uploadFiles';

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
                form.photo = imagesList[0]
                isImg.value = true
              }
            } else {
              alert(res.data.msg);
            }
          });
    }

    
    const search = () => {
      
      fetchData({
        ...basePagination,
        ...formModel.value,
      } as unknown as PolicyParams);
    };
    const onPageChange = (pageNumber: number) => {
      fetchData({ ...basePagination, pageNumber });
    };

    fetchData();
    const reset = () => {
      formModel.value = generateFormModel();
    };
    return {
      loading,
      search,
      onPageChange,
      // renderData,
      PlayerList,
      pagination,
      formModel,
      reset,
      contentTypeOptions,
      filterTypeOptions,
      statusOptions,
      visible,
      showModel,
      handleCreate,
      handleCancel,
      form,
      options,
      treeData,
      handleSubmit,
      handleCancel1,
      handleClick1,
      handleConsole,
      rowSelection,
      formRef,
      handleConfirm,
      handleConfirm1,
      handlegetData,
      checkedKeys,
      checkStrictly,
      treeRef,
      treeDataCountry,
      uploadCover,
      imgSrc,
      isImg,
      inputPic
    };
  },
});
</script>

<style scoped lang="less">
.main {
  display: flex;


  .tree-container{
    background-color: #fff;
    width: 230px;
    margin-right: 20px;
    tree-search {
      border-bottom: 1px solid var(--color-neutral-3);
      h3 {
        font-weight: 700;
        margin-left: 20px !important;
      }
      .inputCSS {
        margin-left: 20px !important;
        border: 2px solid #000;
      }

    }
    .tree {
      padding-left: 20px;
    }
  }
  .card {

  }
}
:deep(.arco-table-th) {
  &:last-child {
    .arco-table-th-item-title {
      margin-left: 16px;
    }
  }
}
</style>