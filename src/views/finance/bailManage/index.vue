<template>
  <div class="same_shipper tabsWrap tranSationDemo">
    <el-tabs type="card" @tab-click="handleClick" v-model="insureTypeName">
      <el-tab-pane label="车主" name="carList">
        <carList :isvisible="insureTypeName === 'carList'" :key="dataKeys" />
      </el-tab-pane>
      <el-tab-pane label="区代" name="Price">
        <CarrierPriceList
          :isvisible="insureTypeName === 'Price'"
          statusType="AF00112"
          :key="dataKeys"
        />
      </el-tab-pane>
      <el-tab-pane label="专线承运商" name="Carrier">
        <CarrierPriceList
          :isvisible="insureTypeName === 'Carrier'"
          statusType="AF00113"
          :key="dataKeys"
        />
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
import carList from "./carList";
import CarrierPriceList from "./CarrierPriceList";
export default {
  data() {
    return {
      insureTypeName: "carList",
      dataKeys: ""
    };
  },
  components: {
    carList,
    CarrierPriceList
  },
  methods: {
    handleClick(tab, event) {
      this.insureTypeName = tab.name;
      this.dataKeys = Math.random();
    }
  },
  activated() {
    this.insureTypeName = sessionStorage.getItem("insureTypeName") || "carList";
  },

  beforeUpdate() {
    sessionStorage.setItem("insureTypeName", this.insureTypeName);
  },
  beforeRouteEnter(to, from, next) {
    // console.log("hhh", to);
    if (to.meta.isClosed) {
      sessionStorage.setItem("insureTypeName", "carList");
      to.meta.isClosed = false;
    }
    next();
  }
};
</script>

<style lang="scss" >
</style>

