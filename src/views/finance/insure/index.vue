<template>
    <div class="identicalStyle financeInsure" style="height:100%" v-loading="loading">
          <el-form :inline="true"  class="demo-ruleForm classify_searchinfo">
            <el-form-item label="订单号">
            <el-input placeholder="请输入内容" clearable v-model.trim="formAllData.orderSerial"></el-input>
            </el-form-item>
            <el-form-item label="下单时间">
                    <el-date-picker
                        is-range
                        unlink-panels
                        :picker-options="pickerOptions2"
                        type="daterange"
                        align="right"
                        v-model="createTime"
                        range-separator="-"
                        start-placeholder="开始时间"
                        end-placeholder="结束时间"
                        placeholder="选择时间范围"
                        value-format="timestamp"
                        :default-time="['00:00:00', '23:59:59']"
                        @change='cTime'
                        >
                    </el-date-picker>
          </el-form-item>           
            <el-form-item class="fr">       
          <el-button type="primary" plain :size="btnsize" @click="getData_query" icon="el-icon-search">搜索</el-button> 
          <el-button type="info"  plain @click="clearSearch" :size="btnsize" icon="fontFamily aflc-icon-qingkong">清空</el-button>
          </el-form-item>
          </el-form>
          	<div class="classify_info">
            <div class="info_news">
            <el-table style="width: 100%" stripe border height="100%" ref="multipleTable" highlight-current-row  tooltip-effect="dark" :data="tableDataAll" v-has:FINANCE_GOODS_INSURE_LIST>
           <el-table-column label="序号"  width="60">
                            <template slot-scope="scope">
                             {{ (page - 1)*pagesize + scope.$index + 1 }}
                            </template>
            </el-table-column>
            <el-table-column  label="订单号" prop="orderSerial" sortable width="250" show-overflow-tooltip>
              <template  slot-scope="scoped">
                    <h4 class="needMoreInfo" @click="pushOrderSerial(scoped.row)">{{ scoped.row.orderSerial}}</h4>
              </template>
            </el-table-column>
            <el-table-column  label="服务分类" prop="serviceCode" sortable show-overflow-tooltip>
            </el-table-column>
            <el-table-column  label="区域" prop="belongCity" sortable show-overflow-tooltip>
            </el-table-column>
            <el-table-column  label="货主" prop="shipperName" sortable show-overflow-tooltip>
            </el-table-column>
            <el-table-column  label="车主" prop="driverName" sortable show-overflow-tooltip>
            </el-table-column>                    
            <el-table-column  label="投保金额(元)" prop="insuredPriceValue" sortable show-overflow-tooltip>
            </el-table-column>
            <el-table-column  label="提货地" prop="startAddress" sortable show-overflow-tooltip>
            </el-table-column>              
            <el-table-column  label="目的地" prop="endAddress" sortable show-overflow-tooltip>
            </el-table-column>
            <el-table-column  label="下单时间" prop="orderTime" sortable width="200">
            <template  slot-scope="scope">
              <span class="orderSerial">
                {{ scope.row.orderTime | parseTime('{y}-{m}-{d} {h}:{i}:{s}')}}    
              </span>
            </template>
            </el-table-column>
            </el-table> 
        	</div> 
            <div class="info_tab_footer">共计:{{ dataTotal }} <div class="show_pager"> <Pager :total="dataTotal" @change="handlePageChange"  :sizes="sizes" ref="pager"/></div> </div> 
         <!-- 页码 -->
          </div>
      </div>
</template>
<script>
import Pager from '@/components/Pagination/index'
import {parseTime,pickerOptions2} from '@/utils/'
import { aflcOrderPinganInsure } from '@/api/finance/insure'
export default {
  data(){
    return{
      pickerOptions2: {shortcuts: pickerOptions2},
      loading:false,  
      btnsize:'mini',
      sizes:[20,50,100,400],
      pagesize:20,//初始化加载数量
      page:1,//初始化页码
      tableDataAll:[],
      dataTotal:null,
      selectRowData:{},
      createTime:[],
      formAllData:{
            orderSerial:null,
            orderStartTime: null,
            orderEndTime: null,           
      }
     }
    },
    components:{
      Pager
    },
    methods:{
    // 列表刷新页面  
    firstblood(){
     this.loading =true
    aflcOrderPinganInsure(this.page, this.pagesize,this.formAllData).then(res => {
                    this.tableDataAll = res.data.list
                    this.dataTotal = res.data.totalCount
                    this.loading = false
       })
    },         
    // 每页显示数据量变更
    handlePageChange(obj) {
      this.page = obj.pageNum
      this.pagesize = obj.pageSize
      this.firstblood()
    },       
     //  查询
    getData_query(){
      this.page = 1;
      this.$refs.pager.inputval = this.page;
      this.$refs.pager.pageNum = this.page;
      this.firstblood()
    },
    // 清空查询
     clearSearch(){
        this.createTime = [],
        this.formAllData = {
                    orderSerial:null,
                    orderStartTime: null,
                    orderEndTime: null,  
               }
        if(this.page!= 1){
                this.page = 1;
                this.$refs.pager.inputval = this.page;
                this.$refs.pager.pageNum = this.page;
        }
         this.firstblood();
        },
    cTime(i){
        if(i!==null){
        this.formAllData.orderStartTime = i[0]
        this.formAllData.orderEndTime = i[1]
        }
        else{
        this.formAllData.orderStartTime = null
        this.formAllData.orderEndTime = null
        }  
    },
    //详情弹窗
    pushOrderSerial(item,type){
     this.$router.push({ name: '订单详情', query: { orderSerial: item.orderSerial }})
    },
   },
    mounted(){
       this.firstblood();      
    },
}
</script>
<style lang="scss">
.financeInsure{

}
</style>


