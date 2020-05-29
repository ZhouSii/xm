<template>
  <div v-loading="loading" class="identicalStyle customerReported">
    <el-form
      :inline="true"
      :model="listSystemObj"
      ref="ruleForm"
      class="demo-ruleForm classify_searchinfo"
    >
      <el-form-item label="提交时间">
        <el-date-picker
          v-model="listSystemObj.chooseTime"
          @change="timeVal"
          type="daterange"
          range-separator="-"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          unlink-panels
          align="right"
          :default-time="['00:00:00', '23:59:59']"
        ></el-date-picker>
      </el-form-item>

      <el-form-item label="关联状态">
        <el-select v-model="listSystemObj.status">
          <el-option
            v-for="item in statusOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="手机号">
        <el-input v-model="listSystemObj.mobile" clearable></el-input>
      </el-form-item>

      <el-form-item class="btnChoose fr" style="margin-left:0;">
        <el-button
          type="primary"
          icon="el-icon-search"
          plain
          :size="btnsize"
          @click="handleSearch('search')"
        >搜索</el-button>
        <el-button
          type="info"
          icon="fontFamily aflc-icon-qingkong"
          :size="btnsize"
          plain
          @click="handleSearch('clear')"
        >清空</el-button>
        <el-button
          type="primary"
          icon="el-icon-s-claim"
          :size="btnsize"
          plain
          @click="processing"
          v-if="$_has_permission(customertype=='all'?'CUSTOM_CUSTOMERREPORT_ALL_AUTOMATICPROCESSING':customertype=='driver'?'CUSTOM_CUSTOMERREPORT_CAR_AUTOMATICPROCESSING':'CUSTOM_CUSTOMERREPORT_SHIPPER_AUTOMATICPROCESSING')"
        >自动处理</el-button>
      </el-form-item>
    </el-form>
    <div class="classify_info">
      <!-- <div class="btns_box">
                    <el-button type="primary" icon="el-icon-circle-plus" plain @click="handleClick('new')" :size="btnsize">跟进登记</el-button>
      </div>-->
      <div class="info_news">
        <el-table
          ref="multipleTable"
          style="width: 100%"
          stripe
          border
          align="center"
          height="100%"
          :data="tableData"
          tooltip-effect="dark"
        >
          <el-table-column type="index" label="序号" width="60"></el-table-column>

          <el-table-column label="客户类型" width="80">
            <template slot-scope="scope">
              <span class="orderSerial">{{ scope.row.customertype == 'driver' ? '车主' : '货主' }}</span>
            </template>
          </el-table-column>

          <el-table-column label="手机号" width="150" prop="mobile"></el-table-column>
          <el-table-column label="车辆类型" width="150" prop="cartypeName"></el-table-column>
          <el-table-column label="备注信息" width="150" prop="submitmemo" show-overflow-tooltip></el-table-column>
          <el-table-column label="提交人" width="200">
            <template slot-scope="scope">
              <span
                class="orderSerial"
              >{{ !!scope.row.personInfo ? scope.row.personInfo.name + scope.row.personInfo.mobile : '' }}</span>
            </template>
          </el-table-column>
          <el-table-column label="提交时间" width="200" prop="submittime"></el-table-column>
          <el-table-column label="客户状态" width="80">
            <template slot-scope="scope">
              <span
                class="orderSerial"
              >{{ !!scope.row.customerStatus ? scope.row.customerStatus.name : '' }}</span>
            </template>
          </el-table-column>
          <el-table-column label="关联状态" width="80" prop="statusName"></el-table-column>
          <el-table-column label="操作人" width="200" prop="processperson"></el-table-column>
          <el-table-column label="操作时间" width="200" prop="processtime"></el-table-column>
          <!-- <el-table-column label="操作人" width="100" prop="processtime"></el-table-column> -->
          <el-table-column label="拒绝原因" width="200" prop="processmemo" show-overflow-tooltip></el-table-column>
          <el-table-column label="操作" width="200">
            <template slot-scope="scope">
              <el-button
                :size="btnsize"
                type="primary"
                plain
                style="float:left"
                v-if="!!scope.row.customerStatus&&$_has_permission(customertype=='all'?'CUSTOM_CUSTOMERREPORT_ALL_GOTOSEE':customertype=='driver'?'CUSTOM_CUSTOMERREPORT_CAR_GOTOSEE':'CUSTOM_CUSTOMERREPORT_SHIPPER_GOTOSEE')"
                @click="handleClick(scope.row,'follow')"
              >前往查看</el-button>
              <el-button
                :size="btnsize"
                type="primary"
                plain
                v-if="scope.row.statusName === '待处理'&&$_has_permission(customertype=='all'?'CUSTOM_CUSTOMERREPORT_ALL_REFUSE':customertype=='driver'?'CUSTOM_CUSTOMERREPORT_CAR_REFUSE':'CUSTOM_CUSTOMERREPORT_SHIPPER_REFUSE')"
                @click="reject(scope.row,'follow')"
              >拒绝</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>

    <!-- <customer-reported-dialog v-if="isShowCustomerReportedDialog" :isShowCustomerReportedDialog="isShowCustomerReportedDialog"></customer-reported-dialog> -->
    <reject-dialog :recordid="recordid" />

    <!-- 页码 -->
    <div class="info_tab_footer">
      共计:{{ dataTotal }}
      <div class="show_pager">
        <Pager :total="dataTotal" @change="handlePageChange" ref="pager" />
      </div>
    </div>
  </div>
</template>

<script>
import Pager from "@/components/Pagination/index";
import customerReportedDialog from "./customerReportedDialog";
import rejectDialog from "./rejectDialog";
import fetch from "@/utils/fetch";

export default {
  name: "customerReported",
  props: {
    customertype: {
      type: String,
      default: "all"
    }
  },
  components: {
    Pager,
    customerReportedDialog,
    rejectDialog
  },
  data() {
    return {
      loading: false, // 加载
      btnsize: "mini", //显示大小
      listSystemObj: {
        //查询提交数据
        pageNum: 1,
        pageSize: 20,
        status: "all", // pending:待处理|success:已关联|fail:已拒绝|all:全部
        mobile: "", //手机号
        chooseTime: ["", ""] // 选择的时间
      },
      dataTotal: 0, //查询总数
      tableData: [], //渲染数据
      // 渲染数据
      //   关联状态选择
      statusOptions: [
        {
          value: "all",
          label: "全部"
        },
        {
          value: "pending",
          label: "待处理"
        },
        {
          value: "success",
          label: "已关联"
        },
        {
          value: "fail",
          label: "已拒绝"
        }
      ],
      isShowCustomerReportedDialog: false, //是否显示新增权益
      recordid: null //拒绝的id
    };
  },
  watch: {},
  mounted() {
    this.firstblood();
  },
  methods: {
    // 时间选择
    timeVal(val) {
      if (val) {
        this.listSystemObj.chooseTime[0] = val[0];
        this.listSystemObj.chooseTime[1] = val[1];
      } else {
        this.listSystemObj.chooseTime = ["", ""];
      }
    },
    // 修改页码
    handlePageChange(obj) {
      this.listSystemObj.pageNum = obj.pageNum;
      this.listSystemObj.pageSize = obj.pageSize;
      this.firstblood();
    },
    // 刷新页面
    firstblood() {
      const self = this;
      self.loading = true;
      console.log(
        self.listSystemObj.chooseTime,
        "self.listSystemObj.chooseTime"
      );
      if (
        self.listSystemObj.chooseTime &&
        self.listSystemObj.chooseTime.length > 0 &&
        !!self.listSystemObj.chooseTime[0] &&
        !!self.listSystemObj.chooseTime[1]
      ) {
        const startTime = new Date(self.listSystemObj.chooseTime[0]);
        const endTime = new Date(self.listSystemObj.chooseTime[1]);
        const startTimeChange =
          startTime.getFullYear() +
          "-" +
          (startTime.getMonth() + 1 < 10
            ? "0" + (startTime.getMonth() + 1)
            : startTime.getMonth() + 1) +
          "-" +
          (startTime.getDate() < 10
            ? "0" + startTime.getDate()
            : startTime.getDate());
        const endTimeChange =
          endTime.getFullYear() +
          "-" +
          (endTime.getMonth() + 1 < 10
            ? "0" + (endTime.getMonth() + 1)
            : endTime.getMonth() + 1) +
          "-" +
          (endTime.getDate() < 10
            ? "0" + endTime.getDate()
            : endTime.getDate());
        self.listSystemObj.chooseTime = [startTimeChange, endTimeChange];
      } else {
        self.listSystemObj.chooseTime = ["", ""];
      }

      const params = {
        pageNum: self.listSystemObj.pageNum,
        pageSize: self.listSystemObj.pageSize,
        customertype: self.customertype, //driver:车主|shipper:货主|all:全部
        status: self.listSystemObj.status, // pending:待处理|success:已关联|fail:已拒绝|all:全部
        mobile: self.listSystemObj.mobile, //手机号
        startTime: self.listSystemObj.chooseTime[0]
          ? self.listSystemObj.chooseTime[0]
          : "", //开始时间
        endTime: self.listSystemObj.chooseTime[1]
          ? self.listSystemObj.chooseTime[1]
          : "" //结束时间
      };
      //查询客户上报列表
      fetch({
        url: `/${self.$cms}/usercenter/aflcsalesmanperformancesubmit/v1/view2`,
        method: "post",
        data: params
      })
        .then(res => {
          if (res.status === 200) {
            self.tableData = res.data.list;
            self.dataTotal = res.data.total;
            self.loading = false;
          } else {
            self.loading = false;
          }
        })
        .catch(err => {
          self.loading = false;
        });
    },
    // 点击搜索还是清空
    handleSearch(type) {
      if (type == "clear") {
        this.listSystemObj = {
          pageNum: 1,
          pageSize: 20,
          customertype: "all", //driver:车主|shipper:货主|all:全部
          status: "all", // pending:待处理|success:已关联|fail:已拒绝|all:全部
          mobile: "", //手机号
          chooseTime: []
        };
      }
      if (this.listSystemObj.pageNum != 1) {
        this.listSystemObj.pageNum = 1;
        this.$refs.pager.inputval = this.listSystemObj.pageNum;
        this.$refs.pager.pageNum = this.listSystemObj.pageNum;
      }
      this.firstblood();
    },
    // 获取填写进弹窗的数据
    checkData(recordid) {
      const self = this;
      fetch({
        url: `/${self.$cms}/usercenter/aflcsalesmanperformancesubmit/v1/check`,
        method: "post",
        data: {
          recordid: recordid
          // recordid: '1126695614779252736'
        }
      }).then(res => {
        if (res.status === 200) {
          if (res.data && res.data.salesman) {
            let resData = res.data.salesman;
            sessionStorage.setItem("checkData", JSON.stringify(resData));
          } else {
            sessionStorage.setItem("checkData", {});
          }
        }
      });
    },
    // 前往查看设置相应权限
    handleClick(row, type) {
      // console.log(row, "row");
      // 未注册不跳转
      if (!!row.customerStatus && row.customerStatus.name == "未注册") {
        this.$message({
          message: "此用户暂未注册",
          type: "warning"
        });
        return false;
      }
      // 若状态为待处理则调用数据自动填写到弹窗
      if (row.statusName == "待处理") {
        this.checkData(row.recordid);
      }

      let index;
      if (!!row.customerStatus && !!row.customerStatus.name) {
        switch (row.customerStatus.name) {
          case "未认证":
            index = "second";
            break;
          case "待认证":
            index = "third";
            break;
          case "已认证":
            index = "fourth";
            break;
          case "认证不通过":
            index = "fifth";
            break;
          default:
            index = "first";
        }
      } else {
        index = "first";
      }
      if (row.customertype == "driver") {
        // 车主
        this.$router.push({
          path: "/users/carowner",
          query: {
            index: index,
            mobile: row.mobile
          }
        });
      } else {
        // 货主
        this.$router.push({
          path: "/users/shipper",
          query: {
            index: index,
            mobile: row.mobile
          }
        });
      }
    },
    // 自动处理
    processing() {
      this.loading = true;
      fetch({
        url: `/${this.$cms}/usercenter/aflcsalesmanperformancesubmit/v1/autoProcess`,
        method: "post",
        data: {}
      })
        .then(res => {
          if (res.status === 200) {
            this.loading = false;
            this.firstblood();
          } else {
            this.$message({
              message: "处理异常",
              type: "warning"
            });
            this.loading = false;
          }
        })
        .catch(err => {
          this.loading = false;
        });
    },
    // 点击拒绝
    reject(row, type) {
      this.recordid = row.recordid;
    }
  }
};
</script>

<style scoped lang="scss">
.customerReported {
  height: 100%;
}
</style>
