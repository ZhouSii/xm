<template>
  <div class="tabsWrap">
    <el-tabs type="card" v-model="pageContentType" @tab-click="handleClick">
      <el-tab-pane label="活动管理" name="actManagement">
        <actManagement :keys="dataKeys" :isvisible="pageContentType == 'actManagement'" />
      </el-tab-pane>
      <el-tab-pane label="分享记录" name="shareRecord">
        <shareRecord :keys="dataKeys" :isvisible="pageContentType == 'shareRecord'" />
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import shareRecord from "./shareRecord";
import actManagement from "./actManagement";
export default {
  data() {
    return {
      pageContentType: "actManagement",
      dataKeys: ""
    };
  },
  components: {
    actManagement,
    shareRecord
  },
  methods: {
    handleClick(tab, event) {
      this.pageContentType = tab.name;
      this.dataKeys = Math.random();
    }
  },
  activated() {
    this.pageContentType =
      sessionStorage.getItem("pageContentType") || "actManagement";
  },

  beforeUpdate() {
    sessionStorage.setItem("pageContentType", this.pageContentType);
  },

  beforeRouteEnter(to, from, next) {
    // console.log("hhh", to);
    if (to.meta.isClosed) {
      sessionStorage.setItem("pageContentType", "actManagement");
      to.meta.isClosed = false;
    }
    next();
  }
};
</script>

<style>
</style>