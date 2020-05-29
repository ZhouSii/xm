<template>
  <div class="identicalStyle" style="height:100%" v-loading="loading">
    <el-form :inline="true" class="demo-ruleForm classify_searchinfo">
      <el-form-item label="订单号">
        <el-input clearable v-model="formAllData.orderSerial" maxlength="25" placeholder="请输入订单号"></el-input>
      </el-form-item>
      <el-form-item label="用户名称">
        <el-input clearable v-model="formAllData.name" maxlength="20" placeholder="账户/姓名/车牌号"></el-input>
      </el-form-item>
      <el-form-item label="创建时间">
        <el-date-picker
          v-model="created"
          type="daterange"
          unlink-panels
          :picker-options="pickerOptions2"
          range-separator="-"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          :default-time="['00:00:00', '23:59:59']"
          @change="cTime"
        ></el-date-picker>
      </el-form-item>
      <el-form-item label="审批状态">
        <el-select v-model="formAllData.status" clearable placeholder="请选择">
          <el-option
            v-for="item in approvalStatusList"
            :key="item.code"
            :label="item.name"
            :value="item.code"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="流水号">
        <el-input clearable v-model="formAllData.serialNum" maxlength="25" placeholder="请输入流水号"></el-input>
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
          icon="el-icon-circle-plus"
          plain
          :size="btnsize"
          @click="handleClick('add')"
          v-has:CUSTOM_SUBSIDYAPPLICATION_ADD
        >新增</el-button>
        <el-button
          type="primary"
          icon="el-icon-edit"
          plain
          :disabled="btnstatus"
          :size="btnsize"
          @click="handleClick('edit')"
          v-has:CUSTOM_SUBSIDYAPPLICATION_MODIFY
        >修改/重新提交</el-button>
        <el-button
          type="primary"
          :size="btnsize"
          icon="el-icon-download"
          plain
          @click="importExcel"
          v-has:CUSTOM_SUBSIDYAPPLICATION_EXPORT
        >导出Excel</el-button>
      </div>
      <div class="info_news">
        <el-table
          ref="multipleTable"
          style="width: 100%"
          stripe
          border
          height="100%"
          @selection-change="getSelection"
          @row-click="clickDetails"
          highlight-current-row
          :data="tableDataAll"
          tooltip-effect="dark"
        >
          <el-table-column label="选择" type="selection" width="50"></el-table-column>
          <el-table-column label="序号" width="60">
            <template slot-scope="scope">{{ (page - 1)*pagesize + scope.$index + 1 }}</template>
          </el-table-column>
          <el-table-column
            label="流水号"
            prop="serialNum"
            sortable
            show-overflow-tooltip
            min-width="220"
          ></el-table-column>
          <el-table-column
            label="订单号"
            prop="orderSerial"
            sortable
            show-overflow-tooltip
            min-width="230"
          >
            <template slot-scope="scope">
              <h4
                class="needMoreInfo"
                @click="pushOrderSerial(scope.row)"
              >{{ scope.row.orderSerial}}</h4>
            </template>
          </el-table-column>
          <el-table-column
            label="用户类型"
            prop="userTypeName"
            sortable
            show-overflow-tooltip
            min-width="100"
          ></el-table-column>
          <el-table-column label="用户名称" prop="name" sortable show-overflow-tooltip min-width="250">
            <template slot-scope="scope">
              <h4 class="needMoreInfo" @click="pushDriverDetail(scope.row)">{{ scope.row.name}}</h4>
            </template>
          </el-table-column>
          <el-table-column
            label="补贴金额"
            prop="subsidyMoney"
            sortable
            show-overflow-tooltip
            min-width="100"
          ></el-table-column>
          <el-table-column
            label="补贴行为分"
            prop="subsidyScore"
            sortable
            show-overflow-tooltip
            min-width="100"
          ></el-table-column>
          <el-table-column
            label="补贴原因"
            prop="subsidyCauseView"
            sortable
            show-overflow-tooltip
            min-width="140"
          ></el-table-column>
          <el-table-column
            label="创建人"
            prop="creater"
            sortable
            show-overflow-tooltip
            min-width="100"
          ></el-table-column>
          <el-table-column
            label="创建时间"
            prop="createTime"
            sortable
            show-overflow-tooltip
            min-width="160"
          ></el-table-column>
          <el-table-column
            label="修改人"
            prop="updater"
            sortable
            show-overflow-tooltip
            min-width="100"
          ></el-table-column>
          <el-table-column
            label="修改时间"
            prop="updateTime"
            sortable
            show-overflow-tooltip
            min-width="160"
          ></el-table-column>
          <el-table-column
            label="审批状态"
            prop="statusName"
            sortable
            show-overflow-tooltip
            min-width="120"
          ></el-table-column>
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
    <operation
      :params="editPassData"
      :editType="type"
      :typetitle="typetitle"
      :dialogFormVisible_add.sync="dialogFormVisible_add"
      @getData="getDataList"
    />
  </div>
</template>
<script>
import Pager from "@/components/Pagination/index";
import { parseTime, pickerOptions2 } from "@/utils/";
import operation from "./operation";
import { getDictionary } from "@/api/common.js";
import {
  aflcSubsidyList,
  aflcSubsidyExportExcel
} from "@/api/service/applyAllowance";
export default {
  data() {
    return {
      loading: false,
      pickerOptions2: { shortcuts: pickerOptions2 },
      btnsize: "mini",
      selectRowData: [],
      paramsId: null,
      type: "", //新增或者修改或者详情
      typetitle: "", //新增或者详情title
      selectId: [],
      sizes: [20, 50, 100, 400],
      pagesize: 20, // 初始化加载数量
      page: 1, // 初始化页码
      totalCount: null,
      dataTotal: 0,
      tableDataAll: [],
      formAllData: {
        name: null,
        orderSerial: null,
        createTimeStart: null,
        createTimeEnd: null,
        status: null,
        serialNum: null,
        selected: []
      },
      approvalStatusList: [],
      created: [],
      dialogFormVisible_add: false,
      editPassData: [],
      btnstatus: false
    };
  },
  components: {
    Pager,
    operation
  },
  mounted() {
    getDictionary("AF08509").then(res => {
      this.approvalStatusList = res.data;
    });
    this.firstblood();
  },
  methods: {
    importExcel() {
      this.selectRowData.forEach(item => {
        this.formAllData.selected.push(item.id);
      });
      this.$message.info("正在导出中...");
      let href = "";
      aflcSubsidyExportExcel(0, 0, this.formAllData, this.selected).then(
        res => {
          this.formAllData.selected = [];
          var blob = new Blob([res]);
          href = window.URL.createObjectURL(blob);
          var NewDom = document.createElement("a");
          NewDom.setAttribute("href", href);
          NewDom.setAttribute("target", "_blank");
          NewDom.setAttribute(
            "download",
            "补贴申请-" + parseTime(new Date(), "{y}{m}{d}{h}{i}{s}") + ".xls"
          );
          document.body.appendChild(NewDom);
          NewDom.click();
          document.body.removeChild(NewDom);
        }
      );
    },
    // 列表刷新页面
    firstblood() {
      this.loading = false;
      aflcSubsidyList(this.page, this.pagesize, this.formAllData).then(res => {
        this.dataTotal = res.data.totalCount;
        this.tableDataAll = res.data.list;
        this.tableDataAll.forEach(item => {
          item.createTime = parseTime(
            item.createTime,
            "{y}-{m}-{d} {h}:{i}:{s}"
          );
          item.updateTime = parseTime(
            item.updateTime,
            "{y}-{m}-{d} {h}:{i}:{s}"
          );
        });
        this.loading = false;
      });
    },
    // 申请时间
    cTime(i) {
      if (i) {
        this.formAllData.createTimeStart = i[0];
        this.formAllData.createTimeEnd = i[1];
      } else {
        this.formAllData.createTimeStart = "";
        this.formAllData.createTimeEnd = "";
      }
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
        name: null,
        orderSerial: null,
        createTimeStart: null,
        createTimeEnd: null,
        status: null,
        serialNum: null
      };
      if (this.page != 1) {
        this.page = 1;
        this.$refs.pager.inputval = this.page;
        this.$refs.pager.pageNum = this.page;
      }
      this.created = [];
      this.firstblood();
    },
    handleClick(type) {
      if (this.selectRowData.length == 0 && type != "add") {
        return this.$message.warning("请选择您要操作的数据");
      } else if (this.selectRowData.length > 1 && type != "add") {
        this.$message({
          message: "每次只能操作单条数据~",
          type: "warning"
        });
        this.$refs.multipleTable.clearSelection();
      } else {
        switch (type) {
          case "add":
            this.type = "add";
            this.typetitle = "新增补贴申请";
            this.dialogFormVisible_add = true;
            break;
          case "edit":
            this.type = "edit";
            this.dialogFormVisible_add = true;
            this.editPassData = this.selectRowData;
            this.editPassData[0].name = this.editPassData[0].name.split("-")[1];
            if (this.editPassData[0].subsidyCause == null) {
              this.editPassData[0].subsidyCause = "";
            }
            if (this.editPassData[0].statusName == "审批不通过") {
              this.typetitle = "重新提交";
            } else {
              this.typetitle = "修改";
            }
            // console.log(this.editPassData);
            break;
        }
      }
    },
    // 判断选中与否
    getSelection(val) {
      console.log("选中内容", val);
      this.selectRowData = val;
      if (
        this.selectRowData.length == 1 &&
        this.selectRowData[0].statusName !== "已审批"
      ) {
        this.btnstatus = false;
      } else {
        this.btnstatus = true;
      }
    },
    // 点击选中当前行
    clickDetails(row, event, column) {
      this.$refs.multipleTable.toggleRowSelection(row);
    },
    // 每页显示数据量变更
    handlePageChange(obj) {
      this.page = obj.pageNum;
      this.pagesize = obj.pageSize;
      this.firstblood();
    },
    getDataList() {
      this.firstblood();
      this.paramsId = null;
      this.$refs.multipleTable.clearSelection();
    },
    // 详情弹窗
    pushOrderSerial(item) {
      this.$router.push({
        name: "订单详情",
        query: { orderSerial: item.orderSerial }
      });
    },
    pushDriverDetail(item) {
      this.$router.push({
        name: "车主详情",
        query: { driverId: item.userId }
      });
      sessionStorage.getItem("CZdetailsName", "financial");
    }
  }
};
</script>
<style lang="scss">
</style>

