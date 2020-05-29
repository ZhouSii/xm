<template>
  <div class="identicalStyle" style="height:100%" v-loading="loading">
    <el-form :inline="true" class="demo-ruleForm classify_searchinfo">
      <el-form-item label="发生时间">
        <el-radio-group v-model="formAllData.dm" :size="btnsize">
          <el-radio-button label="dd">按日</el-radio-button>
          <el-radio-button label="mm">按月</el-radio-button>
        </el-radio-group>
      </el-form-item>
      <el-form-item>
        <el-date-picker
          v-model="formAllData.createTime"
          type="date"
          value-format="timestamp"
          placeholder="请选择日期"
          v-show="formAllData.dm=='dd'"
        ></el-date-picker>
        <el-date-picker
          v-model="formAllData.createTime"
          type="month"
          value-format="timestamp"
          v-show="formAllData.dm=='mm'"
          placeholder="请选择月份"
        ></el-date-picker>
      </el-form-item>
      <el-form-item label="商户订单号">
        <el-input
          clearable
          v-model.trim="formAllData.merchantOrderNo"
          maxlength="25"
          placeholder="请输入订单号"
        ></el-input>
      </el-form-item>
      <el-form-item label="业务类型">
        <el-input clearable v-model.trim="formAllData.businessType" placeholder="请输入内容"></el-input>
        <!-- <el-select v-model="formAllData.businessType" clearable placeholder="请选择">
          <el-option
            v-for="item in businessTypeList"
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
          :data="tableDataAll"
          tooltip-effect="dark"
        >
          <!-- <el-table-column label="选择" type="selection" width="50"></el-table-column> -->
          <el-table-column label="序号" width="60">
            <template slot-scope="scope">{{ (page - 1)*pagesize + scope.$index + 1 }}</template>
          </el-table-column>
          <el-table-column
            label="财务流水号"
            prop="accountNo"
            sortable
            show-overflow-tooltip
            min-width="180"
          >
            <!-- <template slot-scope="scope">
              <h4
                class="needMoreInfo"
                @click="pushOrderSerial(scope.row)"
              >{{ scope.row.orderSerial}}</h4>
            </template>-->
          </el-table-column>
          <el-table-column
            label="业务流水号"
            prop="businessSerialNo"
            sortable
            show-overflow-tooltip
            min-width="280"
          ></el-table-column>
          <el-table-column
            label="商户订单号"
            prop="merchantOrderNo"
            sortable
            show-overflow-tooltip
            min-width="280"
          ></el-table-column>
          <el-table-column
            label="商品名称"
            prop="tradeName"
            sortable
            show-overflow-tooltip
            min-width="160"
          ></el-table-column>
          <el-table-column
            label="发生时间"
            prop="occurrenceTime"
            sortable
            show-overflow-tooltip
            min-width="160"
          >
            <template slot-scope="scope">{{scope.row.occurrenceTime|parseTime}}</template>
          </el-table-column>
          <el-table-column
            label="对方账号"
            prop="accountOther"
            sortable
            show-overflow-tooltip
            min-width="180"
          ></el-table-column>
          <el-table-column
            label="收入金额(+元)"
            prop="income"
            sortable
            show-overflow-tooltip
            min-width="130"
          ></el-table-column>
          <el-table-column
            label="支出金额(-元)"
            prop="expenditure"
            sortable
            show-overflow-tooltip
            min-width="130"
          ></el-table-column>
          <el-table-column
            label="账户金额(元)"
            prop="accountBalance"
            sortable
            show-overflow-tooltip
            min-width="130"
          ></el-table-column>
          <el-table-column
            label="交易渠道"
            prop="tradingChannel"
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
          <el-table-column label="备注" prop="remarks" sortable show-overflow-tooltip min-width="320"></el-table-column>
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
import { aflcAliDownloadListFundBillDetail } from "@/api/finance/banktransaction";
import { parseTime, pickerOptions2 } from "@/utils/";
import { getDictionary } from "@/api/common.js";
export default {
  name: "zhifubaoAccountingDayDetail",
  data() {
    return {
      loading: false,
      radio: "",
      btnsize: "mini",
      sizes: [20, 50, 100, 400],
      pagesize: 20, // 初始化加载数量
      page: 1, // 初始化页码
      dataTotal: 0,
      tableDataAll: [],
      formAllData: {
        dm: "", //按日还是按月搜索 dd按日 mm按月
        merchantOrderNo: null,
        businessType: null,
        createTime: null
      }
    };
  },
  components: {
    Pager
  },
  watch: {
    $route(to, from) {
      if (to.name == "支付宝账务明细详情") {
        let newQuery = to.fullPath.slice(to.fullPath.indexOf("?") + 1);
        if (newQuery !== sessionStorage.getItem("aliAccountingOldQuery")) {
          this.init();
        }
      }
    }
  },
  methods: {
    // 列表刷新页面
    firstblood() {
      this.loading = true;
      this.resetCreateTime();
      aflcAliDownloadListFundBillDetail(
        this.page,
        this.pagesize,
        this.formAllData
      )
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
    resetCreateTime() {
      if (this.formAllData.createTime && this.formAllData.dm == "mm") {
        this.formAllData.createTime = new Date(
          parseTime(this.formAllData.createTime, "{y}-{m}") + "-01 00:00:00"
        ).getTime();
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
      this.formAllData = {
        dm: "", //按日还是按月搜索 dd按日 mm按月
        merchantOrderNo: null,
        businessType: null,
        createTime: null
      };
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

    init() {
      this.formAllData.createTime = Math.round(
        new Date(this.$route.query.createTime + " 00:00:00")
      );
      this.formAllData.dm = this.$route.query.dm;
      sessionStorage.setItem(
        "aliAccountingOldQuery",
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

