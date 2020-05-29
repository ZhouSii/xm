<template>
        <div class="identicalStyle PlatformAccount" style="height:100%" v-loading="loading">
          <el-form :inline="true"  class="demo-ruleForm classify_searchinfo">
            <el-form-item label="车主">
              <el-input v-model="formAllData.driver"></el-input>
            </el-form-item>
            <el-form-item label="车牌号">
              <el-input v-model="formAllData.carNumber"></el-input>
            </el-form-item>
            <el-form-item label="科目">
            <div class="chooseCityList">
                <el-cascader
                v-model="subjectAraay"
                :options="MaidLevelList"
                ref="cityTree"
                :show-all-levels="false"
                @change="subjectWay"
                :props="props"
                >
                </el-cascader>
          </div>
            </el-form-item>
            <el-form-item label="发放城市">
              <GetCityList ref="area" v-model="formAllData.grantPlace"  @returnStr="getStr"></GetCityList>
            </el-form-item>
            <el-form-item label="活动时间">
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
                        >
                    </el-date-picker>
            </el-form-item>    
            <el-form-item class="fr">
          <el-button type="primary" plain @click="getData_query" :size="btnsize" icon="el-icon-search">搜索</el-button>
          <el-button type="info" plain @click="clearSearch"  :size="btnsize" icon="fontFamily aflc-icon-qingkong">清空</el-button>
          </el-form-item>              
          </el-form>
          	<div class="classify_info">
            <div class="btns_box">
            发放：<span class="coinGo mr30">{{grantNum}}</span> 扣回：<span class="coinCome">{{discountNum}}</span>
            </div>
            <div class="info_news">
            <el-table ref="multipleTable" style="width: 100%" stripe border height="99%" highlight-current-row :data="tableDataAll"  tooltip-effect="dark"
            v-has:MARKETING_DRIVER_MEMBER_SYSTEM_DRIVER_MEMBER_PLATFORM_LIST
            >
           <el-table-column label="序号" sortable  width="60">
                            <template slot-scope="scope">
                             {{ (page - 1)*pagesize + scope.$index + 1 }}
                            </template>
            </el-table-column> 
            <el-table-column  label="车主账号" prop="driver" sortable show-overflow-tooltip>
            </el-table-column>
            <el-table-column  label="车牌号" prop="carNumber" sortable show-overflow-tooltip>
            </el-table-column>
            <el-table-column  label="车型" prop="carType" sortable show-overflow-tooltip>
            </el-table-column>
            <el-table-column  label="科目" prop="subject" sortable show-overflow-tooltip>
            </el-table-column>       
            <el-table-column  label="发放/扣回" prop="grantDiscount" sortable show-overflow-tooltip>
            </el-table-column>
            <el-table-column  label="订单号" prop="orderSerial" sortable show-overflow-tooltip>
              <template slot-scope="scope">
              <span class="normalName">{{scope.row.orderSerial}}</span>
              </template>
            </el-table-column>
            <el-table-column  label="28币" prop="coins" sortable show-overflow-tooltip>
            <template slot-scope="scope">
                <span :class="scope.row.grantDiscount=='发放'?'coinGo':'coinCome'">{{scope.row.coins}}</span>
             </template>
            </el-table-column>
            <el-table-column  label="发放加速倍数" prop="releaseMultiple" sortable >
            </el-table-column>
            <el-table-column  label="发放城市" prop="grantPlace" sortable show-overflow-tooltip>
            </el-table-column>        
            <el-table-column  label="发放时间" prop="grantPlaceTime" sortable show-overflow-tooltip>
            </el-table-column>        
            </el-table> 
        	</div> 
         <!-- 页码 -->
        <div class="info_tab_footer">共计:{{ dataTotal }} <div class="show_pager"> <Pager :total="dataTotal" @change="handlePageChange"  :sizes="sizes" ref="pager"/></div> </div> 
        </div>
      </div>
</template>
<script>
import { aflcCoinsGrantDetail,getCode } from '@/api/marketing/28PlatformAccount'
import GetCityList from '@/components/GetCityList/index'
import { eventBus } from '@/eventBus'
import Pager from '@/components/Pagination/index'
import {parseTime,pickerOptions2} from '@/utils/'
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
      createTime:[],
      subjectAraay:[],
      formAllData: {
          driver:null,
          carNumber:null,
          subject:null,
          grantPlace:null,
          grantPlaceStartTime:null,
          grantPlaceEndTime:null,
      },
      grantNum:null,
      discountNum:null,
      props: {
                label: 'name',
                value: 'code',
                children: 'children'
            },
      MaidLevelList:[]
    }
  },
  components: {
    Pager,
    GetCityList
  },
  methods: {
    getStr(val){
        this.formAllData.grantPlace = val.city.name
    },
    // 列表刷新页面
    firstblood() {
      this.loading = true
      aflcCoinsGrantDetail(this.page, this.pagesize, this.formAllData).then(res => {
        this.dataTotal = res.data.totalCount
        this.tableDataAll = res.data.list[0].aflcCoinsGrantDriverDetailList
        this.grantNum = res.data.list[0].grantNum
        this.discountNum = res.data.list[0].discountNum
        this.tableDataAll.forEach(item => {
        item.grantPlaceTime = parseTime(item.grantPlaceTime,"{y}-{m}-{d} {h}:{i}:{s}");
        })
        this.loading =false
      })
    },
    getMoreInformation(){
     getCode('AF006').then(res=>{
     this.MaidLevelList = res.data
     this.MaidLevelList.forEach((item,i)=>{
         getCode(item.code).then(res_two=>{
            this.MaidLevelList[i].children = res_two.data
         })
     })
     })
    },
    cTime(i){
        if(i!==null){
        this.formAllData.grantPlaceStartTime = i[0]
        this.formAllData.grantPlaceEndTime = i[1]
        }
        else{
        this.formAllData.grantPlaceStartTime = null
        this.formAllData.grantPlaceEndTime = null
        }
        },
    subjectWay(i){
        if(i!==null){
        this.formAllData.subject = i[1]
        }
        else{
        this.formAllData.subject = null
        }
    },
    //  查询
    getData_query() {
      this.page = 1;
      this.$refs.pager.inputval = this.page;
      this.$refs.pager.pageNum = this.page;
      this.firstblood()
    },
    // 清空
    clearSearch() {
       this.subjectAraay = []
       this.createTime = []
       this.formAllData = {
          driver:null,
          carNumber:null,
          subject:null,
          grantPlace:null,
          grantPlaceStartTime:null,
          grantPlaceEndTime:null,
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
    this.getMoreInformation()
    this.firstblood()
  }
}
</script>
<style lang="scss">  
.PlatformAccount{
  .el-cascader{
    margin-top:-10px;
  }
  .coinCome{
      color:green
  }
  .coinGo{
      color:red
  }
  .mr30{
      margin-right:30px;
  }
}
</style>

