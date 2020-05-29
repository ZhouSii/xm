<template>
  <div class="identicalStyle" v-loading="loading">
    <el-form :inline="true" :model="shipperAll" ref="ruleForm" class="classify_searchinfo">
      <el-form-item label="认证所在地：">
        <!-- <vregion :ui="true" @values="regionChange" class="form-control"> -->
        <el-input v-model="shipperAll.provinceCityArea" placeholder="请输入" clearable></el-input>
        <!-- </vregion> -->
      </el-form-item>
      <el-form-item label="认证状态：">
        <el-select v-model="shipperAll.authStatus" clearable placeholder="请选择">
          <el-option
            v-for="item in optionsStatus"
            :key="item.id"
            :label="item.name"
            :value="item.code"
            :disabled="item.disabled"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="账户状态：">
        <el-select v-model="shipperAll.accountStatus" clearable placeholder="请选择">
          <el-option
            v-for="item in optionsAuidSataus"
            :key="item.id + 'shipperAll' "
            :label="item.name"
            :value="item.code"
            :disabled="item.disabled"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="手机号：">
        <el-input v-model.trim="shipperAll.mobile"></el-input>
      </el-form-item>
      <el-form-item class="fr">
        <el-button
          type="primary"
          icon="el-icon-search"
          plain
          :size="btnsize"
          @click="handleSearch('search')"
        >查询</el-button>
        <el-button
          type="info"
          plain
          icon="fontFamily aflc-icon-qingkong"
          :size="btnsize"
          @click="handleSearch('clear')"
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
          plain
          icon="fontFamily aflc-icon-dongjie1"
          :size="btnsize"
          @click="handleClick('pushFreeze')"
          v-has:COMPANY_MANAGE_FREEZE
        >冻结</el-button>
        <el-button
          type="primary"
          plain
          icon="el-icon-edit"
          :size="btnsize"
          @click="handleClick('editFreeze')"
          v-has:COMPANY_MANAGE_FREEZE_UPDATE
        >冻结修改</el-button>
        <el-button
          type="primary"
          plain
          icon="fontFamily aflc-icon-heimingdan"
          :size="btnsize"
          @click="handleClick('pushBlack')"
          v-has:COMPANY_MANAGE_PUT_BLACK
        >移入黑名单</el-button>
        <el-button
          type="primary"
          plain
          icon="fontFamily aflc-icon-yichuheimingdan"
          :size="btnsize"
          @click="handleClick('removeBlack')"
          v-has:COMPANY_MANAGE_OUT_BLACK
        >移除黑名单</el-button>
        <el-button
          type="primary"
          plain
          icon="fontFamily aflc-icon-jiedong1"
          :size="btnsize"
          @click="handleClick('removeFreeze')"
          v-has:COMPANY_MANAGE_UNFREEZE
        >解冻</el-button>
      </div>
      <div class="info_news">
        <el-table
          ref="multipleTable"
          :data="tableDataAll"
          stripe
          border
          height="100%"
          tooltip-effect="dark"
          @selection-change="getSelection"
          @row-click="clickDetails"
          style="width: 100%"
        >
          <el-table-column type="selection" width="50"></el-table-column>
          <el-table-column label="序号" width="60">
            <template slot-scope="scope">{{ (page - 1)*pagesize + scope.$index + 1 }}</template>
          </el-table-column>
          <el-table-column label="手机号(会员账号)" prop="mobile" width="150" sortable>
            <template slot-scope="scope">
              <h4 class="needMoreInfo" @click="pushOrderSerial(scope.row)">{{ scope.row.mobile}}</h4>
            </template>
          </el-table-column>
          <el-table-column prop="contactsName" sortable label="联系人" width="150"></el-table-column>
          <el-table-column
            prop="companyName"
            sortable
            label="公司名称"
            :show-overflow-tooltip="true"
            width="250"
          ></el-table-column>
          <el-table-column
            prop="auditAreaName"
            sortable
            label="认证所在地"
            :show-overflow-tooltip="true"
            width="200"
          ></el-table-column>
          <el-table-column prop="registerOriginName" sortable label="注册来源" width="120"></el-table-column>
          <el-table-column prop="registerTime" sortable label="注册日期" width="160">
            <template slot-scope="scope">{{scope.row.registerTime | parseTime}}</template>
          </el-table-column>
          <el-table-column prop="accountStatusName" sortable label="账户状态">
            <template slot-scope="scope">
              <span
                :class="{freezeName: scope.row.accountStatusName == '冻结中' ,blackName: scope.row.accountStatusName == '黑名单',normalName :scope.row.accountStatusName == '正常'}"
              >{{scope.row.accountStatusName}}</span>
            </template>
          </el-table-column>
          <el-table-column prop="authStatusName" sortable label="认证状态" width="150"></el-table-column>
          <el-table-column prop="qq" label="QQ号码" sortable></el-table-column>
          <el-table-column prop="isOpenTms" sortable label="是否开通TMS" width="150">
            <template slot-scope="scope">
              <span
                :class="scope.row.isOpenTms == 1 ? 'isTMS' : 'noTMS'"
              >{{scope.row.isOpenTms == 1 ? '是' : '否'}}</span>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
    <div class="info_tab_footer">
      共计:{{ totalCount }}
      <div class="show_pager">
        <Pager :total="totalCount" @change="handlePageChange" />
      </div>
    </div>

    <createdDialog
      :paramsView="paramsView"
      :typetitle="titleInfo"
      :editType="type"
      :dialogFormVisible_add.sync="dialogFormVisible_add"
      @getData="getDataList"
    />
    <FreezeDialog
      :params="selectRowData"
      :editType="freezetype"
      :title="freezeTitle"
      :freezeDialogFlag.sync="freezeDialogFlag"
      @getData="getDataList"
    />
    <shipperBlackDialog
      :params="selectRowData"
      :title="blackTitle"
      :editType="blacktype"
      :BlackDialogFlag.sync="BlackDialogFlag"
      @getData="getDataList"
    />
  </div>
</template>

<script>
import {
  data_get_shipper_status,
  data_get_shipper_auid
} from "@/api/users/shipper/all_shipper.js";
import { data_LogisticsCompanyList } from "@/api/users/logistics/LogisticsCompany.js";
import createdDialog from "./createdDialogA.vue";
import GetCityList from "@/components/GetCityList";
import FreezeDialog from "./FreezeDialog";
import shipperBlackDialog from "./shipperBlackDialog";
import Pager from "@/components/Pagination/index";
// import vregion from '@/components/vregion/Region.vue'

export default {
  components: {
    createdDialog,
    GetCityList,
    FreezeDialog,
    shipperBlackDialog,
    Pager
    // vregion
  },
  props: {
    isvisible: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      btnsize: "mini",
      dialogFormVisible_add: false,
      freezeDialogFlag: false,
      BlackDialogFlag: false,
      freezetype: "",
      blacktype: "",
      type: "",
      blackTitle: "",
      freezeTitle: "",
      paramsView: {},
      titleInfo: "",
      loading: true,
      optionsStatus: [
        {
          code: "",
          name: "全部"
        }
      ],
      optionsAuidSataus: [
        {
          code: "",
          name: "全部"
        }
      ],
      shipperAll: {
        provinceCityArea: "",
        authStatus: "",
        accountStatus: "",
        accountName: "",
        mobile: "",
        isVest: "0"
      },
      selectRowData: {},
      page: 1,
      pagesize: 20,
      totalCount: 0,
      selected: [], // 选中的数据集
      tableDataAll: []
    };
  },
  created() {},
  watch: {
    isvisible: {
      handler(newVal, oldVal) {
        if (newVal) {
          this.firstblood();
          this.getMoreInformation();
        }
      },
      // 代表在wacth里声明了firstName这个方法之后立即先去执行handler方法
      immediate: true
    }
  },
  mounted() {},
  methods: {
    // regionChange(d) {
    // 	// console.log('data:', d)
    // 	this.shipperAll.provinceCityArea = (!d.province && !d.city && !d.area && !d.town) ? '' : `${this.getValue(d.province)}${this.getValue(d.city)}${this.getValue(d.area)}${this.getValue(d.town)}`.trim()
    // },
    // getValue(obj) {
    // 	return obj ? obj.value : ''
    // },
    pushOrderSerial(row) {
      this.type = "view";
      this.paramsView = Object.assign({}, row);
      this.titleInfo = "物流公司信息";
      this.dialogFormVisible_add = true;
      // 清除选中状态，避免影响下个操作
      this.$refs.multipleTable.clearSelection();
    },
    // 判断选中与否
    getSelection(val) {
      // console.log('选中内容', val)
      this.selected = val;
    },
    // 点击选中当前行
    clickDetails(row, event, column) {
      this.$refs.multipleTable.toggleRowSelection(row);
    },
    // 刷新页面
    firstblood() {
      data_LogisticsCompanyList(this.page, this.pagesize, this.shipperAll)
        .then(res => {
          this.totalCount = res.data.totalCount;
          this.tableDataAll = res.data.list;
          this.loading = false;
        })
        .catch(err => {
          console.log(err);
          this.loading = false;
        });
    },
    // 获取状态列表
    getMoreInformation() {
      // 获取状态列表
      data_get_shipper_status().then(res => {
        res.data.map(item => {
          this.optionsStatus.push(item);
        });
      });
      // 获取账户状态列表
      data_get_shipper_auid().then(res => {
        //   console.log('车主状态：',res)
        res.data.map(item => {
          this.optionsAuidSataus.push(item);
        });
      });
    },
    // 点击查询按纽，按条件查询列表
    handleSearch(type) {
      if (type == "clear") {
        this.shipperAll = {
          provinceCityArea: "",
          authStatus: "",
          accountStatus: "",
          accountName: "",
          mobile: "",
          isVest: "0"
        };
      }
      if (this.page != 1) {
        this.page = 1;
        this.$refs.pager.inputval = this.page;
        this.$refs.pager.pageNum = this.page;
      }
      this.firstblood();
    },
    handlePageChange(obj) {
      this.page = obj.pageNum;
      this.pagesize = obj.pageSize;
      this.firstblood();
    },
    getDataList() {
      this.firstblood();
    },
    handleClick(type) {
      if (this.selected.length == 0 && type != "add") {
        return this.$message.info("请选择您要操作的用户");
      } else if (this.selected.length > 1 && type != "add") {
        this.$message({
          message: "每次只能操作单条数据~",
          type: "warning"
        });
      } else {
        this.selectRowData = this.selected[0];
        switch (type) {
          case "add":
            this.type = "add";
            this.titleInfo = "新增物流公司";
            this.dialogFormVisible_add = true;
            break;
          case "pushFreeze":
            this.freezetype = "add";
            if (
              this.selectRowData.accountStatusName == "冻结中" &&
              this.freezetype == "add"
            ) {
              return this.$message.info("您选中的货主已被冻结，不需多次冻结！");
            } else {
              this.freezeDialogFlag = true;
              this.freezeTitle = "冻结物流公司";
            }
            break;
          case "editFreeze":
            this.freezetype = "edit";
            if (
              this.selectRowData.accountStatusName != "冻结中" &&
              this.freezetype == "edit"
            ) {
              return this.$message.info("您选中的货主未被冻结，不可做此操作！");
            } else {
              this.freezeDialogFlag = true;
              this.freezeTitle = "冻结修改";
            }
            break;
          case "removeFreeze":
            this.freezetype = "remove";
            if (
              this.selectRowData.accountStatusName != "冻结中" &&
              this.freezetype == "remove"
            ) {
              return this.$message.info("您选中的货主未被冻结，无需移除！");
            } else {
              this.freezeDialogFlag = true;
              this.freezeTitle = "移出冻结";
            }
            break;
          case "pushBlack":
            this.blacktype = "add";
            if (
              this.selectRowData.accountStatusName == "黑名单" &&
              this.blacktype == "add"
            ) {
              return this.$message.info(
                "您选中的货主已被移入黑名单，不需多次拉黑！"
              );
            } else {
              this.BlackDialogFlag = true;
              this.blackTitle = "移入黑名单";
            }
            break;
          case "removeBlack":
            this.blacktype = "edit";
            if (
              this.selectRowData.accountStatusName != "黑名单" &&
              this.blacktype == "edit"
            ) {
              return this.$message.info(
                "您选中的货主未被移入黑名单，不可做此操作！"
              );
            } else {
              this.BlackDialogFlag = true;
              this.blackTitle = "移除黑名单";
            }
            break;
        }
        // 清除选中状态，避免影响下个操作
        this.$refs.multipleTable.clearSelection();
      }
    }
  }
};
</script>
<style lang="scss">
.removeFreeze,
.removeBlcak {
  .shipper_information {
    h2 {
      margin: 10px 0 10px 20px;
    }
  }
}
</style>
