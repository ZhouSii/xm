<template>
  <div class="identicalStyle clearfix waitpayment" v-loading="loading">
    <el-form
      :inline="true"
      :model="searchInfo"
      ref="ruleForm"
      class="demo-ruleForm classify_searchinfo"
    >
      <el-form-item label="所属区域">
        <GetCityList ref="area" v-model="areaName" @returnStr="getStr"></GetCityList>
      </el-form-item>
      <el-form-item label="交易时间">
        <el-date-picker
          v-model="searchCreatTime"
          type="daterange"
          align="right"
          popper-class="searchCreatTime"
          value-format="timestamp"
          start-placeholder="开始日期"
          :picker-options="pickerOptions2"
          end-placeholder="结束日期"
          @change="cTime"
        ></el-date-picker>
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
      <div class="btns_box">
        <el-button
          type="primary"
          :size="btnsize"
          plain
          icon="el-icon-download"
          @click="handleSearch('outExce')"
          v-has:MARKETING_OPERATION_GOODS_INSURE_EXPORT_EXCEL
        >导出Excel</el-button>
      </div>
      <div class="info_news">
        <!-- table内容 -->
        <el-table
          id="out-table"
          ref="multipleTable"
          :data="tableData"
          stripe
          border
          align="center"
          height="100%"
          tooltip-effect="dark"
          v-has:MARKETING_OPERATION_GOODS_INSURE_LIST
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
          <el-table-column prop="areaCode" :show-overflow-tooltip="true" label="所属区域" sortable></el-table-column>
          <el-table-column prop="insuredType" :show-overflow-tooltip="true" label="交易类型" sortable>
            <template slot-scope="scope">
              <span>{{scope.row.insuredType=='0'?'货主货物保障':'车主货物保障'}}</span>
            </template>
          </el-table-column>
          <el-table-column
            prop="insuredPriceValue"
            :show-overflow-tooltip="true"
            label="货物保障费总金额"
            sortable
          ></el-table-column>
          <el-table-column prop="shipperName" :show-overflow-tooltip="true" label="货主" sortable>
            <template slot-scope="scope">
              <span>{{scope.row.shipperMobile}}-{{scope.row.shipperName}}</span>
            </template>
          </el-table-column>
          <el-table-column prop="driverName" :show-overflow-tooltip="true" label="车主" sortable>
            <template slot-scope="scope">
              <span>{{scope.row.driverMobile}}-{{scope.row.driverName}}</span>
            </template>
          </el-table-column>
          <el-table-column prop="orderTime" :show-overflow-tooltip="true" label="交易时间" sortable>
            <template slot-scope="scope">
              <span
                class="orderSerial"
              >{{ scope.row.orderTime | parseTime('{y}-{m}-{d} {h}:{i}:{s}')}}</span>
            </template>
          </el-table-column>
        </el-table>
        <!-- 页码 -->
        <div class="info_tab_footer" v-has:MARKETING_OPERATION_GOODS_INSURE_LIST>
          共计:{{ dataTotal }}
          <div class="show_pager">
            <Pager :total="dataTotal" @change="handlePageChange" :sizes="sizes" ref="pager" />
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
  aflcOrderGoodsInsure,
  aflcOrderGoodsInsureExcel
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
        new Date() - 60 * 24 * 60 * 60 * 1000,
        new Date().getTime()
      ],
      areaName: "",
      searchInfo: {
        areaCode: null,
        orderStartTime: null,
        orderEndTime: null,
        orderSerial: null
      },
      pickerOptions2: {
        shortcuts: pickerOptions2
      },
      tableData: [],
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
  beforeDestroy() {},
  methods: {
    getStr(val) {
      this.areaName = val.area.name;
      this.searchInfo.areaCode = val.area.code;
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
        this.searchInfo.orderStartTime = this.searchCreatTime[0];
        this.searchInfo.orderEndTime = this.searchCreatTime[1];
      } else {
        this.searchInfo.orderStartTime = null;
        this.searchInfo.orderEndTime = null;
      }
      aflcOrderGoodsInsure(this.page, this.pagesize, this.searchInfo).then(
        res => {
          if (res) {
            this.tableData = res.data.list;
            this.dataTotal = res.data.totalCount;
            this.loading = false;
          }
        }
      );
    },
    // 模糊查询 分类名称或者code
    handleSearch(type) {
      switch (type) {
        case "search":
          this.page = 1;
          this.$refs.pager.inputval = this.page;
          this.$refs.pager.pageNum = this.page;
          this.firstblood();
          break;
        case "clear":
          this.searchInfo = {
            areaCode: null,
            orderStartTime: null,
            orderEndTime: null,
            orderSerial: null
          };
          this.areaName = null;
          this.searchCreatTime = [];
          if (this.page != 1) {
            this.page = 1;
            this.$refs.pager.inputval = this.page;
            this.$refs.pager.pageNum = this.page;
          }
          this.$refs.area.clearData();
          this.firstblood();
          break;
        case "outExce":
          if (!this.searchInfo.orderStartTime) {
            this.$message.error("交易开始时间不能为空");
          } else {
            aflcOrderGoodsInsureExcel(0, 0, this.searchInfo).then(res => {
              var blob = new Blob([res]);
              this.href = window.URL.createObjectURL(blob);
              var NewDom = document.createElement("a");
              NewDom.setAttribute("href", this.href);
              NewDom.setAttribute("target", "_blank");
              NewDom.setAttribute(
                "download",
                parseTime(this.searchInfo.orderStartTime, "{y}-{m}-{d}") +
                  "至" +
                  parseTime(this.searchInfo.orderEndTime, "{y}-{m}-{d}") +
                  "货物保障明细.xls"
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
    cTime(i) {
      if (i !== null) {
        this.searchInfo.orderStartTime = i[0];
        this.searchInfo.orderEndTime = i[1];
      } else {
        this.searchInfo.orderStartTime = null;
        this.searchInfo.orderEndTime = null;
      }
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
