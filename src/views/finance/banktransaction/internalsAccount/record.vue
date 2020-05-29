<template>
  <div class="commoncss recordDetailTable">
    <el-dialog
      :modal-append-to-body="false"
      :title="typetitle"
      top="6vh"
      :before-close="close"
      :close-on-click-modal="false"
      ref="dialog"
      :visible="dialogFormVisible_view"
    >
      <el-row>
        <el-col :span="12">
          <p>
            <span>创建时间：</span>
            <span>{{params.createTime|parseTime}}</span>
          </p>
        </el-col>
        <el-col :span="12">
          <p>
            <span>创建人：</span>
            <span>{{params.creater}}</span>
          </p>
        </el-col>
      </el-row>
      <el-row style="margin-top:30px; margin-bottom:20px">
        <el-col>
          <h3>修改记录</h3>
        </el-col>
      </el-row>
      <div style="height:100%">
        <el-table
          style="width: 100%"
          height="100%"
          stripe
          border
          highlight-current-row
          :data="tableDataAll"
          tooltip-effect="dark"
          v-loading="loading"
        >
          <el-table-column label="账户类型" prop="accountType" sortable show-overflow-tooltip></el-table-column>
          <el-table-column label="账户名" prop="accountName" sortable show-overflow-tooltip></el-table-column>
          <el-table-column label="账户号" prop="accountNum" sortable show-overflow-tooltip></el-table-column>
          <el-table-column
            label="资金账户类型"
            prop="capitalAccountTypeName"
            sortable
            show-overflow-tooltip
          ></el-table-column>
          <el-table-column label="所属银行" prop="accountBank" sortable show-overflow-tooltip></el-table-column>
          <el-table-column label="操作人" prop="creater" sortable show-overflow-tooltip></el-table-column>
          <el-table-column
            label="操作时间"
            prop="createTime"
            sortable
            show-overflow-tooltip
            width="160"
          ></el-table-column>
        </el-table>
      </div>
      <!-- <div class="info_tab_footer">
        共计:{{ dataTotal }}
        <div class="show_pager">
          <Pager :total="dataTotal" @change="handlePageChange" :sizes="sizes" ref="pager" />
        </div>
      </div>-->
      <div slot="footer" class="dialog-footer">
        <el-button @click="close()" type="primary">关闭</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { data_aflcFundAccountReviseDetail } from "@/api/finance/banktransaction";
import { parseTime } from "@/utils/";
import Pager from "@/components/Pagination/index";
export default {
  data() {
    return {
      tableDataAll: [],
      typetitle: "操作详情",
      loading: true,
      dataTotal: 0,
      sizes: [10, 20, 50, 100],
      pagesize: 10, // 初始化加载数量
      page: 1 // 初始化页码
    };
  },
  components: {
    Pager
  },
  props: {
    dialogFormVisible_view: {
      type: Boolean,
      default: false
    },
    params: {
      type: [Object, Array]
    },
    editType: {
      type: String
    }
  },
  methods: {
    openDialog: function() {
      this.loading = true;
      data_aflcFundAccountReviseDetail(this.params.id).then(res => {
        this.tableDataAll = res.data;
        this.dataTotal = res.data.length;
        this.tableDataAll.forEach(item => {
          item.createTime = parseTime(
            item.createTime,
            "{y}-{m}-{d} {h}:{i}:{s}"
          );
        });
        this.loading = false;
      });
    },
    close: function() {
      this.$emit("update:dialogFormVisible_view", false);
    },
    // 每页显示数据量变更
    handlePageChange(obj) {
      this.page = obj.pageNum;
      this.pagesize = obj.pageSize;
      this.firstblood();
    }
  },
  watch: {
    dialogFormVisible_view: {
      handler: function(val, oldVal) {
        if (!val) {
          this.$emit("getData");
        } else {
          this.openDialog();
        }
      }
    }
  }
};
</script>
<style lang="scss" scoped>
.recordDetailTable {
  .el-dialog {
    .el-dialog__body {
      min-height: 450px;
    }
    .el-table {
      min-height: 370px;
    }
    .info_tab_footer {
      position: static;
      .el-input__inner {
        width: 50px;
      }
      .tms-pagination__sizes {
        line-height: 40px;
      }
      .el-input--suffix {
        .el-input__inner {
          width: 70px;
        }
      }
    }
  }
}
</style>