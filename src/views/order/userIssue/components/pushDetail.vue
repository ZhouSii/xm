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
            <el-table-column  label="推送时间" prop="createTime" sortable >
            </el-table-column>
            <el-table-column  label="推送用户" prop="pushUserName" sortable>
            </el-table-column>
            <el-table-column  label="用户账号" prop="pushUserPhone" sortable>
            </el-table-column>
            <el-table-column  label="推送用户类型" prop="pushUserTypeName" sortable>
            </el-table-column>
            <el-table-column  label="是否抢单" prop="" sortable>
              <template slot-scope="scope">
                <span>{{scope.row.isGrab == '0'?'未抢单':'已抢单'}}</span>
              </template>
            </el-table-column>
            <el-table-column  label="抢单时间" prop="grabTime" sortable>
            </el-table-column>
            </el-table> 
        	</div> 
            <div class="info_tab_footer">共计:{{ dataTotal }} <div class="show_pager"> <Pager :total="dataTotal" @change="handlePageChange"  :sizes="sizes" ref="pager"/></div> </div> 
         <!-- 页码 -->
          </div>
      </div>
</template>
<script>
import {orderPushList} from '@/api/order/userIssue/userIssue.js'
import Pager from '@/components/Pagination/index'
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
     orderPushList(this.page,this.pagesize,this.formAllData).then(res => {
       console.log('data2',res)
                    this.dataTotal = res.data.totalCount
                    this.tableDataAll = res.data.list
                    this.tableDataAll.forEach(item => {
                      item.createTime = parseTime(item.createTime,"{y}-{m}-{d} {h}:{i}:{s}");
                      item.grabTime = parseTime(item.grabTime,"{y}-{m}-{d} {h}:{i}:{s}");
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
    cTime(i){

    }    
   },
    mounted(){
       this.firstblood();      
    },
}
</script>
<style lang="scss">
</style>


