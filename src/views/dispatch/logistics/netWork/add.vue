<template>
  <div class="newNetWork commoncss">
    <el-dialog
      :title="formtitle"
      :close-on-click-modal="false"
      @open="reviseForms"
      v-el-drag-dialog
      top="5vh"
      width="60%"
      :visible="dialogFormVisible"
      @close="close"
    >
      <el-form
        :model="standForm"
        :rules="newrules"
        label-position="right"
        ref="ruleForm"
        :label-width="formLabelWidth"
      >
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item
              label="区代所在地："
              prop="agencyAreaCode"
              v-if="!isModify"
            >
              <getCityList
                class="chooseItem"
                @returnStr="getAreaDelegate"
                :isArea="true"
                v-model="standForm.agencyAreaCode"
                ref="areaDelegate"
              ></getCityList>
            </el-form-item>
            <el-form-item label="区代所在地：" class="is-required" v-else>
              <el-input v-model="standForm.agencyArea" disabled></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="区代：" prop="agencyId" v-if="!isModify">
              <el-select
                v-model="standForm.agencyId"
                @focus="getAreaAgency"
                clearable
                placeholder="请选择"
              >
                <el-option
                  v-for="item in optionseAreaAgency"
                  :key="item.id"
                  :label="item.agencyName"
                  :value="item.id"
                >
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="区代：" class="is-required" v-else>
              <el-input :value="standForm.agencyName" disabled></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="网点名称：" prop="pointName">
              <el-input v-model="standForm.pointName"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="网点电话：" prop="contactMobile">
              <el-input v-model="standForm.contactMobile" maxlength="20"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="网点所在物流园：" prop="parkId">
              <el-select
                v-model="standForm.parkId"
                filterable
                placeholder="请选择"
                @change="doPark"
              >
                <el-option
                  v-for="item in optionsCompanyPark"
                  :key="item.id"
                  :label="item.parkName"
                  :value="item.id"
                >
                  <span style="float: left">{{ item.parkName }}</span>
                  <span style="float: right; color: #8492a6; font-size: 13px"
                    >{{ item.province + item.city + item.area }}&nbsp;&nbsp;{{
                      "(" + item.detailAddress + ")"
                    }}</span
                  >
                </el-option>
              </el-select>
              <p style="text-align: right;">
                网点所在物流园不在当前列表中？
                <span
                  style="cursor: pointer;color: #409EFF;"
                  @click="dialogVisible = true"
                  >点击新增</span
                >
              </p>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="10">
            <el-form-item label="到货服务区域：" prop="endCode">
              <getCity
                class="chooseItem"
                @returnStr="getStrEnd"
                v-model="standForm.endCode"
                placeholderTxt="到货服务区域"
                ref="endArea"
              ></getCity>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="" prop="totalEndAreaCode" label-width="0px">
              <el-select
                v-model="standForm.totalEndAreaCode"
                multiple
                collapse-tags
                @focus="getEndAreaList"
                @change="handlerMultiple"
                clearable
                placeholder="选择到货服务区域，可多选"
              >
                <el-option
                  v-for="item in optionsNoArea"
                  :key="item.code"
                  :label="item.name"
                  :value="item.code"
                >
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row class="showServersAreaBox">
          <el-col :span="24" class="showServersArea">
            <el-tag
              v-for="tag in standForm.pointNetworkAreaList"
              :key="tag.totalArea"
              closable
              @close="handleClose(tag)"
              type=""
            >
              {{ tag.totalArea }}
            </el-tag>
          </el-col>
        </el-row>
        <h2>网点地址</h2>
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="省市区：" prop="totalArea">
              <el-input v-model="standForm.totalArea" disabled></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="详细地址：" prop="pointAddress">
              <el-input v-model="standForm.pointAddress"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <!-- <el-row>
          <h2 class="carNewinfoH2">
            地址定位
          </h2>
        </el-row> -->
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
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button
          type="primary"
          plain
          icon="el-icon-success"
          @click="submitForm('ruleForm')"
          :disabled="btnShow"
          >保 存</el-button
        >
        <el-button type="primary" plain icon="el-icon-error" @click="close"
          >取 消</el-button
        >
      </div>
    </el-dialog>

    <el-dialog
      title="新增物流园"
      class="batchImport"
      top="15vh"
      :modal="true"
      :visible="dialogVisible"
      custom-class="add-review"
      :close-on-click-modal="false"
      :modal-append-to-body="false"
      @close="close2"
      width="30%"
    >
      <div class="ifcancel">
        <el-form
          :model="form"
          :rules="rules"
          ref="ruleForm2"
          :label-width="formLabelWidth"
          label-position="right"
        >
          <el-form-item label="物流园名称：" prop="parkName">
            <el-input
              v-model="form.parkName"
              clearable
              maxlength="20"
            ></el-input>
          </el-form-item>
          <el-form-item label="物流园所在地：" prop="agencyId">
            <getCityList
              class="chooseItem"
              @returnStr="getStrStart"
              :isArea="true"
              v-model="form.areaCode"
              ref="startArea"
            ></getCityList>
          </el-form-item>
          <el-form-item label="详细地址：" prop="detailAddress">
            <el-input
              v-model="form.detailAddress"
              clearable
              maxlength="20"
            ></el-input>
          </el-form-item>
        </el-form>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button
          type="primary"
          plain
          icon="el-icon-success"
          @click="submitForm2('ruleForm2')"
          >确认</el-button
        >
        <el-button type="primary" plain icon="el-icon-error" @click="close2"
          >取消</el-button
        >
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { objectMerge2 } from "@/utils/";
import { getAreaAgent } from "@/api/dispatch/areaAgentSystem.js";
import getCityList from "@/components/GetCityList/chinaMap";
import getCity from "@/components/GetCityList/chinaMap1";
// import multipleSelection from '@/components/GetCityList/multipleSelection'
import {
  agentNetWorkAdd,
  agentNetWorkDetails,
  agentNetWorkUpdata
} from "@/api/dispatch/agentNetWork";
import { loadAmap } from "@/utils/";
import { getCompanyPark,newCompanyPark } from "@/api/dispatch/carrierPointNetwork.js";
import { getCityInfo } from "@/api/common";
import {REGEX} from '@/utils/validate';

export default {
  name: "newNetWork",
  props: {
    dialogFormVisible: {
      type: Boolean,
      required: true
    },
    formtitle: {
      type: String,
      required: false,
      default: "新增按区代配置平台分润规则"
    },
    isModify: {
      type: Boolean,
      default: false
    },
    changeForm: {
      type: Object
    }
  },
  components: {
    getCityList,
    getCity
    // multipleSelection
  },
  data() {
    var mobileCheck = (rule, value, callback) => {
        if(!value){
            callback(new Error('网点电话不能为空'));
        }
        else if(!REGEX.MOBILE.test(value) && !REGEX.TEL.test(value)) {
            callback(new Error('请输入正确的手机号或电话号码'));
        }else{
            callback()
        }
    };
    return {
      btnShow: false,
      formLabelWidth: "120px",
      dialogVisible: false,
      optionsCompanyPark: [], //物流园arr
      searchAddress: "", // 高德搜索
      showSearchWindow: false, // 显示搜索列表
      moveEnd: false, // 是否在map里已经移动过
      searchList: [], // 高德搜索列表
      optionsNoArea: [], //省市列表

      form: {
        parkName: "", //园区名称
        province: "", //省
        city: "", //市
        area: "", //区
        areaCode: "", //
        // totalArea:'',//所在地
        detailAddress: "" //详细地址
      },
      serversAreaTags: [], //到货服务区域arr
      standForm: {
        agencyAreaCode: "", //选择区代areacode
        totalEndAreaCode: [],
        endProvince: "",
        endCity: "",
        endCode: "",

        address: "", //详细地址
        agencyId: "", //区代ID
        agencyName: "", //区代名称
        area: "", //区
        areaCode: "", //区域code
        city: "", //市
        contactMobile: "", //网点联系人电话
        // contactName: "", //网点联系人
        latitude: "", //上传坐标纬度
        longitude: "", //上传坐标经度
        parkId: "", //所属物流园区id
        parkName: "", //物流园名称
        pointAddress: "", //网点地址
        // pointFile: "", //网点图片
        pointName: "", //网点名称
        pointNetworkAreaList: [
          //   {
          //     agencyPointId: "", //区代网点ID
          //     area: "", //区
          //     areaCode: "", //区域code
          //     city: "", //市
          //     province: "", //省
          //     // street: "", //街道
          //     // streetCode: "", //街道code
          //     totalArea: "" //省市区拼接区域
          //   }
        ],
        province: "", //省
        // publishTime: "", //网点发布时间
        // remark: "", //网点描述
        // serviceMobile: "", //客服电话
        totalArea: "" //省市区
      },
      optionseAreaAgency: [],
      newrules: {
        agencyAreaCode: {
          required: true,
          message: "请选择区代所在地",
          trigger: "change"
        },
        agencyId: { required: true, message: "请选择区代", trigger: "change" },
        pointName: {
          required: true,
          message: "请输入网点名称",
          trigger: "change"
        },
        contactMobile:{required: true, validator: mobileCheck,trigger: 'change'},
        endCode:{required: true,  message: "请选择到货服务区域省市",trigger: 'change'},
        totalEndAreaCode:{ type:'array',required: true,message: "请选择到货服务区域",trigger:'change'},
        totalArea:{required: true,  message: "根据地图选择省市区",trigger: 'change'},
        pointAddress:{required: true,  message: "根据地图选择详细地址",trigger: 'change'},
      },
      rules: {}
    };
  },
  mounted() {},
  methods: {
    handlerMultiple(v) {
    //   console.log("val:", v);
      let multipleArr = [];
      v.forEach(el => {
        this.optionsNoArea.forEach(item => {
          let baseInfo;
          if (el === item.code) {
            baseInfo = {
              // agencyPointId: "", //区代网点ID
              area: item.name, //区
              areaCode: item.code, //区域code
              city: this.standForm.endCity, //市
              province: this.standForm.endProvince, //省
              // street: "", //街道
              // streetCode: "", //街道code
              totalArea: `${this.standForm.endProvince}${this.standForm.endCity}${item.name}` //省市区拼接区域
            };
            multipleArr.push(baseInfo);
          }
        });
      });
      this.standForm.pointNetworkAreaList = multipleArr;
    },
    handleClose(tag) {
      this.standForm.totalEndAreaCode.splice(
        this.standForm.pointNetworkAreaList.indexOf(tag),
        1
      );
      this.standForm.pointNetworkAreaList.splice(
        this.standForm.pointNetworkAreaList.indexOf(tag),
        1
      );
      // console.log('this.standForm.pointNetworkAreaList.indexOf(tag)',)
    },
    getEndAreaList() {
      this.optionsNoArea = [];
      if (this.standForm.endCode == "") {
        return this.$message({
          type: "warning",
          message: "请先选择到达地！"
        });
      } else {
        getCityInfo(this.standForm.endCode)
          .then(res => {
            setTimeout(() => {
              this.optionsNoArea = res.data;
              if (this.optionsNoArea == [] && this.standForm.endCode) {
                this.standForm.totalEndAreaCode = [];
              }
            }, 200);
          })
          .catch(err => {
            this.standForm.totalEndAreaCode = [];
          });
      }
    },
    getStrEnd(d) {
      // this.searchInfo.belongCityName = (!d.province&&!d.city&&!d.area) ? '': `${this.getValue(d.province)}${this.getValue(d.city)}${this.getValue(d.area)}`.trim();
      this.standForm.totalEndAreaCode = [];
      this.standForm.endProvince = d.province ? d.province.name : ""; //结束省名称
      this.standForm.endCity = d.city ? d.city.name : ""; //结束市名称
      this.standForm.endCode = d.city ? d.city.code : "";
    },
    getCenter(lnglat) {
    //   console.log(lnglat);
        loadAmap(true).then(res => {
            this.map = new AMap.Map(this.$refs.allmap, {
              zoom: 16,
              scrollWheel: false,
              dragEnable: true,
              center: lnglat
            });
            // this.map.addControl(
            //   new AMap.ToolBar({
            //     liteStyle: true
            //   })
            // );
            this.map.on("moveend", e => {
              this.moveEnd = true;
            });
            AMapUI.loadUI(["misc/PositionPicker"], PositionPicker => {
              const positionPicker = new PositionPicker({
                mode: "dragMap",
                map: this.map
              });
              positionPicker.on("success", positionResult => {
                //   console.log(positionResult);
                this.city = positionResult.regeocode.addressComponent.city;
                this.standForm.longitude = positionResult.position.lng;
                this.standForm.latitude = positionResult.position.lat;
                if (this.moveEnd) {
                  this.standForm.pointAddress = positionResult.address;
                  this.standForm.areaCode =
                    positionResult.regeocode.addressComponent.adcode;
                  this.standForm.province =
                    positionResult.regeocode.addressComponent.province;
                  this.standForm.city =
                    positionResult.regeocode.addressComponent.city;
                  this.standForm.area =
                    positionResult.regeocode.addressComponent.district;
      
                  this.standForm.totalArea =
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
    toLoadUI(e) {
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
    doPark(val) {
    //   console.log("val", val);
      let tab = this.optionsCompanyPark.filter(el => {
        return el.id == val;
      });
      let d = tab[0];
      this.standForm.parkName = d.parkName;
    },
    getAreaDelegate(d) {
      this.standForm.agencyArea =
        !d.province && !d.city && !d.area && !d.town
          ? ""
          : `${this.getValue(d.province)}${this.getValue(
              d.city
            )}${this.getValue(d.area)}${this.getValue(d.town)}`.trim();
      this.standForm.agencyAreaCode = d.area ? d.area.code : "";
      this.standForm.agencyId = "";
    },
    getStrStart(d) {
      // console.log('getStrStart',d)
      // this.from.dedicateArea = (!d.province&&!d.city&&!d.area&&!d.town) ? '': `${this.getValue(d.province)}${this.getValue(d.city)}${this.getValue(d.area)}${this.getValue(d.town)}`.trim();
      this.form.province = d.province ? d.province.name : ""; //省名称
      this.form.city = d.city ? d.city.name : ""; //市名称
      this.form.area = d.area ? d.area.name : "";
      this.form.areaCode = d.area ? d.area.code : "";
    },
    getValue(obj) {
      return obj ? obj.value : "";
    },
    loadCompanyPark() {
      getCompanyPark().then(res => {
        this.optionsCompanyPark = res.data;
      });
    },
    getAreaAgency() {
      this.optionseAreaAgency = [];
      if (this.standForm.agencyAreaCode == "") {
        return this.$message({
          type: "warning",
          message: "请先选择区代所在地！"
        });
      } else {
        getAreaAgent(this.standForm.agencyAreaCode)
          .then(res => {
            setTimeout(() => {
              this.optionseAreaAgency = res.data;
              if (this.optionseAreaAgency == [] && this.standForm.areaCode) {
                this.standForm.agencyId = "";
                this.standForm.agencyName = "";
              }
            }, 200);
          })
          .catch(err => {
            this.standForm.agencyId = "";
            this.standForm.agencyName = "";
          });
      }
    },
    reviseForms() {
      this.$nextTick(() => {
        if (this.isModify) {
          agentNetWorkDetails(this.changeForm.id)
            .then(res => {
              this.standForm = objectMerge2(this.standForm, res.data);
              this.getCenter(
                this.standForm.longitude && this.standForm.latitude
                  ? [this.standForm.longitude, this.standForm.latitude]
                  : ""
              );
              this.showress(
                this.standForm.pointNetworkAreaList[0].areaCode,
                false
              );
              this.standForm.endCode = Number(
                this.standForm.pointNetworkAreaList[0].areaCode.slice(0, 4) +
                  "00"
              );
              this.getEndAreaList();
              this.standForm.totalEndAreaCode = [];
              this.standForm.pointNetworkAreaList.forEach(el => {
                this.standForm.totalEndAreaCode.push(el.areaCode * 1);
              });
              console.log("this.standForm", this.standForm);
            })
            .catch(err => {});
        }
        this.loadCompanyPark();

        this.getCenter("");
      });
      // if(this.isModify){
      //     agencyConfigDetails(this.changeForm.id).then(res => {
      //         this.standForm = objectMerge2(res.data);
      //     })
      //     // this.$set(this.standForm, 'timeVal', [this.changeForm.rewardStartDate,this.changeForm.rewardEndDate])
      // }else{
      //     this.clearForms();
      // }
    },
    showress(d, ifArea) {
      // console.log('showress',d)
      // this.isTag = true;
      var cityStr = d.slice(0, 4) + "00";
      var provinceStr = d.slice(0, 2) + "0000";
      this.showAddress = ifArea
        ? {
            province: provinceStr,
            city: cityStr,
            area: d
          }
        : {
            province: provinceStr,
            city: cityStr
          };
      // if(!this.isView){
      this.$refs.endArea.doActions(
        ifArea
          ? [
              this.showAddress.province * 1,
              this.showAddress.city * 1,
              this.showAddress.area * 1
            ]
          : [this.showAddress.province * 1, this.showAddress.city * 1]
      );
      // }
      // console.log(this.showAddress)
    },
    close() {
      if (this.dialogFormVisible) {
        this.$emit("update:dialogFormVisible", false);
        // console.log(
        //   "this.$options.data()",
        //   this.$options.data(),
        //   this.$options
        // );
        this.$refs.ruleForm.resetFields();
        this.standForm = this.$options.data().standForm;
        this.$emit("renovate");
        this.btnShow = false;
        this.searchAddress = "";
        this.searchList = [];
        this.map = null;
        this.moveEnd = false;
        this.$refs.endArea.clearData();
        if (!this.isModify) {
          this.$refs.areaDelegate.clearData();
        }
      }
    },
    //初始化选择项数据
    init() {},
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.btnShow = true;
          this.completeName();
          let forms = objectMerge2(this.standForm);
          let standarFunction = this.isModify
            ? agentNetWorkUpdata(forms)
            : agentNetWorkAdd(forms);
          standarFunction
            .then(res => {
              this.$message({
                type: "success",
                message: this.formtitle + "成功！"
              });
              this.close();
            })
            .catch(err => {
              this.$message({
                type: "info",
                message:
                  "操作失败，原因：" +
                  (err.errorInfo ? err.errorInfo : err.text)
              });
              this.btnShow = false;
            });
        } else {
          this.$message({
            type: "warning",
            message: "请填写完整数据!"
          });
          return false;
        }
      });
    },
    completeName() {
      if (!this.isModify) {
        this.standForm.agencyName = this.optionseAreaAgency.find(
          item => item.id == this.standForm.agencyId
        )["agencyName"];
        //     this.standForm.companyName = this.optionseAreaAgency.find(
        //       item => item.id == this.standForm.agencyId
        //     )["companyName"];
      }
    },
    close2() {
      this.$refs.ruleForm2.resetFields();
      this.dialogVisible = false;
      this.form = this.$options.data().form;
    },
    submitForm2(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          let standFrom = objectMerge2(this.form);
          // console.log('standFromstandFrom',standFrom)
          newCompanyPark(standFrom)
            .then(res => {
              this.$message({
                type: "success",
                message: "新增物流园成功"
              });
              this.loadCompanyPark();
              this.close2();
            })
            .catch(err => {
              this.$message({
                type: "warning",
                message:
                  "操作失败，原因：" +
                  (err.errorInfo ? err.errorInfo : err.text)
              });
            });
        } else {
          this.$message({
            type: "warning",
            message: "请填写完整数据!"
          });
          return false;
        }
      });
    }
  }
};
</script>

<style rel="stylesheet/scss" lang="scss">
.newNetWork {
    h2{
        border-bottom: solid 2px #e0e0e0;
        line-height: 25px;
        font-size: 18px;
        padding: 0px 0 18px 0;
        color: #333333;
        font-weight: bold;
        font-stretch: normal;
        margin-bottom: 20px;
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
  .showServersAreaBox {
    padding-left: 120px;
    .showServersArea {
      margin-bottom: 22px;
      border: 1px dashed #ccc;
      min-height: 50px;
      padding: 0 5px;
      line-height: 46px;
      .el-tag + .el-tag {
        margin-left: 5px;
      }
    }
  }
}
</style>
