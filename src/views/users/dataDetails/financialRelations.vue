<template>
  <div class="ordersInfo detailsArrange" v-loading="loading">
    <!-- 财务概况 -->
    <div class="cwgk-collapse collapseInfo">
      <h2>财务概况</h2>
      <div class="essentialInformation">
        <el-row class="basicInfo" :span="24">
          <!-- 第一行 -->
          <el-col :span="3">钱包余额：</el-col>
          <el-col :span="3">{{financial.balance ? financial.balance :'0' }}</el-col>
          <el-col :span="3">分销获利余额：</el-col>
          <el-col :span="3">{{financial.marketProfitBalance ? financial.marketProfitBalance : '0'}}</el-col>
          <el-col :span="3">分销获利总支出：</el-col>
          <el-col :span="3">{{financial.marketProfitExpend ? financial.marketProfitExpend : '0'}}</el-col>
          <!-- <el-col :span="3">待处理提现金额：</el-col> -->
          <!-- <el-col :span="3">{{financial.prodealHandsAmount ? financial.prodealHandsAmount : '0'}}</el-col> -->

          <!-- 第二行 -->
          <el-col :span="3">分销获利总金额：</el-col>
          <el-col :span="3">{{financial2.rewardAmount ? financial2.rewardAmount : '0'}}</el-col>
          <el-col :span="3">推荐车主接单奖励：</el-col>
          <el-col
            :span="3"
            class="remarkJump"
            title
          >{{financial2.bizRecommendDriverReward ? financial2.bizRecommendDriverReward : '0'}}</el-col>
          <el-col :span="3">推荐货主发货奖励：</el-col>
          <el-col
            :span="3"
            class="remarkJump"
            title
          >{{financial2.bizRecommendShipperReward ? financial2.bizRecommendShipperReward : '0'}}</el-col>
          <el-col :span="3">推荐新货主注册奖励：</el-col>
          <el-col
            :span="3"
            class="remarkJump"
            title
          >{{financial2.recommendShipperRegisterReward ? financial2.recommendShipperRegisterReward : '0'}}</el-col>

          <!-- 第三行 -->
          <el-col :span="3">推荐新车主注册奖励：</el-col>
          <el-col
            :span="3"
            class="remarkJump"
            title
          >{{financial2.recommendDriverRegisterReward ? financial2.recommendDriverRegisterReward : '0'}}</el-col>
          <el-col :span="3">推荐新货主认证奖励：</el-col>
          <el-col
            :span="3"
            class="remarkJump"
            title
          >{{financial2.recommendShipperAuthReward ? financial2.recommendShipperAuthReward : '0'}}</el-col>
          <el-col :span="3">推荐新车主认证奖励：</el-col>
          <el-col
            :span="3"
            class="remarkJump"
            title
          >{{financial2.recommendDriverAuthReward ? financial2.recommendDriverAuthReward : '0'}}</el-col>
          <el-col :span="3">货主扫专属下单码发货奖励：</el-col>
          <el-col
            :span="3"
            class="remarkJump"
            title
          >{{financial2.orderCodeReward ? financial2.orderCodeReward : '0'}}</el-col>

          <!-- 第四行 -->
          <el-col :span="3">累计充值：</el-col>
          <el-col
            :span="3"
          >{{financial.totalEchargeAmountSum ? financial.totalEchargeAmountSum : '0'}}</el-col>
          <el-col :span="3">当前充值余额：</el-col>
          <el-col :span="3">{{financial.totalEchargeAmount ? financial.totalEchargeAmount : '0'}}</el-col>
          <el-col :span="3">累计充值赠送：</el-col>
          <el-col :span="3">{{financial.availableBalance ? financial.availableBalance : '0'}}</el-col>
          <el-col :span="3">当前赠送余额：</el-col>
          <el-col
            :span="3"
          >{{financial.currentAvailableBalance ? financial.currentAvailableBalance : '0'}}</el-col>

          <!-- 第五行 -->
          <el-col :span="3">钱包支出：</el-col>
          <el-col :span="3">{{financial.mywallentExpend ? financial.mywallentExpend : '0'}}</el-col>
          <el-col :span="3">订单交易总额：</el-col>
          <el-col :span="3">{{financial.finishOrderTotal ? financial.finishOrderTotal : '0'}}</el-col>
          <el-col :span="3">线上交易总额：</el-col>
          <el-col :span="3">{{financial.onLineTransTotal ? financial.onLineTransTotal : '0'}}</el-col>
          <el-col :span="3">线下交易总额：</el-col>
          <el-col :span="3">{{financial.offlineTransTotal ? financial.offlineTransTotal : '0'}}</el-col>
        </el-row>
      </div>
      <div class="collapseInfo_remark" style="padding-bottom:20px;">
        <p>备注说明：</p>
        <p>1、钱包余额=分销获利余额+当前充值余额+当前赠送余额</p>
        <p>2、分销获利总金额=推荐车主接单奖励+推荐货主发货奖励+推荐货主注册奖励+推荐新车主注册奖励+推荐新货主认证奖励+推荐新车主认证奖励+货主扫专属下单码发货奖励</p>
        <p>3、订单交易总额=线上交易总额+线下交易总额</p>
        <!-- <p>4、订单交易总额=线上交易总额+线下交易总额</p> -->
      </div>
    </div>
    <!-- 银行卡管理 -->
    <div class="czjl-collapse collapseInfo">
      <h2>银行卡管理</h2>
      <div class="essentialInformation_table">
        <el-table :data="bankCardList" border style="width: 100%">
          <el-table-column label="序号" width="60">
            <template
              slot-scope="scope"
            >{{ (bankCardObj.currentPage - 1) * bankCardObj.pageSize + scope.$index + 1 }}</template>
          </el-table-column>
          <el-table-column prop="cardNumView" label="银行卡号">
            <template slot-scope="scope">
              <h4
                class="needMoreInfo"
                @click="dataDetails(scope.row,'bankCard')"
              >{{ scope.row.cardNumView}}</h4>
            </template>
          </el-table-column>
          <el-table-column prop="bindTime" label="绑定时间">
            <template slot-scope="scope">{{ scope.row.bindTime | parseTime }}</template>
          </el-table-column>
          <el-table-column prop="openAccountBank" label="开户银行"></el-table-column>
          <el-table-column prop="bindStatusName" label="绑定状态"></el-table-column>
          <el-table-column prop="validateStatusName" label="银行卡真实性"></el-table-column>
          <el-table-column prop="isCardHolderName" label="银行卡持有人"></el-table-column>
          <el-table-column prop="updateTime" label="更新时间"></el-table-column>
        </el-table>
        <el-pagination
          background
          @size-change="(val)=>{return handleSizeChange(val,'bankCard')}"
          @current-change="(val)=>{return handleClick(val,'bankCard')}"
          layout="total, sizes, prev, pager, next, jumper"
          :page-sizes="sizes"
          :total="bankCardTotalCount"
        ></el-pagination>
      </div>
    </div>

    <!-- 交易明细 -->
    <div class="zhyhq-collapse collapseInfo">
      <h2>交易明细</h2>
      <div class="collapseInfo_remark">
        <p>备注说明：</p>
        <p>1、订单金额=货主支出+优惠金+优惠券+货主支付保险</p>
        <p>2、车主运费收入=平台运费支出+优惠券+优惠金+奖励金+平台抽佣-车主支付保险</p>
        <el-form :inline="true" class="demo-ruleForm collapseInfo_remark_qdSearch">
          <el-form-item label="交易时间：">
            <el-date-picker
              v-model="tradeTime"
              type="daterange"
              range-separator="-"
              unlink-panels
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              align="right"
              :default-time="['00:00:00', '23:59:59']"
              @change="tradeTimeVal"
              value-format="timestamp"
            ></el-date-picker>
          </el-form-item>
        </el-form>
      </div>
      <div class="essentialInformation_table">
        <el-table :data="tradeData" border style="width: 100%">
          <el-table-column label="序号" width="60">
            <template
              slot-scope="scope"
            >{{ (tradeObj.currentPage - 1) * tradeObj.pageSize + scope.$index + 1 }}</template>
          </el-table-column>
          <el-table-column
            :show-overflow-tooltip="true"
            width="250"
            prop="orderSerial"
            label="交易订单号"
          >
            <template slot-scope="scope">
              <h4
                class="needMoreInfo"
                @click="dataDetails(scope.row,'trade')"
              >{{ scope.row.orderSerial}}</h4>
            </template>
          </el-table-column>
          <el-table-column prop="payTime" width="160" label="交易时间">
            <template slot-scope="scope">{{scope.row.payTime | parseTime}}</template>
          </el-table-column>
          <el-table-column prop="totalAmount" label="订单金额"></el-table-column>
          <el-table-column prop="platformExpense" label="货主支出"></el-table-column>
          <el-table-column prop="discount" label="优惠金"></el-table-column>
          <el-table-column prop="reductionAmount" label="发货津贴"></el-table-column>
          <el-table-column prop="coupon" label="优惠券"></el-table-column>
          <el-table-column prop="bonus" label="奖励金"></el-table-column>
          <el-table-column prop="platformRake" label="平台抽佣"></el-table-column>
          <el-table-column prop="shipperPayInsurance" label="货主支付保险"></el-table-column>
          <el-table-column prop="driverPayInsurance" label="车主支付保险"></el-table-column>
          <el-table-column prop="driverFreightIncome" label="车主运费收入"></el-table-column>
        </el-table>
        <el-pagination
          background
          @size-change="(val)=>{return handleSizeChange(val,'trade')}"
          @current-change="(val)=>{return handleClick(val,'trade')}"
          layout="total, sizes, prev, pager, next, jumper"
          :page-sizes="sizes"
          :total="tradeTotalCount"
        ></el-pagination>
      </div>
    </div>

    <!-- 充值记录   -->
    <div class="czjl-collapse collapseInfo">
      <h2>充值记录</h2>
      <div class="essentialInformation_table">
        <el-table :data="rechargeData" border style="width: 100%">
          <el-table-column label="序号" width="60">
            <template
              slot-scope="scope"
            >{{ (rechargeObj.currentPage - 1) * rechargeObj.pageSize + scope.$index + 1 }}</template>
          </el-table-column>
          <el-table-column prop="rechargeSerial" label="流水号"></el-table-column>
          <el-table-column prop="rechargeTime" label="充值时间"></el-table-column>
          <el-table-column prop="rechargeSum" label="充值金额"></el-table-column>
          <el-table-column prop="giveSum" label="充值赠送"></el-table-column>
          <!-- <el-table-column
                    prop="rechargeSum"
                    label="充值前余额">
                    </el-table-column>
                     <el-table-column
                    prop="rechargeSum"
                    label="充值后余额">
          </el-table-column>-->
          <el-table-column prop="rechargeChannelName" label="充值渠道"></el-table-column>
          <el-table-column prop="rechargeWay" label="充值方式">
            <template slot-scope="scope">{{ scope.row.rechargeWay == 0 ? '支付宝' : '微信' }}</template>
          </el-table-column>
        </el-table>
        <el-pagination
          background
          @size-change="(val)=>{return handleSizeChange(val,'recharge')}"
          @current-change="(val)=>{return handleClick(val,'recharge')}"
          layout="total, sizes, prev, pager, next, jumper"
          :page-sizes="sizes"
          :total="rechargeTotalCount"
        ></el-pagination>
      </div>
    </div>
    <!-- 营销信息   -->
    <div class="czjl-collapse collapseInfo">
      <h2>营销信息</h2>
      <div class="essentialInformation">
        <el-row class="basicInfo" :span="24">
          <!-- 第一行 -->
          <el-col :span="3">货主优惠等级：</el-col>
          <el-col :span="3">{{financial.discountLevel}}</el-col>
          <el-col :span="3">认证时获得优惠金：</el-col>
          <el-col :span="3">{{financial.rewardMax ? financial.rewardMax : '0'}}</el-col>
          <el-col :span="3">剩余优惠金：</el-col>
          <el-col :span="3">{{financial.couponNum ? financial.couponNum : '0'}}</el-col>
          <el-col :span="3">已使用单数：</el-col>
          <el-col :span="3">{{financial.shipperRewardNum ? financial.shipperRewardNum : '0'}}</el-col>
        </el-row>
      </div>
      <div class="essentialInformation_table" style="padding-top:0;">
        <el-table :data="userRewardList" border style="width: 100%">
          <el-table-column label="序号" width="60">
            <template
              slot-scope="scope"
            >{{ (userRewardObj.currentPage - 1) * userRewardObj.pageSize + scope.$index + 1 }}</template>
          </el-table-column>
          <el-table-column width="250" prop="orderSerial" label="订单号">
            <template slot-scope="scope">
              <h4
                class="needMoreInfo"
                @click="dataDetails(scope.row,'trade')"
              >{{ scope.row.orderSerial}}</h4>
            </template>
          </el-table-column>
          <el-table-column prop="id" label="订单所属区域">
            <template
              slot-scope="scope"
            >{{ scope.row.province }}{{ scope.row.city }}{{ scope.row.area }}</template>
          </el-table-column>
          <el-table-column prop="carType" label="车型"></el-table-column>
          <el-table-column prop="totalAmount" label="订单金额"></el-table-column>
          <el-table-column prop="rewardSum" label="优惠金额"></el-table-column>
          <el-table-column prop="tradeTime" label="交易时间">
            <template slot-scope="scope">{{ scope.row.tradeTime | parseTime}}</template>
          </el-table-column>
        </el-table>
        <el-pagination
          background
          @size-change="(val)=>{return handleSizeChange(val,'userReward')}"
          @current-change="(val)=>{return handleClick(val,'userReward')}"
          layout="total, sizes, prev, pager, next, jumper"
          :page-sizes="sizes"
          :total="userRewardTotalCount"
        ></el-pagination>
      </div>
      <div class="essentialInformation">
        <el-row class="basicInfo" :span="24">
          <!-- 第一行 -->
          <el-col :span="3">有效优惠券数：</el-col>
          <el-col :span="3">{{CouponNumObj.effectiveNum ? CouponNumObj.effectiveNum :'0' }}</el-col>
          <el-col :span="3">过期优惠劵数：</el-col>
          <el-col :span="3">{{CouponNumObj.expireNum ? CouponNumObj.expireNum : '0'}}</el-col>
          <el-col :span="3">使用优惠券数：</el-col>
          <el-col :span="3">{{CouponNumObj.userNum ? CouponNumObj.userNum : '0'}}</el-col>
          <!-- <el-col :span="3">已使用单数：</el-col>
          <el-col :span="3">{{financial.rewardBalance ? financial.rewardBalance : '0'}}</el-col>-->
        </el-row>
      </div>
      <div class="essentialInformation_table" style="padding-top:0;">
        <el-table :data="listCouponList" border style="width: 100%">
          <el-table-column label="序号" width="60">
            <template
              slot-scope="scope"
            >{{ (listCouponObj.currentPage - 1) * listCouponObj.pageSize + scope.$index + 1 }}</template>
          </el-table-column>
          <el-table-column width="250" prop="orderSerial" label="订单号">
            <template slot-scope="scope">
              <h4
                class="needMoreInfo"
                @click="dataDetails(scope.row,'trade')"
              >{{ scope.row.orderSerial}}</h4>
            </template>
          </el-table-column>
          <el-table-column prop="activityName" label="所属活动"></el-table-column>
          <el-table-column prop="couponName" label="优惠券名称"></el-table-column>
          <el-table-column width="150" prop="couponType" label="优惠券类型"></el-table-column>
          <el-table-column width="150" prop="orderDiscountAmount" label="订单金额"></el-table-column>
          <el-table-column width="150" prop="remissionDiscount" label="订单优惠金额"></el-table-column>
          <el-table-column prop="couponNum" label="优惠券码"></el-table-column>
          <el-table-column prop="tradeTime" label="使用时间"></el-table-column>
          <el-table-column prop="grantTime" label="派发时间"></el-table-column>
          <el-table-column prop="endTime" label="过期时间"></el-table-column>
          <el-table-column prop="creater" label="发放人"></el-table-column>
        </el-table>
        <el-pagination
          background
          @size-change="(val)=>{return handleSizeChange(val,'listCoupon')}"
          @current-change="(val)=>{return handleClick(val,'listCoupon')}"
          layout="total, sizes, prev, pager, next, jumper"
          :page-sizes="sizes"
          :total="listCouponTotalCount"
        ></el-pagination>
      </div>
    </div>
    <!-- 账户优惠券   -->
    <!-- <div class="zhyhq-collapse collapseInfo">
            <h2>账户优惠券  </h2>
            <div class="essentialInformation_table" >
                <el-table
                    :data="couponData"
                    border
                    style="width: 100%">
                    <el-table-column label="序号"  width="60">
                        <template slot-scope="scope">
                            {{ (couponObj.currentPage - 1) * couponObj.pageSize + scope.$index + 1 }}
                        </template>
                    </el-table-column>  
                    <el-table-column
                    :show-overflow-tooltip="true"
                    prop="couponName"
                    label="优惠券名称"
                    >
                    </el-table-column>
                    <el-table-column
                    width="120"
                    :show-overflow-tooltip="true"
                    prop="couponTypeName"
                    label="优惠券类型"
                    >
                    </el-table-column>
                    <el-table-column
                    width="120"
                    prop="remissionDiscount"
                    label="金额/折扣">
                    </el-table-column>
                    <el-table-column
                    prop="couponNum"
                    label="优惠券码">
                    </el-table-column>
                    <el-table-column
                    prop="mobile"
                    label="手机号码">
                    </el-table-column>
                    <el-table-column
                    prop="grantTime"
                    label="派发时间">
                    </el-table-column>
                    <el-table-column
                    prop="endTime"
                    label="过期时间">
                    </el-table-column>
                    <el-table-column
                    width="120"
                    prop="couponStatusName"
                    label="券码状态">
                    </el-table-column>
                    <el-table-column
                    width="250"
                    prop="orderSerial"
                    label="订单号">
                    </el-table-column>
                    <el-table-column
                    width="120"
                    prop="orderDiscountAmount"
                    label="订单优惠金额">
                    </el-table-column>
                </el-table>
                <el-pagination
                    background
                    @current-change="handleCurrentChangeCoupon"
                    layout="total, prev, pager, next, jumper"
                    :total="couponTotalCount">
                </el-pagination>
            </div>
    </div>-->
  </div>
</template>

<script>
import { parseTime } from "@/utils/index.js";
import {
  aflcCouponList,
  aflcRechargeList,
  aflcFinancialState,
  aflcBankCardList,
  aflcTradeList,
  aflcUserRewardList,
  aflcListCouponTotal,
  aflCouponNum,
  shipperRewardStatisticsInfo
} from "@/api/users/shipperDetails/index.js";

export default {
  name: "ordersInfo",
  components: {},
  props: {
    isvisible: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      sizes: [10, 20, 50, 100],
      listInformation: [],
      dataType: [
        { name: "全部", iscur: true },
        { name: "近7天", iscur: false },
        { name: "近30天", iscur: false },
        { name: "近90天", iscur: false }
      ],
      page: 1,
      pagesize: 20,
      totalCount: 100,
      financial: {}, //财务概况
      financial2: {},
      couponTotalCount: 0, //优惠券列表默认总数
      tradeTotalCount: 0, //交易明细默认总数
      rechargeTotalCount: 0, //充值记录列表默认总数
      bankCardTotalCount: 0, //银行卡默认总数
      userRewardTotalCount: 0, //优惠金默认总数
      listCouponTotalCount: 0, //优惠券默认总数
      couponData: [], //优惠券列表
      couponObj: {
        //优惠券列表查询条件
        currentPage: 1,
        pageSize: 10,
        vo: {
          userId: ""
        }
      },
      rechargeData: [], //充值记录列表
      rechargeObj: {
        //充值记录列表查询条件
        currentPage: 1,
        pageSize: 10,
        vo: {
          accountId: ""
        }
      },
      bankCardObj: {
        //充值记录列表查询条件
        currentPage: 1,
        pageSize: 10,
        vo: {
          accountId: ""
        }
      },
      tradeObj: {
        currentPage: 1,
        pageSize: 10,
        vo: {
          userId: "",
          tradeEndTime: "",
          tradeStartTime: ""
        }
      },
      userRewardObj: {
        currentPage: 1,
        pageSize: 10,
        vo: {
          accountId: ""
        }
      },
      listCouponObj: {
        currentPage: 1,
        pageSize: 10,
        vo: {
          userId: ""
        }
      },
      listCouponList: [], //优惠券
      userRewardList: [], //优惠金列表
      bankCardList: [], //银行卡列表
      loading: false,
      tradeTime: [], //交易明细时间
      tradeData: [], //交易明细列表
      CouponNumObj: {} //优惠券金额
    };
  },
  watch: {
    isvisible: {
      handler(newVal, oldVal) {
        if (newVal) {
          this.init();
        }
      },
      // 代表在wacth里声明了firstName这个方法之后立即先去执行handler方法
      immediate: true
    }
  },
  mounted() {
    // console.log(this.$route)
  },
  methods: {
    init() {
      let userId = this.$route.query.userId;
      this.couponObj.vo.userId = userId;
      this.rechargeObj.vo.accountId = userId;
      this.bankCardObj.vo.accountId = userId;
      this.userRewardObj.vo.accountId = userId;
      this.tradeObj.vo.userId = userId;
      this.listCouponObj.vo.userId = userId;

      this.CouponList();
      this.RechargeList();
      this.financialState(userId);
      this.bankCard();
      this.TradeList();
      this.userReward();
      this.listCoupon();
      this.CouponNum(userId);
    },
    //优惠券列表
    CouponList() {
      aflcCouponList(this.couponObj).then(res => {
        this.couponData = res.data.list;
        this.couponTotalCount = res.data.totalCount;
      });
    },
    //充值记录列表
    RechargeList() {
      aflcRechargeList(this.rechargeObj).then(res => {
        this.rechargeData = res.data.list;
        this.rechargeTotalCount = res.data.totalCount;
        this.rechargeData.forEach(el => {
          switch (el.rechargeChannel) {
            case "0":
              el.rechargeChannelName = "app";
              break;
            case "1":
              el.rechargeChannelName = "web";
              break;
            case "2":
              el.rechargeChannelName = "TMSWEB";
              break;
          }
        });
      });
    },
    //财务概况
    financialState(userId) {
      aflcFinancialState(userId).then(res => {
        this.financial = res.data;
      });
      shipperRewardStatisticsInfo(userId).then(res => {
        this.financial2 = res.data;
      });
    },
    //银行卡
    bankCard() {
      aflcBankCardList(this.bankCardObj).then(res => {
        this.bankCardList = res.data.list;
        this.bankCardTotalCount = res.data.totalCount;
      });
    },
    //账户优惠券当前页
    handleCurrentChangeCoupon(val) {
      this.couponObj.currentPage = val;
      this.CouponList();
    },
    //交易明细
    TradeList() {
      aflcTradeList(this.tradeObj).then(res => {
        this.tradeData = res.data.list;
        this.tradeTotalCount = res.data.totalCount;
      });
    },
    //优惠金
    userReward() {
      aflcUserRewardList(this.userRewardObj).then(res => {
        this.userRewardList = res.data.list;
        this.userRewardTotalCount = res.data.totalCount;
      });
    },
    //优惠券
    listCoupon() {
      aflcListCouponTotal(this.listCouponObj).then(res => {
        this.listCouponList = res.data.list;
        this.listCouponTotalCount = res.data.totalCount;
      });
    },
    //优惠券金额
    CouponNum(userId) {
      aflCouponNum(userId).then(res => {
        this.CouponNumObj = res.data;
      });
    },
    setCur(index) {
      console.log(index);
      this.dataType.forEach((el, idx) => {
        console.log(idx);
        idx == index ? (el.iscur = true) : (el.iscur = false);
      });
    },
    handleClick(val, type) {
      // console.log('val,type',val,type)
      switch (type) {
        case "bankCard":
          this.bankCardObj.currentPage = val;
          this.bankCard();
          break;
        case "trade":
          this.tradeObj.currentPage = val;
          this.TradeList();
          break;
        case "recharge":
          this.rechargeObj.currentPage = val;
          this.RechargeList();
          break;
        case "userReward":
          this.userRewardObj.currentPage = val;
          this.userReward();
          break;
        case "listCoupon":
          this.listCouponObj.currentPage = val;
          this.listCoupon();
          break;
      }
    },
    handleSizeChange(val, type) {
      // console.log('val,type',val,type)
      switch (type) {
        case "bankCard":
          this.bankCardObj.pageSize = val;
          this.bankCard();
          break;
        case "trade":
          this.tradeObj.pageSize = val;
          this.TradeList();
          break;
        case "recharge":
          this.rechargeObj.pageSize = val;
          this.RechargeList();
          break;
        case "userReward":
          this.userRewardObj.pageSize = val;
          this.userReward();
          break;
        case "listCoupon":
          this.listCouponObj.pageSize = val;
          this.listCoupon();
          break;
      }
    },
    dataDetails(row, type) {
      switch (type) {
        case "bankCard":
          this.$router.push({ name: "银行卡详情", query: { Id: row.id } });
          break;
        case "trade":
          this.$router.push({
            name: "订单详情",
            query: { orderSerial: row.orderSerial }
          });
          break;
      }
    },
    tradeTimeVal(val) {
      this.tradeObj.vo.tradeStartTime = val ? val[0] : "";
      this.tradeObj.vo.tradeEndTime = val ? val[1] : "";
      this.TradeList();
    }
  }
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.ordersInfo {
  .collapseInfo {
    .qd-collapse_title {
      padding: 20px 0;
    }
    h4 {
      cursor: pointer;
      color: #3e9ff1;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    .collapseInfo_remark {
      position: relative;
      p {
        line-height: 30px;
      }
      .collapseInfo_remark_qdSearch {
        position: absolute;
        right: 0;
        top: 10px;
      }
    }
    .basicInfo {
      .remarkJump {
        color: #03a9f4;
        cursor: pointer;
      }
    }
  }
}
</style>
