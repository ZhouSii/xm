<template>
     <el-form :inline="true" :model="searchInfo" ref="ruleForm" class="demo-ruleForm classify_searchinfo">
        <el-form-item label="区域" prop="belongCityName">
            <getCityList class="chooseItem" @returnStr="getStr" v-model="searchInfo.belongCityName" ref="area"></getCityList>
        </el-form-item>
        <el-form-item label="订单号" prop="orderSerial">
            <el-input v-model="searchInfo.orderSerial" clearable></el-input>
        </el-form-item>
        <el-form-item label="车主" maxlength="18"  prop="driverName">
            <el-input v-model="searchInfo.driverName" clearable placeholder="账户/姓名/车牌号"></el-input>
        </el-form-item>
        <!-- <el-form-item label="违规原因" prop="riskControlName" v-if="searchType == 'doubtOrder'">
            <el-input v-model="searchInfo.riskControlName" clearable></el-input>
        </el-form-item>
        <el-form-item label="用车时间" prop="chooseTime">
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
        </el-form-item> -->
         <el-form-item label="处理时间" prop="chooseTime">
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
        <el-form-item label="处理状态" prop="dealStatus" v-if="searchType === 'doubtOrder'">
            <el-select v-model="searchInfo.dealStatus" clearable placeholder="请选择">
                <el-option
                v-for="item in optionsDealStatus"
                :key="item.code"
                :label="item.name"
                :value="item.code">
                </el-option>
            </el-select>
        </el-form-item>
        <el-form-item label="下单时间" prop="chooseTime" v-if="searchType !== 'customer'">
            <el-date-picker
                v-model="chooseTime1"
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
        <el-form-item label="完成时间" prop="chooseTime" v-if="searchType !== 'customer'">
            <el-date-picker
                v-model="chooseTime2"
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
        <el-form-item class="btnChoose fr"  style="margin-left:0;">
            <el-button type="primary" :size="btnsize" icon="el-icon-search" plain @click="handleSearch('search')">搜索</el-button>
            <el-button type="info" :size="btnsize" icon="fontFamily aflc-icon-qingkong" plain @click="handleSearch('clear')">清空</el-button>
        </el-form-item>
    </el-form>
</template>

<script type="text/javascript">

import getCityList from '@/components/GetCityList/city'
import { pickerOptions2 } from '@/utils/index.js'

    export default{
        name:'abnormal-serviceSerach',
        props:{
            searchType:{
                type:String,
                default:''
            },
        },
        components:{
            getCityList,
        },
        data(){
            return{
                btnsize:'mini',
                searchInfo:{
                    belongCityName:'',
                    orderSerial:'',
                    driverName:'',
                    dealStatus:'',//处理状态('' 全部、1 未处理、2 已处理)
                    startDealTime:'',//开始处理时间
                    endDealTime:'',//结束处理时间
                    startCreateTime:'',//开始下单时间
                    endCreateTime:'',//结束下单时间
                    startComplateTime:'',//开始完成时间
                    endComplateTime:'',//结束完成时间
                    // riskControlName:'',//违规原因Code
                    // startUseCarTime:'',//开始用车时间
                    // endUseCarTime:'',//结束用车时间
                },
                chooseTime:[],
                chooseTime1:[],
                chooseTime2:[],
                pickerOptions2:{
                    shortcuts:pickerOptions2
                },
                optionsDealStatus:[{
                    name:'全部',
                    code:''
                },{
                    name:'未处理',
                    code:'1'
                },{
                    name:'已处理',
                    code:'2'
                }]
            }
        },
        mounted(){
            this.init();
        },
        methods: {
            //初始化
            init(){
                this.searchInfo.orderSerial = this.$route.params.orderSerial || '';
                this.$emit('change', this.searchInfo)
            },
            getStr(d){
                this.searchInfo.belongCityName = (!d.province&&!d.city&&!d.area) ? '': `${this.getValue(d.province)},${this.getValue(d.city)},${this.getValue(d.area)}`.trim();
            },
            getValue(obj){
                return obj ? obj.value:'';
            },
            //模糊查询 分类名称或者code
            handleSearch(type){
                let searchObj;
                if(type == 'clear'){
                    this.searchInfo = {
                        belongCityName:'',
                        orderSerial:'',
                        driverName:'',
                        dealStatus:'',//处理状态('' 全部、1 未处理、2 已处理)
                        startDealTime:'',//开始处理时间
                        endDealTime:'',//结束处理时间
                        startCreateTime:'',//开始下单时间
                        endCreateTime:'',//结束下单时间
                        startComplateTime:'',//开始完成时间
                        endComplateTime:'',//结束完成时间
                    }
                    this.chooseTime = [];
                    this.chooseTime1 = [];
                    this.chooseTime2 = [];
                }else{
                    this.searchInfo.startDealTime = this.chooseTime.length > 0 ? this.chooseTime[0] : '';
                    this.searchInfo.endDealTime = this.chooseTime.length > 0 ? this.chooseTime[1] : '';

                    this.searchInfo.startCreateTime = this.chooseTime1.length > 0 ? this.chooseTime1[0] : '';
                    this.searchInfo.endCreateTime = this.chooseTime1.length > 0 ? this.chooseTime1[1] : '';

                    this.searchInfo.startComplateTime = this.chooseTime2.length > 0 ? this.chooseTime2[0] : '';
                    this.searchInfo.endComplateTime = this.chooseTime2.length > 0 ? this.chooseTime2[1] : '';
                }
                searchObj = Object.assign({}, this.searchInfo);
                this.$route.params.orderSerial = '';
                this.$emit('change', searchObj)
            },
        }
    }
</script>

<style type="text/css" lang="scss" scoped>
    
</style>