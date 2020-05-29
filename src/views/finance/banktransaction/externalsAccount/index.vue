<template>
  <div class="tabsWrap">
    <el-tabs type="card" v-model="externalsAccountType" @tab-click="handleClick">
      <el-tab-pane label="微信资金账单" name="weChatFundBill">
        <weChatFundBill :keys="dataKeys" :isvisible="externalsAccountType == 'weChatFundBill'" />
      </el-tab-pane>
      <el-tab-pane label="微信账务订单" name="weChatAccountingOrder">
        <weChatAccountingOrder
          :keys="dataKeys"
          :isvisible="externalsAccountType == 'weChatAccountingOrder'"
        />
      </el-tab-pane>
      <el-tab-pane label="支付宝账务明细" name="zhifubaoAccountingDetail">
        <zhifubaoAccountingDetail
          :keys="dataKeys"
          :isvisible="externalsAccountType == 'zhifubaoAccountingDetail'"
        />
      </el-tab-pane>
      <el-tab-pane label="支付宝业务明细" name="zhifubaoBusinessDetail">
        <zhifubaoBusinessDetail
          :keys="dataKeys"
          :isvisible="externalsAccountType == 'zhifubaoBusinessDetail'"
        />
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import weChatFundBill from "./components/weChatFundBill";
import weChatAccountingOrder from "./components/weChatAccountingOrder";
import zhifubaoAccountingDetail from "./components/zhifubaoAccountingDetail";
import zhifubaoBusinessDetail from "./components/zhifubaoBusinessDetail";
export default {
  data() {
    return {
      externalsAccountType: "weChatFundBill",
      dataKeys: ""
    };
  },
  components: {
    weChatFundBill,
    weChatAccountingOrder,
    zhifubaoAccountingDetail,
    zhifubaoBusinessDetail
  },
  methods: {
    handleClick(tab, event) {
      this.externalsAccountType = tab.name;
      this.dataKeys = Math.random();
    }
  },
  activated() {
    this.externalsAccountType =
      sessionStorage.getItem("externalsAccountType") || "weChatFundBill";
  },

  beforeUpdate() {
    sessionStorage.setItem("externalsAccountType", this.externalsAccountType);
  },

  beforeRouteEnter(to, from, next) {
    // console.log("hhh", to);
    if (to.meta.isClosed) {
      sessionStorage.setItem("externalsAccountType", "weChatFundBill");
      to.meta.isClosed = false;
    }
    next();
  }
};
</script>

<style>
</style>