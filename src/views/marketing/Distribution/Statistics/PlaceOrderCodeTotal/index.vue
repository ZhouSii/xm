
<template>
  <div class="member tabsWrap">
    <el-tabs v-model="codeTotal" type="card" @tab-click="handleClick">
      <!-- 小货车 -->
      <el-tab-pane label="小货车下单码下单汇总" name="vanPlaceOrderCodeTotal">
        <vanCodeTotal :key="dataKeys"></vanCodeTotal>
      </el-tab-pane>

      <!-- 发物流 -->
      <el-tab-pane label="发物流下单码下单汇总" name="logisticsPlaceOrderCodeTotal">
        <logisticsCodeTotal :key="dataKeys"></logisticsCodeTotal>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script type="text/javascript">
import "@/styles/dialog.scss";
import "@/styles/tab.scss";
import vanCodeTotal from "./vanCodeTotal.vue";
import logisticsCodeTotal from "./logisticsCodeTotal.vue";
export default {
  data() {
    return {
      codeTotal: "vanPlaceOrderCodeTotal",
      dataKeys: ""
    };
  },
  components: {
    vanCodeTotal,
    logisticsCodeTotal
  },
  watch: {
    codeTotal(newVal, oldVal) {
      if (newVal) {
        this.codeTotal = newVal;
      } else {
        this.codeTotal = oldVal;
      }
    }
  },
  created() {
    this.codeTotal =
      sessionStorage.getItem("codeTotal") || "vanPlaceOrderCodeTotal";
  },

  beforeUpdate() {
    sessionStorage.setItem("codeTotal", this.codeTotal);
  },
  beforeRouteEnter(to, from, next) {
    if (to.meta.isClosed) {
      sessionStorage.setItem("codeTotal", "vanPlaceOrderCodeTotal");
      to.meta.isClosed = false;
    }
    next();
  },
  methods: {
    handleClick(tab, event) {
      this.codeTotal = tab.name;
      this.dataKeys = Math.random();
    }
  }
};
</script>
