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
                            <el-icon style="font-size: 20px"><User /></el-icon>
                            <p style="font-size: 14px; margin-top: 0.1rem">志愿者编号 {{volunteerInfo.id.slice(0,6)}}</p>
                        </div>
                        <p style="font-size: 12px">志愿者类型</p>
                        <span @click="handleSelectType" :style="{fontSize:'12px',margin:'0 0 0 -0.5rem',color:'#179fff',cursor:'pointer'}">[请选择]</span>
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
                <p></p>
            </div>
        </div>
      <div class="main">
        <div class="main-up">
          <span style="font-size: 24px">招募进展</span>
          <span style="font-size: 12px; color: rgb(184, 184, 182)"
            >选择志愿者类型后呈现</span
          >
        </div>
        <div style="height: 4rem" class="main-fo">
          <el-steps :active="3" direction="vertical">
            <el-step title="Step 1" description="哈哈哈哈哈" />
            <el-step title="Step 2" />
            <el-step title="Step 3" />
          </el-steps>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
    import {reactive, ref} from 'vue'
    import {logout} from '@/api/volunteer'
    import {useRouter} from 'vue-router'

export default {
  name: "ind-center",
    setup(){
        const form = reactive({
            competitionName:'',
            name: '',
            photo:'@/assets/images/img1.jpg',
            country: '',
            sex:1,
            email:''
        });
        const router = useRouter()
        const volunteerInfo = JSON.parse(window.sessionStorage.getItem('volunteerInfo'))
      const showModel= ref(false)
        const handleCancel=()=>{
            showModel.value = false
        }
        const handleConfirm = ()=>{
            showModel.value = false
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
            volunteerInfo

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
}
</style>
