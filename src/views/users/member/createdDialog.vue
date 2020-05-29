<template>
     <div class="wuliucreatDialog commoncss">
      <el-dialog :title="title" :visible="dialogFormVisible_add" :before-close="close" top="5vh" v-el-drag-dialog :close-on-click-modal="false" >
        <el-form :model="xinzengform" ref="xinzengform" :rules="rulesForm">
            <el-row>
                <el-col :span="12">
                    <el-form-item label="会员手机号码：" :label-width="formLabelWidth"  v-if="editType !='add'">
                        <!-- <span class="onlyShow" disabled>{{xinzengform.mobile}}</span> -->
                        <el-input v-model="xinzengform.mobile" disabled></el-input>
                    </el-form-item>
                    <el-form-item label="会员手机号码：" prop="mobile" :label-width="formLabelWidth" required v-else>
                        <el-input v-model="xinzengform.mobile" auto-complete="off" ></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="注册人姓名：" :label-width="formLabelWidth">
                        <!-- <span class="onlyShow" v-if="editType=='view'" disabled>{{xinzengform.contactsName}}</span> -->
                        <el-input v-model="xinzengform.contactsName" auto-complete="off" :disabled="editType=='view'"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="12">
                    <el-form-item label="公司名称：" :label-width="formLabelWidth">
                        <!-- <span class="onlyShow" v-if="editType=='view'" disabled>{{xinzengform.companyName}}</span> -->
                        <el-input :maxlength="20" v-model="xinzengform.companyName"  :disabled="editType=='view'"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="所在地："  v-if = "editType=='view'" :label-width="formLabelWidth" required>
                        <el-input v-model="xinzengform.belongCityName"  disabled></el-input>
                    </el-form-item>
                    <el-form-item label="所在地："  props = "belongCity"  :label-width="formLabelWidth" v-else required>
                        <vregion :ui="true" @values="regionChange" class="form-control">
                            <el-input v-model="xinzengform.belongCityName" placeholder="请选择出发地"></el-input>
                        </vregion>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="12">
                    <el-form-item label="注册来源：" :label-width="formLabelWidth">
                        <!-- <span class="onlyShow"  disabled>{{xinzengform.registerOriginName}}</span> -->
                        <el-input v-model="xinzengform.registerOriginName"  disabled></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="注册日期：" :label-width="formLabelWidth">
                        <!-- <span class="onlyShow"  disabled>{{xinzengform.registerTime}}</span> -->
                        <el-input v-model="xinzengform.registerTime"  disabled></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="12">
                    <el-form-item label="账户状态：" :label-width="formLabelWidth">
                        <!-- <span class="onlyShow"  disabled>{{xinzengform.accountStatusName}}</span> -->
                        <el-input v-model="xinzengform.accountStatusName"  disabled></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="认证状态：" :label-width="formLabelWidth">
                        <!-- <span class="onlyShow"  disabled>{{xinzengform.authStatusName}}</span> -->
                        <el-input v-model="xinzengform.authStatusName"  disabled></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="12">
                    <el-form-item label="法人/负责人：" :label-width="formLabelWidth">
                        <!-- <span class="onlyShow" v-if="editType=='view'" disabled>{{xinzengform.corporation}}</span> -->
                        <el-input :maxlength="20" v-model="xinzengform.corporation"  :disabled="editType=='view'"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="所属品牌：" :label-width="formLabelWidth">
                        <!-- <span class="onlyShow" v-if="editType=='view'" disabled>{{xinzengform.belongBrand}}</span> -->
                        <el-input  v-model="xinzengform.belongBrand"  disabled v-if="editType=='view'"></el-input>

                        <el-select v-model="xinzengform.belongBrandCode" placeholder="请选择" v-else>
                            <el-option
                            v-for="item in optionsBelongBrand"
                            :key="item.id"
                            :label="item.name"
                            :value="item.code">
                            </el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="12">
                    <el-form-item label="是否开通会员：" :label-width="formLabelWidth">
                        <!-- <span class="onlyShow" v-if="editType=='view'" disabled>{{xinzengform.isVip == 1 ? '是' : '否'}}</span> -->
                        <el-input  :value="xinzengform.isVip == 1 ? '是' : '否'"  disabled v-if="editType=='view'"></el-input>
                        <el-radio-group v-model="xinzengform.isVip" v-else>
                            <el-radio  v-for="(obj,key) in optionsStatus" :label="obj.value" :key='key'>{{obj.name}}</el-radio>
                        </el-radio-group>
                    </el-form-item>
                </el-col>
                <el-col :span="12" >
                    <el-form-item label="公司成立时间：" :label-width="formLabelWidth">
                        <!-- <span class="onlyShow"  disabled>{{xinzengform.foundTime ? xinzengform.foundTime :'未填写'}}</span> -->
                        <el-input  :value="xinzengform.foundTime ? xinzengform.foundTime :'未填写'"  disabled></el-input>

                        <!-- <el-date-picker
                            v-elsev-if="editType=='view'"
                            v-model="xinzengform.foundTime"
                            type="date"
                            placeholder="选择日期"
                            value-format="timestamp">
                        </el-date-picker> -->
                    </el-form-item>
                </el-col>
            </el-row>

            <!-- <el-row v-if="xinzengform.isVip == 1">
                <el-col :span="12">
                    <el-form-item label="会员期限 ：" :label-width="formLabelWidth">
                        <span class="onlyShow" v-if="editType=='view'" disabled>{{xinzengform.isVip}}</span>
                            <el-date-picker
                            v-model="ifVipTimes"
                            type="daterange"
                            align="right"
                            unlink-panels
                            range-separator="-"
                            start-placeholder="开始日期"
                            end-placeholder="结束日期"
                            :picker-options="pickerOptions">
                            </el-date-picker>
                            <el-radio-group v-model="radio" @change="timeChange">
                                <el-radio :label="1">1天</el-radio>
                                <el-radio :label="3">3天</el-radio>
                                <el-radio :label="7">一周</el-radio>
                                <el-radio :label="9">一个月</el-radio>
                                <el-radio :label="10">永久</el-radio>
                            </el-radio-group>
                    </el-form-item>
                </el-col>
            </el-row> -->

            <el-row>
                <el-col :span="12">
                    <el-form-item label="是否开通TMS：" :label-width="formLabelWidth">
                        <!-- <span class="onlyShow" v-if="editType=='view'" disabled>{{xinzengform.isOpenTms == 1 ? '是' : '否'}}</span> -->
                        <el-input  :value="xinzengform.isOpenTms == 1 ? '是' : '否'"  disabled v-if="editType=='view'"></el-input>
                        <el-radio-group v-model="xinzengform.isOpenTms" v-else>
                            <el-radio  v-for="(obj,key) in optionsStatus" :label="obj.value" :key='key'>{{obj.name}}</el-radio>
                        </el-radio-group>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="保证金：" :label-width="formLabelWidth">
                        <!-- <span class="onlyShow" v-if="editType=='view'" disabled>{{xinzengform.collateral ? xinzengform.collateral :'无'}}</span> -->
                        <el-input  :value="xinzengform.collateral ? xinzengform.collateral :'无'"  disabled v-if="editType=='view'"></el-input>
                        <el-input placeholder="请输入" v-model="xinzengform.collateral" :maxlength="20" v-numberOnly v-else>
                            <template slot="append">元</template>
                        </el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>        
                <el-col :span="24" class="moreLength">
                    <el-form-item label="服务类型：" :label-width="formLabelWidth">
                        <p v-if="editType == 'view'">
                            <span v-for="(item,key) in serviceTypeName" :key="key" class="serviceChoose">
                                {{item}}
                            </span>
                        </p>
                        <el-checkbox-group v-model="optionsServerArr" v-else>
                                <el-checkbox v-for="obj in optionsServer" :label="obj.code" :key="obj.id" >{{obj.name}}</el-checkbox>
                        </el-checkbox-group>
                    </el-form-item>
                </el-col>
            </el-row>
            
             <el-row>        
                <el-col :span="24" class="moreLength">
                    <el-form-item label="产品与服务：" :label-width="formLabelWidth">
                        <p v-if="editType == 'view'">
                            <span v-for="(item,key) in productService" :key="key" class="serviceChoose">
                                {{item}}
                            </span>
                        </p>
                        <el-checkbox-group v-model="optionsProductArr" v-else>
                                <el-checkbox v-for="obj in optionsProductService" :label="obj.code" :key="obj.id" >{{obj.name}}</el-checkbox>
                        </el-checkbox-group>
                    </el-form-item>
                </el-col>
            </el-row>

             <el-row>        
                <el-col :span="24" class="moreLength">
                    <el-form-item label="会员服务承诺：" :label-width="formLabelWidth">
                        <p v-if="editType == 'view'">
                            <span v-for="(item,key) in otherService" :key="key" class="serviceChoose">
                                {{item}}
                            </span>
                        </p>
                        <el-checkbox-group v-model="otherServiceCode" v-else>
                                <el-checkbox v-for="obj in optionsLogisticsCompany" :label="obj.code" :key="obj.id" >{{obj.name}}</el-checkbox>
                        </el-checkbox-group>
                    </el-form-item>
                </el-col>
            </el-row>

            <el-row :span="24" v-viewer>
                <el-col :span="8">
                    <el-form-item label="上传营业执照照片：" label-width="180px" prop="businessLicenceFile">
                    </el-form-item>
                    <el-form-item  label-width="20px" prop="businessLicenceFile">
                        <div class="upload">
                            <el-tooltip class="item" effect="dark" content="双击图片查看原图" placement="top" v-if="editType == 'view'">
                                <img :src='xinzengform.businessLicenceFile ? xinzengform.businessLicenceFile : defaultImg' alt="" >
                            </el-tooltip>
                            <upload class="licensePicture" tip="（必须为jpg/png并且小于5M）" v-else v-model="xinzengform.businessLicenceFile" />
                        </div>
                    </el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item label="上传公司或者档口照片：" label-width="180px" prop="companyFacadeFile">
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
                    <el-form-item label="上传发货人名片照片：" label-width="180px" prop="shipperCardFile" >
                    </el-form-item>
                    <el-form-item  label-width="20px" prop="takeIdCardFile" >
                        <div class="upload">
                            <el-tooltip class="item" effect="dark" content="双击图片查看原图" placement="top" v-if="editType == 'view'">
                                <img :src='xinzengform.takeIdCardFile ? xinzengform.takeIdCardFile : defaultImg' alt="">
                            </el-tooltip>
                            <upload class="licensePicture" tip="（必须为jpg/png并且小于5M）" v-else v-model="xinzengform.takeIdCardFile" />
                        </div>
                    </el-form-item>
                </el-col>
          </el-row>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button type="primary" icon="el-icon-success" plain @click.stop="onSubmit" v-show="editType!='view'" :disabled="btnStatus">确 定</el-button>
          <el-button type="primary" icon="el-icon-error" plain @click="close" v-show="editType!='view'">取 消</el-button>
        </div>
      </el-dialog>
    </div>
</template>
<script>
import Upload from '@/components/Upload/singleImage'
import { eventBus } from '@/eventBus'
import {data_ChangeLogisticsCompany} from '@/api/users/logistics/LogisticsCompany.js'
import vregion from '@/components/vregion/Region.vue'
import { pickerOptions3 } from '@/utils/index.js'
import { data_LogisticsCompany,getDictionary } from '@/api/common.js'
export default {
  components:{
    Upload,
    vregion
  },
  props:{
    paramsView:{
        type:Object,
    },
    params:{
      type:Object,
    },
    value:{
      type: String,
      default:''
    },
    /*add新增，edit编辑，view查看*/
    editType: {
      type: String,
    },
    dialogFormVisible_add:{
        type:Boolean,
        required:true
    },
  },
  data(){
        return{

            ifVipTimes:[],
            pickerOptions: {
                disabledDate(time) {
                    return time.getTime() < Date.now();
                },
                shortcuts: pickerOptions3
            },
            btnStatus:false,
            serviceType:'AF028',//服务类型
            belongBrand:'AF029',//品牌code
            productServiceCode:'AF027',//产品与服务code
            otherServiceCode:'AF025',//增值服务code
            defaultImg:'/static/test.jpg',//默认第一张图片的url
            cc:'企业货主',
            selectFlag:false,
            type:'primary',
            text:'',
            title:'',
            otherService:[],//会员承诺服务
            serviceTypeName:[],
            productService:[],
            optionsLogisticsCompany:[],//会员服务承诺
            optionsBelongBrand:[],//品牌类型
            optionsProductService:[],//产品与服务
            optionsProductArr:[],
            optionsServer:[],//服务类型
            optionsServerArr:[],//
            otherServiceCode:[],//选择增值服务
            formLabelWidth:'150px',
            companyFlag:false,
            xinzengform:{
                registerOrigin:'WEB',
                isDirectional: '0',
            },
            optionsStatus:[
                {
                    value:'1',
                    name:"是"
                },
                    {
                    value:'0',
                    name:"否"
                }
            ],
            rulesForm:{
                shipperType:[
                    {required: true, message:'请选择货主类型', trigger:'change'},
                ],
                belongCity:[
                    {required:true, message:'请选择所在地', trigger:'change'},
                ],
                companyFacadeFile:[
                    {required:true,message:'请上传公司或者档口照片',trigger:'change'},
                ],
                takeIdCardFile:[
                    {required:true,message:'请上传发货人名片照片',trigger: 'change'}
                ]
            },
        }
    },
    watch:{
        dialogFormVisible_add:{
            handler: function(val, oldVal) {
                if(val){
                    this.openDialog();
                    this.getMoreInformation()
                }
            },
        },
        btntext(newVal,oldVal){
            // console.log(newVal,oldVal)
            this.text = newVal;
        },
        otherServiceCode:{
            handler(newVal,oldVal){
                if(newVal){
                    this.xinzengform.otherServiceCode = JSON.stringify(newVal);
                    let otherService = [];
                    this.optionsLogisticsCompany.find((item)=>{
                        this.otherServiceCode.forEach(el => {
                            if(item.code == el ){
                                otherService.push(item.name)    
                            }
                        })
                    })
                    this.xinzengform.otherService = JSON.stringify(otherService);
                }
            }
        },
    },
    mounted(){
    },
    methods:{
        regionChange(d) {
            // console.log('data:',d)
            this.xinzengform.belongCityName = (!d.province&&!d.city&&!d.area&&!d.town) ? '': `${this.getValue(d.province)}${this.getValue(d.city)}${this.getValue(d.area)}${this.getValue(d.town)}`.trim();
            // this.xinzengform.provinceCode = d.province ? d.province.code : '';
            // this.xinzengform.cityCode = d.city ? d.city.code : '';
            // this.xinzengform.areaCode = d.area ? d.area.code : '';
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
        //事件分发
        changeList(){
            eventBus.$emit('changeList');
        },
        openDialog(){
            if(this.editType == 'edit'){
                this.title = '修改';
                this.xinzengform = JSON.parse(JSON.stringify(this.paramsView))
                if(this.xinzengform.otherServiceCode != ''){
                    this.otherServiceCode = JSON.parse(this.xinzengform.otherServiceCode) 
                }
                if(this.xinzengform.serviceType != ''){
                    this.optionsServerArr = JSON.parse(this.xinzengform.serviceType) 
                }
                if(this.xinzengform.productServiceCode != ''){
                    this.optionsProductArr = JSON.parse(this.xinzengform.productServiceCode) 
                }
                    // this.xinzengform.isVip = this.xinzengform.isVip == 1 ? '1' : '0'
            }
            else if(this.editType == 'view'){
                this.title = '详细信息';
                this.xinzengform  = Object.assign({},this.paramsView) ;
                if(this.xinzengform.otherService != ''){
                    this.otherService = JSON.parse(this.xinzengform.otherService) 
                }
                if(this.xinzengform.serviceType != ''){
                    this.serviceTypeName = JSON.parse(this.xinzengform.serviceTypeName) 
                }
                if(this.xinzengform.productServiceCode != ''){
                    this.productService = JSON.parse(this.xinzengform.productService) 
                }
            }
        },
        //获取货主类型
        getMoreInformation(){
            data_LogisticsCompany().then(res=>{
                this.optionsLogisticsCompany = res.data;
            })
            Promise.all([getDictionary(this.belongBrand),getDictionary(this.productServiceCode),getDictionary(this.serviceType)]).then(resArr => {
                this.optionsBelongBrand = resArr[0].data;
                this.optionsProductService = resArr[1].data;
                this.optionsServer = resArr[2].data;
            })
        },
        close(done) {
            this.$refs.xinzengform.resetFields();
            this.$emit('update:dialogFormVisible_add', false);
            this.$emit('getData');
            if (typeof done === 'function') {
                done()
            }
        },
        completeInfo(){
            if(this.xinzengform.belongBrandCode){
                this.xinzengform.belongBrand = this.optionsBelongBrand.find(item => item.code === this.xinzengform.belongBrandCode)['name'];
            }
            //  console.log(this.xinzengform.belongBrandCode,this.xinzengform.belongBrand)

            let serviceTypeName = [];
            let productServiceName = [];
            // let otherServiceName =  [];

            this.optionsServerArr.forEach(el=>{
                this.optionsServer.forEach(item => {
                    if(el == item.code){
                        serviceTypeName.push(item.name)
                    }
                })
            })
            
            this.optionsProductArr.forEach(el=>{
                this.optionsProductService.forEach(item => {
                    if(el == item.code){
                        productServiceName.push(item.name)
                    }
                })
            })

            //服务类型
            this.xinzengform.serviceType = JSON.stringify(this.optionsServerArr);                         
            this.xinzengform.serviceTypeName = JSON.stringify(serviceTypeName);
            //产品与服务
            this.xinzengform.productServiceCode = JSON.stringify(this.optionsProductArr);                         
            this.xinzengform.productService = JSON.stringify(productServiceName);
            //增值服务
            // this.xinzengform.otherServiceCode = JSON.stringify(this.otherServiceCodeArr);                         
            // this.xinzengform.otherService = JSON.stringify(otherServiceName);
        },
        // 保存
        onSubmit(){
            this.$refs['xinzengform'].validate((valid)=>{
                if(valid){
                    this.btnStatus = true;
                    this.completeInfo();
                    var forms=Object.assign({},this.xinzengform)
                    data_ChangeLogisticsCompany(forms).then(res=>{
                        this.close();
                        this.changeList();
                        this.$message({
                            type: 'success',
                            message: '操作成功~'
                        })
                        this.btnStatus = false;
                    }).catch(err=>{
                        this.$message({
                            type: 'info',
                            message: '操作失败，原因：' + (err.text ? err.text : err.errinfo)
                        })
                        this.btnStatus = false;
                    })
                }else{
                    this.$message({
                        type: 'info',
                        message: '请填写完整信息' 
                    })
                    return false
                }
            })
        },
    }
    }
</script>
<style lang="scss" scoped>
    .wuliucreatDialog{
        .el-row{
            margin: 5px 0;
        }
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
                height: 100%;
            }
        }
        .moreLength{
            .el-checkbox-group{
                .el-checkbox{
                    margin:0px 30px 0 0 ;
                }
            }
        }
        .el-form-item__content{
            .v-region{
                .v-dropdown-container{
                    top: 38px !important;
                    left: -151px !important;
                }
            }
        }
        .serviceChoose{
            display: inline-block;
            padding: 0px 10px;
            margin-right: 10px;
            margin-bottom: 10px;
            color: #fff;
            background: rgb(44, 193, 219);
            -webkit-box-shadow:3px 3px 30px #888888;;
            -moz-box-shadow:3px 3px 30px #888888;;

        }
        .onlyShow{
            display: inline-block;
            width: 250px;
            height: 40px;
            line-height: 40px;
            text-align: left;
            text-indent: 10px;
            color: #3e9ff1;
            // border: 1px solid #cccccc;
            background: rgba(227, 233, 235, 0.479);
           
        }
        .el-form-item__content{
            .el-date-editor{
                width: 250px;
                height: 26px;
                line-height: 26px;
                .el-input__icon,.el-range-separator{
                    line-height: 16px;
                }
            }
        }
    }
</style>


<style lang="scss">
    // .wuliucreatDialog  .el-form-item__content .v-dropdown-container {
    //     top: 38px !important;
    //     left: -151px !important;
    // }
    // .wuliucreatDialog img{
    //     cursor: pointer;
    // }
</style>
