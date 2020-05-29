<template>
  <div class="identicalStyle" style="height:100%" v-loading="loading">
    <el-form :inline="true" class="demo-ruleForm classify_searchinfo">
      <el-form-item label="账户名">
        <el-input clearable v-model="formAllData.accountName"></el-input>
      </el-form-item>
      <el-form-item label="账户号">
        <el-input clearable v-model="formAllData.accountNum"></el-input>
      </el-form-item>
      <el-form-item label="账户类型">
        <el-select v-model="formAllData.accountType" clearable placeholder="请选择">
          <el-option
            v-for="item in businessTypeList"
            :key="item.code"
            :label="item.name"
            :value="item.code"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="状态">
        <el-select v-model="formAllData.status" clearable placeholder="请选择">
          <el-option
            v-for="item in usingStatusList"
            :key="item.code"
            :label="item.name"
            :value="item.code"
          ></el-option>
        </el-select>
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
        >新增</el-button>
        <el-button
          type="primary"
          icon="el-icon-edit"
          plain
          :size="btnsize"
          @click="handleClick('edit')"
        >修改</el-button>
        <el-button
          type="primary"
          plain
          icon="el-icon-bell"
          @click="handleClick('UseStates')"
          :size="btnsize"
        >启用/停用</el-button>
        <el-button
          type="primary"
          plain
          icon="el-icon-coin"
          @click="handleClick('detail')"
          :size="btnsize"
        >查看明细</el-button>
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
          @selection-change="getSelection"
          @row-click="clickDetails"
          tooltip-effect="dark"
        >
          <el-table-column label="选择" type="selection" width="50"></el-table-column>
          <el-table-column label="序号" width="60">
            <template slot-scope="scope">{{ (page - 1)*pagesize + scope.$index + 1 }}</template>
          </el-table-column>
          <el-table-column
            label="账户类型"
            prop="accountTypeName"
            sortable
            show-overflow-tooltip
            width="120"
          ></el-table-column>
          <el-table-column
            label="账户名"
            prop="accountName"
            sortable
            show-overflow-tooltip
            min-width="150"
          ></el-table-column>
          <el-table-column
            label="账户号"
            prop="accountNum"
            sortable
            show-overflow-tooltip
            min-width="220"
          ></el-table-column>
          <el-table-column
            label="收入总额(元)"
            prop="incomeAmount"
            sortable
            show-overflow-tooltip
            min-width="150"
          ></el-table-column>
          <el-table-column
            label="支出总额(元)"
            prop="expendAmount"
            sortable
            show-overflow-tooltip
            min-width="150"
          ></el-table-column>
          <el-table-column
            label="收支差额(元)"
            prop="diffAmount"
            sortable
            show-overflow-tooltip
            min-width="150"
          ></el-table-column>
          <el-table-column
            label="资金账户类型"
            prop="capitalAccountTypeName"
            sortable
            show-overflow-tooltip
            min-width="150"
          ></el-table-column>
          <el-table-column
            label="所属银行"
            prop="accountBank"
            sortable
            show-overflow-tooltip
            min-width="200"
          ></el-table-column>
          <el-table-column label="状态" prop="status" sortable show-overflow-tooltip min-width="120">
            <template slot-scope="scope">
              <span
                :class="{blackName: scope.row.status == '0',normalName :scope.row.status == '1'}"
              >{{scope.row.status=='1'?'启用':'禁用'}}</span>
            </template>
          </el-table-column>
          <el-table-column label="操作记录" width="120">
            <template slot-scope="scope">
              <h4 @click="handleClick('record',scope.row)" class="needMoreInfo">查看</h4>
            </template>
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
    <operate
      :params="editPassData"
      :editType="type"
      :typetitle="typetitle"
      :dialogFormVisible_add.sync="dialogFormVisible_add"
      @getData="getDataList"
    />
    <record
      :dialogFormVisible_view.sync="dialogFormVisible_view"
      :params="recordPassData"
      @getData="getDataList"
      :editType="type"
    />
  </div>
</template>
<script>
import {
  data_aflcFundAccount,
  openOrForbidden
} from "@/api/finance/banktransaction";
import { getDictionary } from "@/api/common.js";
import Pager from "@/components/Pagination/index";
import { parseTime, pickerOptions2 } from "@/utils/";
import operate from "./operate";
import record from "./record";
export default {
  data() {
    return {
      loading: false,
      pickerOptions2: { shortcuts: pickerOptions2 },
      btnsize: "mini",
      selectRowData: [],
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
        accountName: null,
        accountNum: null,
        accountType: null,
        status: null
      },
      businessTypeList: [], //账户类型
      usingStatusList: [
        { code: "1", name: "启用" },
        { code: "0", name: "禁用" }
      ], //启用，禁用
      dialogFormVisible_add: false,
      dialogFormVisible_view: false,
      recordPassData: [],
      editPassData: []
    };
  },
  components: {
    Pager,
    operate,
    record
  },
  watch: {},
  methods: {
    // 获取  服务和车辆 类型列表
    getMoreInformation() {
      getDictionary("AF089").then(res => {
        this.businessTypeList = res.data;
      });
    },
    // 列表刷新页面
    firstblood() {
      this.loading = true;
      data_aflcFundAccount(this.page, this.pagesize, this.formAllData).then(
        res => {
          this.dataTotal = res.data.totalCount;
          this.tableDataAll = res.data.list;
          this.tableDataAll.forEach(item => {
            item.createTime = parseTime(
              item.createTime,
              "{y}-{m}-{d} {h}:{i}:{s}"
            );
          });
          this.loading = false;
        }
      );
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
        accountName: null,
        accountNum: null,
        accountType: null,
        status: null
      };
      if (this.page != 1) {
        this.page = 1;
        this.$refs.pager.inputval = this.page;
        this.$refs.pager.pageNum = this.page;
      }
      this.firstblood();
    },
    handleClick(type, row) {
      if (this.selectRowData.length == 0 && type != "add" && type != "record") {
        return this.$message.warning("请选择您要操作的数据");
      } else if (
        this.selectRowData.length > 1 &&
        type != "add" &&
        type != "record"
      ) {
        this.$message({
          message: "每次只能操作单条数据~",
          type: "warning"
        });
        this.$refs.multipleTable.clearSelection();
      } else {
        switch (type) {
          case "add":
            this.type = "add";
            this.typetitle = "新增";
            this.dialogFormVisible_add = true;
            break;
          case "edit":
            this.type = "edit";
            this.typetitle = "修改";
            this.dialogFormVisible_add = true;
            this.editPassData = this.selectRowData;
            console.log(this.editPassData);
            break;
          case "UseStates":
            let status;
            if (this.selectRowData[0].status == 1) {
              status = 0;
            } else {
              status = 1;
            }
            this.$message.info("正在操作中...");
            openOrForbidden([this.selectRowData[0].id])
              .then(res => {
                if (status == 0) {
                  this.$message.warning("已禁用");
                } else {
                  this.$message.success("已启用");
                }
                this.firstblood();
              })
              .catch(err => {
                this.$message.error(err.errorInfo);
              });
            break;
          case "detail":
            this.$router.push({
              name: "内部资金账户明细",
              query: {
                id: this.selectRowData[0].id,
                accountName: this.selectRowData[0].accountName,
                accountNum: this.selectRowData[0].accountNum
              }
            });
            break;
          case "record":
            this.dialogFormVisible_view = true;
            this.recordPassData = row;
            this.$refs.multipleTable.toggleRowSelection(row);
        }
      }
      this.$refs.multipleTable.clearSelection();
    },
    //进入详情
    JoinDetail(i) {
      this.type = "view";
      this.typetitle = "详情";
      this.dialogFormVisible_add = true;
      this.paramsId = i.id;
    },
    // 判断选中与否
    getSelection(val) {
      console.log("选中内容", val);
      this.selectRowData = val;
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
      this.$refs.multipleTable.clearSelection();
    }
  },
  mounted() {
    this.getMoreInformation();
    this.firstblood();
  }
};
</script>
<style lang="scss">
.needMoreInfoSpan {
  cursor: pointer;
  color: #3e9ff1;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  font-weight: bold;
  margin: 0px 5px;
}
</style>

