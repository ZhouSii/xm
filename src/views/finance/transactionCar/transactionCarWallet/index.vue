<template>
  <div class="identicalStyle transactionCar" style="height:100%" v-loading="loading">
    <el-form :inline="true" class="demo-ruleForm classify_searchinfo">
      <el-form-item label="所属区域">
        <GetCityList v-model="formAllData.areaCode" ref="area" @returnStr="getStr"></GetCityList>
      </el-form-item>
      <el-form-item label="车主账号">
        <el-input placeholder="请输入内容" clearable v-model="formAllData.account"></el-input>
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
          ref="multipleTable"
          height="98%"
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
          <el-table-column
            label="车主账号"
            prop="driverMobile"
            sortable
            show-overflow-tooltip
            min-width="120"
          >
            <template slot-scope="scoped">
              <h4
                class="needMoreInfo"
                @click="pushOrderSerial(scoped.row,'first')"
              >{{ scoped.row.driverMobile}}</h4>
            </template>
          </el-table-column>
          <el-table-column
            label="车主姓名"
            prop="driverName"
            sortable
            show-overflow-tooltip
            min-width="120"
          ></el-table-column>
          <el-table-column
            label="所属区域"
            prop="areaCode"
            sortable
            show-overflow-tooltip
            min-width="120"
          >
            <template slot-scope="scoped">{{scoped.row.cityCode}}{{scoped.row.areaCode}}</template>
          </el-table-column>
          <el-table-column label="运费总收入" prop sortable show-overflow-tooltip min-width="120"></el-table-column>
          <el-table-column label="营销获利总额" prop sortable show-overflow-tooltip min-width="120"></el-table-column>
          <el-table-column
            label="可提现余额"
            prop="availableAmount"
            sortable
            show-overflow-tooltip
            min-width="120"
          ></el-table-column>
          <el-table-column
            label="待审核金额"
            prop="auditAmount"
            sortable
            show-overflow-tooltip
            min-width="140"
          >
            <template slot-scope="scoped">{{scoped.row.auditAmount?scoped.row.auditAmount:0}}</template>
          </el-table-column>
          <el-table-column
            label="待处理提现金额"
            prop="waitAvailableAmount"
            sortable
            show-overflow-tooltip
            min-width="140"
          ></el-table-column>
          <el-table-column label="在线交易奖励金（已奖励 / 额度）" sortable min-width="260" show-overflow-tooltip>
            <template
              slot-scope="scoped"
            >{{scoped.row.gainAwardReward}} / {{scoped.row.awardRewardMax}}</template>
          </el-table-column>
          <!-- <el-table-column  label="剩余奖励金" prop="" sortable show-overflow-tooltip min-width="120">
          </el-table-column>-->
          <el-table-column label="保证金" prop sortable show-overflow-tooltip min-width="100">
            <template slot-scope="scoped">
              <h4
                class="needMoreInfo"
                @click="pushOrderSerial(scoped.row,'three')"
              >{{scoped.row.collateral}}</h4>
            </template>
          </el-table-column>
          <el-table-column label="行为分" prop sortable show-overflow-tooltip min-width="100">
            <template slot-scope="scoped">
              <h4
                class="needMoreInfo"
                @click="pushOrderSerial(scoped.row,'four')"
              >{{scoped.row.behaviorScore}}</h4>
            </template>
          </el-table-column>
          <el-table-column label="28币" prop sortable show-overflow-tooltip min-width="100">
            <template slot-scope="scoped">
              <h4
                class="needMoreInfo"
                @click="pushOrderSerial(scoped.row,'five')"
              >{{scoped.row.coin}}</h4>
            </template>
          </el-table-column>
          <!-- <el-table-column
            label="最近订单交易时间"
            prop="recentFinishDate"
            sortable
            show-overflow-tooltip
            min-width="180"
          ></el-table-column>-->
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
  data_Commission,
  data_CarList,
  data_MaidLevel
} from "@/api/server/areaPrice.js";
import {
  regionDataPlus,
  CodeToText,
  TextToCode
} from "element-china-area-data";
import { eventBus } from "@/eventBus";
import Pager from "@/components/Pagination/index";
import { data_findDriverMywalletList } from "@/api/finance/transactionCar";
import { parseTime, pickerOptions2 } from "@/utils/";
import GetCityList from "@/components/GetCityList";
import Carwallet from "./Carwallet";
import FileSaver from "file-saver";
import XLSX from "xlsx";
import { SaveAsFile } from "@/utils/lodopFuncs";
export default {
  data() {
    return {
      loading: true,
      belongCityName: null,
      pickerOptions2: {
        shortcuts: pickerOptions2
      },
      selectRowData: {},
      btnsize: "mini",
      options: regionDataPlus,
      sizes: [20, 50, 100, 400],
      pagesize: 20, //初始化加载数量
      page: 1, //初始化页码
      tableDataAll: [],
      dataTotal: null,
      formAllData: {
        account: null,
        areaCode: null,
        recentFinishStartDate: null,
        recentFinishEndDate: null
      },
      CreaseTime: [],
      tableDataExcelAll: [],
      tableColumn: [
        {
          label: "序号",
          prop: ""
        },
        {
          label: "车主账号",
          prop: "driverMobile"
        },
        {
          label: "车主姓名",
          prop: "driverName"
        },
        {
          label: "所属区域",
          prop: "areaCode"
        },
        {
          label: "运费总收入",
          prop: ""
        },
        {
          label: "营销获利总额",
          prop: ""
        },
        {
          label: "可提现余额",
          prop: "availableAmount"
        },
        {
          label: "待处理提现金额",
          prop: "waitAvailableAmount"
        },
        {
          label: "在线交易奖励金（已奖励 / 额度）",
          prop: "gainAwardReward"
        },
        {
          label: "保证金",
          prop: "collateral"
        },
        {
          label: "行为分",
          prop: "behaviorScore"
        },
        {
          label: "28币",
          prop: "coin"
        }
        // {
        //   label: "最近订单交易时间",
        //   prop: "recentFinishDate"
        // }
      ]
    };
  },
  components: {
    Carwallet,
    Pager,
    GetCityList
  },
  methods: {
    getStr(val) {
      this.formAllData.areaCode = val.city.name;
    },

    // 列表刷新页面
    firstblood() {
      this.loading = true;
      data_findDriverMywalletList(
        this.page,
        this.pagesize,
        this.formAllData
      ).then(res => {
        this.dataTotal = res.data.totalCount;
        this.tableDataAll = res.data.list;
        // this.tableDataAll.forEach(item => {
        //   item.recentFinishDate = parseTime(
        //     item.recentFinishDate,
        //     "{y}-{m}-{d} {h}:{i}:{s}"
        //   );
        // });
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
          areaCode: null
        });
      if (this.page != 1) {
        this.page = 1;
        this.$refs.pager.inputval = this.page;
        this.$refs.pager.pageNum = this.page;
      }
      this.CreaseTime = [];
      this.firstblood();
      this.$refs.area.clearData();
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
    //详情弹窗
    pushOrderSerial(item, type) {
      this.$router.push({
        name: "车主账户详情",
        query: { accountId: item.accountId }
      });
      sessionStorage.setItem("carOwnerTabName", type);
    },
    //导出EXCEL
    importExcel() {
      this.$message.info("正在导出中...");
      data_findDriverMywalletList(1, 100, this.formAllData).then(res => {
        this.tableDataExcelAll = res.data.list;
        this.tableDataExcelAll.forEach(item => {
          // item.recentFinishDate = parseTime(
          //   item.recentFinishDate,
          //   "{y}-{m}-{d} {h}:{i}:{s}"
          // );
          item.gainAwardReward =
            item.gainAwardReward + "/" + item.awardRewardMax;
        });
        SaveAsFile({
          data: this.tableDataExcelAll ? this.tableDataExcelAll : [],
          columns: this.tableColumn,
          name: "车主账号概况-" + parseTime(new Date(), "{y}{m}{d}{h}{i}{s}")
        });
      });
    }
  },
  mounted() {
    this.firstblood();
  }
};
</script>
<style lang="scss">
.transactionCar {
  .info_news {
    .el-button {
      padding: 4px 0px;
      span {
        font-weight: bold;
      }
    }
  }
  .el-cascader {
    margin-top: -10px;
  }
}
</style>


