<template>
  <div class="detailsCompnent tabsWrap">
    <el-tabs v-model="HZdetailsName" type="card" @tab-click="handleClick" >
        <!-- 基本信息 -->
            <el-tab-pane label="基本信息" name="essential">
                <essential :isvisible="HZdetailsName === 'essential'" />
            </el-tab-pane>

        <!-- 辅助交易信息 -->
            <el-tab-pane label="辅助交易信息" name="transaction">
                <transaction :isvisible="HZdetailsName === 'transaction'" />
            </el-tab-pane>

        <!-- 权限配置 -->
            <!-- <el-tab-pane label="权限配置" name="authority">
                <authorityConfigure :isvisible="HZdetailsName === 'authority'" />
            </el-tab-pane> -->

        <!-- 行为轨迹 -->
            <!-- <el-tab-pane label="行为轨迹" name="actionTrail">
                <actionTrail :isvisible="HZdetailsName === 'actionTrail'" />
            </el-tab-pane> -->
            
        <!-- 订单信息 -->
            <el-tab-pane label="订单信息" name="orderInfo">
                <orderInfo :isvisible="HZdetailsName === 'orderInfo'" />
            </el-tab-pane>

        <!-- 业务关系 -->
            <!-- <el-tab-pane label="业务关系" name="business">
                <businessRelation :isvisible="HZdetailsName === 'business'" />
            </el-tab-pane> -->

        <!-- 财务情况 -->
            <el-tab-pane label="财务情况" name="financial">
                <financialRelations :isvisible="HZdetailsName === 'financial'" />
            </el-tab-pane>

        <!-- 其他信息 -->
            <el-tab-pane label="其他信息" name="otherInfo">
                <otherInfo :isvisible="HZdetailsName === 'otherInfo'" />
            </el-tab-pane>

        <!-- 交易统计2.2 -->
            <el-tab-pane label="交易统计" name="transactionTotal">
                <transactionTotal :isvisible="HZdetailsName === 'transactionTotal'" />
            </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script type="text/javascript">
import '@/styles/detailsStyle.scss'
import essential from './essential'
// import authorityConfigure from './authorityConfigure'
// import actionTrail from './actionTrail'
import orderInfo from './orderInfo'
// import businessRelation from './businessRelation'
import financialRelations from './financialRelations'
import otherInfo from './otherInfo'
import transaction from './transaction'
import transactionTotal from './transactionTotal'
    export default {
        name:'detailsCompnent',
        components:{
           essential,
        //    authorityConfigure,
        //    actionTrail,
           orderInfo,
        //    businessRelation,
           financialRelations,
           otherInfo,
           transaction,
           transactionTotal
        },
        data() {
          return {
            HZdetailsName:'essential',
          };
        },
        watch:{
            HZdetailsName(newVal,oldVal){
                if(newVal){
                    this.HZdetailsName = newVal;
                }else{
                    this.HZdetailsName = oldVal;
                }
            }
        },
        created() {
            this.HZdetailsName = sessionStorage.getItem('HZdetailsName') || 'essential';
        },

        beforeUpdate () {
            sessionStorage.setItem('HZdetailsName', this.HZdetailsName);
        },
        beforeDestroy () {
            sessionStorage.setItem('HZdetailsName', 'essential');
        },
        methods: {
            handleClick(tab, event) {
                this.HZdetailsName = tab.name;
            }
        }
    }
</script>

<style type="text/css" lang="scss" scoped>
    .detailsCompnent{
        height: 100%;
        .el-tab-pane{
            overflow: auto;
            background: #f2f2f2;
        }
        .imgbox{
            overflow: auto;
        }
    }
</style>

