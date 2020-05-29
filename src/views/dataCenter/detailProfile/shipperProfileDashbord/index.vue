<template>
    <div class="shipperProfileDashbord tabsWrap">
       <el-tabs v-model="shipperProfileName" type="card" @tab-click="handleClick" >
            <!-- 货主总况 -->
            <el-tab-pane label="货主总况" name="shipperTotalCount" v-if="$_has_permission('DATA_CENTER_DEVELOPMENT_OVERVIEW_SAHIPPER_GENERAL_ALL')">
                <shipperStatistics :isvisible="shipperProfileName === 'shipperTotalCount'"/>
            </el-tab-pane>

            <!-- 所属业务员 -->
            <el-tab-pane label="所属业务员" name="belongBusinessPerson" v-if="$_has_permission('DATA_CENTER_DEVELOPMENT_OVERVIEW_SAHIPPER_GENERAL_MEMBER')">
                <belongBusiness :isvisible="shipperProfileName === 'belongBusinessPerson'"/>
            </el-tab-pane>
        </el-tabs>
    </div>
</template>

<script>
import shipperStatistics from './shipperStatistics.vue'
import belongBusiness from './belongBusiness'
export default {
    name: 'shipperProfileDashbord',
    components: {
        shipperStatistics,
        belongBusiness
    },
    data() {
        return {
            shipperProfileName: 'shipperTotalCount',
        }
    },
    computed: {

    },
    

    // created() {
    //     this.routeQuery = sessionStorage.getItem('orderSerial');
    //     console.log('created',this.routeQuery)
    // },

    // beforeUpdate () {
    //     sessionStorage.setItem('orderSerial', this.routeQuery);
    //     console.log('beforeUpdate',this.routeQuery)
    // },

    // beforeDestroy () {
    //     sessionStorage.setItem('orderSerial', this.routeQuery);
    //     console.log('beforeDestroy',this.routeQuery)
    // },

    mounted() {
        // if (this.$route.query.currentTab) {
        //     this.shipperProfileName = this.$route.query.currentTab
        // }
    },
    methods: {
        init() {
        },
        handleClick(tab, event) {
            this.shipperProfileName = tab.name
        }
    }

}
</script>

<style rel="stylesheet/scss" lang="scss">
    .shipperProfileDashbord{
        // height: 100%;
        // background-color: #fafeff;
        // padding-right: 16px;
        // .el-tabs--card>.el-tabs__header {
        //     border-bottom: 1px solid #03a9f4;
        //     padding-left: 10px;
        //     padding-top: 12px;
        // }
        // .el-tabs__content {
        //     overflow: auto;
        // }
        // .el-tabs--card>.el-tabs__header .el-tabs__nav{
        //     border: 0 none;
        // }

        // .el-tabs--card>.el-tabs__header .el-tabs__item:first-child {
        //     border-left: 1px solid #d2d2d2;
        // }

        // .el-tabs__item{
        //     border: 1px solid #d2d2d2;
        //     border-top-width:2px; 
        //     border-radius: 4px 4px 0px 0px;
        //     border-bottom: 0 none;
        //     height: 30px;
        //     line-height: 30px;
        // }

        // .el-tabs--card>.el-tabs__header .el-tabs__item.is-active {
        //     border-top-width: 2px;
        //     border-color: #03a9f4;
        //     background: #ffffff;
        //     border-bottom-color: #fafeff;
        // }

        // .el-tabs__content{
        //     padding-left: 10px;
        //     padding-top: 12px;
        // }
    }
</style>

