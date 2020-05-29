<template>
  <div class="identicalStyle" style="height:100%" v-loading="loading">
    <el-form :inline="true" class="demo-ruleForm classify_searchinfo">
      <el-form-item label="车主">
        <el-input v-model="formAllData.driver"></el-input>
      </el-form-item>
      <el-form-item label="所属区域">
        <GetCityList ref="area" v-model="formAllData.belongCityName" @returnStr="getStr"></GetCityList>
      </el-form-item>
      <el-form-item label="派发时间">
        <el-date-picker
          v-model="authPassTime"
          @change="authPassTimeVal"
          type="daterange"
          range-separator="-"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          unlink-panels
          align="right"
          value-format="yyyy-MM-dd HH:mm:ss"
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
          plain
          icon="el-icon-download"
          @click="outPutExcel"
          :size="btnsize"
          v-has:MARKETING_MARKETINGDISTRIBUTIONRECORD_BONUS_EXPORT
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
          <el-table-column label="所属区域" prop="belongCityName" sortable></el-table-column>
          <el-table-column label="车主" prop="driver" sortable>
            <template slot-scope="scoped">
              <h4 class="needMoreInfo" @click="mobileOperate(scoped.row)">{{scoped.row.driver}}</h4>
            </template>
          </el-table-column>
          <el-table-column label="认证状态" prop="driverStatus" sortable></el-table-column>
          <el-table-column label="派发时间" prop="authPassTime" sortable></el-table-column>
          <el-table-column label="奖励金额度上限" prop="awardRewardMax" sortable></el-table-column>
          <el-table-column label="已使用奖励金" prop="gainAwardReward" sortable></el-table-column>
          <el-table-column label="剩余奖励金" prop="remainderAwardReward" sortable></el-table-column>
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
import GetCityList from "@/components/GetCityList/city";
import { eventBus } from "@/eventBus";
import Pager from "@/components/Pagination/index";
import { parseTime } from "@/utils/";
import { data_driverRewardList } from "@/api/marketing/marktingNotes/index";
import FileSaver from "file-saver";
import XLSX from "xlsx";
import { SaveAsFile } from "@/utils/lodopFuncs";
export default {
  data() {
    return {
      loading: true,
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
      authPassTime: [],
      formAllData: {
        driver: null,
        areaName: null,
        carType: null,
        commissionGrade: null
      },
      tableColumn: [
        {
          label: "序号",
          prop: ""
        },
        {
          label: "所属区域",
          prop: "belongCityName"
        },
        {
          label: "车主",
          prop: "driver"
        },
        {
          label: "认证状态",
          prop: "driverStatus"
        },
        {
          label: "派发时间",
          prop: "authPassTime"
        },
        {
          label: "奖励金额度上限",
          prop: "awardRewardMax"
        },
        {
          label: "已使用奖励金",
          prop: "gainAwardReward"
        },
        {
          label: "剩余奖励金",
          prop: "remainderAwardReward"
        }
      ]
    };
  },
  components: {
    Pager,
    GetCityList
  },
  methods: {
    getStr(val) {
      if (!val.area) {
        this.formAllData.areaCode = val.city.code;
      } else {
        this.formAllData.areaCode = val.area.code;
      }
    },
    authPassTimeVal(i) {
      if (i) {
        this.formAllData.authPassStartTime = i[0];
        this.formAllData.authPassEndTime = i[1];
      } else {
        this.formAllData.authPassStartTime = "";
        this.formAllData.authPassEndTime = "";
      }
    },
    // 列表刷新页面
    firstblood() {
      this.loading = true;
      data_driverRewardList(this.page, this.pagesize, this.formAllData).then(
        res => {
          this.dataTotal = res.data.totalCount;
          this.tableDataAll = res.data.list;
          this.tableDataAll.forEach(item => {
            item.authPassTime = parseTime(
              item.authPassTime,
              "{y}-{m}-{d} {h}:{i}:{s}"
            );
          });
          this.loading = false;
        }
      );
    },
    // 导出Excel总数据
    outPutExcel() {
      this.$message.success("正在导出中...");
      data_driverRewardList(0, 0, this.formAllData).then(res => {
        this.tableDataAllExcel = res.data.list;
        this.tableDataAllExcel.forEach(item => {
          item.authPassTime = parseTime(
            item.authPassTime,
            "{y}-{m}-{d} {h}:{i}:{s}"
          );
        });
        if (this.tableDataAllExcel.length > 0) {
          SaveAsFile({
            data: this.tableDataAllExcel ? this.tableDataAllExcel : [],
            columns: this.tableColumn,
            name:
              "奖励金发放记录-" + parseTime(new Date(), "{y}{m}{d}{h}{i}{s}")
          });
          this.$refs.multipleTable.clearSelection();
        } else {
          SaveAsFile({
            data: this.tableDataAllExcel ? this.tableDataAllExcel : [],
            columns: this.tableColumn,
            name:
              "奖励金发放记录-" + parseTime(new Date(), "{y}{m}{d}{h}{i}{s}")
          });
        }
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
        driver: null,
        areaName: null,
        carType: null,
        commissionGrade: null
      };
      if (this.page != 1) {
        this.page = 1;
        this.$refs.pager.inputval = this.page;
        this.$refs.pager.pageNum = this.page;
      }
      this.authPassTime = [];
      this.$refs.area.clearData();
      this.firstblood();
    },
    // 每页显示数据量变更
    handlePageChange(obj) {
      this.page = obj.pageNum;
      this.pagesize = obj.pageSize;
      this.firstblood();
    },
    // 车主
    mobileOperate(i) {
      this.$router.push({ name: "车主详情", query: { driverId: i.driverId } });
      sessionStorage.setItem("CZdetailsName", "essential");
    }
  },

  mounted() {
    this.firstblood();
  }
};
</script>
<style lang="scss">
</style>

