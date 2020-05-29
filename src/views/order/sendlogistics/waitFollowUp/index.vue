<template>
  <div class="detailsCompnent tabsWrap sendlogistics">
        <el-tabs type="card" @tab-click="handleClick" v-model="CZdetailsName">
            <el-tab-pane
            v-for="item in visibleTabs"
            :key="item.name"
            :name="item.name"
            :label="item.label"
            >
            <comOrder :statusObject = "item" :isvisible="CZdetailsName === item.name"></comOrder> 
            </el-tab-pane>
        </el-tabs>
  </div>
</template>


<script type="text/javascript">
import '@/styles/detailsStyle.scss'
import comOrder from './comOrder'
    export default {
        name:'detailsCompnent',
        components:{
            comOrder,
        },
        data() {
          return {
            CZdetailsName:'overtimeOrder',
            visibleTabs:[
                {label:"超时未接单",name:"overtimeOrder",type:'AF071080101'},
                {label:"物流公司拒单",name:"memberRefuse",type:'AF07108010502'},
                {label:"物流公司取消运货",name:"memberCancle",type:'AF07108010503'},
                {label:"货主取消发货",name:"shipperCancle",type:'AF07108010501'},
            ],
          }
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

        },
        methods: {
            handleClick(tab, event) {
                this.CZdetailsName = tab.name;
            }
        }
    }
</script>

<style type="text/css" lang="scss">
.sendlogistics{
    .BtnInfo{
    font-weight: bold;
    font-size: 14px;
    color: #3e9ff1;
    cursor: pointer;
    }  
}

</style>