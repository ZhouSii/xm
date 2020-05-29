<template>
  <div class="detailsCompnent tabsWrap">
    <el-tabs v-model="CZdetailsName" type="card" @tab-click="handleClick" >
        <!-- 基本信息 -->
            <el-tab-pane label="基本信息" name="essential">
                <essential :isvisible="CZdetailsName === 'essential'" />
            </el-tab-pane>

        <!-- 权限配置 -->
            <!-- <el-tab-pane label="权限配置" name="authority">
                <authorityConfigure :isvisible="CZdetailsName === 'authority'" />
            </el-tab-pane> -->

        <!-- 辅助交易 -->
            <el-tab-pane label="辅助交易" name="assistantTrade">
                <assistantTrade :isvisible="CZdetailsName === 'assistantTrade'" />
            </el-tab-pane>
            
        <!-- 推抢单记录 -->
            <el-tab-pane label="推抢单记录" name="pushBump">
                <pushBump :isvisible="CZdetailsName === 'pushBump'" />
            </el-tab-pane>

        <!-- 订单信息 -->
            <el-tab-pane label="订单信息" name="orderInfo">
                <orderInfo :isvisible="CZdetailsName === 'orderInfo'" />
            </el-tab-pane>

         <!-- 车主异常行为 -->
            <el-tab-pane label="车主异常行为" name="Carbehavior">
                <Carbehavior :isvisible="CZdetailsName === 'Carbehavior'" />
            </el-tab-pane>

         <!-- 财务信息 -->
            <el-tab-pane label="财务信息" name="financial">
                <financialRelations :isvisible="CZdetailsName === 'financial'" />
            </el-tab-pane>

        <!-- 交易轨迹 -->
            <!-- <el-tab-pane label="交易轨迹" name="actionTrail">
                <actionTrail :isvisible="CZdetailsName === 'actionTrail'" />
            </el-tab-pane> -->

         <!-- 业务关系 -->
            <!-- <el-tab-pane label="业务关系" name="business">
                <businessRelation :isvisible="CZdetailsName === 'business'" />
            </el-tab-pane> -->

         <!-- 其他信息 -->
            <el-tab-pane label="其他信息" name="otherInfo">
                <otherInfo :isvisible="CZdetailsName === 'otherInfo'" />
            </el-tab-pane>

         <!-- 会员权益 -->
            <el-tab-pane label="会员权益" name="VipEquity">
                <VipEquity :isvisible="CZdetailsName === 'VipEquity'" />
            </el-tab-pane>


    </el-tabs>
  </div>
</template>


<script type="text/javascript">
import '@/styles/detailsStyle.scss'
import essential from './essential'
import authorityConfigure from './authorityConfigure'
import assistantTrade from './assistantTrade'
import actionTrail from './actionTrail'
import orderInfo from './orderInfo'
import businessRelation from './businessRelation'
import financialRelations from './financialRelations'
import otherInfo from './otherInfo'
import Carbehavior from './Carbehavior'
import VipEquity from './VipEquity'
import pushBump from './pushBump'
    export default {
      name:'detailsCompnent',
      components:{
            essential,
            authorityConfigure,
            assistantTrade,
            actionTrail,
            orderInfo,
            businessRelation,
            financialRelations,
            otherInfo,
            Carbehavior,
            VipEquity,
            pushBump
        },
        data() {
          return {
            CZdetailsName:'essential',
          };
        },
        watch:{
            CZdetailsName(newVal,oldVal){
                if(newVal){
                    this.CZdetailsName = newVal;
                }else{
                    this.CZdetailsName = oldVal;
                }
            }
        },
        created() {
            this.CZdetailsName = sessionStorage.getItem('CZdetailsName') || 'essential';
        },

        beforeUpdate () {
            sessionStorage.setItem('CZdetailsName', this.CZdetailsName);
        },

        beforeDestroy () {
            sessionStorage.setItem('CZdetailsName', 'essential');
        },
        methods: {
            handleClick(tab, event) {
                // console.log(tab, event);
                this.CZdetailsName = tab.name;
            }
        }
    }
</script>

<style type="text/css" lang="scss">
    .detailsCompnent{
        height: 100%;
        .el-tab-pane{
            overflow: auto;
            background: #f2f2f2;
        }
        #carMap{
            width:100%;
            height:500px;
        }
        .BtnInfo{
            cursor: pointer;
            color: #3e9ff1;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            font-weight: bold;
        }
        .basicInfo .el-col{
            padding: 12px 0px 12px 3px!important;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
        }
    }
</style>