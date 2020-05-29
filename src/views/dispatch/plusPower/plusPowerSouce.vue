<template>
  <div class="TwoColumns plusPowerSouce clearfix">
    <div class="columnsContainer">
      <div class="side_left">
        <div class="side_left_top">
          <el-tree
            ref="treeForm"
            show-checkbox
            :data="cityTree"
            node-key="code"
            :default-expanded-keys="[440000]"
            :default-checked-keys="defaultArray"
            :props="defaultProps"
            :highlight-current="true"
            @check="nodeClick"
          ></el-tree>
        </div>
      </div>
      <div class="side_right" v-loading="loading">
        <div class="side_right_bottom clearfix">
          <div class="btns_box">
            <el-button
              type="primary"
              icon="el-icon-tickets"
              plain
              :size="btnsize"
              @click="showDialog"
            >复制到其它城市</el-button>
            <span
              style="font-size:14px;margin-left:16px"
            >注意：计算条件，请按照输入框的顺序，数字按从小到大的顺序输入，若大小顺序错误，则无法保存</span>
          </div>
          <div class="info_news">
            <el-form :rules="ruleForm" :model="tableData" ref="tableData">
              <el-table
                :data="tableData.tableDataList"
                border
                ref="multipleTable"
                stripe
                align="center"
                tooltip-effect="dark"
                style="width: 100%"
                v-has:DISPATCH_ORDER_WEIGHTED_SETTING_LIST
                :span-method="objectSpanMethod"
              >
                <el-table-column label="序号" width="60">
                  <template slot-scope="scope">{{scope.$index+1}}</template>
                </el-table-column>
                <el-table-column prop="weightItemClassName" label="分类"></el-table-column>
                <el-table-column prop="weightedItemName" label="名称">
                  <template slot-scope="scope">
                    <span class="miniInput" v-if="scope.row.weightItemClass=='AF00533'">
                      <el-form-item
                        :prop="'tableDataList[' + scope.$index + '].weightedItemNameValue'"
                        :rules="{required:true,validator: (rule, value, callback) => {
                                    if (!value) {
                                    callback('请输入大于0的数字');
                                    } else {
                                    callback();
                                    }
                                },trigger:'blur'}"
                      >
                        近
                        <el-input v-model.number="scope.row.weightedItemNameValue" v-numberOnly></el-input>
                        {{scope.row.weightedItemName.slice(2)}}
                      </el-form-item>
                    </span>
                    <span v-else>{{scope.row.weightedItemName}}</span>
                  </template>
                </el-table-column>
                <el-table-column prop="weightedCalculationCondition" label="计算条件" width="250">
                  <template slot-scope="scope">
                    <span class="miniInput">
                      <el-form-item
                        :prop="'tableDataList[' + scope.$index + '].weightedCalculationCondition'"
                        :rules="{required: true, validator: (rule, value, callback)=>{
          return checkSequence(rule, value, callback,scope,'请输入大于0的数字','请输入大于上一行的数字')
          }, trigger: 'blur'}"
                      >
                        <span v-if="scope.row.weightedItem=='AF0052201'">
                          认证
                          <el-input
                            v-model.number="scope.row.weightedCalculationCondition"
                            v-numberOnly
                          ></el-input>天内
                        </span>
                        <span v-if="scope.row.weightedItem=='AF0052202'">
                          近
                          <el-input
                            v-model.number="scope.row.weightedCalculationCondition"
                            v-numberOnly
                          ></el-input>天无交易
                        </span>
                        <span v-if="scope.row.weightItemClass=='AF00533'">
                          {{scope.row.weightedConditionName.trim().substring(0,5)}}
                          <el-input
                            v-model.number="scope.row.weightedCalculationCondition"
                            v-numberOnly
                          ></el-input>
                        </span>
                      </el-form-item>
                    </span>
                  </template>
                </el-table-column>
                <el-table-column prop="weightedScore" label="加权分数" width="250">
                  <template slot-scope="scope">
                    <el-form-item
                      :prop="'tableDataList[' + scope.$index + '].weightedScore'"
                      :rules="{required:true,validator: (rule, value, callback) => {
                                    if (!value) {
                                    callback('请输入大于0的数字');
                                    } else {
                                    callback();
                                    }
                                },trigger:'blur'}"
                    >
                      <el-input v-model.number="scope.row.weightedScore" v-numberOnly></el-input>
                    </el-form-item>
                  </template>
                </el-table-column>
              </el-table>
            </el-form>
            <div class="btn_footer">
              <el-button type="primary" plain @click="Addsave" icon="el-icon-check">保存</el-button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <CopyCity :dialogVisible.sync="dialogVisible" :currentTableData="currentData" />
  </div>
</template>

<script type="text/javascript">
import { aflcProvinceCode, getDictionary } from "@/api/common.js";
import { parseTime } from "@/utils/";
import {
  aflcMediumOrderWeightedList,
  aflcMediumOrderWeightedAdd
} from "@/api/dispatch/plusPower.js";
import Pager from "@/components/Pagination/index";
import CopyCity from "./copyCity.vue";
export default {
  data() {
    return {
      cityTree: [],
      treestatus: false,
      defaultProps: {
        children: "children",
        label: "name"
      },
      btnsize: "mini",
      formAll: {
        belongCityCode: "440100",
        belongCityName: "广州市"
      },
      defaultArray: [440100],
      tableData: {
        tableDataList: []
      },
      weightItemClassNameArr: [],
      weightedItemNameArr: [],
      weightItemClassName: 0,
      weightedItemName: 0,
      plusList: [],
      minusList: [],
      ruleForm: {},
      dialogVisible: false,
      currentData: [],
      loading: true,
      checkDataFlagArr: []
    };
  },
  components: {
    Pager,
    CopyCity
  },
  async mounted() {
    //获取城市列表
    aflcProvinceCode().then(res => {
      this.cityTree = res.data;
    });
    if (!sessionStorage.getItem("emptyTable")) {
      await this.getMoreInformation();
    }
    this.firstblood();
  },
  methods: {
    checkSequence(rule, value, callback, item, name1, name2) {
      if (!value) {
        callback(new Error(name1));
      } else {
        if (
          item.$index - 1 >= 0 &&
          item.row.weightedItem ==
            this.tableData.tableDataList[item.$index - 1].weightedItem
        ) {
          if (
            value <
            this.tableData.tableDataList[item.$index - 1]
              .weightedCalculationCondition
          ) {
            callback(new Error(name2));
          } else {
            callback();
          }
        } else {
          callback();
        }
      }
    },
    // 刷新页面
    firstblood() {
      this.loading = true;
      aflcMediumOrderWeightedList(1, 20, this.formAll)
        .then(res => {
          this.loading = false;
          if (res.data.list && res.data.list.length > 0) {
            this.tableData.tableDataList = res.data.list;
            this.rowspan(this.tableData.tableDataList);
          } else {
            this.tableData.tableDataList = JSON.parse(
              sessionStorage.getItem("emptyTable")
            );
            this.rowspan(this.tableData.tableDataList);
          }
        })
        .catch(err => {
          this.loading = false;
          this.$message.error(err.text || err.errorInfo);
          this.tableData.tableDataList = JSON.parse(
            sessionStorage.getItem("emptyTable")
          );
          this.rowspan(this.tableData.tableDataList);
        });
    },
    showDialog() {
      this.dialogVisible = true;
      this.currentData = this.tableData.tableDataList;
    },
    // 合并表格
    rowspan(data) {
      this.weightItemClassNameArr = [];
      this.weightedItemNameArr = [];
      this.weightItemClassName = 0;
      this.weightedItemName = 0;
      for (var i = 0; i < this.tableData.tableDataList.length; i++) {
        if (i === 0) {
          this.weightItemClassNameArr.push(1);
          this.weightedItemNameArr.push(1);
          this.weightItemClassName = 0;
          this.weightedItemName = 0;
        } else {
          // 判断当前元素与上一个元素是否相同
          if (
            this.tableData.tableDataList[i].weightItemClassName ===
            this.tableData.tableDataList[i - 1].weightItemClassName
          ) {
            this.weightItemClassNameArr[this.weightItemClassName] += 1;
            this.weightItemClassNameArr.push(0);
          } else {
            this.weightItemClassNameArr.push(1);
            this.weightItemClassName = i;
          }
          if (
            this.tableData.tableDataList[i].weightedItemName ===
            this.tableData.tableDataList[i - 1].weightedItemName
          ) {
            this.weightedItemNameArr[this.weightedItemName] += 1;
            this.weightedItemNameArr.push(0);
          } else {
            this.weightedItemNameArr.push(1);
            this.weightedItemName = i;
          }
        }
      }
    },
    // 合并表格
    objectSpanMethod({ row, column, rowIndex, columnIndex }) {
      if (columnIndex === 1) {
        const _row = this.weightItemClassNameArr[rowIndex];
        const _col = _row > 0 ? 1 : 0;
        return {
          rowspan: _row,
          colspan: _col
        };
      }
      if (columnIndex === 2) {
        const _row = this.weightedItemNameArr[rowIndex];
        const _col = _row > 0 ? 1 : 0;
        return {
          rowspan: _row,
          colspan: _col
        };
      }
    },
    //初始化获取数据字典
    async getMoreInformation() {
      //获取加分项
      let res = await Promise.all([
        getDictionary("AF0052201"),
        getDictionary("AF0052202"),
        getDictionary("AF00522")
      ]);
      let tempRes = res[0].data.concat(res[1].data);
      let tempRes2 = res[2].data.slice(0, 2);
      tempRes.map(item => {
        this.plusList.push({
          weightedConditionCode: item.code,
          weightedConditionName: item.name,
          weightedItem: item.pcode,
          weightItemClass: "AF00522",
          weightItemClassName: "加分项",
          weightedCalculationCondition: null,
          weightedScore: null,
          weightedItemNameValue: null
        });
      });
      tempRes2.map(item => {
        this.plusList.map(item1 => {
          if (item.code == item1.weightedItem) {
            item1.weightedItemName = item.name;
          }
        });
      });
      //获取减分项
      let minusRes = await Promise.all([
        getDictionary("AF0053301"),
        getDictionary("AF0053302"),
        getDictionary("AF0053303"),
        getDictionary("AF0053304"),
        getDictionary("AF00533")
      ]);
      let tempMinusRes = minusRes[0].data
        .concat(minusRes[1].data)
        .concat(minusRes[2].data)
        .concat(minusRes[3].data);
      let tempMinusRes2 = minusRes[4].data;
      tempMinusRes.map(item => {
        this.minusList.push({
          weightedConditionCode: item.code,
          weightedConditionName: item.name,
          weightedItem: item.pcode,
          weightItemClass: "AF00533",
          weightItemClassName: "减分项",
          weightedCalculationCondition: null,
          weightedScore: null,
          weightedItemNameValue: null
        });
      });
      tempMinusRes2.map(item => {
        this.minusList.map(item1 => {
          if (item.code == item1.weightedItem) {
            item1.weightedItemName = item.name;
          }
        });
      });
      sessionStorage.setItem(
        "emptyTable",
        JSON.stringify(this.plusList.concat(this.minusList))
      );
    },
    // 选择城市
    nodeClick(data) {
      if (this.formAll.cityCode == data.code) {
        this.$refs.treeForm.setCheckedNodes([]);
        this.formAll.belongCityCode = null;
        this.formAll.belongCityName = null;
      } else {
        this.formAll.belongCityCode = data.code;
        this.formAll.belongCityName = data.name;
        this.$refs.treeForm.setCheckedNodes([data]);
      }
      this.tableData.tableDataList = JSON.parse(
        sessionStorage.getItem("emptyTable")
      );
      this.firstblood();
    },
    // 保存
    Addsave() {
      this.$nextTick(() => {
        this.$refs["tableData"].validate(valid => {
          if (valid) {
            if (this.formAll.belongCityCode) {
              this.tableData.tableDataList.map((item, index, arr) => {
                item.belongCityCode = this.formAll.belongCityCode;
                item.belongCityName = this.formAll.belongCityName;
                if (
                  index + 1 <= arr.length - 1 &&
                  item.weightedItem == arr[index + 1].weightedItem
                ) {
                  arr[index + 1].weightedItemNameValue =
                    item.weightedItemNameValue;
                }
              });
              aflcMediumOrderWeightedAdd(this.tableData.tableDataList)
                .then(res => {
                  this.$message.success("保存成功");
                  this.firstblood();
                })
                .catch(err => {
                  this.$message.error("保存失败");
                });
            } else {
              this.$message.error("请在左边选中城市");
            }
          } else {
            this.$message.error("请填写完整的内容");
            return false;
          }
        });
      });
    }
  }
};
</script>

<style type="text/css" lang="scss">
.plusPowerSouce {
  .el-tree-node__content {
    .el-checkbox {
      display: none;
    }
  }
  .el-tree-node__children {
    .el-checkbox {
      display: block;
    }
  }
  .el-form-item {
    margin-bottom: 0px;
  }
  .cell {
    overflow: initial;
  }
  .el-table__body-wrapper {
    padding-bottom: 30px;
  }
  .el-input__inner {
    height: 30px;
    line-height: 30px;
    text-align: center;
  }
  .el-form-item__error {
    z-index: 1;
    top: 90%;
  }
  .miniInput {
    .el-form-item__error {
      left: 30%;
    }
    .el-input {
      width: 80px;
      margin: 0px 5px;
    }
  }
  .btn_footer {
    text-align: center;
    margin: 20px 0px;
  }
  .el-table::before {
    position: relative;
  }
  .el-table__body-wrapper {
    position: unset;
    overflow: -webkit-paged-y;
  }
}
</style>
