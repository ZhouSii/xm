<template>
  <div class="costChange tabsWrap">
    <el-tabs v-model="costChangeName" type="card" @tab-click="handleClick">
      <!-- 货主向区代申请退款 -->
      <el-tab-pane
        label="货主向区代申请退款"
        name="one"
        v-if="$_has_permission('CUSTOM_HAIRLOGISTICS_EXPENSECHANGE_SHIPPERDISTRICTREFUND')"
      >
        <partOne :key="dataKeys" :isvisible="costChangeName === 'one'" />
      </el-tab-pane>
      <!-- 区代向货主申请费用变更 -->
      <el-tab-pane
        label="区代向货主申请费用变更"
        name="two"
        v-if="$_has_permission('CUSTOM_HAIRLOGISTICS_EXPENSECHANGE_DISTRICTSHIPPERCHANGE')"
      >
        <partTwo :key="dataKeys" :isvisible="costChangeName === 'two'" />
      </el-tab-pane>
      <!-- 区代向专线申请费用变更 -->
      <el-tab-pane
        label="区代向专线申请费用变更"
        name="three"
        v-if="$_has_permission('CUSTOM_HAIRLOGISTICS_EXPENSECHANGE_DISTRICTLINECHANGE')"
      >
        <partThree :key="dataKeys" :isvisible="costChangeName === 'three'" />
      </el-tab-pane>
      <!-- 专线向区代申请费用变更 -->
      <el-tab-pane
        label="专线向区代申请费用变更"
        name="four"
        v-if="$_has_permission('CUSTOM_HAIRLOGISTICS_EXPENSECHANGE_LINEDISTRICTCHANGE')"
      >
        <partFour :key="dataKeys" :isvisible="costChangeName === 'four'" />
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
<script>
import partOne from "./partOne";
import partTwo from "./partTwo";
import partThree from "./partThree";
import partFour from "./partFour";
export default {
  name: "costChange",
  components: {
    partOne,
    partTwo,
    partThree,
    partFour
  },
  data() {
    return {
      costChangeName: "three",
      dataKeys: ""
    };
  },
  computed: {},
  created() {
    this.costChangeName = sessionStorage.getItem("costChangeName") || "three";
  },
  beforeUpdate() {
    sessionStorage.setItem("costChangeName", this.costChangeName);
  },
  beforeDestroy() {
    sessionStorage.setItem("costChangeName", this.costChangeName);
  },
  mounted() {},
  methods: {
    init() {},
    handleClick(tab, event) {
      this.dataKeys = Math.random();
      this.costChangeName = tab.name;
    }
  }
};
</script>

<style rel="stylesheet/scss" lang="scss">
.costChange {
}
</style>

