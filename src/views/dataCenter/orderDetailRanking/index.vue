<template>
  <div class="identicalStyle clearfix RankingTotal" v-loading="loading">
    <el-form inline class="demo-ruleForm classify_searchinfo">
      <el-form-item label="订单号">
        <el-input v-model="formAllData.orderSerial" maxlength="21"></el-input>
      </el-form-item>
      <el-form-item label="下单时间">
        <el-date-picker
          v-model="chooseTime"
          @change="timeVal"
          type="daterange"
          range-separator="-"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          unlink-panels
          value-format="timestamp"
          align="right"
          :picker-options="pickerOptions2"
          :default-time="['00:00:00', '23:59:59']"
        ></el-date-picker>
      </el-form-item>
      <el-form-item class="fr">
        <el-button
          type="primary"
          plain
          @click="getdata_search"
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
          v-has:DATA_CENTER_ORDER_EXPENSE_SUMMARY_EXCEL
        >导出Excel</el-button>
      </div>
      <div class="info_news">
        <el-table
          ref="multipleTable"
          style="width: 100%"
          stripe
          border
          height="98%"
          highlight-current-row
          :data="tableDataAll"
          tooltip-effect="dark"
        >
          <el-table-column label="序号" width="60">
            <template slot-scope="scope">{{ (page - 1)*pagesize + scope.$index + 1 }}</template>
          </el-table-column>
          <el-table-column label="交易订单号" prop="orderSerial" width="250">
            <template slot-scope="scope">
              <h4
                class="needMoreInfo"
                @click="pushOrderSerial(scope.row)"
              >{{ scope.row.orderSerial}}</h4>
            </template>
          </el-table-column>
          <el-table-column label="下单时间" prop="createTime" sortable width="160"></el-table-column>
          <!-- <el-table-column
            label="所属区域"
            prop="provinceCityArea"
            sortable
            width="180"
            show-overflow-tooltip
          ></el-table-column>-->
          <el-table-column
            label="货主信息"
            prop="shipperInfo"
            sortable
            min-width="230"
            show-overflow-tooltip
          ></el-table-column>
          <el-table-column
            label="车主信息"
            prop="driverInfo"
            sortable
            min-width="230"
            show-overflow-tooltip
          ></el-table-column>
          <el-table-column
            label="货主所属业务员"
            prop="shipperSalesmanName"
            sortable
            min-width="160"
            show-overflow-tooltip
          ></el-table-column>
          <el-table-column
            label="车主所属业务员"
            prop="driverSalesmanName"
            sortable
            min-width="160"
            show-overflow-tooltip
          ></el-table-column>
          <el-table-column label="货主支付" prop="factPay" sortable min-width="120"></el-table-column>
          <el-table-column label="货主货物保障费" prop="shipperInsuranceFee" sortable min-width="150"></el-table-column>
          <el-table-column label="优惠金" prop="reward" sortable min-width="100"></el-table-column>
          <el-table-column label="优惠券抵扣" prop="preferentialPrice" sortable min-width="130"></el-table-column>
          <el-table-column label="订单总金额" prop="orderAmount" sortable min-width="130"></el-table-column>
          <el-table-column label="额外小费" prop="extraTip" sortable min-width="120"></el-table-column>
          <el-table-column label="奖励金" prop="driverReward" sortable min-width="100"></el-table-column>
          <el-table-column label="车主货物保障费" prop="driverInsuranceFee" sortable min-width="150"></el-table-column>
          <!-- <el-table-column label="小费" prop="tip" sortable width="80"></el-table-column> -->
          <el-table-column label="平台抽佣费" prop="platMaidFee" sortable min-width="130"></el-table-column>
          <el-table-column label="车主收入(完成时)" prop="driverIncome" sortable min-width="160"></el-table-column>
          <el-table-column label="额外支付费用" prop="extraTotalPrice" sortable min-width="140"></el-table-column>
          <el-table-column label="扣奖励金" prop="deductionReward" sortable min-width="120"></el-table-column>
          <el-table-column label="扣优惠金" prop="deductionCouponReward" sortable min-width="120"></el-table-column>
          <el-table-column label="扣优惠券抵扣" prop="deductionCoupon" sortable min-width="140"></el-table-column>
          <el-table-column label="车主实际收入" prop="driverFactIncome" sortable min-width="140"></el-table-column>
          <el-table-column label="利润" prop="profit" sortable min-width="100"></el-table-column>
          <!-- <el-table-column label="车主运费收入" prop="driverIncome" sortable width="120"></el-table-column> -->
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
<script type="text/javascript">
import { parseTime, pickerOptions2 } from "@/utils/index.js";
import GetCityList from "@/components/GetCityList/city";
import {
  orderExpenseSummary,
  orderExpenseSummaryExcel
} from "@/api/dataCenter/ranking";
import Pager from "@/components/Pagination/index";
import { SaveAsFile } from "@/utils/lodopFuncs";
export default {
  data() {
    return {
      loading: true,
      btnsize: "mini",
      pickerOptions2: {
        shortcuts: pickerOptions2
      },
      sizes: [20, 50, 100, 400],
      pagesize: 20, // 初始化加载数量
      page: 1, // 初始化页码
      dataTotal: 0,
      tableDataAll: [],
      chooseTime: [],
      formAllData: {
        // provinceCityArea: null,
        orderSerial: null,
        startDate: null,
        endDate: null
      },
      href: ""
    };
  },
  components: {
    GetCityList,
    Pager
  },
  methods: {
    firstblood() {
      this.loading = true;
      orderExpenseSummary(this.page, this.pagesize, this.formAllData)
        .then(res => {
          this.dataTotal = res.data.totalCount;
          this.tableDataAll = res.data.list;
          this.loading = false;
          this.tableDataAll.forEach(item => {
            item.createTime = parseTime(
              item.createTime,
              "{y}-{m}-{d} {h}:{i}:{s}"
            );
          });
        })
        .catch(err => {
          console.log("获取数据失败");
        });
    },
    getStr(val) {
      this.formAllData.provinceCityArea =
        val.province.name + "," + val.city.name + "," + val.area.name;
    },
    timeVal(i) {
      if (i) {
        this.formAllData.startDate = i[0];
        this.formAllData.endDate = i[1];
      } else {
        this.formAllData.startDate = "";
        this.formAllData.endDate = "";
      }
    },
    //   查询
    getdata_search() {
      this.page = 1;
      this.$refs.pager.inputval = this.page;
      this.$refs.pager.pageNum = this.page;
      this.firstblood();
    },
    // 清空查询
    clearSearch() {
      if (this.page != 1) {
        this.page = 1;
        this.$refs.pager.inputval = this.page;
        this.$refs.pager.pageNum = this.page;
      }
      this.formAllData = {
        provinceCityArea: null,
        startDate: null,
        endDate: null
      };
      this.$refs.area.clearData();
      this.chooseTime = [];
      this.firstblood();
    },
    handlePageChange(obj) {
      this.page = obj.pageNum;
      this.pagesize = obj.pageSize;
      this.firstblood();
    },
    //详情弹窗
    pushOrderSerial(item) {
      this.$router.push({
        name: "订单详情",
        query: { orderSerial: item.orderSerial }
      });
    },
    //   导出excel
    importExcel() {
      this.$message.info("正在导出中...");
      orderExpenseSummaryExcel(this.formAllData).then(res => {
        let fileNameSuffix = res.headers["content-disposition"].split(".")[1];
        var blob = new Blob([res]);
        this.href = window.URL.createObjectURL(blob);
        var NewDom = document.createElement("a");
        NewDom.setAttribute("href", this.href);
        NewDom.setAttribute("target", "_blank");
        NewDom.setAttribute("download", "订单费用明细汇总." + fileNameSuffix);
        document.body.appendChild(NewDom);
        NewDom.click();
        document.body.removeChild(NewDom);
      });
    }
  },
  mounted() {
    this.firstblood();
  }
};
</script>

<style type="text/css" lang="scss">
.RankingTotal {
  .classify_searchinfo {
    .timeLine {
      overflow: hidden;
      padding-top: 2px;
      .currentClick {
        color: #1890ff;
      }
      li {
        float: left;
        font-size: 16px;
        cursor: pointer;
        span {
          border-right: 1px solid #000;
          padding: 0 10px;
        }
      }
      li:last-child span {
        border-right: 0 none;
      }
    }
  }
}
</style>