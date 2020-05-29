<template>
  <div class="huozhu tabsWrap">
    <el-tabs v-model="UseshipperName" type="card" @tab-click="handleClick">
      <!-- 全部 -->
      <el-tab-pane label="全部" v-if="$_has_permission('SHIPPER_MANAGE_LIST_ALL')" name="first">
        <shipperAllList :key="dataKeys" :isvisible="UseshipperName == 'first'"></shipperAllList>
      </el-tab-pane>

      <!-- 未认证 -->
      <el-tab-pane
        label="未认证"
        v-if="$_has_permission('SHIPPER_MANAGE_LIST_UNVALIDAT')"
        name="second"
      >
        <ShipperUnauthorizedList :key="dataKeys" :isvisible="UseshipperName == 'second'"></ShipperUnauthorizedList>
      </el-tab-pane>

      <!-- 待认证 -->
      <el-tab-pane
        label="待认证"
        v-if="$_has_permission('SHIPPER_MANAGE_LIST_VALIDATING')"
        name="third"
      >
        <ShipperCertifiedList :key="dataKeys" :isvisible="UseshipperName == 'third'"></ShipperCertifiedList>
      </el-tab-pane>

      <!-- 已认证部分 -->
      <el-tab-pane
        label="已认证"
        v-if="$_has_permission('SHIPPER_MANAGE_LIST_VALIDATED')"
        name="fourth"
      >
        <ShipperHasCertifiedList :key="dataKeys" :isvisible="UseshipperName == 'fourth'"></ShipperHasCertifiedList>
      </el-tab-pane>

      <!-- 认证不通过 -->
      <el-tab-pane
        label="认证不通过"
        v-if="$_has_permission('SHIPPER_MANAGE_LIST_VALIDATFAIL')"
        name="fifth"
      >
        <ShipperDisqualificationList :key="dataKeys" :isvisible="UseshipperName == 'fifth'"></ShipperDisqualificationList>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script type="text/javascript">
import "@/styles/tab.scss";
import shipperAllList from "./shipperAllList.vue";

import ShipperUnauthorizedList from "./ShipperUnauthorizedList.vue";

import ShipperCertifiedList from "./ShipperCertifiedList.vue";

import ShipperHasCertifiedList from "./ShipperHasCertifiedList.vue";

import ShipperDisqualificationList from "./ShipperDisqualificationList.vue";

export default {
  name: "huozhu",
  components: {
    shipperAllList,
    ShipperUnauthorizedList,
    ShipperCertifiedList,
    ShipperHasCertifiedList,
    ShipperDisqualificationList
  },
  data() {
    return {
      UseshipperName: "first",
      dataKeys: ""
      //  isDestroy: true, //销毁是否要重置tab
    };
  },
  watch: {
    UseshipperName(newVal, oldVal) {
      if (newVal) {
        this.UseshipperName = newVal;
      } else {
        this.UseshipperName = oldVal;
      }
    }
  },
  created() {
    this.UseshipperName = sessionStorage.getItem("UseshipperName") || "first";
    // 从客户上报跳转自动到选中栏
    if (this.$route.query.index) {
      if (this.$route.query.index != "first") {
        this.UseshipperName = this.$route.query.index;
      }
    } else {
      sessionStorage.setItem("once", false);
    }
  },
  beforeUpdate() {
    sessionStorage.setItem("UseshipperName", this.UseshipperName);
  },
  beforeDestroy() {
    sessionStorage.setItem("UseshipperName", this.UseshipperName);
    // if ( this.isDestroy ) {
    //         sessionStorage.setItem('UseshipperName', 'first');
    //     }
  },
  mounted() {
    // this.dataKeys = Math.random();
  },
  methods: {
    handleClick(tab, event) {
      this.dataKeys = Math.random();
      this.UseshipperName = tab.name;
      // sessionStorage.setItem('UseshipperName', tab.name);
      // this.isDestroy = false
      this.$router.push({ query: {} });
    }
  }
};
</script>

<style type="text/css" lang="scss">
.huozhu {
  .identicalStyle {
    padding-right: 0;
  }
}
</style>
