<template>
  <div class="identicalStyle clearfix waitpayment" v-loading="loading">
    <el-form
      :inline="true"
      :model="searchInfo"
      ref="ruleForm"
      class="demo-ruleForm classify_searchinfo"
    >
      <!-- <el-form-item label="所属区域" prop="areaName">
        <vregion :ui="true"  @values="regionChange" class="form-control">
          <el-input  v-model="areaName" placeholder="请选择省/市/区" clearable @clear="clearName"></el-input>
        </vregion>
      </el-form-item>-->
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
      <el-form-item label="订单号" prop="orderSerial">
        <el-input v-model="searchInfo.orderSerial" clearable placeholder="请输入要查询的订单号"></el-input>
      </el-form-item>
      <el-form-item label="服务类型" prop="serivceCode">
        <el-select v-model="searchInfo.serivceCode" clearable placeholder="请选择">
          <el-option
            v-for="item in serviceCodeList"
            :key="item.code"
            :label="item.name"
            :value="item.code"
          ></el-option>
        </el-select>
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
          icon="el-icon-download"
          plain
          @click="handleSearch('outExce')"
          v-has:MARKETING_OPERATION_PREFERENTIAL_EXPORT_EXCEL
        >导出Excel</el-button>
        <span class="description">优惠金金额：{{rewardAmountSum}}</span>
        <span class="description">查询优惠金金额：{{searchRewardAmount}}</span>
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
          v-has:MARKETING_OPERATION_PREFERENTIAL_LIST
          @row-click="clickDetails"
          style="width: 100%"
        >
          <el-table-column label="序号" width="80">
            <template slot-scope="scope">{{ (page - 1)*pagesize + scope.$index + 1 }}</template>
          </el-table-column>
          <el-table-column prop="orderSerial" :show-overflow-tooltip="true" label="订单号" sortable>
            <template slot-scope="scope">
              <h4
                class="needMoreInfo"
                @click="pushOrderSerial(scope.row)"
              >{{ scope.row.orderSerial}}</h4>
            </template>
          </el-table-column>
          <el-table-column prop="serivceName" :show-overflow-tooltip="true" label="服务类型" sortable></el-table-column>
          <el-table-column prop="areaName" :show-overflow-tooltip="true" label="所属区域" sortable></el-table-column>
          <el-table-column prop="shipper" :show-overflow-tooltip="true" label="货主" sortable></el-table-column>
          <el-table-column prop="carType" :show-overflow-tooltip="true" label="需求车型" sortable></el-table-column>
          <el-table-column
            prop="totalAmount"
            :show-overflow-tooltip="true"
            label="订单金额"
            sortable
            width="120"
          ></el-table-column>
          <el-table-column
            prop="rewardSum"
            :show-overflow-tooltip="true"
            label="优惠金抵扣"
            sortable
            width="120"
          ></el-table-column>
          <el-table-column prop="tradeTime" :show-overflow-tooltip="true" label="交易时间" sortable>
            <template slot-scope="scope">
              <span
                class="orderSerial"
              >{{ scope.row.tradeTime | parseTime('{y}-{m}-{d} {h}:{i}:{s}')}}</span>
            </template>
            <!-- <template slot-scope="scope">{{ scope.row.commissionTime | parseTime('{y}-{m}-{d} {h}:{i}:{s}')}}</template> -->
          </el-table-column>
        </el-table>
        <!-- 页码 -->
        <div class="info_tab_footer" v-has:MARKETING_OPERATION_PREFERENTIAL_LIST>
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
// import vregion from '@/components/vregion/Region'
// import GetCityList from '@/components/GetCityList/area'
import GetCityList from "@/components/GetCityList/city";
import {
  postUserRewardShipperTransaction,
  userRewardShipperTransactionExcel
} from "@/api/marketing/carmarkting/operating";
export default {
  components: {
    Pager,
    GetCityList
    // vregion
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
        orderSerial: null,
        startTime: null, // 下单起始时间
        endTime: null, // 下单结束时间
        areaCodeList: null, //
        serivceCode: null
      },
      pickerOptions2: {
        shortcuts: pickerOptions2
      },
      tableData: [],
      dialogFormVisible_details: false, // 详情弹窗
      href: "",
      rewardAmountSum: 0,
      searchRewardAmount: 0,
      serviceCodeList: [
        { code: "AF01701", name: "小货车" },
        { code: "AF01702", name: "发物流" },
        { code: "AF01703", name: "大货车" }
      ]
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
      postUserRewardShipperTransaction(
        this.page,
        this.pagesize,
        this.searchInfo
      ).then(res => {
        if (res) {
          this.tableData = res.data.list[0].aflcUserRewardList;
          this.dataTotal = res.data.totalCount;
          this.rewardAmountSum = res.data.list[0].rewardAmountSum;
          this.searchRewardAmount = res.data.list[0].searchRewardAmount;
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
            orderSerial: null,
            startTime: null, // 下单起始时间
            endTime: null, // 下单结束时间
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
            userRewardShipperTransactionExcel(0, 0, this.searchInfo).then(
              res => {
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
                    "优惠金明细.xls"
                );
                document.body.appendChild(NewDom);
                NewDom.click();
                document.body.removeChild(NewDom);
              }
            );
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
      if (item.serivceCode == "AF01702") {
        this.$router.push({
          name: "发物流订单详情",
          query: { orderSerial: item.orderSerial }
        });
      } else if (item.serivceCode == "AF01701") {
        this.$router.push({
          name: "订单详情",
          query: { orderSerial: item.orderSerial }
        });
      }
    }
  }
};
</script>
<style type="text/css" lang="scss" scoped>
</style>
