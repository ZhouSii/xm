<template>
 <div style="height:100%;" class="identicalStyle " v-loading="loading">
    <el-form :inline="true"  class="demo-ruleForm classify_searchinfo">
        <el-form-item label="发货地" prop="totalArea">
            <el-input v-model.trim="formData.totalArea"></el-input>
        </el-form-item>
        <el-form-item  label="区代运单号" prop="orderSerial">
            <el-input v-model.trim="formData.orderSerial"></el-input>
        </el-form-item>
        <el-form-item  label="区代" prop="companyName">
            <el-input v-model.trim="formData.companyName"></el-input>
        </el-form-item>
        <!-- <el-form-item  label="下单时间" prop="createTime">
            <el-date-picker
            v-model="createTime"
            type="daterange"
            unlink-panels
            :picker-options="pickerOptions2"
            range-separator="-"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            :default-time="['00:00:00', '23:59:59']"
            @change='cTime'>
            </el-date-picker>
        </el-form-item> -->
        <el-form-item  label="区代运单变更未处理" prop="agencyException" v-if="status.name=='one'||status.name=='two'">
            <el-select v-model="formData.agencyException" clearable placeholder="请选择" >
                <el-option
                v-for="item in replaceunusualList"
                :key="item.code"
                :label="item.name"
                :value="item.code">
                </el-option>
            </el-select>
        </el-form-item>
        <el-form-item  label="平台专线中转" prop="ifPlatform">
            <el-select v-model="formData.ifPlatform" clearable placeholder="请选择" >
                <el-option
                v-for="item in transferList"
                :key="item.code"
                :label="item.name"
                :value="item.code">
                </el-option>
            </el-select>
        </el-form-item>
        <el-form-item  label="专线承运商" prop="carrierName">
            <el-input v-model.trim="formData.carrierName"></el-input>
        </el-form-item>
        <!-- <el-form-item  label="中转时间" prop="createTime2" v-if="status.name=='one'||status.name=='two'||status.name=='three'">
            <el-date-picker
            v-model="createTime2"
            type="daterange"
            unlink-panels
            :picker-options="pickerOptions2"
            range-separator="-"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            :default-time="['00:00:00', '23:59:59']"
            @change='cTime2'>
            </el-date-picker>
        </el-form-item> -->
        <el-form-item  label="专线运单变更未处理" prop="carrierException" v-if="status.name=='one'||status.name=='two'">
            <el-select v-model="formData.carrierException" clearable placeholder="请选择" >
                <el-option
                    v-for="item in CarrierunusualList"
                    :key="item.code"
                    :label="item.name"
                    :value="item.code">
                </el-option>
            </el-select>
        </el-form-item>
        <!-- <el-form-item  label="投诉处理状态" v-if="status.name=='one'||status.name=='two'||status.name=='five'">
            <el-select v-model="formData.name" clearable placeholder="请选择" >
                <el-option
                    v-for="item in appealList"
                    :key="item.code"
                    :label="item.name"
                    :value="item.code">
                </el-option>
                </el-select>
        </el-form-item> -->
        <!-- <el-form-item  label="货损处理状态" v-if="status.name=='one'||status.name=='two'||status.name=='five'">
            <el-select v-model="formData.name" clearable placeholder="请选择" >
                <el-option
                    v-for="item in cargoDamageList"
                    :key="item.code"
                    :label="item.name"
                    :value="item.code">
                </el-option>
            </el-select>
        </el-form-item> -->
        <!-- <el-form-item  label="异常处理状态" v-if="status.name=='one'||status.name=='two'||status.name=='five'">
            <el-select v-model="formData.name" clearable placeholder="请选择" >
                <el-option
                    v-for="item in unusualList"
                    :key="item.code"
                    :label="item.name"
                    :value="item.code">
                </el-option>
            </el-select>
        </el-form-item> -->
        <!-- <el-form-item  label="审查状态" prop="orderSerial" v-if="status.name=='one'||status.name=='two'||status.name=='five'">
            <el-select v-model="formData.name" clearable placeholder="请选择" >
                <el-option
                    v-for="item in optionsOrderEx"
                    :key="item.code"
                    :label="item.name"
                    :value="item.code">
                </el-option>
            </el-select>
        </el-form-item> -->
        <el-form-item  label="审核状态" v-if="status.name=='one'" prop="examineCode">
            <el-select v-model="formData.examineCode" clearable placeholder="请选择" >
                <el-option
                    v-for="item in optionsAuditStatus"
                    :key="item.code"
                    :label="item.name"
                    :value="item.code">
                </el-option>
            </el-select>
        </el-form-item>
    <el-form-item class="fr">
        <el-button type="primary" plain @click="getdata_search"  size="mini" icon="el-icon-search">搜索</el-button>
        <el-button type="info" plain  @click="clearSearch"  size="mini" icon="fontFamily aflc-icon-qingkong">清空</el-button>
    </el-form-item>
    </el-form>
    <div class="classify_info">
        <div class="btns_box" v-if="status.name=='two'||status.name=='three'||status.name=='five'">
            <el-button type="primary" icon="el-icon-check" plain size="mini" v-if="status.name=='two' || status.name=='five'" @click="handleClick('going')">审核通过</el-button>
            <!-- <el-button type="primary" icon="el-icon-edit-outline" plain size="mini" v-if="status.name=='two'" @click="handleClick('ex')">审查订单</el-button> -->
            <!-- <el-button type="primary" icon="el-icon-circle-plus" plain size="mini" v-if="status.name=='two'">处理投诉</el-button> -->
            <!-- <el-button type="primary" icon="el-icon-circle-plus" plain size="mini" v-if="status.name=='two'">处理货损</el-button> -->
            <!-- <el-button type="primary" icon="el-icon-circle-plus" plain size="mini" v-if="status.name=='two'">处理异常</el-button> -->
            <el-button type="primary" icon="el-icon-document-checked" plain size="mini" v-if="status.name=='three'" @click="handleClick('recheck')">订单复审</el-button>
        </div>
        <div class="info_news" >
            <el-table border height="100%" style="width: 100%" @row-click="clickDetails" :data="tableData" :ref="'multipleTable'+status.name" highlight-current-row current-row-key>
                <el-table-column label="选择" width="60" align="center" v-if="status.name=='two' || status.name=='three' || status.name=='five'">
                    <template slot-scope="scope">
                        <el-radio class="radio"  v-model="radio"  :label="scope.row.orderSerial">&nbsp;</el-radio>
                    </template>
                </el-table-column> 
                <el-table-column label="序号" width="60">
                    <template slot-scope="scope">
                        {{ (page - 1)*pagesize + scope.$index + 1 }}
                    </template>
                </el-table-column> 
                <el-table-column prop="orderSerial" label="订单号" min-width="250" sortable>
                    <template  slot-scope="scope">
                        <h4 class="needMoreInfo" @click="handleClick('details',scope.row)">{{ scope.row.orderSerial}}</h4>
                    </template>
                </el-table-column>
                <!-- <el-table-column prop="" label="订单标识" width="120"></el-table-column> -->
                <el-table-column prop="area" label="发货地" min-width="200" :show-overflow-tooltip="true" sortable>
                    <template  slot-scope="scope">
                        {{scope.row.province+scope.row.city+scope.row.area}}
                    </template>
                </el-table-column>
                <el-table-column prop="shipperName" label="货主" min-width="150" sortable></el-table-column>
                <el-table-column prop="agencyName" label="区代" min-width="200" :show-overflow-tooltip="true" sortable></el-table-column>
                <el-table-column prop="companyName" label="区代物流公司" min-width="200" :show-overflow-tooltip="true" sortable></el-table-column>
                <!-- <el-table-column prop="ordertTime" label="下单时间" min-width="160" sortable>
                    <template slot-scope="scope">
                    {{scope.row.ordertTime|parseTime}}
                    </template>
                </el-table-column> -->
                <el-table-column prop="agencyPrice" label="区代运单金额（元）" min-width="180" sortable></el-table-column>
                <el-table-column prop="payTimeType" label="付款方式" min-width="150" sortable>
                    <template slot-scope="scope">
                        {{scope.row.payTimeType == '1' ? '现付' :'到付'}}
                    </template>
                </el-table-column>
                <el-table-column prop="agencyException" label="区代运单变更未处理" min-width="180" sortable>
                    <template slot-scope="scope">
                        {{scope.row.agencyException == '1' ? '是' :'否'}}
                    </template>
                </el-table-column>
                <el-table-column prop="agencyExceptionPrice" label="区代运单变更未处理金额（元）" min-width="180" sortable></el-table-column>
                <el-table-column prop="ifPlatform" label="平台专线中转" min-width="150" sortable>
                    <!-- <template slot-scope="scope">
                    {{scope.row.ifPlatform == 'AF0711602' ? '是':'否'}}
                    </template> -->
                </el-table-column>
                <!-- <el-table-column prop="transferTime" label="中转时间" min-width="160" sortable>
                    <template slot-scope="scope">
                    {{scope.row.transferTime | parseTime}}
                    </template>
                </el-table-column> -->
                <el-table-column prop="carrierName" label="专线承运商" min-width="200" :show-overflow-tooltip="true" sortable></el-table-column>
                <el-table-column prop="carrierPrice" label="专线运单金额（元）" min-width="180" sortable></el-table-column>
                <el-table-column prop="carrierException" label="专线运单变更未处理" min-width="180" sortable>
                    <template slot-scope="scope">
                    {{scope.row.carrierException == '1' ? '是' :'否'}}
                    </template>
                </el-table-column>
                <el-table-column prop="carrierExceptionPrice" label="专线变更未处理金额（元）" min-width="180" sortable></el-table-column>
                <!-- <el-table-column prop="verifyTakeName" label="确认收货状态" min-width="150" sortable></el-table-column> -->
                <el-table-column prop="agencyWaitPrice" :label="status.name=='four' ? '区代已入账金额（元）' :'区代待入账金额（元）'" min-width="180" sortable></el-table-column>
                <el-table-column prop="carrierWaitPrice" :label="status.name=='four' ? '专线承运商已入账金额（元）' : '专线承运商待入账金额（元）'" min-width="180" sortable></el-table-column>
                <el-table-column prop="platformWaitPrice" label="平台分润金额（元）" min-width="180" sortable></el-table-column>
                <!-- <el-table-column prop="examineStatus" label="审查状态" min-width="150" sortable></el-table-column> -->
                <!-- <el-table-column prop="" label="投诉处理状态" min-width="150" sortable></el-table-column> -->
                <!-- <el-table-column prop="" label="货损处理状态" min-width="150" sortable></el-table-column> -->
                <!-- <el-table-column prop="" label="异常处理状态" min-width="150" sortable></el-table-column> -->
                <el-table-column prop="verifyName" label="审核状态" min-width="150" sortable></el-table-column>
                <el-table-column prop="createTime" label="确认收货时间" min-width="160" sortable>
                    <template slot-scope="scope">
                    {{scope.row.createTime|parseTime}}
                    </template>
                </el-table-column>
                <el-table-column prop="verifyPeople" v-if="status.name=='three'" label="订单审核人" min-width="150" sortable></el-table-column>
                <el-table-column prop="passVerifyTime" v-if="status.name=='three'" label="审核通过时间" min-width="160" sortable>
                    <template slot-scope="scope">
                    {{scope.row.passVerifyTime | parseTime}}
                    </template>
                </el-table-column>
                <el-table-column prop="verifyPeople" v-if="status.name=='four'" label="复审人" min-width="150" sortable></el-table-column>
                <el-table-column prop="passVerifyTime" v-if="status.name=='four'" label="复审时间" min-width="160" sortable>
                    <template slot-scope="scope">
                    {{scope.row.passVerifyTime | parseTime}}
                    </template>
                </el-table-column>
                <el-table-column prop="verifyPeople" label="复审不通过人" v-if="status.name=='five'" min-width="150" sortable></el-table-column>
                <el-table-column prop="verifyRemark" label="复审不通过原因" min-width="150" v-if="status.name=='five'" sortable></el-table-column>
                <el-table-column prop="passVerifyTime" label="复审不通过时间" v-if="status.name=='five'" min-width="160" sortable>
                    <template slot-scope="scope">
                    {{scope.row.passVerifyTime | parseTime}}
                    </template>
                </el-table-column>
            </el-table>
        </div>
        <div class="info_tab_footer">共计:{{ totalCount }} <div class="show_pager"> <Pager ref="pager" :total="totalCount" @change="handlePageChange"/></div> </div> 
        <toBeReviewedDialog :dialogFormVisible.sync = "dialogFormVisible" :itemForm="itemForm" @renovate="firstblood"/>
    </div>
</div>
</template>

<script>
import Pager from '@/components/Pagination/index'
// import GetCityList from '@/components/GetCityList/city'
import { parseTime,pickerOptions2 } from '@/utils/'
import {aflcLclOrderAuditList,aflcLclOrderAuditVerify} from '@/api/order/logistics/logistics1.js'
import { DicOrderExType,DicOrderAuditStatusType  } from '@/api/common'
import toBeReviewedDialog from './toBeReviewedDialog'

export default {
    data(){
        return{
            loading:false,
            dialogFormVisible:false,
            pickerOptions2: {shortcuts: pickerOptions2},
            totalCount:0,
            page:1,
            pagesize:20,
            tableData: [],
            radio:'',
            itemForm:{},
            formData:{
                "agencyException": "",//区代运单异常未处理：1是，0否
                "carrierException": "",//专线运单异常未处理：1是，0否
                "carrierName": "",//专线承运商名+账号
                "companyName": "",//区代公司名称+账号
                "endOrdertTime": "",//下单结束时间
                "endTransferTime": "",//结束运单中转时间
                "examineCode": "",//审查状态
                "ifPlatform": "",//数据状态(AF0711602:平台中转,AF0711601:非平台中转)
                "orderSerial": "",//订单流水号
                "passVerifyTime": "",//审核通过时间
                "startOrdertTime": "",//下单开始时间
                "startTransferTime": "",//开始运单中转时间
                "totalArea": "",//总区域
                "verifyCode": "",//审核状态code（待审核 AF0850601、待复审 AF0850602、已复审 AF0850603、复审不通过 AF0850604）
            },
            createTime:[],
            createTime2:[],
            replaceunusualList:[{
                name:'全部',
                code:'',
            },{
                name:'有',
                code:'1',
            },{
                name:'无',
                code:'0',
            }],//区代运单变更未处理
            transferList:[{
                name:'全部',
                code:'',
            },{
                name:'是',
                code:'AF0711602',
            },{
                name:'否',
                code:'AF0711601',
            }],   //平台专线中转类型
            CarrierunusualList:[{
                name:'全部',
                code:'',
            },{
                name:'有',
                code:'1',
            },{
                name:'无',
                code:'0',
            }],  //专线运单变更未处理
            CheckTypeList:[],  //审查状态
            // appealList:[],     //投诉处理状态
            // cargoDamageList:[], // 货损状态
            // unusualList:[],   //异常状态
            optionsOrderEx:[{
                code:'',
                name:'全部'
            }],
            optionsAuditStatus:[{
                code:'',
                name:'全部'
            }],
            selected:{},
        }
    },
    props: {
        isvisible: {
            type: Boolean,
            default: false
        },
        status: {
            type: Object,
            default: false
        },
    },  
    mounted(){
        this.init();
    },
    methods:{
        doLayoutTable(){
            this.$refs['multipleTable'+this.status.name].doLayout();
        },
        init(){
            if(this.status.name=='one'){
                DicOrderAuditStatusType().then(res => {
                    this.optionsAuditStatus = this.optionsAuditStatus.concat(res.data);
                })
            }
            if(this.status.name=='one'||this.status.name=='two'||this.status.name=='five'){
                DicOrderExType().then(res => {
                    this.optionsOrderEx = this.optionsOrderEx.concat(res.data);
                })
            }
        },
        firstblood(){
            this.loading = true;
            //（待审核 AF0850601、待复审 AF0850602、已复审 AF0850603、复审不通过 AF0850604）
            this.fuzhi();
            aflcLclOrderAuditList(this.page,this.pagesize,this.formData).then(res=>{
                this.totalCount = res.data.totalCount;
                this.tableData = res.data.list;
                this.loading = false;
            }).catch((err) => {
                this.$message({
                    type: 'error',
                    message: '操作失败，原因：' + (err.errorInfo ? err.errorInfo : err.text)
                })
                this.loading = false;
            });
        },
        //下单时间
        cTime(i){
            if(i){

            }else{  

            }
        },
        //中单时间
        cTime2(i){
            if(i){

            }else{  

            }
        },
        //点击查询按纽，按条件查询列表
        getdata_search(){
            this.page = 1;
            this.$refs.pager.inputval = this.page;
            this.$refs.pager.pageNum = this.page;
            this.firstblood()
        },
        fuzhi(){
            switch(this.status.name){
                case 'one':
                    this.formData.verifyCode = '';
                    break;
                case 'two':
                    this.formData.verifyCode = 'AF0850601';
                    break;
                case 'three':
                    this.formData.verifyCode = 'AF0850602';
                    break;
                case 'four':
                    this.formData.verifyCode = 'AF0850603';
                    break;
                case 'five':
                    this.formData.verifyCode = 'AF0850604';
                    break;
            }
        },
        clearSearch(){
            this.formData={
                "agencyException": "",//区代运单异常未处理：1是，0否
                "carrierException": "",//专线运单异常未处理：1是，0否
                "carrierName": "",//专线承运商名+账号
                "companyName": "",//区代公司名称+账号
                "endOrdertTime": "",//下单结束时间
                "endTransferTime": "",//结束运单中转时间
                "examineCode": "",//审查状态
                "ifPlatform": "",//数据状态(AF0711602:平台中转,AF0711601:非平台中转)
                "orderSerial": "",//订单流水号
                "passVerifyTime": "",//审核通过时间
                "startOrdertTime": "",//下单开始时间
                "startTransferTime": "",//开始运单中转时间
                "totalArea": "",//总区域
                "verifyCode": "",//审核状态code（待审核 AF0850601、待复审 AF0850602、已复审 AF0850603、复审不通过 AF0850604）
            }
            this.createTime = []
            this.createTime2 = []
            if(this.page!= 1){
                this.page = 1;
                this.$refs.pager.inputval = this.page;
                this.$refs.pager.pageNum = this.page;
            }
            this.firstblood()
        },
        // 页码改变
        handlePageChange(obj) {
            this.page = obj.pageNum;
            this.pagesize = obj.pageSize;
            this.firstblood();
        },
        handleClick(type,row){
            switch (type) {
                case 'ex':
                    this.$router.push({ name: '发物流订单详情', query: { orderSerial: this.selected.orderSerial, currentTab: 'seven' }});
                break;
                case 'details':
                    this.$router.push({name: '发物流订单详情',query:{ orderSerial:row.orderSerial}});
                    break;
                case 'recheck':
                    if(this.selected.id){
                        this.dialogFormVisible = true;
                        this.itemForm = this.selected;
                    }else{
                        this.$message({
                            type: 'warning',
                            message: '请选择一条列表数据!'
                        });
                    }
                    break;
                case 'going':
                    if(this.selected.id){
                        // if(this.selected.examineStatus !== '已审查'){
                        //     this.$message({
                        //         type: 'warning',
                        //         message: '请完成订单审查后再进行订单审核。'
                        //     })
                        // }else 
                        if(this.selected.agencyException == '1'){
                            this.$message({
                                type: 'warning',
                                message: '该订单存在费用变更未处理，请跟进处理后再进行审核。'
                            })
                        }else{
                            this.$confirm('确认将订单通过审核吗？', '订单审核', {
                                confirmButtonText: '确定',
                                cancelButtonText: '取消',
                                type: 'warning'
                            }).then(() => {
                                let dto = {
                                    "examineCode": "",//审查状态
                                    "examineRemark": "",//审查描述
                                    "examineStatus": "",//审查状态
                                    "orderSerial": "",//orderSerial
                                    "verifyCode": "",//审核状态code
                                    "verifyName": "",//审核状态
                                }
                                dto.verifyCode = 'AF0850602';
                                dto.orderSerial = this.selected.orderSerial;
                                aflcLclOrderAuditVerify(dto).then(res => {
                                    this.$message({
                                        type: 'success',
                                        message: '订单已通过审核!'
                                    })
                                    this.firstblood();
                                }).catch((err) => {
                                    this.$message({
                                        type: 'error',
                                        message: '操作失败，原因：' + (err.errorInfo ? err.errorInfo : err.text)
                                    })
                                });
                            }).catch(() => {
                                this.$message({
                                    type: 'info',
                                    message: '已取消!'
                                })
                            });
                        }
                    }else{
                        this.$message({
                            type: 'warning',
                            message: '请选择一条列表数据!'
                        });
                    }
                    break;
            }
        },
        // 点击选中当前行
        clickDetails(row, event, column) {
            // this.$refs.multipleTable.toggleRowSelection(row);
            this.radio = row.id;
            this.selected = row;
            // console.log('this.selected',this.selected)
        },
    },
    watch:{
        isvisible:{
            handler(newVal,oldVal){
                if (newVal) {
                    this.firstblood()
                }   
            },
            immediate: true
        }
    },
    components:{
        Pager,
        toBeReviewedDialog,
        // GetCityList
    },
}
</script>

<style lang="scss">

</style>
