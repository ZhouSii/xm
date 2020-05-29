
<template>
    <el-form :inline="true" :model="searchInfo" ref="ruleForm" class="demo-ruleForm classify_searchinfo" >
        <el-form-item  label="手机号码" prop="mobile">
            <el-input v-model.trim="searchInfo.mobile" placeholder="请输入" clearable maxlength="11"></el-input>
        </el-form-item>
        <el-form-item  label="公司名称" prop="companyName">
            <el-input v-model.trim="searchInfo.companyName" placeholder="请输入" clearable></el-input>
        </el-form-item>
        <el-form-item label="联系人" prop="contacts">
            <el-input v-model.trim="searchInfo.contacts" placeholder="请输入" clearable maxlength="20"></el-input>
        </el-form-item>
        <el-form-item label="同城潜力等级" prop="potentialGrade">
            <el-select v-model="searchInfo.potentialGrade" clearable placeholder="请选择">
                <el-option
                v-for="item in optionsGradeType"
                :key="item.id"
                :label="item.name"
                :value="item.code"
                :disabled="item.disabled">
                </el-option>
            </el-select>
        </el-form-item>
        <el-form-item label="所在地" prop="belongCity">
            <getCityList @returnStr="getStrStart" :isArea="true" :ifChange="true" v-model="searchInfo.belongCity" ref="gradeChinaMap"></getCityList>
        </el-form-item>
        <el-form-item label="货主类型" prop="shipperType">
            <el-select v-model="searchInfo.shipperType" clearable placeholder="请选择">
                <el-option
                v-for="item in optionsShipperType"
                :key="item.id"
                :label="item.name"
                :value="item.code"
                :disabled="item.disabled">
                </el-option>
            </el-select>
        </el-form-item>
        <el-form-item label="所属商圈" prop="tradeAreaId">
            <el-input v-model.trim="searchInfo.tradeAreaId" clearable></el-input>
        </el-form-item>
        <!-- <el-form-item label="所属行业" prop="belongIndustry">
            <el-select v-model="searchInfo.belongIndustry" clearable placeholder="请选择">
                <el-option
                v-for="item in optionsIndustryType"
                :key="item.id"
                :label="item.name"
                :value="item.code"
                :disabled="item.disabled">
                </el-option>
            </el-select>
        </el-form-item> -->
        <el-form-item label="所属业务组" prop="groupCode">
           <businessGroup  @change = "getVal"  v-model="searchInfo.groupCode" ref ='businessGroup'/>
        </el-form-item>
        <el-form-item label="调整等级" prop="levelAdjustment">
            <el-select v-model="searchInfo.levelAdjustment" clearable placeholder="请选择">
                <el-option
                v-for="item in optionsLevelAdjustment"
                :key="item.id"
                :label="item.name"
                :value="item.code"
                :disabled="item.disabled">
                </el-option>
            </el-select>
        </el-form-item>
        <el-form-item class="btnChoose fr"  style="margin-left:0;">
            <el-button type="primary" :size="btnsize" icon="el-icon-search" plain @click="handleSearch('search')">搜索</el-button>
            <el-button type="info" icon="fontFamily aflc-icon-qingkong" :size="btnsize" plain @click="handleSearch('clear')">清空</el-button>
        </el-form-item>
    </el-form>
</template>

<script type="text/javascript">

import { parseTime } from '@/utils/index.js'
// import vregion from '@/components/vregion/Region'
import { getDictionary,DicGradeType,DicShippertype,DicIndustryType } from '@/api/common.js'
import businessGroup from '@/components/selectTree/businessGroup'  
import getCityList from '@/components/GetCityList/chinaMap'

    export default{
        components:{
            // vregion
            businessGroup,
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
                auditingStatus:'AF00104',//认证状态
                accountStatus:'AF00105',//账户状态
                searchInfo:{
                    "belongCity": "",
                    "belongCityName": "",//所在地名称
                    "belongIndustry": "",//所属行业
                    "belongIndustryName": "",//所属行业名称
                    "belongSalesmanName": "",//所属业务员
                    "companyName": "",//公司名称
                    "contacts": "",//联系人
                    "groupCode": "",//分组代码
                    "groupName": "",//分组名称
                    "levelAdjustment": "",//调整等级
                    "mobile": "",//手机号码
                    groupCode:'',//分组代码
                    groupName:'',//分组名称
                    // "orderVolumeLastMonth": 0,//上月订单量
                    "potentialGrade": "",//潜力等级
                    "potentialGradeName": "",//潜力等级姓名
                    "shipperType": "",//货主类型
                    "tradeAreaId": "",//所属商圈
                },
                //货主同城潜力等级
                optionsGradeType:[{
                    code: '',
                    name: '全部'
                }],
                // 货主类型
                optionsShipperType: [{
                    code: '',
                    name: '全部'
                }], 
                //商圈行业
                optionsIndustryType:[{
                    code: '',
                    name: '全部'
                }],
                optionsLevelAdjustment:[{
                    code: '',
                    name: '全部'
                }],
            }
        },
        watch:{
         
        },
        mounted(){
            this.init();
        },
        methods: {
            getStrStart(d){
                if(d.area){
                    this.searchInfo.belongCity = d.area.code;
                }else if(d.city){
                    this.searchInfo.belongCity = d.city.code;
                }else{
                    this.searchInfo.belongCity = d.province.code;
                }
            },
            //  getValue(obj){
            //     return obj ? obj.value:'';
            // },
            // 获取状态列表
            init() {
                // 获取状态列表
                Promise.all([DicGradeType(),DicShippertype(),DicIndustryType()]).then(resArr => {
                    // console.log('resArr',resArr)
                    this.optionsGradeType = this.optionsGradeType.concat(resArr[0].data);
                    this.optionsLevelAdjustment = this.optionsLevelAdjustment.concat(resArr[0].data);
                    this.optionsShipperType = this.optionsShipperType.concat(resArr[1].data);
                    this.optionsIndustryType = this.optionsIndustryType.concat(resArr[2].data);
                })
            },
            //模糊查询 分类名称或者code
            handleSearch(type){
                if(type == 'clear'){
                    for (const i in this.searchInfo) {
                        this.searchInfo[i] = ''
                    } 
                    this.$refs.gradeChinaMap.clearData();
                }
                let searchObj = Object.assign({}, this.searchInfo);
                this.$emit('change', searchObj)
            },
            getVal(val){
                console.log(val)
                this.searchInfo.groupCode = val;
            },
        }
    }
</script>

<style type="text/css" lang="scss" scoped>
    
</style>