<template>
  <div
    class="identicalStyle shoppingManage"
    style="height:100%"
    v-loading="loading"
  >
    <div class="columnsContainer">
      <div class="side_left">
        <el-input
          placeholder="请输入内容"
          v-model="select_input"
          class="input-with-select"
          clearable
        >
          <el-button
            slot="append"
            icon="el-icon-search"
            size="mini"
            @click="selectTree"
          ></el-button>
        </el-input>
        <el-tree
          :data="treedata"
          :props="defaultProps"
          accordion
          @node-click="handleNodeClick"
          v-show="!TreeStatus"
          highlight-current
          default-expand-all
          :expand-on-click-node="false"
        ></el-tree>
        <el-tree
          :data="sectleTreeData"
          :props="defaultProps"
          accordion
          @node-click="handleNodeClick"
          v-show="TreeStatus"
          default-expand-all
          :expand-on-click-node="false"
          highlight-current
        ></el-tree>
      </div>
      <div class="side_right">
        <el-form :inline="true" class="demo-ruleForm classify_searchinfo">
          <el-form-item label="商圈名称">
            <el-input v-model.trim="formAllData.tradeName"></el-input>
          </el-form-item>
          <el-form-item label="商圈类型">
            <el-select
              v-model="formAllData.tradeType"
              placeholder="请选择"
              clearable
            >
              <el-option
                v-for="item in professionTradeTypeList"
                :key="item.code"
                :label="item.name"
                :value="item.code"
              >
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="所属行业">
            <el-select
              v-model="formAllData.tradeIndustry"
              placeholder="请选择"
              clearable
            >
              <el-option
                v-for="item in tradeList"
                :key="item.code"
                :label="item.name"
                :value="item.code"
              >
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="同城潜力等级">
            <el-select
              v-model="formAllData.potentialGrade"
              placeholder="请选择"
              clearable
            >
              <el-option
                v-for="item in comCityList"
                :key="item.code"
                :label="item.name"
                :value="item.code"
              >
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="所在地">
            <GetCityList
              ref="area"
              v-model="formAllData.areaCode"
              @returnStr="getStr"
            ></GetCityList>
          </el-form-item>
          <el-form-item label="所属业务组">
            <businessGroup
              @inputObject="getObject"
              v-model="formAllData.businessGroupName"
              ref="businessGroup"
            />
          </el-form-item>
          <el-form-item label="启用状态">
            <el-select
              v-model="formAllData.flag"
              placeholder="请选择"
              clearable
            >
              <el-option
                v-for="item in usingStatusList"
                :key="item.code"
                :label="item.name"
                :value="item.code"
              >
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item class="fr">
            <el-button
              type="primary"
              plain
              @click="getData_query"
              :size="btnsize"
              icon="el-icon-search"
              >搜索</el-button
            >
            <el-button
              type="info"
              plain
              @click="clearSearch"
              :size="btnsize"
              icon="fontFamily aflc-icon-qingkong"
              >清空</el-button
            >
          </el-form-item>
        </el-form>
        <div class="classify_info">
          <div class="btns_box">
            <el-button
              type="primary"
              value="value"
              plain
              icon="el-icon-circle-plus"
              @click="openDialogAdd()"
              :size="btnsize"
              v-has:BUSINESS_AREA_MANAGE_AREA_DIVISION_MANAGE_ADD
              >新增</el-button
            >
            <el-button
              type="primary"
              value="value"
              plain
              icon="el-icon-edit"
              @click="openDialogEdit()"
              :size="btnsize"
              v-has:BUSINESS_AREA_MANAGE_AREA_DIVISION_MANAGE_UPDATE
              >修改</el-button
            >
            <el-button
              type="primary"
              plain
              icon="el-icon-bell"
              @click="handleUseStates"
              :size="btnsize"
              v-has:BUSINESS_AREA_MANAGE_AREA_DIVISION_MANAGE_USE
              >启用/停用</el-button
            >
          </div>
          <div class="info_news">
            <el-table
              style="width: 100%"
              stripe
              border
              height="100%"
              :data="tableDataAll"
              ref="multipleTable"
              @selection-change="getSelection"
              @row-click="clickDetails"
              highlight-current-row
              tooltip-effect="dark"
              v-has:BUSINESS_AREA_MANAGE_AREA_DIVISION_MANAGE_LIST
            >
              <el-table-column label="选择" type="selection" width="50">
              </el-table-column>
              <el-table-column label="序号" width="60">
                <template slot-scope="scope">
                  {{ (page - 1) * pagesize + scope.$index + 1 }}
                </template>
              </el-table-column>
              <el-table-column
                label="商圈名称"
                sortable
                show-overflow-tooltip
                width="150"
              >
                <template slot-scope="scope">
                  <h4 v-if="scope.row.id == '1'">{{ scope.row.tradeName }}</h4>
                  <h4
                    class="needMoreInfo"
                    @click="pushShoppingDetails(scope.row)"
                    v-else
                  >
                    {{ scope.row.tradeName }}
                  </h4>
                </template>
              </el-table-column>
              <el-table-column
                label="商圈类型"
                prop="tradeTypeName"
                sortable
                show-overflow-tooltip
                width="120"
              ></el-table-column>
              <el-table-column
                label="所属行业"
                prop="tradeIndustryName"
                sortable
                show-overflow-tooltip
                width="120"
              ></el-table-column>
              <el-table-column
                label="同城潜力等级"
                prop="potentialGradeName"
                sortable
                show-overflow-tooltip
                width="150"
              ></el-table-column>
              <el-table-column
                label="预估单量最小值"
                prop="predictOrderMin"
                sortable
                show-overflow-tooltip
                width="140"
              ></el-table-column>
              <el-table-column
                label="预估单量最大值"
                prop="predictOrderMax"
                sortable
                show-overflow-tooltip
                width="140"
              ></el-table-column>
              <el-table-column
                label="所在地"
                prop="areaName"
                sortable
                show-overflow-tooltip
                width="150"
              ></el-table-column>
              <el-table-column
                label="上级商圈"
                prop="parentName"
                sortable
                show-overflow-tooltip
                width="120"
              ></el-table-column>
              <el-table-column
                label="负责人"
                prop="tradeOwnerName"
                sortable
                show-overflow-tooltip
                width="120"
              ></el-table-column>
              <el-table-column
                label="联系号码"
                prop="tradeOwnerPhone"
                sortable
                show-overflow-tooltip
                width="120"
              ></el-table-column>
              <el-table-column
                label="所属业务片区（组）"
                prop="businessGroupName"
                sortable
                show-overflow-tooltip
                width="160"
              ></el-table-column>
              <el-table-column
                label="业务负责人"
                prop="businessGroupBossUserName"
                sortable
                show-overflow-tooltip
                width="120"
              ></el-table-column>
              <el-table-column
                label="启用状态"
                prop="flagName"
                sortable
                width="100"
              >
                <template slot-scope="scope">
                  <span
                    :class="{
                      blackName: scope.row.flagName == '禁用',
                      normalName: scope.row.flagName == '启用'
                    }"
                    >{{ scope.row.flagName }}</span
                  >
                </template>
              </el-table-column>
            </el-table>
          </div>
          <!-- 页码 -->
          <div class="info_tab_footer">
            共计:{{ dataTotal }}
            <div class="show_pager">
              <Pager
                :total="dataTotal"
                @change="handlePageChange"
                :sizes="sizes"
                ref="pager"
                v-has:BUSINESS_AREA_MANAGE_AREA_DIVISION_MANAGE_LIST
              />
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 弹框 -->
    <div class="shoppingManageDialog commoncss">
      <el-dialog
        :visible="dialogFormVisible_add"
        :before-close="change"
        top="3vh"
        v-dialogDrag
        @open="openDialog"
        :title="btntitle"
        :closeOnClickModal="false"
      >
        <el-form
          ref="formAll"
          :model="formAll"
          :rules="rulesForm"
          :label-width="formLabelWidth"
        >
          <el-row>
            <el-col :span="12">
              <el-form-item label="商圈名称" prop="tradeName">
                <el-input
                  v-model="formAll.tradeName"
                  :maxlength="20"
                  :disabled="editType == 'edit'"
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="负责人">
                <el-input
                  v-model="formAll.tradeOwnerName"
                  :maxlength="20"
                ></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="联系号码">
                <el-input
                  v-model="formAll.tradeOwnerPhone"
                  v-numberOnly
                  :maxlength="11"
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="商圈类型" prop="tradeType">
                <el-select
                  v-model="formAll.tradeType"
                  placeholder="请选择"
                  clearable
                >
                  <el-option
                    v-for="item in professionTradeTypeList"
                    :key="item.code"
                    :label="item.name"
                    :value="item.code"
                  >
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item
                label="所在区域"
                v-if="editType !== 'add' && !selectFlag"
              >
                <el-input
                  v-model="formAll.areaName"
                  placeholder="请选择"
                  @focus="changeSelect"
                  change-on-select
                  filterable
                ></el-input>
              </el-form-item>
              <el-form-item label="所在区域" prop="areaCode" v-else>
                <GetCityList
                  ref="area1"
                  v-model="formAll.areaCode"
                  @returnStr="getStr2"
                ></GetCityList>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="上级商圈" class="is-required">
                <!-- <el-input v-model="formAll.parentName" placeholder="请选择"  @focus="parentChangeSelect" v-if="!parentSelectFlag"></el-input> -->
                <el-cascader
                  :options="treeAdddata"
                  @change="parentMethods"
                  :props="props"
                  v-model="tradePath"
                  change-on-select
                  filterable
                ></el-cascader>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item
                label="商圈预估下单量最小值(单/天)"
                prop="predictOrderMin"
              >
                <el-input
                  :disabled="
                    editType == 'view' || formAll.potentialGrade == 'AF0680505'
                  "
                  v-model="formAll.predictOrderMin"
                  v-numberOnly
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item
                label="商圈预估下单量最大值(单/天)"
                prop="predictOrderMax"
              >
                <el-input
                  :disabled="
                    editType == 'view' || formAll.potentialGrade == 'AF0680501'
                  "
                  v-model="formAll.predictOrderMax"
                  v-numberOnly
                ></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="行业" prop="">
                <el-select
                  v-model="formAll.tradeIndustry"
                  placeholder="请选择"
                  clearable
                >
                  <el-option
                    v-for="item in tradeList"
                    :key="item.code"
                    :label="item.name"
                    :value="item.code"
                  >
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="所属业务组" prop="businessGroupName">
                <el-input
                  v-model="formAll.businessGroupName"
                  placeholder="请选择"
                  @focus="businessGroupNameChangeSelect"
                  v-if="editType !== 'add' && !businessGroupNameFlag"
                ></el-input>
                <businessGroup
                  @inputObject="getObjectNew"
                  v-model="formAll.businessGroupName"
                  ref="businessGroup"
                  v-else
                />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="同城潜力等级" prop="">
                <el-select
                  v-model="formAll.potentialGrade"
                  placeholder="请选择"
                  clearable
                  @change="potentialGradeChange"
                >
                  <el-option
                    v-for="item in comCityList"
                    :key="item.code"
                    :label="item.name"
                    :value="item.code"
                  >
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row>
            <el-col :span="12">
              <el-form-item label="商圈划分方式" prop="tradeWay">
                <el-radio-group
                  v-model="formAll.tradeWay"
                  v-for="item of divideList"
                  :key="item.code"
                  size="medium"
                  @change="divideChange"
                >
                  <el-radio-button :label="item.code">{{
                    item.name
                  }}</el-radio-button>
                </el-radio-group>
              </el-form-item>
            </el-col>
            <el-col :span="12" v-show="formAll.tradeWay !== '1'">
              <el-form-item label="商圈中心地址" prop="centerAddress">
                <div @click="centerAdressMethos">
                  <el-input
                    ref="centerAdress"
                    v-model="formAll.centerAddress"
                    disabled
                  ></el-input>
                </div>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12" v-show="formAll.tradeWay !== '1'">
              <el-form-item
                label="围栏半径范围(米）"
                prop="centerPointRadius"
                :maxlength="6"
              >
                <el-input
                  v-model="formAll.centerPointRadius"
                  @blur="centerPointRadiusBlur"
                  v-numberOnly
                ></el-input>
              </el-form-item>
            </el-col>

            <el-col :span="12" v-show="formAll.tradeWay !== '1'">
              <el-form-item
                label="打卡半径范围(米）"
                prop="clockRadius"
                :maxlength="6"
              >
                <el-input
                  v-model="formAll.clockRadius"
                  @blur="punchClockRangeRadiusBlur"
                  v-numberOnly
                ></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24">
              <el-form-item label="商圈地图" class="shoppingManagemapBox">
                <div id="shoppingManagemap"></div>
                <input id="centerAdress" />
                <!-- <div id="clear" @click="clearSingle" v-show="shouldDeleteSingle">
                  清除选中的地理围栏
                </div> -->
                <div id="clear" @click="clear" v-show="formAll.tradeWay == '1'">
                  清除当前地理围栏
                </div>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="商圈照片" prop="">
                <upload
                  class="licensePicture"
                  tip="(必须为jpg/png并且小于5M）"
                  v-model="formAll.landmark1Url"
                />
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item>
                <upload
                  class="licensePicture"
                  tip="(必须为jpg/png并且小于5M）"
                  v-model="formAll.landmark2Url"
                />
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
        <div class="dialog-footer">
          <el-button type="primary" @click="add_data" v-if="editType == 'add'"
            >确 定</el-button
          >
          <el-button type="primary" @click="edit_data" v-if="editType == 'edit'"
            >确 定</el-button
          >
          <el-button @click="close()">取 消</el-button>
        </div>
      </el-dialog>
    </div>
  </div>
</template>
<script>
import {
  data_get_aflcTradeArea_list,
  data_get_treeList_Id,
  data_get_treeSearchList,
  data_get_aflcTradeArea_create,
  data_get_aflcTradeArea_update,
  data_get_treeAllList,
  data_get_aflcTradeAreaDetail,
  data_Able_enableOrDisable,
  getAllTradeArea
} from "@/api/users/district/shoppingManage.js";
import { getDictionary } from "@/api/common.js";
import GetCityList from "@/components/GetCityList/city";
import { eventBus } from "@/eventBus";
import Pager from "@/components/Pagination/index";
import { parseTime, loadJs,loadAmap } from "@/utils/";
import businessGroup from "@/components/selectTree/businessGroup";
import Upload from "@/components/Upload/singleImage";
var map = {};
// var polygon;
export default {
  data() {
    const centerPointRadiusValidator = (rule, val, cb) => {
      if (val == 0 && this.formAll.tradeWay !== "1") {
        cb(new Error("请输入大于零的数"));
      } else {
        cb();
      }
    };
    const punchClockRangeRadiusValidator = (rule, val, cb) => {
      if (val == 0 && this.formAll.tradeWay !== "1") {
        cb(new Error("请输入大于零的数"));
      } else if (
        parseInt(val) >
        parseInt(
          this.formAll.centerPointRadius && this.formAll.tradeWay !== "1"
        )
      ) {
        cb(new Error("允许打卡范围不能大于围栏半径范围"));
      } else {
        cb();
      }
    };
    const centerAddressValidator = (rule, val, cb) => {
      if (
        !val &&
        this.formAll.potentialGrade !== "AF0680505" &&
        this.formAll.tradeWay !== "1"
      ) {
        cb(new Error("中心区域详细地址不能为空"));
      } else {
        cb();
      }
    };

    const predictOrderMinValidator = (rule, val, cb) => {
      if (!val && this.formAll.potentialGrade !== "AF0680505") {
        cb(new Error("请输入预估单量最小值"));
      } else {
        cb();
      }
    };

    const predictOrderMaxValidator = (rule, val, cb) => {
      if (!val && this.formAll.potentialGrade !== "AF0680501") {
        cb(new Error("请输入预估单量最大值"));
      } else {
        cb();
      }
    };
    const areaCodeValidator = (rule, val, cb) => {
      if (!this.formAll.areaCode) {
        cb(new Error("所属区域不能为空"));
      } else {
        cb();
      }
    };

    return {
      shouldDeleteSingle: false,
      TreeStatus: false,
      btnStatus: true, //新增修改按钮状态
      loading: false,
      btnsize: "mini",
      props: {
        label: "tradeName",
        value: "id",
        children: "childrenList"
      },
      selectRowData: {},
      selectId: [],
      sizes: [20, 50, 100, 400],
      pagesize: 20, // 初始化加载数量
      page: 1, // 初始化页码
      totalCount: null,
      dataTotal: 0,
      tableDataAll: [],
      radio: 1,
      professionTradeTypeList: [], //类型商圈
      tradeList: [], //行业类型
      comCityList: [], //同城潜力等级
      usingStatusList: [
        { code: "1", name: "启用" },
        { code: "0", name: "禁用" }
      ], //启用禁用
      divideList: [
        { code: "0", name: "圆心" },
        { code: "1", name: "自定义" }
      ],
      select_input: null,
      formAllData: {
        parentId: "1",
        parentName: "28快运",
        areaCode: null,
        tradeName: null,
        tradeType: null,
        tradeIndustry: null,
        potentialGrade: null,
        businessGroupCode: null,
        businessGroupName: null,
        flag: null
      },
      parentForm: {
        parentId: "1"
      },
      formAll: {
        tradeName: null,
        tradeOwnerName: null,
        tradeOwnerPhone: null,
        tradeType: null,
        areaCode: null,
        areaName: null,
        province: null,
        city: null,
        area: null,
        parentId: null,
        centerAddress: null,
        centerPoint: null,
        centerPointRadius: 0,
        clockRadius: 0,
        tradeWay: "0",
        potentialGrade: null,
        predictOrderMin: null,
        predictOrderMax: null,
        tradeIndustry: null,
        businessGroupCode: null,
        businessGroupName: null,
        landmark1Url: null,
        landmark2Url: null
      },
      tradePath: ["1"],
      OldtradePath: ["1"],
      centerPoint: [],
      polygonArray: [],
      rulesForm: {
        tradeName: {
          required: true,
          message: "商圈名称不能为空",
          trigger: "change"
        },
        tradeType: {
          required: true,
          message: "商圈类型不能为空",
          trigger: "change"
        },
        areaCode: {
          validator: areaCodeValidator,
          trigger: "change",
          required: true
        },
        tradeWay: {
          required: true,
          message: "请选择商圈划分方式",
          trigger: "change"
        },
        parentId: {
          required: true,
          message: "上级商圈不能为空",
          trigger: "change"
        },
        centerAddress: {
          required: true,
          validator: centerAddressValidator,
          trigger: "change"
        },
        centerPointRadius: {
          validator: centerPointRadiusValidator,
          trigger: "change",
          required: true
        },
        clockRadius: {
          validator: punchClockRangeRadiusValidator,
          trigger: "change",
          required: true
        },
        businessGroupName: {
          required: true,
          message: "所属业务组不能为空",
          trigger: "change"
        },
        predictOrderMin: {
          validator: predictOrderMinValidator,
          trigger: "change",
          required: true
        },
        predictOrderMax: {
          validator: predictOrderMaxValidator,
          trigger: "change",
          required: true
        }
      },
      selectFlag: null,
      parentSelectFlag: null,
      businessGroupNameFlag: null,
      formLabelWidth: "220px",
      dialogFormVisible_add: false,
      btntitle: "",
      editType: "",
      editstatus: "0",
      marker: null,
      contextMenuPositon: [],
      treedata: [], // 树形数据
      sectleTreeData: [],
      treeAdddata: [],
      allTradeAreaList: [],
      defaultProps: {
        children: "childrenList",
        label: "tradeName",
        isLeaf: "leaf"
      },
      enclosureCircle: null, //围栏半径
      clockCircle: null, //打卡半径
      //   multpolygon:null,//自定义区域
      mouseTool: null,
      isModify: false
    };
  },
  components: {
    Pager,
    GetCityList,
    businessGroup,
    Upload
  },
  watch: {
    dialogFormVisible_add: {
      handler: function(val, oldVal) {
        if (!val) {
          if (this.$refs.area1) {
            this.$refs.area1.clearData();
            this.$refs.formAll.resetFields();
          }
          this.tradePath = ["1"];
          this.OldtradePath = ["1"];
          this.treeListAll();
          this.polygonArray = [];
        } else {
          this.selectFlag = null;
          this.parentSelectFlag = null;
          this.businessGroupNameFlag = null;
          this.btnStatus = true;
          if (this.$refs.formAll) {
            this.$refs.formAll.resetFields();
          }
          //   this.loadMap();
        }
      }
    },
    select_input: {
      handler: function(val, oldVal) {
        if (!val) {
          this.TreeStatus = false;
        }
      }
    }
  },
  methods: {
    openDialog() {
      this.$nextTick(() => {
          loadAmap().then(res => {
              if (this.isModify) {
                data_get_aflcTradeAreaDetail(this.selectRowData[0].id).then(res => {
                //   console.log('this.isModify',res.data)
                  this.formAll = res.data;
                  this.centerPoint = this.formAll.centerPoint.split(",");
                  this.tradePath = this.formAll.tradePath.split(",");
                  this.OldtradePath = this.tradePath;
                  this.formAll.parentName = null;
                  this.init();
                  this.setCity();
                  if (this.formAll.tradeWay === "0") {
                //   console.log('this.centerPoint',this.centerPoint)
                    this.circleDraw(this.centerPoint);
                    this.circleDraw2(this.centerPoint);
                  } else {
                    if (this.formAll.centerPoint) {
                      this.polygonArray = JSON.parse(this.formAll.centerPoint);
                      this.polygonDraw();
                    }
                  }
                //   console.log("this.formAll", this.formAll, this.formAll.tradeWay);
                });
                this.btntitle = "修改";
                this.editType = "edit";
                this.editstatus = "1";
              } else {
                this.formAll = {
                  parentId: this.parentForm.parentId,
                  centerAddress: null,
                  centerPoint: null,
                  centerPointRadius: 0,
                  clockRadius: 0,
                  potentialGrade: null,
                  predictOrderMin: null,
                  predictOrderMax: null,
                  tradeIndustry: null,
                  businessGroupCode: null,
                  businessGroupName: null,
                  landmark1Url: null,
                  landmark2Url: null,
                  tradeWay: "0"
                };
                this.initData();
                this.init();
              }
          })
      });
    },
    clearData(done) {
      //   if (this.$refs.area1) {
      //     this.$refs.area1.clearData();
      //     // this.$refs.formAll.resetFields();
      //   }
      //   this.tradePath = ["1"];
      //   this.OldtradePath = ["1"];
      //   this.treeListAll();
      //   this.polygonArray = [];
      //   this.formAll = this.$options.data().formAll;
      //    this.formAll.parentId = this.parentForm.parentId;
      //   this.selectFlag = null;
      //   this.parentSelectFlag = null;
      //   this.businessGroupNameFlag = null;
      //   this.btnStatus = true;
      //   if (this.$refs.formAll) {
      //   }
    },
    initData() {
      if (!this.isModify) {
        getAllTradeArea().then(res => {
          // console.log("getAllTradeArea", res);
          this.allTradeAreaList = res.data;
          this.allPics = {};
          //    this.polygonDraw(JSON.parse(this.allTradeAreaList[0].centerPoint),true);
          this.allTradeAreaList.forEach(el => {
            if (el.centerPointRadius) {
              // console.log("el.centerPointRadius", el.centerPointRadius);
              // this.circleDraw(pos, showType, radius);
              this.allPics[el.id] = this.circleDraw(
                el.centerPoint.split(","),
                true,
                el.centerPointRadius
              );
            } else if (el.centerPoint) {
              // console.log("el.centerPoint", el.centerPoint);
              this.allPics[el.id] = this.polygonDraw(
                JSON.parse(el.centerPoint),
                true
              );
            }
          });
          map.on("click", e => {
            // 1.点击判断是否有选中商圈
            // 1.2 如果没有点击选中的商圈，清除所有选中的商圈样式，清除引用的商圈
            // 2.清除其他商圈选中状态
            // 3.给当前点击的加上选中状态
            //
            console.log("contains", e);
            //   this.bindClick(e)
          });
          console.log("map info:", this.allPics, map);
        });
        // .catch(err => {
        //   this.$message.error(err.errorInfo || err.text);
        // });
      }
    },
    clearSingle() {
      if (this._singleEl) {
        map.remove(this._singleEl);
      }
    },
    bindClick(el) {
      el.on("click", e => {
        this._singleEl = el;
        this.shouldDeleteSingle = true;
      });
    },
    getStr(val) {
      if (!val.area) {
        this.formAllData.areaCode = val.city.code;
      } else {
        this.formAllData.areaCode = val.area.code;
      }
    },
    getStr2(val) {
      if (!val.area) {
        this.formAll.areaCode = val.city.code;
        this.formAll.area = "";
      } else {
        this.formAll.areaCode = val.area.code;
        this.formAll.area = val.area.name;
      }
      this.formAll.city = val.city.name;
      this.formAll.province = val.province.name;
      this.setCity();
    },
    //树形数据
    treeListId(val) {
    //   data_get_treeList_Id("0").then(res => {
    //       console.log('data_get_treeList_Id',res.data)
    //     this.treedata = res.data;
    //   });
      data_get_treeAllList().then(res => {
        //   console.log('data_get_treeAllList',res)
        // this.treeAdddata = this.getTreeData(res.data);
        this.treedata = res.data;
      });
    },
    //全部树形数据
    treeListAll() {
      data_get_treeAllList().then(res => {
        this.treeAdddata = this.getTreeData(res.data);
      });
    },
    // 循环遍历树形数据
    getTreeData(data) {
      for (var i = 0; i < data.length; i++) {
        if (data[i].childrenList.length < 1) {
          // 当children为空数组，则将children设为undefined
          data[i].childrenList = undefined;
        } else {
          // children若不为空数组
          this.getTreeData(data[i].childrenList);
        }
      }
      return data;
    },
    //新增修改上级商圈
    parentMethods(e) {
      if (this.formAll.id) {
        data_get_treeList_Id(this.formAll.id).then(res => {
          if (this.formAll.id == e[e.length - 1]) {
            this.$message.warning("上级商圈不能是本商圈~");
            this.tradePath = this.OldtradePath;
          } else {
            if (res.data.length > 0) {
              res.data.forEach(item => {
                if (item.id == e[e.length - 1]) {
                  this.$message.warning("上级商圈不能是本商圈的子集~");
                  this.tradePath = this.OldtradePath;
                } else {
                  this.formAll.parentId = e[e.length - 1];
                }
              });
            } else {
              this.formAll.parentId = e[e.length - 1];
            }
          }
        });
      } else {
        this.formAll.parentId = this.tradePath[this.tradePath.length - 1];
      }
    },
    //
    //获取子节点树
    loadNode(node, resolve) {
      var _this = this;
      if (node.level === 0) {
        data_get_treeList_Id("0").then(res => {
          return resolve(res.data);
        });
      }
      if (node.level === 1) {
        data_get_treeList_Id("0").then(res => {
          return resolve(res.data[0].childrenList);
        });
      } else {
        if (node.data.parentId) {
          data_get_treeList_Id(node.data.id).then(res => {
            if (res.data.length < 1) {
              return resolve([]);
            } else {
              return resolve(res.data);
            }
          });
        }
      }
    },
    // 同城潜力等级
    potentialGradeChange(e) {
      let newcomCity = this.comCityList.filter(el => {
        return el.code == e;
      });
      this.formAll.predictOrderMin = newcomCity[0].value.split(",")[0];
      if (e == "AF0680501") {
        this.formAll.predictOrderMax = null;
      } else {
        this.formAll.predictOrderMax = newcomCity[0].value.split(",")[1];
      }
    },
    //所属业务组
    getObject(e) {
      this.formAllData.businessGroupName = e.groupName;
      this.formAllData.businessGroupCode = e.groupCode;
    },
    //新增所属业务组
    getObjectNew(e) {
    //   console.log(e);
      this.formAll.businessGroupName = e.groupName;
      this.formAll.businessGroupCode = e.groupCode;
    },
    // 下拉数据字典
    getMoreInformation() {
        Promise.all([this.$store.dispatch("GetInfoDic", "AF06802"),this.$store.dispatch("GetInfoDic", "AF06803"),this.$store.dispatch("GetInfoDic", "AF06805")]).then(resArr => {
            this.professionTradeTypeList = resArr[0];
            this.tradeList = resArr[1];
            this.comCityList = resArr[2];
        })
    //   //商圈类型
    //   getDictionary("AF06802").then(res => {
    //     this.professionTradeTypeList = res.data;
    //   });
    //   //所属行业
    //   getDictionary("AF06803").then(res => {
    //     this.tradeList = res.data;
    //   });
    //   //同城潜力等级
    //   getDictionary("AF06805").then(res => {
    //     this.comCityList = res.data;
    //   });
    },
    // 列表刷新页面
    firstblood() {
      this.loading = true;
      data_get_aflcTradeArea_list(
        this.page,
        this.pagesize,
        this.formAllData
      ).then(res => {
        this.dataTotal = res.data.totalCount;
        this.tableDataAll = res.data.list;
        this.loading = false;
      });
    },
    // 树形查询
    selectTree() {
      if (!this.select_input) {
        this.TreeStatus = false;
      } else {
        data_get_treeSearchList(this.select_input)
          .then(res => {
            this.TreeStatus = true;
            this.sectleTreeData = res.data;
          })
          .catch(err => {
            this.$message.error(err.text);
          });
      }
    },
    //进入商圈管理详情
    pushShoppingDetails(e) {
      this.$router.push({ name: "商圈管理详情", query: { Id: e.id } });
    },
    //  查询
    getData_query() {
      this.page = 1;
      this.$refs.pager.inputval = this.page;
      this.$refs.pager.pageNum = this.page;
      this.firstblood();
    },
    // 清空
    clearSearch() {
      this.formAllData = {
        professionTradeName: null,
        location: null,
        professionTradeType: null,
        professionTradeOwner: null,
        ownerPhone: null
      };
      if (this.page != 1) {
        this.page = 1;
        this.$refs.pager.inputval = this.page;
        this.$refs.pager.pageNum = this.page;
      }
      this.$refs.area.clearData();
      this.firstblood();
    },
    // 新增按钮
    openDialogAdd() {
      this.isModify = false;
      this.dialogFormVisible_add = true;
      this.btntitle = "创建";
      this.editType = "add";
      this.editstatus = "0";
      //   this.initData()
    },
    // 修改按钮
    openDialogEdit() {
      if (!this.selectRowData.length) {
        this.$message.warning("请选择您要操作的区域");
        return;
      } else if (this.selectRowData.length == 0 && this.editType !== "add") {
        this.$message.warning("请选择您要操作的区域");
        return false;
      } else if (this.selectRowData.length > 1 && this.editType !== "add") {
        this.$message({
          message: "每次只能操作单条数据~",
          type: "warning"
        });
        this.getDataList();
        return false;
      } else if (this.selectRowData[0].id == "1") {
        this.$message.warning("这条数据不能修改进行操作");
      } else {
        this.isModify = true;
        this.dialogFormVisible_add = true;
      }
    },
    handleNodeClick(e, i, o) {
        // console.log(e, i, o)
      if (i.level == "5") {
        this.parentForm.parentId = null;
      } else {
        // if (i.level > 1) {
        //   data_get_treeList_Id(e.id).then(res => {
        //     if (res.data.length < 1) {
        //       e.childrenList = [];
        //     } else {
        //       e.childrenList = res.data;
        //     }
        //     // console.log(e);
        //   });
        // }
        this.tradePath = e.tradePath.split(",");
        this.parentForm.parentId = e.id;
      }
      this.formAllData.parentId = e.id;
      this.firstblood();
    },
    change: function() {
      this.dialogFormVisible_add = false;
      this.getDataList();
    },
    close: function() {
      this.dialogFormVisible_add = false;
      this.$refs.formAll.resetFields();
      if (typeof done === "function") {
        done();
      }
      this.clearData();
      this.getDataList();
    },
    // 省市状态表
    changeSelect() {
      this.selectFlag = "1";
    },
    //上级商圈状态表
    parentChangeSelect() {
      this.parentSelectFlag = "1";
    },
    //业务组状态表
    businessGroupNameChangeSelect() {
      this.businessGroupNameFlag = "1";
    },
    // 判断选中与否
    getSelection(val) {
      //   console.log("选中内容", val);
      this.selectRowData = val;
    },
    //点击选中当前行
    clickDetails(row, event, column) {
      this.$refs.multipleTable.toggleRowSelection(row);
    },
    // 每页显示数据量变更
    handlePageChange(obj) {
      this.page = obj.pageNum;
      this.pagesize = obj.pageSize;
      this.firstblood();
    },
    centerAdressMethos() {
      this.$message.warning("请在地图搜索选择中心地址~");
    },
    // 启用禁用
    handleUseStates() {
      if (this.selectRowData.length == 0) {
        this.$message.warning("请选择您要操作的数据");
        return;
      } else if (this.selectRowData.length > 1) {
        this.$message({
          message: "每次只能操作单条数据~",
          type: "warning"
        });
        this.$refs.multipleTable.clearSelection();
      } else if (this.selectRowData[0].id == "1") {
        this.$message.warning("这条数据不能修改进行操作");
      } else {
        this.selectId = [];
        this.selectId.push(this.selectRowData[0].id);
        data_Able_enableOrDisable(this.selectId)
          .then(res => {
            this.selectId.splice(0, 1);
            if (this.selectRowData[0].flag == 1) {
              this.$message.warning("已禁用");
            } else {
              this.$message.success("已启用");
            }
            this.firstblood();
            this.$refs.multipleTable.clearSelection();
          })
          .catch(err => {
            this.$message.error(err.text);
          });
      }
    },
    // 商圈划分方式
    divideChange(i) {
      this.formAll.centerPoint = "";
      if (i == 1) {
        this.mouseTool.polygon();
        this.clearMarker();
        // map.clearMap();
        if (this.enclosureCircle) {
          map.remove(this.enclosureCircle);
        }
        if (this.clockCircle) {
          map.remove(this.clockCircle);
        }
        this.formAll.centerAddress = "";
        this.formAll.centerPointRadius = 0;
        this.formAll.clockRadius = 0;
        this.polygonArray = [];
      } else {
        this.mouseTool.close();
        // map.clearMap();
        if (this.polygonArray) {
          map.remove(this.polygonArray);
        }
      }
    },
    // 围栏半径范围(高德地图更新）
    centerPointRadiusBlur() {
      if (this.centerPoint.length > 0) {
        this.circleDraw(this.centerPoint, false);
      }
    },
    // 打卡半径范围(高德地图更新）
    punchClockRangeRadiusBlur() {
      if (this.centerPoint.length > 0) {
        this.circleDraw2(this.centerPoint, false);
      }
    },
    translate() {
      let getPathArray = [];
      this.polygonArray[0].getPath().forEach(item => {
        getPathArray.push([item.lng, item.lat]);
      });
      this.polygonArray = [];
      this.polygonArray.push(getPathArray);
    },
    // 新增
    add_data() {
      this.$refs["formAll"].validate(valid => {
        if (valid) {
          if (this.formAll.tradeWay == "1" && this.polygonArray.length > 0) {
            this.translate();
            this.formAll.centerPoint = JSON.stringify(this.polygonArray);
          }
          if (!this.formAll.centerPoint && this.formAll.tradeWay !== "1") {
            this.$message.error("请在地图上点击增加中心点");
          } else {
            if (this.btnStatus) {
            //   console.log("this.formAll", this.formAll);
              this.btnStatus = false;
              this.$message.info("新增中...", this.formAll);
              data_get_aflcTradeArea_create(this.formAll)
                .then(res => {
                  this.$message.success("新增成功");
                  this.dialogFormVisible_add = false;
                  this.formAllData.parentId = "1";
                  this.formAllData.parentName = "28快运";
                  this.firstblood();
                  this.treeListId("0");
                })
                .catch(err => {
                  this.$message.error(err.text);
                  this.dialogFormVisible_add = false;
                });
            }
          }
        } else {
          this.$message.error("内容未填写完整");
        }
      });
    },
    // 修改
    edit_data() {
      this.$refs["formAll"].validate(valid => {
        if (valid) {
          //   console.log("this.polygonArray", this.polygonArray);
          if (this.formAll.tradeWay == "1" && this.polygonArray.length > 0) {
            this.translate();
            this.polygonArray[0].forEach((item, i) => {
              if (item.lng) {
                this.polygonArray[0][i] = [item.lng, item.lat];
              }
            });
            this.formAll.centerPoint = JSON.stringify(this.polygonArray);
          }
          if (!this.formAll.centerPoint && this.formAll.tradeWay !== "1") {
            this.$message.error("请在地图上点击增加中心点");
          } else {
            if (this.btnStatus) {
              this.btnStatus = false;
              this.$message.info("修改中...");
              data_get_aflcTradeArea_update(this.formAll)
                .then(res => {
                  this.$message.success("修改成功");
                  this.dialogFormVisible_add = false;
                  this.formAllData.parentId = "1";
                  this.formAllData.parentName = "28快运";
                  this.firstblood();
                  this.treeListId("0");
                })
                .catch(err => {
                  this.$message.error(err.text);
                  this.dialogFormVisible_add = false;
                });
            }
          }
        } else {
          this.$message.error("内容未填写完整");
        }
      });
    },
    getDataList() {
      this.firstblood();
      this.$refs.multipleTable.clearSelection();
    },
    // 高德地图↓
    loadMap: function() {
      //   this.$nextTick(() => {
      loadAmap().then(() => {});
      //   });
    },
    init: function() {
      var _this = this;
      var contextMenu = new AMap.ContextMenu();
      map = new AMap.Map("shoppingManagemap", {
        // resizeEnable: true,
        zoom: 14
      });
      var mouseTool = new AMap.MouseTool(map);
      _this.mouseTool = mouseTool;
      var drawPolygon = mouseTool.polygon();
    //   console.log("_this.formAll.tradeWay", _this.formAll.tradeWay);
      if (_this.formAll.tradeWay == "0") {
        mouseTool.close();
      } else {
        mouseTool.polygon();
      }
      mouseTool.on("draw", function(e) {
        if (_this.formAll.tradeWay == "0") {
          _this.$message.error("商圈划分方式是圆心，请点击鼠标右键设置中心点");
          _this.polygonArray.push(e.obj);
          map.remove(e.obj);
        } else if (_this.polygonArray.length > 0) {
          _this.$message.error("只能自定义一个多边形!");
          _this.polygonArray.push(e.obj);
          map.remove(e.obj);
        } else {
          _this.polygonArray.push(e.obj);
        }
        // _this.polygonArray.push(e.obj);
        // console.log("_this.polygonArray", _this.polygonArray);
      });
      //   AMap.event.addListener(mouseTool, "draw", function(e) {
      //       console.log('AMap.event.addListener')
      //     if (_this.formAll.tradeWay == "0") {
      //       _this.$message.error("商圈划分方式是圆心，请点击鼠标右键设置中心点");
      //       _this.polygonArray.push(e.obj);
      //       _this.clear();
      //       //   map.clearMap();
      //     } else if (_this.polygonArray.length > 0) {
      //       _this.$message.error("只能自定义一个多边形!");
      //       //   e.obj.hide();
      //       //   console.log(_this.polygonArray);
      //     } else {
      //       //   let getPathArray = [];
      //       //   //   e.obj.getPath().forEach(item => {
      //       //   //     getPathArray.push([item.lng, item.lat]);
      //       //   //   });
      //       //   _this.polygonArray.push(e.obj);
      //       //   //   _this.polygonDraw(_this.polygonArray,false)
      //       //   //   console.log(e.obj.getPath());
      //       //   console.log(_this.polygonArray);
      //       //   _this.polygonArray = [];
      //       console.log('进入？？？？')
      //       _this.polygonArray.push(e.obj);
      //   });
      // 输入提示
      var autoOptions = {
        input: "centerAdress"
      };
      var auto = new AMap.Autocomplete(autoOptions);
      AMap.event.addListener(auto, "select", function(e) {
        _this.centerPoint = [e.poi.location.lng, e.poi.location.lat];
        _this.formAll.centerAddress = e.poi.district + e.poi.name;
        _this.formAll.centerPoint =
          e.poi.location.lng + "," + e.poi.location.lat;
        _this.marker = new AMap.Marker({
          map: map,
          position: _this.centerPoint // 基点位置
        });
        map.setCenter([e.poi.location.lng, e.poi.location.lat]);
      });

      //右键点击中心点
      map.on("rightclick", function(e) {
        if (_this.formAll.tradeWay == "1") {
          _this.$message.error(
            "商圈划分方式是自定义，请点击鼠标左键选择自定义划分"
          );
        } else {
          contextMenu.open(map, e.lnglat);
          _this.contextMenuPositon = e.lnglat; //右键菜单位置
        }
      });
      contextMenu.addItem(
        "添加中心点",
        function(e) {
          _this.clearMarker();
          findInfo(_this.contextMenuPositon);
        },
        3
      );
      function findInfo(pos) {
        var geocoder = new AMap.Geocoder({
          radius: 500, // 范围，默认：500
          extensions: "all"
        });
        geocoder.getAddress(pos, function(status, result) {
          if (status === "complete" && result.info === "OK") {
            _this.formAll.centerPoint = pos.lng + "," + pos.lat;
            _this.formAll.centerAddress = result.regeocode.formattedAddress;
            _this.centerPoint = [pos.lng, pos.lat];
            _this.marker = new AMap.Marker({
              map: map,
              position: _this.centerPoint // 基点位置
            });
          } else {
            _this.clearMarker();
            alert("获取不到当前位置的地址信息~");
          }
        });
      }
    },
    // 中心点原型范围
    circleDraw(pos, showType, radius) {
      this.marker = new AMap.Marker({
        map: map,
        position: pos // 基点位置
      });
      //   map.clearMap(circle);
      var enclosureCircle = new AMap.Circle({
        center: pos,
        radius: radius ? radius : this.formAll.centerPointRadius, //半径
        borderWeight: 3,
        strokeColor: showType ? "#FF0000" : "#FF33FF",
        strokeOpacity: 1,
        strokeWeight: 2,
        strokeOpacity: 0.8,
        fillOpacity: 0.1,
        strokeStyle: "dashed",
        strokeDasharray: [3, 3],
        fillColor: "#1791fc",
        zIndex: 50
      });
      this.enclosureCircle = this.enclosureCircle
        ? this.enclosureCircle
        : enclosureCircle;

      if (!showType && this.enclosureCircle !== enclosureCircle) {
        map.remove(this.enclosureCircle);
        this.enclosureCircle = enclosureCircle;
      }

      if (showType) {
        this.enclosureCircle = null;
      }
      enclosureCircle.setMap(map);
      return enclosureCircle;
    },
    circleDraw2(pos, status) {
      var clockCircle = new AMap.Circle({
        center: pos,
        radius: this.formAll.clockRadius, //半径
        borderWeight: 3,
        strokeColor: "#0588c3",
        strokeOpacity: 1,
        strokeWeight: 2,
        strokeOpacity: 0.8,
        fillOpacity: 0.1,
        strokeStyle: "dashed",
        strokeDasharray: [3, 3],
        fillColor: "#FF0000",
        zIndex: 50
      });
      this.clockCircle = this.clockCircle ? this.clockCircle : clockCircle;

      if (!status && this.clockCircle !== clockCircle) {
        map.remove(this.clockCircle);
        this.clockCircle = clockCircle;
      }
      if (status) {
        this.clockCircle = null;
      }
      clockCircle.setMap(map);
    },
    // 多边形
    polygonDraw(polygonArray, showType) {
        console.log("polygonArray,showType", polygonArray, showType);
      var _this = this;
      var polygon = new AMap.Polygon({
        path: polygonArray ? polygonArray : _this.polygonArray,
        isOutline: true,
        strokeOpacity: 1,
        lineJoin: "round",
        strokeWeight: 3,
        strokeStyle: "solid",
        strokeColor: showType ? "#FF0000" : "#3366FF",
        strokeDasharray: [10, 5],
        fillOpacity: 0.2,
        fillColor: "#1791fc"
      });
      //   this.multpolygon = polygon;
      //   this._multpolygon = polygon;
      this.polygonArray = polygon;
      polygon.setMap(map);
      return polygon;
    },
    // 清除中心点
    clearMarker() {
      if (this.marker) {
        // console.log("xxx", this.marker);
        // this.marker.setMap(null);
        map.remove(this.marker);
        this.marker = null;
      }
    },
    //清除多边形
    clear() {
      //   map.clearMap();
      // if(this.multpolygon){
      //   console.log("this.polygonArray", this.polygonArray);
      this.mouseTool.polygon();
      if (this.polygonArray) {
        map.remove(this.polygonArray);
      }
      // }
      this.polygonArray = [];
      this.formAll.centerPoint = "";
    },
    // 定位城市
    setCity: function() {
      var _this = this;
      let getLocationMap = [];
      var geocoder;
      geocoder = new AMap.Geocoder({});
      geocoder.getLocation(_this.formAll.city + _this.formAll.area, function(
        status,
        result
      ) {
        if (status === "complete" && result.info === "OK") {
          map.setCenter([
            result.geocodes[0].location.lng,
            result.geocodes[0].location.lat
          ]);
        }
      });
    }
  },
  created() {
    // this.loadMap();
  },
  mounted() {
    this.getMoreInformation();
    this.firstblood();
    this.treeListId("0");
    // this.initData();
  }
};
</script>
<style lang="scss">
.amap-sug-result {
  z-index: 6666 !important;
}
.shoppingManage {
  .side_left {
    .el-input__inner {
      height: 30px;
      line-height: 30px;
    }
  }
  .el-radio-group {
    &:nth-of-type(1) {
      margin-left: 0px;
    }
  }
  .shoppingManageDialog {
    display: inline-block;
    .el-dialog {
      width: 80% !important;
      max-height: 97%;
    }
    .shoppingManagemapBox {
      position: relative;
      #shoppingManagemap {
        width: 100%;
        height: 500px;
      }
      #centerAdress {
        position: absolute;
        left: 10px;
        top: 10px;
        height: 30px;
        line-height: 30px;
      }
    }
  }
  #clear {
    position: absolute;
    right: 10px;
    top: 10px;
    z-index: 2;
    border: 2px solid red;
    color: red;
    font-weight: bold;
    padding: 0px 5px;
    cursor: pointer;
    line-height: 30px;
  }
}
</style>

