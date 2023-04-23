<template>
    <Breadcrumb :items="['资讯管理', '发布资讯']" />
        <div class="textEdit">
            <a-form  ref="articleRef" :model="form" :style="{width:'100%'}">
                <div class="textEdit-title">
                    <a-input label="资讯标题" v-model="form.title"  :style="{width:'100%',height:'80px',background:'#fff',border:0}" placeholder="请输入资讯标题" allow-clear />
                </div>
                <div class="textEdit-machine">
                <QuillEditor :style="{height:'600px'}" v-model:content="form.content" :options="editorOption" contentType="html" />
                <div calss="setting" :style="{padding:'30px 0 0 0'}">
                    <div class="setting-field">
                            <a-form-item field="category" label="文章领域" :rules="[{required:true,message:'文章领域不能为空'}]">
                                <a-select v-model="form.category" :style="{width:'40%'}" placeholder="请选择文章领域" allow-clear>
                                    <a-option value="娱乐">娱乐</a-option>
                                    <a-option value="美食">美食</a-option>
                                    <a-option value="运动">运动</a-option>
                                </a-select>
                            </a-form-item>
                            <a-form-item field="articleCover" label="文章封面" :rules="[{required:true,message:'请选择文章封面'}]">
                                <a-radio-group v-model.number="form.articleType">
                                    <a-radio :value="1">单封面</a-radio>
                                    <a-radio :value="2">无封面</a-radio>
                                </a-radio-group>
                            </a-form-item>
                            <a-form-item v-show="form.articleType === 1 ? 1:0"  field="articleCover"  label="上传照片">
                                <a-space direction="vertical" :style="{ width: '100%' }">
                                    <div class="choose-cover">
                                        <div class="uploader-comp">
                                            <div id="block-choose" class="block-choose">
                                                <img :src="imgSrc"  style="width: 100px; height: 100px; align-self: center;" v-show="isImg"/>
                                            </div>
                                            <input type="file" @change="uploadCover()" @mouseover="mouseOver" @mouseout="mouseOut" ref="inputPic" class="inputPic" accept="image/jpeg,image/jpg,image/png">
                                        </div>
                                        <div style="margin-top: 10px; color: #9b9d9e;">请上传JPG、JPEG、PNG格式的封面图噢~</div>
                                    </div>
                                </a-space>
                            </a-form-item>
<!--                        </a-form>-->
                    </div>
                </div>
            </div>
                <div class="textEdit-footer">
                <div class="textEdit-footer-btns">
                <a-button class="btns-common" type="primary" @click="handleBack">返回</a-button>
                <a-button class="btns-common" type="primary" @click="handlePreview">预览</a-button>
                <a-button class="btns-common" @click="handleIsAppoint" type="primary">
                    定时发布

                </a-button>
                <a-button class="btns-common"  :style="{background:'rgb(202,57,74)',color:'#fff'}" @click="handlePublic($refs.articleRef)" type="primary">
                    发布文章
                </a-button>

                </div>
                    <div class="date-select" v-show="form.isAppoint">
                        <a-date-picker
                                v-model="time"
                                show-time
                                :time-picker-props="{ defaultValue: '09:09:06' }"
                                format="YYYY-MM-DD HH:mm:ss"
                                @ok="onOk"
                        />
                </div>
            </div>
            </a-form>>
        </div>
        <div :style="{margin:'0 0 170px 0'}"></div>
</template>

<script>
 /* eslint-disable */
    // 工具栏配置
    // import {PolicyParams} from "../../../../api/list";

 const toolbarOptions = [
        ['bold', 'italic', 'underline', 'strike'], // 加粗 斜体 下划线 删除线
        ["blockquote", "code-block"], // 引用
        [{ list: 'ordered' }, { list: 'bullet' }], // 有序、无序列表
        [{ script: "sub" }, { script: "super" }], // 上标/下标
        [{ indent: '-1' }, { indent: '+1' }], // 缩进
        [{ direction: 'rtl' }], // 文本方向
        [{ size: ['small', false, 'large', 'huge'] }], // 字体大小
        [{ header: [1, 2, 3, 4, 5, 6, false] }], // 标题
        [{ color: [] }, { background: [] }], // 字体颜色、字体背景颜色
        [{ font: [] }], // 字体种类
        [{ align: [] }], // 对齐方式
        ['clean'], // 清除文本格式
        ['link', 'image', 'video'] // 链接、图片、视频
    ]
 import {  computed, ref, reactive,getCurrentInstance } from 'vue';
 import  {useRouter} from 'vue-router'
 import { addNews} from '@/api/user';
    import {QuillEditor, Quill } from '@vueup/vue-quill'
    import { container, ImageExtend, QuillWatch } from 'quill-image-extend-module'
    import quillTool from '@/utils/quillTool'
    Quill.register(quillTool, true)
    Quill.register('modules/ImageExtend', ImageExtend)
    import 'quill/dist/quill.core.css'
    import 'quill/dist/quill.snow.css'
    import 'quill/dist/quill.bubble.css'
 import { Message } from '@arco-design/web-vue';
    export default {
        components: { QuillEditor },
        props: ['model'],
        data() {
            return {
                // content: '',
                editorOption: {
                    theme: 'snow',
                    placeholder: '请输入内容',
                    modules: {
                        ImageExtend: {
                            name: 'file_name', // 参数名
                            action: window.BASE_URL + '/backend/upload/image', // 服务器地址，如果为空则采用base64插入图片
                            headers: xhr => { // 设置请求头参数（选填）
                                xhr.setRequestHeader('s', '疯狂星期四v50')
                            },
                            response: res => {
                                return res.data.url
                            },
                            size: 8, // 图片不能超过8M
                            sizeError: () => {
                                this.$message.error('粘贴图片大小不能超过8MB!')
                            }
                        },
                        toolbar: {
                            container: toolbarOptions,
                            handlers: {
                                image: function(value) {
                                    QuillWatch.emit(this.quill.id)
                                },
                                link: function(value) {
                                    if (value) {
                                        var href = prompt('请输入链接地址：')
                                        this.quill.format('link', href)
                                    } else {
                                        this.quill.format('link', false)
                                    }
                                },
                                video: function(value) {
                                    if (value) {
                                        var href = prompt('请输入视频链接：')
                                        this.quill.format('video', href)
                                    } else {
                                        this.quill.format('video', false)
                                    }
                                }
                            }
                        }
                    }
                },
            }
        },
        setup(){
            const router = useRouter()
            const time = ref()
            const articleRef = ref(null)
            const form = reactive({
                title:'',
                content:'',
                category:'',
                articleType:2,
                publisherId:111,
                // publishTime:'',
                isAppoint:0,
                articleCover:'111'
            })
            const  imgSrc = ref('')
            const isImg = ref(false)
            const ctx1 = getCurrentInstance()
            const handlePublic = async (articleRef)=>{
                const useData = {...form,publishTime:new Date(time.value)}
                console.log(useData)
                console.log(new Date(time.value))
               const res = await addNews(useData)
                if (res.code === 200) {
                    // articleRef.resetFields()
                    // form.title = ''
                    // form.content = ''
                    Message.success('发布成功')
                }
            }
            // const fetchData = async (
            //     params = { competitionName:'',country:'',name:'',pageNumber: 1, pageSize: 20 }
            // ) => {
            //     setLoading(true);
            //     try {
            //         const useData = {...form,publishTime:new Date(time.value)}
            //
            //         const { data } = await addNews(useData);
            //         data.records.forEach(item =>{
            //             // item.sex
            //             if(item.sex===1) {
            //                 item.sex = '男'
            //             } else {
            //                 item.sex = '女'
            //             }
            //             item.createTime = `${date.getFullYear()}年${date.getMonth()}月${date.getDay()}日${date.getHours()}时${date.getMinutes()}分`
            //         })
            //         PlayerList.value = data.records
            //         // renderData.value = data.list;
            //         pagination.pageNumber = params.pageNumber;
            //         pagination.total = data.total;
            //     } catch (err) {
            //         // you can report use errorHandler or other
            //     } finally {
            //         setLoading(false);
            //     }
            // };
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
                form.articleCover = '@/assets/images/img1.jpg'
                isImg.value = true
            }
            const  handleIsAppoint = ()=>{
                if (form.isAppoint === 1) {
                    form.isAppoint = 0
                } else {
                    form.isAppoint = 1
                }
                console.log('form.isAppoint',form.isAppoint)
            }
            const handlePreview = ()=>{
                window.sessionStorage.setItem('item',JSON.stringify(form))
                window.open('#/preview')
            }
            const handleBack = ()=>{
                router.go(-1)
            }
            const onOk = ()=>{

            }
            return {
                form,
                handlePublic,
                uploadCover,
                imgSrc,
                isImg,
                onOk,
                handleIsAppoint,
                time,
                handlePreview,
                articleRef,
                handleBack,
                router
            }
        }
    }
</script>

<style lang="scss" scoped>
  .btns-common {
    height:50px;
    margin:0 20px 0 0;
    background: #fff;
    color: #000;
    border: 1px solid grey;
    border-radius: 7px;
  }
  .arco-input-wrapper .arco-input.arco-input-size-medium {
    font-size: 50px !important;
  }
    .textEdit {
      background: #ffffff;
      width: 100%;
      .textEdit-title {
        width: 100%;
      }
      textEdit-machine {
        //padding: 30px;
        width: 100%;
        height: 100%;
      }
      .textEdit-footer {
        background: #ffffff;
        width: 100%;
        height:80px;
        position:fixed;
        bottom:0px;
        z-index:11;
        border: 1px solid grey;
        &-btns {
            width: 50%;
            height: 60px;
            position: relative;
          top: 50%;
          left: 50%;
          transform: translate(-50%,-50%);
      }
        .date-select {
          position: absolute;
          top: 50%;
          transform: translateY(-30%);
          left: 50%;
        }
      }
    }
    .ql-container {
        height: 300px;
        line-height: normal;
        width: auto;
    }

    span.ql-size {
        max-width: 80px !important;
    }

    .ql-tooltip[data-mode="link"]::before {
        content: "请输入链接地址:";
    }

    .ql-tooltip.ql-editing a.ql-action::after {
        border-right: 0px;
        content: "保存";
        padding-right: 0px;
    }

    .ql-tooltip[data-mode="video"] {
        left: 0 !important;
    }

    .ql-tooltip[data-mode="video"]::before {
        content: "请输入视频地址:";
    }

    .ql-picker.ql-size .ql-picker-label::before,
    .ql-picker.ql-size .ql-picker-item::before {
        content: "14px";
    }

    .ql-picker.ql-size .ql-picker-label[data-value="small"]::before,
    .ql-picker.ql-size .ql-picker-item[data-value="small"]::before {
        content: "10px";
    }

    .ql-picker.ql-size .ql-picker-label[data-value="large"]::before,
    .ql-picker.ql-size .ql-picker-item[data-value="large"]::before {
        content: "18px";
    }

    .ql-picker.ql-size .ql-picker-label[data-value="huge"]::before,
    .ql-picker.ql-size .ql-picker-item[data-value="huge"]::before {
        content: "32px";
    }

    .ql-picker.ql-header .ql-picker-label::before,
    .ql-picker.ql-header .ql-picker-item::before {
        content: "文本";
    }

    .ql-picker.ql-header .ql-picker-label[data-value="1"]::before,
    .ql-picker.ql-header .ql-picker-item[data-value="1"]::before {
        content: "标题1";
    }

    .ql-picker.ql-header .ql-picker-label[data-value="2"]::before,
    .ql-picker.ql-header .ql-picker-item[data-value="2"]::before {
        content: "标题2";
    }

    .ql-picker.ql-header .ql-picker-label[data-value="3"]::before,
    .ql-picker.ql-header .ql-picker-item[data-value="3"]::before {
        content: "标题3";
    }

    .ql-picker.ql-header .ql-picker-label[data-value="4"]::before,
    .ql-picker.ql-header .ql-picker-item[data-value="4"]::before {
        content: "标题4";
    }

    .ql-picker.ql-header .ql-picker-label[data-value="5"]::before,
    .ql-picker.ql-header .ql-picker-item[data-value="5"]::before {
        content: "标题5";
    }

    .ql-picker.ql-header .ql-picker-label[data-value="6"]::before,
    .ql-picker.ql-header .ql-picker-item[data-value="6"]::before {
        content: "标题6";
    }

    .ql-picker.ql-font .ql-picker-label::before,
    .ql-picker.ql-font .ql-picker-item::before {
        content: "标准字体";
    }

    .ql-picker.ql-font .ql-picker-label[data-value="serif"]::before,
    .ql-picker.ql-font .ql-picker-item[data-value="serif"]::before {
        content: "衬线字体";
    }

    .ql-picker.ql-font .ql-picker-label[data-value="monospace"]::before,
    .ql-picker.ql-font .ql-picker-item[data-value="monospace"]::before {
        content: "等宽字体";
    }

</style>
