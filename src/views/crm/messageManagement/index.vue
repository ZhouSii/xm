<template>
  <div class="tabsWrap">
    <el-tabs type="card" @tab-click="handleClick" v-model="type">
      <!-- 全部 -->
      <el-tab-pane :label="item.name" :name="item.type" v-for="item in messageManagementList" :key="item.type">
        <message-management :isvisible="type" v-if="type == item.type"></message-management>
      </el-tab-pane>

    </el-tabs>
  </div>
</template>

<script type="text/javascript">
import messageManagement from "./messageManagement";
export default {
  components: {
    messageManagement
  },
  data() {
    return {
        type: 'all',
        messageManagementList:[
          {
            type: 'all',
            name: '全部'
          },
          {
            type: 'noProcessed',
            name: '未处理'
          },
          {
            type: 'already',
            name: '已处理'
          },
        ]
    };
  },
  mounted() {},
  methods: {
    handleClick(tab) {
      console.log(tab,'tabtab')
      this.type = tab.name
    }
  }
};
</script>

<style type="text/css" lang="scss" scoped>

</style>
