<template>
  <div class="identicalStyle boutiqueLine" v-loading="loading">
    <div class="topPart">
      <h2>精品线路管理</h2>
      <el-row class="topPart_content" :gutter="20">
        <el-col :span="2">
          优势宣讲
          <br />
          <span>顶部轮播图</span>
        </el-col>
        <el-col :span="9">
          <UploadMultImage
            :title="'本地上传'"
            tip
            v-model="contractImgage"
            :showFileList="true"
            :limit="limitImg"
            :key="UploadMultImageKey"
          />
        </el-col>
        <el-col :span="2">活动规则</el-col>
        <el-col :span="7">
          <el-input
            placeholder
            maxlength="200"
            type="textarea"
            :disabled="!editType"
            clearable
            v-model="infoObj.activityRemark"
          ></el-input>
        </el-col>
        <el-col :span="3">
          <el-button
            v-show="!editType"
            type="primary"
            plain
            :size="btnsize"
            @click="handleEdit('edit')"
          >编辑</el-button>
          <el-button
            v-show="editType"
            type="primary"
            plain
            :size="btnsize"
            @click="handleEdit('sure')"
          >保存</el-button>
        </el-col>
      </el-row>
    </div>
    <div class="topPart topPart_Two">
      <h2>
        精品线路管理
        <!-- <span>H5地址：{{ infoObj.activityUrl }}</span> -->
      </h2>
    </div>
    <el-form
      :inline="true"
      :model="listSystemObj"
      ref="ruleForm"
      class="demo-ruleForm classify_searchinfo"
    >
      <el-form-item label="始发地" prop="startAreaCode">
        <getCityList
          @returnStr="
            val => {
              getStr('start', val);
            }
          "
          :isArea="true"
          v-model="listSystemObj.startAreaCode"
          ref="startCity"
        ></getCityList>
      </el-form-item>
      <el-form-item label="目的地" prop="endAreaCode">
        <getCityList
          @returnStr="
            val => {
              getStr('end', val);
            }
          "
          :isArea="true"
          v-model="listSystemObj.endAreaCode"
          ref="endCityea"
        ></getCityList>
      </el-form-item>
      <el-form-item label="专线公司" prop="companyName">
        <el-input v-model="listSystemObj.companyName" clearable></el-input>
      </el-form-item>
      <el-form-item class="btnChoose fr" style="margin-left:0;">
        <el-button
          type="primary"
          icon="el-icon-search"
          plain
          :size="btnsize"
          @click="handleSearch('search')"
        >搜索</el-button>
        <el-button
          type="info"
          icon="fontFamily aflc-icon-qingkong"
          :size="btnsize"
          plain
          @click="handleSearch('clear')"
        >清空</el-button>
      </el-form-item>
    </el-form>
    <div class="classify_info">
      <div class="btns_box">
        <el-button
          type="primary"
          :size="btnsize"
          plain
          icon="el-icon-circle-plus"
          @click="handleClick('new')"
        >新增</el-button>
        <!-- <el-button
          type="primary"
          :size="btnsize"
          plain
          icon="el-icon-edit"
          @click="handleClick('revise')"
          >修改</el-button
        >-->
        <el-button
          type="primary"
          :size="btnsize"
          plain
          icon="el-icon-delete"
          @click="handleClick('delete')"
        >删除</el-button>
        <el-button
          type="primary"
          :size="btnsize"
          plain
          icon="el-icon-bell"
          @click="handleClick('priority')"
        >设置优先级</el-button>
        <el-button
          type="primary"
          :size="btnsize"
          plain
          icon="el-icon-bell"
          @click="handleClick('export')"
        >导出</el-button>
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
          <el-table-column label="选择" type="selection" width="50"></el-table-column>
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
            label="专线公司"
            prop="companyName"
            :show-overflow-tooltip="true"
            min-width="150"
          ></el-table-column>
          <el-table-column
            sortable
            label="始发地"
            prop="agencyArea"
            :show-overflow-tooltip="true"
            min-width="200"
          ></el-table-column>
          <el-table-column sortable label="目的地" prop="totalEndArea" min-width="200"></el-table-column>
          <el-table-column
            :show-overflow-tooltip="true"
            sortable
            prop="biggerGoods"
            label="重货报价(元)"
            min-width="150"
          ></el-table-column>
          <el-table-column
            :show-overflow-tooltip="true"
            sortable
            prop="smallGoods"
            label="轻货报价(元)"
            min-width="150"
          ></el-table-column>
          <el-table-column sortable prop="startTranAging" label="时效(元)" min-width="150">
            <template slot-scope="scope">
              <span>{{ scope.row.startTranAging }}</span>
              <span>~</span>
              <span>{{ scope.row.endTranAging }}</span>
            </template>
          </el-table-column>
          <el-table-column sortable prop="updater" label="维护人" min-width="150"></el-table-column>
          <el-table-column sortable prop="updateTime" label="维护时间" min-width="160">
            <template slot-scope="scope">{{ scope.row.updateTime | parseTime }}</template>
          </el-table-column>
          <el-table-column sortable prop="priorityName" label="优先级" min-width="150"></el-table-column>
        </el-table>
      </div>
    </div>
    <!-- 页码 -->
    <div class="info_tab_footer">
      共计:{{ dataTotal }}
      <div class="show_pager">
        <Pager :total="dataTotal" @change="handlePageChange" ref="pager" />
      </div>
    </div>
    <add
      :dialogFormVisible.sync="dialogFormVisible"
      :isModify="isModify"
      :changeForm="changeForm"
      :formtitle="formtitle"
      @renovate="firstblood"
    />
    <tableComponnet
      :dialogFormVisibleTable.sync="dialogFormVisibleTable"
      :isDelet="isDelet"
      :changeArr="changeArr"
      :formtitle="formtitleTable"
      @renovate="firstblood"
    />
  </div>
</template>

<script type="text/javascript">
import {
  boutiqueLineList,
  getBoutiqueLineInfo,
  updateBoutiqueLineInfo,
  exportBoutiqueLine
} from "@/api/marketing/boutiqueLine";
import Pager from "@/components/Pagination/index";
import UploadMultImage from "@/components/Upload/singleImage2";
import add from "./add";
import tableComponnet from "./table";
import getCityList from "@/components/GetCityList/chinaMap1";
import { debounce, parseTime } from "@/utils/index";
export default {
  name: "boutiqueLine",
  props: {},
  components: {
    Pager,
    UploadMultImage,
    add,
    tableComponnet,
    getCityList
  },
  data() {
    return {
      btnsize: "mini",
      loading: false, // 加载
      dialogFormVisible: false,
      dialogFormVisibleTable: false,
      editType: false,
      formtitleTable: "",
      UploadMultImageKey: null,
      contractImgage: "",
      remarks: "",
      limitImg: 3,
      isModify: false,
      isDelet: false,
      changeForm: {},
      changeArr: [],
      formtitle: "",
      dataTotal: 0,
      tableData: [],
      listSystemObj: {
        currentPage: 1,
        pageSize: 20,
        vo: {
          companyName: "", //公司名称
          endAreaCode: "", //目的地编码
          excellentFlag: "1", //是否精品线路(1:是，0:否)
          startAreaCode: "" //startAreaCode
        }
      },
      checkedinformation: [],
      selected: {},
      infoObj: {
        imageList: [],
        activityRemark: "", //活动规则
        activityUrl: "" //活动H5链接
      }
    };
  },
  watch: {
    contractImgage: {
      handler(newVal, oldVal) {
        // console.log("newVal", newVal);
        this.infoObj.imageList = newVal ? newVal.split(",") : [];
        // console.log("contractImgage", this.infoObj);
        this.updataInfo(this.infoObj);
      },
      deep: true
    }
  },
  mounted() {
    this.firstblood();
    this.init();
  },
  methods: {
    init() {
      getBoutiqueLineInfo().then(res => {
        if (res.data) {
          this.infoObj = {
            imageList: res.data.imageList ? res.data.imageList.join(",") : "",
            activityRemark: res.data.activityRemark,
            activityUrl: res.data.activityUrl
          };
          this.contractImgage = this.infoObj.imageList;
        }
      });
    },
    updataInfo: debounce(function(el) {
      updateBoutiqueLineInfo(this.infoObj).then(res => {
        //   console.log("updateBoutiqueLineInfo");
      });
    }, 2000),
    handleEdit(type) {
      switch (type) {
        case "edit":
          this.editType = true;
          break;
        case "sure":
          this.infoObj.imageList = this.contractImgage
            ? this.contractImgage.split(",")
            : [];
          updateBoutiqueLineInfo(this.infoObj).then(res => {
            this.editType = false;
          });
          break;
      }
    },
    getStr(type, d) {
      console.log(d);
      if (type === "start") {
        this.listSystemObj.vo.startAreaCode = d.area.code;
      } else {
        this.listSystemObj.vo.endAreaCode = d.area.code;
      }
    },
    handlePageChange(obj) {
      this.listSystemObj.currentPage = obj.pageNum;
      this.listSystemObj.pageSize = obj.pageSize;
      this.firstblood();
    },
    // 刷新页面
    firstblood() {
      this.loading = true;
      boutiqueLineList(this.listSystemObj)
        .then(res => {
          // this.$set(res.data.list,'serviceArea',res.data.list.split(','))
          this.tableData = res.data.list;
          this.tableData.forEach(el => {
            if (!!el.bigList) {
              let biggerGoodsText = [];
              el.bigList.forEach(element => {
                biggerGoodsText.push(element.goods);
              });
              this.$set(el, "biggerGoods", biggerGoodsText.join(","));
            }
            if (!!el.smallList) {
              let smallGoodsText = [];
              el.smallList.forEach(element => {
                smallGoodsText.push(element.goods);
              });
              this.$set(el, "smallGoods", smallGoodsText.join(","));
            }
          });
          this.dataTotal = res.data.totalCount;
          this.loading = false;
        })
        .catch(err => {
          this.loading = false;
        });
    },
    // 模糊查询 分类名称或者code
    handleSearch(type) {
      if (type == "clear") {
        for (const i in this.listSystemObj.vo) {
          if (i !== "excellentFlag") {
            this.listSystemObj.vo[i] = "";
          }
        }
        this.$refs.startCity.clearData();
        this.$refs.endCityea.clearData();
      } else {
        this.firstblood();
      }
      if (this.listSystemObj.currentPage != 1) {
        this.listSystemObj.currentPage = 1;
        this.$refs.pager.inputval = this.listSystemObj.currentPage;
        this.$refs.pager.pageNum = this.listSystemObj.currentPage;
      }
      //   this.firstblood();
    },
    handleClick(type, row) {
      // console.log('type,row',type,row)
      if (
        this.checkedinformation.length > 0 ||
        type == "new" ||
        type == "export"
      ) {
        switch (type) {
          case "new":
            this.formtitle = "新增精品线路";
            this.isModify = false;
            this.dialogFormVisible = true;
            break;
          //   case "revise":
          //     this.dialogFormVisible = true;
          //     this.formtitle = "修改精品线路";
          //     this.isModify = true;
          //     this.changeForm = this.selected;
          //     break;
          case "priority":
            this.isDelet = false;
            this.changeArr = this.checkedinformation;
            this.formtitleTable = "设置优先级";
            this.dialogFormVisibleTable = true;
            break;
          case "delete":
            this.isDelet = true;
            this.changeArr = this.checkedinformation;
            this.formtitleTable = "线路删除确认";
            this.dialogFormVisibleTable = true;
            break;
          case "export":
            this.$message.info("正在导出中...");
            exportBoutiqueLine(this.listSystemObj.vo)
              .then(res => {
                var blob = new Blob([res]);
                let href = window.URL.createObjectURL(blob);
                var NewDom = document.createElement("a");
                NewDom.setAttribute("href", href);
                NewDom.setAttribute("target", "_blank");
                NewDom.setAttribute(
                  "download",
                  "精品线路" +
                    parseTime(new Date().getTime(), "{y}{m}{d}{h}{i}{s}") +
                    ".xlsx"
                );
                document.body.appendChild(NewDom);
                NewDom.click();
                document.body.removeChild(NewDom);
              })
              .catch(err => {
                this.$message({
                  type: "warning",
                  message:
                    "操作失败，原因：" +
                    (err.errorInfo ? err.errorInfo : err.text)
                });
              });
            break;
        }
      } else {
        this.$message({
          type: "warning",
          message: "请选择一条列表数据!"
        });
      }
    },
    // 判断是否选中
    getinfomation(selection) {
      this.checkedinformation = selection;
    },
    // 点击选中当前行
    clickDetails(row, event, column) {
      // this.$refs.multipleTable.toggleRowSelection(row)
      this.selected = row;
    }
  }
};
</script>

<style type="text/css" lang="scss">
.boutiqueLine {
  .topPart {
    margin-bottom: 10px;
    .el-col {
      height: 150px;
      line-height: 150px;
    }
    .el-col-2 {
      text-align: center;
      padding-top: 60px;
      line-height: 1;
      span {
        color: #333;
        line-height: 30px;
      }
    }
    h2 {
      font-size: 14px;
      font-weight: bold;
      line-height: 30px;
      border-bottom: 1px solid #000;
      color: #333;
    }
    .el-upload--picture-card {
      border: 0 none;
    }
    .el-upload-list--picture-card .el-upload-list__item {
      margin: 0 8px 0 0;
    }
    .topPart_content {
      padding: 5px 0 0 0;
      .el-textarea {
        height: 100%;
        .el-textarea__inner {
          height: 100%;
        }
      }
    }
  }
  .topPart_Two {
    span {
      margin-left: 50px;
    }
  }
}
</style>
