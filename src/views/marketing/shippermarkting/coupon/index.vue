<template>
  <div class="same_shipper tabsWrap">
    <el-tabs v-model="couponConfigTypeName" type="card" @tab-click="handleClick">
      <!-- 自动化 -->
      <el-tab-pane
        label="自动化设置"
        name="one"
        v-if="$_has_permission('MARKETING_SHIPPER_MANAGE_COUPON_ACTIVITY_AUTO_SETTING')"
      >
        <automation types="one" ref="one" :key="dataKeys"></automation>
      </el-tab-pane>

      <!-- 手动化 -->
      <el-tab-pane
        label="手动化设置"
        name="two"
        v-if="$_has_permission('MARKETING_SHIPPER_MANAGE_COUPON_ACTIVITY_MANUAL_SETTING')"
      >
        <handmation types="two" ref="two" :key="dataKeys"></handmation>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>


<script>
import automation from "./automation.vue";
import handmation from "./handmation.vue";
import { mapState, mapActions } from "vuex";
export default {
  data() {
    return {
      couponConfigTypeName: "one",
      dataKeys: ""
    };
  },
  components: {
    automation,
    handmation
  },
  watch: {
    // couponConfigTypeName(newVal, oldVal) {
    //   if (newVal) {
    //     this.couponConfigTypeName = newVal;
    //   } else {
    //     this.couponConfigTypeName = oldVal;
    //   }
    // }
  },
  methods: {
    handleClick(tab, event) {
      this.dataKeys = Math.random();
      if (tab.name == "one") {
        this.$refs.one.getDataList();
      } else {
        this.$refs.two.getDataList();
      }
    }
  },
  mounted() {
    if (this.$route.query.activityType) {
      this.couponConfigTypeName = this.$route.query.activityType;
    }
  },
  destroyed() {
    // this.$store.commit({
    // type: "SET_COUPONSTATUS",
    // couponStatus: 'one'
    // })
  },
  activated() {
    this.couponConfigTypeName =
      sessionStorage.getItem("couponConfigTypeName") || "one";
  },

  beforeUpdate() {
    sessionStorage.setItem("couponConfigTypeName", this.couponConfigTypeName);
  },

  beforeRouteEnter(to, from, next) {
    // console.log("hhh", to);
    if (to.meta.isClosed) {
      sessionStorage.setItem("couponConfigTypeName", "one");
      to.meta.isClosed = false;
    }
    next();
  }
};
</script>

<style lang="scss" >
.newcouponBox {
  display: inline-block;
  .el-dialog {
    width: 85% !important;
    max-height: none;
    overflow: unset;
    .el-input {
      width: 240px;
    }
    .el-dialog__body {
      padding: 20px 0px;
    }
  }
  .el-row {
    padding-bottom: 10px;
  }
  .el-radio.is-bordered {
    padding: 7px 20px 0 10px;
    margin-right: 0px;
  }
  .el-input__icon {
    line-height: 24px;
    height: 24px;
  }
  .el-range__icon {
    line-height: 24px !important;
  }
  .el-date-editor .el-range-separator {
    line-height: 30px;
    width: 7%;
  }
  .couponcost {
    margin-left: 50px;
  }
  .el-radio-group {
    margin-left: 0px;
  }
  .el-range-editor {
    width: 350px;
  }
  .table_box {
    .ht_table {
      width: 99%;
      margin: 0px 10px;
      color: #333;
      .ht_table_tr {
        width: 100%;
        line-height: 42px;
        display: flex;
      }
      .ht_table_tr1 {
        overflow: unset;
        width: 100%;
        line-height: 41px;
        height: 42px;
        display: flex;
      }
      .ht_table_th1 {
        width: 35px;
        height: 54px;
        line-height: 54px;
        position: relative;
        .addItem {
          top: 15px;
          left: 0px;
        }
      }
      .ht_table_th {
        padding: 5px 5px;
        display: inline-block;
        background: #eaf0ff;
        text-align: center;
        position: relative;
        border-top: 1px solid #d0d7e5;
        border-left: 1px solid #d0d7e5;
        border-right: 1px solid #d0d7e5;
        border-bottom: 1px solid #d0d7e5;
      }
      .table_th1 {
        width: 5%;
      }
      .table_th2 {
        width: 6%;
      }
      .table_th3 {
        width: 6%;
      }
      .table_th4 {
        width: 5%;
      }
      .table_th5 {
        width: 9%;
      }
      .table_th6 {
        width: 5%;
      }
      .table_th7 {
        width: 5%;
      }
      .table_th8 {
        width: 9%;
      }
      .table_th9 {
        width: 9%;
      }
      .table_th10 {
        width: 7%;
      }
      .table_th11 {
        width: 7%;
      }
      .table_th12 {
        width: 5%;
      }
      .table_th13 {
        width: 9%;
      }
      .table_th14 {
        width: 5%;
      }
      .table_th15 {
        width: 5%;
      }
      .ht_table_td1 {
        float: left;
        padding: 5px 5px;
        width: 35px;
        height: 40px;
        line-height: 40px;
        position: relative;
        .reduceItem {
          top: 7px;
          left: 0px;
        }
      }
      .ht_table_td {
        text-align: center;
        display: inline-block;
        border-left: 1px solid #d0d7e5;
        border-bottom: 1px solid #d0d7e5;
        border-right: 1px solid #d0d7e5;
        position: relative;
        z-index: 100;
        text-align: center;
        height: 42px;
        .reduceItem {
          top: 7px;
          left: 25px;
        }
        .el-form-item {
          margin-bottom: 0px;
        }
        .el-input {
          width: 100%;
        }
        .el-cascader {
          line-height: 30px;
        }
      }
      .el-input__icon {
        display: none;
      }
      .htable_div {
        display: block;
      }
      .el-form-item {
        width: 100%;
        padding-top: 10px;
        padding-bottom: 10px;
      }
      .el-input {
        width: 98%;
        .el-input__inner {
          padding: 0px 5px;
        }
      }
    }
    .el-select {
      overflow: hidden;
      .el-input__inner {
        height: 40px !important;
      }
      .el-select__tags {
        height: 40px;
        top: 70%;
        overflow: hidden;
        max-width: none !important;
        span {
          text-align: left;
          height: 100%;
        }
        .el-tag--small {
          height: 100%;
          font-size: 14px;
          color: #606266;
          background-color: transparent;
          padding: 0px !important;
          margin: 0px;
          &::before {
            content: ",";
          }
          &:nth-of-type(1) {
            margin: 0px 0 0px 6px;
            &::before {
              content: "";
            }
          }
        }
        .el-tag__close {
          display: none;
        }
      }
    }
  }
  .moke {
    cursor: pointer;
    position: absolute;
    top: 0px;
    left: 0px;
    width: 100%;
    height: 100%;
  }
}
</style>

