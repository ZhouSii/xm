<template>
  <div class="identicalStyle" style="height:100%" v-loading="loading">
    <el-form :inline="true" class="demo-ruleForm classify_searchinfo">
      <el-form-item label="活动名称">
        <el-input v-model="formAllData.activityName"></el-input>
      </el-form-item>
      <el-form-item label="活动类型">
        <el-select v-model="formAllData.activityType" placeholder="请选择">
          <el-option
            v-for="item in activityTypeList"
            :key="item.code"
            :label="item.name"
            :value="item.code"
            :disabled="item.disabled"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="活动所属区域">
        <GetCityList ref="area" v-model="formAllData.areacode" @returnStr="getStr"></GetCityList>
      </el-form-item>
      <el-form-item label="优惠券名称">
        <el-input v-model="formAllData.couponName"></el-input>
      </el-form-item>
      <el-form-item label="货主">
        <el-input v-model="formAllData.mobile"></el-input>
      </el-form-item>
      <el-form-item label="派发时间">
        <el-date-picker
          v-model="grantTime"
          @change="grantTimeVal"
          type="daterange"
          range-separator="-"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          unlink-panels
          align="right"
          value-format="yyyy-MM-dd HH:mm:ss"
          :default-time="['00:00:00', '23:59:59']"
        ></el-date-picker>
      </el-form-item>
      <el-form-item label="券码状态">
        <el-select v-model="formAllData.couponStatus" placeholder="请选择">
          <el-option
            v-for="item in couponStatusList"
            :key="item.code"
            :label="item.name"
            :value="item.code"
            :disabled="item.disabled"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="活动创建时间">
        <el-date-picker
          v-model="createTime"
          @change="createTimeVal"
          type="daterange"
          range-separator="-"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          unlink-panels
          align="right"
          value-format="yyyy-MM-dd HH:mm:ss"
          :default-time="['00:00:00', '23:59:59']"
        ></el-date-picker>
      </el-form-item>
      <el-form-item label="优惠券领取人">
        <el-input v-model="formAllData.belongSalesmanName"></el-input>
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
          plain
          icon="el-icon-download"
          @click="outPutExcel"
          :size="btnsize"
          v-has:MARKETING_MARKETINGDISTRIBUTIONRECORD_COUPON_EXPORT
        >导出Excel</el-button>
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
          tooltip-effect="dark"
        >
          <el-table-column label="序号" width="60">
            <template slot-scope="scope">{{ (page - 1)*pagesize + scope.$index + 1 }}</template>
          </el-table-column>
          <el-table-column label="活动名称" prop="activityName" min-width="150" show-overflow-tooltip>
            <template slot-scope="scoped">
              <h4
                class="needMoreInfo"
                @click="activityNameOperate(scoped.row)"
              >{{scoped.row.activityName}}</h4>
            </template>
          </el-table-column>
          <el-table-column
            label="活动类型"
            prop="activityTypeName"
            min-width="120"
            show-overflow-tooltip
          ></el-table-column>
          <el-table-column
            label="活动创建时间"
            prop="createTime"
            sortable
            min-width="160"
            show-overflow-tooltip
          ></el-table-column>
          <el-table-column
            label="活动所属区域"
            prop="areaFullName"
            sortable
            min-width="160"
            show-overflow-tooltip
          ></el-table-column>
          <el-table-column
            label="优惠券名称"
            prop="couponName"
            sortable
            min-width="140"
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
          <el-table-column
            label="联系人"
            prop="contacts"
            sortable
            min-width="130"
            show-overflow-tooltip
          ></el-table-column>
          <el-table-column label="货主" prop="mobile" sortable min-width="130" show-overflow-tooltip>
            <template slot-scope="scoped">
              <h4 class="needMoreInfo" @click="mobileOperate(scoped.row)">{{scoped.row.mobile}}</h4>
            </template>
          </el-table-column>
          <el-table-column
            label="派发时间"
            prop="grantTime"
            sortable
            min-width="160"
            show-overflow-tooltip
          ></el-table-column>
          <el-table-column
            label="过期时间"
            prop="endTime"
            sortable
            min-width="160"
            show-overflow-tooltip
          ></el-table-column>
          <el-table-column
            label="优惠券领取人"
            prop="belongSalesmanName"
            sortable
            min-width="140"
            show-overflow-tooltip
          ></el-table-column>
          <el-table-column
            label="券码状态"
            prop="couponStatus"
            sortable
            min-width="120"
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
          <el-table-column label="操作" sortable min-width="100">
            <template slot-scope="scoped">
              <h4 class="needMoreInfo" @click="couponOperate(scoped.row)">相关信息</h4>
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
  </div>
</template>
<script>
import GetCityList from "@/components/GetCityList/city";
import {
  data_get_listCouponTotal_list,
  data_post_exportlistCouponTotalExcel
} from "@/api/marketing/marktingNotes/index";
import { eventBus } from "@/eventBus";
import Pager from "@/components/Pagination/index";
import { parseTime, pickerOptions2 } from "@/utils/";
import { getDictionary } from "@/api/common.js";
import { mapState, mapActions } from "vuex";
import FileSaver from "file-saver";
import XLSX from "xlsx";
import { SaveAsFile } from "@/utils/lodopFuncs";
export default {
  data() {
    return {
      loading: false,
      pickerOptions2: {
        shortcuts: pickerOptions2
      },
      btnsize: "mini",
      selectRowData: {},
      selectId: [],
      sizes: [20, 50, 100, 400],
      pagesize: 20, // 初始化加载数量
      page: 1, // 初始化页码
      totalCount: null,
      dataTotal: 0,
      tableDataAll: [],
      radio: 1,
      activityTypeList: [],
      couponStatusList: [],
      formAllData: {
        activityName: null,
        activityType: null,
        areaCode: null,
        couponName: null,
        couponStatus: null,
        createEndTime: null,
        createStartTime: null,
        endTime: null,
        grantEndTime: null,
        grantStartTime: null,
        mobile: null,
        belongSalesmanName: null
      },
      tableDataAllExcel: [],
      grantTime: [],
      createTime: [],
      tableColumn: [
        {
          label: "序号",
          prop: ""
        },
        {
          label: "活动名称",
          prop: "activityName"
        },
        {
          label: "活动类型",
          prop: "activityTypeName"
        },
        {
          label: "活动创建时间",
          prop: "createTime"
        },
        {
          label: "活动所属区域",
          prop: "areaFullName"
        },
        {
          label: "优惠券名称",
          prop: "couponName"
        },
        {
          label: "优惠券类型",
          prop: "couponStatus"
        },
        {
          label: "金额/折扣",
          prop: "remissionDiscount"
        },
        {
          label: "优惠券码",
          prop: "couponStatus"
        },
        {
          label: "联系人",
          prop: "contacts"
        },
        {
          label: "货主",
          prop: "mobile"
        },
        {
          label: "派发时间",
          prop: "grantTime"
        },
        {
          label: "过期时间",
          prop: "endTime"
        },
        {
          label: "优惠券领取人",
          prop: "belongSalesmanName"
        },
        {
          label: "券码状态",
          prop: "couponType"
        },
        {
          label: "订单号",
          prop: "orderSerial"
        },
        {
          label: "订单优惠金额",
          prop: "orderDiscountAmount"
        }
      ]
    };
  },
  components: {
    Pager,
    GetCityList
  },
  methods: {
    getStr(val) {
      if (!val.area) {
        this.formAllData.areaCode = val.city.code;
      } else {
        this.formAllData.areaCode = val.area.code;
      }
    },
    // 获取数据字典
    getMoreInformation() {
      // 活动类型
      getDictionary("AF0461").then(res => {
        this.activityTypeList = res.data;
      });
      getDictionary("AF0464").then(res => {
        this.couponStatusList = res.data;
      });
    },
    // 列表刷新页面
    firstblood() {
      this.loading = true;
      data_get_listCouponTotal_list(
        this.page,
        this.pagesize,
        this.formAllData
      ).then(res => {
        this.dataTotal = res.data.totalCount;
        this.tableDataAll = res.data.list;
        this.loading = false;
      }).catch(err=>{
          this.loading = false;
          this.$message.info((err.errorInfo ? err.errorInfo : err.text));
      });
    },
    outPutExcel() {
      if (this.formAllData.grantStartTime) {
        this.$message.success("正在导出中...");
        data_post_exportlistCouponTotalExcel(0, 0, this.formAllData).then(
          res => {
            this.tableDataAllExcel = res.data;
            if (this.tableDataAllExcel.length > 0) {
              SaveAsFile({
                data: this.tableDataAllExcel ? this.tableDataAllExcel : [],
                columns: this.tableColumn,
                name:
                  "优惠券发放记录-" +
                  parseTime(new Date(), "{y}{m}{d}{h}{i}{s}")
              });
              this.$refs.multipleTable.clearSelection();
            } else {
              SaveAsFile({
                data: this.tableDataAllExcel ? this.tableDataAllExcel : [],
                columns: this.tableColumn,
                name:
                  "优惠券发放记录-" +
                  parseTime(new Date(), "{y}{m}{d}{h}{i}{s}")
              });
            }
          }
        );
      } else {
        this.$message.info("请选择派发时间段");
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
        activityName: null,
        activityType: null,
        areaCode: null,
        couponName: null,
        couponStatus: null,
        createEndTime: null,
        createStartTime: null,
        endTime: null,
        grantEndTime: null,
        grantStartTime: null,
        mobile: null,
        belongSalesmanName: null
      };
      if (this.page != 1) {
        this.page = 1;
        this.$refs.pager.inputval = this.page;
        this.$refs.pager.pageNum = this.page;
      }
      this.grantTime = [];
      this.createTime = [];
      this.$refs.area.clearData();
      this.firstblood();
    },
    // 派发时间
    grantTimeVal(i) {
      if (i) {
        this.formAllData.grantStartTime = i[0];
        this.formAllData.grantEndTime = i[1];
      } else {
        this.formAllData.grantStartTime = "";
        this.formAllData.grantEndTime = "";
      }
    },
    // 创建时间
    createTimeVal(i) {
      if (i) {
        this.formAllData.createStartTime = i[0];
        this.formAllData.createEndTime = i[1];
      } else {
        this.formAllData.createStartTime = "";
        this.formAllData.createEndTime = "";
      }
    },
    // 活动名称
    activityNameOperate(i) {
      // this.$store.commit({
      // type: "SET_COUPONSTATUS",
      // couponStatus: 'two'
      // })
      if (i.activityType == "AF046101") {
        this.$router.push({
          name: "优惠券",
          query: { activityId: i.activityId, activityType: "two" }
        });
      } else {
        this.$router.push({
          name: "优惠券",
          query: { activityId: i.activityId, activityType: "one" }
        });
      }
    },
    // 货主
    mobileOperate(i) {
      this.$router.push({ name: "货主详情", query: { userId: i.userId } });
      sessionStorage.setItem("HZdetailsName", "essential");
    },
    //订单号
    orderSerialOperate(i) {
      this.$router.push({
        name: "订单详情",
        query: { orderSerial: i.orderSerial }
      });
    },
    // 相关信息
    couponOperate(i) {
      this.formAllData.activityName = i.activityName;
      this.formAllData.activityType = i.activityType;
      this.formAllData.areaCode = i.areaCode;
      this.formAllData.createEndTime = i.createTime;
      this.formAllData.createStartTime = i.createTime;
      this.firstblood();
    },
    // 每页显示数据量变更
    handlePageChange(obj) {
      this.page = obj.pageNum;
      this.pagesize = obj.pageSize;
      this.firstblood();
    }
  },

  mounted() {
    this.getMoreInformation();
    this.firstblood();
  }
};
</script>
