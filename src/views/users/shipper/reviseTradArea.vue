<template>
  <div class="reviseTradeArea commoncss">
    <el-dialog
        :title="formtitle"
        :close-on-click-modal="false"
        v-el-drag-dialog
        top="5vh"
        @open="reviseForms"
        :visible="dialogFormVisible"
        @close="close"
    >
      <el-form
        :model="standForm"
        :rules="newrules"
        label-position="right"
        ref="ruleForm"
        :label-width="formLabelWidth"
      >
        <el-row>
          <el-col style="margin-bottom:10px;">
            <el-button
            type="primary"
            plain
            @click="handleClick(null,'download')"
            :size="btnsize"
            >下载模板</el-button
            >
            <el-button
            type="primary"
            icon="el-icon-download"
            plain
            @click="handleClick(null,'import')"
            :size="btnsize"
            >导入EXCEL</el-button>
            <input
              type="file"
              ref="input"
              id="uploadFile"
              class="upLoadInput"
              @change="importf(this)"
              accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
            />
          </el-col>
        </el-row>
        <el-row>
            <el-col :span="12">
                <el-form-item label="认证所属商圈：" prop="tradeAreaId">
                    <tradeAreaList @inputObject = "getVal" v-model="standForm.tradeAreaId" ref ='tradeArea'/>
                </el-form-item>
            </el-col>
        </el-row>
        <el-row>
            <el-table
            ref="multipleTable"
            :data="tableData"
            stripe
            border
            tooltip-effect="dark"
            style="width: 100%"
            >
            <el-table-column label="序号"  width="60">
                <template slot-scope="scope">
                    {{ (Page - 1)*Pagesize + scope.$index + 1 }}
                </template>
            </el-table-column>  
            <el-table-column
                label="手机号码"
                :show-overflow-tooltip="true"
                sortable
                prop="mobile"
            ></el-table-column>
            <el-table-column
                prop="companyName"
                :show-overflow-tooltip="true"
                sortable
                label="公司名称"
            ></el-table-column>
            <el-table-column
                prop="tradeAreaName"
                :show-overflow-tooltip="true"
                sortable
                label="认证所属商圈"
            ></el-table-column>
            </el-table>
            <el-pagination
                background
                @size-change="(val)=>{return handleClick(val,'sizeChange')}"
                @current-change="(val)=>{return handleClick(val,'currentSize')}"
                layout="total,prev, pager, next, jumper"
                :page-size="Pagesize"
                :total="totalCount">
            </el-pagination>
        </el-row>
        </el-form>
        <div slot="footer" class="dialog-footer">
            <el-button
            type="primary"
            plain
            icon="el-icon-success"
            @click="submitForm('ruleForm')"
            :disabled="btnShow"
            >保 存</el-button
            >
            <el-button type="primary" plain icon="el-icon-error" @click="close"
            >取 消</el-button
            >
        </div>
    </el-dialog>
  </div>
</template>

<script>
import XLSX from "xlsx";
import { reviseTradeAre } from "@/api/users/shipper/all_shipper.js";
import { objectMerge2 } from "@/utils/";
import tradeAreaList from '@/components/selectTree/tradeArea'

export default {
  name: "reviseTradeArea",
  props: {
    dialogFormVisible: {
      type: Boolean,
      required: true
    },
    formtitle: {
      type: String,
      required: false,
      default: "修改认证商圈"
    },
    changeList: {
      type: Array,
      default: () => []
    }
  },
  components: {
    tradeAreaList
  },
  data() {
    return {
      btnShow: false,
      excelData: [], //导入excel或查询的表
      formLabelWidth: "120px",
      btnsize: "mini",
      Page: 1,
      Pagesize: 20,
      totalCount: 0,
      tableData: [],
      resiveData:[],
      standForm: {
        tradeAreaId: "",
        tradeAreaName:''
      },
      newrules: {
        tradeAreaId:{required: false,message: '请选择认证所属商圈',trigger: 'change'},
      }
    };
  },
  mounted() {},
    destroyed() {
    this.excelData = []
  },
  methods: {
    reviseForms() {
      this.$nextTick(() => {
          this.resiveData = this.changeList;
          this.nowTable()
      });
    },
    getVal(val) {
        console.log('getVal', val)
        this.standForm.tradeAreaId = val.id// 认证所属商圈ID
        this.standForm.tradeAreaName = val.tradeName// 认证所属商圈名字
    },
    close() {
      if (this.dialogFormVisible) {
        this.$emit("update:dialogFormVisible", false);
        this.$refs.ruleForm.resetFields();
        this.clearForms();
        this.$emit("renovate");
        this.btnShow = false;
      }
    },
    nowTable() {
        this.totalCount = this.resiveData.length;
        let pageStart = (this.Page - 1) * this.Pagesize;
        let pageEnd = this.Page * this.Pagesize;
        this.tableData = this.resiveData.slice(pageStart, pageEnd);
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
                console.log(fromTo);
                self.excelData=[]
                self.excelData = self.excelData.concat(
                    XLSX.utils.sheet_to_json(workbook.Sheets[sheet])
                );
                }
            }
            //   console.log('workbook',workbook,self.excelData)
            //   console.log('workbookworkbook',workbook.Sheets[sheet].A1.v,workbook.Sheets[sheet].B1.v,workbook.Sheets[sheet].C1.v)
            let fromToArr = fromTo.split(':')
            if(fromToArr[1].indexOf("C") > -1 && (workbook.Sheets[sheet].A1.v === "手机号码" && workbook.Sheets[sheet].B1.v === "公司名称"&& workbook.Sheets[sheet].C1.v === "认证所属商圈" )){
                let arrs = [];
                self.excelData.forEach(item => {
                    arrs.push({
                    mobile: item["手机号码"],
                    companyName: item["公司名称"],
                    tradeAreaName: item["认证所属商圈"],
                    });
                });
                //   self.resiveData = self.resiveData.concat(
                //     arrs
                //   );
                self.resiveData = arrs
                self.nowTable();
            }else{
                self.$message.info("导入excel表头与模板不一致");
                return
            }
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
    },
    //初始化选择项数据
    init() {},
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.btnShow = true;
          let forms = {
                "list": this.tableData,
                "tradeAreaId":this.standForm.tradeAreaId,
                "tradeAreaName":this.standForm.tradeAreaName,
          };
         reviseTradeAre(forms).then(res => {
              this.$message({
                type: "success",
                message: "操作成功"
              });
              this.close();
            })
            .catch(err => {
              this.$message({
                type: "info",
                message:
                  "操作失败，原因：" +
                  (err.errorInfo ? err.errorInfo : err.text)
              });
              this.btnShow = false;
            });
        } else {
          this.$message({
            type: "warning",
            message: "请填写完整数据!"
          });
          return false;
        }
      });
    },
    handleClick(val,type){
        switch (type) {
            case "sizeChange":
                // console.log('sizeChange',val)
                break;
            case "currentSize":
                // console.log('currentSize',val)
                this.Page = val;
                this.nowTable()
                break;
            case "import":
                this.$refs.input.click();
                break;
            case "download":
                window.open("https://aflc.oss-cn-shenzhen.aliyuncs.com/Business/%E6%89%B9%E9%87%8F%E4%BF%AE%E6%94%B9%E5%95%86%E5%9C%88%E6%A8%A1%E6%9D%BF.xlsx");
                break;
            default:
                break;
        }
    },
    clearForms() {
      for (const i in this.standForm) {
        this.standForm[i] = "";
      }
    }
  }
};
</script>

<style rel="stylesheet/scss" lang="scss">
.reviseTradeArea {
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
</style>
