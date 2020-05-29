<template>
  <div class="identicalStyle bankCard" style="height:100%" v-loading="loading">
    <el-form :inline="true" class="demo-ruleForm classify_searchinfo">
      <el-form-item label="银行卡号">
        <el-input v-model="formAllData.cardNum"></el-input>
      </el-form-item>
      <el-form-item label="用户姓名">
        <el-input v-model="formAllData.name"></el-input>
      </el-form-item>
      <el-form-item label="用户账号">
        <el-input v-model="formAllData.mobile"></el-input>
      </el-form-item>
      <el-form-item label="绑定状态">
        <el-select v-model="formAllData.bindStatus" placeholder="请选择" clearable>
          <el-option
            v-for="item in bindStatusList"
            :key="item.code"
            :label="item.name"
            :value="item.code"
            :disabled="item.disabled"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="验证时间">
        <el-date-picker
          is-range
          unlink-panels
          :picker-options="pickerOptions2"
          type="daterange"
          align="right"
          v-model="createTime"
          range-separator="-"
          start-placeholder="开始时间"
          end-placeholder="结束时间"
          placeholder="选择时间范围"
          :default-time="['00:00:00', '23:59:59']"
          @change="cTime"
        ></el-date-picker>
      </el-form-item>
      <el-form-item label="是否本人" v-if="this.TabName=='totalCard'">
        <el-select v-model="formAllData.isCardHolder" placeholder="请选择" clearable>
          <el-option
            v-for="item in isCardHolderList"
            :key="item.code"
            :label="item.name"
            :value="item.code"
            :disabled="item.disabled"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="银行卡真实性">
        <el-select v-model="formAllData.validateStatus" placeholder="请选择" clearable>
          <el-option
            v-for="item in validateStatusList"
            :key="item.code"
            :label="item.name"
            :value="item.code"
            :disabled="item.disabled"
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
          <el-table-column
            label="银行卡号"
            prop="cardNumView"
            sortable
            show-overflow-tooltip
            width="180"
          >
            <template slot-scope="scope">
              <span @click="pushBankCard(scope.row)" class="BtnInfo">{{scope.row.cardNumView}}</span>
            </template>
          </el-table-column>
          <el-table-column label="用户姓名" prop="name" sortable show-overflow-tooltip width="120"></el-table-column>
          <el-table-column label="用户账号" prop="mobile" sortable show-overflow-tooltip width="180"></el-table-column>
          <el-table-column label="用户类型" prop="userType" sortable show-overflow-tooltip width="120">
            <template slot-scope="scope">
              <span>{{scope.row.userType=='0'?'车主':'货主'}}</span>
            </template>
          </el-table-column>
          <el-table-column label="绑定时间" prop="bindTime" sortable show-overflow-tooltip width="200"></el-table-column>
          <el-table-column
            label="开户银行"
            prop="openAccountBank"
            sortable
            show-overflow-tooltip
            width="150"
          ></el-table-column>
          <el-table-column
            label="绑定状态"
            prop="bindStatusName"
            sortable
            show-overflow-tooltip
            width="120"
          ></el-table-column>
          <el-table-column label="银行卡真实性" prop="validateStatusName" sortable></el-table-column>
          <el-table-column
            label="银行卡持有人"
            prop="isCardHolderName"
            sortable
            show-overflow-tooltip
            width="120"
          ></el-table-column>
          <el-table-column label="更新时间" prop="updateTime" sortable></el-table-column>
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
import { aflcBankCardList } from "@/api/finance/bankCard.js";
import { getDictionary } from "@/api/common.js";
import Pager from "@/components/Pagination/index";
import { parseTime, pickerOptions2 } from "@/utils/";
import bandCardDetails from "./bandCardDetails";
export default {
  props: {
    isvisible: {
      type: Boolean,
      default: false
    },
    TabName: {
      type: String,
      default: ""
    }
  },
  data() {
    return {
      pickerOptions2: {
        shortcuts: pickerOptions2
      },
      loading: true,
      btnsize: "mini",
      sizes: [20, 50, 100, 400],
      pagesize: 20, // 初始化加载数量
      page: 1, // 初始化页码
      totalCount: null,
      dataTotal: 0,
      tableDataAll: [],
      createTime: null,
      formAllData: {
        isCardHolder: null,
        cardNum: null,
        name: null,
        mobile: null,
        bindStatus: null,
        validateStatus: null,
        startValidateTime: null,
        endValidateTime: null
      },
      bindStatusList: [],
      validateStatusList: [],
      isCardHolderList: []
    };
  },
  components: {
    Pager,
    bandCardDetails
  },
  watch: {
    isvisible: {
      handler(newVal, oldVal) {
        if (newVal) {
          if (this.TabName == "totalCard") {
            this.formAllData.isCardHolder = null;
          } else {
            this.formAllData.isCardHolder = "AF0130601";
          }
          setTimeout(() => {
            this.$refs.multipleTable.$el.style.height =
              this.$refs.multipleTable.$el.offsetHeight + "px";
          }, 300);
          this.firstblood();
        }
      },
      immediate: true
    }
  },
  methods: {
    // 列表刷新页面
    firstblood() {
      this.loading = true;
      aflcBankCardList(this.page, this.pagesize, this.formAllData).then(res => {
        this.dataTotal = res.data.totalCount;
        this.tableDataAll = res.data.list;
        this.tableDataAll.forEach(item => {
          item.bindTime = parseTime(item.bindTime, "{y}-{m}-{d} {h}:{i}:{s}");
          item.updateTime = parseTime(
            item.updateTime,
            "{y}-{m}-{d} {h}:{i}:{s}"
          );
        });
        this.loading = false;
      });
    },
    //  查询
    getData_query() {
      this.page = 1;
      this.$refs.pager.inputval = this.page;
      this.$refs.pager.pageNum = this.page;
      this.firstblood();
    },
    getDataList() {
      getDictionary("AF01307").then(res => {
        this.bindStatusList = res.data;
      });
      getDictionary("AF01306").then(res => {
        this.isCardHolderList = res.data;
      });
      getDictionary("AF01305").then(res => {
        this.validateStatusList = res.data;
      });
    },
    cTime(i) {
      if (i !== null) {
        this.formAllData.startValidateTime = i[0];
        this.formAllData.endValidateTime = i[1];
      } else {
        this.formAllData.startValidateTime = null;
        this.formAllData.endValidateTime = null;
      }
    },
    // 清空
    clearSearch() {
      this.createTime = null;
      this.formAllData = {
        cardNum: null,
        name: null,
        mobile: null,
        bindStatus: null,
        validateStatus: null,
        startValidateTime: null,
        endValidateTime: null
      };
      if (this.TabName == "totalCard") {
        this.formAllData.isCardHolder = null;
      } else {
        this.formAllData.isCardHolder = "AF0130601";
      }
      if (this.page != 1) {
        this.page = 1;
        this.$refs.pager.inputval = this.page;
        this.$refs.pager.pageNum = this.page;
      }
      this.firstblood();
    },
    // 每页显示数据量变更
    handlePageChange(obj) {
      this.page = obj.pageNum;
      this.pagesize = obj.pageSize;
      this.firstblood();
    },
    pushBankCard(item) {
      this.$router.push({ name: "银行卡详情", query: { Id: item.id } });
    }
  },

  mounted() {
    this.getDataList();
    this.firstblood();
  }
};
</script>
<style lang="scss">
.bankCard {
  .BtnInfo {
    font-weight: bold;
    font-size: 14px;
    color: #3e9ff1;
    cursor: pointer;
  }
}
</style>

