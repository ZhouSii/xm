<template>
  <div class="same_shipper tabsWrap">
    <el-tabs type="card" @tab-click="handleClick" v-model="specialTypeName">
      <el-tab-pane
        v-for="item in visibleTabs"
        :key="item.name"
        :label="item.label"
        :name="item.name"
        v-if="$_has_permission(item.code)"
      >
        <SpecialLineList
          :isvisible="specialTypeName == item.name"
          :cashtype="item.type"
          :key="dataKeys"
        />
      </el-tab-pane>
    </el-tabs>
  </div>
</template>


<script>
import SpecialLineList from "./SpecialLineList.vue";
import { mapState, mapActions } from "vuex";
export default {
  data() {
    return {
      specialTypeName: "one",
      visibleTabs: [
        {
          label: "全部",
          name: "one",
          type: null,
          code: "FINANCE_WITHDRAW_MANAGE_WITHDRAWALBYFRANCHISEE_ALL"
        },
        {
          label: "待审核",
          name: "two",
          type: "AF09301",
          code: "FINANCE_WITHDRAW_MANAGE_WITHDRAWALBYFRANCHISEE_TOBEAUDITED"
        },
        {
          label: "待付款",
          name: "three",
          type: "AF09601",
          code: "FINANCE_WITHDRAW_MANAGE_WITHDRAWALBYFRANCHISEE_STAYFU"
        },
        {
          label: "待核销",
          name: "four",
          type: "AF09201",
          code:
            "FINANCE_WITHDRAW_MANAGE_WITHDRAWALBYFRANCHISEE_WAITINGFORCANCELLATION"
        }
      ],
      dataKeys: ""
    };
  },
  components: {
    SpecialLineList
  },
  methods: {
    handleClick(tab, event) {
      this.specialTypeName = tab.name;
      this.dataKeys = Math.random();
    }
  },
  activated() {
    this.specialTypeName = sessionStorage.getItem("specialTypeName") || "one";
  },

  beforeUpdate() {
    sessionStorage.setItem("specialTypeName", this.specialTypeName);
  },
  beforeRouteEnter(to, from, next) {
    // console.log("hhh", to);
    if (to.meta.isClosed) {
      sessionStorage.setItem("specialTypeName", "one");
      to.meta.isClosed = false;
    }
    next();
  }
};
</script>

<style lang="scss" >
</style>

