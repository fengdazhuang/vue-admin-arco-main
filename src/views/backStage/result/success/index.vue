<template>
    <div class="subscribe-container">
        <Breadcrumb :items="['资讯管理', '查看资讯']" />
        <div class="subscribe-header-container">
            <div class="subscribe-header">
                <div class="subscribe-left">
                    <span>文章状态</span>
                    <a-tabs>
                        <a-tab-pane  :active-key="tabName" key="已发布">
                            <template #title>
                                <div @click="handleTabName(1)">
                                    <icon-subscribed /> 已发布
                                </div>

                            </template>

                        </a-tab-pane>
                        <a-tab-pane  key="未发布">
                            <template #title>
                                <div @click="handleTabName(3)">
                                    <icon-subscribe /> 未发布
                                </div>

                            </template>

                        </a-tab-pane>
                        <a-tab-pane  key="已撤回">
                            <template #title>
                                <div @click="handleTabName(2)">
                                    <icon-undo /> 已撤回
                                </div>

                            </template>

                        </a-tab-pane>
                    </a-tabs>
                </div>
                <div class="subscribe-right">
                    <a-input-search v-model="form.keyword" :style="{width:'320px'}" placeholder="请输入搜索内容" search-button>
<!--                        <div @click="handleSearch" ></div>-->

                        <template #button-icon>
                            <span @click="handleSearch">
                                <icon-search/>
                            </span>
                        </template>
                        <template #button-default>
                            <span @click="handleSearch">Search</span>
                        </template>
                    </a-input-search>
                </div>
            </div>
            <div class="subscribe-time">
                <span>时间选择</span>
                <a-range-picker
                        v-model="time"
                        style="width: 360px; margin: 0 24px 24px 0;"
                        show-time
                        :time-picker-props="{ defaultValue: ['00:00:00', '09:09:06'] }"
                        format="YYYY-MM-DD HH:mm"
                        @ok="onOk"
                />
            </div>
        </div>
        <div class="subscribe-content-container">
            <div class="subscribe-content"  v-for="item in articleList" :key="item.id">
                <div class="subscribe-content-card" @click="handlePreview(item)">
                <div class="subscribe-content-card-img">
                    <img src="@/assets/images/img1.jpg" />
                </div>
                <div class="subscribe-content-card-content">
                    <div class="title">{{item.title}}</div>
                    <div class="comment">
                        <span>阅读 0 </span>
                        <span>评论 0</span>
                    </div>
                    <div class="publish" v-show="item.articleStatus === 1 ? true:false" :style="{width: '60px',textAlign:'center',lineHeight:'25px',height:'25px',background:'rgb(184,254,184)',color:'rgb(79,152,83)'}">已发布</div>
                    <div class="publish" v-show="item.articleStatus === 3 ? true:false" :style="{width: '60px',textAlign:'center',lineHeight:'25px',height:'25px',background:'#ff7d00',color:''}">未发布</div>
                    <div class="publish" v-show="item.articleStatus === 2 ? true:false" :style="{width: '60px',textAlign:'center',lineHeight:'25px',height:'25px',background:'rgb(214,214,214)',color:'rgb(145,145,145)'}">已撤回</div>
                    <div class="createTime" >{{item.createTime}}</div>
                </div>
            </div>
                <div class="subscribe-content-operate">
                    <a-space direction="vertical" class="btns">
                    <div>
                        <a-button  v-show="item.articleStatus === 1 ? true:false" @click="handleWithDraw(item.id)" type="text" status="warning">
                                <template #icon>
                                    <icon-undo />
                                </template>
                                撤回
                            </a-button>
                    </div>

                    <a-button  @click="handleDelete(item.id)" type="text" status="danger">
                        <template #icon>
                            <icon-close />
                        </template>
                        删除
                    </a-button>
                </a-space>
                </div>
            </div>
        </div>

    </div>
</template>

<script lang="ts">
    /* eslint-disable */
    import { defineComponent, computed, ref, reactive,getCurrentInstance } from 'vue';
    import { useI18n } from 'vue-i18n';
    import useLoading from '@/hooks/loading';
    import { queryNews,deleteNews,withdraw} from '@/api/user';
    console.log('localStorage',window.localStorage.getItem('token'))
    export default defineComponent({
        // components:{tree},
        setup() {
            const { loading, setLoading } = useLoading(true);
            const time = ref()
            const  tabName = ref('')
            const articleList = ref([])
            const startDate = ref('')
            const endDate = ref('')
            const date = new Date()
            const publish = ref(true)
            const prepublish = ref(true)
            const canceled = ref(true)
            const form = reactive({
                status:1,
                keyword:'',
            })
            const basePagination = {
                pageNumber: 1,
                pageSize: 20,
            };
            const pagination = reactive({
                ...basePagination,
            });

            const fetchData = async (
                params = { pageNumber: 1, pageSize: 20 }
            ) => {

                setLoading(true);
                try {
                    let useParams = {
                        params:{
                            ...params,
                            startDate:startDate.value,
                            endDate:endDate.value,
                            keyword:form.keyword,
                            status:form.status
                        }
                    }
                    const { data } = await queryNews(useParams);
                    // data.records.forEach(item => {
                    //     item.createTime = `${date.getFullYear()}年${date.getMonth()}月${date.getDay()}日${date.getHours()}时${date.getMinutes()}分`
                    // })
                    articleList.value = data.records
                    console.log('articleList.value',articleList.value)
                    // renderData.value = data.list;
                    pagination.pageNumber = params.pageNumber;
                    pagination.total = data.total;
                } catch (err) {
                    // you can report use errorHandler or other
                } finally {
                    setLoading(false);
                }
            };
            const handleSearch = ()=>{
                fetchData()
            }
            const handleTabName =  (tabName)=>{
                form.status = tabName
                fetchData()
            }
            const onOk = ()=>{
                startDate.value = time.value[0]
                endDate.value=time.value[1]
                console.log(startDate.value,startDate.value)
                fetchData()
            }
            fetchData()
            const handlePreview = (item)=>{
                window.sessionStorage.setItem('item',JSON.stringify(item))
                window.open('#/preview')
            }
            const handleWithDraw = async (id)=>{
                // const useParams = {
                //     params:{
                //         id: parseInt(id)
                //     }
                // }
                const idNum = {
                    params:{
                        id
                    }
                }
                const res = await withdraw({},idNum)
                fetchData()
            }
            const handleDelete = async (id)=>{
                const useParams = {
                    params:{
                        id
                    }
                }
                const res = await deleteNews(useParams)
                fetchData()
            }
            return {
                tabName,
                handleTabName,
                time,
                onOk,
                handleSearch,
                form,
                articleList,
                date,
                publish,
                prepublish,
                canceled,
                handleWithDraw,
                handleDelete,
                handlePreview
            }
        }

    });
</script>

<style scoped lang="scss">

.subscribe-container {
    width: 100%;
    height:100%;
  padding: 0 20px 20px 20px;
    .subscribe-header-container{
      background: #ffffff;
      .subscribe-header {
        height:65px;
        display:flex;
        justify-content: space-between;
        font-size: 20px;
        .subscribe-left {
          display: flex;
          padding: 20px 0 0 20px;
          span {
            display: inline-block;
            padding-right: 10px;
          }
          a {
            display: inline-block;
            text-decoration: none;
            color: #000;
            margin-left: 20px;
          }
        }
        .subscribe-right {
          padding: 40px 60px 0 0;
        }
      }
      .subscribe-time {
        span {
          display: inline-block;
          padding: 10px 50px 0 20px;
          font-size: 16px;
        }
      }
    }
    .subscribe-content {
      display: flex;
      justify-content: space-between;
      background: #ffffff;
      margin-top: 20px;
      border-bottom: 1px solid grey;
      padding: 20px 0 20px 20px;
      cursor: pointer;
      .subscribe-content-card {
        display: flex;
        flex: 1;
        &-img {
          img {
            display: inline-block;
            width: 150px;
            height:150px
          }
        }
        &-content {
          margin-left: 20px;
          display: flex;
          flex-direction: column;
          justify-content: space-around;
        }
      }
      .subscribe-content-operate {

      }
      .btns {
        width: 111px;
        height: 152px;
        padding: 30px 30px 0 0;
      }
    }

}
</style>
