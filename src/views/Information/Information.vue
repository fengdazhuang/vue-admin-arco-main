<template>
    <div class="main-container">
        <div class="container">
            <img src="src\assets\game-img\bgc\banner.jpg" alt="" class="bgc-img" />
        </div>
        <div class="main">
            <img src="@/assets/images/yydt_title.png" />
<!--            <div class="yydt-box">-->
<!--                <div class="yydt-box-img">-->
<!--                    <img src="@/assets/images/yydt_img1.jpg" />-->
<!--                </div>-->
<!--                <div class="yydt-item">-->
<!--                    <p class="time">2023/4/15</p>-->
<!--                    <a href="#">-->
<!--                        <p class="title">亚赛联主席陈春新一行考察杭州亚运会赛艇项目比赛场馆</p>-->
<!--                        <p class="summary">-->
<!--                            4月14日，亚洲赛艇联合会主席陈春新，杭州亚运会赛艇技术代表Victor（香港）一行来到富阳水上运动中心，考察杭州亚运会赛艇项目比赛场馆，并观摩“韵味杭州”山羊体育杯2023年全国赛艇春季冠军赛。-->
<!--                        </p>-->
<!--                    </a>-->
<!--                    <div class="yydt-item-link">-->
<!--                        <a href="/information/infochild" target="_blank">-->
<!--                            查看详情-->
<!--                            <span>——></span></a>-->
<!--                    </div>-->
<!--                </div>-->
<!--            </div>-->
            <div class="yydt-box" @click="handleReadNews(item.id)" v-for="item in newsData" :key="item.id">
                <div v-show="item.articleCover" class="yydt-box-img">
                    <img @click="handleInfo(item)" :src="item.articleCover" :style="{width:'600px',height:'360px'}" />
                </div>
                <div class="yydt-item">
                    <p class="time">{{item.createTime}}</p>
                    <a @click="handleInfo(item)">
                        <p class="title">{{item.title}}</p>
                        <div class="summary" v-html="item.content">
                        </div>
                    </a>
                    <div class="yydt-item-link" @click="handleInfo(item)">
                        <a  target="_blank">
                            查看详情
                            <span>——></span></a>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    /* eslint-disable */
    import {addNews, queryNews,ReadNews} from '@/api/user'
    import {reactive,ref} from "vue";


    export default  {
        name:'Information',
        setup(){
            const form = {
                pageNumber: 1,
                pageSize: 20,
                startDate:'',
                endDate:'',
                keyword:'',
                status: 1
            }
            let newsData = ref({})
            const date = new Date()
            const handleReadNews = async (id)=>{

            }
            const getNews = async ()=>{
                const useParams = {
                    params:{
                        ...form
                    }
                }
                const {data} = await queryNews(useParams)
                data.records.forEach(item=>{
                    item.createTime = `${date.getFullYear()}年${date.getMonth()+1}月${date.getDay()}日`
                })
                newsData.value = data.records
                console.log('newsData.value',newsData.value)
            }
            getNews()
            const  handleInfo = async (item)=>{
                window.sessionStorage.setItem('item',JSON.stringify(item))
                const useParams = {
                    params:{
                        id:item.id
                    }
                }
                const res = await ReadNews(useParams)
                window.open('#/preview')
            }
            return {
                getNews,
                handleInfo,
                newsData,
                handleReadNews
            }
        }
    }
</script>

<style lang="scss" scoped>
  @import '@/assets/style/global.scss';
.main-container {
  .container {
    position: relative;
    // height: 100%;
    width: 100%;

    .bgc-img {
      display: block;
      width: 100%;
    }
  }
  .main {
    width: px2rem(1400px);
    margin: 0 auto;
    padding: 45px 0 90px;
    .yydt-box {
      display: flex;
      justify-content: space-between;
      margin-bottom: 80px;
      &-img {
        img {
          width: px2rem(600px);
        }
      }
      .yydt-item {
        //display: flex;
        flex: 1;
        margin-left: 100px;
        position: relative;
        width: px2rem(700px);
        height: px2rem(360px);
        .time {
          color: #888888;
          font-size: px2rem(16px);
          line-height: px2rem(26px) ;
          width: px2rem(300px);
          border-bottom: px2rem(1px) solid #1d21a9;
        }
        .title {
          color: #282828;
          margin: px2rem(25px) 0 px2rem(30px);
          font-size: px2rem(32px);
          line-height: px2rem(44px);
        }
        .title:hover {
          color: #2A2EAE;
        }
        &-link {
          position: absolute;
          right: 0;
          width: px2rem(200px);
          height: px2rem(50px);
          font-size: px2rem(16px);
          text-align: center;
          border: px2rem(1.4px) solid #000;
          border-radius: px2rem(50px);
          margin-top: px2rem(42px);

          a {
            border-radius: px2rem(50px);
            color: #000;
            line-height: px2rem(50px);
            display: block;
            width: 100%;
            height: 100%;
          }
          a:hover {
            background-color: #000;
            color: #fff;
          }
          span {
            padding-left: px2rem(20px);
          }
        }
        .summary {
          width: 100%;
          height: 70px;
          font-size: px2rem(20px);
          line-height: px2rem(36px);
          text-indent: 2em;
          color: #282828;
          overflow : hidden;
          text-overflow: ellipsis;
          display: -webkit-box;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 2;
        }
      }
    }
  }
}
</style>
