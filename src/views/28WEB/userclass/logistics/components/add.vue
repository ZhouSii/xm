<template>
  <div  class="wzlReg commoncss" v-if="isMatreg">
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
          <el-select v-model="formAllData.recommendColumn" placeholder="请选择" @change="changeColumn">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="推荐位置" prop="recommendPosition">
          <el-select v-model="formAllData.recommendPosition" placeholder="请选择" @change="changePosition">
            <el-option
              v-for="(item,index) in options1"
              :key="item.value"
              :label="item.label"
              :value="item.value"
              :disabled="options1list.indexOf(index) == '-1'"
              >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="推荐有效期" prop="searchCreatTime">
          <el-date-picker
            v-model="searchCreatTime"
            :default-value="defaultTime"
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
import { postAddline } from '@/api/web/logistics.js'
// import { postReportComplain } from '@/api/service/dispose.js'
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
      type: [Array, Object]
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
      defaultTime: [parseTime(+new Date() - 60 * 24 * 60 * 60 * 1000, '{y}-{m}-{d}'), parseTime(new Date(), '{y}-{m}-{d}')],
      value3: true,
      value4: true,
      options: [{
        value: '首页',
        label: '首页'
      }, {
        value: '物流专线栏目',
        label: '物流专线栏目'
      }, {
        value: '专线详情页',
        label: '专线详情页'
      }],
      options1: [{
        value: '找物流专线',
        label: '找物流专线'
      }, {
        value: '物流专线列表',
        label: '物流专线列表'
      }, {
        value: '右侧专线推荐',
        label: '右侧专线推荐'
      }, {
        value: '此线路其他专线',
        label: '此线路其他专线'
      }],
      options1list: [],
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
        associatedId: '', // 专线id
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
      handler(newVal) {
        if (this.isMatreg) {
          this.formAllData = {}
          this.searchCreatTime = this.defaultTime
          this.popTitle = '推荐设置'
        }
      },
      immediate: true
    }
    // isComreg: {
    //   handler(newVal) {
    //     if (this.isComreg) {
    //       this.popTitle = '投诉登记'
    //       this.formAllData = {}
    //     //   console.log(this.isComreg)
    //     }
    //   },
    //   immediate: true
    // }
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
    changeColumn(obj) {
      // this.formAllData.recommendPosition = ''
      this.options1list = []
      this.formAllData.recommendColumn = obj
      switch (obj) {
        case '首页'
            :this.options1list.push(0)
          break
        case '物流专线栏目'
            :this.options1list.push(1, 2)
          break
        case '专线详情页'
            :this.options1list.push(3)
          break
      }
    },
    changePosition(obj) {
      this.formAllData.recommendPosition = obj
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
            promiseObj = postAddline(data1)
          } else {
            // promiseObj = postReportComplain(data2)
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
    //   background:#0b4b7c;
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
        // padding: 8px 35px;
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
    .el-textarea__inner{
      height:100px;
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

