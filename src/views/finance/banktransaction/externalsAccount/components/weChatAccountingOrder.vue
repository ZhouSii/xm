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
              <el-radio class="radio" v-model="radio" :label="scope.row.yearMonth">&nbsp;</el-radio>
            </template>
          </el-table-column>
          <el-table-column label="序号" width="60">
            <template slot-scope="scope">{{ (page - 1)*pagesize + scope.$index + 1 }}</template>
          </el-table-column>
          <el-table-column
            label="月份"
            prop="yearMonth"
            sortable
            show-overflow-tooltip
            min-width="160"
          >
            <template slot-scope="scope">
              <h4
                class="needMoreInfo"
                @click="jumpToDetailPage(scope.row,'summary')"
              >{{scope.row.yearMonth}}</h4>
            </template>
          </el-table-column>
          <el-table-column
            label="总交易单数"
            prop="totalTransactions"
            sortable
            show-overflow-tooltip
            min-width="160"
          ></el-table-column>
          <el-table-column
            label="应结订单总金额"
            prop="totalAmountOfDueOrders"
            sortable
            show-overflow-tooltip
            min-width="180"
          ></el-table-column>
          <el-table-column
            label="退款总金额"
            prop="totalRefundAmount"
            sortable
            show-overflow-tooltip
            min-width="160"
          ></el-table-column>
          <el-table-column
            label="充值券退款总金额"
            prop="refundCouponTotalAmount"
            sortable
            show-overflow-tooltip
            min-width="180"
          ></el-table-column>
          <el-table-column
            label="手续费总金额"
            prop="totalFee"
            sortable
            show-overflow-tooltip
            min-width="160"
          ></el-table-column>
          <el-table-column
            label="订单总金额"
            prop="ordersTotalAmount"
            sortable
            show-overflow-tooltip
            min-width="160"
          ></el-table-column>
          <el-table-column
            label="申请退款总金额"
            prop="requestedRefundTotalAmount"
            sortable
            show-overflow-tooltip
            min-width="180"
          ></el-table-column>
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
  aflcWxDownloadBillSummaryMonth,
  aflcWxDownloadBillDetailExcel
} from "@/api/finance/banktransaction";
export default {
  name: "weChatAccountingOrder",
  components: {
    Pager
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
  data() {
    return {
      loading: true,
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
  methods: {
    firstblood() {
      this.loading = true;
      this.radio = "";
      aflcWxDownloadBillSummaryMonth(this.page, this.pagesize, {})
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
        let tradeTime = new Date(
          this.selectRowData.yearMonth + "-01 00:00:00"
        ).getTime();
        let paramsData = {
          tradeTime,
          dm: "m"
        };
        aflcWxDownloadBillDetailExcel(0, 0, paramsData).then(res => {
          var blob = new Blob([res]);
          href = window.URL.createObjectURL(blob);
          var NewDom = document.createElement("a");
          NewDom.setAttribute("href", href);
          NewDom.setAttribute("target", "_blank");
          NewDom.setAttribute(
            "download",
            "微信账务订单明细_" + this.selectRowData.yearMonth + ".xls"
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
      this.radio = row.yearMonth;
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
            name: "微信账务订单明细",
            query: {
              tradeTime: item.yearMonth + "-01",
              searchType: "m"
            }
          })
        : this.$router.push({
            name: "微信账务订单-日",
            query: { createTime: item.yearMonth }
          });
    }
  }
};
</script>

<style>
</style>