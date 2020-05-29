<template>
    <div class="carrierPointNetworkAdd commoncss">
        <el-dialog :title='formtitle' :close-on-click-modal="false" v-el-drag-dialog top="5vh" :visible="dialogFormVisible" @close="close">
            <el-form   :model="standForm" :rules="newrules" label-position="right"  ref="ruleForm"  :label-width="formLabelWidth">
                <el-row :gutter="20">
                    <el-col :span="12">
                        <el-form-item  label="专线承运商：" prop="carrierId">
                            <el-select v-model="standForm.carrierId" filterable placeholder="请选择" v-if="!isView">
                                <el-option
                                v-for="item in optionsCarriers"
                                :key="item.id"
                                :label="item.carriersName"
                                :value="item.id">
                                </el-option>
                            </el-select>
                            <el-input v-model="standForm.carrierName" disabled v-else></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item  label="网点名称：" prop="pointName">
                            <el-input v-model="standForm.pointName" clearable maxlength="20" :disabled="isView"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row> 
                <el-row>
                    <el-col :span="24">
                        <el-form-item label="网点所在物流园：" prop="parkId" v-if="!isView">
                            <el-select v-model="standForm.parkId" filterable placeholder="请选择" @change="doPark">
                                <el-option
                                v-for="item in optionsCompanyPark"
                                :key="item.id"
                                :label="item.parkName"
                                :value="item.id">
                                <span style="float: left">{{ item.parkName }}</span>
                                <span style="float: right; color: #8492a6; font-size: 13px">{{ item.province + item.city + item.area}}&nbsp;&nbsp;{{'('+item.detailAddress+')' }}</span>
                                </el-option>
                            </el-select>
                             <p style="text-align: right;">
                                网点所在物流园不在当前列表中？
                                <span style="cursor: pointer;color: #409EFF;" @click="dialogVisible = true">点击新增</span>
                            </p>
                        </el-form-item>
                        <el-form-item label="网点所在物流园：" class="is-required" v-else>
                            <el-input v-model="standForm.parkName" disabled></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row :gutter="20">
                    <el-col :span="12">
                        <el-form-item label="网点所在地：" prop="areaCode">
                            <el-input v-model="standForm.totalArea" disabled v-if="isView"></el-input>
                            <!-- <vregion :ui="true"  @values="regionChange" class="form-control" ref = "regionChange" v-else>
                               <el-input v-model="standForm.totalArea" placeholder="请选择" ></el-input>
                           </vregion> -->
                            <!-- <getCityList2 class="chooseItem" :currentObj="isTag ?{'province':showAddress.province,'city':showAddress.city,'area':showAddress.area} :{}" :ifChange="true" @returnStr="regionChange" :isArea="true" v-model="standForm.areaCode" ref="regionChange" v-else></getCityList2> -->
                            <getCityList2 class="chooseItem" :ifChange="true" @returnStr="regionChange" :isArea="true" v-model="standForm.areaCode" ref="regionChange" v-else></getCityList2>

                            
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="详细地址：" prop="address">
                            <el-input v-model="standForm.address" clearable maxlength="20" :disabled="isView"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row :gutter="20">
                    <el-col :span="12">
                        <el-form-item label="网点联系人：" prop="contactName">
                            <el-input v-model="standForm.contactName" clearable maxlength="20" :disabled="isView"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="网点联系人电话：" prop="contactMobile">
                            <el-input v-model="standForm.contactMobile" clearable maxlength="20" :disabled="isView"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row> 
                <el-row :gutter="20">
                    <el-col :span="12">
                        <el-form-item label="网点客服电话：" prop="serviceMobile">
                            <el-input v-model="standForm.serviceMobile" clearable maxlength="20" :disabled="isView"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row> 
                <el-row :gutter="20">
                    <el-col :span="24">
                        <el-form-item label="备注：" prop="remark">
                            <el-input
                               placeholder="少于100字符"
                               type="textarea"
                               :autosize="{ minRows: 2, maxRows: 4}"
                               clearable
                               maxlength="100"
                               :disabled="isView"
                               v-model="standForm.remark">
                           </el-input>
                        </el-form-item>
                    </el-col>
                </el-row> 
                <el-row :gutter="20" v-if="isView">
                    <el-col :span="8">
                        <el-form-item  label="创建人：" prop="creater">
                            <el-input v-model="standForm.creater" disabled></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item  label="创建时间：" prop="createTime">
                            <el-input :value="standForm.createTime | parseTime" disabled></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="最后修改人：" prop="updater">
                            <el-input v-model="standForm.updater" disabled></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="最后修改时间：" prop="updateTime">
                            <el-input :value="standForm.updateTime | parseTime" disabled></el-input>
                        </el-form-item>
                    </el-col>
                </el-row> 
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button type="primary" plain  icon="el-icon-success" v-if="!isView" @click="submitForm('ruleForm')" :disabled="btnShow">保 存</el-button>
                <el-button type="primary" plain icon="el-icon-error" @click="close">取 消</el-button>
            </div> 
        </el-dialog>

        <el-dialog
        title="新增物流园"
        class="batchImport"
        top="15vh"
        :modal="true"
        :visible="dialogVisible"
        custom-class="add-review"
        :close-on-click-modal="false"
        :modal-append-to-body="false"
        @close="close2"
        width="30%">
            <div class="ifcancel">
                <el-form :model="form" :rules="rules" ref="ruleForm2" :label-width="formLabelWidth" label-position="right">
                    <el-form-item label="物流园名称：" prop="parkName">
                        <el-input v-model="form.parkName" clearable maxlength="20"></el-input>
                    </el-form-item>
                    <el-form-item label="物流园所在地：" prop="agencyId">
                         <getCityList class="chooseItem" @returnStr="getStrStart" :isArea="true" v-model="form.areaCode" ref="startArea"></getCityList>
                    </el-form-item>
                    <el-form-item label="详细地址：" prop="detailAddress">
                        <el-input v-model="form.detailAddress" clearable maxlength="20"></el-input>
                    </el-form-item>
                </el-form>
            </div>
            <div slot="footer" class="dialog-footer">
                <el-button type="primary" plain icon="el-icon-success" @click="submitForm2('ruleForm2')">确认</el-button>
                <el-button type="primary" plain icon="el-icon-error" @click="close2">取消</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
import { getCarriersLine } from '@/api/dispatch/CarriersLine.js'
import { newCarrierPointNetwork,updateCarrierPointNetwork,carrierPointNetworkDetails,getCompanyPark,newCompanyPark } from '@/api/dispatch/carrierPointNetwork.js'
import { objectMerge2 } from '@/utils/'
import {REGEX} from '@/utils/validate'
import getCityList from '@/components/GetCityList/chinaMap'
import getCityList2 from '@/components/GetCityList/chinaMap1'

export default {
    name: 'carrierPointNetworkAdd',
    props: {
        dialogFormVisible:{
            type:Boolean,
            required:true
        },
        formtitle:{
            type:String,
            required:false,
            default:'新增专线承运商网点'
        },
        isModify:{
            type:Boolean,
            default:false,
        },
        changeForm:{
            type:Object,
        },
        isView:{
            type:Boolean,
            default:false,
        }
    },
    components:{
        getCityList,
        getCityList2
    },
    data() {
        var checkLocation = (rule,value,callback) => {
            if (value == '') {
                callback(new Error('请选择区域'));
            } else if(this.standForm.areaCode == ''){
                callback(new Error('必须选择到区域范围'));
            }else{
                callback();
            }
        };
      return {
        defaultImg:'/static/test.jpg',//默认第一张图片的url
        btnShow:false,
        formLabelWidth:'130px',
        standForm:{
            carrierName:'',//承运商名称
            carrierId:'',//承运商ID
            pointName:'',//网点名称
            parkName:'',//物流园名称
            parkId:'',//所属物流园区id
            province:'',//省
            city:'',//市
            area:'',//区
            areaCode:'',//
            totalArea:'',//所在地
            address:'',//详细地址
            contactName:'',//网点联系人
            contactMobile:'',//网点联系人电话
            serviceMobile:'',//客服电话
            remark:'',//网点描述
        },
        newrules: {
            carrierId:{required: true,message:"请选择专线承运商",trigger: 'change' },
            pointName:{required: true,message:"请输入专线承运商网点名称",trigger: 'change'},
            // parkId:{required: true,message:"请选择网点所在物流园",trigger: 'change'},
            areaCode:{required: true,message:"请选择网点所在地",trigger: 'change'},
            address:{required: true,message:"请输入网点详细地址",trigger: 'change'},
            contactName:{required: true,message:"请输入网点联系人",trigger: 'change'},
            contactMobile:{required: true,message:"请输入网点联系人电话",trigger: 'change'},
            serviceMobile:{required: true,message:"请输入网点客服电话",trigger: 'change'},
        },
        form:{
            parkName:'',//园区名称
            province:'',//省
            city:'',//市
            area:'',//区
            areaCode:'',//
            // totalArea:'',//所在地
            detailAddress:'',//详细地址
        },
        rules:{

        },
        optionsCarriers:[],//承运商
        optionsCompanyPark:[],//物流园
        // enclosure:[],//附件展示
        dialogVisible:false,
        // isTag:false,
        showAddress:{
            province:'',
            city:'',
            area:'',
        }
      };
    },
    watch:{
        dialogFormVisible:{
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
        doPark(val){
            console.log('val',val)
            let tab = this.optionsCompanyPark.filter(el => {
                return el.id == val;
            })
            let d = tab[0];
            this.standForm.parkName = d.parkName;
            this.standForm.address = d.detailAddress + d.parkName;
            this.showress(d.areaCode);
            this.standForm.totalArea = d.province+d.city+d.area ;
            this.standForm.province = d.province;//省名称
            this.standForm.city = d.city;//市名称
            this.standForm.area = d.area;
            this.standForm.areaCode = d.areaCode;
            // console.log(val,tab,this.standForm)
        },
        showress(d){
            // console.log('showress',d)
            // this.isTag = true;
            var cityStr = d.slice(0,4) + '00';
            var provinceStr = d.slice(0,2) + '0000';
            this.showAddress = {
                province:provinceStr,
                city:cityStr,
                area:d,
            };
            if(!this.isView){
                this.$refs.regionChange.doActions([this.showAddress.province*1,this.showAddress.city*1,this.showAddress.area*1])
            }
            // console.log(this.showAddress)
        },
        reviseForms(){
            if(this.isModify || this.isView){
                carrierPointNetworkDetails(this.changeForm.id).then(res => {
                    this.showress(res.data.areaCode);
                    this.standForm = objectMerge2(res.data);
                    // this.enclosure = this.standForm.contractImg ? this.standForm.contractImg.split(',') : [];
                    // console.log('this.enclosure',this.enclosure)
                    
                })
            }
        },
        regionChange(d){
            // console.log('getStrStart',d)
            // this.isTag = false;
            this.standForm.totalArea = (!d.province&&!d.city&&!d.area&&!d.town) ? '': `${this.getValue(d.province)}${this.getValue(d.city)}${this.getValue(d.area)}${this.getValue(d.town)}`.trim();
            this.standForm.province = d.province ? d.province.name : '';//省名称
            this.standForm.city = d.city ? d.city.name : '';//市名称
            this.standForm.area = d.area ? d.area.name : '';
            this.standForm.areaCode = d.area ? d.area.code : '';
        },
        getStrStart(d){
            console.log('getStrStart',d)
            // this.from.dedicateArea = (!d.province&&!d.city&&!d.area&&!d.town) ? '': `${this.getValue(d.province)}${this.getValue(d.city)}${this.getValue(d.area)}${this.getValue(d.town)}`.trim();
            this.form.province = d.province ? d.province.name : '';//省名称
            this.form.city = d.city ? d.city.name : '';//市名称
            this.form.area = d.area ? d.area.name : '';
            this.form.areaCode = d.area ? d.area.code : '';
        },
        getValue(obj){
            return obj ? obj.value:'';
        },
        close(){
            if(this.dialogFormVisible){
                this.$emit('update:dialogFormVisible',false);
                if(!this.isView){
                    this.$refs.regionChange.clearData();
                }
                // this.isTag = false;
                this.$refs.ruleForm.resetFields();
                this.clearForms();
                this.$emit('renovate');
                this.btnShow = false;
            }
        },
        close2(){
            this.$refs.ruleForm2.resetFields();
            this.dialogVisible = false;
            this.clearForms2();
        },
        //初始化选择项数据
        init(){
            getCarriersLine().then(res => {
                this.optionsCarriers = res.data;
            })
            this.loadCompanyPark();
            
        },
        loadCompanyPark(){
            getCompanyPark().then(res => {
                this.optionsCompanyPark = res.data;
            })
        },
        submitForm(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    this.btnShow = true;
                    this.complateData();
                    let forms = objectMerge2(this.standForm);
                    // console.log(forms)
                    let standarFunction;
                    standarFunction = this.isModify ? updateCarrierPointNetwork : newCarrierPointNetwork;
                    standarFunction(forms).then(res =>{
                        this.$message({
                            type: 'success',
                            message: '专线承运商网点操作成功！'
                        })
                        this.close();
                    }).catch(err => {
                        this.$message({
                            type: 'info',
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
                    let standFrom = objectMerge2(this.form);
                    // console.log('standFromstandFrom',standFrom)
                    newCompanyPark(standFrom).then(res => {
                        this.$message({
                            type: 'success',
                            message: '新增物流园成功'
                        })
                        this.loadCompanyPark();
                        this.close2();
                    }).catch(err => {
                        this.$message({
                            type: 'warning',
                            message: '操作失败，原因：' + (err.errorInfo ? err.errorInfo : err.text)
                        })
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
        clearForms(){
            for (const i in this.standForm) {
                this.standForm[i] = ''
            };
        },
        clearForms2(){
            for (const i in this.form) {
                this.form[i] = ''
            };
        },
        complateData(){
            if(this.standForm.carrierId){
                this.standForm.carrierName = this.optionsCarriers.find(item => item.id === this.standForm.carrierId)['carriersName'];
            }
        }
    },
}
</script>

<style rel="stylesheet/scss" lang="scss">
    .carrierPointNetworkAdd{
        
    }
</style>
