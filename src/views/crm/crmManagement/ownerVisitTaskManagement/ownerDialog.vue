<template>
  <div class="StyleNewinfoComponent commoncss">
    <el-dialog
      :title="formData.type === 'add' ? '新建货主拜访任务' : '修改货主拜访任务'"
      :visible="formData.show"
      width="90%"
      top="2vh"
      :before-close="handleClose"
    >
      <el-form :model="formData" ref="formData" :rules="rulesForm" :label-width="formLabelWidth">
        <el-row>
          <h2 class="carNewinfoH2">基本信息</h2>
          <el-col :span="12">
            <el-form-item label="名称:">
              <el-input v-model="formData.taskName" :maxlength="20"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="开始时间:">
              <el-date-picker
                v-model="$parent.formData.startTime"
                type="date"
                placeholder="选择日期"
                format="yyyy-MM-dd"
                value-format="yyyy-MM-dd"
              ></el-date-picker>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="结束时间:">
              <el-date-picker
                v-model="$parent.formData.endTime"
                type="date"
                placeholder="选择日期"
                format="yyyy-MM-dd"
                value-format="yyyy-MM-dd"
              ></el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="执行部门:">
              <businessGroup
                @inputObject="getObject($event)"
                v-model="$parent.formData.groupName"
                ref="businessGroup"
              />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="执行人:">
              <selectBelong
                :groupCode="$parent.formData.groupCode"
                :belongSalesman="$parent.formData.belongSalesman"
                @returnBelong="(value)=>{getReturnBelong(value)}"
              />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="预计成本:">
              <el-input v-model="formData.preCost" maxlength="10"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="任务类型:">
              <el-select v-model="formData.taskType" placeholder="请选择">
                <el-option
                  v-for="item in taskTypeList"
                  :key="item.code"
                  :label="item.name"
                  :value="item.code"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="任务说明:">
              <el-input :maxlength="100" v-model="formData.intro"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20" v-viewer>
          <h2 class="carNewinfoH2">货主列表</h2>
          <el-col :span="24" class="btns_bottom">
            <el-button type="primary" size="medium" plain @click="handleClick('export')">导入EXCEL</el-button>
            <input
              type="file"
              ref="input"
              id="uploadFile"
              class="upLoadInput"
              @change="importf(this)"
              accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
            />
            <el-button type="primary" size="medium" plain @click="handleClick('add')">新增</el-button>
            <el-button type="primary" size="medium" plain @click="handleClick('delete')">删除</el-button>
          </el-col>
        </el-row>

        <el-row style="margin-bottom:22px;">
          <el-table
            :data="$parent.formData.ownerList"
            border
            ref="multipleTable"
            stripe
            align="center"
            tooltip-effect="dark"
            style="width: 100%"
            @selection-change="getSelection"
            @row-click="clickDetails"
            height="500"
          >
            <el-table-column label="序号" type="selection"></el-table-column>
            <el-table-column prop="mobile" label="手机号码"></el-table-column>
            <el-table-column prop="companyName" label="公司名称"></el-table-column>
            <el-table-column prop="contacts" label="联系人"></el-table-column>
            <el-table-column prop="potentialGradeName" label="同城潜力等级"></el-table-column>
            <el-table-column prop="shipperType" label="货主类型"></el-table-column>
            <el-table-column prop="belongCity" label="所在地"></el-table-column>
            <el-table-column prop="companyAddress" label="企业地址"></el-table-column>
            <el-table-column prop="tradeAreaName" label="所属商圈"></el-table-column>
            <el-table-column prop="belongGroup" label="所属业务组"></el-table-column>
            <el-table-column prop="belongSalesman" label="所属业务员"></el-table-column>
            <el-table-column prop="belongIndustry" label="所属行业"></el-table-column>
          </el-table>
        </el-row>
        <el-row>
          <h2 class="carNewinfoH2">任务配置</h2>
          <el-col :span="8">
            <el-form-item label="是否需要上门拜访:">
              <el-radio v-model="formData.isNeedVisit" label="1">是</el-radio>
              <el-radio v-model="formData.isNeedVisit" label="0">否</el-radio>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item label="优惠券活动:" prop="status">
              <el-select
                style="width: 100%"
                v-model="$parent.formData.couponId"
                clearable
                placeholder="请选择优惠券活动"
              >
                <el-option
                  v-for="item in $parent.formData.couponActivityList"
                  :key="item.id"
                  :label="item.activityName"
                  :value="item.id"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col>
            <el-form-item label="优惠券发放方式:">
              <el-radio v-model="formData.provideWay" label="1">活动开始自动发放</el-radio>
              <el-radio v-model="formData.provideWay" label="0">活动开始手动发放</el-radio>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button icon="el-icon-success" type="primary" @click="sure">确 认</el-button>
        <el-button icon="el-icon-error" @click="handleClose">取 消</el-button>
      </div>
    </el-dialog>

    <el-dialog
      class="StyleNewinfoComponent commoncss"
      width="90%"
      title="添加货主"
      :visible.sync="innerFormData.isShow"
      append-to-body
    >
      <ul class="toBodyUl">
        <li>手机号码</li>
        <li>公司名称</li>
        <li>联系人</li>
        <li>同城潜力等级</li>
        <li>货主类型</li>
        <li>所在地</li>
        <li>企业地址</li>
        <li>所属商圈</li>
        <li>所属业务组</li>
        <li>所属业务员</li>
        <li>所属行业</li>
      </ul>
      <ul class="toBodyUl">
        <li>
          <el-input v-model="innerFormData.mobile" type="number" placeholder="输入号码搜索"></el-input>
        </li>
        <li>
          <el-tooltip class="item" effect="dark" :content="innerFormData.companyName" placement="top">
            <div>{{ innerFormData.companyName }}</div>
          </el-tooltip>
        </li>
        <li>
           <el-tooltip class="item" effect="dark" :content="innerFormData.contacts" placement="top">
            <div>{{ innerFormData.contacts }}</div>
          </el-tooltip>
        </li>
        <li>
           <el-tooltip class="item" effect="dark" :content="innerFormData.potentialGradeName" placement="top">
            <div>{{ innerFormData.potentialGradeName }}</div>
          </el-tooltip>
        </li>
        <li>
           <el-tooltip class="item" effect="dark" :content="innerFormData.shipperType" placement="top">
            <div>{{ innerFormData.shipperType }}</div>
          </el-tooltip>
        </li>
        <li>
           <el-tooltip class="item" effect="dark" :content="innerFormData.belongCity" placement="top">
            <div>{{ innerFormData.belongCity }}</div>
          </el-tooltip>
        </li>
        <li>
           <el-tooltip class="item" effect="dark" :content="innerFormData.companyAddress" placement="top">
            <div>{{ innerFormData.companyAddress }}</div>
          </el-tooltip>
        </li>
        <li>
           <el-tooltip class="item" effect="dark" :content="innerFormData.tradeAreaName" placement="top">
            <div>{{ innerFormData.tradeAreaName }}</div>
          </el-tooltip>
        </li>
        <li>
           <el-tooltip class="item" effect="dark" :content="innerFormData.belongGroup" placement="top">
            <div>{{ innerFormData.belongGroup }}</div>
          </el-tooltip>
        </li>
        <li>
           <el-tooltip class="item" effect="dark" :content="innerFormData.belongSalesman" placement="top">
            <div>{{ innerFormData.belongSalesman }}</div>
          </el-tooltip>
        </li>
        <li>
          <el-tooltip class="item" effect="dark" :content="innerFormData.belongIndustry" placement="top">
            <div>{{ innerFormData.belongIndustry }}</div>
          </el-tooltip>
        </li>
      </ul>

      <div slot="footer" class="dialog-footer">
        <el-button icon="el-icon-success" type="primary" @click="innerClick('sure')">确 认</el-button>
        <el-button icon="el-icon-error" @click="innerClick('close')">取 消</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import XLSX from "xlsx";
import {
  checkShipper,
  platformAdd,
  platformUpdate,
  deleteDetail
} from "@/api/crm/ownerVisitTaskManagement.js";
import businessGroup from "@/components/selectTree/businessGroup";
import selectBelong from "./belongMan";
import { getDictionary } from "@/api/common.js";
import { debounce } from '../../../../utils';
export default {
  props: {
    formData: {
      type: Object
    }
  },
  data() {
    return {
      rulesForm: {},
      formLabelWidth: "150px",
      excelData: [], //导入excel或查询的表
      saveData: [], //被选中的数据
      innerFormData: {
        //新增数据弹窗
        isShow: false,
        mobile: "", //手机号码
        companyName: "", //公司名称
        contacts: "", //联系人
        potentialGradeName: "", //同城潜力等级
        shipperType: "", //货主类型
        belongCity: "", //所在地
        companyAddress: "", //企业地址
        tradeAreaName: "", //所属商圈
        belongGroup: "", //所属业务组
        belongSalesman: "", //所属业务员
        belongIndustry: "" //所属行业
      },
      taskTypeList: [] //任务类型列表
    };
  },
  created() {},
  watch: {
    innerFormData: {
      handler(val) {
        if (val.mobile && val.mobile.length && val.mobile.length === 11) {
          this.seachMobile();
        }
      },
      deep: true
    },
    'formData.preCost'(newVal,oldVal) {
      if ( !!newVal && isNaN(newVal) ) {
        let newValNum = newVal.replace(/[^0-9]/ig,"");
        this.$parent.formData.preCost = newValNum
      }
    },
    // formData: {
    //   handler(val) {
    //     let obj = JSON.parse(JSON.stringify(this.formData))
    //     this.formData.taskName = obj.taskName
    //     this.formData.preCost = obj.preCost
    //     this.formData.intro = obj.intro
    //     this.formData.isNeedVisit = obj.isNeedVisit
    //     this.formData.provideWay = obj.provideWay
    //   },
    //   deep: true
    // },
    'formData.show'(val) {
        if ( val ) {
          this.$parent.formData = JSON.parse(JSON.stringify(this.formData))
        }
    }
  },
  components: {
    businessGroup,
    selectBelong
  },
  methods: {
    // 获取被选中的数据
    getSelection(item) {
      this.saveData = item;
    },
    // 点击行选中与取消
    clickDetails(item) {
      this.$refs.multipleTable.toggleRowSelection(item);
    },
    // 内部弹窗确认与取消
    innerClick(type) {
      if (type === "sure") {
        // 确认
        if (this.innerFormData.companyName != "") {
          let isSame = false;
          this.formData.ownerList.forEach(item => {
            if (item.mobile == this.innerFormData.mobile) {
              isSame = true;
              this.$message.info("该任务货主已存在");
              return false;
            }
          });
          if (!isSame) {
            this.$parent.formData.ownerList.unshift(this.innerFormData);
            this.$forceUpdate();
          }
        } else {
          this.$message.info("暂无数据添加");
          return false;
        }
      }

      this.innerFormData = {
        //新增数据弹窗
        isShow: false,
        mobile: "", //手机号码
        companyName: "", //公司名称
        contacts: "", //联系人
        potentialGradeName: "", //同城潜力等级
        shipperType: "", //货主类型
        belongCity: "", //所在地
        companyAddress: "", //企业地址
        tradeAreaName: "", //所属商圈
        belongGroup: "", //所属业务组
        belongSalesman: "", //所属业务员
        belongIndustry: "" //所属行业
      };
    },
    // 下拉数据字典
    getMoreInformation() {
      //货主任务类型
      getDictionary("AF08401").then(res => {
        this.taskTypeList = res.data;
      });
    },
    // 获取部门执行人及部门执行人code
    getReturnBelong(val) {
      this.$parent.formData.belongSalesmanName = val.name;
      this.$parent.formData.belongSalesmanId = val.id;
      this.$parent.formData.belongSalesmanMobile = val.mobile;
    },
    // 获取执行部门及部门code值
    getObject(e) {
      this.$parent.formData.groupName = e.groupName;
      this.$parent.formData.groupCode = e.groupCode;
      this.$parent.formData.groupId = e.id;
      // 选取部门后执行人一栏先清空
      this.$parent.formData.belongSalesmanMobile = ''
      this.$parent.formData.belongSalesmanId = ''
      this.$parent.formData.belongSalesmanName = ''
    },

    // 搜索是否有该号码的货主信息
    seachMobile() {
      var params = {
        taskType: "AF0840101", //盘活还是拉新，目前只有盘活AF0840101
        mobile: this.innerFormData.mobile
      };
      checkShipper(params)
        .then(res => {
          if (res.status === 200) {
            let obj = res.data;
            this.innerFormData = Object.assign(this.innerFormData, obj);
            this.$forceUpdate();
          } else {
            this.$message.error(res.errorInfo);
          }
        })
        .catch(err => {
          this.$message.error(err.errorInfo);
        });
    },
    // 关闭弹窗
    handleClose() {
      this.$parent.formData = {
        type: "add", //弹窗类型
        show: false, //是否显示弹窗
        //   基本信息栏
        name: "名称", //名称
        startTime: "", //开始时间
        endTime: "", //结束时间
        // executive: "", 
        // executiveMan: "", 
        projectedCost: "", // 预计成本
        taskType: "", //任务类型
        taskSpecification: "", // 任务说明
        // 货主列表栏
        ownerList: [], //货主列表
        // 任务配置栏
        isHomeVisits: "0", //是否需要上门拜访，0是，1否
        couponActivity: "", //优惠劵活动
        couponDisbursement: "0", //优惠券发放方式
        belongSalesmanName: null, //执行人
        belongSalesmanId: null, //执行人id
        belongSalesmanMobile: null,
        groupName: null, //执行部门
        groupCode: null, //执行部门code
        couponActivityList: this.formData.couponActivityList
      }
    },
    //   导入，新增，删除任务货主
    handleClick(type) {
      const self = this;
      if (type === "add") {
        // 新增
        self.innerFormData.isShow = true;
      } else if (type === "export") {
        // 导入excel
        self.$refs.input.click();
      } else {
        // type === 'delete' 删除
        console.log(self.saveData)
        // return false
        if (self.saveData.length > 0) {
          let idArr = [];
          self.saveData.forEach(item => {
            if (!!item.id) {
              idArr.push(item.id);
            }
          });
          // 后端更新已有id却被删除的数据
          if (idArr.length > 0) {
            deleteDetail(idArr,this.formData.taskId)
              .then(res => {
                if ( res.status ===200 ) {
                  self.$message.success('删除成功');
                } else {
                  self.$message.error(res.errorInfo);
                }
              })
              .catch(err => {
                self.$message.error(err.errorInfo);
              });
          }

          // 前端删除选中数组
           self.$parent.formData.ownerList = self.$parent.formData.ownerList.filter(item=>{
                return self.saveData.every(item2=>{
                    return item != item2;
                })
            })
            self.saveData = []

        } else {
          // 无数据时提示
          self.$message.info("请先选择您要操作的任务");
        }
      }
    },
    // 点击确认提交
    sure() {
      const startTime = new Date(this.formData.startTime).getTime();
      const endTime = new Date(this.formData.endTime).getTime();
        if(endTime < startTime ) {
          this.$message.info('结束时间不能小于开始时间')
          return false
        }

      let list = []
      this.$parent.formData.ownerList.forEach(item => {
          if ( !item.id ) {
            list.push({
              "shipperId": item.shipperId,
              "mobile": item.mobile
            })
          }
        })
     
      let params = {
        list: list,
        task: {
          couponId: !!this.$parent.formData.couponId ? this.$parent.formData.couponId : null, //优惠券活动
          endTime: !!this.$parent.formData.endTime ? this.$parent.formData.endTime : null, //结束时间
          groupId: !!this.$parent.formData.groupId ? this.$parent.formData.groupId : null, //执行部门id
          intro: !!this.formData.intro ? this.formData.intro : null, //任务说明
          isNeedVisit: this.formData.isNeedVisit === '1' ? 1 : 0, //是否需要拜访,1需要，0不需要
          preCost: !!this.formData.preCost ? this.formData.preCost : null, //预计成本
          provideWay: this.formData.provideWay === '1' ? 1 : 0, //优惠券发放方式(1: 自动，0: 手动)
          salesmanId: !!this.$parent.formData.belongSalesmanId ? this.$parent.formData.belongSalesmanId : null, //执行人id
          startTime: !!this.$parent.formData.startTime ? this.$parent.formData.startTime : null, //开始时间
          taskName: !!this.formData.taskName ? this.formData.taskName : null, //任务名称
          taskType: !!this.$parent.formData.taskType ? this.$parent.formData.taskType : null, //任务类型
        }
      };
      //  console.log(params,'paramsparamsparams',this.$parent.formData.ownerList)

      if (this.$parent.formData.type === "add") {
        // 新建
        platformAdd(params).then(res => {
          if ( res.status === 200 ) {
            this.$message.success('添加成功');
            this.$parent.formData = {
              type: "add", //弹窗类型
              show: false, //是否显示弹窗
              //   基本信息栏
              name: "名称", //名称
              startTime: "", //开始时间
              endTime: "", //结束时间
              // executive: "", 
              // executiveMan: "", 
              projectedCost: "", // 预计成本
              taskType: "", //任务类型
              taskSpecification: "", // 任务说明
              // 货主列表栏
              ownerList: [], //货主列表
              // 任务配置栏
              isHomeVisits: "0", //是否需要上门拜访，0是，1否
              couponActivity: "", //优惠劵活动
              couponDisbursement: "0", //优惠券发放方式
              belongSalesmanName: null, //执行人
              belongSalesmanId: null, //执行人id
              belongSalesmanMobile: null,
              groupName: null, //执行部门
              groupCode: null, //执行部门code
              couponActivityList: this.formData.couponActivityList
            }
            this.$parent.query()
          } else {
            this.$message.info(res.errorInfo);
          }
            
          }).catch(err => {
             this.$message.error(err.errorInfo);
          })
      } else {
        // 修改
        params.task.id = !!this.formData.id ? this.formData.id : null;
        // platformUpdate
        platformUpdate(params).then(res => {
          if ( res.status === 200 ) {
            this.$message.success('修改成功');
            this.$parent.formData = {
              type: "add", //弹窗类型
              show: false, //是否显示弹窗
              //   基本信息栏
              name: "名称", //名称
              startTime: "", //开始时间
              endTime: "", //结束时间
              // executive: "", 
              // executiveMan: "", 
              projectedCost: "", // 预计成本
              taskType: "", //任务类型
              taskSpecification: "", // 任务说明
              // 货主列表栏
              ownerList: [], //货主列表
              // 任务配置栏
              isHomeVisits: "0", //是否需要上门拜访，0是，1否
              couponActivity: "", //优惠劵活动
              couponDisbursement: "0", //优惠券发放方式
              belongSalesmanName: null, //执行人
              belongSalesmanId: null, //执行人id
              belongSalesmanMobile: null,
              groupName: null, //执行部门
              groupCode: null, //执行部门code
              couponActivityList: this.formData.couponActivityList
            }
            this.$parent.query()
          } else {
            this.$message.info(res.errorInfo);
          }
            
          }).catch(err => {
             this.$message.error(err.errorInfo);
          })
      }
    },
    // 读取导入的excel表
    importf(obj) {
      let self = this;
      this.file = event.currentTarget.files[0];
      var rABS = false; //是否将文件读取为二进制字符串
      var file = this.file;

      FileReader.prototype.readAsBinaryString = function(f) {
        var binary = "";
        var rABS = false; //是否将文件读取为二进制字符串
        var pt = this;
        var workbook; //读取完成的数据
        // var excelData;
        var reader = new FileReader();
        reader.onprogress = function(e) {
          let total = file.size;
          self.progress = (e.loaded / total) * 100;
        };
        reader.onload = function(e) {
          try {
            var bytes = new Uint8Array(reader.result);
            var length = bytes.byteLength;
            for (var i = 0; i < length; i++) {
              binary += String.fromCharCode(bytes[i]);
            }
            if (rABS) {
              workbook = XLSX.read(btoa(fixdata(binary)), {
                //手动转化
                type: "base64"
              });
            } else {
              workbook = XLSX.read(binary, {
                type: "binary"
              });
            }
            // excelData = [];
          } catch (e) {
            self.$message.info("文件类型不正确");
            return;
          }
          var fromTo = "";
          for (var sheet in workbook.Sheets) {
            if (workbook.Sheets.hasOwnProperty(sheet)) {
              fromTo = workbook.Sheets[sheet]["!ref"];
              self.excelData = self.excelData.concat(
                XLSX.utils.sheet_to_json(workbook.Sheets[sheet])
              );
            }
          }
          let arrs = [];
          self.excelData.forEach(item => {
            arrs.push({
              mobile: item["手机号码"],
              companyName: item["公司名称"],
              contacts: item["联系人"],
              potentialGradeName: item["同城潜力等级"],
              shipperType: item["货主类型"],
              belongCity: item["所在地"],
              companyAddress: item["企业地址"],
              tradeAreaName: item["所属商圈"],
              belongGroup: item["所属业务组"],
              belongSalesman: item["所属业务员"],
              belongIndustry: item["所属行业"],
              shipperId: item["货主id"],
            });
          });
          self.$parent.formData.ownerList = self.$parent.formData.ownerList.concat(
            arrs
          );
        };
        reader.readAsArrayBuffer(f);
      };
      var reader = new FileReader();
      if (rABS) {
        reader.readAsArrayBuffer(file);
      } else {
        reader.readAsBinaryString(file);
      }
      document.getElementById('uploadFile').value = null;
    }
  },
  mounted() {
    this.getMoreInformation();
  },
  destroyed() {
    this.excelData = []
  }
};
</script>
<style lang="scss" scoped>
.btns_bottom {
  margin-bottom: 10px;
  position: relative;
  .upLoadInput {
    position: absolute;
    left: 10px;
    right: 0;
    width: 110px;
    height: 36px;
    overflow: hidden;
    // visibility: hidden;
    opacity: 0;
    z-index: -1;
  }
}
.toBodyUl {
  width: 100%;
  text-align: center;
  line-height: 40px;
  height: 40px;
  // display: flex;
  li {
    width: 9%;
    float: left;
    border: 1px solid #ccc;
    margin-top: -1px;
    margin-right: -1px;
    height: 42px;
    div {
      overflow: hidden;
      text-overflow:ellipsis;
      white-space: nowrap;
      line-height: 40px;
      text-align: center;
    }
    & /deep/ .el-input__inner {
      padding: 0;
      text-align: center;
      border: none;
    }
  }
}
</style>