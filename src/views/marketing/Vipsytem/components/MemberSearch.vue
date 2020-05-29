<template>
    <el-form :inline="true" :model="searchInfo" ref="ruleForm" class="demo-ruleForm classify_searchinfo">
        <el-form-item label="车主" prop="driverName">
            <el-input v-model="searchInfo.driverName" placeholder="账户/姓名/车牌号" clearable></el-input>
        </el-form-item>
        <el-form-item :label=" searchType =='exchange' ? '兑换城市' :'购买地'" prop="location">
            <el-input v-model="searchInfo.location" clearable></el-input>
        </el-form-item>
        <el-form-item :label=" searchType =='exchange' ? '兑换日期' :'购买日期'" prop="timeArr">
            <el-date-picker
                v-model="searchInfo.timeArr"
                type="daterange"
                unlink-panels
                value-format="timestamp"
                start-placeholder="开始日期"
                end-placeholder="结束日期">
            </el-date-picker>
        </el-form-item>
        <el-form-item class="btnChoose fr"  style="margin-left:0;">
            <el-button type="primary" :size="btnsize" icon="el-icon-search" plain @click="handleSearch('search')">搜索</el-button>
            <el-button type="info" :size="btnsize" icon="fontFamily aflc-icon-qingkong" plain @click="handleSearch('clear')">清空</el-button>
        </el-form-item>
    </el-form>
</template>

<script type="text/javascript">

import { getDictionary } from '@/api/common.js'
    export default{
        name:'YWGroup-serviceSerach',
        props:{
            searchType:{
                type:String,
                default:''
            },
        },
        components:{

        },
        data(){
            return{
                btnsize:'mini',
                searchInfo:{
                    driverName:'',
                    location:'',
                    timeArr:[],
                },
            }
        },
        mounted(){

        },
        methods: {
            //初始化
            init(){

            },
            //模糊查询 分类名称或者code
            handleSearch(type){
                // console.log(this.chooseTime)
                let searchObj;
                switch(type){
                    case 'search':
                        searchObj = {
                            driverName:this.searchInfo.driverName,
                            location:this.searchInfo.location,
                        };
                        searchObj.startTime = this.searchInfo.timeArr ? this.searchInfo.timeArr[0] : '';
                        searchObj.endTime = this.searchInfo.timeArr ? this.searchInfo.timeArr[1] : '';
                        this.$emit('change', searchObj)
                        break;
                    case 'clear':
                        this.searchInfo = {
                            driverName:'',
                            location:'',
                        }
                        searchObj = Object.assign({}, this.searchInfo);
                        this.$emit('change', searchObj)
                        break;
                }
            },
        }
    }
</script>

<style type="text/css" lang="scss" scoped>
    
</style>