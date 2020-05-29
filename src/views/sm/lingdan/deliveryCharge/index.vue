<template>
  <div class="deliveryPrice tabsWrap">
    <el-tabs v-model="deliveryChargeName" type="card" @tab-click="handleClick">
      <!-- 送货费及定价 -->
      <el-tab-pane label="区代送货费定价" name="deliveryChargeList">
        <deliveryChargeList
          :key="dataKeys"
          :isvisible="deliveryChargeName === 'deliveryChargeList'"
          v-if="$_has_permission('SERVICE_DISTRICTSALESPRICING_DISTRICTDELIVERYFEEANDPRICING_DISTRICTDELIVERYFEEANDPRICING')"
        />
      </el-tab-pane>

      <!-- 送货费定价历史记录 -->
      <el-tab-pane label="区代送货费定价历史记录" name="deliveryChargeHistoryList">
        <deliveryChargeHistoryList
          :key="dataKeys"
          :isvisible="deliveryChargeName === 'deliveryChargeHistoryList'"
          v-if="$_has_permission('SERVICE_DISTRICTSALESPRICING_DISTRICTDELIVERYFEEANDPRICING_HISTORY')"
        />
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import deliveryChargeList from "./deliveryChargeList";
import deliveryChargeHistoryList from "./deliveryChargeHistoryList";
export default {
  name: "deliveryCharge",
  components: {
    deliveryChargeList,
    deliveryChargeHistoryList
  },
  data() {
    return {
      deliveryChargeName: "deliveryChargeList",
      dataKeys: ""
    };
  },
  computed: {},
  created() {
    this.deliveryChargeName = sessionStorage.getItem("deliveryChargeName")
      ? sessionStorage.getItem("deliveryChargeName")
      : "deliveryChargeList";
  },
  beforeUpdate() {
    sessionStorage.setItem("deliveryChargeName", this.deliveryChargeName);
  },
  beforeDestroy() {
    sessionStorage.setItem("deliveryChargeName", this.deliveryChargeName);
  },
  mounted() {},
  methods: {
    handleClick(tab, event) {
      this.dataKeys = Math.random();
      this.deliveryChargeName = tab.name;
    }
  }
};
</script>

<style rel="stylesheet/scss" lang="scss">
</style>

