<template>
    <div class="basic-layout">
        <div class="content" :style="{height:'6rem'}">
            <div class="re-con">
                <div class="content">
                    <h1 style="font-size: 32px" class="txt">志愿者申请</h1>
                    <el-row :gutter="15">
                        <el-form
                                ref="elForm"
                                :model="userInfo"
                                size="medium"
                                label-width="100px"
                                label-position="left"
                        >
                            <el-col :span="24">
                                <el-form-item label="服务意向" prop="intention" :rules="[{required:true,message:'请输入服务意向'}]">
                                    <a-tree-select
                                            multiple="true"
                                            v-model="userInfo.intention"
                                            :allow-clear="true"
                                            :allow-search="true"
                                            :data="treeDataService"
                                            placeholder="请选择服务方向"
                                            style="width: 300px"
                                            @change="handleSelect"
                                    ></a-tree-select>
                                </el-form-item>
                            </el-col>
                            <el-col :span="24">
                                <el-form-item label="是否选择团队" prop="type" >
                                        <a-radio-group v-model="form.type">
                                            <a-radio @click="form.isShow=1" :value="0">是</a-radio>
                                            <a-radio @click="form.isShow=0" :value="1">否</a-radio>
                                        </a-radio-group>
                                </el-form-item>
                            </el-col>
                            <el-col :span="24">
                                <el-form-item v-show="form.isShow === 1 ? 1:0"  label="团队号" prop="teamId" :rules="[{required:true,message:'请选择团队号'}]">
                                    <a-tree-select
                                            v-model="userInfo.teamId"
                                            :allow-clear="true"
                                            :allow-search="true"
                                            :data="treeDataPosition"
                                            placeholder="请选择团队号"
                                            style="width: 300px"
                                    ></a-tree-select>
                                </el-form-item>
                            </el-col>
                            <el-col :span="24">
                                <el-form-item label="简介" prop="comment" :rules="[{required:true,message:'请输入简介'}]">
                                    <el-input
                                            v-model="userInfo.comment"
                                            placeholder="请输入简介"
                                            clearable
                                            :style="{ width: '5rem' }"
                                    >
                                    </el-input>
                                </el-form-item>
                            </el-col>
                            <div class="btn">
                                <el-col :span="12">
                                    <el-form-item>
                                        <el-button
                                                type="primary"
                                                size="medium"
                                                class="re-return"
                                                @click="router.push('/ind-center')"
                                        >
                                            返回
                                        </el-button>
                                    </el-form-item>
                                </el-col>
                                <el-col :span="12">
                                    <el-form-item label="" prop="field107">
                                        <el-button @click="handleSubmitApply" type="primary" size="medium" class="re-login">
                                            提交
                                        </el-button>
                                    </el-form-item>
                                </el-col>
                            </div>

                        </el-form>
                    </el-row>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    /* eslint-disable */
    import {reactive, ref,getCurrentInstance} from "vue";
    import {useRouter} from "vue-router";
    import Bottom from '@/views/VolunteerService/Vs-components/footer.vue'
    import { Message } from '@arco-design/web-vue';
    import {applyVolunteer,modifyInfo,queryVolunteer,getVolDirections,pageVolPositions,queryVolPositions} from "@/api/volunteer";

    export default {
        name: "VolunteerService",
        components:{Bottom},
        setup() {
            const {ctx} = getCurrentInstance()
            const router = useRouter()
            const elForm = ref(null)
            let volunteerInfo = JSON.parse(window.sessionStorage.getItem('volunteerInfo'))
            let userInfo = ref({
                comment:'',
                id:volunteerInfo.id,
                intention:[],
                type:'',
                teamId:''

            });
            const form = reactive({
                type:0,
                isShow:0
            })
            const value = ref('')
            const activeIndex = ref("0");
            const treeDataService = ref([])
            const treeDataPosition = ref([])
            // const handlePageVolPositions = async ()=>{
            //     const useParams = {
            //         params:{pageNumber: 1, pageSize: 20,volunteerType:'',risk:'' ,name:''}
            //     }
            //     await queryVolPositions(useParams)
            //     // treeDataPosition.value =
            // }
            const handleSelect = async (value)=>{
                treeDataPosition.value = []
                const useParams = {
                    params:{
                        risk:1
                    }
                }
                const {data} = await queryVolPositions(useParams)
                data.forEach(item=>{
                    treeDataPosition.value.push({
                        key:item.id,
                        title:item.name
                    })
                })
            }
            const handleSubmitApply = async ()=>{
                const intention = userInfo.value.intention + ''
                const body = {
                    id:volunteerInfo.id,
                    comment:userInfo.value.comment,
                    intention:intention,
                    teamId:userInfo.value.teamId,
                    type:form.type
                }
                const res = await applyVolunteer(body)
                if (res.code===200) {
                    Message.success('提交成功')
                    router.push('/ind-center')
                }
                console.log('ress',res)
            }
            const handleGetVolDirections = async (volunteerType)=>{
                const useParams = {
                    params:{
                        volunteerType
                    }
                }
                const {data} = await getVolDirections(useParams)
                data.forEach(item=>{
                    treeDataService.value.push({
                        key:item.name,
                        title:item.name
                    })
                })
            }
            const handleQueryVolunteer = async ()=>{
                const useParams = {
                    params:{
                        id:volunteerInfo.id
                    }
                }
                const {data} = await queryVolunteer(useParams)
                console.log('data',data)
                userInfo.value = {
                    comment:data.comment,
                    id:volunteerInfo.id,
                    intention:data.intention
                }
                handleGetVolDirections(data.volunteerType)
                // userInfo = data
            }
            handleQueryVolunteer()




            return {
                activeIndex,
                userInfo,
                value,
                elForm,
                treeDataService,
                handleSubmitApply,
                form,
                // handlePageVolPositions,
                handleSelect,
                treeDataPosition,
              router
            };
        },
    };
</script>

<style lang="scss">
  @import "@/assets/style/global.scss";
  .flex-grow {
    flex-grow: 0.7;
  }
  // .border {
  //     border: ;
  // }
  .basic-layout {
    .header {
      height: px2rem(90px);
      .el-menu-demo {
        height: 100%;
        .bg-logo1 {
          width: px2rem(312px);
          height: px2rem(73px);
          margin-left: px2rem(45px);
        }
        .common {
          position: relative;
          top: 50%;
          height: px2rem(30px);
          font-size: px2rem(18px);
          border-radius: px2rem(15px);
          border: 0;
          transform: translateY(-50%);
          line-height: px2rem(30px);
          text-align: center;
          margin-right: px2rem(25px);
        }
        .is-active {
          background-color: #1d21a9;
          color: #fff !important;
        }
      }
    }
    .content {
      background-color: rgb(248, 248, 248);
    }
  }
  // 设置文字不能选中
  body {
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
  }
  .re-con {
    width: 100%;
    //height: 7rem;
    background-color: rgb(255, 255, 255);
    display: flex;
    justify-content: center;
    // align-items: center;
    margin-top: 1rem;
    .content {
      position: relative;
      width: 60%;
      height: 6rem;
      display: flex;
      position: relative;
      justify-content: center;
      align-items: center;
      flex-direction: column;
      .position {
        position: absolute;
        right: 5%;
        top: 7%;
      }
      .txt {
        position: absolute;
        left: 1.75rem;
        top: 0.5rem;
      }
      .btn {
        display: flex;
        justify-content: center;
        align-items: center;
        margin-top: 1rem;

        .re-return {
          width: 120px;
          height: 40px;
        }
        .re-login {
          width: 120px;
          height: 40px;
        }
      }
      .el-input {
        height: 50px;
      }
      .re-link {
        width: 80%;
        display: flex;
        position: absolute;
        justify-content: space-between;
        align-items: center;
        margin-top: 10px;
        left: 1.1rem;

        a {
          font-size: 16px;
          color: rgb(157, 220, 249);
        }
      }
    }
  }
</style>
