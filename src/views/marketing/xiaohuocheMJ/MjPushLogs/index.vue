<template>
    <div class="identicalStyle Mypushlogs" style="height:100%" v-loading="loading">
          <el-form :inline="true"  class="demo-ruleForm classify_searchinfo">
                <el-form-item label="订单号" >
                   <el-input v-model="formAll.orderSerial"></el-input>
                 </el-form-item>
                  <el-form-item label="出发地" >
                   <el-input v-model="formAll.startAddressName" class="StartareaName"></el-input>
                 </el-form-item>
                  <el-form-item label="推送车主活跃度">
                    <el-select v-model="formAll.liveness" placeholder="请选择" clearable>
                        <el-option
                            v-for="item in activeTypeList"
                            :key="item.code"
                            :label="item.name"
                            :value="item.code"
                            :disabled="item.disabled"
                            >
                        </el-option>
                    </el-select>
                </el-form-item>
                  <el-form-item label="推送车型">
                    <el-select v-model="formAll.carType" placeholder="请选择" clearable>
                        <el-option
                            v-for="item in pushTypeList"
                            :key="item.code"
                            :label="item.name"
                            :value="item.code"
                            :disabled="item.disabled"
                            >
                        </el-option>
                    </el-select>
                </el-form-item>
                  <el-form-item label="车主在线状态">
                    <el-select v-model="formAll.isLine" placeholder="请选择" clearable>
                        <el-option
                            v-for="item in isLineList"
                            :key="item.code"
                            :label="item.name"
                            :value="item.code"
                            :disabled="item.disabled"
                            >
                        </el-option>
                    </el-select>
                </el-form-item>                


         <el-form-item class="fr">
         <el-button type="primary"  plain  @click="getdata_search()" :size="btnsize" icon="el-icon-search">查询</el-button> 
         <el-button type="primary"  plain  @click="clearSearch" :size="btnsize" icon="fontFamily aflc-icon-qingkong">清空</el-button>
         </el-form-item>
           </el-form> 
  <div class="classify_info">
    <div class="info_news">  
    <el-table  ref="multipleTable" style="width: 100%" stripe border height="100%" @selection-change="getSelection" @row-click="clickDetails" highlight-current-row :data="tableDataTree">
           <el-table-column label="序号"  width="60">
                            <template slot-scope="scope">
                             {{ (page - 1)*pagesize + scope.$index + 1 }}
                            </template>
            </el-table-column> 
   <el-table-column  label="订单号"  sortable prop="orderSerial" width="250">
   <template slot-scope="scope">
   <span class="BtnInfo" @click="pushOrderSerial(scope.row)">{{scope.row.orderSerial}}</span >
   </template>
   </el-table-column>
   <el-table-column  label="推送时间"  sortable prop="createTime" width="170"></el-table-column>
   <el-table-column  label="服务类型"  sortable prop="serivceCodeName" width="150"></el-table-column>
   <el-table-column  label="区域"  sortable prop="areaName" width="150"></el-table-column>
   <el-table-column  label="推送片区"  sortable prop="districtName" width="150"></el-table-column>
   <el-table-column  label="推送车主认证状态"  sortable prop="authStateName" width="150"></el-table-column>
   <el-table-column  label="推送车主活跃度"  sortable prop="livenessName" width="150"></el-table-column>
   <el-table-column  label="推送车型"  sortable prop="carTypeName" width="150"></el-table-column>
   <el-table-column  label="推送车主在线状态"  sortable prop="isLineName" width="150"></el-table-column>
   <el-table-column  label="出发地"  sortable prop="startAddressName" width="200" show-overflow-tooltip></el-table-column>
   <el-table-column  label="目的地"  sortable prop="endAddressName" width="200" show-overflow-tooltip></el-table-column>
   <el-table-column  label="里程"  sortable prop="mileage" width="150"></el-table-column>
   <el-table-column  label="订单价格"  sortable prop="totalAmount" width="150"></el-table-column>
   <!-- <el-table-column  label="推送车主数量"  sortable prop="pushDriverCout" width="150"></el-table-column>  -->
  </el-table>
    </div>
      <!-- 页码 -->
        <div class="info_tab_footer">共计:{{ dataTotal }} <div class="show_pager"> <Pager :total="dataTotal" @change="handlePageChange"  :sizes="sizes" ref="pager"/></div> </div> 
   </div>
   <div>
   </div>
  </div>
</template>

<script>
import { data_ServerClassList} from '@/api/server/areaPrice.js'
import { parseTime,formatTime } from '@/utils/index.js'
import  { data_get_MjPushLogs_list,data_get_car_activeType,data_get_car_pushType} from '@/api/vest/MjPushLogs/MjPushLogs.js'
import Pager from '@/components/Pagination/index'
import { eventBus } from '@/eventBus'
export default {
    data(){
        return{
        loading:true,    
        btnsize:'mini',
        selectRowData:{},
        sizes: [20, 50, 100, 400],
        pagesize:20,//每页显示数
        page:1,//当前页
        dataTotal:null,//总记录数
        tableDataTree:[],//定义列表记录
        formAll:{
            orderSerial:null,
            startAddressName:null,
            liveness:null,
            carType:null,
            isLine:null,
        },
        activeTypeList:[],
        pushTypeList:[],
        isLineList:[
            {
                code:'0',
                name:'离线',
            },
            {
                code:'1',
                name:'在线',
            }
        ]
        }

    },
    components:{
        Pager
    },
    mounted(){
    this.firstblood();
    this.getMoreInformation();
     },  
     methods:{
            //获取车主活跃度列表
            getMoreInformation(){
                data_get_car_activeType().then(res=>{
                    res.data.map((item)=>{
                    this.activeTypeList=res.data;
                    })
                })
                // 车主推送车辆
                data_get_car_pushType().then(res=>{
                    this.pushTypeList = res.data;
                })
            },
            //刷新页面  
            firstblood(){
                this.loading = true
                data_get_MjPushLogs_list(this.page,this.pagesize,this.formAll).then(res => {
                    this.dataTotal = res.data.totalCount
                    this.tableDataTree = res.data.list;
                    this.loading = false
                })
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
            // 进入详情
            pushOrderSerial(val){
              this.$router.push({name: '推送记录详情',query:{ orderSerial:val.orderSerial}});
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
                this.formAll = {
                    orderSerial:null,
                    startAddressName:null,
                    liveness:null,
                    carType:null,
                    isLine:null,
                }
                if(this.page!= 1){
                    this.page = 1;
                    this.$refs.pager.inputval = this.page;
                    this.$refs.pager.pageNum = this.page;
                }
                this.firstblood();
            },
            // 每页显示数据量变更
            handlePageChange(obj) {
            this.page = obj.pageNum
            this.pagesize = obj.pageSize
            this.firstblood()
            },
            getDataList(){
                this.firstblood()
                this.$refs.multipleTable.clearSelection();
            }
     }
}
</script>

<style lang="scss">
.Mypushlogs{
    .BtnInfo{
    font-weight: bold;
    font-size: 14px;
    color: #3e9ff1;
    cursor: pointer;
    }   
    .StartareaName{
        width: 190px!important;
    }
}

</style>
