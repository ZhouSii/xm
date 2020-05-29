<template>
  <div v-loading="loading" class="identicalStyle">
    <el-form :inline="true" class="demo-ruleForm classify_searchinfo">
      <el-form-item label="手机号码">
        <el-input class="chooseItem" v-model="formData.phoneNumber" maxlength="11"></el-input>
      </el-form-item>
      <el-form-item label="公司名称">
        <el-input class="chooseItem" v-model="formData.companyName" maxlength="20"></el-input>
      </el-form-item>
      <el-form-item label="联系人">
        <el-input class="chooseItem" v-model="formData.contacts" maxlength="20"></el-input>
      </el-form-item>
      <el-form-item label="同城潜力等级">
        <el-select
          v-model="formData.potentialGrade"
          placeholder="请选择"
          clearable
          @change="potentialGradeChange"
        >
          <el-option
            v-for="item in potentialGradeList"
            :key="item.code"
            :label="item.name"
            :value="item.code"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="货主类型">
        <el-select v-model="formData.shipperType" clearable placeholder="请选择">
          <el-option
            v-for="item in shipperTypeList"
            :key="item.code"
            :label="item.name"
            :value="item.code"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="认证所在地">
        <vregion :ui="true" @values="regionChange" class="form-control" ref="regionChange">
          <el-input v-model="formData.belongCityName" placeholder="请选择"></el-input>
        </vregion>
      </el-form-item>
      <el-form-item label="所属商圈">
        <tradeAreaList @inputObject="getVal" v-model="formData.tradeAreaId" ref="tradeArea" />
      </el-form-item>
      <el-form-item label="所属行业">
        <el-select v-model="formData.tradeIndustry" placeholder="请选择" clearable>
          <el-option
            v-for="item in tradeList"
            :key="item.code"
            :label="item.name"
            :value="item.code"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="所属业务组">
        <businessGroup
          @inputObject="getObject"
          v-model="formData.businessGroupName"
          ref="businessGroup"
        />
      </el-form-item>
      <el-form-item label="注册时间">
        <el-date-picker
          v-model="formData.registerTime"
          type="daterange"
          range-separator="至"
          :size="btnsize"
          value-format="yyyyMMdd"
          start-placeholder="开始时间"
          end-placeholder="结束时间"
        ></el-date-picker>
      </el-form-item>

      <el-form-item style="margin-right:10px;" label="统计周期">
        <el-select v-model="formData.statisticalPeriod" placeholder="请选择">
          <el-option
            v-for="item in statisticalPeriodList"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
      </el-form-item>

      <el-form-item v-if="formData.statisticalPeriod == '0'">
        <el-date-picker
          v-model="formData.timer"
          type="daterange"
          range-separator="至"
          :size="btnsize"
          value-format="yyyyMMdd"
          start-placeholder="本周期开始日期"
          end-placeholder="本周期结束日期"
        ></el-date-picker>
        <el-date-picker
          v-model="formData.timer1"
          type="daterange"
          range-separator="至"
          :size="btnsize"
          value-format="yyyyMMdd"
          start-placeholder="上周期开始日期"
          end-placeholder="上周期结束日期"
        ></el-date-picker>
      </el-form-item>

      <el-form-item style="margin-right:10px;" label="上周期订单量">
        <el-input
          placeholder="请输入内容"
          type="number"
          :size="btnsize"
          v-model="formData.lastWeekNum1"
          class="inputNum"
        ></el-input>-
        <el-input
          placeholder="请输入内容"
          type="number"
          :size="btnsize"
          v-model="formData.lastWeekNum2"
          class="inputNum"
        ></el-input>
      </el-form-item>

      <el-form-item style="margin-right:10px;" label="本周期订单量">
        <el-input
          placeholder="请输入内容"
          :size="btnsize"
          v-model="formData.thisWeekNum1"
          class="inputNum"
          type="number"
        ></el-input>-
        <el-input
          placeholder="请输入内容"
          :size="btnsize"
          type="number"
          v-model="formData.thisWeekNum2"
          class="inputNum"
        ></el-input>
      </el-form-item>
      <el-form-item label="认证状态">
        <el-select v-model="formData.authStatus" placeholder="请选择" clearable>
          <el-option
            v-for="item in authList"
            :key="item.code"
            :label="item.name"
            :value="item.code"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="认证时间">
        <el-date-picker
          v-model="formData.authTime"
          type="daterange"
          range-separator="至"
          :size="btnsize"
          value-format="yyyyMMdd"
          start-placeholder="开始时间"
          end-placeholder="结束时间"
        ></el-date-picker>
      </el-form-item>

      <el-button
        type="info"
        plain
        @click="clearSearch"
        style="float:right;margin-right:10px;"
        :size="btnsize"
        icon="fontFamily aflc-icon-qingkong"
      >清空</el-button>
      <el-button
        type="primary"
        plain
        @click="firstblood"
        style="float:right;margin-right:10px;"
        :size="btnsize"
        icon="el-icon-search"
      >搜索</el-button>
    </el-form>
    <div class="classify_info">
      <el-row style="margin-bottom: 10px;">
        <el-button
          type="primary"
          icon="el-icon-download"
          plain
          :size="btnsize"
          @click="handleClick('export')"
          v-has:DATA_CENTER_SHIPPERDATAANALYSIS_SHIPPERORDERANALYSIS_SAMECITY_EXPORT
        >导出EXCEL</el-button>
        <el-button
          type="primary"
          icon="el-icon-s-claim"
          plain
          :size="btnsize"
          @click="handleClick('vitalize')"
          v-has:DATA_CENTER_SHIPPERDATAANALYSIS_SHIPPERORDERANALYSIS_SAMECITY_VISITINGMISSION
        >盘活拜访任务</el-button>
        <el-button
          type="primary"
          plain
          icon="el-icon-s-order"
          :size="btnsize"
          @click="handleClick('issue')"
          v-has:DATA_CENTER_SHIPPERDATAANALYSIS_SHIPPERORDERANALYSIS_SAMECITY_MARKETINGACTIVITIES
        >
          <!-- <icon-svg icon-class="cheliangguanli" />  -->
          下发营销活动
        </el-button>
      </el-row>
      <div class="info_news">
        <el-table
          ref="multipleTable"
          id="out-table"
          :data="tableData"
          stripe
          border
          align="center"
          tooltip-effect="dark"
          @selection-change="getSelection"
          @row-click="clickDetails"
          height="100%"
          style="width: 100%"
        >
          <el-table-column type="selection" width="50"></el-table-column>
          <el-table-column label="序号" width="60">
            <template slot-scope="scope">{{scope.$index + 1 }}</template>
          </el-table-column>
          <el-table-column label="手机号码" width="120">
            <template slot-scope="scope">
              <h4
                class="needMoreInfo"
                @click="searchPhone(scope.row.shipperId)"
              >{{ scope.row.mobile}}</h4>
            </template>
          </el-table-column>
          <el-table-column prop="companyName" label="公司名称" min-width="150" show-overflow-tooltip></el-table-column>
          <el-table-column prop="contacts" label="联系人" min-width="150"></el-table-column>
          <el-table-column prop="shipperType" label="货主类型" min-width="150" show-overflow-tooltip></el-table-column>
          <el-table-column
            prop="potentialGradeName"
            label="同城潜力等级"
            min-width="150"
            show-overflow-tooltip
          ></el-table-column>
          <el-table-column prop="belongCityName" label="所在地" min-width="150" show-overflow-tooltip></el-table-column>
          <el-table-column prop="tradeName" label="所属商圈" min-width="150" show-overflow-tooltip></el-table-column>
          <el-table-column prop="groupName" label="所属业务组" min-width="150" show-overflow-tooltip></el-table-column>
          <el-table-column
            prop="belongSalesmanName"
            label="所属业务员"
            min-width="150"
            show-overflow-tooltip
          ></el-table-column>
          <el-table-column
            prop="belongIndustryName"
            label="所属行业"
            min-width="150"
            show-overflow-tooltip
          ></el-table-column>
          <el-table-column prop="shipperStatusName" label="认证状态" min-width="150" show-overflow-tooltip></el-table-column>
          <el-table-column prop="registerTime" label="注册时间" min-width="150" show-overflow-tooltip></el-table-column>
          <el-table-column prop="authTime" label="认证时间" min-width="150" show-overflow-tooltip></el-table-column>
          <el-table-column prop="preCompleteCount" label="上周期订单量" sortable min-width="150"></el-table-column>
          <el-table-column prop="curCompleteCount" label="本周期订单量" sortable min-width="150"></el-table-column>
          <el-table-column label="环比增长率" :sort-method="sortGrowthRate" sortable min-width="150">
            <template slot-scope="scope">
              <span
                :style="{color: parseInt(scope.row.growthRate) >= 0 ? '#3e9ff1' : 'red' }"
              >{{ scope.row.growthRate}}</span>
            </template>
          </el-table-column>
          <el-table-column prop="curCreateCount" sortable label="本周期下单量" min-width="150"></el-table-column>
          <el-table-column prop="curCancelCount" sortable label="本周期取消量" min-width="150"></el-table-column>
          <el-table-column
            prop="matchRate"
            label="配对率"
            sortable
            :sort-method="sortMatchRate"
            min-width="150"
          ></el-table-column>
          <el-table-column
            prop="cancelRate"
            label="取消率"
            sortable
            :sort-method="sortCancelRate"
            min-width="150"
          ></el-table-column>
          <el-table-column
            prop="occupyRate"
            label="占有率(成交量/潜力等级)"
            :sort-method="sortOccupyRate"
            sortable
            min-width="200"
          ></el-table-column>
        </el-table>
      </div>
    </div>
    <!-- 页码 -->
    <div class="info_tab_footer">
      共计:{{ dataTotal }}
      <div class="show_pager">
        <Pager :total="dataTotal" @change="handlePageChange" :sizes="sizes" ref="pager" />
      </div>
    </div>
  </div>
</template>
<script>
import { getDictionary } from '@/api/common.js'
import tradeAreaList from '@/components/selectTree/tradeArea'
import {
  getShippersOrderAnalysisList,
  exportShippersOrderAnalysisListExcel
} from '@/api/dataCenter/ownerDataAnalysis'
import Pager from '@/components/Pagination/index'
import businessGroup from '@/components/selectTree/businessGroup'
import vregion from '@/components/vregion/Region'
import { data_get_shipper_status } from '@/api/users/shipper/all_shipper.js'
export default {
  props: {
    assessType: {
      default: 'sameCity',
      type: String
    }
  },
  data() {
    return {
      sizes: [20, 50, 100, 400], // 页码选择
      dataTotal: 0, // 总页码
      pagesize: 20, // 初始化加载数量
      page: 1, // 初始化页码
      loading: false, // 是否显示加载loading
      btnsize: 'mini', // 按钮大小
      //  查询的表单数据
      formData: {
        phoneNumber: '', // 手机号码
        companyName: '', // 公司名称
        contacts: '', // 联系人
        potentialGrade: '', // 同城潜力等级
        shipperType: '', // 货主类型
        areaCode: '', // 所在地id
        belongCityName: '', // 所在地
        tradeAreaId: '', // 所属商圈id
        tradeAreaName: '', // 所属商圈名
        tradeIndustry: '', // 所属行业
        businessGroupCode: '', // 所属业务组code
        businessGroupName: '', // 所属业务组
        statisticalPeriod: '7', // 统计周期
        timer: [], // 自定义本周期时间
        timer1: [], // 自定义上周期时间
        registerTime: [], // 注册时间
        lastWeekNum1: null, // 上周期下单量起
        lastWeekNum2: null, // 上周期下单量终
        thisWeekNum1: null, // 本周期下单量起
        thisWeekNum2: null, // 本周期下单量终
        mobileList: this.$store.state.dataCenter.mobileList, // 手机号码数组
        authTime: [], // 认证时间
        authStatus: '' // 认证状态
      },
      authList: [], // 认证状态列表
      //   同城潜力等级列表
      potentialGradeList: [],
      //   货主类型列表
      shipperTypeList: [],
      tradeList: [], // 所属行业列表
      //   周期统计列表
      statisticalPeriodList: [
        {
          value: '7',
          label: '7天'
        },
        {
          value: '30',
          label: '30天'
        },
        {
          value: '0',
          label: '指定时间'
        }
      ],
      //   表格数据
      tableData: [],
      saveDate: null // 被选中的数据
    }
  },
  methods: {
    // 环比增长率排序
    sortGrowthRate(a, b) {
      return parseFloat(a.growthRate) - parseFloat(b.growthRate)
    },
    // 配对率排序
    sortMatchRate(a, b) {
      return parseFloat(a.matchRate) - parseFloat(b.matchRate)
    },
    // 取消率排序
    sortCancelRate(a, b) {
      return parseFloat(a.cancelRate) - parseFloat(b.cancelRate)
    },
    // 占有率排序
    sortOccupyRate(a, b) {
      return parseFloat(a.occupyRate) - parseFloat(b.occupyRate)
    },
    // 点击手机跳转货主数据管理页
    searchPhone(id) {
      this.$router.push('/users/dataDetails?userId=' + id)
    },
    // 获取被选中的数据
    getSelection(item) {
      this.saveDate = item
    },
    // 点击行选中与取消
    clickDetails(item) {
      this.$refs.multipleTable.toggleRowSelection(item)
    },
    // 选择的商圈id及名字
    getVal(val) {
      this.formData.tradeAreaId = val.id // 认证所属商圈ID
      this.formData.tradeAreaName = val.tradeName // 认证所属商圈名字
    },
    handleClick(type) {
      switch (type) {
        case 'export':
          // 导出excel
          this.$message.info('正在导出中...')
          const params = {
            belongCity: this.formData.areaCode,
            belongIndustry: this.formData.tradeIndustry,
            companyName: this.formData.companyName,
            contacts: this.formData.contacts,
            curBeginTime: this.formData.timer[0] ? this.formData.timer[0] : '',
            curEndTime: this.formData.timer[1] ? this.formData.timer[1] : '',
            curMaxNumber: this.formData.thisWeekNum2,
            curMinNumber: this.formData.thisWeekNum1,
            cycle: parseInt(this.formData.statisticalPeriod),
            groupId: this.formData.businessGroupCode,
            mobile: this.formData.phoneNumber,
            pageNum: 1,
            pageSize: 999,
            potentialGrade: this.formData.potentialGrade,
            preBeginTime: this.formData.timer1[0]
              ? this.formData.timer1[0]
              : '',
            preEndTime: this.formData.timer1[1] ? this.formData.timer1[1] : '',
            preMaxNumber: this.formData.lastWeekNum2,
            preMinNumber: this.formData.lastWeekNum1,
            queryType: '',
            shipperType: this.formData.shipperType,
            tradeAreaId: this.formData.tradeAreaId,
            registerStartTime:
              !!this.formData.registerTime && this.formData.registerTime[0]
                ? this.formData.registerTime[0]
                : '',
            registerEndTime:
              !!this.formData.registerTime && this.formData.registerTime[1]
                ? this.formData.registerTime[1]
                : '',
            authStartTime:
              !!this.formData.authTime && this.formData.authTime[0]
                ? this.formData.authTime[0]
                : '',
            authEndTime:
              !!this.formData.authTime && this.formData.authTime[1]
                ? this.formData.authTime[1]
                : '',
            shipperStatus: this.formData.authStatus
          }
          const date = this.myformatter(new Date())
          if (this.$route.query.mobileList) {
            params.mobileList = this.$route.query.mobileList.split(',')
          }
          exportShippersOrderAnalysisListExcel(params)
            .then(res => {
              var blob = new Blob([res])
              var NewDom = document.createElement('a')
              var href = window.URL.createObjectURL(blob)
              NewDom.setAttribute('href', href)
              NewDom.setAttribute('target', '_blank')
              NewDom.setAttribute('download', `货主订单分析${date}.xls`)
              document.body.appendChild(NewDom)
              NewDom.click()
              document.body.removeChild(NewDom)
            })
            .catch(err => {
              this.$message.info('导出失败')
            })
          break
        case 'vitalize':
          // 盘活跳转
          // console.log("盘活跳转");
          if (!this.saveDate || this.saveDate.length === 0) {
            this.$message.info('请先选择您要操作的任务')
          } else {
            const shipperData = []
            this.saveDate.forEach(item => {
              shipperData.push({
                mobile: item.mobile, // 手机号码
                companyName: item.companyName, // 公司名称
                contacts: item.contacts, // 联系人
                potentialGradeName: item.potentialGradeName, // 同城潜力等级
                shipperType: item.shipperType, // 货主类型
                belongCity: item.belongCityName, // 所在地
                companyAddress: item.companyAddress, // 企业地址
                tradeAreaName: item.tradeName, // 所属商圈
                belongGroup: item.groupName, // 所属业务组
                belongSalesman: item.belongSalesmanName, // 所属业务员
                belongIndustry: item.belongIndustryName, // 所属行业
                shipperId: item.shipperId
              })
            })
            this.$store.state.dataCenter.shipperData = shipperData
            console.log(
              this.$store.state.dataCenter.shipperData,
              'this.formData.ownerList'
            )
            this.$router.push('/crm/crmManagement/ownerVisitTaskManagement')
          }
          break
        default:
          // 下发营销活动
          // console.log("下发营销活动");
          if (!this.saveDate || this.saveDate.length === 0) {
            this.$message.info('请先选择您要操作的任务')
          } else {
            const phoneNum = []
            this.saveDate.forEach(item => {
              phoneNum.push(item.mobile)
            })
            this.$store.state.marketing.mobilePhone = phoneNum.join('\n')
            this.$router.push(
              '/marketing/userRevitalize/marketingActivity/index'
            )
          }
      }
    },
    // 格式化日期
    myformatter(date) {
      var strDate = date.getFullYear() + '-'
      strDate +=
        (date.getMonth() + 1 > 9
          ? date.getMonth() + 1
          : '0' + (date.getMonth() + 1)) + '-'
      strDate += date.getDate() > 9 ? date.getDate() : '0' + date.getDate()
      return strDate
    },
    regionChange(d) {
      // console.log('data:',d)
      this.formData.belongCityName =
        !d.province && !d.city && !d.area && !d.town
          ? ''
          : `${this.getValue(d.province)}${this.getValue(
              d.city
            )}${this.getValue(d.area)}${this.getValue(d.town)}`.trim()
      if (d.area) {
        this.formData.areaCode = d.area.name
        this.formData.belongCity = d.area.code
      } else if (d.city) {
        this.formData.belongCity = d.city.code
        this.formData.cityCode = d.city.name
      } else {
        this.formData.belongCity = d.province ? d.province.code : ''
        this.formData.provinceCode = d.province ? d.province.name : ''
      }
    },
    // 获取城市
    getValue(obj) {
      return obj ? obj.value : ''
    },
    // 下拉数据字典
    getMoreInformation() {
      // 同城潜力等级
      getDictionary('AF00211').then(res => {
        this.potentialGradeList = res.data
      })
      // 货主类型
      getDictionary('AF00101').then(res => {
        // console.log(res.data, "shipperTypeList");
        this.shipperTypeList = res.data
      })
      // 所属行业
      getDictionary('AF06803').then(res => {
        this.tradeList = res.data
      })
    },
    // 循环遍历树形数据
    getTreeData(data) {
      for (var i = 0; i < data.length; i++) {
        data[i].children =
          data[i].childrenList.length > 0 ? data[i].childrenList : null
        data[i].value = data[i].id
        data[i].label = data[i].tradeName
        if (data[i].childrenList) {
          this.getTreeData(data[i].childrenList)
        }
      }
      return data
    },
    // 同城潜力等级
    potentialGradeChange(e) {
      const potentialGradeList = this.potentialGradeList.filter(el => {
        return el.code == e
      })
      // console.log(potentialGradeList[0].value.split(","));
      this.formData.predictOrderMin = potentialGradeList[0].value.split(',')[0]
      if (e == 'AF0680501') {
        this.formData.predictOrderMax = null
      } else {
        this.formData.predictOrderMax = potentialGradeList[0].value.split(
          ','
        )[1]
      }
    },
    // 每页显示数据量变更
    handlePageChange(obj) {
      this.page = obj.pageNum
      this.pagesize = obj.pageSize
      this.query()
    },
    // 所属业务组
    getObject(e) {
      this.formData.businessGroupName = e.groupName
      this.formData.businessGroupCode = e.groupCode
    },
    // 清空
    clearSearch() {
      this.formData = {
        phoneNumber: '', // 手机号码
        companyName: '', // 公司名称
        contacts: '', // 联系人
        potentialGrade: '', // 同城潜力等级
        shipperType: '', // 货主类型
        belongCity: '', // 所在地id
        belongCityName: '', // 所在地
        tradeAreaId: '', // 所属商圈id
        tradeAreaName: '', // 所属商圈名
        tradeIndustry: '', // 所属行业
        businessGroupCode: '', // 所属业务组code
        businessGroupName: '', // 所属业务组
        statisticalPeriod: '7', // 统计周期
        timer: [], // 自定义本周期时间
        timer1: [], // 自定义上周期时间
        registerTime: [], // 注册时间
        lastWeekNum1: null, // 上周期下单量起
        lastWeekNum2: null, // 上周期下单量终
        thisWeekNum1: null, // 本周期下单量起
        thisWeekNum2: null, // 本周期下单量终
        mobileList: [], // 手机号码数组
        authTime: [], // 认证时间
        authStatus: ''
      }
      this.$refs.pager.pageNum = 1
      this.page = 1
      this.query()
    },
    // 搜索
    firstblood() {
      this.$refs.pager.pageNum = 1
      this.page = 1
      this.query()
    },
    // 获取数据
    query() {
      this.loading = true
      const params = {
        belongCity: this.formData.belongCity,
        belongIndustry: this.formData.tradeIndustry,
        companyName: this.formData.companyName,
        contacts: this.formData.contacts,
        curBeginTime:
          !!this.formData.timer && this.formData.timer[0]
            ? this.formData.timer[0]
            : '',
        curEndTime:
          !!this.formData.timer && this.formData.timer[1]
            ? this.formData.timer[1]
            : '',
        curMaxNumber: this.formData.thisWeekNum2,
        curMinNumber: this.formData.thisWeekNum1,
        cycle: parseInt(this.formData.statisticalPeriod),
        groupId: this.formData.businessGroupCode,
        mobile: this.formData.phoneNumber,
        pageNum: this.page,
        pageSize: this.pagesize,
        potentialGrade: this.formData.potentialGrade,
        preBeginTime:
          !!this.formData.timer1 && this.formData.timer1[0]
            ? this.formData.timer1[0]
            : '',
        preEndTime:
          !!this.formData.timer1 && this.formData.timer1[1]
            ? this.formData.timer1[1]
            : '',
        preMaxNumber: this.formData.lastWeekNum2,
        preMinNumber: this.formData.lastWeekNum1,
        queryType: '',
        registerStartTime:
          !!this.formData.registerTime && this.formData.registerTime[0]
            ? this.formData.registerTime[0]
            : '',
        registerEndTime:
          !!this.formData.registerTime && this.formData.registerTime[1]
            ? this.formData.registerTime[1]
            : '',
        authStartTime:
          !!this.formData.authTime && this.formData.authTime[0]
            ? this.formData.authTime[0]
            : '',
        authEndTime:
          !!this.formData.authTime && this.formData.authTime[1]
            ? this.formData.authTime[1]
            : '',
        shipperStatus: this.formData.authStatus,
        shipperType: this.formData.shipperType,
        tradeAreaId: this.formData.tradeAreaId,
        mobileList: this.$route.query.mobileList ? this.$route.query.mobileList.split(',') : this.formData.mobileList
      }
      getShippersOrderAnalysisList(params)
        .then(res => {
          this.loading = false
          if (res.status === 200) {
            this.tableData = res.data.list
            this.dataTotal = res.data.total
          } else {
            this.$message.error(res.errorInfo)
          }
        })
        .catch(err => {
          this.loading = false
          this.$message.error(err.errorInfo)
        })
    }
  },
  mounted() {
    this.getMoreInformation()
    this.query()
    // 获取状态列表
    data_get_shipper_status().then(res => {
      this.authList = res.data
    })
  },
  watch: {
    'formData.phoneNumber'(newVal, oldVal) {
      const newValNum = newVal.replace(/[^0-9]/gi, '')
      this.formData.phoneNumber = newValNum
    }
  },
  beforeDestroy() {
    this.$store.state.dataCenter.mobileList = []
  },
  components: {
    Pager,
    businessGroup,
    tradeAreaList,
    vregion
  }
}
</script>
<style lang="scss" scope>
.classify_searchinfo .el-form-item .el-form-item__content .el-input.inputNum {
  width: 80px;
}
.classify_searchinfo
  .el-form-item
  .el-form-item__content
  .el-input.inputNum
  .el-input__inner {
  width: 80px;
  padding: 0 4px;
  text-align: center;
}
</style>
