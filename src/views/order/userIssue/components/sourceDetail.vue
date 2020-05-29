<template>
    <div class="sourceDetail clearfix OrderLog" v-if="formData.length != 0">
        <!-- 基本信息 -->
        <div class="orderInfo-collapse collapseInfo" >
            <h2>基础信息</h2>
            <div class="essentialInformation">
                <p>
                    <span>货源编号：</span>
                    <span>{{formData.orderSerial}}</span>
                 </p>
                <p>
                    <span>所属区域：</span>
                    <span>{{formData.startProvince}}{{formData.startCity}}{{formData.startArea}}</span>
                 </p>
                <p>
                    <span>货主账号：</span>
                    <span>{{formData.shipperMobile}}</span>
                 </p>
                <p>
                    <span>货主姓名：</span>
                    <span>{{formData.shipperName}}</span>
                 </p>
             </div>
             <div class="essentialInformation">
                <p>
                    <span>货源状态：</span>
                    <span>{{formData.operateStateName}}</span>
                 </p>
                <p>
                    <span>发布时间：</span>
                    <span>{{formData.useTime}}</span>
                </p>
                 <p>
                    <span>货源来源：</span>
                    <span>{{formData.orderFromName}}</span>
                 </p>
                 <p>
                    <span>订单类型：</span>
                    <span>{{formData.orderTypeName}}</span>
                 </p>
             </div>
        </div>
        <!-- 线路信息 -->
        <div class="orderInfo-collapse collapseInfo" v-if="formData.orderAddressDtoList">
            <h2>线路信息</h2>
            <div class="essentialInformation">
                <p>
                    <span>发货地：</span>
                    <span v-if="formData.orderAddressDtoList.length>0">{{formData.orderAddressDtoList[0].viaAddressName}}</span>
                 </p>
                <p>
                    <span>街道/门牌号：</span>
                    <span v-if="formData.orderAddressDtoList.length>0">{{formData.orderAddressDtoList[0].viaAddress}}</span>
                 </p>
                <p>
                    <span>发货人：</span>
                    <span v-if="formData.orderAddressDtoList.length>0">{{formData.orderAddressDtoList[0].contacts}}</span>
                 </p>
                <p>
                    <span>联系方式：</span>
                    <span v-if="formData.orderAddressDtoList.length>0">{{formData.orderAddressDtoList[0].contactsPhone}}</span>
                 </p>
            </div>
            <div class="essentialInformation">
                <p>
                    <span>目的地：</span>
                    <span v-if="formData.orderAddressDtoList.length>0">{{formData.orderAddressDtoList[1].viaAddressName}}</span>
                 </p>
                <p>
                    <span>街道/门牌号：</span>
                   <span v-if="formData.orderAddressDtoList.length>0">{{formData.orderAddressDtoList[1].viaAddress}}</span>
                 </p>     
                <p>
                    <span>收货人：</span>
                    <span v-if="formData.orderAddressDtoList.length>0">{{formData.orderAddressDtoList[1].contacts}}</span>
                 </p>
                <p>
                    <span>联系方式：</span>
                    <span v-if="formData.orderAddressDtoList.length>0">{{formData.orderAddressDtoList[1].contactsPhone}}</span>
                 </p>                 
            </div>
        </div>
        <!-- 货物信息 -->
        <div class="orderInfo-collapse collapseInfo" v-if='formData.orderGoodsDtoList'>
            <h2>货物信息</h2>
            <div class="essentialInformation">
                <p>
                    <span>处理状态：</span>
                    <span><el-button type="primary" size="mini" @click="orderOnclick" class="orderBtn" >{{orderBtn}}</el-button></span>
                 </p>
                <p>
                    <span>货源类型：</span>
                    <span v-if="formData.orderType=='AF01702'">{{formData.useCarTypeName}}<i v-if="formData.useCarTypeName">/</i>{{formData.orderClassName}}</span>
                    <span v-else>{{formData.useCarTypeName}} <i v-if="formData.useCarTypeName">/</i> {{formData.specName}} <i v-if="formData.specName">/</i> {{formData.orderClassName}}</span>
                 </p>
                <p>
                    <span>装货时间：</span>
                    <span>{{formData.loadingTime}} {{formData.loadingTimeFragmentName}}</span>
                 </p>
                <p>
                    <span>出价：</span>
                    <span class="fontRed">{{formData.forecastPrice? '￥' + formData.forecastPrice:'面议'}}</span>
                 </p>              
            </div>
            <div class="essentialInformation">
            <el-table style="width: 100%" ref="multipleTable" stripe border height="100%" highlight-current-row :data="orderGoodsList">
           <el-table-column label="序号"  width="80">
                            <template slot-scope="scope">
                             {{ (page - 1)*pagesize + scope.$index + 1 }}
                            </template>
            </el-table-column>
            <el-table-column  label="货品名称" prop="goodsTypeName" sortable></el-table-column>
            <el-table-column  label="数量" prop="goodsNum" sortable></el-table-column>
            <el-table-column  label="总重量（公斤）" prop="goodsWeight" sortable></el-table-column>
            <el-table-column  label="总体积（体积）" prop="goodsVolume" sortable></el-table-column>
           </el-table>
            </div>
            <div class="essentialInformation">
            <div class="orderBtnClass"><span>合计：{{goodsNumTotal?goodsNumTotal:''}}件 / {{goodsWeightTotal?goodsWeightTotal.toFixed(1):''}}公斤 / {{goodsVolumeTotal?goodsVolumeTotal.toFixed(1):''}}立方</span></div>
            </div>   
        </div>
        <!-- 额外服务 -->
        <div class="orderInfo-collapse collapseInfo" >
            <h2>额外服务</h2>
            <div class="essentialInformation">
                <p>
                    <span>上门提货 ：</span>
                    <span>{{formData.isDoorPickUp=='1'?'需要':'不需要'}}</span>
                 </p>
                <p>
                    <span>回单：</span>
                    <span>{{formData.isReceipt==true?'需要':'不需要'}}<i v-if='formData.isReceipt==true'>({{formData.orderExtraCodesName}})</i></span>
                 </p>              
                <p>
                    <span>送货上门：</span>
                    <span>{{formData.isDoorDelivery=='1'?'需要':'不需要'}}</span>
                 </p>
            </div>
            <div class="essentialInformation">
                <p class="remarkBox">
                    <span>备注：</span>
                    <span>{{formData.remark}}</span>
                 </p>              
            </div>  
        </div>

        <!-- 成交设置 -->
        <div class="orderInfo-collapse collapseInfo" >
            <h2>成交设置 
            <el-tooltip class="item" effect="dark" content="货主同平台承运商达成线下交易后，请选择成交的承运商进行标识，不可修改" placement="top-start">    
            <el-button type="text" plain size="mini" icon="el-icon-question" circle class="quetion_icon"></el-button> 
            </el-tooltip>
            </h2>
            <div class="essentialInformation">
                <p>
                    <span>成交对象 ：</span>
                    <el-tooltip class="item" effect="dark" :content="ObjectString.companyName" :disabled='!ObjectString.companyName' placement="top-start">   
                    <span><el-input @focus='TransactionObject()' v-model="ObjectString.companyName" :disabled="ObjectString.companyName!==''" class="companyNameInput"></el-input></span>
                    </el-tooltip>
                 </p>         
            </div>
        </div>

        <!-- 客服备注 -->
        <div class="orderInfo-collapse collapseInfo">
            <h2>客服备注 <el-button type="primary"  plain  size="mini" icon="el-icon-edit" class="btn_right" @click="dialogVisible = true">编辑</el-button></h2>
            <div  v-if="custsvcObject.length>0">
            <div class="essentialInformation b_border" v-for ="(index, keys) in custsvcObject" :key='keys'>
                <h4>
                    由 <span class="fontBlue">{{index.creater}}</span> 更新于 <span class="fontBlue">{{index.createTime}}</span>
                 </h4>         
                 <p class="text_2p">{{index.remark}}</p>
            </div>
            </div>
            <div class="essentialInformationNull" v-else>
                    <img src="../../../../assets/icom/25xinxi.png" alt="">
                    <span>客服未备注!</span>
            </div>
        </div>
    
        <!-- 客服备注弹框 -->
        <el-dialog :visible.sync="dialogVisible" width="30%" :closeOnClickModal='false'>
                        <el-input
                                type="textarea"
                                    :rows="5"
                                    placeholder="1-500间的字符" 
                                    maxlength="500"
                                    ref="infofocus"
                                    v-model="remark"
                                    clearable>
                                </el-input>
                              <p class="countNum">
                             <span>{{remark.length}}</span>/<span class="textarea_max"> 500</span> 
                        </p>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="custsvcAdd">确 定</el-button>
            </span>
        </el-dialog>
        
        <div class="commoncss">
         <el-dialog title="选择成交对象" :visible="driverTemplateDialogFlag" :closeOnClickModal='false' :before-close="change">
        <el-form inline>
         <el-row>
             <el-col :span="6">
                 <el-form-item label-width="150px" >
                  <el-input v-model="formDatadialog.keywordQuery" placeholder="用户名称/手机账号"></el-input>
                 </el-form-item>
             </el-col>
             <el-col :span="18">
                 <el-form-item>
                  <el-button type="primary" icon="el-icon-search" plain @click="searchBtn">搜索</el-button>
                  <el-button type="primary" icon="fontFamily aflc-icon-qingkong" plain @click="clearSearch">重置</el-button>
                 </el-form-item>
             </el-col>
         </el-row>
         <el-row>
           <el-col :span="24">
                <el-table ref="multipleTable" :data="tableDataAll" stripe border height="100%" @selection-change = "getinfomation" tooltip-effect="dark" @row-click="clickDetails" style="width: 100%;min-height:376px;">
                    <el-table-column type="selection" width="55"></el-table-column>
                    <el-table-column label="序号" width="60px">
                        <template slot-scope="scope">
                        {{ (page - 1)*pagesize + scope.$index + 1 }}
                        </template>
                    </el-table-column> 
                    <el-table-column sortable prop="companyName" label="物流公司"></el-table-column>
                    <el-table-column sortable prop="account" label="手机账号"></el-table-column>
                </el-table>
            </el-col>
         </el-row>
        </el-form>
        <div class="info_tab_footer1">共计:{{ dataTotal }} <div class="show_pager"> <Pager :total="dataTotal" @change="handlePageChange"  :sizes="sizes" ref="pager"/></div> </div>
            <div slot="footer" class="dialog-footer">
                <el-button type="primary" plain  @click="add_data">确 定</el-button>
                <el-button type="primary" plain  @click="driverTemplateDialogFlag=false">取 消</el-button>
            </div>
         </el-dialog>
        </div>
    </div>
</template>

<script>
import {getFCLOrderByOrderSerial,findCompanyWebPageList,custsvcDealWith,editDealState} from '@/api/order/userIssue/userIssue.js'
import { parseTime,pickerOptions2 } from '@/utils/index.js'
import Pager from '@/components/Pagination/index'
export default {
    components:{
    Pager
    },
    data(){
        return{
            dialogVisible:false,
            driverTemplateDialogFlag:false,
            orderBtn:'处理完成',
            formData:[],
            selectRowData: {},
            sizes: [10, 20, 30],
            pagesize: 10, // 初始化加载数量
            page: 1, // 初始化页码
            dataTotal: 0,
            tableDataAll: [],
            formDatadialog:{
                keywordQuery:null
            },
            goodsNumTotal:0,
            goodsWeightTotal:0,
            goodsVolumeTotal:0,
            ObjectString:{
                companyId:'',
                companyName:'',
            },
            orderGoodsList:[],
            remark:'',
            custsvcObject:[],
        }
    },
    watch:{
    driverTemplateDialogFlag:{
            handler: function(val, oldVal) {
            if (!val) {
            this.$refs.multipleTable.clearSelection()
            this.page = 1;
            this.$refs.pager.inputval = this.page;
            this.$refs.pager.pageNum = this.page;
            this.formDatadialog.keywordQuery = null
            }
            }
    },
    dialogVisible:{
            handler: function(val, oldVal) {
            if (!val) {
                this.remark = ''
            }
            }        
    }
    },
    methods:{
        orderOnclick(){
            if(this.orderBtn=='处理完成'){
            editDealState(this.$route.query.orderSerial,1).then(res=>{
            })
                this.orderBtn='变更为待处理'
            }
            else{
            editDealState(this.$route.query.orderSerial,0).then(res=>{
            })
                this.orderBtn ='处理完成'
            }
        },
        // 选择成交对象
        TransactionObject(){
        this.Infotion()
        this.driverTemplateDialogFlag = true
        },
        change(){
        this.driverTemplateDialogFlag = false
        },
        firstblood(){
            getFCLOrderByOrderSerial(this.$route.query.orderSerial).then(res=>{
            var that = this
            this.formData = res.data
            this.formData.useTime = parseTime(this.formData.useTime,"{y}-{m}-{d} {h}:{i}:{s}");
            if(this.formData.loadingTime){
            this.formData.loadingTime = this.formData.loadingTime.split(' ')[0]
            }
            if(that.formData.tradeAreaId)
            {
            if(that.formData.orderTradeGoodsList.length>0){
                this.orderGoodsList = that.formData.orderTradeGoodsList
                this.orderGoodsList.forEach(item => {
                    this.goodsNumTotal += Number(item.goodsNum)
                    this.goodsWeightTotal += Number(item.goodsWeight)
                    this.goodsVolumeTotal += Number(item.goodsVolume)
                });
            }
            }
            else{
                if(that.formData.orderGoodsDtoList.length>0){
                    this.orderGoodsList = that.formData.orderGoodsDtoList
                    this.orderGoodsList.forEach(item => {
                    this.goodsNumTotal += Number(item.goodsNum)
                    this.goodsWeightTotal += Number(item.goodsWeight)
                    this.goodsVolumeTotal += Number(item.goodsVolume)
                });
                }
            }
            if(this.formData.orderCustsvcList.length>0){
                this.custsvcObject = []
                this.formData.orderCustsvcList.forEach(item=>{
                    item.createTime = parseTime(item.createTime,"{y}-{m}-{d} {h}:{i}:{s}");
                    if(item.operateType == '2'){
                        this.ObjectString.companyName = item.companyName
                    }
                    else{
                        this.custsvcObject.push(item)
                    }
                })
            }
            if(this.formData.dealState==1){
             this.orderBtn='变更为待处理'
            }
            else{
            this.orderBtn='处理完成'
            }
            })
            },
        // 判断选中与否
        getinfomation(val) {
        console.log('选中内容', val)
        this.selectRowData = val
        },
        // 点击选中当前行
        clickDetails(row, event, column) {
        this.$refs.multipleTable.toggleRowSelection(row)
        },
        // 每页显示数据量变更
        handlePageChange(obj) {
        this.page = obj.pageNum
        this.pagesize = obj.pageSize
        this.Infotion()
        },
        // 搜索
        searchBtn(){
            this.page = 1;
            this.$refs.pager.inputval = this.page;
            this.$refs.pager.pageNum = this.page;
            this.Infotion();
        },
        // 清空成交独享列表
        clearSearch(){
        this.page = 1;
        this.$refs.pager.inputval = this.page;
        this.$refs.pager.pageNum = this.page;
        this.formDatadialog.keywordQuery = null
        this.Infotion();
        },
        // 增加成交对象
        add_data(){ 
            if(this.selectRowData.length!==1){
                this.$message.warning('请选择单条成交对象')
            }
            else{
            this.ObjectString.companyId = this.selectRowData[0].id
            this.ObjectString.companyName = this.selectRowData[0].companyName + '(' + this.selectRowData[0].account + ')'
            custsvcDealWith({orderSerial:this.$route.query.orderSerial,operateType:2,companyId:this.ObjectString.companyId,companyName:this.ObjectString.companyName}).then(res=>{
              this.$message.success('增加成交对象成功')
              this.firstblood()
            }).catch(err=>{
              this.$message.error('增加成交对象失败')
            })
            this.driverTemplateDialogFlag = false
            }
        },
        custsvcAdd(){
            if(!this.remark){
                this.$message.error('客服备注不能为空，不能提交')
            }else{
            custsvcDealWith({orderSerial:this.$route.query.orderSerial,operateType:1,remark:this.remark}).then(res=>{
              this.$message.success('增加客服备注成功')
              this.firstblood()
            }).catch(err=>{
              this.$message.error('增加客服备注失败')
            })
              this.dialogVisible = false
            }
        },
        Infotion(){
            findCompanyWebPageList(this.page, this.pagesize,this.formDatadialog).then(res=>{
                    this.dataTotal = res.data.totalCount
                    this.tableDataAll = res.data.list
              })
        }
    },
    mounted(){
        this.firstblood()
        this.Infotion()
    }
}
</script>

<style lang="scss">
.sourceDetail{
        height: 100%;
        .b_border{border-bottom:1px dashed #bbb}
        .fontBlue{color: #66b1ff}
        .el-input__inner{height: 30px;}
        .quetion_icon{
            padding: 0px;
        }
        .collapseInfo{
            border: 1px solid #e2e2e2;
            box-shadow: 2px 2px 2px 2px rgba(0, 0, 0, 0.1);
            background: #ffffff;
            color: #333;
            padding: 0 24px;
            padding-bottom: 10px;
            margin-bottom: 12px;
            h2{
                font-size: 16px;
                line-height: 20px;
                padding: 19px 0 10px 0;
                // border-bottom: 1px solid #e2e2e2; 
            }
            .essentialInformation{
                font-size: 14px;
                margin: 5px;
                p{
                    display: inline-block;
                    color:#333333;
                    line-height: 30px;
                    vertical-align: top;
                    width: 24%;
                    font-size: 14px;
                    overflow: hidden;
                    white-space: nowrap;
                    text-overflow: ellipsis;
                    margin-right: 10px;
                    .spanDiv{
                        display: block;
                    }
                    span{
                        color:#333;
                        display: inline-block;
                        overflow: hidden;
                        white-space: nowrap;
                        text-overflow:ellipsis;
                        height: 30px;
                        .el-rate__icon{
                            line-height: 30px;
                        }
                    }
                    .fontRed{color: red;}
                    span:first-child{
                        text-align: center;
                    }
                    .routerJump{
                        cursor: pointer;
                    }
                }
                .minwidth{
                    width: 200px;
                }
                .morewidth{
                    width: 48.8%;
                }
                .lesswidth{
                    width: 521px;
                }
                .markInfo{
                    width: 50%;
                }
                .text_2p{
                    text-indent: 28px;
                    margin-bottom: 5px;
                    overflow: inherit
                }
                .remarkBox{
                    width: 100%;
                }
            }
        }
        .orderBtn{
            height: 30px;
            span{
                color: #fff!important
            }
        }
        .orderBtnClass{
            text-align: right;
            margin:10px 24px;
        }
        .btn_right{
            float: right;
        }
        .countNum{
            text-align: right;
        .textarea_max{
            color: red
        }
        }
        .essentialInformationNull{
                font-size: 14px;
                font-weight: bold;
                margin: 20px;
                padding-left: 40%;
                img{
                    vertical-align: middle;
                }
                span{
                    margin-left: 10px;
                    vertical-align: middle;
                }
            }
    .info_tab_footer1{
        height: 40px;
        line-height: 40px;
        background: #EDEDED;
        .el-input__inner{
            margin-top:5px;
        }
        .el-input__suffix{
            line-height: 40px;
        }
    }
    .companyNameInput{
        width: 300px;
    }
    }
</style>
