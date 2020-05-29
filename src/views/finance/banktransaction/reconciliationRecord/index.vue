<template>
  <div class="tabsWrap">
    <el-tabs type="card" @tab-click="handleClick" v-model="reconciliationRecordType">
      <el-tab-pane
        v-for="item in visibleTabs"
        :key="item.name"
        :label="item.label"
        :name="item.name"
      >
        <recordList
          :isvisible="reconciliationRecordType == item.name"
          :accountType="item.type"
          :key="dataKeys"
          :accountTypeName="item.label"
        />
      </el-tab-pane>
    </el-tabs>
  </div>
</template>


<script>
import recordList from "./recordList.vue";
export default {
  data() {
    return {
      reconciliationRecordType: "one",
      visibleTabs: [
        { label: "微信", name: "one", type: "wechat" },
        { label: "支付宝", name: "two", type: "zhifubao" }
      ],
      dataKeys: ""
    };
  },
  components: {
    recordList
  },
  methods: {
    handleClick(tab, event) {
      this.reconciliationRecordType = tab.name;
      this.dataKeys = Math.random();
    }
  },

  activated() {
    this.reconciliationRecordType = sessionStorage.getItem(
      "reconciliationRecordType"
    );
  },

  beforeUpdate() {
    sessionStorage.setItem(
      "reconciliationRecordType",
      this.reconciliationRecordType
    );
  },

  beforeRouteEnter(to, from, next) {
    // console.log("hhh", to);
    if (to.meta.isClosed) {
      sessionStorage.setItem("reconciliationRecordType", "one");
      to.meta.isClosed = false;
    }
    next();
  }
};
</script>

<style lang="scss" >
</style>

