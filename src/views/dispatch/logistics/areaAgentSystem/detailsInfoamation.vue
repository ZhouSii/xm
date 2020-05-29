<template>
    <div class="detailsInfo commoncss">
        <el-dialog :title='formtitle' :close-on-click-modal="false" v-el-drag-dialog top="5vh" :visible="dialogFormVisibleDetails" @close="close">
            <el-tabs v-model="detailsInfoeName" type="card" @tab-click="handleClick" >
            <!-- 基础信息 -->
                <el-tab-pane label="基础信息" name="detailsInfoeList">
                    <el-form   :model="standForm" label-position="right" ref="ruleForm"  :label-width="formLabelWidth">
                        <el-row :gutter="20">
                            <el-col :span="12">
                                <el-form-item  label="区代名称：" prop="agencyName">
                                    <el-input v-model="standForm.agencyName" clearable  disabled></el-input>
                                </el-form-item>
                            </el-col>
                            <el-col :span="12">
                                <el-form-item label="区代公司：" prop="companyName">
                                    <el-input v-model="standForm.companyName" disabled></el-input>
                                </el-form-item>
                            </el-col>
                        </el-row> 
                        <el-row :gutter="20">
                            <el-col :span="12">
                                <el-form-item label="公司联系人：" prop="comContactName">
                                    <el-input v-model="standForm.comContactName" clearable disabled></el-input>
                                </el-form-item>
                            </el-col>
                            <el-col :span="12">
                                <el-form-item label="联系人电话：" prop="comMobile">
                                    <el-input v-model="standForm.comMobile" clearable disabled></el-input>
                                </el-form-item>
                            </el-col>
                        </el-row>
                        <el-row :gutter="20">
                            <el-col :span="24">
                                <el-form-item  label="区代详细地址：" prop="detailAddress">
                                    <el-input v-model="standForm.detailAddress" clearable disabled></el-input>
                                </el-form-item>
                            </el-col>
                        </el-row>
                        <el-row :gutter="20">
                            <el-col :span="12">
                                <el-form-item label="区代所在地：" prop="agencyArea">
                                    <el-input v-model="standForm.agencyArea" placeholder="请选择" disabled></el-input>
                                </el-form-item>
                            </el-col>
                            <el-col :span="12">
                                <el-form-item label="门牌号：" prop="doorNo">
                                    <el-input v-model="standForm.doorNo" clearable disabled></el-input>
                                </el-form-item>
                            </el-col>
                        </el-row>
                        <el-row :gutter="20">
                            <el-col :span="12">
                                <el-form-item  label="区代联系人：" prop="contactName">
                                    <el-input v-model="standForm.contactName" clearable disabled></el-input>
                                </el-form-item>
                            </el-col>
                            <el-col :span="12">
                                <el-form-item label="联系人电话：" prop="mobile">
                                    <el-input v-model="standForm.mobile"  clearable v-numberOnly disabled></el-input>
                                </el-form-item>
                            </el-col>
                        </el-row> 
                        <el-row :gutter="20">
                            <el-col :span="12">
                                <el-form-item label="运作时间：" prop="timeVal">
                                    <el-input v-model="standForm.mobile"  clearable v-numberOnly disabled></el-input>
                                </el-form-item>
                            </el-col>
                            <el-col :span="12">
                                <el-form-item  label="区代客服电话：" prop="agencyMobile">
                                    <el-input v-model="standForm.agencyMobile" clearable disabled></el-input>
                                </el-form-item>
                            </el-col>
                        </el-row> 
                        <el-row :gutter="20">
                            <el-col :span="12">
                                <el-form-item label="前端显示区代图片：" prop="imgSrc">
                                    <el-button size="small" type="primary" plain v-showPicture :imgurl="standForm.imgSrc">查看</el-button>
                                </el-form-item>
                            </el-col>
                        </el-row> 
                    </el-form>
                </el-tab-pane>

            <!-- 运作覆盖街道 -->
                <el-tab-pane label="运作覆盖街道" name="detailsInfoeStreet">
                    <el-table
                        ref="multipleTable"
                        :data="standForm.agencyStreets"
                        stripe
                        border
                        align = "center"
                        height="100%"
                        tooltip-effect="dark"
                        style="width: 100%"> 
                        <el-table-column label="序号" width="60">
                            <template slot-scope="scope">
                                {{ scope.$index + 1 }}
                            </template>
                        </el-table-column>  
                        <el-table-column
                            label="街道所在地"
                            sortable
                            :show-overflow-tooltip="true"
                            prop="startArea"
                            min-width="150">
                            <template slot-scope="scope">
                                {{ scope.row.startProvince }}{{ scope.row.startCity }}{{ scope.row.startArea }}
                            </template>
                        </el-table-column>
                        <el-table-column
                            prop="startStreet"
                            :show-overflow-tooltip="true"
                            sortable
                            label="街道名称"
                            min-width="150">
                        </el-table-column>
                        <el-table-column
                            :show-overflow-tooltip="true"
                            sortable
                            prop="createTime"
                            label="开通时间"
                            min-width="150"
                            >
                            <template slot-scope="scope">{{scope.row.createTime | parseTime}}</template>
                        </el-table-column>
                        <el-table-column
                            :show-overflow-tooltip="true"
                            sortable
                            prop="creater"
                            min-width="150"
                            label="操作人"
                            >
                        </el-table-column>
                    </el-table>
                </el-tab-pane>

            <!-- 运作路线 -->
                <el-tab-pane label="运作路线" name="detailsInfoLine">
                       <el-table
                        ref="multipleTable1"
                        :data="standForm.agencyAndLine"
                        stripe
                        border
                        align = "center"
                        height="100%"
                        tooltip-effect="dark"
                        style="width: 100%"> 
                        <el-table-column label="序号" width="60">
                            <template slot-scope="scope">
                                {{ scope.$index + 1 }}
                            </template>
                        </el-table-column>  
                        <el-table-column
                            label="出发地"
                            sortable
                            :show-overflow-tooltip="true"
                            prop="startArea"
                            min-width="150">
                            <template slot-scope="scope">
                                {{ scope.row.startProvince }}{{ scope.row.startCity }}{{ scope.row.startArea }}
                            </template>
                        </el-table-column>
                        <el-table-column
                            prop="endArea"
                            :show-overflow-tooltip="true"
                            sortable
                            label="到达地"
                            min-width="150">
                            <template slot-scope="scope">
                                {{ scope.row.endProvince }}{{ scope.row.endCity }}{{ scope.row.endArea }}
                            </template>
                        </el-table-column>
                        <el-table-column
                            :show-overflow-tooltip="true"
                            sortable
                            prop="createTime"
                            label="开通时间"
                            min-width="150"
                            >
                            <template slot-scope="scope">{{scope.row.createTime | parseTime}}</template>
                        </el-table-column>
                        <el-table-column
                            :show-overflow-tooltip="true"
                            sortable
                            prop="creater"
                            min-width="150"
                            label="操作人"
                            >
                        </el-table-column>
                    </el-table>
                </el-tab-pane>
            </el-tabs>
            <div slot="footer" class="dialog-footer">
                <el-button type="primary" plain icon="el-icon-error" @click="close">取 消</el-button>
            </div> 
        </el-dialog>
    </div>
</template>

<script>

import { AreaAgentStreetOrLine } from '@/api/dispatch/areaAgentSystem.js'
import { objectMerge2 } from '@/utils/'
import { getStreetInfo } from '@/api/common'

export default {
    name: 'detailsInfo',
    props: {
        dialogFormVisibleDetails:{
            type:Boolean,
            required:true,
            default:false,
        },
        formtitle:{
            type:String,
            required:false,
            default:'区代详情'
        },
        lineId:{
            type:String,
        }
    },
    components:{
    },
    data() {
      return {
        formLabelWidth:'150px',
        standForm:{
            agencyName:'',//区代名称
            companyId:'',//区代公司
            companyName:'',//区代公司名称
            comContactName:'',//公司联系人
            comMobile:'',//公司联系人电话
            detailAddress:'',//区代详细地址
            latitude:'',//纬度
            longitude:'',//经度
            agencyArea:'',//区代所在地
            province:'',//区代省份
            city:'',//区代市
            area:'',//区域
            areaCode:'',//区域code
            doorNo:'',//门牌号
            contactName:'',//区代联系人
            mobile:'',//区代联系人电话
            agencyMobile:'',//区代客服电话
            imgSrc:'',//区代图片
            timeVal:[],
            startTime:'',//运作开始日期
            endTime	:'',//运作结束日期
            agencyStreets:[],
            agencyAndLine:[]//{lineId:''}
        },
        dataKeys:'',
        detailsInfoeName:'detailsInfoeList',
      };
    },
    watch:{
        dialogFormVisibleDetails:{
            handler(newVal,oldVal){
                console.log('dialogFormVisibleDetails',newVal,oldVal)
                if(newVal){
                    this.init();
                }
            },
            deep:true
        }
    },
    mounted(){
        
    },
    methods: {
        handleClick(tab, event) {
            this.dataKeys = Math.random();
            this.detailsInfoeName = tab.name;
        },
        close(){
            if(this.dialogFormVisibleDetails){
                this.$emit('update:dialogFormVisibleDetails',false);
            }
        },
        //初始化选择项数据
        init(){
            let streetOrLine = '';
            AreaAgentStreetOrLine(this.lineId,streetOrLine).then(res => {
                this.standForm = res.data;
            }).catch(err => {
                this.$message({
                    type: 'info',
                    message: '网络失败，原因：' + (err.errorInfo ? err.errorInfo : err.text)
                })
            });
        },
    },
}
</script>

<style rel="stylesheet/scss" lang="scss">
    .detailsInfo{
        .el-dialog__wrapper{
            .el-dialog{
                .el-dialog__body{
                    padding: 20px 20px;
                    .el-tabs__content{
                        margin-top: 20px;
                    }
                }
            }
        }
    }
</style>
