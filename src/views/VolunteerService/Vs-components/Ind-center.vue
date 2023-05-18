<template>
  <div class="common">
    <div class="container">
        <div class="head">
            <div class="head-left">
                <div class="vol">
                    <p style="font-size: 20px; margin-top: 0.1rem; margin-left: 20px">
                        个人中心
                    </p>
                    <div class="user">
                        <div class="user-icon">
                            <el-icon v-if="!nowVolunteerInfo.photo" style="font-size: 20px">
                              <User />
                            </el-icon>
                          <img :style="{width:'20px',height:'20px'}" v-else :src="nowVolunteerInfo.photo" />

                          <p style="font-size: 14px; margin-top: 0.1rem;">志愿者姓名 <span style="color: rgb(23, 159, 255);">{{nowVolunteerInfo.name}}</span></p>
                        </div>
                        <p style="font-size: 12px">志愿者类型</p>
                        <span v-if="isShowVolunteerType" style="font-size: 12px; color: #179fff">{{nowVolunteerInfo.volunteerType===0 ? '赛会志愿者':'城市志愿者' }}</span>
                        <span v-else @click="handleSelectType" :style="{fontSize:'12px',margin:'0 0 0 -0.5rem',color:'#179fff',cursor:'pointer'}">[请选择]</span>
                    </div>
                </div>
                <div class="vol-list">
                    <a href="" style="color: rgb(23, 159, 255);" class="vli">首页</a>
                    <ul class="list">
                        <li @click="previewResume">简历预览</li>
                        <li style="width: 1px; height: 12px; background: #000" class="Ver-line"></li>

<!--                        <li>注册账号</li>-->
<!--                        <li style="width: 1px; height: 12px; background: #000" class="Ver-line"></li>-->

                        <li @click="OpenPage()">修改密码</li>
                        <li style="width: 1px; height: 12px; background: #000" class="Ver-line"></li>

                        <li @click="handleLogout">退出登录</li>
                    </ul>
                </div>
            </div>
            <div class="head-right">
                <div class="function">快捷功能</div>
                <div class="head-right-main">
                    <div class="apply common-right" @click="handleApply">申请志愿者</div>
                    <div class="sign common-right" @click="handleIsShow">打卡</div>

                    <div class="team common-right" @click="handleVolTeamInfo(nowVolunteerInfo.teamId)">团队</div>
                </div>

            </div>
            <a-modal width="600px" v-model:visible="showModel1" @cancel="handleCancel1" @ok="handleConfirm1($refs)"  unmountOnClose>
                <template #title>
                    查看团队成员信息
                </template>
                <div>
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
        </div>
      <div class="main">
        <div class="main-up">
          <span style="font-size: 24px">招募进展</span>
            <span style="font-size: 12px; color: rgb(184, 184, 182)" v-if="isShowVolunteerType">{{nowVolunteerInfo.volunteerType ===0 ? '赛会志愿者':'城市志愿者'}}</span>
          <span style="font-size: 12px; color: rgb(184, 184, 182)"   v-else>选择志愿者类型后呈现</span>
        </div>
        <div class="phase-container">
          <div class="phase-item">
            <div class="phase-title flex-layout">
              <div class="phase-tip">阶段一</div>
              <div class="no-phase-name">
                未申请
              </div>
            </div>
            <div class="phase-content">
              <div class="pahse-cut-line"></div>
              <div class="phase-main">
                <div class="no-phase-intro"></div>
                <!---->
              </div>
            </div>
          </div>
          <div class="phase-item">
            <div class="phase-title flex-layout">
              <div class="phase-tip">阶段二</div>
              <div class="no-phase-name">
                已申请
              </div>
            </div>
            <div class="phase-content">
              <div class="pahse-cut-line"></div>
              <div class="phase-main">
                <div class="no-phase-intro no-type no-width"></div>
                <!---->
              </div>
            </div>
          </div>
          <div class="phase-item">
            <div class="phase-title flex-layout">
              <div class="phase-tip">阶段三</div>
              <div class="no-phase-name no-type no-width">
                申请结果
              </div>
            </div>
            <div class="phase-content">
              <div class="pahse-cut-line cutline-bg"></div>
              <div class="phase-main">
                <div class="no-phase-intro no-type no-width"></div>
                <!---->
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
      <div class="mask" @click="handleIsShow" v-show="isShow">
          <div @click="handleIsShowTrue" class="sign">
              <Sign/>
          </div>

      </div>
  </div>
</template>

<script>
    import {reactive, ref} from 'vue'
    import {logout,queryVolunteer,volTeamInfo,applyVolunteer} from '@/api/volunteer'
    import {useRouter} from 'vue-router'
    import Sign from '@/components/sign/index.vue'

export default {
  name: "ind-center",
    components:{Sign},
    setup(){
      const isShowVolunteerType = ref(false)
        const form = reactive({
            competitionName:'',
            name: '',
            photo:'@/assets/images/img1.jpg',
            country: '',
            sex:1,
            email:''
        });
        const visible2 = ref(false)
        const volunteerList = ref([])
        const showModel1 = ref(false)
        const router = useRouter()
        const isShow = ref(false)
        const volunteerInfo = JSON.parse(window.sessionStorage.getItem('volunteerInfo'))
        const nowVolunteerInfo = ref({
            name:'',
            volunteerType:undefined
        })
        const handleQueryVolunteer = async ()=>{
            const useParams = {
                params:{
                    id:volunteerInfo.id
                }
            }
            const {data} = await queryVolunteer(useParams)
            nowVolunteerInfo.value = data
            if(nowVolunteerInfo.value.volunteerType===0 || nowVolunteerInfo.value.volunteerType===1) {
                isShowVolunteerType.value = true
            } else {
                isShowVolunteerType.value = false
            }
        }
        handleQueryVolunteer()

      const showModel= ref(false)
        const handleCancel=()=>{
            showModel.value = false
        }
        const handleIsShow = ()=>{
            isShow.value = !isShow.value
        }
        const handleIsShowTrue = (e)=>{
           e.stopPropagation()
            isShow.value = true
        }
        const handleConfirm = ()=>{
            showModel.value = false
        }
        const handleApply = ()=>{
            if(nowVolunteerInfo.value.volunteerType == null) {
                router.push('/selectType')
            } else if(nowVolunteerInfo.value.status===0) {
                router.push('/resume')
            } else {
                router.push('/apply')
            }

        }
        const handleVolTeamInfo = async (teamId) => {
            showModel1.value = true
            const useParams = {
                params:{
                    teamId:+teamId
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
        }
      const previewResume = ()=>{
          window.open('#/resume')
          // showModel.value = !showModel.value
      }
        const OpenPage=()=>{
            window.open('#/Ch-psw')
        }
        const handleSelectType = ()=>{
            window.open('#/selectType')
        }
        const handleConfirm1 = async ($ref)=> {
            /* eslint-disable */
            visible.value = false
        }
        const handleCancel1 = () => {
            showModel.value = false;
        }
        const handleLogout = async ()=>{
          // const useParams = {
          //     params:{
          //         id:111
          //     }
          // }
          // await logout(useParams)
            window.localStorage.removeItem('volunteertoken')
            router.push('/re-login')
        }
        return {
          previewResume,
            handleLogout,
            showModel,
            form,
            handleCancel,
            handleConfirm,
            OpenPage,
            handleSelectType,
            handleApply,
            isShow,
            handleIsShow,
            handleIsShowTrue,
            isShowVolunteerType,
            nowVolunteerInfo,
            handleVolTeamInfo,
            showModel1,
            volunteerList,
            handleConfirm1,
            handleCancel1,
            visible2
        }
    }
};
</script>

<style lang="scss" scoped>
body {
  background-color: rgb(247, 248, 250);
}
.el-step__icon {
  position: relative;
  top: -95px !important;
}
.common {
  width: 100%;
  height: 12rem;
  display: flex;
  justify-content: center;
  .container {
    width: 9rem;
    height: 12rem;
    justify-content: center;
    align-items: center;
    margin-top: 0.5rem;
    .head {
      width: 9rem;
      height: 2rem;
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      .head-left {
        width: 4rem;
        height: 1.5rem;
        background-color: rgb(255, 255, 255);
        display: flex;
        flex-direction: column;
        .vol {
          width: 100%;
          display: flex;
          justify-content: space-between;
          // align-items: center;
          flex-direction: column;
          .user {
            display: flex;
            height: 0.5rem;
            width: 80%;
            align-items: center;
            justify-content: space-between;
            margin-top: 10px;
            margin-left: 20px;
            .user-icon {
              display: flex;
              flex-direction: row;

              .el-icon {
                width: 26px;
                height: 26px;
                background-color: rgb(162, 168, 184);
                border-radius: 50%;
              }
              img{
                position: relative;
                top: 8px;
              }
            }
          }
        }
        .vol-list {
          position: relative;
          font-size: 12px;
          color: rgb(23, 159, 255);
          .Ver-line{
            position: relative;
            top: 0.02rem;
            margin: 0 10px;
          }
          .vli{
            position: absolute;
            top: .1rem;
            left: 0.2rem;
          }
          .list{
            position: absolute;
            top: 0.1rem;
            left: 1.3rem;
          }
          ul {
            list-style: none;
            li {
              list-style: none;
              display: inline-block;
              cursor: pointer;
              // margin-right: 0.2rem;
            }
          }
        }
      }
      .head-right {
        width: 4rem;
        height: 1.5rem;
        background-color: rgb(255, 255, 255);
        .function{
          margin: 20px 0 40px 20px;
          font-size: 24px;
        }
        .head-right-main{
          display: flex;
          justify-content: space-around;

          .apply {}
          .sign {}
          .common-right{
            font-size: 16px;
            color:#179fff;
            cursor: pointer;
          }
        }

      }
    }
    .main {
      display: flex;
      position: relative;
      width: 9rem;
      height: 7rem;
      margin-top: 0.5rem;
      margin-bottom: 20px;
      flex-direction: column;
      align-items: center;
      background-color: rgb(255, 255, 255);

      .phase-container {
        position: relative;
        left: -20%;
        text-align: left;
        box-sizing: border-box;
        padding: 50px 0 50px 150px;
        .phase-item {

          font-size: 13px;
          text-align: left;
          box-sizing: border-box;
          .phase-title {

            text-align: left;
            box-sizing: border-box;
            display: flex;
            align-items: center;
            .phase-tip {
              box-sizing: border-box;
              padding: 2px 5px;
              color: #fff;
              font-size: 13px;
              line-height: 24px;
              background: #10a1ff;
              border-radius: 0 100px 100px 0;
              text-align: center;
            }
            .no-phase-name {
              text-align: left;
              box-sizing: border-box;
              line-height: 24px;
              background: #f6f8fb;
              height: 24px;
              margin-left: 16px;
              width: 273px;
            }
          }
          .phase-content {


            text-align: left;
            box-sizing: border-box;
            display: flex;
            .pahse-cut-line {


              text-align: left;
              box-sizing: border-box;
              width: 3px;
              margin: 0 45px 0 18px;
              background: #10a1ff;
            }
            .phase-main {

              box-sizing: border-box;
              padding: 20px 0 40px 0;
              text-align: left;
              .no-phase-intro {


                text-align: left;
                box-sizing: border-box;
                background: #f6f8fb;
                width: 273px;
                height: 66px;
              }
            }
          }
        }
      }
      .main-up {
        display: flex;
        align-items: center;
        justify-content: space-between;
        height: 0.5rem;
        width: 9rem;
        background-color: #fff;

      }
      .main-fo {
        width: 9rem;
        position: absolute;
        left: 1rem;
        top: 1rem;
      }

    }
  }
  .mask {
    z-index: 1;
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background-color: rgba(0, 0, 0, .5);
    .sign {
      position: absolute;
      top: 40%;
      left: 50%;
      z-index: 2;
      //  width: 100%;
      //height: 100%;
      transform: translate(-50%,-50%);
    }
  }
}
</style>
