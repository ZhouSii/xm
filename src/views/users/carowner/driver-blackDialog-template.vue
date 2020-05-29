<template>
    <div class="blackInfo commoncss">
      <el-button :type="type" :value="value" :plain="plain" :icon="icon" @click="openDialog()"  size="mini">{{text}}</el-button>
      <el-dialog :title="title" :visible.sync="BlackDialogFlag" :before-close="change()" :modal="false" :closeOnClickModal='false'>

      <!-- <el-dialog title="移入黑名单" :visible.sync="BlackDialogFlag"> -->
        <el-form :model="formBlack" ref="formBlack" :rules="formBlackRules">
            <el-row>
                <el-col :span="12">
                    <el-form-item label="手机号码：" :label-width="formLabelWidth">
                    <el-input v-model="formBlack.mobile" disabled></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="车主：" :label-width="formLabelWidth">
                    <el-input v-model="formBlack.driverName" disabled></el-input>
                    </el-form-item>
                </el-col>
                </el-row>
                <el-row>
                <el-col :span="12">
                    <el-form-item label="身份证号码：" :label-width="formLabelWidth">
                    <el-input v-model="formBlack.contacts" disabled></el-input>
                    </el-form-item>
                </el-col> 
                <el-col :span="12">
                    <el-form-item label="所在地：" :label-width="formLabelWidth">
                       <GetCityList v-model="formBlack.belongCity" disabled ref="area"></GetCityList>
                    </el-form-item>
                </el-col>
                </el-row>

                <el-row>
                <el-col :span="12">
                    <el-form-item label="车牌号：" :label-width="formLabelWidth">
                    <el-input v-model="formBlack.address" disabled :maxlength="20"></el-input>
                </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="车型" :label-width="formLabelWidth">
                        <el-select v-model="formBlack.shipperType" placeholder="请选择" disabled>
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
                        <el-form-item label="车长(米)：" :label-width="formLabelWidth">
                      <el-input
                            placeholder="长"
                            v-model="templateModel.carLength"
                            clearable>
                        </el-input>
                        <el-input
                            placeholder="宽"
                            v-model="templateModel.carWidth"
                            clearable>
                        </el-input>
                        <el-input
                            placeholder="高"
                            v-model="templateModel.carHeight"
                            clearable>
                        </el-input>
                        <span class="node">米</span>
                    </el-form-item>
                    </el-col>
                   <el-col :span="12">
                        <el-form-item label="注册来源" :label-width="formLabelWidth">
                            <el-input v-model="formBlack.registerOrigin" disabled :maxlength="20"></el-input>
                        </el-form-item>
                   </el-col>
                </el-row>
                <div class="shipper_information">
                <h2>移入黑名单信息</h2>
                <el-row>
                    <el-col :span="24">
                    <el-form-item label="移入原因:" :label-width="formLabelWidth" prop="putBlackCause">
                        <el-select v-model="formBlack.putBlackCause" placeholder="请选择">
                        <el-option
                            v-for="item in optionsFormBlack"
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
                    <el-form-item label="移入黑名单原因说明:" :label-width="formLabelWidth">
                        <el-input v-model="formBlack.putBlackCauseRemark" :rows="2" placeholder="请输入内容" type="textarea"></el-input>
                    </el-form-item>
                    </el-col>
                </el-row>
            </div>
        </el-form>
        
        <div slot="footer" class="dialog-footer">
            <el-button type="primary" @click="onSubmit">确 定</el-button>
            <el-button @click="BlackDialogFlag = false">取 消</el-button>
        </div>
      </el-dialog>
    </div>
</template>
<script>
import GetCityList from '@/components/GetCityList'
import {data_get_shipper_type,data_get_shipper_change} from '@/api/users/shipper/all_shipper.js'
import {  DicBlackType } from '@/api/common.js'

export default {
    name:'shipper_blackList-diaolog',
    components:{
        GetCityList
    },
    props:{
        params:{
            type:Object
        },
        icon:{
            type: String,
            default: ''
        },
        btntype: {
            type: String,
            default: ''
        },
        btntitle: {
            type: String,
            default: ''
        },
        plain:{
            type: Boolean,
             default: false
        },
        btntext: {
            type: String,
            default: ''
        },
        value:{
            type: String,
            default:''
        },
        editType: {
            type: String,
            default: 'edit'
        },
        count:{
            type: Number
        }
    },
    data(){
        return{
            optionsFormBlack:[],
            options:[],
            type:'primary',
            title:'',
            text:'',
            BlackDialogFlag: false, // 弹框控制
            formLabelWidth:'120px',
            formBlack:{
                driverMobile:'',
                contacts:'',
                driverName:'',
                belongCity:null,
                shipperType:null,
                address:'',
                registerOrigin:'',
                putBlackCauseRemark:'',
                putBlackCause:''
            },
            currentRow:{},
            formBlackRules:{
                putBlackCause:{required:true,message:'请选择移入原因',trigger:"change"}
            }
        }
    },
    mounted(){
        //按钮类型text,primary...
        this.type = this.btntype;
        //按钮文本内容
        this.text = this.btntext;
        //弹出框标题
        this.title = this.btntitle;
        this.getMoreInformation()
    },
    methods:{
        change(){
          this.BlackDialogFlag!=this.BlackDialogFlag
        },

        setCurrent(row) {
          this.$refs.singleTable.setCurrentRow(row);
        },
        openDialog(){
            // if(this.editType ==="edit"){
            //     if(this.params.companyName ||this.params.contacts){
            //     this.BlackDialogFlag=true 
            //     } else{
            //     this.$message.error('选中一个才可以操作')
            //     }
            // }
            this.BlackDialogFlag=true
            if(this.params){
                var obj = JSON.parse(JSON.stringify(this.params));
                this.formBlack.shipperType=obj.shipperType
                //this.xinzengform.shipperType= "AF0010202"
                //this.xinzengform.shipperTypeName=obj.shipperTypeName
                this.formBlack.belongCity=obj.belongCity
                this.formBlack.mobile=obj.mobile
                this.formBlack.contacts=obj.contacts
                this.formBlack.address=obj.address
                this.formBlack.driverName=obj.driverName
                this.formBlack.creditCode=obj.creditCode
                this.formBlack.businessLicenceFile=obj.businessLicenceFile
                this.formBlack.companyFacadeFile=obj.companyFacadeFile
                this.formBlack.shipperCardFile=obj.shipperCardFile
                this.formBlack.shipperId=obj.shipperId
            }else{
                this.formBlack.shipperType=null
                this.formBlack.belongCity=null
                this.formBlack.mobile=null
                this.formBlack.contacts=null
                this.formBlack.address=null
                this.formBlack.driverName=null
                this.formBlack.creditCode=null
                this.formBlack.businessLicenceFile=null
                this.formBlack.companyFacadeFile=null
                this.formBlack.shipperCardFile=null
                this.formBlack.shipperId=null     
            }
        },

        getMoreInformation(){
             //获取货主类型
            data_get_shipper_type().then(res=>{
                // console.log(res)
                res.data.map((item)=>{
                this.options.push(item)
                })
            }),
            // 移入原因列表
            DicBlackType().then(res=>{
                    this.optionsFormBlack = res.data;
            })
        },
        // 提交数据
        onSubmit(){
        this.$refs['formBlack'].validate((valid)=>{
            if(valid){
                this.formBlack.belongCity = this.$refs.area.selectedOptions.pop();
                var forms= Object.assign({}, this.formBlack)
                // data_get_shipper_change(forms).then(res=>{
                //     // console.log(res)
                //     this.$message.success('冻结修改成功')
                //     this.BlackDialogFlag = false;
                //     this.$emit('getData')
                // }).catch(err=>{
                //     console.log(err)
                // })
            }
        })
    }
  }
}
</script>
<style lang="scss">

</style>


