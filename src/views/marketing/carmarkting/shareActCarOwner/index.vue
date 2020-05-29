<template>
  <div class="tabsWrap">
    <el-tabs type="card" v-model="pageContentTypeCarOwner" @tab-click="handleClick">
      <el-tab-pane label="活动管理" name="actManagementCarOwner">
        <actManagementCarOwner
          :keys="dataKeys"
          :isvisible="pageContentTypeCarOwner == 'actManagementCarOwner'"
        />
      </el-tab-pane>
      <el-tab-pane label="分享记录" name="shareRecordCarOwner">
        <shareRecordCarOwner
          :keys="dataKeys"
          :isvisible="pageContentTypeCarOwner == 'shareRecordCarOwner'"
        />
      </el-tab-pane>
    </el-tabs>
  </div> 
  
</template>

<script>
import shareRecordCarOwner from "./shareRecordCarOwner";
import actManagementCarOwner from "./actManagementCarOwner";
export default {
  data() {
    return {
      pageContentTypeCarOwner: "actManagementCarOwner",
      dataKeys: ""
    };
  },
  components: {
    actManagementCarOwner,
    shareRecordCarOwner
  },
  methods: {
    handleClick(tab, event) {
      this.pageContentTypeCarOwner = tab.name;
      this.dataKeys = Math.random();
    }
  },
  activated() {
    this.pageContentTypeCarOwner =
      sessionStorage.getItem("pageContentTypeCarOwner") ||
      "actManagementCarOwner";
  },

  beforeUpdate() {
    sessionStorage.setItem(
      "pageContentTypeCarOwner",
      this.pageContentTypeCarOwner
    );
  },

  beforeRouteEnter(to, from, next) {
    // console.log("hhh", to);
    if (to.meta.isClosed) {
      sessionStorage.setItem(
        "pageContentTypeCarOwner",
        "actManagementCarOwner"
      );
      to.meta.isClosed = false;
    }
    next();
  }
};
</script>

<style>
</style>