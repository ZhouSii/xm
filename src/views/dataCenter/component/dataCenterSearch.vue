<template>
    <el-form :inline="true" :model="searchInfo" ref="ruleForm" class="demo-ruleForm classify_searchinfo" >
        <el-form-item label="区域" prop="belongCityName">
            <getCityList class="chooseItem" @returnStr="getStr" v-model="searchInfo.belongCityName" ref="area"></getCityList>
        </el-form-item>
        <el-form-item style="margin-right:10px;">
            <ul class="timeLine">
                <li v-for="(item,index) in dataType" :key="item.name" :class="{currentClick:item.iscur}" @click="setCur(index,item.value)"><span>{{item.name}}</span> </li>
            </ul>
        </el-form-item>
        <el-form-item v-if="searchInfo.timeQueryType == '5'">
            <el-date-picker
                v-model="chooseTime"
                @change="timeVal"
                type="daterange"
                :picker-options="pickerOptions2"
                range-separator="-"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
                unlink-panels
                align="right"
                :default-time="['00:00:00', '23:59:59']">
            </el-date-picker>
        </el-form-item>
        <el-form-item class="btnChoose fr"  style="margin-left:0;" v-if="$_has_permission('DATA_CENTER_SAHIPPER_GENERAL_SAHIPPER_GENERAL_START_SAHIPPER_TOTAL_CASE_EXPORT_EXCEL') || $_has_permission('DATA_CENTER_SAHIPPER_GENERAL_SAHIPPER_GENERAL_START_BELONG_SALESMAN_EXPORT_EXCEL')">
            <el-button type="primary" icon="el-icon-download" plain :size = "btnsize" @click="handleClick('export')">导出Excel</el-button>
        </el-form-item>
    </el-form>
</template>

<script type="text/javascript">

import { parseTime, pickerOptions2 } from '@/utils/index.js'
import { getDictionary } from '@/api/common.js'
// import getCityList from '@/components/GetCityList/dataCenterArea'
import getCityList from '@/components/GetCityList/area'

export default{
    props: {
        
    },
    components: {
        getCityList
    },
    data() {
        return {
            btnsize: 'mini',
            chooseTime: [],
            pickerOptions2: {
                shortcuts: pickerOptions2
            },
            searchInfo: {
                "areaCode": "",
                "cityCode": "",
                "provinceCode": "",
                "queryBeginTime": "",
                "queryEndTime": "",
                "timeQueryType": "1"
            },
            dataType:[
                {name:'今天',value:'1',iscur:true},
                {name:'昨天',value:'2',iscur:false},
                {name:'最近七天',value:'3',iscur:false},
                {name:'最近30天',value:'4',iscur:false},
                {name:'指定时间段',value:'5',iscur:false},
            ],
            pickerOptions2:{
                shortcuts:pickerOptions2
            },
        }
    },
    mounted() {
    },
    methods: {
        getStr(d){
            // this.searchInfo.belongCityName = (!d.province&&!d.city&&!d.area) ? '': `${this.getValue(d.province)}${this.getValue(d.city)}${this.getValue(d.area)}`.trim();
            // this.searchInfo.belongCity = d.area.code;
            this.searchInfo.areaCode = d.area ? d.area.name : '';
            this.searchInfo.cityCode = d.city ? d.city.name : '';
            this.searchInfo.provinceCode = d.province ? d.province.name : '';
            this.$emit('change', this.searchInfo)
        },
        getValue(obj){
            return obj ? obj.value:'';
        },
        setCur(index,value){
            this.dataType.forEach((el,idx)=>{
                idx == index ? el.iscur = true : el.iscur = false;
            })
            this.searchInfo.timeQueryType = value;
            if(value != '5'){
                this.searchInfo.queryBeginTime = '';
                this.searchInfo.queryEndTime = '';
            }
            this.$emit('change', this.searchInfo)
        },
        timeVal(val){
            // console.log('val',val)
            if(val){
                this.searchInfo.queryBeginTime = val[0];
                this.searchInfo.queryEndTime = val[1];
            }else{
                this.searchInfo.queryBeginTime = '';
                this.searchInfo.queryEndTime = '';
            }
            this.$emit('change', this.searchInfo);
        },
        // 模糊查询 分类名称或者code
        handleClick(type) {
            this.$emit('change',{},type);
        }
    }
}
</script>

<style type="text/css" lang="scss" scoped>
    .classify_searchinfo{
        .timeLine{
            overflow: hidden;
            padding-top: 2px;
            .currentClick{
                color:#1890ff;
            }
            li{
                float: left;
                font-size: 16px;
                cursor: pointer;
                span{
                    border-right: 1px solid #000 ;
                    padding:0 10px;
                };
            }
            li:last-child span{
                border-right: 0 none;
            }
        }
    }
</style>
