<template>
  <div class="identicalStyle" v-loading="loading">
    <el-form :inline="true" :model="formInline" ref="ruleForm" class="classify_searchinfo">
      <el-form-item label="手机号：">
        <el-input placeholder="请输入内容" v-model.trim="formInline.mobile" clearable></el-input>
      </el-form-item>
      <el-form-item label="公司名称：">
        <el-input placeholder="请输入内容" v-model.trim="formInline.companyName" clearable></el-input>
      </el-form-item>
      <el-form-item label="联系人姓名：">
        <el-input placeholder="请输入内容" v-model.trim="formInline.contactsName" clearable></el-input>
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
          icon="el-icon-edit"
          :size="btnsize"
          plain
          @click="handleChange"
          v-has:COMPANY_MANAGE_UPDATE
        >修改</el-button>
      </div>
      <div class="info_news">
        <el-table
          ref="multipleTable"
          :data="tableData3"
          stripe
          border
          height="100%"
          tooltip-effect="dark"
          @row-click="clickDetails"
          @selection-change="getSelection"
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
          <el-table-column prop="accountStatusName" sortable label="账户状态" width="150">
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
  </div>
</template>
<script>
import createdDialog from "./createdDialogA";
import { data_get_shipper_type } from "@/api/users/shipper/all_shipper.js";
import { data_LogisticsCompanyList } from "@/api/users/logistics/LogisticsCompany.js";
import Pager from "@/components/Pagination/index";

export default {
  props: {
    isvisible: {
      type: Boolean,
      default: false
    }
  },
  components: {
    createdDialog,
    Pager
  },
  data() {
    return {
      btnsize: "mini",
      paramsView: {},
      templateRadio: "",
      options: [],
      tableData3: [],
      totalCount: 0,
      page: 1,
      titleInfo: "",
      pagesize: 20,
      loading: true,
      formInline: {
        companyName: "",
        mobile: "",
        authStatus: "AF0010403", // 已认证的状态码
        isVest: "0",
        contactsName: ""
      },
      selectRowData: {},
      dialogFormVisible_add: false,
      type: "",
      selected: [] // 当前选择集
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
    handlePageChange(obj) {
      this.page = obj.pageNum;
      this.pagesize = obj.pageSize;
      this.firstblood();
    },
    handleChange() {
      this.selectRowData = this.selected[0];
      if (this.selected.length == 0) {
        return this.$message.info("请选择您要操作的用户");
      } else if (this.selected.length > 1) {
        this.$message({
          message: "每次只能操作单条数据~",
          type: "info"
        });
      } else {
        this.type = "edit";
        this.titleInfo = "修改物流公司";
        this.paramsView = Object.assign({}, this.selectRowData);
        this.dialogFormVisible_add = true;
      }
      // 清除选中状态，避免影响下个操作
      this.$refs.multipleTable.clearSelection();
    },
    // 点击查询按纽，按条件查询列表
    handleSearch(type) {
      switch (type) {
        case "search":
          break;
        case "clear":
          this.formInline = {
            companyName: "",
            mobile: "",
            authStatus: "AF0010403", // 已认证的状态码
            isVest: "0",
            contactsName: ""
          };
          break;
      }
      if (this.page != 1) {
        this.page = 1;
        this.$refs.pager.inputval = this.page;
        this.$refs.pager.pageNum = this.page;
      }
      this.firstblood();
    },
    // 判断选中与否
    getSelection(val) {
      //   console.log('选中内容', val)
      this.selected = val;
    },
    // 点击选中当前行
    clickDetails(row, event, column) {
      this.$refs.multipleTable.toggleRowSelection(row);
    },
    // 刷新页面
    firstblood() {
      data_LogisticsCompanyList(this.page, this.pagesize, this.formInline)
        .then(res => {
          this.totalCount = res.data.totalCount;
          this.tableData3 = res.data.list;
          this.loading = false;
        })
        .catch(err => {
          this.loading = false;
        });
    },
    pushOrderSerial(row) {
      this.type = "view";
      this.titleInfo = "物流公司信息";
      this.paramsView = row;
      this.dialogFormVisible_add = true;
    },
    getDataList() {
      this.firstblood();
    }
  }
};
</script>
<style>
</style>

