<template>
    <div>
        <Breadcrumb :items="['志愿服务', '志愿方向']" />
        <div class="tab-container">
        <el-tabs v-model="activeName" style="margin-top:15px;" type="border-card">
                <el-tab-pane v-for="item in tabOptions"  :name="item.label" :key="item.key">
                    <template #label>
                        <span class="custom-tabs-label" @click="handleGetServicePoint(item.key)">
                            <span>{{item.label}}</span>
                        </span>
                    </template>
                    <keep-alive>
                        <tab-pane  :area="item.label" :id="item.key" :initList="list" />
                    </keep-alive>
                </el-tab-pane>
        </el-tabs>
    </div>
    </div>
</template>

<script>
    import {ref} from 'vue'
    import {getVolDirections} from '@/api/volunteer'
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
            const activeName = '赛会志愿'
            const tabOptions = [
                {
                    key:0,
                    label:'赛会志愿'
                },
                {
                    key:1,
                    label:'城市志愿'
                },

            ]

            const handleGetServicePoint = async (volunteerType)=>{
                const useParams = {
                    params:{
                        volunteerType
                    }
                }
                const res = await getVolDirections(useParams)
                list.value = res.data
            }
            const tabMapOptions = ref([])
            handleGetServicePoint(0)
            return {
                zone,
                tabMapOptions,
                list,
                activeName,
                handleGetServicePoint,
                tabOptions
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
