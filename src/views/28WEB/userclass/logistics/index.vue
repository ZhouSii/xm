<template>
    <div class="identicalStyle Marketing" style="height:100%" v-loading="loading">
        <el-form :inline="true"  class="demo-ruleForm classify_searchinfo">
          <el-form-item label="出发地">
            <GetCityList ref="start" @returnStr="getStart"></GetCityList>
          </el-form-item>
          <el-form-item label="到达地">
            <GetCityList ref="end" @returnStr="getEnd"></GetCityList>
          </el-form-item>
          <el-form-item label="发布时间">
            <el-date-picker
              v-model="searchCreatTime"
              type="daterange"
              align="right"
              popper-class='searchCreatTime'
              value-format="yyyy-MM-dd"
              start-placeholder="开始日期"
              :picker-options="pickerOptions2"
              end-placeholder="结束日期">
            </el-date-picker>
          </el-form-item>
          <el-form-item label="发布者">
            <el-input v-model="formAllData.publishName" :maxlength="20" placeholder="请输入发布者" auto-complete="off" clearable></el-input>
          </el-form-item>
          <el-form-item class="btnChoose fr">
            <el-button type="primary" :size="btnsize" plain @click="handleSearch('search')" icon="el-icon-search">搜索</el-button>
            <el-button type="info" :size="btnsize" plain @click="handleSearch('clear')" icon="fontFamily aflc-icon-qingkong">清空</el-button>
          </el-form-item>            
        </el-form>
          <div class="classify_info">
            <div class="btns_box">
              <el-button type="primary" :size="btnsize" class="el-icon-circle-plus" @click="doAction('add')" plain>添加</el-button>
              <el-button type="primary" :size="btnsize" class="el-icon-tickets" plain @click="doAction('check')">查看</el-button>
              <el-button type="primary" :size="btnsize" icon="el-icon-delete"  @click="doAction('delete')" plain>删除</el-button>
            </div>
            <div class="info_news">    
              <el-table ref="multipleTable" style="width: 100%" stripe border height="100%" @selection-change="getSelection" @row-click="clickDetails" highlight-current-row :data="dataset"  tooltip-effect="dark">
                <el-table-column
                  label="选择"
                  type="selection"
                  width="50">
                </el-table-column>
                <el-table-column fixed label="序号" sortable width="80">
                  <template slot-scope="scope">
                  {{ (page - 1)*pagesize + scope.$index + 1 }}
                  </template>
                </el-table-column> 
                <el-table-column  label="出发地-到达地" width="300" sortable :show-overflow-tooltip="true">
                  <template slot-scope="scope">
                    {{scope.row.startLocation ? scope.row.startLocation + '-' : ''}}{{ scope.row.endLocation ? scope.row.endLocation : ''}}
                  </template>
                </el-table-column>
                  <el-table-column
                :show-overflow-tooltip="true"
                prop="useCarTime"
                label="发布时间"
                width="200"
                sortable
                >
                <template  slot-scope="scope">
                  <span class="orderSerial">
                    {{ scope.row.createTime | parseTime('{y}-{m}-{d} {h}:{i}:{s}')}}    
                  </span>
                </template>
                </el-table-column>
                <el-table-column  
                  label="发布者" 
                  prop="publishName" 
                  sortable 
                  :show-overflow-tooltip="true"  
                  width="300">
                </el-table-column>
                <el-table-column  label="浏览量" prop="browseNumber" sortable :show-overflow-tooltip="true">
                </el-table-column>       
                <el-table-column  label="线路类型" prop="rangeTypeName" sortable :show-overflow-tooltip="true">
                </el-table-column>  
                <el-table-column  label="有效推荐数" prop="recommendCount" sortable :show-overflow-tooltip="true">
                </el-table-column>    
              </el-table> 
        	  </div> 
          <!-- addReg -->
          <add :selectInfo="selectInfo" :isMatreg="isMatreg" :centerDialogVisible="centerDialogVisible" @close="closeAddReg" @success="getsuccess"></add>
         <!-- 页码 -->
          <div class="info_tab_footer">共计:{{ dataTotal }}<div class="show_pager"> <Pager :total="dataTotal" @change="handlePageChange"  :sizes="sizes"/></div> </div> 
        </div>
      </div>
</template>
<script>
import { postSelectAflcTransportRangeList, deleteBatch } from '@/api/web/logistics.js'
import Pager from '@/components/Pagination/index'
import { parseTime } from '@/utils/'
import GetCityList from '@/components/GetCityList/28web'
import add from './components/add'
import { pickerOptions2 } from '@/utils/index.js'
export default {
  data() {
    return {
      value: '',
      btnsize: 'mini',
      selectRowData: {},
      selected: [],
      sizes: [20, 50, 100, 400],
      pagesize: 20, // 初始化加载数量
      page: 1, // 初始化页码
      totalCount: null,
      dataTotal: 0,
      dataset: [],
      radio: 1,
      centerDialogVisible: false,
      optionsdealStatus: [],
      searchCreatTime: [],
      selectInfo: {}, // 专线id
      loading: false,
      isMatreg: false,
      // defaultTime: [parseTime(+new Date() - 60 * 24 * 60 * 60 * 1000, '{y}-{m}-{d}'), parseTime(new Date(), '{y}-{m}-{d}')],
      formAllData: {
        startTime: '',
        endTime: '',
        publishName: '',
        startProvince: '',
        startCity: '',
        startArea: '',
        endProvince: '',
        endCity: '',
        endArea: ''
      },
      pickerOptions2: {
        shortcuts: pickerOptions2
      }
    }
  },
  components: {
    add,
    GetCityList,
    Pager
  },
  mounted() {
    this.firstblood()
    // this.searchCreatTime = this.defaultTime
  },
  methods: {
    getValue(obj) {
      return obj ? obj.value : ''
    },
    // 查询条件
    handleSearch(type) {
      switch (type) {
        case 'search':
          this.firstblood()
          this.formAllData.startTime = Date.parse(this.searchCreatTime[0] + ' 00:00:00')
          this.formAllData.endTime = Date.parse(this.searchCreatTime[1] + ' 23:59:59')
          // console.log(this.formAllData.startTime, this.formAllData.endTime)
          break
        case 'clear':
          this.searchCreatTime = []
          this.formAllData = {
            publishName: '',
            startProvince: '',
            startCity: '',
            startArea: '',
            endProvince: '',
            endCity: '',
            endArea: ''
          }
          this.$refs.start.clearData()
          this.$refs.end.clearData()
          this.firstblood()
          break
      }
    },
    // 添加成功刷新页面
    getsuccess() {
      this.firstblood()
    },
    // 请求接口刷新页面
    firstblood() {
      postSelectAflcTransportRangeList(this.page, this.pagesize, this.formAllData).then(res => {
        this.dataTotal = res.data.total
        this.dataset = res.data.list
        // console.log(res)
      }).catch(err => {
        this.$message.warning(err.text || err.errorInfo || '无法获取服务端数据~')
        this.loading = true
      })
    },
    getStart(val) {
      this.formAllData.startProvince = val.province.name
      this.formAllData.startCity = val.city.name
      this.formAllData.startArea = val.area.name
    //   console.log('this.cityarr', val, val.province.name, val.city.name, val.area.name)
    },
    getEnd(val) {
      this.formAllData.endProvince = val.province.name
      this.formAllData.endCity = val.city.name
      this.formAllData.endArea = val.area.name
    //   console.log('this.cityarr', val, val.province.name, val.city.name, val.area.name)
    },
    doAction(type) {
      if (!this.selected.length && type != 'add') {
        this.$message({
          message: '请选择要操作的项~',
          type: 'warning'
        })
        return false
      }
      switch (type) {
        case 'add':
          this.selectInfo = this.selected[0]
          this.centerDialogVisible = true
          this.isMatreg = true
          break
        case 'check':
          if (this.selected.length > 1) {
            this.$message({
              message: '每次只能查看一条数据',
              type: 'warning'
            })
            return false
          } else {
            this.$router.push({ name: '28WEB专线推荐管理', query: { associatedId: this.selected[0].id }})
          }
          break
        case 'delete':
          const ids3 = this.selected.map(el => {
            return el.id
          })
          deleteBatch(ids3).then(res => {
            this.$confirm('确定要删除此物流专线吗?', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
            }).then(() => {
              this.$message({
                type: 'success',
                message: '删除成功!'
              })
              this.firstblood()
            }).catch(() => {
              this.$message({
                type: 'info',
                message: '已取消删除'
              })
            })
          }).catch(err => {
            this.$message({
              type: 'error',
              message: err.errorInfo || err.text || '未知错误，请重试~'
            })
          })
          break
        default:
          break
      }
    },
    closeAddReg() {
      this.centerDialogVisible = false
      this.isMatreg = false
    },
         //  查询
    getData_query() {
      this.firstblood()
    },
    getSelection(selected) {
      this.selected = selected
    },
    // 点击选中当前行
    clickDetails(row, event, column) {
      console.log('row, event, column',row.id)
      this.$refs.multipleTable.toggleRowSelection(row)
      this.$router.push({ name: '28WEB专线推荐管理', query: { associatedId: row.id }})
    },
    // 每页显示数据量变更
    handlePageChange(obj) {
      this.page = obj.pageNum
      this.pagesize = obj.pageSize
      this.firstblood()
    }
  }
}
</script>
<style lang="scss">  
.Marketing{
  .el-cascader{
    margin-top:-10px;
  }
}
</style>

