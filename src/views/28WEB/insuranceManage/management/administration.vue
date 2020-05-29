<template>
  <div class="identicalStyle" style="height:100%" v-loading="loading">
    <el-form :inline="true" class="demo-ruleForm classify_searchinfo">
      <el-form-item label="投保">
        <el-input v-model="formAllData.insuranceName" placeholder="保险公司/产品名称/被保险人" class="lll-pl" clearable></el-input>
      </el-form-item>
      <el-form-item label="投保时间 ">
        <el-date-picker
          v-model="searchCreatTime"
          :default-value="defaultTime"
          type="daterange"
          align="right"
          popper-class='searchCreatTime'
          value-format="yyyy-MM-dd"
          start-placeholder="开始日期"
          :picker-options="pickerOptions2"
          end-placeholder="结束日期">
        </el-date-picker>
      </el-form-item>
      <el-form-item class="btnChoose fr">
        <el-button type="primary" plain :size="btnsize" icon="el-icon-search" @click="getdata_search">搜索</el-button>
        <el-button type="info" plain :size="btnsize" icon="fontFamily aflc-icon-qingkong" @click="clearSearch">清空
        </el-button>
      </el-form-item>
    </el-form>
    <div class="classify_info"> 
      <div class="info_news">
        <div class="btns_box">
          <el-button type="primary" plain  size="small" @click="viewDetail">查看详情</el-button>
        </div>
        <el-table ref="multipleTable" style="width: 100%" stripe border height="100%" @selection-change="getSelection"
                  @row-click="clickDetails" highlight-current-row :data="tableDataAll" tooltip-effect="dark"
                  class="table-lll">
          <el-table-column fixed sortable type="selection" width="50"></el-table-column>
          <el-table-column label="序号" sortable width="80">
            <template slot-scope="scope">
              {{ (page - 1)*pagesize + scope.$index + 1 }}
            </template>
          </el-table-column>
          <el-table-column label="投保单号" prop="insuranceNum"></el-table-column>
          <el-table-column label="保险公司" prop="insuranceCompany"></el-table-column>
          <el-table-column label="保费金额" prop="insuranceFee"></el-table-column>
          <el-table-column label="投保日期" prop="createTime"></el-table-column>
          <el-table-column label="运单号" prop="orderNum"></el-table-column>
          <el-table-column label="状态" prop="paymentStateName"></el-table-column>
        </el-table>
        <div class="info_tab_footer">共计:{{ dataTotal }}
          <div class="show_pager">
            <Pager :total="dataTotal" @change="handlePageChange" :sizes="sizes" ref="pager"/>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import {pickerOptions2, parseTime} from '@/utils/index.js'
  import Pager from '@/components/Pagination/index'
  import {postInsuranceList} from '@/api/web/insurance'

  export default {
    name: "administration",
    components: {
      Pager
    },
    props: {
      listtype: {
        type: String,
        default: 'all'
      },
      isvisible: {
        type: Boolean,
        default: false
      }
    },
    watch: {
      listtype: {
        handler(newVal, oldVal) {
          if (newVal === 'all') {
            this.$set(this.formAllData, 'paymentState', '')
            this.fetchData()
          }
          else if (newVal === 'payFor') {
            this.$set(this.formAllData, 'paymentState', 0)
            this.fetchData()
          }
          else if (newVal === 'isPayfor') {
            this.$set(this.formAllData, 'paymentState', 1)
            this.fetchData()
          }
          this.searchCreatTime = this.defaultTime
          this.formAllData.insuranceName = ''
        },
        immediate: true
      },

      tabsNameFn: {
        handler(n) {

        },
        immediate: true
      }
    },
    data() {
      return {
        timeOutNoDriver: null,
        searchCreatTime: [],
        defaultTime: [parseTime(+new Date() - 60 * 24 * 60 * 60 * 1000, '{y}-{m}-{d}'), parseTime(new Date(), '{y}-{m}-{d}')],
        tableDataAll: [],
        selected: [],
        btnsize: 'mini',
        ExtractTime: null,
        loading: false,
        formAllData: {
          beginTime: '',
          endTime: '',
          insuranceName: '',
        },
        dataTotal: 0,
        pagesize: 20,//每页显示数
        page: 1,//当前页
        sizes: [20, 50, 100, 400],
        pickerOptions2: {
          shortcuts: pickerOptions2
        }
      }
    },
    mounted() {
      this.searchCreatTime = this.defaultTime
    },
    methods: {
      fetchList() {
        this.loading = true
        postInsuranceList(this.page, this.pagesize, this.formAllData).then(data => {
          this.tableDataAll = data.data.list
          this.dataTotal = data.data.total
          this.loading = false
        })
      },
      fetchData() {
        this.eventBus.$emit('updateListCount')
        this.fetchList()
      },
      viewDetail() {
        if (!this.selected.length) {
          this.$message.info('请选择要操作的项~')
          return false
        }
        if (this.selected.length > 1) {

          this.$message.info('每次只能操作单条数据~')
          this.$refs.multipleTable.clearSelection()
          return false
        }
        this.$router.push({
          path: '/28WEB/insuranceManage/management/detail', query: {
            id: this.selected[0].id
          }
        })
      },
      getdata_search() {
        this.formAllData.beginTime = Date.parse(this.searchCreatTime[0] + ' 00:00:00')
        this.formAllData.endTime = Date.parse(this.searchCreatTime[1] + ' 23:59:59')
        this.fetchData()
      },
      clearSearch() {
        this.searchCreatTime = []
        this.formAllData.beginTime = ''
        this.formAllData.endTime = ''
        this.formAllData.insuranceName = ''
        this.fetchData()
      },
      handlePageChange(obj) {
        this.page = obj.pageNum
        this.pagesize = obj.pageSize
        this.fetchData()
      },
      getSelection(selected) {
        this.selected = selected
      },
      clickDetails(row, event, column) {
        this.$refs.multipleTable.toggleRowSelection(row)
      },
    }
  }
</script>

<style lang="scss">
  .lll-pl.el-input {
    .el-input__inner {
      width: 104% !important;
    }
  }

  .table-lll {

    .el-table__body-wrapper.is-scrolling-none {
      max-height: 640px;
      min-height: 640px;
      overflow-y: auto;
    }

  }
</style>
