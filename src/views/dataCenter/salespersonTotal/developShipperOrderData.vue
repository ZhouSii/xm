<template>
  <div class="identicalStyle developShipperOrderData" style="height:100%" v-loading="loading">
    <el-form :inline="true" class="demo-ruleForm classify_searchinfo">
      <el-form-item label="订单状态">
        <el-select v-model="searchInfo.parentOrderStatus" clearable placeholder="请选择" disabled>
          <el-option
            v-for="item in parentOrderStatusList"
            :key="item.code"
            :label="item.name"
            :value="item.code"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="时间">
        <el-date-picker
          v-model="chooseTime"
          type="daterange"
          range-separator="-"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          value-format="timestamp"
          unlink-panels
          align="right"
          :default-time="['00:00:00', '23:59:59']"
          disabled
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
        <!-- <el-button
          type="info"
          plain
          @click="clearSearch"
          :size="btnsize"
          icon="fontFamily aflc-icon-qingkong"
        >清空</el-button>-->
      </el-form-item>
    </el-form>
    <div class="classify_info">
      <div class="btns_box" style="font-size:24px">
        <span class="description" style="margin-left:0">业务区：{{group||'无'}}</span>
        <span class="description" style="margin-left:40px">业务员：{{name||'无'}}</span>
      </div>
      <div class="info_news">
        <el-table
          ref="multipleTable"
          style="width: 100%"
          stripe
          border
          height="100%"
          highlight-current-row
          :data="tableDataAll"
          tooltip-effect="dark"
        >
          <el-table-column label="序号" width="60">
            <template slot-scope="scope">{{ (page - 1)*pagesize + scope.$index + 1 }}</template>
          </el-table-column>
          <el-table-column label="订单号" prop="orderSerial" show-overflow-tooltip min-width="250">
            <template slot-scope="scope">
              <h4
                class="needMoreInfo"
                @click="pushOrderDetail(scope.row)"
              >{{ scope.row.orderSerial}}</h4>
            </template>
          </el-table-column>
          <el-table-column
            label="区域"
            sortable
            show-overflow-tooltip
            min-width="160"
            prop="provinceCityArea"
          ></el-table-column>
          <el-table-column
            label="货主"
            prop="shipperInfo"
            sortable
            show-overflow-tooltip
            min-width="200"
          >
            <!-- <template
              slot-scope="scope"
            >{{scope.row.shipperMobile+(scope.row.shipperName==null?'':`-${scope.row.shipperName}`)}}</template>-->
          </el-table-column>
          <el-table-column
            label="货主认证状态"
            prop="shipperStatusName"
            sortable
            show-overflow-tooltip
            min-width="130"
          ></el-table-column>
          <el-table-column
            label="车主"
            prop="driverInfo"
            sortable
            show-overflow-tooltip
            min-width="250"
          >
            <!-- <template
              slot-scope="scope"
            >{{`${scope.row.driverMobile}-${scope.row.driverName}-${scope.row.carNumber}`}}</template>-->
          </el-table-column>
          <el-table-column
            label="订单类型"
            prop="orderClassName"
            sortable
            show-overflow-tooltip
            min-width="120"
          ></el-table-column>
          <el-table-column
            label="所需车型"
            prop="usedCarTypeName"
            sortable
            show-overflow-tooltip
            min-width="120"
          ></el-table-column>
          <el-table-column
            label="运费总额"
            prop="totalAmount"
            sortable
            show-overflow-tooltip
            min-width="120"
          ></el-table-column>
          <el-table-column
            label="下单时间"
            prop="useTime"
            sortable
            show-overflow-tooltip
            min-width="160"
          >
            <template slot-scope="scope">{{scope.row.useTime|parseTime}}</template>
          </el-table-column>
          <el-table-column
            label="用车时间"
            prop="useCarTime"
            sortable
            show-overflow-tooltip
            min-width="160"
          >
            <template slot-scope="scope">{{scope.row.useCarTime|parseTime}}</template>
          </el-table-column>
          <el-table-column
            label="订单状态"
            prop="parentOrderStatusName"
            sortable
            show-overflow-tooltip
            min-width="120"
          ></el-table-column>
          <el-table-column
            label="付款状态"
            prop="payStatusName"
            sortable
            show-overflow-tooltip
            min-width="120"
          ></el-table-column>
          <el-table-column
            label="支付时机"
            prop="payTimeTypeName"
            sortable
            show-overflow-tooltip
            min-width="120"
          ></el-table-column>
          <el-table-column
            label="付款方式"
            prop="payWayName"
            sortable
            show-overflow-tooltip
            min-width="120"
          ></el-table-column>
          <el-table-column
            label="完成时间"
            prop="complateTime"
            sortable
            show-overflow-tooltip
            min-width="160"
          >
            <template slot-scope="scope">{{scope.row.complateTime|parseTime}}</template>
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
import { eventBus } from "@/eventBus";
import Pager from "@/components/Pagination/index";
import { parseTime } from "@/utils/";
import { findSalesmanShipperOrderDevelopDetailList } from "@/api/dataCenter/salespersonTotal/developTotal.js";
export default {
  data() {
    return {
      loading: true,
      btnsize: "mini",
      sizes: [20, 50, 100, 400],
      pagesize: 20, // 初始化加载数量
      page: 1, // 初始化页码
      totalCount: null,
      dataTotal: 0,
      tableDataAll: [],
      chooseTime: [],
      group: "",
      name: "",
      shipperStatusList: [
        { name: "全部", code: null },
        { name: "未认证", code: "AF0010401" },
        { name: "待认证", code: "AF0010402" },
        { name: "已认证", code: "AF0010403" },
        { name: "认证不通过", code: "AF0010404" }
      ],
      parentOrderStatusList: [
        { name: "全部", code: null },
        { name: "已完成", code: "AF00807" },
        { name: "已取消", code: "AF00808" }
      ],
      searchInfo: {
        queryBeginTime: this.$route.query.start,
        queryEndTime: this.$route.query.end,
        parentOrderStatus: this.$route.query.status,
        belongSalesmanId: this.$route.query.id,
        onLinePayFlag: this.$route.query.status == "AF00807" ? "1" : "" //支付时机：1==在线支付，2==线下支付
      }
    };
  },
  components: {
    Pager
  },
  watch: {
    $route(to, from) {
      if (
        (from.name == "营销人员业务提成汇总" ||
          from.name == "营销人员业务发展汇总") &&
        to.name == "发展货主在线交易订单数"
      ) {
        if (Object.keys(this.$route.query).length !== 0) {
          this.searchInfo.belongSalesmanId = this.$route.query.id;
          this.init();
        }
      }
    }
  },
  methods: {
    // searchTime(i) {
    //   if (i) {
    //     this.searchInfo.queryBeginTime = i[0];
    //     this.searchInfo.queryEndTime = i[1];
    //   } else {
    //     this.searchInfo.queryBeginTime = "";
    //     this.searchInfo.queryEndTime = "";
    //   }
    // },
    // 列表刷新页面
    firstblood() {
      this.loading = true;
      findSalesmanShipperOrderDevelopDetailList(
        this.page,
        this.pagesize,
        this.searchInfo
      )
        .then(res => {
          this.dataTotal = res.data.totalCount;
          this.tableDataAll = res.data.list;
          this.tableDataAll.map(item => {
            item.shipperInfo = item.shipperMobile
              ? item.shipperName
                ? item.shipperMobile + "-" + item.shipperName
                : item.shipperMobile
              : item.shipperName
              ? item.shipperName
              : "";
            item.driverInfo = item.driverMobile
              ? item.driverName
                ? item.carNumber
                  ? item.driverMobile +
                    "-" +
                    item.driverName +
                    "-" +
                    item.carNumber
                  : item.driverMobile + "-" + item.driverName
                : item.carNumber
                ? item.driverMobile + "-" + item.carNumber
                : item.driverMobile
              : item.driverName
              ? item.carNumber
                ? item.driverName + "-" + item.carNumber
                : item.driverName
              : item.carNumber
              ? item.carNumber
              : "";
          });
          this.loading = false;
        })
        .catch(err => {
          this.loading = false;
          this.$message.error(err.errorInfo || err.text);
        });
    },
    //  查询
    getData_query() {
      this.page = 1;
      this.$refs.pager.inputval = this.page;
      this.$refs.pager.pageNum = this.page;
      this.firstblood();
    },
    // 清空
    // clearSearch() {
    //   this.searchInfo = {
    //     queryBeginTime: "",
    //     queryEndTime: "",
    //     shipperStatus: null,
    //     parentOrderStatus: null,
    //     belongSalesmanId: this.$route.query.id,
    //     timeQueryType: "1"
    //   };
    //   if (this.page != 1) {
    //     this.page = 1;
    //     this.$refs.pager.inputval = this.page;
    //     this.$refs.pager.pageNum = this.page;
    //   }
    //   this.chooseTime = [];
    //   this.firstblood();
    // },
    // 每页显示数据量变更
    handlePageChange(obj) {
      this.page = obj.pageNum;
      this.pagesize = obj.pageSize;
      this.firstblood();
    },
    pushOrderDetail(item) {
      this.$router.push({
        name: "订单详情",
        query: { orderSerial: item.orderSerial }
      });
    },
    init() {
      let start = new Date(this.$route.query.start + " 00:00:00").getTime();
      let end = new Date(this.$route.query.end + " 23:59:59").getTime();
      this.searchInfo = {
        queryBeginTime: start,
        queryEndTime: end,
        parentOrderStatus: this.$route.query.status,
        belongSalesmanId: this.$route.query.id,
        onLinePayFlag: this.$route.query.status == "AF00807" ? "1" : ""
      };
      this.chooseTime = [start, end];
      this.group = this.$route.query.group;
      this.name = this.$route.query.name;
      this.firstblood();
    }
  },
  mounted() {
    this.init();
  }
};
</script>
<style lang="scss">
</style>

