<template>
    <div>
    <!-- 新增分类信息 -->
        <div class="shipperOfdispatch plantform commoncss">
            <el-dialog :title='formtitle' :close-on-click-modal="true"  :visible="dialogFormVisibleChange" @close="close">
                    <div class="bindLeft bind">
                        <div class="chooseShipper chooseCommon">
                            <p><span>* </span>当前运营人员：</p>
                            <div class="nowData">
                                <el-input v-model="changeforms.platInfo" placeholder="请输入内容" disabled></el-input>
                            </div>
                        </div>
                        <div class="chooseBindTime">
                            <p><span>* </span>绑定开始时间 ：</p>
                            <el-date-picker
                            v-model="changeforms.bindingStartDate"
                            type="date"
                            placeholder=""
                            :clearable = "false"
                            format="yyyy 年 MM 月 dd 日"
                            value-format="timestamp">
                            </el-date-picker>
                        </div>
                    </div>
                    <div class="bindright bind">
                        <div class="chooseShipper chooseCommon">
                            <p><span>* </span>当前货主账号 ：</p>
                            <div class="nowData">
                                <el-input v-model="changeforms.shipperInfo" placeholder="请输入内容" disabled></el-input>
                            </div>
                        </div>
                        <div class="chooseBindTime">
                            <p><span>* </span>绑定结束时间 ：</p>
                            <el-date-picker
                            v-model="changeforms.bindingEndDate"
                            type="date"
                            placeholder="选择日期"
                            :clearable = "false"
                            format="yyyy 年 MM 月 dd 日"
                            value-format="timestamp">
                            </el-date-picker>
                        </div>
                    </div>
                    
                <div slot="footer" class="dialog-footer">
                    <el-button type="primary" plain  icon="el-icon-success" @click="changeInfoSave" :disabled="btnShow">保 存</el-button>
                    <el-button type="primary" plain icon="el-icon-error" @click="closeChangeInfo">取 消</el-button>
                </div> 
            </el-dialog>
        </div>
    </div>
</template>

<script>
import { aflcShipperPlatformUpdata } from '@/api/dispatch/Directional.js'


export default {
    name: 'changeCarShipper',
    props: {
        dialogFormVisibleChange:{
            type:Boolean,
            required:true
        },
        formtitle:{
            type:String,
            required:true
        },
        changeforms:{
            type:Object,
            required:true
        }
    },
    data() {
      return {
        startTime:null,
        endTime:null,
        btnShow:false,
        deTime:''
      };
    },
    components:{
    },
    computed: {
        startTimeStatus() {
    　　　　return this.changeforms.bindingStartDate
    　　},
        endTimeStatus() {
    　　　　return this.changeforms.bindingEndDate
    　　},
    },
    watch:{
        startTimeStatus(newValue, oldValue) {
            if(oldValue){
                this.startTime = oldValue
            }else{
                this.startTime = newValue
            }
            this.ifWrong();
    　　},
        endTimeStatus(newValue, oldValue) {
            if(oldValue){
                this.endTime = oldValue
            }else{
                this.endTime = newValue
            }
            this.ifWrong();
    　　},
        dialogFormVisibleChange:{
            handler(newVal,oldVal){
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
        //验证time
        ifWrong(){
            if(!this.changeforms.bindingStartDate || !this.changeforms.bindingEndDate){
                return
            }else{
                if(this.changeforms.bindingStartDate  > this.changeforms.bindingEndDate){
                    this.$message({
                        type: 'warning',
                        message: '绑定结束时间怎么能比绑定开始早呢！~'
                    })
                    this.changeforms.bindingStartDate  = this.startTime ;
                    this.changeforms.bindingEndDate = this.endTime ;
                }
            }
        },
        close(){
            this.btnShow = false;
            this.$emit('update:dialogFormVisibleChange',false)
        },
        init(){
            // this.startTime = this.changeforms.bindingStartDate;
            // this.endTime = this.changeforms.bindingEndDate;
            this.deTime = this.changeforms.bindingEndDate;
        },
        //修改保存
        changeInfoSave(){
                // console.log(this.changeforms)
                // console.log('结束:',this.changeforms.bindingStartDate,this.changeforms.bindingEndDate)
                
           if(!this.changeforms.bindingStartDate){
              
                 return this.$message({
                    type: 'warning',
                    message: '请填写绑定开始时间~'
                })
            }
            else if(!this.changeforms.bindingEndDate ){
                 return this.$message({
                    type: 'warning',
                    message: '请填写绑定结束时间~'
                })
            }
            else{
                this.btnShow = true;
                if(this.deTime != this.changeforms.bindingEndDate){
                    this.changeforms.bindingEndDate +=  1* 24 * 60 * 60 * 1000 - 1000;
                }
                aflcShipperPlatformUpdata(this.changeforms).then(res=>{
                    this.$emit('renovate');
                    this.close();
                }).catch(err => {
                    this.$message({
                        type: 'warning',
                        message: '操作失败，原因：' + (err.errorInfo ? err.errorInfo : err.text)
                    })
                    this.btnShow = false;
                    
                })  
            }
        },
        //修改关闭
        closeChangeInfo(){
            this.close();
        },
    },
}
</script>

<style rel="stylesheet/scss" lang="scss" >
    .plantform{
        .el-dialog__body {
            border-bottom: 1px solid #ccc;
            margin-bottom: 0;
            overflow: hidden;
            margin: 0 20px;
            display: flex;
            p{
                display: inline-block;
                font-size: 12px;
                line-height: 20px;
                color: #666666;
                width: 100px;
                text-align: right;
                span{
                    color: red;
                }
            }
        }
        & .bind{
            flex: 1;
        }
        .nowData{
            display: inline-block;
            margin-bottom: 20px;
            .el-input{
                width: 200px;
            }
        }
    }
    
</style>
