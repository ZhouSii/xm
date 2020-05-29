<template>
  <div class="identicalStyle" style="height:100%" v-loading="loading">
    <el-form :inline="true" class="demo-ruleForm classify_searchinfo">
      <el-form-item label="交易流水号">
        <el-input clearable v-model="formAllData.serial"></el-input>
      </el-form-item>
      <el-form-item label="资金流水号">
        <el-input clearable v-model="formAllData.tradeNo"></el-input>
      </el-form-item>
      <el-form-item label="交易类型">
        <el-select v-model="formAllData.tradeType" clearable placeholder="请选择">
          <el-option
            v-for="item in businessTypeList"
            :key="item.code"
            :label="item.name"
            :value="item.code"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="收支类型">
        <el-select v-model="formAllData.incomeExpendType" clearable placeholder="请选择">
          <el-option
            v-for="item in incomeRevenueTypeList"
            :key="item.code"
            :label="item.name"
            :value="item.code"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="交易时间">
        <el-date-picker
          v-model="tradeTime"
          type="daterange"
          unlink-panels
          :picker-options="pickerOptions2"
          range-separator="-"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          :default-time="['00:00:00', '23:59:59']"
          @change="cTime"
        ></el-date-picker>
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
      <div class="btns_box">
        <el-button
          type="primary"
          plain
          icon="el-icon-download"
          @click="importExcel"
          :size="btnsize"
          v-has:FINANCE_SPECIALLINEPROFILE_SPECIALLINEDETAILS_BOND_EXPORT
        >导出Excel</el-button>
        <span class="description">专线承运商名称：</span>
        <span style="font-size:14px" class="titleName">{{agencyOrLineName?agencyOrLineName:''}}</span>
        <span class="description">剩余保证金：¥ {{collateral?collateral:'0.00'}}</span>
        <span class="description">状态：</span>
        <span
          :class="['pr50',statusValue>collateral?'transationRed':'transationBlue']"
          style="font-size:14px"
        >{{statusValue>collateral?"未缴清":"已缴清"}}</span>
      </div>
      <div class="info_news">
        <el-table
          ref="multipleTable"
          style="width: 100%"
          stripe
          border
          height="99%"
          highlight-current-row
          :data="tableDataAll"
          tooltip-effect="dark"
        >
          <el-table-column label="序号" width="60">
            <template slot-scope="scope">{{ (page - 1)*pagesize + scope.$index + 1 }}</template>
          </el-table-column>
          <el-table-column label="交易流水号" prop="serial" sortable show-overflow-tooltip width></el-table-column>
          <el-table-column label="交易类型" prop="tradeTypeName" sortable show-overflow-tooltip width></el-table-column>
          <el-table-column label="资金流水号" prop="tradeNo" sortable show-overflow-tooltip width></el-table-column>
          <el-table-column
            label="收支类型"
            prop="incomeExpendTypeName"
            sortable
            show-overflow-tooltip
            width
          ></el-table-column>
          <el-table-column label="交易金额" prop="tradeAmount" sortable show-overflow-tooltip width></el-table-column>
          <el-table-column label="交易时间" prop="tradeTime" sortable show-overflow-tooltip width></el-table-column>
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
import {
  data_aflcMywalletDetailList,
  findAflcMywalletByAccountId,
  data_aflcMywalletDetailListExcel
} from "@/api/finance/transactionCarrierPrice.js";
import { getDictBycode } from "@/api/common.js";
import Pager from "@/components/Pagination/index";
import { parseTime, pickerOptions2 } from "@/utils/";
export default {
  data() {
    return {
      loading: true,
      pickerOptions2: { shortcuts: pickerOptions2 },
      btnsize: "mini",
      selectRowData: [],
      sizes: [20, 50, 100, 400],
      pagesize: 20, // 初始化加载数量
      page: 1, // 初始化页码
      totalCount: null,
      dataTotal: 0,
      tableDataAll: [],
      formAllData: {
        accountId: this.$route.query.Id,
        recordType: "2",
        tradeNo: null,
        serial: null,
        tradeType: null,
        incomeExpendType: null,
        tradeStartTime: null,
        tradeEndTime: null
      },
      businessTypeList: [
        { code: "AF01413", name: "充值" },
        { code: "AF01512", name: "提现" },
        { code: "AF01408", name: "运费收入" },
        { code: "AF01545", name: "支付代收款" }
      ], //交易类型
      incomeRevenueTypeList: [
        { code: "0", name: "支出" },
        { code: "1", name: "收入" }
      ], //收支列表
      tradeTime: [],
      agencyOrLineName: sessionStorage.getItem("transaCarrierPrice"),
      collateral: 0,
      statusValue: 0
    };
  },
  props: {
    isvisible: {
      type: Boolean,
      default: false
    },
    cashtype: {
      type: String,
      default: null
    }
  },
  components: {
    Pager
  },
  watch: {
    isvisible: {
      handler(newVal, oldVal) {
        if (newVal) {
          this.getMoreInformation();
          this.firstblood();
        }
      },
      immediate: true
    }
  },
  methods: {
    getMoreInformation() {
      findAflcMywalletByAccountId(this.$route.query.Id, "AF00113").then(res => {
        this.collateral = res.data.collateral;
      });
      getDictBycode("AF091").then(res => {
        this.statusValue = parseFloat(res.data.value);
      });
    },
    // 列表刷新页面
    firstblood() {
      this.loading = true;
      data_aflcMywalletDetailList(
        this.page,
        this.pagesize,
        this.formAllData
      ).then(res => {
        this.dataTotal = res.data.totalCount;
        this.tableDataAll = res.data.list;
        this.tableDataAll.forEach(item => {
          item.tradeTime = parseTime(item.tradeTime, "{y}-{m}-{d} {h}:{i}:{s}");
        });
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
      this.formAllData = {
        accountId: this.$route.query.Id,
        recordType: "2",
        tradeNo: null,
        serial: null,
        tradeType: null,
        incomeExpendType: null,
        tradeStartTime: null,
        tradeEndTime: null
      };
      if (this.page != 1) {
        this.page = 1;
        this.$refs.pager.inputval = this.page;
        this.$refs.pager.pageNum = this.page;
      }
      this.tradeTime = [];
      this.firstblood();
    },
    // 交易时间
    cTime(i) {
      if (i) {
        this.formAllData.tradeStartTime = i[0];
        this.formAllData.tradeEndTime = i[1];
      } else {
        this.formAllData.tradeStartTime = "";
        this.formAllData.tradeEndTime = "";
      }
    },
    //导出Excel
    importExcel() {
      let href = "";
      this.$message.info("正在导出中...");
      data_aflcMywalletDetailListExcel(0, 0, this.formAllData).then(res => {
        var blob = new Blob([res]);
        href = window.URL.createObjectURL(blob);
        var NewDom = document.createElement("a");
        NewDom.setAttribute("href", href);
        NewDom.setAttribute("target", "_blank");
        NewDom.setAttribute("download", "专线承运商账户概况保证金.xls");
        document.body.appendChild(NewDom);
        NewDom.click();
        document.body.removeChild(NewDom);
      });
    },
    // 每页显示数据量变更
    handlePageChange(obj) {
      this.page = obj.pageNum;
      this.pagesize = obj.pageSize;
      this.firstblood();
    }
  }
};
</script>
<style lang="scss">
</style>

