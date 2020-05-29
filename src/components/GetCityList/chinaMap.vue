
<template>
  <div class="chooseCityList">
    <el-cascader
      v-model="selectedOptions"
      :options="cascaderData"
      separator="-"
      ref="chinaData"
      @change="handleItemMore"
      @expand-change="handleItemChange"
      :props="props"
      :disabled="disabled"
      :key="componentKeys"
    ></el-cascader>
  </div>
</template>
<script>
import { getCityInfo } from "@/api/common";

export default {
  name: "getAreaList",
  props: {
    disabled: {
      type: Boolean
    },
    value: [String, Array, Number],
    isArea: {
      type: Boolean,
      default: false
    },
    ifChange: {
      type: Boolean,
      default: false
    },
    placeholderTxt: {
      type: String,
      default: "请选择"
    }
  },
  data() {
    return {
      departmentOptions: [],
      cascaderData: [],
      selectedOptions: [],
      componentKeys:'',
      props: {
        label: "name",
        value: "code",
        children: "cities",
        checkStrictly:this.ifChange
      },
      nowData: {
        province: null,
        city: null,
        area: null
      }
    };
  },
  methods: {
    getNodes(val) {
      let idArea;
      let sizeArea;
      if (!val) {
        idArea = null;
        sizeArea = 0;
      } else if (val.length === 1) {
        idArea = val[0];
        sizeArea = val.length; // 3:一级 4:二级 6:三级
      } else if (val.length === 2 && this.isArea) {
        idArea = val[1];
        sizeArea = val.length; // 3:一级 4:二级 6:三级
      }
      // console.log('idAreaidAreaidArea',idArea,sizeArea,this.isArea)
      getCityInfo(idArea)
        .then(response => {
          // console.log('response',response.data,sizeArea)
          if (response.data) {
            let Items = response.data;
            if (sizeArea === 0) {
              // 初始化 加载一级 省
              this.cascaderData = Items.map((value, i) => {
                return {
                  code: value.code,
                  name: value.name,
                  cities: []
                };
              });
              // console.log('this.cascaderData',this.cascaderData)
            } else if (sizeArea === 1) {
              // 点击一级 加载二级 市
              this.cascaderData.map((value, i) => {
                if (value.code === val[0]) {
                  if (this.isArea) {
                    value.cities = Items.map((value, i) => {
                      return {
                        code: value.code,
                        name: value.name,
                        cities: []
                      };
                    });
                  } else {
                    value.cities = Items.map((value, i) => {
                      return {
                        code: value.code,
                        name: value.name
                      };
                    });
                  }
                }
              });
            } else if (sizeArea === 2 && this.isArea) {
              // 点击二级 加载三级 区
              this.cascaderData.map((value, i) => {
                if (value.code === val[0]) {
                  value.cities.map((value, i) => {
                    if (value.code === val[1]) {
                      if (!value.cities.length) {
                        value.cities = Items.map((value, i) => {
                          return {
                            code: value.code,
                            name: value.name
                          };
                        });
                      }
                    }
                  });
                }
              });
            }
          } else {
            // console.log(response.data.msg)
          }
        })
        .catch(err => {
          return this.$message({
            type: "info",
            message:
              "操作失败，原因：" + (err.errorInfo ? err.errorInfo : err.text)
          });
        });
    },
    handleItemChange(val) {
      // console.log('active item:', val);
      this.getNodes(val);
    },
    handleItemMore(val) {
      let cnItem = this.$refs.chinaData.getCheckedNodes()[0];
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
        console.log('this.nowData',this.nowData)
      this.returnArr(this.nowData);
    },
    init() {
      this.getNodes();
      
    },
    returnArr(val) {
      // this.$emit('returnStr',val.length > 0 ? val.join(',') : val,this.$refs.chinaData.currentLabels.join('-'))
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
.chooseCityList {
  .el-cascader {
    .el-cascader__label {
      // top: 5px;
      height: 100%;
      font-size: 14px;
      // color: #3e9ff1;
      padding: 0 25px 0 6px;
      span {
        color: #3e9ff1;
      }
    }
  }
}
</style>


