<template>
  <!-- 运营账户明细 -->
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
      accountType: "AF01602",
      accountTypeName: "运营账户",
      tradeTypeList: [
        { name: "全部", code: null },
        { name: "其他收入", code: "AF01410" },
        { name: "平台抽佣 ", code: "AF01414" },
        { name: "保险费收入", code: "AF01415" },
        { name: "货主货物保障", code: "AF01416" },
        { name: "车主货物保障", code: "AF01417" },
        { name: "售出会员", code: "AF01418" },
        { name: "售出加速包", code: "AF01419" },
        { name: "收入车主保证金", code: "AF01420" },
        { name: "收回车主奖励金", code: "AF01422" },
        { name: "提现手续费收入", code: "AF01432" },
        { name: "收回车主优惠金", code: "AF01433" },
        { name: "收回车主优惠券", code: "AF01434" },
        { name: "平台收入车贴申请费", code: "AF01440" },
        { name: "收回接单码发货奖励", code: "AF01444" },
        { name: "收回推荐货主发货奖励", code: "AF01445" },
        { name: "收回推荐车主接单奖励", code: "AF01446" },
        { name: "优惠券", code: "AF01505" },
        { name: "充值赠送", code: "AF01506" },
        { name: "赠送积分", code: "AF01507" },
        { name: "平台补贴", code: "AF01513" },
        { name: "优惠金", code: "AF01516" },
        { name: "奖励金", code: "AF01517" },
        { name: "达量奖励", code: "AF01518" },
        { name: "返回车主奖励金", code: "AF01524" },
        { name: "接单码奖励", code: "AF01525" },
        { name: "推荐车主接单奖励", code: "AF01526" },
        { name: "推荐货主发货奖励", code: "AF01527" },
        { name: "推荐货主注册奖励", code: "AF01528" },
        { name: "推荐车主注册奖励", code: "AF01529" },
        { name: "推荐货主认证奖励", code: "AF01530" },
        { name: "推荐车主认证奖励", code: "AF01531" },
        { name: "下单码奖励", code: "AF01532" },
        { name: "平台支出上报补偿", code: "AF01542" },
        { name: "平台支出车贴奖励", code: "AF01543" },
        { name: "车主补贴支出", code: "AF01551" },
        { name: "分享奖励", code: "AF01553" },
        { name: "高峰期补贴", code: "AF01554" },
        { name: "收回高峰期补贴", code: "AF01455" }
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