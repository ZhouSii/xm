<template>
    <div class="reviewDialog commoncss">
        <el-dialog
            title="确认审核通过"
            top="15vh"
            :visible="dialogFormVisibleReview"
            :close-on-click-modal="false"
            width="60%"
            :modal="false"
            v-el-drag-dialog
            @close="close(true)"
            >
            <el-table
            :data="dataDetails" 
            border
            ref="multipleTable"
            align = "center"
            >
                <el-table-column
                    prop="orderSerial"
                    label="订单编号"
                    min-width="200">
                        <template  slot-scope="scope">
                            <h4 class="needMoreInfo" @click="pushOrderSerial(scope.row)">{{ scope.row.orderSerial}}</h4>
                        </template>
                </el-table-column>
                <el-table-column
                    prop="unnormal"
                    label="订单标识"
                    min-width="150">
                    <template  slot-scope="scope">
                        <span v-html="scope.row.unnormal"></span>
                    </template>
                </el-table-column>
                 <el-table-column
                    prop="reviewStatusName"
                    label="审查状态"
                    min-width="150">
                </el-table-column>
                <el-table-column
                    prop="complaintStatusName"
                    label="投诉处理状态"
                    min-width="150">
                </el-table-column>
                <el-table-column
                    prop="goodsDamageStatusName"
                    label="货损处理状态"
                    min-width="150">
                </el-table-column>
                <el-table-column
                    prop="unusualStatusName"
                    label="异常处理状态"
                    min-width="150">
                </el-table-column>
            </el-table>
            <div slot="footer" class="dialog-footer">
                <el-button type="primary" plain  icon="el-icon-success" @click="submitForm('ruleForm')">确 定</el-button>
                <el-button type="primary" plain icon="el-icon-error" @click="close(false)">取 消</el-button>
            </div> 
        </el-dialog>
    </div>
</template>

<script>

import { orderManagerAuditList,orderManagerAuditPass } from '@/api/order/ordermange'
import { objectMerge2 } from '@/utils/'

export default {
    name: 'reviewDialog',
    props: {
        dialogFormVisibleReview:{
            type:Boolean,
            required:true
        },
        currentData:{
            type:Object,
            required:true,
            default:()=>({})
        }
    },
    components:{
    },
    data() {
      return {
          dataDetails:[],
      };
    },
    watch:{
        dialogFormVisibleReview:{
            handler(newVal,oldVal){
                if(newVal){
                    this.reviseForms();
                }
            },
            deep:true
        }
    },
    mounted(){
        this.init();
    },
    methods: {
        close(status){
            if(this.dialogFormVisibleReview){
                this.$emit('update:dialogFormVisibleReview',false);
                if(!status){
                    this.$emit('renovate',this.currentData.orderSerial,'pass');
                }
            }
        },
        //初始化选择项数据
        init(){
           
        },
        //详情弹窗
        pushOrderSerial(item){
            this.$router.push({name: '订单详情',query:{ orderSerial:item.orderSerial }});
            this.$emit('update:dialogFormVisibleEx',false);
        },
        reviseForms(){
            // getConfirmExpensesInfo(this.orderSerial).then(res => {
            //     this.standForm = res.data;
            // })
            this.dataDetails = [];
            this.dataDetails.push(this.currentData);
        },
        submitForm(formName) {
            // this.$refs[formName].validate((valid) => {
            //     if (valid) {
                    orderManagerAuditPass(this.currentData.orderSerial).then(res => {
                        this.$message({
                            type: 'success',
                            message: '订单已通过审核!'
                        })
                        this.close();
                    }).catch((err) => {
                        this.$message({
                            type: 'error',
                            message: '操作失败，原因：' + (err.errorInfo ? err.errorInfo : err.text)
                        })
                        this.close();
                    });
            //     } else {
            //         this.$message({
            //             type: 'warning',
            //             message: '请填写完整数据!'
            //         })
            //         return false;
            //     }
            // });
        },
    },
}
</script>

<style rel="stylesheet/scss" lang="scss">
    .reviewDialog{
      
    }
</style>
