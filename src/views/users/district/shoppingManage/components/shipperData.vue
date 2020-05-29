<template>
    <div class="detailsInfo detailsArrange" v-loading="loading">
    <!-- 货主覆盖率 -->
    <div class="detailsInfo-collapse collapseInfo" style="padding-top: 18px">
    <el-button  type="primary" value="value" plain @click="shipperDetail">商圈货主信息</el-button>
            <h2 style="padding: 18px 0">货主覆盖率</h2>
            <div class="essentialInformation_table">
                <el-table border style="width: 100%" :data="tableDataAll" :summary-method="getSummaries" show-summary>
                    <el-table-column prop="potentialGradeName" label="货主潜力等级" ></el-table-column>
                    <!-- <el-table-column prop="lateTradeAuthShipperTotal" label="登记货主数量" ></el-table-column> -->
                    <el-table-column prop="authShipperTotal" label="已认证数量" ></el-table-column>
                    <el-table-column prop="lateTradeAuthShipperTotal" label="实际数量（根据近30天下单量）"></el-table-column>
                    <el-table-column prop="authShipperCoverageRate" label="认证覆盖率（已认证/货主数量）" >
                       <template  slot-scope="scope">
                           {{scope.row.authShipperCoverageRate}}%
                        </template>
                    </el-table-column>
                    <el-table-column prop="weight" label="权重" > </el-table-column>
                    <el-table-column prop="authShipperWeightCoverageRate" label="认证加权覆盖率（覆盖率*权重）">
                         <template  slot-scope="scope">
                          {{scope.row.authShipperWeightCoverageRate}}%
                         </template>
                    </el-table-column>
                </el-table>
            </div>
    </div>
        <!-- 货主下单数据统计 -->
    <div class="logInfo-collapse collapseInfo">
            <h2>货主下单数据统计</h2>
            <div class="essentialInformation_table">
                <el-table border style="width: 100%" :data="tableDataAll2">
                    <el-table-column prop="serviceClassifyName" label="服务分类" ></el-table-column>
                    <!-- <el-table-column prop="" label="注册货主数" width="95"></el-table-column> -->
                    <el-table-column prop="authShipperTotal" label="认证货主数" ></el-table-column>
                    <!-- <el-table-column prop="" label="近30天交易注册货主数" width="165"></el-table-column> -->
                    <el-table-column prop="lateTradeAuthShipperTotal" label="近30天交易认证货主数"  ></el-table-column>
                    <!-- <el-table-column prop="" label="注册活跃度" width="95"></el-table-column> -->
                    <el-table-column prop="authShipperActiveRate" label="认证活跃度"></el-table-column>
                    <el-table-column prop="latePlaceOrderAuthShipperTotal" label="近30天已认证货主下单量" ></el-table-column>
                    <!-- <el-table-column prop="" label="近30天已注册货主成交量"  width="185"></el-table-column> -->
                    <el-table-column prop="lateOrderAuthShipperTotal" label="近30天已认证货主成交量"  ></el-table-column>
                    <el-table-column prop="pairingRate" label="配对率" >
                         <template  slot-scope="scope">
                            {{scope.row.pairingRate}}%
                         </template>
                    </el-table-column>
                    <el-table-column prop="lateOrderCancelAuthShipperTotal" label="近30天已认证货主取消量" ></el-table-column>
                    <el-table-column prop="cancelRate" label="取消率">
                        <template  slot-scope="scope">
                            {{scope.row.cancelRate}}%
                         </template>
                    </el-table-column>
                </el-table>
            </div>
    </div> 
    </div>
</template>
<script>
var map = {}
import { data_get_shipperCoverageRateList,data_get_shipperOrderList } from '@/api/users/district/shoppingManage.js'
export default {
  name: 'shipperData',
  components: {
  },
  props: {
    isvisible: {
        type: Boolean,
        default: false
      }
  }, 
  data() {
    return {
        loading:false,
        tableDataAll:[],
        tableDataAll2:[],
        defaultImg:'/static/test.jpg',//默认第一张图片的url
        centerPoint:[]
    }
  },
  watch:{
      isvisible:{
          handler(newVal,oldVal){
            if (newVal) {
            this.firstblood();
            }
          },
          immediate: true
      }
  },
  methods:{
  shipperDetail(){
      this.$router.push({ name: '货主数据管理'})
  },
   firstblood() {
      data_get_shipperCoverageRateList(this.$route.query.Id).then(res => {
        this.tableDataAll = res.data
        this.tableDataAll.forEach(item=>{
            item.authShipperCoverageRate = (item.authShipperCoverageRate*100).toFixed(2)
            item.authShipperWeightCoverageRate = (item.authShipperWeightCoverageRate*100).toFixed(2)
        })
      })
      data_get_shipperOrderList(this.$route.query.Id).then(res => {
        this.tableDataAll2 = res.data
        this.tableDataAll2.forEach(item=>{
            item.pairingRate = (item.pairingRate*100).toFixed(2)
            item.cancelRate = (item.cancelRate*100).toFixed(2)
        })

      })
  },
  // 合计
  getSummaries(param){
        const { columns, data } = param;
        const sums = [];
        columns.forEach((column, index) => {
          if (index === 0) {
            sums[index] = '合计';
            return;
          }
          if (index === 3) {
            sums[index] = '';
            return;
          }
          if (index === 4) {
            sums[index] = '';
            return;
          }
          const values = data.map(item => Number(item[column.property]));
          if (!values.every(value => isNaN(value))) {
            sums[index] = values.reduce((prev, curr) => {
              const value = Number(curr);
              if (!isNaN(value)) {
                return prev + curr;
              } else {
                return prev;
              }
            }, 0);
            if(index==5){
                sums[index]+= '%'
            }
          } 
        });
        return sums;
  }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
</style>
