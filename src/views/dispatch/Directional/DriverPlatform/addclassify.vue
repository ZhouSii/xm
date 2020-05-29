<template>
    <div>
        <!-- 新增分类信息 -->
            <div class="shipperPlatform commoncss">
                <el-dialog :title='formtitle' :close-on-click-modal="true"  :visible="dialogFormVisible" @close="close">
                    <div class="bindLeft bind">
                        <div class="chooseBindTime">
                            <p><span>* </span>拦截开始时间 ：</p>
                            <el-date-picker
                            v-model="forms.bindingStartDate"
                            type="date"
                            placeholder="选择日期"
                            format="yyyy-MM-dd"
                            value-format="timestamp">
                            </el-date-picker>
                        </div>
                        <div class="chooseShipper chooseCommon">
                            <p><span>* </span>选择货主账号 ：</p>
                            <div class="chooseItem">
                                <el-input v-model="filterOptionsShipper.search"  size="mini" placeholder="请输入内容"></el-input>
                                <el-checkbox-group v-model="checkListShpper" >
                                    <el-checkbox v-for="obj in optionsShipper" :label="obj" :key="obj.shipperId" >{{obj.label}}</el-checkbox>
                                </el-checkbox-group>
                            </div>  
                        </div>
                    </div>
                    <div class="bindright bind">
                        <div class="chooseBindTime">
                            <p><span>* </span>拦截结束时间 ：</p>
                            <el-date-picker
                            v-model="forms.bindingEndDate"
                            type="date"
                            placeholder="选择日期"
                            format="yyyy-MM-dd"
                            value-format="timestamp">
                            </el-date-picker>
                        </div>
                        <div class="chooseShipper chooseCommon">
                            <p><span>* </span>选择运营或客服人员 ：</p>
                            <div class="chooseItem">
                                <el-input v-model="filterOptionsSystemUsers.search"  size="mini" placeholder="请输入内容"></el-input>
                                <el-radio-group v-model="checkListSystemUsers">
                                    <el-radio v-for="obj in optionsSystem" :label="obj" :key="obj.userId" >{{obj.label}}</el-radio>
                                </el-radio-group>
                            </div>
                        </div>
                    </div>
                    <div slot="footer" class="dialog-footer">
                    <el-button type="primary" plain  icon="el-icon-success" @click="newInfoSave" :disabled="btnShow">保 存</el-button>
                    <el-button type="primary" plain icon="el-icon-error" @click="closeAddNewInfo">取 消</el-button>

                    </div> 
                </el-dialog>
            </div>
    </div>
</template>

<script>

import { data_findAflcShipperList,data_findAflcSystemUserList,data_NewData } from '@/api/dispatch/PlatForm.js'

export default {
    name: 'addClassfy',
    props: {
        dialogFormVisible:{
            type:Boolean,
            required:true
        },
        formtitle:{
            type:String,
            required:true
        }
    },
    components:{
        
    },
    data() {
      return {
        forms:{
            bindingStartDate:'',//拦截开始时间
            bindingEndDate:'',//拦截结束时间
            orgId:'',//平台人员
            orgName:'',//
            orgPhone:'',//
            shipperId:'',//货主
            shipperName:'',//
            shipperPhone:'',//
            
        },
        btnShow : false,
        optionsShipper:[],//选择货主
        optionsSystem:[],//选择平台人员
        optionsVisualCarType:[],
        checkListShpper:[],//货主选中内容
        checkListSystemUsers:{},//平台人员选中内容
        filterOptionsShipper:{
            search:''
        },//筛选货主
        information:'',
        filterOptionsSystemUsers:{
            search:''
        },//筛选平台人员
      };
    },
    computed: {
        startTimeStatus() {
    　　　　return this.forms.bindingStartDate
    　　},
        endTimeStatus() {
    　　　　return this.forms.bindingEndDate
    　　}
    },
    watch:{
        filterOptionsShipper:{
            handler(val, oldVal){
                this.getAflcShipperList();
            },
            deep:true
        },
        filterOptionsSystemUsers:{
            handler(val, oldVal){
                this.getAflcSystemUserList();
            },
            deep:true
        },
        startTimeStatus(newValue, oldValue) {
            this.ifWrong();
    　　},
        endTimeStatus(newValue, oldValue) {
            this.ifWrong();
    　　},
    },
    mounted(){
        this.init();
    },
    methods: {
        //比较时间
        ifWrong(){
            if(!this.forms.bindingStartDate || !this.forms.bindingEndDate){
                return
            }else{
                if(this.forms.bindingStartDate  > this.forms.bindingEndDate){
                    this.$message({
                        type: 'warning',
                        message: '拦截结束时间怎么能比拦截开始早呢！~'
                    })
                    this.forms.bindingStartDate = '';
                    this.forms.bindingEndDate = '';
                }
            }
        },
        close(){
            this.$emit('update:dialogFormVisible',false)
        },
        //初始化选择项数据
        init(){
             this.getAflcShipperList();
             this.getAflcSystemUserList();
        },
        getAflcShipperList(){
            data_findAflcShipperList(this.filterOptionsShipper).then(res=>{
                // console.log(res)
                this.optionsShipper = res.data;
                this.optionsShipper.map(el=>{
                    el.label =  el.contacts +'/'+el.mobile;
                })

            }).catch(err =>{
                 this.$message({
                        type: 'warning',
                        message: '操作失败，原因：' + (err.errorInfo ? err.errorInfo : err.text)
                    })
            })
        },
        getAflcSystemUserList(){
            data_findAflcSystemUserList(this.filterOptionsSystemUsers).then(res=>{
                // console.log(res)
                this.optionsSystem = res.data;
                this.optionsSystem.map(el=>{
                    el.label =  el.name +'/'+el.mobilephone;
                })

            }).catch(err =>{
                 this.$message({
                        type: 'warning',
                        message: '操作失败，原因：' + (err.errorInfo ? err.errorInfo : err.text)
                    })
            })
        },
        newInfoSave(){
            // console.log(this.forms)
            //货主
            console.log(this.forms)
            let shipperId = [];
            let shipperName = [];
            let shipperPhone = [];
            this.checkListShpper.forEach( el => {
                shipperId.push(el.shipperId)
                shipperName.push(el.contacts)
                shipperPhone.push(el.mobile)
            })
            this.forms.shipperId =  shipperId.join(',');
            this.forms.shipperName =  shipperName.join(',');
            this.forms.shipperPhone =  shipperPhone.join(',');

            //客服
            let userId = [];
            let name = [];
            let mobilephone = [];
            // this.checkListSystemUsers.forEach( el => {
                userId.push(this.checkListSystemUsers.userId)
                name.push(this.checkListSystemUsers.name)
                mobilephone.push(this.checkListSystemUsers.mobilephone)
            // })
            
            this.forms.orgId =  userId.join(',');
            this.forms.orgName =  name.join(',');
            this.forms.orgPhone =  mobilephone.join(',');
            
            if(!this.forms.bindingStartDate){
                return this.$message({
                    type: 'warning',
                    message: '请填写拦截开始时间~'
                })
                
            }
            else if(!this.forms.bindingEndDate){
                return this.$message({
                        type: 'warning',
                        message: '请填写拦截结束时间~'
                    })
            }
            else if(this.checkListShpper.length == 0){
                return this.$message({
                    type: 'warning',
                    message: '请选择至少一个货主账号~'
                })
            }
            else if(Object.keys(this.checkListSystemUsers).length == 0){
                return this.$message({
                        type: 'warning',
                        message: '请选择客服账号~'
                    })
            }
            else{
                this.btnShow = true;
                this.forms.bindingEndDate +=  1* 24 * 60 * 60 * 1000 - 1000;
                data_NewData(this.forms).then(res=>{
                    this.$message({
                        type: 'success',
                        message: '操作成功~'
                    })
                    this.$emit('renovate');
                    this.closeAddNewInfo();
                }).catch( err => {
                    this.$message({
                        type: 'warning',
                        message: '操作失败，原因：' + (err.errorInfo ? err.errorInfo : err.text)
                    })
                    this.btnShow = false;
                })
            }
        },
        closeAddNewInfo(){
            this.close();  
            this.clearForms();
            this.btnShow = false;
        },

        clearForms(){
            this.forms = {
                bindingStartDate:'',//拦截开始时间
                bindingEndDate:'',//拦截结束时间
                orgId:'',//平台人员
                orgName:'',//
                orgPhone:'',//
                shipperId:'',//货主
                shipperName:'',//
                shipperPhone:'',//
            };
            this.filterOptionsShipper.search = '';
            this.checkListShpper = [];

            this.filterOptionsSystemUsers.search = '';
            this.checkListSystemUsers = {};
        }
    },
   
}
</script>

<style rel="stylesheet/scss" lang="scss" >
    .shipperPlatform{
        .el-dialog{
            width: 780px;
        }
        .el-dialog__body{
            border-bottom:1px solid #ccc;   
            margin-bottom: 0; 
            overflow: hidden;
            margin: 0 20px;
            display: flex;
        }
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
       .bind{
           flex: 1;
           .el-date-editor{
               width: 200px;
           }
            .chooseCommon{
                margin-top: 20px;
                .chooseItem{
                    vertical-align: top;
                    display: inline-block;
                    border:1px solid #ccc;
                    width: 200px;
                    height: 400px;
                    overflow-x:hidden;
                    padding: 5px;
                    position: relative;
                    .el-input{
                        padding: 5px;
                        width: 100%;
                        position: absolute;
                        top: 0;
                        left: 0;
                    }
                    .el-checkbox-group{
                        padding-top: 40px;
                        .el-checkbox{
                            margin-left: 0;
                            margin-bottom: 5px;
                            display: block;
                            .el-checkbox__label{
                                font-size: 12px;
                                color: #666;
                            }
                        }
                    }
                    .el-radio-group{
                        padding-top: 40px;
                        margin-left: 0px;
                        .el-radio{
                            margin-left: 0;
                            margin-bottom: 5px;
                            .el-radio__label{
                                font-size: 12px;
                                color: #666;
                                line-height: 19px;
                            }
                        }
                    }
                }
            }
       }
    }
</style>
