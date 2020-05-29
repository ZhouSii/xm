<template>
  <!-- 货主账户明细 -->
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
      accountType: "AF00101",
      accountTypeName: "货主账户",
      tradeTypeList: [
        { name: "全部", code: null },
        { name: "订单多退", code: "AF01403" },
        { name: "理赔收入", code: "AF01404" },
        { name: "平台补贴", code: "AF01406" },
        { name: "退运费", code: "AF01407" },
        { name: "推荐车主接单奖励", code: "AF01425" },
        { name: "推荐货主发货奖励", code: "AF01426" },
        { name: "推荐新货主注册奖励", code: "AF01427" },
        { name: "推荐新车主注册奖励", code: "AF01428" },
        { name: "推荐新货主认证奖励", code: "AF01429" },
        { name: "推荐新车主认证奖励", code: "AF01430" },
        { name: "货主扫专属下单码发货奖励", code: "AF01431" },
        { name: "货主退额外小费收入", code: "AF01437" },
        { name: "货主支付运费", code: "AF01501" },
        { name: "货主支付额外费用", code: "AF01536" },
        { name: "货主支付额外小费", code: "AF01537" },
        { name: "订单少补", code: "AF01544" }
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