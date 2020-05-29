<template>
  <div class="identicalStyle" style="height:100%" v-loading="loading">
    <el-form :inline="true" class="demo-ruleForm classify_searchinfo">
      <el-form-item label="用户账号">
        <el-input clearable v-model="formAllData.accountMobileOrName"></el-input>
      </el-form-item>
      <el-form-item label="公司名称">
        <el-input clearable v-model="formAllData.companyName"></el-input>
      </el-form-item>
      <el-form-item label="状态">
        <el-select v-model="formAllData.status" clearable placeholder="请选择">
          <el-option
            v-for="item in StatusTypeList"
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
      <!-- <div class="btns_box">
            <el-button  type="primary" plain icon="el-icon-circle-plus" @click="handleClick" :size="btnsize">代客充值</el-button>
      </div>-->
      <div class="info_news">
        <el-table
          ref="multipleTable"
          style="width: 100%"
          stripe
          border
          height="99%"
          highlight-current-row
          :data="tableDataAll"
          tooltip-effect="dark"
          @selection-change="getSelection"
          @row-click="clickDetails"
        >
          <!-- <el-table-column label="选择" type="selection" width="50"></el-table-column> -->
          <el-table-column label="序号" width="60">
            <template slot-scope="scope">{{ (page - 1)*pagesize + scope.$index + 1 }}</template>
          </el-table-column>
          <el-table-column label="用户账号" prop="accountMobile" sortable show-overflow-tooltip width>
            <template slot-scope="scope">
              <h4 class="needMoreInfo" @click="JoinDetail(scope.row)">{{scope.row.accountMobile}}</h4>
            </template>
          </el-table-column>
          <el-table-column label="公司名称" prop="companyName" sortable show-overflow-tooltip width></el-table-column>
          <el-table-column label="剩余保证金" prop="collateral" sortable show-overflow-tooltip width></el-table-column>
          <el-table-column
            label="登记人"
            prop="collateralRegistrar"
            sortable
            show-overflow-tooltip
            width
            v-if="statusType=='AF00113'"
          ></el-table-column>
          <el-table-column
            label="登记时间"
            prop="collateralRegisterTime"
            sortable
            show-overflow-tooltip
            width
            v-if="statusType=='AF00113'"
          ></el-table-column>
          <el-table-column label="状态" prop="statusName" sortable show-overflow-tooltip width></el-table-column>
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
    <detail
      :params="paramsObject"
      :editType="type"
      :typetitle="typetitle"
      :showFlag="true"
      :dialogDetailNotes.sync="dialogDetailNotes"
      @getData="getDataList"
    />
    <puls
      :params="selectRowData"
      :editType="type"
      :typetitle="typetitle"
      :showFlag="true"
      :dialogPlusNotes.sync="dialogPlusNotes"
      @getData="getDataList"
      :statusType="statusType"
    />
  </div>
</template>
<script>
import {
  aflcShipperDepositList,
  agencyRechargeId
} from "@/api/finance/bailManage.js";
import { getDictionary } from "@/api/common.js";
import Pager from "@/components/Pagination/index";
import { parseTime, pickerOptions2 } from "@/utils/";
import detail from "./components/detail";
import puls from "./components/puls";
export default {
  data() {
    return {
      loading: true,
      pickerOptions2: { shortcuts: pickerOptions2 },
      btnsize: "mini",
      type: "", //新增或者修改或者详情
      typetitle: "", //新增或者详情title
      selectRowData: [],
      paramsObject: {},
      sizes: [20, 50, 100, 400],
      pagesize: 20, // 初始化加载数量
      page: 1, // 初始化页码
      totalCount: null,
      dataTotal: 0,
      tableDataAll: [],
      formAllData: {
        accountMobileOrName: null,
        companyName: null,
        status: null
      },
      StatusTypeList: [], //状态类型
      dialogDetailNotes: false,
      dialogPlusNotes: false
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
    },
    statusType: {
      type: String,
      default: null
    }
  },
  components: {
    Pager,
    detail,
    puls
  },
  watch: {
    isvisible: {
      handler(newVal, oldVal) {
        if (newVal) {
          this.getMoreInformation();
          this.firstblood();
        }
      },
      immediate: true
    }
  },
  methods: {
    getMoreInformation() {
      getDictionary("AF095").then(res => {
        this.StatusTypeList = res.data;
      });
    },
    // 列表刷新页面
    firstblood() {
      this.loading = true;
      aflcShipperDepositList(
        this.page,
        this.pagesize,
        this.formAllData,
        this.statusType
      ).then(res => {
        this.dataTotal = res.data.totalCount;
        this.tableDataAll = res.data.list;
        this.tableDataAll.forEach(item => {
          item.collateralRegisterTime = parseTime(
            item.collateralRegisterTime,
            "{y}-{m}-{d} {h}:{i}:{s}"
          );
        });
        this.loading = false;
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
        accountMobileOrName: null,
        companyName: null,
        status: null
      };
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
    // 判断选中与否
    getSelection(val) {
      console.log("选中内容", val);
      this.selectRowData = val;
    },
    // 点击选中当前行
    clickDetails(row, event, column) {
      this.$refs.multipleTable.toggleRowSelection(row);
    },
    // 进入详情
    JoinDetail(i) {
      this.type = "view";
      this.typetitle = "保证金明细";
      this.dialogDetailNotes = true;
      this.paramsObject = i;
    },
    // 代客充值
    handleClick() {
      if (this.selectRowData.length == 0) {
        return this.$message.warning("请选择您要操作的数据");
      } else if (this.selectRowData.length > 1) {
        this.$message({
          message: "每次只能操作单条数据~",
          type: "warning"
        });
        this.$refs.multipleTable.clearSelection();
      } else {
        this.type = "view";
        this.typetitle = "代客充值";
        this.dialogPlusNotes = true;
      }
    },
    getDataList() {
      this.firstblood();
      this.$refs.multipleTable.clearSelection();
    }
  }
};
</script>
<style lang="scss">
</style>

