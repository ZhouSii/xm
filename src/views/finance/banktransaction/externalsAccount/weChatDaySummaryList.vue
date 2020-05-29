<template>
  <div class="identicalStyle" style="height:100%" v-loading="loading">
    <div class="classify_info">
      <div class="btns_box">
        <el-button
          type="primary"
          :size="btnsize"
          icon="el-icon-download"
          plain
          @click="importExcel"
        >导出Excel</el-button>
      </div>
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
          <el-table-column label="选择" type="selection" width="50">
            <template slot-scope="scope">
              <el-radio class="radio" v-model="radio" :label="scope.row.createTimeDay">&nbsp;</el-radio>
            </template>
          </el-table-column>
          <el-table-column label="序号" width="60">
            <template slot-scope="scope">{{ (page - 1)*pagesize + scope.$index + 1 }}</template>
          </el-table-column>
          <el-table-column
            label="日期"
            prop="createTimeDay"
            sortable
            show-overflow-tooltip
            min-width="160"
          ></el-table-column>
          <el-table-column
            label="资金流水总笔数"
            prop="totalNumberFundFlow"
            sortable
            show-overflow-tooltip
            min-width="160"
          ></el-table-column>
          <el-table-column
            label="收入笔数"
            prop="incomeNumber"
            sortable
            show-overflow-tooltip
            min-width="160"
          ></el-table-column>
          <el-table-column
            label="收入金额"
            prop="incomeTotal"
            sortable
            show-overflow-tooltip
            min-width="160"
          ></el-table-column>
          <el-table-column
            label="支出笔数"
            prop="expendNumber"
            sortable
            show-overflow-tooltip
            min-width="160"
          ></el-table-column>
          <el-table-column
            label="支出金额"
            prop="expendTotal"
            sortable
            show-overflow-tooltip
            min-width="160"
          ></el-table-column>
          <el-table-column label="操作" min-width="160">
            <template slot-scope="scope">
              <h4 @click="jumpToDetailPage(scope.row)" class="needMoreInfo">本日数据</h4>
            </template>
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
import Pager from "@/components/Pagination/index";
import { parseTime, pickerOptions2 } from "@/utils/";
import {
  aflcWxDownloadFundFlowSummary,
  aflcWxDownloadFundFlowDetailExcel
} from "@/api/finance/banktransaction";
export default {
  name: "weChatDaySummaryList",
  components: {
    Pager
  },
  data() {
    return {
      loading: false,
      pickerOptions2: { shortcuts: pickerOptions2 },
      dataTotal: 0,
      btnsize: "mini",
      tableDataAll: [],
      sizes: [20, 50, 100, 400],
      pagesize: 20, // 初始化加载数量
      page: 1, // 初始化页码
      createTime: null,
      radio: "",
      selectRowData: null
    };
  },
  methods: {
    firstblood() {
      this.radio = "";
      this.loading = true;
      aflcWxDownloadFundFlowSummary(this.page, this.pagesize, {
        createTime: this.createTime
      })
        .then(res => {
          this.tableDataAll = res.data.list;
          this.dataTotal = res.data.totalCount;
          this.loading = false;
        })
        .catch(err => {
          this.$message.error(err.errorInfo || err.text);
          this.loading = false;
        });
    },
    importExcel() {
      let href = "";
      if (!this.selectRowData) {
        this.$message.warning("请选择您要导出的数据");
      } else {
        this.$message.info("正在导出中...");
        let createTime = new Date(
          this.selectRowData.createTimeDay + " 00:00:00"
        ).getTime();
        let paramsData = {
          createTime,
          dayOrMonthType: "day"
        };
        aflcWxDownloadFundFlowDetailExcel(0, 0, paramsData).then(res => {
          var blob = new Blob([res]);
          href = window.URL.createObjectURL(blob);
          var NewDom = document.createElement("a");
          NewDom.setAttribute("href", href);
          NewDom.setAttribute("target", "_blank");
          NewDom.setAttribute(
            "download",
            "微信资金账单明细_" + this.selectRowData.createTimeDay + ".xls"
          );
          document.body.appendChild(NewDom);
          NewDom.click();
          document.body.removeChild(NewDom);
        });
      }
    },
    // 判断选中与否
    // getSelection(val) {
    //   console.log("选中内容", val);
    //   this.selectRowData = val;
    // },
    // 点击选中当前行
    clickDetails(row, event, column) {
      // this.$refs.multipleTable.toggleRowSelection(row);
      this.radio = row.createTimeDay;
      this.selectRowData = row;
      console.log("选中内容", this.selectRowData);
    },
    // 每页显示数据量变更
    handlePageChange(obj) {
      this.page = obj.pageNum;
      this.pagesize = obj.pageSize;
      this.firstblood();
    },
    jumpToDetailPage(item) {
      this.$router.push({
        name: "微信资金账单明细",
        query: {
          tradeTime: item.createTimeDay,
          searchType: "day"
        }
      });
    }
  },
  mounted() {
    this.createTime = new Date(
      this.$route.query.createTime + "-01 00:00:00"
    ).getTime();
    this.firstblood();
  }
};
</script>

<style>
</style>