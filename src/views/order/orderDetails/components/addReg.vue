<template>
  <div  class="wzlReg" v-if="isMatreg">
    <el-dialog
      :title='popTitle'
      :visible.sync="isShow"
      width="36%"
      top="18vh"
      v-el-drag-dialog
      center
      @close="closeMe"
      :close-on-click-modal="false" 
      :before-close="closeMe">
      <el-form :model="formAllData" :rules="rules"  ref="ruleForm" :inline="true"  label-position="right">
        <el-form-item label="登记时间">
          <el-date-picker
            disabled="disabled"
            v-model="searchCreatTime"
            align="right"
            type="date"
            :picker-options="pickOption2"
            placeholder="选择日期"
            value-format="timestamp">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="上报人类型" prop="reporterType">
          <el-select v-model="formAllData.reporterType" placeholder="请选择" @change="changeCode">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="物损类型" prop="claimType">
          <el-select v-model="formAllData.claimType" clearable placeholder="请选择物损类型">
            <el-option
              v-for="item in optionsclaimType"
              :key="item.code"
              :label="item.name"
              :value="item.code"
              :disabled="item.disabled">
            </el-option>
          </el-select>
        </el-form-item> 
        <el-form-item class="goodsclaimDes" label="物损描述" prop="claimDes">
          <el-input v-model="formAllData.claimDes" type="textarea" :maxlength="200" style="width:100%" placeholder="物损描述最多输入200个字符"></el-input>
        </el-form-item>
        <el-form-item class="clearfix imgbox" label="物损图片" prop="claimPic1">
          <div class="clearfix uploadcard">
            <upload v-model="formAllData.claimPic1" :title="'本地上传'" :showFileList="true" :limit="4" listtype="picture"/>
          </div>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" plain  icon="el-icon-success" @click="submitForm('ruleForm')">确 定</el-button>
        <el-button type="primary" plain icon="el-icon-error" @click="closeMe">取 消</el-button>
      </div>
    </el-dialog>
  </div>
  <div  class="wzlReg" v-else-if="isComreg">
    <el-dialog
      :title='popTitle'
      :visible.sync="isShow"
      width="30%"
      center
      top="18vh"
      @close="closeMe"
      :close-on-click-modal="false" 
      :before-close="closeMe">
      <el-form :model="formAlldicData" :rules="rules"  ref="ruleForm" :inline="true"  label-position="right">
        <el-form-item label="登记时间">
          <el-date-picker
            disabled="disabled"
            v-model="searchCreatTime"
            align="right"
            type="date"
            :picker-options="pickOption2"
            placeholder="选择日期"
            value-format="timestamp">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="投诉人类型" prop="reporterType">
          <el-select v-model="formAlldicData.reporterType" placeholder="请选择" @change="changeCode">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="投诉分类" prop="complainType">
          <el-select v-model="formAlldicData.complainType" clearable placeholder="请选择物损类型">
            <el-option
              v-for="item in optionsComplainatusType"
              :key="item.code"
              :label="item.name"
              :value="item.code"
              :disabled="item.disabled">
            </el-option>
          </el-select>
        </el-form-item> 
        <el-form-item class="goodsclaimDes" label="投诉内容" prop="complainDes">
          <el-input v-model="formAlldicData.complainDes" type="textarea" :maxlength="200" style="width:100%" placeholder="物损描述最多输入200个字符"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" plain  icon="el-icon-success" @click="submitForm('ruleForm')">确 定</el-button>
        <el-button type="primary" plain icon="el-icon-error" @click="closeMe">取 消</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { parseTime, pickerOptions2 } from '@/utils/index.js'
import Upload from '@/components/Upload/multImage'
import { DicClaimStatusType, DicComplainatusType } from '@/api/common'
import { postReportClaim } from '@/api/service/claim.js'
import { postReportComplain } from '@/api/service/dispose.js'
import { objectMerge2 } from '@/utils/index'
export default {
  computed: {
    isShow: {
      get() {
        return this.centerDialogVisibleReg
      },
      set() {}
    }
  },
  components: {
    Upload
  },
  props: {
    centerDialogVisibleReg: {
      type: Boolean,
      default: false
    },
    isMatreg: {
      type: Boolean,
      default: false
    },
    isComreg: {
      type: Boolean,
      default: false
    },
    belongCity: {
      type: [Number, String]
    }
  },
  data() {
    return {
      popTitle: '',
      btnsize: 'mini',
      sizes: [30, 50, 100],
      dataset: [],
      dataTotal: 0,
      pagesize: 30, // 初始化加载数量
      page: 1, // 初始化页码
      totalCount: null,
      value: '',
      searchCreatTime: +new Date(),
      pickOption2: '',
      checked: false,
      optionsclaimType: [],
      optionsComplainatusType: [],
      options: [{
        value: 0,
        label: '货主'
      }, {
        value: 1,
        label: '车主'
      }],
      form: {

      },
      rules: {
        reporterType: [
          { required: true, message: '请选择上报人类型' }
        ],
        claimPic1: [
          { required: true, message: '至少上传一张图片' }
        ]
      },
      formAllData: {
        reporterType: '',
        orderSerial: '', // 订单号
        createTime: '', // 登记时间
        // reporter: '', // 上报人
        claimType: '', // 物损类型
        claimDes: '', // 物损描述
        claimPic1: '' // 物损图片

      },
      formAlldicData: {
        orderSerial: '', // 订单号
        complainType: '', // 投诉分类
        reporterType: '', // 投诉人类型
        complainDes: ''// 投诉内容

      }
    }
  },
  watch: {
    isMatreg: {
      handler(newVal) {
        if (this.isMatreg) {
          this.popTitle = '物损登记'
        }
      },
      immediate: true
    },
    isComreg: {
      handler(newVal) {
        if (this.isComreg) {
          this.popTitle = '投诉登记'
          this.formAllData = {}
        }
      },
      immediate: true
    }
  },
  mounted() {
    this.getclaimstatus()
    this.getComplainatus()
  },
  methods: {
    reset() {
      this.$refs['ruleForm'].resetFields()
    },
    closeMe(done) {
      this.$emit('close')
      this.reset()
      if (typeof done === 'function') {
        done()
      }
    },
    changeCode(obj) {
      this.formAllData.reporterType = obj
    },
    getclaimstatus() {
      DicClaimStatusType().then(res => {
        res.data.map((item) => {
          this.optionsclaimType.push(item)
        })
      })
    },
    getComplainatus() {
      DicComplainatusType().then(res => {
        res.data.map((item) => {
          this.optionsComplainatusType.push(item)
        })
      })
    },
     // 判断选中与否
    getSelection(val) {
    //   console.log('选中内容', val)
      this.selectRowData = val
    },
    // 点击选中当前行
    clickDetails(row, event, column) {
      this.$refs.multipleTable.toggleRowSelection(row)
    },
    getFileInfo(obj) {
    //   console.log('pageUpFile:', obj, obj.name)
    },
    getFileList(list) {
      const address = []
      const name = []
      list.forEach((e, index) => {
        address.push(e.url)
        name.push(e.name)
      })
      this.formAllData.fileAddress = address.join(',')
      this.formAllData.fileName = name.join(',')
    //   console.log('getFileList', this.formAllData)
    },
    handleChange() {},
    uploadHandleFile(_this) {
      const file = _this.file
    //   console.log('downfile :', file)
      let extension = ''
      const fileName = file.name.toLowerCase()
      const i = fileName.lastIndexOf('.')
      if (i > -1) {
        extension = fileName.substring(i)
      }
      if (!extension || extension !== '.txt') {
        this.$message({
          type: 'info',
          message: '只能上传 .txt 模板文件'
        })
        return
      }
      const data = new FormData()
      data.append('uploadfile', file)
      data.append('excelSign', this.info)
    },
    submitForm(ruleForm) {
      if (this.formAllData.claimType === '' && this.formAllData.claimDes === '' && this.isMatreg) {
        this.$message({
          message: '物损类型及物损描述至少选填一项!',
          type: 'warning'
        })
      } else if (this.formAlldicData.complainType === '' && this.formAlldicData.complainDes === '' && this.isComreg) {
        this.$message({
          message: '投诉分类及投诉内容至少选填一项',
          type: 'warning'
        })
      } else {
        this.$refs[ruleForm].validate((valid) => {
          if (valid) {
            this.formAllData.createTime = parseTime(this.searchCreatTime, '{y}-{m}-{d} {h}:{i}:{s}')
            // this.$set(this.formAllData, 'goodsclaimId', this.rowid)
            this.formAllData.orderSerial = this.$route.query.orderSerial
            this.formAlldicData.orderSerial = this.$route.query.orderSerial
            const data1 = objectMerge2({}, this.formAllData)
            // this.$set(data1, 'address', data1.claimPic1)
            const data2 = objectMerge2({}, this.formAlldicData)
            let promiseObj
            if (this.isMatreg) {
              promiseObj = postReportClaim(data1)
            } else {
              promiseObj = postReportComplain(data2)
            }
            promiseObj.then(res => {
              this.$message({
                message: '保存成功~',
                type: 'success'
              })
              this.closeMe()
              this.$emit('success')
            }).catch(err => {
              this.$message({
                type: 'error',
                message: err.errorInfo || err.text || '未知错误，请重试~'
              })
              this.loading = false
              // this.closeMe()
            })
          } else {
            return false
          }
        })
      }
    }
  }
}
</script>
<style lang="scss">
.wzlReg{
  .classify_info{
    padding-bottom:0 !important;
  }
  .el-message-box .showPictureWrapper .el-message-box--center{
          overflow: hidden !important;
        }
  .el-dialog{
    max-width: 100%;
    min-width: 35%;
    border-radius: 4px;
    .el-dialog__header{
        border-bottom:1px solid #ccc;
        text-align:center;
        height:40px;
        padding:10px 0;
        color:#fff;
        font-weight:bold;
        background-color: #42485b;
        .el-dialog__title{
            font-size: 16px;
            font-weight: normal;
            font-stretch: normal;
            line-height: 20px;
            color: #ffffff;
        }
        .el-dialog__headerbtn{
            top:10px;
            right:10px;
        }
    }
    .el-input__inner{
      height:35px;
      line-height: 35px;
    }
    .picklist{
      width: 217px;
    }
    .goodsclaimDes{
      width:100%;
      .el-form-item__content{
        width:80%;
      }
    }
    .uploadcard{
      width:500px;
    }
    .el-upload-list--picture .el-upload-list__item{
      width:48%;
      float:left;
      margin-right:2%;
    }
  }
  
}
</style>

