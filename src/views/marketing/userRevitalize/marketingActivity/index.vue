<template>
  <div class="same_shipper tabsWrap">
    <el-tabs v-model="TypeName" type="card" @tab-click="handleClick">
      <!-- 活动管理 -->
      <el-tab-pane
        label="活动管理"
        name="activetyManage"
        v-if="$_has_permission('MARKETING_USERREVITALIZE_MARKETINGACTIVITYMANAGEMENT_ACTIVITYMANAGEMENT')"
      >
        <activetyManage :isvisible="TypeName === 'activetyManage'"></activetyManage>
      </el-tab-pane>

      <!-- 短信模板管理 -->
      <el-tab-pane
        label="短信模板管理"
        name="smsManage"
        v-if="$_has_permission('MARKETING_USERREVITALIZE_MARKETINGACTIVITYMANAGEMENT_SMS')"
      >
        <smsManage :isvisible="TypeName === 'smsManage'"></smsManage>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>


<script>
import activetyManage from "./activetyManage.vue";
import smsManage from "./smsManage.vue";
import { mapState, mapActions } from "vuex";
export default {
  data() {
    return {
      TypeName: "activetyManage"
    };
  },
  components: {
    activetyManage,
    smsManage
  },
  methods: {
    handleClick(tab, event) {
      this.TypeName = tab.name;
    }
  }
};
</script>

<style lang="scss" >
</style>

