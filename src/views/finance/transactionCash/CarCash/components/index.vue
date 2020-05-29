<template>
  <div class="CarCash commoncss">
    <el-dialog
      :title="typetitle"
      :visible="dialogFormVisible_add"
      :modal-append-to-body="false"
      :before-close="close"
      top="5vh"
      :close-on-click-modal="false"
      ref="dialog"
    >
      <el-form ref="formAll">
        <el-row>
          <h2 class="carNewinfoH2">提现信息</h2>
          <el-col :span="12">
            <el-form-item label="流水号：" :label-width="formLabelWidth">{{formAll.extractSerial}}</el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="用户姓名：" :label-width="formLabelWidth">{{formAll.name}}</el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="手机号码：" :label-width="formLabelWidth">{{formAll.mobile}}</el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="提现金额：" :label-width="formLabelWidth">{{formAll.extractSum}}</el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="手续费：" :label-width="formLabelWidth">{{formAll.handlingFee}}</el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="收款方式：" :label-width="formLabelWidth">{{formAll.extractWay}}</el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="收款账号：" :label-width="formLabelWidth">{{formAll.extractAccount}}</el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item
              label="申请时间："
              :label-width="formLabelWidth"
            >{{formAll.createTime|parseTime}}</el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <h2 class="carNewinfoH2">车主信息</h2>
          <el-col :span="24">
            <el-form-item label="账户状态：" :label-width="formLabelWidth">{{formAll.accountStatusName}}</el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item
              label="车主运费线上交易总收入："
              :label-width="formLabelWidth"
            >{{driverInfo.onLineTransTotal}}</el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item
              label="已提现金额："
              :label-width="formLabelWidth"
            >{{driverInfo.cashWitndAmount}}</el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="分销获利总金额：" :label-width="formLabelWidth">{{rewardAmount}}</el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="可提现金额：" :label-width="formLabelWidth">{{driverInfo.acailBalance}}</el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item
              label="车贴任务奖励收入："
              :label-width="formLabelWidth"
            >{{driverInfo.payCarStickerTotal}}</el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="待审核金额：" :label-width="formLabelWidth">{{driverInfo.auditAmount}}</el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item
              label="达量奖励收入："
              :label-width="formLabelWidth"
            >{{driverInfo.ordernumRewardAmount}}</el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item
              label="待处理提现金额："
              :label-width="formLabelWidth"
            >{{driverInfo.prodealHandsAmount}}</el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="收入总计：" :label-width="formLabelWidth">{{incomeTotal}}</el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="小计：" :label-width="formLabelWidth">{{subtotal}}</el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <h2 class="carNewinfoH2">提现动态</h2>
          <el-col :span="12">
            <el-form-item label="处理状态：" :label-width="formLabelWidth">{{formAll.auditOpinion}}</el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="提现状态：" :label-width="formLabelWidth">{{formAll.extractStatus}}</el-form-item>
          </el-col>
        </el-row>
        <el-row v-if="cashtype=='AF0860303'">
          <el-col :span="12">
            <el-form-item
              label="转账成功时间："
              :label-width="formLabelWidth"
            >{{formAll.extractTime|parseTime}}</el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="操作人：" :label-width="formLabelWidth">{{formAll.updater}}</el-form-item>
          </el-col>
        </el-row>
        <el-row v-if="cashtype=='AF0860304'||cashtype=='AF0860306'">
          <el-col :span="12">
            <el-form-item
              label="转账失败时间："
              :label-width="formLabelWidth"
            >{{formAll.extractTime|parseTime}}</el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="操作人：" :label-width="formLabelWidth">{{formAll.updater}}</el-form-item>
          </el-col>
        </el-row>
        <el-row v-if="cashtype=='AF0860304'||cashtype=='AF0860306'">
          <el-col :span="24">
            <el-form-item label="转账失败原因：" :label-width="formLabelWidth">{{formAll.extractDes}}</el-form-item>
          </el-col>
        </el-row>
        <el-row v-if="cashtype=='AF0860306'">
          <el-col :span="12">
            <el-form-item
              label="提现申请驳回时间："
              :label-width="formLabelWidth"
            >{{formAll.updateTime|parseTime}}</el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="操作人：" :label-width="formLabelWidth">{{formAll.updater}}</el-form-item>
          </el-col>
        </el-row>
        <el-row v-if="cashtype=='AF0860306'">
          <el-col :span="24">
            <el-form-item label="驳回原因：" :label-width="formLabelWidth">{{formAll.extractFail}}</el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="close()" type="primary">关闭</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { eventBus } from "@/eventBus";
import { parseTime, pickerOptions2 } from "@/utils/";
import { aflcExtractCashId } from "@/api/finance/CarCash.js";
import {
  findDrivrTrans,
  driverRewardStatisticsInfo
} from "@/api/users/carDetails/index.js";
export default {
  components: {},
  props: {
    params: {
      type: String,
      default: ""
    },
    driverId: {
      type: String,
      default: ""
    },
    typetitle: {
      type: String,
      default: ""
    },
    /*add新增，edit编辑，view查看*/
    editType: {
      type: String
    },
    dialogFormVisible_add: {
      type: Boolean,
      default: false
    },
    cashtype: {
      type: String,
      default: ""
    }
  },
  data() {
    return {
      defaultImg: "/static/test.jpg",
      formLabelWidth: "180px",
      pickerOptions2: { shortcuts: pickerOptions2 },
      btnsize: "mini",
      formAll: {},
      driverInfo: {},
      rulesForm: {},
      rewardAmount: null,
      subtotal: null,
      incomeTotal: null
    };
  },
  watch: {
    dialogFormVisible_add: {
      handler: function(val, oldVal) {
        console.log(val, oldVal);
        if (!val) {
          this.$emit("getData");
        } else {
          this.openDialog();
        }
      }
    }
  },
  methods: {
    async openDialog() {
      let res1 = await aflcExtractCashId(this.params);
      let res2 = await driverRewardStatisticsInfo(this.driverId);
      let res3 = await findDrivrTrans(this.driverId);
      this.formAll = res1.data;
      this.rewardAmount = res2.data.rewardAmount;
      this.driverInfo = res3.data;
      for (let item in this.driverInfo) {
        if (this.driverInfo[item] == null) {
          this.driverInfo[item] = 0;
        }
      }
      this.subtotal =
        this.driverInfo.cashWitndAmount +
        this.driverInfo.acailBalance +
        parseFloat(this.driverInfo.auditAmount) +
        this.driverInfo.prodealHandsAmount;
      this.incomeTotal =
        this.rewardAmount +
        this.driverInfo.onLineTransTotal +
        this.driverInfo.payCarStickerTotal +
        this.driverInfo.ordernumRewardAmount;
    },
    close: function() {
      this.$emit("update:dialogFormVisible_add", false);
      this.driverInfo = {};
      this.rewardAmount = null;
      this.formAll = {};
      this.subtotal = null;
      this.incomeTotal = null;
    }
  }
};
</script>
<style lang="scss" >
.CarCash {
  .carNewinfoH2 {
    color: #f4f4f5;
    background: #909399;
    padding: 10px 0px;
    text-indent: 20px;
    margin: 10px 0px 20px;
    position: relative;
  }
}
</style>
