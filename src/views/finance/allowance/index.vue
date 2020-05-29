<template>
  <div class="tabsWrap">
    <el-tabs type="card" @tab-click="handleClick" v-model="approveTypeName">
      <el-tab-pane
        v-for="item in visibleTabs"
        :key="item.name"
        :label="item.label"
        :name="item.name"
        v-if="$_has_permission(item.code)"
      >
        <allList
          :isvisible="approveTypeName == item.name"
          :statusType="item.type"
          :key="dataKeys"
          :statusTypeName="item.label"
        />
      </el-tab-pane>
    </el-tabs>
  </div>
</template>


<script>
import allList from "./allList.vue";
export default {
  data() {
    return {
      approveTypeName: "one",
      visibleTabs: [
        {
          label: "全部",
          name: "one",
          type: null,
          code: "FINANCE_SUBSIDYAPPROVAL_ALL"
        },
        {
          label: "待审批",
          name: "two",
          type: "AF0850901",
          code: "FINANCE_SUBSIDYAPPROVAL_PENDINGAPPROVAL"
        },
        {
          label: "已审批",
          name: "three",
          type: "AF0850902",
          code: "FINANCE_SUBSIDYAPPROVAL_APPROVED"
        },
        {
          label: "审批不通过",
          name: "four",
          type: "AF0850903",
          code: "FINANCE_SUBSIDYAPPROVAL_APPROVALFAILED"
        }
      ],
      dataKeys: ""
    };
  },
  components: {
    allList
  },
  methods: {
    handleClick(tab, event) {
      this.approveTypeName = tab.name;
      this.dataKeys = Math.random();
    }
  },

  activated() {
    this.approveTypeName = sessionStorage.getItem("approveTypeName") || "one";
  },

  beforeUpdate() {
    sessionStorage.setItem("approveTypeName", this.approveTypeName);
  },

  beforeRouteEnter(to, from, next) {
    // console.log("hhh", to);
    if (to.meta.isClosed) {
      sessionStorage.setItem("approveTypeName", "one");
      to.meta.isClosed = false;
    }
    next();
  }
};
</script>

<style lang="scss" >
</style>

