
<template>
  <div class="member tabsWrap">
    <el-tabs v-model="operaName" type="card" @tab-click="handleClick">
      <!-- 抽拥 -->
      <el-tab-pane
        label="抽拥"
        name="smoke"
        v-if="$_has_permission('MARKETING_OPERATION_COMMISSION')"
      >
        <smoke :isvisible="operaName === 'smoke'" :key="dataKeys"></smoke>
      </el-tab-pane>

      <!-- 优惠券 -->
      <el-tab-pane label="优惠券" name="coupon" v-if="$_has_permission('MARKETING_OPERATION_COUPON')">
        <coupon :isvisible="operaName === 'coupon'" :key="dataKeys"></coupon>
      </el-tab-pane>

      <!-- 优惠金 -->
      <el-tab-pane
        label="优惠金"
        name="gold"
        v-if="$_has_permission('MARKETING_OPERATION_PREFERENTIAL')"
      >
        <gold :isvisible="operaName === 'gold'" :key="dataKeys"></gold>
      </el-tab-pane>

      <!-- 奖励金 -->
      <el-tab-pane
        label="奖励金"
        name="bounty"
        v-if="$_has_permission('MARKETING_OPERATION_DRIVER_REWARD')"
      >
        <bounty :isvisible="operaName === 'bounty'" :key="dataKeys"></bounty>
      </el-tab-pane>

      <!-- 达量奖励 -->
      <el-tab-pane
        label="达量奖励"
        name="amount"
        v-if="$_has_permission('MARKETING_OPERATION_ORDER_NUM_REWARD')"
      >
        <amount :isvisible="operaName === 'amount'" :key="dataKeys"></amount>
      </el-tab-pane>

      <!-- 货物保障 -->
      <el-tab-pane
        label="货物保障"
        name="CargoProtection"
        v-if="$_has_permission('MARKETING_OPERATION_GOODS_INSURE')"
      >
        <CargoProtection :isvisible="operaName === 'CargoProtection'" :key="dataKeys"></CargoProtection>
      </el-tab-pane>

      <!-- 发物流平台分润 -->
      <el-tab-pane
        label="发物流平台分润"
        name="logisticsProfit"
        v-if="$_has_permission('MARKETING_SHIPPER_MANAGE_DISTRIBUTIONPLATFORM')"
      >
        <logistics-profit :isvisible="operaName === 'logisticsProfit'" :key="dataKeys"></logistics-profit>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script type="text/javascript">
import "@/styles/dialog.scss";
import "@/styles/tab.scss";
import smoke from "./smoke.vue";
import coupon from "./coupon.vue";
import gold from "./gold.vue";
import bounty from "./bounty.vue";
import amount from "./amount.vue";
import CargoProtection from "./CargoProtection.vue";
import logisticsProfit from "./logisticsProfit.vue";
export default {
  data() {
    return {
      operaName: "smoke",
      dataKeys: ""
    };
  },
  name: "operating",
  components: {
    smoke,
    coupon,
    gold,
    bounty,
    amount,
    CargoProtection,
    logisticsProfit
  },
  props: {
    isvisible: {
      type: Boolean,
      default: false
    }
  },
  watch: {
    operaName(newVal, oldVal) {
      if (newVal) {
        this.operaName = newVal;
      } else {
        this.operaName = oldVal;
      }
    }
  },
  activated() {
    this.operaName = sessionStorage.getItem("operaName") || "smoke";
  },

  beforeUpdate() {
    sessionStorage.setItem("operaName", this.operaName);
  },

  beforeRouteEnter(to, from, next) {
    // console.log("hhh", to);
    if (to.meta.isClosed) {
      sessionStorage.setItem("operaName", "smoke");
      to.meta.isClosed = false;
    }
    next();
  },
  methods: {
    handleClick(tab, event) {
      this.operaName = tab.name;
      this.dataKeys = Math.random();
    }
  }
};
</script>
