<template>
 <div class="identicalStyle transactionCar" style="height:100%" v-loading="loading">
          <el-form :inline="true"  class="demo-ruleForm classify_searchinfo">
            <el-form-item label="发货地">
            <el-input placeholder="请输入内容" clearable v-model="formAllData.startProvinceCityArea"></el-input>
            </el-form-item>
            <el-form-item label="到货地">
            <el-input placeholder="请输入内容" clearable v-model="formAllData.endProvinceCityArea"></el-input>
            </el-form-item>
            <el-form-item label="货主">
            <el-input placeholder="请输入内容" clearable v-model="formAllData.shipperMobileOrName"></el-input>
            </el-form-item>
            <el-form-item label="物流公司">
            <el-input placeholder="请输入内容" clearable v-model="formAllData.agencyCompanyName"></el-input>
            </el-form-item>
            <el-form-item label="下单日期">
                 <el-date-picker
                    v-model="CreaseTime"
                    type="daterange"
                    range-separator="-"
                    start-placeholder="开始日期"
                    end-placeholder="结束日期"
                    unlink-panels
                    align="right"
                    @change='cTime'
                    :default-time="['00:00:00', '23:59:59']"
                    clearable
                    >
                    </el-date-picker>
            </el-form-item>  
            <el-form-item label="订单号">
            <el-input placeholder="请输入内容" clearable v-model="formAllData.orderSerial"></el-input>
            </el-form-item>
            <el-form-item class="fr">
          <el-button type="primary" plain :size="btnsize" @click="getData_query" icon="el-icon-search">搜索</el-button> 
          <el-button type="info"  plain @click="clearSearch" :size="btnsize" icon="fontFamily aflc-icon-qingkong">清空</el-button>
          </el-form-item>
          </el-form>                                         
          	<div class="classify_info">
                <div class="btns_box">
                <el-button  type="primary" plain icon="el-icon-download" @click="importExcel" :size="btnsize">导出Excel</el-button>
                </div>
            <div class="info_news">    
            <el-table style="width: 100%" stripe border ref="multipleTable" height="98%" highlight-current-row  tooltip-effect="dark" :data="tableDataTree">
           <el-table-column label="序号" sortable  width="60">
                            <template slot-scope="scope">
                             {{ (page - 1)*pagesize + scope.$index + 1 }}
                            </template>
            </el-table-column>
            <el-table-column  label="订单号" prop="orderSerial" sortable show-overflow-tooltip width="250">
             <template  slot-scope="scope">
            <span class="BtnInfo" @click="pushOrderSerial(scope.row)">{{scope.row.orderSerial}}</span >
            </template>
            </el-table-column>
            <el-table-column  label="货主账号" prop="shipperMobile" sortable show-overflow-tooltip width="120"></el-table-column>
            <el-table-column  label="货主姓名" prop="shipperName" sortable show-overflow-tooltip width="120"></el-table-column>
            <el-table-column  label="发货地" prop="startProvinceCityArea" sortable show-overflow-tooltip width="150"></el-table-column>
            <el-table-column  label="收货地" prop="endProvinceCityArea" sortable show-overflow-tooltip width="150"></el-table-column>
            <el-table-column  label="区代" prop="agencyAddress" sortable show-overflow-tooltip width="120"></el-table-column>
            <el-table-column  label="区代物流公司" prop="agencyCompanyName" sortable show-overflow-tooltip width="120"></el-table-column>
            <el-table-column  label="区代客服电话" prop="agencyMobile" sortable show-overflow-tooltip width="120"></el-table-column>
            <el-table-column  label="货物名称" prop="goodsTypeName" sortable show-overflow-tooltip width="120"></el-table-column>
            <el-table-column  label="体积" prop="goodsVolume" sortable show-overflow-tooltip width="100"></el-table-column>
            <el-table-column  label="重量" prop="goodsWeight" sortable show-overflow-tooltip width="100"></el-table-column>
            <el-table-column  label="件数" prop="goodsNum" sortable show-overflow-tooltip width="100"></el-table-column>
            <el-table-column  label="下单时间" prop="useTime" sortable show-overflow-tooltip width="180"></el-table-column>
            </el-table> 
        	</div> 
         <!-- 页码 -->
                 <div class="info_tab_footer">共计:{{ dataTotal }} <div class="show_pager"> <Pager :total="dataTotal" @change="handlePageChange"  :sizes="sizes" ref="pager"/></div> </div> 
          </div>
      </div>
</template>

<script>
import { parseTime,pickerOptions2 } from '@/utils/index.js'
import Pager from '@/components/Pagination/index'
import { findWaitFollowList,exportWaitFollowExcel } from '@/api/order/logistics/logistics.js'
export default {
    name:'overtimeOrder',
    props: {
    statusObject:{
        type:Object,
    },
    isvisible: {
        type: Boolean,
        default: false
      }
    }, 
    data(){
        return{
            loading:false,
            btnsize: 'mini',
            pickerOptions2:{shortcuts:pickerOptions2},
            tableDataTree:[],
            dataTotal:null,
            sizes:[20,50,100],
            pagesize:20,//每页显示数
            page:1,//当前页
            CreaseTime:[],
            formAllData:{
            startProvinceCityArea:null,
            endProvinceCityArea:null,
            shipperMobileOrName:null,
            agencyCompanyName:null,
            orderStatus:this.statusObject.type,
            startUseTime:null,
            endUseTime:null,
            orderSerial:null,
            }
        }
    },
    components:{
        Pager
    },
    methods:{
    //加载
    firstblood(){
        findWaitFollowList(this.page,this.pagesize,this.formAllData).then(res=>{
                    this.dataTotal = res.data.totalCount
                    this.tableDataTree = res.data.list;
                    this.tableDataTree.forEach(item => {
                    item.useTime = parseTime(item.useTime,"{y}-{m}-{d} {h}:{i}:{s}");
                    })
              })    
    },
    //下单时间
    cTime(i){
        if(i){
            this.formAllData.startUseTime = i[0];
            this.formAllData.endUseTime = i[1];
        }else{  
            this.formAllData.startUseTime = '';
            this.formAllData.endUseTime = '';
        }
    },
    // 搜索
    getData_query(){
    this.page = 1;
    this.$refs.pager.inputval = this.page;
    this.$refs.pager.pageNum = this.page;
    this.firstblood()
    },
    // 清空
    clearSearch(){
    this.formAllData={
            startProvinceCityArea:null,
            endProvinceCityArea:null,
            shipperMobileOrName:null,
            agencyCompanyName:null,
            orderStatus:this.statusObject.type,
            startUseTime:null,
            endUseTime:null,
            orderSerial:null,
    }
    this.CreaseTime = []    
    if(this.page!= 1){
        this.page = 1;
        this.$refs.pager.inputval = this.page;
        this.$refs.pager.pageNum = this.page;
    }
    this.firstblood()
    },
    // 页码改变
    handlePageChange(obj) {
    this.page = obj.pageNum
    this.pagesize = obj.pageSize
    this.firstblood()
    },
    //excle导出
    importExcel(){
            exportWaitFollowExcel(this.formAllData).then(res=>{
                var blob = new Blob([res]);
                this.href =  window.URL.createObjectURL(blob);
                var NewDom = document.createElement("a");
                NewDom.setAttribute('href', this.href);
                NewDom.setAttribute('target', '_blank');
                NewDom.setAttribute('download',  this.statusObject.label + '.xls');
                document.body.appendChild(NewDom);
                NewDom.click();
                document.body.removeChild(NewDom)
            })
    },
    // 进入详情
    pushOrderSerial(val){
        this.$router.push({name: '发物流订单详情',query:{ orderSerial:val.orderSerial}});
    },
    },
    watch: {
        isvisible: {
            handler(newVal, oldVal) {
                if (newVal) {
                    this.firstblood()
                }
            },
            immediate: true
        },
    },
}
</script>
