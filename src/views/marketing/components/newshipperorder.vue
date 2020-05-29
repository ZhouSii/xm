<template>
     <div class="creatOrder commoncss">
      <el-button :type="btntype" :value="value" :plain="plain" :icon="icon" @click="openDialog()" size="mini">{{btntext}}</el-button>
      <div class="newMarketingOrder">
      <el-dialog  :visible="dialogFormVisible_add" :before-close="change" :title="btntitle" :close-on-click-modal="false">
        <el-form :model="formAll" ref="formAll" :rules="rulesForm" :inline="true">
          <el-row >
              <el-col :span="12">
                <el-form-item label="发放区域：" :label-width="formLabelWidth" prop="areaCode">
                <GetCityList ref="area" v-model="formAll.areaCode"  @returnStr="getStr"></GetCityList>
                </el-form-item>
                </el-col>
                <el-col :span="12">
                <el-form-item label="区域优惠额度上限：" :label-width="formLabelWidth" prop="rewardMax">
                        <el-input v-model="formAll.rewardMax" placeholder="请选择区域优惠额度上限" maxlength='5'></el-input>
                </el-form-item>
                </el-col>
            </el-row>
              <el-row>
                  <el-col :span="12">
                <el-form-item label="服务分类：" :label-width="formLabelWidth" prop="serivceCode">
                 <el-select v-model="formAll.serivceCode" clearable placeholder="请选择" @change="serivceObject">
                          <el-option
                             v-for="item in serviceCardList"
                              :key="item.code"
                             :label="item.name"
                              :value="item.code"
                               :disabled="item.disabled">
                         </el-option>
                 </el-select>
                </el-form-item>
                 </el-col>
                <el-col :span="12">
                <el-form-item label="车辆类型：" :label-width="formLabelWidth" prop="carType" v-if="formAll.serivceCode!=='AF01702'&&formAll.serivceCode">
                 <el-select v-model="formAll.carType" clearable placeholder="请选择" >
                          <el-option
                             v-for="item in optionsCar"
                               :key="item.code"
                               :label="item.name"
                               :value="item.code"
                               :disabled="item.disabled">
                         </el-option>
                 </el-select>
                </el-form-item>                                
                  </el-col>
          </el-row>
          <el-row>
            <el-col :span="24">
             <table class="ht_table">
            <tbody>
             <tr>
             <th width="100"  rowspan="2">货主优惠等级</th>
             <th colspan="8">订单金额范围</th> 
             <th width="80"   rowspan="2">一天限量</th>
             <th width="80"   rowspan="2">个人限量（全局）</th>
            </tr>
            <tr>
              <td><el-form-item prop="reward1" size = '50'><el-input class="Order_input" v-model="formAll.reward1" ref='reward1' maxlength='5'></el-input></el-form-item>-<el-form-item prop="reward2"><el-input class="Order_input" v-model="formAll.reward2" ref='reward2'  maxlength='5' @keyup.native='inputChange(1)'></el-input></el-form-item></td> 
              <td><el-form-item prop="reward3"><el-input class="Order_input" v-model="formAll.reward3" ref='reward3' maxlength='5' @keyup.native='inputChange(2)'></el-input></el-form-item>-<el-form-item prop="reward4"><el-input class="Order_input" v-model="formAll.reward4" ref='reward4'  maxlength='5' @keyup.native='inputChange(3)'></el-input></el-form-item></td> 
              <td><el-form-item prop="reward5"><el-input class="Order_input" v-model="formAll.reward5" ref='reward5' maxlength='5' @keyup.native='inputChange(4)'></el-input></el-form-item>-<el-form-item prop="reward6"><el-input class="Order_input" v-model="formAll.reward6" ref='reward6'  maxlength='5' @keyup.native='inputChange(5)'></el-input></el-form-item></td> 
              <td><el-form-item prop="reward7"><el-input class="Order_input" v-model="formAll.reward7" ref='reward7' maxlength='5' @keyup.native='inputChange(6)'></el-input></el-form-item>-<el-form-item prop="reward8"><el-input class="Order_input" v-model="formAll.reward8" ref='reward8'  maxlength='5' @keyup.native='inputChange(7)'></el-input></el-form-item></td> 
              <td><el-form-item prop="reward9"><el-input class="Order_input" v-model="formAll.reward9" ref='reward9' maxlength='5' @keyup.native='inputChange(8)'></el-input></el-form-item>-<el-form-item prop="reward10"><el-input class="Order_input" v-model="formAll.reward10" ref='reward10'  maxlength='5' @keyup.native='inputChange(9)'></el-input></el-form-item></td> 
              <td><el-form-item prop="reward11"><el-input class="Order_input" v-model="formAll.reward11" ref='reward11' maxlength='5' @keyup.native='inputChange(10)'></el-input></el-form-item>-<el-form-item prop="reward12"><el-input class="Order_input" v-model="formAll.reward12" ref='reward12'  maxlength='5' @keyup.native='inputChange(11)'></el-input></el-form-item></td> 
              <td><el-form-item prop="reward13"><el-input class="Order_input" v-model="formAll.reward13" ref='reward13' maxlength='5' @keyup.native='inputChange(12)'></el-input></el-form-item>-<el-form-item prop="reward14"><el-input class="Order_input" v-model="formAll.reward14" ref='reward14'  maxlength='5' @keyup.native='inputChange(13)'></el-input></el-form-item></td> 
              <td><el-form-item prop="reward15"><el-input class="Order_input" v-model="formAll.reward15" ref='reward15' @keyup.native='inputChange(14)'></el-input></el-form-item>-<el-form-item prop="reward16"><el-input class="Order_input" v-model="formAll.reward16" ref='reward16'  maxlength='5'></el-input></el-form-item></td> 
                 </tr>
            <tr>
              <td>{{rewardGradeType[5].name}}</td>
              <td><el-form-item prop="data1" size = '50'><el-input v-model="formAll.data1" maxlength='5'></el-input></el-form-item></td>
              <td><el-form-item prop="data2" size = '50'><el-input v-model="formAll.data2" maxlength='5'></el-input></el-form-item></td> 
              <td><el-form-item prop="data3" size = '50'><el-input v-model="formAll.data3" maxlength='5'></el-input></el-form-item></td> 
              <td><el-form-item prop="data4" size = '50'><el-input v-model="formAll.data4" maxlength='5'></el-input></el-form-item></td> 
              <td><el-form-item prop="data5" size = '50'><el-input v-model="formAll.data5" maxlength='5'></el-input></el-form-item></td> 
              <td><el-form-item prop="data6" size = '50'><el-input v-model="formAll.data6" maxlength='5'></el-input></el-form-item></td> 
              <td><el-form-item prop="data7" size = '50'><el-input v-model="formAll.data7" maxlength='5'></el-input></el-form-item></td> 
              <td><el-form-item prop="data8" size = '50'><el-input v-model="formAll.data8" maxlength='5'></el-input></el-form-item></td> 
              <td><el-form-item prop="maxnum1" size = '50'><el-input v-model="formAll.maxnum1" maxlength='5'></el-input></el-form-item></td>   
              <td><el-form-item size = '50'><el-input  v-model="rewardGradeType[5].value" disabled></el-input></el-form-item></td>
            </tr>
             <tr>
              <td>{{rewardGradeType[0].name}}</td>
              <td><el-form-item prop="data9" size = '50'><el-input v-model="formAll.data9" maxlength='5'></el-input></el-form-item></td>
              <td><el-form-item prop="data10" size = '50'><el-input v-model="formAll.data10" maxlength='5'></el-input></el-form-item></td>
              <td><el-form-item prop="data11" size = '50'><el-input v-model="formAll.data11" maxlength='5'></el-input></el-form-item></td> 
              <td><el-form-item prop="data12" size = '50'><el-input v-model="formAll.data12" maxlength='5'></el-input></el-form-item></td> 
              <td><el-form-item prop="data13" size = '50'><el-input v-model="formAll.data13" maxlength='5'></el-input></el-form-item></td> 
              <td><el-form-item prop="data14" size = '50'><el-input v-model="formAll.data14" maxlength='5'></el-input></el-form-item></td> 
              <td><el-form-item prop="data15" size = '50'><el-input v-model="formAll.data15" maxlength='5'></el-input></el-form-item></td> 
              <td><el-form-item prop="data16" size = '50'><el-input v-model="formAll.data16" maxlength='5'></el-input></el-form-item></td> 
              <td><el-form-item prop="maxnum2" size = '50'><el-input v-model="formAll.maxnum2" maxlength='5'></el-input></el-form-item></td> 
              <td><el-form-item size = '50'><el-input  v-model="rewardGradeType[0].value" disabled></el-input></el-form-item></td>
            </tr>
            <tr>
              <td>{{rewardGradeType[1].name}}</td>
              <td><el-form-item prop="data17" size = '50'><el-input v-model="formAll.data17" maxlength='5'></el-input></el-form-item></td>
              <td><el-form-item prop="data18" size = '50'><el-input v-model="formAll.data18" maxlength='5'></el-input></el-form-item></td>   
              <td><el-form-item prop="data19" size = '50'><el-input v-model="formAll.data19" maxlength='5'></el-input></el-form-item></td>
              <td><el-form-item prop="data20" size = '50'><el-input v-model="formAll.data20" maxlength='5'></el-input></el-form-item></td> 
              <td><el-form-item prop="data21" size = '50'><el-input v-model="formAll.data21" maxlength='5'></el-input></el-form-item></td> 
              <td><el-form-item prop="data22" size = '50'><el-input v-model="formAll.data22" maxlength='5'></el-input></el-form-item></td> 
              <td><el-form-item prop="data23" size = '50'><el-input v-model="formAll.data23" maxlength='5'></el-input></el-form-item></td> 
              <td><el-form-item prop="data24" size = '50'><el-input v-model="formAll.data24" maxlength='5'></el-input></el-form-item></td> 
              <td><el-form-item prop="maxnum3" size = '50'><el-input v-model="formAll.maxnum3" maxlength='5'></el-input></el-form-item></td> 
              <td><el-form-item size = '50'><el-input  v-model="rewardGradeType[1].value" disabled></el-input></el-form-item></td>
            </tr>
             <tr>
              <td>{{rewardGradeType[2].name}}</td>
              <td><el-form-item prop="data25" size = '50'><el-input v-model="formAll.data25" maxlength='5'></el-input></el-form-item></td> 
              <td><el-form-item prop="data26" size = '50'><el-input v-model="formAll.data26" maxlength='5'></el-input></el-form-item></td> 
              <td><el-form-item prop="data27" size = '50'><el-input v-model="formAll.data27" maxlength='5'></el-input></el-form-item></td>                
              <td><el-form-item prop="data28" size = '50'><el-input v-model="formAll.data28" maxlength='5'></el-input></el-form-item></td>
              <td><el-form-item prop="data29" size = '50'><el-input v-model="formAll.data29" maxlength='5'></el-input></el-form-item></td> 
              <td><el-form-item prop="data30" size = '50'><el-input v-model="formAll.data30" maxlength='5'></el-input></el-form-item></td> 
              <td><el-form-item prop="data31" size = '50'><el-input v-model="formAll.data31" maxlength='5'></el-input></el-form-item></td> 
              <td><el-form-item prop="data32" size = '50'><el-input v-model="formAll.data32" maxlength='5'></el-input></el-form-item></td> 
              <td><el-form-item prop="maxnum4" size = '50'><el-input v-model="formAll.maxnum4" maxlength='5'></el-input></el-form-item></td>  
              <td><el-form-item size = '50'><el-input  v-model="rewardGradeType[2].value" disabled></el-input></el-form-item></td> 
            </tr>
            <tr>
              <td>{{rewardGradeType[3].name}}</td>
              <td><el-form-item prop="data33" size = '50'><el-input v-model="formAll.data33" maxlength='5'></el-input></el-form-item></td> 
              <td><el-form-item prop="data34" size = '50'><el-input v-model="formAll.data34" maxlength='5'></el-input></el-form-item></td> 
              <td><el-form-item prop="data35" size = '50'><el-input v-model="formAll.data35" maxlength='5'></el-input></el-form-item></td> 
              <td><el-form-item prop="data36" size = '50'><el-input v-model="formAll.data36" maxlength='5'></el-input></el-form-item></td>
              <td><el-form-item prop="data37" size = '50'><el-input v-model="formAll.data37" maxlength='5'></el-input></el-form-item></td>
              <td><el-form-item prop="data38" size = '50'><el-input v-model="formAll.data38" maxlength='5'></el-input></el-form-item></td> 
              <td><el-form-item prop="data39" size = '50'><el-input v-model="formAll.data39" maxlength='5'></el-input></el-form-item></td> 
              <td><el-form-item prop="data40" size = '50'><el-input v-model="formAll.data40" maxlength='5'></el-input></el-form-item></td> 
              <td><el-form-item prop="maxnum5" size = '50'><el-input v-model="formAll.maxnum5" maxlength='5'></el-input></el-form-item></td> 
              <td><el-form-item size = '50'><el-input  v-model="rewardGradeType[3].value" disabled></el-input></el-form-item></td> 
            </tr>
             <tr>
              <td>{{rewardGradeType[4].name}}</td>
              <td><el-form-item prop="data41" size = '50'><el-input v-model="formAll.data41" maxlength='5'></el-input></el-form-item></td> 
              <td><el-form-item prop="data42" size = '50'><el-input v-model="formAll.data42" maxlength='5'></el-input></el-form-item></td> 
              <td><el-form-item prop="data43" size = '50'><el-input v-model="formAll.data43" maxlength='5'></el-input></el-form-item></td>
              <td><el-form-item prop="data44" size = '50'><el-input v-model="formAll.data44" maxlength='5'></el-input></el-form-item></td>  
              <td><el-form-item prop="data45" size = '50'><el-input v-model="formAll.data45" maxlength='5'></el-input></el-form-item></td>   
              <td><el-form-item prop="data46" size = '50'><el-input v-model="formAll.data46" maxlength='5'></el-input></el-form-item></td> 
              <td><el-form-item prop="data47" size = '50'><el-input v-model="formAll.data47" maxlength='5'></el-input></el-form-item></td> 
              <td><el-form-item prop="data48" size = '50'><el-input v-model="formAll.data48" maxlength='5'></el-input></el-form-item></td> 
              <td><el-form-item prop="maxnum6" size = '50'><el-input v-model="formAll.maxnum6" maxlength='5'></el-input></el-form-item></td>   
              <td><el-form-item size = '50'><el-input  v-model="rewardGradeType[4].value" disabled></el-input></el-form-item></td>
            </tr>                     
            </tbody>
             </table>
            </el-col>
          </el-row>
        </el-form>
        <div slot="footer" class="dialog-footer">
        <el-button type="primary"  v-if="editType=='add'" @click="Newadd_data" >确 定</el-button>
        <el-button @click="close()" >取 消</el-button>
        </div>
      </el-dialog>
      </div>
    </div>
</template>
<script>
import { data_Commission ,data_CarList,data_MaidLevel,data_ServerClassList} from '@/api/server/areaPrice.js'
import {data_get_shipperOwnerFrom_createNew} from '@/api/marketing/shippermarkting/shipperOwner.js'
import GetCityList from '@/components/GetCityList/city'
import { getDictionary } from '@/api/common.js'
import Upload from '@/components/Upload/singleImage'
import { eventBus } from '@/eventBus'
export default {
  components:{
    Upload,
    GetCityList
  },
  props:{
    params:{
      type:[Object,String],
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
            if(val){
            if(val.length<1){
            cb(new Error('所属地区不能为空'))
            }
            else{
                cb()
            }                 
            }else{
            cb(new Error('所属地区不能为空'))
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
        areaStatus:null,
        formLabelWidth:'150px',
        dialogFormVisible_add: false,
        optionsCar:[],
        serviceCardList:[],
        FormData:[],
        rewardGradeList:['AF0020806','AF0020801','AF0020802','AF0020803','AF0020804','AF0020805'],
        formAll:{
            areaCode: [],
            areaName:[],
            rewardMax:null,
            carType:null,
            serivceCode:null,
            reward1:'0',reward2:null,reward3:null,reward4:null,reward5:null,reward6:null,reward7:null,reward8:null, reward9:null,reward10:null,reward11:null,reward12:null,reward13:null,reward14:null,reward15:null,reward16:null,
            maxnum1:'0',maxnum2:'0',maxnum3:'0',maxnum4:'0',maxnum5:'0',maxnum6:'0',
            data1:'0',data2:'0',data3:'0',data4:'0',data5:'0',data6:'0',data7:'0',data8:'0',data9:'0',data10:'0',data11:'0',data12:'0',data13:'0',data14:'0',data15:'0',data16:'0',data17:'0',data18:'0',data19:'0',data20:'0',
            data21:'0',data22:'0',data23:'0',data24:'0',data25:'0',data26:'0',data27:'0',data28:'0',data29:'0',data30:'0',data31:'0',data32:'0',data33:'0',data34:'0',data35:'0',data36:'0',data37:'0',data38:'0',data39:'0',data40:'0',
            data41:'0',data42:'0',data43:'0',data44:'0',data45:'0',data46:'0',data47:'0',data48:'0'
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
  mounted(){
  },
  methods:{
    getStr(val){
        if(!val.area){
            this.formAll.areaCode= val.city.code
            this.formAll.area = ''
        }
        else{
            this.formAll.areaCode= val.area.code
            this.formAll.area = val.area.name
        }
            this.formAll.province = val.province.name
            this.formAll.city = val.city.name
        },
   openDialog:function(){
        this.dialogFormVisible_add = true;
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
      this.$refs['formAll'].resetFields(); 
   },
   close:function(){
      this.dialogFormVisible_add = false;
      this.$refs['formAll'].resetFields();
       },
    //获取  服务和车辆 类型列表
    getMoreInformation(){
                data_CarList().then(res=>{
                        this.optionsCar = res.data
                    })
                data_ServerClassList().then(res=>{
                       this.serviceCardList = res.data
                })   
                getDictionary('AF00208').then(res=>{
                    this.rewardGradeType = res.data 
                })
          }, 
    changeList(){
    eventBus.$emit('pushListtwo')
    },
    serivceObject(){
    this.formAll.carType = null
    },
    // new同城新增
    Newadd_data(){
       this.FormData = []
       let forItemZ = 0;
       for(let forItemI = 1;forItemI<7;forItemI++){
           for(let forItemJ = 1;forItemJ<9;forItemJ++){
            forItemZ++
            this.FormData.push({
                aflcShipperPreferential:{},
                startPrice:this.formAll['reward'+(2*forItemJ-1)],
                endPrice:this.formAll['reward'+(2*forItemJ)],
                rewardGrade:this.rewardGradeList[forItemI-1],
                reward:this.formAll['data'+forItemZ],
                orderNum:this.formAll['maxnum'+forItemI]
            })
           }
       }
       this.$refs['formAll'].validate(valid=>{
        if(valid){
        let forms={
            areaCode:this.formAll.areaCode,
            province:this.formAll.province,
            city:this.formAll.city,
            area:this.formAll.area,
            rewardMax:this.formAll.rewardMax,
            carType:this.formAll.carType,
            serivceCode:this.formAll.serivceCode,
            aflcShipperPreferentialtDetailList:this.FormData
        }
          if(this.btnStatus){
          this.btnStatus = false
          this.$message.info('新增中...')       
        data_get_shipperOwnerFrom_createNew(forms).then(res=>{
            this.$emit('getData');
            this.$message.success('新增成功');
            this.dialogFormVisible_add = false;
        }).catch(res=>{
            this.$emit('getData');
            this.$message.error('新增失败');
            this.dialogFormVisible_add = false;
        });
        }
        }
        }
        )     
    }

  }
}
</script>
<style lang="scss" >
    .creatOrder{
        display: inline-block;
        .newMarketingOrder{
            .el-dialog{
                width: 1100px!important;
                max-height: 100%;
            }
            .swith{
                margin:0px 0px 10px 10px;
                .el-switch{
                    display: inline-block;
                }
            }
            .el-dialog__footer{
                padding: 20px 20px 20px;
            }
        .el-dialog{
            overflow: unset;
        }
        }
        .el-dialog__footer{
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
        .ht_table{
        width: 980px;
        margin:10px 10px;
        color: #333;
        border-left:1px solid #d0d7e5;
        border-bottom:1px solid #d0d7e5;
        tr{
            width: 100%;
            line-height: 34px;
            height: 34px;
        }
        th{
            text-align:center;
            background: #EAF0FF;
            border-top:1px solid #d0d7e5;
            border-right:1px solid #d0d7e5;
        }
        td{
            border-top:1px solid #d0d7e5;
            text-align: center;
            border-right:1px solid #d0d7e5;
            .el-form-item{
            margin-bottom: 0px!important;
            margin-right: 0px!important;
            }
            .el-input{
                width:90%;
                .el-input__inner{
                    line-height: 30px;
                    height: 30px;
                    padding:0px!important;
                    text-indent:5px;
                }
            }
            .Order_input{
                width: 40px
            }
            .el-form-item__error{
                z-index:100;
            }
        }
        }
    }
</style>