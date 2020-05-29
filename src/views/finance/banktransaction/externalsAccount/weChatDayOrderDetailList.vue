<template>
  <div class="identicalStyle" style="height:100%" v-loading="loading">
    <el-form :inline="true" class="demo-ruleForm classify_searchinfo">
      <el-form-item label="交易时间">
        <el-radio-group v-model="formAllData.dm" :size="btnsize">
          <el-radio-button label="d">按日</el-radio-button>
          <el-radio-button label="m">按月</el-radio-button>
        </el-radio-group>
      </el-form-item>
      <el-form-item>
        <el-date-picker
          v-model="formAllData.tradeTime"
          type="date"
          value-format="timestamp"
          placeholder="请选择日期"
          v-show="formAllData.dm=='d'"
        ></el-date-picker>
        <el-date-picker
          v-model="formAllData.tradeTime"
          type="month"
          value-format="timestamp"
          v-show="formAllData.dm=='m'"
          placeholder="请选择月份"
        ></el-date-picker>
      </el-form-item>
      <el-form-item label="商户订单号">
        <el-input clearable v-model.trim="formAllData.outTradeNo"></el-input>
      </el-form-item>
      <el-form-item label="交易状态">
        <el-input clearable v-model.trim="formAllData.tradeStatus"></el-input>
        <!-- <el-select v-model="formAllData.tradeStatus" clearable placeholder="请选择">
          <el-option
            v-for="item in tradeTypeList"
            :key="item.code"
            :label="item.name"
            :value="item.code"
          ></el-option>
        </el-select>-->
      </el-form-item>
      <el-form-item class="fr">
        <el-button
          type="primary"
          plain
          @click="getData_query"
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
      <div class="info_news">
        <el-table
          ref="multipleTable"
          style="width: 100%"
          stripe
          border
          height="100%"
          @row-click="clickDetails"
          :data="tableDataAll"
          tooltip-effect="dark"
        >
          <el-table-column label="序号" width="60">
            <template slot-scope="scope">{{ (page - 1)*pagesize + scope.$index + 1 }}</template>
          </el-table-column>
          <el-table-column
            label="交易时间"
            prop="tradeTime"
            sortable
            show-overflow-tooltip
            min-width="160"
          >
            <template slot-scope="scope">{{scope.row.tradeTime | parseTime}}</template>
          </el-table-column>
          <el-table-column
            label="公众账号ID"
            prop="appid"
            sortable
            show-overflow-tooltip
            min-width="160"
          ></el-table-column>
          <el-table-column label="商户号" prop="mchid" sortable show-overflow-tooltip min-width="130"></el-table-column>
          <el-table-column
            label="子商户号/特约商户号"
            prop="subMchid"
            sortable
            show-overflow-tooltip
            min-width="180"
          ></el-table-column>
          <!-- <el-table-column
            label="设备号"
            prop="deviceInfo"
            sortable
            show-overflow-tooltip
            min-width="160"
          ></el-table-column>-->
          <el-table-column
            label="微信订单号"
            prop="transactionId"
            sortable
            show-overflow-tooltip
            min-width="250"
          ></el-table-column>
          <el-table-column
            label="商户订单号"
            prop="outTradeNo"
            sortable
            show-overflow-tooltip
            min-width="280"
          ></el-table-column>
          <el-table-column
            label="用户标识"
            prop="openid"
            sortable
            show-overflow-tooltip
            min-width="270"
          ></el-table-column>
          <el-table-column
            label="交易类型"
            prop="tradeType"
            sortable
            show-overflow-tooltip
            min-width="110"
          ></el-table-column>
          <el-table-column
            label="交易状态"
            prop="tradeStatus"
            sortable
            show-overflow-tooltip
            min-width="110"
          ></el-table-column>
          <el-table-column
            label="付款银行"
            prop="bankType"
            sortable
            show-overflow-tooltip
            min-width="120"
          ></el-table-column>
          <el-table-column
            label="货币种类"
            prop="feeType"
            sortable
            show-overflow-tooltip
            min-width="110"
          ></el-table-column>
          <el-table-column
            label="应结订单金额"
            prop="orderPay"
            sortable
            show-overflow-tooltip
            min-width="130"
          ></el-table-column>
          <el-table-column
            label="代金券金额"
            prop="voucherAmount"
            sortable
            show-overflow-tooltip
            min-width="120"
          ></el-table-column>
          <el-table-column
            label="微信退款单号"
            prop="refundNumber"
            sortable
            show-overflow-tooltip
            min-width="230"
          ></el-table-column>
          <el-table-column
            label="商户退款单号"
            prop="outRefundNo"
            sortable
            show-overflow-tooltip
            min-width="230"
          ></el-table-column>
          <el-table-column
            label="退款金额"
            prop="refundAmount"
            sortable
            show-overflow-tooltip
            min-width="110"
          ></el-table-column>
          <el-table-column
            label="充值券退款金额"
            prop="refundAmountVoucher"
            sortable
            show-overflow-tooltip
            min-width="150"
          ></el-table-column>
          <el-table-column
            label="退款类型"
            prop="refundsType"
            sortable
            show-overflow-tooltip
            min-width="110"
          ></el-table-column>
          <el-table-column
            label="商品名称"
            prop="commodityName"
            sortable
            show-overflow-tooltip
            min-width="160"
          ></el-table-column>
          <!-- <el-table-column label="商户数据包" prop sortable show-overflow-tooltip min-width="160"></el-table-column> -->
          <el-table-column
            label="手续费"
            prop="serviceCharge"
            sortable
            show-overflow-tooltip
            min-width="100"
          ></el-table-column>
          <el-table-column label="费率" prop="rate" sortable show-overflow-tooltip min-width="160"></el-table-column>
          <el-table-column
            label="订单金额"
            prop="orderAmount"
            sortable
            show-overflow-tooltip
            min-width="110"
          ></el-table-column>
          <el-table-column
            label="申请退款金额"
            prop="applicationRefundAmount"
            sortable
            show-overflow-tooltip
            min-width="130"
          ></el-table-column>
          <el-table-column
            label="费率备注"
            prop="rateNotes"
            sortable
            show-overflow-tooltip
            min-width="110"
          ></el-table-column>
        </el-table>
      </div>
      <!-- 页码 -->
      <div class="info_tab_footer">
        共计:{{ dataTotal }}
        <div class="show_pager">
          <Pager :total="dataTotal" @change="handlePageChange" :sizes="sizes" ref="pager" />
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { aflcWxDownloadBillDetail } from "@/api/finance/banktransaction";
import Pager from "@/components/Pagination/index";
import { parseTime, pickerOptions2 } from "@/utils/";
import { getDictionary } from "@/api/common.js";
export default {
  name: "weChatDayOrderDetailList",
  data() {
    return {
      loading: false,
      pickerOptions2: { shortcuts: pickerOptions2 },
      btnsize: "mini",
      selectRowData: [],
      sizes: [20, 50, 100, 400],
      pagesize: 20, // 初始化加载数量
      page: 1, // 初始化页码
      dataTotal: 0,
      tableDataAll: [],
      // tradeTypeList: [
      //   { name: "全部", code: "0" },
      //   { name: "收入", code: "1" },
      //   { name: "支出", code: "2" }
      // ],
      formAllData: {
        dm: "", //按日还是按月搜索 d按日 m按月
        tradeStatus: null,
        outTradeNo: null,
        tradeTime: null
      }
    };
  },
  components: {
    Pager
  },
  watch: {
    $route(to, from) {
      if (to.name == "微信账务订单明细") {
        let newQuery = to.fullPath.slice(to.fullPath.indexOf("?") + 1);
        if (newQuery !== sessionStorage.getItem("wxOrderOldQuery")) {
          this.init();
        }
      }
    }
  },
  methods: {
    // 列表刷新页面
    firstblood() {
      this.loading = true;
      this.resetTradeTime();
      // console.log("hhhhh", this.formAllData);
      aflcWxDownloadBillDetail(this.page, this.pagesize, this.formAllData)
        .then(res => {
          this.dataTotal = res.data.totalCount;
          this.tableDataAll = res.data.list;
          this.loading = false;
        })
        .catch(err => {
          this.$message.error(err.errorInfo || err.text);
          this.loading = false;
        });
    },
    //  查询
    getData_query() {
      this.page = 1;
      this.$refs.pager.inputval = this.page;
      this.$refs.pager.pageNum = this.page;
      this.firstblood();
    },
    // 清空
    clearSearch() {
      this.formAllData = {};
      if (this.page != 1) {
        this.page = 1;
        this.$refs.pager.inputval = this.page;
        this.$refs.pager.pageNum = this.page;
      }
      this.firstblood();
    },
    // 点击选中当前行
    clickDetails(row, event, column) {
      this.$refs.multipleTable.toggleRowSelection(row);
    },
    // 每页显示数据量变更
    handlePageChange(obj) {
      this.page = obj.pageNum;
      this.pagesize = obj.pageSize;
      this.firstblood();
    },
    resetTradeTime() {
      if (this.formAllData.tradeTime && this.formAllData.dm == "m") {
        this.formAllData.tradeTime = new Date(
          parseTime(this.formAllData.tradeTime, "{y}-{m}") + "-01 00:00:00"
        ).getTime();
      }
    },
    init() {
      this.formAllData.tradeTime = Math.round(
        new Date(this.$route.query.tradeTime + " 00:00:00")
      );
      this.formAllData.dm = this.$route.query.searchType;
      sessionStorage.setItem(
        "wxOrderOldQuery",
        this.$route.fullPath.slice(this.$route.fullPath.indexOf("?") + 1)
      );
      if (this.page != 1) {
        this.page = 1;
        this.$refs.pager.inputval = this.page;
        this.$refs.pager.pageNum = this.page;
      }
      this.firstblood();
    }
  },
  mounted() {
    setTimeout(() => {
      this.$refs.multipleTable.$el.style.height =
        this.$refs.multipleTable.$el.offsetHeight + "px";
    }, 300);
    this.init();
  }
};
</script>
<style lang="scss" scoped>
</style>

