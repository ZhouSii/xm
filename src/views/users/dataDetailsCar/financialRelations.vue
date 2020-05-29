<template>
  <div class="ordersInfo detailsArrange" v-loading="loading">
    <!-- 财务概况 -->
    <div class="cwgk-collapse collapseInfo">
      <h2>财务概况</h2>
      <div class="essentialInformation">
        <el-row class="basicInfo" :span="24">
          <!-- 第一行 -->
          <el-col :span="3">
            <h4>车主运费总收入：</h4>
          </el-col>
          <el-col :span="3">
            <h4>{{driverTransObj.orderTransTotal|| '0'}}</h4>
          </el-col>
          <el-col :span="3">车主运费线上交易总收入：</el-col>
          <el-col :span="3">{{driverTransObj.onLineTransTotal || '0'}}</el-col>
          <el-col :span="3">车主运费线下交易总收入：</el-col>
          <el-col :span="3">{{driverTransObj.offlineTransTotal || '0'}}</el-col>
          <el-col :span="6"></el-col>
        </el-row>

        <!-- 第二部分  分销获利部分-->
        <el-row class="basicInfo">
          <el-col :span="3">
            <h4>分销获利总金额：</h4>
          </el-col>
          <el-col :span="3">
            <h4>{{RewardStatisticsInfo.rewardAmount || '0'}}</h4>
          </el-col>
          <el-col :span="3">推荐车主接单奖励：</el-col>
          <el-col :span="3">{{RewardStatisticsInfo.bizRecommendDriverReward || '0'}}</el-col>
          <el-col :span="3">推荐货主发货奖励：</el-col>
          <el-col :span="3">{{RewardStatisticsInfo.bizRecommendShipperReward || '0'}}</el-col>
          <el-col :span="3">推荐新货主注册奖励：</el-col>
          <el-col :span="3">{{RewardStatisticsInfo.recommendShipperRegisterReward || '0'}}</el-col>
        </el-row>
        <el-row class="basicInfo">
          <el-col :span="3">推荐新车主注册奖励：</el-col>
          <el-col :span="3">{{RewardStatisticsInfo.recommendDriverRegisterReward || '0'}}</el-col>
          <el-col :span="3">推荐新货主认证奖励：</el-col>
          <el-col :span="3">{{RewardStatisticsInfo.recommendShipperAuthReward || '0'}}</el-col>
          <el-col :span="3">推荐新车主认证奖励：</el-col>
          <el-col :span="3">{{RewardStatisticsInfo.recommendDriverAuthReward || '0'}}</el-col>
          <el-col :span="3" style="padding: 12px 10px 12px 0px;">货主扫专属接单码发货奖励：</el-col>
          <el-col :span="3">{{RewardStatisticsInfo.orderCodeReward || '0'}}</el-col>
        </el-row>
        <el-row class="basicInfo">
          <el-col :span="3">分享奖励：</el-col>
          <el-col :span="3">{{RewardStatisticsInfo.randommoneySum||'0'}}</el-col>
          <el-col :span="18"></el-col>
        </el-row>

        <!-- 第三部分 补贴收入 -->
        <el-row class="basicInfo">
          <el-col :span="3">
            <h4>补贴收入：</h4>
          </el-col>
          <el-col :span="3">
            <h4>{{driverTransObj.subsidyTotal||'0'}}</h4>
          </el-col>
          <el-col :span="3">车贴任务收入：</el-col>
          <el-col :span="3">{{driverTransObj.payCarStickerTotal || '0'}}</el-col>
          <el-col :span="3">达量奖励收入：</el-col>
          <el-col :span="3">{{driverTransObj.ordernumRewardAmount|| '0'}}</el-col>
          <el-col :span="3">平台补贴收入：</el-col>
          <el-col :span="3">{{driverTransObj.rewardSubsiTotal || '0'}}</el-col>
        </el-row>

        <!-- 车主线上收入小计 -->
        <el-row class="basicInfo">
          <el-col :span="3">
            <h4>车主线上收入小计：</h4>
          </el-col>
          <el-col :span="3">
            <h4>{{driverTransObj.driverOnlineGainingsTotal ||'0'}}</h4>
          </el-col>
          <el-col :span="18"></el-col>
        </el-row>

        <!-- 第四部分 车主钱包部分 -->
        <el-row class="basicInfo">
          <el-col :span="3">
            <h4>车主钱包小计：</h4>
          </el-col>
          <el-col :span="3">
            <h4>{{driverTransObj.walletTotal ||'0'}}</h4>
          </el-col>
          <el-col :span="3">可提现金额：</el-col>
          <el-col :span="3">{{driverTransObj.acailBalance || '0'}}</el-col>
          <el-col :span="3">待审核金额：</el-col>
          <el-col :span="3">{{driverTransObj.auditAmount || '0'}}</el-col>
          <el-col :span="3">已提现金额：</el-col>
          <el-col :span="3">{{driverTransObj.cashWitndAmount || '0'}}</el-col>
          <el-col :span="3">待处理提现金额：</el-col>
          <el-col :span="3">{{driverTransObj.prodealHandsAmount || '0'}}</el-col>
          <el-col :span="3">已支出金额：</el-col>
          <el-col :span="3">{{driverTransObj.paidOutAmount ||'0'}}</el-col>
          <el-col :span="12"></el-col>
        </el-row>

        <!-- 第五部分 保证金 -->
        <el-row class="basicInfo">
          <el-col :span="3">
            <h4>车主当前保证金：</h4>
          </el-col>
          <el-col :span="3">
            <h4>{{driverTransObj.securDeposit || '0'}}</h4>
          </el-col>
          <el-col :span="3">车主缴纳保证金金额：</el-col>
          <el-col :span="3">{{driverTransObj.guaranteeAmountIn || '0'}}</el-col>
          <el-col :span="3">车主扣除保证金金额：</el-col>
          <el-col :span="3">{{driverTransObj.guaranteeAmountOut || '0'}}</el-col>
          <el-col :span="6"></el-col>
        </el-row>
      </div>
    </div>

    <!-- 银行卡管理 -->
    <div class="qd-collapse collapseInfo" v-loading="bankloading">
      <h2>银行卡管理</h2>
      <div class="essentialInformation_table">
        <el-table :data="bankData" border style="width: 100%">
          <el-table-column label="序号" width="60">
            <template
              slot-scope="scope"
            >{{ (bankmentObj.currentPage - 1) * bankmentObj.pageSize + scope.$index + 1 }}</template>
          </el-table-column>
          <el-table-column prop="cardNumView" label="银行卡号" show-overflow-tooltip></el-table-column>
          <el-table-column prop="bindTime" label="绑定时间" show-overflow-tooltip></el-table-column>
          <el-table-column prop="openAccountBank" label="开户银行" show-overflow-tooltip></el-table-column>
          <el-table-column prop="bindStatusName" label="绑定状态" show-overflow-tooltip></el-table-column>
          <el-table-column prop="validateStatusName" label="银行卡真实性" show-overflow-tooltip></el-table-column>
          <el-table-column prop="isCardHolderName" label="银行卡持有人" show-overflow-tooltip></el-table-column>
          <el-table-column prop="updateTime" label="更新时间" show-overflow-tooltip></el-table-column>
        </el-table>
        <el-pagination
          background
          @current-change="handleCurrentChangeBank"
          layout="total,prev, pager, next, jumper"
          :total="bankTotalCount"
        ></el-pagination>
      </div>
    </div>

    <!-- 交易明细   -->
    <div class="qd-collapse collapseInfo" v-loading="paymentloading">
      <h2>交易明细</h2>
      <div class="qd-collapse_title clearfix" style="margin-bottom:-40px">
        <el-form :inline="true" class="demo-ruleForm qdSearch fr">
          <el-form-item label="是否有奖励金">
            <el-select v-model="paymentObj.vo.hasReward" clearable placeholder="请选择">
              <el-option
                v-for="item in hasRewardMoneyList"
                :key="item.id"
                :label="item.name"
                :value="item.code"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="交易时间：">
            <el-date-picker
              v-model="value7"
              type="daterange"
              align="right"
              unlink-panels
              @change="cashTimeChange('payment',$event)"
              range-separator="-"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              value-format="timestamp"
              :default-time="['00:00:00', '23:59:59']"
              :picker-options="pickerOptions2"
            ></el-date-picker>
          </el-form-item>
          <el-button type="primary" plain @click="getdata_search" icon="el-icon-search">搜索</el-button>
          <el-button type="info" plain @click="clearSearch" icon="fontFamily aflc-icon-qingkong">清空</el-button>
        </el-form>
      </div>
      <div class="essentialInformation">
        <el-row class="basicInfo" :span="24">
          <el-col :span="3">车主奖励等级：</el-col>
          <el-col :span="3">{{MarketingCol.rewardGrade}}</el-col>
          <el-col :span="3">认证时获得奖励金：</el-col>
          <el-col :span="3">{{MarketingCol.reward}}</el-col>
          <el-col :span="3">剩余奖励金：</el-col>
          <el-col :span="3">{{MarketingCol.availableReward}}</el-col>
          <el-col :span="3">已使用单数：</el-col>
          <el-col :span="3">{{MarketingCol.userOrderNum}}</el-col>
        </el-row>
      </div>
      <div class="essentialInformation_table" style="padding-top:0;">
        <el-table :data="paymentData" border>
          <!-- style="width: 100%" -->
          <el-table-column label="序号" width="60">
            <template
              slot-scope="scope"
            >{{ (paymentObj.currentPage - 1) * paymentObj.pageSize + scope.$index + 1 }}</template>
          </el-table-column>
          <el-table-column prop="orderSerial" label="交易订单号" width="250">
            <template slot-scope="scope">
              <h4
                class="needMoreInfo"
                @click="pushOrderSerial(scope.row)"
              >{{ scope.row.orderSerial}}</h4>
            </template>
          </el-table-column>
          <!-- <el-table-column prop="tradeSerial" label="交易流水号" show-overflow-tooltip width="250"></el-table-column> -->
          <el-table-column prop="exceptionType" label="订单标识" show-overflow-tooltip width="150">
            <template slot-scope="scope">
              <span v-html="scope.row.exceptionType"></span>
            </template>
          </el-table-column>
          <el-table-column prop="createTime" label="下单时间" width="180" show-overflow-tooltip>
            <template slot-scope="scope">{{ scope.row.createTime | parseTime}}</template>
          </el-table-column>
          <el-table-column
            label="货主信息"
            prop="shipperInfo"
            sortable
            min-width="230"
            show-overflow-tooltip
          ></el-table-column>
          <el-table-column label="货主支付" prop="factPay" sortable min-width="120"></el-table-column>
          <el-table-column label="货主货物保障费" prop="shipperInsuranceFee" sortable min-width="150"></el-table-column>
          <el-table-column label="优惠金" prop="reward" sortable min-width="100"></el-table-column>
          <el-table-column label="发货津贴" prop="reductionAmount" sortable min-width="100"></el-table-column>
          <el-table-column label="优惠券抵扣" prop="preferentialPrice" sortable min-width="130"></el-table-column>
          <el-table-column label="订单总金额" prop="totalAmount" sortable min-width="130"></el-table-column>
          <el-table-column label="额外小费" prop="tip" sortable min-width="120"></el-table-column>
          <el-table-column label="奖励金" prop="driverReward" sortable min-width="100"></el-table-column>
          <el-table-column label="车主货物保障费" prop="driverInsuranceFee" sortable min-width="150"></el-table-column>
          <!-- <el-table-column label="小费" prop="tip" sortable width="80"></el-table-column> -->
          <el-table-column label="平台抽佣费" prop="platMaidFee" sortable min-width="130"></el-table-column>
          <el-table-column label="车主收入(完成时)" prop="driverIncome" sortable min-width="160"></el-table-column>
          <el-table-column label="额外支付费用" prop="extraTotalPrice" sortable min-width="140"></el-table-column>
          <el-table-column label="扣奖励金" prop="deductionReward" sortable min-width="120"></el-table-column>
          <el-table-column label="扣优惠金" prop="deductionCouponReward" sortable min-width="120"></el-table-column>
          <el-table-column label="扣发货津贴" prop="deductionReductionAmount" sortable min-width="120"></el-table-column>
          <el-table-column label="扣优惠券抵扣" prop="deductionCoupon" sortable min-width="140"></el-table-column>
          <el-table-column label="车主实际收入" prop="driverFactIncome" sortable min-width="140"></el-table-column>
          <el-table-column label="利润" prop="profit" sortable min-width="100"></el-table-column>
        </el-table>
        <el-pagination
          background
          @current-change="handleCurrentChange"
          layout="total,prev, pager, next, jumper"
          :total="paymentTotalCount"
        ></el-pagination>
      </div>
    </div>

    <!-- 提现记录 -->
    <div class="qd-collapse collapseInfo" v-loading="cashloading">
      <h2>提现记录</h2>
      <div class="qd-collapse_title clearfix">
        <ul class="lengandInfo fl">
          <li>
            已提现金额：
            <span>{{cashData.extractSum}}</span>
          </li>
          <!-- <li>手续费：<span>0</span></li> -->
        </ul>
        <el-form :inline="true" class="demo-ruleForm qdSearch fr">
          <el-form-item label="提现时间：">
            <el-date-picker
              v-model="cashObj.vo.extractTime"
              type="month"
              @change="cashTimeChange('cash')"
              value-format="yyyy-MM"
              placeholder="选择月"
            ></el-date-picker>
          </el-form-item>
        </el-form>
      </div>
      <div class="essentialInformation_table">
        <el-table :data="cashData.aflcExtractCash" border style="width: 100%">
          <el-table-column label="序号" width="60">
            <template
              slot-scope="scope"
            >{{ (cashObj.currentPage - 1) * cashObj.pageSize + scope.$index + 1 }}</template>
          </el-table-column>
          <el-table-column prop="extractSerial" label="流水号" show-overflow-tooltip width="250"></el-table-column>
          <el-table-column prop="extractSum" label="提现金额" show-overflow-tooltip></el-table-column>
          <!-- <el-table-column prop="" label="手续费" show-overflow-tooltip>
          </el-table-column>-->
          <el-table-column prop="extractWay" label="收款方式" show-overflow-tooltip></el-table-column>
          <el-table-column prop label="所属银行" show-overflow-tooltip></el-table-column>
          <el-table-column prop="extractAccount" label="收款账号" show-overflow-tooltip></el-table-column>
          <el-table-column prop="auditOpinion" label="处理结果" show-overflow-tooltip></el-table-column>
          <el-table-column prop="extractStatus" label="提现结果" show-overflow-tooltip></el-table-column>
          <el-table-column prop="createTime" label="申请提现时间" show-overflow-tooltip>
            <template slot-scope="scope">{{ scope.row.createTime | parseTime }}</template>
          </el-table-column>
          <el-table-column prop="auditTime" label="处理时间" show-overflow-tooltip>
            <template slot-scope="scope">{{ scope.row.auditTime | parseTime }}</template>
          </el-table-column>
        </el-table>
        <el-pagination
          background
          @current-change="handleCurrentChangeCash"
          layout="total,prev, pager, next, jumper"
          :total="cashTotalCount"
        ></el-pagination>
      </div>
    </div>

    <!-- 营销信息 -->
    <!-- <div class="qd-collapse collapseInfo" v-loading="Marketingloading">
      <h2>营销信息</h2>

      <div class="essentialInformation_table">
        <el-table :data="MarketingDataAll" border style="width: 100%">
          <el-table-column label="序号" width="60">
            <template
              slot-scope="scope"
            >{{ (MarketingListObj.currentPage - 1) * MarketingListObj.pageSize + scope.$index + 1 }}</template>
          </el-table-column>
          <el-table-column label="订单号" show-overflow-tooltip>
            <template slot-scope="scope">
              <h4
                class="needMoreInfo"
                @click="pushOrderSerial(scope.row)"
              >{{ scope.row.orderSerial}}</h4>
            </template>
          </el-table-column>
          <el-table-column prop label="订单所属区域" show-overflow-tooltip>
            <template slot-scope="scope">{{scope.row.province}}{{scope.row.city}}{{scope.row.area}}</template>
          </el-table-column>
          <el-table-column prop="carType" label="需求车型" show-overflow-tooltip></el-table-column>
          <el-table-column prop="totalAmount" label="订单金额" show-overflow-tooltip></el-table-column>
          <el-table-column prop="rewardSum" label="奖励金额" show-overflow-tooltip></el-table-column>
          <el-table-column prop="tradeTime" label="交易时间" show-overflow-tooltip></el-table-column>
        </el-table>
        <el-pagination
          background
          @current-change="handleCurrentChangeMarketing"
          layout="total,prev, pager, next, jumper"
          :total="MarketingTotal"
        ></el-pagination>
      </div>
    </div>-->
  </div>
</template>

<script>
import { parseTime } from "@/utils/index.js";
import {
  extractCashlist,
  aflcBankCard,
  driverOrderPaymentList2,
  findDrivrTrans,
  findEquityConfigDriverDto,
  userRewardList,
  driverRewardStatisticsInfo
} from "@/api/users/carDetails/index.js";
import { aflcDriverDeposit } from "@/api/finance/bailManage";
import { parseShipStatus } from "@/utils/dict";
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
      bankloading: true, //银行卡lLoad
      paymentloading: true, //交易明细Load
      cashloading: true, //提现记录Load
      Marketingloading: true, //营销Load
      value7: [],
      chooseTime: [],
      driverTransObj: {}, //财务概况
      RewardStatisticsInfo: {},
      cashObj: {
        //提现金额列表查询条件
        currentPage: 1,
        pageSize: 10,
        vo: {
          accountId: "",
          extractTime: null
        }
      },
      bankTotalCount: 0, //银行卡初始数量
      bankData: [], //银行卡列表
      bankmentObj: {
        //银行卡查询条件
        currentPage: 1,
        pageSize: 10,
        vo: {
          accountId: this.$route.query.driverId
        }
      },
      cashTotalCount: 0, //提现金额初始数量
      cashData: [], //提现金额列表
      paymentObj: {
        //交易明细列表查询条件
        currentPage: 1,
        pageSize: 10,
        vo: {
          userId: "",
          tradeEndTime: "",
          tradeStartTime: "",
          hasReward: ""
        }
      },
      hasRewardMoneyList: [
        { name: "全部", code: null },
        { name: "是", code: "1" },
        { name: "否", code: "0" }
      ],
      paymentData: [], //交易记录列表
      paymentTotalCount: 0, //交易记录列表初始数量
      loading: false,
      pickerOptions2: {
        shortcuts: [
          {
            text: "最近一周",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit("pick", [start, end]);
            }
          },
          {
            text: "最近一个月",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit("pick", [start, end]);
            }
          },
          {
            text: "最近三个月",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
              picker.$emit("pick", [start, end]);
            }
          }
        ]
      },
      DriverDepositList: [],
      DriverDepositTotal: 0,
      DriverDepositPage: 1,
      DriverDepositPagesize: 10, //保证金列表查询条件

      MarketingDataAll: [], //营销信息
      MarketingTotal: null,
      MarketingCol: {},
      MarketingListObj: {
        currentPage: 1,
        pageSize: 10,
        vo: {
          accountId: this.$route.query.driverId,
          userType: "0"
        }
      }
    };
  },
  watch: {
    isvisible: {
      handler(newVal, oldVal) {
        if (newVal) {
          this.init();
        }
      },
      immediate: true
    }
  },
  mounted() {
    // console.log(this.$route)
  },
  methods: {
    init() {
      let driverId = this.$route.query.driverId;
      this.cashObj.vo.accountId = driverId;
      this.paymentObj.vo.userId = driverId;
      this.Cashlist();
      this.PaymentList();
      this.DrivrTrans(driverId);
      this.aflcDriverDeposit(driverId);
      this.MarketingMethods();
      this.marKetingList();
      this.BankList();
    },
    //财务概况
    DrivrTrans(driverId) {
      Promise.all([
        findDrivrTrans(driverId),
        driverRewardStatisticsInfo(driverId)
      ]).then(res => {
        this.driverTransObj = res[0].data;
        this.RewardStatisticsInfo = res[1].data;
        //补贴收入=车贴任务奖励收入+达量奖励收入+平台补贴收入
        let total1 =
          +this.driverTransObj.payCarStickerTotal +
          +this.driverTransObj.ordernumRewardAmount +
          +this.driverTransObj.rewardSubsiTotal;
        this.driverTransObj.subsidyTotal =
          total1.toString().indexOf(".") == -1 ? total1 : total1.toFixed(2);
        //钱包小计=可提现金额+待审核金额+已提现金额+待处理体现金额+已支出金额
        let total2 =
          +this.driverTransObj.acailBalance +
          +this.driverTransObj.auditAmount +
          +this.driverTransObj.cashWitndAmount +
          +this.driverTransObj.prodealHandsAmount +
          +this.driverTransObj.paidOutAmount;
        this.driverTransObj.walletTotal =
          total2.toString().indexOf(".") == -1 ? total2 : total2.toFixed(2);
        //车主线上收入小计=车主运费线上交易总收入+分销获利总金额+补贴收入
        let total3 =
          +this.driverTransObj.onLineTransTotal +
          +this.RewardStatisticsInfo.rewardAmount +
          +this.driverTransObj.subsidyTotal;
        this.driverTransObj.driverOnlineGainingsTotal =
          total3.toString().indexOf(".") == -1 ? total3 : total3.toFixed(2);
      });
    },
    // 银行卡
    BankList() {
      this.bankloading = true;
      aflcBankCard(this.bankmentObj).then(res => {
        this.bankData = res.data.list;
        this.bankTotalCount = res.data.totalCount;
        this.bankData.forEach(item => {
          item.bindTime = parseTime(item.bindTime, "{y}-{m}-{d} {h}:{i}:{s}");
          item.updateTime = parseTime(
            item.updateTime,
            "{y}-{m}-{d} {h}:{i}:{s}"
          );
        });
        this.bankloading = false;
      });
    },
    // 保证金
    aflcDriverDeposit(driverId) {
      aflcDriverDeposit(this.DriverDepositPage, this.DriverDepositPagesize, {
        driverId
      }).then(res => {
        this.DriverDepositList = res.data.list;
        this.DriverDepositTotal = res.data.totalCount;
      });
    },
    //提现
    Cashlist() {
      this.cashloading = true;
      extractCashlist(this.cashObj).then(res => {
        this.cashData = res.data.list[0];
        this.cashTotalCount = res.data.totalCount;
        this.cashloading = false;
      });
    },
    //交易明细列表
    PaymentList() {
      this.paymentloading = true;
      driverOrderPaymentList2(this.paymentObj).then(res => {
        this.paymentData = res.data.list;
        this.paymentTotalCount = res.data.totalCount;
        this.paymentData.forEach(item => {
          item.exceptionType = parseShipStatus(item.exceptionType);
        });
        this.paymentloading = false;
      });
    },
    //交易明细查询
    getdata_search(event) {
      this.paymentObj.currentPage = 1;
      // this.$refs.pager.inputval = this.page;
      // this.$refs.pager.pageNum = this.page;
      this.PaymentList();
    },
    clearSearch() {
      this.paymentObj = {
        //交易明细列表查询条件
        currentPage: 1,
        pageSize: 10,
        vo: {
          userId: "",
          tradeEndTime: "",
          tradeStartTime: "",
          hasReward: ""
        }
      };
      this.value7 = [];
      if (this.this.paymentObj.currentPage != 1) {
        this.this.paymentObj.currentPage = 1;
        // this.$refs.pager.inputval = this.page;
        // this.$refs.pager.pageNum = this.page;
      }
      this.PaymentList();
    },
    //银行卡当前页
    handleCurrentChangeBank(val) {
      this.bankmentObj.currentPage = val;
      this.BankList();
    },
    //提现金额当前页
    handleCurrentChangeCash(val) {
      this.cashObj.currentPage = val;
      this.Cashlist();
    },
    // 提现记录当前页
    handleDriverDeposit(val) {
      this.DriverDepositPage = val;
      this.aflcDriverDeposit();
    },
    // 交易记录当前页
    handleCurrentChange(val) {
      this.paymentObj.currentPage = val;
      this.PaymentList();
    },
    cashTimeChange(type, i) {
      console.log("type", type, "i", i);
      switch (type) {
        case "cash":
          if (this.cashObj.currentPage != 1) {
            this.cashObj.currentPage = 1;
          }
          this.Cashlist();
          break;
        case "payment":
          if (i !== null) {
            this.paymentObj.vo.tradeStartTime = i[0];
            this.paymentObj.vo.tradeEndTime = i[1];
          } else {
            this.paymentObj.vo.tradeStartTime = null;
            this.paymentObj.vo.tradeEndTime = null;
          }
          this.PaymentList();
          break;
      }
    },
    handleSearch() {},

    MarketingMethods() {
      findEquityConfigDriverDto(this.$route.query.driverId).then(res => {
        this.MarketingCol = res.data;
      });
    },
    //营销
    marKetingList() {
      this.Marketingloading = true;
      userRewardList(this.MarketingListObj).then(res => {
        this.MarketingTotal = res.data.totalCount;
        this.MarketingDataAll = res.data.list;
        this.MarketingDataAll.forEach(item => {
          item.tradeTime = parseTime(item.tradeTime, "{y}-{m}-{d} {h}:{i}:{s}");
        });
      });
      this.Marketingloading = false;
    },
    handleCurrentChangeMarketing(i) {
      this.MarketingListObj.currentPage = i;
      this.marKetingList();
    },
    // 订单流水号跳转
    pushOrderSerial(item) {
      this.$router.push({
        name: "订单详情",
        query: { orderSerial: item.orderSerial }
      });
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
    .timeChoose {
      margin: 10px 0;
    }
    .needMoreInfo {
      cursor: pointer;
      color: #3e9ff1;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
  }
}
</style>
