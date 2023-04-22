<template>
    <div class="row-container">

        <ul class="ul">
            <li calss="item" v-for="item in data" :key="item.id">
                <a @click="handleInfo(item)" class="item-link">
                    <img :src="item.picture" alt="" />
                </a>
            </li>

        </ul>
    </div>
</template>

<script>
    export default {
        name:'Water',
        props:{
            data:Array
        },
        setup(props){
            const handleInfo = (item)=>{
                console.log('item',item)
                window.sessionStorage.setItem('item',JSON.stringify(item))
                window.open('#/preview')
            }
            return {
                handleInfo
            }
        }
    }
</script>

<style lang="scss" scoped>
  @import "@/assets/style/global.scss";
  body{
    background-color: rgb(248,248,248);
  }

  .row-container {
    .ul{
      display: flex;
      flex-wrap: wrap;
      width: 1400px;
      justify-content: space-between;
      margin: 0 auto;
      .item {
        margin-right: 70px;
        margin-bottom: 30px;
        .item-link {
          width: 420px;
          height: 5200px;
          img {
            width: 100%;
            height: 100%;
          }
        }

      }
      //.row-item:nth-child(3n+3) {
      //  margin-right: 0!important;
      //}
    }
  }

  ul li:nth-child(3n+3) {
    margin-right: 0;
  }
</style>
