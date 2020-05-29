<template>
  <div class="identicalStyle Marketing" style="height:100%">
    <el-form :inline="true" class="demo-ruleForm classify_searchinfo">
      <el-form-item label="所属区域">
        <GetCityList ref="area" v-model="formAllData.belongCityName" @returnStr="getStr"></GetCityList>
      </el-form-item>
      <el-form-item label="投诉人所属业务员分组">
        <el-input  placeholder="业务组名称" auto-complete="off" clearable v-model="formAllData.complainantSalesmanBusinessGroupName"></el-input>
      </el-form-item>
      <el-form-item label="投诉发起人">
        <el-input  placeholder="姓名/手机号" auto-complete="off" clearable v-model="formAllData.complainMobileOrName"></el-input>
      </el-form-item>
      <el-form-item label="被投诉人">
        <el-input  placeholder="姓名/手机号" auto-complete="off" clearable v-model="formAllData.respondentMobileOrName"></el-input>
      </el-form-item>
      <el-form-item label="投诉时间">
                <el-date-picker
                v-model="pushTime"
                type="daterange"
                unlink-panels
                :picker-options="pickerOptions2"
                range-separator="-"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
                :default-time="['00:00:00', '23:59:59']"
                @change='cTime'>
                </el-date-picker>
      </el-form-item>
      <el-form-item label="订单号">
        <el-input :maxlength="20" auto-complete="off" clearable v-model="formAllData.orderSerial"></el-input>
      </el-form-item>
      <el-form-item label="处理状态">
        <el-select v-model="formAllData.complainStatus" clearable placeholder="请选择处理状态" >
          <el-option
            v-for="item in optionsdealStatus"
            :key="item.code"
            :label="item.name"
            :value="item.code"
            :disabled="item.disabled"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item class="btnChoose fr">
        <el-button type="primary" :size="btnsize" plain @click="handleSearch('search')" icon="el-icon-search">搜索</el-button>
        <el-button type="info" :size="btnsize" plain @click="handleSearch('clear')" icon="fontFamily aflc-icon-qingkong">清空</el-button>
      </el-form-item>
    </el-form>
    <div class="classify_info">
      <div class="btns_box">
        <el-button type="primary" :size="btnsize" icon="el-icon-download" plain @click="importExcel">导出Excel</el-button>
        <!-- <el-button type="primary" :size="btnsize" icon="el-icon-circle-plus" plain @click="doAction('reg')" v-has:CUSTOM_COMPLAIN_REGISTER>投诉登记</el-button> -->
        <!-- <el-button type="primary" :size="btnsize" class="el-icon-tickets" @click="doAction('shouli')" plain>确认受理</el-button> -->
        <!-- <el-button type="primary" :size="btnsize" icon="el-icon-news" @click="doAction('genjin')" plain>记录物流跟进</el-button> -->
      </div>
      <div class="info_news">
        <el-table ref="multipleTable" style="width: 100%" stripe border height="100%" @selection-change="getSelection" @row-click="clickDetails" highlight-current-row :data="dataset" tooltip-effect="dark">
          <el-table-column label="序号" width="60">
            <template slot-scope="scope">{{ (page - 1)*pagesize + scope.$index + 1 }}</template>
          </el-table-column>
          <el-table-column :show-overflow-tooltip="true" prop="orderSerial" label="订单号" sortable width="250">
            <template slot-scope="scope">
              <h4 class="needMoreInfo" @click="pushOrderSerial(scope.row)">{{scope.row.orderSerial}}</h4>
            </template>
          </el-table-column>
          <el-table-column sortable prop="orderProvinceCityArea" label="区域" width="180" show-overflow-tooltip></el-table-column>
          <el-table-column sortable prop="complainantSalesmanBusinessGroupName" label="投诉人所属业务员分组" width="180" ></el-table-column>
          <el-table-column sortable prop="complainName" label="投诉发起人" width="180" show-overflow-tooltip></el-table-column>
          <el-table-column sortable prop="reporterTypeName" label="发起人类型" width="120" show-overflow-tooltip></el-table-column>
          <el-table-column sortable prop="respondentName" label="被投诉人"  width="180" show-overflow-tooltip></el-table-column>
          <el-table-column sortable prop="respondentTypeName" label="被投诉人类型"  width="120" show-overflow-tooltip></el-table-column>
          <el-table-column sortable prop="followName" label="跟进人"  width="120" show-overflow-tooltip></el-table-column>
          <el-table-column sortable prop="complainStatusName" label="处理状态"  width="100" show-overflow-tooltip></el-table-column>
          <el-table-column sortable prop="solveTime" label="处理时长" width="150" show-overflow-tooltip></el-table-column>
          <el-table-column sortable prop="complainTypeName" label="投诉分类" width="140" show-overflow-tooltip></el-table-column>
          <el-table-column sortable prop="complainDes" label="投诉内容" width="100" show-overflow-tooltip></el-table-column>
          <el-table-column sortable prop="complainTime" label="投诉时间" width="180" show-overflow-tooltip></el-table-column>
          <el-table-column sortable prop="complainTime" label="是否定责" width="100" show-overflow-tooltip>
            <template slot-scope="scope">
              <span :class="[scope.row.isRule==1?'blackName':'normalName']">{{scope.row.isRule==1?'定责':'不定责'}}</span>
            </template>
          </el-table-column>
          <el-table-column sortable prop="orderStatusName" label="订单状态" width="100" show-overflow-tooltip></el-table-column>
          <el-table-column sortable prop="useCarTime" label="用车时间" width="180" show-overflow-tooltip></el-table-column>
          <el-table-column sortable prop="viaAddressStart" label="提货地" width="150" show-overflow-tooltip></el-table-column>
          <el-table-column sortable prop="viaAddressEnd" label="目的地" width="150" show-overflow-tooltip></el-table-column>
        </el-table>
      </div>
      <!-- 页码 -->
      <div class="info_tab_footer">
        共计:{{ dataTotal }}
        <div class="show_pager">
          <Pager :total="dataTotal" @change="handlePageChange" :sizes="sizes"/>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { postListAppShipperComplain,listAppShipperComplainExcel } from "@/api/service/dispose.js";
import Pager from "@/components/Pagination/index";
import { parseTime,pickerOptions2 } from "@/utils/";
import GetCityList from "@/components/GetCityList/city";
import { DicDelStatusType } from "@/api/common";
import addReg from "./reg/index";
import { orderDetailsList } from "@/api/order/ordermange";
export default {
  data() {
    return {
      value: "",
      pickerOptions2: {shortcuts: pickerOptions2},
      btnsize: "mini",
      selectRowData: {},
      selected: [],
      sizes: [20, 50, 100, 400],
      pagesize: 20, // 初始化加载数量
      page: 1, // 初始化页码
      totalCount: null,
      dataTotal: 0,
      dataset: [],
      radio: 1,
      optionsdealStatus: [],
      pushTime:[],
      formAllData: {
         belongCity:null,
         complainStartTime:null,
         complainEndTime:null,
         complainMobileOrName:null,
         complainStatus:null,
         complainantSalesmanBusinessGroupName:null,
         orderSerial:null,
         respondentMobileOrName:null,
      }
    };
  },
  components: {
    addReg,
    GetCityList,
    Pager
  },
  mounted() {
    this.firstblood();
    this.getdelstatus();
  },
  methods: {
    getStr(val) {
      this.formAllData.belongCity = val.area.code;
    },
    getValue(obj) {
      return obj ? obj.value : "";
    },
    // 查询条件
    handleSearch(type) {
      switch (type) {
        case "search":
          this.firstblood();
          break;
        case "clear":
          this.formAllData = {
            belongCity:null,
            complainStartTime:null,
            complainEndTime:null,
            complainMobileOrName:null,
            complainStatus:null,
            complainantSalesmanBusinessGroupName:null,
            orderSerial:null,
            respondentMobileOrName:null,
          };
          this.pushTime = []
          if(this.page!= 1){
                  this.page = 1;
                  this.$refs.pager.inputval = this.page;
                  this.$refs.pager.pageNum = this.page;
          }
          this.$refs.area.clearData();
          this.firstblood();
          break;
      }
    },
    getsuccess() {
      this.firstblood();
    },
    // 请求接口刷新页面
    firstblood() {
      // this.loading = false
      postListAppShipperComplain(this.page, this.pagesize, this.formAllData)
        .then(res => {
          this.dataTotal = res.data.totalCount;
          this.dataset = res.data.list;
          this.dataset.forEach(item => {
            item.complainTime = parseTime(item.complainTime,"{y}-{m}-{d} {h}:{i}:{s}");
            item.useCarTime = parseTime(item.useCarTime,"{y}-{m}-{d} {h}:{i}:{s}");
        })
        })
        .catch(err => {
          this.$message({
            type: "error",
            message: err.errorInfo || err.text || "未知错误，请重试~"
          });
          this.loading = false;
        });
    },
    // 点击打开弹窗
    doAction(type) {
      if (!this.selected.length && type !== "reg") {
        this.$message({
          message: "请选择要操作的项~",
          type: "warning"
        });
        return false;
      }
      switch (type) {
        case "shouli":
          // orderSerial订单号
          // this.$router.push({ name: '订单详情', query: { orderSerial: this.selected[0].orderSerial, currentTab: 'physicalDamage' }})
          break;
        case "genjin":
          // this.$router.push({ name: '订单详情', query: { orderSerial: this.selected[0].orderSerial, currentTab: 'physicalDamage' }})
          break;
        case "clear":
          break;
      }
    },
    getdelstatus() {
      DicDelStatusType().then(res => {
        res.data.map(item => {
          this.optionsdealStatus.push(item);
        });
      });
    },
    //  查询
    getData_query() {
      this.firstblood();
    },
    getSelection(selected) {
      this.selected = selected;
    },
    cTime(i){
      if(i){
        this.formAllData.complainStartTime = i[0];
        this.formAllData.complainEndTime = i[1];
      }else{  
        this.formAllData.complainStartTime = '';
        this.formAllData.complainEndTime = '';
      }
    },
    // 点击选中当前行
    clickDetails(row, event, column) {
      this.$refs.multipleTable.toggleRowSelection(row);
    },
    // 详情弹窗
    pushOrderSerial(item) {
      this.$router.push({
        name: "订单详情",
        query: { orderSerial: item.orderSerial, currentTab:'complaint' }
      });
    },
    // 每页显示数据量变更
    handlePageChange(obj) {
      this.page = obj.pageNum;
      this.pagesize = obj.pageSize;
      this.firstblood();
    },
    // 导出Excel
    importExcel(){
        this.$message.info('正在导出中...')
        listAppShipperComplainExcel(0, 0,this.formAllData).then(res=>{
                var blob = new Blob([res]);
                this.href =  window.URL.createObjectURL(blob);
                var NewDom = document.createElement("a");
                NewDom.setAttribute('href', this.href);
                NewDom.setAttribute('target', '_blank');
                NewDom.setAttribute('download', '投诉处理.xls');
                document.body.appendChild(NewDom);
                NewDom.click();
                document.body.removeChild(NewDom)
            })
    },
    getDataList() {
      this.firstblood();
      this.$refs.multipleTable.clearSelection();
    }
  }
};
</script>
<style lang="scss">
.Marketing {
  .el-cascader {
    margin-top: -10px;
  }
}
</style>

