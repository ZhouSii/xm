<template>
  <div class="identicalStyle clearfix waitpayment" v-loading="loading">
    <el-form
      :inline="true"
      :model="searchInfo"
      ref="ruleForm"
      class="demo-ruleForm classify_searchinfo"
    >
      <el-form-item label="区代" prop="agencyName">
        <el-input v-model="searchInfo.agencyName" clearable placeholder="请输入区代名称"></el-input>
      </el-form-item>
      <el-form-item label="区代物流公司" prop="companyName">
        <el-input v-model="searchInfo.companyName" clearable placeholder></el-input>
      </el-form-item>
      <el-form-item label="交易时间">
        <el-date-picker
          v-model="tradeTime"
          type="daterange"
          align="right"
          popper-class="tradeTime"
          value-format="yyyy-MM-dd"
          start-placeholder="开始日期"
          :picker-options="pickerOptions2"
          end-placeholder="结束日期"
        ></el-date-picker>
      </el-form-item>
      <el-form-item label="区代运单号" prop="agencyOrderSerial">
        <el-input v-model="searchInfo.agencyOrderSerial" clearable placeholder="请输入要查询的运单号"></el-input>
      </el-form-item>
      <el-form-item label="订单号" prop="orderSerial">
        <el-input v-model="searchInfo.orderSerial" clearable placeholder="请输入要查询的订单号"></el-input>
      </el-form-item>
      <el-form-item class="btnChoose fr" style="margin-left:0;">
        <el-button
          type="primary"
          :size="btnsize"
          plain
          @click="handleSearch('search')"
          icon="el-icon-search"
        >搜索</el-button>
        <el-button
          type="info"
          :size="btnsize"
          plain
          @click="handleSearch('clear')"
          icon="fontFamily aflc-icon-qingkong"
        >清空</el-button>
      </el-form-item>
    </el-form>
    <div class="classify_info">
      <!-- <div class="btns_box">
        <el-button
          type="primary"
          :size="btnsize"
          icon="el-icon-download"
          plain
          @click="handleSearch('outExce')"
        >导出Excel</el-button>
      </div>-->
      <div class="info_news">
        <!-- tabel内容 -->
        <el-table
          id="out-table"
          ref="multipleTable"
          :data="tableData"
          stripe
          border
          align="center"
          height="100%"
          @selection-change="getinfomation"
          tooltip-effect="dark"
          v-has:MARKETING_OPERATION_COUPON_LIST
          @row-click="clickDetails"
          style="width: 100%"
        >
          <el-table-column label="序号" width="80">
            <template slot-scope="scope">{{ (page - 1)*pagesize + scope.$index + 1 }}</template>
          </el-table-column>
          <el-table-column
            prop="orderSerial"
            :show-overflow-tooltip="true"
            label="订单号"
            sortable
            width="250"
          >
            <template slot-scope="scope">
              <h4
                class="needMoreInfo"
                @click="pushOrderSerial(scope.row)"
              >{{ scope.row.orderSerial}}</h4>
            </template>
          </el-table-column>
          <el-table-column prop="agencyOrderSerial" show-overflow-tooltip label="区代运单号" sortable></el-table-column>
          <el-table-column prop="agencyName" show-overflow-tooltip label="区代" sortable></el-table-column>
          <el-table-column prop="companyName" show-overflow-tooltip label="区代物流公司" sortable></el-table-column>
          <el-table-column prop="startArea" show-overflow-tooltip label="发货地" sortable></el-table-column>
          <el-table-column prop="endArea" show-overflow-tooltip label="收货地" sortable></el-table-column>
          <el-table-column prop="orderAmount" show-overflow-tooltip label="运单金额" sortable></el-table-column>
          <el-table-column prop="payTimeType" show-overflow-tooltip label="付款方式" sortable>
            <template slot-scope="scope">{{ scope.row.payTimeType=='0'?'到付':'现付'}}</template>
          </el-table-column>
          <el-table-column prop="plaformProfit" show-overflow-tooltip label="平台分润" sortable></el-table-column>
          <el-table-column prop="tradeTime" show-overflow-tooltip label="交易时间" sortable>
            <template slot-scope="scope">
              <span
                class="orderSerial"
              >{{ scope.row.tradeTime | parseTime('{y}-{m}-{d} {h}:{i}:{s}')}}</span>
            </template>
          </el-table-column>
        </el-table>
        <!-- 页码 -->
        <div class="info_tab_footer">
          共计:{{ dataTotal }}
          <div class="show_pager">
            <Pager :total="dataTotal" @change="handlePageChange" :sizes="sizes" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script type="text/javascript">
import "@/styles/dialog.scss";
import { parseTime, pickerOptions2 } from "@/utils/index.js";
import Pager from "@/components/Pagination/index";
import { aflcLclPlatformBillProfit } from "@/api/marketing/carmarkting/operating";
export default {
  components: {
    Pager
  },
  props: {
    isvisible: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      btnsize: "mini",
      loading: true, // 加载
      sizes: [20, 50, 100, 400],
      pagesize: 20, // 初始化加载数量
      page: 1, // 初始化页码
      dataTotal: 0,
      tradeTime: [],
      defaultTime: [
        parseTime(+new Date() - 60 * 24 * 60 * 60 * 1000, "{y}-{m}-{d}"),
        parseTime(new Date(), "{y}-{m}-{d}")
      ], // datepicker 默认值 default-value绑定
      searchInfo: {
        agencyName: null,
        companyName: null,
        startTradeTime: null, // 下单起始时间
        endTradeTime: null, // 下单结束时间
        agencyOrderSerial: null, //
        orderSerial: null
      },

      pickerOptions2: {
        shortcuts: pickerOptions2
      },
      tableData: [],
      dialogFormVisible_details: false, // 详情弹窗
      href: ""
    };
  },
  mounted() {
    setTimeout(() => {
      this.$refs.multipleTable.$el.style.height =
        this.$refs.multipleTable.$el.offsetHeight + "px";
    }, 300);
    this.firstblood();
  },
  methods: {
    handlePageChange(obj) {
      this.page = obj.pageNum;
      this.pagesize = obj.pageSize;
      this.firstblood();
    },
    // 刷新页面
    firstblood() {
      this.loading = true;
      if (this.tradeTime) {
        this.searchInfo.startTradeTime =
          this.tradeTime.length > 0 ? this.tradeTime[0] : null;
        this.searchInfo.endTradeTime =
          this.tradeTime.length > 0 ? this.tradeTime[1] : null;
      } else {
        this.searchInfo.startTradeTime = null;
        this.searchInfo.endTradeTime = null;
      }
      aflcLclPlatformBillProfit(this.page, this.pagesize, this.searchInfo)
        .then(res => {
          this.tableData = res.data.list;
          this.dataTotal = res.data.totalCount;
          this.loading = false;
        })
        .catch(err => {
          this.$message.error(err.errorInfo);
          this.loading = false;
        });
    },
    // 模糊查询 分类名称或者code
    handleSearch(type) {
      switch (type) {
        case "search":
          this.firstblood();
          break;
        case "clear":
          this.searchInfo = {
            agencyName: null,
            companyName: null,
            startTradeTime: null, // 下单起始时间
            endTradeTime: null, // 下单结束时间
            agencyOrderSerial: null, //
            orderSerial: null
          };
          this.tradeTime = [];
          this.firstblood();
          break;
        // case "outExce":
        //   if (!this.searchInfo.startTradeTime) {
        //     this.$message.error("交易开始时间不能为空");
        //   } else {
        //     couponTransactionExcel(0, 0, this.searchInfo).then(res => {
        //       var blob = new Blob([res]);
        //       this.href = window.URL.createObjectURL(blob);
        //       var NewDom = document.createElement("a");
        //       NewDom.setAttribute("href", this.href);
        //       NewDom.setAttribute("target", "_blank");
        //       NewDom.setAttribute(
        //         "download",
        //         this.searchInfo.startTradeTime +
        //           "至" +
        //           this.searchInfo.endTradeTime +
        //           "优惠券明细.xls"
        //       );
        //       document.body.appendChild(NewDom);
        //       NewDom.click();
        //       document.body.removeChild(NewDom);
        //     });
        //   }
        //   break;
      }
      // 清除选中状态，避免影响下个操作
      this.$refs.multipleTable.clearSelection();
    },
    // 判断是否选中
    getinfomation(selection) {
      this.checkedinformation = selection;
    },
    // 点击选中当前行
    clickDetails(row, event, column) {
      this.$refs.multipleTable.toggleRowSelection(row);
    },
    // 详情弹窗
    pushOrderSerial(item) {
      this.$router.push({
        name: "发物流订单详情",
        query: { orderSerial: item.orderSerial }
      });
    }
  }
};
</script>
<style type="text/css" lang="scss">
.span_pdr {
  display: inline-block;
  margin-right: 30px;
}
</style>
