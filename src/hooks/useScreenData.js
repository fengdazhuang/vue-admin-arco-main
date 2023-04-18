import {ref,onMounted,onUnmounted} from 'vue'
const ageMockData = [{"startValue":0,"value":131107,"axis":"0-20","color":"#62c98d"},{"startValue":0,"value":330831,"axis":"20-30","color":'#2f89cf'},{"startValue":0,"value":551238,"axis":"30-50","color":'#4cb9cf'},{"startValue":0,"value":31088,"axis":">50","color":'#e0c828'}]
const deviceMockData = {"totalDevices":1070909,"devices":[{"key":"Android","value":423676},{"key":"iOS","value":373581},{"key":"PC","value":273652}]}
const genderMockData = [{"key":"male","value":1442542},{"key":"female","value":1442548}]
const riderMockData = {"axisX":["1月","2月","3月","4月","5月","6月","7月","8月","9月","10月","11月","12月"],"orderData":{"legend1":"前年月均游客量","legend2":"去年月均游客量","data1":["330","420","560","450","610","890","720","610","580","750","770","600"],"data2":["430","510","660","550","710","990","620","550","760","810","930","720"]},"rateData":{"legend1":"前年月均消费水平","legend2":"去年月均消费水平","data1":["129","223","202","197","300","112","333","249","178","322","401","167"],"data2":["179","263","282","297","330","344","222","299","190","455","566","233"]}}
const headerMockData = {
    "headerData":[{"title":"今日游客量","subTitle":"Today's Tourist Volume","startVal":40041113,"endVal":40105335,"img":"https://www.youbaobao.xyz/datav-res/money.png"},{"title":"今日门票收入","subTitle":"Today's Total Income","startVal":2566778,"endVal":2570025,"img":"https://www.youbaobao.xyz/datav-res/order.png"},{"title":"昨日游客量","subTitle":"Yesterday's Tourist Volume","startVal":271744,"endVal":272200,"img":"https://www.youbaobao.xyz/datav-res/member.png"},{"title":"昨日门票收入","subTitle":"Yesterday's Total Income","startVal":1286552,"endVal":1289057,"img":"https://www.youbaobao.xyz/datav-res/follow.png"}],
    "project":[{"title":"好评率","value":"93.16%","img":"https://www.youbaobao.xyz/datav-res/success.png"},{"title":"差评率","value":"1.73%","img":"https://www.youbaobao.xyz/datav-res/failed.png"}]}
/* eslint-disable-next-line */
const salesListMockData = [
{"order":"老君山","shop":"7.33","rider":"247%","newShop":"1.139","avgOrder":"1.4%"},
{"order":"云台山","shop":"6.68","rider":"508%","newShop":"3.437","avgOrder":"205%"},
{"order":"龙门石窟","shop":"6.1","rider":"2.6%","newShop":"2.52","avgOrder":"133.8%"},
{"order":"清明上河园","shop":"4.96","rider":"206.6","newShop":"3.001","avgOrder":"143.2%"},
{"order":"郑州方特梦幻王国","shop":"3.33","rider":"42.1%","newShop":"3.128","avgOrder":"20.9%"},
{"order":"鸡公山风景区","shop":"3.2","rider":"-37%","newShop":"2.577","avgOrder":"-53%"},
{"order":"伏牛山世界地质公园","shop":"23.95","rider":"7945.1%","newShop":"4.592","avgOrder":"303.9%"},
{"order":"八里沟风景区","shop":"20.99","rider":"1985.8%","newShop":"1.689","avgOrder":"70.3%"},
{"order":"万仙山景区","shop":"2.81","rider":"58.1","newShop":"3.984","avgOrder":"128.8%"},
{"order":"嵩山少林寺","shop":"2,45","rider":"70.2%","newShop":"2.058","avgOrder":"22.7%"},
{"order":"白马寺","shop":"2.37","rider":"-1.6%","newShop":"1.288","avgOrder":"-5.1%"},
{"order":"郑州黄河风景区","shop":"2.09","rider":"72%","newShop":"2.021","avgOrder":"3%"},
{"order":"白云山风景区","shop":"1.98","rider":"55.8%","newShop":"5.033","avgOrder":"160%"},
{"order":"龙潭大峡谷","shop":"1.94","rider":"206.2%","newShop":"1.436","avgOrder":"14.2%"},
{"order":"尧山—中原大佛景区","shop":"1.85","rider":"42%","newShop":"1.105","avgOrder":"1.2%"},
{"order":"安阳殷墟风景区","shop":"1.32","rider":"13.5%","newShop":"1.121","avgOrder":"6.9%"},
{"order":"红旗渠—太行大峡谷","shop":"1.07","rider":"27%","newShop":"1.097","avgOrder":"6.4%"},
{"order":"老界岭—恐龙遗迹园景区","shop":"4,78","rider":"58.3%","newShop":"4.069","avgOrder":"290.5%"},
{"order":"嵖岈山旅游风景区","shop":"8.68","rider":"-58.4%","newShop":"2.823","avgOrder":"-98.8%"},
{"order":"芒砀山旅游风景区","shop":"14.66","rider":"269.2%","newShop":"5.351","avgOrder":"192.6%"},
// {"order":"信阳南湾湖","shop":"1.17","rider":"111%","newShop":"2.15","avgOrder":"48.4%"},
{"order":"周口淮阳太昊陵","shop":"18.95","rider":"101.5%","newShop":"1.428","avgOrder":"27.7%"},
{"order":"神农山","shop":"12.78","rider":"-7.7%","newShop":"1.034","avgOrder":"1.2%"}]
function random (val) {
    return Math.floor(Math.random() * val)
}
function formatterTime(val){
    return val<10 ? `0${val}` : val
}
function getTime(val){
    return `${formatterTime(val.getHours())}:${formatterTime(val.getMinutes())}:${formatterTime(val.getSeconds())}`
}
export default function (){
   
    const totalUser = ref(10000)
    const growthLastDay = ref(10.12)
    const growthLastMonth = ref(15.25)
    const ageData = ref(ageMockData)
    const averageAge = ref(0)
    const deviceData = ref(deviceMockData)
    const genderData = ref(genderMockData)
    const riderData = ref(riderMockData)
    const headerData = ref(headerMockData)
    const salesListData =  ref(salesListMockData)
    let task
    onMounted(()=>{
        task = setInterval(() => {
            totalUser.value = totalUser.value + 10
            growthLastDay.value = growthLastDay.value + 1
            growthLastMonth.value = growthLastMonth.value + 1
            averageAge.value = averageAge.value + 1

            // 年龄组件数据变化
            const _ageData = [...ageData.value]
            _ageData.forEach(item =>{
                item.startValue = item.value
                item.value = item.value + random(100)
            })
            ageData.value = _ageData

            // 设备组件数据变化
            const _deviceData={...deviceData.value}
            _deviceData.totalDevices += random(100)
            _deviceData.devices.forEach(item=>{
                item.value += random(100)
            })
            deviceData.value = _deviceData

            // 性别组件数据变化
            const _genderData = [...genderData.value]
            _genderData.forEach(item =>{
                item.value += random(100)
            })
            genderData.value = _genderData

            // 骑手组件数据变化
            const _riderData = {...riderData.value}
            _riderData.orderData.data1 = _riderData.orderData.data1.map(item=>{
                item+=random(100)
                return item
            })
            _riderData.orderData.data2 = _riderData.orderData.data2.map(item=>{
                item+=random(100)
                return item
            })
            _riderData.rateData.data1 = _riderData.rateData.data1.map(item=>{
                item+=random(100)
                return item
            })
            _riderData.rateData.data2 = _riderData.rateData.data2.map(item=>{
                item+=random(100)
                return item
            })
            riderData.value = _riderData 


            // 顶部图标组件变化
            const _headerData = {...headerData.value}
            _headerData.headerData = _headerData.headerData.map(item=>{
                item.startVal = item.endVal
                item.endVal+=random(100)
                return item
            })
            // _headerData.project = _headerData.project.map(item=>{
            //     item.value= (Number(item.value.slice(0,5)) + Math.random(1)) + '%'
            //     return item
            // })
            headerData.value = _headerData


        }, 3900);
    })
    onUnmounted(()=>{
        task && clearInterval(task)
    })
    return {
        totalUser,
        growthLastDay,
        growthLastMonth,
        ageData,
        averageAge,
        deviceData,
        genderData,
        riderData,
        headerMockData,
        salesListData,
    }
}
