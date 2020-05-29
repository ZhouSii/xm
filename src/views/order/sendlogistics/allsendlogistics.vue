<template>
 <div class="identicalStyle sendlogistics" style="height:100%" >
          <el-form :inline="true"  class="demo-ruleForm classify_searchinfo">
            <el-form-item label='订单号'>
             <el-input v-model.trim="formAllData.orderSerial"></el-input>
            </el-form-item>
            <el-form-item label="货主">
              <el-input  v-model.trim="formAllData.shipperMobileOrName"></el-input>
            </el-form-item>   
            <el-form-item label="物流公司">
             <el-input v-model.trim="formAllData.lgCompanyMobileOrName"></el-input>
            </el-form-item>   
            <el-form-item label="付款状态">
                  <el-select clearable placeholder="请选择" v-model="formAllData.payStatus">
                          <el-option
                              v-for="item in paymentList"
                               :key="item.code"
                               :label="item.name"
                               :value="item.code"
                               >
                         </el-option>
                 </el-select>
            </el-form-item>
            <el-form-item label="下单时间">
            <el-date-picker
                type="daterange"
                :picker-options="pickerOptions2"
                range-separator="-"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
                unlink-panels
                align="right"
                v-model="ctime"
                :default-time="['00:00:00', '23:59:59']"
                @change='cTime'
                value-format="timestamp">
            </el-date-picker>
            </el-form-item>   
            <el-form-item label="订单来源">
                 <el-select clearable placeholder="请选择" v-model="formAllData.orderFrom">
                          <el-option
                              v-for="item in orderSerialList"
                               :key="item.code"
                               :label="item.name"
                               :value="item.code"
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
            <div class="btns_box">
             <el-button  type="primary" plain icon="el-icon-download" @click="importExcel" :size="btnsize" v-has:ORDER_LTL_ORDER_ALL_EXPORT_EXCEL>导出Excel</el-button>
            </div> 
            <div class="info_news">
            <el-table ref="multipleTable" style="width: 100%" stripe border height="100%" highlight-current-row :data="tableDataTree" id="out-table" @selection-change="getSelection" @row-click="clickDetails">
              <el-table-column
                            label="选择"
                            type="selection"
                            width="50">
              </el-table-column>
              <el-table-column label="序号" sortable  width="60">
                            <template slot-scope="scope">
                             {{ (page - 1)*pagesize + scope.$index + 1 }}
                            </template>
            </el-table-column> 
            <el-table-column  label="订单号" prop="orderSerial" sortable width="230">
             <template  slot-scope="scope">
            <span class="BtnInfo" @click="pushOrderSerial(scope.row)">{{scope.row.orderSerial}}</span >
            </template>
            </el-table-column>
            <el-table-column  label="订单状态" prop="orderStatusName" sortable width="160">
            </el-table-column>
            <el-table-column  label="货主" prop="shipperName" sortable show-overflow-tooltip width="120">
            </el-table-column>           
            <el-table-column  label="物流公司" prop="companyName" sortable show-overflow-tooltip>
            </el-table-column>           
            <el-table-column  label="货物名称" prop="goodsName" sortable show-overflow-tooltip >
            </el-table-column>           
            <el-table-column  label="运费总额" prop="totalAmount" sortable width="100">
            </el-table-column>   
            <el-table-column  label="付款状态" prop="payStatusName" sortable width="100">
            </el-table-column>                            
            <el-table-column  label="提货地" prop="viaAddressName1" sortable show-overflow-tooltip>
            </el-table-column>                                                           
            <el-table-column  label="目的地" prop="viaAddressName2" sortable show-overflow-tooltip>
            </el-table-column>  
            <el-table-column  label="下单时间" prop="useTime" sortable width="180">
            </el-table-column>   
            <el-table-column  label="订单来源" prop="orderFromName" sortable width="100" show-overflow-tooltip>
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
import {orderSerialFun,findFCLOrderInfoList,paymentFun} from '@/api/order/logistics/logistics.js'
import FileSaver from 'file-saver'
import XLSX from 'xlsx'
import { SaveAsFile } from '@/utils/lodopFuncs'
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
            orderSerialList:[],
            ctime:[],
            paymentList:[],
            selectRowData: {},
            formAllData:{
                orderSerial:null,
                lgCompanyMobileOrName:null,
                payStatus:null,
                shipperMobileOrName:null,
                startUseTime:null,
                endUseTime:null,
                orderFrom:null,
                orderDataType:'2'
            },
            tableColumn:[{
                    'label': '序号',
                    'prop': '',
                },{
                    'label': '订单号',
                    'prop': 'orderSerial',
                },{
                    'label': '订单状态',
                    'prop': 'orderStatusName',
                },{
                    'label': '货主',
                    'prop': 'shipperName',
                },{
                    'label': '物流公司',
                    'prop': 'companyName',
                },{
                    'label': '货物名称',
                    'prop': 'goodsName',
                },{
                    'label': '运费总额',
                    'prop': 'totalAmount',
                },{
                    'label': '付款状态',
                    'prop': 'payStatusName',
                },{
                    'label': '提货地',
                    'prop': 'viaAddressName1',
                },{
                    'label': '目的地',
                    'prop': 'viaAddressName2',
                },
                {
                    'label': '下单时间',
                    'prop': 'useTime',
                },
                {
                    'label': '订单来源',
                    'prop': 'orderFromName',
                }]             
        }
    },
    components:{
        Pager
    },
    methods:{
            // 列表
            firstblood(){
              findFCLOrderInfoList(this.page,this.pagesize,this.formAllData).then(res=>{
                    this.dataTotal = res.data.totalCount
                    this.tableDataTree = res.data.list;
                     this.tableDataTree.forEach(item => {
                        item.useTime = parseTime(item.useTime,"{y}-{m}-{d} {h}:{i}:{s}");
                        if(item.orderAddressList.length>0){
                        item.viaAddressName1= item.orderAddressList[0].viaAddressName
                        item.viaAddressName2= item.orderAddressList[1].viaAddressName     
                        }
                        else{
                        item.viaAddressName1 = null
                        item.viaAddressName2 = null
                        } 
                    })
              })
            },
            // 页码改变
            handlePageChange(obj) {
                this.page = obj.pageNum
                this.pagesize = obj.pageSize
                this.firstblood()
            },
            getMoreInformation(){
            orderSerialFun().then(res=>{
                this.orderSerialList = res.data
            })
            paymentFun().then(res=>{
            this.paymentList = res.data
            })                      
            },
            cTime(i){
            this.formAllData.startUseTime = i[0]/1000
            this.formAllData.endUseTime = i[1]/1000
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
                orderSerial:null,
                lgCompanyMobileOrName:null,
                payStatus:null,
                shipperMobileOrName:null,
                startUseTime:null,
                endUseTime:null,
                orderFrom:null,
                orderDataType:'2'
                }
                if(this.page!= 1){
                    this.page = 1;
                    this.$refs.pager.inputval = this.page;
                    this.$refs.pager.pageNum = this.page;
                }
                this.firstblood();
            },            
            // 判断选中与否
            getSelection(val) {
            console.log('选中内容', val)
            this.selectRowData = val
            },
            // 点击选中当前行
            clickDetails(row, event, column) {
            this.$refs.multipleTable.toggleRowSelection(row)
            },
            importExcel(){
                if(this.selectRowData.length>0){
                    SaveAsFile({
                        data: this.selectRowData ? this.selectRowData : [],
                        columns: this.tableColumn,
                        name: '订单管理-' + parseTime(new Date(), '{y}{m}{d}{h}{i}{s}')
                    })
                    this.$refs.multipleTable.clearSelection()
                }else{
                    SaveAsFile({
                        data: this.tableDataTree ? this.tableDataTree : [],
                        columns: this.tableColumn,
                        name: '订单管理-' + parseTime(new Date(), '{y}{m}{d}{h}{i}{s}')
                    })
                }
            },  
            pushOrderSerial(val){
                 this.$router.push({name: '发物流订单详情',query:{ orderSerial:val.orderSerial}});
            }      
    },
    mounted(){
        this.getMoreInformation();
        this.firstblood();
    }
}
</script>

<style lang="scss">
.sendlogistics{
    .BtnInfo{
    font-weight: bold;
    font-size: 14px;
    color: #3e9ff1;
    cursor: pointer;
    }  
    .el-form-item{
    &:nth-of-type(1){
        label{
            text-indent: 13px;
        }
    }
    }
}
</style>

