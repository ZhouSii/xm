<template>
    <div class="agentWaybill tabsWrap">
       <el-tabs v-model="logisticsagentWaybillName" type="card" @tab-click="handleClick" >
        <!-- 全部 -->
            <el-tab-pane label="全部" name="all">
                <allComponent :key = 'dataKeys' :isvisible="logisticsagentWaybillName === 'all'"/>
            </el-tab-pane>
        <!-- 代区代操作 -->
            <el-tab-pane label="代区代操作" name="agent">
                <agentComponent :key = 'dataKeys' :isvisible="logisticsagentWaybillName === 'agent'"/>
            </el-tab-pane>
        <!-- 待货主支付运费 -->
            <el-tab-pane label="待货主支付运费" name="waitPayMent">
                <waitPayMentComponent :key = 'dataKeys' :isvisible="logisticsagentWaybillName === 'waitPayMent'"/>
            </el-tab-pane>
        </el-tabs>
    </div>
</template>
<script>
import allComponent from './all'
import agentComponent from './agent'
import waitPayMentComponent from './waitPayMent'

export default {
    name: 'agentWaybill',
    components: {
        allComponent,
        agentComponent,
        waitPayMentComponent,
    },
    data() {
        return {
            logisticsagentWaybillName: 'all',
            dataKeys:''
        }
    },
    computed: {
    },
    created() {
        this.logisticsagentWaybillName = sessionStorage.getItem('logisticsagentWaybillName') || 'all';
    },
    // beforeUpdate () {
    //     sessionStorage.setItem('logisticsagentWaybillName', this.logisticsagentWaybillName);
    // },
    beforeDestroy () {
        sessionStorage.setItem('logisticsagentWaybillName', this.logisticsagentWaybillName);
    },
    mounted() {
    },
    methods: {
        init() {
        },
        handleClick(tab, event) {
            this.dataKeys = Math.random();
            this.logisticsagentWaybillName = tab.name
        }
    }

}
</script>

<style rel="stylesheet/scss" lang="scss">
    .agentWaybill{
    }
</style>

