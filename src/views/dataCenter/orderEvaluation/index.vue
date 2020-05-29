<template>
  <div class="identicalStyle orderEvaluation" style="height:100%" v-loading="loading">
    <el-form :inline="true" class="demo-ruleForm classify_searchinfo">
      <el-form-item label="订单号">
        <el-input clearable v-model="searchInfo.orderSerial" maxlength="21" placeholder="请输入订单号"></el-input>
      </el-form-item>
      <el-form-item label="货主评价车主星级">
        <div style="display:flex" class="inputWidthMinus">
          <el-input clearable v-model="searchInfo.carStarStart" v-numberOnly maxlength="1"></el-input>
          <span style="padding:0 10px">至</span>
          <el-input clearable v-model="searchInfo.carStarEnd" v-numberOnly maxlength="1"></el-input>
        </div>
      </el-form-item>
      <!-- <el-form-item label="至">
        <el-input clearable v-model="searchInfo.carStarEnd" v-numberOnly min="1" max="5"></el-input>
      </el-form-item>-->
      <!-- <el-form-item label="车主评价货主星级">
        <el-input clearable v-model="searchInfo.ShipperStarStart" v-numberOnly min="1" max="5"></el-input>
      </el-form-item>
      <el-form-item label="至">
        <el-input clearable v-model="searchInfo.shipperStarEnd" v-numberOnly min="1" max="5"></el-input>
      </el-form-item>-->
      <el-form-item label="下单时间">
        <el-date-picker
          v-model="searchInfo.tradeTime"
          type="daterange"
          unlink-panels
          :picker-options="pickerOptions2"
          range-separator="-"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          value-format="yyyy-MM-dd HH:mm:ss"
          :default-time="['00:00:00', '23:59:59']"
          @change="cTime"
        ></el-date-picker>
      </el-form-item>
      <el-form-item label="跟进状态">
        <el-select v-model="searchInfo.followStatus" clearable placeholder="请选择">
          <el-option
            v-for="item in followStatusList"
            :key="item.code"
            :label="item.name"
            :value="item.code"
          ></el-option>
        </el-select>
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
        >导出Excel</el-button>
      </div>
      <div class="info_news">
        <el-table
          ref="multipleTable"
          style="width: 100%"
          border
          height="100%"
          @selection-change="getSelection"
          @row-click="clickDetails"
          highlight-current-row
          :data="tableDataAll"
          tooltip-effect="dark"
        >
          <el-table-column label="选择" type="selection" width="40"></el-table-column>
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
          <el-table-column label="货主" prop="shipper" sortable show-overflow-tooltip min-width="200"></el-table-column>
          <el-table-column
            label="车主"
            prop="carOwner"
            sortable
            show-overflow-tooltip
            min-width="200"
          ></el-table-column>
          <el-table-column
            label="下单时间"
            prop="tradeTime"
            sortable
            show-overflow-tooltip
            min-width="160"
          >
            <template slot-scope="scope">{{scope.row.payTime|parseTime}}</template>
          </el-table-column>
          <el-table-column
            label="货主评价车主星级"
            prop="carStar"
            sortable
            show-overflow-tooltip
            min-width="180"
          ></el-table-column>
          <el-table-column
            label="车主被评价标签"
            prop="label"
            sortable
            show-overflow-tooltip
            min-width="200"
          ></el-table-column>
          <el-table-column
            label="车主被评价内容"
            prop="content"
            sortable
            show-overflow-tooltip
            min-width="200"
          ></el-table-column>
          <el-table-column
            label="车主评价货主星级"
            prop="carStar"
            sortable
            show-overflow-tooltip
            min-width="180"
          ></el-table-column>
          <el-table-column
            label="货主被评价标签"
            prop="label"
            sortable
            show-overflow-tooltip
            min-width="200"
          ></el-table-column>
          <el-table-column
            label="货主被评价内容"
            prop="content"
            sortable
            show-overflow-tooltip
            min-width="200"
          ></el-table-column>
          <el-table-column
            label="跟进状态"
            prop="followStatus"
            sortable
            show-overflow-tooltip
            min-width="140"
          ></el-table-column>
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
import {
  getStatementDetailList,
  getStatementDetailListExcel
} from "@/api/finance/statement.js";
import Pager from "@/components/Pagination/index";
import { parseTime, pickerOptions2 } from "@/utils/";
export default {
  data() {
    return {
      loading: false,
      pickerOptions2: { shortcuts: pickerOptions2 },
      btnsize: "mini",
      selectRowData: [],
      sizes: [20, 50, 100, 400],
      pagesize: 20, // 初始化加载数量
      page: 1, // 初始化页码
      totalCount: null,
      dataTotal: 0,
      tableDataAll: [],
      tradeTime: [],
      searchInfo: {
        tradeTime: [],
        orderSerial: null,
        followStatus: null,
        carStarStart: "",
        carStarend: "",
        shipperStarStart: "",
        shipperStarend: ""
      },
      followStatusList: [
        { name: "全部", code: null },
        { name: "未跟进", code: "AF10201" },
        { name: "跟进中", code: "AF10202" },
        { name: "已跟进", code: "AF10203" }
      ]
    };
  },
  components: {
    Pager
  },
  mounted() {
    setTimeout(() => {
      this.$refs.multipleTable.$el.style.height =
        this.$refs.multipleTable.$el.offsetHeight + "px";
    }, 300);
    this.firstblood();
  },
  methods: {
    importExcel() {
      // this.$message.info("正在导出中...");
      // let href = "";
      // getStatementDetailListExcel(0, 0, this.searchInfo).then(res => {
      //   var blob = new Blob([res]);
      //   href = window.URL.createObjectURL(blob);
      //   var NewDom = document.createElement("a");
      //   NewDom.setAttribute("href", href);
      //   NewDom.setAttribute("target", "_blank");
      //   NewDom.setAttribute("download", this.accountTypeName + "流水明细.xls");
      //   document.body.appendChild(NewDom);
      //   NewDom.click();
      //   document.body.removeChild(NewDom);
      // });
    },
    // 列表刷新页面
    firstblood() {
      // this.loading = true;
      // getStatementDetailList(this.page, this.pagesize, this.searchInfo)
      //   .then(res => {
      //     this.tableDataAll = res.data.list[0].aflcOrderPaymentDtoList;
      //     this.dataTotal = res.data.totalCount;
      //     this.incomeAmount = res.data.list[0].incomeAmount;
      //     this.expendAmount = res.data.list[0].expendAmount;
      //     this.tableDataAll.forEach(item => {
      //       item.payTime = parseTime(item.payTime, "{y}-{m}-{d} {h}:{i}:{s}");
      //     });
      //     this.loading = false;
      //   })
      //   .catch(err => {
      //     this.loading = false;
      //     this.$message.error(err.errorInfo || err.text);
      //   });
    },
    // 申请时间
    cTime(i) {
      if (i) {
        this.searchInfo.tradeStartTime = i[0];
        this.searchInfo.tradeEndTime = i[1];
      } else {
        this.searchInfo.tradeStartTime = "";
        this.searchInfo.tradeEndTime = "";
      }
    },
    //  查询
    getData_query() {
      this.page = 1;
      this.$refs.pager.inputval = this.page;
      this.$refs.pager.pageNum = this.page;
      this.firstblood();
    },
    // 清空
    clearSearch() {
      this.searchInfo = this.$options.data().searchInfo;
      if (this.page != 1) {
        this.page = 1;
        this.$refs.pager.inputval = this.page;
        this.$refs.pager.pageNum = this.page;
      }
      this.firstblood();
    },
    // 判断选中与否
    getSelection(val) {
      console.log("选中内容", val);
      this.selectRowData = val;
    },
    // 点击选中当前行
    clickDetails(row, event, column) {
      this.$refs.multipleTable.toggleRowSelection(row);
    },
    // 每页显示数据量变更
    handlePageChange(obj) {
      this.page = obj.pageNum;
      this.pagesize = obj.pageSize;
      this.firstblood();
    },
    pushOrderSerial(item) {
      this.$router.push({
        name: "订单详情",
        query: { orderSerial: item.orderSerial }
      });
    }
  }
};
</script>
<style lang="scss" scoped>
</style>

