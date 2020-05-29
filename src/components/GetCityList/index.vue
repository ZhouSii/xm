
<template>
  <div class="chooseCityList">
    <el-cascader
      v-model="selectedOptions"
      :options="cityTree"
      ref="cityTree"
      @change="handleItemMore"
      :disabled="disabled"
      :props="props"
      :key="componentKeys"
    ></el-cascader>
  </div>
</template>
<script>
import { aflcProvinceCode } from "@/api/common.js";

export default {
  name: "getCityList",
  props: {
    disabled: {
      type: Boolean
    },
    value: [String, Array]
  },
  data() {
    return {
      selectedOptions: [],
      componentKeys: "",
      areaList: null,
      cityTree: [],
      props: {
        label: "name",
        value: "code",
        children: "children",
        checkStrictly: false
      },
      nowData: {
        province: null,
        city: null,
        area: null
      }
    };
  },
  methods: {
    handleItemMore(val) {
      let cnItem = this.$refs.cityTree.getCheckedNodes()[0];
      if (this.ifChange) {
        this.getNodes(val);
      }
      if (val[0]) {
        this.nowData.province = {
          code: val[0],
          key: val[0],
          name: cnItem.pathLabels[0],
          value: cnItem.pathLabels[0],
          parentCode: null
        };
      }
      if (val[1]) {
        this.nowData.city = {
          code: val[1],
          key: val[1],
          name: cnItem.pathLabels[1],
          value: cnItem.pathLabels[1],
          parentCode: val[0]
        };
      } else {
        this.nowData.city = this.nowData.province;
      }
      if (val[2]) {
        this.nowData.area = {
          code: val[2],
          key: val[2],
          name: cnItem.pathLabels[2],
          value: cnItem.pathLabels[2],
          parentCode: val[1]
        };
      } else {
        this.nowData.area = this.nowData.city;
      }
      //   console.log('this.nowData',this.nowData)
      this.returnArr(this.nowData);
    },
    init() {
      aflcProvinceCode().then(res => {
        this.cityTree = res.data;
      });
    },
    returnArr(val) {
      // this.$emit('returnStr',val.length > 0 ? val.join(',') : val,this.$refs.cityTree.currentLabels.join('-'))
      this.$emit("returnStr", val);
    },
    clearData() {
      this.selectedOptions = [];
      this.componentKeys = Math.random();
    }
  },
  mounted() {
    this.init();
  },
  beforeDestroy() {
    this.selectedOptions = [];
  }
};
</script>

<style rel="stylesheet/scss" lang="scss" >
</style>


