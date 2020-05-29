<template>
  <div class="identicalStyle" style="height:100%" v-loading="loading">
    <el-form :inline="true" class="demo-ruleForm classify_searchinfo">
      <el-form-item label="记账时间">
        <el-radio-group v-model="formAllData.dayOrMonthType" :size="btnsize">
          <el-radio-button label="day">按日</el-radio-button>
          <el-radio-button label="month">按月</el-radio-button>
        </el-radio-group>
      </el-form-item>
      <el-form-item>
        <el-date-picker
          v-model="formAllData.createTime"
          type="date"
          value-format="timestamp"
          placeholder="请选择日期"
          v-show="formAllData.dayOrMonthType=='day'"
        ></el-date-picker>
        <el-date-picker
          v-model="formAllData.createTime"
          type="month"
          value-format="timestamp"
          v-show="formAllData.dayOrMonthType=='month'"
          placeholder="请选择月份"
        ></el-date-picker>
      </el-form-item>
      <el-form-item label="资金流水单号">
        <el-input clearable v-model.trim="formAllData.flowNumber"></el-input>
      </el-form-item>
      <el-form-item label="业务名称">
        <el-input clearable v-model.trim="formAllData.businessName"></el-input>
        <!-- <el-select v-model="formAllData.businessType" clearable placeholder="请选择">
          <el-option
            v-for="item in businessTypeList"
            :key="item.code"
            :label="item.name"
            :value="item.code"
          ></el-option>
        </el-select>-->
      </el-form-item>
      <el-form-item label="收支类型">
        <el-select v-model="formAllData.inoutType" clearable placeholder="请选择">
          <el-option
            v-for="item in incomeTypeList"
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
      <!-- <div class="btns_box">
        <el-button
          type="primary"
          icon="el-icon-coin"
          plain
          :size="btnsize"
          @click="handleClick('approve')"
          v-if="statusType==='AF0850901'"
        >审批</el-button>
        <el-button
          type="primary"
          :size="btnsize"
          icon="el-icon-download"
          plain
          @click="importExcel"
        >导出Excel</el-button>
      </div>-->
      <div class="info_news">
        <el-table
          ref="multipleTable"
          style="width: 100%"
          stripe
          border
          height="100%"
          @row-click="clickDetails"
          highlight-current-row
          :data="tableDataAll"
          tooltip-effect="dark"
        >
          <!-- <el-table-column label="选择" type="selection" width="50"></el-table-column> -->
          <el-table-column label="序号" width="60">
            <template slot-scope="scope">{{ (page - 1)*pagesize + scope.$index + 1 }}</template>
          </el-table-column>
          <el-table-column
            label="记账时间"
            prop="tradeTime"
            sortable
            show-overflow-tooltip
            min-width="160"
          >
            <template slot-scope="scope">{{scope.row.tradeTime|parseTime}}</template>
          </el-table-column>
          <el-table-column
            label="微信支付业务单号"
            prop="transactionId"
            sortable
            show-overflow-tooltip
            min-width="280"
          >
            <!-- <template slot-scope="scope">
              <h4
                class="needMoreInfo"
                @click="pushOrderSerial(scope.row)"
              >{{ scope.row.orderSerial}}</h4>
            </template>-->
          </el-table-column>
          <el-table-column
            label="资金流水单号"
            prop="flowNumber"
            sortable
            show-overflow-tooltip
            min-width="280"
          ></el-table-column>
          <el-table-column
            label="业务名称"
            prop="businessName"
            sortable
            show-overflow-tooltip
            min-width="120"
          ></el-table-column>
          <el-table-column
            label="业务类型"
            prop="businessType"
            sortable
            show-overflow-tooltip
            min-width="120"
          ></el-table-column>
          <el-table-column
            label="收支类型"
            prop="inoutType"
            sortable
            show-overflow-tooltip
            min-width="100"
          ></el-table-column>
          <el-table-column
            label="收支金额(元)"
            prop="inoutMoney"
            sortable
            show-overflow-tooltip
            min-width="130"
          ></el-table-column>
          <el-table-column
            label="账户结余(元)"
            prop="accountBalance"
            sortable
            show-overflow-tooltip
            min-width="130"
          ></el-table-column>
          <el-table-column
            label="资金变更提交申请人"
            prop="applicant"
            sortable
            show-overflow-tooltip
            min-width="180"
          ></el-table-column>
          <el-table-column label="备注" prop="remarks" sortable show-overflow-tooltip min-width="300"></el-table-column>
          <el-table-column
            label="业务凭证号"
            prop="voucherNumber"
            sortable
            show-overflow-tooltip
            min-width="300"
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
import Pager from "@/components/Pagination/index";
import { aflcWxDownloadFundFlowDetail } from "@/api/finance/banktransaction";
import { parseTime, pickerOptions2 } from "@/utils/";
import { getDictionary } from "@/api/common.js";
export default {
  name: "weChatDayDetailList",
  data() {
    return {
      loading: false,
      radio: "",
      btnsize: "mini",
      selectRowData: [],
      sizes: [20, 50, 100, 400],
      pagesize: 20, // 初始化加载数量
      page: 1, // 初始化页码
      dataTotal: 0,
      tableDataAll: [],
      // businessTypeList: [
      //   { name: "全部", code: "0" },
      //   { name: "交易", code: "1" },
      //   { name: "退款", code: "2" },
      //   { name: "扣除手续费", code: "3" }
      // ],
      incomeTypeList: [
        { name: "全部", code: null },
        { name: "收入", code: "收入" },
        { name: "支出", code: "支出" }
      ],
      formAllData: {
        dayOrMonthType: "", //按日还是按月搜索 d按日 m按月
        flowNumber: null,
        businessName: null,
        inoutType: null,
        createTime: null
      }
    };
  },
  components: {
    Pager
  },
  watch: {
    $route(to, from) {
      if (to.name == "微信资金账单明细") {
        let newQuery = to.fullPath.slice(to.fullPath.indexOf("?") + 1);
        if (newQuery !== sessionStorage.getItem("wxCashOldQuery")) {
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
      aflcWxDownloadFundFlowDetail(this.page, this.pagesize, this.formAllData)
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
      if (
        this.formAllData.createTime &&
        this.formAllData.dayOrMonthType == "month"
      ) {
        this.formAllData.createTime = new Date(
          parseTime(this.formAllData.createTime, "{y}-{m}") + "-01 00:00:00"
        ).getTime();
      }
    },
    init() {
      this.formAllData.createTime = Math.round(
        new Date(this.$route.query.tradeTime + " 00:00:00")
      );
      this.formAllData.dayOrMonthType = this.$route.query.searchType;
      sessionStorage.setItem(
        "wxCashOldQuery",
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
<style lang="scss">
</style>

