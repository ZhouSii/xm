
<template>
  <div class="member tabsWrap">
    <el-tabs v-model="shipperRewardName" type="card" @tab-click="handleClick">
      <!-- 小货车 -->
      <el-tab-pane label="小货车推荐货主业务奖励" name="vanShipperReward">
        <vanShipperBusinessReward :key="dataKeys"></vanShipperBusinessReward>
      </el-tab-pane>

      <!-- 发物流 -->
      <el-tab-pane label="发物流推荐货主业务奖励" name="logisticsShipperReward">
        <logisticsShipperBusinessReward :key="dataKeys"></logisticsShipperBusinessReward>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script type="text/javascript">
import "@/styles/dialog.scss";
import "@/styles/tab.scss";
import vanShipperBusinessReward from "./vanShipperBusinessReward.vue";
import logisticsShipperBusinessReward from "./logisticsShipperBusinessReward.vue";
export default {
  data() {
    return {
      shipperRewardName: "vanShipperReward",
      dataKeys: ""
    };
  },
  components: {
    vanShipperBusinessReward,
    logisticsShipperBusinessReward
  },
  watch: {
    shipperRewardName(newVal, oldVal) {
      if (newVal) {
        this.shipperRewardName = newVal;
      } else {
        this.shipperRewardName = oldVal;
      }
    }
  },
  created() {
    this.shipperRewardName =
      sessionStorage.getItem("shipperRewardName") || "vanShipperReward";
  },

  beforeUpdate() {
    sessionStorage.setItem("shipperRewardName", this.shipperRewardName);
  },

  beforeRouteEnter(to, from, next) {
    if (to.meta.isClosed) {
      sessionStorage.setItem("shipperRewardName", "vanShipperReward");
      to.meta.isClosed = false;
    }
    next();
  },
  methods: {
    handleClick(tab, event) {
      this.shipperRewardName = tab.name;
      this.dataKeys = Math.random();
    }
  }
};
</script>
