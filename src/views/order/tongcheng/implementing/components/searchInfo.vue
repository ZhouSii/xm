<template>
    <el-form :inline="true" :model="searchInfo" ref="ruleForm" class="demo-ruleForm classify_searchinfo" >
        <el-form-item  label="区域：" prop="belongCity">
            <!-- <vregion :ui="true" @values="regionChange" class="form-control">
                <el-input v-model="searchInfo.belongCity" placeholder="请选择出发地"></el-input>
            </vregion> -->
            <getCityList class="chooseItem" @returnStr="getStr" v-model="searchInfo.belongCity" ref="area"></getCityList>
        </el-form-item>
        <el-form-item label="订单号：" prop="orderSerial">
            <el-input v-model="searchInfo.orderSerial" clearable>
            </el-input>
        </el-form-item>
        <el-form-item label="货主：" maxlength="18"  prop="shipperInfo">
            <el-input v-model="searchInfo.shipperInfo" clearable placeholder="账户/姓名">
            </el-input>
        </el-form-item>
        <el-form-item label="车主：" maxlength="18"  prop="driverInfo">
            <el-input v-model="searchInfo.driverInfo" clearable placeholder="账户/姓名/车牌号">
            </el-input>
        </el-form-item>
        <el-form-item label="下单时间：" prop="chooseTime">
            <el-date-picker
                v-model="chooseTime"
                type="daterange"
                :picker-options="pickerOptions2"
                range-separator="-"
                unlink-panels
                start-placeholder="开始日期"
                end-placeholder="结束日期"
                align="right"
                :default-time="['00:00:00', '23:59:59']"
                value-format="timestamp">
            </el-date-picker>
        </el-form-item>
        <el-form-item label="卸货完成时间：" prop="chooseTime1" v-if="searchType == 'AF0080607PT'">
            <el-date-picker
                v-model="chooseTime1"
                type="daterange"
                :picker-options="pickerOptions2"
                range-separator="-"
                unlink-panels
                start-placeholder="开始日期"
                end-placeholder="结束日期"
                align="right"
                :default-time="['00:00:00', '23:59:59']"
                value-format="timestamp">
            </el-date-picker>
        </el-form-item>
        <el-form-item label="付款状态" prop="payStatus" v-if="searchType == 'AF0080607PT'">
            <el-select v-model="searchInfo.payStatus" clearable placeholder="请选择">
                <el-option
                v-for="item in optionsPayStatus"
                :key="item.code"
                :label="item.name"
                :value="item.code"
                :disabled="item.disabled">
                </el-option>
            </el-select>
        </el-form-item>
        <el-form-item label="支付时机" prop="payTimeType" v-if="searchType == 'AF0080607PT'">
                <el-select v-model="searchInfo.payTimeType" clearable placeholder="请选择">
                    <el-option
                    v-for="item in optionsPayTimeType"
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
    export default{
        props:{
            searchType:{
                type:String,
                default:'',
            }
        },
        components:{
            // vregion
            getCityList
        },
        data(){
            return{
                btnsize:'mini',
                chooseTime:[],
                chooseTime1:[],
                pickerOptions2:{
                    shortcuts:pickerOptions2
                },
                searchInfo:{
                    "belongCity": "",//区域
                    "complateUnloadEndTime": "",//卸货完成结束时间
                    "complateUnloadStartTime": "",//卸货完成开始时间
                    "driverInfo": "",//车主
                    "endOrderDate": "",//下单结束时间
                    "orderSerial": "",//订单流水号
                    "orderStatus": "",//订单状态
                    "payStatus": "",//付款状态
                    "payTimeType": "",//支付时机(‘’ 全部，null 立即支付，0，收货时付款，1，发货时付款)
                    "shipperInfo": "",//货主
                    "startOrderDate": ""//下单起始时间
                },
                optionsPayStatus:[{
                    code:'',
                    name:'全部'
                },{
                    code:'AF00801',
                    name:'待付款'
                },{
                    code:'AF00802',
                    name:'已付款'
                },{
                    code:'AF00803',
                    name:'已退款'
                },{
                    code:'AF00808',
                    name:'已取消'
                }],
                optionsPayTimeType:[{
                    code:'',
                    name:'全部'
                },{
                    code:null,
                    name:'立即支付'
                },{
                    code:'0',
                    name:'收货时付款'
                }],
            }
        },
        methods: {
            // regionChange(d) {
            //     console.log('data:',d)
            //     this.searchInfo.belongCityName = (!d.province&&!d.city&&!d.area&&!d.town) ? '': `${this.getValue(d.province)}${this.getValue(d.city)}${this.getValue(d.area)}${this.getValue(d.town)}`.trim();
            //     if(d.area){
            //         this.searchInfo.belongCity = d.area.code;
            //     }else if(d.city){
            //         this.searchInfo.belongCity = d.city.code;
            //     }
            //     else{
            //         this.searchInfo.belongCity = d.province.code;
            //     }
            // },
            getStr(d){
                console.log('data:',d)
                this.searchInfo.belongCityName = (!d.province&&!d.city&&!d.area) ? '': `${this.getValue(d.province)}${this.getValue(d.city)}${this.getValue(d.area)}`.trim();
                this.searchInfo.belongCity = d.area.code;
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
                        this.searchInfo.complateUnloadStartTime = this.chooseTime1 ? this.chooseTime1[0] : '';
                        this.searchInfo.complateUnloadEndTime = this.chooseTime1 ? this.chooseTime1[1] : '';
                        searchObj = Object.assign({}, this.searchInfo);
                        break;
                    case 'clear':
                        this.searchInfo = {
                            "belongCity": "",//区域
                            "complateUnloadEndTime": "",//卸货完成结束时间
                            "complateUnloadStartTime": "",//卸货完成开始时间
                            "driverInfo": "",//车主
                            "endOrderDate": "",//下单结束时间
                            "orderSerial": "",//订单流水号
                            "orderStatus": "",//订单状态
                            "payStatus": "",//付款状态
                            "payTimeType": "",//支付时机(‘’ 全部，null 立即支付，0，收货时付款，1，发货时付款)
                            "shipperInfo": "",//货主
                            "startOrderDate": ""//下单起始时间
                        }
                        this.chooseTime = [];
                        this.chooseTime1 = [];
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