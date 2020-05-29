<template>
    <div class="identicalStyle trackingOrder" v-loading="loading">
        <div class="classify_info">
            <div class="btns_box">
                <el-button type="primary" icon="el-icon-circle-plus" @click="addFollow" plain size="mini" >增加跟踪记录</el-button>
            </div>
            <div class="info_news">
                <el-table :data="tableData" border height="100%" style="width: 100%">
                    <el-table-column label="序号" width="60">
                        <template slot-scope="scope">
                            {{ (listSystemObj.currentPage - 1)*listSystemObj.pageSize + scope.$index + 1 }}
                        </template>
                    </el-table-column>
                    <el-table-column prop="createTime" label="实际操作时间">
                        <template slot-scope="scope">{{scope.row.createTime | parseTime}}</template>
                    </el-table-column>
                    <el-table-column prop="userName" label="操作人"></el-table-column>
                    <el-table-column prop="userType" label="操作人类型">
                        <template slot-scope="scope">
                            {{scope.row.userType == '1' ? '物流公司' :(scope.row.userType == '2' ? '货主' :'')}}
                        </template>
                    </el-table-column>
                    <el-table-column prop="isShipperShow" label="货主是否可见">
                        <template slot-scope="scope">{{scope.row.isShipperShow == '1'?'是':'否'}}</template>
                    </el-table-column>
                    <el-table-column prop="feedbackShipperTime" label="反馈给货主的操作时间" :render-header="renderHeader">
                        <template slot-scope="scope">{{scope.row.feedbackShipperTime | parseTime}}</template>
                    </el-table-column>
                    <el-table-column prop="operationName" label="操作信息"></el-table-column>
                    <el-table-column prop="remark" label="操作内容"></el-table-column>
                </el-table>
            </div>
        </div>
        <div class="info_tab_footer">共计:{{ totalCount }} <div class="show_pager"> <Pager :total="totalCount" @change="handlePageChange" :sizes="sizes"/></div> </div>    
        <el-dialog title="添加跟踪记录" width="30%" :visible="remarkdialog" :modal-append-to-body = 'false' :before-close="close" top="15vh" :close-on-click-modal="false">
            <el-form class="demo-ruleForm " :model="remarkForm" :rules="rules" ref="ruleForm" :label-width="formLabelWidth" label-position="right" >
                <el-row>
                    <el-col :span="24">
                        <el-form-item label="操作信息:" prop="operationName">
                            <el-input v-model="remarkForm.operationName" clearable maxlength="10"></el-input>
                        </el-form-item>
                        <el-form-item label="货主可见:" prop="isShipperShow">
                            <el-radio-group v-model="remarkForm.isShipperShow">
                                <el-radio label="1">是</el-radio>
                                <el-radio label="0">否</el-radio>
                            </el-radio-group>
                        </el-form-item>
                        <el-form-item label="反馈操作时间:" prop="feedbackShipperTime" v-if="remarkForm.isShipperShow == '1'">
                            <el-date-picker
                            v-model="remarkForm.feedbackShipperTime"
                            type="datetime"
                            value-format="timestamp"
                            placeholder="选择日期时间">
                            </el-date-picker>
                        </el-form-item>
                        <el-form-item label="操作内容:" prop="remark">
                            <el-input type="textarea" :rows="2" maxlength="30" ref="infofocus" v-model="remarkForm.remark" clearable></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button type="primary" plain icon="el-icon-success" @click="submitForm('ruleForm')">保存</el-button>
                <el-button type="primary" plain icon="el-icon-error" @click="close">取消</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
import Pager from '@/components/Pagination/index'
import { parseTime,objectMerge2 } from '@/utils/index.js'
import {orderFollow,addOrderFollow} from '@/api/order/logistics/logistics1.js'
export default {
    data(){
        return{
            loading:false,
            totalCount:0,
            sizes:[30,50,100,200],
            tableData: [],
            formLabelWidth:'120px',
            remarkdialog:false,
            listSystemObj:{
                "currentPage": 1,
                "pageSize": 20,
                "vo": ""
            },
            remarkForm:{
                "feedbackShipperTime": "",//反馈给货主的操作时间
                "isShipperShow": "0",//根据数据类型（货主是否可见（0：否；1：是））
                "operationName": "",//操作名称
                "orderSerial": "",//订单流水号
                "remark": "",//备注
            },
            rules:{
                operationName:{required: true, message: '请输入操作信息', trigger: 'change'},
                feedbackShipperTime:{required: true, message: '请选择反馈给货主的操作时间', trigger: 'change'},
            }
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
            // this.loading = true;
            this.listSystemObj.vo = this.$route.query.orderSerial
            orderFollow(this.listSystemObj).then(res=>{
                this.tableData = res.data.list;
                this.totalCount = res.data.totalCount;
                // this.formData.useTime = parseTime(this.formData.useTime,"{y}-{m}-{d} {h}:{i}:{s}");
                this.loading = false;
            })
        },
        // 页码改变
        handlePageChange(obj) {
            this.listSystemObj.currentPage = obj.pageNum
            this.listSystemObj.pageSize = obj.pageSize
            this.firstblood()
        },
        renderHeader(h, { column, _self }) {
            // var labelAraay = column.label.split('日')
            // if(new Date().getDate()==Number(labelAraay[0])&&this.formAllData.timeQueryType==4){
            //     basicColor = 'redColor'
            // }
            // else if(this.getdata.indexOf(Number(labelAraay[0]))!==-1){
            //     basicColor = 'blueColor'
            // }
           return h('div',{'class':'basicColor'},column.label)
        },
        addFollow(){
            this.remarkdialog = true;
            this.remarkForm.feedbackShipperTime = (new Date()).getTime();
        },
        close(){
            this.remarkdialog = false;
            this.$refs.ruleForm.resetFields();
            if (typeof done === 'function') {
                done()
            }
        },
        submitForm(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    // this.censorForm.examineStatus = this.censorList.find(el => el.code == this.censorForm.examineCode )['name'];
                    this.remarkForm.orderSerial = this.$route.query.orderSerial;
                    let forms = objectMerge2(this.remarkForm);
                    addOrderFollow(forms).then(res =>{
                        this.$message({
                            type: 'success',
                            message: '操作成功！'
                        })
                        this.close();
                        this.firstblood();
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
      }
    },
    components:{
        Pager
    },
}
</script>

<style lang="scss">
    .trackingOrder{
        padding: 0;
        .basicColor{
            display: block;color:red;line-height: 23px;
        }
    }
</style>
