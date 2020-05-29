<template>
     <div class="shippercreatDialog commoncss">
      <el-dialog :title="typetitle" :visible="dialogFormVisible_add" :before-close="closeMe" top="5vh" v-el-drag-dialog :close-on-click-modal="false" ref="dialog">
        <el-form :model="xinzengform" ref="xinzengform" :rules="rulesForm" :label-width="formLabelWidth">
          <el-row>
            <el-col :span="12">
                <el-form-item label="货主类型：" prop="shipperType" v-if="originFrom != 'ShipperUnauthorized'">
                    <el-input v-model="xinzengform.shipperTypeName" auto-complete="off" v-if="editType=='view'"  disabled></el-input>
                    <el-select v-model="xinzengform.shipperType" placeholder="请选择" v-else>
                        <el-option
                        v-for="item in options"
                        :key="item.id"
                        :label="item.name"
                        :value="item.code"
                        :disabled="item.disabled">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="货主类型：" prop="shipperType" v-else>
                    <el-input v-model="xinzengform.shipperTypeName" auto-complete="off" disabled></el-input>
                </el-form-item>
            </el-col>
            <el-col :span="12">
                <el-form-item label="手机号码：" prop="mobile">
                    <el-input v-model="xinzengform.mobile" auto-complete="off"   maxlength="11" :disabled="editType=='view'"></el-input>
                </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
                <el-form-item label="所在地："  prop="belongCityName">
                    <el-input v-model="xinzengform.belongCityName" auto-complete="off" v-if="editType=='view'"  disabled></el-input>
                    <vregion :ui="true"  @values="regionChange" class="form-control" v-else>
                        <el-input v-model="xinzengform.belongCityName" placeholder="请选择" ></el-input>
                    </vregion>
                </el-form-item>
            </el-col>
            <el-col :span="12">
                <el-form-item label="联系人：" v-if="originFrom == 'ShipperUnauthorized'">
                    <el-input v-model="xinzengform.contacts" auto-complete="off" maxlength="20"></el-input>
                </el-form-item>
                <el-form-item label="联系人：" prop="contacts" v-else-if="editType=='identification' || editType=='edit'">
                    <el-input v-model="xinzengform.contacts" auto-complete="off" maxlength="20"></el-input>
                </el-form-item>
                <el-form-item label="联系人：" prop="contacts" v-else>
                    <el-input v-model="xinzengform.contacts" auto-complete="off"  maxlength="20" :disabled="editType=='view'"></el-input>
                </el-form-item>
            </el-col>
          </el-row>
  
          <el-row>
            <el-col :span="12">
                <el-form-item label="详细地址：" prop="address">
                    <!-- <span class="onlyShow" v-if="editType=='view'">{{xinzengform.address}}</span> -->
                    <el-input :maxlength="40" v-model="xinzengform.address" auto-complete="off"  :disabled="editType=='view'"></el-input>
                </el-form-item>
            </el-col>
            <el-col :span="12">
                <el-form-item label="所属业务员：" prop="belongSalesmanName">
                    <el-input :maxlength="40" v-model="xinzengform.belongSalesmanName" auto-complete="off"  disabled v-if="editType=='view'"></el-input>
                    <CustomerSearch @returnCustomer = 'getCustomer' :customerName = "xinzengform.belongSalesmanName" ref="SalesmanName" v-else/>
                </el-form-item>
            </el-col>
          </el-row>

        <el-row>
            <el-col :span="12">
                <el-form-item label="货主优惠等级：" prop="address"> 
                    <el-input v-model="xinzengform.discountLevelName" auto-complete="off" v-if="editType=='view'"  disabled></el-input>
                    <el-select v-model="xinzengform.discountLevel" placeholder="请选择" v-else>
                        <el-option
                        v-for="item in optionsLevel"
                        :key="item.id"
                        :label="item.name"
                        :value="item.code"
                        :disabled="item.disabled">
                        </el-option>
                    </el-select>
                </el-form-item>
            </el-col>
            <el-col :span="12">
                <el-form-item label="需要后续跟进：" prop="shipperFollowUpType"> 
                    <el-checkbox v-model="shipperFollowUpType" label="是" border :disabled="editType=='view'"></el-checkbox>
                </el-form-item>
            </el-col>
        </el-row>

        <el-row>
            <el-col :span="12">
                <el-form-item label="所属客服：" prop="belongCustomerService">
                    <el-input :maxlength="40" v-model="xinzengform.belongCustomerService" auto-complete="off"  disabled v-if="editType=='view'"></el-input>
                    <CustomerSearch @returnCustomer = 'getCustomer1' :customerName = "xinzengform.belongCustomerService" ref="SalesmanName" v-else/>
                </el-form-item>
            </el-col>
          </el-row>

        <el-row>
            <el-col :span="24">
                <el-form-item label="备注：" prop="remark"> 
                    <el-input
                        placeholder="少于100字符"
                        type="textarea"
                        :autosize="{ minRows: 2, maxRows: 4}"
                        clearable
                        maxlength="100"
                        :disabled="editType=='view'"
                        v-model="xinzengform.remark">
                    </el-input>
                </el-form-item>
            </el-col>
          </el-row>

          <div v-if="xinzengform.shipperType != 'AF0010101'">
            <el-row>
                <el-col :span="12">
                    <el-form-item label="公司名称：" prop="companyName">
                        <!-- <span class="onlyShow" v-if="editType=='view'">{{xinzengform.companyName}}</span> -->
                        <el-input :maxlength="20" v-model="xinzengform.companyName"  :disabled="editType=='view'"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="统一社会信用代码：" prop="creditCode">
                        <!-- <span class="onlyShow" v-if="editType=='view'">{{xinzengform.creditCode}}</span> -->
                        <el-input :maxlength="20" v-model="xinzengform.creditCode"  :disabled="editType=='view'"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row v-viewer>
                <el-col :span="8"> 
                    <el-form-item label="上传营业执照照片："  label-width="180px">
                    </el-form-item>
                    <el-form-item  prop="businessLicenceFile" label-width="20px">
                        <div class="upload">
                        <el-tooltip class="item" effect="dark" content="双击图片查看原图" placement="top" v-if="editType == 'view'" >
                            <img :src='xinzengform.businessLicenceFile ? xinzengform.businessLicenceFile : defaultImg'  alt="" >
                        </el-tooltip>
                            <upload class="licensePicture" tip="（必须为jpg/png并且小于5M）" v-else v-model="xinzengform.businessLicenceFile" />
                        </div>  
                    </el-form-item>
                </el-col>
                 <el-col :span="8">
                    <el-form-item label="上传公司或者档口照片："   required label-width="180px">
                    </el-form-item>
                    <el-form-item  label-width="20px" prop="companyFacadeFile">
                        <div class="upload">
                            <el-tooltip class="item" effect="dark" content="双击图片查看原图" placement="top" v-if="editType == 'view'">
                                <img :src='xinzengform.companyFacadeFile ? xinzengform.companyFacadeFile : defaultImg' alt="">
                            </el-tooltip>
                            <upload class="licensePicture" tip="（必须为jpg/png并且小于5M）" v-else v-model="xinzengform.companyFacadeFile" />
                        </div>
                    </el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item label="上传发货人名片照片："  required label-width="180px">
                    </el-form-item>
                     <el-form-item  prop="shipperCardFile" label-width="20px">
                        <div class="upload">
                            <el-tooltip class="item" effect="dark" content="双击图片查看原图" placement="top" v-if="editType == 'view'">
                                <img :src='xinzengform.shipperCardFile ? xinzengform.shipperCardFile : defaultImg' alt="" >
                            </el-tooltip>
                            <upload class="licensePicture" tip="（必须为jpg/png并且小于5M）" v-else v-model="xinzengform.shipperCardFile" />
                        </div>
                    </el-form-item>
                </el-col>
            </el-row>
          </div>
        </el-form>
        <div slot="footer" class="dialog-footer">
            <el-button type="primary" plain  icon="el-icon-success" @click.stop="onSubmit" v-show="editType!='view'"  :disabled="ifDisable">确 定</el-button>
            <el-button type="primary" plain icon="el-icon-error" @click="closeMe" v-show="editType!='view'">取 消</el-button>
        </div>
      </el-dialog>
    </div>
</template>
<script>
import Upload from '@/components/Upload/singleImage'
import { eventBus } from '@/eventBus'
import {data_get_shipper_create,data_get_shipper_change,data_get_shipper_view} from '@/api/users/shipper/all_shipper.js'
import { getDictionary,DicShipperLevel } from '@/api/common.js'
import vregion from '@/components/vregion/Region'
import CustomerSearch from '@/components/CustomerSearch/select'
import {REGEX} from '@/utils/validate'

export default {
  components:{
    Upload,
    vregion,
    CustomerSearch
  },
  props:{
    paramsView:{
        type:Object,
    },
    typetitle: {
        type: String,
        default: ''
    },
    originFrom:{
        type:String,
    },
    /*add新增，edit编辑，view查看*/
    editType: {
      type: String,
    },
    dialogFormVisible_add:{
        type:Boolean,
        default:false
    }
  },
  data(){
    // 手机号校验
        const validateMobile = (rule, value, callback) => {
            // console.log('value',value)
            if(!value){
                callback(new Error('手机号码不能为空'));
            }
            else if (!REGEX.MOBILE.test(value)) {
                callback('请输入正确的联系号码~')
            }else if(this.editType == 'add'){
                data_get_shipper_view(value).then(res=>{
                    if(res.data){
                        callback(new Error('该手机号已经被注册~'))
                    } else {
                        callback()
                    }
                })
            }else{
                callback()
            }
        }
        var checkLocation = (rule,value,callback) => {
            // console.log('this.xinzengform.cityCode',this.xinzengform.provinceCode,this.xinzengform.cityCode)
            if (value == '') {
                callback(new Error('请输入出发地'));
            }else if(this.xinzengform.cityCode == '' && this.xinzengform.provinceCode !=  '北京市' && this.xinzengform.provinceCode !=  '天津市' && this.xinzengform.provinceCode !=  '重庆市' && this.xinzengform.provinceCode !=  '上海市' ){
                callback(new Error('至少选择到市级范围'));
            }else{
                callback();
            }
        };
        return{
        defaultImg:'/static/test.jpg',//默认第一张图片的url
        identifiy:'企业货主',
        selectFlag:false,
        shipperType:'AF00101',
        type:'primary',
        title:'',
        text:'',
        ifDisable:false,
        options:[],
        optionsLevel:[],
        formLabelWidth:'160px',
        shipperFollowUpType:false,
        xinzengform:{
            shipperType:'AF0010101',//货主类型code
            shipperTypeName:'',//货主类型名称
            mobile:'',//手机
            contacts:'',//联系人
            belongCityName:'',
            belongCity:'',//所属地区
            address:'',//详细地址
            companyName:'',//公司名称
            creditCode:'',//统一社会代码
            businessLicenceFile:'',//上传营业执照照片
            companyFacadeFile:'',//上传公司或者档口照片
            shipperCardFile:'',//上传发货人名片照片
            registerOrigin:'AF0030107',
            registerOriginName:'云平台',
            isDirectional: '0',
            provinceCode:'',
            cityCode:'',
            areaCode:'',
            belongSalesman:'',//所属业务员id
            belongSalesmanName:'',// 所属业务员姓名
            belongSalesmanMobile:'',// 所属业务员电话
            discountLevel:'AF0020806',//货主优惠等级
            remark:'',//备注
            shipperFollowUp:'',
            belongCustomerService:'',
            belongCustomerServiceId:''
        },
        rulesForm:{
            shipperType:{required: true, message:'请选择货主类型', trigger:'blur'},
            companyName:{required: true, message:'请输入公司名称', trigger:'blur'},
            contacts:{required: true, message:'请输入联系人', trigger:'blur'},
            mobile:{required:true,validator:validateMobile, trigger:'change'},
            belongCityName:{required:true, validator:checkLocation, trigger:['blur','change']},
            companyFacadeFile:{required:true, message:'请上传公司或者档口照片', trigger:'blur'},
            shipperCardFile:{required:true, message:'请上传发货人名片照片', trigger:'blur'}
        },
    }
  },
  watch:{
    dialogFormVisible_add:{
        handler: function(val, oldVal) {
            this.openDialog();
            this.getMoreInformation();
        },
        deep:true
    },
    shipperFollowUpType(val, oldVal){
        if(val){
            this.xinzengform.shipperFollowUp = '1' ;
        }else{
            this.xinzengform.shipperFollowUp = '0' ;
        }
    }
  },
    mounted(){
    },
  methods:{
    regionChange(d) {
        // console.log('data:',d)
        this.xinzengform.belongCityName = (!d.province&&!d.city&&!d.area&&!d.town) ? '': `${this.getValue(d.province)}${this.getValue(d.city)}${this.getValue(d.area)}${this.getValue(d.town)}`.trim();
        if(d.area){
            this.xinzengform.areaCode = d.area.name;
            this.xinzengform.belongCity = d.area.code;
        }else if(d.city){
            this.xinzengform.belongCity = d.city.code;
            this.xinzengform.cityCode = d.city.name;
        }
        else{
            this.xinzengform.belongCity = d.province ? d.province.code : '';
            this.xinzengform.provinceCode = d.province ? d.province.name : '';
        }
    },
    getValue(obj){
        return obj ? obj.value:'';
    },
    getCustomer(val){
        // console.log('belongSalesman',val)
        this.xinzengform.belongSalesman = val.userId;
        this.xinzengform.belongSalesmanName = val.name;
        this.xinzengform.belongSalesmanMobile = val.mobilephone ? val.mobilephone  :'';
    },
    getCustomer1(val){
        // console.log('belongSalesman',val)
        this.xinzengform.belongCustomerServiceId = val.userId;
        this.xinzengform.belongCustomerService = val.name;
    },
    //事件分发
    changeList(){
        eventBus.$emit('changeList')
    },
    openDialog(){
        // console.log(this.editType)
        // console.log('this.xinzengform',this.xinzengform)
        let dialog = document.querySelector('.el-dialog');
        if(this.editType  == 'add'){
            this.xinzengform ={
                shipperType:'AF0010101',//货主类型code
                shipperTypeName:'',//货主类型名称
                mobile:'',//手机
                contacts:'',//联系人
                belongCityName:'',
                belongCity:'',//所属地区
                address:'',//详细地址
                companyName:'',//公司名称
                creditCode:'',//统一社会代码
                businessLicenceFile:'',//上传营业执照照片
                companyFacadeFile:'',//上传公司或者档口照片
                shipperCardFile:'',//上传发货人名片照片
                registerOrigin:'AF0030107',
                registerOriginName:'云平台',
                isDirectional: '0',
                provinceCode:'',
                cityCode:'',
                areaCode:'',
                belongSalesman:'',//所属业务员id
                belongSalesmanName:'',// 所属业务员姓名
                belongSalesmanMobile:'',// 所属业务员电话
                discountLevel:'AF0020806',//货主优惠等级
                remark:'',//备注
                shipperFollowUp:'',
                belongCustomerService:'',
                belongCustomerServiceId:''
            }
            dialog.style.minHeight = 720 + "px";
        }else {
            this.xinzengform = Object.assign({},this.paramsView);
            if(this.originFrom != 'ShipperUnauthorized'){
                if(this.xinzengform.shipperType == 'AF0010101' && this.editType  != 'view'){
                    this.xinzengform.shipperType = 'AF0010102';
                }
            }
            this.shipperFollowUpType =this.xinzengform.shipperFollowUp == '1' ? true : false;
            dialog.style.minHeight = 369 + "px";
        }
    },
    close(done) {
        this.$refs.xinzengform.resetFields();
        // this.$emit('getData');
        this.changeList();
        this.ifDisable = false;
        if (typeof done === 'function') {
            done()
        }
        this.$emit('update:dialogFormVisible_add', false);
    },
    closeMe(done){
        this.$refs.xinzengform.resetFields();
        if (typeof done === 'function') {
            done()
        }
        this.$emit('update:dialogFormVisible_add', false);
    },
    //获取货主类型
    getMoreInformation(){
        if(this.originFrom != 'ShipperUnauthorized'){
            getDictionary(this.shipperType).then(res=>{
                // console.log('货主类型',res)
                this.options = res.data;
                    if(this.editType != 'add'){
                        this.options = this.options.filter(el => {
                            return el.code != 'AF0010101';
                        })
                    }
            });
        }
        DicShipperLevel().then( res => {
            this.optionsLevel = res.data;
        })
    },
    // 保存
    onSubmit(){
        // console.log('this.rulesForm',this.rulesForm)
        if(this.editType == 'disRevise'){
            this.xinzengform.discountLevelName =  this.optionsLevel.find(item => item.code ==  this.xinzengform.discountLevel)['name'];
            var forms=Object.assign({},this.xinzengform)
            this.ifDisable = true;
            data_get_shipper_change(forms).then(res=>{
                this.$message({
                    type: 'success',
                    message: '操作成功~'
                })
                this.close()
            }).catch(err=>{
                this.$message({
                    type: 'warning',
                    message: '操作失败，原因：' + (err.errorInfo ? err.errorInfo : err.text)
                });
                this.ifDisable = false;
            })
        }else{
            this.$refs['xinzengform'].validate((valid)=>{
                if(valid){
                    this.xinzengform.discountLevelName =  this.optionsLevel.find(item => item.code ==  this.xinzengform.discountLevel)['name'];
                    var forms=Object.assign({},this.xinzengform)
                    switch  (this.editType){
                        case 'add':
                            this.ifDisable = true;
                            data_get_shipper_create(forms).then(res=>{
                                this.close()
                                this.$message({
                                    type: 'success',
                                    message: '操作成功~'
                                })
                            }).catch(err=>{
                                this.$message({
                                    type: 'warning',
                                    message: '操作失败，原因：' + (err.errorInfo ? err.errorInfo : err.text)
                                })
                                this.ifDisable = false;
                            })
                            break;
                        case 'edit':
                            this.ifDisable = true;
                            data_get_shipper_change(forms).then(res=>{
                                this.close()
                                this.$message({
                                    type: 'success',
                                    message: '操作成功~'
                                })
                            }).catch(err=>{
                                this.$message({
                                    type: 'warning',
                                    message: '操作失败，原因：' + (err.errorInfo ? err.errorInfo : err.text)
                                });
                                this.ifDisable = false;
                            })
                            break;
                        case 'identification':
                            let item =  forms.mobile;
                            this.$confirm('确定要认证通过'+ item +' 该货主吗？', '提示', {
                                confirmButtonText: '确定',
                                cancelButtonText: '取消',
                                type: 'warning'
                            }).then(() => {
                                forms.currentShipperStatus = forms.shipperStatus;
                                forms.shipperStatus =  "AF0010403";
                                forms.shipperStatusName =  "已认证";
                                data_get_shipper_change(forms).then(res => {
                                    this.$message({
                                        type: 'success',
                                        message: '该货主已认证成功',
                                        duration:2000
                                    })
                                    this.close();
                                }).catch(err => {
                                    this.$message({
                                        type: 'warning',
                                        message: '操作失败，原因：' + (err.errorInfo ? err.errorInfo : err.text)
                                    })
                                    this.ifDisable = false;
                                })
                            }).catch(() => {
                                this.$message({
                                    type: 'info',
                                    message: '已取消'
                                })
                                this.ifDisable = false;

                            })
                            break;
                    }
                }else{
                    return  this.$message({
                        type: 'warning',
                        message: '请填写完整数据'
                    })
                }
            })
        }
    },
  }
}
</script>
<style lang="scss" scoped>
    .shippercreatDialog{
        .el-dialog__footer{
            border-top:1px solid #ccc;   
            margin: 0 10px;
        }
        .upload{
            width: 300px;
            line-height: 20px;
            img{
                display: block;
                width: 100%;
                height: 300px;
            }
        }
        img{
            cursor: pointer;
        }
    }
</style>