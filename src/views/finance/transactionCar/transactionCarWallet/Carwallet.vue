<template>
  <div class="Carwallet tabsWrap">
    <el-tabs v-model="autocheck" type="card">
      <!-- 流水明细 -->
      <el-tab-pane
        label="流水明细"
        name="first"
        v-if="$_has_permission('FINANCE_DRIVER_SURVEY_OWNERACCOUNTDETAILS_FLOWDETAILS')"
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
                <el-option
                  v-for="item in incomeExpendTypeList"
                  :key="item.code"
                  :label="item.name"
                  :value="item.code"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="交易时间：">
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
                v-has:FINANCE_DRIVER_SURVEY_OWNERACCOUNTDETAILS_FLOWDETAILS_EXPORT
              >导出Excel</el-button>
              <span class="description">收入金额：{{orderData.incomeSum}}</span>
              <span class="description">支出金额：{{orderData.expendSum}}</span>
            </div>
            <div class="info_news">
              <el-table
                style="width: 100%"
                stripe
                border
                height="93%"
                ref="multipleTable"
                :data="tableDataAll"
                tooltip-effect="dark"
              >
                <el-table-column label="序号" width="60">
                  <template slot-scope="scope">{{ (page - 1)*pagesize + scope.$index + 1 }}</template>
                </el-table-column>
                <el-table-column
                  label="订单流水号"
                  prop="orderSerial"
                  sortable
                  show-overflow-tooltip
                  width="250"
                >
                  <template slot-scope="scope">
                    <h4
                      class="needMoreInfo"
                      @click="pushOrderSerial(scope.row)"
                    >{{ scope.row.orderSerial}}</h4>
                  </template>
                </el-table-column>
                <el-table-column
                  label="交易流水号"
                  prop="tradeSerial"
                  sortable
                  show-overflow-tooltip
                  width="250"
                ></el-table-column>
                <el-table-column label="车主账号" prop="accountName" sortable show-overflow-tooltip></el-table-column>
                <el-table-column label="服务分类" prop="orderTypeName" sortable></el-table-column>
                <el-table-column label="交易类型" prop="tradeTypeName" sortable></el-table-column>
                <el-table-column label="流水类型" prop="incomeExpendTypeName" sortable>
                  <!-- <template slot-scope="scope">
                    <span
                      :class="{blackName: scope.row.incomeExpendType == 0,normalName :scope.row.incomeExpendType == 1}"
                    >{{scope.row.incomeExpendType==1?'流入':'流出'}}</span>
                  </template>-->
                </el-table-column>
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

      <!-- 提现记录 -->
      <el-tab-pane
        label="提现记录"
        name="second"
        v-if="$_has_permission('FINANCE_DRIVER_SURVEY_OWNERACCOUNTDETAILS_WITHDRAWALSRECORD')"
      >
        <div style="height:100%;" class="identicalStyle" v-loading="loading2">
          <el-form :inline="true" class="demo-ruleForm classify_searchinfo">
            <el-form-item label="收款方式：">
              <el-select v-model="formAllData2.extractWay" placeholder="请选择" clearable>
                <el-option
                  v-for="item in extractWayList"
                  :key="item.code"
                  :label="item.name"
                  :value="item.code"
                  :disabled="item.disabled"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="处理时间：">
              <el-date-picker
                v-model="payTime2"
                is-range
                unlink-panels
                type="daterange"
                :picker-options="pickerOptions2"
                range-separator="-"
                start-placeholder="开始时间"
                end-placeholder="结束时间"
                placeholder="选择时间范围"
                :default-time="['00:00:00', '23:59:59']"
                @change="cTime2"
              ></el-date-picker>
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
              <span class="description">已提现金额：{{orderData2.successExtract}}</span>
              <span class="description">可提现金额：{{orderData2.availableAmount}}</span>
              <span class="description">待处理提现金额：{{orderData2.pendingExtract}}</span>
            </div>
            <div class="info_news">
              <el-table
                style="width: 100%"
                border
                height="93%"
                ref="multipleTable2"
                :data="tableDataAll2"
              >
                <el-table-column label="序号" width="60">
                  <template slot-scope="scope">{{ (page2 - 1)*pagesize2 + scope.$index + 1 }}</template>
                </el-table-column>
                <el-table-column label="流水号" prop="extractSerial" width="280" sortable>
                  <template slot-scope="scope">
                    <h4
                      class="needMoreInfo"
                      @click="OpenDetail(scope.row)"
                    >{{scope.row.extractSerial}}</h4>
                  </template>
                </el-table-column>
                <el-table-column label="申请时间" prop="createTime" sortable></el-table-column>
                <el-table-column label="用户姓名" prop="name" sortable></el-table-column>
                <el-table-column label="用户账号" prop="mobile" sortable></el-table-column>
                <el-table-column label="提现金额" prop="extractSum" width="100" sortable></el-table-column>
                <el-table-column label="手续费" prop width="100" sortable></el-table-column>
                <el-table-column label="收款方式" prop="extractWay" width="100" sortable></el-table-column>
                <el-table-column label="收款账号" prop="extractAccount" show-overflow-tooltip sortable></el-table-column>
                <el-table-column label="处理状态" prop="auditOpinion" width="120" sortable>
                  <template slot-scope="scope">
                    <span
                      :class="{freezeName: scope.row.auditOpinion == '待处理' ,blackName: scope.row.auditOpinion == '审核不通过',normalName :scope.row.auditOpinion == '审核通过'}"
                    >{{scope.row.auditOpinion}}</span>
                  </template>
                </el-table-column>
                <el-table-column label="提现状态" prop="extractStatus" width="120" sortable>
                  <template slot-scope="scope">
                    <span
                      :class="{freezeName: scope.row.extractStatus == '提现中' ,blackName: scope.row.extractStatus == '提现失败',normalName :scope.row.extractStatus == '提现成功'}"
                    >{{scope.row.extractStatus}}</span>
                  </template>
                </el-table-column>
                <el-table-column label="处理时间" prop="updateTime" sortable></el-table-column>
              </el-table>
            </div>
            <div class="info_tab_footer">
              共计:{{ dataTotal2}}
              <div class="show_pager">
                <Pager :total="dataTotal2" @change="handlePageChange2" :sizes="sizes" ref="pager2" />
              </div>
            </div>
          </div>
          <cashAuditingDetail
            :editType="editType"
            :btntitle="btntitle"
            :params="paramsView"
            :dialogFormVisible_add.sync="dialogFormVisible_add"
          ></cashAuditingDetail>
        </div>
      </el-tab-pane>

      <!-- 奖励金使用记录 -->
      <el-tab-pane
        label="奖励金使用记录"
        name="six"
        v-if="$_has_permission('FINANCE_DRIVER_SURVEY_OWNERACCOUNTDETAILS_DETAILSUSE')"
      >
        <div style="height:100%;" class="identicalStyle" v-loading="loading6">
          <el-form :inline="true" class="demo-ruleForm classify_searchinfo">
            <el-form-item label="所属区域：">
              <GetCityList ref="area" v-model="formAllData6.areaCode" @returnStr="getStr"></GetCityList>
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
                @click="getdata_search6"
                :size="btnsize"
                icon="el-icon-search"
              >搜索</el-button>
              <el-button
                type="info"
                plain
                @click="clearSearch6"
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
                v-has:FINANCE_DRIVER_SURVEY_OWNERACCOUNTDETAILS_DETAILSUSE_EXPORT
              >导出Excel</el-button>
              <span class="description">奖励金使用金额：{{rewardSumWhole}}</span>
            </div>
            <div class="info_news">
              <el-table
                style="width: 100%"
                border
                height="93%"
                ref="multipleTable6"
                :data="tableDataAll6"
              >
                <el-table-column label="序号" width="60">
                  <template slot-scope="scope">{{ (page6 - 1)*pagesize6 + scope.$index + 1 }}</template>
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
                  label="奖励金"
                  prop="rewardSum"
                  show-overflow-tooltip
                  sortable
                  width="110px"
                ></el-table-column>
                <el-table-column label="用户账号" prop="driverMobile" sortable width="120px"></el-table-column>
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
              共计:{{ dataTotal6}}
              <div class="show_pager">
                <Pager :total="dataTotal6" @change="handlePageChange6" :sizes="sizes" ref="pager6" />
              </div>
            </div>
          </div>
        </div>
      </el-tab-pane>

      <!-- 保证金 -->
      <el-tab-pane
        label="保证金"
        name="three"
        v-if="$_has_permission('FINANCE_DRIVER_SURVEY_OWNERACCOUNTDETAILS_BOND')"
      >
        <div style="height:100%;" class="identicalStyle" v-loading="loading3">
          <div class="classify_info">
            <div class="info_news">
              <el-table
                style="width: 100%"
                border
                height="93%"
                ref="multipleTable3"
                :data="tableDataAll3"
              >
                <el-table-column label="序号" width="60">
                  <template slot-scope="scope">{{ (page3 - 1)*pagesize3 + scope.$index + 1 }}</template>
                </el-table-column>
                <el-table-column label="交易单号" prop="orderSerial" sortable show-overflow-tooltip></el-table-column>
                <el-table-column label="交易时间" prop="createTime" sortable show-overflow-tooltip></el-table-column>
                <el-table-column
                  label="交易分类"
                  prop="guaranteeAmountType"
                  sortable
                  show-overflow-tooltip
                >
                  <template slot-scope="scope">
                    <span
                      :class="{normalName: scope.row.guaranteeAmountType == '0',blackName :scope.row.guaranteeAmountType == '1'}"
                    >{{scope.row.guaranteeAmountType=='0'?'缴纳保证金':'扣除保证金'}}</span>
                  </template>
                </el-table-column>
                <el-table-column label="金额" prop="guaranteeAmount" sortable show-overflow-tooltip>
                  <template slot-scope="scope">
                    <span
                      :class="{normalName: scope.row.guaranteeAmountType == '0',blackName :scope.row.guaranteeAmountType == '1'}"
                    >
                      <span
                        v-if="scope.row.guaranteeAmountType=='0'&&scope.row.guaranteeAmount!==null"
                      >+</span>
                      <span
                        v-else-if="scope.row.guaranteeAmountType=='1'&&scope.row.guaranteeAmount!==null"
                      >-</span>
                      {{scope.row.guaranteeAmount}}
                    </span>
                  </template>
                </el-table-column>
              </el-table>
            </div>
            <div class="info_tab_footer">
              共计:{{ dataTotal3}}
              <div class="show_pager">
                <Pager :total="dataTotal" @change="handlePageChange3" :sizes="sizes" ref="pager3" />
              </div>
            </div>
          </div>
        </div>
      </el-tab-pane>

      <!-- 行为分 -->
      <el-tab-pane
        label="行为分"
        name="four"
        v-if="$_has_permission('FINANCE_DRIVER_SURVEY_OWNERACCOUNTDETAILS_BEHAVIORSCORE')"
      >
        <div style="height:100%;" class="identicalStyle" v-loading="loading4">
          <div class="classify_info">
            <div class="info_news">
              <el-table
                style="width: 100%"
                border
                height="93%"
                ref="multipleTable4"
                :data="tableDataAll4"
              >
                <el-table-column label="序号" width="60">
                  <template slot-scope="scope">{{ (page4 - 1)*pagesize4 + scope.$index + 1 }}</template>
                </el-table-column>
                <el-table-column
                  label="订单编号"
                  prop="orderSerial"
                  sortable
                  show-overflow-tooltip
                  width="230"
                >
                  <template slot-scope="scope">
                    <h4
                      class="needMoreInfo"
                      @click="pushOrderSerial(scope.row)"
                    >{{ scope.row.orderSerial}}</h4>
                  </template>
                </el-table-column>
                <el-table-column
                  label="提货地"
                  prop="startAddress"
                  sortable
                  show-overflow-tooltip
                  width="200"
                ></el-table-column>
                <el-table-column
                  label="到达地"
                  prop="endAddress"
                  sortable
                  show-overflow-tooltip
                  width="200"
                ></el-table-column>
                <el-table-column
                  label="订单总额"
                  prop="totalAmount"
                  sortable
                  show-overflow-tooltip
                  width="100"
                ></el-table-column>
                <el-table-column
                  label="扣除/补贴行为分原因"
                  prop="riskControlName"
                  sortable
                  show-overflow-tooltip
                ></el-table-column>
                <el-table-column
                  label="扣除/补贴行为分"
                  prop="behaviorScore"
                  sortable
                  show-overflow-tooltip
                  width="150"
                ></el-table-column>
                <el-table-column
                  label="操作时间"
                  prop="createTime"
                  sortable
                  show-overflow-tooltip
                  width="200"
                ></el-table-column>
                <el-table-column
                  label="操作人"
                  prop="creater"
                  sortable
                  show-overflow-tooltip
                  width="150"
                ></el-table-column>
              </el-table>
            </div>
            <div class="info_tab_footer">
              共计:{{ dataTotal4}}
              <div class="show_pager">
                <Pager :total="dataTotal4" @change="handlePageChange4" :sizes="sizes" ref="pager4" />
              </div>
            </div>
          </div>
        </div>
      </el-tab-pane>

      <!-- 28币 -->
      <el-tab-pane
        label="28币"
        name="five"
        v-if="$_has_permission('FINANCE_DRIVER_SURVEY_OWNERACCOUNTDETAILS_CURRENCY')"
      >
        <div style="height:100%;" class="identicalStyle" v-loading="loading5">
          <div class="classify_info">
            <div class="info_news">
              <el-table
                style="width: 100%"
                border
                height="93%"
                ref="multipleTable5"
                :data="tableDataAll5"
              >
                <el-table-column label="序号" width="60">
                  <template slot-scope="scope">{{ (page5 - 1)*pagesize5 + scope.$index + 1 }}</template>
                </el-table-column>
                <el-table-column label="发放/扣回" prop="grantDiscount" sortable show-overflow-tooltip></el-table-column>
                <el-table-column label="科目" prop="subject" sortable show-overflow-tooltip></el-table-column>
                <el-table-column label="28币" prop="coins" sortable show-overflow-tooltip>
                  <template slot-scope="scope">
                    <span
                      v-if="scope.row.grantDiscount == '发放'"
                      style="color:red;"
                    >{{scope.row.coins}}</span>
                    <span v-else style="color:#00e500;">{{scope.row.coins}}</span>
                  </template>
                </el-table-column>
                <el-table-column
                  label="发放加速倍数"
                  prop="releaseMultiple"
                  sortable
                  show-overflow-tooltip
                ></el-table-column>
                <el-table-column label="发放城市" prop="grantPlace" sortable show-overflow-tooltip></el-table-column>
                <el-table-column
                  label="会员有效期至"
                  prop="grantPlaceTime"
                  sortable
                  show-overflow-tooltip
                ></el-table-column>
              </el-table>
            </div>
            <div class="info_tab_footer">
              共计:{{ dataTotal5}}
              <div class="show_pager">
                <Pager :total="dataTotal5" @change="handlePageChange5" :sizes="sizes" ref="pager5" />
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
import {
  data_aflcOrderPaymentList,
  userPaymentCount,
  data_findAflcDriverDystropyDetail,
  DriverAccountDetailsList,
  data_aflcDriverDeposit,
  userRewardDriveExcel,
  data_aflcOrderPaymentListExcel
} from "@/api/finance/transactionCar";
import { eventBus } from "@/eventBus";
import { data_aflcExtractCashList } from "@/api/finance/transactionCash.js";
import { parseTime, pickerOptions2 } from "@/utils/";
import Pager from "@/components/Pagination/index";
import cashAuditingDetail from "../../transactionCash/cashAuditing/cashAuditingDetail.vue";
import { findAflcRewardDetail } from "@/api/finance/transactionShipper";
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
    cashAuditingDetail,
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
      loading5: true,
      loading6: true,
      pickerOptions2: { shortcuts: pickerOptions2 },
      editType: "edit",
      btntitle: "审核",
      btnsize: "mini",
      paramsView: {},
      dialogFormVisible_add: false,
      autocheck: "first",
      formLabelWidth: "120px",
      payTime: [],
      payTime2: [],
      sizes: [20, 50, 100, 400],
      pagesize: 20, //初始化加载数量
      page: 1, //初始化页码
      tableDataAll: [],
      dataTotal: null,
      pagesize2: 20, //初始化加载数量
      page2: 1, //初始化页码
      tableDataAll2: [],
      dataTotal2: null,
      pagesize3: 20, //初始化加载数量
      page3: 1, //初始化页码
      tableDataAll3: [],
      dataTotal3: null,
      pagesize4: 20, //初始化加载数量
      page4: 1, //初始化页码
      tableDataAll4: [],
      dataTotal4: null,
      pagesize5: 20, //初始化加载数量
      page5: 1, //初始化页码
      tableDataAll5: [],
      dataTotal5: null,
      pagesize6: 20, //初始化加载数量
      page6: 1, //初始化页码
      tableDataAll6: [],
      dataTotal6: null,
      formAllData: {
        userId: null,
        accountType: "AF00102",
        payWay: "AF0041801",
        tradeType: null,
        incomeExpendType: null,
        tradeStartTime: null,
        tradeEndTime: null
      },
      formAllData2: {
        startExtractTime: null,
        endExtractTime: null,
        extractWay: null,
        accountId: null
      },
      orderData: {
        expendSum: null,
        incomeSum: null
      },
      orderData2: {
        availableAmount: null,
        pendingExtract: null,
        successExtract: null
      },
      formAllData6: {
        userType: "0",
        areaCode: null,
        startTime: null,
        endTime: null,
        accountId: null
      },
      cTimeTime: [],
      rewardSumWhole: null,
      optionsAccountType2: [
        { code: null, name: "全部" },
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
        { code: "AF01453", name: "分享奖励" },
      ],
      incomeExpendTypeList: [
        { code: null, name: "全部" },
        { code: "1", name: "流入" },
        { code: "0", name: "流出" }
      ],
      extractWayList: [
        { code: null, name: "全部" },
        { code: "0", name: "支付宝" },
        { code: "1", name: "微信" }
      ]
    };
  },
  methods: {
    // 交易时间处理
    cTime(i) {
      if (i !== null) {
        this.formAllData.tradeStartTime = i[0];
        this.formAllData.tradeEndTime = i[1];
      } else {
        this.formAllData.tradeStartTime = null;
        this.formAllData.tradeEndTime = null;
      }
    },
    // 处理时间处理
    cTime2(i) {
      if (i !== null) {
        this.formAllData2.startAuditTime = i[0];
        this.formAllData2.endAuditTime = i[1];
      } else {
        this.formAllData2.startAuditTime = null;
        this.formAllData2.endAuditTime = null;
      }
    },
    // 处理时间处理
    cTime3(i) {
      if (i !== null) {
        this.formAllData6.startTime = i[0];
        this.formAllData6.endTime = i[1];
      } else {
        this.formAllData6.startTime = null;
        this.formAllData6.endTime = null;
      }
    },
    // 流水明细每页显示数据量变更
    handlePageChange(obj) {
      this.page = obj.pageNum;
      this.pagesize = obj.pageSize;
      this.firstblood();
    },
    // 提现记录每页显示数据量变更
    handlePageChange2(obj) {
      this.page2 = obj.pageNum;
      this.pagesize2 = obj.pageSize;
      this.firstblood2();
    },
    // 保证金每页显示数据量变更
    handlePageChange3(obj) {
      this.page3 = obj.pageNum;
      this.pagesize3 = obj.pageSize;
      this.firstblood3();
    },
    // 行为分每页显示数据量变更
    handlePageChange4(obj) {
      this.page4 = obj.pageNum;
      this.pagesize4 = obj.pageSize;
      this.firstblood4();
    },
    // 28币每页显示数据量变更
    handlePageChange5(obj) {
      this.page5 = obj.pageNum;
      this.pagesize5 = obj.pageSize;
      this.firstblood5();
    },
    // 奖励金使用记录每页显示数据量变更
    handlePageChange6(obj) {
      this.page6 = obj.pageNum;
      this.pagesize6 = obj.pageSize;
      this.firstblood6();
    },
    // 钱包记录条件搜索
    getdata_search(event) {
      this.page = 1;
      this.$refs.pager1.inputval = this.page;
      this.$refs.pager1.pageNum = this.page;
      this.firstblood();
    },
    // 钱包记录条件搜索清空
    clearSearch() {
      this.payTime = [];
      this.formAllData = {
        userId: this.$route.query.accountId,
        accountType: "AF00102",
        payWay: "AF0041801",
        tradeType: null,
        incomeExpendType: null,
        tradeStartTime: null,
        tradeEndTime: null
      };
      if (this.page != 1) {
        this.page = 1;
        this.$refs.pager1.inputval = this.page;
        this.$refs.pager1.pageNum = this.page;
      }
      this.firstblood();
    },
    // 提现记录条件搜索
    getdata_search2(event) {
      this.page2 = 1;
      this.$refs.pager2.inputval = this.page2;
      this.$refs.pager2.pageNum = this.page2;
      this.firstblood2();
    },
    // 奖励金使用记录条件搜索
    getdata_search6(event) {
      this.page6 = 1;
      this.$refs.pager6.inputval = this.page6;
      this.$refs.pager6.pageNum = this.page6;
      this.firstblood6();
    },

    // 提现记录条件搜索清空
    clearSearch2() {
      this.payTime2 = [];
      this.formAllData2 = {
        startExtractTime: null,
        endExtractTime: null,
        extractWay: null,
        accountId: this.$route.query.accountId
      };
      if (this.page2 != 1) {
        this.page2 = 1;
        this.$refs.pager2.inputval = this.page2;
        this.$refs.pager2.pageNum = this.page2;
      }
      this.firstblood2();
    },
    // 奖励金使用记录搜素清空
    clearSearch6() {
      this.formAllData6 = {
        userType: "0",
        areaCode: null,
        startTime: null,
        endTime: null,
        accountId: this.$route.query.accountId
      };
      this.cTimeTime = [];
      if (this.page6 != 1) {
        this.page6 = 1;
        this.$refs.pager6.inputval = this.page6;
        this.$refs.pager6.pageNum = this.page6;
      }
      this.$refs.area.clearData();
      this.firstblood6();
    },
    // 流水明细列表
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
    // 导出流水明细列表
    importExcel2() {
      this.$message.info("正在导出中...");
      data_aflcOrderPaymentListExcel(0, 0, this.formAllData).then(res => {
        var blob = new Blob([res]);
        this.href = window.URL.createObjectURL(blob);
        var NewDom = document.createElement("a");
        NewDom.setAttribute("href", this.href);
        NewDom.setAttribute("target", "_blank");
        NewDom.setAttribute("download", "流水明细.xls");
        document.body.appendChild(NewDom);
        NewDom.click();
        document.body.removeChild(NewDom);
      });
    },
    // 提现记录列表
    firstblood2() {
      this.loading2 = true;
      data_aflcExtractCashList(
        this.page2,
        this.pagesize2,
        this.formAllData2
      ).then(res => {
        this.dataTotal2 = res.data.pageData.totalCount;
        this.tableDataAll2 = res.data.pageData.list;
        this.tableDataAll2.forEach(item => {
          item.createTime = parseTime(
            item.createTime,
            "{y}-{m}-{d} {h}:{i}:{s}"
          );
          item.updateTime = parseTime(
            item.updateTime,
            "{y}-{m}-{d} {h}:{i}:{s}"
          );
        });
        this.orderData2 = res.data.aflcDriverSumExtractCashDto;
        this.loading2 = false;
      });
    },
    //  保证金列表
    firstblood3() {
      this.loading3 = true;
      data_aflcDriverDeposit(this.page3, this.pagesize3, {
        driverId: this.$route.query.accountId
      }).then(res => {
        console.log("保证金", res);
        this.dataTotal3 = res.data.totalCount;
        this.tableDataAll3 = res.data.list;
        this.tableDataAll3.forEach(item => {
          item.createTime = parseTime(
            item.createTime,
            "{y}-{m}-{d} {h}:{i}:{s}"
          );
        });
        this.loading3 = false;
      });
    },
    // 行为分列表
    firstblood4() {
      this.loading4 = true;
      data_findAflcDriverDystropyDetail(
        this.$route.query.accountId,
        this.page4,
        this.pagesize4
      ).then(res => {
        console.log("行为分", res);
        this.dataTotal4 = res.data.totalCount;
        this.tableDataAll4 = res.data.list;
        this.tableDataAll4.forEach(item => {
          item.createTime = parseTime(
            item.createTime,
            "{y}-{m}-{d} {h}:{i}:{s}"
          );
        });
        this.loading4 = false;
      });
    },
    // 28币列表
    firstblood5() {
      this.loading5 = true;
      DriverAccountDetailsList(this.page5, this.pagesize5, {
        userId: this.$route.query.accountId
      }).then(res => {
        console.log("28币", res);
        this.dataTotal5 = res.data.totalCount;
        this.tableDataAll5 = res.data.list;
        this.tableDataAll5.forEach(item => {
          item.grantPlaceTime = parseTime(
            item.grantPlaceTime,
            "{y}-{m}-{d} {h}:{i}:{s}"
          );
        });
        this.loading5 = false;
      });
    },
    // 奖励金使用记录列表
    firstblood6() {
      this.loading6 = true;
      findAflcRewardDetail(this.page6, this.pagesize6, this.formAllData6).then(
        res => {
          this.rewardSumWhole = res.data.list[0].rewardSumWhole;
          this.dataTotal6 = res.data.totalCount;
          this.tableDataAll6 =
            res.data.list[0].aflcUserRewardDriverDetailDtoList;
          this.tableDataAll6.forEach(item => {
            item.useTime = parseTime(item.useTime, "{y}-{m}-{d} {h}:{i}:{s}");
            item.tradeTime = parseTime(
              item.tradeTime,
              "{y}-{m}-{d} {h}:{i}:{s}"
            );
          });
          this.loading6 = false;
        }
      );
    },
    // 导出奖励金使用记录列表Excel
    importExcel() {
      userRewardDriveExcel(this.page6, this.pagesize6, this.formAllData6).then(
        res => {
          var blob = new Blob([res]);
          this.href = window.URL.createObjectURL(blob);
          var NewDom = document.createElement("a");
          NewDom.setAttribute("href", this.href);
          NewDom.setAttribute("target", "_blank");
          NewDom.setAttribute("download", "奖励金使用记录.xls");
          document.body.appendChild(NewDom);
          NewDom.click();
          document.body.removeChild(NewDom);
        }
      );
    },
    // 所属区域
    getStr(val) {
      this.formAllData6.areaCode = val.area.code;
    },
    //  流水号进入订单详情
    pushOrderSerial(item) {
      this.$router.push({
        name: "订单详情",
        query: { orderSerial: item.orderSerial }
      });
    },
    // 打开查看
    OpenDetail(val) {
      this.paramsView = val;
      this.editType = "view";
      this.typetitle = "查看";
      this.dialogFormVisible_add = true;
    },
    // 获取对应的字典列表
    getMoreInformation() {}
  },
  mounted() {
    this.formAllData.userId = this.$route.query.accountId;
    this.formAllData2.accountId = this.$route.query.accountId;
    this.formAllData6.accountId = this.$route.query.accountId;
    this.autocheck = sessionStorage.getItem("carOwnerTabName");
    this.firstblood();
    this.firstblood2();
    this.firstblood3();
    this.firstblood4();
    this.firstblood5();
    this.firstblood6();
  },
  beforeUpdate() {
    sessionStorage.setItem("carOwnerTabName", this.autocheck);
  }
};
</script>
<style lang="scss">
.Carwallet {
  .classify_info {
    padding-bottom: 0px;
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
  }
}
</style>