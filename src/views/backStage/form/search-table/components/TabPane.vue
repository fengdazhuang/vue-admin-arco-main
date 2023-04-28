<template>
    <div>
        <div class="demo-collapse">
            <el-collapse>
                <el-collapse-item v-for="item in list" :key="item.id" :title="item.name" :name="item.id">
                    <div>
                        {{item.info}}
                    </div>
                </el-collapse-item>
            </el-collapse>
<!--            <el-pagination :style="{margin:'30px 0 0 0'}" background layout=" ->,prev, pager, next" :page-size="pageSize" :total="100" />-->
        </div>
    </div>

</template>

<script>
    /* eslint-disable */
import {addComPosition,deleteComPosition,getComPositions} from '@/api/CompetitionArea'
    import {reactive, ref, watch} from "vue";

export default {
  props: {
    id: {
      type: Number,
      default: 'CN'
    },
      area:{
        type:String
      },
      initList:Array
  },
  data() {
    return {
      listQuery: {
        page: 1,
        limit: 5,
        type: this.type,
        sort: '+id'
      },
      loading: false
    }
  },
  created() {
  },
  methods: {

  },
    setup(props){
        const basePagination= {
            pageNumber: 1,
            pageSize: 10,
        };
        const pageSize = ref(basePagination.pageSize)
        const pageNumber = ref(basePagination.pageNumber)
      let list = ref([])
        list.value = props.initList
        watch(()=>props.initList,()=>{
            list.value = props.initList
        })
        console.log('list.value',list.value)
      const form = reactive({
          isCG:2,
          area:'',
          competitionItem:'',
          position:'',
          specificPosition:''
      })
        const handleGetComPositions = async (label)=>{
            const useParams = {
                params:{
                    area:label,
                    keyword: ''
                }
            }
            const {data} = await getComPositions(useParams)
            list.value = data
        }
        const handleDelete = async (row)=>{
          const useParams = {
              params:{
                  id:row.id
              }
          }
          await deleteComPosition(useParams)
            await handleGetComPositions(props.area)
        }
      const handleCreateComPosition = async ()=>{
          form.area=props.area
          form.competitionItem = form.competitionItem.join(',')
          const body = {
              area:form.area,
              competitionItem:form.competitionItem,
              position:form.position,
              specificPosition:form.specificPosition
          }
          const res = await addComPosition(body)
          await handleGetComPositions(props.area)

      }
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
      return {
          handleCreateComPosition,
          treeData,
          form,
          list,
          handleDelete,
          pageSize,
          pageNumber
      }
    }
}
</script>

