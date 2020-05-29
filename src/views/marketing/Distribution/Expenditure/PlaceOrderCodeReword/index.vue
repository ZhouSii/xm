
<template>
  <div class="member tabsWrap">
    <el-tabs v-model="codeRewardName" type="card" @tab-click="handleClick">
      <!-- 小货车 -->
      <el-tab-pane label="小货车下单码奖励" name="vanCode">
        <vanCodeReward :key="dataKeys"></vanCodeReward>
      </el-tab-pane>

      <!-- 发物流 -->
      <el-tab-pane label="发物流下单码奖励" name="logisticsCode">
        <logisticsCodeReward :key="dataKeys"></logisticsCodeReward>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script type="text/javascript">
import "@/styles/dialog.scss";
import "@/styles/tab.scss";
import vanCodeReward from "./vanCodeReward.vue";
import logisticsCodeReward from "./logisticsCodeReward.vue";
export default {
  data() {
    return {
      codeRewardName: "vanCode",
      dataKeys: ""
    };
  },
  components: {
    vanCodeReward,
    logisticsCodeReward
  },
  watch: {
    codeRewardName(newVal, oldVal) {
      if (newVal) {
        this.codeRewardName = newVal;
      } else {
        this.codeRewardName = oldVal;
      }
    }
  },
  created() {
    this.codeRewardName = sessionStorage.getItem("codeRewardName") || "vanCode";
  },

  beforeUpdate() {
    sessionStorage.setItem("codeRewardName", this.codeRewardName);
  },
  beforeRouteEnter(to, from, next) {
    if (to.meta.isClosed) {
      sessionStorage.setItem("codeRewardName", "vanCode");
      to.meta.isClosed = false;
    }
    next();
  },
  methods: {
    handleClick(tab, event) {
      this.codeRewardName = tab.name;
      this.dataKeys = Math.random();
    }
  }
};
</script>
