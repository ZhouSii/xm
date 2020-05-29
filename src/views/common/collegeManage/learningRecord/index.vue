<template>
    <div class="TwoColumns clearfix" v-loading ="loading">
        <div class="columnsContainer">
            <div class="side_right">
            <el-form :inline="true" ref="ruleForm" class="demo-ruleForm classify_searchinfo">
                <el-form-item label="课程分类">
                  <el-cascader
                    size="mini"
                    clearable
                    expand-trigger="hover"
                    :options="classificationList"
                    v-model="classification"
                    :props="props"
                    @change="handleChange">
                  </el-cascader>
                </el-form-item>
                <el-form-item label="车主">
                  <el-input v-model="keyword" clearable placeholder="姓名/手机号码"></el-input>
                </el-form-item>
                <el-form-item class="fr">
                  <el-button type="primary" size="mini" icon="el-icon-search" plain @click="searchClick()" >查询</el-button>
                  <el-button type="info" size="mini" icon="fontFamily aflc-icon-qingkong" plain @click="clearClick()">清空</el-button>
                </el-form-item>
              </el-form>

                <div class="side_right_bottom clearfix">
                    <div class="info_news">
                        <el-table ref="multipleTable" :data="tableData" :span-method="objectSpanMethod" stripe border height="100%" tooltip-effect="dark" style="width: 100%" >
                            <el-table-column label="序号" width="60">
                                <template slot-scope="scope">
                                    {{ scope.$index + 1 }}
                                </template>
                            </el-table-column>  
                            <el-table-column sortable min-width="176" label="课程分类名称">
                              <template slot-scope="scope">
                                <div>{{scope.row.servicename }} - {{scope.row.courseid }}</div>
                                <div v-if="scope.row.status === 'on'">(当前状态:发布)</div>
                                <div v-else>(当前状态:下架)</div>
                              </template>
                            </el-table-column>
                            <el-table-column sortable min-width="176" label="车主姓名/手机号码">
                              <template slot-scope="scope">
                                <div><span v-if="scope.row.drivername">{{scope.row.drivername }} /</span> {{scope.row.mobile }}</div>
                              </template>
                            </el-table-column>
                            <el-table-column prop="updatetime" sortable min-width="176" label="学习开始时间">
                              <template slot-scope="scope">{{ scope.row.starttime }}</template>
                            </el-table-column>
                          <el-table-column prop="updatetime" sortable min-width="176" label="学习结束时间">
                            <template slot-scope="scope">{{ scope.row.endtime }}</template>
                          </el-table-column>
                            <el-table-column prop="duration" width="140" sortable label="用时">
                              <template slot-scope="scope">
                                <div v-if="scope.row.duration">{{scope.row.duration}}分</div>
                              </template>
                            </el-table-column>
                          <el-table-column prop="finishstatus" width="140" sortable label="学习结果">
                            <template slot-scope="scope">
                              <div v-if="scope.row.finishstatus === '1'">完成</div>
                              <div v-else>未完成</div>
                            </template>
                          </el-table-column>
                        </el-table>
                    </div>
                </div>
            </div>
        </div>
        <!-- 页码 -->
      <div class="info_tab_footer">共计:{{ dataTotal }} <div class="show_pager"> <Pager :total="dataTotal" @change="handlePageChange"  ref="pager"/></div> </div>


    </div>
</template>

<script type="text/javascript">
import fetch from '@/utils/fetch'
import Pager from '@/components/Pagination/index'
import editor from '@/components/tinymac/index'
export default{
  data() {
    return {
      loading: false,
      dialogFormVisible: false,
      btntitle: '',
      page: 1,
      pagesize: 20,
      dataTotal: 0,
      classificationList: [],
      classification: [],
      courseid: '', // 课程分类
      serviceid: '', // 服务分类
      keyword: '',
      tableData: [],
      props: {
        label: 'name',
        value: 'code',
        children: 'children'
      },
      Arr: [],
      Pos: 0
    }
  },
  components: {
    Pager,
    editor
  },
  created() {
    fetch({ url: `/${this.$cms}/usercenter/aflcdriverlearningcourse/v1/listCourseCateMenu`, method: 'post', data: {}}).then((res) => {
      if (res.status === 200) {
        this.classificationList = res.data
      }
    }).catch(err => {
      this.$message({
        type: 'info',
        message: '操作失败，原因：' + (err.errorInfo ? err.errorInfo : err.text)
      })
    })
    this.getList()
  },
  mounted() {},

  methods: {
    handleChange(value) {
      this.serviceid = value[0]
      this.courseid = value[1]
    },
    searchClick() {
      this.page = 1
      const parm = {
        serviceid: this.serviceid,
        courseid: this.courseid,
        keyword: this.keyword
      }
      this.getList(parm)
    },
    clearClick() {
      this.page = 1
      this.keyword = ''
      this.classification = []
      this.courseid = ''
      this.serviceid = ''
      this.getList()
    },
    getList(parm = {}) {
      this.loading = true
      fetch({ url: `/${this.$cms}/usercenter/aflcdriverlearningcourse/v1/viewLearningResult?pageNum=${this.page}&pageSize=${this.pagesize}`, method: 'post', data: parm }).then((res) => {
        if (res.status === 200) {
          this.tableData = res.data.list
          this.dataTotal = res.data.total
          this.loading = false
          this.merage()
        }
      }).catch(err => {
        this.$message({
          type: 'info',
          message: '操作失败，原因：' + (err.errorInfo ? err.errorInfo : err.text)
        })
        this.loading = false
      })
    },
    handlePageChange(obj) {
      this.page = obj.pageNum
      this.pagesize = obj.pageSize
      this.getList()
    },
    objectSpanMethod({ row, column, rowIndex, columnIndex }) {
      if (columnIndex === 1) {
        const _row_1 = this.Arr[rowIndex]
        const _col_1 = _row_1 > 0 ? 1 : 0
        return { rowspan: _row_1, colspan: _col_1 }
      }
    },
    merage() {
      this.merageInit()
      for (let i = 0; i < this.tableData.length; i++) {
        if (i === 0) {
          this.Arr.push(1)
          this.Pos = 0
        } else {
          if (`${this.tableData[i].serviceidName} - ${this.tableData[i].courseid}` === `${this.tableData[i - 1].serviceidName} - ${this.tableData[i - 1].courseid}`) {
            this.Arr[this.Pos] += 1
            this.Arr.push(0)
          } else {
            this.Arr.push(1)
            this.Pos = i
          }
        }
      }
    },

    merageInit() {
      this.Arr = []
      this.Pos = 0
    }

  }
}
</script>

<style type="text/css" lang="scss" scoped>

</style>
