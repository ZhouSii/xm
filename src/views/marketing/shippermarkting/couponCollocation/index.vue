<template>
  <div class="same_shipper tabsWrap">
    <el-tabs v-model="couponCollocationTypeName" type="card" @tab-click="handleClick">
      <!-- 领券配置 -->
      <el-tab-pane
        label="领券配置"
        name="collocation"
        v-if="$_has_permission('MARKETING_SHIPPER_MANAGE_COILCONFIGURATION_COILCONFIGURATION')"
      >
        <collocation :isvisible="couponCollocationTypeName === 'collocation'" :key="dataKeys"></collocation>
      </el-tab-pane>

      <!-- 领取记录 -->
      <el-tab-pane
        label="领取记录"
        name="record"
        v-if="$_has_permission('MARKETING_SHIPPER_MANAGE_COILCONFIGURATION_COLLECTIONRECORDS')"
      >
        <record :isvisible="couponCollocationTypeName === 'record'" :key="dataKeys"></record>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>


<script>
import collocation from "./collocation.vue";
import record from "./record.vue";
import { mapState, mapActions } from "vuex";
export default {
  data() {
    return {
      couponCollocationTypeName: "collocation",
      dataKeys: ""
    };
  },
  components: {
    collocation,
    record
  },
  methods: {
    handleClick(tab, event) {
      this.dataKeys = Math.random();
      this.couponCollocationTypeName = tab.name;
    }
  },
  activated() {
    this.couponCollocationTypeName = sessionStorage.getItem(
      "couponCollocationTypeName"
    );
  },

  beforeUpdate() {
    sessionStorage.setItem(
      "couponCollocationTypeName",
      this.couponCollocationTypeName
    );
  },

  beforeRouteEnter(to, from, next) {
    // console.log("hhh", to);
    if (to.meta.isClosed) {
      sessionStorage.setItem("couponCollocationTypeName", "collocation");
      to.meta.isClosed = false;
    }
    next();
  }
};
</script>

<style lang="scss" >
</style>

