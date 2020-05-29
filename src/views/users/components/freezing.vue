<template>
    <div>
        <div class="shipper_searchinfo">
            <el-form inline>
            <el-form-item label="所在地：">
                    <GetCityList v-model="formInline.belongCity" ref="area"></GetCityList>
            </el-form-item>
            <el-form-item label="车牌号：">
                <el-input placeholder="请输入内容" v-model.trim="formInline.carNumber" clearable></el-input>
            </el-form-item>
            <el-form-item label="手机号：">
                <el-input placeholder="请输入内容" v-model.trim="formInline.driverMobile" clearable></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" plain @click="getdata_search">查询</el-button>
                <el-button type="info" plain>清空</el-button>
            </el-form-item>
        </el-form>
        </div>
        <div class="export">
            <el-button type="primary" plain @click="handleUnfreeze">解冻</el-button>
            <freeze-change-template
                 btntext="冻结修改"
                 :plain="true"
                 type="primary" 
                 btntype="primary"
                 icon="el-icon-news"
                 editType="edit"
                 btntitle="冻结">

                </freeze-change-template>

                <driver-blackDialog-template
                 btntext="移入黑名单"
                 :plain="true"
                 type="primary" 
                 btntype="primary"
                 icon="el-icon-news"
                 editType="edit"
                 btntitle="移入黑名单">
                </driver-blackDialog-template>
        </div>
        <div class="info_news">
            <el-table
                ref="multipleTable"
                :data="tableDataTree"
                stripe
                border
                @selection-change="handleSelectionChange"
                tooltip-effect="dark"
                style="width: 100%"
               >
                <el-table-column type="selection" width="80"></el-table-column>
                <el-table-column prop="carNumber" label="车牌号"></el-table-column>
                <el-table-column prop="driverMobile" label="手机号"></el-table-column>
                <el-table-column prop="driverName" label="车主" width="200"></el-table-column>
                <el-table-column prop="belongCity" label="所在地"></el-table-column>
                <el-table-column  prop="freezeTime" label="冻结时间"></el-table-column>
                <el-table-column prop="freezeCause" label="冻结原因"></el-table-column>
                <el-table-column prop="unfreezeTime" label="解冻日期"></el-table-column>
            </el-table>
                
            <el-pagination
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page="page"
                :page-sizes="[20, 50, 200, 400]"
                :page-size="pagesize"
                layout="total, sizes, prev, pager, next, jumper"
                :total="totalCount">
            </el-pagination>
        </div>

        <!-- 解冻 -->
         <div class="addclassify commoncss">
            <el-dialog title="解冻" :visible.sync="driverUnfrozeDialogFlag">
                <el-form :model="formUnFroze" ref="formUnFroze" :rules="rules">
                    <el-row>
                        <el-col :span="12">
                        <el-form-item label="手机号码" :label-width="formLabelWidth">
                            <el-input v-model="formUnFroze.driverMobile" disabled></el-input>
                        </el-form-item>
                        </el-col>
                        <el-col :span="12">
                        <el-form-item label="车主" :label-width="formLabelWidth">
                            <el-input v-model="formUnFroze.driverName" disabled></el-input>
                        </el-form-item>
                        </el-col>
                    </el-row>
                    
                    <el-row>
                    <el-col :span="12">
                        <el-form-item label="身份证号码" :label-width="formLabelWidth">
                            <el-input v-model="formUnFroze.driverCardid" disabled></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="所在地" :label-width="formLabelWidth">
                        
                        <GetCityList v-model="formUnFroze.belongCity" disabled ref="area"></GetCityList>
                        </el-form-item>
                    </el-col>
                    </el-row>

                    <el-row>
                    <el-col :span="12">
                        <el-form-item label="车牌号" :label-width="formLabelWidth">
                        <el-input v-model="formUnFroze.carNumber" disabled :maxlength="20"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="车型" :label-width="formLabelWidth">
                        <el-select v-model="formUnFroze.shipperType" disabled placeholder="请选择">
                        <el-option
                            v-for="item in options"
                            :key="item.value"
                            :label="item.name"
                            :value="item.code"
                            :disabled="item.disabled">
                        </el-option>
                        </el-select>
                        </el-form-item>
                    </el-col>
                    </el-row>
                    <el-row>
                    <el-col :span="12">
                        <el-col :span="12">
                            <el-form-item label="车型">
                                <el-input v-model="formUnFroze.shipperType"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-form-item label="注册来源" :label-width="formLabelWidth">
                            <el-input v-model="formUnFroze.registerOrigin" disabled :maxlength="20"></el-input>
                        </el-form-item>
                    </el-col>
                    </el-row>
                    <div class="shipper_information">
                        <h2>冻结原因</h2>
                    </div>
                    <el-row>
                    <el-col :span="24">
                        <el-form-item label="冻结原因" :label-width="formLabelWidth">
                        <el-select v-model="formUnFroze.freezeCause" disabled placeholder="请选择">
                            <el-option
                            v-for="item in optionsReason"
                            :key="item.value"
                            :label="item.name"
                            :value="item.code">
                            </el-option>
                        </el-select>
                        </el-form-item>
                    </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="24">
                        <el-form-item label="解冻日期" :label-width="formLabelWidth">
                            <el-date-picker
                            v-model="formUnFroze.unfreezeTime"
                            type="datetime"
                            placeholder="选择日期"
                            format="yyyy-MM-dd"
                            :picker-options="pickerOptions"
                            disabled>
                            </el-date-picker>
                        </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                    <el-col :span="24">
                        <el-form-item label="冻结原因说明:"  :label-width="formLabelWidth">
                            <el-input type="textarea" :rows="2" disabled v-model="formUnFroze.freezeCauseRemark"></el-input>
                        </el-form-item>
                    </el-col>
                    </el-row>
                    <div class="shipper_information">
                    <h2>解冻</h2>
                    </div>
                    <el-row>
                    <el-col :span="24">
                        <el-form-item  label="解冻原因说明:" :label-width="formLabelWidth" prop="unfreezeRemark" required>
                        <el-input type="textarea" :rows="2" v-model="formUnFroze.unfreezeRemark" :maxlength="100"></el-input>
                        </el-form-item>
                    </el-col>
                    </el-row>
                </el-form>
                <div slot="footer" class="dialog-footer">
                    <el-button type="primary" @click="onSave">确 定</el-button>
                    <el-button @click="driverUnfrozeDialogFlag = false">取 消</el-button>
                </div>
            </el-dialog>
        </div>


    </div>
</template>
<script type="text/javascript">
    import {data_get_driver_list,data_get_driver_status} from '../../../api/users/carowner/total_carowner.js'
    import GetCityList from '@/components/GetCityList'
    import FreezeChangeTemplate from '../carowner/freeze-change-template'
    import DriverBlackDialogTemplate from '../carowner/driver-blackDialog-template'
    export default {
        components:{
            GetCityList,
            FreezeChangeTemplate,
            DriverBlackDialogTemplate
        },
        data(){
            return{
                options:[], // 车型下拉列表
                optionsReason:[], // 冻结原因下拉列表
                page:1,//当前页
                pagesize:20,//每页显示数
                totalCount:null,//总记录数
                formInline: {//查询条件
                    driverMobile:'',
                    belongCity:'',
                    driverStatus:'AF0010405',
                    carNumber:''
                },
                tableDataTree:[],//定义列表记录
                optionsService:[//状态
                     {
                    code:null,
                    name:'全部'
                    }
                ],
                multipleSelection:[],
                formLabelWidth:'120px',
                driverUnfrozeDialogFlag:false, // 解冻弹框控制
                formUnFroze: { // 解冻弹框表单
                    driverMobile: '', // 手机号码
                    driverName: '', // 车主
                    shipperType:null,
                    driverCardid:'', // 身份证号码
                    belongCity:null, // 所在地
                    registerOrigin:'', // 注册来源
                    unfreezeTime:'',
                    attestationStatus:null,
                    freezeCause:'',
                    freezeCauseRemark:'',
                    unfreezeRemark:''
                },
                pickerOptions:{
                    disabledDate(time) {
                        return time.getTime() < Date.now();
                    },
                },
                information:'',// 提示语内容
                centerDialogVisible:false, // 提示语控制弹框
                rules:{ // 解冻功能校验

                }
            }
        },
        mounted(){
            this.firstblood()
            this.getMoreInformation()
        },  
        methods:{
            // 判断选中与否
            handleSelectionChange(val){
                this.multipleSelection = val;
                if(val[0]) {
                    this.formUnFroze=val[0]
                } else {
                    this.formUnFroze={}
                }
            },

            //解冻功能
            handleUnfreeze(){
                // console.log('解冻功能')
                if(this.multipleSelection.length == 0){
                    //未选择任何修改内容的提示
                    let information = "未选中任何修改内容";
                    this.hint(information);
                }else if(this.multipleSelection.length >1){
                    let information = "不可修改多个内容";
                    this.hint(information);
                } else{
                    this.driverUnfrozeDialogFlag=true
                }
            },

            // 冻结修改功能
            handlefreezeEdit(){
                console.log('冻结修改功能')
            },

            // 移入黑名单功能
            handlePutBlack(){
                console.log('移入黑名单功能')
            },
            //刷新页面
            firstblood(){
                data_get_driver_list(this.page,this.pagesize,this.formInline).then(res=>{
                    this.totalCount = res.data.totalCount;
                    this.tableDataTree = res.data.list;
                })
            },

            //点击查询按纽，按条件查询列表
            getdata_search(event){
                data_get_driver_list(this.page,this.pagesize,this.formInline).then(res=>{
                    this.dataTotal = res.data.totalCount;
                    this.tableDataTree = res.data.list;
                })
            },

            //获取车主状态列表
            getMoreInformation(){
                data_get_driver_status().then(res=>{
                    res.data.map((item)=>{
                        this.optionsService.push(item);
                    })
                })
            },

            hint(val){
                this.information = val;
                this.centerDialogVisible = true;
                let timer = setTimeout(()=>{
                    this.centerDialogVisible = false;
                    clearTimeout(timer)
                },2000)
            },

             //每页显示数据量变更
            handleSizeChange: function(val) {
                this.pagesize = val;
                this.firstblood()
            },

            //页码变更
            handleCurrentChange: function(val) {
                this.page = val;
                this.firstblood()
            },

            // 解冻-提交
            onSave(){
                this.$refs['formUnFroze'].validate(valid=>{
                    if(valid){
                        console.log('sumbit')
                    }
                })
            }
        }
        
    }
</script>