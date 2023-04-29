
<template>
    <div class="container">
        <Breadcrumb :items="['志愿管理', '志愿者审核']" />
        <div class="main">
            <a-card :style="{width:'100%'}" class="general-card card" title="志愿者审核">
                <a-space size="large" >

                    <span :style="{color:'#000'}">排序</span>
                    <a-tree-select @change="handleOrderType(form.orderType)" :data="treeDataSort" v-model="form.orderType"  placeholder="请选择服务意向"/>
                </a-space>
                <a-divider style="margin-top: 20px" />
                <a-table
                        size="large"
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
                                title="姓名"
                                data-index="name"
                        />
                        <a-table-column
                                title="照片"
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
                                </a-space>
                            </template>
                        </a-table-column>
                        <a-table-column
                                title="性别"
                                data-index="sex"
                        >
                        </a-table-column>
                        <a-table-column
                                title="年龄"
                                data-index="age"
                        />

                        <a-table-column
                                title="服务意向"
                                data-index="intention"
                        />
                        <a-table-column
                                title="申请时间"
                                data-index="applyTime"
                        />

                        <a-table-column
                                title="操作"
                                data-index="operations"
                        >
                            <template #cell="{ record }">
                                <a-button @click="handleClick1(record)" type="text">审核</a-button>
                            </template>
                        </a-table-column>
                    </template>
                </a-table>
                <a-modal width="800px" v-model:visible="showModel" @cancel="handleCancel1" @ok="handleConfirm1($refs,'edit')"  unmountOnClose>
                    <template #title>
                        志愿者审核
                    </template>
                    <div>
                        <a-form ref="formRef" :size="form.size" :model="form" :style="{width:'600px'}"  @submit="handleSubmit">
                            <a-form-item field="name" label="姓名"
                                         :rules="[{required:true,message:'name is required'},{minLength:2,message:'姓名不能少于两位'}]"
                                         :validate-trigger="['change','input']"
                            >
                                <a-input v-model="form.name"  placeholder="请输入你的姓名" />
                                <span v-show="isRepeat">{{message}}</span>
                            </a-form-item>
                            <a-form-item field="sex" label="性别" :rules="[{required:true,message:'must select one'}]">
                                <a-radio-group v-model="form.sex">
                                    <a-radio value="1">男</a-radio>
                                    <a-radio value="0">女</a-radio>
                                </a-radio-group>
                            </a-form-item>
                            <a-form-item field="age" label="年龄"
                                         :rules="[{required:true,message:'phoneNumber is required'},{minLength:5,message:'不能少于5位数字'}]"
                                         :validate-trigger="['change','input']"
                            >
                                <el-input-number v-model="num" :min="1" :max="10" @change="handleChange" />
                            </a-form-item>
                            <a-form-item field="applyTime" label="申请时间"
                                         :validate-trigger="['change','input']"
                            >
                                <a-input v-model="form.applyTime" disabled/>
                            </a-form-item>
                            <a-form-item>
                                <span :style="{color:'#000'}">审核</span>
                                <a-radio-group v-model="form.status">
                                    <a-radio @click="form.isShow=1" value="1">通过</a-radio>
                                    <a-radio @click="form.isShow=0" value="0">拒绝</a-radio>
                                </a-radio-group>
                            </a-form-item>
                            <a-form-item v-show="form.isShow === 1 ? 1:0"   field="risk" label="服务意向" :rules="[{required:true,message:'请选择服务方向'}]">
                                <a-tree-select
                                        v-model="form.risk"
                                        :allow-clear="true"
                                        :allow-search="true"
                                        :data="treeDataService"
                                        placeholder="请选择服务意向"
                                        style="width: 300px"
                                ></a-tree-select>
                            </a-form-item>
                            <a-form-item field="emailContent" label="备注"
                                         :validate-trigger="['change','input']"
                            >
                                <a-input v-model="form.emailContent"/>
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
    import {pagePreVolunteers,doReview,getVolDirections} from '@/api/volunteer'
    import {addAdmin, listAdmins, listJudges, logout, queryAdmin, resetPassword, updateStatus} from '@/api/user';
    import { Pagination, Options } from '@/types/global';
    const generateFormModel = () => {
        return {
            name: '',
            pageNumber:1,
            pageSize:20
        };
    };
    export default defineComponent({
        setup() {
            const value = ref(false)
            const { loading, setLoading } = useLoading(true);
            const { t } = useI18n();
            const renderData = ref([]);
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
            const isAbled = ref(false)
            const visible = ref(false);
            const showModel = ref(false)
            const formRef = ref();
            const treeRef = ref()
            const data = ref({})
            const PlayerList = ref([])
            const competitions = ref('')
            const message = ref('')
            const isRepeat = ref(false)
            const imgSrc = ref('@/assets/images/img1.jpg')
            const isImg = ref(false)
            const inputPic = ref(null)
            let node
            const num = ref(1)
            const handleChange = (value: number) => {
                console.log(value)
            }
            const form = reactive({
                id:'',
                name:'',
                photo:'@/assets/images/img1.jpg',
                sex:'',
                age:13,
                orderType:'',
                applyTime:'',
                updateTime:'',
                email:'',
                emailContent:'',
                risk:'',
                status:'',
                isShow:0
            });
            const treeDataSort = [
                {
                    key:'',
                    title:'所有'
                },
                {
                    key:1,
                    title:'年龄'
                },
                {
                    key:2,
                    title:'姓名'
                },
                {
                    key:3,
                    title:'申请时间'
                },

            ]
            const treeDataService = ref([])
            // const fetchData = async (
            //     params = {name:'',pageNumber: 1, pageSize: 20 }
            // ) => {
            //     setLoading(true);
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
            //                 item.status = 1
            //             } else {
            //                 item.status = 0
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
                params = {pageNumber: 1, pageSize: 20,orderType:'' }
            ) => {
                setLoading(true);
                try {

                    let useParams = {
                        params:{...params}
                    }
                    const { data } = await pagePreVolunteers(useParams);
                    data.records.forEach(item =>{
                        if(item.sex===1) {
                            item.sex = '男'
                        } else {
                            item.sex = '女'
                        }
                    })
                    data.records.filter((item)=>{
                        return item.status !=3
                    })
                    data.records.forEach(item=>{
                        if (item.status) {
                            item.status = 1
                        } else {
                            item.status = 0
                        }
                    })
                    // PlayerList.value = data.records
                    PlayerList.value = data.records
                    pagination.pageNumber = params.pageNumber;
                    pagination.total = data.total;
                } catch (err) {
                    // you can report use errorHandler or other
                } finally {
                    setLoading(false);
                }
            };
            const handleGetVolDirections = async (volunteerType)=>{
                const useParams = {
                    params:{
                        volunteerType
                    }
                }
                const {data} = await getVolDirections(useParams)
                data.forEach(item=>{
                    treeDataService.value.push({
                        key:item.id,
                        title:item.name
                    })
                })
            }
            handleGetVolDirections(1)
            const handleClick1 = (row) => {
                form.id = row.id
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
            //   var me = ctx1.ctx;
            //
            //   let f = inputPic.value.files[0];
            //
            //   let multiForm = new FormData() ; 		//创建一个form对象
            //   multiForm.append('files', f, f.name);  	//append 向form表单添加数据
            //
            //   // 请求后端获得最新数据
            //   var fsServerUrl = 'http://localhost:8009';
            //   axios.defaults.withCredentials = true;
            //   var fileServer = fsServerUrl + '/api9/file/uploadFiles';
            //
            //   axios.post(
            //       fileServer,
            //       multiForm,
            //       {
            //         headers: {
            //           'Content-Type': 'multipart/form-data',
            //         }
            //       })
            //       .then(res => {
            //         console.log('resImg',res)
            //         if (res.code === 200) {
            //           var imagesList = res.data;
            //           if (imagesList.length < 1) {
            //             alert("张图片上传失败，请保证图片不能为空，并且符合 jpg/png/jpeg 的后缀格式！");
            //           } else {
            //             imgSrc.value = imagesList[0];
            //             form.photo = imagesList[0]
            //             isImg.value = true
            //           }
            //         } else {
            //           alert(res.data.msg);
            //         }
            //       });
            // }
            const uploadCover = (e)=> {
                imgSrc.value='@/assets/images/img1.jpg'
                form.photo = '@/assets/images/img1.jpg'
                isImg.value = true
                console.log('isImg.value',isImg.value)
            }
            const handleCancel1 = () => {
                showModel.value = false;
                form.isShow = 0
                ctx.$nextTick(() => {
                    Object.assign(form, {
                        name:'',
                        photo:'@/assets/images/img1.jpg',
                        sex:'',
                        age:13,
                        risk:'',
                        applyTime:'',
                        email:'',
                        volunteerType:''
                    });
                });
            }
            const handleSubmit = async ({values, errors}) => {
                visible.value = false

            }
            const handleConfirm1 = async ($ref,type)=> {
                const body = {
                    emailContent:form.emailContent,
                    email:form.email,
                    id:form.id,
                    risk:form.risk + '',
                    status:+form.status
                }
                await doReview(body)
                /* eslint-disable */
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

            const checkedKeys = ref([]);
            const checkStrictly = ref(false);



            const onPageChange = (pageNumber: number) => {
                fetchData({ ...basePagination, pageNumber });
            };

            const handleOrderType= (orderType)=>{
                const params = {
                    pageNumber:1,
                    pageSize:20,
                    orderType:form.orderType
                }
                fetchData(params)
            }

            fetchData();
            const reset = () => {
                formModel.value = generateFormModel();
            };
            return {
                loading,
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
                form,
                options,
                treeDataService,
                handleSubmit,
                handleCancel1,
                handleClick1,
                handleConsole,
                rowSelection,
                formRef,
                handleConfirm1,
                checkedKeys,
                checkStrictly,
                treeRef,
                treeDataSort,
                // uploadCover,
                inputPic,
                isAbled,
                message,
                value,
                num,
                handleChange,
                handleOrderType,
                isRepeat,
                uploadCover,
                isImg,
                imgSrc,
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
