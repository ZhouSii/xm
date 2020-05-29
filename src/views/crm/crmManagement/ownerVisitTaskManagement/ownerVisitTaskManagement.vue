<template>
  <div class="identicalStyle" v-loading="loading">
    <el-form
      :inline="true"
      :model="searchInfo"
      ref="ruleForm"
      class="demo-ruleForm classify_searchinfo"
    >
      <el-form-item label="任务名称" prop="taskName">
        <el-input v-model.trim="searchInfo.taskName" maxlength="20" clearable></el-input>
      </el-form-item>
      <el-form-item label="发起人" prop="initiator">
        <el-input v-model.trim="searchInfo.initiator" maxlength="20" clearable></el-input>
      </el-form-item>
      <el-form-item label="执行人" prop="executor">
        <el-input v-model.trim="searchInfo.executor" maxlength="20" clearable></el-input>
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
          icon="el-icon-document"
          plain
          :size="btnsize"
          v-if="isvisible === 'all'"
          @click="handleClick('add')"
        >新增</el-button>
        <el-button
          type="primary"
          icon="el-icon-edit-outline"
          plain
          :size="btnsize"
          v-if="isvisible === 'all' || isvisible === 'noStart'"
          @click="handleClick('edit')"
        >修改</el-button>
        <el-button
          type="primary"
          icon="el-icon-view"
          plain
          :size="btnsize"
          @click="handleClick('look')"
        >查看详情</el-button>
        <el-button
          type="primary"
          icon="el-icon-edit-outline"
          plain
          :size="btnsize"
          v-if="isvisible === 'all'"
          @click="handleClick('analysis')"
        >效果分析</el-button>

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
          <el-table-column sortable prop="taskName" label="任务名称" show-overflow-tooltip>
            <template slot-scope="scope">
              <h4 class="needMoreInfo" @click="goDetail(scope.row)">{{ scope.row.taskName }}</h4>
            </template>
          </el-table-column>
          <el-table-column prop="createDept" :show-overflow-tooltip="true" sortable label="发起部门"></el-table-column>
          <el-table-column sortable prop="creator" label="发起人"></el-table-column>
          <el-table-column prop="groupName" sortable label="执行部门" show-overflow-tooltip></el-table-column>
          <el-table-column prop="salesmanName" sortable label="执行人"></el-table-column>
          <el-table-column prop="startTime" show-overflow-tooltip sortable label="开始时间"></el-table-column>
          <el-table-column sortable prop="endTime" label="结束时间" show-overflow-tooltip></el-table-column>
          <el-table-column prop="taskStatus" sortable width="150" label="任务状态"></el-table-column>
          <el-table-column prop="taskTypeName" sortable width="150" label="任务类型"></el-table-column>
          <el-table-column sortable prop="createTime" label="创建时间" show-overflow-tooltip></el-table-column>
        </el-table>
      </div>
    </div>
    <div class="info_tab_footer">
      共计:{{ totalCount }}
      <div class="show_pager">
        <Pager :total="totalCount" @change="handlePageChange" ref="pager" />
      </div>
    </div>
    <owner-dialog :formData="formData"></owner-dialog>
  </div>
</template>
<script>
import Pager from '@/components/Pagination/index'
import { platformList, platformId } from '@/api/crm/ownerVisitTaskManagement.js'
import { data_get_couponActivehand_list } from '@/api/marketing/shippermarkting/couponActive.js'
import ownerDialog from './ownerDialog'
export default {
  name: 'ownerVisitTaskManagement',
  props: {
    isvisible: {
      type: String,
      default: 'all'
    }
  },
  data() {
    return {
      loading: false,
      searchInfo: {
        // 搜索条件
        taskName: '',
        initiator: '',
        executor: ''
      },
      //   修改或新增数据
      formData: {
        type: 'add', // 弹窗类型
        show: false, // 是否显示弹窗
        //   基本信息栏
        name: '名称', // 名称
        startTime: '', // 开始时间
        endTime: '', // 结束时间
        // executive: "", //执行部门
        // executiveMan: "", //执行人
        projectedCost: '', // 预计成本
        taskType: '', // 任务类型
        taskSpecification: '', // 任务说明
        // 货主列表栏
        ownerList: [], // 货主列表
        // 任务配置栏
        isHomeVisits: '0', // 是否需要上门拜访，0是，1否
        couponActivity: '', // 优惠劵活动
        couponActivityList: [], // 优惠劵活动列表
        couponDisbursement: '0', // 优惠券发放方式
        belongSalesmanName: null,
        belongSalesman: null,
        belongSalesmanMobile: null,
        belongSalesmanId: null,
        belongSalesmanCode: null,
        groupName: null,
        groupCode: null,
        groupId: null
      },
      saveDate: null, // 被选中的数据
      btnsize: 'mini', // 按钮大小
      totalCount: 0, // 合计数据
      page: 1, // 页码
      pagesize: 20, // 一页展示多少数据
      tableData: [] // 渲染数据
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.query()
      this.getCouponActivehandList()
      if (this.$store.state.dataCenter.shipperData && this.$store.state.dataCenter.shipperData.length > 0) {
        this.formData.ownerList = this.$store.state.dataCenter.shipperData
        this.handleClick('add')
      }
    })
  },
  destroyed() {
    this.$store.state.dataCenter.shipperData = []
  },
  methods: {
     // 获取优惠券活动
    getCouponActivehandList() {
      data_get_couponActivehand_list(1, 30, {
        usingStatus: '1'
      }).then(res => {
        this.formData.couponActivityList = res.data.list
      })
    },
    //   获取数据
    query() {
      const self = this
      self.loading = true
      const params = {
        creator: self.searchInfo.initiator,
        executor: self.searchInfo.executor,
        pageNum: self.page,
        pageSize: self.pagesize,
        taskName: self.searchInfo.taskName,
        taskStatus:
          self.isvisible === 'all'
            ? ''
            : self.isvisible === 'noStart'
            ? '1'
            : self.isvisible === 'underway'
            ? '2'
            : '3'
      }
      platformList(params)
        .then(res => {
          if (res.status === 200) {
            self.tableData = res.data.list
            self.totalCount = res.data.total
            self.loading = false
          } else {
            self.loading = false
            self.$message.error(res.errorInfo)
          }
        })
        .catch(err => {
          self.loading = false
          self.$message.error(err.errorInfo)
        })
    },
    //   搜索与清空
    handleSearch(type) {
      if (type === 'search') {
        // 搜索
        this.$refs.pager.pageNum = 1
        this.page = 1
        this.query()
      } else {
        // 清空
        this.searchInfo = {
        // 搜索条件
          taskName: '',
          initiator: '',
          executor: ''
        }
        this.$refs.pager.pageNum = 1
        this.page = 1
        this.query()
      }
    },
    // 新增，修改，查看详情
    handleClick(type) {
      if (type === 'add') {
        // 新增
        this.formData.show = true
        this.formData.type = 'add'
        this.formData.isNeedVisit = '1'
        this.formData.provideWay = '0'
        this.$refs.multipleTable.clearSelection()
      } else if (type === 'edit') {
        // 修改
        if (this.saveDate && this.saveDate.length === 1) {
          platformId(this.saveDate[0].id).then(res => {
            var obj = {
              show: true,
              type: 'edit',
              belongSalesmanName: res.data.salesmanName,
              belongSalesmanId: res.data.salesmanId,
              belongSalesman: res.data.salesmanName,
              ownerList: res.data.shipperList,
              taskId: this.saveDate[0].id
            }
            this.formData = Object.assign(this.formData, obj, res.data)
            // console.log(this.formData,'this.formData')
          })
        } else if (!this.saveDate || this.saveDate.length === 0) {
          this.$message.info('请先选择您要操作的任务')
        } else {
          this.$message.info('每次只能操作单条数据~')
          this.$refs.multipleTable.clearSelection()
        }
      } else if (type === 'analysis') {
        // 效果分析
        if (this.saveDate && this.saveDate.length === 1) {
          const mobileList = []
          this.saveDate[0].shipperList.forEach(item => {
            mobileList.push(item.mobile)
          })
          this.$router.push({
            path: '/dataCenter/ownerDataAnalysis/shippersOrderAnalysis',
            query: {
              mobileList: mobileList.join(',')
            }
          })
        } else if (!this.saveDate || this.saveDate.length === 0) {
          this.$message.info('请先选择您要操作的任务')
        } else {
          this.$message.info('每次只能操作单条数据~')
          this.$refs.multipleTable.clearSelection()
        }
      } else {
        // 查看详情
        if (this.saveDate && this.saveDate.length === 1) {
          this.$router.push({
            path: '/crm/crmManagement/ownerVisitTaskManagementDetail',
            query: {
              id: this.saveDate[0].id
            }
          })
        } else if (!this.saveDate || this.saveDate.length === 0) {
          this.$message.info('请先选择您要操作的任务')
        } else {
          this.$message.info('每次只能操作单条数据~')
          this.$refs.multipleTable.clearSelection()
        }
      }
    },
    // 查看详情
    goDetail(item) {
      this.saveDate = []
      this.saveDate.push(item)
      this.handleClick()
    },
    // 获取被选中的数据
    getSelection(item) {
      this.saveDate = item
    },
    // 点击行选中与取消
    clickDetails(item) {
      this.$refs.multipleTable.toggleRowSelection(item)
    },
    handlePageChange(obj) {
      this.pagesize = obj.pageSize
      this.page = obj.pageNum
      this.query()
    }
  },
  components: {
    Pager,
    ownerDialog
  }
}
</script>
