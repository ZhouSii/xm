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
      <el-form-item label="发放状态" prop="provideStatus">
        <el-select v-model="searchInfo.provideStatus" placeholder="请选择">
          <el-option
            v-for="item in provideStatusOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
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
      <div class="info_news">
        <el-table
          ref="multipleTable"
          :data="tableData"
          stripe
          border
          height="100%"
          @selection-change="getSelection"
          @row-click="clickDetails"
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
          <el-table-column prop="companyAddress" sortable width="200" label="企业地址"></el-table-column>
          <el-table-column prop="tradeAreaName" sortable width="100" label="所属商圈"></el-table-column>
          <el-table-column prop="belongGroup" sortable width="100" label="所属业务组"></el-table-column>
          <el-table-column sortable prop="belongSalesman" label="所属业务员" width="100"></el-table-column>
          <el-table-column sortable prop="belongIndustry" label="所属行业" width="100"></el-table-column>
          <el-table-column sortable prop="activityName" label="优惠券活动名称" width="200"></el-table-column>
          <el-table-column sortable label="发放状态" width="100">
            <template slot-scope="scope">{{ !!scope.row.provideTime ? '已发放' : '未发放'}}</template>
          </el-table-column>
          <el-table-column sortable prop="provideTime" label="发放时间" width="200"></el-table-column>
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
import { platformShippersList } from "@/api/crm/ownerVisitTaskManagement.js";
export default {
  data() {
    return {
      loading: false,
      //搜索信息
      searchInfo: {
        mobile: "", //手机号码
        name: "", //公司名称
        contacts: "", //联系人
        provideStatus: "2" //发放状态(1:已发放)，0:未发放
      },
      //   发放状态列表
      provideStatusOptions: [
        {
          value: "2",
          label: "全部"
        },
        {
          value: "1",
          label: "已发放"
        },
        {
          value: "0",
          label: "未发放"
        }
      ],
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
    //搜索和清空
    handleSearch(type) {
      if (type === "clear") {
        // type === 'clear' 清空
        this.searchInfo = {
          mobile: "", //手机号码
          name: "", //公司名称
          contacts: "", //联系人
          provideStatus: "2" //发放状态(1:已发放)，0:未发放
        };
      }
      this.page = 1
      this.query();
    },
    // 获取优惠券发放详情
    query() {
      const id = this.$route.query.id;
      const params = {
        pageNum: this.page,
        pageSize: this.pagesize,
        taskId: id, //任务id
        mobile: this.searchInfo.mobile, //手机号
        contacts: this.searchInfo.contacts, //联系人
        companyName: this.searchInfo.name, //公司名
        provideStatus:
          parseInt(this.searchInfo.provideStatus) < 2
            ? this.searchInfo.provideStatus
            : null //拜访状态
      };
      this.loading = true;
      platformShippersList(params)
        .then(res => {
          if (res.status === 200) {
            this.tableData = res.data.list;
            this.totalCount = res.data.total;
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
      console.log("导出excel");
    },
    getSelection(item) {
      console.log("item", item);
    },
    clickDetails(item) {
      console.log("clickDetails", item);
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