<template>
    <div class="newTrunkLinePrice commoncss">
        <el-dialog :title='formtitle' :close-on-click-modal="false" v-el-drag-dialog top="10vh" :visible="dialogFormVisible" @close="close">
            <el-form   :model="standForm" :rules="newrules" label-position="right"  ref="ruleForm"  :label-width="formLabelWidth">
                <el-row :gutter="20">
                   <el-col :span="12">
                        <el-form-item  label="专线承运商：" prop="agencyId">
                            <el-select v-model="standForm.agencyId" filterable placeholder="请选择" v-if="!isModify">
                                <el-option
                                v-for="item in optionsCarriers"
                                :key="item.id"
                                :label="item.carriersName"
                                :value="item.id">
                                </el-option>
                            </el-select>
                            <el-input v-model="standForm.agencyName" disabled v-else></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row :gutter="20">
                   <el-col :span="10">
                        <el-form-item  label="选择到达地：" prop="endCode" v-if="!isModify">
                            <getCityList class="chooseItem" @returnStr="getStrEnd" v-model="standForm.endCode" ref="endArea"></getCityList>
                        </el-form-item>
                         <el-form-item  label="到达地：" class="is-required" v-else>
                            <el-input :value="standForm.province+standForm.city+standForm.area" disabled></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="6" v-if="!isModify">
                        <el-form-item label="" prop="areaCodeList" label-width="0px">
                            <el-select v-model="standForm.areaCodeList"  multiple collapse-tags :loading="loadingEndCIty" @focus="getEndAreaList" clearable placeholder="请选择">
                                <el-option
                                v-for="item in optionsEndArea"
                                :key="item.code"
                                :label="item.name"
                                :value="item.code">
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                </el-row> 
                <el-row>
                    <el-col :span="24">
                        <el-form-item label="轻货价格：" class="is-required">
                            <p>(阶梯价格最大值不填，代表无穷大，例如：区间为10-，代表10m³及以上)</p>
                            <table class="systemTitle priceTable">
                                <thead>
                                    <th style="width:50%;">体积区间（m³）</th>
                                    <th>价格（元 / 票）</th>
                                    <th class="lastOne">操作</th>
                                </thead>
                                <tbody>
                                <tr v-for="(item,keys) in ligthPriceForms" :key="keys">
                                    <td>
                                        <el-input v-model="item.startVolumn" disabled></el-input>
                                        <span>----</span>
                                        <!-- <el-input v-model="item.endVolumn" @change="ifWrong(ligthPriceForms,keys,'ligthPriceForms')" v-numberOnly></el-input> -->
                                        <el-input v-model="item.endVolumn" @change="ifWrong(ligthPriceForms,keys,'ligthPriceForms')" @keyup.native="handlerChoose('ligthPriceForms',keys)"></el-input>
                                    </td>
                                    <td>
                                        <NumberOnlyPoint v-model="item.cost" :ifZero = "true"/>
                                    </td>
                                    <td class="lastOne">
                                        <div class="iconItem">
                                            <span class="addItem" @click="addItem('ligthPriceForms',keys)" v-if="keys == ligthPriceForms.length-1 && keys < 4"></span>
                                            <span class="reduceItem" @click="reduceItem('ligthPriceForms',keys)" v-if="ligthPriceForms.length !=1 && keys !== 0"></span>
                                        </div>
                                    </td>
                                </tr>
                                </tbody>
                            </table>
                        </el-form-item>
                    </el-col>
                </el-row> 
                <el-row>
                    <el-col :span="24">
                        <el-form-item label="重货价格：" class="is-required">
                            <p>(阶梯价格最大值不填，代表无穷大，例如：区间500-，代表500kg及以上)</p>
                            <table class="systemTitle priceTable">
                                <thead>
                                    <th style="width:50%;">重量区间（kg）</th>
                                    <th>价格（元 / 票）</th>
                                    <th class="lastOne">操作</th>
                                </thead>
                                <tbody>
                                    <tr v-for="(item,keys) in weigthPriceForms" :key="keys">
                                        <td>
                                            <el-input v-model="item.startVolumn" disabled></el-input>
                                            <span>----</span>
                                            <el-input v-model="item.endVolumn" @change="ifWrong(weigthPriceForms,keys,'weigthPriceForms')" v-numberOnly></el-input>
                                        </td>
                                        <td>
                                            <NumberOnlyPoint v-model="item.cost" :ifZero = "true"/>
                                        </td>
                                        <td class="lastOne">
                                            <div class="iconItem">
                                                <span class="addItem" @click="addItem('weigthPriceForms',keys)" v-if="keys == weigthPriceForms.length-1 && keys < 4"></span>
                                                <span class="reduceItem" @click="reduceItem('weigthPriceForms',keys)" v-if="weigthPriceForms.length !=1 && keys !== 0"></span>
                                            </div>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </el-form-item>
                    </el-col>
                </el-row> 
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button type="primary" plain  icon="el-icon-success" @click="submitForm('ruleForm')" :disabled="btnShow">{{isModify ? '保 存' : '确 定'}}</el-button>
                <el-button type="primary" plain icon="el-icon-error" @click="close">取 消</el-button>
            </div> 
        </el-dialog>
    </div>
</template>

<script>
import { getCarriersLine } from '@/api/dispatch/CarriersLine.js'
import { newCollectFees2,collectFeesDetails2,updateCollectFees2 } from '@/api/server/lingdan/otherService.js'
import { objectMerge2 } from '@/utils/'
import NumberOnlyPoint from '@/components//NumberOnlyPoint/index'
import getCityList from '@/components/GetCityList/chinaMap'
import { getCityInfo  } from '@/api/common'
import { getAreaAgent } from '@/api/dispatch/areaAgentSystem.js'

export default {
    name: 'newTrunkLinePrice',
    props: {
        dialogFormVisible:{
            type:Boolean,
            required:true
        },
        formtitle:{
            type:String,
            required:false,
            default:'专线承运商送货费定价'
        },
        isModify:{
            type:Boolean,
            default:false,
        },
        changeForm:{
            type:Object,
        },
        batchIds:{
            type:Array,
            default:[],
        },
        isBatch:{
            type:Boolean,
            default:false,
        }
    },
    directives: {
        enterNumber:{
            inserted: function (el) {
                const el2 = el.classList.contains('el-input') ? el.querySelector('input') : el ;
                console.log(el,el2)
                if (el2) {
                    el2.addEventListener('blur',function(){

                    })
                    // 输入法关闭事件
                    // el2.addEventListener('compositionstart', VueDirectiveObject.keepNumber)
                    // el2.addEventListener('compositionend', VueDirectiveObject.keepNumber)
                }
            }
        }
       
    },
    components:{
        NumberOnlyPoint,
        getCityList
    },
    data() {

        var checkAgencyRate = (rule, value, callback) => {
            if (!value) {
                return callback(new Error('请输入单票最低收费'));
            }
            else if (parseFloat(value) <= 0) {
                callback(new Error('单票最低收费需大于0'));
            } else {
                callback();
            }
        };

      return {
        btnShow:false,
        formLabelWidth:'120px',
        loadingStartCIty:false,
        loadingEndCIty:false,
        optionsCity:[],
        optionsStartArea:[],
        optionsEndArea:[],
        props: {
          value: 'name',
          children: 'children'
        },
        standForm:{
            // agencyArea:'',//区代所在地(区代必填)
            // agencyAreaName:'',//区代所在地(区代必填)
            // agencyAreaCode:'',//
            agencyId:'',//区代ID
            agencyName:'',//区代名称
            // startCode:'',
            // startProvince:'',//开始省名称
            // startCity:'',//开始市名称
            // totalStratArea:[],//开始区域名称
            // totalStratAreaCode:[],//开始区域code
            endCode:'',
            province:'',//结束省名称
            city:'',//结束市名称
            areaList:[],//结束区域名称
            areaCodeList:[],//结束区域名称
            // singleLowestCost:'',//单票最低费用
            // tranAging:'',//运输时效
            configs:[],
            platformType:'1',//平台类型(2：区代，3：平台，1：承运商)
            useType:'0'
        },
        ligthPriceForms:[
            {
                startVolumn:'0',
                endVolumn:'',
                cost:'',//标准价
                goodsType:'0'//货物类型(1:重货，0:轻货)
            } 
        ],
        weigthPriceForms:[
            {
                startVolumn:'0',
                endVolumn:'',
                cost:'',//标准价
                goodsType:'1'//货物类型(1:重货，0:轻货)
            }
        ],
        newrules: {
            // agencyAreaCode:{required: true, message: '请选择区代所在地', trigger: 'change'},
            agencyId:{required: true, message: '请选择专线承运商', trigger: 'change'},
            // startCode:{required: true, message: '请选择出发地省市', trigger: 'blur'},
            // totalStratAreaCode:{type: 'array', required: true, message: '请选择出发地区域', trigger: 'change'},
            endCode:{required: true, message: '请选择到达地省市', trigger: 'blur'},
            areaCodeList:{type: 'array', required: true, message: '请选择到达地区域', trigger: 'change'},
            // singleLowestCost:{required: true,validator: checkAgencyRate,trigger: 'blur'},
            // tranAging:{required: true, message: '请输入运输时效', trigger: 'change'},
        },
        optionsCarriers:[],
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
        this.init()
    },
    methods: {
        handlerChoose(type,key){
            var transportAging = this.ligthPriceForms[key].endVolumn;
            transportAging = transportAging.replace(/[^\d.]/g,""); //清除"数字"和"."以外的字符
            transportAging = transportAging.replace(/^\./g,""); //验证第一个字符是数字
            transportAging = transportAging.replace(/\.{2,}/g,"."); //只保留第一个, 清除多余的
            transportAging = transportAging.replace(".","$#$").replace(/\./g,"").replace("$#$",".");
            transportAging = transportAging.replace(/^(\-)*(\d+)\.(\d\d).*$/, '$1$2.$3'); //只能输入er位小数
            // if(type == 'awardStart'){
                this.ligthPriceForms[key].endVolumn = transportAging;
            // }else{
            //     this.standForm.aflcRecommendAwardList[key].awardEnd = transportAging;
            // }
        },
        ifWrong(item,idx,classfy){
            // console.log(item,idx)
            let flag = parseFloat(item[idx].endVolumn) <= parseFloat(item[idx].startVolumn) ? true : false;
            if(item.length == (idx+1)){
                this.addItem(classfy,idx)
            }
            let messageTip = classfy == 'ligthPriceForms' ? '体积区间最大值应大于区间最小值' : '重量区间最大值应大于区间最小值' ;
            if(flag){
                this.$message({
                    type: 'info',
                    message: messageTip
                })
                if(item.length > (idx+1)){
                    item.splice(idx+1);
                }
                return item[idx].endVolumn = ''
            }
            else if(item.length > (idx+1)){
                item[idx+1].startVolumn = item[idx].endVolumn ;
                if(item[idx+1].endVolumn){
                    if(parseFloat(item[idx+1].endVolumn) <= parseFloat(item[idx+1].startVolumn)){
                        this.$message({
                            type: 'info',
                            message: message
                        })
                        item.splice(idx+1);
                        this.addItem(classfy,idx)
                    }
                }
            }
        },
        getStrEnd(d){
            // this.searchInfo.belongCityName = (!d.province&&!d.city&&!d.area) ? '': `${this.getValue(d.province)}${this.getValue(d.city)}${this.getValue(d.area)}`.trim();
            this.standForm.areaCodeList = [];
            this.standForm.province = d.province ? d.province.name : '';//结束省名称
            this.standForm.city = d.city ? d.city.name : '';//结束市名称
            this.standForm.endCode = d.city ? d.city.code : ''
        },
        getValue(obj){
            return obj ? obj.value:'';
        },
        getEndAreaList(){
            this.optionsEndArea = [];
            if(this.standForm.endCode == ''){
                return  this.$message({
                    type: 'warning',
                    message: '请先选择到达地！'
                })
            }else{
                this.loadingStartCIty = true;
                getCityInfo(this.standForm.endCode).then(res => {
                    setTimeout(() => {
                        this.loadingStartCIty = false;
                        this.optionsEndArea = res.data;
                        if(this.optionsEndArea == [] && this.standForm.endCode){
                            this.standForm.areaCodeList = [];
                        }
                    }, 200);
                }).catch(err => {
                    this.standForm.areaCodeList = [];
                })
            }
        },
        addItem(type,idx){
            switch(type){
                case 'ligthPriceForms':
                    if(this.ligthPriceForms.length < 5){
                        this.ligthPriceForms.push({
                            startVolumn:this.ligthPriceForms[idx].endVolumn,
                            endVolumn:'',
                            cost:'',
                            goodsType:'0',
                        }); 
                    }else{
                        this.ligthPriceForms[4].endVolumn = ''
                    }
                    break;
                case 'weigthPriceForms':
                    if(this.weigthPriceForms.length < 5){
                        this.weigthPriceForms.push({
                            startVolumn:this.weigthPriceForms[idx].endVolumn,
                            endVolumn:'',
                            cost:'',
                            goodsType:'1'
                        }); 
                    }else{
                        this.weigthPriceForms[4].endVolumn = ''
                    }
                    break;
            }
        },
        reduceItem(type,idx){
            switch(type){
                case 'ligthPriceForms':
                    if(idx == this.ligthPriceForms.length -1){
                        this.ligthPriceForms[idx-1].endVolumn = '';
                    }else{
                        this.ligthPriceForms[idx+1].startVolumn = this.ligthPriceForms[idx-1].endVolumn;
                        this.$forceUpdate();
                    }
                    this.ligthPriceForms.splice(idx,1);
                    break;
                case 'weigthPriceForms':
                    if(idx == this.weigthPriceForms.length -1){
                        this.weigthPriceForms[idx-1].endVolumn = '';
                    }else{
                        this.weigthPriceForms[idx+1].startVolumn = this.weigthPriceForms[idx-1].endVolumn;
                        this.$forceUpdate();
                    }
                    this.weigthPriceForms.splice(idx,1);
                    break;
            }
        },
        close(){
            if(this.dialogFormVisible){
                this.$emit('update:dialogFormVisible',false);
                this.$refs.ruleForm.resetFields();
                this.clearForms();
                this.$emit('renovate');
                this.btnShow = false;
                if(!this.isModify){
                    this.$refs.endArea.clearData();
                }
            }
        },
        //初始化选择项数据
        init(){
            getCarriersLine().then(res => {
                this.optionsCarriers = res.data;
            })
        },
        reviseForms(){
            if(this.isModify){
                // console.log(this.changeForm)
                collectFeesDetails2(this.changeForm.id).then(res => {
                    this.standForm = objectMerge2(res.data);
                    this.ligthPriceForms = [];
                    this.weigthPriceForms = [];
                    this.standForm.configs.forEach(el => {
                        switch(el.goodsType){
                            case '0':
                                this.ligthPriceForms.push(el);
                                break;
                            case '1':
                                this.weigthPriceForms.push(el);
                                break;
                        }
                    })

                    this.ligthPriceForms.sort(function(a, b) {
                        return a.startVolumn - b.startVolumn
                    })

                    this.weigthPriceForms.sort(function(a, b) {
                        return a.startVolumn - b.startVolumn
                    })
                })
                // this.$set(this.standForm, 'timeVal', [this.changeForm.rewardStartDate,this.changeForm.rewardEndDate])
            }
            else{
                this.clearForms();
            }
        },
        submitForm(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    let ifNull = true;
                    let messageInfo;

                    this.weigthPriceForms.forEach(item => {
                        if( (item.startVolumn+'') == ''){
                            messageInfo= '重货价格重量区间最小值不可为空' 
                            ifNull = false;
                        }else if(item.cost == ''){
                            messageInfo= '重货价格定价规则不能为空' 
                            ifNull = false;
                        }
                    })

                    this.ligthPriceForms.forEach(item => {
                        if( (item.startVolumn+'') == ''){
                            messageInfo= '轻货价格体积区间最小值不可为空' 
                            ifNull = false;
                        }else if(item.cost == ''){
                            messageInfo= '轻货价格定价规则不能为空' 
                            ifNull = false;
                        }
                    })

                    if(ifNull){
                        this.btnShow = true;
                        this.completeName();
                        let forms = objectMerge2(this.standForm);
                        // console.log(forms)
                        let standarFunction = this.isModify? updateCollectFees2(forms) : newCollectFees2(forms);
                        standarFunction.then(res =>{
                            this.$message({
                                type: 'success',
                                message: this.isModify ? '修改专线承运商送货费定价' : '专线承运商送货费定价成功!'
                            })
                            this.close();
                        }).catch(err => {
                            this.$message({
                                type: 'info',
                                message: '操作失败，原因：' + (err.errorInfo ? err.errorInfo : err.text)
                            })
                            this.btnShow = false;
                        })
                    }else{
                        this.$message({
                            type: 'info',
                            message: messageInfo
                        })
                    }
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
                if(i == 'areaList' || i == 'areaCodeList' || i == 'configs'){
                    this.standForm[i] = []
                }else if(i == 'platformType'){
                    this.standForm[i] = '1'
                }else if(i == 'useType'){
                    this.standForm[i] = '0'
                }else{
                    this.standForm[i] = ''
                }
            } 
            this.ligthPriceForms = [{
                startVolumn:'0',
                endVolumn:'',
                cost:'',//标准价
                goodsType:'0'//货物类型(1:重货，0:轻货)
            }];
            this.weigthPriceForms = [{
                startVolumn:'0',
                endVolumn:'',
                cost:'',//标准价
                goodsType:'1'//货物类型(1:重货，0:轻货)
            }]
        },
        completeName(){
            if(!this.isModify){
                // this.standForm.province = this.optionsProvince.find(item => item.code ==  this.standForm.provinceCode)['name'];
                let totalendAreaName = [];
                this.standForm.areaCodeList.forEach(item => {
                    this.optionsEndArea.forEach(el => {
                        if(el.code == item){
                            totalendAreaName.push(el.name)
                        }
                    })
                })
             
                this.standForm.areaList = totalendAreaName;
                this.standForm.agencyName = this.optionsCarriers.find(item => item.id === this.standForm.agencyId)['carriersName'];
            }
            this.standForm.configs = [];
            this.standForm.configs = this.standForm.configs.concat([],this.ligthPriceForms,this.weigthPriceForms);
        },
    },
}
</script>

<style rel="stylesheet/scss" lang="scss">
    .newTrunkLinePrice{
        p{
            color: red;
        }
        .priceTable tbody{
            tr td:first-child{
                .el-input{
                    width: 45%;
                }
            }
        }
        .rewordRemark{
            padding: 10px;
            margin: 22px 0 0;
            border: 1px dashed #cccc;
            background: #f0f0f0;
            p{
                font-size:16px;
                line-height: 30px;
                color: #606266;
            }
            ul{
                li{
                    line-height: 20px;
                    span+span{
                        margin-left: 5px;
                    }
                }
            }
        }
    }
</style>
