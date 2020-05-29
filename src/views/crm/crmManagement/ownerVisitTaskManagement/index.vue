<template>
  <div class="ownerVisitTaskManagement tabsWrap">
    <el-tabs v-model="ownerVisitTaskManagementName" type="card" @tab-click="handleClick">
      <!-- 全部 -->
      <el-tab-pane :label="item.label" :name="item.name" v-for="item in tabList" :key="item.name">
        <owner-visit-task-management :isvisible="ownerVisitTaskManagementName" v-if="ownerVisitTaskManagementName == item.name"></owner-visit-task-management>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
<script type="text/javascript">
import "@/styles/tab.scss";
import ownerVisitTaskManagement from "./ownerVisitTaskManagement.vue";

export default {
  name: "ownerVisitTaskManagementIndex",
  components: {
    ownerVisitTaskManagement
  },
  data() {
    return {
      ownerVisitTaskManagementName: "all",
      tabList: [
        {
          label: "全部",
          name:"all"
        },
        {
          label: "未开始",
          name: "noStart"
        },
        {
          label: "进行中",
          name: "underway"
        },
        {
          label: "已完成",
          name: "completed"
        },
      ]
    };
  },
  methods: {
    handleClick(tab, event) {
      this.ownerVisitTaskManagementName = tab.name;
    }
  }
};
</script>