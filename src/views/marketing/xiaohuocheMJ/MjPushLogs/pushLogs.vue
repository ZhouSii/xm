<template>
<div class="detailsCompnent MJDpushlogs" style="height:100%" v-loading="loading">
    <div class="detailsInfo detailsArrange" style="height:100%">
        <!-- 基本信息 -->
        <div class="detailsInfo-collapse collapseInfo">
            <h2>马甲单推送详情</h2>
            <div class="essentialInformation">
                <el-row class="basicInfo" :span='24'>
                    <!-- 第一行 -->
                    <el-col :span="4">推单时间</el-col>
                    <el-col :span="4">{{MJlogsData.createTime}}</el-col>
                    <el-col :span="4">服务类型</el-col>
                    <el-col :span="4">{{MJlogsData.serivceCodeName}}</el-col>
                    <el-col :span="4">区域</el-col>
                    <el-col :span="4">{{MJlogsData.areaName}}</el-col>
                    <!-- 第二行 -->
                    <el-col :span="4">推送片区</el-col>
                    <el-col :span="4">{{MJlogsData.districtName}}</el-col>
                    <el-col :span="4">推送车主认证状态</el-col>
                    <el-col :span="4">{{MJlogsData.authStateName}}</el-col>
                    <el-col :span="4">推送车主活跃度</el-col>
                    <el-col :span="4">{{MJlogsData.livenessName}}</el-col>
                    <!-- 第三行 -->
                    <el-col :span="4">推送车型</el-col>
                    <el-col :span="4">{{MJlogsData.carTypeName}}</el-col>
                    <el-col :span="4">推送车主在线状态</el-col>
                    <el-col :span="4">{{MJlogsData.isLineName}}</el-col>
                    <el-col :span="4">出发地</el-col>
                    <el-col :span="4">{{MJlogsData.startAddressName}}</el-col>
                    <!-- 第四行 -->
                    <el-col :span="4">目的地</el-col>
                    <el-col :span="4">{{MJlogsData.endAddressName}}</el-col>
                    <el-col :span="4">里程</el-col>
                    <el-col :span="4">{{MJlogsData.mileage}}</el-col>
                    <el-col :span="4">订单价格</el-col>
                    <el-col :span="4">{{MJlogsData.totalAmount}}</el-col>
                    <!-- 第四行 -->
                    <el-col :span="4">推送车主数量</el-col>
                    <el-col :span="4">{{MJlogsData.pushDriverCout}}</el-col>
                    <el-col :span="4">抢单车主数量</el-col>
                    <el-col :span="4">{{MJlogsData.grobDriverCount}}</el-col>
                </el-row>
            </div>
        </div>

        <!-- 修改日志 -->
        <div class="logInfo-collapse collapseInfo" style="height:52%">
            <h2>推送车辆</h2>
            <div class="essentialInformation_table" style="height:100%">
                <el-table
                    :data="tableDataTree"
                    border
                    height="100%"
                    style="width: 100%">
                    <el-table-column label="序号" sortable  width="80">
                    <template slot-scope="scope">
                    {{ (page - 1)*pagesize + scope.$index + 1 }}
                    </template>
                    </el-table-column>
                    <el-table-column
                    label="用户"
                    width="220" prop="driverName" show-overflow-tooltip>
                    <template slot-scope="scope">
                        <span v-if="!scope.row.driverName">{{scope.row.driverMobile}}</span>
                        <span v-else>{{scope.row.driverName}}-{{scope.row.driverMobile}}</span>
                    </template>
                    </el-table-column>
                    <el-table-column
                    label="车辆信息" prop="carTypeName">
                    </el-table-column>
                    <el-table-column
                    label="距离提货地(M)" prop="driverDistance" show-overflow-tooltip>
                    </el-table-column>
                    <el-table-column
                    label="当前地址" prop="driverAddress" show-overflow-tooltip>
                        <template slot-scope="scope">
                            {{scope.row.driverAddress == 'null'? '' : scope.row.driverAddress}}
                        </template>
                    </el-table-column>                    
                    <el-table-column
                    label="用户认证状态" prop="driverStatusName">
                    </el-table-column>
                    <el-table-column
                    label="用户账户状态" prop="accountStatusName">
                    </el-table-column>
                    <el-table-column
                    label="是否抢入" prop="isGrabName">
                    </el-table-column>                    
                </el-table>
      <!-- 页码 -->
        <div class="info_tab_footer">共计:{{ dataTotal }} <div class="show_pager"> <Pager :total="dataTotal" @change="handlePageChange"  :sizes="sizes"/></div> </div> 
            </div>
        </div>
    </div>
</div>
</template>

<script>

import { parseTime } from '@/utils/index.js'
import Pager from '@/components/Pagination/index'
import  { data_get_MjPushLogs_list,data_get_RecordList_list} from '@/api/vest/MjPushLogs/MjPushLogs.js'
export default {
  name: 'detailsInfo',
  components: {
      Pager
  },
  props: {
    isvisible: {
        type: Boolean,
        default: false
      }

  }, 
  data() {
    return {
        loading:true,
        sizes: [10, 50, 100],
        pagesize:10,//每页显示数
        page:1,//当前页
        dataTotal:null,//总记录数
        tableDataTree:[],//定义列表记录
        dialogVisible: false,
        currentOrderSerial: '',
        formAll:{
        orderSerial:null,
        },
        MJlogsData:{
            createTime:null,
            serivceCode:null,
            areaName:null,
            districtName:null,
            authStateName:null,
            liveness:null,
            carType:null,
            isLineName:null,
            startAddressName:null,
            endAddressName:null,
            mileage:null,
            totalAmount:null,
            pushDriverCout:null,
            grobDriverCount:null
        },
      }
  },
    watch: {
    },
     mounted() {
      this.formAll.orderSerial = this.$route.query.orderSerial
      this.firstblood();
      this.firstblood2();
    },
    methods: {
            //刷新页面  
            firstblood(){
                this.loading = true
                data_get_MjPushLogs_list(1,10,this.formAll).then(res => {
                    this.MJlogsData=res.data.list[0]
                    this.loading = false
                })
            },
            //刷新页面  
            firstblood2(){
                data_get_RecordList_list(this.page,this.pagesize,this.formAll).then(res => {
                    this.dataTotal = res.data.totalCount
                    this.tableDataTree = res.data.list;
                })
            },
    // 每页显示数据量变更
    handlePageChange(obj) {
            this.page = obj.pageNum
            this.pagesize = obj.pageSize
            this.firstblood2()
            },
    }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.MJDpushlogs{
 .detailsArrange{
    .collapseInfo h2{
        padding: 18px 0 18px 0;
 } 
}
.collapseInfo{
 .essentialInformation {
    padding: 20px 0 0 0;
}
}
    .el-col{height: 45px;}
}

</style>
