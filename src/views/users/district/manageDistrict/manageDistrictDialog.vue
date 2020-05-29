<template>
     <div class="manageDistrict commoncss">
      <el-button :type="btntype" :value="value" :plain="plain" :icon="icon" @click="openDialog()" size="mini" :class="editType=='view'?'BtnInfo':''"><span>{{btntext}}</span ></el-button>
      <div class="newmanageDistrict">
      <el-dialog  :visible="dialogFormVisible_add" :before-close="change" :title="btntitle" modal-append-to-body top=5vh v-dialogDrag :closeOnClickModal='false'>
        <el-form ref="formAll" :model="formAll" :rules="rulesForm" :label-width="formLabelWidth">
            <el-row>
                <el-col :span="12">
                    <el-form-item label="区代公司名称 ："  prop="partnerCompany">
                        <el-select v-model="formAll.partnerCompany" filterable placeholder="请选择" @change="handleSelect" disabled>
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
                    <el-input v-model="formAll.partnerName" disabled></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="12">
                    <el-form-item label="手机号码 ："  prop="mobile">
                    <el-input v-model="formAll.mobile" disabled></el-input>
                    </el-form-item>
                </el-col>
                 <el-col :span="12">
                    <el-form-item label="所在地 ："  prop="areaName">
                    <el-input v-model="formAll.areaName" placeholder="请选择" :disabled="editType!=='add'" v-if="editType!=='add'"></el-input>
                    <vregion :ui="true"  @values="regionChange" class="form-control" v-else>
                        <el-input v-model="formAll.areaName" placeholder="请选择" disabled></el-input>
                    </vregion>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="12">
                    <el-form-item label="签约时间 ："  prop="signingDate">
                    <el-date-picker
                    v-model="formAll.signingDate"
                    :disabled="editType=='view'"
                    type="datetime"
                    value-format="timestamp"
                    default-time="00:00:00"
                    placeholder="请选择日期">
                    </el-date-picker>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="是否开通28货运后台 ：" >
                        <el-radio-group v-model="isVip" :disabled="editType=='view'">
                            <el-radio  v-for="(obj,key) in optionsStatus" :label="obj.value" :key='key'>{{obj.name}}</el-radio>
                        </el-radio-group>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="12">
                    <el-form-item label="合同开始日期 ："  prop="contractStartDate">
                    <el-date-picker
                    :disabled="editType=='view'"
                    v-model="formAll.contractStartDate"
                    type="datetime"
                    default-time="00:00:00"
                    value-format="timestamp"
                    placeholder="请选择日期">
                    </el-date-picker>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="合同结束日期 ："  prop="contractEndDate">
                    <el-date-picker
                    :disabled="editType=='view'"
                    v-model="formAll.contractEndDate"
                    type="datetime"
                    default-time="23:59:59"
                    value-format="timestamp"
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
                     <div class="manageDistrict_td table_w1"  @click="changeInput(keys)"> 
                   <span  v-if="!formAll.aflcPartnerAreaList[keys].selectFlag">
                    <el-input v-model="formAll.aflcPartnerAreaList[keys].belongCity" @focus="changeSelect1(keys)" :disabled="editType=='view'"></el-input>
                  </span>
                  <span v-else>
                    <GetCityList ref="area" v-model="formAll.aflcPartnerAreaList[keys].areaName"  @returnStr="getStr1"></GetCityList>
                  </span></div>
                     <div class="manageDistrict_td table_w2">
                    <el-date-picker
                    :disabled="editType=='view'"
                    v-model="formAll.aflcPartnerAreaList[keys].contractStartDate"
                    type="datetime"
                    value-format="timestamp"
                    default-time="00:00:00"
                    placeholder="请选择日期">
                    </el-date-picker>  
                     </div>
                     <div class="manageDistrict_td table_w3">
                 <el-date-picker
                    :disabled="editType=='view'"
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
                    <span v-if="editType=='view'" class="viewWidth">
                    <a :href="formAll.aflcPartnerFileList[keys].saveAddress" target="_blank">{{formAll.aflcPartnerFileList[keys].fileName}}</a>
                    </span>
                    <span  @click="selectUpload(keys)" v-else>
                    <div class="fileNameCss" v-if="formAll.aflcPartnerFileList[keys].fileName&&!formAll.aflcPartnerFileList[keys].selectFlag">{{formAll.aflcPartnerFileList[keys].fileName}}</div>
                    <upload class="licensePicture" tip="（必须为jpg/png并且小于5M）" v-model="formAll.aflcPartnerFileList[keys].saveAddress"  @fileNmeChange = 'fileNmeChange' v-else/>
                    </span>
                    </div>
                     <div  class="manageDistrict_td Item_position table_w4"><span  class="addItem" @click="addItemFile()" v-if="keys==0"> </span><span  class="reduceItem" @click="reduceItemFile(keys)" v-else> </span></div>
                 </div>
                </div>
            </el-col>   
            </el-row>               

        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button type="primary"  @click="add_data" v-if="editType!=='view'">确 定</el-button>
          <el-button @click="close()" v-if="editType!=='view'">取 消</el-button>
        </div>
      </el-dialog>
      </div>
    </div>
</template>
<script>
import {data_get_aflcPartner_update,data_get_aflcPartner_Id,data_get_aflcPartner_findAuthCompany} from '@/api/users/district/manageDistrict.js'
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
        isVip:'0',
        companyId:null,    
        areaCode:null,
        companyNameObject:{
        companyName:null,
        },
        restaurants: [],
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
            selectFlag:null,
            }],
            aflcPartnerFileList:[{
            saveAddress:'',    
            fileName:'',    
            selectFlag:'',
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
                selectFlag:null,
                }]
                this.formAll.aflcPartnerFileList=[{
                saveAddress:'',    
                fileName:'',    
                selectFlag:'',
                }]   
                this.areaStatus = null 
                this.areaCode =null,
                this.companyId = null,
                this.companyNameObject.companyName = null;
                this.$emit('getData') 
                 if(this.$refs.area){
                this.$refs.area.clearData();
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
                this.formAll.areaName =  SelectObj.address
        },
   // 省市状态表
     changeSelect(){
            if(this.editType=='add'){
                this.selectFlag=null
            } else{
                this.selectFlag='1'
            }
            },  
    changeSelect1:function(i){
            if(this.editType==='add'){
                this.formAll.aflcPartnerAreaList[i].selectFlag=null
            } else{
                this.formAll.aflcPartnerAreaList[i].selectFlag='1'
            }
            this.$forceUpdate()
    },              
      changeInput:function(i){
        this.inputKey = i;
        },
      selectUpload(i){
        this.selectIndex = i;
            if(this.editType=='add'){
                this.formAll.aflcPartnerFileList[i].selectFlag=null
            } else{
                this.formAll.aflcPartnerFileList[i].selectFlag='1'
            }
            this.$forceUpdate()
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
    if(this.editType=='view'){
        data_get_aflcPartner_Id(this.params.id).then(res=>{
            this.formAll.partnerCompany=res.data.partnerCompany
             this.formAll.partnerName=res.data.partnerName
             this.formAll.mobile=res.data.mobile
             this.formAll.areaCode=res.data.areaCode
             this.formAll.province=res.data.province
             this.formAll.city=res.data.city
             this.formAll.area=res.data.area
             this.formAll.signingDate=res.data.signingDate
             this.formAll.contractStartDate=res.data.contractStartDate
             this.formAll.contractEndDate=res.data.contractEndDate
             this.formAll.aflcPartnerAreaList = res.data.aflcPartnerAreaList
             this.formAll.aflcPartnerFileList = res.data.aflcPartnerFileList
             this.formAll.areaName = res.data.belongCity;
             this.isVip = res.data.openAdminManage
             if(!this.formAll.aflcPartnerFileList.length){
                this.formAll.aflcPartnerFileList=[{
                saveAddress:'',    
                fileName:'',    
                selectFlag:'',
                }]    
             }
        })
     this.dialogFormVisible_add = true;
     
    }
    else{
          if(!this.params.length){
               this.$message.warning('请选择您要操作的区代公司');
               return
          }
          else if(this.params.length == 0 && this.editType !== 'add'){
               this.$message.warning('请选择您要操作的区代公司');
               return false
          }else if (this.params.length > 1 && this.editType !== 'add') {
                this.$message({
                    message: '每次只能操作单条数据~',
                    type: 'warning'
                })
                this.$emit('getData') 
                return false
          }
    else{
        data_get_aflcPartner_Id(this.params[0].id).then(res=>{
            this.formAll.partnerCompany=res.data.partnerCompany
             this.formAll.partnerName=res.data.partnerName
             this.formAll.mobile=res.data.mobile
             this.formAll.areaCode=res.data.areaCode
             this.formAll.province=res.data.province
             this.formAll.city=res.data.city
             this.formAll.area=res.data.area
             this.formAll.signingDate=res.data.signingDate
             this.formAll.contractStartDate=res.data.contractStartDate
             this.formAll.contractEndDate=res.data.contractEndDate
             this.formAll.aflcPartnerAreaList = res.data.aflcPartnerAreaList
             this.formAll.aflcPartnerFileList = res.data.aflcPartnerFileList
             this.formAll.areaName = res.data.belongCity
             this.companyId = res.data.companyId
             this.isVip = res.data.openAdminManage
             this.areaCode = res.data.areaCode
             if(!this.formAll.aflcPartnerFileList.length){
                this.formAll.aflcPartnerFileList=[{
                saveAddress:'',    
                fileName:'',    
                selectFlag:'',
                }]    
             }
        })
         this.dialogFormVisible_add = true;
    }
    }
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
            if(this.editType=='view'){
            return false
            }else{        
           this.formAll.aflcPartnerAreaList.push({
            areaName: [],
            areaCode: [],
            province:null,
            city:null,
            area:null,
            contractStartDate:null,
            contractEndDate:null,
            }) 
            }
        },
//    合作区域删除
    reduceItem(i){
        if(this.editType=='view'){
            return false
        }else{
            if(this.formAll.aflcPartnerAreaList.length>1){
            this.formAll.aflcPartnerAreaList.splice(i,1);
            }
            else{
            return false
        }
        }
   },   
    // 区域附件新增
    addItemFile(){
            if(this.editType=='view'){
            return false
            }else{
           this.formAll.aflcPartnerFileList.push({
            fileName:null,       
           }) 
           }
        },
//    区域附件删除
    reduceItemFile(i){
            if(this.editType=='view'){
            return false
            }else{
            if(this.formAll.aflcPartnerFileList.length>1){
            this.formAll.aflcPartnerFileList.splice(i,1);
            }
            else{
            return false
            }
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
        let forms=
            {
            companyId:this.companyId,
            openAdminManage: this.isVip,
            areaCode:this.formAll.areaCode,
            province:this.formAll.province,
            city:this.formAll.city,
            area:this.formAll.area,
            tradeName:this.formAll.tradeName,
            partnerCompany:this.formAll.partnerCompany,
            mobile:this.formAll.mobile,
            partnerName:this.formAll.partnerName,
            signingDate:this.formAll.signingDate,
            contractStartDate:this.formAll.contractStartDate, 
            contractEndDate:this.formAll.contractEndDate,
            aflcPartnerFileList:this.formAll.aflcPartnerFileList,
            aflcPartnerAreaList:this.formAll.aflcPartnerAreaList,
            id:this.params[0].id
        }
        if(this.btnStatus){
        this.btnStatus = false
        this.$message.info('修改中...')
        data_get_aflcPartner_update(forms).then(res=>{
           this.$message.success('修改成功');
           this.changeList();
           this.dialogFormVisible_add = false;

        }).catch(res=>{
            this.$message.error('修改失败')
            this.changeList();
            this.dialogFormVisible_add = false;
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

</style>
