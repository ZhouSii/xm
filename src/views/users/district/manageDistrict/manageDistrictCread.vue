<template>
     <div class="manageDistrict commoncss">
      <el-button :type="btntype" :value="value" :plain="plain" :icon="icon" @click="openDialog()" size="mini">{{btntext}}</el-button>
      <el-dialog  :visible="dialogFormVisible_add" :before-close="change" :title="btntitle" top=5vh v-dialogDrag :closeOnClickModal='false'>
        <el-form ref="formAll" :model="formAll" :rules="rulesForm" :label-width="formLabelWidth">
            <el-row>
                <el-col :span="12">
                    <el-form-item label="区代公司名称 ："  prop="partnerCompany">
                        <el-select v-model="formAll.partnerCompany" filterable placeholder="请选择" @change="handleSelect">
                            <el-option
                            v-for="item in restaurants"
                            :key="item.id"
                            :label="item.companyName"
                            :value="item.companyName">
                            <span style="float: left">{{ item.companyName }}</span>
                            <span style="float: right; color: #8492a6; font-size: 13px">{{ item.mobile }}</span>
                            </el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
                 <el-col :span="12">
                    <el-form-item label="联系人 ：">
                    <el-input v-model="formAll.partnerName"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="12">
                    <el-form-item label="手机号码 ："  prop="mobile">
                    <el-input v-model="formAll.mobile"></el-input>
                    </el-form-item>
                </el-col>
                 <el-col :span="12">
                    <el-form-item label="所在地 ："  prop="areaName">
                    <vregion :ui="true"  @values="regionChange" class="form-control">
                        <el-input v-model="formAll.areaName" placeholder="请选择"></el-input>
                    </vregion>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="12">
                    <el-form-item label="签约时间 ："  prop="signingDate">
                    <el-date-picker
                    v-model="formAll.signingDate"
                    type="datetime"
                    value-format="timestamp"
                    placeholder="请选择日期">
                    </el-date-picker>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="是否开通28货运后台 ：" >
                        <el-radio-group v-model="isVip" >
                            <el-radio  v-for="(obj,key) in optionsStatus" :label="obj.value" :key='key'>{{obj.name}}</el-radio>
                        </el-radio-group>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="12">
                    <el-form-item label="合同开始日期 ："  prop="contractStartDate">
                    <el-date-picker
                    v-model="formAll.contractStartDate"
                    type="datetime"
                    value-format="timestamp"
                    default-time="00:00:00"
                    placeholder="请选择日期">
                    </el-date-picker>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="合同结束日期 ："  prop="contractEndDate">
                    <el-date-picker
                    v-model="formAll.contractEndDate"
                    type="datetime"
                    value-format="timestamp"
                    default-time="23:59:59"
                    placeholder="请选择日期">
                    </el-date-picker>                        
                    </el-form-item>
                </el-col>                
            </el-row>
           <el-row>
            <el-col :span="24">
                <h2 class="manageDistrict_h2">合作区域</h2>
            </el-col>   
            </el-row>  
           <el-row>
            <el-col :span="24">
                <div class="manageDistrict_table" v-for="(form,keys) in formAll.aflcPartnerAreaList" :key='keys'>
                 <div v-if="keys == 0" class="manageDistrict_tr">
                     <div class="manageDistrict_th table_w1">合作区域</div>
                     <div class="manageDistrict_th table_w2"><span class="fontRed">*</span>合作开始日期</div>
                     <div class="manageDistrict_th table_w3"><span class="fontRed">*</span>合作截止日期</div>
                     <div class="manageDistrict_th table_w4">操作</div>
                 </div>
                 <div class="manageDistrict_tr">
                     <div class="manageDistrict_td table_w1" @click="changeInput(keys)">
                      <GetCityList ref="area1" v-model="formAll.aflcPartnerAreaList[keys].areaName"  @returnStr="getStr1"></GetCityList>
                      </div>
                     <div class="manageDistrict_td table_w2">
                    <el-date-picker
                    v-model="formAll.aflcPartnerAreaList[keys].contractStartDate"
                    type="datetime"
                    value-format="timestamp"
                    default-time="00:00:00"
                    placeholder="请选择日期">
                    </el-date-picker>  
                     </div>
                     <div class="manageDistrict_td table_w3">
                 <el-date-picker
                    v-model="formAll.aflcPartnerAreaList[keys].contractEndDate"
                    type="datetime"
                    value-format="timestamp"
                    default-time="23:59:59"
                    placeholder="请选择日期">
                    </el-date-picker>  
                     </div>
                     <div  class="manageDistrict_td Item_position table_w4"><span  class="addItem" @click="addItem()" v-if="keys==0"> </span><span  class="reduceItem" @click="reduceItem(keys)" v-else> </span></div>
                 </div>
                </div>
            </el-col>   
            </el-row>
           <el-row>
            <el-col :span="24">
                <h2 class="manageDistrict_h2">合作附件</h2>
            </el-col>   
            </el-row>  
           <el-row>
            <el-col :span="24">
                <div class="manageDistrict_table" v-for="(form,keys) in formAll.aflcPartnerFileList" :key='keys'>
                 <div v-if="keys == 0" class="manageDistrict_tr">
                     <div class="manageDistrict_th table_w5">附件</div>
                     <div class="manageDistrict_th table_w4">操作</div>
                 </div>
                 <div class="manageDistrict_tr">
                     <div class="manageDistrict_td table_w5">
                    <span  @click="selectUpload(keys)">
                    <upload class="licensePicture" tip="（必须为jpg/png并且小于5M）" v-model="formAll.aflcPartnerFileList[keys].saveAddress"  @fileNmeChange = 'fileNmeChange' />
                   </span>
                    </div>
                     <div  class="manageDistrict_td Item_position table_w4"><span  class="addItem" @click="addItemFile()" v-if="keys==0"> </span><span  class="reduceItem" @click="reduceItemFile(keys)" v-else> </span></div>
                 </div>
                </div>
            </el-col>   
            </el-row>

        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button type="primary"  @click="add_data">确 定</el-button>
          <el-button @click="close()">取 消</el-button>
        </div>
      </el-dialog>
    </div>
</template>
<script>
import {data_get_aflcPartner_create,data_get_aflcTradeArea_Id,data_get_aflcPartner_findAuthCompany} from '@/api/users/district/manageDistrict.js'
import GetCityList from '@/components/GetCityList/city'
import { eventBus } from '@/eventBus'
import Upload from '@/components/Upload/singlei'
import vregion from '@/components/vregion/Region'
export default {
  props:{
    params:{
      type:[Object,String,Array,Number],
    },
    value:{
      type: String,
      default:''
    },
    btntype: {
      type: String,
      default: ''
    },
    btntext: {
      type: String,
      default: ''
    },
    btntitle: {
    type: String,
    default: ''
    },
    icon:{
      type: String,
      default: ''
    },
    plain:{
      type: Boolean,
      default: false
    },
    /*add新增，edit编辑，view查看*/
    editType: {
      type: String,
    }    
  },
  data(){
          //    选择省市校验
        const areaNameValidator = (rule, val, cb) => {
            if(!this.formAll.areaName){
            cb(new Error('所属地区不能为空'))
            }
            else{
                cb()
            }                 
        }

    //    选择区代公司名称校验
        const partnerCompanyValidator = (rule, val, cb) => {
            if(!val){
            cb(new Error('区代公司名称不能为空'))
            }
            else{
                cb()
            }        
        }

    //    选择签约日期校验
        const signingDateValidator = (rule, val, cb) => {
            if(!val){
            cb(new Error('签约日期不能为空'))
            }
            else{
                cb()
            }        
        }
    //    选择合同开始日期校验
        const contractStartDateValidator = (rule, val, cb) => {
            if(!val){
            cb(new Error('合同开始日期不能为空'))
            }
            else{
                cb()
            }        
        }
    //    选择合同结束日期校验
        const contractEndDateValidator = (rule, val, cb) => {
            if(!val){
            cb(new Error('合同结束日期不能为空'))
            }
            else if(val<this.formAll.contractStartDate){
                cb(new Error('合同结束日期必须大于合同开始日期'))
            }
            else{
                cb()
            }        
        }        

    //    手机号校验
        const ownerPhoneValidator = (rule, val, cb) => {
            let phoneTest = /(^1[2|3|4|5|6|7|8|9]\d{9}$)|(^09\d{8}$)/
            !val && cb(new Error('手机号码不能为空'))
            if(!(phoneTest.test(val))){
                cb(new Error('请输入正确的手机号码格式'))
            } 
            else{
               cb()
            }  
        }

        return{
        btnStatus:true, //新增修改按钮状态    
        companyId:null,    
        areaCode:null,
        companyNameObject:{
            companyName:null,
        },
        restaurants:[],
        isVip:'0',
        areaStatus:null,    
        selectFlag:null,
        dialogFormVisible_add: false,
        formLabelWidth:'160px',
        inputKey:null,
        formAll:{
            partnerCompany:null,
            partnerName:null,
            mobile:null,
            areaName:null,
            areaCode: null,
            province:null,
            city:null,
            area:null,
            signingDate:null,
            contractStartDate:null,
            contractEndDate:null,
            aflcPartnerAreaList:[{
            areaName: null,
            areaCode: null,
            province:null,
            city:null,
            area:null,
            contractStartDate:null,
            contractEndDate:null,
            }],
            aflcPartnerFileList:[{
                saveAddress:'',    
                fileName:'',   
            }]       
        },
          optionsStatus: [
              {
                value: '1',
                name: '是'
              },
              {
                value: '0',
                name: '否'
              }
            ],
         rulesForm:{
            partnerCompany:{trigger:'change',required:true,validator: partnerCompanyValidator},     
            mobile:{trigger:'change',required:true,validator: ownerPhoneValidator},         
            areaName:{trigger:'change',required:true,validator: areaNameValidator},         
            signingDate:{trigger:'change',required:true,validator: signingDateValidator},
            contractStartDate:{trigger:'change',required:true,validator: contractStartDateValidator},  
            contractEndDate:{trigger:'change',required:true,validator: contractEndDateValidator},                                             
            },
        }
  },
  components:{
      Upload,
      GetCityList,
      vregion
  },
  watch:{
   dialogFormVisible_add:{
        handler: function(val, oldVal) {
            if(!val){
                this.$refs['formAll'].resetFields();
                 this.formAll.address = null;
                 this.selectFlag = null;
                this.formAll.aflcPartnerAreaList=[{
                areaName: null,
                areaCode: null,
                province:null,
                city:null,
                area:null,
                contractStartDate:null,
                contractEndDate:null,
                }]
                this.formAll.aflcPartnerFileList=[{
                saveAddress:'',    
                fileName:'',    
                }]   
                this.areaStatus = null
                this.areaCode =null,
                this.companyId = null,
                this.companyNameObject.companyName = null;
                 if(this.$refs.area){
                     this.$refs.area.clearData();
                 }
                 if(this.$refs.area1){
                  for(var i=0;i< this.$refs.area1.length;i++)
                  {
                    this.$refs.area1[i].clearData();
                  }
                 }
                }
                else{
                this.getMoreInformation();
                this.btnStatus = true
                }
        },
    },
  },
  methods:{
        regionChange(d) {
                this.formAll.areaName = (!d.province&&!d.city&&!d.area&&!d.town) ? '': `${this.getValue(d.province)}${this.getValue(d.city)}${this.getValue(d.area)}${this.getValue(d.town)}`.trim();
                this.formAll.province =  !d.province?'': d.province.name
                this.formAll.city = !d.city?'': d.city.name
                this.formAll.area = !d.area?'': d.area.name
                if(d.province&&d.city&&d.area){
                    this.formAll.areaCode = d.area.code
                }
                else if(d.province&&d.city&&!d.area){
                    this.formAll.areaCode = d.city.code
                }
                else{
                    this.formAll.areaCode = d.province.code
                }
            },
             getValue(obj){
                return obj ? obj.value:'';
            },
       handleSelect(item) {
          let SelectObj = {};
          SelectObj = this.restaurants.find((data)=>{
          return data.companyName==item;
          });
                this.formAll.partnerName = SelectObj.contactsName
                this.formAll.mobile = SelectObj.mobile
                this.areaCode = SelectObj.belongCity
                this.formAll.province = SelectObj.provinceCode
                this.formAll.city = SelectObj.cityCode
                this.formAll.area = SelectObj.areaCode
                this.companyId = SelectObj.id
                this.formAll.areaName =  SelectObj.belongCityName
        },
      changeInput:function(i){
        this.inputKey = i;
        },
      selectUpload(i){
        this.selectIndex = i;
      },
      fileNmeChange(i){
      this.formAll.aflcPartnerFileList[this.selectIndex].fileName = i
      },
      getStr(val){
        if(!val.area){
            this.formAll.areaCode= val.city.code
            this.formAll.areaName = ''
        }
        else{
            this.formAll.areaCode= val.area.code
            this.formAll.areaName = val.area.name
        }
            this.formAll.province = val.province.name
            this.formAll.city = val.city.name
            this.formAll.area = val.area.name
            }, 
      getStr1(val){
        if(!val.area){
            this.formAll.aflcPartnerAreaList[this.inputKey].areaCode = val.city.code;
            this.formAll.aflcPartnerAreaList[this.inputKey].areaName = ''
        }
        else{
            this.formAll.aflcPartnerAreaList[this.inputKey].areaCode = val.area.code;
            this.formAll.aflcPartnerAreaList[this.inputKey].areaName = val.area.name;
        }
        this.formAll.aflcPartnerAreaList[this.inputKey].province = val.province.name;
        this.formAll.aflcPartnerAreaList[this.inputKey].city = val.city.name;
        this.formAll.aflcPartnerAreaList[this.inputKey].area = val.area.name;
    }, 
    openDialog:function(){
        this.dialogFormVisible_add = true;
    },
    change:function(){
        this.dialogFormVisible_add = false;
    },
    close:function(){
        this.dialogFormVisible_add = false;
        },
       
    getMoreInformation(){
         let FromData = {
             companyName:null,
        }
        data_get_aflcPartner_findAuthCompany(1, 10000, FromData).then(res=>{
         this.restaurants = res.data;
        })
        }, 
        changeList(){
            eventBus.$emit('pushListtwo')
        },  
    // 合作区域新增
    addItem(){
           this.formAll.aflcPartnerAreaList.push({
            areaName: null,
            areaCode: null,
            province:null,
            city:null,
            area:null,
            contractStartDate:null,
            contractEndDate:null,
           }) 
        },
//    合作区域删除
    reduceItem(i){
            if(this.formAll.aflcPartnerAreaList.length>1){
            this.formAll.aflcPartnerAreaList.splice(i,1);
            }
            else{
                return
    }
   },   
    // 区域附件新增
    addItemFile(){
           this.formAll.aflcPartnerFileList.push({
            fileName:null,
           }) 
        },
//    区域附件删除
    reduceItemFile(i){
            if(this.formAll.aflcPartnerFileList.length>1){
            this.formAll.aflcPartnerFileList.splice(i,1);
            }
            else{
                return
    }
   },     
   // 省市状态表
     changeSelect(){
                this.selectFlag='1'
            },         

   completeData(){
   for(var i=0;i<this.formAll.aflcPartnerAreaList.length;i++)
   {
     if(!this.formAll.aflcPartnerAreaList[i].province){
        this.$message.warning('合作区域都不能为空');
        return false
      }
     if(!this.formAll.aflcPartnerAreaList[i].contractStartDate){
        this.$message.warning('合作区域开始日期都不能为空');
        return false
      }
     if(!this.formAll.aflcPartnerAreaList[i].contractEndDate){
        this.$message.warning('合作区域截止日期都不能为空');
        return false
      }      
     if(this.formAll.aflcPartnerAreaList[i].contractStartDate<this.formAll.contractStartDate){
        this.$message.warning('合作区域开始日期必须大于合同开始日期');
        return false
     }
     if(this.formAll.aflcPartnerAreaList[i].contractStartDate>this.formAll.contractEndDate){
        this.$message.warning('合作区域开始日期必须小于合同结束日期');
        return false
     }
     if(this.formAll.aflcPartnerAreaList[i].contractStartDate>this.formAll.aflcPartnerAreaList[i].contractEndDate){
        this.$message.warning('合作区域结束日期必须大于合作区域开始日期');
        return false
     }
   }
   },
    add_data(){
            this.completeData(); 
            if(this.completeData()==false)
            {
               return
            }
            else{        
       this.$refs['formAll'].validate(valid=>{
        if(valid){
        let forms=[
            {
            companyId:this.companyId,
            openAdminManage: this.isVip,
            areaCode:this.formAll.areaCode,
            province:this.formAll.province,
            city:this.formAll.city,
            area:this.formAll.area,
            tradeName:this.formAll.tradeName,
            address:this.formAll.address,
            partnerCompany:this.formAll.partnerCompany,
            mobile:this.formAll.mobile,            
            partnerName:this.formAll.partnerName,
            signingDate:this.formAll.signingDate,
            contractStartDate:this.formAll.contractStartDate, 
            contractEndDate:this.formAll.contractEndDate,
            aflcPartnerFileList:this.formAll.aflcPartnerFileList,
            aflcPartnerAreaList:this.formAll.aflcPartnerAreaList,
        }]
        if(this.btnStatus){
        this.btnStatus = false
        this.$message.info('新增中...')
        data_get_aflcPartner_create(forms).then(res=>{
            this.$message.success('新增成功');
            this.changeList();
            this.dialogFormVisible_add = false;       
        }).catch(res=>{
            if(res.text == '区代公司已存在'){
            this.$message.error(res.text)
            }else{
            this.$message.error('新增失败')
            this.changeList();
            this.dialogFormVisible_add = false;
            }

        })
       }
       }
       })
    }
    }
  }
}
</script>


<style lang="scss">
.manageDistrict{
     display: inline-block;
     .el-dialog{
         overflow: unset!important;
         max-height:none;
         width: 1200px!important
     }
     .el-form-item__content{
         text-align: left;
     }
     .fontRed{
         color: red;
         margin-right: 2px;
     }
    .BtnInfo{
    font-weight: bold;
    font-size: 14px;
    padding: 0px 15px 0px;
    }
    .el-input{
            width: 100%;
        }
        .manageDistrict_h2{
            margin:10px 10px; 
            text-align: left;
        }
        .manageDistrict_table{
            width: 80%;
            border-top: 1px solid #d0d7e5;
            border-left: 1px solid #d0d7e5;
            margin-left:10%;
            .Item_position{
                position: relative;
                .addItem{
                    top: 7px;
                    left:30%;
                }                
                .reduceItem{
                    top: 7px;
                    left:30%;
                }
            }
            .manageDistrict_tr{
             height: 40px;
             line-height: 40px;
             overflow: hidden;
             border-bottom: 1px solid #d0d7e5;
            }
            .manageDistrict_th{
            float: left;
            display: inline-block;
            background: #EAF0FF;
            text-align: center;
            border-right: 1px solid #d0d7e5;
           }
            .manageDistrict_td{
            float: left;
            display: inline-block;
            text-align: center;
            border-right: 1px solid #d0d7e5;   
            box-sizing: border-box;
            .el-cascader{
                width: 100%;
            }
            .el-input{
                width:100%;
            }
           }
            .viewWidth{width: 100%;display: inline-block;
                    a{
                        color: #409EFF
                    }
           }
           .table_w1{width: 30%}
           .table_w2{width: 30%}
           .table_w3{width: 30%}
           .table_w4{width: 10%;height: 40px;}
           .table_w5{width: 90%}
        }
            .fileNameCss{
            width: 100%;
            height: 40px;
            color: #3e9ff1;
        }
}
</style>
