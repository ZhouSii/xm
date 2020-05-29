<template>
    <div class="otherServiceStandPrice tabsWrap">
       <el-tabs v-model="platformStandPriceName" type="card" @tab-click="handleClick" >
            <!-- 平台增值服务标准定价 -->
                <el-tab-pane label="平台增值服务标准定价" name="otherServiceStandPrice">
                    <standPrice :key = 'dataKeys' :isvisible="platformStandPriceName === 'otherServiceStandPrice'" v-if="$_has_permission('SERVICE_DISTRICTSALESPRICING_ADDEDSERVICES_ADDEDSERVICES')"/>
                </el-tab-pane>

            <!-- 增值服务标准定价区代列表 -->
                <el-tab-pane label="增值服务标准定价区代列表" name="agencyAreaPrice">
                    <agencyArea :key = 'dataKeys' :isvisible="platformStandPriceName === 'agencyAreaPrice'" v-if="$_has_permission('SERVICE_DISTRICTSALESPRICING_ADDEDSERVICES_LIST')"/>
                </el-tab-pane>
        </el-tabs>
    </div>
</template>

<script>
import standPrice from './standPrice'
import agencyArea from './agencyArea'
export default {
    name: 'otherServiceStandPrice',
    components: {
        standPrice,
        agencyArea
    },
    data() {
        return {
            platformStandPriceName: 'otherServiceStandPrice',
            dataKeys:''
        }
    },
    computed: {

    },
    created() {
        this.platformStandPriceName = sessionStorage.getItem('platformStandPriceName') || 'otherServiceStandPrice';
    },
    beforeUpdate () {
        sessionStorage.setItem('platformStandPriceName', this.platformStandPriceName);
    },
    beforeDestroy () {
        sessionStorage.setItem('platformStandPriceName', this.platformStandPriceName);
    },
    mounted() {
        // if (this.$route.query.currentTab) {
        // this.otherServiceName = this.$route.query.currentTab
        // }
    },
    methods: {
        init() {
        },
        handleClick(tab, event) {
            this.dataKeys = Math.random();
            this.platformStandPriceName = tab.name
        }
    }

}
</script>

<style rel="stylesheet/scss" lang="scss">
    .otherServiceStandPrice{
    }
</style>

