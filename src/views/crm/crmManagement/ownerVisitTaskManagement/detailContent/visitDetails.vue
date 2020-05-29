<template>
  <div class="identicalStyle visitDetails" v-loading="loading">
    <el-form
      :inline="true"
      :model="searchInfo"
      ref="ruleForm"
      class="demo-ruleForm classify_searchinfo"
    >
      <el-form-item label="手机号码" prop="mobile">
        <el-input v-model.trim="searchInfo.mobile" maxlength="20" clearable></el-input>
      </el-form-item>
      <el-form-item label="公司名称" prop="name">
        <el-input v-model.trim="searchInfo.name" maxlength="20" clearable></el-input>
      </el-form-item>
      <el-form-item label="联系人" prop="contacts">
        <el-input v-model.trim="searchInfo.contacts" maxlength="20" clearable></el-input>
      </el-form-item>
      <el-form-item label="拜访状态" prop="visitState">
        <el-select v-model="searchInfo.visitState" placeholder="请选择">
          <el-option
            v-for="item in visitStateOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item class="btnChoose fr" style="margin-left:0;">
        <el-button
          type="primary"
          :size="btnsize"
          icon="el-icon-search"
          plain
          @click="handleSearch('search')"
        >搜索</el-button>
        <el-button
          type="info"
          icon="fontFamily aflc-icon-qingkong"
          :size="btnsize"
          plain
          @click="handleSearch('clear')"
        >清空</el-button>
      </el-form-item>
    </el-form>
    <div class="classify_info">
      <div class="btns_box">
        <el-button
          type="primary"
          icon="el-icon-view"
          plain
          :size="btnsize"
          @click="handleClick"
        >拜访记录详情</el-button>
      </div>
      <div class="info_news">
        <el-table
          ref="multipleTable"
          :data="tableData"
          stripe
          border
          height="100%"
          @selection-change="getSelection"
          @row-click="clickDetails"
          tooltip-effect="dark"
          style="width: 100%"
        >
          <el-table-column type="selection" width="50"></el-table-column>
          <el-table-column label="序号" width="60">
            <template slot-scope="scope">{{ (page - 1)*pagesize + scope.$index + 1 }}</template>
          </el-table-column>
          <el-table-column prop="mobile" sortable label="手机号码" width="150">
            <template slot-scope="scope">
              <h4 class="needMoreInfo" @click="goDetail(scope.row)">{{ scope.row.mobile}}</h4>
            </template>
          </el-table-column>
          <el-table-column
            prop="companyName"
            :show-overflow-tooltip="true"
            sortable
            label="公司名称"
            width="200"
          ></el-table-column>
          <el-table-column sortable prop="contacts" label="联系人" width="100"></el-table-column>
          <el-table-column prop="potentialGradeName" sortable label="同城潜力等级" width="200"></el-table-column>
          <el-table-column prop="shipperType" sortable label="货主类型" width="100"></el-table-column>
          <el-table-column
            prop="belongCity"
            :show-overflow-tooltip="true"
            sortable
            label="所在地"
            width="200"
          ></el-table-column>
          <el-table-column prop="tradeAreaName" sortable width="200" label="所属商圈"></el-table-column>
          <el-table-column prop="companyAddress" sortable width="200" label="企业地址"></el-table-column>
          <el-table-column prop="belongGroup" sortable width="100" label="所属业务组"></el-table-column>
          <el-table-column sortable prop="belongSalesman" label="所属业务员" width="100"></el-table-column>
          <el-table-column sortable prop="belongIndustry" label="所属行业" width="100"></el-table-column>
          <el-table-column sortable label="拜访状态" width="100">
            <template slot-scope="scope">{{ !!scope.row.visitTime ? '已拜访' : '未拜访'}}</template>
          </el-table-column>
          <el-table-column sortable prop="visitTime" label="拜访时间" width="150"></el-table-column>
        </el-table>
      </div>
    </div>
    <div class="info_tab_footer">
      共计:{{ totalCount }}
      <div class="show_pager">
        <Pager :total="totalCount" @change="handlePageChange" ref="pager" />
      </div>
    </div>

    <el-dialog
      title="拜访记录详情"
      :visible.sync="showDialog"
      width="90%"
      top="4vh"
      class="StyleNewinfoComponent commoncss"
      :before-close="handleClose"
    >
      <div class="taskDetails">
        <h2 class="carNewinfoH2">货主信息</h2>
        <p>
          <span>企业名称:</span>
          <span>{{selectData.companyName}}</span>
        </p>
        <p>
          <span>联系人:</span>
          <span>{{selectData.contacts}}</span>
        </p>
        <p>
          <span>手机号码:</span>
          <span>{{selectData.mobile}}</span>
        </p>
      </div>
      <div class="taskDetails">
        <p>
          <span>货主类型:</span>
          <span>{{selectData.shipperType}}</span>
        </p>
        <p>
          <span>所在地:</span>
          <span>{{selectData.belongCity}}</span>
        </p>
        <p>
          <span>同城潜力等级:</span>
          <span>{{selectData.potentialGradeName}}</span>
        </p>
      </div>
      <div class="taskDetails">
        <p>
          <span>行业:</span>
          <span>{{selectData.belongIndustry}}</span>
        </p>
      </div>
      <div class="taskDetails taskDetailsSecond">
        <h2 class="carNewinfoH2">关键问题记录</h2>
        <p>
          <span>有没有盘活的可能性:</span>
          <span>{{selectData.isMayActive == 1 ? '是' : selectData.isMayActive == 0 ? '否' : '' }}</span>
        </p>
        <p>
          <span>是否需要二次跟进:</span>
          <span>{{selectData.isAgainVisit == 1 ? '是' : selectData.isAgainVisit == 2 ? '否' : ''}}</span>
        </p>
      </div>
      <div class="taskDetails taskDetailsSecond">
        <p>
          <span>用竞争对手的量大不大:</span>
          <span>{{selectData.rivalAmount == 1 ? '大' : selectData.rivalAmount == 2 ? '一般' : selectData.rivalAmount == 3 ? '没有' : '' }}</span>
        </p>
        <p>
          <span>一个月的用车次数:</span>
          <span>{{selectData.useCarCountName}}</span>
        </p>
      </div>
      <div>
        <h2 class="carNewinfoH2">拜访记录</h2>
        <p>
          <span>记录人:</span>
          <span>{{selectData.updater}}</span>
        </p>
        <p>
          <span>记录时间:</span>
          <span>{{selectData.recordTime}}</span>
        </p>
        <p>
          <span>最后修改时间:</span>
          <span>{{selectData.updateTime}}</span>
        </p>
        <el-input type="textarea" :rows="2" v-model="selectData.recordRemark" disabled></el-input>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import Pager from "@/components/Pagination/index";
import { platformShippersList, deleteId } from "@/api/crm/ownerVisitTaskManagement.js";
export default {
  data() {
    return {
      loading: false,
      //搜索信息
      searchInfo: {
        mobile: "", //手机号码
        name: "", //公司名称
        contacts: "", //联系人
        visitState: "3" //拜访状态1:已拜访)，0:未拜访
      },
      //   拜访状态列表
      visitStateOptions: [
        {
          value: "3",
          label: "全部"
        },
        {
          value: "0",
          label: "未拜访"
        },
        {
          value: "1",
          label: "已拜访"
        }
      ],
      // 表格数据
      tableData: [],
      totalCount: 0, //数据总数
      page: 1, //页码
      pagesize: 20, //一页展示多少数据
      btnsize: "mini",
      showDialog: false, // 是否展示dialog
      saveDate: null, //临时存储的数据
      selectData:{}, //被选中的弹窗数据
      
    };
  },
  methods: {
    //搜索和清空
    handleSearch(type) {
      if (type === "clear") {
        // type === 'clear' 清空
        this.searchInfo = {
          mobile: "", //手机号码
          name: "", //公司名称
          contacts: "", //联系人
          visitState: "3" //拜访状态1:已拜访)，0:未拜访
        };
      }
      this.page = 1
      this.query();
    },
    // 获取拜访详情
    query() {
      const id = this.$route.query.id;
      const params = {
        pageNum: this.page,
        pageSize: this.pagesize,
        taskId: id, //任务id
        mobile: this.searchInfo.mobile, //手机号
        contacts: this.searchInfo.contacts, //联系人
        companyName: this.searchInfo.name, //公司名
        visitStatus:
          parseInt(this.searchInfo.visitState) < 2
            ? this.searchInfo.visitState
            : null //拜访状态
      };
      this.loading = true;
      platformShippersList(params)
        .then(res => {
          if (res.status === 200) {
            this.tableData = res.data.list;
            this.totalCount = res.data.total;
          } else {
            this.$message.info(res.errorInfo);
          }
          this.loading = false;
        })
        .catch(err => {
          this.loading = false;
          this.$message.error(err.errorInfo);
        });
    },
    // 查看拜访记录
    handleClick() {
       if ( this.saveDate && this.saveDate.length === 1 ) {
          this.showDialog = true;
          deleteId(this.saveDate[0].id)
            .then(res => {
              if (res.status === 200) {
                 this.selectData = res.data;
              } else {
                this.$message.info(res.errorInfo);
              }
            })
            .catch(err => {
              this.$message.error(err.errorInfo);
            });
          console.log(this.selectData,'datdtadttadtadtadtdat')
        } else if ( !this.saveDate || this.saveDate.length === 0 ) {
          this.$message.info('请先选择您要操作的任务')
        } else {
          this.$message.info('每次只能操作单条数据~')
          this.$refs.multipleTable.clearSelection();
        }
      
    },
    // 打开详情
    goDetail(item) {
      this.saveDate = []
      this.saveDate.push(item)
      this.handleClick()
    },
    handleClose() {
      this.showDialog = false;
    },
    getSelection(item) {
      this.saveDate = item
    },
    clickDetails(item) {
      this.$refs.multipleTable.toggleRowSelection(item);
    },
    // 翻页
    handlePageChange(obj) {
      this.pagesize = obj.pageSize;
      this.page = obj.pageNum;
      this.query();
    }
  },
  created() {
    this.query();
  },
  components: {
    Pager
  }
};
</script>
<style scoped lang="scss">
.visitDetails {
  p {
    display: inline-block;
    color: #333333;
    line-height: 20px;
    vertical-align: top;
    width: 30%;
    font-size: 14px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    padding: 20px 10px;
    border: 1px solid #ccc;
    margin-bottom: 4px;
    span {
      text-align: center;
    }
  }
}
.taskDetailsSecond {
  p {
    width: 45%;
  }
}
</style>