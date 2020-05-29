<template>
    <div class="identicalStyle allCompnent" v-loading="loading">
        <el-form  :inline="true" :model="listSystemObj.vo" ref="ruleForm" class="demo-ruleForm classify_searchinfo">
            <el-form-item label="中转单状态" prop="waybillStatus">
                <el-select v-model="listSystemObj.vo.waybillStatus" clearable placeholder="请选择">
                    <el-option
                    v-for="item in optionsCarriersWaybill"
                    :key="item.name"
                    :label="item.name"
                    :value="item.code">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="专线承运商" prop="carrierName">
                <el-input v-model="listSystemObj.vo.carrierName" clearable></el-input>
            </el-form-item>
            <el-form-item label="区代" prop="agencyName">
                <el-input v-model="listSystemObj.vo.agencyName" clearable></el-input>
            </el-form-item>
            <el-form-item label="区代物流公司" prop="agencyCompanyName">
                <el-input v-model="listSystemObj.vo.agencyCompanyName" clearable></el-input>
            </el-form-item>
            <el-form-item label="到货地" prop="endAddress">
                <el-input v-model="listSystemObj.vo.endAddress" clearable></el-input>
            </el-form-item>
            <el-form-item label="区代运单号" prop="waybillNo">
                <el-input v-model="listSystemObj.vo.waybillNo" clearable></el-input>
            </el-form-item>
            <el-form-item label="中转订单号" prop="outsourceId">
                <el-input v-model="listSystemObj.vo.outsourceId" clearable></el-input>
            </el-form-item>
            <el-form-item class="btnChoose fr"  style="margin-left:0;">
                <el-button type="primary" icon="el-icon-search" plain :size="btnsize" @click="handleSearch('search')">搜索</el-button>
                <el-button type="info" icon="fontFamily aflc-icon-qingkong" :size="btnsize" plain @click="handleSearch('clear')">清空</el-button>
            </el-form-item>
        </el-form>
        <div class="classify_info">
            <div class="btns_box">
                <el-button type="primary" icon="el-icon-download" plain @click="handleClick('export')" :size="btnsize">导出Excel</el-button>
            </div>
            <div class="info_news">
                <el-table
                    ref="multipleTable"
                    :data="tableData"
                    stripe
                    border
                    align = "center"
                    height="100%"
                    tooltip-effect="dark"
                    style="width: 100%">
                    <el-table-column label="序号" width="60">
                        <template slot-scope="scope">
                            {{ (listSystemObj.currentPage - 1)*listSystemObj.pageSize + scope.$index + 1 }}
                        </template>
                    </el-table-column> 
                    <el-table-column
                        sortable
                        label="专线运单号"
                        prop="waybillNo"
                        :show-overflow-tooltip="true"
                        min-width="250">
                        <template  slot-scope="scope">
                            <h4 class="needMoreInfo" @click="handleClick('details',scope.row)">{{ scope.row.waybillNo}}</h4>
                        </template>
                    </el-table-column>
                     <el-table-column
                        prop="outsourceId"
                        sortable
                        label="平台中转单号"
                        min-width="250">
                    </el-table-column>
                    <el-table-column
                        :show-overflow-tooltip="true"
                        prop="carrierName"
                        sortable
                        label="专线承运商"
                        min-width="200"
                        >
                    </el-table-column>
                    <el-table-column
                        prop="carrierServiceMobile"
                        sortable
                        min-width="180"
                        label="专线承运商客服电话"
                        >
                    </el-table-column>
                    <el-table-column
                        :show-overflow-tooltip="true"
                        prop="agencyName"
                        sortable
                        min-width="150"
                        label="区代"
                        >
                    </el-table-column>
                    <el-table-column
                        prop="agencyCompanyName"
                        sortable
                        min-width="200"
                        label="区代物流公司"
                        >
                    </el-table-column>
                    <el-table-column
                        prop="agencyMobile"
                        sortable
                        min-width="150"
                        label="区代客服电话"
                        >
                    </el-table-column>
                    <el-table-column
                        prop="waybillStatusName"
                        sortable
                        min-width="150"
                        label="运单状态"
                        >
                    </el-table-column>
                    <el-table-column
                        :show-overflow-tooltip="true"
                        prop="endAddress"
                        sortable
                        min-width="200"
                        label="收货地"
                        >
                    </el-table-column>
                    <el-table-column
                        prop="goodsTypeName"
                        sortable
                        min-width="150"
                        label="货物名称"
                        >
                    </el-table-column>
                    <el-table-column
                        prop="goodsVolume"
                        sortable
                        min-width="150"
                        label="体积(立方)"
                        >
                    </el-table-column>
                    <el-table-column
                        prop="goodsWeight"
                        sortable
                        min-width="150"
                        label="重量(公斤)"
                        >
                    </el-table-column>
                    <el-table-column
                        prop="goodsNum"
                        sortable
                        min-width="150"
                        label="件数"
                        >
                    </el-table-column>
                    <el-table-column
                        prop="totalAmount"
                        sortable
                        min-width="150"
                        label="运费总金额(元)"
                        >
                    </el-table-column>
                    <el-table-column
                        prop="payTimeType"
                        sortable
                        min-width="150"
                        label="付款方式"
                        >
                        <template slot-scope="scope">
                            {{ scope.row.payTimeType == '1'?'现付':'到付'}}
                        </template>
                    </el-table-column>
                    <el-table-column
                        prop="rebates"
                        sortable
                        min-width="150"
                        label="回扣"
                        >
                    </el-table-column>
                    <el-table-column
                        prop="receiveTime"
                        sortable
                        label="揽收时间"
                        min-width="160">
                    </el-table-column>
                     <el-table-column
                        prop="expectArriveTime"
                        sortable
                        label="预计到达日期"
                        min-width="160">
                    </el-table-column>
                     <el-table-column
                        prop="carDispatchTime"
                        sortable
                        label="发车时间"
                        min-width="160">
                    </el-table-column>
                     <el-table-column
                        prop="actualArriveTime"
                        sortable
                        label="到达时间"
                        min-width="160">
                    </el-table-column>
                     <el-table-column
                        prop="signTime"
                        sortable
                        label="签收时间"
                        min-width="160">
                    </el-table-column>
                </el-table>
            </div>
        </div>
        <!-- 页码 -->
        <div class="info_tab_footer">共计:{{ dataTotal }} <div class="show_pager"> <Pager :total="dataTotal" @change="handlePageChange" ref="pager"/></div> </div>    
    </div>
</template>

<script type="text/javascript">
import { carriersWaybillAllList,exportCarriersWaybillExcel } from '@/api/order/logistics/logistics1.js'
import { WaybilllType } from '@/api/common.js'
import Pager from '@/components/Pagination/index'
import { parseTime } from '@/utils/index';

export default{
    name:'allCompnent',
    props: {
        isvisible: {
            type: Boolean,
            default: false
        }
    },
    components: {
        Pager,
    },
    data() {
        return {
            btnsize: 'mini',
            loading: false, // 加载
            dataTotal: 0,
            listSystemObj:{
                "currentPage": 1,
                "pageSize": 20,
                "vo": {
                    "agencyCompanyName": "",//区代物流公司
                    "agencyName": "",//区代
                    "carrierName": "",//专线承运商
                    "endAddress": "",//收货地
                    "outsourceId": "",//中转订单号
                    "waybillNo": "",//区代运单号
                    waybillStatus:'',//运单状态字典
                }
            },
            tableData: [],
            optionsCarriersWaybill:[{
                name:'全部',
                code:""
            }],
        }
    },
    watch: {
        isvisible: {
            handler(newVal, oldVal) {
                if (newVal) {
                    this.firstblood()
                } 
            },
            // 代表在wacth里声明了firstName这个方法之后立即先去执行handler方法
            immediate: true
        }
    },
    mounted() {
        this.init();
    },
    methods: {
        init(){
            WaybilllType().then(res => {
                this.optionsCarriersWaybill = this.optionsCarriersWaybill.concat(res.data);
            })
        },
        handlePageChange(obj) {
            this.listSystemObj.currentPage = obj.pageNum;
            this.listSystemObj.pageSize = obj.pageSize;
            this.firstblood();
        },
        // 刷新页面
        firstblood() {
            this.loading = true
            carriersWaybillAllList(this.listSystemObj).then(res => {
                this.tableData = res.data.list;
                this.dataTotal = res.data.total;
                this.loading = false;
            }).catch(err => {
                this.loading = false;
                this.$message({
                    type: 'info',
                    message: '操作失败，原因：' + (err.errorInfo ? err.errorInfo : err.text)
                })
            })
        },
        // 模糊查询 分类名称或者code
        handleSearch(type) {
            if(type == 'clear'){
                this.listSystemObj.vo ={
                    "agencyCompanyName": "",//区代物流公司
                    "agencyName": "",//区代
                    "carrierName": "",//专线承运商
                    "endAddress": "",//收货地
                    "outsourceId": "",//中转订单号
                    "waybillNo": "",//区代运单号
                    waybillStatus:'',//运单状态字典
                }
            }
            if(this.listSystemObj.currentPage!= 1){
                this.listSystemObj.currentPage = 1;
                this.$refs.pager.inputval = this.listSystemObj.currentPage;
                this.$refs.pager.pageNum = this.listSystemObj.currentPage;
            }
            this.firstblood();
        },
        handleClick(type,row){
            switch (type) {
                case 'export':
                    var timestamp = (new Date()).getTime();
                    this.$message.info('正在导出中...');    
                    exportCarriersWaybillExcel(this.listSystemObj.vo).then(res => {
                        var blob = new Blob([res]);
                        let href =  window.URL.createObjectURL(blob);
                        var NewDom = document.createElement("a");
                        NewDom.setAttribute('href',href);
                        NewDom.setAttribute('target', '_blank');
                        NewDom.setAttribute('download', '发物流-专线运单管理-全部-'+parseTime(timestamp)+'.xlsx');
                        document.body.appendChild(NewDom);
                        NewDom.click();
                        document.body.removeChild(NewDom)
                    })
                    // .catch(err => {
                    //     this.$message({
                    //         type: 'info',
                    //         message: '操作失败，原因：' + (err.errorInfo ? err.errorInfo : err.text)
                    //     })
                    // })
                    break;
                case 'details':
                    this.$router.push({name: '发物流订单详情',query:{ orderSerial:row.orderSerial}});
                    break;
            }
        },
    }
}
</script>

<style type="text/css" lang="scss" scoped>
    .allCompnent{
    }
</style>
