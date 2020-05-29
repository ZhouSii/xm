<template>
     <el-form :inline="true" :model="searchInfo" ref="ruleForm" class="demo-ruleForm classify_searchinfo">
        <el-form-item label="出发地" prop="strartAddress">
            <el-input v-model="searchInfo.strartAddress" clearable></el-input>
        </el-form-item>
        <el-form-item label="到达地" prop="endAddress">
            <el-input v-model="searchInfo.endAddress" clearable></el-input>
        </el-form-item>
         <el-form-item label="车辆类型" prop="carType">
            <el-select v-model="searchInfo.carType" clearable placeholder="请选择" >
                <el-option
                v-for="item in optionsCartype"
                :key="item.id"
                :label="item.name"
                :value="item.code"
                :disabled="item.disabled">
                </el-option>
            </el-select>
        </el-form-item>
         <el-form-item label="车辆规格" prop="carSpec">
            <el-select v-model="searchInfo.carSpec" clearable placeholder="请选择" >
                <el-option
                v-for="item in optionsCartypeSpec"
                :key="item.id"
                :label="item.name"
                :value="item.code"
                :disabled="item.disabled">
                </el-option>
            </el-select>
        </el-form-item>
         <el-form-item label="车源有效期" prop="isLongCar">
            <el-select v-model="searchInfo.isLongCar" clearable placeholder="请选择" >
                <el-option
                v-for="item in optionsCarSourceTime"
                :key="item.id"
                :label="item.name"
                :value="item.code"
                :disabled="item.disabled">
                </el-option>
            </el-select>
        </el-form-item>
         <el-form-item label="车主" prop="belongDriver">
            <el-input v-model="searchInfo.belongDriver" clearable></el-input>
        </el-form-item>
         <el-form-item label="手机号码" prop="phone">
            <el-input v-model="searchInfo.phone" clearable></el-input>
        </el-form-item>
         <el-form-item label="车源状态" prop="carInfoState">
            <el-select v-model="searchInfo.carInfoState" clearable placeholder="请选择" >
                <el-option
                v-for="item in optionsSourceStatus"
                :key="item.id"
                :label="item.name"
                :value="item.code"
                :disabled="item.disabled">
                </el-option>
            </el-select>
        </el-form-item>
        <el-form-item label="常驻地" prop="usualPlace">
            <el-input v-model="searchInfo.usualPlace" clearable></el-input>
        </el-form-item>
        <el-form-item label="发布时间" prop="timeArr">
            <el-date-picker
                v-model="searchInfo.timeArr"
                type="daterange"
                unlink-panels
                start-placeholder="开始日期"
                end-placeholder="结束日期"
                value-format="yyyy-MM-dd">
            </el-date-picker>
        </el-form-item>
        <el-form-item class="btnChoose fr"  style="margin-left:0;">
            <el-button type="primary" :size="btnsize" icon="el-icon-search" plain @click="handleSearch('search')">搜索</el-button>
            <el-button type="info" :size="btnsize" icon="fontFamily aflc-icon-qingkong" plain @click="handleSearch('clear')">清空</el-button>
        </el-form-item>
    </el-form>
</template>

<script type="text/javascript">

import { DicCartype,DicCartypeSpec,DicCarSourceTime,DicCarSourceStatus } from '@/api/common.js'
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
                    strartAddress:'',
                    endAddress:'',
                    carType:'',
                    carSpec:'',
                    isLongCar:'',
                    belongDriver:'',
                    phone:'',
                    carInfoState:'',
                    createStartTime:'',
                    createEndTime:'',
                    usualPlace:'',
                    timeArr:[],
                },
                optionsCartype:[{
                    id:'01',
                    code:'',
                    name:'全部'
                }],
                optionsCartypeSpec:[{
                    id:'001',
                    code:'',
                    name:'全部'
                }],
                optionsCarSourceTime:[{
                    id:'0001',
                    code:'',
                    name:'全部'
                }],
                optionsSourceStatus:[{
                    id:'00001',
                    code:'',
                    name:'全部'
                }],
            }
        },
        mounted(){
            this.init();
        },
        methods: {
            //初始化
            init(){
                Promise.all([DicCartype(),DicCartypeSpec(),DicCarSourceTime(),DicCarSourceStatus()]).then( resArr => {
                    this.optionsCartype = this.optionsCartype.concat(resArr[0].data) ;
                    this.optionsCartypeSpec = this.optionsCartypeSpec.concat(resArr[1].data);
                    this.optionsCarSourceTime = this.optionsCarSourceTime.concat(resArr[2].data) ;
                    this.optionsSourceStatus = this.optionsSourceStatus.concat(resArr[3].data) ;
                }).catch(err => {
                    this.$message({
                        type: 'info',
                        message: '初始化失败，原因：' + (err.errorInfo ? err.errorInfo : err.text)
                    })
                })
            },
            //模糊查询 分类名称或者code
            handleSearch(type){
                let searchObj;
                switch(type){
                    case 'search':
                        if(this.searchInfo.timeArr){
                            this.searchInfo.createStartTime = this.searchInfo.timeArr[0];
                            this.searchInfo.createEndTime = this.searchInfo.timeArr[1];
                        }
                        searchObj = Object.assign({}, this.searchInfo);
                        this.$emit('change', searchObj)
                        break;
                    case 'clear':
                        this.searchInfo = {
                           strartAddress:'',
                            endAddress:'',
                            carType:'',
                            carSpec:'',
                            isLongCar:'',
                            belongDriver:'',
                            phone:'',
                            carInfoState:'',
                            createStartTime:'',
                            createEndTime:'',
                            usualPlace:'',
                            timeArr:[],
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