<template>
    <div class="pointLinePrice tabsWrap">
       <el-tabs v-model="pointLinePriceName" type="card" @tab-click="handleClick" >
            <!-- 干线费及定价 -->
                <el-tab-pane label="干线费定价" name="pointLinePriceList">
                    <pointLinePriceList :key = 'dataKeys' :isvisible="pointLinePriceName === 'pointLinePriceList'" v-if="$_has_permission('SERVICE_SPECIALLINEPURCHASEPRICING_PRICINGOFTRUNKLINEFEE_PRICINGOFTRUNKLINEFEE')"/>
                </el-tab-pane>

            <!-- 干线费定价历史记录 -->
                <el-tab-pane label="干线费定价历史记录" name="pointLinePriceHistoryList">
                    <pointLinePriceHistoryList :key = 'dataKeys' :isvisible="pointLinePriceName === 'pointLinePriceHistoryList'" v-if="$_has_permission('SERVICE_SPECIALLINEPURCHASEPRICING_PRICINGOFTRUNKLINEFEE_HISTORY')"/>
                </el-tab-pane>
        </el-tabs>
    </div>
</template>

<script>
import pointLinePriceList from './pointLinePriceList'
import pointLinePriceHistoryList from './pointLinePriceHistoryList'
export default {
    name: 'pointLinePrice',
    components: {
        pointLinePriceList,  
        pointLinePriceHistoryList
    },
    data() {
        return {
            pointLinePriceName: 'pointLinePriceList',
            dataKeys:''
        }
    },
    computed: {

    },
    created() {
        this.pointLinePriceName = sessionStorage.getItem('pointLinePriceName') ? sessionStorage.getItem('pointLinePriceName') :'pointLinePriceList';
    },
    beforeUpdate () {
        sessionStorage.setItem('pointLinePriceName', this.pointLinePriceName);
    },
    beforeDestroy () {
        sessionStorage.setItem('pointLinePriceName', this.pointLinePriceName);
    },
    mounted() {
    },
    methods: {
        init() {
        },
        handleClick(tab, event) {
            this.dataKeys = Math.random();
            this.pointLinePriceName = tab.name;
        }
    }

}
</script>

<style rel="stylesheet/scss" lang="scss">
    .pointLinePrice{
    }
</style>

