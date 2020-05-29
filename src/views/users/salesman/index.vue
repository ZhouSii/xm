<template>
  <div class="identicalStyle salesManQRCode" v-loading="loading">
    <el-form
      :inline="true"
      :model="listSystemObj.vo"
      ref="ruleForm"
      class="demo-ruleForm classify_searchinfo"
    >
      <el-form-item label="链接名称" prop="urlName">
        <el-input v-model="listSystemObj.vo.urlName" clearable> </el-input>
      </el-form-item>
      <el-form-item label="渠道名称" prop="channalName">
        <el-input v-model="listSystemObj.vo.channalName" clearable> </el-input>
      </el-form-item>
      <el-form-item label="业务员" prop="belongSalesmanName">
        <el-input v-model="listSystemObj.vo.belongSalesmanName" clearable>
        </el-input>
      </el-form-item>
      <el-form-item label="所属业务组" prop="groupName">
        <el-input v-model="listSystemObj.vo.groupName" clearable> </el-input>
      </el-form-item>
      <el-form-item class="btnChoose fr" style="margin-left:0;">
        <el-button
          type="primary"
          icon="el-icon-search"
          plain
          :size="btnsize"
          @click="handleSearch('search')"
          >搜索</el-button
        >
        <el-button
          type="info"
          icon="fontFamily aflc-icon-qingkong"
          :size="btnsize"
          plain
          @click="handleSearch('clear')"
          >清空</el-button
        >
      </el-form-item>
    </el-form>
    <div class="classify_info">
      <div class="btns_box">
        <el-button
          type="primary"
          icon="el-icon-circle-plus"
          plain
          @click="handleClick('new')"
          :size="btnsize"
          >新增</el-button
        >
        <el-button
          type="primary"
          icon="el-icon-edit"
          plain
          @click="handleClick('revise')"
          :size="btnsize"
          >修改</el-button
        >
      </div>
      <div class="info_news">
        <el-table
          ref="multipleTable"
          :data="tableData"
          stripe
          border
          align="center"
          height="100%"
          @selection-change="getinfomation"
          tooltip-effect="dark"
          @row-click="clickDetails"
          style="width: 100%"
        >
          <!-- <el-table-column type="selection" width="50"> </el-table-column> -->
          <el-table-column label="选择" width="60" align="center">
            <template slot-scope="scope">
              <el-radio class="radio" v-model="radio" :label="scope.row.id"
                >&nbsp;</el-radio
              >
            </template>
          </el-table-column>
          <el-table-column label="序号" width="60">
            <template slot-scope="scope">
              {{
                (listSystemObj.currentPage - 1) * listSystemObj.pageSize +
                  scope.$index +
                  1
              }}
            </template>
          </el-table-column>
          <el-table-column
            sortable
            prop="urlName"
            label="链接名称"
            min-width="150"
          >
          </el-table-column>
          <el-table-column
            prop="qrcode"
            :show-overflow-tooltip="true"
            sortable
            label="链接"
            min-width="200"
          >
          </el-table-column>
          <el-table-column
            prop="channalName"
            :show-overflow-tooltip="true"
            sortable
            label="渠道名称"
            min-width="200"
          >
          </el-table-column>
          <el-table-column
            prop="belongSalesmanName"
            :show-overflow-tooltip="true"
            sortable
            label="业务员"
            min-width="150"
          >
          </el-table-column>
          <el-table-column
            prop="groupName"
            :show-overflow-tooltip="true"
            sortable
            label="所属业务组"
            min-width="150"
          >
          </el-table-column>
          <el-table-column
            prop="updateTime"
            sortable
            label="更新时间"
            min-width="160"
          >
            <template slot-scope="scope">
              {{ scope.row.updateTime | parseTime }}
            </template>
          </el-table-column>
          <el-table-column
            prop="creater"
            sortable
            label="操作人"
            min-width="150"
          >
          </el-table-column>
          <el-table-column prop="" sortable label="操作" min-width="150">
            <template slot-scope="scope">
              <el-button
                :size="btnsize"
                type="primary"
                plain
                @click="handleCheck('showQrCode', scope.row)"
                >二维码</el-button
              >
              <el-button
                :size="btnsize"
                type="primary"
                plain
                @click="handleCheck('showUpdataList',scope.row)"
                >修改记录</el-button
              >
            </template>
          </el-table-column>
        </el-table>
      </div>
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
        />
      </div>
    </div>

    <newQRCode
      :dialogVisible.sync="dialogVisible"
      :isModify="isModify"
      :changeForm="selected"
      @close="firstblood"
    />

    <el-dialog
      class="QRCodeDialog"
      top="25vh"
      :visible.sync="dialogVisibleQRCode"
      :close-on-click-modal="false"
      @open="getQrCodeImg"
      width="26%"
    >
      <canvas id="qrCode"> </canvas>
    </el-dialog>

    <el-dialog
      top="15vh"
      :visible.sync="dialogVisibleDetails"
      :close-on-click-modal="false"
      width="57%"
      v-el-drag-dialog
    >
      <el-table :data="showDetails" border ref="multipleTable" align="center">
        <template v-for="(column, key) in tableColumn">
          <el-table-column
            :key="key"
            :label="column.label"
            :prop="column.prop"
            :show-overflow-tooltip="column.overflow"
            v-if="!column.slot"
            :width="column.width"
          ></el-table-column>
          <el-table-column
            :key="key"
            :label="column.label"
            v-else
            :width="column.width || ''"
          >
            <template slot-scope="scope">
              <span
                class="clickitem"
                v-if="column.click"
                v-html="column.slot(scope)"
                @click.stop="column.click(scope.row)"
              ></span>
              <span v-else v-html="column.slot(scope)"></span>
            </template>
          </el-table-column>
        </template>
      </el-table>
    </el-dialog>
  </div>
</template>

<script type="text/javascript">
import { UserQrCodeList, userQrCodeUpdataList } from "@/api/users/salesMan.js";
import { parseTime, pickerOptions2 } from "@/utils/index.js";
import Pager from "@/components/Pagination/index";
import newQRCode from "./add";
import QRCode from "qrcode";
import vueQr from "vue-qr";

export default {
  props: {
    isvisible: {
      type: Boolean,
      default: false
    }
  },
  components: {
    Pager,
    newQRCode,
    vueQr
  },
  data() {
    return {
      selected: {},
      radio: "",
      config: {
        value: "", //显示的值、跳转的地址
        imagePath: require("../../../assets/checkImg/icon2.png") //中间logo的地址
      },
      btnsize: "mini",
      showDetails: [],
      dialogVisible: false,
      dialogVisibleDetails: false,
      loading: false, // 加载
      isModify: false,
      sizes: [20, 50, 100, 400],
      dataTotal: 0,
      listSystemObj: {
        currentPage: 1,
        pageSize: 20,
        vo: {
          belongSalesmanMobile: "", //业务员手机号码
          belongSalesmanName: "", //业务员姓名
          channalName: "", //渠道名称
          groupName: "", //所属业务组
          //   id: "",
          qrcodeNo: "", //二维码编号
          urlName: "" //链接名称
        }
      },
      tableData: [],
      checkedinformation: [],
      twocodeurl: "",
      qrCodeNum: "",
      dialogVisibleQRCode: false,
      tableColumn: [
        {
          label: "渠道名称",
          prop: "channalName",
        //   width: "150",
          overflow: false
        },
        {
          label: "业务员",
          prop: "belongSalesmanName",
          width: "150",
          overflow: false
        },
        {
          label: "所属业务组",
          prop: "groupName",
        //   width: "150",
          overflow: false
        },
        {
          label: "操作人",
          prop: "creater",
          width: "150",
          overflow: false
        },
        {
          label: "创建时间",
          prop: "createTime",
          width: "160",
          overflow: false,
          slot: scope => {
            return parseTime(scope.row.createTime, "{y}-{m}-{d} {h}:{i}:{s}");
          }
        },
      ]
    };
  },
  watch: {},
  //   created() {},
  mounted() {
    this.firstblood();
    // this.$nextTick(() => {
    //     this.qrcode();
    // });
  },
  //   beforeDestroy() {},
  methods: {
    canvasMerge() {
      //   this.$nextTick(() => {
      let canvas = document.getElementById("qrCode");
      canvas.width = "400";
      canvas.height = "400";
      let ctx = canvas.getContext("2d");
      ctx.font = "24px serif";
      // ctx.textAlign = "right";
      let img1 = new Image();
      let img2 = new Image();

      img1.src = this.twocodeurl;
      img2.src = this.config.imagePath;

      // 加载img1
      let pm1 = new Promise((res, rej) => {
        img1.onload = () => {
          res();
        };
      });
      // 加载img2
      let pm2 = new Promise((res, rej) => {
        img2.onload = () => {
          res();
        };
      });

      // 两张图片都加载完成后绘制于Canva中
      let drawAllImg = Promise.all([pm1, pm2]).then(res => {
        ctx.drawImage(img1, 0, 0, 400, 400);
        //  ctx.imageSmoothingQuality = "high";
        //  ctx.imageSmoothingEnabled = false;
        ctx.drawImage(img2, 168, 168, 64, 64);
        ctx.fillText(this.qrCodeNum, 250, 395);
      });
      //   });
    },
    getQrCodeImg() {
      this.$nextTick(() => {
        QRCode.toDataURL(this.config.value, {
          margin: 3, //二维码内边距，默认为4。单位px
          height: 400, //二维码高度
          width: 400 //二维码宽度
          // scal: 177,
          // src: "../../../assets/checkImg/icon2.png",
          // image: "../../../assets/checkImg/icon2.png"
          // color: {
          //     dark: '#000', // 二维码背景颜色
          //     // light: '#000' // 二维码前景颜色
          // },
          // rendererOpts: {
          //     margin: 0
          // }
        }).then(url => {
          this.twocodeurl = url;
          this.canvasMerge();
          // console.log(url);
        });
      });
    },
    handlePageChange(obj) {
      this.listSystemObj.currentPage = obj.pageNum;
      this.listSystemObj.pageSize = obj.pageSize;
      this.firstblood();
    },
    // 刷新页面
    firstblood() {
      this.loading = true;
      UserQrCodeList(this.listSystemObj)
        .then(res => {
          this.tableData = res.data.list;
          this.dataTotal = res.data.totalCount;
          this.loading = false;
        })
        .catch(err => {
          this.loading = false;
        });
    },
    resizePage() {
      if (this.listSystemObj.currentPage != 1) {
        this.listSystemObj.currentPage = 1;
        this.$refs.pager.inputval = this.listSystemObj.currentPage;
        this.$refs.pager.pageNum = this.listSystemObj.currentPage;
      }
    },
    handleSearch(type) {
      if (type == "clear") {
        this.listSystemObj.vo = {
          belongSalesmanMobile: "", //业务员手机号码
          belongSalesmanName: "", //业务员姓名
          channalName: "", //渠道名称
          groupName: "", //所属业务组
          //   id: "",
          qrcodeNo: "", //二维码编号
          urlName: "" //链接名称
        };
      }
      if (this.listSystemObj.currentPage != 1) {
        this.listSystemObj.currentPage = 1;
        this.$refs.pager.inputval = this.listSystemObj.currentPage;
        this.$refs.pager.pageNum = this.listSystemObj.currentPage;
      }
      this.firstblood();
    },
    handleClick(type) {
        if(this.selected.id || type === "new"){
            switch (type) {
              case "new":
                this.dialogVisible = true;
                this.isModify = false;
                break;
              case "revise":
                this.dialogVisible = true;
                this.isModify = true;
                break;
            }
        }else{
            return this.$message.warning("请选择一条列表数据!")
        }
    },
    handleCheck(type, row) {
      switch (type) {
        case "showQrCode":
          this.qrCodeNum = row.qrcode
            .split("?")[1]
            .split("&")[1]
            .split("=")[1];
          this.config.value = row.qrcode;
          this.dialogVisibleQRCode = true;
          break;
        case "showUpdataList":
            userQrCodeUpdataList(row.id).then(res => {
                this.showDetails = res.data;
                this.dialogVisibleDetails =true;
            }).catch(err => {
                return this.$message.warning(err.errInfo || err.text)
            })
            break;
      }
      //   console.log(row.qrcode);
    },
    // 判断是否选中
    getinfomation(selection) {
      this.checkedinformation = selection;
    },
    // 点击选中当前行
    clickDetails(row, event, column) {
      //   this.$refs.multipleTable.toggleRowSelection(row);
      this.radio = row.id;
      this.selected = row;
    }
  }
};
</script>

<style type="text/css" lang="scss" scoped>
.salesManQRCode {
  .QRCodeDialog {
    .el-dialog__body {
      div {
        text-align: center;
      }
      #qrCode {
        width: 400px;
        height: 400px;
        border: 1px solid #ccc;
        display: block;
        margin: 0 auto;
      }
    }
  }
}
</style>
