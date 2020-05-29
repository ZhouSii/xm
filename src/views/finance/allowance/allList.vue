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
      <el-form-item label="审批状态" v-if="statusType==null">
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
        <el-input clearable v-model="formAllData.serialNum" placeholder="请输入流水号" maxlength="25"></el-input>
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
          icon="el-icon-coin"
          plain
          :size="btnsize"
          @click="handleClick('approve')"
          v-if="statusType==='AF0850901'"
        >审批</el-button>
        <el-button
          type="primary"
          :size="btnsize"
          icon="el-icon-download"
          plain
          @click="importExcel"
        >导出Excel</el-button>
      </div>
      <div class="info_news">
        <el-table
          :ref="'multipleTable'+statusType"
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
            label="审批不通过原因"
            prop="noPassCause"
            sortable
            show-overflow-tooltip
            min-width="140"
            v-if="statusType==='AF0850903'"
          ></el-table-column>
          <el-table-column
            label="审批人"
            prop="auditor"
            sortable
            show-overflow-tooltip
            min-width="100"
            v-if="statusType==='AF0850902' || statusType==='AF0850903'"
          ></el-table-column>
          <el-table-column
            label="创建人"
            prop="creater"
            sortable
            show-overflow-tooltip
            min-width="100"
            v-else
          ></el-table-column>
          <el-table-column
            label="审批时间"
            prop="auditTime"
            sortable
            show-overflow-tooltip
            min-width="160"
            v-if="statusType==='AF0850902'||statusType==='AF0850903'"
          ></el-table-column>
          <el-table-column
            label="创建时间"
            prop="createTime"
            sortable
            show-overflow-tooltip
            min-width="160"
            v-else
          ></el-table-column>
          <el-table-column
            label="审批状态"
            prop="statusName"
            sortable
            show-overflow-tooltip
            v-if="statusType==null"
            min-width="100"
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
    <div class="commoncss">
      <el-dialog
        title="补贴审批"
        :visible="dialogFormVisible_approve"
        :modal-append-to-body="false"
        :before-close="close"
        top="20vh"
        :close-on-click-modal="false"
        ref="dialog"
      >
        <el-form :model="approveData">
          <el-row>
            <el-col :span="18">
              <el-form-item label="车主：" :label-width="formLabelWidth" prop="name">
                <el-input clearable v-model="approveData.name" disabled></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="18">
              <el-form-item label="补贴金额：" :label-width="formLabelWidth">
                <el-input clearable v-model="approveData.subsidyMoney" disabled></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="18">
              <el-form-item label="补贴行为分：" :label-width="formLabelWidth">
                <el-input clearable v-model="approveData.subsidyScore" disabled></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="18">
              <el-form-item label="审批是否通过：" :label-width="formLabelWidth">
                <el-radio v-model="approveData.approveStatus" label="AF0850902">是</el-radio>
                <el-radio v-model="approveData.approveStatus" label="AF0850903">否</el-radio>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row v-if="approveData.approveStatus=='AF0850903'">
            <el-col :span="18">
              <el-form-item label="审批不通过原因：" :label-width="formLabelWidth">
                <el-input
                  clearable
                  v-model="approveData.rejectReason"
                  type="textarea"
                  maxlength="50"
                  placeholder="请输入审批不通过原因"
                  show-word-limit
                ></el-input>
                <!-- <p class="countNum" style="text-align:right">
                  <span style="color:red">{{approveData.rejectReason.length}}</span>
                  <span>/50</span>
                </p>-->
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button type="primary" @click="operatedata">确 定</el-button>
          <el-button @click="close()">取 消</el-button>
        </div>
      </el-dialog>
    </div>
  </div>
</template>
<script>
import {
  aflcSubsidyList,
  aflcSubsidyExportExcel,
  aflcSubsidyAudit
} from "@/api/service/applyAllowance";
import Pager from "@/components/Pagination/index";
import { parseTime, pickerOptions2 } from "@/utils/";
import { getDictionary } from "@/api/common.js";
export default {
  data() {
    return {
      loading: true,
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
      approvalStatusList: [],
      formAllData: {
        name: null,
        orderSerial: null,
        createTimeStart: null,
        createTimeEnd: null,
        status: null,
        serialNum: null,
        status: this.statusType,
        selected: []
      },
      created: [],
      dialogFormVisible_approve: false,
      formLabelWidth: "250px",
      approveData: {
        name: null,
        subsidyMoney: null,
        subsidyScore: null,
        approveStatus: null,
        rejectReason: ""
      }
    };
  },
  props: {
    isvisible: {
      type: Boolean,
      default: false
    },
    statusType: {
      type: String,
      default: null
    },
    statusTypeName: {
      type: String,
      default: null
    }
  },
  components: {
    Pager
  },
  watch: {
    isvisible: {
      handler(newVal, oldVal) {
        if (newVal) {
          setTimeout(() => {
            this.$refs["multipleTable" + this.statusType].$el.style.height =
              this.$refs["multipleTable" + this.statusType].$el.offsetHeight +
              "px";
          }, 300);
          this.firstblood();
          getDictionary("AF08509").then(res => {
            this.approvalStatusList = res.data;
          });
        }
      },
      immediate: true
    }
  },
  methods: {
    importExcel() {
      this.selectRowData.forEach(item => {
        this.formAllData.selected.push(item.id);
      });
      this.$message.info("正在导出中...");
      let href = "";
      aflcSubsidyExportExcel(0, 0, this.formAllData).then(res => {
        this.formAllData.selected = [];
        var blob = new Blob([res]);
        href = window.URL.createObjectURL(blob);
        var NewDom = document.createElement("a");
        NewDom.setAttribute("href", href);
        NewDom.setAttribute("target", "_blank");
        NewDom.setAttribute(
          "download",
          "补贴申请-" +
            this.statusTypeName +
            "_" +
            parseTime(new Date(), "{y}{m}{d}{h}{i}{s}") +
            ".xls"
        );
        document.body.appendChild(NewDom);
        NewDom.click();
        document.body.removeChild(NewDom);
      });
    },
    // 列表刷新页面
    firstblood() {
      this.loading = true;
      aflcSubsidyList(this.page, this.pagesize, this.formAllData)
        .then(res => {
          this.dataTotal = res.data.totalCount;
          this.tableDataAll = res.data.list;
          this.tableDataAll.forEach(item => {
            item.createTime = parseTime(
              item.createTime,
              "{y}-{m}-{d} {h}:{i}:{s}"
            );
            item.auditTime = parseTime(
              item.auditTime,
              "{y}-{m}-{d} {h}:{i}:{s}"
            );
          });
          this.loading = false;
        })
        .catch(err => {
          this.loading = false;
          this.$message.error(err.errorInfo || err.text);
        });
    },
    // 申请时间
    cTime(i) {
      if (i) {
        this.formAllData.createStartTime = i[0];
        this.formAllData.createEndTime = i[1];
      } else {
        this.formAllData.createStartTime = "";
        this.formAllData.createEndTime = "";
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
        serialNum: null,
        status: this.statusType
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
      if (this.selectRowData.length == 0) {
        return this.$message.warning("请选择您要操作的数据");
      } else if (this.selectRowData.length > 1 && type == "approve") {
        this.$message({
          message: "每次只能操作单条数据~",
          type: "warning"
        });
        this.$refs["multipleTable" + this.statusType].clearSelection();
      } else {
        switch (type) {
          case "approve":
            this.dialogFormVisible_approve = true;
            this.approveData = this.selectRowData[0];
            break;
        }
      }
    },
    // 判断选中与否
    getSelection(val) {
      console.log("选中内容", val);
      this.selectRowData = val;
    },
    // 点击选中当前行
    clickDetails(row, event, column) {
      this.$refs["multipleTable" + this.statusType].toggleRowSelection(row);
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
      this.$refs["multipleTable" + this.statusType].clearSelection();
    },
    // 详情弹窗
    pushOrderSerial(item) {
      this.$router.push({
        name: "订单详情",
        query: { orderSerial: item.orderSerial }
      });
    },
    //跳转到车主详情页
    pushDriverDetail(item) {
      this.$router.push({
        name: "车主详情",
        query: { driverId: item.userId }
      });
      sessionStorage.getItem("CZdetailsName", "financial");
    },
    operatedata() {
      this.$message.info("正在操作中....");
      aflcSubsidyAudit({
        id: this.selectRowData[0].id,
        status: this.approveData.approveStatus,
        noPassCause: this.approveData.rejectReason
      })
        .then(res => {
          this.$message.success(res.text);
          this.close();
          this.firstblood();
        })
        .catch(err => {
          this.$message.error(err.errorInfo || err.text);
        });
    },
    close() {
      this.dialogFormVisible_approve = false;
    }
  }
};
</script>
<style lang="scss">
</style>

