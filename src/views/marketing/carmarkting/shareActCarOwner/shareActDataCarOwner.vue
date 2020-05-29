<template>
  <div class="identicalStyle" style="height:100%" v-loading="loading">
    <el-form :inline="true" class="demo-ruleForm classify_searchinfo">
      <el-form-item label="用户账号">
        <el-input v-model.trim="formAllData.usernameMobile" clearable></el-input>
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
          <el-table-column
            label="用户账号"
            prop="usernameMobile"
            sortable
            show-overflow-tooltip
            min-width="120"
          ></el-table-column>
          <el-table-column
            label="累计分享次数"
            prop="sharingTime"
            sortable
            show-overflow-tooltip
            min-width="120"
          ></el-table-column>
          <el-table-column
            label="累计获得金额"
            prop="sharingMoney"
            sortable
            show-overflow-tooltip
            min-width="120"
          ></el-table-column>
          <el-table-column
            label="首次参与时间"
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
  aflcSharingActivitiesData,
  aflcSharingActivitiesActivitiesExcel
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
        usernameMobile: null,
        userType: "0",
        activityId: this.$route.query.shareActivityId
      }
    };
  },
  components: {
    Pager
  },
  methods: {
    // 列表刷新页面
    firstblood() {
      this.loading = true;
      aflcSharingActivitiesData(this.page, this.pagesize, this.formAllData)
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
      aflcSharingActivitiesActivitiesExcel(0, 0, this.formAllData).then(res => {
        var blob = new Blob([res]);
        href = window.URL.createObjectURL(blob);
        var NewDom = document.createElement("a");
        NewDom.setAttribute("href", href);
        NewDom.setAttribute("target", "_blank");
        NewDom.setAttribute("download", "车主分享活动数据.xls");
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
        usernameMobile: null,
        userType: "0",
        activityId: this.$route.query.shareActivityId
      };
      if (this.page != 1) {
        this.page = 1;
        this.$refs.pager.inputval = this.page;
        this.$refs.pager.pageNum = this.page;
      }
      this.firstblood();
    },
    //跳转到订单详情
    // 每页显示数据量变更
    handlePageChange(obj) {
      this.page = obj.pageNum;
      this.pagesize = obj.pageSize;
      this.firstblood();
    }
  },
  mounted() {
    setTimeout(() => {
      this.$refs.multipleTable.$el.style.height =
        this.$refs.multipleTable.$el.offsetHeight + "px";
    }, 300);
    this.firstblood();
  }
};
</script>
<style lang="scss">
</style>

