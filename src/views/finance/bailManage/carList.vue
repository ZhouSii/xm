<template>
  <div class="identicalStyle" style="height:100%">
    <el-form :inline="true" class="demo-ruleForm classify_searchinfo">
      <el-form-item label="所在地">
        <el-input placeholder="请输入内容" v-model="formAllData.location"></el-input>
      </el-form-item>
      <el-form-item label="手机号码">
        <el-input placeholder="请输入内容" v-model="formAllData.phone"></el-input>
      </el-form-item>
      <el-form-item label="车牌号码">
        <el-input placeholder="请输入内容" v-model="formAllData.carNum"></el-input>
      </el-form-item>
      <el-form-item label="保证金类型">
        <el-select v-model="formAllData.guaranteeAmountType" clearable placeholder="请选择">
          <el-option
            v-for="item in guaranteeAmountTypeList"
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
          @click="getdata_search()"
          :size="btnsize"
          icon="el-icon-search"
        >查询</el-button>
        <el-button
          type="primary"
          plain
          @click="clearSearch"
          :size="btnsize"
          icon="fontFamily aflc-icon-qingkong"
        >清空</el-button>
      </el-form-item>
    </el-form>
    <div class="classify_info">
      <div class="info_news">
        <el-table
          ref="multipleTable"
          style="width: 100%"
          stripe
          border
          height="99%"
          highlight-current-row
          :data="tableDataTree"
          v-has:FINANCE_DESPOSIT_MANAGE_LIST
        >
          <!-- <el-table-column label="选择" type="selection" width="50"></el-table-column> -->
          <el-table-column label="序号" width="60">
            <template slot-scope="scope">{{ (page - 1)*pagesize + scope.$index + 1 }}</template>
          </el-table-column>
          <el-table-column
            label="所在地"
            sortable
            show-overflow-tooltip
            prop="location"
            min-width="180"
          ></el-table-column>
          <el-table-column label="手机号码" prop="phone" sortable show-overflow-tooltip min-width="180"></el-table-column>
          <el-table-column
            label="司机姓名"
            prop="driverName"
            sortable
            show-overflow-tooltip
            min-width="180"
          ></el-table-column>
          <el-table-column label="车牌号" prop="carNum" sortable show-overflow-tooltip min-width="180"></el-table-column>
          <el-table-column
            label="保证金类型"
            prop="guaranteeAmountType"
            sortable
            show-overflow-tooltip
            min-width="180"
          >
            <template slot-scope="scope">{{scope.row.guaranteeAmountType=='1'?'扣除':'缴纳'}}</template>
          </el-table-column>
          <el-table-column
            label="保证金单号"
            sortable
            show-overflow-tooltip
            prop="orderSerial"
            min-width="230"
          >
            <template slot-scope="scoped">
              <h4
                class="needMoreInfo"
                @click="pushOrderSerial(scoped.row,'three')"
              >{{ scoped.row.orderSerial}}</h4>
            </template>
          </el-table-column>
          <el-table-column
            label="金额"
            prop="guaranteeAmount"
            sortable
            show-overflow-tooltip
            min-width="180"
          ></el-table-column>
          <el-table-column
            label="交易时间"
            prop="createTime"
            sortable
            show-overflow-tooltip
            min-width="180"
          ></el-table-column>
          <!-- <el-table-column  label="操作" sortable show-overflow-tooltip>
                <template slot-scope="scope">
            <el-button type="primary"  :size="btnsize" @click="FreezeChange(scope.row.id,scope.row.accountStatus)" v-if="scope.row.accountStatus == '0'">保证金解冻</el-button>
            <el-button type="warning"  :size="btnsize" @click="FreezeChange(scope.row.id,scope.row.accountStatus)" v-else>保证金冻结</el-button>
                </template>
          </el-table-column>-->
        </el-table>
        <div class="info_tab_footer">
          共计:{{ dataTotal }}
          <div class="show_pager">
            <Pager :total="dataTotal" @change="handlePageChange" :sizes="sizes" ref="pager" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { parseTime, pickerOptions2 } from "@/utils/index.js";
import Pager from "@/components/Pagination/index";
import {
  aflcDriverDeposit,
  aflcDriverDepositFreeze
} from "@/api/finance/bailManage";
export default {
  data() {
    return {
      loading: true,
      btnsize: "mini",
      pickerOptions2: { shortcuts: pickerOptions2 },
      tableDataTree: [],
      dataTotal: null,
      sizes: [20, 50, 100, 400],
      pagesize: 20, //每页显示数
      page: 1, //当前页
      formAllData: {
        location: null,
        phone: null,
        carNum: null,
        guaranteeAmountType: null
      },
      guaranteeAmountTypeList: [
        { name: "全部", code: null },
        { name: "缴纳", code: "0" },
        { name: "扣除", code: "1" }
      ]
    };
  },
  components: {
    Pager
  },
  watch: {},
  methods: {
    // 列表
    firstblood() {
      aflcDriverDeposit(this.page, this.pagesize, this.formAllData).then(
        res => {
          this.dataTotal = res.data.totalCount;
          this.tableDataTree = res.data.list;
          this.tableDataTree.forEach(item => {
            item.createTime = parseTime(
              item.createTime,
              "{y}-{m}-{d} {h}:{i}:{s}"
            );
          });
        }
      );
    },
    // 页码改变
    handlePageChange(obj) {
      this.page = obj.pageNum;
      this.pagesize = obj.pageSize;
      this.firstblood();
    },
    // 查询
    getdata_search() {
      this.page = 1;
      this.$refs.pager.inputval = this.page;
      this.$refs.pager.pageNum = this.page;
      this.firstblood();
    },
    // 清空
    clearSearch() {
      this.formAllData = {
        location: null,
        phone: null,
        carNum: null,
        guaranteeAmountType: "1"
      };
      if (this.page != 1) {
        this.page = 1;
        this.$refs.pager.inputval = this.page;
        this.$refs.pager.pageNum = this.page;
      }
      this.firstblood();
    },
    // 解冻
    FreezeChange(id, accountStatus) {
      aflcDriverDepositFreeze(id).then(res => {
        if (accountStatus == "0") {
          this.$message.success("解冻成功");
        } else {
          this.$message.success("冻结成功");
        }
        this.firstblood();
      });
    },
    pushOrderSerial(item, type) {
      this.$router.push({
        name: "车主账户详情",
        query: { accountId: item.driverId }
      });
      sessionStorage.setItem("carOwnerTabName", type);
    }
  },
  mounted() {
    this.firstblood();
  }
};
</script>

<style lang="scss">
</style>

