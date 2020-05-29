<template>
    <div class="identicalStyle Marketing" style="height:100%">
        <el-form :inline="true"  class="demo-ruleForm classify_searchinfo">
          <el-form-item label="所属区域">
            <GetCityList ref="area" v-model="formAllData.belongCityName"  @returnStr="getStr"></GetCityList>
          </el-form-item>
          <el-form-item label="处理状态">
            <el-select v-model="formAllData.dealStatus" clearable placeholder="请选择处理状态" >
              <el-option
                v-for="item in optionsdealStatus"
                :key="item.code"
                :label="item.name"
                :value="item.code"
                :disabled="item.disabled">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="货主">
            <el-input v-model="formAllData.shipper" :maxlength="20" placeholder="账户/姓名" auto-complete="off" clearable></el-input>
          </el-form-item>
          <el-form-item label="车主">
            <el-input v-model="formAllData.driver" :maxlength="20" placeholder="账户/姓名/车号牌" auto-complete="off" clearable></el-input>
          </el-form-item>
          <el-form-item label="订单号">
            <el-input v-model="formAllData.orderSerial" :maxlength="20" auto-complete="off" clearable></el-input>
          </el-form-item>
          <el-form-item class="btnChoose fr">
            <el-button type="primary" :size="btnsize" plain @click="handleSearch('search')" icon="el-icon-search">搜索</el-button>
            <el-button type="info" :size="btnsize" plain @click="handleSearch('clear')" icon="fontFamily aflc-icon-qingkong">清空</el-button>
          </el-form-item>
        </el-form>
          <div class="classify_info">
            		<div class="btns_box">
                <el-button type="primary" :size="btnsize" icon="el-icon-circle-plus"  plain @click="doAction('reg')"  v-has:CUSTOM_CLAIM_REGISTER>物损登记</el-button>
            		</div>
            <div class="info_news">
              <el-table ref="multipleTable" style="width: 100%" stripe border height="100%" @selection-change="getSelection" @row-click="clickDetails" highlight-current-row :data="dataset"  tooltip-effect="dark">
                <el-table-column fixed label="序号"  width="60">
                  <template slot-scope="scope">
                  {{ (page - 1)*pagesize + scope.$index + 1 }}
                  </template>
                </el-table-column>
                <el-table-column
                  :show-overflow-tooltip="true"
                  prop="orderSerial"
                  label="订单号"
                  sortable
                  width="250"
                  >
                  <template  slot-scope="scope">
                    <h4 class="needMoreInfo" @click="pushOrderSerial(scope.row)">{{ scope.row.orderSerial}}</h4>
                  </template>
                </el-table-column>
                <el-table-column sortable prop="belongCity" label="区域"  width="300">
                </el-table-column>
                <el-table-column  label="货主" prop="shipper" sortable :show-overflow-tooltip="true" width="250">
                </el-table-column>
                <el-table-column  label="车主" prop="driver" sortable :show-overflow-tooltip="true"  width="250">
                </el-table-column>
                <el-table-column  label="处理状态" prop="dealStatus" sortable :show-overflow-tooltip="true" width="120">
                </el-table-column>
                <el-table-column  label="物损类型" prop="claimType" sortable :show-overflow-tooltip="true" width="120">
                </el-table-column>
                <el-table-column
                  label="上报人"
                  prop="reporter"
                  sortable
                  :show-overflow-tooltip="true"
                  width="300">
                  <template slot-scope="scope">
                    {{scope.row.reporter? scope.row.reporter + '-' : ''}}{{scope.row.reporterPhone ? scope.row.reporterPhone : ''}}
                  </template>
                </el-table-column>
                <el-table-column
                :show-overflow-tooltip="true"
                prop="createTime"
                label="上报时间"
                width="200"
                sortable
                >
                <template  slot-scope="scope">
                  <span class="orderSerial">
                    {{ scope.row.createTime | parseTime('{y}-{m}-{d} {h}:{i}:{s}')}}
                  </span>
                </template>
                <!-- <template slot-scope="scope">{{ scope.row.commissionTime | parseTime('{y}-{m}-{d} {h}:{i}:{s}')}}</template> -->
                </el-table-column>
                <el-table-column  label="订单状态" prop="orderStatus" sortable  width="120">
                </el-table-column>
                <el-table-column
                :show-overflow-tooltip="true"
                prop="useCarTime"
                label="用车时间"
                width="200"
                sortable
                >
                <template  slot-scope="scope">
                  <span class="orderSerial">
                    {{ scope.row.useCarTime | parseTime('{y}-{m}-{d} {h}:{i}:{s}')}}
                  </span>
                </template>
                <!-- <template slot-scope="scope">{{ scope.row.commissionTime | parseTime('{y}-{m}-{d} {h}:{i}:{s}')}}</template> -->
                </el-table-column>
                <el-table-column  label="提货地" prop="startAddress" sortable :show-overflow-tooltip="true"  width="300">
                </el-table-column>
                <el-table-column  label="目的地" prop="endAddress" sortable :show-overflow-tooltip="true"  width="300">
                </el-table-column>
              </el-table>
        	  </div>
          <!-- addReg -->
          <addReg :centerDialogVisible="centerDialogVisible" @close="closeAddReg" @success="getsuccess"></addReg>
         <!-- 页码 -->
          <div class="info_tab_footer">共计:{{ dataTotal }}<div class="show_pager"> <Pager :total="dataTotal" @change="handlePageChange"  :sizes="sizes"/></div> </div>
        </div>
      </div>
</template>
<script>
import { postOrderGoodsclaimlist } from '@/api/service/claim.js'
import Pager from '@/components/Pagination/index'
import GetCityList from '@/components/GetCityList/city'
import { ClaimStatusType } from '@/api/common'
import addReg from './reg/index'
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
      formAllData: {
        belongCity: '', // 区域
        belongCityName: '', // 区域
        // AF04801
        dealStatus: '',
        shipper: '',
        driver: '',
        orderSerial: ''
      }
    }
  },
  components: {
    // newCity,
    addReg,
    // vregion,
    GetCityList,
    Pager
  },
  mounted() {
    this.firstblood()
    this.getdelstatus()
  },
  methods: {

    getStr(val) {
      this.formAllData.belongCity = val.area.code
      this.formAllData.belongCityName = val.area.name
    //   console.log('this.cityarr', val, val.area, val.area.code, val.area.name)
    },
    getValue(obj) {
      return obj ? obj.value : ''
    },
    // 查询条件
    handleSearch(type) {
      switch (type) {
        case 'search':
          this.firstblood()
          break
        case 'clear':
          this.formAllData = {
            belongCity: '',
            belongCityName: '',
            delStatus: '',
            shipper: '',
            driver: '',
            orderSerial: ''
          }
          this.$refs.area.clearData()
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
      // this.loading = false
      postOrderGoodsclaimlist(this.page, this.pagesize, this.formAllData).then(res => {
        this.dataTotal = res.data.totalCount
        this.dataset = res.data.list
      })
    },
    // 点击打开弹窗
    doAction(type) {
      if (!this.selected.length && type !== 'reg') {
        this.$message({
          message: '请选择要操作的项~',
          type: 'warning'
        })
        return false
      }
      switch (type) {
        case 'reg':
          this.centerDialogVisible = true
          break
        case 'shouli':
          // orderSerial订单号
          // this.$router.push({ name: '订单详情', query: { orderSerial: this.selected[0].orderSerial, currentTab: 'physicalDamage' }})
          break
        case 'genjin':
          // this.$router.push({ name: '订单详情', query: { orderSerial: this.selected[0].orderSerial, currentTab: 'physicalDamage' }})
          break
        case 'clear':
          break
      }
    },
    closeAddReg() {
      this.centerDialogVisible = false
    },
    getdelstatus() {
      ClaimStatusType().then(res => {
        res.data.map((item) => {
          this.optionsdealStatus.push(item)
        })
      })
    },
         //  查询
    getData_query() {
      this.firstblood()
    },
     // 判断选中与否
    // getSelection(val) {
    //   console.log('选中内容', val)
    //   this.selectRowData = val
    // },
    getSelection(selected) {
      this.selected = selected
    },
    // 点击选中当前行
    clickDetails(row, event, column) {
      this.$refs.multipleTable.toggleRowSelection(row)
    },
    // 每页显示数据量变更
    handlePageChange(obj) {
      this.page = obj.pageNum
      this.pagesize = obj.pageSize
      this.firstblood()
    },
    pushOrderSerial(item) {
      this.$router.push({ name: '订单详情', query: { orderSerial: item.orderSerial }})
    },
    getDataList() {
      this.firstblood()
      this.$refs.multipleTable.clearSelection()
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

