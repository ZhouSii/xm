<template>
  <div class="identicalStyle" style="height:100%" v-loading="loading">
    <el-form :inline="true" class="demo-ruleForm classify_searchinfo">
      <el-form-item label="货主">
        <el-input v-model="formAllData.shipperMobileOrName" clearable></el-input>
      </el-form-item>
      <el-form-item label="领券活动名称">
        <el-input v-model="formAllData.couponGetActivityName" clearable></el-input>
      </el-form-item>
      <el-form-item label="优惠券活动名称">
        <el-input v-model="formAllData.couponActivityName" clearable></el-input>
      </el-form-item>
      <el-form-item label="领取类型">
        <el-select v-model="formAllData.getTypeCode" clearable placeholder="请选择">
          <el-option
            v-for="item in optionsCoupon"
            :key="item.code"
            :label="item.name"
            :value="item.code"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="领取间隔时间">
        <el-select v-model="formAllData.getIntervalTimeCode" clearable placeholder="请选择">
          <el-option
            v-for="item in optionsTime"
            :key="item.code"
            :label="item.name"
            :value="item.code"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="券码状态">
        <el-select v-model="formAllData.couponStatusCode" clearable placeholder="请选择">
          <el-option
            v-for="item in couponType"
            :key="item.code"
            :label="item.name"
            :value="item.code"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="领取时间">
        <el-date-picker
          v-model="created"
          type="daterange"
          unlink-panels
          :picker-options="pickerOptions2"
          range-separator="-"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          :default-time="['00:00:00', '23:59:59']"
          @change="cTime"
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
          v-has:MARKETING_SHIPPER_MANAGE_COILCONFIGURATION_COLLECTIONRECORDS_EXPORT
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
          <el-table-column label="货主" prop sortable show-overflow-tooltip>
            <template slot-scope="scope">
              <h4 class="needMoreInfo" @click="pushOrderShipper(scope.row)">
                {{scope.row.shipperMobile}}
                <span v-if="scope.row.shipperName">-</span>
                {{scope.row.shipperName}}
              </h4>
            </template>
          </el-table-column>
          <el-table-column
            label="领取时间"
            prop="couponGetTime"
            sortable
            show-overflow-tooltip
            width="150"
          ></el-table-column>
          <el-table-column
            label="领券活动名称"
            prop="couponGetActivityName"
            sortable
            show-overflow-tooltip
          ></el-table-column>
          <el-table-column label="领取间隔时间" prop="getIntervalTimeName" sortable show-overflow-tooltip></el-table-column>
          <el-table-column label="领取类型" prop="getTypeName" sortable show-overflow-tooltip></el-table-column>
          <el-table-column label="优惠券活动名称" prop="couponActivityName" sortable show-overflow-tooltip></el-table-column>
          <el-table-column label="优惠券名称" prop="couponName" sortable show-overflow-tooltip></el-table-column>
          <el-table-column label="券码状态" prop="couponStatusName" sortable show-overflow-tooltip></el-table-column>
          <el-table-column label="使用时间" prop="useTime" sortable show-overflow-tooltip width="150"></el-table-column>
          <el-table-column label="订单号" prop sortable show-overflow-tooltip width="230">
            <template slot-scope="scope">
              <h4
                class="needMoreInfo"
                @click="pushOrderSerial(scope.row)"
              >{{ scope.row.orderSerial}}</h4>
            </template>
          </el-table-column>
          <el-table-column label="订单金额" prop="totalAmount" sortable show-overflow-tooltip></el-table-column>
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
  aflcCouponGetDetailList,
  aflcCouponGetDetailListExcel
} from "@/api/marketing/shippermarkting/couponCollocation.js";
import { getDictionary } from "@/api/common.js";
import { eventBus } from "@/eventBus";
import Pager from "@/components/Pagination/index";
import { parseTime, pickerOptions2 } from "@/utils/";
export default {
  data() {
    return {
      loading: true,
      pickerOptions2: { shortcuts: pickerOptions2 },
      btnsize: "mini",
      selectRowData: {},
      selectId: [],
      sizes: [20, 50, 100, 400],
      pagesize: 20, // 初始化加载数量
      page: 1, // 初始化页码
      totalCount: null,
      dataTotal: 0,
      tableDataAll: [],
      radio: 1,
      optionsCoupon: [], //领取类型
      optionsTime: [], //领取间隔时间
      couponType: [], //券码类型
      formAllData: {
        couponActivityName: null,
        couponGetActivityName: null,
        couponGetEndTime: null,
        couponGetStartTime: null,
        couponStatusCode: null,
        getIntervalTimeCode: null,
        getTypeCode: null,
        shipperMobileOrName: null
      },
      created: []
    };
  },
  props: {
    isvisible: {
      type: Boolean,
      default: false
    }
  },
  components: {
    Pager
  },
  watch: {
    isvisible: {
      handler(newVal, oldVal) {
        if (newVal) {
          setTimeout(() => {
            this.$refs.multipleTable.$el.style.height =
              this.$refs.multipleTable.$el.offsetHeight + "px";
          }, 300);
          this.getMoreInformation();
          this.firstblood();
        }
      },
      immediate: true
    }
  },
  methods: {
    // 获取  服务和车辆 类型列表
    getMoreInformation() {
      getDictionary("AF0465").then(res => {
        this.optionsCoupon = res.data;
      });
      getDictionary("AF0466").then(res => {
        this.optionsTime = res.data;
      });
      getDictionary("AF0464").then(res => {
        this.couponType = res.data;
      });
    },
    // 领取时间
    cTime(i) {
      if (i) {
        this.formAllData.couponGetStartTime = i[0];
        this.formAllData.couponGetEndTime = i[1];
      } else {
        this.formAllData.couponGetStartTime = "";
        this.formAllData.couponGetEndTime = "";
      }
    },

    // 列表刷新页面
    firstblood() {
      this.loading = true;
      aflcCouponGetDetailList(this.page, this.pagesize, this.formAllData).then(
        res => {
          this.dataTotal = res.data.totalCount;
          this.tableDataAll = res.data.list;
          this.tableDataAll.forEach(item => {
            item.couponGetTime = parseTime(
              item.couponGetTime,
              "{y}-{m}-{d} {h}:{i}:{s}"
            );
            item.useTime = parseTime(item.useTime, "{y}-{m}-{d} {h}:{i}:{s}");
            item.createTime = parseTime(
              item.createTime,
              "{y}-{m}-{d} {h}:{i}:{s}"
            );
          });
          this.loading = false;
        }
      );
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
        couponActivityName: null,
        couponGetActivityName: null,
        couponGetEndTime: null,
        couponGetStartTime: null,
        couponStatusCode: null,
        getIntervalTimeCode: null,
        getTypeCode: null,
        shipperMobileOrName: null
      };
      this.created = [];
      if (this.page != 1) {
        this.page = 1;
        this.$refs.pager.inputval = this.page;
        this.$refs.pager.pageNum = this.page;
      }
      this.firstblood();
    },
    // 每页显示数据量变更
    handlePageChange(obj) {
      this.page = obj.pageNum;
      this.pagesize = obj.pageSize;
      this.firstblood();
    },
    getDataList() {
      this.firstblood();
      this.$refs.multipleTable.clearSelection();
    },
    //货主数据
    pushOrderShipper(item) {
      this.$router.push({
        name: "货主详情",
        query: { userId: item.shipperId }
      });
    },
    //订单详情弹窗
    pushOrderSerial(item) {
      this.$router.push({
        name: "订单详情",
        query: { orderSerial: item.orderSerial }
      });
    },
    importExcel() {
      this.$message.info("正在导出中...");
      let href = "";
      aflcCouponGetDetailListExcel(0, 0, this.formAllData).then(res => {
        var blob = new Blob([res]);
        href = window.URL.createObjectURL(blob);
        var NewDom = document.createElement("a");
        NewDom.setAttribute("href", href);
        NewDom.setAttribute("target", "_blank");
        NewDom.setAttribute("download", "领券明细.xls");
        document.body.appendChild(NewDom);
        NewDom.click();
        document.body.removeChild(NewDom);
      });
    }
  },

  mounted() {}
};
</script>
<style lang="scss">
</style>

