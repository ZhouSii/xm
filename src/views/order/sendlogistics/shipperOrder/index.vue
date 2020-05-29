<template>
    <div class="shipperOrder tabsWrap">
       <el-tabs v-model="logisticsShipperOrderName" type="card" @tab-click="handleClick" >
        <!-- 全部 -->
            <el-tab-pane label="全部" name="all">
                <allComponent :key = 'dataKeys' :isvisible="logisticsShipperOrderName === 'all'"/>
            </el-tab-pane>
        <!-- 区代超时未受理 -->
            <el-tab-pane label="区代超时未受理" name="overTimeNoAccept">
                <overTimeComponent :key = 'dataKeys' :isvisible="logisticsShipperOrderName === 'overTimeNoAccept'"/>
            </el-tab-pane>
        <!-- 区代超时未揽货 -->
            <el-tab-pane label="区代超时未揽货" name="overTimeNoCargo">
                <overTimeNoCargoComponent :key = 'dataKeys' :isvisible="logisticsShipperOrderName === 'overTimeNoCargo'"/>
            </el-tab-pane>
        <!-- 区代拒单 -->
            <el-tab-pane label="区代拒单" name="refused">
                <refusedComponent :key = 'dataKeys' :isvisible="logisticsShipperOrderName === 'refused'"/>
            </el-tab-pane>
        <!-- 货主取消发货 -->
            <el-tab-pane label="货主取消发货" name="shipperCancel">
                <shipperCancelComponent :key = 'dataKeys' :isvisible="logisticsShipperOrderName === 'shipperCancel'"/>
            </el-tab-pane>
        <!-- 平台未开通路线 -->
            <el-tab-pane label="平台未开通路线" name="NotAvailableRoute">
                <NotAvailableRouteComponent :key = 'dataKeys' :isvisible="logisticsShipperOrderName === 'NotAvailableRoute'"/>
            </el-tab-pane>
        </el-tabs>
    </div>
</template>

<script>
import allComponent from './all'
import overTimeComponent from './overTimeNoAccept'
import overTimeNoCargoComponent from './overTimeNoCargo'
import refusedComponent from './refused'
import shipperCancelComponent from './shipperCancel'
import NotAvailableRouteComponent from './NotAvailableRoute'
export default {
    name: 'shipperOrder',
    components: {
        allComponent,
        overTimeComponent,
        overTimeNoCargoComponent,
        refusedComponent,
        shipperCancelComponent,
        NotAvailableRouteComponent,
    },
    data() {
        return {
            logisticsShipperOrderName: 'all',
            dataKeys:''
        }
    },
    computed: {

    },
    created() {
        this.logisticsShipperOrderName = sessionStorage.getItem('logisticsShipperOrderName') || 'all';
    },
    beforeUpdate () {
        sessionStorage.setItem('logisticsShipperOrderName', this.logisticsShipperOrderName);
    },
    beforeDestroy () {
        sessionStorage.setItem('logisticsShipperOrderName', this.logisticsShipperOrderName);
    },
    mounted() {
        // if (this.$route.query.currentTab) {
        // this.logisticsShipperOrderName = this.$route.query.currentTab
        // }
    },
    methods: {
        init() {
        },
        handleClick(tab, event) {
            this.dataKeys = Math.random();
            this.logisticsShipperOrderName = tab.name
        }
    }

}
</script>

<style rel="stylesheet/scss" lang="scss">
    .shipperOrder{
    }
</style>

