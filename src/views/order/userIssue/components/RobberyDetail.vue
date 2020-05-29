<template>
    <div class="identicalStyle financeInsure" style="height:100%" v-loading="loading">
          	<div class="classify_info">
            <div class="info_news">    
            <el-table style="width: 100%" stripe border height="99%" ref="multipleTable" highlight-current-row  tooltip-effect="dark" :data="tableDataAll" >
           <el-table-column label="序号"  width="80">
                            <template slot-scope="scope">
                             {{ (page - 1)*pagesize + scope.$index + 1 }}
                            </template>
            </el-table-column>
            <el-table-column  label="用户类型" prop="companyUserTypeName" sortable >
            </el-table-column>
            <el-table-column  label="抢单用户" prop="companyName" sortable >
            </el-table-column>
            <el-table-column  label="用户账号" prop="companyUser" sortable>
            </el-table-column>
            <el-table-column  label="操作状态" prop="negotiateStateName" sortable>
            </el-table-column>
            <el-table-column  label="抢单时间" prop="createTime" sortable>
            </el-table-column>
            <el-table-column  label="是否拨打电话" prop="isPhoneCall" sortable>
            <template slot-scope="scope">
              <span>{{scope.row.isPhoneCall=='0'?'未拨打':'已拨打'}}</span>
            </template>
            </el-table-column>                    
            <el-table-column  label="拨打时间" prop="phoneCallTime" sortable>
            </el-table-column>
            <el-table-column  label="是否谈妥" prop="negotiateStateName" sortable show-overflow-tooltip>
              <template slot-scope="scope">
              <span v-if="scope.row.negotiateStateName=='已谈妥'">{{scope.row.negotiateStateName}}</span>
              <span v-else-if="scope.row.negotiateStateName=='未谈妥'">{{scope.row.negotiateStateName}}({{scope.row.negotiateRemarkName}})</span></span>
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
import {companyOrderList} from '@/api/order/userIssue/userIssue.js'
import { parseTime } from '@/utils/index.js'
export default {
  data(){
    return{
      loading:false,  
      btnsize:'mini',
      sizes:[20,50,100],
      pagesize:20,//初始化加载数量
      page:1,//初始化页码
      tableDataAll:[],
      dataTotal:null,
      selectRowData:{},
      formAllData:{
        dataType:4,
        orderSerial:this.$route.query.orderSerial
      }
     }
    },
    components:{
      Pager
    },
    methods:{
    // 列表刷新页面  
    firstblood(){
     companyOrderList(this.page,this.pagesize,this.formAllData).then(res => {
       console.log('data',res)
                    this.dataTotal = res.data.totalCount
                    this.tableDataAll = res.data.list;
                    this.tableDataAll.forEach(item => {
                      item.createTime = parseTime(item.createTime,"{y}-{m}-{d} {h}:{i}:{s}");
                      item.phoneCallTime = parseTime(item.phoneCallTime,"{y}-{m}-{d} {h}:{i}:{s}");
                    });
    })
    },         
    // 每页显示数据量变更
    handlePageChange(obj) {
      this.page = obj.pageNum
      this.pagesize = obj.pageSize
      this.firstblood()
    },       
     //  查询
    getData_query() {
      this.page = 1;
      this.$refs.pager.inputval = this.page;
      this.$refs.pager.pageNum = this.page;
      this.firstblood()
    },
    // 清空查询
     clearSearch(){
        if(this.page!= 1){
                this.page = 1;
                this.$refs.pager.inputval = this.page;
                this.$refs.pager.pageNum = this.page;
        }
         this.firstblood();
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


