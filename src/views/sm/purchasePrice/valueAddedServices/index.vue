<template>
    <div class="valueAddedServices tabsWrap">
       <el-tabs v-model="valueAddedServicesName" type="card" @tab-click="handleClick" >
            <!-- 增值服务定价 -->
                <el-tab-pane label="增值服务定价" name="valueAddedServicesAreaPrice">
                    <valueAddedServicesAreaPrice :key = 'dataKeys' :isvisible="valueAddedServicesName === 'valueAddedServicesAreaPrice'" v-if="$_has_permission('SERVICE_SPECIALLINEPURCHASEPRICING_VALUEADDEDSERVICEPRICING_VALUEADDEDSERVICEPRICING')"/>
                </el-tab-pane>

            <!-- 增值服务定价历史记录 -->
                <el-tab-pane label="增值服务定价历史记录" name="valueAddedServicesHistoryAreaPrice">
                    <valueAddedServicesHistoryAreaPrice :key = 'dataKeys' :isvisible="valueAddedServicesName === 'valueAddedServicesHistoryAreaPrice'" v-if="$_has_permission('SERVICE_SPECIALLINEPURCHASEPRICING_VALUEADDEDSERVICEPRICING_HISTORY')"/> 
                </el-tab-pane>
        </el-tabs>
    </div>
</template>

<script>
import valueAddedServicesAreaPrice from './valueAddedServicesAreaPrice'
import valueAddedServicesHistoryAreaPrice from './valueAddedServicesHistoryAreaPrice'
export default {
    name: 'valueAddedServices',
    components: {
        valueAddedServicesAreaPrice,
        valueAddedServicesHistoryAreaPrice
    },
    data() {
        return {
            valueAddedServicesName: 'valueAddedServicesAreaPrice',
            dataKeys:''
        }
    },
    computed: {

    },
    created() {
        this.valueAddedServicesName = sessionStorage.getItem('valueAddedServicesName') || 'valueAddedServicesAreaPrice';
    },
    beforeUpdate () {
        sessionStorage.setItem('valueAddedServicesName', this.valueAddedServicesName);
    },
    beforeDestroy () {
        sessionStorage.setItem('valueAddedServicesName', this.valueAddedServicesName);
    },
    mounted() {
        // if (this.$route.query.currentTab) {
        // this.valueAddedServicesName = this.$route.query.currentTab
        // }
    },
    methods: {
        init() {
        },
        handleClick(tab, event) {
            this.dataKeys = Math.random();
            this.valueAddedServicesName = tab.name
        }
    }

}
</script>

<style rel="stylesheet/scss" lang="scss">
    .valueAddedServices{
    }
</style>

