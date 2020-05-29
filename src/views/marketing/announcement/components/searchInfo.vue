<template>
    <el-form :inline="true" :model="searchInfo" ref="ruleForm" class="demo-ruleForm classify_searchinfo">
            <el-form-item label="区域" prop="pointName">
                <vregion :ui="true" @values="regionChange" class="form-control">
                    <el-input v-model="searchInfo.belongCityName" placeholder="请选择出发地" clearable></el-input>
                </vregion>
            </el-form-item>
            <el-form-item label="标题" prop="orderSerial">
                <el-input v-model="searchInfo.title" placeholder="请输入标题内容" clearable>
                </el-input>
            </el-form-item>
            <el-form-item class="btnChoose fr"  style="margin-left:0;">
                <el-button type="primary" icon="el-icon-search" plain :size="btnsize"  @click="handleSearch('search')">搜索</el-button>
                <el-button type="info" icon="fontFamily aflc-icon-qingkong" :size="btnsize" plain @click="handleSearch('clear')">清空</el-button>
            </el-form-item>
    </el-form>
</template>

<script type="text/javascript">

import { parseTime,pickerOptions2 } from '@/utils/index.js'
import vregion from '@/components/vregion/Region'

    export default{
        components:{
            vregion
        },
        data(){
            return{
                btnsize:'mini',
                chooseTime:[],
                pickerOptions2:{
                    shortcuts:pickerOptions2
                },
                searchInfo:{
                    belongCityName: "",//区域
                    title:'',//标题
                    province:'',
                    city:'',
                },
            }
        },
        methods: {
            regionChange(d) {
                console.log('data:',d)
                this.searchInfo.belongCityName = (!d.province&&!d.city&&!d.area&&!d.town) ? '': `${this.getValue(d.province)}${this.getValue(d.city)}${this.getValue(d.area)}${this.getValue(d.town)}`.trim();
                this.searchInfo.province = d.province ? d.province.code : '';
                this.searchInfo.city = d.city ? d.city.code : '';
            },
            getValue(obj){
                return obj ? obj.value:'';
            },
            //模糊查询 分类名称或者code
            handleSearch(type){
                let searchObj; 
                switch(type){
                    case 'search':
                        searchObj = Object.assign({}, this.searchInfo);
                        break;
                    case 'clear':
                        this.searchInfo = {
                            belongCityName: "",//区域
                            title:'',//标题
                            province:'',
                            city:'',
                        }
                        searchObj = this.searchInfo ;
                        break;
                }
                this.$emit('change', searchObj)
            },
        }
    }
</script>

<style type="text/css" lang="scss" scoped>
    
</style>