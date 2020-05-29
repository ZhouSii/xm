<template>
<!-- 新增分类信息 -->
    <div class="dispatchPush commoncss">
        <el-dialog :title='formtitle' :close-on-click-modal="false" v-el-drag-dialog :visible="dialogFormVisible" @close="close">
            <el-form   :model="standForm" :rules="newrules"  ref="ruleForm"  :label-width="formLabelWidth" label-position="right">
                <el-form-item  label="所在地：" prop="areaCode">
                    <getCityList class="chooseItem" @returnStr="getStr" v-model="standForm.areaCode" ref="area" v-if="!isModify"></getCityList>
                    <el-input  v-model="standForm.areaCodeName" v-else disabled></el-input>
                </el-form-item>
                <el-form-item  label="服务类型：" prop="serivceCode">
                    <el-select v-model="standForm.serivceCode" clearable placeholder="请选择" v-if="!isModify">
                        <el-option
                            v-for="item in optionsService"
                            :key="item.id"
                            :label="item.name"
                            :value="item.code"
                            :disabled="item.disabled">
                        </el-option>
                    </el-select>
                    <el-input class="choosePush" v-model="standForm.serivceCodeName" v-else disabled></el-input>
                </el-form-item>
                <el-form-item  label="货主用车类型：" prop="shipperCarType">
                    <el-select v-model="standForm.shipperCarType" clearable placeholder="请选择" v-if="!isModify">
                        <el-option
                            v-for="item in optionsCarType"
                            :key="item.id"
                            :label="item.name"
                            :value="item.code"
                            :disabled="item.disabled">
                        </el-option>
                    </el-select>
                    <el-input class="choosePush" v-model="standForm.shipperCarTypeName" v-else disabled></el-input>
                </el-form-item>
                <el-form-item class="firstPush choosePush" label="推送距离/时间：" prop="firstRecommendKm">
                    <el-input v-model="standForm.firstRecommendKm"  maxlength="4" v-numberOnly></el-input>
                    <span>公里/</span>
                </el-form-item>
                 <el-form-item class="firstPush choosePush" label-width="0" prop="firstRecommendTime">
                    <el-input v-model="standForm.firstRecommendTime" maxlength="4" v-numberOnly></el-input>
                    <span>秒</span>                    
                </el-form-item>
                <el-form-item class="" label="可见车主类型：" prop="visualCarType">
                    <el-select v-model="visualCarType" multiple collapse-tags  clearable placeholder="请选择">
                        <el-option
                            v-for="item in optionsVisualCarType"
                            :key="item.id"
                            :label="item.name"
                            :value="item.code">
                        </el-option>
                    </el-select>                  
                </el-form-item>
                <el-form-item class="" label="状态：" prop="usingStatus">
                    <el-radio-group v-model="standForm.usingStatus" >
                        <el-radio  v-for="(obj,key) in optionsStatus" :label="obj.value" :key='key'>{{obj.name}}</el-radio>
                    </el-radio-group>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button type="primary" plain  icon="el-icon-success" @click="submitForm('ruleForm')" :disabled="btnShow">{{isModify? '保 存' : '确 定'}}</el-button>
                <el-button type="primary" plain icon="el-icon-error" @click="close">取 消</el-button>
            </div> 
        </el-dialog>
    </div>
</template>
<script>

import getCityList from '@/components/GetCityList/index'
import { data_CarList, data_ServerClassList } from '@/api/common.js'
import { data_NewData,data_ChangeData } from '@/api/dispatch/OpenseaRecommend.js'
import { objectMerge2, parseTime } from '@/utils/'

export default {
  name: 'addClassfy',
  props: {
    dialogFormVisible: {
      type: Boolean,
      required: true
    },
    formtitle: {
      type: String,
      required: true
    },
    changeforms:{
        type: Object,
    },
    isModify:{
        type:Boolean,
        default:false
    }
  },
  components: {
    getCityList,
  },
  data() {
        var validateCar = (rule, value, callback) => {
            if (this.visualCarType.length == 0) {
                callback(new Error('请选择可见车主类型'));
            }else {
                callback();
            }
        };
    return {
        formLabelWidth:'180px',
        btnShow:false,
        standForm: {
            areaCode: '', // 地区code
            areaCodeName: '',
            firstRecommendKm: '', // 第一次推送公里
            firstRecommendTime: '', // 第一次推送时间
            serivceCode: '', // 服务类型
            serivceCodeName: '',
            shipperCarType: '', // 货主用车类型
            shipperCarTypeName: '',
            visualCarType: '', // 可见车主类型
            visualCarTypeName: '',
            usingStatus: '1' // 起始状态
        },
        optionsService: '', // 服务选项
        optionsCarType: '', // 车辆类型选项
        optionsVisualCarType: [],
        visualCarType: [],
        information: '',
        // 可见车主类型
        optionsStatus: [
            {
            value: '1',
            name: '启用'
            },
            {
            value: '0',
            name: '禁用'
            }
        ],
        newrules: {
            areaCode: [
                { required: true, message:"请选择所在地点", trigger: 'change' },
            ],
            serivceCode:[
                { required: true, message:"请选择服务类型", trigger: 'change' },
            ],
            shipperCarType:[
                { required: true, message:"请选择货主用车类型", trigger: 'change' },
            ],
            firstRecommendKm:[
                {required:true,message:"请输入推送距离",trigger:'blur'},
            ],
            firstRecommendTime:[
                {required:true,message:"请输入推送时间",trigger:'blur'},
            ],
            visualCarType:[
                {required:true,validator: validateCar,trigger:'change'},
            ],
            usingStatus:[
                {required:true,message:"请选择初始状态",trigger:'change'},
            ]
        },
    }
  },
    watch: {
        dialogFormVisible:{
            handler(newVal,oldVal){
                console.log('dialogFormVisible',newVal,oldVal)
                if(newVal){
                    console.log('isModify',this.isModify)
                    this.init()
                }
            },
            deep:true
        }
    },
  mounted() {
  },
  methods: {
    close(done) {
        this.$emit('update:dialogFormVisible', false);
        this.$refs.ruleForm.resetFields();
        this.clearForms();
        this.$emit('renovate');
        // if(this.$refs.area){
        //     this.$refs.area.selectedOptions = [];
        // }
        if(!this.isModify){
            this.$refs.area.clearData();
        }
        this.btnShow = false;
    },
        // 初始化选择项数据
    init() {
        this.clearForms();
        if(!this.isModify){
            return Promise.all([data_CarList(), data_ServerClassList()]).then(resArr => {
                console.log(resArr)
                this.optionsCarType = resArr[0].data;
                this.optionsService = resArr[1].data;
                this.optionsVisualCarType = resArr[0].data;
            }).catch(err => {
                this.$message({
                    type: 'warning',
                    message: '操作失败，原因：' + (err.errorInfo ? err.errorInfo : err.text)
                })
            })
        }else{
            data_CarList().then(res=>{
                this.optionsVisualCarType = res.data;
            }).catch(err => {
                this.$message({
                    type: 'warning',
                    message: '操作失败，原因：' + (err.errorInfo ? err.errorInfo : err.text)
                })
            });
            this.standForm = objectMerge2({},this.changeforms);
            this.visualCarType = this.standForm.visualCarType.split(',')
        }
    },
    getStr(d){
        console.log('data:',d)
        // this.standForm.areaCode = val;
        // this.standForm.areaCodeName = name;
        this.standForm.areaCodeName = (!d.province&&!d.city&&!d.area) ? '': `${this.getValue(d.province)}${this.getValue(d.city)}${this.getValue(d.area)}`.trim();
        if(d.city){
            this.standForm.areaCode = d.city.code;
        }else{
            this.standForm.areaCode = d.province.code;
        }
    },
    getValue(obj){
        return obj ? obj.value:'';
    },
    submitForm(formName) {
        this.$refs[formName].validate((valid) => {
            if (valid) {
                this.complantName();
                let form = objectMerge2({},this.standForm);
                let executeFunction;
                if(!this.isModify){
                    executeFunction = data_NewData(form);
                }else{
                    executeFunction = data_ChangeData(form);
                }
                this.btnShow = true;
                executeFunction.then(res => {
                    this.$message({
                        type: 'success',
                        message: '操作成功'
                    })
                    this.close()
                }).catch(err => {
                    this.$message({
                        type: 'warning',
                        message: '操作失败，原因：' + (err.errorInfo ? err.errorInfo : err.text)
                    })
                    this.btnShow = false;
                })
            } else {
                this.$message({
                    type: 'warning',
                    message: '请填写完整数据'
                })
                return false;
            }
        });
    },
    complantName() {
        const visualCar = []
        this.optionsVisualCarType.forEach(item => {
            for (var i = 0; i < this.visualCarType.length; i++) {
                if (item.code == this.visualCarType[i]) {
                    visualCar.push(item.name)
                }
            }
        })
        this.standForm.visualCarTypeName = visualCar.join(',')
        this.standForm.visualCarType = this.visualCarType.join(',')

        if (this.standForm.serivceCode && !this.isModify) {
            this.standForm.serivceCodeName = this.optionsService.find(item => item.code === this.standForm.serivceCode)['name']
        }
        if (this.standForm.shipperCarType && !this.isModify) {
            this.standForm.shipperCarTypeName = this.optionsCarType.find(item => item.code === this.standForm.shipperCarType)['name']
        }
    },
    clearForms() {
      this.standForm = {
        areaCode: '', // 地区code
        firstRecommendKm: '', // 第一次推送公里
        firstRecommendTime: '', // 第一次推送时间
        serivceCode: '', // 服务类型
        shipperCarType: '', // 货主用车类型
        visualCarType: '', // 可见车主类型
        usingStatus: '1' // 起始状态
      }
      this.visualCarType = []
    },
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" >
    .dispatchPush{
        .el-dialog{
            width: 820px;
        }
        .el-dialog__body{
            border-bottom:1px solid #ccc;   
            margin-bottom: 0; 
            margin: 0 20px;
            .el-input{
                width: 250px;
            }
            .el-form-item .el-form-item__content{
                width: 250px;
            }
            .firstPush .el-form-item__content{
                width: 100%;
            }
        }
        .choosePush{
            display: inline-block;
            .el-input{
                width: 250px;
            }
            span{
                font-size: 14px;
                line-height: 20px;
                margin: 0 5px;
            }
        }
        .firstPush{
             .el-input{
                width: 100px;
            }
        }
    }
</style>
