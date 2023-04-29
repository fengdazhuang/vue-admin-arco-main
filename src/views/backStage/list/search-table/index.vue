<template>
    <div>
        <Breadcrumb :items="['赛事管理', '比赛场地']" />
        <div class="tab-container">
        <div class="create">
            <a-input-search v-model="zone" :style="{width:'320px'}" placeholder="请输入新增赛区" search-button>
                <template #button-default>
                    <span :style="{ display:'block',width:'50px'}" @click="handleCreateArea"> + </span>
                </template>
            </a-input-search>
        </div>
        <el-tabs v-model="activeName" style="margin-top:15px;" type="border-card">
                <el-tab-pane v-for="item in tabMapOptions" :name="item.label" :key="item.key">
                    <template #label>
                        <span class="custom-tabs-label" @click="handleGetComPositions(item.label)">
                            <span>{{item.label}}</span>
                        </span>
                    </template>
                    <keep-alive>
                        <tab-pane :area="item.label" :id="item.key" :initList="list" />
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
            const list = ref([])
            const zone = ref('')
            const activeName = ref('杭州赛区')
            const handleGetComAreas = async ()=>{
                const {data} =  await getComAreas()
                const useData = data.map(item=>{
                    return {
                        label:item.name,
                        key:item.id
                    }
                })
                tabMapOptions.value = useData
            }
            const handleCreateArea = async ()=>{
                const body = {
                    comArea:zone.value
                }
                const res =  await addComArea(body)
                handleGetComAreas()
            }
            const tabMapOptions = ref([])

            handleGetComAreas()
            const handleGetComPositions = async (label)=>{
                const useParams = {
                    params:{
                        area:label,
                        keyword: ''
                    }
                }
                const {data} = await getComPositions(useParams)
                list.value = data
            }
            handleGetComPositions(activeName.value)
            return {
                handleCreateArea,
                zone,
                tabMapOptions,
                handleGetComPositions,
                list,
                activeName
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
