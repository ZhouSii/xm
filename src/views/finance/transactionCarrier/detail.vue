<template>
  <div class="same_shipper tabsWrap tranSationDemo">
    <el-tabs type="card" @tab-click="handleClick" v-model="specialLineTypeName">
      <el-tab-pane
        label="账户余额"
        name="accountBalance"
        v-if="$_has_permission('FINANCE_SPECIALLINEPROFILE_SPECIALLINEDETAILS_ACCOUNTBALANCE')"
      >
        <accountBalance :isvisible="specialLineTypeName === 'accountBalance'" :key="dataKeys" />
      </el-tab-pane>
      <el-tab-pane
        label="待入账金额"
        name="waitEnterAccount"
        v-if="$_has_permission('FINANCE_SPECIALLINEPROFILE_SPECIALLINEDETAILS_AMOUNTTOBERECORDED')"
      >
        <waitEnterAccount :isvisible="specialLineTypeName === 'waitEnterAccount'" :key="dataKeys" />
      </el-tab-pane>
      <el-tab-pane
        label="保证金"
        name="earnestMoney"
        v-if="$_has_permission('FINANCE_SPECIALLINEPROFILE_SPECIALLINEDETAILS_BOND')"
      >
        <earnestMoney :isvisible="specialLineTypeName === 'earnestMoney'" :key="dataKeys" />
      </el-tab-pane>
      <el-tab-pane
        label="提现记录"
        name="cashDetail"
        v-if="$_has_permission('FINANCE_SPECIALLINEPROFILE_SPECIALLINEDETAILS_WITHDRAWALSRECORD')"
      >
        <cashDetail :isvisible="specialLineTypeName === 'cashDetail'" :key="dataKeys" />
      </el-tab-pane>
    </el-tabs>
  </div>
</template>


<script>
import { mapState, mapActions } from "vuex";
import accountBalance from "./components/accountBalance";
import waitEnterAccount from "./components/waitEnterAccount";
import earnestMoney from "./components/earnestMoney";
import cashDetail from "./components/cashDetail";
export default {
  data() {
    return {
      specialLineTypeName: "accountBalance",
      visibleTabs: [
        { label: "账户余额", name: "one", type: null },
        { label: "待入账金额", name: "two", type: "" },
        { label: "保证金", name: "three", type: "" },
        { label: "提现记录", name: "four", type: "" }
      ],
      dataKeys: ""
    };
  },
  components: {
    accountBalance,
    waitEnterAccount,
    earnestMoney,
    cashDetail
  },
  methods: {
    handleClick(tab, event) {
      this.specialLineTypeName = tab.name;
      this.dataKeys = Math.random();
    }
  },
  activated() {
    this.specialLineTypeName =
      sessionStorage.getItem("specialLineTypeName") || "accountBalance";
  },

  beforeUpdate() {
    sessionStorage.setItem("specialLineTypeName", this.specialLineTypeName);
  }
};
</script>

<style lang="scss" >
.tranSationDemo {
  .transationRed {
    color: red;
  }
  .transationBlue {
    color: #0da0e4;
  }
  .titleName {
    background: #0da0e4;
    display: inline-block;
    padding: 2px 4px;
    border-radius: 5px;
    color: #fff;
    font-size: 16px;
  }
  .pr50 {
    margin-right: 50px;
  }
}
</style>

