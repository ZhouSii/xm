<template>
    <div class="plantformProfit tabsWrap">
       <el-tabs v-model="plantformProfitName" type="card" @tab-click="handleClick" >
            <!-- 按区域配置 -->
                <el-tab-pane label="按区域配置" name="regionConfigList">
                    <regionConfigComponent :key = 'dataKeys' :isvisible="plantformProfitName === 'regionConfigList'" v-if="$_has_permission('DISPATCH_HAIRLOGISTICS_DISTRIBUTIONCONFIGURATION_REGION')"/>
                </el-tab-pane>

            <!-- 按区代配置 -->
                <el-tab-pane label="按区代配置" name="agencyConfigList">
                    <agencyConfigComponent :key = 'dataKeys' :isvisible="plantformProfitName === 'agencyConfigList'" v-if="$_has_permission('DISPATCH_HAIRLOGISTICS_DISTRIBUTIONCONFIGURATION_REGION')"/>
                </el-tab-pane>
        </el-tabs>
    </div>
</template>

<script>
import regionConfigComponent from './regionConfig'
import agencyConfigComponent from './agencyConfig'
export default {
    name: 'plantformProfit',
    components: {
        regionConfigComponent,  
        agencyConfigComponent
    },
    data() {
        return {
            plantformProfitName: 'regionConfigList',
            dataKeys:''
        }
    },
    computed: {

    },
    created() {
        this.plantformProfitName = sessionStorage.getItem('plantformProfitName') ? sessionStorage.getItem('plantformProfitName') :'regionConfigList';
    },
    beforeUpdate () {
        sessionStorage.setItem('plantformProfitName', this.plantformProfitName);
    },
    beforeDestroy () {
        sessionStorage.setItem('plantformProfitName', this.plantformProfitName);
    },
    mounted() {
    },
    methods: {
        init() {
        },
        handleClick(tab, event) {
            this.dataKeys = Math.random();
            this.plantformProfitName = tab.name;
        }
    }

}
</script>

<style rel="stylesheet/scss" lang="scss">
    .plantformProfit{
    }
</style>

