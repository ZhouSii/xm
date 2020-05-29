
<template>
  <el-form
    :inline="true"
    :model="searchInfo"
    ref="ruleForm"
    class="demo-ruleForm classify_searchinfo"
  >
    <el-form-item label="注册所在地" prop="regisAddress">
      <el-input v-model.trim="searchInfo.regisAddress" clearable></el-input>
    </el-form-item>
    <el-form-item
      label="认证所在地"
      prop="belongCityName"
      v-if="showType != 'unauthorized'"
    >
      <el-input v-model.trim="searchInfo.belongCityName" clearable></el-input>
    </el-form-item>
    <el-form-item
      label="认证状态"
      v-if="showType == 'All'"
      prop="shipperStatus"
    >
      <el-select
        v-model="searchInfo.shipperStatus"
        clearable
        placeholder="请选择"
      >
        <el-option
          v-for="item in optionsStatus"
          :key="item.id"
          :label="item.name"
          :value="item.code"
          :disabled="item.disabled"
        ></el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="账户发货状态" prop="accountStatus">
      <el-select
        v-model="searchInfo.accountStatus"
        clearable
        placeholder="请选择"
      >
        <el-option
          v-for="item in optionsAuidSataus"
          :key="item.id"
          :label="item.name"
          :value="item.code"
          :disabled="item.disabled"
        ></el-option>
      </el-select>
    </el-form-item>
    <el-form-item
      label="公司名称"
      v-if="showType != 'unauthorized'"
      prop="companyName"
    >
      <el-input v-model.trim="searchInfo.companyName" clearable></el-input>
    </el-form-item>
    <el-form-item
      label="所属业务员"
      v-if="
        showType == 'All' ||
          showType == 'hasCertified' ||
          showType == 'unauthorized'
      "
      prop="belongSalesmanName"
    >
      <el-input
        v-model.trim="searchInfo.belongSalesmanName"
        clearable
      ></el-input>
    </el-form-item>
    <el-form-item
      label="所属客服"
      v-if="
        showType == 'All' ||
          showType == 'hasCertified' ||
          showType == 'unauthorized'
      "
      prop="belongCustomerService"
    >
      <el-input
        v-model.trim="searchInfo.belongCustomerService"
        clearable
      ></el-input>
    </el-form-item>
    <el-form-item label="货主手机号" prop="mobile">
      <el-input v-model.trim="searchInfo.mobile" clearable></el-input>
    </el-form-item>
    <el-form-item
      label="后续跟进"
      v-if="showType == 'All'"
      prop="shipperFollowUp"
    >
      <el-select
        v-model="searchInfo.shipperFollowUp"
        clearable
        placeholder="请选择"
      >
        <el-option
          v-for="item in optionsShipperFollowUp"
          :key="item.id"
          :label="item.name"
          :value="item.code"
          :disabled="item.disabled"
        ></el-option>
      </el-select>
    </el-form-item>
    <el-form-item
      label="账户登录状态"
      v-if="showType == 'All'"
      prop="usingStatus"
    >
      <el-select
        v-model="searchInfo.usingStatus"
        clearable
        placeholder="请选择"
      >
        <el-option
          v-for="item in optionsShipperStatus"
          :key="item.id"
          :label="item.name"
          :value="item.code"
          :disabled="item.disabled"
        ></el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="联系人名称" prop="contacts" v-if="showType == 'All'">
      <el-input v-model.trim="searchInfo.contacts" clearable></el-input>
    </el-form-item>
    <el-form-item
      label="注册时间"
      prop="registeTime"
      v-if="showType == 'All' || showType == 'unauthorized'"
    >
      <el-date-picker
        v-model="registeTime"
        type="daterange"
        range-separator="-"
        start-placeholder="开始日期"
        end-placeholder="结束日期"
        unlink-panels
        align="right"
        :default-time="['00:00:00', '23:59:59']"
        value-format="timestamp"
      ></el-date-picker>
    </el-form-item>
    <el-form-item
      label="认证通过时间"
      prop="authPassTime"
      v-if="showType == 'hasCertified'"
    >
      <el-date-picker
        v-model="authPassTime"
        type="daterange"
        range-separator="-"
        start-placeholder="开始日期"
        end-placeholder="结束日期"
        unlink-panels
        align="right"
        :default-time="['00:00:00', '23:59:59']"
        value-format="timestamp"
      ></el-date-picker>
    </el-form-item>
    <el-form-item
      label="企业地址"
      prop="companyAddress"
      v-if="showType == 'All' || showType == 'hasCertified'"
    >
      <el-input v-model.trim="searchInfo.companyAddress" clearable></el-input>
    </el-form-item>
    <el-form-item
      label="同城潜力等级"
      prop="potentialGrade"
      v-if="showType == 'All'"
    >
      <el-select
        v-model="searchInfo.potentialGrade"
        clearable
        placeholder="请选择"
      >
        <el-option
          v-for="item in optionsGradeType"
          :key="item.id"
          :label="item.name"
          :value="item.code"
          :disabled="item.disabled"
        ></el-option>
      </el-select>
    </el-form-item>
    <el-form-item
      label="调整等级"
      prop="levelAdjustment"
      v-if="showType == 'All'"
    >
      <el-select
        v-model="searchInfo.levelAdjustment"
        clearable
        placeholder="请选择"
      >
        <el-option
          v-for="item in optionsLevelAdjustment"
          :key="item.id"
          :label="item.name"
          :value="item.code"
          :disabled="item.disabled"
        ></el-option>
      </el-select>
    </el-form-item>
    <el-form-item
      label="认证所属商圈"
      prop="tradeAreaId"
      v-if="showType == 'All'"
    >
      <tradeAreaList
        @inputObject="getVal"
        v-model="searchInfo.tradeAreaId"
        ref="tradeArea"
      />
    </el-form-item>
    <el-form-item
      label="注册来源"
      v-if="showType == 'All' || showType == 'unauthorized'"
    >
      <el-input
        placeholder="请输入内容"
        v-model.trim="searchInfo.registerOriginName"
        clearable
      ></el-input>
    </el-form-item>
    <el-form-item class="btnChoose fr" style="margin-left:0;">
      <el-button
        type="primary"
        :size="btnsize"
        icon="el-icon-search"
        plain
        @click="handleSearch('search')"
        >搜索</el-button
      >
      <el-button
        type="info"
        icon="fontFamily aflc-icon-qingkong"
        :size="btnsize"
        plain
        @click="handleSearch('clear')"
        >清空</el-button
      >
    </el-form-item>
  </el-form>
</template>

<script type="text/javascript">
import { parseTime, pickerOptions2 } from "@/utils/index.js";
// import vregion from '@/components/vregion/Region'
import { getDictionary, DicGradeType } from "@/api/common.js";
import tradeAreaList from "@/components/selectTree/tradeArea";

export default {
  components: {
    // vregion
    tradeAreaList
  },
  props: {
    showType: {
      type: String,
      default: "All"
    }
  },
  data() {
    return {
      btnsize: "mini",
      registeTime: [],
      authPassTime: [],
      auditingStatus: "AF00104", //认证状态
      accountStatus: "AF00105", //账户状态
      pickerOptions2: {
        shortcuts: pickerOptions2
      },
      searchInfo: {
        belongCity: "",
        regisAddress: "",
        belongCityName: "",
        contacts: "",
        shipperStatus: "",
        accountStatus: "",
        companyName: "",
        mobile: "",
        potentialGrade: "",
        levelAdjustment: "", //调整等级
        tradeAreaId: "", //认证商圈
        // belongSalesmanName:'',
        // belongCustomerService:'',
        registerOriginName: "",
        shipperFollowUp: "",
        usingStatus: "",
        registerStartTime: "",
        registerEndTime: "",
        authPassStartTime: "",
        authPassEndTime: "",
        companyAddress: ""
      },
      optionsStatus: [
        {
          code: "",
          name: "全部"
        }
      ],
      // 账户状态
      optionsAuidSataus: [
        {
          code: "",
          name: "全部"
        }
      ],
      optionsShipperFollowUp: [
        {
          id: "01",
          code: "",
          name: "全部"
        },
        {
          id: "02",
          code: "1",
          name: "是"
        },
        {
          id: "03",
          code: "0",
          name: "否"
        }
      ],
      optionsShipperStatus: [
        {
          id: "01",
          code: "",
          name: "全部"
        },
        {
          id: "02",
          code: "1",
          name: "启用"
        },
        {
          id: "03",
          code: "0",
          name: "禁用"
        }
      ],
      //货主同城潜力等级
      optionsGradeType: [
        {
          code: "",
          name: "全部"
        }
      ],
      optionsLevelAdjustment: [
        {
          code: "",
          name: "全部"
        },
        {
          code: "S",
          name: "S"
        },
        {
          code: "A",
          name: "A"
        },
        {
          code: "B",
          name: "B"
        },
        {
          code: "C",
          name: "C"
        },
        {
          code: "D",
          name: "D"
        }
      ]
    };
  },
  watch: {
    $route(to, from) {
      if (from.path === "/service/customerReported/index") {
        const self = this;
        sessionStorage.setItem("once", true);
        if (self.$route.query.mobile) {
          self.searchInfo.mobile = self.$route.query.mobile;
          self.handleSearch("search");
        }
      }
    }
  },
  mounted() {
    this.init();
    const self = this;
    if (self.$route.query.mobile) {
      sessionStorage.setItem("once", true);
      self.searchInfo.mobile = self.$route.query.mobile;
      self.handleSearch("search");
    }
  },
  methods: {
    // regionChange(d) {
    //     // console.log('data:',d)
    //     this.searchInfo.belongCityName = (!d.province&&!d.city&&!d.area&&!d.town) ? '': `${this.getValue(d.province)}${this.getValue(d.city)}${this.getValue(d.area)}${this.getValue(d.town)}`.trim();
    // },
    //  getValue(obj){
    //     return obj ? obj.value:'';
    // },
    getVal(val) {
      console.log("getVal", val);
      // this.standForm.parentId = val;
      this.searchInfo.tradeAreaId = val.id; //认证所属商圈ID
      // this.xinzengform.tradeAreaName = val.tradeName;//认证所属商圈名字
    },
    // 获取状态列表
    init() {
      // 获取状态列表
      this.$store.dispatch("GetInfoDic", "AF00104").then(res => {
        this.optionsStatus = this.optionsStatus.concat(res);
      });
      this.$store.dispatch("GetInfoDic", "AF00105").then(res => {
        this.optionsAuidSataus = this.optionsAuidSataus.concat(res);
      });
      this.$store.dispatch("GetInfoDic", "AF00211").then(res => {
        this.optionsGradeType = this.optionsGradeType.concat(res);
      });
      //   Promise.all([
      //     getDictionary(this.auditingStatus),
      //     getDictionary(this.accountStatus),
      //     DicGradeType()
      //   ]).then(resArr => {
      //     // console.log('resArr',resArr)
      //     resArr[0].data.map(item => {
      //       this.optionsStatus.push(item);
      //     });
      //     resArr[1].data.map(item => {
      //       this.optionsAuidSataus.push(item);
      //     });
      //     this.optionsGradeType = this.optionsGradeType.concat(resArr[2].data);
      //   });
    },
    //模糊查询 分类名称或者code
    handleSearch(type) {
      if (this.registeTime) {
        this.searchInfo.registerStartTime = this.registeTime[0];
        this.searchInfo.registerEndTime = this.registeTime[1];
      }
      if (this.authPassTime) {
        this.searchInfo.authPassStartTime = this.authPassTime[0];
        this.searchInfo.authPassEndTime = this.authPassTime[1];
      }
      if (type == "clear") {
        for (const i in this.searchInfo) {
          this.searchInfo[i] = "";
        }
        this.registeTime = [];
        this.authPassTime = [];
      }
      let searchObj = Object.assign({}, this.searchInfo);
      this.$emit("change", searchObj);
    }
  }
};
</script>

<style type="text/css" lang="scss" scoped>
</style>