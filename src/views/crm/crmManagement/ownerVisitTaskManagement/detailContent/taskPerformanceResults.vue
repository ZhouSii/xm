<template>
  <div class="identicalStyle" v-loading="loading">
    <el-form
      :inline="true"
      :model="searchInfo"
      ref="ruleForm"
      class="demo-ruleForm classify_searchinfo"
    >
      <el-form-item label="手机号码" prop="mobile">
        <el-input v-model.trim="searchInfo.mobile" maxlength="20" clearable></el-input>
      </el-form-item>
      <el-form-item label="公司名称" prop="name">
        <el-input v-model.trim="searchInfo.name" maxlength="20" clearable></el-input>
      </el-form-item>
      <el-form-item label="联系人" prop="contacts">
        <el-input v-model.trim="searchInfo.contacts" maxlength="20" clearable></el-input>
      </el-form-item>
      <el-form-item class="btnChoose fr" style="margin-left:0;">
        <el-button
          type="primary"
          :size="btnsize"
          icon="el-icon-search"
          plain
          @click="handleSearch('search')"
        >搜索</el-button>
        <el-button
          type="info"
          icon="fontFamily aflc-icon-qingkong"
          :size="btnsize"
          plain
          @click="handleSearch('clear')"
        >清空</el-button>
      </el-form-item>
    </el-form>
    <div class="classify_info">
      <div class="btns_box">
        <el-button
          type="primary"
          icon="el-icon-download"
          plain
          :size="btnsize"
          @click="handleClick"
        >导出EXCEL</el-button>
      </div>
      <div class="info_news">
        <el-table
          ref="multipleTable"
          :data="tableData"
          stripe
          border
          height="100%"
          tooltip-effect="dark"
          style="width: 100%"
        >
          <el-table-column label="序号" width="60">
            <template slot-scope="scope">{{ (page - 1)*pagesize + scope.$index + 1 }}</template>
          </el-table-column>
          <el-table-column sortable label="手机号码" width="150">
             <template slot-scope="scope">
              <h4 class="needMoreInfo" @click="goDetail(scope.row.shipperId)">{{ scope.row.mobile}}</h4>
            </template>
          </el-table-column>
          <el-table-column
            prop="companyName"
            :show-overflow-tooltip="true"
            sortable
            label="公司名称"
            width="200"
          ></el-table-column>
          <el-table-column sortable prop="contacts" label="联系人" width="100"></el-table-column>
          <el-table-column prop="potentialGradeName" sortable label="同城潜力等级" width="200"></el-table-column>
          <el-table-column sortable label="拜访状态" width="100">
            <template slot-scope="scope">{{ !!scope.row.visitTime ? '已拜访' : '未拜访'}}</template>
          </el-table-column>
          <el-table-column :show-overflow-tooltip="true" sortable label="优惠券发放状态" width="200">
            <template slot-scope="scope">{{ !!scope.row.provideTime ? '已发放' : '未发放'}}</template>
          </el-table-column>
          <el-table-column sortable label="是否跟进" width="100">
            <template slot-scope="scope">{{ scope.row.isAgainVisit == 1 ? '是' : scope.row.isAgainVisit == 2 ? '否' : ''}}</template>
          </el-table-column>
          <el-table-column sortable width="100" label="盘活可能">
            <template slot-scope="scope">{{ scope.row.isMayActive == 1 ? '是' : scope.row.isMayActive == 0 ? '否' : ''}}</template>
          </el-table-column>
          <el-table-column sortable width="100" label="是否用竞品">
            <template
              slot-scope="scope"
            >{{ scope.row.rivalAmount == 1 ? '大' : scope.row.rivalAmount == 2 ? '一般' : scope.row.rivalAmount == 3 ? '没有' : ''}}</template>
          </el-table-column>
          <el-table-column sortable prop="useCarCountName" label="叫车次数" width="100"></el-table-column>
          <el-table-column sortable prop="curCreateCount" label="任务期下单量" width="100"></el-table-column>
          <el-table-column sortable prop="curCompleteCount" label="任务期成交量" width="100"></el-table-column>
          <el-table-column sortable prop="curCancelCount" label="任务期取消量" width="100"></el-table-column>
          <el-table-column sortable prop="matchRate" label="配对率"  :sort-method="sortMatchRate" width="100"></el-table-column>
          <el-table-column sortable prop="cancelRate" label="取消率" :sort-method="sortCancelRate" width="100"></el-table-column>
        </el-table>
      </div>
      <div class="essentialInformation">
        <p>
          <span>应拜访客户总数</span>
          <span>{{compute.needVisitCount ? compute.needVisitCount : 0}},</span>

          <span>已拜访客户</span>
          <span>{{compute.visitedCount ? compute.visitedCount : 0}},</span>

          <span>未拜访客户</span>
          <span>{{compute.waitVisitCount ? compute.waitVisitCount : 0}},</span>

          <span>优惠券应发放张数</span>
          <span>{{compute.shouldCouponNum ? compute.shouldCouponNum : 0}}张,</span>

          <span>优惠券发放张数</span>
          <span>{{compute.providedCouponNum ? compute.providedCouponNum : 0}}张,</span>

          <span>优惠券使用张数</span>
          <span>{{compute.usedCouponNum ? compute.usedCouponNum : 0}}张,</span>

          <span>使用金额</span>
          <span>{{compute.usedCouponAmount ? compute.usedCouponAmount : 0}}元.</span>
        </p>
      </div>
    </div>
    <div class="info_tab_footer">
      共计:{{ totalCount }}
      <div class="show_pager">
        <Pager :total="totalCount" @change="handlePageChange" ref="pager" />
      </div>
    </div>
  </div>
</template>
<script>
import Pager from "@/components/Pagination/index";
import {
  visitResult,
  exportVisitResultExcel
} from "@/api/crm/ownerVisitTaskManagement.js";
export default {
  data() {
    return {
      loading: false,
      //搜索信息
      searchInfo: {
        mobile: "", //手机号码
        name: "", //公司名称
        contacts: "" //联系人
      },
      // 表格数据
      tableData: [],
      compute: {}, //底部汇总数据
      totalCount: 0, //数据总数
      page: 1, //页码
      pagesize: 20, //一页展示多少数据
      btnsize: "mini"
    };
  },
  methods: {
    // 跳转任务管理详情
    goDetail(id) {
      this.$router.push('/users/dataDetails?userId=' + id)
    },
    // 配对率排序
    sortMatchRate(a,b) { 
      return parseFloat(a.matchRate) - parseFloat(b.matchRate)
    },
    // 取消率排序
    sortCancelRate(a,b) { 
      return parseFloat(a.cancelRate) - parseFloat(b.cancelRate)
    },
    //搜索和清空
    handleSearch(type) {
      if (type === "clear") {
        // type === 'clear' 清空
        this.searchInfo = {
          mobile: "", //手机号码
          name: "", //公司名称
          contacts: "" //联系人
        };
      }
      this.page = 1
      this.query();
    },
    // 获取任务执行结果
    query() {
      const id = this.$route.query.id;
      const params = {
        pageNum: this.page,
        pageSize: this.pagesize,
        taskId: id, //任务id
        mobile: this.searchInfo.mobile, //手机号
        contacts: this.searchInfo.contacts, //联系人
        companyName: this.searchInfo.name //公司名
      };
      this.loading = true;
      visitResult(params)
        .then(res => {
          if (res.status === 200) {
            this.tableData = res.data.pageInfo.list;
            this.totalCount = res.data.pageInfo.total;
            this.compute = res.data.compute;
          } else {
            this.$message.info(res.errorInfo);
          }
          this.loading = false;
        })
        .catch(err => {
          this.loading = false;
          this.$message.error(err.errorInfo);
        });
    },
    // 导出excel
    handleClick() {
      const id = this.$route.query.id;
      const params = {
        pageNum: this.page,
        pageSize: this.pagesize,
        taskId: id, //任务id
        mobile: this.searchInfo.mobile, //手机号
        contacts: this.searchInfo.contacts, //联系人
        companyName: this.searchInfo.name //公司名
      };
      exportVisitResultExcel(params).then(res => {
        const blob = new Blob([res]);
        let name =
          sessionStorage.getItem("activityName") +
          "任务结果" +
          this.myformatter(new Date()) +
          ".xlsx";
        this.href = window.URL.createObjectURL(blob);
        const NewDom = document.createElement("a");
        NewDom.setAttribute("href", this.href);
        NewDom.setAttribute("target", "_blank");
        NewDom.setAttribute("download", name);
        document.body.appendChild(NewDom);
        NewDom.click();
        document.body.removeChild(NewDom);
      });
    },
    // 格式化日期
    myformatter(date) {
      var strDate = date.getFullYear() + "-";
      strDate +=
        (date.getMonth() + 1 > 9
          ? date.getMonth() + 1
          : "0" + (date.getMonth() + 1)) + "-";
      strDate += date.getDate() > 9 ? date.getDate() : "0" + date.getDate();
      return strDate;
    },
    // 翻页
    handlePageChange(obj) {
      this.pagesize = obj.pageSize;
      this.page = obj.pageNum;
      this.query();
    }
  },
  created() {
    this.query();
  },
  components: {
    Pager
  }
};
</script>
<style scoped>
.essentialInformation {
  line-height: 30px;
}
</style>
