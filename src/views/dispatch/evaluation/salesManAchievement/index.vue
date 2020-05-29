<template>
    <div class="identicalStyle Marketing" style="height:100%" v-loading="loading">
          <el-form :inline="true"  class="demo-ruleForm classify_searchinfo">
            <el-form-item label="所属区域">
               <GetCityList ref="area" v-model="areaName"  @returnStr="getStr"></GetCityList>
            </el-form-item>
            <el-form-item label="业务组">
              <el-input v-model="formAllData.businessName"></el-input>
            </el-form-item>
            <el-form-item label="业务员信息">
              <el-input v-model="formAllData.salesmanName"></el-input>
            </el-form-item>
            <el-form-item label="任务目标时间">
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
          <el-button type="primary" plain @click="getData_query" :size="btnsize" icon="el-icon-search">搜索</el-button> 
           <el-button type="info" plain @click="clearSearch"  :size="btnsize" icon="fontFamily aflc-icon-qingkong">清空</el-button>
          </el-form-item>
          </el-form>
          	<div class="classify_info">
            	<div class="btns_box">
                   <addAchievement
                    btntext="新增"
                    :plain="true"
                    type="primary" 
                    btntype="primary"
                    icon="el-icon-circle-plus"
                    editType="add"
                    @getData="getDataList"
                    btntitle="创建">
                    </addAchievement>
                   <addAchievement
                    btntext="修改"
                    :plain="true"
                    type="primary" 
                    btntype="primary"
                    icon="el-icon-edit"
                    editType="edit"
                    @getData="getDataList"
                    btntitle="修改"
                    :params="selectRowData">
                    </addAchievement>
                <el-button type="primary" plain icon="el-icon-delete" @click="delete_data" :size="btnsize" v-has:MARKETING_DRIVER_MANAGE_ORDER_NUM_REWARD_DELETE>删除</el-button>
            	</div>
            <div class="info_news">    
               <el-table style="width: 100%" ref="multipleTable" stripe border height="100%" @selection-change="getSelection" @row-click="clickDetails" highlight-current-row :data="tableDataAll"  >
                <el-table-column
                            label="选择"
                            type="selection"
                            width="50">
              </el-table-column>
           <el-table-column label="序号"  width="60">
                            <template slot-scope="scope">
                             {{ (page - 1)*pagesize + scope.$index + 1 }}
                            </template>
            </el-table-column> 
            <el-table-column  label="所属区域" prop="" sortable width='150' show-overflow-tooltip>
                <template slot-scope="scope">
                    {{scope.row.province}}{{scope.row.city}}{{scope.row.area}}
                </template> 
            </el-table-column>
            <el-table-column  label="业务组" prop="businessName" sortable width='150' show-overflow-tooltip></el-table-column>         
            <el-table-column  label="姓名/手机号码" prop="" sortable width='170' show-overflow-tooltip>
                <template slot-scope="scope">
                    {{scope.row.salesmanName}}/{{scope.row.salesmanPhone}}
                </template>            
            </el-table-column>
            <el-table-column  label="任务目标时间范围" prop="" sortable width="320" show-overflow-tooltip>
                <template slot-scope="scope">
                    {{scope.row.taskStartTime}}至{{scope.row.taskEndTime}}
                </template>
            </el-table-column>
            <el-table-column  label="每周">
            <el-table-column  label="发展货主数量" prop="weekDevelShipperNum"  width="140" ></el-table-column>
            <el-table-column  label="发展车主数量" prop="weekDevelDriverNum"  width="140"></el-table-column>
            <el-table-column  label="发展物流公司数量" prop="weekDevelLogiscompanyNum"  width="140"></el-table-column>
            <el-table-column  label="发展区代数量" prop="weekDevelDistrictNum"  width="140"></el-table-column>                            
            </el-table-column>
            <el-table-column  label="每月" sortable>
            <el-table-column  label="发展货主数量" prop="monthDevelShipperNum" sortable width="140"></el-table-column>
            <el-table-column  label="发展车主数量" prop="monthDevelDriverNum" sortable width="140"></el-table-column>
            <el-table-column  label="发展物流公司数量" prop="monthDevelLogiscompanyNum" sortable width="140" ></el-table-column>
            <el-table-column  label="发展区代数量" prop="monthDevelDistrictNum" sortable width="140"></el-table-column>  
            </el-table-column>
            </el-table> 
                <!-- 页码 -->
       <div class="info_tab_footer">共计:{{ dataTotal }} <div class="show_pager"> <Pager :total="dataTotal" @change="handlePageChange"  :sizes="sizes" ref="pager"/></div> </div>  
        	</div> 
          </div>
      </div>
</template>
<script>
import {aflcSalesmanAimsSettingList,aflcSalesmanAimsSettingDelete} from '@/api/dispatch/salesManAchievement.js'
import addAchievement from './addAchievement'
import GetCityList from '@/components/GetCityList/city'
import { eventBus } from '@/eventBus'
import Pager from '@/components/Pagination/index'
import {parseTime,pickerOptions2} from '@/utils/'
export default {
  data(){
    return{
      pickerOptions2:{shortcuts:pickerOptions2},
      loading:false,
      btnsize:'mini',  
      selectRowData:{},
      sizes:[20,50,100],
      pagesize:20,//每页显示数
      page:1,//当前页
      totalCount:null,
      dataTotal:null,
      tableDataAll:[],
      createTime:null,
      areaName:null,
      formAllData:{
           areaCode:null,
           businessName:null,
           salesmanName:null,
           taskStartTime:null,
           taskEndTime:null,
       },
    }
  },
    components:{
        Pager,
        GetCityList,
        addAchievement
    },
    methods:{
        // 城市地区
        getStr(val){
        this.formAllData.areaCode = val.area.code
        this.areaName = val.province.name + val.city.name + val.area.name
        },
        getMoreInformation(){
          },
          // 列表刷新页面  
        firstblood(){
            this.loading = true                       
            aflcSalesmanAimsSettingList(this.page,this.pagesize,this.formAllData).then(res => {
                    this.dataTotal = res.data.totalCount
                    this.tableDataAll = res.data.list;
                    this.tableDataAll.forEach(item => {
                        item.taskStartTime = parseTime(item.taskStartTime,"{y}-{m}-{d}");
                        item.taskEndTime = parseTime(item.taskEndTime,"{y}-{m}-{d}");
                    })
                    this.loading = false
                })
        },


        // 任务目标时间    
        cTime(i){
            if(i!==null){
            this.formAllData.taskStartTime = i[0]
            this.formAllData.taskEndTime = i[1]
            }
            else{
            this.formAllData.taskStartTime = null
            this.formAllData.taskEndTime = null
            }
        },
         //  查询
        getData_query(){
          this.page = 1;
          this.$refs.pager.inputval = this.page;
          this.$refs.pager.pageNum = this.page;             
          this.firstblood();
        },
        // 清空
        clearSearch(){
        this.formAllData =  {
           areaCode:null,
           businessName:null,
           salesmanName:null,
           taskStartTime:null,
           taskEndTime:null
        }
        this.areaName = null
        this.createTime = null
       if(this.page!= 1){
        this.page = 1;
        this.$refs.pager.inputval = this.page;
        this.$refs.pager.pageNum = this.page;
        }
        this.$refs.area.clearData();
        this.firstblood()    
        },

        // 判断选中与否
        getSelection(val){
        console.log('选中内容',val)
        this.selectRowData = val;
        },
        //点击选中当前行
        clickDetails(row, event, column){
        this.$refs.multipleTable.toggleRowSelection(row);
        },
        //每页显示数据量变更
            handlePageChange(obj) {
                this.page = obj.pageNum
                this.pagesize = obj.pageSize
                this.firstblood();
        },
        // 选择删除
        delete_data(){
          if(this.selectRowData.length == 0){
               this.$message.warning('请选择您要操作的数据');
               return
          }else if (this.selectRowData.length > 1) {
                this.$message({
                    message: '每次只能操作单条数据~',
                    type: 'warning'
                })
               this.$refs.multipleTable.clearSelection();
          }else {
                this.delDataInformation()
            }
        },
       //确认删除
            delDataInformation(){         
                   this.$confirm('确定要删除吗？', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(()=>{
                    aflcSalesmanAimsSettingDelete(this.selectRowData[0].id).then(res=>{
                        this.$message.success('删除成功');
                        this.firstblood();       
                        this.selectRowData=''; 
                    }).catch(err => {
                        this.$message({
                            type: 'info',
                            message: '操作失败，原因：' + err.text ? err.text : err
                        })
                    })
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消'
                    })
                })   
            },
           getDataList(){
                this.firstblood()
                this.$refs.multipleTable.clearSelection();
    }
   },
  mounted(){
    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth()+1;
    var yyyy = today.getFullYear();
    var hour = today.getHours();
    var minutes = today.getMinutes() ;
    var seconds = today.getSeconds();
    if(dd<10) {
    dd='0'+dd
    }
    if(mm<10) {
    mm='0'+mm
    }
    if(hour<10) {
    hour='0'+hour
    }
    if(minutes<10) {
    minutes='0'+minutes
    }
    if(seconds<10) {
    seconds='0'+seconds
    }
    var currentdate = 'IMG_Web'+yyyy + mm + dd + hour + minutes + seconds +
    console.log('data',currentdate)
    eventBus.$on('pushListtwo', () => {
    this.firstblood()
    })
    this.getMoreInformation();
    this.firstblood();
    },
}
</script>
<style lang="scss" >
.salesManAchievement{
  .el-cascader{
    margin-top:-10px;
  }
}
</style>