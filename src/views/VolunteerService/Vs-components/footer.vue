<template>
    <div class="footer">
        <div class="footer-container">
            <h4 class="he1">版权©2022年第19届亚运会组委会<br />Copyright © The 19th Asian Games
                Hangzhou 2022 Organising Committee</h4>
            <div class="police">
                <h4 class="he2">
                    备案号：
                    <a target="blank_" href="https://beian.miit.gov.cn/#/Integrated/index" class="he3">浙ICP备16002480号-1</a>
                </h4>

                <div class="police-img"><img
                        src="data:image/png;base64,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"
                        alt="" /></div>
                <h4 class="he3"><a target="blank_"
                                   href="http://www.beian.gov.cn/portal/registerSystemInfo?recordcode=33010602010325">浙公网安备 33010602010325号</a>
                </h4>
            </div>
        </div>
    </div>
</template>


<script>
    export default {
        name:'footer'
    }
</script>

<style lang="scss" scoped>
  .footer {
    .footer-container {
      -webkit-text-size-adjust: 100%;
      --antd-wave-shadow-color: #1890ff;
      -webkit-tap-highlight-color: transparent;
      font-variant: tabular-nums;
      line-height: 1.5;
      font-feature-settings: 'tnum';
      font-size: 12px;
      font-family: AlibabaPuHuiTiR;
      color: #333;
      box-sizing: border-box;
      width: 100%;
      height: 146px;
      background: #3d4660;
      text-align: center;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;

      .he1 {
        text-align: center;
        box-sizing: border-box;
        font-weight: 500;
        margin: 0;
        padding: 0;
        font-size: 12px;
        font-family: AlibabaPuHuiTiR;
        color: #ddd;
        line-height: 20px;
        margin-right: 20px;
      }

      .police {
        line-height: 1.5;
        font-size: 12px;
        font-family: AlibabaPuHuiTiR;
        color: #333;
        text-align: center;
        box-sizing: border-box;
        display: flex;
        align-items: center;

        .he2 {
          display: flex;
          text-align: center;
          box-sizing: border-box;
          font-weight: 500;
          margin: 0;
          padding: 0;
          font-size: 12px;
          font-family: AlibabaPuHuiTiR;
          color: #ddd;
          line-height: 20px;
          margin-right: 20px;

          a {
            text-align: center;
            font-weight: 500;
            font-size: 12px;
            font-family: AlibabaPuHuiTiR;
            line-height: 20px;
            box-sizing: border-box;
            background-color: transparent;
            cursor: pointer;
            transition: color 0.3s;
            touch-action: manipulation;
            text-decoration: none;
            outline: none;
            color: #ddd;
          }
        }
      }

      .police-img {
        line-height: 1.5;
        font-size: 12px;
        font-family: AlibabaPuHuiTiR;
        color: #333;
        text-align: center;
        box-sizing: border-box;
        width: 12px;
        height: 12px;
        margin-right: 5px;

        img {
          line-height: 1.5;
          font-size: 12px;
          font-family: AlibabaPuHuiTiR;
          color: #333;
          text-align: center;
          box-sizing: border-box;
          vertical-align: middle;
          margin: 0;
          padding: 0;
          display: block;
          border: none;
          width: auto;
          height: auto;
          max-width: 100%;
        }
      }

      .he3 {
        text-align: center;
        box-sizing: border-box;
        font-weight: 500;
        margin: 0;
        padding: 0;
        font-size: 12px;
        font-family: AlibabaPuHuiTiR;
        color: #ddd;
        line-height: 20px;

        a {
          text-align: center;
          font-weight: 500;
          font-size: 12px;
          font-family: AlibabaPuHuiTiR;
          line-height: 20px;
          box-sizing: border-box;
          background-color: transparent;
          cursor: pointer;
          transition: color 0.3s;
          touch-action: manipulation;
          text-decoration: none;
          outline: none;
          color: #ddd;
        }
      }
    }
  }
</style>
