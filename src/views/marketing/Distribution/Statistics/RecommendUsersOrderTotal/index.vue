
<template>
  <div class="member tabsWrap">
    <el-tabs v-model="orderTotal" type="card" @tab-click="handleClick">
      <!-- 小货车 -->
      <el-tab-pane label="小货车推荐用户订单汇总" name="vanOrderTotal">
        <vanOrderTotal :key="dataKeys"></vanOrderTotal>
      </el-tab-pane>

      <!-- 发物流 -->
      <el-tab-pane label="发物流推荐用户订单汇总" name="logisticsOrderTotal">
        <logisticsOrderTotal :key="dataKeys"></logisticsOrderTotal>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script type="text/javascript">
import "@/styles/dialog.scss";
import "@/styles/tab.scss";
import vanOrderTotal from "./vanOrderTotal.vue";
import logisticsOrderTotal from "./logisticsOrderTotal.vue";
export default {
  data() {
    return {
      orderTotal: "vanOrderTotal",
      dataKeys: ""
    };
  },
  components: {
    vanOrderTotal,
    logisticsOrderTotal
  },
  watch: {
    orderTotal(newVal, oldVal) {
      if (newVal) {
        this.orderTotal = newVal;
      } else {
        this.orderTotal = oldVal;
      }
    }
  },
  created() {
    this.orderTotal = sessionStorage.getItem("orderTotal") || "vanOrderTotal";
  },

  beforeUpdate() {
    sessionStorage.setItem("orderTotal", this.orderTotal);
  },
  beforeRouteEnter(to, from, next) {
    if (to.meta.isClosed) {
      sessionStorage.setItem("orderTotal", "vanOrderTotal");
      to.meta.isClosed = false;
    }
    next();
  },
  methods: {
    handleClick(tab, event) {
      this.orderTotal = tab.name;
      this.dataKeys = Math.random();
    }
  }
};
</script>
