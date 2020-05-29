<template>
    <div class="trunkLinePrice tabsWrap">
       <el-tabs v-model="trunkLinePriceName" type="card" @tab-click="handleClick" >
            <!-- 区代运作路线及定价 -->
                <el-tab-pane label="区代运作路线及定价" name="trunkLinePriceList">
                    <trunkLinePriceList :key = 'dataKeys' :isvisible="trunkLinePriceName === 'trunkLinePriceList'" v-if="$_has_permission('SERVICE_DISTRICTSALESPRICING_OPERATIONROUTEANDPRICINGOFDISTRICTAGENT_OPERATIONROUTEANDPRICINGOFDISTRICTAGENT')"/>
                </el-tab-pane>

            <!-- 区代运作路线及定价历史记录 -->
                <el-tab-pane label="区代运作路线及定价历史记录" name="trunkLinePriceHistoryList">
                    <trunkLinePriceHistoryList :key = 'dataKeys' :isvisible="trunkLinePriceName === 'trunkLinePriceHistoryList'" v-if="$_has_permission('SERVICE_DISTRICTSALESPRICING_OPERATIONROUTEANDPRICINGOFDISTRICTAGENT_HISTORY')"/>
                </el-tab-pane>
        </el-tabs>
    </div>
</template>

<script>
import trunkLinePriceList from './trunkLinePriceList'
import trunkLinePriceHistoryList from './trunkLinePriceHistoryList'
export default {
    name: 'trunkLinePrice',
    components: {
        trunkLinePriceList,  
        trunkLinePriceHistoryList
    },
    data() {
        return {
            trunkLinePriceName: 'trunkLinePriceList',
            dataKeys:''
        }
    },
    computed: {

    },
    created() {
        this.trunkLinePriceName = sessionStorage.getItem('trunkLinePriceName') ? sessionStorage.getItem('trunkLinePriceName') :'trunkLinePriceList';
    },

    beforeUpdate () {
        sessionStorage.setItem('trunkLinePriceName', this.trunkLinePriceName);
    },

    beforeDestroy () {
        sessionStorage.setItem('trunkLinePriceName', this.trunkLinePriceName);
    },

    mounted() {
    },
    methods: {
        init() {
        },
        handleClick(tab, event) {
            this.dataKeys = Math.random();
            this.trunkLinePriceName = tab.name;
        }
    }

}
</script>

<style rel="stylesheet/scss" lang="scss">
    .trunkLinePrice{
    }
</style>

