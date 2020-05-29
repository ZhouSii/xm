<template>
  <div class="identicalStyle Marketing" style="height:100%" v-loading="loading">
    <el-form :inline="true" class="demo-ruleForm classify_searchinfo">
      <el-form-item label="发放区域">
        <GetCityList ref="area" v-model="formAllData.areaName" @returnStr="getStr"></GetCityList>
      </el-form-item>
      <el-form-item label="服务类型">
        <el-select v-model="formAllData.serivceCode" clearable placeholder="请选择">
          <el-option
            v-for="item in serviceCardList"
            :key="item.code"
            :label="item.name"
            :value="item.code"
            :disabled="item.disabled"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="车辆类型">
        <el-select v-model="formAllData.carType" clearable placeholder="请选择">
          <el-option
            v-for="item in optionsCar"
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
      <div class="btns_box">
        <newshipperorder
          btntext="新增"
          :plain="true"
          type="primary"
          btntype="primary"
          icon="el-icon-news"
          editType="add"
          @getData="getDataList"
          v-has:MARKETING_SHIPPER_MANAGE_PREFERENTIAL_ADD
          btntitle="创建"
        ></newshipperorder>
        <modshipperorder
          btntext="修改"
          :plain="true"
          type="primary"
          btntype="primary"
          icon="el-icon-news"
          editType="edit"
          @getData="getDataList"
          btntitle="修改"
          v-has:MARKETING_SHIPPER_MANAGE_PREFERENTIAL_UPDATE
          :params="selectRowData"
        ></modshipperorder>
        <el-button
          type="primary"
          value="value"
          plain
          icon="el-icon-bell"
          @click="handleUseStates"
          :size="btnsize"
          v-has:MARKETING_SHIPPER_MANAGE_PREFERENTIAL_USE
        >启用/停用</el-button>
        <el-button
          type="primary"
          plain
          icon="el-icon-delete"
          @click="delete_data"
          :size="btnsize"
          v-has:MARKETING_SHIPPER_MANAGE_PREFERENTIAL_DELETE
        >删除</el-button>
      </div>

      <div class="info_news">
        <el-table
          ref="multipleTable"
          style="width: 100%"
          stripe
          border
          height="100%"
          @selection-change="getSelection"
          @row-click="clickDetails"
          highlight-current-row
          :data="tableDataAll"
        >
          <el-table-column label="选择" type="selection" width="50"></el-table-column>
          <el-table-column label="序号" sortable width="60">
            <template slot-scope="scope">{{ (page - 1)*pagesize + scope.$index + 1 }}</template>
          </el-table-column>
          <el-table-column label="发放区域" show-overflow-tooltip sortable>
            <template slot-scope="scope">
              <modshipperorder
                :btntext="scope.row.province+scope.row.city+scope.row.area"
                type="primary"
                btntype="text"
                editType="view"
                btntitle="详情"
                :paramsView="scope.row"
              ></modshipperorder>
            </template>
          </el-table-column>
          <el-table-column label="优惠额度限制" prop="rewardMax" sortable></el-table-column>
          <el-table-column label="服务分类" prop="serivceCode" sortable></el-table-column>
          <el-table-column label="车辆类型" prop="carType" sortable></el-table-column>
          <el-table-column label="启用状态" sortable>
            <template slot-scope="scope">{{ scope.row.usingStatus == 1 ? '启用' : '禁用' }}</template>
          </el-table-column>
          <el-table-column label="创建时间" prop="createTime" sortable></el-table-column>
          <el-table-column label="创建人" prop="creater" sortable></el-table-column>
        </el-table>
        <!-- 页码 -->
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
import {
  data_Commission,
  data_CarList,
  data_ServerClassList
} from "@/api/server/areaPrice.js";
import {
  data_get_shipperOwnerFrom_list,
  data_Able_shipperOwnerFrom,
  data_Del_shipperOwnerFrom
} from "@/api/marketing/shippermarkting/shipperOwner.js";
import GetCityList from "@/components/GetCityList/city";
import newshipperorder from "../../components/newshipperorder.vue";
import modshipperorder from "../../components/modshipperorder.vue";
import { eventBus } from "@/eventBus";
import Pager from "@/components/Pagination/index";
import { parseTime } from "@/utils/";
export default {
  data() {
    return {
      loading: true,
      btnsize: "mini",
      selectRowData: {},
      selectId: [],
      sizes: [20, 50, 100],
      information: "操作不正确",
      pagesize: 20, //每页显示数
      page: 1, //当前页
      totalCount: null,
      dataTotal: null,
      tableDataAll: [],
      radio: 1,
      optionsCar: [{ code: null, name: "全部" }],
      serviceCardList: [{ code: null, name: "全部" }],
      formAllData: {
        areaCode: null,
        carType: null,
        serivceCode: null,
        commissionGrade: null
      }
    };
  },
  components: {
    newshipperorder,
    Pager,
    modshipperorder,
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
    //获取  服务和车辆 类型列表
    getMoreInformation() {
      data_CarList().then(res => {
        res.data.map(item => {
          this.optionsCar.push(item);
        });
      });
      data_ServerClassList().then(res => {
        res.data.map(item => {
          this.serviceCardList.push(item);
        });
      });
    },
    // 列表刷新页面
    firstblood() {
      this.loading = true;
      data_get_shipperOwnerFrom_list(
        this.page,
        this.pagesize,
        this.formAllData
      ).then(res => {
        this.dataTotal = res.data.totalCount;
        this.tableDataAll = res.data.list;
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
    // 清空
    clearSearch() {
      this.formAllData = {
        areaCode: null,
        carType: null,
        serivceCode: null,
        commissionGrade: null,
        areaName: null
      };
      if (this.page != 1) {
        this.page = 1;
        this.$refs.pager.inputval = this.page;
        this.$refs.pager.pageNum = this.page;
      }
      this.$refs.area.clearData();
      this.firstblood();
    },
    // 判断选中与否
    getSelection(val) {
      console.log("选中内容", val);
      this.selectRowData = val;
    },
    //点击选中当前行
    clickDetails(row, event, column) {
      this.$refs.multipleTable.toggleRowSelection(row);
    },

    //每页显示数据量变更
    handlePageChange(obj) {
      this.page = obj.pageNum;
      this.pagesize = obj.pageSize;
      this.firstblood();
    },
    // 选择删除
    delete_data() {
      if (this.selectRowData.length == 0) {
        this.$message.warning("请选择您要操作的数据");
        return;
      } else if (this.selectRowData.length > 1) {
        this.$message({
          message: "每次只能操作单条数据~",
          type: "warning"
        });
        this.$refs.multipleTable.clearSelection();
      } else {
        this.delDataInformation();
      }
    },
    //确认删除
    delDataInformation() {
      this.$confirm("确定要删除吗？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          data_Del_shipperOwnerFrom(this.selectRowData[0].id)
            .then(res => {
              this.$message.success("删除成功");
              this.firstblood();
              this.selectRowData = "";
            })
            .catch(err => {
              this.$message({
                type: "info",
                message: "操作失败，原因：" + err.text ? err.text : err
              });
            });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消"
          });
        });
    },
    // 启用禁用
    handleUseStates() {
      if (this.selectRowData.length == 0) {
        this.$message.warning("请选择您要操作的数据");
        return;
      } else if (this.selectRowData.length > 1) {
        this.$message({
          message: "每次只能操作单条数据~",
          type: "warning"
        });
        this.$refs.multipleTable.clearSelection();
      } else {
        this.selectId.push(this.selectRowData[0].id);
        data_Able_shipperOwnerFrom(this.selectId).then(res => {
          this.selectId.splice(0, 1);
          if (this.selectRowData[0].usingStatus == 1) {
            this.$message.warning("已禁用");
          } else {
            this.$message.success("已启用");
          }
          this.firstblood();
          this.selectRowData = "";
        });
      }
    },
    getDataList() {
      this.firstblood();
      this.$refs.multipleTable.clearSelection();
    }
  },

  mounted() {
    this.getMoreInformation();
    this.firstblood();
    setTimeout(() => {
      this.$refs.multipleTable.$el.style.height =
        this.$refs.multipleTable.$el.offsetHeight + "px";
    }, 300);
  }
};
</script>
<style lang="scss" >
.Marketing {
  .el-cascader {
    margin-top: -10px;
  }
}
</style>


