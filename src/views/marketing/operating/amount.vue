<template>
  <div class="identicalStyle clearfix waitpayment" v-loading="loading">
    <el-form
      :inline="true"
      :model="searchInfo"
      ref="ruleForm"
      class="demo-ruleForm classify_searchinfo"
    >
      <el-form-item label="所属区域">
        <GetCityList ref="area" v-model="searchInfo.areaName" @returnStr="getStr"></GetCityList>
      </el-form-item>
      <el-form-item label="交易时间">
        <el-date-picker
          v-model="searchCreatTime"
          type="daterange"
          align="right"
          popper-class="searchCreatTime"
          value-format="yyyy-MM-dd"
          start-placeholder="开始日期"
          :picker-options="pickerOptions2"
          end-placeholder="结束日期"
        ></el-date-picker>
      </el-form-item>
      <el-form-item label="流水号">
        <el-input v-model="searchInfo.tradeSerial" clearable placeholder="请输入要查询的流水号"></el-input>
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
      <div class="btns_box">
        <el-button
          type="primary"
          :size="btnsize"
          plain
          @click="handleSearch('outExce')"
          icon="el-icon-download"
          v-has:MARKETING_OPERATION_ORDER_NUM_REWARD_EXPORT_EXCEL
        >导出Excel</el-button>
      </div>
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
          v-has:MARKETING_OPERATION_ORDER_NUM_REWARD_LIST
          @row-click="clickDetails"
          style="width: 100%"
        >
          <el-table-column label="序号" width="80">
            <template slot-scope="scope">{{ (page - 1)*pagesize + scope.$index + 1 }}</template>
          </el-table-column>
          <el-table-column
            :show-overflow-tooltip="true"
            prop="tradeSerial"
            label="流水号"
            width="250"
            sortable
          >
            <!-- <template  slot-scope="scope">
                <h4 class="needMoreInfo" @click="pushOrderSerial(scope.row)">{{ scope.row.tradeSerial}}</h4>
            </template>-->
          </el-table-column>
          <el-table-column :show-overflow-tooltip="true" prop="areaName" label="所属区域" sortable></el-table-column>
          <el-table-column :show-overflow-tooltip="true" prop="driver" label="车主" sortable></el-table-column>
          <el-table-column :show-overflow-tooltip="true" prop="carType" label="车型" sortable></el-table-column>
          <el-table-column
            :show-overflow-tooltip="true"
            prop="commisionLevelName"
            label="抽佣等级"
            sortable
          ></el-table-column>
          <el-table-column :show-overflow-tooltip="true" prop="rewardTime" label="奖励日期" sortable>
            <template slot-scope="scope">
              <span class="orderSerial">{{ scope.row.rewardTime | parseTime('{y}-{m}-{d}')}}</span>
            </template>
            <!-- <template slot-scope="scope">{{ scope.row.commissionTime | parseTime('{y}-{m}-{d} {h}:{i}:{s}')}}</template> -->
          </el-table-column>
          <el-table-column prop="orderNums" :show-overflow-tooltip="true" label="累计完成单量" sortable></el-table-column>
          <el-table-column prop="rewardAmount" :show-overflow-tooltip="true" label="达量奖励" sortable></el-table-column>
          <el-table-column prop="tradeTime" :show-overflow-tooltip="true" label="交易时间" sortable>
            <template slot-scope="scope">
              <span
                class="orderSerial"
              >{{ scope.row.tradeTime | parseTime('{y}-{m}-{d} {h}:{i}:{s}')}}</span>
            </template>
          </el-table-column>
        </el-table>
        <!-- 页码 -->
        <div class="info_tab_footer" v-has:MARKETING_OPERATION_ORDER_NUM_REWARD_LIST>
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
import GetCityList from "@/components/GetCityList/city";
import {
  postDriverOrderNumTransaction,
  driverOrderTransactionExcel
} from "@/api/marketing/carmarkting/operating";
export default {
  components: {
    Pager,
    GetCityList
  },
  props: {
    isvisible: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      areaCodeList1: [],
      btnsize: "mini",
      timeOutWaitPay: null,
      loading: true, // 加载
      sizes: [20, 50, 100, 400],
      pagesize: 20, // 初始化加载数量
      page: 1, // 初始化页码
      dataTotal: 0,
      isEport: false,
      searchCreatTime: [],
      defaultTime: [
        parseTime(+new Date() - 60 * 24 * 60 * 60 * 1000, "{y}-{m}-{d}"),
        parseTime(new Date(), "{y}-{m}-{d}")
      ],
      areaName: "",
      searchInfo: {
        areaName: null,
        tradeSerial: null,
        startTime: null, // 下单起始时间
        endTime: null, // 下单结束时间
        areaCodeList: null
      },
      pickerOptions2: {
        shortcuts: pickerOptions2
      },
      tableData: [],
      dialogFormVisible_details: false, // 详情弹窗
      href: ""
    };
  },
  created() {},
  mounted() {
    setTimeout(() => {
      this.$refs.multipleTable.$el.style.height =
        this.$refs.multipleTable.$el.offsetHeight + "px";
    }, 300);
    this.firstblood();
  },
  beforeDestroy() {},
  methods: {
    clearName() {
      this.areaName = "";
      this.searchInfo.areaCodeList = [];
      this.areaCodeList1 = [];
    },
    getStr(val) {
      const arrCode = [];
      arrCode.push(val.area.code);
      this.searchInfo.areaCodeList = Object.assign([], arrCode);
    },
    getValue(obj) {
      return obj ? obj.value : "";
    },
    handlePageChange(obj) {
      this.page = obj.pageNum;
      this.pagesize = obj.pageSize;
      this.firstblood();
    },
    // 刷新页面
    firstblood() {
      this.loading = true;
      if (this.searchCreatTime) {
        this.searchInfo.startTime =
          this.searchCreatTime.length > 0
            ? parseTime(this.searchCreatTime[0], "{y}-{m}-{d} ") + " 00:00:00"
            : null;
        this.searchInfo.endTime =
          this.searchCreatTime.length > 0
            ? parseTime(this.searchCreatTime[1], "{y}-{m}-{d} ") + " 23:59:59"
            : null;
      } else {
        this.searchInfo.startTime = null;
        this.searchInfo.endTime = null;
      }
      postDriverOrderNumTransaction(
        this.page,
        this.pagesize,
        this.searchInfo
      ).then(res => {
        if (res) {
          this.tableData = res.data.list[0].aflcDriverOrdernumDetailList;
          this.dataTotal = res.data.totalCount;
          this.loading = false;
        }
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
            tradeSerial: "",
            startTime: "", // 下单起始时间
            endTime: "", // 下单结束时间
            areaCodeList: []
          };
          this.searchCreatTime = [];
          this.$refs.area.clearData();
          this.firstblood();
          break;
        case "outExce":
          if (!this.searchInfo.startTime) {
            this.$message.error("交易开始时间不能为空");
          } else {
            driverOrderTransactionExcel(0, 0, this.searchInfo).then(res => {
              var blob = new Blob([res]);
              this.href = window.URL.createObjectURL(blob);
              var NewDom = document.createElement("a");
              NewDom.setAttribute("href", this.href);
              NewDom.setAttribute("target", "_blank");
              NewDom.setAttribute(
                "download",
                parseTime(this.searchInfo.startTime, "{y}-{m}-{d}") +
                  "至" +
                  parseTime(this.searchInfo.endTime, "{y}-{m}-{d}") +
                  "达量奖励明细.xls"
              );
              document.body.appendChild(NewDom);
              NewDom.click();
              document.body.removeChild(NewDom);
            });
          }
          break;
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
        name: "订单详情",
        query: { orderSerial: item.orderSerial }
      });
    }
  }
};
</script>
<style type="text/css" lang="scss" scoped>
</style>
