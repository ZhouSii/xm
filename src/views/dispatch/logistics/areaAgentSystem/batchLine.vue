<template>
    <div class="batchLine commoncss">
        <el-dialog :title='formtitle' :close-on-click-modal="false" v-el-drag-dialog top="5vh" :visible="dialogFormVisibleBatchLine" @close="close">
            <el-form   :model="standForm" :rules="newrules" label-position="right"  ref="ruleForm"  :label-width="formLabelWidth">
                <el-row :gutter="20">
                    <h6 style="line-height: 40px;font-size:16px;margin-bottom:10px;">请选择运作路线：</h6>
                    <el-col :span="12">
                        <el-form-item  label="出发地：" prop="agencyName" class="is-required">
                            <getCityList @returnStr="getStrStart" :isArea="true" v-model="standForm.companyName" ref="startArea"></getCityList>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="到达地：" prop="companyName" class="is-required">
                            <!-- <el-select ref="myautocomplete" v-model="checkList" multiple collapse-tags @focus="getStartAreaList" class="select-tree" @change="change">
                                <el-option
                                v-for="item in openGroups"
                                :disabled="item.disabled"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                                <div :class="'indent indent'+item.index">{{ item.label }}</div>
                                </el-option>
                            </el-select> -->
                            <el-cascader-multi ref="cascadermulti" v-model="checkList" :data="optionsLineArr" :only-last="true" :collapse-tags="true" @focus="getStartAreaList" @change="change" :is-two-dimension-value = "false"></el-cascader-multi>
                        </el-form-item>
                    </el-col>
                </el-row>
                <div class="tableStyle">
                    <el-table
                        ref="multipleTable"
                        :data="areaAgentList"
                        stripe
                        border
                        align = "center"
                        height="100%"
                        tooltip-effect="dark"
                        @selection-change = "getinfomation"
                        style="width: 100%"> 
                        <el-table-column
                            type="selection"
                            width="50">
                        </el-table-column>
                        <el-table-column label="序号" width="60">
                            <template slot-scope="scope">
                                {{ scope.$index + 1 }}
                            </template>
                        </el-table-column>  
                        <el-table-column
                            label="区代名称"
                            sortable
                            :show-overflow-tooltip="true"
                            prop="agencyName"
                            min-width="150">
                        </el-table-column>
                        <el-table-column
                            prop="companyName"
                            :show-overflow-tooltip="true"
                            sortable
                            label="区代公司名称"
                            min-width="150">
                        </el-table-column>
                        <el-table-column
                            :show-overflow-tooltip="true"
                            sortable
                            prop="agencyArea"
                            label="区代所在地"
                            min-width="150"
                            >
                        </el-table-column>
                        <el-table-column
                            :show-overflow-tooltip="true"
                            sortable
                            prop="detailAddress"
                            min-width="150"
                            label="详细地址"
                            >
                        </el-table-column>
                    </el-table>
                </div>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button type="primary" plain  icon="el-icon-success" @click="submitForm('ruleForm')" :disabled="btnShow || checkedinformation.length <= 0">保 存</el-button>
                <el-button type="primary" plain icon="el-icon-error" @click="close">取 消</el-button>
            </div> 
        </el-dialog>
    </div>
</template>

<script>

import { getAgencyLine,batchAreaAgent,batchAreaAgentList } from '@/api/dispatch/areaAgentSystem.js'
import { objectMerge2 } from '@/utils/'
import { getStreetInfo } from '@/api/common'
import getCityList from '@/components/GetCityList/chinaMap'

function expandGroups (data, i) {
  let res = []
  data.map(el => {
    el.index = i;
    el.disabled = i < 3 ? true : false;
    res.push(el)
    if(el.children){
      res = res.concat(expandGroups(el.children, i+1))
    }
  })
  return res
}

export default {
    name: 'batchLine',
    props: {
        dialogFormVisibleBatchLine:{
            type:Boolean,
            required:true
        },
        formtitle:{
            type:String,
            required:false,
            default:'批量增加运作路线'
        },
        lineId:{
            type:String,
        }
    },
    components:{
        getCityList
    },
    computed: {
        openGroups () {
            // 用来标记是第几层
            let index = 1
            let res
            res = expandGroups(this.optionsLineArr, index)
            return res
        }
    },
    data() {
      return {
        btnShow:false,
        formLabelWidth:'100px',
        standForm:{
            province:'',//区代省份
            city:'',//区代市
            area:'',//区域
            areaCode:'',//区域code
            agencyAndLine:[],//运作路线
            ids:[],//选择批量更新IDS
        },
        checkList:[],
        areaAgentList:[],
        optionsLineArr:[],
        checkedinformation:[],
        reFreash:'',
        newrules: {
        },
      };
    },
    watch:{
        dialogFormVisibleBatchLine:{
            handler(newVal,oldVal){
                if(newVal){
                    // this.reviseForms();
                }
            },
            deep:true
        }
    },
    mounted(){
        this.init();
    },
    methods: {
        // 判断是否选中
		getinfomation(selection) {
			this.checkedinformation = selection;
		},
        change (val) {
            // console.log(val)
            this.standForm.agencyAndLine = [];
            val.forEach(el => {
                this.standForm.agencyAndLine.push({lineId:el})
            })
        },
        getStrStart(d){
            this.standForm.province = d.province ? d.province.name : '';//省名称
            this.standForm.city = d.city ? d.city.name : '';//市名称
            this.standForm.area = d.area ? d.area.name : '';
            this.standForm.areaCode = d.area ? d.area.code : '';
            this.getTableList();
        },
        getTableList(){
            batchAreaAgentList(this.standForm.areaCode,this.standForm.city).then(res => {
                this.areaAgentList = res.data;
            }).catch(err => {
                this.areaAgentList = [];
                this.$message({
                    type: 'info',
                    message: '网络失败，原因：' + (err.errorInfo ? err.errorInfo : err.text)
                })
            })
        },
        getStartAreaList(){
            if(this.standForm.areaCode == ''){
                this.optionsLineArr = [];
                return  this.$message({
                    type: 'warning',
                    message: '请先选择出发地！'
                })
            }else{
                if(this.reFreash == this.standForm.areaCode && this.optionsLineArr.length != 0){
                    return
                }else{
                    this.reFreash = this.standForm.areaCode;
                    this.checkList = [];
                    getAgencyLine(this.standForm.areaCode,this.standForm.city).then(res => {
                        // console.log('this.optionsLineArr',this.optionsLineArr)
                        if(!res.data || res.data.length == 0){
                            this.optionsLineArr = [];
                            this.$message({
                                type: 'info',
                                message: '当前区代所在地没有线路信息，请先添加干线费定价!'
                            })
                        }else{
                            // setTimeout(() => {
                                this.optionsLineArr = res.data;
                            // }, 200);
                        }
                    }).catch(err => {
                        this.$message({
                            type: 'info',
                            message: '网络失败，原因：' + (err.errorInfo ? err.errorInfo : err.text)
                        })
                    })
                }
            }
        },
        reviseForms(){
        },
        close(){
            if(this.dialogFormVisibleBatchLine){
                this.$emit('update:dialogFormVisibleBatchLine',false);
                this.$refs.ruleForm.resetFields();
                this.clearForms();
                this.$emit('renovate');
                this.btnShow = false;
            }
        },
        //初始化选择项数据
        init(){
        },
        submitForm(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    this.complateInfo();
                    this.btnShow = true;
                    let forms = objectMerge2(this.standForm);
                    // console.log(forms)
                    let standarFunction;
                    batchAreaAgent(forms).then(res =>{
                        this.$message({
                            type: 'success',
                            message: '批量增加运作路线成功!'
                        })
                        this.close();
                    }).catch(err => {
                        this.$message({
                            type: 'info',
                            message: '操作失败，原因：' + (err.errorInfo ? err.errorInfo : err.text)
                        })
                        this.btnShow = false;
                    })
                } else {
                    this.$message({
                        type: 'warning',
                        message: '请填写完整数据!'
                    })
                    return false;
                }
            });
        },
        clearForms(){
            for (const i in this.standForm) {
                if(i == 'agencyStreets' || i == 'agencyAndLine'){
                    this.standForm[i] = []
                }
                this.standForm[i] = ''
            };
            this.$refs.startArea.clearData();
            this.areaAgentList = [];
            this.checkList = [];
            // console.log('cascadermulti',this.$refs.cascadermulti)
        },
        complateInfo(){
            this.standForm.ids = [];
            this.checkedinformation.forEach(el => {
                this.standForm.ids.push(el.id)
            })
        }
    },
}
</script>

<style lang="scss">
    .indent{
        border-left: 1px dashed #aaa;
        padding-left: 5px;
        border-bottom: 1px dashed #aaa;
        line-height: 33px;
        height: 33px;
    }
    .indent1{

    }
    .indent2{
        margin-left: 1em;
    }
    .indent3{
        margin-left: 2em;
    }
    .indent4{
        margin-left: 3em;
    }
    .indent5{
        margin-left: 4em;
    }
    .tableStyle{
        height: 600px;
    }
</style>
