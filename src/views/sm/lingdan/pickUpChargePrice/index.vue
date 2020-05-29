<template>
    <div class="pickUpChargePrice tabsWrap">
       <el-tabs v-model="pickUpChargePriceName" type="card" @tab-click="handleClick" >
            <!-- 区代提货范围及定价 -->
                <el-tab-pane label="区代提货范围及定价" name="pickUpChargePriceList">
                    <pickUpChargePriceList :key = 'dataKeys' :isvisible="pickUpChargePriceName === 'pickUpChargePriceList'" v-if="$_has_permission('SERVICE_DISTRICTSALESPRICING_STANDARDSERVICESANDPRICING_STANDARDSERVICESANDPRICING')"/>
                </el-tab-pane>

            <!-- 区代提货范围及定价历史记录 -->
                <el-tab-pane label="区代提货范围及定价历史记录" name="pickUpChargePriceHistoryList">
                    <pickUpChargePriceHistoryList :key = 'dataKeys' :isvisible="pickUpChargePriceName === 'pickUpChargePriceHistoryList'" v-if="$_has_permission('SERVICE_DISTRICTSALESPRICING_STANDARDSERVICESANDPRICING_STANDARDSERVICESANDPRICINGHISTORY')"/>
                </el-tab-pane>
        </el-tabs>
    </div>
</template>

<script>
import pickUpChargePriceList from './pickUpChargePriceList'
import pickUpChargePriceHistoryList from './pickUpChargePriceHistoryList'
export default {
    name: 'pickUpChargePrice',
    components: {
        pickUpChargePriceList,  
        pickUpChargePriceHistoryList
    },
    data() {
        return {
            pickUpChargePriceName: 'pickUpChargePriceList',
            dataKeys:''
        }
    },
    computed: {

    },
    created() {
        this.pickUpChargePriceName = sessionStorage.getItem('pickUpChargePriceName') ? sessionStorage.getItem('pickUpChargePriceName') :'pickUpChargePriceList';
    },

    beforeUpdate () {
        sessionStorage.setItem('pickUpChargePriceName', this.pickUpChargePriceName);
    },

    beforeDestroy () {
        sessionStorage.setItem('pickUpChargePriceName', this.pickUpChargePriceName);
    },

    mounted() {
    },
    methods: {
        init() {
        },
        handleClick(tab, event) {
            this.dataKeys = Math.random();
            this.pickUpChargePriceName = tab.name;
        }
    }

}
</script>

<style rel="stylesheet/scss" lang="scss">
    .pickUpChargePrice{
    }
</style>

