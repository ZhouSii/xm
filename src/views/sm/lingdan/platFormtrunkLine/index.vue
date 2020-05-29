<template>
    <div class="platFormtrunkLine tabsWrap">
       <el-tabs v-model="platFormtrunkLine" type="card" @tab-click="handleClick" >
            <!-- 平台路线标准定价 -->
                <el-tab-pane label="平台路线标准定价" name="platFormtrunkLineList">
                    <platFormtrunkLineList :key = 'dataKeys' :isvisible="platFormtrunkLine === 'platFormtrunkLineList'" v-if="$_has_permission('SERVICE_DISTRICTSALESPRICING_PLATFORMROUTESTANDARDPRICING_PLATFORMROUTESTANDARDPRICING')"/>
                </el-tab-pane>

            <!-- 平台路线标准定价历史记录 -->
                <el-tab-pane label="平台路线标准定价历史记录" name="platFormtrunkLineHistoryList">
                    <platFormtrunkLineHistoryList :key = 'dataKeys' :isvisible="platFormtrunkLine === 'platFormtrunkLineHistoryList'" v-if="$_has_permission('SERVICE_DISTRICTSALESPRICING_PLATFORMROUTESTANDARDPRICING_HISTORY')"/>
                </el-tab-pane>

            <!-- 路线标准定价区代列表 -->
                <el-tab-pane label="路线标准定价区代列表" name="lineStandPrice">
                    <lineStandPrice :key = 'dataKeys' :isvisible="platFormtrunkLine === 'lineStandPrice'" v-if="$_has_permission('SERVICE_DISTRICTSALESPRICING_PLATFORMROUTESTANDARDPRICING_LIST')"/>
                </el-tab-pane>
        </el-tabs>
    </div>
</template>

<script>
import platFormtrunkLineList from './platFormtrunkLineList'
import platFormtrunkLineHistoryList from './platFormtrunkLineHistoryList'
import lineStandPrice from './lineStandPrice'
export default {
    name: 'platFormtrunkLine',
    components: {
        platFormtrunkLineList,  
        platFormtrunkLineHistoryList,
        lineStandPrice
    },
    data() {
        return {
            platFormtrunkLine: 'platFormtrunkLineList',
            dataKeys:''
        }
    },
    computed: {

    },
    created() {
        this.platFormtrunkLine = sessionStorage.getItem('platFormtrunkLine') ? sessionStorage.getItem('platFormtrunkLine') :'platFormtrunkLineList';
    },

    beforeUpdate () {
        sessionStorage.setItem('platFormtrunkLine', this.platFormtrunkLine);
    },

    beforeDestroy () {
        sessionStorage.setItem('platFormtrunkLine', this.platFormtrunkLine);
    },

    mounted() {
    },
    methods: {
        init() {
        },
        handleClick(tab, event) {
            this.dataKeys = Math.random();
            this.platFormtrunkLine = tab.name;
        }
    }

}
</script>

<style rel="stylesheet/scss" lang="scss">
    .platFormtrunkLine{
    }
</style>

