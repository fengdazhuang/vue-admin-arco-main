
<template>
    <div class="container">
        <Breadcrumb :items="['系统管理', '合作伙伴']" />
        <div class="main">
            <a-card :style="{width:'100%'}" class="general-card card" title="合作伙伴">
                <a-divider style="margin-top: 0" />
                <a-row style="margin-bottom: 16px">
                    <a-col :span="16">
                        <a-space>
                            <a-button @click="handleCreate()" type="primary">新增</a-button>
                            <a-button type="primary" status="danger" @click="handleChangeMany">批量改变</a-button>
                            <a-modal width="800px" v-model:visible="visible" @cancel="handleCancel" @ok="handleConfirm($refs,'add')"  unmountOnClose>
                                <template #title>
                                    添加合作伙伴
                                </template>
                                <div>
                                    <a-form ref="formRef" :model="form" :style="{width:'600px'}"  @submit="handleSubmit">
                                        <a-form-item field="name" label="name"
                                                     :rules="[{required:true,message:'请输入name'}]"
                                                     :validate-trigger="['change','input']"
                                        >
                                            <a-input v-model="form.name" placeholder="请输入name" />
                                        </a-form-item>
                                        <a-form-item field="logo" label="Logo">
                                            <div class="choose-cover">
                                                <div class="uploader-comp">
                                                    <div id="block-choose" class="block-choose" >
                                                        <img :src="imgSrc"  style="width: 100px; height: 100px; align-self: center;" v-show="isImg"/>
                                                    </div>
                                                    <input type="file" @change="uploadCover()" @mouseover="mouseOver" @mouseout="mouseOut" ref="inputPic" class="inputPic" accept="image/jpeg,image/jpg,image/png">
                                                </div>
                                                <div style="margin-top: 10px; color: #9b9d9e;">请上传JPG、JPEG、PNG格式的封面图噢~</div>
                                            </div>
                                        </a-form-item>
                                        <a-form-item field="url" label="链接"
                                                     :rules="[{required:true,message:'请输入链接'}]"
                                                     :validate-trigger="['change','input']"
                                        >
                                            <a-input v-model="form.url" placeholder="请输入链接" />
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
                        </a-space>
                    </a-col>
                </a-row>
                <a-table
                        size="large"
                        row-key="id"
                        :loading="loading"
                        :pagination="pagination"
                        :data="PlayerList"
                        :bordered="false"
                        @page-change="onPageChange"
                        :row-selection="rowSelection"
                        @selection-change="handleGetId"
                >
                    <template #columns>
                        <a-table-column
                                title="ID"
                                data-index="id"
                        />
                        <a-table-column
                                title="name"
                                data-index="name"
                        />
                        <a-table-column
                                :width="150"
                                title="logo"
                                data-index="logo"
                        >
                            <template #cell="{ record }">
                                <a-space>
                                    <a-avatar
                                            :size="40"
                                            shape="square"
                                    >
                                        <img
                                                alt="avatar"
                                                :src="record.url"
                                        />
                                    </a-avatar>
                                </a-space>
                            </template>
                        </a-table-column>
                        <a-table-column
                                title="链接"
                                data-index="url"
                        >
                            <template #cell="{ record }">
                                <a-space style="margin-bottom: 20px;">
                                    <span v-show="!record.isInput">{{record.url}}</span>
                                    <a-input @blur="handleBlur(record)" :style="{width:'170px',height:'25px'}" v-show="record.isInput" v-model="record.url" />
                                </a-space>
                            </template>
                        </a-table-column>
                        <a-table-column
                                title="状态控制"
                                data-index="createTime"
                        >
                            <!-- eslint-disable -->
                            <template #cell="{ record }">
                                <a-space style="margin-bottom: 20px;">
                                    <a-switch  @click="handleChangeStatus(record)" v-model="record.status" />
                                </a-space>
                            </template>
                        </a-table-column>
                        <a-table-column
                                title="状态显示"
                                data-index="statusText"
                        >
                            <template #cell="{ record }">
                                <span :style="{color:(record.status===true? 'green':'red')}">{{record.statusText}}</span>
                            </template>
                        </a-table-column>
                        <a-table-column
                                :width="220"
                                title="创建时间"
                                data-index="createTime"
                        />

                        <a-table-column
                                title="操作"
                                data-index="operations"
                        >
                            <template #cell="{ record }">
                                <a-button @click="handleEditUrl(record)" type="text"  size="small">编辑</a-button>
                            </template>
                        </a-table-column>
                    </template>
                </a-table>
                <a-modal width="800px" v-model:visible="showModel" @cancel="handleCancel1" @ok="handleConfirm1($refs,'edit')"  unmountOnClose>
                    <template #title>
                        编辑合作伙伴信息
                    </template>
                    <div>

                        <a-form setFields="" ref="formRef" :size="form.size" :model="form" :style="{width:'600px'}" @submit="handleSubmit">
                            <a-form-item field="logo" label="Logo">
                                <div class="choose-cover">
                                    <div class="uploader-comp">
                                        <div id="block-choose" class="block-choose" :style="coverStyle">
                                            <img :src="imgSrc"  style="width: 100px; height: 100px; align-self: center;" v-show="isImg"/>
                                        </div>
                                        <input type="file" @change="uploadCover()" @mouseover="mouseOver" @mouseout="mouseOut" ref="inputPic" class="inputPic" accept="image/jpeg,image/jpg,image/png">
                                    </div>
                                    <div style="margin-top: 10px; color: #9b9d9e;">请上传JPG、JPEG、PNG格式的封面图噢~</div>
                                </div>
                            </a-form-item>
                            <a-form-item field="url" label="链接"
                                         :rules="[{required:true,message:'请输入链接'}]"
                                         :validate-trigger="['change','input']"
                            >
                                <a-input v-model="form.url" placeholder="请输入链接" />
                            </a-form-item>
                            <a-form-item field="status" label="状态"
                                         :rules="[{required:true,message:'请设置状态'}]"
                                         :validate-trigger="['change','input']"
                            >
                                <template #cell="{ record }">
                                    <a-space style="margin-bottom: 20px;">
                                        <a-switch  @click="handleChangeStatus(record)" v-model="record.status" />
                                    </a-space>
                                </template>
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
    import axios from "axios";
    import { defineComponent, computed, ref, reactive,getCurrentInstance } from 'vue';
    import { useI18n } from 'vue-i18n';
    import useLoading from '@/hooks/loading';
    import {addAdmin, listAdmins, listJudges, logout, queryAdmin, resetPassword, updateStatus} from '@/api/user';
    import { Pagination, Options } from '@/types/global';
    import {getFriendLinks,addFriendLink,modifyFriendLink,modifyFriendLinkStatus} from '@/api/system'
    const generateFormModel = () => {
        return {
            name: '',
            pageNumber:1,
            pageSize:20
        };
    };
    export default defineComponent({
        // components:{tree},
        setup() {
            const value = ref(false)
            const { loading, setLoading } = useLoading(true);
            const { t } = useI18n();
            const renderData = ref<PolicyRecord[]>([]);
            const imgSrc = ref('@/assets/images/img1.jpg')
            const isImg = ref(false)
            const inputPic = ref(null)
            const formModel = ref(generateFormModel());
            const basePagination: Pagination = {
                pageNumber: 1,
                pageSize: 20,
            };
            const pagination = reactive({
                ...basePagination,
            });
            const handleConsole = ()=>{
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
            const open = ref(true)
            const isAbled = ref(false)
            const visible = ref(false);
            const showModel = ref(false)
            const formRef = ref();
            const treeRef = ref()
            const data = ref({})
            const PlayerList = ref([])
            // const date = new Date()
            const competitions = ref('')
            const message = ref('')

            const isRepeat = ref(false)
            let ids = []
            let node
            let form = reactive({
                id:'',
                url:'',
                logo:'',
                status:0,
                createTime:'',
                name:''
            });

            // const fetchData = async (
            //     params = {name:'',pageNumber: 1, pageSize: 20 }
            // ) => {
            //     // setLoading(true);
            //     try {
            //         let useParams = {
            //             params:{...params}
            //         }
            //         const { data } = await listAdmins(useParams);
            //         data.records.forEach(item =>{
            //             if(item.sex===1) {
            //                 item.sex = '男'
            //             } else {
            //                 item.sex = '女'
            //             }
            //         })
            //         data.records.forEach(item=>{
            //             if (item.status) {
            //                 item.status = false
            //                 item.statusText = '已禁用'
            //             } else {
            //                 item.status = true
            //                 item.statusText = '已启用'
            //             }
            //         })
            //         PlayerList.value = data.records
            //         pagination.pageNumber = params.pageNumber;
            //         pagination.total = data.total;
            //     } catch (err) {
            //         // you can report use errorHandler or other
            //     } finally {
            //         setLoading(false);
            //     }
            // };
            const fetchData = async (
                params = {name:'',pageNumber: 1, pageSize: 20 }
            ) => {
                // setLoading(true);
                try {
                    let useParams = {
                        params:{...params}
                    }
                    console.log(2222)
                    const { data } = await getFriendLinks();
                    data.forEach(item=>{
                        if (item.status) {
                            item.status = false
                            item.statusText = '已禁用'
                        } else {
                            item.status = true
                            item.statusText = '已启用'
                        }
                        item.isInput = false
                    })
                    PlayerList.value = data
                    console.log(1111)
                    // PlayerList.value = data.records
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
                        id:'',
                        url:'',
                        logo:'',
                        status:0,
                        createTime:''
                    });
                });
            };

            const handleClick1 = (row) => {
                if (row.sex==='男') {
                    row.sex = '1'
                } else {
                    row.sex = '0'
                }
                showModel.value = true;
                ctx.$nextTick(() => {
                    Object.assign(form, row);
                });

            };
            const rowSelection = reactive({
                type: 'checkbox',
                showCheckedAll: true,
                onlyCurrent: false
            });
            // const uploadCover = (e)=> {
            //     imgSrc.value='@/assets/images/img1.jpg'
            //     form.photo = '@/assets/images/img1.jpg'
            //     isImg.value = true
            // }
            const handleCancel = () => {
                visible.value = false;
                ctx.$nextTick(() => {
                    Object.assign(form, {
                        id:'',
                        url:'',
                        logo:'',
                        status:0,
                        createTime:''
                    });
                });
            }
            const handleGetId = (rowKeys) =>{
                ids = []
                console.log('rowKeys',rowKeys)

                // rowKeys = rowKeys.filter(item=>{
                //     return !filterRowKeys.includes(item)
                // })

                PlayerList.value.forEach(item=>{
                    if (rowKeys.includes(item.id)) {
                        // filterRowKeys.push(item.id)
                        ids.push({
                            id:item.id,
                            status:item.status
                        })
                    }

                })
                console.log('ids222',ids)
            }
            const handleCancel1 = () => {
                showModel.value = false;
                ctx.$nextTick(() => {
                    Object.assign(form, {
                        id:'',
                        url:'',
                        logo:'',
                        status:0,
                        createTime:''
                    });
                });
            }
            const isShowInput = ref(false)
            const handleEditUrl = (row)=>{
                console.log('row',row)
                row.isInput = true
                // isShowInput.value = true
            }
            const handleEdit = (row)=>{
                console.log('row',row)
                ctx.$nextTick(() => {
                    Object.assign(form, row);
                });

                showModel.value = true

                // modifyFriendLink ()
            }
            const handleSubmit = async ({values, errors}) => {
                visible.value = false
            }
            const handleConfirm = async ($ref,type)=> {
                /* eslint-disable */
                const body = {
                    name:form.name,
                    url:form.url,
                    logo:form.logo,
                }
                const res = await addFriendLink(body)
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
            const handleChangeMany = async ()=>{
                console.log('idsbe',ids)
                ids.forEach(item=>{
                    console.log('item.status',item.status)
                    if (item.status) {
                        item.status = 1
                        console.log('item.status1111',item.status)
                    } else {
                        item.status = 0
                    }
                    console.log('item.status2222',item.status)
                })
                const body = ids
                await modifyFriendLinkStatus(body)
                fetchData()
                ids.forEach(item=>{
                    if (item.status === 1) {
                        item.status = false
                    } else {
                        item.status = true
                    }
                })
            }
            const handleBlur = async (row)=>{
                row.isInput = false
                const body = {
                    id:row.id,
                    url:row.url,
                    logo:row.logo
                }
                const res = await modifyFriendLink(body)
                // visible.value = false
                fetchData()
            }
            const handleConfirm1 = async ($ref,type)=> {
                /* eslint-disable */
                const body = {
                    id:form.id,
                    url:form.url,
                    logo:form.logo
                }
                const res = await modifyFriendLink(body)
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
                    key:'中国',
                    title:'中国'
                },
                {
                    key:'巴基斯坦',
                    title:'巴基斯坦'
                },{
                    key:'韩国',
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

            const handleChangeStatus = async (row)=>{
                console.log('row',row)
                if (row.status) {
                    row.status = 0
                } else {
                    row.status = 1
                }
                const params = [{
                    id:row.id,
                    status:row.status
                }]
                const res = await modifyFriendLinkStatus(params)
                fetchData()
            }
            const handleLeave = async ()=>{
                const  useParams = {
                    params:{
                        username:form.username
                    }
                }
                await queryAdmin(useParams)

                // if(res.code!=200) {
                //     message.value = res.message
                //     isRepeat.value = true
                // } else {
                //     isRepeat.value = false
                // }
                // console.log('queryAdmin',res)
            }
            const  handlegetData = (treeRef)=>{
                node = treeRef.getSelectedNodes()

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
            // const uploadCover = (e)=> {
            //     imgSrc.value='@/assets/images/img1.jpg'
            //     isImg.value = true
            // }

            const search = async () => {
                // console.log('formModel.value',formModel.value)
                let useParams = {
                    params:{
                        ...formModel.value,
                    }
                }
                const {data} = await listAdmins(useParams)

                PlayerList.value = data.records
                // renderData.value = data.list;
                // pagination.pageNumber = params.pageNumber;
                // pagination.total = data.total;
                // const nameList = res.data.records.map(item =>{
                //     return item.name
                // })
                // const params = {name:}
                // fetchData()

                // fetchData({
                //   ...basePagination,
                //   ...formModel.value,
                // } as unknown as PolicyParams);
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
                isAbled,
                handleLeave,
                message,
                handleChangeStatus,
                value,
                open,
                handleGetId,
                handleEdit,
                imgSrc,
                isImg,
                inputPic,
                handleChangeMany,
                isShowInput,
                handleEditUrl,
                handleBlur
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
  .red {
    color: red;
  }
  .green {
    color:green;
  }
</style>
