<template>
    <div class="create">

        <a-form :model="form" :style="{ width: '600px' }">
            <a-form-item  field="position" label="比赛会场" :rules="[{required:true,message:'请选择比赛会场'}]">
                <a-input
                        v-model="form.position"
                        placeholder="请输入比赛会场"
                />

            </a-form-item>
            <a-form-item field="isCG" label="具体地址" >
                <a-radio-group v-model.number="form.isCG">
                    <a-radio :value="1">有</a-radio>
                    <a-radio :value="2">无</a-radio>
                </a-radio-group>
            </a-form-item>
            <a-form-item v-show="form.isCG === 1 ? 1:0"   field="specificPosition" label="具体地址" :rules="[{required:true,message:'请输入具体地址'}]">
                <a-input
                        v-model="form.specificPosition"
                        placeholder="请输入具体地址"
                />
            </a-form-item>
            <a-form-item label="比赛项目" :rules="[{required:true,message:'请选择比赛场馆'}]">
                <a-tree-select
                        v-model="form.competitionItem"
                        :multiple="true"
                        :allow-clear="true"
                        :allow-search="true"
                        :data="treeData"
                        placeholder="请选择比赛项目"
                        style="width: 300px"
                ></a-tree-select>
                <span @click="handleCreateComPosition" :style="{display:'block',width:'50px',height:'30px',lineHeight:'30px',cursor:'pointer',color:'#fff',textAlign:'center',background:'#165DFF'}">+</span>
<!--                <a-input-search @click="handleCreateComPosition" :style="{width:'320px'}" v-model="form.competition_item" placeholder="请输入比赛项目" button-text="+" search-button/>-->
            </a-form-item>
        </a-form>
    </div>

  <el-table :data="list" border fit highlight-current-row style="width: 100%">

    <el-table-column
      align="center"
      label="ID"
      width="65"
      prop="id"
    ></el-table-column>

    <el-table-column prop="area" width="180px" align="center" label="赛区">
<!--      <template slot-scope="scope">-->
<!--        <span>{{ scope.row.timestamp | parseTime('{y}-{m}-{d} {h}:{i}') }}</span>-->
<!--      </template>-->
    </el-table-column>

    <el-table-column  min-width="110px" align="center" prop="position" label="会场">
    </el-table-column>

    <el-table-column  min-width="200px" align="center" prop="specificPosition" label="具体地址">
    </el-table-column>

    <el-table-column min-width="120px" label="比赛项目" prop="competitionItem">
    </el-table-column>
      <el-table-column width="100px" align="center" label="操作">
          <template #default="scope">
              <el-button type="danger"  @click="handleDelete(scope.row)">删除</el-button>
          </template>

      </el-table-column>

  </el-table>
</template>

<script>
    /* eslint-disable */
import {addComPosition,deleteComPosition} from '@/api/CompetitionArea'
    import {reactive} from "vue";

export default {
  // filters: {
  //   statusFilter(status) {
  //     const statusMap = {
  //       published: 'success',
  //       draft: 'info',
  //       deleted: 'danger'
  //     }
  //     return statusMap[status]
  //   }
  // },
  props: {
    id: {
      type: Number,
      default: 'CN'
    },
      area:{
        type:String
      }
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
    // this.getList()
  },
  methods: {
    // getList() {
    //   this.loading = true
    //     console.log('this.$props.type',this.$props.type)
    //   this.$emit('create') // for test
    //   fetchList(this.listQuery).then(response => {
    //     this.list = response.data.items
    //     this.loading = false
    //   })
    //
    // }
  },
    setup(props){
      const list = reactive([{id:111,title:'hhh'},{id:111,title:'hhh'}])

      const form = reactive({
          isCG:2,
          area:'',
          competitionItem:'',
          position:'',
          specificPosition:''
      })
        const handleDelete = async (row)=>{
            console.log('row',row)
          const useParams = {
              params:{
                  id:111
              }
          }
          await deleteComPosition(useParams)
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
          handleDelete
      }
    }
}
</script>

