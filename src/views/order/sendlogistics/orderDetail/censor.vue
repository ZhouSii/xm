<template>
    <div class="identicalStyle censorOrder" v-loading="loading">
        <div class="classify_info">
            <div class="btns_box">
                <!-- <div v-if="examineStatus !== '已审查'"> -->
                    <span>审查状态：{{examineStatus}}</span>
                    <el-button type="primary" icon="el-icon-circle-plus" plain size="mini" :disabled="examineStatus == '已审查'" @click="OpenRegister">审查登记</el-button>
                    <el-button type="primary" icon="el-icon-circle-plus" plain size="mini" :disabled="examineStatus == '已审查'" @click="Opencensor">修改审查状态</el-button>
                    <el-button type="primary" icon="el-icon-check" plain size="mini" :disabled="examineStatus == '已审查'" @click="OpenPass">审核通过</el-button>
                <!-- </div> -->
            </div>
            <div class="info_news">
                <el-table  border height="100%" :data="tableData" style="width: 100%" @selection-change="getSelection" @row-click="clickDetails">
                    <el-table-column type="index" label="序号" width="80">
                    </el-table-column>
                    <el-table-column prop="remark" label="备注"></el-table-column>
                    <el-table-column prop="creater" label="登记人"></el-table-column>
                    <el-table-column prop="createTime" label="登记时间">
                        <template slot-scope="scope">
                            {{scope.row.createTime | parseTime}}
                        </template>
                    </el-table-column>
                </el-table>
                <div class="info_tab_footer">共计:{{ totalCount }} <div class="show_pager"> <Pager :total="totalCount" @change="handlePageChange"/></div> </div>    
            </div>
        </div>
        <!-- 审查登记 -->
        <el-dialog title="审查登记" width="30%" :visible="registerdialog" :modal-append-to-body = 'false' :before-close="close" top="15vh" :close-on-click-modal="false">
        <el-form class="demo-ruleForm " :model="registerForm" :rules="rules" ref="ruleForm" :label-width="formLabelWidth" label-position="right" >
            <el-row>
            <el-col :span="24">
            <el-form-item label="审核描述:" class="remark">
                <el-input type="textarea" :rows="2" placeholder="1-100间的字符" maxlength="100" ref="infofocus" v-model="registerForm.remark" clearable></el-input>
            </el-form-item>
            </el-col>
            </el-row>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button type="primary" plain icon="el-icon-success" @click="submitForm('ruleForm')">保存</el-button>
                <el-button type="primary" plain icon="el-icon-error" @click="close">取消</el-button>
            </div>
        </el-dialog>
        <!-- 审查状态 -->
        <el-dialog title="修改审查状态" width="30%" :visible="censordialog" :modal-append-to-body = 'false' :before-close="close1" top="15vh" :close-on-click-modal="false">
            <el-form class="demo-ruleForm " :model="censorForm" :rules="rules1" ref="ruleForm1" :label-width="formLabelWidth" label-position="right" >
                <el-row>
                    <el-col :span="24">
                        <el-form-item label="审查状态:" prop="examineCode">
                            <el-select v-model="censorForm.examineCode" clearable placeholder="请选择">
                                <el-option
                                    v-for="item in censorList"
                                    :key="item.code"
                                    :label="item.name"
                                    :value="item.code">
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                </el-row>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button type="primary" plain icon="el-icon-success" @click="submitForm1('ruleForm1')">保存</el-button>
                <el-button type="primary" plain icon="el-icon-error" @click="close1">取消</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
import Pager from '@/components/Pagination/index'
import { parseTime } from '@/utils/index.js'
import { aflcLclOrderAuditLogList,aflcLclOrderAuditLogregister,aflcLclOrderAuditLogCkeck,aflcLclOrderAuditVerify } from '@/api/order/logistics/logistics1.js'
import { objectMerge2 } from '@/utils/index'

export default {
    data(){
        return{
            loading:false,
            totalCount:0,
            registerdialog:false,
            censordialog:false,
            tableData: [],
            examineStatus:'',
            censorList:[{
                name:'审查中',
                code:'AF0850102',
            },{
                name:'已审查',
                code:'AF0850103',
            }],
            registerForm:{
                // "examineCode": "",//审查状态
                "remark": "",//审查描述
                // "examineStatus": "",//审查状态
                "orderSerial": "",//orderSerial
                // "verifyCode": "",//审核状态code
                // "verifyName": "",//审核状态
            },
            censorForm:{
                "examineCode": "",//审查状态
                // "remark": "",//审查描述
                "examineStatus": "",//审查状态
                "orderSerial": "",//orderSerial
                // "verifyCode": "",//审核状态code
                // "verifyName": "",//审核状态
            },
            selectRowData: [],
            formLabelWidth:'80px',
            rules1:{

            },
            rules:{

            },
            listSystemObj:{
                "currentPage": 1,
                "pageSize": 20,
                "vo": {
                   orderSerial:'',
                }
            },
        }
    },
    props: {
        isvisible: {
            type: Boolean,
            default: false
        }
    },  
    methods:{
        firstblood(){
            this.loading = true;
            this.listSystemObj.vo.orderSerial = this.$route.query.orderSerial
            aflcLclOrderAuditLogList(this.listSystemObj).then(res=>{
                this.examineStatus = res.data.list[0].newExamineStatus;
                this.tableData = res.data.list[0].logs;
                this.totalCount = res.data.totalCount;
                this.loading = false;
            }).catch(err => {
                this.loading = false;
            })
        },
        handlePageChange(obj) {
            this.listSystemObj.currentPage = obj.pageNum;
            this.listSystemObj.pageSize = obj.pageSize;
            this.firstblood();
        },
        // 判断选中与否
        getSelection(val) {
            console.log('选中内容', val)
            this.selectRowData = val
        },
        // 点击选中当前行
        clickDetails(row, event, column) {
            this.$refs.multipleTable.toggleRowSelection(row)
        },
        //打开审核登记
        OpenRegister(){
            this.registerdialog = true 
        },
        //修改审核状态
        Opencensor(){
            this.censordialog = true 
        },
        //审核通过
        OpenPass(){
            this.$confirm('确认将订单通过审核吗？', '订单审核', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                console.log('222')
                let dto = {
                    "examineCode": "",//审查状态
                    "examineRemark": "",//审查描述
                    "examineStatus": "",//审查状态
                    "orderSerial": "",//orderSerial
                    "verifyCode": "",//审核状态code
                    "verifyName": "",//审核状态
                }
                dto.verifyCode = 'AF0850602';
                dto.orderSerial = this.$route.query.orderSerial;
                aflcLclOrderAuditVerify(dto).then(res => {
                    this.$message({
                        type: 'success',
                        message: '订单已通过审核!'
                    })
                    this.firstblood();
                }).catch((err) => {
                    this.$message({
                        type: 'error',
                        message: '操作失败，原因：' + (err.errorInfo ? err.errorInfo : err.text)
                    })
                });
            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '已取消!'
                })
            });
        },
        //审核登记取消
        close(){
            this.registerdialog = false;
            this.firstblood();
        },
        //审核状态取消
        close1(){
            this.censordialog = false;
            this.firstblood();
        },
        submitForm(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    this.registerForm.orderSerial = this.$route.query.orderSerial;
                    let forms = objectMerge2(this.registerForm);
                    aflcLclOrderAuditLogregister(forms).then(res =>{
                        this.$message({
                            type: 'success',
                            message: '操作成功！'
                        })
                        this.close();
                    }).catch(err => {
                        this.$message({
                            type: 'info',
                            message: '操作失败，原因：' + (err.errorInfo ? err.errorInfo : err.text)
                        })
                        // this.btnShow = false;
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
        submitForm1(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    this.censorForm.examineStatus = this.censorList.find(el => el.code == this.censorForm.examineCode )['name'];
                    this.censorForm.orderSerial = this.$route.query.orderSerial;
                    let forms = objectMerge2(this.censorForm);
                    aflcLclOrderAuditLogCkeck(forms).then(res =>{
                        this.$message({
                            type: 'success',
                            message: '操作成功！'
                        })
                        this.close1();
                    }).catch(err => {
                        this.$message({
                            type: 'info',
                            message: '操作失败，原因：' + (err.errorInfo ? err.errorInfo : err.text)
                        })
                        // this.btnShow = false;
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
    },
    watch:{
    isvisible:{
          handler(newVal,oldVal){
            if (newVal) {
            this.firstblood()
            }   
          },
          immediate: true
      },
    registerdialog:{
      handler: function(val, oldVal) {
        if(!val){
        this.registerForm.smsContent =' '
        }
      }
    },
    censordialog:{
        handler: function(val, oldVal) {
            if(!val){
                this.censorForm.smsContent =' '
            }
        }
    },
    },
    components:{
        Pager
    },
}
</script>

<style lang="scss">
    .censorOrder{
        padding: 0;
        .el-form-item {
            margin-bottom: 10px;
        }
        .el-form-item__content{
            .el-select{
                width: 100%;
            }
            span{
                margin-left: 10px;
            }
        }
        .btns_box span{
            margin-right: 20px;
        }
    }
</style>
