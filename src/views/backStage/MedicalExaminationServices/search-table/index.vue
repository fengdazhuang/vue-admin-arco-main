<template>
    <div>
        <Breadcrumb :items="['医检管理', '兴奋剂检测']" />
        <div class="main">
            <div class="main-left">
            <a-card :style="{width:'100%'}" class="general-card card" title="被检人员登记">
                <a-row>
                    <a-col :flex="1">
                        <a-form
                                :model="form"
                                :label-col-props="{ span: 7 }"
                                :wrapper-col-props="{ span: 15 }"
                                label-align="left"
                        >           <a-row :gutter="16">
                            <a-col :span="11">
                                <a-form-item field="playerId"  label="参赛证ID">
                                    <a-input v-model="form.playerId" placeholder="请输入参赛证ID" />
                                </a-form-item>
                            </a-col>
                            <a-col :span="11">
                                <a-form-item field="sampleNumber"  label="样品编号">
                                    <a-input  v-model="form.sampleNumber" placeholder="请输入样品编号" />
                                </a-form-item>
                            </a-col>
                            <a-col :span="11">
                                <a-form-item field="inspector"  label="检测人员">
                                    <a-input  v-model="form.inspector" placeholder="请输入检测人员" />
                                </a-form-item>
                            </a-col>
                            <a-col :span="11">
                                <a-form-item field="examinationPosition"  label="检测地点">
                                    <a-input v-model="form.examinationPosition"  placeholder="请输入检测地点" />
                                </a-form-item>
                            </a-col>
                            <a-col :span="11">
                                <a-form-item field="examinationType"  label="检测类型">
                                    <a-tree-select :data="TreeExaminationType" v-model="form.examinationType" placeholder="请选择检测类型"/>
                                </a-form-item>
                            </a-col>
                        </a-row>
                        </a-form>
                    </a-col>

                </a-row>
                    <a-divider style="margin-top: 20px" />
                <div class="camera_outer">
                    <div style="width:800px;height:800px;position: relative;left: 50%;transform: translateX(-50%)">
                        <video id="videoCamera" v-show="isShow"  :width="videoWidth" :height="videoHeight" autoplay></video>
                    </div>

                    <canvas style="display:none;" id="canvasCamera" :width="videoWidth" :height="videoHeight" ></canvas>

                    <div v-if="imgSrc" class="img_bg_camera">
                        <img :src="imgSrc" style="width:800px;height:760px;position: relative;left: 50%;transform: translateX(-50%)" alt="" class="tx_img">
                    </div>
                    <div class="btns">
                        <button @click="getCompetence()">开始对比</button>
                        <button @click="stopNavigator()">关闭摄像头</button>
                        <button @click="setImage()">拍照</button>
                    </div>
                    <!--   eslint-disable   -->
                    　　　　　
                </div>
                </a-card>
        </div>
            <div class="main-right">
            <a-card :style="{width:'100%'}" class="general-card card" title="搜索">
                <h3 :style="{textAlign:'center'}">编号</h3>

                <a-row style="margin-bottom: 16px">
                    <a-col :flex="1">
                        <a-form
                                :model="form"
                                :label-col-props="{ span: 6 }"
                                :wrapper-col-props="{ span: 18 }"
                                label-align="left"
                        >           <a-row :gutter="16">
                            <a-col :span="12">
                                <a-form-item field="number"  label="样品编号">
                                    <a-input v-model="number" placeholder="请输入样品编号" />
                                </a-form-item>
                            </a-col>
                            <a-space  :size="18">
                                <a-button type="primary" :style="{margin:'0 0 0 20px'}" @click="search">
                                    <template #icon>
                                        <icon-search />
                                    </template>
                                    查询
                                </a-button>
                                <a-button @click="reset">
                                    <template #icon>
                                        <icon-refresh />
                                    </template>
                                    重置
                                </a-button>
                            </a-space>
                        </a-row>
                        </a-form>
                    </a-col>
                </a-row>
                <a-row style="margin-bottom: 16px">
                    <a-col :span="16">
                        <a-space>
                            <a-button @click="handleChangeMany(1)" type="primary">批量正常</a-button>
                            <a-button @click="handleChangeMany(0)" type="primary" status="danger">批量异常</a-button>
                        </a-space>
                    </a-col>
                </a-row>
                <a-divider style="margin-top: 20px" />
                                    <a-table
                                            size="large"
                                            row-key="id"
                                            :loading="loading"
                                            :pagination="pagination"
                                            :data="PlayerList"
                                            :bordered="false"
                                            :row-selection="rowSelection"
                                            @selection-change="handleGetId"
                                    >
                                        <template #columns>
                                            <a-table-column
                                                    title="样品编号"
                                                    data-index="sampleNumber"
                                            />
                                            <a-table-column
                                                    title="姓名"
                                                    data-index="name"
                                            >
                                            </a-table-column>
                                            <a-table-column
                                                    title="检测人员"
                                                    data-index="inspector"
                                            >
                                            </a-table-column>
                                            <a-table-column
                                                    title="送检时间"
                                                    data-index="registrationTime"
                                            >
                                                <template #cell="{ record }">
                                                    <div>
                                                        {{record.registrationTime}}
                                                    </div>
                                                </template>
                                            </a-table-column>>
                                            <a-table-column
                                                    title="操作"
                                                    data-index="operations"
                                            >
                                                <template #cell="{ record }">
                                                    <a-button @click="handleSubmitResult(record,1)" type="text">正常</a-button>
                                                    <a-button @click="handleSubmitResult(record,0)" type="text" status="danger">异常</a-button>
                                                </template>
                                            </a-table-column>
                                        </template>
                                    </a-table>
            </a-card>
        </div>
        </div>
    </div>
</template>

<script>
    import {reactive, ref} from 'vue'
    import {Message} from "@arco-design/web-vue";
    import {addDopTest,submitResult,pageExamination} from '@/api/dope'
    import useLoading from "../../../../hooks/loading";



    /* eslint-disable */
    export default {
        name: 'Tab',
        data() {
            return {
                createdTimes: 0,
                videoWidth: 800,
                videoHeight: 800,
                imgSrc: '',
                thisCancas: null,
                thisContext: null,
                thisVideo: null,
                isShow:false,
                form:{
                playerId:'',
                    sampleNumber:'',
                base64:'',
                inspector:'',
                examinationPosition:'',
                examinationType:''
            },
                PlayerList:[]
            }
        },
        methods: {
            // showCreatedTimes() {
            //     this.createdTimes = this.createdTimes + 1
            // },
            // 调用权限（打开摄像头功能）
            getCompetence () {
                var _this = this
                this.isShow = true
                this.thisCancas = document.getElementById('canvasCamera')
                this.thisContext = this.thisCancas.getContext('2d')
                this.thisVideo = document.getElementById('videoCamera')
                // 旧版本浏览器可能根本不支持mediaDevices，我们首先设置一个空对象
                if (navigator.mediaDevices === undefined) {
                    navigator.mediaDevices = {}
                }
                // 一些浏览器实现了部分mediaDevices，我们不能只分配一个对象
                // 使用getUserMedia，因为它会覆盖现有的属性。
                // 这里，如果缺少getUserMedia属性，就添加它。
                if (navigator.mediaDevices.getUserMedia === undefined) {
                    navigator.mediaDevices.getUserMedia = function (constraints) {
                        // 首先获取现存的getUserMedia(如果存在)
                        var getUserMedia = navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.getUserMedia
                        // 有些浏览器不支持，会返回错误信息
                        // 保持接口一致
                        if (!getUserMedia) {
                            return Promise.reject(new Error('getUserMedia is not implemented in this browser'))
                        }
                        // 否则，使用Promise将调用包装到旧的navigator.getUserMedia
                        return new Promise(function (resolve, reject) {
                            getUserMedia.call(navigator, constraints, resolve, reject)
                        })
                    }
                }
                var constraints = { audio: false, video: { width: this.videoWidth, height: this.videoHeight, transform: 'scaleX(-1)' } }
                navigator.mediaDevices.getUserMedia(constraints).then(function (stream) {
                    // 旧的浏览器可能没有srcObject
                    if ('srcObject' in _this.thisVideo) {
                        _this.thisVideo.srcObject = stream
                    } else {
                        // 避免在新的浏览器中使用它，因为它正在被弃用。
                        _this.thisVideo.src = window.URL.createObjectURL(stream)
                    }
                    _this.thisVideo.onloadedmetadata = function (e) {
                        _this.thisVideo.play()
                    }
                }).catch(err => {
                    console.log(err)
                })
            },
//  绘制图片（拍照功能）

            setImage () {
                this.stopNavigator()
                var _this = this
                // 点击，canvas画图
                _this.thisContext.drawImage(_this.thisVideo, 0, 0, _this.videoWidth, _this.videoHeight)
                // 获取图片base64链接
                var image = this.thisCancas.toDataURL('image/png')
                _this.imgSrc = image
                console.log('_this.imgSrc',image)
                const body = {
                    playerId:this.form.playerId,
                    sampleNumber:this.form.sampleNumber,
                    inspector:this.form.inspector,
                    examinationPosition:this.form.examinationPosition,
                    examinationType:this.form.examinationType,
                    base64:_this.imgSrc
                }
                const res =  addDopTest(body)
                res.then(res=>{
                    console.log('res',res)
                    if (res.success) {
                        Message.success('人脸识别成功')
                      this.isShow = false
                        const useParams = {
                           params:{
                               pageNumber: 1,
                               pageSize: 15,
                               sampleNumber:''
                           }
                        }
                        const res1 = pageExamination(useParams)
                        res1.then(res=>{
                            this.PlayerList = res.data.records
                            this.imgSrc = ''
                            this.form = {
                                playerId:'',
                                sampleNumber:'',
                                base64:'',
                                inspector:'',
                                examinationPosition:'',
                                examinationType:''
                            }
                        })
                    } else {
                      this.isShow = false
                        this.imgSrc = ''
                        this.form = {
                            playerId: '',
                            sampleNumber: '',
                            base64: '',
                            inspector: '',
                            examinationPosition: '',
                            examinationType: ''
                        }
                    }
                })


                this.$emit('refreshDataList', this.imgSrc)
                console.log('this.imgSrc',this.imgSrc)
            },
// base64转文件

            dataURLtoFile (dataurl, filename) {
                var arr = dataurl.split(',')
                var mime = arr[0].match(/:(.*?);/)[1]
                var bstr = atob(arr[1])
                var n = bstr.length
                var u8arr = new Uint8Array(n)
                while (n--) {
                    u8arr[n] = bstr.charCodeAt(n)
                }
                return new File([u8arr], filename, { type: mime })
            },
// 关闭摄像头

            stopNavigator () {
                this.thisVideo.srcObject.getTracks()[0].stop()
                this.isShow = false
            }
        },
        setup(){
            const { loading,setLoading } = useLoading(true);
            const basePagination= {
                pageNumber: 1,
                pageSize: 15,
            };
            const pagination = reactive({
                ...basePagination,
            });
            let ids = []
            const number = ref()
            const TreeExaminationType = [
                {
                    key:0,
                    title:'赛内检查'
                },
                {
                    key:1,
                    title:'赛外检查'
                }
            ]
            const PlayerList =ref(
                [
                    {
                        id:'111',
                        sampleNumber:'111',
                        result:0
                    },
                    {
                        id:'222',
                        sampleNumber:'222',
                        result:0
                    }
                ]
            )
            const rowSelection = reactive({
                type: 'checkbox',
                showCheckedAll: true,
                onlyCurrent: false
            });
            const handlePageExamination = async (number='')=>{
                setLoading(true)
                const useParams = {
                    params:{
                        pageNumber:1,
                        pageSize:20,
                        sampleNumber:number + ''
                    }
                }
                const {data} = await pageExamination(useParams)
                PlayerList.value = data.records
                setLoading(false)
            }
            handlePageExamination()
            const search = async ()=>{
                handlePageExamination(number.value)
            }
            const reset = ()=>{
                number.value = ''
            }
            const handleGetId = (rowKeys) =>{
                ids = []
                PlayerList.value.forEach(item=>{
                    if (rowKeys.includes(item.id)) {
                        ids.push({
                            id:item.id,
                            result:item.result
                        })
                    }

                })
                console.log('ids',ids)
            }
            const handleChangeMany = async (type)=>{
                if(type===1) {
                    ids.forEach(item=>{
                        item.result = 1
                    })
                    const body = ids
                    await submitResult(body)
                }
                if(type===0){
                    ids.forEach(item=>{
                        item.result = 0
                    })
                    const body = ids
                    await submitResult(body)
                }
                handlePageExamination()

                // ids.forEach(item=>{
                //     if (item.result === 1) {
                //         item.result = false
                //     } else {
                //         item.result = true
                //     }
                // })
            }
            const handleSubmitResult = async (row,type)=>{
                if(type===1) {
                    const body = [
                        {
                            id:row.id,
                            result:1
                        }
                    ]
                    await submitResult(body)
                }
                if(type===0) {
                    const body = [
                        {
                            id:row.id,
                            result:0
                        }
                    ]
                    await submitResult(body)
                }

                handlePageExamination()
            }
            return {
                TreeExaminationType,
                PlayerList,
                handleSubmitResult,
                rowSelection,
                handleGetId,
                handleChangeMany,
                search,
                number,
                reset,
                pagination,
                loading
            }
        }
    }
</script>

<style lang="scss" scoped>
  .camera_outer{
    position: relative;
    overflow: hidden;
    //background: url("../../assets/img/user_0608_04.png") no-repeat center;
    background-size: 100%;
    .btns {
      margin-top: 30px;
      display: flex;
      justify-content: space-between;
      width: 500px;
      z-index: 100;
      margin: 0 auto;
      font-size: 20px;
    }
    video,canvas,.tx_img{
      -moz-transform:scaleX(-1);
      -webkit-transform:scaleX(-1);
      -o-transform:scaleX(-1);
      transform:scaleX(-1);
    }
    .btn_camera{
      position: absolute;
      bottom: 4px;
      left: 0;
      right: 0;
      height: 50px;
      background-color: rgba(0,0,0,0.3);
      line-height: 50px;
      text-align: center;
      color: #ffffff;
    }
    .bg_r_img{
      position: absolute;
      bottom: 0;
      left: 0;
      right: 0;
      top: 0;
    }
    .img_bg_camera{
      position: absolute;
      bottom: 0;
      left: 0;
      right: 0;
      top: 0;
      img{
        width: 100%;
        height: 100%;
      }
      .img_btn_camera{
        position: absolute;
        bottom: 0;
        left: 0;
        right: 0;
        height: 50px;
        line-height: 50px;
        text-align: center;
        background-color: rgba(0,0,0,0.3);
        color: #ffffff;
        .loding_img{
          width: 50px;
          height: 50px;
        }
      }
    }
  }
  .main {
    display: flex;
    justify-content: space-between;
    .main-left {
      width: 48%;
    }
    .main-right {
      width: 48%;
    }
  }
    .tab-container {
        margin: 30px;
        .create {
            background: #ffffff;
            height: 50px;
        }
    }
</style>
