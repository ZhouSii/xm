<template>
  <div class="identicalStyle" v-loading="loading">
    <el-form :inline="true" :model="formAll" ref="ruleForm" class="classify_searchinfo">
      <el-form-item label="认证所在地">
        <!-- <vregion :ui="true" @values="regionChange" class="form-control"> -->
        <el-input v-model="formAll.provinceCityArea" placeholder="请输入" clearable></el-input>
        <!-- </vregion> -->
      </el-form-item>
      <el-form-item label="公司名称">
        <el-input v-model.trim="formAll.companyName" clearable></el-input>
      </el-form-item>
      <el-form-item label="手机号：">
        <el-input v-model.trim="formAll.mobile" clearable></el-input>
      </el-form-item>
      <el-form-item class="fr">
        <el-button
          type="primary"
          icon="el-icon-search"
          :size="btnsize"
          plain
          @click="handleSearch('search')"
        >查询</el-button>
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
          :size="btnsize"
          plain
          icon="el-icon-check"
          v-has:COMPANY_MANAGE_VALIDATED_AUTDIT
          @click="handleEdit"
        >认证审核</el-button>
      </div>
      <div class="info_news">
        <el-table
          ref="multipleTable"
          :data="tableData1"
          stripe
          border
          height="100%"
          @row-click="clickDetails"
          @selection-change="getSelection"
          tooltip-effect="dark"
          style="width: 100%"
        >
          <el-table-column sortable type="selection" width="50"></el-table-column>
          <el-table-column label="序号" width="60">
            <template slot-scope="scope">{{ (page - 1)*pagesize + scope.$index + 1 }}</template>
          </el-table-column>

          <el-table-column label="手机号(会员账号)" prop="mobile" sortable width="150">
            <template slot-scope="scope">
              <h4 class="needMoreInfo" @click="pushOrderSerial(scope.row)">{{ scope.row.mobile}}</h4>
            </template>
          </el-table-column>
          <el-table-column prop="contactsName" sortable label="联系人" width="150"></el-table-column>
          <el-table-column
            prop="companyName"
            sortable
            label="公司名称"
            :show-overflow-tooltip="true"
            width="250"
          ></el-table-column>
          <el-table-column
            prop="auditAreaName"
            sortable
            label="认证所在地"
            :show-overflow-tooltip="true"
            width="200"
          ></el-table-column>
          <el-table-column prop="registerOriginName" sortable label="注册来源" width="120"></el-table-column>
          <el-table-column prop="registerTime" sortable label="注册日期" width="160">
            <template slot-scope="scope">{{scope.row.registerTime | parseTime}}</template>
          </el-table-column>
          <el-table-column prop="accountStatusName" sortable label="账户状态" width="120">
            <template slot-scope="scope">
              <span
                :class="{freezeName: scope.row.accountStatusName == '冻结中' ,blackName: scope.row.accountStatusName == '黑名单',normalName :scope.row.accountStatusName == '正常'}"
              >{{scope.row.accountStatusName}}</span>
            </template>
          </el-table-column>
          <el-table-column prop="authStatusName" sortable label="认证状态" width="150"></el-table-column>
          <el-table-column prop="qq" label="QQ号码" sortable></el-table-column>
          <el-table-column prop="isOpenTms" sortable label="是否开通TMS" width="150">
            <template slot-scope="scope">
              <span
                :class="scope.row.isOpenTms == 1 ? 'isTMS' : 'noTMS'"
              >{{scope.row.isOpenTms == 1 ? '是' : '否'}}</span>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
    <div class="info_tab_footer">
      共计:{{ totalCount }}
      <div class="show_pager">
        <Pager :total="totalCount" @change="handlePageChange" />
      </div>
    </div>
    <createdDialog
      :paramsView="paramsView"
      :typetitle="titleInfo"
      :editType="type"
      :dialogFormVisible_add.sync="dialogFormVisible_add"
      @getData="getDataList"
    />
  </div>
</template>
<script>
import createdDialog from "./createdDialogA.vue";
import GetCityList from "@/components/GetCityList";
import Pager from "@/components/Pagination/index";
// import vregion from '@/components/vregion/Region.vue'
import { data_LogisticsCompanyList } from "@/api/users/logistics/LogisticsCompany.js";

export default {
  props: {
    isvisible: {
      type: Boolean,
      default: false
    }
  },
  components: {
    createdDialog,
    GetCityList,
    Pager
    //   vregion
  },
  data() {
    return {
      btnsize: "mini",
      dialogFormVisible_add: false,
      type: "",
      paramsView: {},
      templateRadio: "",
      tableData1: [],
      totalCount: 0,
      page: 1,
      pagesize: 20,
      options: [],
      titleInfo: "",
      loading: true,
      formAll: {
        companyName: "",
        mobile: "",
        authStatus: "AF0010402", // 待认证的状态码
        isVest: "0",
        provinceCityArea: ""
      },
      selected: [],
      selectRowData: {},
      multipleSelection: []
    };
  },
  watch: {
    isvisible: {
      handler(newVal, oldVal) {
        if (newVal) {
          this.firstblood();
        }
      },
      // 代表在wacth里声明了firstName这个方法之后立即先去执行handler方法
      immediate: true
    }
  },
  mounted() {},
  methods: {
    // regionChange(d) {
    //     // console.log('data:', d)
    //     this.formAll.provinceCityArea = (!d.province && !d.city && !d.area && !d.town) ? '' : `${this.getValue(d.province)}${this.getValue(d.city)}${this.getValue(d.area)}${this.getValue(d.town)}`.trim()
    // },
    // getValue(obj) {
    //     return obj ? obj.value : ''
    // },
    pushOrderSerial(row) {
      this.type = "view";
      this.titleInfo = "物流公司信息";
      this.paramsView = row;
      this.dialogFormVisible_add = true;
      this.$refs.multipleTable.clearSelection();
    },
    handlePageChange(obj) {
      this.page = obj.pageNum;
      this.pagesize = obj.pageSize;
      this.firstblood();
    },
    // 点击选中当前行
    clickDetails(row, event, column) {
      this.$refs.multipleTable.toggleRowSelection(row);
    },
    getDataList() {
      this.firstblood();
    },
    // 刷新页面
    firstblood() {
      data_LogisticsCompanyList(this.page, this.pagesize, this.formAll)
        .then(res => {
          this.totalCount = res.data.totalCount;
          this.tableData1 = res.data.list;
          this.loading = false;
        })
        .catch(err => {
          this.loading = false;
        });
    },
    // 判断选中与否
    getSelection(val) {
      //   console.log('选中内容', val)
      this.selected = val;
    },
    handleEdit() {
      this.selectRowData = this.selected[0];
      if (this.selected.length == 0) {
        return this.$message.info("请选择您要操作的用户");
      } else if (this.selected.length > 1) {
        this.$message({
          message: "每次只能操作单条数据~",
          type: "info"
        });
      } else {
        this.type = "CertificationAudit";
        this.titleInfo = "认证审核";
        this.paramsView = Object.assign({}, this.selectRowData);
        this.dialogFormVisible_add = true;
      }
      // 清除选中状态，避免影响下个操作
      this.$refs.multipleTable.clearSelection();
    },
    // 点击查询按纽，按条件查询列表
    handleSearch(type) {
      if (type == "clear") {
        this.formAll = {
          companyName: "",
          mobile: "",
          authStatus: "AF0010402", // 待认证的状态码
          isVest: "0",
          provinceCityArea: ""
        };
      }
      if (this.page != 1) {
        this.page = 1;
        this.$refs.pager.inputval = this.page;
        this.$refs.pager.pageNum = this.page;
      }
      this.firstblood();
    }
  }
};
</script>

