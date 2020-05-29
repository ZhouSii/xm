<template>
     <div class="creatOrder commoncss">
      <el-button :type="btntype" :value="value" :plain="plain" :icon="icon" @click="openDialog()" size="mini" :class="editType=='view'?'BtnInfo':''"><span>{{btntext}}</span ></el-button>
      <div class="newMarketingOrder">
      <el-dialog  :visible="dialogFormVisible_add" :before-close="change" :title="btntitle" :close-on-click-modal="false">
        <el-form :model="formAll" ref="formAll" :rules="rulesForm" :inline="true">
          <el-row >
            <el-col :span="24">
            <table class="ht_table">
            <tbody>
             <tr>
             <th >所属区域</th>
             <th >区域奖励额度上限</th>                   
             <th >服务分类</th>
             <th >车辆类型</th>
             <th >启用状态</th>
            </tr>     
            <tr>
             <td><el-input v-model="areaName" disabled></el-input></td>
             <td><el-input v-model="formAll.rewardMax" placeholder="请选择" maxlength='5' :disabled="editType=='view'"></el-input></td>   
             <td>
                 <el-select v-model="formAll.serivceCode" clearable placeholder="请选择" disabled>
                          <el-option
                             v-for="item in serviceCardList"
                              :key="item.code"
                             :label="item.name"
                             :value="item.code"
                             :disabled="item.disabled">
                         </el-option>
                 </el-select>
            </td>
             <td>
                 <el-select v-model="formAll.carType" clearable placeholder="请选择" disabled >
                          <el-option
                             v-for="item in optionsCar"
                               :key="item.code"
                               :label="item.name"
                               :value="item.code"
                               :disabled="item.disabled">
                         </el-option>
                 </el-select>
             </td>
             <td> 
            <el-switch
            style="display: block"
            v-model="formAll.usingStatus"
            active-color="#ff4949"
            inactive-color="#13ce66"
            active-text="停用"
            active-value="0"
            inactive-value="1"
            inactive-text="启用"
            :disabled="editType=='view'"
            >
            </el-switch></td>           
            </tr>
            </tbody>
            </table>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24">
             <table class="ht_table">
            <tbody>
             <tr>
             <th width="100"  rowspan="2">车主奖励等级</th>
             <th colspan="8">订单金额范围</th>
             <th width="80"   rowspan="2">一天限量</th>
             <th width="80"   rowspan="2">个人限量（全局）</th>
            </tr>
            <tr>
              <td><el-form-item prop="reward1" size = '50'><el-input class="Order_input" v-model="formAll.reward1" ref='reward1' maxlength='5' :disabled="editType=='view'"></el-input></el-form-item>-<el-form-item prop="reward2"><el-input class="Order_input" v-model="formAll.reward2" ref='reward2'  maxlength='5' @keyup.native='inputChange(1)' :disabled="editType=='view'"></el-input></el-form-item></td> 
              <td><el-form-item prop="reward3"><el-input class="Order_input" v-model="formAll.reward3" ref='reward3' maxlength='5' @keyup.native='inputChange(2)' :disabled="editType=='view'"></el-input></el-form-item>-<el-form-item prop="reward4"><el-input class="Order_input" v-model="formAll.reward4" ref='reward4'  maxlength='5' @keyup.native='inputChange(3)' :disabled="editType=='view'"></el-input></el-form-item></td> 
              <td><el-form-item prop="reward5"><el-input class="Order_input" v-model="formAll.reward5" ref='reward5' maxlength='5' @keyup.native='inputChange(4)' :disabled="editType=='view'"></el-input></el-form-item>-<el-form-item prop="reward6"><el-input class="Order_input" v-model="formAll.reward6" ref='reward6'  maxlength='5' @keyup.native='inputChange(5)' :disabled="editType=='view'"></el-input></el-form-item></td> 
              <td><el-form-item prop="reward7"><el-input class="Order_input" v-model="formAll.reward7" ref='reward7' maxlength='5' @keyup.native='inputChange(6)' :disabled="editType=='view'"></el-input></el-form-item>-<el-form-item prop="reward8"><el-input class="Order_input" v-model="formAll.reward8" ref='reward8'  maxlength='5' @keyup.native='inputChange(7)' :disabled="editType=='view'"></el-input></el-form-item></td> 
              <td><el-form-item prop="reward9"><el-input class="Order_input" v-model="formAll.reward9" ref='reward9' maxlength='5' @keyup.native='inputChange(8)' :disabled="editType=='view'"></el-input></el-form-item>-<el-form-item prop="reward10"><el-input class="Order_input" v-model="formAll.reward10" ref='reward10'  maxlength='5' @keyup.native='inputChange(9)' :disabled="editType=='view'"></el-input></el-form-item></td> 
              <td><el-form-item prop="reward11"><el-input class="Order_input" v-model="formAll.reward11" ref='reward11' maxlength='5' @keyup.native='inputChange(10)' :disabled="editType=='view'"></el-input></el-form-item>-<el-form-item prop="reward12"><el-input class="Order_input" v-model="formAll.reward12" ref='reward12'  maxlength='5' @keyup.native='inputChange(11)' :disabled="editType=='view'"></el-input></el-form-item></td> 
              <td><el-form-item prop="reward13"><el-input class="Order_input" v-model="formAll.reward13" ref='reward13' maxlength='5' @keyup.native='inputChange(12)' :disabled="editType=='view'"></el-input></el-form-item>-<el-form-item prop="reward14"><el-input class="Order_input" v-model="formAll.reward14" ref='reward14'  maxlength='5' @keyup.native='inputChange(13)' :disabled="editType=='view'"></el-input></el-form-item></td> 
              <td><el-form-item prop="reward15"><el-input class="Order_input" v-model="formAll.reward15" ref='reward15' @keyup.native='inputChange(14)' :disabled="editType=='view'"></el-input></el-form-item>-<el-form-item prop="reward16"><el-input class="Order_input" v-model="formAll.reward16" ref='reward16'  maxlength='5' :disabled="editType=='view'"></el-input></el-form-item></td> 
            </tr>
            <tr>
              <td>{{rewardGradeType[5].name}}</td>
              <td><el-form-item prop="data1" size = '50'><el-input v-model="formAll.data1" maxlength='5' :disabled="editType=='view'"></el-input></el-form-item></td>
              <td><el-form-item prop="data2" size = '50'><el-input v-model="formAll.data2" maxlength='5' :disabled="editType=='view'"></el-input></el-form-item></td> 
              <td><el-form-item prop="data3" size = '50'><el-input v-model="formAll.data3" maxlength='5' :disabled="editType=='view'"></el-input></el-form-item></td> 
              <td><el-form-item prop="data4" size = '50'><el-input v-model="formAll.data4" maxlength='5' :disabled="editType=='view'"></el-input></el-form-item></td> 
              <td><el-form-item prop="data5" size = '50'><el-input v-model="formAll.data5" maxlength='5' :disabled="editType=='view'"></el-input></el-form-item></td> 
              <td><el-form-item prop="data6" size = '50'><el-input v-model="formAll.data6" maxlength='5' :disabled="editType=='view'"></el-input></el-form-item></td> 
              <td><el-form-item prop="data7" size = '50'><el-input v-model="formAll.data7" maxlength='5' :disabled="editType=='view'"></el-input></el-form-item></td> 
              <td><el-form-item prop="data8" size = '50'><el-input v-model="formAll.data8" maxlength='5' :disabled="editType=='view'"></el-input></el-form-item></td> 
              <td><el-form-item prop="maxnum1" size = '50'><el-input v-model="formAll.maxnum1" maxlength='5' :disabled="editType=='view'"></el-input></el-form-item></td>   
              <td><el-form-item size = '50'><el-input  v-model="rewardGradeType[5].value" disabled></el-input></el-form-item></td>
            </tr>
             <tr>
              <td>{{rewardGradeType[0].name}}</td>
              <td><el-form-item prop="data9" size = '50'><el-input v-model="formAll.data9" maxlength='5' :disabled="editType=='view'"></el-input></el-form-item></td>
              <td><el-form-item prop="data10" size = '50'><el-input v-model="formAll.data10" maxlength='5' :disabled="editType=='view'"></el-input></el-form-item></td>
              <td><el-form-item prop="data11" size = '50'><el-input v-model="formAll.data11" maxlength='5' :disabled="editType=='view'"></el-input></el-form-item></td> 
              <td><el-form-item prop="data12" size = '50'><el-input v-model="formAll.data12" maxlength='5' :disabled="editType=='view'"></el-input></el-form-item></td> 
              <td><el-form-item prop="data13" size = '50'><el-input v-model="formAll.data13" maxlength='5' :disabled="editType=='view'"></el-input></el-form-item></td> 
              <td><el-form-item prop="data14" size = '50'><el-input v-model="formAll.data14" maxlength='5' :disabled="editType=='view'"></el-input></el-form-item></td> 
              <td><el-form-item prop="data15" size = '50'><el-input v-model="formAll.data15" maxlength='5' :disabled="editType=='view'"></el-input></el-form-item></td> 
              <td><el-form-item prop="data16" size = '50'><el-input v-model="formAll.data16" maxlength='5' :disabled="editType=='view'"></el-input></el-form-item></td> 
              <td><el-form-item prop="maxnum2" size = '50'><el-input v-model="formAll.maxnum2" maxlength='5' :disabled="editType=='view'"></el-input></el-form-item></td> 
              <td><el-form-item size = '50'><el-input  v-model="rewardGradeType[0].value" disabled></el-input></el-form-item></td>
            </tr>
            <tr>
              <td>{{rewardGradeType[1].name}}</td>
              <td><el-form-item prop="data17" size = '50'><el-input v-model="formAll.data17" maxlength='5' :disabled="editType=='view'"></el-input></el-form-item></td>
              <td><el-form-item prop="data18" size = '50'><el-input v-model="formAll.data18" maxlength='5' :disabled="editType=='view'"></el-input></el-form-item></td>   
              <td><el-form-item prop="data19" size = '50'><el-input v-model="formAll.data19" maxlength='5' :disabled="editType=='view'"></el-input></el-form-item></td>
              <td><el-form-item prop="data20" size = '50'><el-input v-model="formAll.data20" maxlength='5' :disabled="editType=='view'"></el-input></el-form-item></td> 
              <td><el-form-item prop="data21" size = '50'><el-input v-model="formAll.data21" maxlength='5' :disabled="editType=='view'"></el-input></el-form-item></td> 
              <td><el-form-item prop="data22" size = '50'><el-input v-model="formAll.data22" maxlength='5' :disabled="editType=='view'"></el-input></el-form-item></td> 
              <td><el-form-item prop="data23" size = '50'><el-input v-model="formAll.data23" maxlength='5' :disabled="editType=='view'"></el-input></el-form-item></td> 
              <td><el-form-item prop="data24" size = '50'><el-input v-model="formAll.data24" maxlength='5' :disabled="editType=='view'"></el-input></el-form-item></td> 
              <td><el-form-item prop="maxnum3" size = '50'><el-input v-model="formAll.maxnum3" maxlength='5' :disabled="editType=='view'"></el-input></el-form-item></td>  
              <td><el-form-item size = '50'><el-input  v-model="rewardGradeType[1].value" disabled></el-input></el-form-item></td>
            </tr>
             <tr>
              <td>{{rewardGradeType[2].name}}</td>
              <td><el-form-item prop="data25" size = '50'><el-input v-model="formAll.data25" maxlength='5' :disabled="editType=='view'"></el-input></el-form-item></td> 
              <td><el-form-item prop="data26" size = '50'><el-input v-model="formAll.data26" maxlength='5' :disabled="editType=='view'"></el-input></el-form-item></td> 
              <td><el-form-item prop="data27" size = '50'><el-input v-model="formAll.data27" maxlength='5' :disabled="editType=='view'"></el-input></el-form-item></td>                
              <td><el-form-item prop="data28" size = '50'><el-input v-model="formAll.data28" maxlength='5' :disabled="editType=='view'"></el-input></el-form-item></td>
              <td><el-form-item prop="data29" size = '50'><el-input v-model="formAll.data29" maxlength='5' :disabled="editType=='view'"></el-input></el-form-item></td> 
              <td><el-form-item prop="data30" size = '50'><el-input v-model="formAll.data30" maxlength='5' :disabled="editType=='view'"></el-input></el-form-item></td> 
              <td><el-form-item prop="data31" size = '50'><el-input v-model="formAll.data31" maxlength='5' :disabled="editType=='view'"></el-input></el-form-item></td> 
              <td><el-form-item prop="data32" size = '50'><el-input v-model="formAll.data32" maxlength='5' :disabled="editType=='view'"></el-input></el-form-item></td> 
              <td><el-form-item prop="maxnum4" size = '50'><el-input v-model="formAll.maxnum4" maxlength='5' :disabled="editType=='view'"></el-input></el-form-item></td>   
              <td><el-form-item size = '50'><el-input  v-model="rewardGradeType[2].value" disabled></el-input></el-form-item></td>
            </tr>
            <tr>
              <td>{{rewardGradeType[3].name}}</td>
              <td><el-form-item prop="data33" size = '50'><el-input v-model="formAll.data33" maxlength='5' :disabled="editType=='view'"></el-input></el-form-item></td> 
              <td><el-form-item prop="data34" size = '50'><el-input v-model="formAll.data34" maxlength='5' :disabled="editType=='view'"></el-input></el-form-item></td> 
              <td><el-form-item prop="data35" size = '50'><el-input v-model="formAll.data35" maxlength='5' :disabled="editType=='view'"></el-input></el-form-item></td> 
              <td><el-form-item prop="data36" size = '50'><el-input v-model="formAll.data36" maxlength='5' :disabled="editType=='view'"></el-input></el-form-item></td>
              <td><el-form-item prop="data37" size = '50'><el-input v-model="formAll.data37" maxlength='5' :disabled="editType=='view'"></el-input></el-form-item></td>
              <td><el-form-item prop="data38" size = '50'><el-input v-model="formAll.data38" maxlength='5' :disabled="editType=='view'"></el-input></el-form-item></td> 
              <td><el-form-item prop="data39" size = '50'><el-input v-model="formAll.data39" maxlength='5' :disabled="editType=='view'"></el-input></el-form-item></td> 
              <td><el-form-item prop="data40" size = '50'><el-input v-model="formAll.data40" maxlength='5' :disabled="editType=='view'"></el-input></el-form-item></td> 
              <td><el-form-item prop="maxnum5" size = '50'><el-input v-model="formAll.maxnum5" maxlength='5' :disabled="editType=='view'"></el-input></el-form-item></td>  
              <td><el-form-item size = '50'><el-input  v-model="rewardGradeType[3].value" disabled></el-input></el-form-item></td>
            </tr>
             <tr>
              <td>{{rewardGradeType[4].name}}</td>
              <td><el-form-item prop="data41" size = '50'><el-input v-model="formAll.data41" maxlength='5' :disabled="editType=='view'"></el-input></el-form-item></td> 
              <td><el-form-item prop="data42" size = '50'><el-input v-model="formAll.data42" maxlength='5' :disabled="editType=='view'"></el-input></el-form-item></td> 
              <td><el-form-item prop="data43" size = '50'><el-input v-model="formAll.data43" maxlength='5' :disabled="editType=='view'"></el-input></el-form-item></td>
              <td><el-form-item prop="data44" size = '50'><el-input v-model="formAll.data44" maxlength='5' :disabled="editType=='view'"></el-input></el-form-item></td>  
              <td><el-form-item prop="data45" size = '50'><el-input v-model="formAll.data45" maxlength='5' :disabled="editType=='view'"></el-input></el-form-item></td>   
              <td><el-form-item prop="data46" size = '50'><el-input v-model="formAll.data46" maxlength='5' :disabled="editType=='view'"></el-input></el-form-item></td> 
              <td><el-form-item prop="data47" size = '50'><el-input v-model="formAll.data47" maxlength='5' :disabled="editType=='view'"></el-input></el-form-item></td> 
              <td><el-form-item prop="data48" size = '50'><el-input v-model="formAll.data48" maxlength='5' :disabled="editType=='view'"></el-input></el-form-item></td> 
              <td><el-form-item prop="maxnum6" size = '50'><el-input v-model="formAll.maxnum6" maxlength='5' :disabled="editType=='view'"></el-input></el-form-item></td>   
              <td><el-form-item size = '50'><el-input  v-model="rewardGradeType[4].value" disabled></el-input></el-form-item></td>
            </tr>                 
            </tbody>
             </table>
            </el-col>
          </el-row>
        </el-form>
        <div slot="footer" class="dialog-footer" v-if="editType!=='view'">
          <el-button type="primary" @click="updata_data" >确 定</el-button>
          <el-button  type="primary" @click="close()" >取 消</el-button>
        </div>
      </el-dialog>
      </div>
    </div>
</template>
<script>
import {data_Commission ,data_CarList,data_ServerClassList} from '@/api/server/areaPrice.js'
import {data_get_ownerFromsame_update,data_get_mainDetail} from '@/api/marketing/carmarkting/carOwner.js'
import Upload from '@/components/Upload/singleImage'
import { getDictionary } from '@/api/common.js'
import { eventBus } from '@/eventBus'
export default {
  components:{
    Upload,
  },
  props:{
    params:{
      type:[Object,String,Array],
    },
    paramsView:{
    type:Object,
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
        const belongCityNameValidator = (rule, val, cb) => {
            if(!val){
            cb(new Error('所属地区不能为空'))
            }
            else{
                cb()
            }        
        }

    //    选择车辆类型校验
        const carTypeValidator = (rule, val, cb) => {
            if(!val){
            cb(new Error('车辆类型不能为空'))
            }
            else{
                cb()
            }        
        }

    //    服务类型等级校验
        const serivceCodeValidator = (rule, val, cb) => {
            if(!val){
            cb(new Error('服务类型不能为空'))
            }
            else{
                cb()
            }        
        }


    //   参数校验
        const rewardValidator = (rule, val, cb) => {
            let rewardGradeNum = 0
            if(Number(rule.field.split('maxnum')[1])-1==0){
              rewardGradeNum = this.rewardGradeType[5].value
            }
            if(Number(rule.field.split('maxnum')[1])-2>-1){
            rewardGradeNum = this.rewardGradeType[Number(rule.field.split('maxnum')[1])-2].value
            }
            var reg= /[^\d]/g
            if(!val){
                cb()
            }
            else{
            if(reg.test(val)){
            cb(new Error('请输入正整数'))
            }
            if(parseInt(val)>parseInt(rewardGradeNum))
            {
            cb(new Error('一天限量不能大于个人限量'))
            }
            else{
                cb()
            }
            }      
        }  

    //    区域奖励上限校验
        const rewardMaxValidator = (rule, val, cb) => {
            var reg= /[^\d]/g
            if(!val){
            cb(new Error('区域奖励上限不能为空'))
            }
            else if(reg.test(val)){
            cb(new Error('请输入正整数'))
            }            
            else{
                cb()
            }        
        }

    //   参数校验
        const reward0Validator = (rule, val, cb) => {
            var reg= /[^\d]/g
            if(!val){
                cb()
            }
            else{
            if(reg.test(val)){
            cb(new Error('请输入正整数'))
            }
            else{
                cb()
            }
            }    
        } 

    //   参数校验1
        const rewardValidator1 = (rule, val, cb) => {
            var reg= /[^\d]/g
            if(!val){cb()}
            else{if(reg.test(val)){cb(new Error('请输入正整数'))}
            else if(parseInt(val)>parseInt(this.$refs['reward2'].value)){cb(new Error('不能大于订单金额范围'))}else{cb()}}}   
    //   参数校验2
        const rewardValidator2 = (rule, val, cb) => {
            var reg= /[^\d]/g
            if(!val){cb()}
            else{if(reg.test(val)){cb(new Error('请输入正整数'))}
            else if(parseInt(val)>parseInt(this.$refs['reward4'].value)){cb(new Error('不能大于订单金额范围'))}else{cb()}}}   
    //   参数校验3
        const rewardValidator3 = (rule, val, cb) => {
            var reg= /[^\d]/g
            if(!val){cb()}
            else{if(reg.test(val)){cb(new Error('请输入正整数'))}
            else if(parseInt(val)>parseInt(this.$refs['reward6'].value)){cb(new Error('不能大于订单金额范围'))}else{cb()}}}   
    //   参数校验4
        const rewardValidator4 = (rule, val, cb) => {
            var reg= /[^\d]/g
            if(!val){cb()}
            else{if(reg.test(val)){cb(new Error('请输入正整数'))}
            else if(parseInt(val)>parseInt(this.$refs['reward8'].value)){cb(new Error('不能大于订单金额范围'))}else{cb()}}}   
    //   参数校验5
        const rewardValidator5 = (rule, val, cb) => {
            var reg= /[^\d]/g
            if(!val){cb()}
            else{if(reg.test(val)){cb(new Error('请输入正整数'))}
            else if(parseInt(val)>parseInt(this.$refs['reward10'].value)){cb(new Error('不能大于订单金额范围'))}else{cb()}}}   
    //   参数校验6
        const rewardValidator6 = (rule, val, cb) => {
            var reg= /[^\d]/g
            if(!val){cb()}
            else{if(reg.test(val)){cb(new Error('请输入正整数'))}
            else if(parseInt(val)>parseInt(this.$refs['reward12'].value)){cb(new Error('不能大于订单金额范围'))}else{cb()}}}   
    //   参数校验7
        const rewardValidator7 = (rule, val, cb) => {
            var reg= /[^\d]/g
            if(!val){cb()}
            else{if(reg.test(val)){cb(new Error('请输入正整数'))}
            else if(parseInt(val)>parseInt(this.$refs['reward14'].value)){cb(new Error('不能大于订单金额范围'))}else{cb()}}}   
    //   参数校验8
        const rewardValidator8 = (rule, val, cb) => {
            var reg= /[^\d]/g
            if(!val){cb()}
            else{if(reg.test(val)){cb(new Error('请输入正整数'))}
            else if(parseInt(val)>parseInt(this.$refs['reward16'].value)){cb(new Error('不能大于订单金额范围'))}else{cb()}}}   

        const reward2Validator = (rule, val, cb) => {if(!val){cb(new Error('数据不能为空'))}else if(/[^\d]/g.test(val)){cb(new Error('请输入正整数'))}else if(parseInt(val)<=parseInt(this.$refs['reward1'].value)){
            cb(new Error('必须大于前框值'))}else{cb()} }   
        const reward3Validator = (rule, val, cb) => {if(!val){cb(new Error('数据不能为空'))}else if(/[^\d]/g.test(val)){cb(new Error('请输入正整数'))}else if(parseInt(val)<=parseInt(this.$refs['reward2'].value)){
            cb(new Error('必须大于前框值'))}else{cb()} }   
        const reward4Validator = (rule, val, cb) => {if(!val){cb(new Error('数据不能为空'))}else if(/[^\d]/g.test(val)){cb(new Error('请输入正整数'))}else if(parseInt(val)<=parseInt(this.$refs['reward3'].value)){
            cb(new Error('必须大于前框值'))}else{cb()} }   
        const reward5Validator = (rule, val, cb) => {if(!val){cb(new Error('数据不能为空'))}else if(/[^\d]/g.test(val)){cb(new Error('请输入正整数'))}else if(parseInt(val)<=parseInt(this.$refs['reward4'].value)){
            cb(new Error('必须大于前框值'))}else{cb()} }           
        const reward6Validator = (rule, val, cb) => {if(!val){cb(new Error('数据不能为空'))}else if(/[^\d]/g.test(val)){cb(new Error('请输入正整数'))}else if(parseInt(val)<=parseInt(this.$refs['reward5'].value)){
            cb(new Error('必须大于前框值'))}else{cb()} }   
        const reward7Validator = (rule, val, cb) => {if(!val){cb(new Error('数据不能为空'))}else if(/[^\d]/g.test(val)){cb(new Error('请输入正整数'))}else if(parseInt(val)<=parseInt(this.$refs['reward6'].value)){
            cb(new Error('必须大于前框值'))}else{cb()} }       
        const reward8Validator = (rule, val, cb) => {if(!val){cb(new Error('数据不能为空'))}else if(/[^\d]/g.test(val)){cb(new Error('请输入正整数'))}else if(parseInt(val)<=parseInt(this.$refs['reward7'].value)){
            cb(new Error('必须大于前框值'))}else{cb()} }   
        const reward9Validator = (rule, val, cb) => {if(!val){cb(new Error('数据不能为空'))}else if(/[^\d]/g.test(val)){cb(new Error('请输入正整数'))}else if(parseInt(val)<=parseInt(this.$refs['reward8'].value)){
            cb(new Error('必须大于前框值'))}else{cb()} }       
        const reward10Validator = (rule, val, cb) => {if(!val){cb(new Error('数据不能为空'))}else if(/[^\d]/g.test(val)){cb(new Error('请输入正整数'))}else if(parseInt(val)<=parseInt(this.$refs['reward9'].value)){
            cb(new Error('必须大于前框值'))}else{cb()} }   
        const reward11Validator = (rule, val, cb) => {if(!val){cb(new Error('数据不能为空'))}else if(/[^\d]/g.test(val)){cb(new Error('请输入正整数'))}else if(parseInt(val)<=parseInt(this.$refs['reward10'].value)){
            cb(new Error('必须大于前框值'))}else{cb()} }   
        const reward12Validator = (rule, val, cb) => {if(!val){cb(new Error('数据不能为空'))}else if(/[^\d]/g.test(val)){cb(new Error('请输入正整数'))}else if(parseInt(val)<=parseInt(this.$refs['reward11'].value)){
            cb(new Error('必须大于前框值'))}else{cb()} }   
        const reward13Validator = (rule, val, cb) => {if(!val){cb(new Error('数据不能为空'))}else if(/[^\d]/g.test(val)){cb(new Error('请输入正整数'))}else if(parseInt(val)<=parseInt(this.$refs['reward12'].value)){
            cb(new Error('必须大于前框值'))}else{cb()} }       
        const reward14Validator = (rule, val, cb) => {if(!val){cb(new Error('数据不能为空'))}else if(/[^\d]/g.test(val)){cb(new Error('请输入正整数'))}else if(parseInt(val)<=parseInt(this.$refs['reward13'].value)){
            cb(new Error('必须大于前框值'))}else{cb()} }   
        const reward15Validator = (rule, val, cb) => {if(!val){cb(new Error('数据不能为空'))}else if(/[^\d]/g.test(val)){cb(new Error('请输入正整数'))}else if(parseInt(val)<=parseInt(this.$refs['reward14'].value)){
            cb(new Error('必须大于前框值'))}else{cb()} }   
        const reward16Validator = (rule, val, cb) => {if(!val){cb(new Error('数据不能为空'))}else if(/[^\d]/g.test(val)){cb(new Error('请输入正整数'))}else if(parseInt(val)<=parseInt(this.$refs['reward15'].value)){
            cb(new Error('必须大于前框值'))}else{cb()} }    
        return{
        btnStatus:true, //新增修改按钮状态  
        areaName:null,
        formLabelWidth:'130px',
        dialogFormVisible_add: false,
        optionsCar:[],
        serviceCardList:[],
        FormData:null,
        rewardGradeList:['AF0020706','AF0020701','AF0020702','AF0020703','AF0020704','AF0020705'],
        formAll:{
            areaCode: null,
            rewardMax:null,
            carType:null,
            serivceCode:null,
            usingStatus:null,
            reward1:null,reward2:null,reward3:null,reward4:null,reward5:null,reward6:null,reward7:null,reward8:null, reward9:null,reward10:null,reward11:null,reward12:null,reward13:null,reward14:null,reward15:null,reward16:null,
            maxnum1:null,maxnum2:null,maxnum3:null,maxnum4:null,maxnum5:null,maxnum6:null,
            data1:null,data2:null,data3:null,data4:null,data5:null,data6:null,data7:null,data8:null,data9:null,data10:null,data11:null,data12:null,data13:null,data14:null,data15:null,data16:null,data17:null,data18:null,data19:null,data20:null,
            data21:null,data22:null,data23:null,data24:null,data25:null,data26:null,data27:null,data28:null,data29:null,data30:null,data31:null,data32:null,data33:null,data34:null,data35:null,data36:null,data37:null,data38:null,data39:null,data40:null,
            data41:null,data42:null,data43:null,data44:null,data45:null,data46:null,data47:null,data48:null,
            personalLimit1:null,personalLimit2:null,personalLimit3:null,personalLimit4:null,personalLimit5:null,personalLimit6:null,
            },
            
            rulesForm:{
            areaCode:{trigger:'change',required:true,validator: belongCityNameValidator},
            carType:{trigger:'change',required:true,validator:carTypeValidator},
            serivceCode:{trigger:'change',required:true,validator:serivceCodeValidator},
            rewardMax:{trigger:'change',required:true,validator:rewardMaxValidator},
            reward1:{trigger:'change',required:true,validator:reward0Validator},
            reward2:{trigger:'change',required:true,validator:reward2Validator},
            reward3:{trigger:'change',required:true,validator:reward3Validator},
            reward4:{trigger:'change',required:true,validator:reward4Validator},
            reward5:{trigger:'change',required:true,validator:reward5Validator},
            reward6:{trigger:'change',required:true,validator:reward6Validator},
            reward7:{trigger:'change',required:true,validator:reward7Validator},
            reward8:{trigger:'change',required:true,validator:reward8Validator},
            reward9:{trigger:'change',required:true,validator:reward9Validator},
            reward10:{trigger:'change',required:true,validator:reward10Validator},
            reward11:{trigger:'change',required:true,validator:reward11Validator},
            reward12:{trigger:'change',required:true,validator:reward12Validator},
            reward13:{trigger:'change',required:true,validator:reward13Validator},
            reward14:{trigger:'change',required:true,validator:reward14Validator},
            reward15:{trigger:'change',required:true,validator:reward15Validator},
            reward16:{trigger:'change',required:true,validator:reward16Validator},
            maxnum1:{trigger:'change',required:true,validator:rewardValidator},
            maxnum2:{trigger:'change',required:true,validator:rewardValidator},
            maxnum3:{trigger:'change',required:true,validator:rewardValidator},
            maxnum4:{trigger:'change',required:true,validator:rewardValidator},
            maxnum5:{trigger:'change',required:true,validator:rewardValidator},
            maxnum6:{trigger:'change',required:true,validator:rewardValidator},
            data1:{trigger:'change',required:true,validator:rewardValidator1},data2:{trigger:'change',required:true,validator:rewardValidator2},
            data3:{trigger:'change',required:true,validator:rewardValidator3},data4:{trigger:'change',required:true,validator:rewardValidator4},
            data5:{trigger:'change',required:true,validator:rewardValidator5},data6:{trigger:'change',required:true,validator:rewardValidator6},
            data7:{trigger:'change',required:true,validator:rewardValidator7},data8:{trigger:'change',required:true,validator:rewardValidator8},
            data9:{trigger:'change',required:true,validator:rewardValidator1},data10:{trigger:'change',required:true,validator:rewardValidator2},
            data11:{trigger:'change',required:true,validator:rewardValidator3},data12:{trigger:'change',required:true,validator:rewardValidator4},
            data13:{trigger:'change',required:true,validator:rewardValidator5},data14:{trigger:'change',required:true,validator:rewardValidator6},
            data15:{trigger:'change',required:true,validator:rewardValidator7},data16:{trigger:'change',required:true,validator:rewardValidator8},
            data17:{trigger:'change',required:true,validator:rewardValidator1},data18:{trigger:'change',required:true,validator:rewardValidator2},
            data19:{trigger:'change',required:true,validator:rewardValidator3},data20:{trigger:'change',required:true,validator:rewardValidator4},
            data21:{trigger:'change',required:true,validator:rewardValidator5},data22:{trigger:'change',required:true,validator:rewardValidator6},
            data23:{trigger:'change',required:true,validator:rewardValidator7},data24:{trigger:'change',required:true,validator:rewardValidator8},
            data25:{trigger:'change',required:true,validator:rewardValidator1},data26:{trigger:'change',required:true,validator:rewardValidator2},
            data27:{trigger:'change',required:true,validator:rewardValidator3},data28:{trigger:'change',required:true,validator:rewardValidator4},
            data29:{trigger:'change',required:true,validator:rewardValidator5},data30:{trigger:'change',required:true,validator:rewardValidator6},
            data31:{trigger:'change',required:true,validator:rewardValidator7},data32:{trigger:'change',required:true,validator:rewardValidator8},
            data33:{trigger:'change',required:true,validator:rewardValidator1},data34:{trigger:'change',required:true,validator:rewardValidator2},
            data35:{trigger:'change',required:true,validator:rewardValidator3},data36:{trigger:'change',required:true,validator:rewardValidator4},
            data37:{trigger:'change',required:true,validator:rewardValidator5},data38:{trigger:'change',required:true,validator:rewardValidator6},
            data39:{trigger:'change',required:true,validator:rewardValidator7},data40:{trigger:'change',required:true,validator:rewardValidator8},
            data41:{trigger:'change',required:true,validator:rewardValidator1},data42:{trigger:'change',required:true,validator:rewardValidator2},
            data43:{trigger:'change',required:true,validator:rewardValidator3},data44:{trigger:'change',required:true,validator:rewardValidator4},  
            data45:{trigger:'change',required:true,validator:rewardValidator5},data46:{trigger:'change',required:true,validator:rewardValidator6},
            data47:{trigger:'change',required:true,validator:rewardValidator7},data48:{trigger:'change',required:true,validator:rewardValidator8},               
            },
            rewardGradeType:[{},{},{},{},{},{}]
        }
  },
  watch:{
   dialogFormVisible_add:{
        handler: function(val, oldVal) {
            if(!val){
            this.$refs['formAll'].resetFields();
            }
            else{
            this.getMoreInformation();
            this.btnStatus = true
            }
        },
    },
  },

  mounted(){
  },
  methods:{
   // 打开弹框
   openDialog:function(){
        if(this.editType == 'view'){
            this.update1(this.paramsView.id);
            this.$forceUpdate()
            this.dialogFormVisible_add = true;
            }
            else{
          if(this.params.length == 0 && this.editType !== 'add'){
               this.$message.warning('请选择您要操作的数据');
               return
          }else if (this.params.length > 1 && this.editType !== 'add') {
                this.$message({
                    message: '每次只能操作单条数据~',
                    type: 'warning'
                })
                this.$emit('getData') 
          }
          else if(this.params.length == undefined && this.editType !== 'add')
          {
                this.$message.warning('请选择您要操作的数据');
               return false
          }          
           else{
            if(this.params[0].usingStatus==0){
            this.$message.info('选中内容被已禁用，不能进行修改操作');
            this.$emit('getData') 
            return
           }
           else{
            this.update1(this.params[0].id);
            this.$forceUpdate()
            this.dialogFormVisible_add = true;
            }
           }
           }
    },
    // 输入框值变动
    inputChange(i){
    let ii = i%2;
    switch (ii) {
    case 0:
        this.formAll['reward'+i] = (parseInt(this.formAll['reward'+(i+1)])-1).toString() 
        break;
    case 1:
        this.formAll['reward'+(i+2)] = (parseInt(this.formAll['reward'+(i+1)])+1).toString() 
        break;
    }
        },   
   change:function(){
      this.dialogFormVisible_add = false;
   },
   close:function(){
      this.dialogFormVisible_add = false;
       },
    //获取  服务和车辆 类型列表
    getMoreInformation(){
                data_CarList().then(res=>{
                    this.optionsCar = res.data
                    })
                data_ServerClassList().then(res=>{
                      res.data.map((item)=>{
                    this.serviceCardList = res.data
                    })     
                })     
                getDictionary('AF00207').then(res=>{
                    this.rewardGradeType = res.data 
                })                
          }, 
          update1:function(Id){
           data_get_mainDetail(Id).then(res=>{
            if(res.data.area==null){
            this.areaName =res.data.province+res.data.city
            }
            else{
            this.areaName =res.data.province+res.data.city+res.data.area
            }
            this.formAll.areaCode=res.data.areaCode
            this.formAll.rewardMax=res.data.rewardMax
            this.formAll.carType=res.data.carType
            this.formAll.serivceCode=res.data.serivceCode
            this.formAll.usingStatus=res.data.usingStatus
            let ZZ = 0;
            this.formAll.reward1 = res.data.amountDetailList[0].startPrice;this.formAll.reward2 = res.data.amountDetailList[0].endPrice;
            this.formAll.reward3 = res.data.amountDetailList[1].startPrice;this.formAll.reward4 = res.data.amountDetailList[1].endPrice;
            this.formAll.reward5 = res.data.amountDetailList[2].startPrice;this.formAll.reward6 = res.data.amountDetailList[2].endPrice;
            this.formAll.reward7 = res.data.amountDetailList[3].startPrice;this.formAll.reward8 = res.data.amountDetailList[3].endPrice;
            this.formAll.reward9 = res.data.amountDetailList[4].startPrice;this.formAll.reward10 = res.data.amountDetailList[4].endPrice;
            this.formAll.reward11 = res.data.amountDetailList[5].startPrice;this.formAll.reward12 = res.data.amountDetailList[5].endPrice;
            this.formAll.reward13 = res.data.amountDetailList[6].startPrice;this.formAll.reward14 = res.data.amountDetailList[6].endPrice;
            this.formAll.reward15 = res.data.amountDetailList[7].startPrice;this.formAll.reward16 = res.data.amountDetailList[7].endPrice;
            this.formAll.maxnum1 = res.data.amountDetailList[0].orderNum;this.formAll.maxnum2 = res.data.amountDetailList[8].orderNum;
            this.formAll.maxnum3 = res.data.amountDetailList[16].orderNum;this.formAll.maxnum4 = res.data.amountDetailList[24].orderNum;
            this.formAll.maxnum5 = res.data.amountDetailList[32].orderNum;this.formAll.maxnum6 = res.data.amountDetailList[40].orderNum;
            this.formAll.personalLimit1 = res.data.amountDetailList[0].personalLimit;this.formAll.personalLimit2 = res.data.amountDetailList[8].personalLimit;
            this.formAll.personalLimit3 = res.data.amountDetailList[16].personalLimit;this.formAll.personalLimit4 = res.data.amountDetailList[24].personalLimit;
            this.formAll.personalLimit5 = res.data.amountDetailList[32].personalLimit;this.formAll.personalLimit6 = res.data.amountDetailList[40].personalLimit;
           for(let II = 0;II<6;II++){
           for(let JJ = 0;JJ<8;JJ++){
           ZZ++;
           this.formAll['data'+ZZ] = res.data.amountDetailList[ZZ-1].reward
           this.formAll['id'+ZZ] = res.data.amountDetailList[ZZ-1].id
           }
           }     
         })
         },
    changeList(){
    eventBus.$emit('pushListtwo')
    },   
//    修改
   updata_data(){
       this.FormData = {aflcDriverOrderamountDetailList:[]}
       let forItemZ = 0;
       for(let forItemI = 1;forItemI<7;forItemI++){
           for(let forItemJ = 1;forItemJ<9;forItemJ++){
            forItemZ++
            this.FormData.aflcDriverOrderamountDetailList.push({
                startPrice:this.formAll['reward'+(2*forItemJ-1)],
                endPrice:this.formAll['reward'+(2*forItemJ)],
                rewardGrade:this.rewardGradeList[forItemI-1],
                reward:this.formAll['data'+forItemZ],
                orderNum:this.formAll['maxnum'+forItemI],
                id: this.formAll['id'+forItemZ]
            })
           }
       }

       var forms= Object.assign({}, this.FormData,{areaCode:this.formAll.areaCode},{rewardMax:this.formAll.rewardMax},{carType:this.formAll.carType},{serivceCode:this.formAll.serivceCode},{id:this.params[0].id},{usingStatus:this.formAll.usingStatus});
       this.$refs['formAll'].validate(valid=>{
        if(valid){
        if(this.btnStatus){
        this.btnStatus = false
        this.$message.info('修改中...')
        data_get_ownerFromsame_update(forms).then(res=>{
            this.$emit('getData');
            this.$message.success('修改成功');
            this.dialogFormVisible_add = false;
        }).catch(res=>{
            console.log(res)
            this.$emit('getData');
            this.$message.error('修改失败');
            this.dialogFormVisible_add = false;
       });
       }
       }
       }
       )
   },    
  }
}
</script>
<style lang="scss" >
.creatOrder {
    td{background:#fff!important;}
    .BtnInfo{
    font-weight: bold;
    font-size: 14px;
    padding: 0px 15px 0px;
    }
}
</style>