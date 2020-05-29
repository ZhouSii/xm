<template>
  <div class="identicalStyle clearfix transactionRecharge" style="height:100%" v-loading="loading">
    <el-form :inline="true" class="demo-ruleForm classify_searchinfo">
      <el-form-item label="电话号码">
        <el-input
          v-model="formAllData.mobile"
          placeholder="请输入内容"
          clearable
          maxlength="11"
          class="Input"
        ></el-input>
      </el-form-item>
      <el-form-item label="充值渠道">
        <el-select v-model="formAllData.rechargeChannel" clearable placeholder="请选择">
          <el-option
            v-for="item in rechargeChannelList"
            :key="item.code"
            :label="item.name"
            :value="item.code"
            :disabled="item.disabled"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="充值方式">
        <el-select v-model="formAllData.rechargeWay" clearable placeholder="请选择">
          <el-option
            v-for="item in rechargeWayList"
            :key="item.code"
            :label="item.name"
            :value="item.code"
            :disabled="item.disabled"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="充值时间">
        <el-date-picker
          is-range
          unlink-panels
          type="daterange"
          :picker-options="pickerOptions2"
          v-model="createTime"
          range-separator="-"
          start-placeholder="开始时间"
          end-placeholder="结束时间"
          placeholder="选择时间范围"
          value-format="yyyy-MM-dd HH:mm:ss"
          :default-time="['00:00:00', '23:59:59']"
          @change="cTime"
        ></el-date-picker>
      </el-form-item>
      <el-form-item label="流水号">
        <el-input v-model="formAllData.rechargeSerial" placeholder="请输入内容" clearable class="Input"></el-input>
      </el-form-item>
      <el-form-item label="账户类型">
        <el-select v-model="formAllData.userType" clearable placeholder="请选择">
          <el-option
            v-for="item in userList"
            :key="item.code"
            :label="item.name"
            :value="item.code"
            :disabled="item.disabled"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item class="fr">
        <el-button type="primary" plain @click="seach_data" :size="btnsize" icon="el-icon-search">搜索</el-button>
        <el-button
          type="info"
          plain
          :size="btnsize"
          @click="clearSearch"
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
          style="width: 100%"
          ref="multipleTable"
          stripe
          border
          height="100%"
          highlight-current-row
          :data="tableDataAll"
        >
          <el-table-column label="序号" width="60">
            <template slot-scope="scope">{{ (page - 1)*pagesize + scope.$index + 1 }}</template>
          </el-table-column>
          <el-table-column
            label="用户账号"
            prop="mobile"
            sortable
            show-overflow-tooltip
            min-width="140"
          >
            <template slot-scope="scoped">
              <h4 class="needMoreInfo" @click="pushOrderSerial(scoped.row)">{{ scoped.row.mobile}}</h4>
            </template>
          </el-table-column>
          <el-table-column
            label="账户类型"
            prop="userTypeName"
            sortable
            show-overflow-tooltip
            min-width="130"
          ></el-table-column>
          <el-table-column
            label="充值实收金额"
            prop="rechargeSum"
            sortable
            show-overflow-tooltip
            min-width="150"
          ></el-table-column>
          <el-table-column
            label="充值到账金额"
            prop="enterSum"
            sortable
            show-overflow-tooltip
            min-width="150"
          ></el-table-column>
          <el-table-column
            label="充值赠送金额"
            prop="giveSum"
            sortable
            show-overflow-tooltip
            min-width="150"
          ></el-table-column>
          <el-table-column
            label="充值赠送优惠券"
            prop="rechargeCouponNum"
            sortable
            show-overflow-tooltip
            min-width="150"
          >
            <template slot-scope="scope">
              <h4
                class="needMoreInfo"
                @click="checkCouponDetail(scope.row)"
                v-if="scope.row.rechargeCouponNum>0"
              >查看</h4>
              <span v-else>无</span>
            </template>
          </el-table-column>
          <el-table-column
            label="充值渠道"
            prop="rechargeChannelName"
            sortable
            show-overflow-tooltip
            min-width="130"
          ></el-table-column>
          <el-table-column
            label="充值方式"
            prop="rechargeWayName"
            sortable
            show-overflow-tooltip
            min-width="130"
          ></el-table-column>
          <el-table-column
            label="流水号"
            prop="rechargeSerial"
            sortable
            show-overflow-tooltip
            width="250"
          ></el-table-column>
          <el-table-column label="支付单号" prop="tradeNo" sortable show-overflow-tooltip width="250"></el-table-column>
          <el-table-column
            label="充值时间"
            prop="rechargeTime"
            sortable
            width="200"
            show-overflow-tooltip
          ></el-table-column>
        </el-table>
        <!-- 页码 -->
        <div class="info_tab_footer">
          共计:{{ dataTotal }}
          <div class="show_pager">
            <Pager :total="dataTotal" @change="handlePageChange" :sizes="sizes" ref="pager" />
          </div>
        </div>
      </div>
    </div>
    <couponDetail
      :couponDetaildialogFormVisible.sync="couponDetaildialogFormVisible"
      :params="detailPassData"
      @getData="getDataList"
    />
  </div>
</template>

<script type="text/javascript">
import "@/styles/dialog.scss";
import Pager from "@/components/Pagination/index";
import couponDetail from "./couponDetail";
import {
  data_aflcRechargeList,
  data_aflcRechargeListExcel
} from "@/api/finance/transactionRecharge.js";
import { parseTime, pickerOptions2 } from "@/utils/";
import { getDictionary } from "@/api/common.js";
export default {
  data() {
    return {
      loading: true,
      pickerOptions2: {
        shortcuts: pickerOptions2
      },
      btnsize: "mini",
      selectRowData: {},
      sizes: [20, 50, 100, 400],
      tableDataAll: [],
      totalCount: null,
      dataTotal: 0,
      pagesize: 20, //每页显示数
      page: 1, //当前页
      createTime: [],
      rechargeChannelList: [
        { code: "AF04702", name: "APP" },
        { code: "AF04703", name: "WEB" },
        { code: "AF04705", name: "TMS" }
      ],
      rechargeWayList: [
        { code: null, name: "全部" },
        { code: "0", name: "支付宝" },
        { code: "1", name: "微信" }
      ],
      userList: [
        { code: "AF00102", name: "车主" },
        { code: "AF00101", name: "货主" },
        { code: "AF00112", name: "区代" },
        { code: "AF00113", name: "专线承运商" }
      ],
      formAllData: {
        mobile: null,
        rechargeChannel: null,
        rechargeWay: null,
        rechargeTime: null,
        rechargeSerial: null,
        userType: null
      },
      couponDetaildialogFormVisible: false,
      detailPassData: {}
    };
  },
  components: {
    Pager,
    couponDetail
  },
  mounted() {
    this.firstblood();
  },
  methods: {
    // 列表刷新页面
    firstblood() {
      this.loading = true;
      data_aflcRechargeList(this.page, this.pagesize, this.formAllData).then(
        res => {
          this.dataTotal = res.data.totalCount;
          this.tableDataAll = res.data.list;
          this.tableDataAll.forEach(item => {
            item.rechargeTime = parseTime(
              item.rechargeTime,
              "{y}-{m}-{d} {h}:{i}:{s}"
            );
          });
          this.loading = false;
        }
      );
    },
    // 信息
    getMoreInformation() {
      // getDictionary('AF08601').then(res => {
      //     this.rechargeChannelList = res.data
      // })
    },
    //每页显示数据量变更
    handlePageChange(obj) {
      this.page = obj.pageNum;
      this.pagesize = obj.pageSize;
      this.firstblood();
    },
    cTime(i) {
      this.formAllData.startRechargeTime = i[0];
      this.formAllData.endRechargeTime = i[1];
    },
    // 查询
    seach_data() {
      this.page = 1;
      this.$refs.pager.inputval = this.page;
      this.$refs.pager.pageNum = this.page;
      this.firstblood();
    },
    // 清空查询
    clearSearch() {
      this.createTime = null;
      this.formAllData = {
        mobile: null,
        rechargeChannel: null,
        rechargeWay: null,
        rechargeTime: null,
        startRechargeTime: null,
        endRechargeTime: null,
        rechargeSerial: null,
        userType: null
      };
      if (this.page != 1) {
        this.page = 1;
        this.$refs.pager.inputval = this.page;
        this.$refs.pager.pageNum = this.page;
      }
      this.firstblood();
    },
    pushOrderSerial(item) {
      this.$router.push({
        name: "货主详情",
        query: { userId: item.accountId }
      });
    },
    // 导出excel
    importExcel() {
      this.$message.info("正在导出中...");
      let href = "";
      data_aflcRechargeListExcel(0, 0, this.formAllData).then(res => {
        var blob = new Blob([res]);
        href = window.URL.createObjectURL(blob);
        var NewDom = document.createElement("a");
        NewDom.setAttribute("href", href);
        NewDom.setAttribute("target", "_blank");
        NewDom.setAttribute("download", "充值明细.xls");
        document.body.appendChild(NewDom);
        NewDom.click();
        document.body.removeChild(NewDom);
      });
    },
    checkCouponDetail(item) {
      this.detailPassData = item;
      this.couponDetaildialogFormVisible = true;
    },
    getDataList() {
      this.firstblood();
      this.$refs.multipleTable.clearSelection();
    }
  }
};
</script>

<style lang="scss">
.transactionRecharge {
  .el-range-separator {
    margin-top: -12px;
  }
  .Input {
    width: 180px !important;
  }
}
</style>