<template>
    <div class="ordersInfo detailsArrange" >
         <div class="HredInfo collapseInfo">
          <div class="IconCase">
              <div class="IconCase_left"><img :src="CoinsGrantDriver.memberGradeImage?CoinsGrantDriver.memberGradeImage:defaultImg"></div>
              <div class="IconCase_left">
                  <h3 class="IconCase_h3">会员等级：{{CoinsGrantDriver.memberGrade}}</h3>
                  <p class="IconCase_title">有效期至：{{CoinsGrantDriver.memberExpireDateTime}}</p>
              </div>
          </div>
          <div class="IconCase">
              <div class="IconCase_left"></div>
              <div class="IconCase_left">
                  <h3 class="IconCase_h3">28币：{{CoinsGrantDriver.coinsTotal}}<span class="Iconremind">28币加速获取中，加速<span class="hrefActive">{{CoinsGrantDriver.quilckpackageMultiple?CoinsGrantDriver.quilckpackageMultiple:0}}</span>倍，还可加速<span class="hrefActive">{{CoinsGrantDriver.remainingQuickDay?CoinsGrantDriver.remainingQuickDay:0}}</span>天</span></h3>
                  <el-button type="primary" plain  @click="VipMore" size='small' class="IconCase_btn">明细</el-button>
              </div>
          </div>
         </div>
  <!-- 会员历史记录 -->
        <div class="czjl-collapse collapseInfo" v-loading="BuyMemberloading">
            <h2>会员历史记录</h2>
            <div class="essentialInformation_table" >
                <el-table
                    :data="BuyMemberDetailList"
                    border
                    style="width: 100%">
                    <el-table-column label="序号"  width="60">
                        <template slot-scope="scope">
                                {{ (BuyMemberDetailListObj.currentPage - 1)*BuyMemberDetailListObj.pageSize + scope.$index + 1 }}
                        </template>
                    </el-table-column>
                   <el-table-column label="会员等级" prop="memberGrade" show-overflow-tooltip>
                    </el-table-column>
                    <el-table-column label="购买或兑换时间" prop="createTime" show-overflow-tooltip>
                    </el-table-column>
                    <el-table-column label="有效期" prop="memberExpireDate" show-overflow-tooltip>
                    </el-table-column>
                    <el-table-column label="有效期至" prop="memberExpireDateTime" show-overflow-tooltip>
                    </el-table-column>
                    <!-- <el-table-column label="实际结束日期" prop="endTime" show-overflow-tooltip>
                    </el-table-column> -->
                </el-table>
                <el-pagination
                    background
                    @current-change="handleDriverDeposit1"
                    layout="total,prev, pager, next, jumper"
                    :total="BuyMemberDetailTotal">
                </el-pagination>
            </div>
        </div>

  <!-- 用户权益 -->
        <div class="cwgk-collapse collapseInfo">
            <h2>用户权益</h2>
            <div class="essentialInformation">
                <el-row class="selectIofo" :span='24'>
                    <!-- 第一行 -->
                    <el-col :span="3">中单等级</el-col>
                    <el-col :span="3">
                        <el-select v-model="formAll[0].gradeCode" clearable placeholder="请选择" disabled>
                                <el-option
                                    v-for="item in MidList"
                                    :key="item.code"
                                    :label="item.name"
                                    :value="item.code"
                                    :disabled="item.disabled">
                                </el-option>
                        </el-select>
                    </el-col>
                    <el-col :span="3">奖励等级</el-col>
                    <el-col :span="3">
                        <el-select v-model="formAll[1].gradeCode" clearable placeholder="请选择" :disabled="!btnStatus">
                                <el-option
                                    v-for="item in rewardList"
                                    :key="item.code"
                                    :label="item.name"
                                    :value="item.code"
                                    :disabled="item.disabled">
                                </el-option>
                        </el-select>
                    </el-col>
                    <el-col :span="3">抽佣等级</el-col>
                    <el-col :span="3">
                        <el-select v-model="formAll[2].gradeCode" clearable placeholder="请选择" :disabled="!btnStatus">
                                <el-option
                                    v-for="item in CommissionList"
                                    :key="item.code"
                                    :label="item.name"
                                    :value="item.code"
                                    :disabled="item.disabled">
                                </el-option>
                        </el-select>
                    </el-col>
                    <el-col :span="3">提现等级</el-col>
                    <el-col :span="3">
                        <el-select v-model="formAll[3].gradeCode" clearable placeholder="请选择" disabled>
                                <el-option
                                    v-for="item in carryCashList"
                                    :key="item.code"
                                    :label="item.name"
                                    :value="item.code"
                                    :disabled="item.disabled">
                                </el-option>
                        </el-select>
                    </el-col>
                </el-row>
                <h3 class="btn_h3">
                    <el-button type="primary" plain icon="el-icon-edit" v-if="!btnStatus" @click="UpdataBtn">修改</el-button>
                    <el-button type="primary" plain icon="el-icon-success" v-if="btnStatus" @click="SaveBtn">保存</el-button>  
                    <el-button type="primary" plain icon="el-icon-error" v-if="btnStatus" @click="CloseBtn">取消</el-button> 
                </h3>
            </div>
        </div>

  <!-- 用户权益手动修改记录 -->
        <div class="czjl-collapse collapseInfo" v-loading="BenefitsDetailloading">
            <h2>用户权益手动修改记录</h2>
            <div class="essentialInformation_table">
                <el-table
                    :data="BenefitsDetailList"
                    border
                    style="width: 100%">
                    <el-table-column label="序号"  width="60">
                        <template slot-scope="scope">
                            {{ (BenefitsDetailListObj.currentPage - 1)*BenefitsDetailListObj.pageSize + scope.$index + 1 }}
                        </template>
                    </el-table-column>
                   <el-table-column label="操作人" prop="creater" show-overflow-tooltip>
                    </el-table-column>
                    <el-table-column label="操作时间" prop="createTime" show-overflow-tooltip>
                    </el-table-column>
                    <el-table-column label="当前等级" prop="gradeName" show-overflow-tooltip>
                    </el-table-column>
                </el-table>
                <el-pagination
                    background
                    @current-change="handleBenefitsDetail"
                    layout="total,prev, pager, next, jumper"
                    :total="BenefitsDetailTotal">
                </el-pagination>
            </div>
        </div>

  <!-- 兑换会员记录 -->
        <div class="czjl-collapse collapseInfo" v-loading="BuyMember2loading">
            <h2>兑换会员记录</h2>
            <div class="essentialInformation_table" >
                <el-table
                    :data="BuyMemberDetailList2"
                    border
                    style="width: 100%">
                    <el-table-column label="序号"  width="60">
                        <template slot-scope="scope">
                                {{ (BuyMemberDetailListObj2.currentPage - 1)*BuyMemberDetailListObj2.pageSize + scope.$index + 1 }}
                        </template>
                    </el-table-column>
                   <el-table-column label="兑换会员等级" prop="memberGrade" show-overflow-tooltip>
                    </el-table-column>
                    <el-table-column label="兑换扣回28币" prop="platformCoinPrice" show-overflow-tooltip>
                    </el-table-column>
                    <el-table-column label="会员有效期" prop="memberExpireDate" show-overflow-tooltip>
                    </el-table-column>
                    <el-table-column label="会员有效期至" prop="memberExpireDateTime" show-overflow-tooltip>
                    </el-table-column>
                    <el-table-column label="兑换时行为分" prop="minBehaviorScore" show-overflow-tooltip>
                    </el-table-column>
                    <el-table-column label="原会员等级" prop="primaryMemberGrade" show-overflow-tooltip>
                    </el-table-column>
                    <el-table-column label="原会员等级有效期至" prop="primaryMemberExpireTime" show-overflow-tooltip>
                    </el-table-column>
                    <el-table-column label="兑换城市" prop="location" show-overflow-tooltip>
                    </el-table-column>
                    <el-table-column label="兑换时间" prop="createTime" show-overflow-tooltip>
                    </el-table-column>
                </el-table>
                <el-pagination
                    background
                    @current-change="handleDriverDeposit2"
                    layout="total,prev, pager, next, jumper"
                    :total="BuyMemberDetailTotal2">
                </el-pagination>
            </div>
        </div>

  <!-- 购买会员记录 -->
        <div class="czjl-collapse collapseInfo" v-loading="BuyMember3loading">
            <h2>购买会员记录</h2>
            <div class="essentialInformation_table" >
                <el-table
                    :data="BuyMemberDetailList3"
                    border
                    style="width: 100%">
                    <el-table-column label="序号"  width="60">
                        <template slot-scope="scope">
                                {{ (BuyMemberDetailListObj3.currentPage - 1)*BuyMemberDetailListObj3.pageSize + scope.$index + 1 }}
                        </template>
                    </el-table-column>
                   <el-table-column label="购买会员等级" prop="memberGrade" show-overflow-tooltip>
                    </el-table-column>
                    <el-table-column label="金额" prop="buyPrice" show-overflow-tooltip>
                    </el-table-column>
                    <!-- <el-table-column label="支付方式" prop="" show-overflow-tooltip>
                    </el-table-column> -->
                    <el-table-column label="支付状态" prop="payStatus" show-overflow-tooltip>
                        <template  slot-scope="scope">
                                {{scope.row.payStatus == '1' ? '已支付' : '未支付'}}
                        </template>
                    </el-table-column>
                    <el-table-column label="会员有效期" prop="memberExpireDate" show-overflow-tooltip>
                    </el-table-column>
                    <el-table-column label="会员有效期至" prop="memberExpireDateTime" show-overflow-tooltip>
                    </el-table-column>
                    <el-table-column label="购买时行为分" prop="minBehaviorScore" show-overflow-tooltip>
                    </el-table-column>
                    <el-table-column label="原会员等级" prop="primaryMemberGrade" show-overflow-tooltip>
                    </el-table-column>
                    <el-table-column label="原会员等级有效期至" prop="primaryMemberExpireTime" show-overflow-tooltip>
                    </el-table-column>
                    <el-table-column label="购买地" prop="location" show-overflow-tooltip>
                    </el-table-column>
                    <el-table-column label="购买时间" prop="createTime" show-overflow-tooltip>
                    </el-table-column>
                </el-table>
                <el-pagination
                    background
                    @current-change="handleDriverDeposit3"
                    layout="total,prev, pager, next, jumper"
                    :total="BuyMemberDetailTotal3">
                </el-pagination>
            </div>
        </div>

  <!-- 购买加速包记录 -->
        <div class="czjl-collapse collapseInfo" v-loading="BuyQuickpackageloading">
            <h2>购买加速包记录</h2>
            <div class="essentialInformation_table">
                <el-table
                    :data="BuyQuickpackageDetail"
                    border
                    style="width: 100%">
                    <el-table-column label="序号"  width="60">
                        <template slot-scope="scope">
                                {{ (BuyQuickpackageDetailObj.currentPage - 1)*BuyQuickpackageDetailObj.pageSize + scope.$index + 1 }}
                        </template>
                    </el-table-column>
                   <el-table-column label="购买加速包名称" prop="quilckpackageName" show-overflow-tooltip>
                    </el-table-column>
                    <el-table-column label="加速倍数" prop="quilckpackageMultiple" show-overflow-tooltip>
                    </el-table-column>
                    <el-table-column label="金额" prop="purchasingPrice" show-overflow-tooltip>
                    </el-table-column>
                    <el-table-column label="支付方式" prop="payType" show-overflow-tooltip>
                        <template  slot-scope="scope">
                                <span v-if="scope.row.payType =='0'">支付宝</span>
                                <span v-if="scope.row.payType =='1'">微信</span>
                                <span v-if="scope.row.payType =='2'">余额支付</span>
                        </template>
                    </el-table-column>
                    <el-table-column label="支付状态" prop="payStatus" show-overflow-tooltip>
                        <template  slot-scope="scope">
                                {{scope.row.payStatus == '1' ? '已支付' : '未支付'}}
                        </template>
                    </el-table-column>
                    <el-table-column label="加速有效期" prop="quilckpackageExpireDate" show-overflow-tooltip>
                    </el-table-column>
                    <el-table-column label="加速有效期至" prop="quilckpackageExpireEndTime" show-overflow-tooltip>
                    </el-table-column>
                    <el-table-column label="购买时会员等级" prop="memberGrade" show-overflow-tooltip>
                    </el-table-column>
                    <el-table-column label="会员等级有效期至" prop="memberExpireEndTime" show-overflow-tooltip>
                    </el-table-column>
                    <el-table-column label="购买地" prop="belongCityName" show-overflow-tooltip>
                    </el-table-column>
                    <el-table-column label="购买时间" prop="buyTime" show-overflow-tooltip>
                    </el-table-column>
                </el-table>
                <el-pagination
                    background
                    @current-change="handleDriverDeposit4"
                    layout="total,prev, pager, next, jumper"
                    :total="BuyQuickpackageDetailTotal">
                </el-pagination>
            </div>
        </div>
    </div> 
    </template>
    

<script>
import { getDictionary } from '@/api/common.js'
import {aflcCoinsGrantDriverDetail,aflcDriverBuyMemberDetailList,aflcBuyQuickpackageDetailList,aflcUserBenefitsDetailList,aflcUserBenefitsDetail} from '@/api/users/carDetails/index.js'
import { parseTime } from '@/utils/index.js'
import {data_get_driverName_id} from "@/api/users/carowner/all_car.js";
export default {
    props: {
    isvisible: {
        type: Boolean,
        default: false
      }
    }, 
    data(){
        return{
            BenefitsDetailloading:true, //用户权益修改记录记录Load
            BuyMemberloading:true,  //会员记录Load
            BuyMember2loading:true,  //兑换会员Load
            BuyMember3loading:true,  //购买会员Load
            BuyQuickpackageloading:true, //购买加速包Load
            defaultImg:'/static/test.jpg',//默认第一张图片的url   
            mobile:'',
            MidList:[],
            rewardList:[],
            CommissionList:[],
            carryCashList:[],
            formAll:[
                {accountId:this.$route.query.driverId,benefitsType:0,gradeCode:null,mobile:null,},
                {accountId:this.$route.query.driverId,benefitsType:1,gradeCode:null,mobile:null},
                {accountId:this.$route.query.driverId,benefitsType:2,gradeCode:null,mobile:null},
                {accountId:this.$route.query.driverId,benefitsType:3,gradeCode:null,mobile:null}
            ],
            BuyMemberDetailList:[],
            BuyMemberDetailTotal:0,
            BuyMemberDetailListObj:{
            currentPage: 1,
            pageSize: 10,
            vo:{
                driverId:this.$route.query.driverId,
            }
            },

            BuyMemberDetailList:[],
            BuyMemberDetailTotal:0,
            BuyMemberDetailListObj:{
            currentPage: 1,
            pageSize: 10,
            vo:{
                driverId:this.$route.query.driverId,
                detailType:''
            }
            },

            BuyMemberDetailList2:[],
            BuyMemberDetailTotal2:0,
            BuyMemberDetailListObj2:{
            currentPage: 1,
            pageSize: 10,
            vo:{
                driverId:this.$route.query.driverId,
                detailType:'exchange'
            }
            },

            BuyMemberDetailList3:[],
            BuyMemberDetailTotal3:0,
            BuyMemberDetailListObj3:{
            currentPage: 1,
            pageSize: 10,
            vo:{
                driverId:this.$route.query.driverId,
                detailType:'buy'
            }
            },

            BuyQuickpackageDetail:[],
            BuyQuickpackageDetailTotal:0,
            BuyQuickpackageDetailObj:{
            currentPage: 1,
            pageSize: 10,
            vo:{
                driverId:this.$route.query.driverId,
            }
            },
            DriverDepositList:[],
            DriverDepositTotal:0,
            // 用户权益
            BenefitsDetailListObj:{   
            currentPage: 1,
            pageSize: 10,
            vo: {
                accountId: this.$route.query.driverId,
            }
            },
            BenefitsDetailList:[],
            BenefitsDetailTotal:0,
            CoinsGrantDriver:{},
            btnStatus:false,
        }
    },
    methods:{
        // 获取数据
        firstblood(){
         aflcCoinsGrantDriverDetail(this.$route.query.driverId).then(res=>{
            this.CoinsGrantDriver = res.data
            this.CoinsGrantDriver.memberExpireDateTime = parseTime(this.CoinsGrantDriver.memberExpireDateTime,"{y}-{m}-{d} {h}:{i}:{s}");
         })
        },

        // 更多
        VipMore(){
        this.$router.push({ name: '28币车主账户明细'})
        },
        //初始化获取数据字典
        getMoreInformation(){
            // 中单等级
            getDictionary('AF00503').then(res=>{
            this.MidList = res.data
            })
            // 奖励等级
            getDictionary('AF00207').then(res=>{
            this.rewardList = res.data
            })
            // 抽佣等级
            getDictionary('AF00206').then(res=>{
            this.CommissionList = res.data
            })
            // 提现等级
            getDictionary('AF00209').then(res=>{
            this.carryCashList = res.data
            })
            data_get_driverName_id(this.$route.query.driverId).then(res => {
            this.mobile = res.data.driverMobile
            this.formAll[0].gradeCode = res.data.obtainGrade
            this.formAll[1].gradeCode = res.data.rewardgrade
            this.formAll[2].gradeCode = res.data.commisionLevel
            }).catch(err => {
            this.$message.error('获取数据失败')
            })
        },

        // 用户权益手动修改记录
        BenefitsDetail(){
        this.BenefitsDetailloading = true
         aflcUserBenefitsDetailList(this.BenefitsDetailListObj).then(res=>{
            this.BenefitsDetailList = res.data.list;
            this.BenefitsDetailTotal =res.data.totalCount;
            this.BenefitsDetailList.forEach(item => {
                        item.createTime = parseTime(item.createTime,"{y}-{m}-{d} {h}:{i}:{s}");
            })
            this.BenefitsDetailloading = false
         })
        },
        //用户权益手动修改记录分页
        handleBenefitsDetail(){
        this.BenefitsDetailListObj.currentPage = val;
            this.BenefitsDetail();
        },
        // 会员历史记录
        DriverBuyMember(){
        this.BuyMemberloading = true
        aflcDriverBuyMemberDetailList(this.BuyMemberDetailListObj).then(res => {
                this.BuyMemberDetailList = res.data.list;
                this.BuyMemberDetailTotal =res.data.totalCount;
                this.BuyMemberDetailList.forEach(item => {
                        item.createTime = parseTime(item.createTime,"{y}-{m}-{d} {h}:{i}:{s}");
                        item.memberExpireDateTime = parseTime(item.memberExpireDateTime,"{y}-{m}-{d} {h}:{i}:{s}");
                    })
                this.BuyMemberloading = false    
            })
        },
        // 会员历史记录分页
        handleDriverDeposit1(val){
        this.BuyMemberDetailListObj.currentPage = val;
            this.DriverBuyMember();
        },

        // 兑换会员记录
        DriverBuyMember2(){
        this.BuyMember2loading = true    
        aflcDriverBuyMemberDetailList(this.BuyMemberDetailListObj2).then(res => {
                this.BuyMemberDetailList2 = res.data.list;
                this.BuyMemberDetailTotal2 =res.data.totalCount;
                this.BuyMemberDetailList2.forEach(item => {
                        item.createTime = parseTime(item.createTime,"{y}-{m}-{d} {h}:{i}:{s}");
                        item.memberExpireDateTime = parseTime(item.memberExpireDateTime,"{y}-{m}-{d} {h}:{i}:{s}");
                        item.primaryMemberExpireTime = parseTime(item.primaryMemberExpireTime,"{y}-{m}-{d} {h}:{i}:{s}");
                    })
                this.BuyMember2loading = false    
            })
        },
        // 兑换会员记录分页
        handleDriverDeposit2(val){
        this.BuyMemberDetailListObj2.currentPage = val;
        this.DriverBuyMember2();
        },

        // 购买会员记录
        DriverBuyMember3(){
        this.BuyMember3loading = true    
        aflcDriverBuyMemberDetailList(this.BuyMemberDetailListObj3).then(res => {
                this.BuyMemberDetailList3 = res.data.list;
                this.BuyMemberDetailTotal3 =res.data.totalCount;
                console.log('minBehaviorScore',this.BuyMemberDetailList3)
                this.BuyMemberDetailList3.forEach(item => {
                        item.createTime = parseTime(item.createTime,"{y}-{m}-{d} {h}:{i}:{s}");
                        item.memberExpireDateTime = parseTime(item.memberExpireDateTime,"{y}-{m}-{d} {h}:{i}:{s}");
                        item.primaryMemberExpireTime = parseTime(item.primaryMemberExpireTime,"{y}-{m}-{d} {h}:{i}:{s}");
                    })
                this.BuyMember3loading = false    
            })
        },
        // 购买会员记录分页
        handleDriverDeposit3(val){
        this.BuyMemberDetailListObj3.currentPage = val;
        this.DriverBuyMember3();
        },

        // 购买加速包记录
        BuyQuickpackage(){
        this.BuyQuickpackageloading = true    
        aflcBuyQuickpackageDetailList(this.BuyQuickpackageDetailObj).then(res => {
                this.BuyQuickpackageDetail = res.data.list;
                this.BuyQuickpackageDetailTotal =res.data.totalCount;
                this.BuyQuickpackageDetail.forEach(item => {
                        item.buyTime = parseTime(item.buyTime,"{y}-{m}-{d} {h}:{i}:{s}");
                        item.memberExpireEndTime = parseTime(item.memberExpireEndTime,"{y}-{m}-{d} {h}:{i}:{s}");
                        item.quilckpackageExpireEndTime = parseTime(item.quilckpackageExpireEndTime,"{y}-{m}-{d} {h}:{i}:{s}");
                })
                this.BuyQuickpackageloading = false    
            })
        },
        // 购买加速包记录分页
        handleDriverDeposit4(val){
        this.BuyQuickpackageDetailObj.currentPage = val;
        this.BuyQuickpackage();
        },

        // 修改
        UpdataBtn(){
        this.btnStatus = true
        },
        // 保存
        SaveBtn(){
        this.formAll.forEach(i=>{
            i.mobile = this.mobile
        })
        aflcUserBenefitsDetail(this.formAll).then(res => {
            this.$message.success('保存成功')
            this.BenefitsDetail()
        }).catch(err => {
            this.$message.error('保存失败')
        })
        },
        // 取消按钮
        CloseBtn(){
        this.btnStatus = false
        },
        handleDriverDeposit(){
         
        }
    },
    watch: {
        isvisible: {
            handler(newVal, oldVal) {
                if (newVal) {
                    this.getMoreInformation()
                    this.firstblood()
                    this.BenefitsDetail()
                    this.DriverBuyMember()
                    this.DriverBuyMember2()
                    this.DriverBuyMember3()
                    this.BuyQuickpackage()
                }
            },
            immediate: true
        },
    },
    }
</script>

<style lang="scss" scoped>
.detailsArrange{
    .HredInfo{
        display: flex;
        padding: 36px 0 18px 0;
        .IconCase{
        flex: 1;
        &:nth-child(1){
            margin-left:20px;
        }
        .IconCase_left{
            float: left;
        }
        img{
           width: 50px;
           height: 50px;
           margin-right: 20px;
        }
        .Iconremind{
            text-indent:8px;
            display:inline-block;
            font-size: 12px;
            color: #bbb
        }
        .IconCase_title{
            margin-top: 20px;
        }
        .IconCase_btn{
            margin-top: 10px;
        }
        .hrefActive{
            color: #03a9f4;
        }
        }
    }
    .selectIofo{
        border-top: 1px solid #e6e6e6;
        border-left: 1px solid #e6e6e6;
    .el-col{
        font-size: 14px;
        line-height: 20px;
        height: 45px;
        padding: 1px 0px 0px 0px;
        border-right: 1px solid #e6e6e6;
        border-bottom: 2px solid #e6e6e6;
        &:nth-child(odd){
        background: #fafafa;
        text-align: right;
        padding: 12px 10px;
        }
    }
    }
   .btn_h3{
       text-align: center;
       padding-top:10px;
       line-height: 35px;
   }
}
</style>

        