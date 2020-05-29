<template>
  <div class="same_shipper tabsWrap">
    <el-tabs type="card" @tab-click="handleClick" v-model="shipperTypeName">
      <el-tab-pane
        v-for="item in visibleTabs"
        :key="item.name"
        :label="item.label"
        :name="item.name"
        v-if="$_has_permission(item.code)"
      >
        <priceLIst :isvisible="shipperTypeName == item.name" :cashtype="item.type" :key="dataKeys" />
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import priceLIst from "./priceLIst.vue";
import { mapState, mapActions } from "vuex";
export default {
  data() {
    return {
      shipperTypeName: "one",
      visibleTabs: [
        {
          label: "全部",
          name: "one",
          type: null,
          code: "FINANCE_WITHDRAW_MANAGE_GENERATIONWITHDRAWAL_ALL"
        },
        {
          label: "待审核",
          name: "two",
          type: "AF09301",
          code: "FINANCE_WITHDRAW_MANAGE_GENERATIONWITHDRAWAL_TOBEAUDITED"
        },
        {
          label: "待付款",
          name: "three",
          type: "AF09601",
          code: "FINANCE_WITHDRAW_MANAGE_GENERATIONWITHDRAWAL_STAYFU"
        },
        {
          label: "待核销",
          name: "four",
          type: "AF09201",
          code:
            "FINANCE_WITHDRAW_MANAGE_GENERATIONWITHDRAWAL_WAITINGFORCANCELLATION"
        }
      ],
      dataKeys: ""
    };
  },
  components: {
    priceLIst
  },
  methods: {
    handleClick(tab, event) {
      this.shipperTypeName = tab.name;
      this.dataKeys = Math.random();
    }
  },
  activated() {
    this.shipperTypeName = sessionStorage.getItem("shipperTypeName") || "one";
  },

  beforeUpdate() {
    sessionStorage.setItem("shipperTypeName", this.shipperTypeName);
  },
  beforeRouteEnter(to, from, next) {
    // console.log("hhh", to);
    if (to.meta.isClosed) {
      sessionStorage.setItem("shipperTypeName", "one");
      to.meta.isClosed = false;
    }
    next();
  }
};
</script>

<style lang="scss" >
</style>

