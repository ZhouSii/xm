<template>
  <div class="same_shipper tabsWrap">
    <el-tabs type="card" @tab-click="handleClick" v-model="cashTypeName">
      <el-tab-pane
        v-for="item in visibleTabs"
        :key="item.name"
        :label="item.label"
        :name="item.name"
        v-if="$_has_permission(item.code)"
      >
        <totalList :isvisible="cashTypeName == item.name" :cashtype="item.type" :key="dataKeys" />
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import totalList from "./totalList.vue";
import { mapState, mapActions } from "vuex";
export default {
  data() {
    return {
      cashTypeName: "one",
      visibleTabs: [
        {
          label: "全部",
          name: "one",
          type: null,
          code: "FINANCE_WITHDRAW_MANAGE_CARWITHDRAWAL_ALL"
        },
        {
          label: "待转账",
          name: "two",
          type: "AF0860302",
          code: "FINANCE_WITHDRAW_MANAGE_CARWITHDRAWAL_TOBETRANSFERRED"
        },
        {
          label: "转账成功",
          name: "three",
          type: "AF0860303",
          code: "FINANCE_WITHDRAW_MANAGE_CARWITHDRAWAL_SUCCESSFULTRANSFER"
        },
        {
          label: "转账失败",
          name: "four",
          type: "AF0860304",
          code: "FINANCE_WITHDRAW_MANAGE_CARWITHDRAWAL_FAILTRANSFER"
        },
        {
          label: "提现驳回",
          name: "five",
          type: "AF0860306",
          code: "FINANCE_WITHDRAW_MANAGE_CARWITHDRAWAL_DISMISSAL"
        }
      ],
      dataKeys: ""
    };
  },
  components: {
    totalList
  },
  methods: {
    handleClick(tab, event) {
      this.cashTypeName = tab.name;
      this.dataKeys = Math.random();
    }
  },

  beforeUpdate() {
    sessionStorage.setItem("cashTypeName", this.cashTypeName);
  },

  activated() {
    this.cashTypeName = sessionStorage.getItem("cashTypeName") || "one";
  },

  beforeRouteEnter(to, from, next) {
    // console.log("hhh", to);
    if (to.meta.isClosed) {
      sessionStorage.setItem("cashTypeName", "one");
      to.meta.isClosed = false;
    }
    next();
  }
};
</script>

<style lang="scss" >
</style>

