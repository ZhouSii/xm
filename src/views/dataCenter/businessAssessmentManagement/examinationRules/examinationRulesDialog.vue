<template>
  <div class="commoncss StyleNewinfoComponent">
    <el-dialog
      :title="formData.title"
      :visible.sync="formData.isShow"
      width="40%"
      height="500"
      :before-close="handleClose"
    >
      <el-form :inline="true" class="demo-ruleForm">
        <el-form-item label="选择区域" style="margin-bottom: 20px;" class="formLine">
          <el-input v-show="isShow" clearable v-model="formData.procity" @focus="procityChange"></el-input>
          <getCityList
            class="chooseItem"
            @returnStr="getStr"
            v-show="!isShow"
            ref="area"
          ></getCityList>
        </el-form-item>
        <el-form-item label="选择时间" class="formLine">
          <el-date-picker v-model="formData.chooseTime" type="month" placeholder="选择月" value-format="yyyy-MM"></el-date-picker>
        </el-form-item>
        <el-row class="tableList">
          <h2>指标配置</h2>
          <ul>
            <li>指标</li>
            <li>有效车主</li>
            <li>优质车主</li>
            <li>有效货主</li>
            <li>优质货主</li>
          </ul>
          <ul>
            <li>阶梯值(必填)</li>
            <li>
              当月认证，且当月完成交易&nbsp;&nbsp;≥
              <el-input class="btnsize" v-model="formData.effectiveDriverSetting" type="number"></el-input>单
            </li>
            <li>
              当月认证，且当月完成交易&nbsp;&nbsp;≥
              <el-input class="btnsize" v-model="formData.highQuaDriverSetting" type="number"></el-input>单
            </li>
            <li>
              当月注册，且当月完成交易&nbsp;&nbsp;≥
              <el-input class="btnsize" v-model="formData.effectiveShipperSetting" type="number"></el-input>单
            </li>
            <li>
              当月注册，且当月完成交易&nbsp;&nbsp;≥
              <el-input class="btnsize" v-model="formData.highQuaShipperSetting" type="number"></el-input>单
            </li>
          </ul>
        </el-row>
      </el-form>
      <span style="width:100%; display:block; text-align:center; margin-top:20px">
        <el-button @click="handleClose">取 消</el-button>
        <el-button type="primary" @click="sureClick">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import getCityList from "@/components/GetCityList/index";
import { addSetting, updateSetting } from "@/api/dataCenter/businessAssessmentManagement/index";
export default {
  name: "examinationRulesDialog",
  props: {
    formData: {
      default: {},
      type: Object
    }
  },
  data() {
    return {
      isShow:false
    };
  },
  methods: {
    handleClose() {
      this.$parent.formData.isShow = false;
    },
    procityChange() {
        this.isShow = false
    },
    // 点击确定
    sureClick() {
         let params = {
                "provinceName": !!this.formData.provinceName ? this.formData.provinceName : null,
                "cityName": !!this.formData.cityName ? this.formData.cityName : null,
                "specTimeStr": !!this.formData.chooseTime ? this.formData.chooseTime : null,
                "eDriverMin": parseInt(this.formData.effectiveDriverSetting), //有效车主
                "bDriverMin": parseInt(this.formData.highQuaDriverSetting), //优质车主
                "eShipperMin": parseInt(this.formData.effectiveShipperSetting), //有效货主
                "bShipperMin": parseInt(this.formData.highQuaShipperSetting), //优质货主
            }
            console.log('this.$parent.formData',params)
        if( this.formData.title === '添加考核规则' ) {
            // 新增
            // console.log(params,'paramsparamsparams')
            addSetting(params).then(res => {
                if ( res.status === 200 ) {
                    this.$parent.formData.isShow = false
                    this.$parent.firstblood()
                    this.$message.success("添加成功")
                } else {
                     this.$message.error(res.errorInfo)
                }
            }).catch(err => {
                 this.$message.error(err.errorInfo)
            })
        } else {
            // 修改
            params.id = this.formData.id
            updateSetting(params).then(res => {
                if ( res.status === 200 ) {
                    this.$parent.formData.isShow = false
                    this.$parent.firstblood()
                    this.$message.success("修改成功")
                } else {
                     this.$message.error(res.errorInfo)
                }
            }).catch(err => {
                this.$message.error(err.errorInfo)
            })
        }
    },
    // 城市选择
    getStr(d) {
      this.$parent.formData.cityName = d.city ? d.city.name : "";
      this.$parent.formData.provinceName = d.province ? d.province.name : "";
      this.$parent.formData.procity =  this.$parent.formData.provinceName + '/' + this.$parent.formData.cityName
    },
    // 获取城市
    getValue(obj) {
      return obj ? obj.value : "";
    }
  },
  components: {
    getCityList
  },
  created() {
      if ( this.formData.procity.length > 0 ) {
          this.isShow = true
      }
    console.log(this.formData, "formData");
  }
};
</script>
<style lang="scss" scoped>
.formLine {
  /deep/ .el-input__prefix {
    top: 5px;
  }
}

.tableList {
  h2 {
    margin: 10px 0;
  }
  ul {
    float: left;
    width: 30%;
    text-align: center;
    border: 1px solid #999;
    li {
      &:first-child {
        background: #909399;
        margin-left: 0;
      }
      width: 100%;
      height: 50px;
      line-height: 50px;
      border-top: 1px solid #999;
      border-left: 1px solid #999;
      margin: -1px 0 0 -1px;
      .btnsize {
        width: 60px;
        margin: 0 10px;
      }
    }
  }
  ul:last-child {
    width: 70%;
    margin-left: -1px;
  }
}
</style>
