<template>
    <el-form :inline="true" :model="searchInfo" ref="ruleForm" class="demo-ruleForm classify_searchinfo" >
        <el-form-item  label="车主姓名：" prop="driverName">
             <el-input v-model.trim="searchInfo.driverName" clearable>
            </el-input>
        </el-form-item>
        <el-form-item label="手机号码：" prop="driverMobile">
            <el-input v-model.trim="searchInfo.driverMobile" clearable>
            </el-input>
        </el-form-item>
        <el-form-item label="所属客服：" maxlength="18"  prop="shipperName">
            <el-input v-model.trim="searchInfo.aa" clearable disabled>
            </el-input>
        </el-form-item>
        <el-form-item label="所属业务员：" maxlength="18"  prop="shipperName">
            <el-input v-model.trim="searchInfo.aa" clearable disabled>
            </el-input>
        </el-form-item>
                <br>
         <el-form-item label="所属片区：" prop="orderSerial">
            <!-- <vregion :ui="true" @values="regionChange" class="form-control"> -->
                <el-input v-model="searchInfo.aa" placeholder="请选择出发地" disabled></el-input>
            <!-- </vregion> -->
        </el-form-item>
        <el-form-item label="活跃状态：" maxlength="18"  prop="shipperName">
            <el-input v-model.trim="searchInfo.aa" clearable disabled>
            </el-input>
        </el-form-item>
        <el-form-item label="身份状态：" prop="mobile">
           <el-input v-model.trim="searchInfo.aa" clearable disabled>
            </el-input>
        </el-form-item>
        <el-form-item class="btnChoose fr"  style="margin-left:0;">
            <el-button type="primary" icon="el-icon-search" plain :size="btnsize" @click="handleSearch('search')">搜索</el-button>
            <el-button type="info" icon="fontFamily aflc-icon-qingkong" :size="btnsize" plain @click="handleSearch('clear')">清空</el-button>
        </el-form-item>
    </el-form>
</template>

<script type="text/javascript">

// import { parseTime,pickerOptions2 } from '@/utils/index.js'
import vregion from '@/components/vregion/Region'

    export default{
        components:{
            vregion
        },
        data(){
            return{
                btnsize:'mini',
                chooseTime:[],
                // pickerOptions2:{
                //     shortcuts:pickerOptions2
                // },
                searchInfo:{
                    driverName:'',
                    driverMobile:''
                },
            }
        },
        methods: {
            regionChange(d) {
                console.log('data:',d)
                this.searchInfo.belongCityName = (!d.province&&!d.city&&!d.area&&!d.town) ? '': `${this.getValue(d.province)}${this.getValue(d.city)}${this.getValue(d.area)}${this.getValue(d.town)}`.trim();
                if(d.area){
                    this.searchInfo.belongCity = d.area.code;
                }else if(d.city){
                    this.searchInfo.belongCity = d.city.code;
                }
                else{
                    this.searchInfo.belongCity = d.province.code;
                }
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
                        searchObj = Object.assign({}, this.searchInfo);
                        break;
                    case 'clear':
                        this.searchInfo = {
                            driverName:'',
                            driverMobile:''
                        }
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