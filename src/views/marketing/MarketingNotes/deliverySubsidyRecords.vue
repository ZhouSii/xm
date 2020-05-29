<template>
  <div class="identicalStyle" style="height:100%" v-loading="loading">
    <el-form :inline="true" class="demo-ruleForm classify_searchinfo">
      <el-form-item label="货主">
        <el-input v-model.trim="formAllData.shipper"></el-input>
      </el-form-item>
      <el-form-item label="服务分类">
        <el-select v-model="formAllData.serviceClassify" clearable placeholder="请选择">
          <el-option
            v-for="item in orderTypeList"
            :key="item.code"
            :label="item.name"
            :value="item.code"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="下单时间">
        <el-date-picker
          v-model="createTime"
          @change="authPassTimeVal"
          type="daterange"
          range-separator="-"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          unlink-panels
          align="right"
          value-format="timestamp"
          :default-time="['00:00:00', '23:59:59']"
        ></el-date-picker>
      </el-form-item>
      <el-form-item label="订单号">
        <el-input v-model.trim="formAllData.orderSerial"></el-input>
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
          plain
          icon="el-icon-download"
          @click="outPutExcel"
          :size="btnsize"
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
          <el-table-column label="订单号" prop="orderSerial" show-overflow-tooltip min-width="250">
            <template slot-scope="scope">
              <h4
                class="needMoreInfo"
                @click="jumpToOrderDetail(scope.row)"
              >{{scope.row.orderSerial}}</h4>
            </template>
          </el-table-column>
          <el-table-column label="货主" sortable show-overflow-tooltip min-width="250" prop="shipperText">
            <!-- <template slot-scope="scope">
              <h4
                class="needMoreInfo"
                @click="mobileOperate(scope.row)"
              >{{`${scope.row.shipperName}-${scope.row.shipperMobile}`}}</h4>
            </template> -->
          </el-table-column>
          <el-table-column
            label="货主归属区域"
            prop="areaName"
            sortable
            show-overflow-tooltip
            min-width="140"
          ></el-table-column>
          <el-table-column
            label="服务分类"
            prop="serviceClassifyName"
            sortable
            show-overflow-tooltip
            min-width="120"
          ></el-table-column>
          <el-table-column
            label="订单金额"
            prop="orderAmount"
            sortable
            show-overflow-tooltip
            min-width="120"
          ></el-table-column>
          <el-table-column
            label="状态"
            prop="orderStatusName"
            sortable
            show-overflow-tooltip
            min-width="120"
          ></el-table-column>
          <el-table-column
            label="津贴补贴(元)"
            prop="subsidyAmount"
            sortable
            show-overflow-tooltip
            min-width="120"
          ></el-table-column>
          <el-table-column
            label="是否为阶梯津贴"
            prop="subsidyType"
            sortable
            show-overflow-tooltip
            min-width="140"
          >
            <template slot-scope="scope">{{scope.row.subsidyType==0?'否':'是'}}</template>
          </el-table-column>
          <el-table-column
            label="阶梯津贴满足单量(单)"
            prop="gradient"
            sortable
            show-overflow-tooltip
            min-width="180"
          ></el-table-column>
          <el-table-column
            label="下单时间"
            prop="orderTime"
            sortable
            show-overflow-tooltip
            min-width="160"
          >
            <template slot-scope="scope">{{scope.row.orderTime|parseTime}}</template>
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
import {
  subsidyRecordDetailList,
  subsidyRecordDetailExcel
} from "@/api/marketing/shippermarkting/deliverySubsidy.js";
import { DicServiceType } from "@/api/common.js";
export default {
  data() {
    return {
      loading: false,
      btnsize: "mini",
      selectRowData: {},
      selectId: [],
      sizes: [20, 50, 100, 400],
      pagesize: 20, // 初始化加载数量
      page: 1, // 初始化页码
      totalCount: null,
      dataTotal: 0,
      tableDataAll: [],
      tableDataAllExcel: [],
      createTime: [],
      orderTypeList: [{ name: "全部", code: null }],
      formAllData: {
        shipper: null,
        orderStartTime: null,
        orderEndTime: null,
        serviceClassify: null,
        orderSerial: null
      }
    };
  },
  components: {
    Pager
  },
  methods: {
    getMoreInformation() {
      DicServiceType().then(res => {
        this.orderTypeList.push(...res.data);
      });
    },
    authPassTimeVal(i) {
      if (i) {
        this.formAllData.orderStartTime = i[0];
        this.formAllData.orderEndTime = i[1];
      } else {
        this.formAllData.orderStartTime = "";
        this.formAllData.orderEndTime = "";
      }
    },
    // 列表刷新页面
    firstblood() {
      this.loading = true;
      subsidyRecordDetailList(this.page, this.pagesize, this.formAllData)
        .then(res => {
          this.dataTotal = res.data.totalCount;
          this.tableDataAll = res.data.list;
          this.loading = false;
        })
        .catch(err => {
          this.loading = false;
          this.$message.error(err.errorInfo || err.text);
        });
    },
    // 导出Excel总数据
    outPutExcel() {
      let href = "";
      this.$message.info("正在导出中...");
      subsidyRecordDetailExcel(0, 0, this.formAllData).then(res => {
        var blob = new Blob([res]);
        href = window.URL.createObjectURL(blob);
        var NewDom = document.createElement("a");
        NewDom.setAttribute("href", href);
        NewDom.setAttribute("target", "_blank");
        NewDom.setAttribute("download", "发货津贴发放明细.xls");
        document.body.appendChild(NewDom);
        NewDom.click();
        document.body.removeChild(NewDom);
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
    clearSearch() {
      this.formAllData = {
        shipper: null,
        orderStartTime: null,
        orderEndTime: null,
        serviceClassify: null,
        orderSerial: null
      };
      if (this.page != 1) {
        this.page = 1;
        this.$refs.pager.inputval = this.page;
        this.$refs.pager.pageNum = this.page;
      }
      this.createTime = [];
      this.firstblood();
    },
    //跳转到订单详情
    jumpToOrderDetail(item) {
      this.$router.push({
        name: "订单详情",
        query: { orderSerial: item.orderSerial }
      });
    },
    // 货主
    // mobileOperate(i) {
    //   this.$router.push({ name: "货主详情", query: { userId: i.shipperId } });
    //   sessionStorage.setItem("HZdetailsName", "essential");
    // },
    // 每页显示数据量变更
    handlePageChange(obj) {
      this.page = obj.pageNum;
      this.pagesize = obj.pageSize;
      this.firstblood();
    }
  },

  mounted() {
    this.getMoreInformation();
    this.firstblood();
  }
};
</script>
<style lang="scss">
</style>

