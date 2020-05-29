<template>
  <div class="identicalStyle" style="height:100%" v-loading="loading">
    <el-form :inline="true" class="demo-ruleForm classify_searchinfo">
      <el-form-item label="相关订单号">
        <el-input clearable v-model="searchInfo.orderSerial" maxlength="21" placeholder="请输入订单号"></el-input>
      </el-form-item>
      <el-form-item label="交易流水号">
        <el-input clearable v-model="searchInfo.tradeSerial" maxlength="21" placeholder="请输入订单号"></el-input>
      </el-form-item>
      <el-form-item label="用户账号">
        <el-input clearable v-model="searchInfo.accountName" maxlength="20" placeholder="请输入用户账号"></el-input>
      </el-form-item>
      <el-form-item label="交易方式">
        <el-select v-model="searchInfo.payWay" clearable placeholder="请选择">
          <el-option v-for="item in payWays" :key="item.code" :label="item.name" :value="item.code"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="交易类型">
        <el-select v-model="searchInfo.tradeType" clearable placeholder="请选择">
          <el-option
            v-for="item in tradeTypeList"
            :key="item.code"
            :label="item.name"
            :value="item.code"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="服务分类">
        <el-select v-model="searchInfo.orderType" clearable placeholder="请选择">
          <el-option
            v-for="item in orderTypeList"
            :key="item.code"
            :label="item.name"
            :value="item.code"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="流水类型">
        <el-select v-model="searchInfo.incomeExpendType" clearable placeholder="请选择">
          <el-option
            v-for="item in incomeExpendTypeList"
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
          value-format="yyyy-MM-dd HH:mm:ss"
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
          :size="btnsize"
          icon="el-icon-download"
          plain
          @click="importExcel"
          v-if="$_has_permission((accountType=='AF01601'&&'FINANCE_PLATFORMFLOWDETAILS_CASHACCOUNT_EXPORT')||(accountType=='AF01602'&&'FINANCE_PLATFORMFLOWDETAILS_OPERATIONACCOUNT_EXPORT')||(accountType=='AF00102'&&'FINANCE_PLATFORMFLOWDETAILS_CARACCOUNT_EXPORT')||(accountType=='AF00101'&&'FINANCE_PLATFORMFLOWDETAILS_SHIPPERACCOUNT_EXPORT'))"
        >导出Excel</el-button>
        <span class="description">收入金额：{{incomeAmount}}</span>
        <span class="description">支出金额：{{expendAmount}}</span>
      </div>
      <div class="info_news">
        <el-table
          :ref="'multipleTable'+accountType"
          style="width: 100%"
          stripe
          border
          height="100%"
          @selection-change="getSelection"
          @row-click="clickDetails"
          highlight-current-row
          :data="tableDataAll"
          tooltip-effect="dark"
        >
          <el-table-column label="选择" type="selection" width="40"></el-table-column>
          <el-table-column label="序号" width="60">
            <template slot-scope="scope">{{ (page - 1)*pagesize + scope.$index + 1 }}</template>
          </el-table-column>
          <el-table-column
            label="相关订单号"
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
          <el-table-column label="资金流水号" prop sortable show-overflow-tooltip width="230"></el-table-column>
          <el-table-column
            label="用户账号"
            prop="accountName"
            sortable
            show-overflow-tooltip
            v-if="accountType==='AF01601'|| accountType=='AF01602'"
          ></el-table-column>
          <el-table-column
            label="货主账号"
            prop="accountName"
            sortable
            show-overflow-tooltip
            v-if="accountType==='AF00101'"
          ></el-table-column>
          <el-table-column
            label="车主账号"
            prop="accountName"
            sortable
            show-overflow-tooltip
            v-if="accountType==='AF00102'"
          ></el-table-column>
          <el-table-column
            label="用户类型"
            prop="accountTypeName"
            sortable
            show-overflow-tooltip
            v-if="accountType==='AF01601'|| accountType=='AF01602'"
          ></el-table-column>
          <el-table-column label="服务分类" prop="orderTypeName" sortable show-overflow-tooltip></el-table-column>
          <el-table-column label="交易类型" prop="tradeTypeName" sortable show-overflow-tooltip></el-table-column>
          <el-table-column label="流水类型" prop="incomeExpendTypeName" sortable show-overflow-tooltip></el-table-column>
          <el-table-column label="交易金额" prop="payTotal" sortable show-overflow-tooltip></el-table-column>
          <el-table-column label="交易方式" prop="payWayName" sortable show-overflow-tooltip></el-table-column>
          <el-table-column label="交易时间" prop="payTime" sortable show-overflow-tooltip width="160">
            <template slot-scope="scope">{{scope.row.payTime|parseTime}}</template>
          </el-table-column>
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
  getStatementDetailList,
  getStatementDetailListExcel
} from "@/api/finance/statement.js";
import { tradeTypeStatus, DicServiceType } from "@/api/common.js";
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
      payWays: [{ name: "全部", code: null }],
      orderTypeList: [{ name: "全部", code: null }],
      incomeExpendTypeList: [
        { name: "全部", code: null },
        { name: "流出", code: "0" },
        { name: "流入", code: "1" }
      ],
      tradeTime: [],
      searchInfo: {
        orderSerial: null,
        tradeSerial: null,
        accountName: null,
        payWay: null,
        tradeType: null,
        orderType: null,
        incomeExpendType: null,
        accountType: this.accountType
      },
      expendAmount: 0,
      incomeAmount: 0,
      dialogFormVisible_add: false,
      dialogcashOperate: false,
      dialogBackOperate: false
    };
  },
  components: {
    Pager
  },
  props: {
    accountType: {
      type: String,
      default: false
    },
    accountTypeName: {
      type: String,
      default: false
    },
    tradeTypeList: {
      type: Array,
      default: ""
    }
  },
  mounted() {
    setTimeout(() => {
      this.$refs["multipleTable" + this.accountType].$el.style.height =
        this.$refs["multipleTable" + this.accountType].$el.offsetHeight + "px";
    }, 300);

    this.getMoreInformation();
    this.firstblood();
  },
  methods: {
    getMoreInformation() {
      tradeTypeStatus().then(res => {
        this.payWays.push(...res.data);
      });
      DicServiceType().then(res => {
        this.orderTypeList.push(...res.data);
      });
    },
    importExcel() {
      this.$message.info("正在导出中...");
      let href = "";
      getStatementDetailListExcel(0, 0, this.searchInfo).then(res => {
        var blob = new Blob([res]);
        href = window.URL.createObjectURL(blob);
        var NewDom = document.createElement("a");
        NewDom.setAttribute("href", href);
        NewDom.setAttribute("target", "_blank");
        NewDom.setAttribute("download", this.accountTypeName + "流水明细.xls");
        document.body.appendChild(NewDom);
        NewDom.click();
        document.body.removeChild(NewDom);
      });
    },
    // 列表刷新页面
    firstblood() {
      this.loading = true;
      getStatementDetailList(this.page, this.pagesize, this.searchInfo)
        .then(res => {
          this.tableDataAll = res.data.list[0].aflcOrderPaymentDtoList;
          this.dataTotal = res.data.totalCount;
          this.incomeAmount = res.data.list[0].incomeAmount;
          this.expendAmount = res.data.list[0].expendAmount;
          this.tableDataAll.forEach(item => {
            item.payTime = parseTime(item.payTime, "{y}-{m}-{d} {h}:{i}:{s}");
          });
          this.loading = false;
        })
        .catch(err => {
          this.loading = false;
          this.$message.error(err.errorInfo || err.text);
        });
    },
    // 申请时间
    cTime(i) {
      if (i) {
        this.searchInfo.tradeStartTime = i[0];
        this.searchInfo.tradeEndTime = i[1];
      } else {
        this.searchInfo.tradeStartTime = "";
        this.searchInfo.tradeEndTime = "";
      }
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
      this.tradeTime = null;
      this.searchInfo = {
        orderSerial: null,
        tradeSerial: null,
        accountName: null,
        payWay: null,
        tradeType: null,
        orderType: null,
        incomeExpendType: null,
        tradeStartTime: null,
        tradeEndTime: null,
        accountType: this.accountType
      };
      if (this.page != 1) {
        this.page = 1;
        this.$refs.pager.inputval = this.page;
        this.$refs.pager.pageNum = this.page;
      }
      this.firstblood();
    },
    // 判断选中与否
    getSelection(val) {
      console.log("选中内容", val);
      this.selectRowData = val;
    },
    // 点击选中当前行
    clickDetails(row, event, column) {
      this.$refs["multipleTable" + this.accountType].toggleRowSelection(row);
    },
    // 每页显示数据量变更
    handlePageChange(obj) {
      this.page = obj.pageNum;
      this.pagesize = obj.pageSize;
      this.firstblood();
    },
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
  }
};
</script>
<style lang="scss">
</style>

