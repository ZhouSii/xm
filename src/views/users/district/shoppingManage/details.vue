<template>
  <div class="detailsCompnent tabsWrap">
    <el-tabs v-model="detailsName" type="card" @tab-click="handleClick" >
        <!-- 商圈详情 -->
            <el-tab-pane label="商圈详情" name="DetailData">
                <DetailData :isvisible="detailsName === 'DetailData'" />
            </el-tab-pane>

        <!-- 商圈货主数据统计 -->
            <el-tab-pane label="商圈货主数据统计" name="shipperData">
                <shipperData :isvisible="detailsName === 'shipperData'" />
            </el-tab-pane>

        <!-- 商圈订单数据统计 -->
            <!-- <el-tab-pane label="商圈订单数据统计" name="OrderData">
                <OrderData :isvisible="detailsName === 'OrderData'" />
            </el-tab-pane> -->
    </el-tabs>
  </div>
</template>


<script type="text/javascript">
import '@/styles/detailsStyle.scss'
import DetailData from './components/DetailData'
import shipperData from './components/shipperData'
import OrderData from './components/OrderData'
    export default {
        name:'shoppingManagedetails',
        components:{
           DetailData,
           shipperData,
           OrderData,
        },
        data() {
          return {
            detailsName:'DetailData',
          };
        },
        watch:{
            detailsName(newVal,oldVal){
                if(newVal){
                    this.detailsName = newVal;
                }else{
                    this.detailsName = oldVal;
                }
            }
        },
        created() {

        },
        methods: {
            handleClick(tab, event) {
                this.detailsName = tab.name;
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

