<template>
    <div @click="cameraPreviewOpen()">
        <img :src="picValueZero" style="height: 105px;width: 79px;">
    </div>
    <CameraPreview v-if="cameraPreviewVisible" name="cameraPreview" ref="cameraPreview" @refreshCameraPhoto="refreshCameraPhoto"></CameraPreview>
</template>


<script>
    import CameraPreview from '@/views/testChild.vue'
    export default {
        components:{CameraPreview},
        data() {
            return {
                cameraPreviewVisible: false,
                picValueZero: ''
            },
                methods: {
                cameraPreviewOpen(cameraType){
                    this.cameraPreviewVisible = true
                    this.$nextTick(() => {
                        this.$refs.cameraPreview.init()
                    });
                },
                refreshCameraPhoto(cameraPhoto){
                    let httpZp;
                    this.$http.post('/uploadImage',{
                        params:{
                            imageFile: cameraPhoto
                        }
                    }).then(({ data: res }) => {
                        if (res.code !== 0) {
                            return this.$message.error(res.msg)
                        }
                        httpZp = res.data.src;
                        this.picValueZero = cameraPhoto;
                    }).catch(() => {})
                }
            }
        }
    }

</script>
