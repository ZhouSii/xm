<template>
  <div class="tabsWrap">
    <el-tabs type="card" @tab-click="handleClick" v-model="assessType">
      <!-- 全部 -->
      <el-tab-pane
        :label="item.label"
        :name="item.name"
        v-for="item in assessTypeList"
        :key="item.name"
        v-if="$_has_permission(item.code)"
      >
        <employee-evaluation-form :assessType="assessType" :key="dataKeys"></employee-evaluation-form>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
<script type="text/javascript">
import employeeEvaluationForm from "./employeeEvaluationForm";
export default {
  name: "businessEvaluationForm",
  components: {
    employeeEvaluationForm
  },
  data() {
    return {
      dataKeys: "",
      assessTypeList: [
        {
          name: "personage",
          label: "个人考核表",
          code: "DATA_CENTER_BUSINESSEXAMINATION_FORM_OWN"
        },
        {
          name: "team",
          label: "团队考核表",
          code: "DATA_CENTER_BUSINESSEXAMINATION_FORM_TEAM"
        }
      ],
      assessType: "personage"
    };
  },
  mounted() {},
  methods: {
    handleClick(tab) {
      this.assessType = tab.name;
      this.dataKeys = Math.random();
    }
  }
};
</script>

