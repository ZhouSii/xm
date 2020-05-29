<template>
    <div class="identicalStyle evaluationTotal" style="height:100%">
          <el-form :inline="true" class="demo-ruleForm classify_searchinfo">
            <el-form-item label="区域">
                 <GetCityList ref="area"  @returnStr="getStr" v-model="areaName"></GetCityList>
            </el-form-item> 
            <el-form-item label="下单时间">
                    <el-date-picker
                        is-range
                        unlink-panels
                        :picker-options="pickerOptions2"
                        type="daterange"
                        align="center"
                        v-model="ctime"
                        range-separator="-"
                        start-placeholder="开始时间"
                        end-placeholder="结束时间"
                        placeholder="选择时间范围"
                        value-format="yyyy-MM-dd HH:mm:ss"
                        :default-time="['00:00:00', '23:59:59']"
                        @change='cTime'
                        >
                    </el-date-picker>
            </el-form-item>
            <el-form-item label="货主">
                <el-input v-model.trim="formData.shipper" clearable placeholder="请输入货主"></el-input>
            </el-form-item>     
            <el-form-item label="车主">
                <el-input v-model.trim="formData.driver" clearable placeholder="请输入车主"></el-input>
            </el-form-item>
            <el-form-item label="订单号">
               <el-input v-model.trim="formData.orderSerial" clearable placeholder="请输入订单号"></el-input>
            </el-form-item>               
            <el-form-item class="fr">       
          <el-button type="primary" plain @click="getData_query" :size="btnsize" icon="el-icon-search">搜索</el-button> 
          <el-button type="info" plain @click="clearSearch"  :size="btnsize" icon="fontFamily aflc-icon-qingkong">清空</el-button>
          </el-form-item>
          </el-form>
          	<div class="classify_info">
            <div class="info_news">    
            <el-table ref="multipleTable" style="width: 100%" stripe border height="99%" :data="tableDataAll" v-has:DISPATCH_CHECK_MANEGE_SMALL_CAR_CHECK_ALL_LIST>
           <el-table-column label="序号" sortable  width="80">
                            <template slot-scope="scope">
                             {{ (page - 1)*pagesize + scope.$index + 1 }}
                            </template>
            </el-table-column> 
            <el-table-column  label="订单号" prop="orderSerial" sortable width="250">
             <template  slot-scope="scope">
            <span class="BtnInfo" @click="pushOrderSerial(scope.row)">{{scope.row.orderSerial}}</span >
            </template>
            </el-table-column>
            <el-table-column  label="所属区域" prop="areaCodeName" show-overflow-tooltip sortable width="150">
            </el-table-column>                                                 
            <el-table-column  label="下单时间" prop="orderTime" sortable width="180">
            </el-table-column>
            <el-table-column  label="所需车型" prop="carTypeName" sortable width="120">
            </el-table-column>        
            <el-table-column  label="综合评分" prop="comprehensiveRating" sortable width="120">
            </el-table-column>  
            <el-table-column  label="考核项分类" prop="parentAppraisalItemsName" sortable width="150">
            </el-table-column>  
            <el-table-column  label="考核项" prop="appraisalItemsName" sortable width="150">
            </el-table-column>  
            <el-table-column  label="达标" prop="standards" sortable width="120">
            </el-table-column>  
            <el-table-column  label="实际" prop="actual" sortable width="120">
            </el-table-column>    
            <el-table-column  label="差异值" prop="differenceValue" sortable width="130">
            </el-table-column> 
            <el-table-column  label="考核项配分" prop="assessItemPoints" sortable width="130">
            </el-table-column> 
            <el-table-column  label="评估值" prop="evaluateValues" sortable width="150">
            </el-table-column> 
            <el-table-column  label="单项评分" prop="indiviReting" sortable>
            </el-table-column> 
            <el-table-column  label="货主" prop="shipper" sortable width="200" show-overflow-tooltip>
            <template  slot-scope="scope">
            <span>{{scope.row.shipperMobile}}</span> - <span>{{scope.row.shipperName}}</span >
            </template>    
            </el-table-column>             
            <el-table-column  label="货主归属业务员" prop="shipperBelongSalesmanName" sortable width="150" show-overflow-tooltip>
            </el-table-column>
            <el-table-column  label="车主" prop="driver" sortable width="350" show-overflow-tooltip>
            <template  slot-scope="scope">
            <span>{{scope.row.driverMobile}}</span> - <span>{{scope.row.driverName}}</span > - <span>{{scope.row.carNumber}}</span > - <span>{{scope.row.carTypeName}}</span >
            </template>    
            </el-table-column> 
            <el-table-column  label="车主归属业务员" prop="driverBelongSalesmanName" sortable width="150" show-overflow-tooltip>
            </el-table-column> 
            <el-table-column  label="提货地" prop="startAddress" sortable width="150" show-overflow-tooltip>
            </el-table-column> 
            <el-table-column  label="目的地" prop="endAddress" sortable width="150" show-overflow-tooltip>
            </el-table-column>                                                 
            </el-table> 
                <!-- 页码 -->
        <div class="info_tab_footer">共计:{{ dataTotal }} <div class="show_pager"> <Pager :total="dataTotal" @change="handlePageChange"  :sizes="sizes" ref="pager"/></div> </div>
        	</div> 
          </div>
  </div>
</template>

<script>
import GetCityList from '@/components/GetCityList/city'
import {parseTime,pickerOptions2} from '@/utils/'
import Pager from '@/components/Pagination/index'
import { aflcAssessmentSum_list } from '@/api/dispatch/evaluation.js'
export default {
    data(){
        return{
            btnsize:'mini',
            pickerOptions2: {
            shortcuts: pickerOptions2
            },
            ctime:[],
            tableDataAll:[],
            dataTotal:null,
            sizes:[20,50,100],
            pagesize:20,//每页显示数
            page:1,//当前页
            areaName:null,
            formData:{
             areacode:null,
             orderTimeEnd:null,
             orderTimeStart:null,
             shipper:null,
             driver:null,
             orderSerial:null,
            }
    }
    },
    components:{
        GetCityList,
        Pager
    },
    methods:{
    firstblood(){
      aflcAssessmentSum_list(this.page,this.pagesize,this.formData).then(res => {
        this.dataTotal = res.data.totalCount
        this.tableDataAll = res.data.list
        this.tableDataAll.forEach(item => {
            item.orderTime = parseTime(item.orderTime,"{y}-{m}-{d} {h}:{i}:{s}");
        })
      })
    },    
    getStr(val){
    this.formData.areacode = val.area.code;
    }, 
    handlePageChange(obj){
    this.page = obj.pageNum
    this.pagesize = obj.pageSize
    this.firstblood()
    },
    cTime(i){
     this.formData.orderTimeStart = i[0]
     this.formData.orderTimeEnd = i[1]
    },
    getData_query(){
    this.page = 1;
    this.$refs.pager.inputval = this.page;
    this.$refs.pager.pageNum = this.page;        
    this.firstblood();
    },
    clearSearch(){
            this.formData = {
             areacode:null,
             orderTimeEnd:null,
             orderTimeStart:null,
             shipper:null,
             driver:null,
             orderSerial:null,
            }
            this.areaName=null
            this.ctime=[]
            if(this.page!= 1){
                this.page = 1;
                this.$refs.pager.inputval = this.page;
                this.$refs.pager.pageNum = this.page;
            }
            this.$refs.area.clearData();
            this.firstblood()
    },
    pushOrderSerial(val){
            this.$router.push({name: '订单详情',query:{ orderSerial:val.orderSerial}});
    }
    },
    mounted(){
    this.firstblood()
    },
}
</script>
<style lang="scss">
.evaluationTotal{
    .BtnInfo{
    font-weight: bold;
    font-size: 14px;
    color: #3e9ff1;
    cursor: pointer;
    }

}
 
</style>
