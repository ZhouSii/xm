<template>
  <!-- 现金账户明细 -->
  <statementlist
    :accountType="accountType"
    :accountTypeName="accountTypeName"
    :tradeTypeList="tradeTypeList"
  />
</template>

<script>
import statementlist from "./statementList";
export default {
  data() {
    return {
      accountType: "AF01601",
      accountTypeName: "现金账户",
      tradeTypeList: [
        { name: "全部", code: null },
        { name: "支付运费", code: "AF01508" },
        { name: "支付理赔", code: "AF01509" },
        { name: "订单多退", code: "AF01510" },
        { name: "退运费", code: "AF01511" },
        { name: "平台支付额外费用", code: "AF01538" },
        { name: "平台支付额外小费", code: "AF01539" },
        { name: "平台运费收入", code: "AF01540" },
        { name: "理赔收入", code: "AF01541" }
      ]
    };
  },
  components: {
    statementlist
  }
};
</script>

<style>
</style>