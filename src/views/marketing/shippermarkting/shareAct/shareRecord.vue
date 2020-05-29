<template>
  <div class="identicalStyle" style="height:100%" v-loading="loading">
    <el-form :inline="true" class="demo-ruleForm classify_searchinfo">
      <el-form-item label="区域">
        <el-input v-model.trim="formAllData.areaText" clearable></el-input>
      </el-form-item>
      <el-form-item label="标题">
        <el-input v-model.trim="formAllData.name" clearable></el-input>
      </el-form-item>
      <el-form-item label="活动ID">
        <el-input v-model.trim="formAllData.activityId" clearable></el-input>
      </el-form-item>
      <el-form-item label="用户账号">
        <el-input v-model.trim="formAllData.usernameMobile" clearable></el-input>
      </el-form-item>
      <el-form-item label="时间">
        <el-date-picker
          v-model="createTime"
          @change="searchTime"
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
          <el-table-column label="活动ID" prop="activityId" show-overflow-tooltip min-width="250"></el-table-column>
          <el-table-column
            label="区域"
            sortable
            show-overflow-tooltip
            min-width="140"
            prop="areaText"
          ></el-table-column>
          <el-table-column label="标题" prop="name" sortable show-overflow-tooltip min-width="200"></el-table-column>
          <el-table-column
            label="用户账号"
            prop="usernameMobile"
            sortable
            show-overflow-tooltip
            min-width="180"
          ></el-table-column>
          <el-table-column
            label="基础奖励优惠券"
            prop="foundationreward"
            sortable
            show-overflow-tooltip
            min-width="170"
          ></el-table-column>
          <el-table-column
            label="额外奖励优惠券"
            prop="additionalreward"
            sortable
            show-overflow-tooltip
            min-width="170"
          ></el-table-column>
          <el-table-column
            label="第N次分享"
            prop="sharingTime"
            sortable
            show-overflow-tooltip
            min-width="140"
          ></el-table-column>
          <el-table-column
            label="附属奖品"
            prop="subsidiary"
            sortable
            show-overflow-tooltip
            min-width="140"
          ></el-table-column>
          <el-table-column
            label="奖品兑换链接"
            prop="link"
            sortable
            show-overflow-tooltip
            min-width="180"
          ></el-table-column>
          <el-table-column
            label="时间"
            prop="createTime"
            sortable
            show-overflow-tooltip
            min-width="160"
          >
            <template slot-scope="scope">{{scope.row.createTime|parseTime}}</template>
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
  aflcSharingActivitiesRecordList,
  aflcSharingActivitiesRecordExcel
} from "@/api/marketing/shippermarkting/shareAct.js";
export default {
  data() {
    return {
      loading: true,
      btnsize: "mini",
      sizes: [20, 50, 100, 400],
      pagesize: 20, // 初始化加载数量
      page: 1, // 初始化页码
      totalCount: null,
      dataTotal: 0,
      tableDataAll: [],
      createTime: [],
      formAllData: {
        areaText: null,
        name: null,
        activityId: null,
        usernameMobile: null,
        userType: "1",
        endTime: "",
        startTime: ""
      }
    };
  },
  components: {
    Pager
  },
  props: {
    isvisible: {
      type: Boolean,
      default: false
    }
  },
  watch: {
    isvisible: {
      handler(newVal, oldVal) {
        if (newVal) {
          setTimeout(() => {
            this.$refs.multipleTable.$el.style.height =
              this.$refs.multipleTable.$el.offsetHeight + "px";
          }, 300);
          this.firstblood();
        }
      },
      immediate: true
    }
  },
  methods: {
    searchTime(i) {
      if (i) {
        this.formAllData.startTime = i[0];
        this.formAllData.endTime = i[1];
      } else {
        this.formAllData.startTime = "";
        this.formAllData.endTime = "";
      }
    },
    // 列表刷新页面
    firstblood() {
      this.loading = true;
      aflcSharingActivitiesRecordList(
        this.page,
        this.pagesize,
        this.formAllData
      )
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
      aflcSharingActivitiesRecordExcel(0, 0, this.formAllData).then(res => {
        var blob = new Blob([res]);
        href = window.URL.createObjectURL(blob);
        var NewDom = document.createElement("a");
        NewDom.setAttribute("href", href);
        NewDom.setAttribute("target", "_blank");
        NewDom.setAttribute("download", "货主分享记录.xls");
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
        areaText: null,
        name: null,
        activityId: null,
        usernameMobile: null,
        userType: "1",
        endTime: "",
        startTime: ""
      };
      if (this.page != 1) {
        this.page = 1;
        this.$refs.pager.inputval = this.page;
        this.$refs.pager.pageNum = this.page;
      }
      this.createTime = [];
      this.firstblood();
    },
    // 每页显示数据量变更
    handlePageChange(obj) {
      this.page = obj.pageNum;
      this.pagesize = obj.pageSize;
      this.firstblood();
    }
  }
};
</script>
<style lang="scss">
</style>

