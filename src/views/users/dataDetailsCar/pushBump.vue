<template>
    <div class="identicalStyle" style="height:100%;background:#fff" v-loading="loading">
          <el-form :inline="true"  class="demo-ruleForm classify_searchinfo">
            <el-form-item label="所属区域">
              <GetCityList ref="area" v-model="formAllData.areaCode"  @returnStr="getStr"></GetCityList>
            </el-form-item>
            <el-form-item label="是否抢单">
                    <el-select v-model="formAllData.pisGrab" placeholder="请选择" clearable>
                        <el-option
                            v-for="item in pisGradList"
                            :key="item.code"
                            :label="item.name"
                            :value="item.code"
                            >
                        </el-option>
                    </el-select>
              </el-form-item>
              <el-form-item label="是否中单">
                  <el-select v-model="formAllData.gisGrab" placeholder="请选择" clearable>
                      <el-option
                          v-for="item in gisGradList"
                          :key="item.code"
                          :label="item.name"
                          :value="item.code"
                          >
                      </el-option>
                  </el-select>
              </el-form-item>
                <el-form-item class="fr">
                    <el-button type="primary" plain @click="getdata_search"  :size="btnsize" icon="el-icon-search">搜索</el-button>
                    <el-button type="info" plain  @click="clearSearch"  :size="btnsize" icon="fontFamily aflc-icon-qingkong">清空</el-button>
                </el-form-item>
          </el-form>
          	<div class="classify_info">
            <div class="info_news">
            <el-table ref="multipleTable" style="width: 100%" stripe border height="100%"  highlight-current-row :data="tableDataAll"  tooltip-effect="dark">
           <el-table-column label="序号"  width="60">
                            <template slot-scope="scope">
                             {{ (page - 1)*pagesize + scope.$index + 1 }}
                            </template>
            </el-table-column>
            <el-table-column  label="订单号" prop="orderSerial" width='250'>
                        <template  slot-scope="scope">
                        <span class="BtnInfo" @click="pushOrderSerial(scope.row)">{{scope.row.orderSerial}}</span >
                        </template>
            </el-table-column>
            <el-table-column  label="区域" prop="provinceCityArea" sortable width='150' show-overflow-tooltip>
            </el-table-column>
            <el-table-column  label="提货地" prop="startAddress" sortable width='150' show-overflow-tooltip>
            </el-table-column>
            <el-table-column  label="目的地" prop="endAddress" sortable width='150' show-overflow-tooltip>
            </el-table-column>
            <el-table-column  label="订单金额" prop="totalAmount" sortable width='100' show-overflow-tooltip>
            </el-table-column>
            <el-table-column  label="货主" prop="shipper" sortable width='150' show-overflow-tooltip>
            </el-table-column>
            <el-table-column  label="是否马甲单" prop="isVest" sortable width='120' show-overflow-tooltip>
                         <template  slot-scope="scope">
                          {{scope.row.isVest=='1'?'是':'否'}}
                        </template>
            </el-table-column>
            <el-table-column  label="下单时间" prop="orderTime" sortable width='180' show-overflow-tooltip>
            </el-table-column>   
            <el-table-column  label="距离提货地（M）" prop="driverDistance" sortable width='180'>
            </el-table-column>   
            <el-table-column  label="是否抢单" prop="pisGrab" sortable width='120'>
            </el-table-column>
            <el-table-column  label="抢单时间" prop="grabTime" sortable width='180'>
            </el-table-column>
            <el-table-column  label="是否中单" prop="gisGrab" sortable width='120'>
            </el-table-column>
            </el-table> 
        	</div> 
         <!-- 页码 -->
        <div class="info_tab_footer">共计:{{ dataTotal }} <div class="show_pager"> <Pager :total="dataTotal" @change="handlePageChange"  :sizes="sizes" ref="pager"/></div> </div> 
        </div>
      </div>
</template>
<script>
import Pager from '@/components/Pagination/index'
import {  orderPushAndGrabList } from '@/api/users/carDetails/index.js'
import { parseTime } from '@/utils/'
import GetCityList from '@/components/GetCityList/city'
export default {
  props: {
    isvisible: {
        type: Boolean,
        default: false
      }
  }, 
  data() {
    return {
      loading: true,
      btnsize: 'mini',
      sizes: [20, 50, 100, 400],
      pagesize: 20, // 初始化加载数量
      page: 1, // 初始化页码
      totalCount: null,
      dataTotal: 0,
      tableDataAll: [],
      formAllData: {
        userId:this.$route.query.driverId,
        areaCode:null,
        pisGrab:null,
        gisGrab:null,
      },
      pisGradList:[
        {code:'1',name:'是'},
        {code:'0',name:'否'}
      ],
      gisGradList:[
        {code:'1',name:'是'},
        {code:'0',name:'否'}
      ],
    }
  },
  components: {
    Pager,
    GetCityList
  },
  methods: {
    getStr(val){
      this.formAllData.areaCode = val.area.code
    },
    // 列表刷新页面
    firstblood() {
       this.loading = true
      orderPushAndGrabList(this.page, this.pagesize, this.formAllData).then(res => {
        this.dataTotal = res.data.totalCount
        this.tableDataAll = res.data.list
        this.loading =false
      })
    },
        // 每页显示数据量变更
    handlePageChange(obj) {
      this.page = obj.pageNum
      this.pagesize = obj.pageSize
      this.firstblood()
    },
    // 搜索
    getdata_search(){
        this.page = 1;
        this.$refs.pager.inputval = this.page;
        this.$refs.pager.pageNum = this.page;
        this.firstblood()
    },
    // 清空
    clearSearch(){
            this.formAllData = {
              userId:this.$route.query.driverId,
              areaCode:null,
              pisGrab:null,
              gisGrab:null,
            }
            if(this.page!= 1){
                this.page = 1;
                this.$refs.pager.inputval = this.page;
                this.$refs.pager.pageNum = this.page;
            }
            this.$refs.area.clearData();
            this.firstblood()
    },
    pushOrderSerial(item){
            this.$router.push({ name: '订单详情', query: { orderSerial: item.orderSerial }})
    }   
  },
  watch: {
        isvisible: {
            handler(newVal, oldVal) {
                if (newVal) {
                    this.firstblood()
                }
            },
            immediate: true
        },
  },
  mounted() {
   
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

