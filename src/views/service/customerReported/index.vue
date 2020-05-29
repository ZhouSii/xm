<template>
  <div class="tabsWrap">
    <el-tabs type="card" @tab-click="handleClick" v-model="customertype">
      <el-tab-pane
        :label="item.label"
        :name="item.name"
        v-for="item in tabList"
        :key="item.name"
        v-if="$_has_permission(item.code)"
      >
        <customer-reported :customertype="customertype" v-if="customertype == item.name"></customer-reported>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script type="text/javascript">
import customerReported from "./customerReported";
export default {
  components: {
    customerReported
  },
  data() {
    return {
      customertype: "all",
      tabList: [
        {
          name: "all",
          label: "全部",
          code: "CUSTOM_CUSTOMERREPORT_ALL"
        },
        {
          name: "driver",
          label: "车主",
          code: "CUSTOM_CUSTOMERREPORT_CAR"
        },
        {
          name: "shipper",
          label: "货主",
          code: "CUSTOM_CUSTOMERREPORT_SHIPPER"
        }
      ]
    };
  },
  mounted() {},
  methods: {
    handleClick(tab) {
      this.customertype = tab.name;
    }
  }
};
</script>

<style type="text/css" lang="scss" scoped>
</style>
