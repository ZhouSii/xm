<template>
  <div class="identicalStyle RankingTotal" v-loading="loading">
    <el-form inline class="demo-ruleForm classify_searchinfo">
      <el-form-item label="所属区域">
        <GetCityList ref="area" v-model="formAllData.provinceCityArea" @returnStr="getStr"></GetCityList>
      </el-form-item>
      <el-form-item label="下单时间">
        <el-date-picker
          @change="timeVal"
          v-model="chooseTime"
          type="daterange"
          range-separator="-"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          unlink-panels
          align="right"
          :default-time="['00:00:00', '23:59:59']"
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
          :size="btnsize"
          icon="el-icon-download"
          plain
          @click="importExcel"
          v-has:DATA_CENTER_ORDERRESPONSETIME_EXPORT
        >导出Excel</el-button>
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
          <el-table-column
            label="订单号"
            prop="orderSerial"
            sortable
            show-overflow-tooltip
            min-width="250"
          >
            <template slot-scope="scope">
              <h4
                class="needMoreInfo"
                @click="pushOrderSerial(scope.row)"
              >{{ scope.row.orderSerial}}</h4>
            </template>
          </el-table-column>
          <el-table-column
            label="区域"
            prop="provinceCityArea"
            sortable
            show-overflow-tooltip
            min-width="180"
          ></el-table-column>
          <el-table-column label="货主手机号" prop="shipperMobile" sortable min-width="150"></el-table-column>
          <el-table-column label="车主手机号" prop="driverMobile" sortable min-width="150"></el-table-column>
          <el-table-column
            label="货主所属业务员"
            prop="shipperSalesmanName"
            sortable
            show-overflow-tooltip
            min-width="150"
          ></el-table-column>
          <el-table-column
            label="车主所属业务员"
            prop="belongSalesmanName"
            sortable
            show-overflow-tooltip
            min-width="150"
          ></el-table-column>
          <el-table-column label="抢单人数" prop="grabNum" sortable min-width="150"></el-table-column>
          <el-table-column label="运费总额" prop="totalAmount" sortable min-width="150"></el-table-column>
          <el-table-column label="所需车型" prop="usedCarType" sortable min-width="150"></el-table-column>
          <el-table-column label="下单时间" prop="createTime" sortable min-width="160"></el-table-column>
          <el-table-column label="用车时间" prop="useCarTime" sortable min-width="160"></el-table-column>
          <el-table-column label="推单时间" prop="pushTime" sortable min-width="160"></el-table-column>
          <el-table-column label="抢单时间" prop="grabTime" sortable min-width="160"></el-table-column>
          <el-table-column label="中单时间" prop="obtainTime" sortable min-width="160"></el-table-column>
          <el-table-column label="里程数(公里)" prop="totalMileage" sortable min-width="150"></el-table-column>
          <el-table-column label="距离提货地(米)" prop="distance" sortable min-width="150"></el-table-column>
          <el-table-column label="提货地经度" prop="longitude" sortable min-width="150"></el-table-column>
          <el-table-column label="提货地纬度" prop="latitude" sortable min-width="150"></el-table-column>
          <el-table-column label="订单类型" prop="orderType" sortable min-width="150"></el-table-column>
          <el-table-column label="订单状态" prop="parentOrderStatus" sortable min-width="150"></el-table-column>
          <el-table-column label="付款状态" prop="payStatus" sortable min-width="150"></el-table-column>
          <el-table-column label="支付时机" prop="payTimeType" sortable min-width="150"></el-table-column>
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
  orderResponseAging,
  orderResponseAgingExcel
} from "@/api/dataCenter/DayTrend";
import Pager from "@/components/Pagination/index";
export default {
  data() {
    return {
      loading: false,
      btnsize: "mini",
      pickerOptions2: { shortcuts: pickerOptions2 },
      sizes: [20, 50, 100, 400],
      pagesize: 20, // 初始化加载数量
      page: 1, // 初始化页码
      dataTotal: 0,
      tableDataAll: [],
      chooseTime: [],
      formAllData: {
        provinceCityArea: null,
        startTime: null,
        endTime: null
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
      orderResponseAging(this.page, this.pagesize, this.formAllData).then(
        res => {
          this.dataTotal = res.data.totalCount;
          this.tableDataAll = res.data.list;
          this.tableDataAll.forEach(item => {
            item.createTime = parseTime(
              item.createTime,
              "{y}-{m}-{d} {h}:{i}:{s}"
            );
            item.useCarTime = parseTime(
              item.useCarTime,
              "{y}-{m}-{d} {h}:{i}:{s}"
            );
            item.pushTime = parseTime(item.pushTime, "{y}-{m}-{d} {h}:{i}:{s}");
            item.grabTime = parseTime(item.grabTime, "{y}-{m}-{d} {h}:{i}:{s}");
            item.obtainTime = parseTime(
              item.obtainTime,
              "{y}-{m}-{d} {h}:{i}:{s}"
            );
            item.payTimeType = parseTime(
              item.payTimeType,
              "{y}-{m}-{d} {h}:{i}:{s}"
            );
          });
          this.loading = false;
        }
      );
    },
    getStr(val) {
      this.formAllData.provinceCityArea =
        val.province.name + "," + val.city.name + "," + val.area.name;
    },
    // 时间段
    timeVal(i) {
      if (i) {
        this.formAllData.startTime = i[0];
        this.formAllData.endTime = i[1];
      } else {
        this.formAllData.startTime = "";
        this.formAllData.endTime = "";
      }
    },
    // 搜索
    getData_query() {
      this.firstblood();
    },
    // 清空搜索
    clearSearch() {
      if (this.page != 1) {
        this.page = 1;
        this.$refs.pager.inputval = this.page;
        this.$refs.pager.pageNum = this.page;
      }
      this.$refs.area.clearData();
      this.chooseTime = [];
      this.formAllData = {
        provinceCityArea: null,
        startTime: null,
        endTime: null
      };
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
      orderResponseAgingExcel(0, 0, this.formAllData).then(res => {
        var blob = new Blob([res]);
        this.href = window.URL.createObjectURL(blob);
        var NewDom = document.createElement("a");
        NewDom.setAttribute("href", this.href);
        NewDom.setAttribute("target", "_blank");
        NewDom.setAttribute("download", "订单响应时效明细.xls");
        document.body.appendChild(NewDom);
        NewDom.click();
        document.body.removeChild(NewDom);
      });
    }
  },
  mounted() {
    // this.firstblood();
  }
};
</script>

<style type="text/css" lang="scss">
// .RankingTotal {
//   .classify_searchinfo {
//     // .timeLine{
//     //     overflow: hidden;
//     //     padding-top: 2px;
//     //     .currentClick{
//     //         color:#1890ff;
//     //     }
//     //     li{
//     //         float: left;
//     //         font-size: 16px;
//     //         cursor: pointer;
//     //         span{
//     //             border-right: 1px solid #000 ;
//     //             padding:0 10px;
//     //         };
//     //     }
//     //     li:last-child span{
//     //         border-right: 0 none;
//     //     }
//     // }
//   }
// }
</style>

