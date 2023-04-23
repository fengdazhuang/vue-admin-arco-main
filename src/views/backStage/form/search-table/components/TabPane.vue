<template>
    <div>
        <div class="demo-collapse">
            <el-collapse>
                <el-collapse-item title="Consistency" name="1">
                    <div>
                        Consistent with real life: in line with the process and logic of real
                        life, and comply with languages and habits that the users are used to;
                    </div>
                    <div>
                        Consistent within interface: all elements should be consistent, such
                        as: design style, icons and texts, position of elements, etc.
                    </div>
                </el-collapse-item>
                <el-collapse-item title="Feedback" name="2">
                    <div>
                        Operation feedback: enable the users to clearly perceive their
                        operations by style updates and interactive effects;
                    </div>
                    <div>
                        Visual feedback: reflect current state by updating or rearranging
                        elements of the page.
                    </div>
                </el-collapse-item>
                <el-collapse-item title="Efficiency" name="3">
                    <div>
                        Simplify the process: keep operating process simple and intuitive;
                    </div>
                    <div>
                        Definite and clear: enunciate your intentions clearly so that the
                        users can quickly understand and make decisions;
                    </div>
                    <div>
                        Easy to identify: the interface should be straightforward, which helps
                        the users to identify and frees them from memorizing and recalling.
                    </div>
                </el-collapse-item>
                <el-collapse-item title="Controllability" name="4">
                    <div>
                        Decision making: giving advices about operations is acceptable, but do
                        not make decisions for the users;
                    </div>
                    <div>
                        Controlled consequences: users should be granted the freedom to
                        operate, including canceling, aborting or terminating current
                        operation.
                    </div>
                </el-collapse-item>
            </el-collapse>
            <el-pagination :style="{margin:'30px 0 0 0'}" background layout=" ->,prev, pager, next" :page-size="pageSize" :total="100" />
        </div>
    </div>

</template>

<script>
    /* eslint-disable */
import {addComPosition,deleteComPosition,getComPositions} from '@/api/CompetitionArea'
    import {reactive,ref} from "vue";

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

