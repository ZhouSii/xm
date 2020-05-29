<template>
  <div class="customerReportedDialog commoncss StyleNewinfoComponent">
    <el-dialog
      :visible="isShowCustomerReportedDialog"
      :modal-append-to-body="false"
      :modal="false"
      top="30vh"
      :close-on-click-modal="false"
      :before-close="handleClose"
      ref="dialog"
    >
      <el-form :model="customerReportedForm" ref="customerReportedForm" label-width="150px">
        <el-row style="margin-bottom:22px;">
          <h2 class="carNewinfoH2">
            内部权益管理
            <p class="aflcBusinessBtn">
             <el-button type="primary" size="medium" plain v-if="editType != 'view' && !chooseType" @click="handleClick('addItem')">新增权益</el-button>
             <el-button type="primary" size="medium" plain v-if="editType != 'view' && chooseType" @click="handleClick('conserve')">保存</el-button>
             <el-button type="primary" size="medium" plain v-if="editType != 'view' && chooseType" @click="handleClick('cancel')">取消</el-button>
            </p>
          </h2>
          <el-table
            :data="customerReportedForm.aflcBusinessInformationList"
            border
            ref="multipleTable"
            stripe
            align="center"
            tooltip-effect="dark"
            style="width: 100%"
          >
            <el-table-column prop="userStatusName" label="权益类型">
              <template slot-scope="scope">
                <span v-if="!scope.row.flag">{{ scope.row.userStatusName }}</span>
                <div v-else>
                  <el-select
                    v-model="scope.row.userStatus"
                    placeholder="请选择"
                    @change="complateName(scope.row.userStatus,scope.$index)"
                  >
                    <el-option
                      v-for="item in optionsBusinessInterests"
                      :key="item.id"
                      :label="item.name"
                      :value="item.code"
                      :disabled="item.disabled"
                    ></el-option>
                  </el-select>
                </div>
              </template>
            </el-table-column>
            <el-table-column label="所属组">
              <template slot-scope="scope">
                <span v-if="!scope.row.flag">{{ scope.row.groupName }}</span>
                <div v-else>
                  <!-- <span v-if="scope.$index==2||scope.$index==4">/</span> -->
                  <businessGroup
                    @inputObject="getObject(scope.$index,$event)"
                    v-model="scope.row.groupName"
                    ref="businessGroup"
                  />
                </div>
              </template>
            </el-table-column>
            <el-table-column label="所属人">
              <template slot-scope="scope">
                <!-- <span v-if="editType=='view'" >{{ scope.$index==2 || scope.$index==4 ? scope.row.belongCustomerService : scope.row.belongSalesmanName }}</span> -->
                <span v-if="!scope.row.flag">{{ scope.row.belongSalesmanName }}</span>
                <div v-else>
                  <!-- <Custom erSearch @returnCustomer = '(value)=>{getCustomer1(value,scope.$index)}' :customerName = "scope.row.belongCustomerService" ref="SalesmanName" v-if="scope.$index==2||scope.$index==4"/> -->
                  <selectBelong
                    :groupCode="scope.row.groupCode"
                    :belongSalesman="scope.row.belongSalesmanMobile"
                    @returnBelong="(value)=>{getReturnBelong(value,scope.$index)}"
                  />
                </div>
              </template>
            </el-table-column>
            <el-table-column prop="createTime" label="操作时间">
              <template slot-scope="scope">{{scope.row.createTime | parseTime}}</template>
            </el-table-column>
            <el-table-column prop="creater" label="操作人"></el-table-column>
            <el-table-column label="操作" width="100">
              <template slot-scope="scope">
                <el-button
                  size="medium"
                  type="warning"
                  :disabled="scope.row.id ? true : false"
                  plain
                  @click="handleClick('delet',scope.$index)"
                >删除</el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-row>
      </el-form>
      <el-row style="margin-bottom:22px;">
            <p class="aflcBusinessBtn">
              <el-button type="primary" plain icon="el-icon-success" @click="ChangeData(editType)" v-if="editType!=='view'">确 定</el-button>
                <el-button type="primary" plain icon="el-icon-error" @click="driverTemplateDialogFlag=false">取 消</el-button>
            </p>
      </el-row>
    </el-dialog>
  </div>
</template>
<script>
import { DicBusinessInterests } from '@/api/common.js'
import businessGroup from '@/components/selectTree/businessGroup' 
import selectBelong from '../../users/shipper/selectBelong'
export default {
  name: "customerReportedDialog",
  props: {
    isShowCustomerReportedDialog: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      optionsBusinessInterests: [], //权益类型选项
      chooseType: false,
      editType: 'view',
      customerReportedForm: {
        mobile: "", //手机号码
        aflcBusinessInformationList: [
            {
                flag: true, //是否有权限查看
                userStatusName:'我是谁', //权益类型name
                userStatus: '', //权益类型状态码
                groupName: '组', //所属组
                groupCode: '', //组状态码
                belongSalesmanMobile: '', //所属人电话
                belongSalesmanName: '所属人', //所属人
                createTime: '', //操作时间
                creater: '我', //操作人                
            }
        ]
      }
    };
  },
  components: {
      businessGroup,
      selectBelong
  },
  created() {
      this.getMoreInformation()
      this.aflcBusinessInformationList =  [
            {
                flag: true, //是否有权限查看
                userStatusName:'', //权益类型name
                userStatus: '', //权益类型状态码
                groupName: '', //所属组
                groupCode: '', //组状态码
                belongSalesmanMobile: '', //所属人电话
                belongSalesmanName: '', //所属人
                createTime: '', //操作时间
                creater: '我', //操作人                
            },
        ]
      console.log(this.aflcBusinessInformationList,'aflcBusinessInformationList')
  },
  methods: {
    //   点击关闭
    handleClose() {
        this.handleClick('cancel')
    },
    // 点击保存或者取消
    handleClick(type, index) {
      switch (type) {
        case "conserve":
          let pass = false;
          // console.log(this.customerReportedForm.aflcBusinessInformationList,this.xinzengform.aflcBusinessInformationList[this.xinzengform.aflcBusinessInformationList.length - 1])
          let newForm = this.customerReportedForm.aflcBusinessInformationList[
            this.customerReportedForm.aflcBusinessInformationList.length - 1
          ];
          if (
            newForm.userStatus == "" ||
            newForm.groupCode == "" ||
            newForm.belongSalesman == ""
          ) {
            pass = true;
          }

          if (!pass) {
            this.chooseType = false;
            this.customerReportedForm.aflcBusinessInformationList[
              this.customerReportedForm.aflcBusinessInformationList.length - 1
            ].flag = false;
            console.log('可提交')
          } else {
            return this.$message({
              type: "warning",
              message: "当前信息存在空值，不可保存!"
            });
          }
          break;
        case "cancel":
          this.$parent.isShowCustomerReportedDialog = false;
          this.customerReportedForm.aflcBusinessInformationList = [];
          break;
        case "delet":
          if (this.chooseType) {
            return this.$message({
              type: "warning",
              message: "请先保存或取消当前编辑内容!"
            });
          } else {
            this.customerReportedForm.aflcBusinessInformationList.splice(
              index,
              1
            );
          }
          break;
      }
    },
    // 所属组
    getObject(i, e) {
      //    console.log('i,e',i,e)
      this.customerReportedForm.aflcBusinessInformationList[i].groupName =
        e.groupName;
      this.customerReportedForm.aflcBusinessInformationList[i].groupCode =
        e.groupCode;
        // 滞空所属人数据
        const obj = {
            name: '',
            userId: '',
            mobile: '',
        }
        this.getReturnBelong(obj,i)
    },
    // 所属人
    getReturnBelong(val, key) {
      this.customerReportedForm.aflcBusinessInformationList[
        key
      ].belongSalesmanName = val.name;
      this.customerReportedForm.aflcBusinessInformationList[
        key
      ].belongSalesman = val.userId;
      this.customerReportedForm.aflcBusinessInformationList[
        key
      ].belongSalesmanMobile = val.mobile;
         console.log(this.customerReportedForm.aflcBusinessInformationList)
    },
    // 权益类型
    complateName(val, key) {
      // console.log('val,key',val,key)
      this.customerReportedForm.aflcBusinessInformationList[
        key
      ].userStatusName = this.optionsBusinessInterests.find(
        item => item.code == val
      )["name"];
      // console.log(this.xinzengform.aflcBusinessInformationList)
    },
     // 获取信息
    getMoreInformation(){
        DicBusinessInterests().then(res => {
            this.optionsBusinessInterests = res.data.filter(el => {
            return el.name != '注册';
            })
            })
    },
  }
};
</script>
<style lang="scss" scoped>
.customerReportedDialog {
  img {
    cursor: pointer;
    width: 100%;
  }
  .PopupPic {
    width: 0;
    height: 0;
    position: fixed;
    left: 15%;
    top: 20%;
    .el-dialog {
      .el-dialog__header {
        background-color: #fff;
        position: relative;
        border: 0 none;
        padding: 20px 0;
        background-color: #42485b;
        .el-icon-close {
          color: #999;
          position: absolute;
          right: 20px;
          top: 12px;
          font-size: 20px;
          cursor: pointer;
          &:hover {
            color: #409eff;
          }
        }
      }
      .showPictureBox {
        min-height: 700px;
        .PopupPicImg {
          width: 100%;
          height: 700px;
          img {
            display: none;
            width: 100%;
            height: 700px;
          }
        }
      }
    }
  }
}
</style>
