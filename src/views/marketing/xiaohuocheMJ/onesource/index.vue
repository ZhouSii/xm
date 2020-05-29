<template>
    <div class="identicalStyle MjD_onesource" style="height:100%" v-loading="loading">
          <el-form :inline="true"  class="demo-ruleForm classify_searchinfo">
            <el-form-item label="所在地">
              <GetCityList v-model="formAll.areaCode" ref="area"  @returnStr="getStr"></GetCityList>
          </el-form-item>
           <el-form-item label="服务类型">
                    <el-select v-model="formAll.serivceCode" clearable placeholder="请选择">
                        <el-option
                        v-for="item in serviceCardList"
                        :key="item.id"
                        :label="item.name"
                        :value="item.code"
                        :disabled="item.disabled">
                        </el-option>
                    </el-select>
                 </el-form-item>
                <el-form-item label="片区名称">
                   <el-input v-model="formAll.districtName"></el-input>
                 </el-form-item>
         <el-form-item class="fr">
         <el-button type="primary"  plain  @click="getdata_search()" :size="btnsize" icon="el-icon-search">查询</el-button>
         <el-button type="primary"  plain  @click="clearSearch" :size="btnsize" icon="fontFamily aflc-icon-qingkong">清空</el-button>
         </el-form-item>
           </el-form>
  <div class="classify_info">
   <div class="btns_box">
  <!-- 马甲单新增 -->
  <div class="vestDialogBox commoncss ">
 <div class="vestonceDialog">
    <el-button  type="primary" value="value" plain icon="el-icon-news" @click="openDialog()" v-has:MARKETING_SMALL_CAR_MJ_SOURCE_OPTION_ADD :size="btnsize">新增</el-button>
            <el-dialog title="马甲单源" :visible="driverTemplateDialogFlag" :before-close="change">
            <div class="vestOrder">
            <el-form :inline="true" :model="vestAll" ref="vestAll" :rules="rulesForm1">
             <el-row>
            <el-col :span="12">
          <el-form-item label="服务类型：" :label-width="formLabelWidth" v-if='creadFlag'>
            <el-input v-model="vestAll.serivceCode" disabled></el-input>
           </el-form-item>
          <el-form-item label="服务类型：" :label-width="formLabelWidth" prop="serivceCode" v-else>
                    <el-select v-model="vestAll.serivceCode" clearable placeholder="请选择">
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
           <el-form-item label="片区名称：" :label-width="formLabelWidth" v-if='creadFlag'>
            <el-input v-model="vestAll.districtName" :maxlength='50' disabled></el-input>
           </el-form-item>
            <el-form-item label="片区名称：" :label-width="formLabelWidth" prop="districtName" v-else>
            <el-input  v-model="vestAll.districtName"></el-input>
           </el-form-item>
            </el-col>
              </el-row>
            <el-row>
            <el-col :span="12">
            <el-form-item label="中心地址：" :label-width="formLabelWidth" v-if='creadFlag'>
            <el-input v-model="vestAll.districtAddress" disabled></el-input>
           </el-form-item>      
            <el-form-item label="中心地址：" :label-width="formLabelWidth" prop="districtAddress" v-else>
            <el-input @focus="()=>{showMap('districtAddress')}" v-model="vestAll.districtAddress"></el-input>
            </el-form-item>
            </el-col>
             <el-col :span="12">
                <span v-if="creadFlag">
               <el-form-item label="省市：" :label-width="formLabelWidth">
                <el-input v-model="vestAll.areaName" disabled></el-input>
                </el-form-item>
                 </span>
                 <span v-else>
            <el-form-item label="省市：" :label-width="formLabelWidth" prop="areaName">
                <GetCityList v-model="vestAll.areaName" ref="area1"  @returnStr="getStr1"></GetCityList>
            </el-form-item>
                 </span>
            </el-col>
            </el-row>
             </el-form>    
             </div>
             
           <div class="vestAddress">
               <div class="vestAera">
                   <h4>提货地</h4>
                   <div class="el_vestsearch">
                       <div class="vest_section"  v-for="(form,keys) in pickAera" :key='keys'>
                         <div class="vest_tree" v-if="keys == 0" >
                             <el-input @focus="()=>{showMap('pickaddAera')}" v-model="pickaddAera"></el-input>
                             <el-button class="el-icon-plus" @click="addpickAera" :size="btnsize"></el-button>
                             </div>
                         <div class="vest_tree" v-else>
                             <span class="vest_tree_span">{{form.pickAeratree}}</span>
                             <el-button class="el-icon-minus"  @click="reduceItempick(keys)" :size="btnsize"></el-button>
                       </div>
                       </div>                  
                   </div>
               </div>

               <div class="vestAera">
                   <h4>目的地</h4>
                   <div class="el_vestsearch">
                       <div class="vest_section"  v-for="(form,keys) in destinationAera" :key='keys'>
                         <div class="vest_tree" v-if="keys == 0" >
                             <el-input @focus="()=>{showMap('destinationaddAera')}" v-model="destinationaddAera"></el-input>
                             <el-button class="el-icon-plus" @click="adddestinationAera" :size="btnsize"></el-button>
                             </div>
                         <div class="vest_tree" v-else>
                             <span class="vest_tree_span">{{form.destinationAeratree}}</span>
                             <el-button class="el-icon-minus"  @click="reduceItemdestination(keys)" :size="btnsize"></el-button>
                       </div>     
                       </div>                  
                   </div>
               </div>

               <div class="vestAera">
                   <h4>马甲单源预览</h4>
                   <div class="el_vestsearch">
                       <div class="vest_section" v-for="(value,keys) in totalAeraData" :key='keys'>
                         <div class="vest_tree">
                             <span class="vest_tree_span">{{value.startAddressName}}-{{value.endAddressName}}</span>
                       </div>     
                       </div>                  
                   </div>
               </div>

           </div>
                    <div slot="footer" class="dialog-footer">
                        <el-button type="primary" @click="changeInfoSave1" v-if='!creadFlag'>保 存</el-button>
                        <el-button type="primary" @click="changeInfoSavaAdress" v-else>保 存</el-button>
                        <el-button @click="close1()">取 消</el-button>
                    </div> 

            </el-dialog>
    </div>
  </div>


<!-- 详情修改 -->
<div class="vestDialogBox commoncss">
<div class="vestDialog">
            <el-dialog title="马甲单源" :visible="driverTemplateDialogFlag2" :before-close="changeview">
            <div class="vestOrder">
            <el-form :inline="true">
             <el-row>
            <el-col :span="12">
          <el-form-item label="服务类型：" :label-width="formLabelWidth" v-if='openFlag==0'>
         <el-select v-model="selectRowData3.serivceCode" clearable placeholder="请选择" disabled>
                        <el-option
                         v-for="item in serviceCardList"
                        :key="item.id"
                        :label="item.name"
                        :value="item.code"
                        :disabled="item.disabled">
                        </el-option>
          </el-select >
           </el-form-item>
            <el-form-item label="服务类型：" :label-width="formLabelWidth" v-else>
         <el-select v-model="selectRowData3.serivceCode" clearable placeholder="请选择">
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
            <el-col :span="12">
            <el-form-item label="片区名称：" :label-width="formLabelWidth" v-if='openFlag==0'>
             <el-input v-model="selectRowData3.districtName" disabled></el-input>
           </el-form-item>
           <el-form-item label="片区名称：" :label-width="formLabelWidth" v-else>
          <el-input v-model="selectRowData3.districtName"></el-input>
           </el-form-item>
            </el-col>
              </el-row>
            <el-row>
            <el-col :span="12">
            <el-form-item label="中心地址：" :label-width="formLabelWidth" v-if='openFlag==0'>
             <el-input v-model="selectRowData3.districtAddress"  disabled></el-input>
            </el-form-item>
             <el-form-item label="中心地址：" :label-width="formLabelWidth" v-else>
             <el-input @focus="()=>{showMap('selectdistrictAddress')}" v-model="selectRowData3.districtAddress"></el-input>
            </el-form-item>
            </el-col>
             <el-col :span="12">
                 <span v-if="openFlag==0">
                      <el-form-item label="省市：" :label-width="formLabelWidth">
                <el-input v-model="selectRowData3.areaName" disabled></el-input>
                      </el-form-item>
                 </span>
                 <span v-else>
                    <el-form-item label="省市：" :label-width="formLabelWidth" prop="areaName">
                 <el-input v-model="selectRowData3.areaName"  @focus="changeSelect" v-if="openFlag !==0 && !selectFlag" ></el-input>
                <GetCityList ref="area2" v-model="selectRowData3.areaName"  @focus="changeSelect"  @returnStr="getStr2" v-else></GetCityList>
                </el-form-item>
                 </span>
            </el-col>
            </el-row>
             </el-form>    
             </div>
             
           <div class="vestdetail">
            <el-form :inline="true">
             <el-row>
            <el-col :span="8">
            <el-form-item label="提货地：" :label-width="formLabelWidth" class="adressstart">
           <el-input  v-model="formAll2.startAddressName"></el-input>
          </el-form-item>
            </el-col>
            <el-col :span="8">
           <el-form-item label="目的地：" class="adressend">
            <el-input  v-model="formAll2.endAddressName"></el-input>
                 </el-form-item>
            </el-col>
            <el-col :span="8">
        <el-form-item :label-width="formLabelWidth">       
         <el-button type="primary"  plain  @click="getdata_search2()" icon="el-icon-search" :size="btnsize">查询</el-button> 
         <el-button type="primary"  plain  @click="clearSearch2" icon="fontFamily aflc-icon-qingkong" :size="btnsize">清空</el-button>
         </el-form-item>
            </el-col>
             </el-row>
             <el-row>
                 <el-row :span="24" v-if="openFlag==1">
                <el-form-item :label-width="formLabelWidth" >       
                    <el-button  type="primary"  plain icon="el-icon-news" @click="openDialog1()" class="view_btn" :size="btnsize">新增</el-button>
                    <el-button  type="primary" plain icon="el-icon-delete" @click="handleDelete2" :size="btnsize">删除</el-button>
                </el-form-item>
                 </el-row>
             </el-row>
           </el-form>
        <div class="el-tableTree1">
        <el-table  stripe border :data="tableDataTree1"   highlight-current-row @row-click="clickDetails2">
        <el-table-column  label="序号" width="60px" type="index">
            
        </el-table-column>
        <el-table-column  label="提货地"  prop="startAddressName">
            
        </el-table-column>
        <el-table-column  label="目的地" prop="endAddressName">
            
        </el-table-column>
        <el-table-column  label="里程（公里）" prop="distance">
            
        </el-table-column>          
        </el-table> 
          <!-- 页码 -->
 <div class="info_tab_footer">共计:{{ dataTotal1 }} <div class="show_pager"> <Pager :total="dataTotal1" @change="handlePageChange1"  :sizes="sizes1" ref="pager1"/></div> </div> 
            </div>
           </div>
              <div slot="footer" class="dialog-footer" v-if="openFlag==1">
                        <el-button type="primary" @click="changeInfoSave2">保 存</el-button>
                        <el-button @click="close2()">取 消</el-button>
                    </div>
            </el-dialog>
    </div>
</div>

     <div class="vestonceDialog">
         <el-button  type="primary" value="value" plain icon="el-icon-edit" @click="openDialogView0()" :size="btnsize"  v-has:MARKETING_SMALL_CAR_MJ_SOURCE_OPTION_UPDATE>修改</el-button>
     </div>
    <el-button type="primary" plain icon="el-icon-bell"  @click="handleUseStates" :size="btnsize" v-has:MARKETING_SMALL_CAR_MJ_SOURCE_OPTION_USE>启用/禁用</el-button>
    <el-button type="primary" plain icon="el-icon-delete" @click="handleDelete" :size="btnsize" v-has:MARKETING_SMALL_CAR_MJ_SOURCE_OPTION_DELETE>删除</el-button>
   </div>
  
    <div class="info_news">  
    <el-table style="width: 100%"  ref="multipleTable" stripe border :data="tableDataTree" height="100%" highlight-current-row @selection-change="getSelection" @row-click="clickDetails">
              <el-table-column
                            label="选择"
                            type="selection"
                            width="50">
              </el-table-column>
           <el-table-column label="序号"  width="60">
                            <template slot-scope="scope">
                             {{ (page - 1)*pagesize + scope.$index + 1 }}
                            </template>
            </el-table-column> 
   <el-table-column  label="片区名称" prop="districtName" sortable>
         <template  slot-scope="scope">
         <span class="BtnInfo" @click="openDialogView(scope.row)">{{scope.row.districtName}}</span >
         </template>
   </el-table-column>
   <el-table-column  label="省市" prop="areaName" sortable></el-table-column>
   <el-table-column  label="服务类型" prop="serivceCode" sortable></el-table-column>
   <el-table-column  label="片区中心" prop="districtAddress" sortable show-overflow-tooltip width="350"></el-table-column>
   <el-table-column  label="马甲单源数量" prop="orderNum" sortable></el-table-column>
   <el-table-column  label="修改人" prop="updater" sortable></el-table-column>
   <el-table-column  label="修改日期" prop="updateTime" sortable></el-table-column>
   <el-table-column  label="状态" prop="usingStatus" sortable>
        <template  slot-scope="scope">
          {{ scope.row.usingStatus == 1 ? '启用' : '禁用' }}
         </template>
   </el-table-column>              

  </el-table> 
           <!-- 页码 -->
 <div class="info_tab_footer">共计:{{ dataTotal }} <div class="show_pager"> <Pager :total="dataTotal" @change="handlePageChange"  :sizes="sizes" ref="pager"/></div> </div> 
   </div>
   </div>
       <tmsmap @success="getInfo" pos="" name="" :popVisible.sync="popVisible" />
  </div>

</template>

<script>
import { data_ServerClassList} from '@/api/server/areaPrice.js'
import  { data_get_onesource_list,data_add_onesource_list,data_Del_onesource,data_UseStates_onesource,data_get_onesourceAddress_list,data_Del_onesourceAddress,data_get_onesource_Id,data_get_onesource_update,data_get_onesource_addDetailAddress,data_get_aflcVestUnisource_Id} from '@/api/vest/onesource/onesource.js'
import { parseTime,formatTime } from '@/utils/index.js'
import Pager from '@/components/Pagination/index'
import GetCityList from '@/components/GetCityList'
import tmsmap from '@/components/map/index'
export default {
    data(){
        //    选择省市校验
            const belongCityNameValidator = (rule, val, cb) => {
             if(!val) {
                    cb(new Error('请选择所在地'))
                }
             else{
                cb()
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

        //    片区名称校验
            const districtNameValidator = (rule, val, cb) => {
                if(!val){
                cb(new Error('片区名称不能为空'))
                }
                else{
                    cb()
                }
            }

        //    中心地址校验
            const districtAddressValidator = (rule, val, cb) => {
                if(!val){
                cb(new Error('中心地址不能为空'))
                }
                else{
                    cb()
                }
            }

        return{
        loading:true,    
        btnsize:'mini',
        creadFlag:false,   //详情修改新增状态
        selectFlag:false,
        openFlag:'',   //0详情,1修改
        popVisible:false,
        serviceCardList:[],
        viewStatus:'add',
        selectRowData:{},
        selectRowData2:{},
        selectRowData3:{},
        selectId:[],
        driverTemplateDialogFlag:false,
        driverTemplateDialogFlag2: false,
        formLabelWidth:'120px',
        sizes:[20,50,100],
        sizes1:[10,30,50],
        pagesize:20,//大表每页显示数
        page:1,//大表当前页
        dataTotal:null,//大表总记录数
        tableDataTree:[],//大表定义列表记录
        pagesize1:10,//详情表每页显示数
        page1:1,//详情表当前页
        dataTotal1:null,//详情表总记录数
        tableDataTree1:[],//详情表定义列表记录
        pickAera:[{
            }],
        destinationAera:[{
            }],
        pickaddAera:'',
        destinationaddAera:'',
        endAddressName:'',
        startAddressName:'',
		formAll:{
            areaCode: null,
            serivceCode:null,
            districtName: null,
            },
        formAll2:{
            endAddressName: null,
            startAddressName:null,
            vestId:null
            },    
        vestAll:{
            serivceCode:null,
            districtName:null,
            districtAddress:null,
            areaCode:null,
            areaName:null,
            longitude:null,
            latitude:null,
            aflcVestUnisourceAddressaList:[]
            },
        vestAdree:{
            id:null,
            aflcVestUnisourceAddressaList:[]
        }, 
        rulesForm1:{
            areaName:{trigger:'change',required:true,validator: belongCityNameValidator},
            serivceCode:{trigger:'change',required:true,validator:serivceCodeValidator},
            districtName:{trigger:'change',required:true,validator:districtNameValidator},
            districtAddress:{trigger:'change',required:true,validator:districtAddressValidator},
            },        
        }
    },
    components:{
        GetCityList,
        tmsmap,
        Pager
    },
    computed:{
     totalAeraData(){
        let AeraData=[];
        for(var i = 1; i<this.pickAera.length;i++){
            for(var j = 1;j<this.destinationAera.length;j++)
            {
                  AeraData.push(
                      {
                          startAddressName:this.pickAera[i].pickAeratree,
                          startAddressCoordinate:this.pickAera[i].startAddressCoordinate,
                          startAddress:this.pickAera[i].startAddressName,
                          endAddressCoordinate:this.destinationAera[j].endAddressCoordinate,
                          endAddress:this.destinationAera[j].endAddressName,
                          endAddressName:this.destinationAera[j].destinationAeratree,
                      }
                  )
            }
        }
        return AeraData
     },
    },
    watch:{
        driverTemplateDialogFlag:{
        handler: function(val, oldVal) {
            if(!val){
            this.creadFlag = false
            if(this.$refs.area1){
            this.$refs.area1.clearData();
            }
            this.vestAll={
                serivceCode:null,
                districtName:null,
                districtAddress:null,
                areaCode:null,
                latitude:null,
                longitude:null,
                aflcVestUnisourceAddressaList:[]
                }
                this.pickaddAera = ''
                this.destinationaddAera =''
                this.pickAera = [{}]
                this.destinationAera = [{}]
                this.$refs['vestAll'].resetFields()
                this.$refs.multipleTable.clearSelection();
                this.firstblood();
            }
        },
        },
        driverTemplateDialogFlag2:{
                handler: function(val, oldVal) {
                    if(!val){
                        this.selectFlag=false
                        this.$emit('getData') 
                        this.$refs.multipleTable.clearSelection();
                    }
                }
        },
    },
    methods:{
       // 省市
       getStr(val){
                this.formAll.areaCode = val.city.code
                this.formAll.areaName = val.city.name
        },
       // 省市
       getStr1(val){
                this.vestAll.areaCode = val.city.code
                this.vestAll.areaName = val.city.name
        },

       getStr2(val){
                this.selectRowData3.areaCode = val.city.code
                this.selectRowData3.areaName = val.city.name
         },
        // 省市状态表
            changeSelect(){
            if(this.editType=='0'){
                this.selectFlag=false
            } else{
                this.selectFlag=true
            }
            },
           //刷新页面  
            firstblood(){
                this.loading = true
                data_get_onesource_list(this.page,this.pagesize,this.formAll).then(res => {
                    this.dataTotal = res.data.totalCount
                    this.tableDataTree = res.data.list;
                    this.loading = false
                })
            },
            // 详情列表
            firstblood2(){
                data_get_onesourceAddress_list(this.page1,this.pagesize1,this.formAll2).then(res => {
                    this.dataTotal1 = res.data.totalCount;
                    this.tableDataTree1 = res.data.list;
                })
            },
            // 类型列表
            getMoreInformation(){
                data_ServerClassList().then(res=>{
                     res.data.map((item)=>{
                        this.serviceCardList.push(item);
                    })
                })
            },
            showMap(name) {
                this.popVisible = true ;
                this.current = name;
            },
            getInfo(pos, name, info) {
            switch (this.current) {
                case 'districtName':
                this.vestAll.districtName = info.formattedAddress;
                break;
                case 'districtAddress':
                this.vestAll.districtAddress = info.formattedAddress;
                let tude= pos.split(",");
                let longitude=tude[0]
                let latitude=tude[1]
                this.vestAll.longitude = longitude;
                this.vestAll.latitude = latitude;
                break;
                case 'vestdistrictName':
                this.formAll.districtName = info.formattedAddress;
                break;
                case 'pickaddAera':
                let posstartArray = pos.split(',');
                if(info.addressComponent.street){
                  this.startAddressCoordinate = posstartArray[1]+','+posstartArray[0]
                  this.startAddressName= info.addressComponent.street + info.addressComponent.streetNumber
                  if(info.addressComponent.building){
                  this.pickaddAera = info.addressComponent.building
                }
                else if(info.aois.length>0){
                  this.pickaddAera = info.aois[0].name
                }
                else{
                  let startAddress = info.formattedAddress.split('市')
                  let startOldCityAddress = ''
                  let startNewCityAddress = ''
                  startAddress.forEach((item,index)=>{
                      if(index==0&&startAddress[index+1]!==''){
                         startAddress[index] = item + '市'
                      }
                      if(item==''){
                         startAddress[index] ='市'
                      }
                      if(index>1&&startAddress[index+1]!==''){
                        startAddress[index] = '市'+ item
                      }
                  })
                  if(startAddress[1]=='市'){
                      startOldCityAddress = startAddress[0]+startAddress[1]
                  }
                  else{
                      startOldCityAddress = startAddress[0]
                  }
                  startNewCityAddress = info.formattedAddress.replace(startOldCityAddress,'')
                  this.pickaddAera = startNewCityAddress
                }
                }
                else{
                  this.startAddressName = info.pois[0].address
                  this.pickaddAera = info.pois[0].name    
                  this.startAddressCoordinate = info.pois[0].location.N+info.pois[0].location.O
                }
                break;
                case 'destinationaddAera':
                let posendArray = pos.split(',');
                if(info.addressComponent.street){
                  this.endAddressCoordinate = posendArray[1]+','+posendArray[0]
                  this.endAddressName= info.addressComponent.street + info.addressComponent.streetNumber
                 if(info.addressComponent.building){
                  this.destinationaddAera = info.addressComponent.building
                }
                else{
                  if(info.aois.length>0){
                  this.destinationaddAera = info.aois[0].name
                  }
                  else{
                  let endAddress = info.formattedAddress.split('市')
                  let endOldCityAddress = ''
                  let endNewCityAddress = ''
                  endAddress.forEach((item,index)=>{
                      if(index==0&&endAddress[index+1]!==''){
                         endAddress[index] = item + '市'
                      }
                      if(item==''){
                         endAddress[index] ='市'
                      }
                      if(index>1&&endAddress[index+1]!==''){
                        endAddress[index] = '市'+ item
                      }
                  })
                  if(endAddress[1]=='市'){
                      endOldCityAddress = endAddress[0]+endAddress[1]
                  }
                  else{
                      endOldCityAddress = endAddress[0]
                  }
                  endNewCityAddress = info.formattedAddress.replace(endOldCityAddress,'')
                  this.destinationaddAera = endNewCityAddress                     
                  }
                }
                }
                else{
                  this.endAddressName = info.pois[0].address
                  this.destinationaddAera = info.pois[0].name
                  this.endAddressCoordinate = info.pois[0].location.N+info.pois[0].location.O
                }
                break;
                case 'selectdistrictName':
                this.selectRowData3.districtName = info.formattedAddress;
                break;
                case 'selectdistrictAddress':
                this.selectRowData3.districtAddress = info.formattedAddress;
                break;
            }
        },
        openDialog(){
         this.firstblood2()
         this.driverTemplateDialogFlag = true;
         this.driverTemplateDialogFlag2 = false;
        },
        openDialog1(){
         this.firstblood2()
         this.vestAll = this.selectRowData[0];
         this.creadFlag = true;
         this.driverTemplateDialogFlag = true;
         this.driverTemplateDialogFlag2 = false;
        },
        //弹框控制
        change() {
         this.driverTemplateDialogFlag = false;
         this.openFlag='1';
         this.vestAll={
            serivceCode:null,
            districtName:null,
            districtAddress:null,
            areaCode:null,
            latitude:null,
            longitude:null,
            aflcVestUnisourceAddressaList:[
            ]
            }
            this.creadFlag = false;
        },
        // 详情控制
        openDialogView(val){
         this.formAll2.vestId =val.id
        data_get_aflcVestUnisource_Id(val.id).then(res=>{
            this.selectRowData3 = res.data
         })
         this.openFlag='0';
         this.firstblood2()
         this.driverTemplateDialogFlag2=true;
        },
        // 修改控制
        openDialogView0(){
           if(this.selectRowData.length==undefined){
              this.$message.warning('请选择您要操作的数据');
               return
           }
          else if(this.selectRowData.length == 0){
               this.$message.warning('请选择您要操作的数据');
               return
          }else if (this.selectRowData.length > 1) {
                this.$message({
                    message: '每次只能操作单条数据~',
                    type: 'warning'
                })
               this.$refs.multipleTable.clearSelection();
          }
         else{
         this.openFlag='1';
         this.formAll2.vestId = this.selectRowData[0].id
         data_get_aflcVestUnisource_Id(this.selectRowData[0].id).then(res=>{
            this.selectRowData3 = res.data
         })
         this.firstblood2()
         this.driverTemplateDialogFlag2=true;
         }

        },
        //详情弹框控制
        changeview() {
         this.driverTemplateDialogFlag2 = false;
         this.selectFlag=false
        },        
         // 提货地增加
        addpickAera(){
            if(this.pickaddAera=='')
            {
                return
            }
                if(this.pickAera.length<=1){
                        this.pickAera.push({
                        pickAeratree:this.pickaddAera,
                        startAddressCoordinate:this.startAddressCoordinate,
                        startAddressName:this.startAddressName,
                    }); 
                    this.pickaddAera=''
                }else{
                for(var i = 1;i<this.pickAera.length;i++){
                    for(var j = 0;j<this.destinationAera.length;j++)
                    {
                    if(this.pickaddAera==this.pickAera[i].pickAeratree||this.pickaddAera==this.destinationAera[j].destinationAeratree)
                    {
                        this.$message.warning('在提货地和目的地中已经存在相同的地点~');
                        return
                        break
                    }
                    else{
                        if(i==this.pickAera.length-1&&j==this.destinationAera.length-1){
                        this.pickAera.push({
                        pickAeratree:this.pickaddAera,
                        startAddressCoordinate:this.startAddressCoordinate,
                        startAddressName:this.startAddressName,
                        });
                        this.pickaddAera=''
                        return         
                        break
                        }
                    }
                    }
                }
                }
        },
        // 提货地减少
        reduceItempick(i){
          this.pickAera.splice(i,1);
        },
        // 目的地增加
        adddestinationAera(){
                if(this.destinationaddAera=='')
                {
                    return
                }
                if(this.destinationAera.length<=1){
                this.destinationAera.push({
                        destinationAeratree:this.destinationaddAera,
                        endAddressCoordinate:this.endAddressCoordinate,
                        endAddressName:this.endAddressName
                }); 
                this.destinationaddAera=''
                }else{
                for(var i = 1;i<this.destinationAera.length;i++){
                    for(var j = 0;j<this.pickAera.length;j++)
                    {
                    if(this.destinationaddAera==this.destinationAera[i].destinationAeratree||this.destinationaddAera==this.pickAera[j].pickAeratree)
                    {
                        this.$message.warning('在提货地和目的地中已经存在相同的地点~');
                        return
                        break
                    }
                    else{
                        if(i==this.destinationAera.length-1&&j==this.pickAera.length-1){
                        this.destinationAera.push({
                                destinationAeratree:this.destinationaddAera,
                                endAddressCoordinate:this.endAddressCoordinate,
                                endAddressName:this.endAddressName
                        });
                        this.destinationaddAera=''
                        return
                        break
                        }
                    }
                    }
                }
                }
        },
        // 目的地减少
        reduceItemdestination(i){
            this.destinationAera.splice(i,1);
        },
         //大表查询
        getdata_search(){
            this.page = 1;
            this.$refs.pager.inputval = this.page;
            this.$refs.pager.pageNum = this.page;
            this.firstblood();
            },
        // 大表清空
        clearSearch(){
                this.formAll = {
                    areaCode: null,
                    serivceCode:null,
                    districtName: null,
                }
                if(this.page!= 1){
                    this.page = 1;
                    this.$refs.pager.inputval = this.page;
                    this.$refs.pager.pageNum = this.page;
                }
                this.$refs.area.clearData();
                this.firstblood();
            },
         //详情表查询
        getdata_search2(){
            this.page1 = 1;
            this.$refs.pager1.inputval = this.page1;
            this.$refs.pager1.pageNum = this.page1;
            this.firstblood2();
            },
        // 详情表清空
        clearSearch2(){
                this.formAll2.endAddressName=null
                this.formAll2.startAddressName=null
                if(this.page1!= 1){
                    this.page1 = 1;
                    this.$refs.pager1.inputval = this.page1;
                    this.$refs.pager1.pageNum = this.page1;
                }
                this.firstblood2();
            },

        //大表每页显示数据量变更
        handleSizeChange: function(val) {
                this.pagesize = val;
                this.firstblood()
            },

         //大表页码变更
        handleCurrentChange: function(val) {
                this.page = val;
                this.firstblood()
            },

        //详情表每页显示数据量变更
        handleSizeChange1: function(val) {
                this.pagesize1 = val;
                this.firstblood2()
            },

         //详情表页码变更
        handleCurrentChange1: function(val) {
                this.page1 = val;
                this.firstblood2()
            },    

        //  大表选择行   
            getSelection(val){
            console.log('选中内容',val)
            this.selectRowData = val;
           },
            //点击选中当前行
            clickDetails(row, event, column){
            this.$refs.multipleTable.toggleRowSelection(row);
            },
            
        //  详情表选择行   
         clickDetails2(i){
            this.selectRowData2 = i;
        }, 

        //  大表删除行
            handleDelete(){
           if(this.selectRowData.length==undefined){
              this.$message.warning('请选择您要操作的数据');
               return
           }
          else if(this.selectRowData.length == 0){
               this.$message.warning('请选择您要操作的数据');
               return
          }else if (this.selectRowData.length > 1) {
                this.$message({
                    message: '每次只能操作单条数据~',
                    type: 'warning'
                })
               this.$refs.multipleTable.clearSelection();
          }
         else{
                this.delDataInformation();
            }          
            },
      //  详情表删除行
            handleDelete2(){
             if(!this.selectRowData2.id){
                        this.$message.info('未选中任何删除内容');
                }else{
                this.delDataInformation2();
            }  
            },
        //大表确认删除
        delDataInformation(){         
                   this.$confirm('确定要删除吗？', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(()=>{
                    data_Del_onesource(this.selectRowData[0].id).then(res=>{
                          this.$message.success('删除成功');
                        this.firstblood();       
                        this.selectRowData=''; 
                    }).catch(err => {
                        this.$message({
                            type: 'info',
                            message: '操作失败，原因：' + err.text ? err.text : err
                        })
                    })
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消'
                    })
                })   
            },

        //详情确认删除
        delDataInformation2(){         
                   this.$confirm('确定要删除吗？', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(()=>{
                    data_Del_onesourceAddress(this.selectRowData2.id).then(res=>{
                          this.$message.success('删除成功');
                        this.firstblood();       
                        this.firstblood2();       
                        this.$refs.multipleTable.clearSelection();
                    }).catch(err => {
                        this.$message({
                            type: 'info',
                            message: '操作失败，原因：' + err.text ? err.text : err
                        })
                        
                    })
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消'
                    })
                })   
            },            
        //完善数据
        completeData(){
            },

          completeData1(){
          this.completeData();
            this.vestAll.aflcVestUnisourceAddressaList=this.totalAeraData;
            if(this.totalAeraData.length==0){
                this.$message.warning('请输入至少一组提货地和目的地');
                return;
            }
            else{
            this.$refs['vestAll'].validate(valid=>{
                if(valid){
                this.driverTemplateDialogFlag=false;
                data_add_onesource_list(this.vestAll).then(res=>{
                    this.$message.success('新增成功');
                }).catch(res=>{
                   this.$message.warning(res.text);
                });
                }
                })
            }
            },
        // 启用禁用
            handleUseStates(){
           if(this.selectRowData.length==undefined){
              this.$message.warning('请选择您要操作的数据');
               return
           }
          else if(this.selectRowData.length == 0){
               this.$message.warning('请选择您要操作的数据');
               return
          }else if (this.selectRowData.length > 1) {
                this.$message({
                    message: '每次只能操作单条数据~',
                    type: 'warning'
                })
               this.$refs.multipleTable.clearSelection();
          }
         else{
                this.selectId.push(this.selectRowData[0].id)
                    
                 data_UseStates_onesource(this.selectId).then(res=>{
                     this.selectId.splice(0,1);
                     if(this.selectRowData[0].usingStatus==1)
                     {
                         this.$message.warning('已禁用');
                     }
                     else{
                         this.$message.success('已启用');
                     }
                        this.firstblood();       
                        this.$refs.multipleTable.clearSelection();
                    })
                }
            },    

        // 新增保存
        changeInfoSave1(){
          this.completeData();
            this.vestAll.aflcVestUnisourceAddressaList=this.totalAeraData;
            if(this.totalAeraData.length==0){
                this.$message.warning('请输入至少一组提货地和目的地');
                return;
            }
            else{
            this.$refs['vestAll'].validate(valid=>{
            var forms= Object.assign({}, this.vestAll)
                if(valid){
                data_add_onesource_list(forms).then(res=>{
                 this.driverTemplateDialogFlag=false;
                    this.$message.success('新增成功');
                this.firstblood()
                }).catch(res=>{
                  this.driverTemplateDialogFlag=false;
                   this.$message.warning(res.text);
                });
                }
                })
            }
        },
        // 新增地址表
        changeInfoSavaAdress(){
            this.vestAdree.id = this.vestAll.id;
            this.vestAdree.aflcVestUnisourceAddressaList=this.totalAeraData;
            data_get_onesource_addDetailAddress(this.vestAdree).then(res=>{
                 this.$message.success('新增成功');
                 this.driverTemplateDialogFlag=false;
                 this.firstblood();
            }).catch(res=>{
                this.driverTemplateDialogFlag=false;
                 this.$message.success('新增失败');
                 this.firstblood();
            })
        },
        // 修改保存
        changeInfoSave2(){
            this.selectRowData3.aflcVestUnisourceAddressaList=this.tableDataTree1;
            data_get_onesource_update(this.selectRowData3).then(res=>{
                this.firstblood()
                this.driverTemplateDialogFlag2 = false;
                this.selectFlag=false
                this.$message.success('修改成功');
                }).catch(res=>{
                this.driverTemplateDialogFlag2 = false;
                this.selectFlag=false                    
                this.$message.success('修改失败');
        });
        },
            handlePageChange(obj) {
                this.page = obj.pageNum
                this.pagesize = obj.pageSize
                this.firstblood()
            },
            handlePageChange1(obj) {
                this.page1 = obj.pageNum
                this.pagesize1 = obj.pageSize
                this.firstblood2()
            },

        // 关闭小表窗
        close1(){
        this.creadFlag = false;
        this.driverTemplateDialogFlag=false;
        this.vestAll={
            serivceCode:null,
            districtName:null,
            districtAddress:null,
            areaCode:null,
            latitude:null,
            longitude:null,
            aflcVestUnisourceAddressaList:[
            ]
            }
        },
        // 关闭小表窗
        close2(){
         this.creadFlag = false;
         this.driverTemplateDialogFlag2=false;
         this.selectFlag=false;
         this.selectRowData={};
        }
    },
    mounted(){
        this.firstblood()
        this.getMoreInformation();
    }
}
</script>

<style lang="scss">
.MjD_onesource{
    .BtnInfo{
    font-weight: bold;
    font-size: 14px;
    color: #3e9ff1;
    cursor: pointer;
    }   
    .show_pager{
        .el-input{
            width: 80px;
        }
    }
.vestonceDialog{
        display: inline-block;

    }
    .el-dialog{border-radius: 10px 10px 0px 0px;}
    .el-input {
    width: 250px;
    }
    .el-dialog .el-dialog__header{
    border-bottom: 1px solid #ccc;
    text-align: center;
    height: 40px;
    padding: 10px 0;
    color: #fff;
    font-weight: bold;
    background-color: #0b4b7c;
    }
    .price_one{
            width:105px;
            margin-right: 10px;
    }
    .price_two{
            width:105px;
            margin-left: 10px;
    }    
    .vestOrder{
        width: 100%;
        border-bottom: 2px dashed #ccc;
    }
    .vestAddress{
        display: flex;
        margin-top:10px;
        .el-input__inner{
            height: 30px;
            line-height: 30px;
        }
    .vestAera{
        flex-basis: 230px;
        margin-left:70px;
        h4{
            font-family: MicrosoftYaHei;
            font-size: 12px;
            font-weight: normal;
            font-stretch: normal;
            line-height: 20px;
            letter-spacing: 0px;
            color: #666;
            margin-bottom: 5px;
        }
        .el_vestsearch{
            width: 230px;
            height: 356px;
            margin-bottom: 12px;
            overflow: auto;
            border: 1px solid #d2d2d2;
            overflow: auto;
            .vest_rbut{
                float: right;
                margin:10px 5px 0px 10px;
            }
            .vest_section{
                width: 100%;
                float: left;
                .vest_tree{
                    display: flex;
                    align-items: center;
                    margin-top:10px;
                 .el-input{
                    flex:10;
                    margin-left:10px;   
                 }
                .vest_tree_span{
                    flex:10;
                    margin-left:15px;
                }
                button{
                    flex:1;
                    margin-left:10px;
                    margin-right: 10px;
                }
                }

            }
        }
    }
    }
    }
        .vestDialog{
        display: inline-block;
        .el-dialog{
            width: 980px;
                  }
        .vestdetail{
            width: 100%;
            margin-top:10px;
            .el-input__inner{height: 30px!important;line-height: 30px!important;}
        }
        .addvestbtn{
            margin-left:30px;
        }
    .el-dialog .el-input {
    width: 250px;
    }
    .price_one{
            width:105px;
            margin-right: 10px;
    }
    .price_two{
            width:105px;
            margin-left: 10px;
    }    
    .vestOrder{
        width: 100%;
        border-bottom: 2px dashed #ccc;
    }
    .vestAddress{
        display: flex;
        margin-top:10px;
        .el-input__inner{
            height: 30px;
            line-height: 30px;
        }
    .vestAera{
        flex-basis: 230px;
        margin-left:70px;
        h4{
            font-family: MicrosoftYaHei;
            font-size: 12px;
            font-weight: normal;
            font-stretch: normal;
            line-height: 20px;
            letter-spacing: 0px;
            color: #666;
            margin-bottom: 5px;
        }
        .el_vestsearch{
            width: 230px;
            height: 356px;
            margin-bottom: 12px;
            overflow: auto;
            border: 1px solid #d2d2d2;
            overflow: auto;
            .vest_rbut{
                float: right;
                margin:10px 5px 0px 10px;
            }
            .vest_section{
                width: 100%;
                float: left;
                .vest_tree{
                    display: flex;
                    align-items: center;
                    margin-top:10px;
                 .el-input{
                    flex:10;
                    margin-left:10px;   
                 }
                .vest_tree_span{
                    flex:10;
                    margin-left:15px;
                }
                button{
                    flex:1;
                    margin-left:10px;
                    margin-right: 10px;
                }
                }

            }
        }
    }

    }
    .adressstart 
    {
        .el-input{width:180px!important}
    } 
    .adressend {
        .el-input{width:180px!important}
       .el-form-item__label{
          text-align: left;
        }
    }
    .view_btn{
        margin-left:50px;
    }
    }
    .vestDialogBox {
        display: inline-block;
        .el-dialog{
                width: 980px!important;
        }
        .el-dialog .el-dialog__body{
                 padding: 5px 0px 0px 0px;
        }
        .chooseCityList .el-cascader .el-input
        {
            width:250px;
        }
        .el-tableTree1{
            width: 90%;
            margin:0px auto;
            .info_tab_footer{
                position: relative;
                .el-input{
                    width: 80px;
                }
                .el-input__inner{
                   margin-top: 5px;
                }
                .el-input__icon{
                    margin-top:3px
                }
            }
        }
        .el-pagination{
            text-align: right;
            margin-bottom: 13px;
            margin-top:20px;
             }
          .el-pagination__sizes .el-input{
                width: 100px!important;
            }
           .el-pagination__jump .el-input{
                width: 50px!important;
            }

}
</style>