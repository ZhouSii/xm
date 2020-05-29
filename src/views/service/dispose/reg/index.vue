<template>
  <div  class="wzldisReg">
    <el-dialog
      title="投诉登记"
      :visible.sync="isShow"
        top="6vh"
      center
      @close="closeMe"
      :close-on-click-modal="false" 
      :before-close="closeMe">
      <el-form :model="formAllData" :rules="rules"  ref="ruleForm" class="demo-ruleForm classify_searchinfo" :inline="true"  label-position="right">
        <el-form-item label="交易时间">
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
        <el-form-item label="货主">
          <el-input v-model="formAllData.shipperName" :maxlength="20" placeholder="账户/姓名" auto-complete="off" clearable></el-input>
        </el-form-item>
        <el-form-item label="车主">
          <el-input v-model="formAllData.driverName" :maxlength="20" placeholder="账户/姓名/车号牌" auto-complete="off" clearable></el-input>
        </el-form-item>
        <el-form-item label="订单号">
          <el-input v-model="formAllData.orderSerial" :maxlength="20" auto-complete="off" clearable></el-input>
        </el-form-item>
        <el-form-item class="btnChoose fr"  style="margin-left:0;">
          <el-button type="primary" :size="btnsize" plain @click="handleSearch('search')" icon="el-icon-search">搜索</el-button>
          <el-button type="info" :size="btnsize" plain @click="handleSearch('clear')" icon="fontFamily aflc-icon-qingkong">清空</el-button>
        </el-form-item>
      </el-form>
      <div class="classify_info">
        <div class="info_news">    
          <el-table ref="multipleTable" style="width: 100%" stripe border height="100%" @row-click="clickDetails" @selection-change="getSelection" highlight-current-row :data="dataset"  tooltip-effect="dark">
            <el-table-column
              label="选择"
              type="selection"
              width="50">
            </el-table-column>
            <el-table-column fixed label="序号" sortable  width="60">
              <template slot-scope="scope">
              {{ (page - 1)*pagesize + scope.$index + 1 }}
              </template>
            </el-table-column> 
            <!-- <el-table-column fixed label="订单号" prop="orderSerial" sortable :show-overflow-tooltip="true" width="300">
            </el-table-column> -->
            <el-table-column
              :show-overflow-tooltip="true"
              prop="orderSerial"
              label="订单号"
              sortable
              width="250"
              >
              <template  slot-scope="scope">
                <h4 class="needMoreInfo" @click="pushOrderSerial(scope.row)">{{ scope.row.orderSerial}}</h4>
              </template>
            </el-table-column>
            <el-table-column 
              sortable 
              prop="provinceCityArea" 
              label="所属区域"  
              width="300">
            </el-table-column>
            <el-table-column  
              label="货主"
              sortable 
               prop="shipperName"
              :show-overflow-tooltip="true" 
              width="250">
            </el-table-column>
            <el-table-column  
              label="车主" 
               prop="driverName"
              sortable 
              :show-overflow-tooltip="true"  
              width="250">
            </el-table-column>
            <el-table-column  
              label="提货地" 
              prop="startAddress" 
              sortable 
              :show-overflow-tooltip="true"  
              width="300">
            </el-table-column>
            <el-table-column  
              label="目的地" 
              prop="endAddress" 
              sortable 
              :show-overflow-tooltip="true"  
              width="300">
            </el-table-column>   
            <el-table-column
            :show-overflow-tooltip="true"
            prop=""
            label="下单时间"
            width="200"
            sortable
            >
            <template  slot-scope="scope">
              <span class="orderSerial">
                {{ scope.row.useTime | parseTime('{y}-{m}-{d} {h}:{i}:{s}')}}    
              </span>
            </template>
            <!-- <template slot-scope="scope">{{ scope.row.commissionTime | parseTime('{y}-{m}-{d} {h}:{i}:{s}')}}</template> -->
            </el-table-column>
          </el-table> 
        </div> 
        <div class="info_bottom">
          <!-- class="demo-ruleForm classify_searchinfo" -->
          <el-form  label-position="right" :model="searchForm" :rules="rules"  ref="ruleForm" :inline="true">
            <el-form-item label="投诉分类" prop="complainType">
              <el-select v-model="searchForm.complainType" clearable placeholder="请选择处理状态">
                <el-option
                  v-for="item in optionsclaimType"
                  :key="item.code"
                  :label="item.name"
                  :value="item.code"
                  :disabled="item.disabled">
                </el-option>
              </el-select>
            </el-form-item> 
            <el-form-item label="投诉人类型" prop="reporterType">
              <el-select v-model="searchForm.reporterType" placeholder="请选择" @change="changeCode">
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item class="discrabel" label="投诉内容" prop="complainDes">
              <el-input v-model="searchForm.complainDes" type="textarea" :maxlength="200" style="width:100%" placeholder="物损描述最多输入200个字符"></el-input>
            </el-form-item>
          </el-form>
        </div>
        <!-- 页码 -->
        <div class="info_tab_footer">共计:{{ dataTotal }}<div class="show_pager"> <Pager :total="dataTotal" @change="handlePageChange"  :sizes="sizes"/></div> </div>  
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" plain  icon="el-icon-success" @click="submitForm('ruleForm')">确 定</el-button>
        <el-button type="primary" plain icon="el-icon-error" @click="closeMe">取 消</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { parseTime, pickerOptions2 } from '@/utils/index.js'
import { postListClain } from '@/api/service/claim.js'
import { postReportComplain } from '@/api/service/dispose.js'
import Pager from '@/components/Pagination/index'
import Upload from '@/components/Upload/multImage'
import { DicComplainatusType } from '@/api/common'
import { objectMerge2 } from '@/utils/index'
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
    }
  },
  data() {
    return {
      btnsize: 'mini',
      sizes: [10, 50, 100],
      dataset: [],
      dataTotal: 0,
      pagesize: 10, // 初始化加载数量
      page: 1, // 初始化页码
      totalCount: null,
      value: '',
      pickOption2: '',
      selected: [],
      optionsclaimType: [],
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
          { required: true, message: '请选择投诉人类型' }
        ],
        claimPic1: [
          { required: true, message: '至少上传一张图片' }
        ]
      },
      pickerOptions2: {
        shortcuts: pickerOptions2
      },
      searchCreatTime1: +new Date(),
      searchCreatTime: [],
      defaultTime: [parseTime(+new Date() - 60 * 24 * 60 * 60 * 1000, '{y}-{m}-{d}'), parseTime(new Date(), '{y}-{m}-{d}')],
      formAllData: {
        orderSerial: '',
        startOrderDate: '',
        endOrderDate: '',
        shipperName: '',
        driverName: ''
      },
      searchForm: {
        // createTime: '',
        complainDes: '',
        // claimPic1: '',
        reporterType: '',
        complainType: '',
        orderSerial: ''
      }
    }
  },
  watch: {
    isShow: {
      handler(newVal) {
        if (newVal) {
          // this.searchForm = {}
          this.firstblood()
        }
      },
      immediate: true
    }
  },
  mounted() {
    this.searchCreatTime = this.defaultTime
    this.firstblood()
    this.getclaimstatus()
  },
  methods: {
    // 请求接口刷新页面
    firstblood() {
      // this.loading = false
      postListClain(this.page, this.pagesize, this.formAllData).then(res => {
        this.dataTotal = res.data.totalCount
        this.dataset = res.data.list
      })
    },
    // 查询条件
    handleSearch(type) {
      switch (type) {
        case 'search':
          if (this.searchCreatTime) {
            this.formAllData.startOrderDate = this.searchCreatTime ? parseTime(this.searchCreatTime[0], '{y}-{m}-{d}') + ' 00:00:00' : null
            this.formAllData.endOrderDate = this.searchCreatTime ? parseTime(this.searchCreatTime[1], '{y}-{m}-{d}') + ' 23:59:59' : null
          } else {
            this.formAllData.startOrderDate = null
            this.formAllData.endOrderDate = null
          }
          this.firstblood()
          break
        case 'clear':
          this.formAllData = {
            orderSerial: '',
            startOrderDate: '',
            endOrderDate: '',
            shipperName: '',
            driverName: ''
          }
          this.firstblood()
          break
      }
    },
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
    getclaimstatus() {
      DicComplainatusType().then(res => {
        res.data.map((item) => {
          this.optionsclaimType.push(item)
        })
      })
    },
    // 每页显示数据量变更
    handlePageChange(obj) {
      this.page = obj.pageNum
      this.pagesize = obj.pageSize
      this.firstblood()
    },
     // 详情弹窗
    pushOrderSerial(item) {
      this.$router.push({ name: '订单详情', query: { orderSerial: item.orderSerial }})
    },
    // 查询上报人类型
    changeCode(obj) {
      this.searchForm.reporterType = obj
    },
    getSelection(selected) {
      this.selected = selected
    },
    // 点击选中当前行
    clickDetails(row, event, column) {
      this.$refs.multipleTable.toggleRowSelection(row)
    },
    submitForm(ruleForm) {
      if (!this.selected.length) {
        this.$message({
          message: '请选择要操作的项~',
          type: 'warning'
        })
      } else if (this.selected.length > 1) {
        this.$message({
          message: '每次只能登记一条数据',
          type: 'warning'
        })
        // return false
      } else if (this.searchForm.complainType === '' && this.searchForm.complainDes === '') {
        this.$message({
          message: '投诉分类及投诉内容至少选填一项！',
          type: 'warning'
        })
        return false
      } else {
        this.$refs[ruleForm].validate((valid) => {
          if (valid) {
            // this.searchForm.createTime = parseTime(this.searchCreatTime1, '{y}-{m}-{d} {h}:{i}:{s}')
            this.searchForm.orderSerial = this.selected[0].orderSerial
            const data = objectMerge2({}, this.searchForm)
            postReportComplain(data).then(res => {
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
}
</script>
<style lang="scss">
.wzldisReg{
  .el-dialog__wrapper{
    overflow-y: hidden;
    min-height: 700px;
  }
  .classify_info{
    padding-bottom:0 !important;
  }
  .el-dialog{
    max-width: 100%;
    min-width: 71%;
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
    .el-dialog__body{
      max-height: 700px;
      // overflow-y: scroll;
    }
    .el-dialog__footer{
      padding-bottom: 6%;
      .el-button{
        padding: 8px 35px;
      }
    }
    .info_bottom{
      padding-top:2%;
      max-width:100%;
      min-width: 20%;
      .el-form-item{
        width:408px;
        float:left;
      }
      .imgbox{
        // height:183px;
        // line-height: 183px;
        width: 100%;
        min-height: 200px;
        .el-upload-list--picture .el-upload-list__item{
          width:232px;
          float:left;
          margin-right:6px;
        }
      }
      .discrabel{
        // height: 100px;
        width:100%;
        .el-form-item__content{
          // height: 100px;
          min-width: 62%;
          .el-textarea__inner{
            // min-height:100px;
          }
        }
      }
      .el-form-item__content {
        .el-input {
          width: 217px;
          .el-input--suffix{
            margin-left:13px !important;
          }
        }
        .el-textarea{
          width: 80% !important;
        }
      }
      .el-form-item {
        margin-right: 5px;
      }
    }
  }
  
}
</style>

