<template>
    <div class="carriersWaybill tabsWrap">
       <el-tabs v-model="logisticscarriersWaybillName" type="card" @tab-click="handleClick" >
        <!-- 全部 -->
            <el-tab-pane label="全部" name="all">
                <allComponent :key = 'dataKeys' :isvisible="logisticscarriersWaybillName === 'all'"/>
            </el-tab-pane>
        <!-- 代专线操作 -->
            <el-tab-pane label="代专线操作" name="overTimeNoAccept">
                <overTimeComponent :key = 'dataKeys' :isvisible="logisticscarriersWaybillName === 'overTimeNoAccept'"/>
            </el-tab-pane>
        </el-tabs>
    </div>
</template>
<script>
import allComponent from './all'
import overTimeComponent from './overTimeNoAccept'
export default {
    name: 'carriersWaybill',
    components: {
        allComponent,
        overTimeComponent,
    },
    data() {
        return {
            logisticscarriersWaybillName: 'all',
            dataKeys:''
        }
    },
    computed: {
    },
    created() {
        this.logisticscarriersWaybillName = sessionStorage.getItem('logisticscarriersWaybillName') || 'all';
    },
    beforeUpdate () {
        sessionStorage.setItem('logisticscarriersWaybillName', this.logisticscarriersWaybillName);
    },
    beforeDestroy () {
        sessionStorage.setItem('logisticscarriersWaybillName', this.logisticscarriersWaybillName);
    },
    mounted() {
    },
    methods: {
        init() {
        },
        handleClick(tab, event) {
            this.dataKeys = Math.random();
            this.logisticscarriersWaybillName = tab.name
        }
    }

}
</script>

<style rel="stylesheet/scss" lang="scss">
    .carriersWaybill{
    }
</style>

