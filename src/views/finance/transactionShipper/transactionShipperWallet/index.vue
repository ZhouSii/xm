<template>
  <div class="identicalStyle transactionCar" style="height:100%" v-loading="loading">
    <el-form :inline="true" class="demo-ruleForm classify_searchinfo">
      <el-form-item label="所属区域">
        <vregion :ui="true" @values="regionChange" class="form-control" ref="belongCity">
          <el-input v-model="areaName" placeholder="请选择"></el-input>
        </vregion>
        <!-- <GetCityList v-model="formAllData.belongCity" ref="area" @returnStr="getStr"></GetCityList> -->
      </el-form-item>
      <el-form-item label="用户类型">
        <el-select clearable placeholder="请选择" disable v-model="formAllData.shipperType">
          <el-option
            v-for="item in shipperType"
            :key="item.code"
            :label="item.name"
            :value="item.code"
            :disabled="item.disabled"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="货主账号">
        <el-input placeholder="请输入内容" clearable v-model="formAllData.account"></el-input>
      </el-form-item>
      <el-form-item label="注册时间">
        <el-date-picker
          value-format="timestamp"
          type="daterange"
          v-model="registerTime"
          unlink-panels
          :picker-options="pickerOptions2"
          range-separator="-"
          :default-time="['00:00:00', '23:59:59']"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          @change="rTime"
        ></el-date-picker>
      </el-form-item>
      <el-form-item label="认证时间">
        <el-date-picker
          value-format="timestamp"
          type="daterange"
          v-model="authPassTime"
          unlink-panels
          :picker-options="pickerOptions2"
          range-separator="-"
          :default-time="['00:00:00', '23:59:59']"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          @change="aTime"
        ></el-date-picker>
      </el-form-item>
      <!-- <el-form-item label="最近订单交易时间">
        <el-date-picker
          value-format="timestamp"
          type="daterange"
          v-model="CreaseTime"
          unlink-panels
          :picker-options="pickerOptions2"
          range-separator="-"
          :default-time="['00:00:00', '23:59:59']"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          @change="cTime"
        ></el-date-picker>
      </el-form-item>-->
      <el-form-item class="fr">
        <el-button
          type="primary"
          plain
          :size="btnsize"
          @click="getData_query"
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
          @click="importExcel"
          :size="btnsize"
        >导出Excel</el-button>
      </div>
      <div class="info_news">
        <el-table
          style="width: 100%"
          stripe
          border
          height="100%"
          ref="multipleTable"
          highlight-current-row
          tooltip-effect="dark"
          :data="tableDataAll"
          @selection-change="getSelection"
          @row-click="clickDetails"
        >
          <el-table-column label="选择" type="selection" width="50"></el-table-column>
          <el-table-column label="序号" width="60">
            <template slot-scope="scope">{{ (page - 1)*pagesize + scope.$index + 1 }}</template>
          </el-table-column>
          <el-table-column label="货主账号" prop="mobile" sortable show-overflow-tooltip width="120">
            <template slot-scope="scoped">
              <h4 class="needMoreInfo" @click="pushOrderSerial(scoped.row)">{{ scoped.row.mobile}}</h4>
            </template>
          </el-table-column>
          <el-table-column
            label="货主姓名"
            prop="shipperName"
            sortable
            show-overflow-tooltip
            width="120"
          ></el-table-column>
          <el-table-column
            label="所属区域"
            prop="belongCityName"
            sortable
            show-overflow-tooltip
            width="150"
          ></el-table-column>
          <el-table-column
            label="用户类型"
            prop="shipperType"
            sortable
            show-overflow-tooltip
            width="120"
          ></el-table-column>
          <el-table-column
            label="注册时间"
            prop="registerTime"
            sortable
            show-overflow-tooltip
            width="180"
          ></el-table-column>
          <el-table-column
            label="认证时间"
            prop="authPassTime"
            sortable
            show-overflow-tooltip
            width="180"
          ></el-table-column>
          <el-table-column
            label="认证状态"
            prop="shipperStatusName"
            sortable
            show-overflow-tooltip
            width="120"
          ></el-table-column>
          <el-table-column
            label="累计充值金额"
            prop="rechargeSumAll"
            sortable
            show-overflow-tooltip
            width="120"
          ></el-table-column>
          <el-table-column label="可用余额" prop="balance" sortable show-overflow-tooltip width="120"></el-table-column>
          <!-- <el-table-column
            label="完成订单数"
            prop="dealOrder"
            sortable
            show-overflow-tooltip
            width="120"
          ></el-table-column>-->
          <el-table-column
            label="完成订单总金额"
            prop="dealOrderTotalAmount"
            sortable
            show-overflow-tooltip
            width="140"
          ></el-table-column>
          <el-table-column
            label="优惠金发放金额"
            prop="discountsRewardMax"
            sortable
            show-overflow-tooltip
            width="120"
          ></el-table-column>
          <el-table-column
            label="已使用优惠金"
            prop="gainDiscountsReward"
            sortable
            show-overflow-tooltip
            width="120"
          ></el-table-column>
          <el-table-column
            label="剩余优惠金额"
            prop="remainDiscountsReward"
            sortable
            show-overflow-tooltip
            width="120"
          ></el-table-column>
          <el-table-column
            label="优惠金使用订单数"
            prop="discountRewardOrderNum"
            sortable
            show-overflow-tooltip
            width="140"
          ></el-table-column>
          <el-table-column
            label="优惠券发放张数"
            prop="couponCount"
            sortable
            show-overflow-tooltip
            width="140"
          ></el-table-column>
          <el-table-column
            label="优惠券使用张数"
            prop="userCouponCount"
            sortable
            show-overflow-tooltip
            width="140"
          ></el-table-column>
          <el-table-column
            label="优惠券过期张数"
            prop="expireCouponCount"
            sortable
            show-overflow-tooltip
            width="140"
          ></el-table-column>
          <el-table-column
            label="优惠券可用张数"
            prop="remainCouponCount"
            sortable
            show-overflow-tooltip
            width="140"
          ></el-table-column>
          <el-table-column
            label="优惠券抵扣金额"
            prop="couponAmount"
            sortable
            show-overflow-tooltip
            width="140"
          ></el-table-column>
          <!-- <el-table-column
            label="最近订单交易时间"
            prop="recentFinishDate"
            sortable
            show-overflow-tooltip
            width="180"
          ></el-table-column>-->
        </el-table>
      </div>
      <div class="info_tab_footer">
        共计:{{ dataTotal }}
        <div class="show_pager">
          <Pager :total="dataTotal" @change="handlePageChange" :sizes="sizes" ref="pager" />
        </div>
      </div>
      <!-- 页码 -->
    </div>
  </div>
</template>
<script>
import {
  data_Commission,
  data_CarList,
  data_MaidLevel
} from "@/api/server/areaPrice.js";
import Pager from "@/components/Pagination/index";
import {
  data_findShipperMywalletList,
  data_findShipperMywalletListExcel
} from "@/api/finance/transactionShipper";
import GetCityList from "@/components/GetCityList/city";
import { parseTime, pickerOptions2 } from "@/utils/";
import { getDictionary } from "@/api/common.js";
import shipperwallet from "./shipperwallet";
import vregion from "@/components/vregion/Region";
export default {
  data() {
    return {
      loading: true,
      pickerOptions2: {
        shortcuts: pickerOptions2
      },
      shipperType: [],
      btnsize: "mini",
      sizes: [20, 50, 100, 400],
      pagesize: 20, //初始化加载数量
      page: 1, //初始化页码
      tableDataAll: [],
      dataTotal: null,
      selectRowData: {},
      formAllData: {
        account: null,
        belongCity: null,
        shipperType: null,
        registerStartTime: null,
        registerEndTime: null,
        authPassStartTime: null,
        authPassEndTime: null,
        recentFinishStartDate: null,
        recentFinishEndDate: null
      },
      areaName: "",
      CreaseTime: [],
      registerTime: [],
      authPassTime: [],
      href: ""
    };
  },
  components: {
    GetCityList,
    shipperwallet,
    Pager,
    vregion
  },
  methods: {
    // getStr(val){
    //     this.formAllData.belongCity = val.area.code
    // },
    // 所属区域
    regionChange(d) {
      this.areaName =
        !d.province && !d.city && !d.area && !d.town
          ? ""
          : `${this.getValue(d.province)}${this.getValue(
              d.city
            )}${this.getValue(d.area)}${this.getValue(d.town)}`.trim();
      if (d.province && d.city && d.area) {
        this.formAllData.belongCity = d.area.code;
      } else if (d.province && d.city && !d.area) {
        this.formAllData.belongCity = d.city.code;
      } else if (d.province && !d.city && !d.area) {
        this.formAllData.belongCity = d.province.code;
      }
    },
    getValue(obj) {
      return obj ? obj.value : "";
    },
    // 列表刷新页面
    firstblood() {
      this.loading = true;
      data_findShipperMywalletList(
        this.page,
        this.pagesize,
        this.formAllData
      ).then(res => {
        this.dataTotal = res.data.totalCount;
        this.tableDataAll = res.data.list;
        this.tableDataAll.forEach(item => {
          item.registerTime = parseTime(
            item.registerTime,
            "{y}-{m}-{d} {h}:{i}:{s}"
          );
          item.authPassTime = parseTime(
            item.authPassTime,
            "{y}-{m}-{d} {h}:{i}:{s}"
          );
          item.recentFinishDate = parseTime(
            item.recentFinishDate,
            "{y}-{m}-{d} {h}:{i}:{s}"
          );
        });
        this.loading = false;
      });
      this.$refs.multipleTable.clearSelection();
    },
    // 每页显示数据量变更
    handlePageChange(obj) {
      this.page = obj.pageNum;
      this.pagesize = obj.pageSize;
      this.firstblood();
    },
    //  查询
    getData_query() {
      this.page = 1;
      this.$refs.pager.inputval = this.page;
      this.$refs.pager.pageNum = this.page;
      this.firstblood();
    },
    // 清空查询
    clearSearch() {
      (this.belongCityName = null),
        (this.formAllData = {
          account: null,
          belongCity: null,
          shipperType: null,
          registerStartTime: null,
          registerEndTime: null,
          authPassStartTime: null,
          authPassEndTime: null,
          recentFinishStartDate: null,
          recentFinishEndDate: null
        });
      if (this.page != 1) {
        this.page = 1;
        this.$refs.pager.inputval = this.page;
        this.$refs.pager.pageNum = this.page;
      }
      this.CreaseTime = [];
      this.registerTime = [];
      this.authPassTime = [];
      this.firstblood();
      // this.$refs.area.clearData();
      this.areaName = "";
      this.$refs.belongCity.clear();
    },

    // 判断选中与否
    getSelection(val) {
      console.log("选中内容", val);
      this.selectRowData = val;
    },
    //点击选中当前行
    clickDetails(row, event, column) {
      this.$refs.multipleTable.toggleRowSelection(row);
    },
    // 最近交易时间
    cTime(i) {
      if (i !== null) {
        this.formAllData.recentFinishStartDate = i[0];
        this.formAllData.recentFinishEndDate = i[1];
      } else {
        this.formAllData.recentFinishStartDate = null;
        this.formAllData.recentFinishEndDate = null;
      }
    },
    //注册时间
    rTime(i) {
      if (i !== null) {
        this.formAllData.registerStartTime = i[0];
        this.formAllData.registerEndTime = i[1];
      } else {
        this.formAllData.registerStartTime = null;
        this.formAllData.registerEndTime = null;
      }
    },
    //认证时间
    aTime(i) {
      if (i !== null) {
        this.formAllData.authPassStartTime = i[0];
        this.formAllData.authPassEndTime = i[1];
      } else {
        this.formAllData.authPassStartTime = null;
        this.formAllData.authPassEndTime = null;
      }
    },
    //详情弹窗
    pushOrderSerial(item) {
      this.$router.push({
        name: "货主账户详情",
        query: { accountId: item.accountId }
      });
      sessionStorage.setItem("shipperTabName", "first");
    },
    //获取  服务和车辆 类型列表
    getMoreInformation() {
      getDictionary("AF00101").then(res => {
        this.shipperType = res.data;
      });
    },
    //导出EXCEL
    importExcel() {
      this.$message.info("正在导出中...");
      data_findShipperMywalletListExcel(1, 500, this.formAllData).then(res => {
        var blob = new Blob([res]);
        this.href = window.URL.createObjectURL(blob);
        var NewDom = document.createElement("a");
        NewDom.setAttribute("href", this.href);
        NewDom.setAttribute("target", "_blank");
        NewDom.setAttribute("download", "货主账户概况.xls");
        document.body.appendChild(NewDom);
        NewDom.click();
        document.body.removeChild(NewDom);
      });
    }
  },
  mounted() {
    this.getMoreInformation();
    this.firstblood();
  }
};
</script>
<style lang="scss">
.transactionCar {
  .el-cascader {
    margin-top: -10px;
  }
  .info_news {
    .el-button {
      padding: 4px 0px;
      span {
        font-weight: bold;
      }
    }
  }
}
</style>


