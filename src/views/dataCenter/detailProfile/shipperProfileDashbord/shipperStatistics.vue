<template>
  <div class="identicalStyle shipperStatistics" v-loading="loading">
    <el-form inline class="demo-ruleForm classify_searchinfo">
      <el-form-item>
        <searchInfo @change="getSearchParam"></searchInfo>
      </el-form-item>
      <el-form-item class="fr">
        <el-button
          type="primary"
          icon="el-icon-download"
          plain
          :size="btnsize"
          @click="exportExcel"
          v-has:DATA_CENTER_DEVELOPMENT_OVERVIEW_SAHIPPER_GENERAL_ALL_EXCEL
        >导出Excel</el-button>
      </el-form-item>
    </el-form>
    <div class="classify_info">
      <div class="info_news">
        <el-table
          ref="multipleTable"
          id="out-table"
          :data="tableData"
          stripe
          border
          align="center"
          tooltip-effect="dark"
          style="width: 100%"
        >
          <el-table-column prop="salesman" label="区域"></el-table-column>
          <el-table-column prop="channelName" label="统计时间范围"></el-table-column>
          <el-table-column prop="regisShipper" label="货主总数"></el-table-column>
          <el-table-column label="认证状态">
            <el-table-column prop="shipperOrdernum" label="未提交认证资料"></el-table-column>
            <el-table-column prop="regisDriver" label="待认证"></el-table-column>
            <el-table-column prop="cartificationeDriver" label="已认证"></el-table-column>
            <el-table-column prop="regisLogisticsCompany" label="认证未通过"></el-table-column>
          </el-table-column>
        </el-table>
      </div>
    </div>
    <barCount />
  </div>
</template>

<script type="text/javascript">
import { DCShipperCount } from "@/api/dataCenter/shipper/shipperCount.js";
import searchInfo from "../../component/dataCenterSearch";
import barCount from "../../component/bar";
import { SaveAsFile } from "@/utils/lodopFuncs";
import { parseTime, objectMerge2 } from "@/utils/index.js";
// import FileSaver from 'file-saver'
// import XLSX from 'xlsx'

export default {
  props: {
    isvisible: {
      type: Boolean,
      default: false
    }
  },
  components: {
    searchInfo,
    barCount
  },
  data() {
    return {
      btnsize: "mini",
      loading: false, // 加载
      listObj: {
        areaCode: "",
        cityCode: "",
        provinceCode: "",
        queryBeginTime: "",
        queryEndTime: "",
        timeQueryType: "1"
      },
      tableData: [],
      tableColumn: [
        {
          label: "序号",
          prop: ""
        },
        {
          label: "区域",
          prop: "salesman"
        },
        {
          label: "统计时间范围",
          prop: "channelName"
        },
        {
          label: "货主总数",
          prop: "regisShipper"
        },
        {
          label: "未提交认证资料",
          prop: "shipperOrdernum"
        },
        {
          label: "待认证",
          prop: "regisDriver"
        },
        {
          label: "已认证",
          prop: "cartificationeDriver"
        },
        {
          label: "认证未通过",
          prop: "regisLogisticsCompany"
        }
      ],
      tableColumnMerge: {
        "4": {
          label: "认证状态",
          mergeNum: 3
        }
      }
    };
  },
  watch: {
    isvisible: {
      handler(newVal, oldVal) {
        if (newVal) {
          this.firstblood();
        } else {
        }
      },
      // 代表在wacth里声明了firstName这个方法之后立即先去执行handler方法
      immediate: true
    }
  },
  created() {},
  mounted() {
    // this.firstblood();
  },
  beforeDestroy() {},
  methods: {
    // exportExcel() {
    //     console.log('XLSX',XLSX)
    //     /* generate workbook object from table */
    //     var wb = XLSX.utils.table_to_book(document.querySelector('#out-table'))
    //     /* get binary string as output */
    //     var wbout = XLSX.write(wb, { bookType: 'xlsx', bookSST: true, type: 'array',cellStyles:true})
    //     wbout.cellStyles = { font: { sz: 14, bold: true, color: { rgb: "FFFFAA00" } }, fill: { bgColor: { indexed: 64 }, fgColor: { rgb: "FFFF00" } }   };
    //     // tmpdata["B1"].s = { font: { sz: 14, bold: true, color: { rgb: "FFFFAA00" } }, fill: { bgColor: { indexed: 64 }, fgColor: { rgb: "FFFF00" } }   };//<====设置xlsx单元格样式

    //     console.log(wb)
    //     console.log(wbout)
    //     try {
    //         FileSaver.saveAs(new Blob([wbout], { type: 'application/octet-stream' }), 'sheetjs.xlsx')
    //     } catch (e) { if (typeof console !== 'undefined') console.log(e, wbout) }
    //     return wbout
    // },
    getSearchParam(obj, type) {
      // console.log('obj',this.listObj,type)
      if (type == "export") {
        this.exportExcel();
      } else {
        this.listObj = objectMerge2(this.listObj, obj);
      }
    },
    // 刷新页面
    firstblood() {
      this.loading = true;
      DCShipperCount(this.listObj).then(res => {
        this.tableData = res.data.list;
        this.loading = false;
      });
    },
    // 点击选中当前行
    clickDetails(row, event, column) {
      this.$refs.multipleTable.toggleRowSelection(row);
    },
    exportExcel() {
      SaveAsFile(
        {
          data: this.tableData ? this.tableData : [],
          columns: this.tableColumn,
          name: "400管理-" + parseTime(new Date(), "{y}{m}{d}{h}{i}{s}")
        },
        this.tableColumnMerge
      );
    }
  }
};
</script>

<style type="text/css" lang="scss" scoped>
.shipperStatistics {
  height: 100%;
  .classify_info {
    padding-bottom: 20px;
    .info_news {
      height: 100%;
      .el-table {
        // height:100%;
        min-height: 0;
      }
    }
  }
}
</style>
