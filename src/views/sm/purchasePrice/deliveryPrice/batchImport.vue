<template>
    <el-dialog
    :title="currentTitle"
    class="batchImport"
    top="15vh"
    :modal="false"
    :visible="dialogVisible"
    custom-class="add-review"
    :close-on-click-modal="false"
    :modal-append-to-body="false"
    v-loading="loading"
    width="30%"
    :before-close="close">
        <div class="ifcancel">
            <el-form :model="form" :rules="rules" ref="ruleForm" :label-width="formLabelWidth" label-position="right">
                <el-form-item  label="专线承运商：" prop="carriersId">
                    <el-select v-model="form.carriersId" filterable placeholder="请选择">
                        <el-option
                        v-for="item in optionsCarriers"
                        :key="item.id"
                        :label="item.carriersName"
                        :value="item.id">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="导入数据：" prop="excelFile" v-if="exportType == 'batchImport'">
                    <!-- <input type="file" ref="inputer" @change="getfileName"> -->
                    <el-input v-model="form.excelFile" clearable>
                        <el-button slot="prepend" title="点击下载导入模板" icon="el-icon-download" @click="downloading"></el-button>
                        <label class="file-box" slot="append" for="file">
                            <span class="look-file">浏览</span>
                            <input id="file" ref="inputer" type="file" class="file-input Js_file-input" @change="getfileName">
                        </label>
                    </el-input>
                </el-form-item>
            </el-form>
        </div>
        <div slot="footer" class="dialog-footer">
            <el-button type="primary" plain icon="el-icon-success" v-if="exportType == 'batchImport'" @click="submitForm('ruleForm')">确认</el-button>
            <el-button type="primary" plain icon="el-icon-success" v-else @click="submitForm2('ruleForm')">确认</el-button>
            <el-button type="primary" plain icon="el-icon-error" @click="close">取消</el-button>
        </div>
    </el-dialog>
</template>

<script type="text/javascript">
import { getCarriersLine } from '@/api/dispatch/CarriersLine.js'
import { importDeliveryPriceExcel,deliveryPriceOutAgencyExcel } from '@/api/server/lingdan/otherService.js'
import { objectMerge2 } from '@/utils/';
    export default{
        name:'batchImport',
        components:{
        },
        props:{
            dialogVisible:{
                type:Boolean,
                default:false
            },
            currentTitle:{
                type:String,
                default:'请选择导入定价的出发区/县'
            },
            exportType:{
                type:String,
            }
        },
        watch:{
            dialogVisible(newVal,oldVal){
                // console.log('newVal',newVal)
                if(newVal){
                    // this.init();
                    // console.log(this.initForm)
                }
            },
        },
        data(){
            return{
                formLabelWidth:'120px',
                loading:true,
                form:{
                    excelFile:'',//
                    platformType:'1',//平台类型(1：承运商，2：区代，3：平台)
                    carriersId:'',//专线承运商ID
                    carriersName:'',//承运商名称
                    useType :'0',//定价类型(0:送货,1:提货，现在默认是为1，待需求修改)
                },
                optionseAreaAgency:[],
                rules:{
                    carriersId:{required: true, message: '请选择专线承运商', trigger: 'change'},
                    // pointId:{required: true, message: '请选择承运商网点', trigger: 'change'},
                    // startAreaCode:{ required: true, message: '请选择区代所在地', trigger: 'change' },
                    // agencyId:{ required: true, message: '请选择区代', trigger: 'change' },
                    excelFile:{ required: true, message: '请选择导入文件', trigger: 'change' },
                },
                btnShow:false,
                optionsCarriers:[],
            }
        },
        mounted(){
            this.init();
        },
        methods: {
            getfileName(val){
                // console.log('getfileName',val)
                // console.log('getfileName222',val.files)
                // console.log('getfileName222',val.path[0].files)
                this.form.excelFile = val.path[0].files[0].name;
            },
            init(){
                getCarriersLine().then(res => {
                    // console.log('resArr',resArr)
                    this.optionsCarriers = res.data;
                })
            },
            submitForm(formName) {
                // console.log('this.$refs.inputer',this.$refs.inputer)
                // console.log('inputFile.files[0]',this.$refs.inputer.files[0])
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        this.btnShow = true;
                        let inputFile = this.$refs.inputer;
                        var formdata = new FormData();
                        // console.log('inputFile.files[0]',inputFile.files[0])
                        formdata.append('excelFile',inputFile.files[0]);
                        formdata.append('platformType',this.form.platformType);
                        formdata.append('carriersId',this.form.carriersId);
                        formdata.append('carriersName',this.optionsCarriers.find(item => item.id ==  this.form.carriersId)['carriersName']);
                        formdata.append('useType',this.form.useType);
                        // console.log('formdata',formdata)
                        importDeliveryPriceExcel(formdata).then(res =>{
                            this.$message({
                                type: 'success',
                                message: '操作成功！'
                            })
                            this.close();
                        }).catch(err => {
                            this.$message({
                                type: 'warning',
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
            submitForm2(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        this.form.carriersName = this.optionsCarriers.find(item => item.id ==  this.form.carriersId)['carriersName']
                        let standFrom = objectMerge2(this.form);
                        // console.log('standFromstandFrom',standFrom)
                        this.$message.info('正在导出中...');    
                        deliveryPriceOutAgencyExcel(standFrom).then(res => {
                            var blob = new Blob([res]);
                            let href =  window.URL.createObjectURL(blob);
                            var NewDom = document.createElement("a");
                            NewDom.setAttribute('href',href);
                            NewDom.setAttribute('target', '_blank');
                            NewDom.setAttribute('download', standFrom.carriersName +'送货费定价.xlsx');
                            document.body.appendChild(NewDom);
                            NewDom.click();
                            document.body.removeChild(NewDom)
                            this.close();
                        }).catch(err => {
                            this.$message({
                                type: 'warning',
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
            close(done) {
                this.$refs.ruleForm.resetFields();
                this.$emit('update:dialogVisible', false);
                if(this.exportType == 'batchImport'){
                    this.$refs.inputer.value  = '';
                }
                // this.$refs.areaDelegate.clearData();
                this.$emit('close');
                if (typeof done === 'function') {
                    done()
                }
            },
            downloading(){
                this.$emit('downloading')
            }
        }
    }
</script>

<style type="text/css" lang="scss">
    .batchImport{
        .el-form{
            padding: 0 20px;
             .el-form-item__content{
                .el-select{
                    width: 100%;
                }
                .el-input-group__append{
                    background: #fff;
                    &:hover{
                        background: #0588c3;
                        .look-file{
                            color: #fff;
                        }
                    }
                }
                .look-file{
                    cursor: pointer;
                    color: #0588c3;
                }
                .Js_file-input{
                    display: none;
                }
            }
        }
    }
</style>

