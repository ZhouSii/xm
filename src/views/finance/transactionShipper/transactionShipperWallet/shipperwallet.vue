<template>
  <div class="Shipperwallet tabsWrap">
    <el-tabs v-model="autocheck" type="card">
      <!-- 流水明细 -->
      <el-tab-pane
        label="流水明细"
        name="first"
        v-if="$_has_permission('FINANCE_SHIPPER_SURVEY_OWNERACCOUNTDETAILS_FLOWDETAILS')"
      >
        <div style="height:100%;" class="identicalStyle" v-loading="loading1">
          <el-form :inline="true" class="demo-ruleForm classify_searchinfo">
            <el-form-item label="交易类型：">
              <el-select v-model="formAllData.tradeType" clearable placeholder="请选择">
                <el-option
                  v-for="item in optionsAccountType2"
                  :key="item.code"
                  :label="item.name"
                  :value="item.code"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="流水类型：">
              <el-select v-model="formAllData.incomeExpendType" clearable placeholder="请选择">
                <el-option label="流入" value="1"></el-option>
                <el-option label="流出" value="0"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="交易时间">
              <el-date-picker
                v-model="payTime"
                is-range
                unlink-panels
                type="daterange"
                :picker-options="pickerOptions2"
                range-separator="-"
                start-placeholder="开始时间"
                end-placeholder="结束时间"
                placeholder="选择时间范围"
                value-format="yyyy-MM-dd HH:mm:ss"
                :default-time="['00:00:00', '23:59:59']"
                @change="cTime"
              ></el-date-picker>
            </el-form-item>
            <el-form-item class="fr">
              <el-button
                type="primary"
                plain
                @click="getdata_search"
                :size="btnsize"
                icon="el-icon-search"
              >搜索</el-button>
              <el-button
                type="info"
                plain
                @click="clearSearch"
                :size="btnsize"
                icon="fontFamily aflc-icon-qingkong"
              >清空</el-button>
            </el-form-item>
          </el-form>
          <div class="classify_info">
            <div class="btns_box">
              <el-button
                type="primary"
                :size="btnsize"
                icon="el-icon-download"
                plain
                @click="importExcel2"
                v-has:FINANCE_SHIPPER_SURVEY_OWNERACCOUNTDETAILS_FLOWDETAILS_EXPORT
              >导出Excel</el-button>
              <span class="description">流入金额：{{orderData.incomeSum}}</span>
              <span class="description">流出金额：{{orderData.expendSum}}</span>
            </div>
            <div class="info_news">
              <el-table
                style="width: 100%"
                border
                height="93%"
                ref="multipleTable"
                :data="tableDataAll"
              >
                <el-table-column label="序号" width="60">
                  <template slot-scope="scope">{{ (page - 1)*pagesize + scope.$index + 1 }}</template>
                </el-table-column>
                <el-table-column label="订单流水号" prop="orderSerial" sortable width="250">
                  <template slot-scope="scope">
                    <h4
                      class="needMoreInfo"
                      @click="pushOrderSerial(scope.row)"
                    >{{ scope.row.orderSerial}}</h4>
                  </template>
                </el-table-column>
                <el-table-column label="交易流水号" prop="tradeSerial" sortable width="250"></el-table-column>
                <el-table-column label="货主账号" prop="accountName" sortable></el-table-column>
                <el-table-column label="服务分类" prop="orderTypeName" sortable></el-table-column>
                <el-table-column label="交易类型" prop="tradeTypeName" sortable></el-table-column>
                <el-table-column label="流水类型" prop="incomeExpendTypeName" sortable></el-table-column>
                <el-table-column label="交易金额" prop="payTotal" sortable></el-table-column>
                <el-table-column label="交易方式" prop="payWayName" sortable></el-table-column>
                <el-table-column label="交易时间" prop="createTime" sortable></el-table-column>
              </el-table>
            </div>
            <div class="info_tab_footer">
              共计:{{ dataTotal}}
              <div class="show_pager">
                <Pager :total="dataTotal" @change="handlePageChange" :sizes="sizes" ref="pager1" />
              </div>
            </div>
          </div>
        </div>
      </el-tab-pane>

      <!-- 充值记录 -->
      <el-tab-pane
        label="充值记录"
        name="second"
        v-if="$_has_permission('FINANCE_SHIPPER_SURVEY_OWNERACCOUNTDETAILS_RECHARGERECORD')"
      >
        <div style="height:100%;" class="identicalStyle" v-loading="loading2">
          <el-form :inline="true" class="demo-ruleForm classify_searchinfo">
            <el-form-item label="充值时间：">
              <el-date-picker
                is-range
                unlink-panels
                type="daterange"
                :picker-options="pickerOptions2"
                v-model="createTime"
                range-separator="-"
                start-placeholder="开始时间"
                end-placeholder="结束时间"
                placeholder="选择时间范围"
                value-format="yyyy-MM-dd HH:mm:ss"
                :default-time="['00:00:00', '23:59:59']"
                @change="cTime2"
              ></el-date-picker>
            </el-form-item>
            <el-form-item label="充值渠道：">
              <el-select v-model="formAllData2.rechargeChannel" clearable placeholder="请选择">
                <el-option
                  v-for="item in rechargeChannelList"
                  :key="item.code"
                  :label="item.name"
                  :value="item.code"
                  :disabled="item.disabled"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="充值方式：">
              <el-select v-model="formAllData2.rechargeWay" clearable placeholder="请选择">
                <el-option
                  v-for="item in rechargeWayList"
                  :key="item.code"
                  :label="item.name"
                  :value="item.code"
                  :disabled="item.disabled"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item class="fr">
              <el-button
                type="primary"
                plain
                @click="getdata_search2"
                :size="btnsize"
                icon="el-icon-search"
              >搜索</el-button>
              <el-button
                type="info"
                plain
                @click="clearSearch2"
                :size="btnsize"
                icon="fontFamily aflc-icon-qingkong"
              >清空</el-button>
            </el-form-item>
          </el-form>
          <div class="classify_info">
            <div class="btns_box">
              <el-button
                type="primary"
                :size="btnsize"
                icon="el-icon-download"
                plain
                @click="importExcel3"
                v-has:FINANCE_SHIPPER_SURVEY_OWNERACCOUNTDETAILS_RECHARGERECORD_EXPORT
              >导出Excel</el-button>
              <span class="description">充值金额：{{orderData2.rechargeSum}}</span>
              <span class="description">赠送金额：{{orderData2.giveSum}}</span>
            </div>
            <div class="info_news">
              <el-table
                style="width: 100%"
                border
                height="93%"
                stripe
                ref="multipleTable2"
                :data="tableDataAll2"
              >
                <el-table-column label="序号" width="60">
                  <template slot-scope="scope">{{ (page2 - 1)*pagesize2 + scope.$index + 1 }}</template>
                </el-table-column>
                <el-table-column label="流水号" prop="rechargeSerial" sortable width="250"></el-table-column>
                <el-table-column label="支付单号" prop="tradeNo" sortable width="250"></el-table-column>
                <el-table-column label="充值时间" prop="rechargeTime" sortable width="180"></el-table-column>
                <el-table-column label="充值实收金额" prop="rechargeSum" sortable></el-table-column>
                <el-table-column label="充值到账金额" prop="enterSum" sortable></el-table-column>
                <el-table-column label="充值赠送金额" prop="giveSum" sortable></el-table-column>
                <el-table-column label="充值渠道" prop="rechargeChannelName" sortable>
                  <template slot-scope="scope">{{scope.row.rechargeChannel=='0'?'APP':'WEB'}}</template>
                </el-table-column>
                <el-table-column label="充值方式" prop="rechargeWayName" sortable></el-table-column>
              </el-table>
            </div>
            <div class="info_tab_footer">
              共计:{{ dataTotal2 }}
              <div class="show_pager">
                <Pager :total="dataTotal2" @change="handlePageChange2" :sizes="sizes" ref="pager2" />
              </div>
            </div>
          </div>
        </div>
      </el-tab-pane>

      <!-- 账户优惠券 -->
      <el-tab-pane
        label="账户优惠券"
        name="three"
        v-if="$_has_permission('FINANCE_SHIPPER_SURVEY_OWNERACCOUNTDETAILS_ACCOUNTDISCOUNT')"
      >
        <div style="height:100%;" class="identicalStyle" v-loading="loading3">
          <el-form :inline="true" class="demo-ruleForm classify_searchinfo">
            <el-form-item label="优惠券名称：">
              <el-input v-model="formAllData3.couponName" clearable></el-input>
            </el-form-item>
            <el-form-item label="券码状态：">
              <el-select v-model="formAllData3.couponStatus" placeholder="请选择">
                <el-option
                  v-for="item in couponStatusList"
                  :key="item.code"
                  :label="item.name"
                  :value="item.code"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item class="fr">
              <el-button
                type="primary"
                plain
                @click="getdata_search3"
                :size="btnsize"
                icon="el-icon-search"
              >搜索</el-button>
              <el-button
                type="info"
                plain
                @click="clearSearch3"
                :size="btnsize"
                icon="fontFamily aflc-icon-qingkong"
              >清空</el-button>
            </el-form-item>
          </el-form>
          <div class="classify_info">
            <div class="info_news">
              <el-table
                style="width: 100%"
                border
                height="93%"
                stripe
                ref="multipleTable3"
                :data="tableDataAll3"
              >
                <el-table-column label="序号" width="60">
                  <template slot-scope="scope">{{ (page3 - 1)*pagesize3 + scope.$index + 1 }}</template>
                </el-table-column>
                <el-table-column label="优惠券名称" prop="couponName" show-overflow-tooltip sortable></el-table-column>
                <el-table-column label="优惠券类型" prop="couponTypeName" sortable></el-table-column>
                <el-table-column label="金额/折扣" prop="remissionDiscount" sortable></el-table-column>
                <el-table-column label="优惠券码" prop="couponNum" sortable></el-table-column>
                <el-table-column label="手机号码" prop="mobile" sortable></el-table-column>
                <el-table-column label="派发时间" prop="grantTime" show-overflow-tooltip sortable></el-table-column>
                <el-table-column label="过期时间" prop="endTime" show-overflow-tooltip sortable></el-table-column>
                <el-table-column label="券码状态" prop="couponStatusName" sortable></el-table-column>
                <el-table-column label="使用时间" prop="tradeTime" sortable></el-table-column>
                <el-table-column label="订单号" prop="orderSerial" show-overflow-tooltip sortable></el-table-column>
                <el-table-column label="订单优惠金额" prop="orderDiscountAmount" sortable></el-table-column>
              </el-table>
            </div>
            <div class="info_tab_footer">
              共计:{{ dataTotal3 }}
              <div class="show_pager">
                <Pager :total="dataTotal3" @change="handlePageChange3" :sizes="sizes" ref="pager3" />
              </div>
            </div>
          </div>
        </div>
      </el-tab-pane>

      <!-- 优惠金使用记录 -->
      <el-tab-pane
        label="优惠金使用记录"
        name="four"
        v-if="$_has_permission('FINANCE_SHIPPER_SURVEY_OWNERACCOUNTDETAILS_USE RECORDOFPREMIUM')"
      >
        <div style="height:100%;" class="identicalStyle" v-loading="loading4">
          <el-form :inline="true" class="demo-ruleForm classify_searchinfo">
            <el-form-item label="所属区域：">
              <GetCityList ref="area" v-model="formAllData4.areaCode" @returnStr="getStr"></GetCityList>
            </el-form-item>
            <el-form-item label="交易时间：">
              <el-date-picker
                is-range
                unlink-panels
                v-model="cTimeTime"
                type="monthrange"
                range-separator="-"
                start-placeholder="开始月份"
                end-placeholder="结束月份"
                @change="cTime3"
                value-format="yyyy-MM"
              ></el-date-picker>
            </el-form-item>
            <el-form-item class="fr">
              <el-button
                type="primary"
                plain
                @click="getdata_search4"
                :size="btnsize"
                icon="el-icon-search"
              >搜索</el-button>
              <el-button
                type="info"
                plain
                @click="clearSearch4"
                :size="btnsize"
                icon="fontFamily aflc-icon-qingkong"
              >清空</el-button>
            </el-form-item>
          </el-form>
          <div class="classify_info">
            <div class="btns_box">
              <el-button
                type="primary"
                :size="btnsize"
                icon="el-icon-download"
                plain
                @click="importExcel"
                v-has:FINANCE_SHIPPER_SURVEY_OWNERACCOUNTDETAILS_USE
                RECORDOFPREMIUM_EXPORT
              >导出Excel</el-button>
              <span class="description">优惠金使用金额：{{rewardSumWhole}}</span>
            </div>
            <div class="info_news">
              <el-table
                style="width: 100%"
                border
                height="93%"
                stripe
                ref="multipleTable4"
                :data="tableDataAll4"
              >
                <el-table-column label="序号" width="60">
                  <template slot-scope="scope">{{ (page4 - 1)*pagesize4 + scope.$index + 1 }}</template>
                </el-table-column>
                <el-table-column
                  label="订单号"
                  prop="orderSerial"
                  show-overflow-tooltip
                  sortable
                  width="230px"
                >
                  <template slot-scope="scope">
                    <h4
                      class="needMoreInfo"
                      @click="pushOrderSerial(scope.row)"
                    >{{ scope.row.orderSerial}}</h4>
                  </template>
                </el-table-column>
                <el-table-column label="订单状态" prop="parentOrderStatus" sortable width="120px"></el-table-column>
                <el-table-column label="下单时间" prop="useTime" sortable width="180px"></el-table-column>
                <el-table-column label="交易时间" prop="tradeTime" sortable width="180px"></el-table-column>
                <el-table-column label="订单金额" prop="totalAmount" sortable width="110px"></el-table-column>
                <el-table-column
                  label="优惠金金额"
                  prop="rewardSum"
                  show-overflow-tooltip
                  sortable
                  width="110px"
                ></el-table-column>
                <el-table-column label="用户账号" prop="shipperMobile" sortable width="120px"></el-table-column>
                <el-table-column
                  label="服务"
                  prop="serivceCode"
                  show-overflow-tooltip
                  sortable
                  width="120px"
                ></el-table-column>
                <el-table-column label="车型" prop="carType" sortable width="120px"></el-table-column>
                <el-table-column label="所属区域" show-overflow-tooltip sortable>
                  <template
                    slot-scope="scope"
                  >{{scope.row.province}}{{scope.row.city}}{{scope.row.area}}</template>
                </el-table-column>
              </el-table>
            </div>
            <div class="info_tab_footer">
              共计:{{ dataTotal4 }}
              <div class="show_pager">
                <Pager :total="dataTotal4" @change="handlePageChange4" :sizes="sizes" ref="pager4" />
              </div>
            </div>
          </div>
        </div>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
<script>
import {
  data_Commission,
  data_CarList,
  data_MaidLevel,
  data_ServerClassList
} from "@/api/server/areaPrice.js";
import { eventBus } from "@/eventBus";
import {
  data_aflcCouponUseList,
  data_couponActive,
  data_aflcOrderPaymentList,
  userPaymentCount,
  userRechargeCount,
  findAflcRewardDetail,
  userRewardShipperExcel
} from "@/api/finance/transactionShipper";
import {
  data_aflcRechargeList,
  data_aflcRechargeListExcel
} from "@/api/finance/transactionRecharge.js";
import { data_aflcOrderPaymentListExcel } from "@/api/finance/transactionCar";
import Pager from "@/components/Pagination/index";
import { parseTime, pickerOptions2 } from "@/utils/";
import { getDictionary } from "@/api/common.js";
import {
  data_financeList,
  data_GetServerType,
  data_GetServerType2,
  data_GetServerType3
} from "@/api/finance/financeServer.js";
import GetCityList from "@/components/GetCityList/city";
export default {
  props: {
    templateItem: {
      type: [Object, String]
    },
    value: {
      type: String,
      default: ""
    },
    btntype: {
      type: String,
      default: ""
    },
    btntext: {
      type: String,
      default: ""
    },
    btntitle: {
      type: String,
      default: ""
    },
    icon: {
      type: String,
      default: ""
    },
    plain: {
      type: Boolean,
      default: false
    }
  },
  components: {
    Pager,
    GetCityList
  },
  watch: {
    dialogFormVisible_add: {
      handler: function(val, oldVal) {
        if (!val) {
        } else {
          this.getMoreInformation();
        }
      }
    }
  },
  data() {
    return {
      loading1: true,
      loading2: true,
      loading3: true,
      loading4: true,
      pickerOptions2: { shortcuts: pickerOptions2 },
      createTime: [],
      payTime: [],
      cTimeTime: [],
      rechargeChannelList: [
        { code: null, name: "全部" },
        { code: "0", name: "APP" },
        { code: "1", name: "WEB" }
      ],
      rechargeWayList: [
        { code: null, name: "全部" },
        { code: "0", name: "支付宝" },
        { code: "1", name: "微信" }
      ],
      btnsize: "mini",
      dialogFormVisible_add: false,
      autocheck: "first",
      formLabelWidth: "120px",
      sizes: [20, 50, 100, 400],
      pagesize: 20, //钱包明细初始化加载数量
      page: 1, //钱包明细初始化页码
      tableDataAll: [],
      dataTotal: null,
      pagesize2: 20, //充值记录初始化加载数量
      page2: 1, //充值记录初始化页码
      tableDataAll2: [],
      dataTotal2: null,
      pagesize3: 20, //账户优惠卷初始化加载数量
      page3: 1, //账户优惠卷初始化页码
      tableDataAll3: [],
      dataTotal3: null,
      pagesize4: 20, //优惠金使用记录初始化加载数量
      page4: 1, //优惠金使用记录初始化页码
      tableDataAll4: [],
      dataTotal4: null,
      formAllData: {
        userId: null,
        accountType: "AF00101",
        payWay: "AF0041801",
        tradeType: null,
        incomeExpendType: null,
        tradeStartTime: null,
        tradeEndTime: null
      },
      formAllData2: {
        name: null,
        mobile: null,
        rechargeChannel: null,
        rechargeWay: null,
        rechargeTime: null,
        accountId: null,
        startRechargeTime: null
      },
      formAllData3: {
        userId: null,
        couponName: null,
        couponStatus: null
      },
      formAllData4: {
        accountId: null,
        userType: "1",
        areaCode: null,
        startTime: null,
        endTime: null
      },
      orderData: {
        expendSum: null,
        incomeSum: null
      },
      orderData2: {
        giveSum: null,
        rechargeSum: null
      },
      rewardSumWhole: "",
      couponStatusList: [],
      optionsAccountType2: [
        { code: "AF01403", name: "订单多退" },
        { code: "AF01404", name: "理赔收入" },
        { code: "AF01407", name: "退运费" },
        { code: "AF01408", name: "运费收入" },
        { code: "AF01411", name: "支付运费" },
        { code: "AF01412", name: "支付理赔" },
        { code: "AF01414", name: "平台抽佣" },
        { code: "AF01501", name: "支付运费" },
        { code: "AF01503", name: "支付理赔" },
        { code: "AF01505", name: "优惠券" },
        { code: "AF01508", name: "运费收入" },
        { code: "AF01509", name: "理赔收入" },
        { code: "AF01510", name: "订单多退" },
        { code: "AF01511", name: "退运费" },
        { code: "AF01515", name: "优惠金" },
        { code: "AF01516", name: "奖励金" },
        { code: "AF01544", name: "订单少补" }
      ]
    };
  },
  methods: {
    // 钱包明细
    firstblood() {
      this.loading1 = true;
      data_aflcOrderPaymentList(
        this.page,
        this.pagesize,
        this.formAllData
      ).then(res => {
        this.dataTotal = res.data.totalCount;
        this.tableDataAll = res.data.list;
        this.loading1 = false;
      });
      userPaymentCount(this.$route.query.accountId).then(res => {
        this.orderData = res.data;
      });
    },

    // 充值记录
    firstblood2() {
      this.loading2 = true;
      data_aflcRechargeList(this.page2, this.pagesize2, this.formAllData2).then(
        res => {
          this.dataTotal2 = res.data.totalCount;
          this.tableDataAll2 = res.data.list;
          res.data.list.forEach(item => {
            item.rechargeTime = parseTime(
              item.rechargeTime,
              "{y}-{m}-{d} {h}:{i}:{s}"
            );
          });
          this.loading2 = false;
        }
      );
      userRechargeCount(this.$route.query.accountId).then(res => {
        this.orderData2 = res.data;
      });
    },
    // 优惠券领用
    firstblood3() {
      this.loading3 = true;
      data_aflcCouponUseList(
        this.page3,
        this.pagesize3,
        this.formAllData3
      ).then(res => {
        this.dataTotal3 = res.data.totalCount;
        this.tableDataAll3 = res.data.list;
        this.loading3 = false;
      });
    },

    // 优惠金使用记录
    firstblood4() {
      this.loading4 = true;
      findAflcRewardDetail(this.page4, this.pagesize4, this.formAllData4).then(
        res => {
          this.rewardSumWhole = res.data.list[0].rewardSumWhole;
          this.dataTotal4 = res.data.totalCount;
          this.tableDataAll4 =
            res.data.list[0].aflcUserRewardDriverDetailDtoList;
          this.tableDataAll4.forEach(item => {
            item.useTime = parseTime(item.useTime, "{y}-{m}-{d} {h}:{i}:{s}");
            item.tradeTime = parseTime(
              item.tradeTime,
              "{y}-{m}-{d} {h}:{i}:{s}"
            );
          });
          this.loading4 = false;
        }
      );
    },

    // 导出优惠金使用记录Excel
    importExcel() {
      this.$message.info("正在导出中...");
      userRewardShipperExcel(
        this.page4,
        this.pagesize4,
        this.formAllData4
      ).then(res => {
        console.log(res);
        var blob = new Blob([res]);
        this.href = window.URL.createObjectURL(blob);
        var NewDom = document.createElement("a");
        NewDom.setAttribute("href", this.href);
        NewDom.setAttribute("target", "_blank");
        NewDom.setAttribute("download", "优惠金使用记录.xls");
        document.body.appendChild(NewDom);
        NewDom.click();
        document.body.removeChild(NewDom);
      });
    },

    //钱包明细excel
    importExcel2() {
      this.$message.info("正在导出中...");
      data_aflcOrderPaymentListExcel(0, 0, this.formAllData).then(res => {
        var blob = new Blob([res]);
        this.href = window.URL.createObjectURL(blob);
        var NewDom = document.createElement("a");
        NewDom.setAttribute("href", this.href);
        NewDom.setAttribute("target", "_blank");
        NewDom.setAttribute("download", "钱包明细.xls");
        document.body.appendChild(NewDom);
        NewDom.click();
        document.body.removeChild(NewDom);
      });
    },

    //充值记录excel
    importExcel3() {
      this.$message.info("正在导出中...");
      data_aflcRechargeListExcel(0, 0, this.formAllData2).then(res => {
        var blob = new Blob([res]);
        this.href = window.URL.createObjectURL(blob);
        var NewDom = document.createElement("a");
        NewDom.setAttribute("href", this.href);
        NewDom.setAttribute("target", "_blank");
        NewDom.setAttribute("download", "充值明细.xls");
        document.body.appendChild(NewDom);
        NewDom.click();
        document.body.removeChild(NewDom);
      });
    },

    // 钱包记录每页显示数据量变更
    handlePageChange(obj) {
      this.page = obj.pageNum;
      this.pagesize = obj.pageSize;
      this.firstblood();
    },
    // 充值记录每页显示数据量变更
    handlePageChange2(obj) {
      this.page2 = obj.pageNum;
      this.pagesize2 = obj.pageSize;
      this.firstblood2();
    },
    // 优惠券领用细表每页显示数据量变更
    handlePageChange3(obj) {
      this.page3 = obj.pageNum;
      this.pagesize3 = obj.pageSize;
      this.firstblood3();
    },
    // 优惠金使用记录表每页显示数据量变更
    handlePageChange4(obj) {
      this.page4 = obj.pageNum;
      this.pagesize4 = obj.pageSize;
      this.firstblood4();
    },

    //钱包明细表查询按纽，按条件查询列表
    getdata_search(event) {
      this.firstblood();
    },
    clearSearch() {
      this.formAllData = {
        userId: this.$route.query.accountId,
        accountType: "AF00101",
        payWay: "AF0041801",
        tradeType: null,
        incomeExpendType: null,
        tradeStartTime: null,
        tradeEndTime: null
      };
      this.payTime = [];
      if (this.page != 1) {
        this.page = 1;
        this.$refs.pager1.inputval = this.page;
        this.$refs.pager1.pageNum = this.page;
      }
      this.firstblood();
    },
    //充值记录表查询按纽，按条件查询列表
    getdata_search2(event) {
      this.firstblood2();
    },
    clearSearch2() {
      this.formAllData2 = {
        name: null,
        mobile: null,
        rechargeChannel: null,
        rechargeWay: null,
        rechargeTime: null,
        accountId: this.$route.query.accountId
      };
      this.createTime = [];
      if (this.page2 != 1) {
        this.page2 = 1;
        this.$refs.pager2.inputval = this.page2;
        this.$refs.pager2.pageNum = this.page2;
      }
      this.firstblood2();
    },

    //点击优惠券领用细表查询按纽，按条件查询列表
    getdata_search3(event) {
      this.firstblood3();
    },
    clearSearch3() {
      this.formAllData3 = {
        couponName: null,
        couponStatus: null,
        userId: this.$route.query.accountId
      };
      if (this.page3 != 1) {
        this.page3 = 1;
        this.$refs.pager3.inputval = this.page3;
        this.$refs.pager3.pageNum = this.page3;
      }
      this.firstblood3();
    },

    //点击优惠券领用细表查询按纽，按条件查询列表
    getdata_search4(event) {
      this.firstblood4();
    },
    clearSearch4() {
      this.formAllData4 = {
        userType: "1",
        areaCode: null,
        startTime: null,
        endTime: null,
        accountId: this.$route.query.accountId
      };
      this.cTimeTime = [];
      if (this.page4 != 1) {
        this.page4 = 1;
        this.$refs.pager4.inputval = this.page4;
        this.$refs.pager4.pageNum = this.page4;
      }
      this.$refs.area.clearData();
      this.firstblood4();
    },
    // 钱包明细交易时间
    cTime(i) {
      if (i !== null) {
        this.formAllData.tradeStartTime = i[0];
        this.formAllData.tradeEndTime = i[1];
      } else {
        this.formAllData.tradeStartTime = null;
        this.formAllData.tradeEndTime = null;
      }
    },
    // 充值记录交易时间
    cTime2(i) {
      if (i !== null) {
        this.formAllData2.startRechargeTime = i[0];
        this.formAllData2.endRechargeTime = i[1];
      } else {
        this.formAllData2.startRechargeTime = null;
        this.formAllData2.endRechargeTime = null;
      }
    },
    cTime3(i) {
      // console.log('dat',i)
      if (i !== null) {
        this.formAllData4.startTime = i[0];
        this.formAllData4.endTime = i[1];
      } else {
        this.formAllData4.startTime = null;
        this.formAllData4.endTime = null;
      }
    },

    // 获取对应的字典列表
    getMoreInformation() {
      getDictionary("AF0462").then(res => {
        this.couponStatusList = res.data;
      });
    },
    // 所属区域
    getStr(val) {
      this.formAllData4.areaCode = val.area.code;
    },
    //  流水号进入订单详情
    pushOrderSerial(item) {
      item.orderType == "AF01702"
        ? this.$router.push({
            name: "发物流订单详情",
            query: { orderSerial: item.orderSerial }
          })
        : this.$router.push({
            name: "订单详情",
            query: { orderSerial: item.orderSerial }
          });
    }
  },
  mounted() {
    this.getMoreInformation();
    this.formAllData3.userId = this.$route.query.accountId;
    this.formAllData2.accountId = this.$route.query.accountId;
    this.formAllData.userId = this.$route.query.accountId;
    this.formAllData4.accountId = this.$route.query.accountId;
    this.autocheck = sessionStorage.getItem("shipperTabName");
    this.firstblood();
    this.firstblood2();
    this.firstblood3();
    this.firstblood4();
  },
  beforeUpdate() {
    sessionStorage.setItem("shipperTabName", this.autocheck);
  }
};
</script>
<style lang="scss">
.Shipperwallet {
  .classify_info {
    padding-bottom: 0px;
  }
  .totle_info {
    font-size: 14px;
    padding: 10px 10px;
    position: relative;
    span {
      padding-right: 50px;
    }
    .el-button {
      position: absolute;
      right: 0px;
      top: 0px;
      span {
        padding-right: 0px;
      }
    }
  }
  .flexBox {
    display: flex;
    align-items: center;
  }
}
</style>