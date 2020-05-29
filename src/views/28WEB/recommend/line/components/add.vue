<template>
  <div  class="wzlReg" v-if="isMatreg">
    <el-dialog
      :title='popTitle'
      :visible.sync="isShow"
      width="30%"
      center
      @close="closeMe"
      :close-on-click-modal="false" 
      :before-close="closeMe">
      <el-form :model="formAllData" :rules="rules"  ref="ruleForm" :inline="true"  label-position="right" label-width="100px">
        <el-form-item label="推荐栏目" prop="recommendColumn">
          <el-input v-number-only:point v-model.trim="formAllData.recommendColumn" :maxlength="6" disabled="disabled" auto-complete="off" clearable></el-input>
        </el-form-item>
         <el-form-item label="推荐位置" prop="recommendPosition">
          <el-input v-number-only:point v-model.trim="formAllData.recommendPosition" :maxlength="6" disabled="disabled" auto-complete="off" clearable></el-input>
        </el-form-item>
        <el-form-item label="推荐有效期" prop="searchCreatTime">
          <el-date-picker
            v-model="searchCreatTime"
            type="daterange"
            align="right"
            popper-class='searchCreatTime'
            value-format="yyyy-MM-dd"
            start-placeholder="开始日期"
            :picker-options="pickerOptions2"
            end-placeholder="结束日期">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="自定义属性" prop="settopStatus" style="width:100%">
          <el-checkbox v-model="formAllData.settopStatus">置顶</el-checkbox>
        </el-form-item>
        <el-form-item label="推荐费" prop="recommendFee">
          <el-input v-number-only:point v-model.trim="formAllData.recommendFee" :maxlength="6" placeholder="请输入推荐费" auto-complete="off" clearable></el-input>
        </el-form-item>
        <el-form-item class="goodsclaimDes" label="备注" prop="claimDes">
          <el-input v-model.trim="formAllData.remarks" type="textarea" :maxlength="100" style="width:100%" placeholder="请输入备注信息"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" plain @click="submitForm('ruleForm')">确 定</el-button>
        <el-button type="primary" plain @click="closeMe">取 消</el-button>
      </div>
    </el-dialog>
  </div>
  
</template>
<script>
import { parseTime, pickerOptions2 } from '@/utils/index.js'
import Pager from '@/components/Pagination/index'
import Upload from '@/components/Upload/multImage'
import { postAmend } from '@/api/web/recommend.js'
import { objectMerge2 } from '@/utils/index'
import { REGEX } from '@/utils/validate'
export default {
  computed: {
    isShow: {
      get() {
        return this.centerDialogVisible
      },
      set() {}
    }
  },
  components: {
    Pager,
    Upload
  },
  props: {
    centerDialogVisible: {
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
    selectInfo: {
      type: [Array, Object],
      default: () => {
      }
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

      pickerOptions2: {
        shortcuts: pickerOptions2
      },
      checked: false,
      optionsclaimType: [],
      optionsComplainatusType: [],
      searchCreatTime: [],
      // defaultTime: [parseTime(+new Date() - 60 * 24 * 60 * 60 * 1000, '{y}-{m}-{d}'), parseTime(new Date(), '{y}-{m}-{d}')],
      value3: true,
      value4: true,
      form: {

      },
      rules: {
        recommendColumn: [
          { required: true, message: '请选择推荐栏目' }
        ],
        recommendPosition: [
           { required: true, message: '请选择推荐位置' }
        ],
        recommendFee: [
          { pattern: REGEX.ONLY_NUMBER_POINT, required: true, message: '请输入推荐费,限制1位小数' }
        ]
      },
      formAllData: {
        recommendColumn: '', // 推荐栏目
        recommendPosition: '', // 推荐位置
        recommendStarttime: '', // 推荐开始时间
        recommendEndtime: '', // 推荐结束时间
        settopStatus: false, // 置顶状态（0-不置顶 1-置顶）
        recommendFee: '', // 推荐费用
        remarks: '' // 备注
      }
    }
  },
  watch: {
    isMatreg: {
      handler(n) {

      }
    },
    selectInfo: {
      handler(n) {
        if (this.$refs['ruleForm']) {
          this.$refs['ruleForm'].resetFields()
        }
        if (this.isMatreg) {
          this.popTitle = '推荐设置'
          this.getSelectInfo(this.selectInfo)
          console.log(this.info, 'info')
          // this.searchCreatTime = this.defaultTime
        }
      }
    }
  },
  mounted() {
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
    getSelectInfo(selectInfo) {
      console.log('selectInfo',selectInfo)
      this.formAllData.recommendColumn = selectInfo.recommendColumn
      this.formAllData.recommendPosition = selectInfo.recommendPosition
      this.formAllData.recommendStarttime = selectInfo.recommendStarttime
      if (selectInfo.settopStatus === 1) {
        this.formAllData.settopStatus = true
      } else {
        this.formAllData.settopStatus = false
      }
      this.formAllData.recommendFee = selectInfo.recommendFee
      this.formAllData.remarks = selectInfo.remarks
      this.searchCreatTime[0] = selectInfo.recommendStarttime
      this.searchCreatTime[1] = selectInfo.recommendEndtime
    },
    submitForm(ruleForm) {
      this.$refs[ruleForm].validate((valid) => {
        if (valid) {
          if (this.formAllData.settopStatus === true) {
            this.formAllData.settopStatus = 1
          } else {
            this.formAllData.settopStatus = 0
          }
          this.formAllData.recommendStarttime = Date.parse(this.searchCreatTime[0] + ' 00:00:00')
          this.formAllData.recommendEndtime = Date.parse(this.searchCreatTime[1] + ' 23:59:59')
          this.formAllData.associatedId = this.selectInfo.id
          const data1 = objectMerge2({}, this.formAllData)
          let promiseObj
          if (this.isMatreg) {
            promiseObj = postAmend(this.selectInfo.id, data1)
          } else {
            // promiseObj = postReportComplain(data2)
          }
          promiseObj.then(res => {
            this.$message({
              message: '修改成功~',
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
          })
        } else {
          return false
        }
      })
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
    min-width: 40%;
    margin-top: 18vh !important;
    .el-dialog__header{
      background:#0b4b7c;
      text-align: center;
      height: 40px;
      line-height: 40px;
      // padding-left: 20px;
      padding:0 20px;
      .el-dialog__headerbtn {
        position: absolute;
        top: 13px;
        right: 20px;
        padding: 0;
        background: 0 0;
        border: none;
        outline: 0;
        cursor: pointer;
        font-size: 16px;
      }
      .el-dialog__headerbtn :hover{
        color:#fff !important;
        transform:scale(1.5)
      }
      span{
        color:#fff;
      }
    }
    .el-dialog__footer{
      padding-bottom: 6%;
      .el-button{
        padding: 8px 35px;
      }
    }
    .el-input__inner{
      height:35px;
      line-height: 35px;
      color: #3e9ff1;
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
    .el-textarea__inner{
      height:100px;
      color: #3e9ff1;
    }
    .el-range-editor.el-input__inner{
      width: 217px;
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

