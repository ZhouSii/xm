<template>
  <div class="identicalStyle" style="height:100%" v-loading="loading">
    <el-form :inline="true" class="demo-ruleForm classify_searchinfo">
      <el-form-item label="用户姓名">
        <el-input clearable v-model="formAllData.name" maxlength="20"></el-input>
      </el-form-item>
      <el-form-item label="手机号码">
        <el-input clearable v-model="formAllData.mobile" maxlength="11" v-numberOnly></el-input>
      </el-form-item>
      <el-form-item label="收款方式">
        <el-select v-model="formAllData.extractWay" clearable placeholder="请选择">
          <el-option
            v-for="item in collectTypeList"
            :key="item.code"
            :label="item.name"
            :value="item.code"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="申请时间">
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
      <el-form-item label="提现状态" v-if="!cashtype">
        <el-select v-model="formAllData.extractStatus" clearable placeholder="请选择">
          <el-option
            v-for="item in cashtypeList"
            :key="item.code"
            :label="item.name"
            :value="item.code"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="流水号" v-if="!cashtype">
        <el-input clearable v-model="formAllData.extractSerial" v-onlyNumberAndLetter></el-input>
      </el-form-item>
      <el-form-item label="失败原因" v-if="cashtype=='AF0860304'||cashtype=='AF0860306'">
        <el-input clearable v-model="formAllData.extractFail"></el-input>
      </el-form-item>
      <el-form-item label="是否广告车" v-if="cashtype=='AF0860302'">
        <el-select v-model="formAllData.isAd" clearable placeholder="请选择">
          <el-option
            v-for="item in isAdList"
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
      <div
        class="btns_box"
        v-if="cashtype=='AF0860302'||cashtype=='AF0860303'||cashtype=='AF0860304'"
      >
        <el-button
          type="primary"
          icon="el-icon-coin"
          plain
          :size="btnsize"
          @click="handleClick('cash')"
          v-if="(cashtype=='AF0860302'&&$_has_permission('FINANCE_WITHDRAW_MANAGE_CARWITHDRAWAL_TOBETRANSFERRED_TRANSFERACCOUNTS'))||cashtype=='AF0860304'&&($_has_permission('FINANCE_WITHDRAW_MANAGE_CARWITHDRAWAL_FAILTRANSFER_TRANSFERACCOUNTS'))"
        >转账</el-button>
        <el-button
          type="primary"
          icon="el-icon-close"
          plain
          :size="btnsize"
          @click="handleClick('back')"
          v-if="(cashtype=='AF0860302'&&$_has_permission('FINANCE_WITHDRAW_MANAGE_CARWITHDRAWAL_TOBETRANSFERRED_REJECT'))||cashtype=='AF0860304'&&($_has_permission('FINANCE_WITHDRAW_MANAGE_CARWITHDRAWAL_FAILTRANSFER_REJECT'))"
        >驳回</el-button>
        <span class="description" v-if="cashtype=='AF0860302'">待转账金额：¥{{extractSum}}</span>
        <span v-if="cashtype=='AF0860303'" class="description">已转账金额：¥{{extractSum}}</span>
      </div>
      <div class="info_news">
        <el-table
          :ref="'multipleTable'+cashtype"
          style="width: 100%"
          stripe
          border
          height="100%"
          @selection-change="getSelection"
          @row-click="clickDetails"
          highlight-current-row
          :data="tableDataAll"
          tooltip-effect="dark"
        >
          <el-table-column
            label="选择"
            type="selection"
            width="50"
            v-if="cashtype=='AF0860302'||cashtype=='AF0860304'"
          ></el-table-column>
          <el-table-column label="序号" width="60">
            <template slot-scope="scope">{{ (page - 1)*pagesize + scope.$index + 1 }}</template>
          </el-table-column>
          <el-table-column
            label="流水号"
            prop="extractSerial"
            sortable
            show-overflow-tooltip
            width="250"
          >
            <template slot-scope="scope">
              <h4
                class="needMoreInfo"
                @click="pushExtractSerial(scope.row)"
              >{{ scope.row.extractSerial}}</h4>
            </template>
          </el-table-column>
          <el-table-column
            label="申请时间"
            prop="createTime"
            sortable
            show-overflow-tooltip
            width="160"
          >
            <template slot-scope="scope">{{scope.row.createTime|parseTime}}</template>
          </el-table-column>
          <el-table-column label="用户姓名" prop="name" sortable show-overflow-tooltip width="160"></el-table-column>
          <el-table-column label="手机号码" prop="mobile" sortable show-overflow-tooltip width="150">
            <template slot-scope="scope">
              <h4 class="needMoreInfo" @click="pushOrderSerial(scope.row)">{{ scope.row.mobile}}</h4>
            </template>
          </el-table-column>
          <el-table-column
            label="是否广告车"
            prop="isAd"
            sortable
            show-overflow-tooltip
            width="150"
            v-if="cashtype=='AF0860302'||cashtype==null"
          >
            <template slot-scope="scope">{{scope.row.isAd=='1'?'是':'否'}}</template>
          </el-table-column>
          <el-table-column
            label="转账金额"
            prop="extractSumNum"
            sortable
            show-overflow-tooltip
            width="150"
          ></el-table-column>
          <el-table-column
            label="手续费"
            prop="handlingFee"
            sortable
            show-overflow-tooltip
            min-width="150"
          ></el-table-column>
          <el-table-column
            label="收款方式"
            prop="extractWay"
            sortable
            show-overflow-tooltip
            width="150"
          ></el-table-column>
          <el-table-column
            label="收款账号"
            prop="extractAccount"
            sortable
            show-overflow-tooltip
            width="300"
          ></el-table-column>
          <el-table-column
            label="处理状态"
            prop="auditOpinion"
            sortable
            show-overflow-tooltip
            width="150"
          ></el-table-column>
          <el-table-column
            label="提现状态"
            prop="extractStatus"
            sortable
            show-overflow-tooltip
            min-width="160"
          >
            <template slot-scope="scope">
              <span
                :class="{freezeName: scope.row.extractStatus == '提现中' ,blackName: scope.row.extractStatus == '提现失败',normalName :scope.row.extractStatus == '提现成功'}"
              >{{scope.row.extractStatus}}</span>
            </template>
          </el-table-column>
          <el-table-column
            label="失败原因"
            prop="extractDes"
            sortable
            show-overflow-tooltip
            width="150"
            v-if="cashtype=='AF0860304'"
          ></el-table-column>
          <el-table-column
            label="驳回原因"
            prop="extractFail"
            sortable
            show-overflow-tooltip
            width="150"
            v-if="cashtype=='AF0860306'"
          ></el-table-column>
          <el-table-column
            label="操作人"
            prop="updater"
            sortable
            show-overflow-tooltip
            width="150"
            v-if="cashtype=='AF0860303'||cashtype=='AF0860304'||cashtype=='AF0860306'"
          ></el-table-column>
          <el-table-column
            label="转账成功时间"
            prop="extractTime"
            sortable
            show-overflow-tooltip
            width="160"
            v-if="cashtype=='AF0860303'"
          ></el-table-column>
          <el-table-column
            label="转账失败时间"
            prop="extractTime"
            sortable
            show-overflow-tooltip
            width="160"
            v-if="cashtype=='AF0860304'"
          ></el-table-column>
          <el-table-column
            label="处理时间"
            prop="updateTime"
            sortable
            show-overflow-tooltip
            width="160"
            v-if="cashtype=='AF0860306'"
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

    <CarCashDetail
      :params="paramsId"
      :driverId="driverId"
      :editType="type"
      :typetitle="typetitle"
      :dialogFormVisible_add.sync="dialogFormVisible_add"
      @getData="getDataList"
      :cashtype="cashtype"
    />
    <cashOperate
      :params="selectRowData"
      :editType="type"
      :typetitle="typetitle"
      :dialogcashOperate.sync="dialogcashOperate"
      @getData="getDataList"
    />
    <backOperate
      :params="selectRowData"
      :editType="type"
      :typetitle="typetitle"
      :dialogBackOperate.sync="dialogBackOperate"
      @getData="getDataList"
    />
  </div>
</template>
<script>
import { data_aflcExtractCashList } from "@/api/finance/CarCash.js";
import { getDictionary } from "@/api/common.js";
import Pager from "@/components/Pagination/index";
import { parseTime, pickerOptions2 } from "@/utils/";
import CarCashDetail from "./components/index";
import cashOperate from "./components/cashOperate";
import backOperate from "./components/backOperate";
export default {
  data() {
    return {
      loading: true,
      pickerOptions2: { shortcuts: pickerOptions2 },
      btnsize: "mini",
      selectRowData: [],
      paramsId: null,
      driverId: null,
      type: "", //新增或者修改或者详情
      typetitle: "", //新增或者详情title
      selectId: [],
      sizes: [20, 50, 100, 400],
      pagesize: 20, // 初始化加载数量
      page: 1, // 初始化页码
      totalCount: null,
      dataTotal: 0,
      tableDataAll: [],
      collectTypeList: [
        { name: "支付宝", code: "0" },
        { name: "微信", code: "1" }
      ], //收款方式
      cashtypeList: [
        { name: "提现中", code: "0" },
        { name: "提现成功", code: "1" },
        { name: "提现失败", code: "2" }
      ], //提现状态
      isAdList: [
        { name: "全部", code: null },
        { name: "是", code: "1" },
        { name: "否", code: "0" }
      ],
      formAllData: {
        name: null,
        mobile: null,
        extractWay: null,
        createStartTime: null,
        createEndTime: null,
        extractStatus: null,
        auditOpinion: this.cashtype,
        extractFail: null,
        extractSerial: null
      },
      extractSum: 0,
      created: [],
      dialogFormVisible_add: false,
      dialogcashOperate: false,
      dialogBackOperate: false
    };
  },
  props: {
    isvisible: {
      type: Boolean,
      default: false
    },
    cashtype: {
      type: String,
      default: null
    }
  },
  components: {
    Pager,
    CarCashDetail,
    cashOperate,
    backOperate
  },
  watch: {
    isvisible: {
      handler(newVal, oldVal) {
        if (newVal) {
          setTimeout(() => {
            this.$refs["multipleTable" + this.cashtype].$el.style.height =
              this.$refs["multipleTable" + this.cashtype].$el.offsetHeight +
              "px";
          }, 300);
          this.getMoreInformation();
          this.firstblood();
        }
      },
      immediate: true
    }
  },
  methods: {
    getMoreInformation() {},
    // 列表刷新页面
    firstblood() {
      this.loading = true;
      data_aflcExtractCashList(this.page, this.pagesize, this.formAllData).then(
        res => {
          this.dataTotal = res.data.extractCashList.totalCount;
          this.tableDataAll = res.data.extractCashList.list;
          this.extractSum = res.data.extractSum;
          this.tableDataAll.forEach(item => {
            item.extractSumNum = Number(item.extractSum);
            item.createTime = parseTime(
              item.createTime,
              "{y}-{m}-{d} {h}:{i}:{s}"
            );
            item.auditTime = parseTime(
              item.auditTime,
              "{y}-{m}-{d} {h}:{i}:{s}"
            );
            item.updateTime = parseTime(
              item.updateTime,
              "{y}-{m}-{d} {h}:{i}:{s}"
            );
            item.extractTime = parseTime(
              item.extractTime,
              "{y}-{m}-{d} {h}:{i}:{s}"
            );
          });
          this.loading = false;
        }
      );
    },
    // 申请时间
    cTime(i) {
      if (i) {
        this.formAllData.createStartTime = i[0];
        this.formAllData.createEndTime = i[1];
      } else {
        this.formAllData.createStartTime = "";
        this.formAllData.createEndTime = "";
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
      this.formAllData = {
        name: null,
        mobile: null,
        extractWay: null,
        createStartTime: null,
        createEndTime: null,
        extractStatus: null,
        auditOpinion: this.cashtype,
        extractFail: null,
        extractSerial: null
      };
      if (this.page != 1) {
        this.page = 1;
        this.$refs.pager.inputval = this.page;
        this.$refs.pager.pageNum = this.page;
      }
      this.created = [];
      this.firstblood();
    },
    handleClick(type) {
      if (this.selectRowData.length == 0) {
        return this.$message.warning("请选择您要操作的数据");
      } else if (this.selectRowData.length > 1 && type == "back") {
        this.$message({
          message: "每次只能操作单条数据~",
          type: "warning"
        });
        this.$refs["multipleTable" + this.cashtype].clearSelection();
      } else if (this.selectRowData.length > 20 && type == "cash") {
        this.$message({
          message: "最多操作20条数据~",
          type: "warning"
        });
        this.$refs["multipleTable" + this.cashtype].clearSelection();
      } else {
        switch (type) {
          case "cash":
            this.type = "cash";
            this.typetitle = "转账";
            this.dialogcashOperate = true;
            break;
          case "back":
            this.type = "back";
            this.typetitle = "提现驳回";
            this.dialogBackOperate = true;
            break;
        }
      }
    },
    pushExtractSerial(item) {
      this.paramsId = item.id;
      this.driverId = item.accountId;
      this.type = "view";
      this.typetitle = "提现详情";
      this.dialogFormVisible_add = true;
    },
    // 判断选中与否
    getSelection(val) {
      console.log("选中内容", val);
      this.selectRowData = val;
    },
    // 点击选中当前行
    clickDetails(row, event, column) {
      this.$refs["multipleTable" + this.cashtype].toggleRowSelection(row);
    },
    // 每页显示数据量变更
    handlePageChange(obj) {
      this.page = obj.pageNum;
      this.pagesize = obj.pageSize;
      this.firstblood();
    },
    getDataList() {
      this.firstblood();
      this.paramsId = null;
      this.$refs["multipleTable" + this.cashtype].clearSelection();
    },
    // 详情弹窗
    pushOrderSerial(item) {
      this.$router.push({
        name: "车主详情",
        query: { driverId: item.accountId }
      });
      sessionStorage.getItem("CZdetailsName", "financial");
    }
  },
  mounted() {}
};
</script>
<style lang="scss">
</style>

