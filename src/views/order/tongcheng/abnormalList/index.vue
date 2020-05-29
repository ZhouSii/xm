<template>
  <div class="abnormal tabsWrap">
    <el-tabs v-model="abnormalName" type="card" @tab-click="handleClick" >
         <!-- 疑问订单 -->
            <el-tab-pane label="疑问订单"  name="doubtOrder"  v-if="$_has_permission('ORDER_CITY_WIDE_ORDER_EXCEPTION_MANAGE_WHY_ORDER')">
                <doubtOrder :key = 'dataKeys' :isvisible="abnormalName === 'doubtOrder'"/>
            </el-tab-pane>
        <!-- 系统处理 -->
            <el-tab-pane label="系统已处理"  name="SystemProcessing"  v-if="$_has_permission('ORDER_CITY_WIDE_ORDER_EXCEPTION_MANAGE_SYSTEM_DEAL')">
                <SystemProcessing :key = 'dataKeys' :isvisible="abnormalName === 'SystemProcessing'"/>
            </el-tab-pane>

        <!-- 客服处理 -->
            <el-tab-pane label="客服已处理" name="CustomerServiceProcessing"  v-if="$_has_permission('ORDER_CITY_WIDE_ORDER_EXCEPTION_MANAGE_CUSTOMER_DEAL')">
                <CustomerServiceProcessing :key = 'dataKeys' :isvisible=" abnormalName === 'CustomerServiceProcessing'"/>
            </el-tab-pane>
    </el-tabs>
  </div>
</template>


<script type="text/javascript">

import SystemProcessing from './SystemProcessing'
import CustomerServiceProcessing from './CustomerServiceprocessing'
import doubtOrder from './doubtOrder'
    export default {
      name:'abnormal',
      components:{
          doubtOrder,
          SystemProcessing,
          CustomerServiceProcessing
        },
        data() {
          return {
            abnormalName:'doubtOrder',
            dataKeys:'',
          };
        },
        watch:{
            abnormalName(newVal,oldVal){
                // console.log('newVal,oldVal',newVal,oldVal)
                if(newVal){
                    this.abnormalName = newVal;
                }else{
                    this.abnormalName = oldVal;
                }
            }
        },
        created() {
            this.abnormalName = sessionStorage.getItem('abnormalName') || 'doubtOrder';
        },

        beforeUpdate () {
            sessionStorage.setItem('abnormalName', this.abnormalName);
        },

        beforeDestroy () {
            sessionStorage.setItem('abnormalName', 'doubtOrder');
        },
        methods: {
            handleClick(tab, event) {
                // console.log(tab, event);
                this.dataKeys = Math.random();
                // console.log('this.dataKeys',this.dataKeys)
                this.abnormalName = tab.name;
            },
        },
        mounted(){
            // this.dataKeys = Math.random();
        }
    }
</script>

<style type="text/css" lang="scss" scoped>
    .abnormal{
        height: 100%;
    }
</style>