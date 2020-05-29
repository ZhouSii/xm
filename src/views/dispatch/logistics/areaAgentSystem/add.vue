<template>
    <div class="areaTradeSystem commoncss">
        <el-dialog :title='formtitle' :close-on-click-modal="false" v-el-drag-dialog top="5vh" :visible="dialogFormVisible" @close="close">
            <el-form   :model="standForm" :rules="newrules" label-position="right"  ref="ruleForm"  :label-width="formLabelWidth">
                <el-row :gutter="20">
                    <el-col :span="12">
                        <el-form-item  label="区代名称：" prop="agencyName">
                            <el-input v-model="standForm.agencyName" clearable  maxlength="20"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="区代公司：" prop="companyName">
                            <el-input v-model="standForm.companyName" v-if="isModify" disabled></el-input>
                            <CompanySearch @returnCompany = 'getCompany' v-model="standForm.companyName" :clearableStatus = 'true' ref="CompanySearch" v-else/>
                        </el-form-item>
                    </el-col>
                </el-row> 
                <el-row :gutter="20">
                    <el-col :span="12">
                        <el-form-item label="公司联系人：" prop="comContactName">
                            <el-input v-model="standForm.comContactName" clearable maxlength="20"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="联系人电话：" prop="comMobile">
                            <el-input v-model="standForm.comMobile" clearable maxlength="20"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row :gutter="20">
                    <el-col :span="24">
                        <el-form-item  label="区代详细地址：" prop="detailAddress">
                            <el-input v-model="standForm.detailAddress" ref="addressInput" clearable @focus="toLoadUI()" @clear="()=>{return clearAddress(standForm)}"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row :gutter="20">
                    <el-col :span="12">
                        <el-form-item label="区代所在地：" prop="agencyArea">
                            <!-- <getCityList class="chooseItem" @returnStr="getStrStart" :isArea="true" v-model="standForm.areaCode" ref="startArea"></getCityList> -->
                            <vregion :ui="true"  @values="regionChange" class="form-control" ref = "regionChange">
                               <el-input v-model="standForm.agencyArea" placeholder="请选择" ></el-input>
                           </vregion>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="门牌号：" prop="doorNo">
                            <el-input v-model="standForm.doorNo" clearable maxlength="20"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row :gutter="20">
                    <el-col :span="12">
                        <el-form-item  label="区代联系人：" prop="contactName">
                            <el-input v-model="standForm.contactName" clearable maxlength="20"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="联系人电话：" prop="mobile">
                            <el-input v-model="standForm.mobile"  clearable v-numberOnly maxlength="20"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row> 
                <el-row :gutter="20">
                    <el-col :span="12">
                       <el-form-item label="运作时间：" prop="timeVal">
                            <el-date-picker
                                v-model="standForm.timeVal"
                                type="daterange"
                                start-placeholder="开始日期"
                                value-format="timestamp"
                                unlink-panels
                                end-placeholder="结束日期"
                                :default-time="['00:00:00', '23:59:59']">
                            </el-date-picker>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item  label="区代客服电话：" prop="agencyMobile">
                            <el-input v-model="standForm.agencyMobile" clearable maxlength="20"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row> 
                <el-row :gutter="20">
                    <el-col :span="12">
                        <el-form-item label="前端显示区代图片：" prop="imgSrc">
                            <Upload class="licensePicture" tip="（必须为jpg/png并且小于5M）" v-model="standForm.imgSrc" />
                        </el-form-item>
                    </el-col>
                </el-row> 
                <el-row :gutter="20" v-if="!isModify">
                    <el-col :span="12">
                        <el-form-item  label="运作覆盖街道：">
                            <div class="defaultTree">
                                <el-tree
                                :props="defaultProps"
                                :highlight-current="true"
                                :check-strictly="false"
                                :load="loadDataTree"
                                lazy
                                node-key="code"
                                ref="defaultTree"
                                :expand-on-click-node="false"
                                @check = 'getCurrentNode'
                                show-checkbox>
                                </el-tree>
                            </div>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="运作路线(到达地)：">
                            <div class="defaultTree">
                                <el-tree
                                show-checkbox
                                :data="agencyLineTree"
                                :props="defaultProps2"
                                :check-strictly="true"
                                node-key="value"
                                ref = 'defaultTree2'
                                :highlight-current = "true"
                                >
                                </el-tree>
                            </div>
                        </el-form-item>
                    </el-col>
                </el-row> 
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button type="primary" plain  icon="el-icon-success" @click="submitForm('ruleForm')" :disabled="btnShow">保 存</el-button>
                <el-button type="primary" plain icon="el-icon-error" @click="close">取 消</el-button>
            </div> 
        </el-dialog>
    </div>
</template>

<script>

import { newAreaAgentSystem,getAgencyLine,reviseAreaAgentSystem } from '@/api/dispatch/areaAgentSystem.js'
import { objectMerge2 } from '@/utils/'
import NumberOnlyPoint from '@/components//NumberOnlyPoint/index'
import Upload from '@/components/Upload/singleImage'
// import Upload from '@/components/Upload/singlei'
import {getCityInfo} from '@/api/common'
import { loadJs,loadAmap } from '@/utils/'
import { getStreetInfo } from '@/api/common'
import CompanySearch from '@/components/CustomerSearch/companyList'
// import getCityList from '@/components/GetCityList/chinaMap'
import vregion from '@/components/vregion/Region'
import {REGEX} from '@/utils/validate'

export default {
    name: 'areaTradeSystem',
    props: {
        dialogFormVisible:{
            type:Boolean,
            required:true
        },
        formtitle:{
            type:String,
            required:false,
            default:'新增区代'
        },
        isModify:{
            type:Boolean,
            default:false,
        },
        changeForm:{
            type:Object,
        }
    },
    components:{
        NumberOnlyPoint,
        Upload,
        CompanySearch,
        // getCityList,
        vregion,
    },
    data() {
        var agencyMobileCheck = (rule, value, callback) => {
            if(!value){
                callback(new Error('区代客服电话不能为空'));
            }
            else if (!REGEX.MOBILE.test(value) && !REGEX.TEL.test(value)) {
                callback('请输入正确的手机号或电话号码~')
            }else{
                callback()
            }
        };
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
        btnShow:false,
        formLabelWidth:'150px',
        standForm:{
            agencyName:'',//区代名称
            companyId:'',//区代公司
            companyName:'',//区代公司名称
            comContactName:'',//公司联系人
            companyScore:'',
            comMobile:'',//公司联系人电话
            detailAddress:'',//区代详细地址
            latitude:'',//纬度
            longitude:'',//经度
            agencyArea:'',//区代所在地
            province:'',//区代省份
            city:'',//区代市
            area:'',//区域
            areaCode:'',//区域code
            doorNo:'',//门牌号
            contactName:'',//区代联系人
            mobile:'',//区代联系人电话
            agencyMobile:'',//区代客服电话
            imgSrc:'',//区代图片
            timeVal:[],
            startTime:'',//运作开始日期
            endTime	:'',//运作结束日期
            agencyStreets:[//
                // {
                //     startProvince:'',//开始省份
                //     startProvinceCode:'',//开始省份code
                //     startCity:'',//开始城市
                //     startCityCode:'',//开始城市code
                //     startArea:'',//开始区域
                //     startAreaCode:'',//开始区域code
                // }
            ],
            agencyAndLine:[]//{lineId:''}
        },
        newrules: {
            agencyName:{required: true,message:"请输入区代名称",trigger: 'change'},
            companyName:{required: true,message:"请选择区代公司",trigger: 'change' },
            detailAddress:{required: true, message:"请输入区代详细地址", trigger: 'change'},
            agencyArea:{ required: true, validator: checkLocation,trigger: 'change'},
            agencyMobile:{required: true, validator: agencyMobileCheck,trigger: 'change'},
            imgSrc:{required: true, message:"请上传前端显示区代图片", trigger: 'change'},
            timeVal:{type: 'array', required: true, message: '请选择奖励日期', trigger: 'change'},
        },
        defaultProps: {
            label: 'name',
            children: 'children',
            isLeaf: "leaf"
        },
        defaultProps2: {
            label: 'label',
            children: 'children',
            isLeaf: "leaf"
        },
        initTreeData:[],//初始化城市树
        agencyLineTree:[],//初始化运作线路
        cityArr:[],//展开城市的Arr
        areaArr:[],//展开区域的Arr
      };
    },
    watch:{
        'standForm.areaCode':{
            handler(newVal,oldVal){
                // console.log('standForm.areaCode',newVal,'standForm',oldVal)
                if(newVal){
                    getAgencyLine(newVal,this.standForm.city).then(res => {
                        this.agencyLineTree = res.data;
                        if(!res.data){
                            this.$message({
                                type: 'info',
                                message: '当前区代所在地没有线路信息，请先添加干线费定价!'
                            })
                        }
                    }).catch(err => {
                        this.$message({
                            type: 'info',
                            message: '网络失败，原因：' + (err.errorInfo ? err.errorInfo : err.text)
                        })
                    })
                }
            },
            deep:true
        },
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
        reviseForms(){
            if(this.isModify){
                this.clearForms()
                this.standForm = objectMerge2(this.changeForm);
                this.$set(this.standForm, 'timeVal', [this.changeForm.startTime,this.changeForm.endTime])
            }else{
                this.clearForms();
            }
        },
        regionChange(d){
            // console.log('getStrStart',d)
            this.standForm.agencyArea = (!d.province&&!d.city&&!d.area&&!d.town) ? '': `${this.getValue(d.province)}${this.getValue(d.city)}${this.getValue(d.area)}${this.getValue(d.town)}`.trim();
            this.standForm.province = d.province ? d.province.name : '';//省名称
            this.standForm.city = d.city ? d.city.name : '';//市名称
            this.standForm.area = d.area ? d.area.name : ''
            this.standForm.areaCode = d.area ? d.area.code : ''
        },
        getValue(obj){
            return obj ? obj.value:'';
        },
        getCompany(val){
            // console.log('getCompany',val)
            this.standForm.companyId = val.id;
            this.standForm.companyName = val.companyName;
            this.standForm.comMobile = val.mobile;
            this.standForm.comContactName = val.contactsName;
            this.standForm.companyScore = val.companyScore;
        },
        clearAddress(item){
            this.$set(item,'detailAddress','');
            this.$set(item,'latitude','');
            this.$set(item,'longitude','');
            this.$set(item,'province','');
            this.$set(item,'city','');
            this.$set(item,'area','');
            this.$set(item,'areaCode','');
            this.$refs.regionChange.clear();
            // this.$refs.startArea.clearData();
        },
        loadDataTree(node, resolve) {
            // console.log('node',node)
            if (node.level === 0) {
                return resolve(this.initTreeData);
            }

            let doActions = node.level == 3 ? getStreetInfo : getCityInfo ;
            doActions(node.data.code).then(res => {
                // console.log('resChild',res)
                let rootChildren = [];
                if (res.data && res.data.length > 0) {
                    if(node.level == 1){
                        this.cityArr = this.cityArr.concat(res.data);
                    }else if(node.level == 2){
                        this.areaArr = this.areaArr.concat(res.data);
                    }
                    res.data.forEach(element => {
                        rootChildren.push({
                            name: element.name,
                            leaf: node.level < 3 ? false : true ,
                            shortName: element.shortName,
                            code: element.code,
                            location: element.location,
                            parentCode: element.parentCode,
                            children: []
                        });
                    });
                }
                if (resolve) {
                    // console.log('rootChildren',rootChildren)
                    resolve(rootChildren); //动态加载时
                } else {
                    //更新节点时：
                    node.childNodes = [];
                    node.doCreateChildren(rootChildren);
                }
            });
        },
        renderContent(h, { node, data }) {
            
        },
        close(){
            if(this.dialogFormVisible){
                this.$emit('update:dialogFormVisible',false);
                this.$refs.regionChange.clear()
                this.$refs.ruleForm.resetFields();
                this.clearForms();
                this.$emit('renovate');
                this.btnShow = false;
                if(!this.isModify){
                    this.$refs.CompanySearch.clear();
                }
            }
        },
        //初始化选择项数据
        init(){
            getCityInfo().then(res => {
                this.initTreeData = res.data;
                // console.log('this.initTreeData',this.initTreeData)
            });

            // loadJs('https://webapi.amap.com/ui/1.0/main.js?v=1.0.11');
        },
        toLoadUI(){
            loadAmap(true).then(()=>{
            // console.log(this.$refs.addressInput)
            AMapUI.loadUI(['misc/PoiPicker'], (PoiPicker) =>{
            let poiPicker = new PoiPicker({
                input: this.$refs.addressInput.$refs.input
            });
            this.poiPickerReady(poiPicker);
            });
            })
        },
        poiPickerReady(poiPicker){
            poiPicker.on('poiPicked', (poiResult)=> {
                // console.log(poiResult)
                if(poiResult.item.location === undefined){
                    this.$message.warning("没有获取到地址");
                    this.standForm.detailAddress = '';
                    this.standForm.latitude = '';
                    this.standForm.longitude = '';
                    this.standForm.province = '';
                    this.standForm.city = '';
                    this.standForm.area = '';
                    this.standForm.areaCode = '';
                    this.$refs.regionChange.clear()
                    // this.$refs.startArea.clearData();
                    return
                }

                let geocoder = new AMap.Geocoder({});
                geocoder.getAddress([poiResult.item.location.lng,poiResult.item.location.lat], (status, result) =>{
                    if (status === 'complete' && result.info === 'OK') {
                    // console.log('result',result)
                    this.standForm.detailAddress = `${poiResult.item.name} (${poiResult.item.district}${poiResult.item.address})`
                    this.standForm.latitude = poiResult.item.location.lat;
                    this.standForm.longitude = poiResult.item.location.lng;
                    this.standForm.province = result.regeocode.addressComponent.province;
                    this.standForm.city = result.regeocode.addressComponent.city;
                    this.standForm.area = result.regeocode.addressComponent.district;
                    this.standForm.areaCode = result.regeocode.addressComponent.adcode;
                    this.standForm.agencyArea = `${result.regeocode.addressComponent.province}${result.regeocode.addressComponent.city}${result.regeocode.addressComponent.district}`;
                    // let cityCode = this.standForm.areaCode.slice(0,4)+'00';
                    // let provinceCode = cityCode.slice(0,3)+'000';
                    // console.log(this.$refs.startArea)
                    }
                });
            });
        },
        getCurrentNode(res,res1,res2,res3){
            // console.log('res,res1,res2,res3',res,res1,res2,res3)
            const getNodeId = this.$refs.defaultTree.getCheckedNodes()
            // console.log('getNodeId',getNodeId)
        },  
        fillInfo(parentCode,itemArr){
            let item = null ;
            itemArr.forEach(el => {
                if(el.code == parentCode){
                    item = el;
                }
            })
            return item;
        },
        submitForm(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    this.btnShow = true;
                    this.complateData();
                    let forms = objectMerge2(this.standForm);
                    console.log(forms)
                    let standarFunction;
                    standarFunction = this.isModify ? reviseAreaAgentSystem : newAreaAgentSystem;
                    standarFunction(forms).then(res =>{
                        this.$message({
                            type: 'success',
                            message: '新增区代成功！'
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
        clearForms(){
            for (const i in this.standForm) {
                if(i == 'agencyStreets' || i == 'agencyAndLine'){
                    this.standForm[i] = []
                }
                this.standForm[i] = ''
            };
            this.cityArr = [];//展开城市的Arr
            this.areaArr = [];//展开区域的Arr
        },
        complateData(){
            if(!this.isModify){
                console.log(this.areaArr,this.cityArr)
                const getNodeId = this.$refs.defaultTree.getCheckedNodes()

                let params = [];

                getNodeId.forEach(el => {
                    let paramsObj = {
                        startStreetCode:el.code,
                        startStreet:el.name,
                        startArea:'',
                        startAreaCode:'',
                        startCity:'',
                        startCityCode:'',
                        startProvince:'',
                        startProvinceCode:'',
                    }

                    let areaObj = this.fillInfo(el.parentCode,this.areaArr);
                    let cityObj = this.fillInfo(areaObj.parentCode,this.cityArr);
                    let provinceObj = this.fillInfo(cityObj.parentCode,this.initTreeData);

                    paramsObj.startArea = areaObj.name;
                    paramsObj.startAreaCode = areaObj.code;

                    paramsObj.startCity = cityObj.name;
                    paramsObj.startCityCode = cityObj.code;

                    paramsObj.startProvince = provinceObj.name;
                    paramsObj.startProvinceCode = provinceObj.code;

                    params.push(paramsObj);
                })

                this.standForm.agencyStreets = params;

                // console.log('params',params)

                const lineId = [];
                const getNodeId2 = this.$refs.defaultTree2.getCheckedNodes();
                // console.log('getNodeId2',getNodeId2)
                getNodeId2.forEach(el => {
                    lineId.push({lineId:el.value})
                })
                this.standForm.agencyAndLine = lineId;

                // console.log('getNodeId2',getNodeId2)
            }

            this.standForm.startTime =  this.standForm.timeVal[0] ? this.standForm.timeVal[0] : '';
            this.standForm.endTime =  this.standForm.timeVal[1] ? this.standForm.timeVal[1] :'';
        }
    },
}
</script>

<style rel="stylesheet/scss" lang="scss">
    .areaTradeSystem{
        .amap-ui-poi-picker-sugg-list .sugg-item {
            line-height: 22px;
        }
        .defaultTree{
            width: 100%;
            height: 296px;
            // margin-bottom: 12px;
            overflow: auto;
            border: 1px solid #ccc;
            padding:5px;
        }

        .el-tree-node__content>.el-checkbox {
            display: none;
        }

        .el-tree-node__content>.is-leaf+.el-checkbox {
            display: block;
        }


        // .el-tree .el-tree-node .el-tree-node__children .el-tree-node .el-tree-node__children .el-tree-node .el-tree-node__children .el-tree-node .el-checkbox{
        //     display:block;
        // }


    }
</style>
