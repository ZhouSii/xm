<template>
  <div class="identicalStyle" style="height:100%" v-loading="loading">
    <el-form :inline="true" class="demo-ruleForm classify_searchinfo">
      <el-form-item label="货主">
        <el-input clearable v-model="formAllData.shipper"></el-input>
      </el-form-item>
      <el-form-item label="月份">
        <el-date-picker
          v-model="createTime"
          type="month"
          value-format="timestamp"
          placeholder="请选择"
          @change="formatTime"
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
        >导出Excel</el-button>
        <span class="description">累计补贴津贴(元)：{{recordSummary.totalSubsidyAmount||0}}</span>
        <span class="description">平均每月补贴津贴(元)：{{recordSummary.avgMonthSubsidyAmount||0}}</span>
        <span class="description">累计津贴单量(单)：{{recordSummary.totalSubsidyOrderNum||0}}</span>
        <span class="description">平均每单津贴(元)：{{recordSummary.avgOrderSubsidyAmount||0}}</span>
        <span class="description">累计补贴货主(名)：{{recordSummary.totalSubsidyShippers||0}}</span>
        <span class="description">平均每名货主补贴(元)：{{recordSummary.avgShipperSubsidyAmount||0}}</span>
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
          <el-table-column label="选择" type="selection" width="50">
            <!-- <template slot-scope="scope">
              <el-radio class="radio" v-model="radio" :label="scope.row.id">&nbsp;</el-radio>
            </template>-->
          </el-table-column>
          <el-table-column label="序号" width="60">
            <template slot-scope="scope">{{ (page - 1)*pagesize + scope.$index + 1 }}</template>
          </el-table-column>
          <el-table-column label="货主" prop="shipperText" sortable show-overflow-tooltip width></el-table-column>
          <el-table-column label="月份" prop="yearMonthText" sortable show-overflow-tooltip width></el-table-column>
          <el-table-column
            label="货主下单总单量(单)"
            prop="totalOrderNum"
            sortable
            show-overflow-tooltip
            width
          ></el-table-column>
          <el-table-column
            label="津贴补贴单量(单)"
            prop="totalSubsidyOrderNum"
            sortable
            show-overflow-tooltip
            width
          ></el-table-column>
          <el-table-column
            label="津贴减免总金额(元)"
            prop="totalSubsidyAmount"
            sortable
            show-overflow-tooltip
            width
          ></el-table-column>
          <el-table-column
            label="平均每单津贴减免(元)"
            prop="avgOrderSubsidyAmount"
            sortable
            show-overflow-tooltip
            width
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
import {
  subsidyRecordSummaryAndList,
  subsidyRecordListExcel
} from "@/api/marketing/shippermarkting/deliverySubsidy.js";
import { getDictionary } from "@/api/common.js";
import Pager from "@/components/Pagination/index";
import { parseTime, pickerOptions2 } from "@/utils/";
export default {
  data() {
    return {
      loading: false,
      btnsize: "mini",
      selectRowData: [],
      sizes: [20, 50, 100, 400],
      pagesize: 20, // 初始化加载数量
      page: 1, // 初始化页码
      totalCount: null,
      dataTotal: 0,
      tableDataAll: [],
      formAllData: {
        shipper: null,
        yearMonth: null,
        subsidyActivityId: this.$route.query.subsidyActivityId
      },
      createTime: null,
      recordSummary: {}
    };
  },
  components: {
    Pager
  },
  mounted() {
    this.firstblood();
  },
  methods: {
    // 列表刷新页面
    firstblood() {
      this.loading = true;
      subsidyRecordSummaryAndList(this.page, this.pagesize, this.formAllData)
        .then(res => {
          this.dataTotal = res.data.totalCount;
          this.tableDataAll = res.data.list;
          this.recordSummary = res.data.recordSummary;
          this.loading = false;
        })
        .catch(err => {
          this.loading = false;
          this.$message.error(err.errorInfo || err.text);
        });
    },
    formatTime(val) {
      this.formAllData.yearMonth = val ? parseTime(val, "{y}{m}") : null;
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
      this.createTime = null;
      this.formAllData = {
        shipper: null,
        yearMonth: null,
        subsidyActivityId: this.$route.query.subsidyActivityId
      };
      if (this.page != 1) {
        this.page = 1;
        this.$refs.pager.inputval = this.page;
        this.$refs.pager.pageNum = this.page;
      }
      this.firstblood();
    },
    // 导出Excel
    importExcel() {
      let href = "";
      this.$message.info("正在导出中...");
      subsidyRecordListExcel(0, 0, this.formAllData).then(res => {
        var blob = new Blob([res]);
        href = window.URL.createObjectURL(blob);
        var NewDom = document.createElement("a");
        NewDom.setAttribute("href", href);
        NewDom.setAttribute("target", "_blank");
        NewDom.setAttribute("download", "发货津贴活动数据.xls");
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

