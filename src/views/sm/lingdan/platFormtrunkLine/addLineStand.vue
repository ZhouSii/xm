<template>
    <div class="addLineStand commoncss">
        <el-dialog :title='formtitle' :close-on-click-modal="false" v-el-drag-dialog top="10vh" :visible="dialogFormVisible" @close="close">
            <el-form   :model="standForm" :rules="newrules" label-position="right"  ref="ruleForm"  :label-width="formLabelWidth">
                <el-row :gutter="20">
                   <el-col :span="12">
                        <el-form-item  label="区代所在地：" prop="agencyAreaCode" v-if="!isModify">
                            <getCityList class="chooseItem" @returnStr="getAreaDelegate" :isArea="true" v-model="standForm.agencyAreaCode" ref="areaDelegate"></getCityList>
                        </el-form-item>
                        <el-form-item  label="区代所在地：" class="is-required" v-else>
                            <el-input v-model="standForm.agencyArea" disabled></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12" >
                        <el-form-item label="区代：" prop="areaAgencyIds"  v-if="!isModify">
                            <el-select v-model="standForm.areaAgencyIds" filterable multiple  collapse-tags @focus="getAreaAgency" clearable placeholder="请选择">
                                <el-option
                                v-for="item in optionseAreaAgency"
                                :key="item.id"
                                :label="item.agencyName"
                                :value="item.id">
                                </el-option>
                            </el-select>
                        </el-form-item>
                         <el-form-item  label="区代：" class="is-required" v-else>
                            <el-input :value="standForm.agencyName" disabled></el-input>
                        </el-form-item>
                    </el-col>
                </el-row> 
                <el-row :gutter="20" v-if="isModify">
                   <el-col :span="12">
                        <el-form-item  label="区代物流公司：" class="is-required">
                            <el-input v-model="standForm.companyName" disabled></el-input>
                        </el-form-item>
                    </el-col>
                </el-row> 
                <el-row :gutter="20">
                    <!-- <el-col :span="12">
                        <el-form-item  label="运作覆盖街道：">
                            <div class="defaultTree">
                                <el-tree
                                :props="defaultProps"
                                :highlight-current="true"
                                :check-strictly="false"
                                :load="loadDataTree"
                                lazy
                                node-key="code"
                                ref="defaultTree"
                                :expand-on-click-node="false"
                                @check = 'getCurrentNode'
                                show-checkbox>
                                </el-tree>
                            </div>
                        </el-form-item>
                    </el-col> -->
                    <el-col :span="12">
                        <el-form-item label="标准定价路线：" class="is-required">
                            <div class="defaultTree">
                                <el-tree
                                show-checkbox
                                :data="agencyLineTree"
                                :props="defaultProps2"
                                :check-strictly="true"
                                default-expand-all
                                node-key="value"
                                ref = 'defaultTree2'
                                :highlight-current = "true"
                                >
                                </el-tree>
                            </div>
                        </el-form-item>
                    </el-col>
                </el-row> 
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button type="primary" plain  icon="el-icon-success" @click="submitForm('ruleForm')" :disabled="btnShow">{{isModify ? '保 存' : '确 定'}}</el-button>
                <el-button type="primary" plain icon="el-icon-error" @click="close">取 消</el-button>
            </div> 
        </el-dialog>
    </div>
</template>

<script>

import { newlineStandPrice,lineStandPriceDetails,reviselineStandPrice,getAgencyLine2,lineStandPriceEx } from '@/api/server/lingdan/otherService.js'
import { objectMerge2 } from '@/utils/'
import getCityList from '@/components/GetCityList/chinaMap1'
import { getCityInfo  } from '@/api/common'
import { getAreaAgent } from '@/api/dispatch/areaAgentSystem.js'

export default {
    name: 'addLineStand',
    props: {
        dialogFormVisible:{
            type:Boolean,
            required:true
        },
        formtitle:{
            type:String,
            required:false,
            default:'新增区代运作路线定价'
        },
        isModify:{
            type:Boolean,
            default:false,
        },
        changeForm:{
            type:Object,
        },
    },
    directives: {
    },
    components:{
        getCityList
    },
    data() {

        var checkAgencyRate = (rule, value, callback) => {
            if (!value) {
                return callback(new Error('请输入单票最低收费'));
            }
            else if (parseFloat(value) <= 0) {
                callback(new Error('单票最低收费需大于0'));
            } else {
                callback();
            }
        };

      return {
        btnShow:false,
        formLabelWidth:'120px',
        defaultProps2: {
            label: 'label',
            children: 'children',
            isLeaf: "leaf"
        },
        standForm:{
            agencyArea:'',//区代所在地(区代必填)
            agencyAreaName:'',//区代所在地(区代必填)
            agencyAreaCode:'',//
            areaAgencyIds:[],//
            cityName:'',//
            // "areaAgencyId": "",
            "areaPlatformIds": [],
            companyName:'',
        },
        agencyLineTree:[],
        newrules: {
            agencyAreaCode:{required: true, message: '请选择区代所在地', trigger: 'change'},
            // areaAgencyId:{required: true, message: '请选择区代', trigger: 'change'},
            areaAgencyIds:{type: 'array', required: true, message: '请选择区代', trigger: 'change'},
        },
        optionseAreaAgency:[],
      };
    },
    watch:{
        dialogFormVisible:{
            handler(newVal,oldVal){
                if(newVal){
                    this.reviseForms();
                }
            },
            deep:true
        },
    },
    mounted(){
        this.init()
    },
    methods: {
        getAreaDelegate(d){
            this.standForm.agencyArea = (!d.province&&!d.city&&!d.area&&!d.town) ? '': `${this.getValue(d.province)}${this.getValue(d.city)}${this.getValue(d.area)}${this.getValue(d.town)}`.trim();
            this.standForm.agencyAreaCode = d.area ? d.area.code : '';
            this.standForm.agencyAreaName = d.area ? d.area.name : '';
            this.standForm.cityName = d.city ? d.city.name : '';
            this.standForm.areaAgencyIds = [];
            this.agencyLineTree = [];
            if(this.standForm.agencyAreaCode){
                this.getTreeData(this.standForm.agencyAreaCode,this.standForm.cityName)
            }
        },
        getTreeData(areaCode,cityName){
            getAgencyLine2(areaCode,cityName).then(res => {
                this.agencyLineTree = res.data;
                if(!res.data){
                    this.$message({
                        type: 'info',
                        message: '当前区代所在地没有线路信息，请先添加干线费定价!'
                    })
                }
            }).catch(err => {
                this.$message({
                    type: 'info',
                    message: '网络失败，原因：' + (err.errorInfo ? err.errorInfo : err.text)
                })
            })
        },
        getValue(obj){
            return obj ? obj.value:'';
        },
        getAreaAgency(){
            this.optionseAreaAgency = [];
            if(this.standForm.agencyAreaCode == ''){
                return  this.$message({
                    type: 'warning',
                    message: '请先选择区代所在地！'
                })
            }else{
                getAreaAgent(this.standForm.agencyAreaCode).then(res => {
                    setTimeout(() => {
                        this.optionseAreaAgency = res.data;
                        if(this.optionseAreaAgency == [] && this.standForm.areaCode){
                            this.standForm.areaAgencyIds = [];
                            this.standForm.agencyName = '';
                        }
                    }, 200);
                }).catch(err => {
                    this.standForm.areaAgencyIds = [];
                    this.standForm.agencyName = '';
                })
            }
        },
        close(){
            if(this.dialogFormVisible){
                this.$emit('update:dialogFormVisible',false);
                this.$refs.ruleForm.resetFields();
                this.clearForms();
                this.$refs.defaultTree2.setCheckedKeys([]);
                this.$emit('renovate');
                this.btnShow = false;
                if(!this.isModify){
                    this.$refs.areaDelegate.clearData();
                }
            }
        },
        //初始化选择项数据
        init(){
          
        },
        reviseForms(){
            if(this.isModify){
                // console.log(this.changeForm)
                lineStandPriceDetails(this.changeForm.id).then(res => {
                    this.standForm = objectMerge2(res.data);
                    // this.optionseAreaAgency = this.standForm.lineMaps[0];
                    this.getTreeData(this.standForm.areaCode,this.standForm.city);
                    this.$refs.defaultTree2.setCheckedKeys(this.standForm.lineMaps)
                })
                // this.$set(this.standForm, 'timeVal', [this.changeForm.rewardStartDate,this.changeForm.rewardEndDate])
            }
            else{
                this.clearForms();
            }
        },
        submitForm(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    this.btnShow = true;
                    this.completeName();
                    let forms = objectMerge2(this.standForm);
                    // console.log(forms)
                    if(this.standForm.areaPlatformIds.length == 0){
                        this.$message({
                            type: 'warning',
                            message: '请选择标准定价路线!'
                        })
                    }else{
                        if(this.isModify){
                            reviselineStandPrice(forms).then(res =>{
                                this.$message({
                                    type: 'success',
                                    message: this.isModify ? '修改区代运作路线定价成功' : '新增区代运作路线定价成功!'
                                })
                                this.close();
                            }).catch(err => {
                                this.$message({
                                    type: 'info',
                                    message: '操作失败，原因：' + (err.errorInfo ? err.errorInfo : err.text)
                                })
                                this.btnShow = false;
                            })
                        }else{
                            // lineStandPriceEx(forms).then(res => {
                                newlineStandPrice(forms).then(res=>{
                                    this.$message({
                                        type: 'success',
                                        message: '操作成功!',
                                        duration:2000
                                    })
                                    this.close()
                                }).catch(err => {
                                    this.$message({
                                        type: 'info',
                                        message: '操作失败，原因：' + (err.errorInfo ? err.errorInfo : err.text)
                                    })
                                    this.btnShow = false;
                                })
                            // }).catch(err => {
                            //     this.$confirm(err.errorInfo ? err.errorInfo : err.text, '提示', {
                            //         confirmButtonText: '确定',
                            //         cancelButtonText: '取消',
                            //         type: 'warning'
                            //     }).then( ()=>{
                            //         newlineStandPrice(forms).then(res=>{
                            //             this.$message({
                            //                 type: 'success',
                            //                 message: '操作成功!',
                            //                 duration:2000
                            //             })
                            //             this.close()
                            //         }).catch(err => {
                            //             this.$message({
                            //                 type: 'info',
                            //                 message: '操作失败，原因：' + (err.errorInfo ? err.errorInfo : err.text)
                            //             })
                            //             this.btnShow = false;
                            //         })
                            //     }).catch(() => {
                            //         this.$message({
                            //             type: 'info',
                            //             message: '已取消'
                            //         })
                            //         this.btnShow = false;
                            //     })
                            // })
                        }
                    }
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
                if(i == 'areaPlatformIds' ){
                    this.standForm[i] = []
                }else{
                    this.standForm[i] = ''
                }
            } 
        },
        completeName(){
            const lineId = [];
            const getNodeId2 = this.$refs.defaultTree2.getCheckedNodes();
            // console.log('getNodeId2',getNodeId2)
            getNodeId2.forEach(el => {
                lineId.push(el.value)
            })
            this.standForm.areaPlatformIds = lineId;
        },
    },
}
</script>

<style rel="stylesheet/scss" lang="scss">
    .addLineStand{
        .defaultTree{
            width: 100%;
            height: 296px;
            // margin-bottom: 12px;
            overflow: auto;
            border: 1px solid #ccc;
            padding:5px;
        }

        .el-tree-node__content>.el-checkbox {
            display: none;
        }

        .el-tree-node__content>.is-leaf+.el-checkbox {
            display: block;
        }
    }
</style>
