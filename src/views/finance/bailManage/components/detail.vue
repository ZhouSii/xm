<template>
  <div class="bailManageDetail commoncss">
    <el-dialog
      :title="typetitle"
      :visible="dialogDetailNotes"
      :modal-append-to-body="false"
      :before-close="close"
      top="5vh"
      :close-on-click-modal="false"
      ref="dialog"
    >
      <div style="height:100%">
        <el-table
          ref="multipleTable"
          style="width: 100%"
          stripe
          border
          height="100%"
          highlight-current-row
          :data="tableDataAll"
          tooltip-effect="dark"
        >
          <el-table-column label="序号" width="60">
            <template slot-scope="scope">{{ (page - 1)*pagesize + scope.$index + 1 }}</template>
          </el-table-column>
          <el-table-column label="交易流水号" prop="serial" show-overflow-tooltip min-width="230"></el-table-column>
          <el-table-column label="交易类型" prop="tradeTypeName" show-overflow-tooltip width="80"></el-table-column>
          <el-table-column label="资金流水号" prop="tradeNo" show-overflow-tooltip min-width="250"></el-table-column>
          <el-table-column
            label="收支类型"
            prop="incomeExpendTypeName"
            show-overflow-tooltip
            width="80"
          ></el-table-column>
          <el-table-column label="交易金额" prop="tradeAmount" show-overflow-tooltip width="80"></el-table-column>
          <el-table-column label="交易时间" prop="tradeTime" show-overflow-tooltip min-width="160"></el-table-column>
        </el-table>
      </div>
      <div class="info_tab_footer">
        共计:{{ dataTotal }}
        <div class="show_pager">
          <Pager :total="dataTotal" @change="handlePageChange" :sizes="sizes" ref="pager" />
        </div>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="close()">取 消</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { eventBus } from "@/eventBus";
import { parseTime, pickerOptions2 } from "@/utils/";
import { aflcMywalletDetailist } from "@/api/finance/bailManage.js";
import Pager from "@/components/Pagination/index";
export default {
  components: {
    Pager
  },
  props: {
    params: {
      type: [Object, Array]
    },
    typetitle: {
      type: String,
      default: ""
    },
    /*add新增，edit编辑，view查看*/
    editType: {
      type: String
    },
    dialogDetailNotes: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      defaultImg: "/static/test.jpg",
      formLabelWidth: "150px",
      pickerOptions2: { shortcuts: pickerOptions2 },
      btnsize: "mini",
      selectRowData: [],
      sizes: [10, 20, 50, 100],
      pagesize: 10, // 初始化加载数量
      page: 1, // 初始化页码
      totalCount: null,
      dataTotal: 0,
      tableDataAll: [],
      formAll: {
        accountId: null,
        recordType: "2"
      }
    };
  },
  watch: {
    dialogDetailNotes: {
      handler: function(val, oldVal) {
        if (!val) {
          this.$emit("getData");
          this.formAll = {
            accountId: null,
            recordType: "2"
          };
        } else {
          this.openDialog();
        }
      }
    }
  },
  methods: {
    openDialog: function() {
      this.formAll.accountId = this.params.accountId;
      this.firstblood();
    },
    close: function() {
      this.$emit("update:dialogDetailNotes", false);
    },
    firstblood() {
      aflcMywalletDetailist(this.page, this.pagesize, this.formAll).then(
        res => {
          this.dataTotal = res.data.totalCount;
          this.tableDataAll = res.data.list;
          this.tableDataAll.forEach(item => {
            item.tradeTime = parseTime(
              item.tradeTime,
              "{y}-{m}-{d} {h}:{i}:{s}"
            );
          });
        }
      );
    },
    // 每页显示数据量变更
    handlePageChange(obj) {
      this.page = obj.pageNum;
      this.pagesize = obj.pageSize;
      this.firstblood();
    }
  }
};
</script>
<style lang="scss" >
.bailManageDetail {
  .el-dialog {
    width: 1100px !important;
    .el-dialog__body {
      min-height: 450px;
    }
    .info_tab_footer {
      position: static;
    }
    .el-table {
      min-height: 370px;
    }
    .info_tab_footer {
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
