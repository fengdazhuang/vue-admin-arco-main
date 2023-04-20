<template>
    <div>
        <Breadcrumb :items="['menu.list', 'menu.list.address']" />
        <div class="tab-container">
        <el-tag>mounted times ：{{ createdTimes }}</el-tag>
        <el-alert :closable="false" style="width:200px;display:inline-block;vertical-align: middle;margin-left:30px;" title="Tab with keep-alive" type="success" />
        <div class="create">
            <a-input-search v-model="zone" :style="{width:'320px'}" placeholder="请输入搜索内容" search-button>
                <!--                        <div @click="handleSearch" ></div>-->

                <template #button-default>
                    <span :style="{ display:'block',width:'50px'}" @click="handleCreateArea"> + </span>
                </template>
            </a-input-search>
<!--            <a-input-search :style="{width:'320px'}" @click="handleCreateArea" v-model="zone" placeholder="请输入添加的赛区" button-text="+" search-button/>-->
        </div>

        <el-tabs v-model="activeName" style="margin-top:15px;" type="border-card">
                <el-tab-pane v-for="item in tabMapOptions"  :key="item.key">
                    <template #label>
                        <span class="custom-tabs-label" @click="handleGetComPositions(item.key,item.label)">
                            <span>{{item.label}}</span>
                        </span>
                    </template>
                    <keep-alive>
                        <tab-pane :area="item.label" :id="item.key" />
                    </keep-alive>
                </el-tab-pane>
        </el-tabs>
    </div>
    </div>
</template>

<script>
    import {ref} from 'vue'
    import {getComAreas,addComArea,getComPositions} from '@/api/CompetitionArea'
    import TabPane from './components/TabPane.vue'

    /* eslint-disable */
    export default {
        name: 'Tab',
        components: { TabPane },
        data() {
            return {
                // tabMapOptions: [
                //     { label: 'China', key: 111},
                //     { label: 'USA', key: 222},
                //     { label: 'Japan', key: 333 },
                //     { label: 'Eurozone', key: 444 }
                // ],
                activeName: 'CN',
                createdTimes: 0
            }
        },
        watch: {
            activeName(val) {
                this.$router.push(`${this.$route.path}?tab=${val}`)
            }
        },
        created() {
            // init the default selected tab
            const tab = this.$route.query.tab
            if (tab) {
                this.activeName = tab
            }
        },
        methods: {
            showCreatedTimes() {
                this.createdTimes = this.createdTimes + 1
            }
        },
        setup(){
            const zone = ref('')
            const handleGetComAreas = async ()=>{
                const {data} =  await getComAreas()
                const useData = data.map(item=>{
                    return {
                        label:item.name,
                        key:item.id
                    }
                })
                console.log('useData',useData)
                tabMapOptions.value = useData
            }
            const handleCreateArea = async ()=>{
                const comArea = zone.value
                const res =  await addComArea(comArea)
                handleGetComAreas()
                console.log("res",res)
            }
            const tabMapOptions = ref([])

            handleGetComAreas()
            const handleGetComPositions = async (key,label)=>{
                console.log('key',key)
                console.log('label',label)
                const useParams = {
                    params:{
                        area:label,
                        keyword:''
                    }
                }
                console.log(key,label)
                const res = await getComPositions(useParams)
                console.log('resgetComPositions',res)

            }
            const handletext = ()=>{
                console.log(1111)
            }
            return {
                handleCreateArea,
                zone,
                tabMapOptions,
                handleGetComPositions,
                handletext
            }
        }
    }
</script>

<style lang="scss" scoped>
    .tab-container {
        margin: 30px;
        .create {
            background: #ffffff;
            height: 50px;
        }
    }
</style>
