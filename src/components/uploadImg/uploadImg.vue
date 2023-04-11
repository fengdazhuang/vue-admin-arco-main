<template>
  <div class="choose-cover">
    <div class="uploader-comp">
      <div id="block-choose" class="block-choose" :style="coverStyle">
        <img :src="imgSrc"  style="width: 100px; height: 100px; align-self: center;" v-show="isImg"/>
      </div>
      <input type="file" @change="uploadCover()" @mouseover="mouseOver" @mouseout="mouseOut" ref="inputPic" class="inputPic" accept="image/jpeg,image/jpg,image/png">
    </div>
    <div style="margin-top: 10px; color: #9b9d9e;">请上传JPG、JPEG、PNG格式的封面图噢~</div>
  </div>
</template>
<script lang="ts">
import axios from 'axios';
import { IconEdit, IconPlus } from '@arco-design/web-vue/es/icon'
import {defineComponent, reactive,ref,getCurrentInstance} from 'vue';
import {getCurrentInstance} from "vue";

export default defineComponent({
  setup(props) {
    const ctx1 = getCurrentInstance()
    const inputPic = ref(null)
    const imgSrc = ref('@/assets/images/img1.jpg')
    const uploadCover = (e)=> {
      var me = ctx1.ctx;

      let f = inputPic.value.files[0];

      let multiForm = new FormData() ; 		//创建一个form对象
      multiForm.append('files', f, f.name);  	//append 向form表单添加数据

      // 请求后端获得最新数据
      var fsServerUrl = 'http://localhost:8009';
      axios.defaults.withCredentials = true;
      var fileServer = fsServerUrl + '/file/uploadFiles';

      axios.post(
          fileServer,
          multiForm,
          {
            headers: {
              'Content-Type': 'multipart/form-data',
            }
          })
          .then(res => {
            console.log('resImg',res)
            if (res.code === 200) {
              var imagesList = res.data;
              if (imagesList.length < 1) {
                alert("张图片上传失败，请保证图片不能为空，并且符合 jpg/png/jpeg 的后缀格式！");
              } else {
                imgSrc.value = imagesList[0];
                form.picture = imagesList[0]
                isImg.value = true

              }
            } else {
              alert(res.data.msg);
            }
          });
    }
  }
})

</script>

<style scoped lang="less">



</style>