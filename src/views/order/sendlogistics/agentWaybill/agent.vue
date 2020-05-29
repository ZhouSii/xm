<template>
    <div class="identicalStyle agentCompnent" v-loading="loading">
        <el-form  :inline="true" :model="listSystemObj.vo" ref="ruleForm" class="demo-ruleForm classify_searchinfo">
            <el-form-item label="运单状态" prop="waybillStatus">
                <el-select v-model="listSystemObj.vo.waybillStatus" clearable placeholder="请选择">
                    <el-option
                    v-for="item in optionsCarriersWaybill"
                    :key="item.name"
                    :label="item.name"
                    :value="item.code">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="区代" prop="agencyName">
                <el-input v-model="listSystemObj.vo.agencyName" clearable></el-input>
            </el-form-item>
            <el-form-item label="区代物流公司" prop="agencyCompanyName">
                <el-input v-model="listSystemObj.vo.agencyCompanyName" clearable></el-input>
            </el-form-item>
            <el-form-item label="发货地" prop="startProvinceCityArea">
                <el-input v-model="listSystemObj.vo.startProvinceCityArea" clearable></el-input>
            </el-form-item>
            <el-form-item label="到货地" prop="endProvinceCityArea">
                <el-input v-model="listSystemObj.vo.endProvinceCityArea" clearable></el-input>
            </el-form-item>
            <el-form-item label="货主" prop="shipperMobileOrName">
                <el-input v-model="listSystemObj.vo.shipperMobileOrName" clearable></el-input>
            </el-form-item>
             <el-form-item label="平台订单号" prop="orderSerial">
                <el-input v-model="listSystemObj.vo.orderSerial" clearable></el-input>
            </el-form-item>
            <el-form-item label="区代运单号" prop="waybillNo">
                <el-input v-model="listSystemObj.vo.waybillNo" clearable></el-input>
            </el-form-item>
            <el-form-item class="btnChoose fr"  style="margin-left:0;">
                <el-button type="primary" icon="el-icon-search" plain :size="btnsize" @click="handleSearch('search')">搜索</el-button>
                <el-button type="info" icon="fontFamily aflc-icon-qingkong" :size="btnsize" plain @click="handleSearch('clear')">清空</el-button>
            </el-form-item>
        </el-form>
        <div class="classify_info">
            <div class="btns_box">
                <el-button type="primary" plain @click="handleClick('depart')" :size="btnsize">代区代操作发车</el-button>
                <el-button type="primary" plain @click="handleClick('arrive')" :size="btnsize">代区代操作到达</el-button>
                <el-button type="primary" plain @click="handleClick('sign')" :size="btnsize">代区代操作签收</el-button>
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
                    @selection-change="getSelection" 
                    style="width: 100%">
                    <el-table-column
                        label="选择"
                        type="selection"
                        width="50">
                    </el-table-column>
                    <el-table-column label="序号" width="60">
                        <template slot-scope="scope">
                            {{ (listSystemObj.currentPage - 1)*listSystemObj.pageSize + scope.$index + 1 }}
                        </template>
                    </el-table-column> 
                    <el-table-column
                        sortable
                        label="区代运单号"
                        prop="waybillNo"
                        :show-overflow-tooltip="true"
                        min-width="250">
                        <template  slot-scope="scope">
                            <h4 class="needMoreInfo" @click="handleClick('details',scope.row)">{{ scope.row.waybillNo}}</h4>
                        </template>
                    </el-table-column>
                     <el-table-column
                        prop="orderSerial"
                        sortable
                        label="平台订单号"
                        min-width="250">
                    </el-table-column>
                    <el-table-column
                        prop="agencyName"
                        sortable
                        label="区代"
                        min-width="150"
                        >
                    </el-table-column>
                    <el-table-column
                        prop="expressName"
                        sortable
                        min-width="150"
                        label="走货渠道"
                        >
                    </el-table-column>
                    <el-table-column
                        prop="courier100SubscribeStateName"
                        sortable
                        min-width="180"
                        label="快递100订阅状态"
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
                        prop="isTransitName"
                        sortable
                        min-width="180"
                        label="是否已平台中转"
                        >
                    </el-table-column>
                    <el-table-column
                        prop="carriersCompanyName"
                        sortable
                        min-width="200"
                        label="中转专线承运商"
                        >
                    </el-table-column>
                    <el-table-column
                        prop="shipperMobile"
                        sortable
                        min-width="150"
                        label="货主账号"
                        >
                    </el-table-column>
                    <el-table-column
                        prop="shipperName"
                        sortable
                        min-width="150"
                        label="货主姓名"
                        >
                    </el-table-column>
                    <el-table-column
                        prop="startProvinceCityArea"
                        sortable
                        min-width="200"
                        label="发货地"
                        >
                    </el-table-column>
                    <el-table-column
                        prop="endProvinceCityArea"
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
                        prop="payTimeTypeName"
                        sortable
                        min-width="150"
                        label="付款方式"
                        >
                        <!-- <template slot-scope="scope">
                            {{ scope.row.payTimeType == '1'?'现付':'到付'}}
                        </template> -->
                    </el-table-column>
                    <el-table-column
                        prop="createWaybillTime"
                        sortable
                        label="揽收时间"
                        min-width="160">
                        <template slot-scope="scope">
                            {{scope.row.createWaybillTime|parseTime}}
                        </template>
                    </el-table-column>
                     <el-table-column
                        prop="expectArriveTime"
                        sortable
                        label="预计到达日期"
                        min-width="160">
                        <template slot-scope="scope">
                            {{scope.row.expectArriveTime|parseTime('{y}-{m}-{d}')}}
                        </template>
                    </el-table-column>
                     <el-table-column
                        prop="mainLineCarDispatchTime"
                        sortable
                        label="发车时间"
                        min-width="160">
                        <template slot-scope="scope">
                            {{scope.row.mainLineCarDispatchTime|parseTime}}
                        </template>
                    </el-table-column>
                     <el-table-column
                        prop="mainLineCarArriveTime"
                        sortable
                        label="到达时间"
                        min-width="160">
                        <template slot-scope="scope">
                            {{scope.row.mainLineCarArriveTime|parseTime}}
                        </template>
                    </el-table-column>
                </el-table>
            </div>
        </div>
        <!-- 页码 -->
        <div class="info_tab_footer">共计:{{ dataTotal }} <div class="show_pager"> <Pager :total="dataTotal" @change="handlePageChange" ref="pager"/></div> </div>    
    </div>
</template>

<script type="text/javascript">
import { agentWaybillList,mainLineCarArrive,mainLineCarDispatch,waybillSign } from '@/api/order/logistics/logistics1.js'
// import { WaybilllType } from '@/api/common.js'
import Pager from '@/components/Pagination/index'
import { parseTime } from '@/utils/index';

export default{
    name:'agentCompnent',
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
                    "agencyCompanyName": "",//区代物流公司名称
                    "agencyMobile": "",//区代客服电话
                    "agencyName": "",//区代名称
                    "carriersCompanyName": "",//中转专线承运商
                    "endProvinceCityArea": "",//收货地
                    "isTransit": "",//是否中转(1：是；0:否)
                    "orderSerial": "",//订单流水号
                    "payStatus": "",//支付状态
                    "payTimeType": "",//付款方式(0，收货时付款(到付)，1，发货时付款(现付))
                    "shipperMobileOrName": "",//货主账号/姓名
                    "startProvinceCityArea": "",//发货地
                    "statusQueryType": "2",//运单状态查询类型（1:全部列表；2：代区代操作列表；3：待货主支付运费列表）
                    "waybillNo": "",//运单号
                    "waybillStatus": ""//运单状态
                }
            },
            tableData: [],
            optionsCarriersWaybill:[{
                name:'全部',
                code:""
            },{
                name:'已揽货',
                code:"AF071080301"
            },{
                name:'运输中',
                code:"AF071080302"
            },{
                name:'已到达',
                code:"AF071080303"
            },{
                name:'派送中',
                code:"AF071080304"
            }],
            selected:[],
            dto : {
                operateType: '1',//操作类型（1：代区代操作；2：代专线操作）
                waybillIdList:[],//运单id列表
            }
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
        },
        handlePageChange(obj) {
            this.listSystemObj.currentPage = obj.pageNum;
            this.listSystemObj.pageSize = obj.pageSize;
            this.firstblood();
        },
        // 刷新页面
        firstblood() {
            this.loading = true
            agentWaybillList(this.listSystemObj).then(res => {
                this.tableData = res.data.list;
                this.dataTotal = res.data.totalCount;
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
                    "agencyCompanyName": "",//区代物流公司名称
                    "agencyMobile": "",//区代客服电话
                    "agencyName": "",//区代名称
                    "carriersCompanyName": "",//中转专线承运商
                    "endProvinceCityArea": "",//收货地
                    "isTransit": "",//是否中转(1：是；0:否)
                    "orderSerial": "",//订单流水号
                    "payStatus": "",//支付状态
                    "payTimeType": "",//付款方式(0，收货时付款(到付)，1，发货时付款(现付))
                    "shipperMobileOrName": "",//货主账号/姓名
                    "startProvinceCityArea": "",//发货地
                    "statusQueryType": "2",//运单状态查询类型（1:全部列表；2：代区代操作列表；3：待货主支付运费列表）
                    "waybillNo": "",//运单号
                    "waybillStatus": ""//运单状态
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
            if(this.selected.length != 0 ||  type == 'details'){
                switch (type) {
                    case 'details':
                        this.$router.push({name: '发物流订单详情',query:{ orderSerial:row.orderSerial}});
                        break;
                    case 'depart':
                        this.dto.waybillIdList = [];
                        this.selected.forEach(el => {
                            this.dto.waybillIdList.push(el.id)
                        })
                        mainLineCarDispatch(this.dto).then(res => {
                            this.$message({
                                type: 'success',
                                message: '代区代操作发车成功！'
                            })
                            this.firstblood();
                        }).catch(err => {
                            this.$message({
                                type: 'error',
                                message: '操作失败，原因：' + (err.errorInfo ? err.errorInfo : err.text)
                            })
                        })
                        break;
                    case 'arrive':
                        this.dto.waybillIdList = [];
                        this.selected.forEach(el => {
                            this.dto.waybillIdList.push(el.id)
                        })
                        mainLineCarArrive(this.dto).then(res => {
                            this.$message({
                                type: 'success',
                                message: '代区代操作到达成功！'
                            })
                            this.firstblood();
                        }).catch(err => {
                            this.$message({
                                type: 'error',
                                message: '操作失败，原因：' + (err.errorInfo ? err.errorInfo : err.text)
                            })
                        })
                        break;
                    case 'sign':
                        this.dto.waybillIdList = [];
                        this.selected.forEach(el => {
                            this.dto.waybillIdList.push(el.id)
                        })
                        waybillSign(this.dto).then(res => {
                            this.$message({
                                type: 'success',
                                message: '代区代操作签收成功！'
                            })
                            this.firstblood();
                        }).catch(err => {
                            this.$message({
                                type: 'error',
                                message: '操作失败，原因：' + (err.errorInfo ? err.errorInfo : err.text)
                            })
                        })
                        
                        break;
                }
            }else{
                this.$message({
                    type: 'warning',
                    message: type == 'depart' ? '请选择代区代操作发车的运单。' : (type == 'arrive' ? '请选择代区代操作到达的运单。' :'请选择代区代操作签收的运单。')
                });
            }
            // 清除选中状态，避免影响下个操作
            // this.$refs.multipleTable.clearSelection();
        },
        // 判断选中与否
        getSelection(val){
            // console.log('选中内容',val)
            this.selected = val;
        },
    }
}
</script>

<style type="text/css" lang="scss" scoped>
    .agentCompnent{
    }
</style>
