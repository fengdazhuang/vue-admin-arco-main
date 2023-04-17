<template>
    <Breadcrumb :items="['menu.list', 'menu.list.address']" />
    <div class="tab-container">
        <el-tag>mounted times ：{{ createdTimes }}</el-tag>
        <el-alert :closable="false" style="width:200px;display:inline-block;vertical-align: middle;margin-left:30px;" title="Tab with keep-alive" type="success" />
        <div class="create">
            <a-input-search :style="{width:'320px'}" v-model="zone" placeholder="请输入添加的赛区" button-text="+" search-button/>
        </div>

        <el-tabs v-model="activeName" style="margin-top:15px;" type="border-card">
            <el-tab-pane v-for="item in tabMapOptions" :key="item.key" :label="item.label" :name="item.key">
                <keep-alive>
                    <tab-pane v-if="activeName==item.key" :type="item.key" @create="showCreatedTimes" />
                </keep-alive>
            </el-tab-pane>
        </el-tabs>
    </div>
</template>

<script>
    import TabPane from './components/TabPane.vue'
    /* eslint-disable */
    export default {
        name: 'Tab',
        components: { TabPane },
        data() {
            return {
                zone:'',
                tabMapOptions: [
                    { label: 'China', key: 'China' },
                    { label: 'USA', key: 'USA' },
                    { label: 'Japan', key: 'Japan' },
                    { label: 'Eurozone', key: 'Eurozone' }
                ],
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
