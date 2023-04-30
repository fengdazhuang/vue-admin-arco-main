
<template>
    <div class="container">
        <Breadcrumb :items="['志愿管理', '志愿服务点']" />
        <div class="main">
            <a-card :style="{width:'100%'}" class="general-card card" title="志愿服务点">
                <a-space size="large" >
                    <span :style="{color:'#000'}">姓名</span>
                    <a-input @blur="handleSearchName" v-model="form.name"  placeholder="请输入姓名"/>
                    <span :style="{color:'#000'}">志愿类型</span>
                    <a-tree-select @change="handleSearchType(form.volunteerType)" :data="treeData" v-model="form.volunteerType"  placeholder="请选择志愿类型"/>
                    <span :style="{color:'#000'}">服务方向</span>
                    <a-tree-select @change="handleSearchDirection(form.risk)" :data="treeDataService" v-model="form.risk"  placeholder="请选择服务方向"/>

                </a-space>
                <a-divider style="margin-top: 20px" />
                <a-row style="margin-bottom: 16px">
                    <a-col :span="16">
                        <a-space>
                            <a-button @click="handleCreate()" type="primary">新增</a-button>
                            <a-button @click="handleManyDelete" type="primary" status="danger">批量删除</a-button>
                            <a-modal width="800px" v-model:visible="visible" @cancel="handleCancel" @ok="handleConfirm($refs,'add')"  unmountOnClose>
                                <template #title>
                                    添加服务点
                                </template>
                                <div>
                                    <a-form ref="formRef" :size="form.size" :model="form" :style="{width:'600px'}" @submit="handleSubmit">
                                        <a-form-item field="name" label="服务点"
                                                     :rules="[{required:true,message:'请输入服务点'}]"
                                                     :validate-trigger="['change','input']"
                                        >
                                            <a-input v-model="form.name" placeholder="请输入服务点" />
                                        </a-form-item>
                                        <a-form-item field="position" label="地点"
                                                     :rules="[{required:true,message:'请输入地点'}]"
                                                     :validate-trigger="['change','input']"
                                        >
                                            <a-input v-model="form.position" placeholder="请输入地点" />
                                        </a-form-item>
                                        <a-form-item field="volunteerType" label="志愿者类型"
                                                     :rules="[{required:true,message:'请输入志愿者类型'}]"
                                                     :validate-trigger="['change','input']"
                                        >
                                            <a-tree-select
                                                    v-model="form.volunteerType"
                                                    :allow-clear="true"
                                                    :allow-search="true"
                                                    :data="treeDataVolunteerType"
                                                    placeholder="请选择志愿者类型"
                                                    style="width: 300px"
                                                    @change="handleSelect"
                                            ></a-tree-select>
                                        </a-form-item>
                                        <a-form-item field="risk" label="服务方向"
                                                     :rules="[{required:true,message:'请输入服务方向'}]"
                                                     :validate-trigger="['change','input']"
                                        >
                                            <a-tree-select
                                                    v-model="form.risk"
                                                    :allow-clear="true"
                                                    :allow-search="true"
                                                    :data="treeDataService"
                                                    placeholder="请选择服务意向"
                                                    style="width: 300px"
                                            ></a-tree-select>
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
                                title="序号"
                                data-index="id"
                        />
                        <a-table-column
                                title="服务点"
                                data-index="name"
                        >
                        </a-table-column>
                        <a-table-column
                                title="地点"
                                data-index="position"
                        />
                        <a-table-column
                                title="服务方向"
                                data-index="risk"
                        />
                        <a-table-column
                                title="人数"
                                data-index="volunteerCounts"
                        />
                        <a-table-column
                                title="负责人"
                                data-index="principal"
                        />
                        <a-table-column
                                title="负责人邮箱"
                                data-index="principalEmail"
                        />

                        <a-table-column
                                title="操作"
                                data-index="operations"
                        >
                            <template #cell="{ record }">
                                <a-button @click="handleClick1(record)" type="text">详细信息</a-button>
                            </template>
                        </a-table-column>
                    </template>
                </a-table>
                <a-modal width="800px" v-model:visible="showModel" @cancel="handleCancel1" @ok="handleConfirm1($refs)"  unmountOnClose>
                    <template #title>
                        查看服务点信息
                    </template>
                    <div>
                        <a-space direction="vertical" size="large" fill>
                            <a-descriptions :data="data" title="服务点详情信息" :column="2" >
                                <a-descriptions-item v-for="(item,index) in userInfo"  :label="item.label" :key="index">
                                    <a-tag>{{ item.value }}</a-tag>
                                </a-descriptions-item>
                            </a-descriptions>
                        </a-space>
                        <h4>服务点志愿者信息</h4>
                        <a-table
                                size="large"
                                row-key="id"
                                :loading="loading"
                                :pagination="pagination"
                                :data="volunteerList"
                                :bordered="false"
                                @page-change="onPageChange"
                                @selection-change="handleGetId"
                        >
                            <template #columns>
                                <a-table-column
                                        title="姓名"
                                        data-index="name"
                                >
                                </a-table-column>
                                <a-table-column
                                        title="照片"
                                        data-index="photo"
                                >
                                    <template #cell="{ record }">
                                        <a-space @click="handle(record)">
                                            <a-avatar
                                                    :size="40"
                                                    shape="square"
                                            >
                                                <a-image
                                                        :preview-visible="visible2"
                                                        @preview-visible-change="() => { visible2 = false }"
                                                        src="/src/assets/images/img1.jpg"
                                                />
                                            </a-avatar>
                                        </a-space>
                                    </template>
                                </a-table-column>
                                <a-table-column
                                        title="性别"
                                        data-index="sex"
                                />
                                <a-table-column
                                        title="年龄"
                                        data-index="age"
                                />
                                <a-table-column
                                        title="邮箱"
                                        data-index="email"
                                />
                                <!--                            <a-table-column-->
                                <!--                                    title="操作"-->
                                <!--                                    data-index="operations"-->
                                <!--                            >-->
                                <!--                                <template #cell="{ record }">-->
                                <!--                                    <a-button @click="handleClick1(record)" type="text">详细信息</a-button>-->
                                <!--                                </template>-->
                                <!--                            </a-table-column>-->
                            </template>
                        </a-table>
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
    import {
        getVolDirections,
        pageVolunteers,
        queryVolPositions,
        resetRisk,
        addVolPosition,
        pageVolPositions,
        deleteVolPosition,
        volTeamInfo
    } from '@/api/volunteer'
    import {
        addAdmin,
        deletePlayer,
        listAdmins,
        listJudges,
        logout,
        queryAdmin,
        resetPassword,
        updateStatus,
    } from '@/api/user';
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
            const test = [{name:'111'},{name:'222'},{name:'333'}]
            const userInfo = ref([])
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
            const treeDataVolunteerType = [
                {
                    key:'0',
                    title:'赛会志愿者'
                },
                {
                    key:'1',
                    title:'城市志愿者'
                }
            ]
            const treeDataService = ref([])
            const treeData = [
                {
                    key:'',
                    title:'所有'
                },
                {
                    key: '0',
                    title: '赛会志愿者',
                },
                {
                    key: '1',
                    title: '城市志愿者',
                }
            ]
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
            const visible2 = ref(false)
            const volunteerList = ref([])
            const isAbled = ref(false)
            const visible = ref(false);
            const showModel = ref(false)
            const formRef = ref();
            const treeRef = ref()
            const data = ref({})
            const PlayerList = ref([])
            const inputPic = ref(null)
            const competitions = ref('')
            const message = ref('')
            const isRepeat = ref(false)
            let node
            let ids = reactive([])
            const num = ref(1)
            const id = ref()
            const handleChange = (value: number) => {
                console.log(value)
            }
            const form = reactive({
                id:'',
                name:'',
                risk:'',
                volunteerCounts:'',
                position:'',
                principal:'',
                principalEmail:'暂无',
                volunteerType:''

            });

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
                params = {pageNumber: 1, pageSize: 20,volunteerType:'',risk:'' ,name:''}
            ) => {
                setLoading(true);
                try {

                    let useParams = {
                        params:{...params}
                    }
                    const { data } = await pageVolPositions(useParams);
                    console.log('data',data)
                    data.records.forEach(item =>{
                        if(item.sex===1) {
                            item.sex = '男'
                        } else {
                            item.sex = '女'
                        }
                    })
                    // data.records.filter((item)=>{
                    //     return item.status =='index'
                    // })
                    data.records.forEach(item=>{
                        if (item.status) {
                            item.status = 1
                        } else {
                            item.status = 0
                        }
                        if(item.principal == null) {
                            item.principal = '暂无'
                        }
                        if(item.principalEmail == null) {
                            item.principalEmail = '暂无'
                        }
                        if(item.process === 0 || item.process==null) {
                            item.processText = '未申请'

                        } else if(item.process === 1 || item.process === 2) {
                            item.processText = '未分配'
                        }  else if(item.process === 3) {
                            item.processText = '已分配'
                        } else if(item.process === 4){
                            item.processText = '未通过'
                        }
                    })

                    PlayerList.value = data.records
                    pagination.pageNumber = params.pageNumber;
                    pagination.total = data.total;
                } catch (err) {
                    // you can report use errorHandler or other
                } finally {
                    setLoading(false);
                }
            };

            const handleClick1 = async (row) => {
                console.log('row',row)
                id.value = row.id
                if (row.sex==='男') {
                    row.sex = '1'
                } else {
                    row.sex = '0'
                }

                const keys = Object.keys(row)
                keys.forEach((item,index)=>{
                    if(item === 'principal' || item === 'principalEmail') {
                        row[item] = '暂无'
                    }
                    userInfo.value.push({
                        label:item,
                        value:row[item]
                    })
                })
                userInfo.value = userInfo.value.filter(item=>{
                    return item.label!='sex'
                })
                userInfo.value = userInfo.value.filter(item=>{
                    return item.label!='principalPhoto'
                })
                userInfo.value = userInfo.value.filter(item=>{
                    return item.label!='createTime'
                })
                userInfo.value = userInfo.value.filter(item=>{
                    return item.label!='status'
                })
                userInfo.value = userInfo.value.filter(item=>{
                    return item.label!='processText'
                })

                userInfo.value.forEach(item=>{
                    if (item.label === 'applyTime') {
                        item.label='申请时间'
                    }
                    if (item.label === 'name') {
                        item.label='服务点'
                    }
                    if (item.label === 'principalEmail') {
                        item.label='负责人电子邮箱'
                    }
                    if (item.label === 'principal') {
                        item.label='负责人'
                    }
                  if (item.label === 'id') {
                    item.label='ID'
                  }
                    if (item.label === 'position') {
                        item.label='地点'
                    }
                    if (item.label === 'risk') {
                        item.label='服务意向'
                    }
                    if (item.label === 'volunteerCounts') {
                        item.label='人数'
                    }


                })
                const useParams = {
                    params:{
                        teamId:id.value
                    }
                }
                const {data} = await volTeamInfo(useParams)
                data.members.forEach(item=>{
                    if(item.sex===1) {
                        item.sex = '男'
                    }else {
                        item.sex = '女'
                    }
                })
                volunteerList.value = data.members
                showModel.value = true;
                ctx.$nextTick(() => {
                    Object.assign(form, row);
                });

            };
            const handleSearchName = ()=>{
                const params = {
                    pageNumber:1,
                    pageSize:20,
                    volunteerType:form.volunteerType,
                    risk:form.risk,
                    name:form.name
                }
                fetchData(params)
            }
            const handleGetId = (rowKeys)=>{
                ids = rowKeys
            }
            const handleManyDelete = async ()=>{
                const str = ids.join(',')

                const useParams={
                    params:{
                        ids:str
                    }
                }
                await deleteVolPosition(useParams)
                fetchData()
            }

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
            };
            const handleGetVolDirections = async (volunteerType)=>{
              if(volunteerType === '') {
                treeDataService.value = []
                return
              }

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
            const handleSelect = async (value)=>{
                // treeDataService.value = []
               handleGetVolDirections(value)
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
            const handleCancel1 = () => {
                showModel.value = false;
                userInfo.value = []
            }
            const handleSubmit = async ({values, errors}) => {
                visible.value = false
            }
            // PlayerList.value = [{
            //     competitionName:'111',
            //     name: '111',
            //     country: '111',
            //     sex:1,
            //     email:'',
            //     status:0
            // }]
            const handleConfirm = async ($ref,type)=> {
                /* eslint-disable */
                const body1 = {
                    name:form.name,
                    volunteerType:+form.volunteerType,
                    position:form.position,
                    risk:form.risk
                }
                const res = await addVolPosition(body1)
                console.log('resAdmin',res)
                visible.value = false
                const body = {
                    pageNumber: 1,
                    pageSize: 20,
                    volunteerType:form.volunteerType,
                    risk:form.risk ,
                    name:form.name
                }
                fetchData(body)
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
            const handleConfirm1 = async ($ref)=> {
                /* eslint-disable */
                visible.value = false
                userInfo.value = []
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

            const handleReset = async (row)=>{
                await resetPassword({
                    id:row.id,
                    email:row.email
                })
            }
            const handleChangeStatus = async (row,disabled)=>{
                if (disabled) {
                    disabled = 1
                } else {
                    disabled = 0
                }
                const params = {
                    id:row.id,
                    status:disabled
                }
                const res = await updateStatus(params)
                console.log('update',res)
                disabled = !disabled
            }
            const  handlegetData = (treeRef)=>{
                node = treeRef.getSelectedNodes()

            }

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
            };
            const onPageChange = (pageNumber: number) => {
                fetchData({ ...basePagination, pageNumber });
            };

            const handleSearchDirection= (risk)=>{
                console.log('risk',risk)
                const params = {
                    pageNumber:1,
                    pageSize:20,
                    volunteerType:form.volunteerType,
                    risk,
                    name:form.name
                }
                fetchData(params)
            }

            const handleSearchType = (type)=>{
                const params = {
                    pageNumber:1,
                    pageSize:20,
                    volunteerType:type,
                    risk:form.risk,
                    name:form.name
                }
                handleGetVolDirections(type)
                fetchData(params)
            }
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
                treeDataService,
                // uploadCover,
                inputPic,
                // handleDelete,
                isAbled,
                message,
                handleReset,
                handleChangeStatus,
                value,
                num,
                handleChange,
                handleSearchDirection,
                handleSearchType,
                test,
                handleCreate,
                treeDataVolunteerType,
                handleSelect,
                handleManyDelete,
                handleGetId,
                handleSearchName,
                userInfo,
                volunteerList,
                visible2
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


