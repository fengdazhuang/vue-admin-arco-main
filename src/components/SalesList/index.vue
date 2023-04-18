<template>
    <div class="sales-list">
        <base-scroll-list :config="config"></base-scroll-list>
    </div>
</template>

<script>
    /* eslint-disable */
import { ref, watch, onMounted } from 'vue'
import BaseScrollList from "../BaseScrollList.vue";
export default {
    name: 'SalesList',
    props: {
        data: Array
    },
    components:{BaseScrollList},
    setup (props) {
        const config = ref({})
        const update = () => {
            const data = []
            const headerIndexData = []
            for (let i = 0; i < props.data.length; i++) {
                data[i] = []
                if (i % 2 === 0) {
                    headerIndexData[i] = `
                <div style="width:100%;height:100%;background:rgba(2,37,101,.5);display:flex;align-items:center;justify-content:center;">
                    <div style="width:15px;height:15px;background:#04B9FF;border-radius:50%;border:1px solid #fff;"/>
                </div>`
                } else {
                    headerIndexData[i] = `
                <div style="width:100%;height:100%;background:rgba(2,37,101,.5);display:flex;align-items:center;justify-content:center;">
                    <div style="width:15px;height:15px;background:#1DE9B6;border-radius:50%;border:1px solid #fff;"/>
                </div>`
                }

                for (let j = 0; j < 5; j++) {
                    let text = ''
                    switch (j) {
                        case 0:
                            text = props.data[i].order
                            break
                        case 1:
                            text = props.data[i].shop
                            break
                        case 2:
                            text = props.data[i].rider
                            break
                        case 3:
                            text = props.data[i].newShop
                            break
                        case 4:
                            text = props.data[i].avgOrder
                            break
                        default:
                    }
                    if (j == 1) {
                        data[i].push(`<div style="color:#ffe400">${text}<span></span></div>`)
                    } else if (j == 2) {

                        const cmp = +text.slice(0, text.length - 1)
                        if (cmp > 0) {
                            data[i].push(`<div style="color:#14e144">${text}<span style="color:#14e144"> ↑</span></div>`)
                        } else {
                            data[i].push(`<div style="color:#ff6316">${text}<span style="color:#ff6316"> ↓</span></div>`)
                        }

                    } else if (j == 3) {
                        const cmp = +text
                        if (cmp > 3) {
                            data[i].push(`<div style="color:#ff6316">${text}<span style="color:#ff6316"> (严重拥堵)</span></div>`)
                        } else if (2 <= cmp && cmp <= 3) {
                            data[i].push(`<div style="color:orange">${text}<span style="color:orange"> (拥堵)</span></div>`)
                        } else {
                            data[i].push(`<div style="color:#14e144">${text}<span style="color:#14e144"> (畅通)</span></div>`)
                        }
                    } else if (j == 4) {
                        const cmp = +text.slice(0, text.length - 1)
                        if (cmp > 0) {
                            data[i].push(`<div style="color:#14e144">${text}<span style="color:#14e144"> ↑</span></div>`)
                        } else {
                            data[i].push(`<div style="color:#ff6316">${text}<span style="color:#ff6316"> ↓</span></div>`)
                        }
                    }
                    else {
                        data[i].push(text)
                    }

                }
            }
            console.log("data", data);
            config.value = {
                headerIndexStyle: { width: '50px' },
                headerIndex: true,
                header: ['景区', '客流指数', '较平日', '拥堵指数', '较平日'],
                headerStyle: [{}],
                headerHeight: 80,
                data,
                rowNum: 10,
                rowStyle: [{}],
                rowBgc: ['rgba(2,37,101,.8)', 'rgba(2,37,101,.5)'],
                aligns: ['center', 'center', 'center'],
                headerFontSize: 24,
                rowFontSize: 20,
                headerColor: '#fff',
                rowColor: '#000',
                headerIndexContent: 'Hot',
                headerIndexData
            }

        }
        onMounted(() => {
            update()
        })
        watch(() => props.data, () => {
            update()
        })

        return {
            config
        }

    }
}

</script>

<style lang='scss' scoped>
.sales-list {
    width: 100%;
    height: 100%;
}
</style>
