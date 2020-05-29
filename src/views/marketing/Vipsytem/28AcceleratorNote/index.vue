<template>
    <div class="identicalStyle Marketing" style="height:100%" v-loading="loading">
          <el-form :inline="true"  class="demo-ruleForm classify_searchinfo">
            <el-form-item label="车主">
              <el-input v-model="formAllData.driver"></el-input>
            </el-form-item>
            <el-form-item label="车牌号">
              <el-input v-model="formAllData.carNumber"></el-input>
            </el-form-item>
            <el-form-item label="购买城市">
              <GetCityList ref="area" v-model="formAllData.belongCityName"  @returnStr="getStr"></GetCityList>
            </el-form-item> 
            <el-form-item label="购买日期">
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
              value-format="timestamp"
              :default-time="['00:00:00', '23:59:59']"
              @change='cTime'
              ></el-date-picker>
            </el-form-item>    
            <el-form-item class="fr">       
          <el-button type="primary" plain @click="getData_query" :size="btnsize" icon="el-icon-search">搜索</el-button>
          <el-button type="info" plain @click="clearSearch"  :size="btnsize" icon="fontFamily aflc-icon-qingkong">清空</el-button>
          </el-form-item>              
          </el-form>
          	<div class="classify_info">
            <div class="info_news">    
            <el-table ref="multipleTable" style="width: 100%" stripe border height="100%" highlight-current-row :data="tableDataAll"  tooltip-effect="dark"
            v-has:MARKETING_DRIVER_MEMBER_SYSTEM_DRIVER_MEMBER_BUY_PACKAGE_RECORD_LIST
            >
           <el-table-column label="序号" sortable  width="60">
                            <template slot-scope="scope">
                             {{ (page - 1)*pagesize + scope.$index + 1 }}
                            </template>
            </el-table-column> 
            <el-table-column  label="购买单号" prop="outTradeNo" width="230" sortable show-overflow-tooltip>
            </el-table-column>
            <el-table-column  label="车主账号" prop="driver" width="200" sortable show-overflow-tooltip>
            </el-table-column>
            <el-table-column  label="车牌号" prop="carNumber" width="100" sortable show-overflow-tooltip>
            </el-table-column>
            <el-table-column  label="车型" prop="carType" sortable width="120" show-overflow-tooltip>
            </el-table-column>
            <el-table-column  label="购买加速包名称" prop="quilckpackageName" width="150" sortable show-overflow-tooltip>
            </el-table-column>       
            <el-table-column  label="加速倍数" prop="quilckpackageMultiple" sortable width="100" show-overflow-tooltip>
            </el-table-column>
            <el-table-column  label="金额" prop="purchasingPrice" sortable width="100" show-overflow-tooltip>
            </el-table-column>  
            <el-table-column  label="支付方式" prop="payType" sortable width="100" show-overflow-tooltip>
              <template slot-scope="scope">
              <span v-if="scope.row.payType == '0'">支付宝</span>
              <span v-if="scope.row.payType == '1'">微信</span>
              <span v-if="scope.row.payType == '2'">余额支付</span>
              </template>
            </el-table-column>  
            <el-table-column  label="支付状态" prop="payStatus" sortable width="100" show-overflow-tooltip>
              <template slot-scope="scope">
             <span :class="{blackName: scope.row.payStatus == '0',normalName :scope.row.payStatus == '1'}">{{scope.row.payStatus=='0'?'未支付':'已支付'}}</span>
              </template>
            </el-table-column>                                                        
            <el-table-column  label="加速有效期" prop="quilckpackageExpireDate" width="140" sortable show-overflow-tooltip>
            </el-table-column>
            <el-table-column  label="加速有效期至" prop="quilckpackageExpireEndTime" width="160" sortable show-overflow-tooltip>
            </el-table-column> 
            <el-table-column  label="购买时会员等级" prop="memberGrade" width="160" sortable show-overflow-tooltip>
            </el-table-column> 
            <el-table-column  label="会员等级有效期至" prop="memberExpireEndTime" width="160" sortable show-overflow-tooltip>
            </el-table-column>
            <el-table-column  label="购买地" prop="belongCityName" width="160" sortable show-overflow-tooltip>
            </el-table-column>  
            <el-table-column  label="购买时间" prop="buyTime" width="160" sortable show-overflow-tooltip>
            </el-table-column>  
            </el-table> 
        	</div> 
         <!-- 页码 -->
        <div class="info_tab_footer" v-has:MARKETING_DRIVER_MEMBER_SYSTEM_DRIVER_MEMBER_BUY_PACKAGE_RECORD_LIST>共计:{{ dataTotal }} <div class="show_pager"> <Pager :total="dataTotal" @change="handlePageChange"  :sizes="sizes" ref="pager" /></div> </div> 
        </div>
      </div>
</template>
<script>
import { aflcBuyQuickpackageDetail } from '@/api/marketing/28AcceleratorNote'
import GetCityList from '@/components/GetCityList/index'
import Pager from '@/components/Pagination/index'
import { parseTime, pickerOptions2 } from '@/utils/'
export default {
  data() {
    return {
      pickerOptions2: {
           shortcuts: pickerOptions2},
      loading:true,
      btnsize: 'mini',
      sizes: [20, 50, 100, 400],
      pagesize: 20, // 初始化加载数量
      page: 1, // 初始化页码
      totalCount: null,
      dataTotal: 0,
      tableDataAll: [],
      createTime:null,
      formAllData: {
        driver:null,
        carNumber:null,
        belongCityName:null,
        bugStartTime:null,
        bugEndTime:null
      }
    }
  },
  components: {
    Pager,
    GetCityList
  },
  methods: {
    getStr(val){
        this.formAllData.belongCityName =  val.city.name
        },
    // 列表刷新页面
    firstblood() {
      this.loading = true
      aflcBuyQuickpackageDetail(this.page, this.pagesize, this.formAllData).then(res => {
        this.dataTotal = res.data.totalCount
        this.tableDataAll = res.data.list
        this.tableDataAll.forEach(item => {
        item.quilckpackageExpireEndTime = parseTime(item.quilckpackageExpireEndTime,"{y}-{m}-{d} {h}:{i}:{s}");
        item.memberExpireEndTime = parseTime(item.memberExpireEndTime,"{y}-{m}-{d} {h}:{i}:{s}");
        item.buyTime = parseTime(item.buyTime,"{y}-{m}-{d} {h}:{i}:{s}");              
      })
        this.loading =false
      })
    },
    //  查询
    getData_query() {
      this.page = 1;
      this.$refs.pager.inputval = this.page;
      this.$refs.pager.pageNum = this.page;
      this.firstblood()
    },
    cTime(i){
        if(i!==null){
        this.formAllData.bugStartTime = i[0]
        this.formAllData.bugEndTime = i[1]
        }
        else{
        this.formAllData.bugStartTime = null
        this.formAllData.bugEndTime = null
        }
    },
    // 清空
    clearSearch() {
      this.createTime = null
       this.formAllData = {
        driver:null,
        carNumber:null,
        belongCityName:null,
        bugStartTime:null,
        bugEndTime:null
      }
       if(this.page!= 1){
        this.page = 1;
        this.$refs.pager.inputval = this.page;
        this.$refs.pager.pageNum = this.page;
      }
      this.$refs.area.clearData();
       this.firstblood()
     },
        // 每页显示数据量变更
    handlePageChange(obj) {
      this.page = obj.pageNum
      this.pagesize = obj.pageSize
      this.firstblood()
    },
  },

  mounted() {
    this.firstblood()
  }
}
</script>
<style lang="scss">  
</style>

