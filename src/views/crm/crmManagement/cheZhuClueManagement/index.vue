<template>
  <div class="identicalStyle" v-loading="loading">
    <el-form
      :inline="true"
      ref="ruleForm"
      :hide-required-asterisk="true"
      :model="formData"
      class="divide classify_searchinfo"
      size="mini"
    >
      <el-form-item label="公司名称：">
        <el-input
          v-model="formData.companyName"
          clearable
          placeholder="请输入"
        ></el-input>
      </el-form-item>
      <el-form-item label="联系人：">
        <el-input
          v-model="formData.contacts"
          clearable
          placeholder="请输入"
        ></el-input>
      </el-form-item>
      <!--          prop="mobile" :rules="{required: true, validator: (rule, value, callback)=>{-->
      <!--          return checkNember(rule, value, callback)-->
      <!--          }, trigger: 'blur'}"-->
      <el-form-item label="手机号码：">
        <el-input
          v-model="formData.mobile"
          clearable
          placeholder="请输入"
          maxlength="11"
          @keyup.native="_formatNumber"
        ></el-input>
      </el-form-item>
      <el-form-item label="所属商圈：">
        <tradeAreaList
          @inputObject="getTradeAreaId"
          @clearAnalysisOrderData="clearTradeAreaId"
          ref="tradeAreaIdGroup"
        />
      </el-form-item>
      <el-form-item label="所属行业：">
        <el-select
          v-model="formData.tradeIndustry"
          clearable
          placeholder="请选择"
        >
          <el-option
            v-for="(item, index) in industryList"
            :key="index"
            :label="item.name"
            :value="item.code"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="月预估下单量：">
        <el-select
          v-model="formData.potentialGrade"
          clearable
          placeholder="请选择"
        >
          <el-option
            v-for="(item, index) in estimateList"
            :key="index"
            :label="item.name"
            :value="item.code"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="所在地：">
        <vregion
          :ui="true"
          @values="regionChangeSearch"
          class="form-control"
          ref="regionSearch"
        >
          <el-input
            v-model="formData._belongCityName"
            placeholder="请选择"
          ></el-input>
        </vregion>
      </el-form-item>
      <el-form-item label="转换状态：">
        <el-select
          v-model="formData.transformStatus"
          clearable
          placeholder="请选择"
        >
          <el-option
            v-for="(item, index) in transformList"
            :key="index"
            :label="item.name"
            :value="item.code"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="跟进状态：">
        <el-select
          v-model="formData.followStatus"
          clearable
          placeholder="请选择"
        >
          <el-option
            v-for="(item, index) in followUpList"
            :key="index"
            :label="item.name"
            :value="item.code"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item class="fr">
        <el-button
          type="primary"
          size="mini"
          icon="el-icon-search"
          plain
          @click="searchClick()"
          >搜索</el-button
        >
        <el-button
          type="info"
          size="mini"
          icon="fontFamily aflc-icon-qingkong"
          plain
          @click="clearSearchClick()"
          >清空</el-button
        >
      </el-form-item>
    </el-form>

    <div class="classify_info">
      <div class="btns_box clearfix">
        <el-button
          type="primary"
          size="mini"
          plain
          icon="el-icon-circle-plus"
          @click="handleClick('add')"
          >新增</el-button
        >
        <el-button
          type="primary"
          size="mini"
          plain
          icon="el-icon-edit"
          @click="handleClick('edit')"
          >修改</el-button
        >
        <el-button
          type="primary"
          size="mini"
          plain
          @click="handleClick('detail')"
          >查看详情</el-button
        >
        <el-button type="primary" size="mini" plain @click="resetClick()"
          >更改负责人</el-button
        >
      </div>
      <div class="info_news">
        <el-table
          ref="multipleTable"
          :data="tableData"
          stripe
          border
          height="100%"
          tooltip-effect="dark"
          style="width: 100%"
          @selection-change="handleSelectionChange"
        >
          <el-table-column type="selection" width="55"></el-table-column>
          <el-table-column label="序号" width="60">
            <template slot-scope="scope">{{ scope.$index + 1 }}</template>
          </el-table-column>
          <el-table-column
            prop="companyName"
            sortable
            min-width="176"
            label="公司名称"
          ></el-table-column>
          <el-table-column
            prop="contacts"
            sortable
            min-width="176"
            label="联系人"
          ></el-table-column>
          <el-table-column
            prop="mobile"
            sortable
            min-width="176"
            label="手机号码"
          ></el-table-column>
          <el-table-column
            prop="tradeAreaName"
            sortable
            min-width="176"
            label="所属商圈"
          ></el-table-column>
          <el-table-column
            prop="tradeIndustryName"
            sortable
            min-width="176"
            label="所属行业"
          ></el-table-column>
          <el-table-column
            prop="potentialGradeName"
            min-width="176"
            sortable
            label="月预估下单量"
          ></el-table-column>
          <el-table-column
            min-width="176"
            prop="belongCityName"
            sortable
            label="所在地"
          ></el-table-column>
          <el-table-column
            min-width="376"
            prop="address"
            sortable
            label="公司地址"
          ></el-table-column>
          <el-table-column
            min-width="136"
            prop="transformStatusName"
            sortable
            label="转化状态"
          ></el-table-column>
          <el-table-column
            min-width="136"
            prop="followStatusName"
            sortable
            label="跟进状态"
          ></el-table-column>
          <el-table-column
            min-width="176"
            prop="liabilityUserName"
            sortable
            label="线索负责人"
          ></el-table-column>
          <el-table-column
            min-width="176"
            prop="creator"
            sortable
            label="创建人"
          ></el-table-column>
          <el-table-column
            min-width="176"
            prop="createTime"
            sortable
            label="创建时间"
          ></el-table-column>
        </el-table>
      </div>
    </div>

    <!-- 页码 -->
    <div class="info_tab_footer">
      共计:{{ dataTotal }}
      <div class="show_pager">
        <Pager :total="dataTotal" @change="handlePageChange" ref="pager" />
      </div>
    </div>
    <div class="commoncss">
      <el-dialog
        :close-on-click-modal="false"
        v-el-drag-dialog
        :visible.sync="dialogFormVisible"
        @close="closeDetail"
        @open="open"
        top="5vh"
        width="60%"
        :title="btntitle"
      >
        <el-form
          ref="ruleFormDataDialog"
          :model="formDataDialog"
          label-position="right"
          label-width="110px"
        >
          <el-row>
            <h2 class="carNewinfoH2">
              基本信息
            </h2>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item
                label="公司名称"
                prop="companyName"
                :rules="{
                  required: true,
                  message: '请输入公司名称',
                  trigger: 'blur'
                }"
              >
                <el-input
                  v-model="formDataDialog.companyName"
                  placeholder="请输入公司名称"
                  maxlength="20"
                  clearable
                  :disabled="showDetail"
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item
                label="联系人"
                prop="contacts"
                :rules="{
                  required: true,
                  message: '请输入联系人名字',
                  trigger: 'blur'
                }"
              >
                <el-input
                  v-model="formDataDialog.contacts"
                  placeholder="请输入联系人名字"
                  maxlength="20"
                  clearable
                  :disabled="showDetail"
                ></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="职务" prop="position">
                <el-input
                  v-model="formDataDialog.position"
                  placeholder="请输入联系人职务"
                  maxlength="20"
                  clearable
                  :disabled="showDetail"
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item
                label="手机号"
                prop="mobile"
                :rules="{
                  required: true,
                  validator: (rule, value, callback) => {
                    return checkNemberDialog(rule, value, callback);
                  },
                  trigger: 'blur'
                }"
              >
                <el-input
                  v-model="formDataDialog.mobile"
                  placeholder="请输入手机号码"
                  maxlength="11"
                  clearable
                  :disabled="btntitle !== '新增货主线索'"
                  @blur="checkMobile"
                ></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="固定号码" prop="phoneNumber">
                <el-input
                  v-model="formDataDialog.phoneNumber"
                  placeholder="请输入固定电话"
                  maxlength="12"
                  clearable
                  :disabled="showDetail"
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item
                label="所属商圈"
                prop="tradeAreaId"
                :rules="{
                  required: true,
                  message: '请选择所属商圈',
                  trigger: 'change'
                }"
              >
                <tradeAreaList
                  :disabled="showDetail"
                  v-model="formDataDialog.tradeAreaId"
                  @inputObject="getObject"
                  @clearAnalysisOrderData="getClearAnalysisOrderData"
                  ref="tradeAreaIdDialog"
                />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="所属行业" prop="tradeIndustry">
                <el-select
                  v-model="formDataDialog.tradeIndustry"
                  clearable
                  :disabled="showDetail"
                  placeholder="请选择"
                >
                  <el-option
                    v-for="(item, index) in industryList"
                    :key="index"
                    :label="item.name"
                    :value="item.code"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item
                label="月预估下单量"
                prop="potentialGrade"
                :rules="{
                  required: true,
                  message: '请选择',
                  trigger: 'change'
                }"
              >
                <el-select
                  v-model="formDataDialog.potentialGrade"
                  clearable
                  :disabled="showDetail"
                  placeholder="请选择"
                >
                  <el-option
                    v-for="(item, index) in estimateList"
                    :key="index"
                    :label="item.name"
                    :value="item.code"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item
                label="省/市/区"
                prop="belongCityName"
                :rules="{
                  required: true,
                  message: '请选择省/市/区',
                  trigger: 'change'
                }"
              >
                <vregion
                  :ui="true"
                  @values="regionChange"
                  class="form-control"
                  ref="regionChange"
                >
                  <el-input
                    v-model="formDataDialog.belongCityName"
                    placeholder="请选择"
                  ></el-input>
                </vregion>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item
                label="详细地址"
                prop="address"
                :rules="{
                  required: true,
                  message: '请输入或在地图中搜索',
                  trigger: 'change'
                }"
              >
                <el-input
                  v-model="formDataDialog.address"
                  placeholder="请输入或在地图中搜索"
                  clearable
                  :disabled="showDetail"
                ></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <h2 class="carNewinfoH2">
              地址定位
            </h2>
          </el-row>
          <el-row>
            <div class="search">
              <el-input
                id="tipinput"
                size="mini"
                v-model="searchAddress"
                placeholder="请输入关键字"
                v-on:input="toLoadUI"
                clearable
              ></el-input>
            </div>
            <div class="search-list" v-if="showSearchWindow">
              <div
                class="search-item"
                v-for="(item, index) in searchList"
                :key="index"
                @click="toPoiPickerReady(item)"
              >
                <span>{{ item.name }}</span
                ><span v-if="item.address.length > 0" class="margin_l_10">{{
                  item.address
                }}</span>
              </div>
            </div>
            <div class="map-content" ref="allmap"></div>
          </el-row>
          <el-row>
            <h2 class="carNewinfoH2">
              图片信息
            </h2>
          </el-row>
          <el-row>
            <el-col :span="12" type="flex" align="middle">
              <el-form-item label="">
                <upload
                  class="licensePicture"
                  tip="（必须为jpg/png并且小于5M）"
                  v-model="formDataDialog.shipperCardFile"
                  :disabled="showDetail"
                />
                名片图像
              </el-form-item>
            </el-col>
            <el-col :span="12" type="flex" align="middle">
              <el-form-item label="">
                <upload
                  class="licensePicture"
                  tip="（必须为jpg/png并且小于5M）"
                  v-model="formDataDialog.companyFacadeFile"
                  :disabled="showDetail"
                />
                门头照
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <h2 class="carNewinfoH2">
              更多信息
            </h2>
          </el-row>
          <el-row :gutter="10" class="margin_b_10">
            <div v-for="(item, index) in formDataDialog.customize" :key="index">
              <el-col :span="4">
                <el-input
                  class="margin_b_10"
                  v-model="item.name"
                  placeholder="自定义标签"
                  maxlength="8"
                  clearable
                  :disabled="showDetail"
                ></el-input>
              </el-col>
              <el-col :span="8">
                <el-input
                  class="margin_b_10"
                  v-model="item.value"
                  placeholder="请输入"
                  maxlength="20"
                  clearable
                  :disabled="showDetail"
                ></el-input>
              </el-col>
            </div>
          </el-row>
          <el-row>
            <el-col :span="24">
              <el-form-item label="备注" class="textArea" prop="remark">
                <el-input
                  type="textarea"
                  :rows="2"
                  placeholder="请输入备注信息"
                  maxlength="100"
                  v-model="formDataDialog.remark"
                  clearable
                  :disabled="showDetail"
                ></el-input>
                <p class="countNum">
                  <span class>{{
                    formDataDialog.remark ? formDataDialog.remark.length : 0
                  }}</span>
                  <span>/ 100</span>
                </p>
              </el-form-item>
            </el-col>
          </el-row>
          <div v-if="showDetail">
            <el-form label-position="right" label-width="110px">
              <el-row>
                <h2 class="carNewinfoH2">
                  系统信息
                </h2>
              </el-row>
              <el-row>
                <el-col :span="12">
                  <el-form-item label="创建人">
                    <el-input
                      v-model="formDataDialog.creator"
                      placeholder=""
                      maxlength="20"
                      clearable
                      disabled
                    ></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="创建时间">
                    <el-input
                      v-model="formDataDialog.createTime"
                      placeholder=""
                      maxlength="20"
                      clearable
                      disabled
                    ></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="12">
                  <el-form-item label="最后修改人">
                    <el-input
                      v-model="formDataDialog.updater"
                      placeholder=""
                      maxlength="20"
                      clearable
                      disabled
                    ></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="最后修改时间">
                    <el-input
                      v-model="formDataDialog.updateTime"
                      placeholder=""
                      maxlength="11"
                      clearable
                      disabled
                    ></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
            </el-form>
            <el-row>
              <h2 class="carNewinfoH2">
                线索动态
              </h2>
            </el-row>
            <div v-for="(item, index) in logList" :key="index" class="log-item">
              <div>{{ item.createTime }}</div>
              <div>{{ item.title }}</div>
              <div>{{ item.content }}</div>
            </div>
          </div>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button
            type="primary"
            plain
            icon="el-icon-success"
            @click="submit()"
            :disabled="showClick"
            v-if="!showDetail"
            >确 定</el-button
          >
          <el-button
            @click="dialogFormVisible = false"
            type="primary"
            plain
            icon="el-icon-error"
            >关 闭</el-button
          >
        </div>
      </el-dialog>
    </div>
    <div class="commoncss">
      <el-dialog
        :close-on-click-modal="false"
        v-el-drag-dialog
        :visible.sync="dialogFormVisible1"
        @close="closeBusiness"
        title="更改线索负责人"
        width="650px"
      >
        <el-form :model="formBusiness" ref="ruleBusiness">
          <el-table
            :data="tableData1"
            border
            height="100%"
            tooltip-effect="dark"
            style="width: 100%"
          >
            <el-table-column label="业务组">
              <template slot-scope="scope">
                <el-form-item label="">
                  <businessGroup
                    size="mini"
                    style="width: 240px"
                    @inputObject="getBusinessObject($event)"
                    v-model="formBusiness.groupName"
                    ref="businessGroup"
                  ></businessGroup>
                </el-form-item>
              </template>
            </el-table-column>
            <el-table-column label="业务员">
              <template slot-scope="scope">
                <el-form-item
                  label=""
                  prop="belongSalesmanId"
                  :rules="{
                    required: true,
                    message: '请选择业务员',
                    trigger: 'change'
                  }"
                >
                  <el-select
                    size="mini"
                    style="width: 240px"
                    v-model="formBusiness.belongSalesmanId"
                    filterable
                    placeholder="请选择"
                  >
                    <el-option
                      v-for="item in restaurants"
                      :key="item.id"
                      :label="item.name"
                      :value="item.userId"
                    >
                      <span style="float: left">{{ item.name }}</span>
                      <span
                        style="float: right; color: #8492a6; font-size: 13px"
                        >{{ item.mobile }}</span
                      >
                    </el-option>
                  </el-select>
                </el-form-item>
              </template>
            </el-table-column>
          </el-table>
        </el-form>
        <el-row type="flex" justify="center" class="margin_10">
          <el-button type="primary" size="mini" plain @click="handleReset()"
            >确认</el-button
          >
          <el-button
            class="margin_l_10"
            type="primary"
            size="mini"
            plain
            @click="dialogFormVisible1 = false"
            >关闭</el-button
          >
        </el-row>
      </el-dialog>
    </div>
  </div>
</template>

<script type="text/javascript">
import {
  DicIndustryType,
  DicGradeType,
  TransformType,
  FollowUpType
} from "@/api/common.js";
import tradeAreaList from "@/components/selectTree/tradeArea";
import upload from "@/components/Upload/singleImage";
import Pager from "@/components/Pagination/index";
import {
  getListData,
  addData,
  updateData,
  getOneData,
  getDetail,
  changeLiability,
  checkMobile
} from "@/api/crm/cheZhuClueManagement/cheZhuClueManagement";
import vregion from "@/components/vregion/Region";
import businessGroup from "@/components/selectTree/businessGroup";
import { aflcBusinessGroupUserList } from "@/api/company/businessGroup";
import { loadAmap } from "@/utils/";
export default {
  data() {
    return {
      showDetail: false,
      map: null,
      moveEnd: false, // 是否在map里已经移动过
      searchAddress: "", // 高德搜索
      searchList: [], // 高德搜索列表
      showSearchWindow: false, // 显示搜索列表
      loading: false,
      dialogFormVisible: false,
      dialogFormVisible1: false,
      btntitle: "",
      selectedList: [], // 选择
      dataTotal: 0,
      tableData: [],
      tableData1: [{ group: "", members: "" }],
      industryList: [],
      estimateList: [],
      transformList: [],
      followUpList: [],
      logList: [],
      formData: {
        pageNum: 1,
        pageSize: 20,
        companyName: "", // 公司名称
        contacts: "", // 联系人
        mobile: "", // 手机号码
        tradeAreaId: "", // 所属商圈
        tradeIndustry: "", // 所属行业
        potentialGrade: "", // 月预估下单量
        belongCity: "", // 所在地
        _belongCityName: "", // 所在地名称(接口不使用)
        transformStatus: "", // 转换状态
        followStatus: "" // 跟进状态
      },
      formDataDialog: {
        companyName: "", // 公司名称
        contacts: "", // 联系人
        position: "", // 职务
        mobile: "", // 手机号码
        phoneNumber: "", // 固定号码
        tradeAreaId: "", // 所属商圈
        tradeIndustry: "", // 所属行业
        potentialGrade: "", // 月预估下单量
        address: "", // 详细地址
        belongCity: "", // 所在地编码 区
        belongCityName: "", // 省/市/区
        centerPoint: "", // 中心坐标 110.7582,88.5321
        shipperCardFile: "", // 名片图像
        companyFacadeFile: "", // 门头照
        customize: [
          { name: "", value: "" },
          { name: "", value: "" },
          { name: "", value: "" },
          { name: "", value: "" }
        ],
        remark: "", // 备注
        provinceCode: "",
        cityCode: ""
      },
      restaurants: [], // 业务员列表
      formBusiness: {
        groupCode: "",
        groupName: "",
        belongSalesmanId: ""
      },
      showClick: false
    };
  },
  // computed: {
  // },
  components: { Pager, upload, tradeAreaList, businessGroup, vregion },
  watch: {},
  methods: {
    regionChangeSearch(d) {
      this.formData.belongCity = d.area
        ? d.area.code
        : "" || d.city
        ? d.city.code
        : "" || d.province
        ? d.province.code
        : "";
      this.formData._belongCityName = `${d.province ? d.province.name : ""}${
        d.city ? d.city.name : ""
      }${d.area ? d.area.name : ""}`;
    },
    regionChange(d) {
      this.formDataDialog.provinceCode = d.province ? d.province.code : "";
      this.formDataDialog.cityCode = d.city ? d.city.code : "";
      this.formDataDialog.belongCity = d.area ? d.area.code : "";
      this.formDataDialog.belongCityName = `${
        d.province ? d.province.name : ""
      }${d.city ? d.city.name : ""}${d.area ? d.area.name : ""}`;
    },
    checkMobile(e) {
      this.$refs["ruleFormDataDialog"].validateField("mobile", errMsg => {
        if (errMsg) {
          return;
        }
        checkMobile(e.target.value)
          .then(res => {
            if (res.status === 200) {
              this.$message.success("手机号可注册");
            } else {
              this.$message.warning(res.errorInfo || res.text);
            }
          })
          .catch(err => {
            this.$message.warning(err.errorInfo || err.text);
          });
      });
    },
    getBusinessObject(e) {
      this.formBusiness.groupName = e.groupName;
      this.formBusiness.groupCode = e.groupCode;
      // 选取部门后执行人一栏先清空
      this.formBusiness.belongSalesmanId = "";
      this.getBusinessGroupUserList();
    },
    handleReset() {
      this.$refs["ruleBusiness"].validate(valid => {
        if (valid) {
          changeLiability({
            ids: this.selectedList,
            userId: this.formBusiness.belongSalesmanId
          })
            .then(res => {
              if (res.status === 200) {
                this.$message.success("操作成功");
                this.getList();
                this.dialogFormVisible1 = false;
              } else {
                this.$message.warning(res.errorInfo || res.text);
              }
            })
            .catch(err => {
              this.$message.warning(err.errorInfo || err.text);
            });
        } else {
          return false;
        }
      });
    },
    clearTradeAreaId() {
      this.formData.tradeAreaId = "";
    },
    getClearAnalysisOrderData() {
      this.formDataDialog.tradeAreaId = "";
    },
    getTradeAreaId(e) {
      this.formData.tradeAreaId = e.id;
    },
    getObject(e) {
      this.formDataDialog.tradeAreaId = e.id;
    },
    searchClick() {
      // this.$refs['ruleForm'].validate(valid => {
      //   if (valid) {
      this.resetPage();
      this.getList();
      //   } else {
      //     return false
      //   }
      // })
    },
    closeBusiness() {
      this.formBusiness = this.$options.data().formBusiness;
      this.$refs["ruleBusiness"].resetFields();
      this.restaurants = [];
    },
    clearSearchClick() {
      this.formData = this.$options.data().formData;
      this.$refs["tradeAreaIdGroup"].aid = "";
      this.$refs.regionSearch.clear();
      this.resetPage();
      this.getList();
    },
    closeDetail() {
      this.$refs["tradeAreaIdDialog"].aid = "";
      this.formDataDialog = this.$options.data().formDataDialog;
      this.searchAddress = "";
      this.searchList = [];
      this.logList = [];
      this.map = null;
      this.moveEnd = false;
      this.showDetail = false;
      this.$refs["ruleFormDataDialog"].resetFields();
      this.$refs.regionChange.clear();
      this.showClick = false;
    },
    getList() {
      this.loading = true;
      getListData(this.formData)
        .then(res => {
          if (res.status === 200) {
            this.tableData = res.data.list;
            this.dataTotal = res.data.total;
            this.loading = false;
          }
        })
        .catch(err => {
          this.$message({
            type: "info",
            message:
              "操作失败，原因：" + (err.errorInfo ? err.errorInfo : err.text)
          });
          this.loading = false;
        });
    },
    handlePageChange(obj) {
      this.formData.pageNum = obj.pageNum;
      this.formData.pageSize = obj.pageSize;
      this.getList();
    },
    handleClick(type) {
      if (type === "add") {
        this.btntitle = "新增货主线索";
      }
      if (type === "edit") {
        this.btntitle = "修改货主线索";
        if (this.selectedList.length === 0 || this.selectedList.length > 1) {
          this.$message.warning("请选择一条数据");
          return;
        }
      }
      if (type === "detail") {
        this.btntitle = "查看货主线索";
        if (this.selectedList.length === 0 || this.selectedList.length > 1) {
          this.$message.warning("请选择一条数据");
          return;
        }
        this.showDetail = true;
      }
      this.dialogFormVisible = true;
    },
    resetClick() {
      if (this.selectedList.length === 0) {
        this.$message.warning("请选择一条或多条数据");
        return;
      }
      this.dialogFormVisible1 = true;
    },
    handleSelectionChange(val) {
      this.selectedList = val.map(item => {
        return item.id;
      });
    },
    submit() {
      this.$refs["ruleFormDataDialog"].validate(valid => {
        if (valid) {
          if (this.formDataDialog.belongCity === "") {
            this.formDataDialog.belongCity =
              this.formDataDialog.cityCode || this.formDataDialog.provinceCode;
          }
          const formData = JSON.parse(JSON.stringify(this.formDataDialog));
          formData.customize = JSON.stringify(formData.customize);
          this.showClick = true;
          if (this.showClick) {
            if (this.btntitle === "新增货主线索") {
              addData(formData)
                .then(res => {
                  if (res.status === 200) {
                    this.$message.success("新增成功");
                    this.resetPage();
                    this.getList();
                    this.dialogFormVisible = false;
                  } else {
                    this.$message.warning(res.errorInfo || res.text);
                  }
                  this.showClick = false;
                })
                .catch(err => {
                  this.$message.warning(err.errorInfo || err.text);
                  this.showClick = false;
                });
            } else {
              updateData(formData)
                .then(res => {
                  if (res.status === 200) {
                    this.$message.success("修改成功");
                    this.getList();
                    this.dialogFormVisible = false;
                  } else {
                    this.$message.warning(res.errorInfo || res.text);
                  }
                  this.showClick = false;
                })
                .catch(err => {
                  this.$message.warning(err.errorInfo || err.text);
                  this.showClick = false;
                });
            }
          }
        } else {
          return false;
        }
      });
    },

    resetPage() {
      this.formData.pageNum = 1;
      this.$refs.pager.inputval = 1;
      this.$refs.pager.pageNum = 1;
    },
    getCenter(lnglat) {
        loadAmap(true).then(()=>{
                      
                 
      console.log(lnglat);
      this.map = new AMap.Map(this.$refs.allmap, {
        zoom: 16,
        scrollWheel: false,
        dragEnable: !this.showDetail,
        center: lnglat
      });
      this.map.addControl(
        new AMap.ToolBar({
          liteStyle: true
        })
      );
      this.map.on("moveend", e => {
        this.moveEnd = true;
      });
      AMapUI.loadUI(["misc/PositionPicker"], PositionPicker => {
        const positionPicker = new PositionPicker({
          mode: "dragMap",
          map: this.map
        });
        positionPicker.on("success", positionResult => {
          console.log(positionResult);
          this.city = positionResult.regeocode.addressComponent.city;
          this.formDataDialog.centerPoint = `${positionResult.position.lng},${positionResult.position.lat}`;
          if (this.moveEnd) {
            this.formDataDialog.address = positionResult.address;
            this.formDataDialog.belongCity =
              positionResult.regeocode.addressComponent.adcode;
            this.formDataDialog.provinceCode =
              this.formDataDialog.belongCity.substring(0, 2) + "0000";
            this.formDataDialog.cityCode =
              this.formDataDialog.belongCity.substring(0, 4) + "00";
            this.formDataDialog.belongCityName =
              positionResult.regeocode.addressComponent.province +
              positionResult.regeocode.addressComponent.city +
              positionResult.regeocode.addressComponent.district;
          }
        });
        positionPicker.on("fail", positionResult => {});
        positionPicker.start();
      });
       })
    },
    open() {
      this.$nextTick(() => {
        if (this.btntitle === "新增货主线索") {
          this.getCenter(
            this.formDataDialog.centerPoint.length === 0
              ? ""
              : this.formDataDialog.centerPoint.split(",")
          );
        }
        if (this.btntitle === "修改货主线索") {
          getOneData(this.selectedList[0])
            .then(res => {
              if (res.status === 200) {
                res.data.customize = res.data.customize
                  ? JSON.parse(res.data.customize)
                  : [
                      { name: "", value: "" },
                      { name: "", value: "" },
                      { name: "", value: "" },
                      { name: "", value: "" }
                    ];
                this.formDataDialog = res.data;
                this.getCenter(
                  this.formDataDialog.centerPoint.length === 0
                    ? ""
                    : this.formDataDialog.centerPoint.split(",")
                );
              }
            })
            .catch(err => {
              this.$message.warning(err.errorInfo || err.text);
            });
        }
        if (this.btntitle === "查看货主线索") {
          getDetail(this.selectedList[0])
            .then(res => {
              if (res.status === 200) {
                res.data.customize = res.data.customize
                  ? JSON.parse(res.data.customize)
                  : [
                      { name: "", value: "" },
                      { name: "", value: "" },
                      { name: "", value: "" },
                      { name: "", value: "" }
                    ];
                this.formDataDialog = res.data;
                this.getCenter(
                  this.formDataDialog.centerPoint.length === 0
                    ? ""
                    : this.formDataDialog.centerPoint.split(",")
                );
                this.logList = res.data.logList;
              } else {
                this.$message.warning(res.errorInfo || res.text);
              }
            })
            .catch(err => {
              this.$message.warning(err.errorInfo || err.text);
            });
        }
      });
    },
    toLoadUI(e) {
        loadAmap().then(()=>{
                      
                  
      this.showSearchWindow = true;
      AMap.plugin("AMap.Autocomplete", () => {
        const autoComplete = new AMap.Autocomplete({ city: this.city });
        autoComplete.search(e, (status, result) => {
          if (result.info === "OK") {
            this.searchList = result.tips;
          } else {
            this.searchList = [];
          }
        });
      });
      })
    },
    toPoiPickerReady(item) {
      if (item.location) {
        this.moveEnd = true;
        this.getCenter([item.location.lng, item.location.lat]);
        this.showSearchWindow = false;
        this.searchAddress = "";
      } else {
        this.$message.error("没有获取到详细地址");
      }
    },
    checkNemberDialog(rule, value, callback) {
      const re = /^1[3-9]\d{9}$/;
      if (re.test(value)) {
        callback();
      } else {
        callback(new Error("请输入正确的手机号码"));
      }
    },
    checkNember(rule, value, callback) {
      const re = /^1[3-9]\d{9}$/;
      if (value === "") {
        callback();
      } else {
        if (re.test(value)) {
          callback();
        } else {
          callback(new Error("请输入正确的手机号码"));
        }
      }
    },
    getBusinessGroupUserList() {
      const parm = {
        currentPage: 1,
        pageSize: 1000,
        vo: { groupCode: this.formBusiness.groupCode }
      };
      aflcBusinessGroupUserList(parm).then(res => {
        this.restaurants = res.data.list;
      });
    },
    _formatNumber(e) {
      const el = e.target;
      el.value = el.value.replace(/[^\d.]/g, "");
    }
  },
  created() {
    DicIndustryType().then(res => {
      if (res.status === 200) {
        this.industryList = res.data;
      }
    });
    DicGradeType().then(res => {
      if (res.status === 200) {
        this.estimateList = res.data;
      }
    });
    TransformType().then(res => {
      if (res.status === 200) {
        this.transformList = res.data;
      }
    });
    FollowUpType().then(res => {
      if (res.status === 200) {
        this.followUpList = res.data;
      }
    });
    this.getList();
  },
  mounted() {}
};
</script>

<style type="text/css" lang="scss" scoped>
.divide {
  border-bottom: 1px dashed #999;
  margin-bottom: 10px;
}
.margin_10 {
  margin: 10px;
}
.margin_l_10 {
  margin-left: 10px;
}
.margin_b_10 {
  margin-bottom: 10px;
}
.map-content {
  width: 100%;
  height: 500px;
  margin-bottom: 20px;
  position: relative;
}
.search {
  position: absolute;
  z-index: 90;
  left: 10px;
  top: 10px;
  background: white;
  padding: 7px;
}
.search-list {
  position: absolute;
  z-index: 100;
  left: 10px;
  top: 56px;
  background: white;
}
.search-list .search-item {
  padding: 7px;
  cursor: pointer;
}
.search-item:hover {
  background: #add1fe;
}
.log-item {
  background-color: #cdddff;
  padding: 10px;
  margin-bottom: 10px;
}
.carNewinfoH2 {
  color: #f4f4f5;
  background: #909399;
  padding: 10px 0;
  text-indent: 20px;
  margin: 10px 0 20px;
  position: relative;
}
</style>
