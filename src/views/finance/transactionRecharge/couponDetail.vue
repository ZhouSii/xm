<template>
  <div class="commoncss couponDetailTable">
    <el-dialog
      :modal-append-to-body="false"
      title="查看"
      top="6vh"
      :before-close="close"
      :close-on-click-modal="false"
      ref="dialog"
      :visible="couponDetaildialogFormVisible"
      width="70%"
    >
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
          <el-table-column label="序号" width="50">
            <template slot-scope="scope">{{ (page - 1)*pagesize + scope.$index + 1 }}</template>
          </el-table-column>
          <el-table-column label="活动名称" prop="activityName" min-width="100" show-overflow-tooltip>
            <!-- <template slot-scope="scoped">
              <h4
                class="needMoreInfo"
                @click="activityNameOperate(scoped.row)"
              >{{scoped.row.activityName}}</h4>
            </template>-->
          </el-table-column>
          <!-- <el-table-column label="活动类型" prop="activityTypeName" width="140" show-overflow-tooltip></el-table-column> -->
          <el-table-column
            label="活动创建时间"
            prop="createTime"
            sortable
            min-width="140"
            show-overflow-tooltip
          >
            <template slot-scope="scope">
              <span>{{ scope.row.createTime | parseTime}}</span>
            </template>
          </el-table-column>
          <!-- <el-table-column
            label="活动所属区域"
            prop="areaFullName"
            sortable
            width="150"
            show-overflow-tooltip
          ></el-table-column>-->
          <el-table-column
            label="优惠券名称"
            prop="couponName"
            sortable
            min-width="130"
            show-overflow-tooltip
          ></el-table-column>
          <el-table-column
            label="优惠券类型"
            prop="couponType"
            sortable
            min-width="130"
            show-overflow-tooltip
          ></el-table-column>
          <el-table-column
            label="金额/折扣"
            prop="remissionDiscount"
            sortable
            min-width="130"
            show-overflow-tooltip
          ></el-table-column>
          <el-table-column
            label="优惠券码"
            prop="couponNum"
            sortable
            min-width="130"
            show-overflow-tooltip
          ></el-table-column>
          <!-- <el-table-column label="联系人" prop="contacts" sortable width="130" show-overflow-tooltip></el-table-column> -->
          <el-table-column label="货主" prop="mobile" sortable min-width="130" show-overflow-tooltip>
            <!-- <template slot-scope="scoped">
              <h4 class="needMoreInfo" @click="mobileOperate(scoped.row)">{{scoped.row.mobile}}</h4>
            </template>-->
          </el-table-column>
          <el-table-column
            label="派发时间"
            prop="grantTime"
            sortable
            min-width="160"
            show-overflow-tooltip
          >
            <template slot-scope="scope">
              <span>{{ scope.row.grantTime | parseTime}}</span>
            </template>
          </el-table-column>
          <el-table-column
            label="过期时间"
            prop="endTime"
            sortable
            min-width="160"
            show-overflow-tooltip
          >
            <template slot-scope="scope">
              <span>{{ scope.row.endTime | parseTime}}</span>
            </template>
          </el-table-column>
          <!-- <el-table-column
            label="优惠券领取人"
            prop="belongSalesmanName"
            sortable
            width="160"
            show-overflow-tooltip
          ></el-table-column>-->
          <el-table-column
            label="券码状态"
            prop="couponStatus"
            sortable
            min-width="110"
            show-overflow-tooltip
          ></el-table-column>
          <el-table-column
            label="订单号"
            prop="orderSerial"
            sortable
            min-width="220"
            show-overflow-tooltip
          >
            <template slot-scope="scoped">
              <h4
                class="needMoreInfo"
                @click="orderSerialOperate(scoped.row)"
              >{{scoped.row.orderSerial}}</h4>
            </template>
          </el-table-column>
          <el-table-column
            label="订单金额"
            prop="totalAmount"
            sortable
            min-width="110"
            show-overflow-tooltip
          ></el-table-column>
          <!-- <el-table-column label="操作" sortable width="100">
            <template slot-scope="scoped">
              <h4 class="needMoreInfo" @click="couponOperate(scoped.row)">相关信息</h4>
            </template>
          </el-table-column>-->
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
import { data_get_listCouponTotal_list } from "@/api/marketing/marktingNotes/index";
import { parseTime } from "@/utils/";
import Pager from "@/components/Pagination/index";
export default {
  data() {
    return {
      tableDataAll: [],
      loading: false,
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
    couponDetaildialogFormVisible: {
      type: Boolean,
      default: false
    },
    params: {
      type: [Object, Array]
    }
  },
  methods: {
    openDialog: function() {
      this.loading = true;
      data_get_listCouponTotal_list(this.page, this.pagesize, {
        activityType: "AF046106",
        mobile: this.params.mobile
      })
        .then(res => {
          this.tableDataAll = res.data.list;
          this.dataTotal = res.data.length;
          this.loading = false;
        })
        .catch(err => {
          this.$message.error(err.errorInfo || err.text);
          this.loading = false;
        });
    },
    close: function() {
      this.$emit("update:couponDetaildialogFormVisible", false);
    },
    // 每页显示数据量变更
    handlePageChange(obj) {
      this.page = obj.pageNum;
      this.pagesize = obj.pageSize;
      this.firstblood();
    },
    orderSerialOperate(i) {
      this.$router.push({
        name: "订单详情",
        query: { orderSerial: i.orderSerial }
      });
    }
  },
  watch: {
    couponDetaildialogFormVisible: {
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
.couponDetailTable {
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