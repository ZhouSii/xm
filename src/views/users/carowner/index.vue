<template>
  <div class="carOwner tabsWrap">
    <el-tabs v-model="CarActiveName" type="card" @tab-click="handleClick">
      <el-tab-pane label="全部" name="first" v-if="$_has_permission('DRIVER_MANAGE_LIST_ALL')">
        <Total :isvisible="CarActiveName === 'first'"></Total>
      </el-tab-pane>
      <el-tab-pane
        label="未认证"
        name="second"
        v-if="$_has_permission('DRIVER_MANAGE_LIST_UNVALIDAT')"
      >
        <Unauthorized :isvisible="CarActiveName === 'second'"></Unauthorized>
      </el-tab-pane>
      <el-tab-pane
        label="待认证"
        name="third"
        v-if="$_has_permission('DRIVER_MANAGE_LIST_VALIDATING')"
      >
        <toBeCertified :isvisible="CarActiveName === 'third'"></toBeCertified>
      </el-tab-pane>
      <el-tab-pane label="车辆待审核" name="sixth">
        <auditCar :isvisible="CarActiveName === 'sixth'"></auditCar>
      </el-tab-pane>
      <el-tab-pane
        label="已认证"
        name="fourth"
        v-if="$_has_permission('DRIVER_MANAGE_LIST_VALIDATED')"
      >
        <authenticatedcomponent :isvisible="CarActiveName === 'fourth'"></authenticatedcomponent>
      </el-tab-pane>
      <el-tab-pane
        label="认证不通过"
        name="fifth"
        v-if="$_has_permission('DRIVER_MANAGE_LIST_VALIDATFAIL')"
      >
        <unPassCertification :isvisible="CarActiveName === 'fifth'"></unPassCertification>
      </el-tab-pane>
      <el-tab-pane label="车辆认证不通过" name="seventh">
        <auditFailCar :isvisible="CarActiveName === 'seventh'"></auditFailCar>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
<script type="text/javascript">
import "../components/commonStyle.scss";
import totalComponent from "../components/Totalcomponent.vue";
import unauthorizedComponent from "../components/Unauthorizedcomponent.vue";
import authEnticatedComponent from "../components/authEnticatedComponent.vue";
import toBeCertified from "../components/toBeCertified.vue";
import unPassCertification from "../components/unPassCertification.vue";
import toBeAuditCar from "../components/toBeAuditCar.vue";
import auditFailCar from "../components/auditFailCar.vue";
export default {
  data() {
    return {
      CarActiveName: "first",
      isDestroy: true //销毁是否要重置tab
    };
  },
  components: {
    Total: totalComponent,
    Unauthorized: unauthorizedComponent,
    authenticatedcomponent: authEnticatedComponent,
    toBeCertified: toBeCertified,
    unPassCertification: unPassCertification,
    auditCar: toBeAuditCar,
    auditFailCar
  },
  watch: {
    CarActiveName(newVal, oldVal) {
      if (newVal) {
        this.CarActiveName = newVal;
      } else {
        this.CarActiveName = oldVal;
      }
    },
    $route(to, from) {
      // 从客户上报进来进行操作
      if (from.path === "/service/customerReported/index") {
        if (this.$route.query.index) {
          if (this.$route.query.index != "first") {
            this.CarActiveName = this.$route.query.index;
          }
        } else {
          sessionStorage.setItem("once", false);
        }
      }
    }
  },
  created() {
    this.CarActiveName = sessionStorage.getItem("CarActiveName") || "first";
    // 从客户上报跳转自动到选中栏
    if (this.$route.query.index) {
      if (this.$route.query.index != "first") {
        this.CarActiveName = this.$route.query.index;
      }
    } else {
      sessionStorage.setItem("once", false);
    }
  },

  beforeUpdate() {
    sessionStorage.setItem("CarActiveName", this.CarActiveName);
  },

  beforeDestroy() {
    sessionStorage.setItem("CarActiveName", this.CarActiveName);
    // if ( this.isDestroy ) {
    //     sessionStorage.setItem('CarActiveName', 'first');
    // }
  },
  methods: {
    handleClick(tab, event) {
      this.$router.push({ query: {} });
      this.CarActiveName = tab.name;
      // sessionStorage.setItem('CarActiveName', tab.name);
      // this.isDestroy = false

      // this.CarActiveName = tab.name;
    }
  }
};
</script>


<style type="text/css" lang="scss">
.carOwner {
  height: 100%;
  position: relative;
  .el-tabs {
    height: 100%;
    .el-tabs__content {
      height: 93%;
      .el-tab-pane {
        height: 100%;
      }
    }
  }
  .el-cascader {
    margin-top: -5px;
  }
  .classify_info {
    height: 100%;
    .btns_box {
      margin-bottom: 10px;
    }
    .info_news {
      height: 90%;
    }
    .el-pagination {
      margin-top: 13px;
      text-align: right;
    }
  }
  .carNewinfo,
  .freezeInfo,
  .blackInfo,
  .drivercertify {
    display: inline-block;
    .el-dialog {
      width: 1100px;
      border-radius: 4px;
      .el-dialog__body {
        .el-form {
          .shipper_information {
            h2 {
              margin: 10px 20px;
              padding-bottom: 10px;
              border-bottom: 2px solid #ccc;
            }
          }
          .el-form-item {
            .el-form-item__content {
              .el-input {
                width: 320px;
              }
              .lessWidth {
                width: 103px;
                display: inline-block;
              }
              & > .el-checkbox {
                margin-left: 0px;
              }
            }
          }
          .licensePicture {
            width: 300px;
            line-height: 20px;
          }
          .moreLength {
            .el-form-item__content {
              .el-input {
                width: 637px;
              }
            }
          }
          .el-textarea {
            width: 829px;
            vertical-align: top;
            font-size: 12px;
            padding-top: 5px;
          }
        }
      }
    }
  }
  .classify_searchinfo {
    .el-form-item {
      .el-date-editor {
        width: 215px;
        .el-range__close-icon {
          display: none;
        }
      }
    }
  }
}

.driverDialog {
  display: inline-block;
  .BtnInfo {
    font-weight: bold;
    font-size: 14px;
    padding: 0px 15px 0px;
  }
  .lessWidth_col {
    .el-form-item {
      display: inline-block;
    }
  }
  .lessWidth {
    width: 79px !important;
    display: inline-block;
  }
  .tableBox {
    margin-bottom: 20px;
  }
  .PopupPic {
    width: 0;
    height: 0;
    position: fixed;
    left: 15%;
    top: 20%;
    z-index: 3019;
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
          .viewer-container {
            width: 100% !important;
            height: 700px !important;
          }
          .viewer-backdrop {
            width: 100% !important;
            height: 700px !important;
          }
        }
      }
    }
  }
  .carNewinfoH2 {
    margin: 30px 0px 20px !important;
  }
  .el-form-item__content {
    text-align: left;
  }
  .radioselect {
    width: 250px !important;
    float: right;
  }
  .carTypeFlag {
    width: 85% !important;
  }
  .carTypeStyle {
    .el-checkbox__inner {
      width: 30px;
      height: 30px;
      &::after {
        height: 15px;
        top: 4px;
        left: 12px;
      }
    }
  }
}
</style>