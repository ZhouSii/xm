<template>
<!-- 该组件不可用 -->
  <div class="chooseCityList">
    <el-cascader-multi
      ref="cascadermulti"
      v-model="multiList"
      :data="cascaderData"
      :only-last="onlyLast"
      :collapse-tags="true"
      :separator="separator"
      :label-key="multipleProps.label"
      :value-key="multipleProps.value"
      :children-key="multipleProps.children"
      @change="handleItemChange"
      @handlerClick="handlerClick"
      :is-two-dimension-value="isTwo"
      :maxLevelArr="maxLevel"
    >
    </el-cascader-multi>
  </div>
</template>
<script>
import { getCityInfo } from "@/api/common";

export default {
  name: "getAreaList",
  props: {
    disabled: {
      type: Boolean,
      default: false
    },
    value: [String, Array, Number],
    isArea: {
      type: Boolean,
      default: true
    },
    ifChange: {
      type: Boolean,
      default: false
    },
    onlyOnce: {
      //控制回显
      type: Boolean,
      default: false
    },
    currentObj: {
      type: Object
    },
    onlyLast: {
      //是否只有叶子节点才支持多选
      type: Boolean,
      default: true
    },
    isTwo: {
      //绑定的value是[[‘level-1’,‘level-2’, ‘‘level-3’’], [‘level-21’, ‘level-22’]]，还是[‘level-3’, ‘level-22’]这种格式
      type: Boolean,
      default: true
    },
    filterable: {
      //是否可搜索 filter-method 自定义搜索方法
      type: Boolean,
      default: false
    },
    separator: {
      type: String,
      default: "-"
    },
    multipleProps: {
      type: Object,
      default: () => ({
        label: "name",
        value: "code",
        children: "cities"
      })
    }
  },
  watch: {},
  data() {
    return {
      cascaderData:[],
      maxLevel: [],
      multiList: [],
      props: {
        label: "name",
        value: "code",
        children: "cities"
      },
      nowData: {
        province: null,
        city: null,
        area: null
      }
      // onlyOnce: true
    };
  },
  methods: {
    getActios(val) {
      getCityInfo(val).then(res => {
        const dataObj = res.data;
        return dataObj;
      });
    },
    async doActions(val) {
      this.multiList = val;
      if (val[1]) {
        const arg = [val[0]];
        await this.getNodes(arg);
        this.$emit("update:onlyOnce", false);
      }
      if (val[1] && val[2]) {
        const arg = [val[0], val[1]];
        await this.getNodes(arg);
        this.$emit("update:onlyOnce", false);
      }

      // console.log('this.cascaderDatathis.cascaderData',this.cascaderData)
    },
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
            const Items = response.data;
           
            console.log('this.maxLevel',this.maxLevel)
            if (sizeArea === 0) {
              // 初始化 加载一级 省
              this.cascaderData = Items.map((value, i) => {
                return {
                  code: value.code,
                  name: value.name,
                  cities: []
                };
              });
              //   console.log("this.cascaderData", this.cascaderData);
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
              this.maxLevel = [{
                  id:1,
                  rendered: false
              }]
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
              this.maxLevel = [{
                  id:1,
                  rendered: false
              },{
                  id:2,
                  rendered: false
              }]
            }

            // this.maxLevel = Array.from({length:sizeArea+1},(v,i)=>{
            //     return {
            //         id:i,
            //         rendered:false
            //     }
            // })
            // console.log('this.cascaderData',this.cascaderData)
          } else {
            // console.log(response.data.msg)
          }

          
          //   console.log('cascaderData',this.cascaderData)
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
      // console.log('change',val)
      //   this.getNodes(val);
    },
    handlerClick(node, levelIndex, level) {
        console.log(node);
    //   this.$nextTick(() => {
        this.getNodes(node._idArr);
    //   });
    },
    handleItemMore(val) {
      console.log("focus", val);
      //   if (this.ifChange) {
      //     this.getNodes(val);
      //   }
      //   if (val[0]) {
      //     this.nowData.province = {
      //       code: val[0],
      //       key: val[0],
      //       name: this.$refs.chinaData.currentLabels[0],
      //       value: this.$refs.chinaData.currentLabels[0],
      //       parentCode: null
      //     };
      //   }
      //   if (val[1]) {
      //     this.nowData.city = {
      //       code: val[1],
      //       key: val[1],
      //       name: this.$refs.chinaData.currentLabels[1],
      //       value: this.$refs.chinaData.currentLabels[1],
      //       parentCode: val[0]
      //     };
      //   }
      //   if (val[2]) {
      //     this.nowData.area = {
      //       code: val[2],
      //       key: val[2],
      //       name: this.$refs.chinaData.currentLabels[2],
      //       value: this.$refs.chinaData.currentLabels[2],
      //       parentCode: val[1]
      //     };
      //   }
      //   // console.log('this.nowData',this.nowData)
      //   this.returnArr(this.nowData);
    },
    init() {
      this.getNodes();
    },
    returnArr(val) {
      // this.$emit('returnStr',val.length > 0 ? val.join(',') : val,this.$refs.chinaData.currentLabels.join('-'))
      this.$emit("returnStr", val);
    },
    clearData() {
      this.multiList = [];
    }
  },
  mounted() {
    this.init();
  },
  beforeDestroy() {
    this.multiList = [];
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

