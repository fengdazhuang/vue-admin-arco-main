<template>
  <!-- 顶部背景图 -->
  <div>
    <img src="src\assets\game-img\bgc\banner.jpg" alt="" class="bgc-img" />
  </div>
  <div class="content">
    <div class="content-sslx">
      <!-- 赛事项目logo -->
      <div class="con-ssxm">
        <img src="src\assets\game-img\ssxm_title.png" alt="" class="ssxm" />
      </div>
      <div class="container">
        <!-- 四个比赛类别 -->
        <ul class="tabs">
          <li class="tab" @mouseenter="handleShow(1)">
            <div>
                竞技性比赛
            </div>
          </li>
          <li class="tab" @mouseenter="handleShow(2)">
            <div>
               球类比赛
            </div>
          </li>
          <li class="tab" @mouseenter="handleShow(3)">
            <div>
                对抗性比赛
            </div>
          </li>
          <li class="tab" @mouseenter="handleShow(4)">
            <div>
                水上比赛
            </div>
          </li>
        </ul>

      </div>
      <div>
          <div v-show="isCompetitive">
              <Competitive></Competitive>
          </div>
          <div v-show="isBall">
              <Ball :data="dataBall"></Ball>
          </div>
          <div v-show="isRivalry">
              <Rivalry></Rivalry>
          </div>
          <div v-show="isWater">
              <Water></Water>
          </div>

      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
    /* eslint-disable */
import { ref } from "vue";
//组件引入
import Ball from "./ELe-Competition/Ball.vue";
import Water from "./ELe-Competition/Water.vue";
import Rivalry from "./ELe-Competition/Rivalry.vue";
import Competitive from "./ELe-Competition/Competitive.vue";
import {getComInfos} from "@/api/list"
import type { TabsPaneContext } from "element-plus";


    let data = ref([])
    let dataCompetitive = ref([])
    let dataBall = ref([])
    let dataAdversarial = ref([])
    let dataWaterCompetition = ref([])

const isBall = ref(true)
    const isCompetitive = ref(false)
    const isRivalry = ref(false)
    const isWater = ref(false)

const activeName = ref("first");
const handleShow = (num)=>{
    if (num===1) {
        isCompetitive.value = true
        isBall.value = false
        isRivalry.value = false
        isWater.value = false
    } else if(num===2){
        isCompetitive.value = false
        isBall.value = true
        isRivalry.value = false
        isWater.value = false
    } else if(num===3) {
        isCompetitive.value = false
        isBall.value = false
        isRivalry.value = true
        isWater.value = false
    } else {
        isCompetitive.value = false
        isBall.value = false
        isRivalry.value = false
        isWater.value = true
    }
}
const getItems = async ()=>{
       const res = await getComInfos ()
    data.value = res.data
    dataCompetitive.value = res.data.filter(item=>{
        return item.type==='竞技性比赛'
    })
    dataBall.value = res.data.filter(item=>{
        return item.type === '球类比赛'
    })
    dataAdversarial.value = res.data.filter(item=>{
        return item.type==='对抗性比赛'
    })
    dataWaterCompetition.value = res.data.filter(item=>{
        return item.type === '水上比赛'
    })
        console.log('res1',res)
    }
    getItems()
const handleClick = (tab: TabsPaneContext, event: Event) => {
  console.log(tab, event);
};
</script>
<style lang="scss" scoped>
@import "@/assets/style/global.scss";
.demo-tabs > .el-tabs__content {
  padding: px2rem(32px);
  color: #6b778c;
  font-size: px2rem(32px);
  font-weight: 600;
}
.content {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
}
.container {
  display: flex;
  justify-content: center;
  align-items: center;
}

.el-tabs {
  margin-top: 1rem;
}
.bgc-img {
  width: 100%;
}
.content-sslx {
  width: 1400px;
  margin: 0 auto;
}
.con-ssxm {
  width: 100%;
}
.ssxm {
  width: px2rem(230px);
  height: px2rem(55px);
  margin-bottom: px2rem(-70px);
}

/* ul {
  display: flex;
} */
.tabs {
  display: flex;
  color: rgb(255, 255, 255);
  margin-top: px2rem(150px);
  justify-content: center;
  align-items: center;
  margin-left: 5%;
}

li:nth-child(1) {
  background-image: linear-gradient(rgb(11,98,255),rgb(52, 128, 255));
}
li:nth-child(1):hover {
  background-image: linear-gradient(rgb(29, 33, 169),rgb(29, 33, 169));
}

li:nth-child(2) {
  background-image: linear-gradient(rgb(24, 197, 187),rgb(1, 156, 187));
}
li:nth-child(2):hover {
  background-image: linear-gradient(rgb(29, 33, 169),rgb(29, 33, 169));
}

li:nth-child(3) {
  background-image: linear-gradient(rgb(246, 198, 129),rgb(245, 172, 85));
}
li:nth-child(3):hover {
  background-image: linear-gradient(rgb(29, 33, 169),rgb(29, 33, 169));
}

li:nth-child(4) {
  background-image: linear-gradient(rgb(255, 139, 80),rgb(255, 59, 67));
}
li:nth-child(4):hover {
  background-image: linear-gradient(rgb(29, 33, 169),rgb(29, 33, 169));
}
.tab {
  display: block;
  font-size: 36px;
  height: px2rem(143px);
  width: px2rem(300px);
  margin-right: px2rem(66px);
  border-radius: px2rem(20px);
  /* border: solid 1px; */
  text-align: center;
  line-height: px2rem(160px);
}
.ball{
  margin-top: 5%;
}
/* .demo-tabs .custom-tabs-label span {
  vertical-align: middle;
  margin-left: 4px;
} */
</style>
