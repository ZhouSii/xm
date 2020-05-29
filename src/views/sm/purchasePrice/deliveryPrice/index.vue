<template>
    <div class="deliveryPrice tabsWrap">
       <el-tabs v-model="deliveryPriceName" type="card" @tab-click="handleClick" >
            <!-- 送货费及定价 -->
                <el-tab-pane label="送货费定价" name="deliveryPriceList">
                    <deliveryPriceList :key = 'dataKeys' :isvisible="deliveryPriceName === 'deliveryPriceList'" v-if="$_has_permission('SERVICE_SPECIALLINEPURCHASEPRICING_DELIVERYFEEPRICING_DELIVERYFEEPRICING')"/>
                </el-tab-pane>

            <!-- 送货费定价历史记录 -->
                <el-tab-pane label="送货费定价历史记录" name="deliveryPriceHistoryList">
                    <deliveryPriceHistoryList :key = 'dataKeys' :isvisible="deliveryPriceName === 'deliveryPriceHistoryList'" v-if="$_has_permission('SERVICE_SPECIALLINEPURCHASEPRICING_DELIVERYFEEPRICING_HISTORY')"/>
                </el-tab-pane>
        </el-tabs>
    </div>  
</template>

<script>
import deliveryPriceList from './deliveryPriceList'
import deliveryPriceHistoryList from './deliveryPriceHistoryList'
export default {
    name: 'deliveryPrice',
    components: {
        deliveryPriceList,  
        deliveryPriceHistoryList
    },
    data() {
        return {
            deliveryPriceName: 'deliveryPriceList',
            dataKeys:''
        }
    },
    computed: {

    },
    created() {
        this.deliveryPriceName = sessionStorage.getItem('deliveryPriceName') ? sessionStorage.getItem('deliveryPriceName') :'deliveryPriceList';
    },
    beforeUpdate () {
        sessionStorage.setItem('deliveryPriceName', this.deliveryPriceName);
    },
    beforeDestroy () {
        sessionStorage.setItem('deliveryPriceName', this.deliveryPriceName);
    },
    mounted() {
    },
    methods: {
        init() {
        },
        handleClick(tab, event) {
            this.dataKeys = Math.random();
            this.deliveryPriceName = tab.name;
        }
    }

}
</script>

<style rel="stylesheet/scss" lang="scss">
    .deliveryPrice{
    }
</style>

