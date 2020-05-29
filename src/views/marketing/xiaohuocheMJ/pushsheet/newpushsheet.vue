<template>
    <div class="vestDialogBox commoncss">
    <el-button  :type="btntype" :value="value" :plain="plain" :icon="icon" @click="openDialog()" size="mini">{{btntext}}</el-button>
            <el-dialog :title="btntitle" :visible="driverTemplateDialogFlag" :before-close="change">
            <div class="vestOrder">
            <el-form :inline="true" :model="vestList" ref="vestList" :rules="rulesForm">
             <el-row>
            <el-col :span="12">
            <el-form-item label="所属区域：" :label-width="formLabelWidth" prop="areaCode" > 
                <el-input v-model="vestList.areaName"  @focus="changeSelect" v-if="editType !=='add' && !selectFlag" class="selectInput"></el-input>
                 <span v-else-if="editType=='add'">
                <GetCityList ref="area" v-model="vestList.areaCode"  @focus="changeSelect" @returnStr="getStr"></GetCityList>
                 </span>
                 <span v-else>
                <GetCityList ref="area" v-model="vestList.areaCode"  @focus="changeSelect" v-if="editType !=='add' && selectFlag" @returnStr="getStr"></GetCityList>
                 </span>
            </el-form-item>
            </el-col>
            <el-col :span="12">
            <el-form-item label="服务类型：" :label-width="formLabelWidth" prop="serivceCode">
                    <el-select v-model="vestList.serivceCode" clearable placeholder="请选择">
                        <el-option
                         v-for="item in serviceCardList"
                        :key="item.id"
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
            <el-form-item label="价格上浮（倍）：" :label-width="formLabelWidth" prop="priceStart"> 
             <el-input auto-complete="off" class="price_one" v-model="vestList.priceStart" ref="priceStart"></el-input>至
            </el-form-item>
            <el-form-item prop="priceEnd"> 
             <el-input auto-complete="off" class="price_two" v-model="vestList.priceEnd" ref="priceEnd"></el-input>
            </el-form-item>

            </el-col>
            </el-row>
             </el-form>    
             </div>
            
            <div class="table_box" v-for="(form,keys) in vestList.setting" :key='keys'>
           <el-form>
            <el-row>
            <el-col :span="18">
            <el-form-item label="推送时段：" :label-width="formLabelWidth"> 
                    <el-time-picker
                        is-range
                        v-model="vestList.setting[keys].createTime"
                        range-separator="-"
                        start-placeholder="开始时间"
                        end-placeholder="结束时间"
                        placeholder="选择时间范围"
                        value-format="timestamp"
                        :default-time="['00:00:00', '23:59:59']"
                        @change='cTime(keys,$event)'
                        >
                    </el-time-picker>
            </el-form-item>
            </el-col>
            <el-col :span="6">
           <el-form-item>       
           <el-button type="primary" @click="addItem" plain  v-if="keys == 0" class='VestaddItem'>继续添加推送时段</el-button>
           <el-button type="danger" @click="reduceItem(keys)" plain class='VestreduceItem'  v-else>删除推送时段</el-button> 
           </el-form-item>
            </el-col>
              </el-row> 
             </el-form> 
            <table class="ht_table" v-if="vestList.setting.length>0">
            <tbody>
             <tr>
             <th width="150" colspan="2" rowspan="2">时间段内推单单数</th>
             <th width="100" rowspan="2">未认证</th>
             <th width="150" colspan="5">已认证用户活跃度</th>                            
            </tr>
             <tr>
             <th width="100">僵尸</th>
             <th width="100">低</th>
             <th width="100">中</th>
             <th width="100">高</th>
             <th width="100">活跃</th>               
            </tr>
            <tr>
             <th  rowspan="2">小面包车</th>
             <td class="Online">在线</td>
             <td ><el-input  v-model="vestList.setting[keys].sett.AF01801.one.AF0010401" class="Pushinput"     maxlength="1" v-numberOnly></el-input> </td>
             <td ><el-input  v-model="vestList.setting[keys].sett.AF01801.one.AF0020405" class="Pushinput"     maxlength="1" v-numberOnly></el-input> </td>
             <td ><el-input  v-model="vestList.setting[keys].sett.AF01801.one.AF0020404" class="Pushinput"     maxlength="1" v-numberOnly></el-input> </td>
             <td ><el-input  v-model="vestList.setting[keys].sett.AF01801.one.AF0020403" class="Pushinput"     maxlength="1" v-numberOnly></el-input> </td>
             <td ><el-input  v-model="vestList.setting[keys].sett.AF01801.one.AF0020402" class="Pushinput"     maxlength="1" v-numberOnly></el-input> </td>
             <td ><el-input  v-model="vestList.setting[keys].sett.AF01801.one.AF0020401" class="Pushinput"     maxlength="1" v-numberOnly></el-input> </td>                                                                     
            </tr>
             <tr>
             <td class="Offline">离线</td>
             <td ><el-input  v-model="vestList.setting[keys].sett.AF01801.zero.AF0010401" class="Pushinput"    maxlength="1" v-numberOnly></el-input> </td>
             <td ><el-input  v-model="vestList.setting[keys].sett.AF01801.zero.AF0020405" class="Pushinput"    maxlength="1" v-numberOnly></el-input> </td>
             <td ><el-input  v-model="vestList.setting[keys].sett.AF01801.zero.AF0020404" class="Pushinput"    maxlength="1" v-numberOnly></el-input> </td>
             <td ><el-input  v-model="vestList.setting[keys].sett.AF01801.zero.AF0020403" class="Pushinput"    maxlength="1" v-numberOnly></el-input> </td>
             <td ><el-input  v-model="vestList.setting[keys].sett.AF01801.zero.AF0020402" class="Pushinput"    maxlength="1" v-numberOnly></el-input> </td>
             <td ><el-input  v-model="vestList.setting[keys].sett.AF01801.zero.AF0020401" class="Pushinput"    maxlength="1" v-numberOnly></el-input> </td>               
            </tr>
             <tr>
             <th  rowspan="2">金杯车</th>
             <td class="Online">在线</td>
             <td ><el-input  v-model="vestList.setting[keys].sett.AF01802.one.AF0010401" class="Pushinput"    maxlength="1" v-numberOnly></el-input> </td>
             <td ><el-input  v-model="vestList.setting[keys].sett.AF01802.one.AF0020405" class="Pushinput"    maxlength="1" v-numberOnly></el-input> </td>
             <td ><el-input  v-model="vestList.setting[keys].sett.AF01802.one.AF0020404" class="Pushinput"    maxlength="1" v-numberOnly></el-input> </td>
             <td ><el-input  v-model="vestList.setting[keys].sett.AF01802.one.AF0020403" class="Pushinput"    maxlength="1" v-numberOnly></el-input> </td>
             <td ><el-input  v-model="vestList.setting[keys].sett.AF01802.one.AF0020402" class="Pushinput"    maxlength="1" v-numberOnly></el-input> </td>
             <td ><el-input  v-model="vestList.setting[keys].sett.AF01802.one.AF0020401" class="Pushinput"    maxlength="1" v-numberOnly></el-input> </td>             
            </tr>
             <tr>
             <td class="Offline">离线</td>
             <td ><el-input  v-model="vestList.setting[keys].sett.AF01802.zero.AF0010401" class="Pushinput"    maxlength="1" v-numberOnly></el-input> </td>
             <td ><el-input  v-model="vestList.setting[keys].sett.AF01802.zero.AF0020405" class="Pushinput"    maxlength="1" v-numberOnly></el-input> </td>
             <td ><el-input  v-model="vestList.setting[keys].sett.AF01802.zero.AF0020404" class="Pushinput"    maxlength="1" v-numberOnly></el-input> </td>
             <td ><el-input  v-model="vestList.setting[keys].sett.AF01802.zero.AF0020403" class="Pushinput"    maxlength="1" v-numberOnly></el-input> </td>
             <td ><el-input  v-model="vestList.setting[keys].sett.AF01802.zero.AF0020402" class="Pushinput"    maxlength="1" v-numberOnly></el-input> </td>
             <td ><el-input  v-model="vestList.setting[keys].sett.AF01802.zero.AF0020401" class="Pushinput"    maxlength="1" v-numberOnly></el-input> </td>            
            </tr>
             <tr>
             <th  rowspan="2">小型货车</th>
             <td class="Online">在线</td>     
             <td ><el-input  v-model="vestList.setting[keys].sett.AF01803.one.AF0010401" class="Pushinput"    maxlength="1" v-numberOnly></el-input> </td>
             <td ><el-input  v-model="vestList.setting[keys].sett.AF01803.one.AF0020405" class="Pushinput"    maxlength="1" v-numberOnly></el-input> </td>
             <td ><el-input  v-model="vestList.setting[keys].sett.AF01803.one.AF0020404" class="Pushinput"    maxlength="1" v-numberOnly></el-input> </td>
             <td ><el-input  v-model="vestList.setting[keys].sett.AF01803.one.AF0020403" class="Pushinput"    maxlength="1" v-numberOnly></el-input> </td>
             <td ><el-input  v-model="vestList.setting[keys].sett.AF01803.one.AF0020402" class="Pushinput"    maxlength="1" v-numberOnly></el-input> </td>
             <td ><el-input  v-model="vestList.setting[keys].sett.AF01803.one.AF0020401" class="Pushinput"    maxlength="1" v-numberOnly></el-input> </td>                  
            </tr>
             <tr>
             <td class="Offline">离线</td>
             <td ><el-input  v-model="vestList.setting[keys].sett.AF01803.zero.AF0010401" class="Pushinput"    maxlength="1" v-numberOnly></el-input> </td>
             <td ><el-input  v-model="vestList.setting[keys].sett.AF01803.zero.AF0020405" class="Pushinput"    maxlength="1" v-numberOnly></el-input> </td>
             <td ><el-input  v-model="vestList.setting[keys].sett.AF01803.zero.AF0020404" class="Pushinput"    maxlength="1" v-numberOnly></el-input> </td>
             <td ><el-input  v-model="vestList.setting[keys].sett.AF01803.zero.AF0020403" class="Pushinput"    maxlength="1" v-numberOnly></el-input> </td>
             <td ><el-input  v-model="vestList.setting[keys].sett.AF01803.zero.AF0020402" class="Pushinput"    maxlength="1" v-numberOnly></el-input> </td>
             <td ><el-input  v-model="vestList.setting[keys].sett.AF01803.zero.AF0020401" class="Pushinput"    maxlength="1" v-numberOnly></el-input> </td>   
            </tr>
            <tr>
             <th  rowspan="2">中型货车</th>
             <td class="Online">在线</td>        
             <td ><el-input  v-model="vestList.setting[keys].sett.AF01804.one.AF0010401" class="Pushinput"   maxlength="1" v-numberOnly></el-input> </td>
             <td ><el-input  v-model="vestList.setting[keys].sett.AF01804.one.AF0020405" class="Pushinput"   maxlength="1" v-numberOnly></el-input> </td>
             <td ><el-input  v-model="vestList.setting[keys].sett.AF01804.one.AF0020404" class="Pushinput"   maxlength="1" v-numberOnly></el-input> </td>
             <td ><el-input  v-model="vestList.setting[keys].sett.AF01804.one.AF0020403" class="Pushinput"   maxlength="1" v-numberOnly></el-input> </td>
             <td ><el-input  v-model="vestList.setting[keys].sett.AF01804.one.AF0020402" class="Pushinput"   maxlength="1" v-numberOnly></el-input> </td>
             <td ><el-input  v-model="vestList.setting[keys].sett.AF01804.one.AF0020401" class="Pushinput"   maxlength="1" v-numberOnly></el-input> </td>              
            </tr>
             <tr>
             <td class="Offline">离线</td>
             <td ><el-input  v-model="vestList.setting[keys].sett.AF01804.zero.AF0010401" class="Pushinput"   maxlength="1" v-numberOnly></el-input> </td>
             <td ><el-input  v-model="vestList.setting[keys].sett.AF01804.zero.AF0020405" class="Pushinput"   maxlength="1" v-numberOnly></el-input> </td>
             <td ><el-input  v-model="vestList.setting[keys].sett.AF01804.zero.AF0020404" class="Pushinput"   maxlength="1" v-numberOnly></el-input> </td>
             <td ><el-input  v-model="vestList.setting[keys].sett.AF01804.zero.AF0020403" class="Pushinput"   maxlength="1" v-numberOnly></el-input> </td>
             <td ><el-input  v-model="vestList.setting[keys].sett.AF01804.zero.AF0020402" class="Pushinput"   maxlength="1" v-numberOnly></el-input> </td>
             <td ><el-input  v-model="vestList.setting[keys].sett.AF01804.zero.AF0020401" class="Pushinput"   maxlength="1" v-numberOnly></el-input> </td>   
            </tr>
            </tbody>    
            </table>
            </div>    
                    <div slot="footer" class="dialog-footer">
                        <el-button type="primary" @click="changeInfoSave" v-if="editType=='add'">保 存</el-button>
                        <el-button type="primary" @click="updateInfoSave" v-else>保 存</el-button>
                        <el-button @click="close()">取 消</el-button>
                    </div> 
            </el-dialog>
    </div>
</template>
<script>
import { data_ServerClassList} from '@/api/server/areaPrice.js'
import  { data_Add_pushsheet,data_dpdata_pushsheet,data_get_pushsheet_Id} from '@/api/vest/pushsheet/pushsheetList.js'
import Upload from '@/components/Upload/singleImage'
import GetCityList from '@/components/GetCityList'
import { eventBus } from '@/eventBus'
import {getDictBycode} from '@/api/common.js'
export default {
data(){
    //    选择省市校验
        const belongCityNameValidator = (rule, val, cb) => {
            if(this.editType=='add'){
             if(!this.$refs.area.selectedOptions[0]) {
                    cb(new Error('请选择所在地'))
                }
             else{
                cb()
            }   
            }
            else{
                if(!this.vestList.areaCode) {
                    cb(new Error('请选择所在地'))
                }
             else{
                cb()
            } 
            }
             
        }

    //    选择服务类型校验
        const serivceCodeValidator = (rule, val, cb) => {
                    if(!val){
            cb(new Error('车主不能为空'))
            }
            else{
                cb()
            }        
        }

    //    选择价格上浮开始校验
        const priceStartValidator = (rule, val, cb) => {
            let reg= /^([1]|[2])(\.\d{1,2})?$/
            let priceEnd =  this.$refs.priceEnd.value;
            if(!reg.test(val)){
            cb(new Error('请输入范围1~2之间的正数，小数只保留两位'))
            }
            else if(val>2){
            cb(new Error('请输入范围1~2之间的正数，小数只保留两位'))
            }
            else{
                cb()
            }
        }
    //    选择价格上浮结束校验
        const priceEndValidator = (rule, val, cb) => {
            let reg= /^([1]|[2])(\.\d{1,2})?$/
            let priceStart = this.$refs.priceStart.value;
            if(!reg.test(val)){
            cb(new Error('请输入范围1~2之间的正数,小数只保留两位'))
            }
            else if(val>2){
            cb(new Error('请输入范围1~2之间的正数，小数只保留两位'))
            }
            if(val<=priceStart){
            cb(new Error('必须大于价格上浮开始的值'))
            }
            else{
                cb()
              
            }
        }
    return{
            btnStatus:true, //新增修改按钮状态  
            selectFlag:false,
            driverTemplateDialogFlag: false,// 弹框控制的控制
            title:'',
            text:'',
            shipperTypeName:'',
            shipperType:'',
            formLabelWidth:'150px',
            createTime:'',
            serviceCardList:[],
            serviceValue:null,
    	 	vestList:{
            serivceCode: null,
            areaCode:null,
            areaName:null,
            priceEnd:null,
            priceStart:null,
            setting:[]
            },
            CvestList:{
            serivceCode: null,
            areaCode:null,
            areaName:null,
            priceEnd:null,
            priceStart:null,
            setting:[]
            },
            rulesForm:{
            areaCode:{trigger:'change',required:true,validator: belongCityNameValidator},
            serivceCode:{trigger:'change',required:true,validator:serivceCodeValidator},
            priceStart:{trigger:'change',required:true,validator:priceStartValidator},
            priceEnd:{trigger:'change',required:true,validator:priceEndValidator},
            createTime:[{value: '',trigger:'change',}],
            },
            timeMax:null,
    }
},
props:{
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
        params:{
            type:[Object,String,Array],
            default: ''
         },
        editType: {
            type: String,
            default: 'add'
         },
        },
        components:{
            GetCityList
        },
        computed:{
            settList(){
            let settList = {
                createTime:null,
                startTime:null,
                endTime:null,
                sett:{}
            } 
            let set_List1 = ['AF01801','AF01802','AF01803','AF01804']
            let set_List2 = ['zero','one']
            let set_List3 = ['AF0010401','AF0020401','AF0020402','AF0020403','AF0020404','AF0020405']
            set_List1.forEach(list1=>{
                settList.sett[list1] = {}
              set_List2.forEach(list2=>{
                     settList.sett[list1][list2] = {}
                set_List3.forEach(list3=>{
                        settList.sett[list1][list2][list3] = 0
                })
              })
            })
            return settList
            }
        },
        methods:{
            getStr(val){
                this.vestList.areaCode = val.city.code
                this.vestList.areaName = val.city.name
            },
        // 省市状态表
            changeSelect(){
            if(this.editType==='add'){
                this.selectFlag=false
            } else{
                this.selectFlag=true
            }
            },
        openDialog(){
      if (this.editType == 'edit') {
        if(this.params.length == undefined && this.editType !== 'add'){
               this.$message.warning('请选择您要操作的数据');
               return false
        }
         else if(this.params.length == 0 && this.editType !== 'add'){
               this.$message.warning('请选择您要操作的数据');
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
                data_get_pushsheet_Id(this.params[0].id).then(res=>{
                        let selectRowData = res.data.push;
                        let setting =res.data.settings
                        let sy=[]
                        for(var i = 0;i<setting.length;i++){
                            sy.push( JSON.parse(JSON.stringify(this.settList)))
                            }
                        setting.map((subList,index) => {
                            sy[index].startTime= subList[index].pushStartTime;
                            sy[index].endTime= subList[index].pushEndTime;
                            sy[index].createTime= [subList[index].pushStartTime,subList[index].pushEndTime]; 
                            let sett = sy[index].sett;
                                subList.map(item => {
                                    var carType = item.carType;                                
                                    var isLine = item.isLine;
                                    var liveness = item.liveness;
                                    sett[carType][isLine][liveness] = item.orderNum
                                })
                                sy[index].sett = sett
                        })
                        selectRowData.setting = sy;
                        this.vestList = selectRowData;
                        })

            this.driverTemplateDialogFlag=true;
            }
            }
            else{
            this.driverTemplateDialogFlag=true;
            }
        },
        changeList(){
            eventBus.$emit('pushListtwo')
        },
        //弹框控制
        change() {
         this.driverTemplateDialogFlag = false;
         this.vestList=this.CvestList;
         this.selectFlag=false;
        },
        //添加子节点新增
        addItem(){
        this.vestList.setting.push(JSON.parse(JSON.stringify(this.settList)));
        this.$forceUpdate()
        },
        //删除子节点新增
        reduceItem(i){
        this.vestList.setting.splice(i,1);
        this.$forceUpdate()
        },
        cTime(key,val){
            if(val&&val[1]-val[0] < this.timeMax*60000){
            this.vestList.setting[key].createTime = null
            this.$message.info('推送时间段不能小于'+this.timeMax+'分钟,请重新选择~');
            }
        this.$forceUpdate()
        },
        // 类型列表
        getMoreInformation(){
                data_ServerClassList().then(res=>{
                this.serviceCardList = res.data
                })
                // 间隔时间
                getDictBycode('AF0051702').then(res=>{
                this.timeMax = res.data.value
                })
        },
        //关闭弹框
        close(formName){
            this.driverTemplateDialogFlag = false;
            this.vestList = this.CvestList;
            this.selectFlag = false;
        },
        //完善数据
        completeData(){
                let Carst = ['AF01801','AF01802','AF01803','AF01804'];
                let Cartype = ['zero','one'];
                let CarActive = ['AF0010401','AF0020401','AF0020402','AF0020403','AF0020404','AF0020405']
                let reg= /^[0-5]\d*$/  //输入正整数正则
                for(var i=0;i<this.vestList.setting.length;i++){

                    for(var j=0;j<Carst.length;j++)
                    {
                         for(var k=0;k<Cartype.length;k++)
                         {
                          for(var n=0;n<CarActive.length;n++)
                         {
                            if(!reg.test(this.vestList.setting[i].sett[Carst[j]][Cartype[k]][CarActive[n]]))
                            {
                                this.$message.warning('推单单数范围必须在0-5之间的整数')
                                return false
                                break;
                            }
                         }  
                         }
                    }
                }
        },
        completeData2(){
                for(var i=0;i<this.vestList.setting.length;i++){
                   if(this.vestList.setting[i].createTime==null){
                   this.$message.warning('第' + (i+1) + '推送时间段必须都填写');
                   this.vestList.setting[i].startTime = null;
                   this.vestList.setting[i].endTime = null;
                   return false
                    }
                    else{
                this.vestList.setting[i].startTime = this.vestList.setting[i].createTime[0];
                this.vestList.setting[i].endTime = this.vestList.setting[i].createTime[1];
                    }
                }
            },
        // 新增保存
        changeInfoSave(){
            this.completeData();
            this.completeData2()
            if(this.completeData()==false)
            {
               return false
            }
            else if(this.completeData2()==false){
               return false
            }
            else{
            this.$refs['vestList'].validate(valid=>{
            if(valid){
            var forms= Object.assign({}, this.vestList)
            forms.setting = JSON.stringify(forms.setting)
            if(this.btnStatus){
                this.btnStatus = false
                this.$message.info('新增中...')
                data_Add_pushsheet(forms).then(res=>{
                this.driverTemplateDialogFlag = false;
                this.selectFlag=false;
                for(var i=0;i<this.vestList.setting.length;i++){
                    this.vestList.setting[i].createTime = null
                    this.vestList.setting[i].startTime = null;
                    this.vestList.setting[i].endTime = null;
                }
                    this.vestList.priceEnd=null,
                    this.vestList.priceStart=null,
                    this.changeList();
                    this.$message.success('新增成功');
                }).catch(res=>{
                    this.$message.error(res.errorInfo);
                    this.driverTemplateDialogFlag = false;
                    this.selectFlag = false;
                });
                }
            }
            })
            }
        },
        // 修改 保存
        updateInfoSave(){
            this.completeData();
            this.completeData2()
            if(this.completeData()==false)
            {
               return false
            }
            else if(this.completeData2()==false){
               return false
            }
            else{
            this.$refs['vestList'].validate(valid=>{
            if(valid){
            var forms= Object.assign({}, this.vestList,{id:this.params[0].id})
            forms.setting = JSON.stringify(forms.setting)
            if(this.btnStatus){
                this.btnStatus = false
                this.$message.info('修改中...')
                data_dpdata_pushsheet(forms).then(res=>{
                this.driverTemplateDialogFlag=false;
                this.selectFlag=false;
                this.changeList();
                this.$message.success('修改成功');
                }).catch(res=>{
                this.$message.error(res.errorInfo);
                this.selectFlag=false;
                this.driverTemplateDialogFlag=false;
                });
                }
                }
            })
            }
        }
    },
    watch:{
    driverTemplateDialogFlag:{
            handler: function(val, oldVal) {
            if(!val){
                    this.$emit('getData') 
                    if(this.$refs.area){
                    this.$refs.area.selectedOptions = [];
                    this.$refs['vestList'].resetFields();
                    this.vestList.setting=[];
                    this.vestList.setting.push(JSON.parse(JSON.stringify(this.settList)))
                }
                if(this.$refs.area){
                    this.$refs.area.clearData();
                }
    }
    else{
        this.getMoreInformation();
        this.btnStatus = true
    }
    }
    }
    },
    mounted(){
        
    },
    created(){
        this.vestList.setting.push(JSON.parse(JSON.stringify(this.settList)))
        this.CvestList.setting.push(JSON.parse(JSON.stringify(this.settList)))
    }
    }
</script>
<style  lang="scss">
.vestDialogBox{
    display: inline-block; 
    .el-dialog{
        width: 1050px!important;
    }
        .el-cascader{
            .el-input{
                width: 250px;
            }
        }
    .price_one{
            width:110px;
            margin-right: 7px;
    }
    .price_two{
            width:110px;
            margin-right: 20px;
    }
    .el-date-editor{
        line-height: 24px;
    }
   .vestOrder{
        width: 100%;
        padding-bottom: 10px;
        border-bottom: 2px dashed #ccc;
        .selectInput{
            .el-input__inner{
            width: 250px;
        }
        }

    }
  .table_box{
    margin-top: 10px;
    .ht_table{
        width: 950px;
        margin:0px 10px;
        color: #333;
        border-left:1px solid #d0d7e5;
        border-bottom:1px solid #d0d7e5;
        tr{
            width: 100%;
            line-height: 34px;
            height: 34px;
        }
        th{
            background: #EAF0FF;
            border-top:1px solid #d0d7e5;
            border-right:1px solid #d0d7e5;
        }
        td{
            border-top:1px solid #d0d7e5;
            text-align: center;
            border-right:1px solid #d0d7e5;
        }
        .Online{
            color: #409EFF;
        }
         .Offline{
            color:red;
         }
         .Pushinput{
             .el-input{
                border-radius:0px;
                width: 100px;
                height:35px;
                border:none
             }
        }
        }
        .VestreduceItem{
             width: 154px;
             height: 40px;
         }
         .VestaddItem{
             width: 154px;
             height: 40px;             
         }
        .el-date-editor .el-range-separator {
                padding: 0 0px;
                line-height: 25px;
                width: 5%;
                color: #303133;
        }
        }
        .el-date-editor .el-range__icon {
        line-height: 24px;
    }
        .el-range-editor{
        width:350px;
    }
}
</style>
