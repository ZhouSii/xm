<template>
  <!-- 车主账户明细 -->
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
      accountType: "AF00102",
      accountTypeName: "车主账户",
      tradeTypeList: [
        { name: "全部", code: null },
        { name: "平台补贴", code: "AF01406" },
        { name: "运费收入", code: "AF01408" },
        { name: "代收货款", code: "AF01409" },
        { name: "达量奖励", code: "AF01421" },
        { name: "违规纠正返回奖励金", code: "AF01423" },
        { name: "货主扫专属接单码发货奖励", code: "AF01424" },
        { name: "推荐车主接单奖励", code: "AF01425" },
        { name: "推荐货主发货奖励", code: "AF01426" },
        { name: "推荐新货主注册奖励", code: "AF01427" },
        { name: "推荐新车主注册奖励", code: "AF01428" },
        { name: "推荐新货主认证奖励", code: "AF01429" },
        { name: "推荐新车主认证奖励", code: "AF01430" },
        { name: "车主额外费用收入", code: "AF01438" },
        { name: "车主额外小费收入", code: "AF01439" },
        { name: "车主收入上报补偿", code: "AF01441" },
        { name: "车主收入车贴奖励", code: "AF01442" },
        { name: "提现失败", code: "AF01449" },
        { name: "车主补贴收入", code: "AF01452" },
        { name: "代付货款", code: "AF01502" },
        { name: "支付理赔", code: "AF01503" },
        { name: "购买会员", code: "AF01520" },
        { name: "购买加速包", code: "AF01521" },
        { name: "违规扣除保证金", code: "AF01522" },
        { name: "违规扣除奖励金", code: "AF01523" },
        { name: "提现手续费支出", code: "AF01533" },
        { name: "违规扣除优惠金", code: "AF01534" },
        { name: "违规扣除优惠券", code: "AF01535" },
        { name: "车主支出车贴申请费", code: "AF01541" },
        { name: "违规扣除接单码发货奖励", code: "AF01546" },
        { name: "违规扣除推荐货主发货奖励", code: "AF01547" },
        { name: "违规扣除推荐车主接单奖励", code: "AF01548" },
        { name: "分享奖励", code: "AF01453" },
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