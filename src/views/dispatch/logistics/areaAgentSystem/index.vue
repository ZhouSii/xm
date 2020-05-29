<template>
  <div class="identicalStyle trunkLinePriceList" v-loading="loading">
    <el-form
      :inline="true"
      :model="listSystemObj.vo"
      ref="ruleForm"
      class="demo-ruleForm classify_searchinfo"
    >
      <el-form-item label="区代名称" prop="agencyName">
        <el-input v-model="listSystemObj.vo.agencyName" clearable></el-input>
      </el-form-item>
      <el-form-item label="区代公司名称" prop="companyName">
        <el-input v-model="listSystemObj.vo.companyName" clearable></el-input>
      </el-form-item>
      <el-form-item label="区代所在地" prop="agencyArea">
        <el-input v-model="listSystemObj.vo.agencyArea" clearable></el-input>
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
      </el-form-item>
    </el-form>
    <div class="classify_info">
      <div class="btns_box">
        <el-button
          type="primary"
          icon="el-icon-circle-plus"
          plain
          @click="handleClick('new')"
          :size="btnsize"
          v-has:DISPATCH_HAIRLOGISTICS_DISTRICTMANAGEMENT_ADD
        >新增</el-button>
        <el-button
          type="primary"
          :size="btnsize"
          plain
          icon="el-icon-edit"
          @click="handleClick('revise')"
          v-has:DISPATCH_HAIRLOGISTICS_DISTRICTMANAGEMENT_MODIFY
        >修改</el-button>
        <el-button
          type="primary"
          :size="btnsize"
          plain
          icon="el-icon-warning"
          @click="handleClick('reset')"
        >重置区代登录密码</el-button>
        <el-button
          type="primary"
          :size="btnsize"
          plain
          icon="el-icon-circle-plus"
          @click="handleClick('newTMS')"
        >开通区代TMS账号</el-button>
        <!-- <el-button type="primary" icon="el-icon-document" plain @click="handleClick('batch')" :size="btnsize">批量增加运作路线</el-button> -->
      </div>
      <div class="info_news">
        <el-table
          ref="multipleTable"
          :data="tableData"
          stripe
          border
          align="center"
          height="100%"
          @selection-change="getinfomation"
          tooltip-effect="dark"
          @row-click="clickDetails"
          style="width: 100%"
        >
          <el-table-column label="选择" width="60" align="center">
            <template slot-scope="scope">
              <el-radio class="radio" v-model="radio" :label="scope.row.id">&nbsp;</el-radio>
            </template>
          </el-table-column>
          <el-table-column label="序号" width="60">
            <template slot-scope="scope">
              {{
              (listSystemObj.currentPage - 1) * listSystemObj.pageSize +
              scope.$index +
              1
              }}
            </template>
          </el-table-column>
          <el-table-column
            label="区代名称"
            sortable
            :show-overflow-tooltip="true"
            prop="agencyName"
            min-width="150"
          >
            <template slot-scope="scope">
              <h4
                class="needMoreInfo"
                @click="handleClick('details', scope.row)"
              >{{ scope.row.agencyName }}</h4>
            </template>
          </el-table-column>
          <el-table-column
            prop="companyName"
            :show-overflow-tooltip="true"
            sortable
            label="区代物流公司"
            min-width="200"
          ></el-table-column>
          <el-table-column
            :show-overflow-tooltip="true"
            sortable
            prop="agencyArea"
            label="区代所在地"
            min-width="150"
          ></el-table-column>
          <el-table-column sortable prop="contactName" min-width="150" label="区代联系人"></el-table-column>
          <el-table-column sortable prop="mobile" label="联系电话" min-width="150"></el-table-column>
          <el-table-column sortable prop="agencyMobile" label="客服电话" min-width="150"></el-table-column>
          <el-table-column sortable prop="salesmanName" min-width="150" label="所属业务员"></el-table-column>
          <el-table-column sortable prop="startTime" label="运作开始日期" min-width="150">
            <template slot-scope="scope">{{ scope.row.startTime | parseTime("{y}-{m}-{d}") }}</template>
          </el-table-column>
          <el-table-column sortable prop="endTime" label="运作结束日期" min-width="150">
            <template slot-scope="scope">{{ scope.row.endTime | parseTime("{y}-{m}-{d}") }}</template>
          </el-table-column>
          <!-- <el-table-column label="操作" fixed="right" width="100">
          <template slot-scope="scope">-->
          <!-- <el-button
                            :size="btnsize"
                            type="primary"
                            plain
          @click="handleClick('coverStreet',scope.row)">运作覆盖街道</el-button>-->
          <!-- <el-button
                            :size="btnsize"
                            type="primary"
                            plain
          @click="handleClick('line',scope.row)">运作线路</el-button>-->
          <!-- <el-button
                            :size="btnsize"
                            type="primary"
                            plain
          @click="handleClick('revise',scope.row)">修改</el-button>-->
          <!-- </template>
          </el-table-column>-->
        </el-table>
      </div>
    </div>
    <!-- 页码 -->
    <div class="info_tab_footer">
      共计:{{ dataTotal }}
      <div class="show_pager">
        <Pager :total="dataTotal" @change="handlePageChange" ref="pager" />
      </div>
    </div>
    <add
      :dialogFormVisible.sync="dialogFormVisible"
      :isModify="isModify"
      :isView="isView"
      :changeForm="changeForm"
      :formtitle="formtitle"
      @renovate="firstblood"
    />
    <!-- <coverStreet :dialogFormVisibleCoverStreet.sync = "dialogFormVisibleCoverStreet" :isStreet="isStreet" :lineId="currentlineId" :formtitle = "coverFormtitle"  @renovate="firstblood"/> -->
    <!-- <batchLine :dialogFormVisibleBatchLine.sync = "dialogFormVisibleBatchLine" @renovate="firstblood"/> -->
    <!-- <detailsInfoamation :dialogFormVisibleDetails.sync = "dialogFormVisibleDetails" :lineId="currentlineId"/> -->
  </div>
</template>

<script type="text/javascript">
// import { areaAgentSystemList } from '@/api/dispatch/areaAgentSystem.js'
import {
  areaAgentSystemList2,
  resetPassword,
  newAreaAgentTMS
} from '@/api/dispatch/areaAgentSystem.js'
// import { DicTradeCarrier } from '@/api/common.js'
import Pager from '@/components/Pagination/index'
import add from './add1'
// import coverStreet from './coverStreet'
// import batchLine from './batchLine'
// import detailsInfoamation from './detailsInfoamation'

export default {
  components: {
    Pager,
    add
    // coverStreet,
    // batchLine,
    // detailsInfoamation
  },
  data() {
    return {
      selected: {},
      radio: '',
      btnsize: 'mini',
      loading: false, // 加载
      dialogFormVisible: false,
      dialogFormVisibleCoverStreet: false,
      dialogFormVisibleBatchLine: false,
      dialogFormVisibleDetails: false,
      isModify: false,
      // isStreet:false,
      isView: false,
      changeForm: {},
      currentlineId: '',
      formtitle: '',
      coverFormtitle: '',
      dataTotal: 0,
      ids: [],
      tableData: [],
      listSystemObj: {
        currentPage: 1,
        pageSize: 20,
        vo: {
          agencyArea: '', // 区代所在地
          agencyName: '', // 区代名称
          companyName: '' // 区代公司名称
        }
      }
    }
  },
  mounted() {
    this.firstblood()
  },
  methods: {
    handlePageChange(obj) {
      this.listSystemObj.currentPage = obj.pageNum
      this.listSystemObj.pageSize = obj.pageSize
      this.firstblood()
    },
    // 刷新页面
    firstblood() {
      this.loading = true
      areaAgentSystemList2(this.listSystemObj)
        .then(res => {
          this.tableData = res.data.list
          this.dataTotal = res.data.totalCount
          this.loading = false
        })
        .catch(err => {
          this.loading = false
        })
    },
    // 模糊查询 分类名称或者code
    handleSearch(type) {
      if (type == 'clear') {
        this.listSystemObj.vo = {
          agencyName: '', // 区代名称
          companyName: '' // 区代公司名称
        }
      }
      if (this.listSystemObj.currentPage != 1) {
        this.listSystemObj.currentPage = 1
        this.$refs.pager.inputval = this.listSystemObj.currentPage
        this.$refs.pager.pageNum = this.listSystemObj.currentPage
      }
      this.firstblood()
    },
    handleClick(type, row) {

      if (type === 'details' && row) {
        this.selected = row
      }
      if (this.selected.id || type === 'new' || type === 'details') {
        switch (type) {
          case 'new':
            this.formtitle = '新增区代'
            this.isModify = false
            this.isView = false
            this.dialogFormVisible = true
            break
          case 'revise':
            this.changeForm = this.selected
            this.formtitle = '修改区代基础信息'
            this.isModify = true
            this.isView = false
            this.dialogFormVisible = true
            break
          case 'reset':
            const resetId = []
            resetId.push(this.selected.companyAccount)
            this.$confirm('确认将区代的登录密码重置为123456吗？', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
            })
              .then(() => {
                resetPassword(resetId)
                  .then(res => {
                    this.$message({
                      type: 'success',
                      message: '区代登录密码重置成功!'
                    })
                  })
                  .catch(err => {
                    this.$message({
                      type: 'info',
                      message:
                        '操作失败，原因：' +
                        (err.errorInfo ? err.errorInfo : err.text)
                    })
                  })
              })
              .catch(() => {
                this.$message({
                  type: 'info',
                  message: '已取消'
                })
              })
            break
          // case 'coverStreet':
          //     this.dialogFormVisibleCoverStreet = true;
          //     this.coverFormtitle = '维护区代运作覆盖街道';
          //     this.currentlineId = this.selected.id;
          //     this.isStreet = true;
          //     break;
          // case 'line':
          //     this.dialogFormVisibleCoverStreet = true;
          //     this.coverFormtitle = '维护区代运作路线';
          //     this.currentlineId = this.selected.id;
          //     this.isStreet = false;
          //     break;
          // case 'batch':
          //     this.dialogFormVisibleBatchLine = true;
          //     break;
          case 'details':
            this.changeForm = this.selected
            this.formtitle = '区代详情'
            this.isModify = false
            this.isView = true
            this.dialogFormVisible = true
            break
          case 'newTMS':
            this.$message.info('操作中...')
            newAreaAgentTMS(this.selected.id)
              .then(res => {
                this.$message.success('开通成功')
              })
              .catch(err => {
                this.$message.error(err.errorInfo || err.text)
              })
            break
        }
      } else {
        this.$message({
          type: 'warning',
          message: '请选择一条列表数据!'
        })
      }
      // 清除选中状态，避免影响下个操作
      // this.$refs.multipleTable.clearSelection();
    },
    // 判断是否选中
    getinfomation(selection) {
      // this.checkedinformation = selection
    },
    // 点击选中当前行
    clickDetails(row, event, column) {
      // this.$refs.multipleTable.toggleRowSelection(row)
      this.radio = row.id
      this.selected = row
    }
  }
}
</script>

<style type="text/css" lang="scss" scoped>
.trunkLinePriceList {
  height: 100%;
}
</style>
