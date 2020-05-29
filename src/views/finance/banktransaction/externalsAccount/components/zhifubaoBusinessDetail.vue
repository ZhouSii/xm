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
              <el-radio class="radio" v-model="radio" :label="scope.row.createTimeMonth">&nbsp;</el-radio>
            </template>
          </el-table-column>
          <el-table-column label="序号" width="60">
            <template slot-scope="scope">{{ (page - 1)*pagesize + scope.$index + 1 }}</template>
          </el-table-column>
          <el-table-column
            label="月份"
            prop="createTimeMonth"
            sortable
            show-overflow-tooltip
            min-width="160"
          >
            <template slot-scope="scope">
              <h4
                class="needMoreInfo"
                @click="jumpToDetailPage(scope.row,'summary')"
              >{{scope.row.createTimeMonth}}</h4>
            </template>
          </el-table-column>
          <el-table-column label="交易合计">
            <el-table-column
              label="笔数"
              prop="transactionOrders"
              sortable
              show-overflow-tooltip
              min-width="160"
            ></el-table-column>
            <el-table-column
              label="金额"
              prop="totalTransactionAmount"
              sortable
              show-overflow-tooltip
              min-width="160"
            ></el-table-column>
            <el-table-column
              label="优惠金额"
              prop="preferentialAmount"
              sortable
              show-overflow-tooltip
              min-width="160"
            ></el-table-column>
          </el-table-column>
          <el-table-column label="退款合计">
            <el-table-column
              label="笔数"
              prop="refundOrder"
              sortable
              show-overflow-tooltip
              min-width="160"
            ></el-table-column>
            <el-table-column
              label="交易退款金额"
              prop="transactionRefund"
              sortable
              show-overflow-tooltip
              min-width="160"
            ></el-table-column>
            <el-table-column
              label="优惠退款金额"
              prop="preferentialRefundAmount"
              sortable
              show-overflow-tooltip
              min-width="160"
            ></el-table-column>
          </el-table-column>
          <el-table-column label="操作" min-width="160">
            <template slot-scope="scope">
              <h4 @click="jumpToDetailPage(scope.row,'detail')" class="needMoreInfo">本月每日数据</h4>
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
  aflcAliDownloadListFundBusinessSummary,
  aflcAliDownloadListFundBusinessDetailExcel
} from "@/api/finance/banktransaction";
export default {
  name: "zhifubaoBusinessDetail",
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
      radio: "",
      selectRowData: null
    };
  },
  props: {
    isvisible: {
      type: Boolean,
      default: false
    }
  },
  watch: {
    isvisible: {
      handler(newVal, oldVal) {
        if (newVal) {
          setTimeout(() => {
            this.$refs.multipleTable.$el.style.height =
              this.$refs.multipleTable.$el.offsetHeight + "px";
          }, 300);
          this.firstblood();
        }
      },
      immediate: true
    }
  },
  methods: {
    firstblood() {
      this.loading = true;
      this.radio = "";
      aflcAliDownloadListFundBusinessSummary(this.page, this.pagesize, {
        createTime: null
      })
        .then(res => {
          this.tableDataAll = res.data.list;
          this.dataTotal = res.totalCount;
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
          this.selectRowData.createTimeMonth + "-01 00:00:00"
        ).getTime();
        let paramsData = {
          createTime,
          dm: "mm"
        };
        aflcAliDownloadListFundBusinessDetailExcel(0, 0, paramsData).then(
          res => {
            var blob = new Blob([res]);
            href = window.URL.createObjectURL(blob);
            var NewDom = document.createElement("a");
            NewDom.setAttribute("href", href);
            NewDom.setAttribute("target", "_blank");
            NewDom.setAttribute(
              "download",
              "支付宝业务明细详情_" +
                this.selectRowData.createTimeMonth +
                ".xls"
            );
            document.body.appendChild(NewDom);
            NewDom.click();
            document.body.removeChild(NewDom);
          }
        );
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
      this.radio = row.createTimeMonth;
      this.selectRowData = row;
      console.log("选中内容", this.selectRowData);
    },
    // 每页显示数据量变更
    handlePageChange(obj) {
      this.page = obj.pageNum;
      this.pagesize = obj.pageSize;
      this.firstblood();
    },
    jumpToDetailPage(item, i) {
      i === "detail"
        ? this.$router.push({
            name: "支付宝业务明细详情",
            query: { createTime: item.createTimeMonth + "-01", dm: "mm" }
          })
        : this.$router.push({
            name: "支付宝业务明细-日",
            query: { createTime: item.createTimeMonth + "-01" }
          });
    }
  }
};
</script>

<style>
</style>