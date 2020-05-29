<template>
 <div class="identicalStyle sendlogistics" style="height:100%" >
          <el-form :inline="true"  class="demo-ruleForm classify_searchinfo">
            <el-form-item label="下单日期">
            <el-date-picker
                type="daterange"
                :picker-options="pickerOptions2"
                range-separator="-"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
                unlink-panels
                align="right"
                v-model="ctime"
                @change='cTime'
                value-format="timestamp">
            </el-date-picker>
            </el-form-item>     
            <el-form-item class="fr">       
         <el-button type="primary"  plain  @click="getdata_search()" :size="btnsize" icon="el-icon-search">查询</el-button> 
         <el-button type="primary"  plain  @click="clearSearch" :size="btnsize" icon="fontFamily aflc-icon-qingkong">清空</el-button>
          </el-form-item>   
          </el-form>
            <div class="classify_info">
            <div class="btns_box">
             <el-button  type="primary" plain icon="el-icon-download" :size="btnsize" disabled>导出Excel</el-button>
            </div> 
            <div class="info_news">
            <el-table ref="multipleTable" style="width: 100%" stripe border height="100%" highlight-current-row :data="tableDataTree" id="out-table" >
              <el-table-column label="序号" width="60">
                            <template slot-scope="scope">
                             {{ (page - 1)*pagesize + scope.$index + 1 }}
                            </template>
            </el-table-column> 
            <!-- <el-table-column  label="订单号" prop="orderSerial" sortable width="230">
             <template  slot-scope="scope">
            <span class="BtnInfo" @click="pushOrderSerial(scope.row)">{{scope.row.orderSerial}}</span >
            </template>
            </el-table-column> -->
            <el-table-column  label="货主账号" prop="shipAccount" sortable width=""></el-table-column> 
            <el-table-column  label="货主姓名" prop="shipName" sortable width=""></el-table-column> 
            <el-table-column  label="货主公司名称" prop="companyName" sortable width=""></el-table-column>                       
            <el-table-column  label="发货地" prop="" sortable width="">
            <template slot-scope="scope">
                   {{scope.row.startProvince}}{{scope.row.startCity}}{{scope.row.startArea}}
            </template>
            </el-table-column> 
            <el-table-column  label="发货街道" prop="startStreet" sortable width=""></el-table-column> 
            <el-table-column  label="收货地" prop="" sortable width="">
            <template slot-scope="scope">
                   {{scope.row.endProvince}}{{scope.row.endCity}}{{scope.row.endArea}}
            </template>
            </el-table-column> 
            <el-table-column  label="收货街道" prop="endStreet" sortable width=""></el-table-column> 
            <el-table-column  label="下单时间" prop="createTime" sortable width="">
            <template slot-scope="scope">
                   {{scope.row.createTime|parseTime}}
            </template>
            </el-table-column>     
            </el-table>
    <div class="info_tab_footer">共计:{{ dataTotal }} <div class="show_pager"> <Pager :total="dataTotal" @change="handlePageChange"  :sizes="sizes" ref="pager"/></div> </div>
             </div>
    </div>
 </div>   
  
</template>

<script>
import { parseTime,pickerOptions2 } from '@/utils/index.js'
import Pager from '@/components/Pagination/index'
import { aflcLclUnAgencyOrderList } from '@/api/order/logistics/logistics.js'

export default {
    data(){
        return{
            loading:true,
            btnsize: 'mini',
            pickerOptions2:{shortcuts:pickerOptions2},
            tableDataTree:[],
            dataTotal:null,
            sizes:[20,50,100],
            pagesize:20,//每页显示数
            page:1,//当前页
            ctime:[],
            formAllData:{
                startTime:null,
                endTime:null,
            },
        }
    },
    components:{
        Pager
    },
    methods:{
            // 列表
            firstblood(){
              aflcLclUnAgencyOrderList(this.page,this.pagesize,this.formAllData).then(res=>{
                    this.dataTotal = res.data.totalCount
                    this.tableDataTree = res.data.list;
              })
            },
            // 页码改变
            handlePageChange(obj) {
                this.page = obj.pageNum
                this.pagesize = obj.pageSize
                this.firstblood()
            },
            cTime(i){
            if(i){
            this.formAllData.startTime = i[0]
            this.formAllData.endTime = i[1]
            }
            else{
            this.formAllData.startTime = null
            this.formAllData.endTime = null
            }
            },
            // 查询
            getdata_search(){
            this.page = 1;
            this.$refs.pager.inputval = this.page;
            this.$refs.pager.pageNum = this.page;
            this.firstblood();
            },
            // 清空
            clearSearch(){
                this.ctime = []
                this.formAllData = {
                    startTime:null,
                    endTime:null
                }
                if(this.page!= 1){
                    this.page = 1;
                    this.$refs.pager.inputval = this.page;
                    this.$refs.pager.pageNum = this.page;
                }
                this.firstblood();
            },            
            pushOrderSerial(val){
                 this.$router.push({name: '发物流订单详情',query:{ orderSerial:val.orderSerial}});
            }      
    },
    mounted(){
        this.firstblood();
    }
}
</script>

<style lang="scss">
</style>

