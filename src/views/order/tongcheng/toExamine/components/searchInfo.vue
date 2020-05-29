<template>
    <el-form  :inline="true" :model="searchInfo" ref="ruleForm" class="demo-ruleForm classify_searchinfo">
        <el-form-item label="区域" prop="provinceCityArea">
            <getCityList class="chooseItem" @returnStr="getStr" v-model="searchInfo.provinceCityArea" ref="area"></getCityList>
        </el-form-item>
        <el-form-item label="订单号" prop="orderSerial">
            <el-input v-model="searchInfo.orderSerial" clearable></el-input>
        </el-form-item>
        <el-form-item label="车主" maxlength="20"  prop="driverName">
            <el-input v-model="searchInfo.driverName" clearable  placeholder="账户/姓名/车牌号"></el-input>
        </el-form-item>
        <el-form-item label="下单时间" prop="chooseTime">
            <el-date-picker
                v-model="chooseTime"
                type="daterange"
                :picker-options="pickerOptions2"
                range-separator="-"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
                unlink-panels
                align="right"
                :default-time="['00:00:00', '23:59:59']"
                value-format="timestamp">
            </el-date-picker>
        </el-form-item>
        <el-form-item label="审查状态" prop="reviewStatus" v-if="showType != 'toBeReviewed' && showType != 'reviewed' && showType != 'All'">
            <el-select v-model="searchInfo.reviewStatus" clearable placeholder="请选择">
                <el-option
                v-for="item in optionsOrderEx"
                :key="item.code"
                :label="item.name"
                :value="item.code">
                </el-option>
            </el-select>
        </el-form-item>
        <el-form-item label="审核状态" prop="auditStatus" v-if="showType == 'All'">
            <el-select v-model="searchInfo.auditStatus" clearable placeholder="请选择">
                <el-option
                v-for="item in optionsAuditStatus"
                :key="item.code"
                :label="item.name"
                :value="item.code">
                </el-option>
            </el-select>
        </el-form-item>
        <el-form-item label="订单标识"   prop="exceptionType">
            <el-select v-model="searchInfo.exceptionType" clearable placeholder="请选择">
                <el-option
                v-for="item in optionsExceptionType"
                :key="item.code"
                :label="item.name"
                :value="item.code">
                </el-option>
            </el-select>
        </el-form-item>
        <div v-if="showType == 'toBeAudited' || showType == 'disReviewed' " style="display: inline-block;">
            <el-form-item label="投诉处理状态" prop="complaintStatus">
                <el-select v-model="searchInfo.complaintStatus" clearable placeholder="请选择">
                    <el-option
                    v-for="item in optionsOrderCo"
                    :key="item.code"
                    :label="item.name"
                    :value="item.code">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="货损处理状态" prop="goodsDamageStatus">
                <el-select v-model="searchInfo.goodsDamageStatus" clearable placeholder="请选择">
                    <el-option
                    v-for="item in optionsOrderGd"
                    :key="item.code"
                    :label="item.name"
                    :value="item.code">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="异常处理状态" prop="unusualStatus">
                <el-select v-model="searchInfo.unusualStatus" clearable placeholder="请选择">
                    <el-option
                    v-for="item in optionsOrderUs"
                    :key="item.code"
                    :label="item.name"
                    :value="item.code">
                    </el-option>
                </el-select>
            </el-form-item>
        </div>
        <el-form-item label="是否广告车" prop="isAd" v-if="showType == 'toBeAudited' || showType == 'disReviewed' || showType === 'toBeReviewed'">
            <el-select v-model="searchInfo.isAd" clearable placeholder="请选择">
                <el-option
                v-for="item in optionsIsAd"
                :key="item.code"
                :label="item.name"
                :value="item.code">
                </el-option>
            </el-select>
        </el-form-item>
        <el-form-item class="btnChoose fr"  style="margin-left:0;">
            <el-button type="primary" icon="el-icon-search" plain :size="btnsize" @click="handleSearch('search')">搜索</el-button>
            <el-button type="info" icon="fontFamily aflc-icon-qingkong" :size="btnsize" plain @click="handleSearch('clear')">清空</el-button>
        </el-form-item>
    </el-form>
</template>

<script type="text/javascript">

import { parseTime,pickerOptions2 } from '@/utils/index.js'
// import vregion from '@/components/vregion/Region'
import getCityList from '@/components/GetCityList/city'
import { DicOrderExType,DicDelStatusType,ClaimStatusType,DicAbnormalType,DicOrderAuditStatusType  } from '@/api/common'
import { ORDER_MARK } from '@/utils/constant.js'

    export default{
        components:{
            // vregion,
            getCityList
        },
        props:{
            showType:{
                type:String,
                default:'All'
            }
        },
        data(){
            return{
                btnsize:'mini',
                chooseTime:[],
                pickerOptions2:{
                    shortcuts:pickerOptions2
                },
                searchInfo:{
                    auditStatus:'',//审核状态（待审核 AF0850601、待复审 AF0850602、已复审 AF0850603、复审不通过 AF0850604）
                    "complaintStatus": "",//投诉处理状态
                    "driverName": "",//driverName
                    "endOrderDate": "",//下单结束时间
                    "goodsDamageStatus": "",//货损处理状态
                    "orderSerial": "",//订单流水号
                    "provinceCityArea": "",//省市区
                    "reviewStatus": "",//审查状态（待审查 AF0850101、审查中 AF0850102、已审查 AF0850103）
                    "startOrderDate": "",//下单起始时间
                    "unusualStatus": "",//异常处理状态
                    exceptionType:'',//订单标识
                    isAd:'',//是否广告车
                },
                optionsOrderEx:[{
                    code:'',
                    name:'全部'
                }],
                optionsOrderCo:[{
                    code:'',
                    name:'全部'
                }],
                optionsOrderGd:[{
                    code:'',
                    name:'全部'
                }],
                optionsOrderUs:[{
                    code:'',
                    name:'全部'
                }],
                optionsAuditStatus:[{
                    code:'',
                    name:'全部'
                }],
                optionsExceptionType:ORDER_MARK,
                optionsIsAd:[{
                    name:'全部',
                    code:''
                },{
                    name:'是',
                    code:'1'
                },{
                    name:'否',
                    code:'0'
                }]
            }
        },
        mounted(){
            this.init();
        },
        methods: {
            init(){
                if(this.showType == 'All'){
                    this.$store.dispatch("GetInfoDic",'AF08506').then(res => {
                        this.optionsAuditStatus = this.optionsAuditStatus.concat(res);
                    });
                    // DicOrderAuditStatusType().then(res => {
                    //     this.optionsAuditStatus = this.optionsAuditStatus.concat(res.data);
                    // })
                }else if(this.showType != 'toBeReviewed' && this.showType != 'reviewed'){
                    this.$store.dispatch("GetInfoDic",'AF08501').then(res => {
                        this.optionsOrderEx = this.optionsOrderEx.concat(res);
                    });
                    // DicOrderExType().then(res => {
                    //     this.optionsOrderEx = this.optionsOrderEx.concat(res.data);
                    // })
                }else{
                }
                
                if(this.showType == 'toBeAudited' || this.showType == 'disReviewed'){
                    // Promise.all([DicDelStatusType(),ClaimStatusType(),DicAbnormalType(),]).then(resArr => {
                    //     this.optionsOrderCo = this.optionsOrderCo.concat(resArr[0].data);
                    //     this.optionsOrderGd = this.optionsOrderGd.concat(resArr[1].data);
                    //     this.optionsOrderUs = this.optionsOrderUs.concat(resArr[2].data);
                    // })
                    this.$store.dispatch("GetInfoDic",'AF040').then(res => {
                        this.optionsOrderCo = this.optionsOrderCo.concat(res);
                    });
                     this.$store.dispatch("GetInfoDic",'AF048').then(res => {
                        this.optionsOrderGd = this.optionsOrderGd.concat(res);
                    });
                     this.$store.dispatch("GetInfoDic",'AF08502').then(res => {
                        this.optionsOrderUs = this.optionsOrderUs.concat(res);
                    });
                }
            },
            getStr(d){
                // console.log('data:',d)
                this.searchInfo.provinceCityArea = (!d.province&&!d.city&&!d.area) ? '': `${this.getValue(d.province)+','}${this.getValue(d.city)+','}${this.getValue(d.area)}`.trim();
            },
            getValue(obj){
                return obj ? obj.value:'';
            },
            //模糊查询 分类名称或者code
            handleSearch(type){
                // console.log(this.chooseTime)
                let searchObj;
                switch(type){
                    case 'search':
                        this.searchInfo.startOrderDate = this.chooseTime[0];
                        this.searchInfo.endOrderDate = this.chooseTime[1];
                        searchObj = Object.assign({}, this.searchInfo);
                        break;
                    case 'clear':
                        this.searchInfo  = {
                            auditStatus:'',////审核状态（待审核 AF0850601、待复审 AF0850602、已复审 AF0850603、复审不通过 AF0850604）
                            "complaintStatus": "",//投诉处理状态
                            "driverName": "",//driverName
                            "endOrderDate": "",//下单结束时间
                            "goodsDamageStatus": "",//货损处理状态
                            "orderSerial": "",//订单流水号
                            "provinceCityArea": "",//省市区
                            "reviewStatus": "",//审查状态（待审查 AF0850101、审查中 AF0850102、已审查 AF0850103）
                            "startOrderDate": "",//下单起始时间
                            "unusualStatus": "",//异常处理状态
                            exceptionType:'',//订单标识
                            isAd:'',//是否广告车
                        }
                        this.chooseTime = [];
                        this.$refs.area.clearData();
                        searchObj = Object.assign({}, this.searchInfo);
                        break;
                }
                this.$emit('change', searchObj)
            },
        }
    }
</script>

<style type="text/css" lang="scss" scoped>
    
</style>