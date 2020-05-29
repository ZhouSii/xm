<template>
  <div class="identicalStyle" style="height:100%" v-loading="loading">
    <el-form :inline="true" class="demo-ruleForm classify_searchinfo">
      <el-form-item label="区域">
        <el-input clearable v-model="formAllData.pubCityName"></el-input>
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
          v-has:MARKETING_MARKETINGADVERTISEMENT_ADD
        >新增</el-button>
        <el-button
          type="primary"
          icon="el-icon-edit"
          plain
          :size="btnsize"
          @click="handleClick('edit')"
          v-has:MARKETING_MARKETINGADVERTISEMENT_MODIFY
        >修改</el-button>
        <el-button
          type="primary"
          plain
          icon="el-icon-bell"
          @click="handleClick('UseStates')"
          :size="btnsize"
          v-has:MARKETING_MARKETINGADVERTISEMENT_ENABLEDISABLE
        >启用/禁用</el-button>
      </div>
      <div class="info_news">
        <el-table
          ref="multipleTable"
          style="width: 100%"
          stripe
          border
          align="center"
          height="100%"
          highlight-current-row
          :data="tableDataAll"
          @selection-change="getSelection"
          @row-click="clickDetails"
          tooltip-effect="dark"
        >
          <el-table-column label="选择" type="selection" width="50" align="center"></el-table-column>
          <el-table-column label="序号" width="60">
            <template slot-scope="scope">{{ (page - 1)*pagesize + scope.$index + 1 }}</template>
          </el-table-column>
          <el-table-column
            label="发布城市"
            prop="pubCityName"
            sortable
            show-overflow-tooltip
            min-width="200"
          ></el-table-column>
          <el-table-column
            label="应用端"
            prop="appTerminalName"
            sortable
            show-overflow-tooltip
            min-width="150"
          ></el-table-column>
          <el-table-column
            label="广告位"
            prop="advLocationName"
            sortable
            show-overflow-tooltip
            min-width="200"
          ></el-table-column>
          <el-table-column label="展示时间" sortable show-overflow-tooltip min-width="220">
            <template slot-scope="scope">
              <span>{{scope.row.showTimeStart | parseTime("{y}-{m}-{d}")}} 至 {{scope.row.showTimeEnd | parseTime("{y}-{m}-{d}")}}</span>
            </template>
          </el-table-column>
          <el-table-column
            label="状态"
            prop="advStatusName"
            sortable
            show-overflow-tooltip
            min-width="120"
          >
            <template slot-scope="scope">
              <span
                :class="{blackName: scope.row.advStatus == '0',normalName :scope.row.advStatus == '1'}"
              >{{scope.row.advStatusName}}</span>
            </template>
          </el-table-column>
          <el-table-column
            label="最新操作人"
            prop="operatorName"
            sortable
            show-overflow-tooltip
            min-width="160"
          ></el-table-column>
          <el-table-column
            label="最新操作时间"
            prop="updateTime"
            sortable
            show-overflow-tooltip
            min-width="200"
          >
            <template slot-scope="scope">{{scope.row.updateTime|parseTime}}</template>
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
      :adsDialogFormVisible.sync="adsDialogFormVisible"
      @getData="getDataList"
    />
  </div>
</template>
<script>
import {
  marketingAdvSettingsList,
  marketingAdvSettingsDisable,
  marketingAdvSettingsEnable
} from "@/api/marketing/adsConfig";
import { getDictionary } from "@/api/common.js";
import Pager from "@/components/Pagination/index";
import { parseTime, pickerOptions2 } from "@/utils/";
import operate from "./operate";
export default {
  data() {
    return {
      loading: false,
      pickerOptions2: { shortcuts: pickerOptions2 },
      btnsize: "mini",
      selectRowData: [],
      type: "", //新增或者修改或者详情
      typetitle: "", //新增或者详情title
      sizes: [20, 50, 100, 400],
      pagesize: 20, // 初始化加载数量
      page: 1, // 初始化页码
      totalCount: null,
      dataTotal: 0,
      tableDataAll: [],
      formAllData: {
        pubCityName: null
      },
      adsDialogFormVisible: false,
      editPassData: []
    };
  },
  components: {
    Pager,
    operate
  },
  watch: {},
  methods: {
    // 列表刷新页面
    firstblood() {
      this.loading = true;
      marketingAdvSettingsList(this.page, this.pagesize, this.formAllData)
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
        pubCityName: null
      };
      if (this.page != 1) {
        this.page = 1;
        this.$refs.pager.inputval = this.page;
        this.$refs.pager.pageNum = this.page;
      }
      this.firstblood();
    },
    handleClick(type, row) {
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
            this.typetitle = "新增";
            this.adsDialogFormVisible = true;
            break;
          case "edit":
            this.type = "edit";
            this.typetitle = "修改";
            this.adsDialogFormVisible = true;
            this.editPassData = this.selectRowData[0];
            break;
          case "UseStates":
            this.$message.info("正在操作中...");
            if (this.selectRowData[0].advStatus == 0) {
              marketingAdvSettingsEnable(this.selectRowData[0].id)
                .then(res => {
                  this.$message.success("已启用");
                  this.firstblood();
                })
                .catch(err => {
                  this.$message.error(err.errorInfo || err.text);
                });
            } else {
              marketingAdvSettingsDisable(this.selectRowData[0].id)
                .then(res => {
                  this.$message.success("已禁用");
                  this.firstblood();
                })
                .catch(err => {
                  this.$message.error(err.errorInfo || err.text);
                });
            }
            break;
        }
      }
      this.$refs.multipleTable.clearSelection();
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
    this.firstblood();
  }
};
</script>
<style lang="scss">
</style>

