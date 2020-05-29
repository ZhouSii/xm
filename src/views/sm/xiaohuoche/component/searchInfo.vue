<template>
     <el-form :inline="true" :model="searchInfo" ref="ruleForm" class="demo-ruleForm classify_searchinfo">
        <el-form-item label="服务分类" prop="pointName" v-if="classfy == 'standarPrice'">
            <el-select v-model="searchInfo.serivceCode" clearable placeholder="请选择">
                <el-option
                    v-for="item in optionsServiceType"
                    :key="item.id"
                    :label="item.name"
                    :value="item.code"
                    :disabled="item.disabled">
                </el-option>
            </el-select>
        </el-form-item>
        <el-form-item label="车辆类型" prop="orderSerial">
            <el-select v-model="searchInfo.carType" clearable placeholder="请选择">
                <el-option
                v-for="item in optionsCarType"
                :key="item.id"
                :label="item.name"
                :value="item.code"
                :disabled="item.disabled">
                </el-option>
            </el-select>
        </el-form-item>
        <el-form-item label="状态" prop="shipperName">
            <el-select v-model="searchInfo.usingStatus" clearable placeholder="请选择">
                <el-option
                v-for="item in optionsStatus"
                :key="item.id"
                :label="item.label"
                :value="item.value"
                :disabled="item.disabled">
                </el-option>
            </el-select>
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
        name:'SM-serviceSerach',
        props:{
            classfy:{
                type:String,
                default:''
            },
        },
        components:{

        },
        data(){
            return{
                btnsize:'mini',
                cartype:'AF018',//车辆类型
                servicetype:'AF017',//车辆类型
                optionsCarType:[
                    {
                    code:'',
                    name:'全部'
                    }
                ],
                optionsServiceType:[
                    {
                    code:'',
                    name:'全部'
                    }
                ],
                optionsStatus:[
                    {
                    value:'',
                    label:'全部'
                    },
                    {
                    value: '1',
                    label: '启用'
                    },
                    {
                    value: '0',
                    label: '禁用'
                    }
                ],
                searchInfo:{
                    carType:'',
                    serivceCode:'',
                    usingStatus:'',
                },
            }
        },
        mounted(){
            this.init();
        },
        methods: {
                //获取  服务和车辆 类型列表
            init(){
                Promise.all([getDictionary(this.cartype)]).then( resArr => {
                    resArr[0].data.map(item => {
                        this.optionsCarType.push(item)
                    })
                   
                })
                if(this.classfy == 'standarPrice'){
                    getDictionary(this.servicetype).then(res => {
                        res.data.map(item => {
                            this.optionsServiceType.push(item)
                        })
                    })
                }
            },
            //模糊查询 分类名称或者code
            handleSearch(type){
                // console.log(this.chooseTime)
                let searchObj;
                switch(type){
                    case 'search':
                        searchObj = Object.assign({}, this.searchInfo);
                        this.$emit('change', searchObj)
                        break;
                    case 'clear':
                        this.searchInfo = {
                            carType:'',
                            serivceCode:'',
                            usingStatus:'',
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