<template>
    <el-form  :inline="true" :model="searchInfo" ref="ruleForm" class="demo-ruleForm classify_searchinfo">
        <el-form-item label="区域" prop="belongCityName">
            <!-- <vregion :ui="true" @values="regionChange" class="form-control">
                <el-input v-model="searchInfo.belongCityName" placeholder="请选择出发地"></el-input>
            </vregion> -->
            <getCityList class="chooseItem" @returnStr="getStr" v-model="searchInfo.belongCityName" ref="area"></getCityList>
        </el-form-item>
        <el-form-item label="订单号" prop="orderSerial">
            <el-input v-model="searchInfo.orderSerial" clearable>
            </el-input>
        </el-form-item>
        <el-form-item label="货主" maxlength="18"  prop="shipperName">
            <el-input v-model="searchInfo.shipperName" clearable placeholder="账户/姓名">
            </el-input>
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
        components:{
            // vregion,
            getCityList
        },
        data(){
            return{
                btnsize:'mini',
                chooseTime:[],
                pickerOptions2:{
                    shortcuts:pickerOptions2
                },
                searchInfo:{
                    "belongCity": "",
                    "endOrderDate": "",
                    "orderSerial": "",
                    "orderStatus": "",
                    "shipperInfo": "",
                    "startOrderDate": ""
                },
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
                // if(d.city){
                    this.searchInfo.belongCity = d.area.code;
                // }else{
                    // this.searchInfo.belongCity = d.province.code;
                // }
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
                            "belongCity": "",
                            "endOrderDate": "",
                            "orderSerial": "",
                            "orderStatus": "",
                            "shipperInfo": "",
                            "startOrderDate": ""
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