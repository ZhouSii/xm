<template>
  <div class="commoncss">
    <el-dialog
      :title="typetitle"
      :visible="dialogGrantRewardOpen"
      :modal-append-to-body="false"
      :before-close="close"
      top="5vh"
      :close-on-click-modal="false"
      ref="dialog"
    >
      <el-form :model="formAllData" ref="formAllData" :rules="rulesForm">
        <el-row>
          <el-col :span="18">
            <el-form-item
              label="车主："
              :label-width="formLabelWidth"
              prop="driverName"
            >{{formAllData.driverName}}</el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="18">
            <el-form-item
              label="手机号码："
              :label-width="formLabelWidth"
              prop="driverMobile"
            >{{formAllData.driverMobile}}</el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="18">
            <el-form-item
              label="车牌号："
              :label-width="formLabelWidth"
              prop="carNumber"
            >{{formAllData.carNumber}}</el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="18">
            <el-form-item
              label="注册地："
              :label-width="formLabelWidth"
              prop="regisAddress"
            >{{formAllData.regisAddress}}</el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="18">
            <el-form-item label="车主认证所在地：" :label-width="formLabelWidth" prop="belongCityName">
              <vregion :ui="true" @values="regionChange" class="form-control" ref="belongCity">
                <el-input v-model="formAllData.belongCityName" placeholder="请选择"></el-input>
              </vregion>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="updataClick">确 定</el-button>
        <el-button @click="close()">取 消</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { eventBus } from "@/eventBus";
import { repairDriverReward } from "@/api/users/carowner/total_carowner.js";
import vregion from "@/components/vregion/Region";
export default {
  components: {
    vregion
  },
  props: {
    params: {
      type: [Object, Array]
    },
    typetitle: {
      type: String,
      default: ""
    },
    dialogGrantRewardOpen: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      formLabelWidth: "250px",
      btnsize: "mini",
      formAllData: {
        driverName: "",
        driverMobile: "",
        carNumber: "",
        regisAddress: "",
        belongCityName: ""
      },
      rulesForm: {}
    };
  },
  watch: {
    dialogGrantRewardOpen: {
      handler: function(val, oldVal) {
        if (!val) {
          this.$emit("getData");
          this.$refs["formAllData"].resetFields();
        } else {
          this.openDialog();
        }
      }
    }
  },
  methods: {
    openDialog: function() {
      this.formAllData = this.params;
    },
    close: function() {
      this.$emit("update:dialogGrantRewardOpen", false);
    },
    updataClick() {
      var data = {
        mobile: this.formAllData.driverMobile,
        belongCity: this.formAllData.belongCity,
        areaCode: this.formAllData.areaCode,
        cityCode: this.formAllData.cityCode,
        provinceCode: this.formAllData.provinceCode
      };
      repairDriverReward(data)
        .then(res => {
          if (res.data.length == 0) {
            this.$emit("update:dialogGrantRewardOpen", false);
            this.$message.success("补发成功");
          } else {
            this.$message.error("该地区无配置奖励金信息");
            this.$emit("update:dialogGrantRewardOpen", false);
          }
        })
        .catch(err => {
          this.$message.error(err.errorInfo || err.text);
          this.$emit("update:dialogGrantRewardOpen", false);
        });
    },
    regionChange(d) {
      this.formAllData.belongCityName =
        !d.province && !d.city && !d.area && !d.town
          ? ""
          : `${this.getValue(d.province)}${this.getValue(
              d.city
            )}${this.getValue(d.area)}${this.getValue(d.town)}`.trim();
      if (d.area) {
        this.formAllData.areaCode = d.area.name;
        this.formAllData.belongCity = d.area.code;
      } else if (d.city) {
        this.formAllData.belongCity = d.city.code;
        this.formAllData.cityCode = d.city.name;
      } else if (d.province) {
        this.formAllData.belongCity = d.province.code;
        this.formAllData.provinceCode = d.province.name;
      }
      this.$forceUpdate();
    },
    getValue(obj) {
      return obj ? obj.value : "";
    }
  }
};
</script>
<style lang="scss" >
</style>
