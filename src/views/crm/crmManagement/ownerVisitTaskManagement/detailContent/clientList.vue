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
          <el-table-column prop="mobile" sortable label="手机号码" width="150">
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
          <el-table-column prop="shipperType" sortable label="货主类型" width="100"></el-table-column>
          <el-table-column
            prop="belongCity"
            :show-overflow-tooltip="true"
            sortable
            label="所在地"
            width="200"
          ></el-table-column>
          <el-table-column sortable prop="companyAddress" label="公司地址" width="200"></el-table-column>
          <el-table-column prop="tradeAreaName" sortable width="150" label="所属商圈"></el-table-column>
          <el-table-column prop="belongGroup" sortable width="150" label="所属业务组"></el-table-column>
          <el-table-column sortable prop="belongSalesman" label="所属业务员" width="100"></el-table-column>
          <el-table-column sortable prop="belongIndustry" label="所属行业" width="100"></el-table-column>
          <el-table-column sortable prop="preCompleteCount" label="近31-60天订单成交量" width="200"></el-table-column>
          <el-table-column sortable prop="curCompleteCount" label="近30天订单成交量" width="200"></el-table-column>
          <el-table-column sortable label="环比增长率" :sort-method="sortGrowthRate" width="100">
             <template slot-scope="scope">
              <span
                :style="{color: parseInt(scope.row.growthRate) >= 0 ? '#3e9ff1' : 'red' }"
              >{{ scope.row.growthRate}}</span>
            </template>
          </el-table-column>
          <el-table-column sortable prop="curCreateCount" label="近30天下单量" width="200"></el-table-column>
          <el-table-column sortable prop="curCancelCount" label="近30天取消量" width="200"></el-table-column>
          <el-table-column sortable prop="occupyRate" label="占有率" :sort-method="sortOccupyRate" width="100"></el-table-column>
          <el-table-column sortable prop="matchRate" label="配对率" :sort-method="sortMatchRate" width="100"></el-table-column>
          <el-table-column sortable prop="cancelRate" label="取消率" :sort-method="sortCancelRate"  width="100"></el-table-column>
        </el-table>
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
import { platformShippersList, exportVisitShipperExcel } from "@/api/crm/ownerVisitTaskManagement.js";

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
    // 环比增长率排序
    sortGrowthRate(a,b) { 
      return parseFloat(a.growthRate) - parseFloat(b.growthRate)
    },
    // 配对率排序
    sortMatchRate(a,b) { 
      return parseFloat(a.matchRate) - parseFloat(b.matchRate)
    },
    // 取消率排序
    sortCancelRate(a,b) { 
      return parseFloat(a.cancelRate) - parseFloat(b.cancelRate)
    },
    // 占有率排序
    sortOccupyRate(a,b) { 
      return parseFloat(a.occupyRate) - parseFloat(b.occupyRate)
    },
    //搜索和清空
    handleSearch(type) {
      if (type === "clear") {
        // 清空
        this.searchInfo = {
          mobile: "", //手机号码
          name: "", //公司名称
          contacts: "" //联系人
        }
      }
      this.page = 1
      this.query()
    },
    // 获取客户列表
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
      this.loading = true
      platformShippersList(params)
        .then(res => {
          if (res.status === 200) {
            this.tableData = res.data.list;
            this.totalCount = res.data.total;
          } else {
            this.$message.info(res.errorInfo);
          }
          this.loading = false
        })
        .catch(err => {
          this.loading = false
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
      exportVisitShipperExcel(params).then(res => {
        const blob = new Blob([res]);
        let name = sessionStorage.getItem("activityName") + '客户列表' + this.myformatter(new Date())+ '.xlsx'
        this.href = window.URL.createObjectURL(blob);
        const NewDom = document.createElement("a");
        NewDom.setAttribute("href", this.href);
        NewDom.setAttribute("target", "_blank");
        NewDom.setAttribute(
          "download",
          name
        );
        document.body.appendChild(NewDom);
        NewDom.click();
        document.body.removeChild(NewDom);
      })
    },
     // 格式化日期
    myformatter(date){  
            var strDate = date.getFullYear()+"-";
            strDate += (date.getMonth()+1 > 9 ? date.getMonth()+1 : '0' + (date.getMonth()+1)) + "-";
            strDate += date.getDate() > 9 ? date.getDate() : '0' + date.getDate();
            return strDate ;
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