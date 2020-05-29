<template>
     <div class="CashPaymentNotes commoncss">
        <el-dialog :title="typetitle" :visible="dialogPaymentNotes" :modal-append-to-body = 'false' :before-close="close" top="5vh" :close-on-click-modal="false" ref="dialog">
        <el-form :model="formAll" ref="formAll" :inline="true" v-if="!showFlag">
            <el-form-item label="付款账户">
                <el-input clearable v-model="formAll.fundAccountNum" ></el-input>
            </el-form-item>
            <el-form-item label="资金流水号">
                <el-input clearable v-model="formAll.fundSerial" ></el-input>
            </el-form-item>
            <el-form-item label="付款时间">
                <el-date-picker
                v-model="settle"
                type="daterange"
                unlink-panels
                :picker-options="pickerOptions2"
                range-separator="-"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
                :default-time="['00:00:00', '23:59:59']"
                @change='sTime'>
                </el-date-picker>
            </el-form-item>
            <el-form-item label="登记时间">
                <el-date-picker
                v-model="created"
                type="daterange"
                unlink-panels
                :picker-options="pickerOptions2"
                range-separator="-"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
                :default-time="['00:00:00', '23:59:59']"
                @change='cTime'>
                </el-date-picker>
            </el-form-item>
          <el-form-item class="fr">       
          <el-button type="primary" plain @click="getData_query" :size="btnsize" icon="el-icon-search">搜索</el-button>
          <el-button type="info" plain @click="clearSearch"  :size="btnsize" icon="fontFamily aflc-icon-qingkong">清空</el-button>
          </el-form-item>
        </el-form>
        <div class="btnSection">
            <el-button type="primary" icon="el-icon-close" plain :size="btnsize" @click="handclick" v-if="!showFlag">删除</el-button>
        </div>
        <div style="height:100%">
        <el-table ref="multipleTable" style="width: 100%" stripe border height="100%" @selection-change="getSelection" @row-click="clickDetails" highlight-current-row :data="tableDataAll"  tooltip-effect="dark">
            <el-table-column label="选择" type="selection" width="50" v-if="!showFlag"></el-table-column>
           <el-table-column label="序号"   width="60">
                <template slot-scope="scope">
                  {{ (page - 1)*pagesize + scope.$index + 1 }}
                </template>
            </el-table-column>
            <el-table-column  label="付款账户" prop="fundAccountNum"  show-overflow-tooltip width="120"></el-table-column>
            <el-table-column  label="所属银行/三方" prop="fundAccountBank"  show-overflow-tooltip width="120"></el-table-column>
            <el-table-column  label="付款金额（元）" prop="settleAmount"  show-overflow-tooltip width="120"></el-table-column>
            <el-table-column  label="资金流水号" prop="fundSerial"  show-overflow-tooltip width="120"></el-table-column>
            <el-table-column  label="付款时间" prop="settleTime"  show-overflow-tooltip width="200"></el-table-column>
            <el-table-column  label="登记人" prop="creater"  show-overflow-tooltip width="120"></el-table-column>
            <el-table-column  label="登记时间" prop="createTime"  show-overflow-tooltip width="200"></el-table-column>
            <el-table-column  label="凭证" prop="certificateUrl"  show-overflow-tooltip width="180">
              <template slot-scope="scope">
               <img :src='scope.row.certificateUrl' alt="" v-showPicture style="width:100px" />
               </template>
            </el-table-column>
            </el-table>
        </div>
         <div class="info_tab_footer">共计:{{ dataTotal }} <div class="show_pager"> <Pager :total="dataTotal" @change="handlePageChange"  :sizes="sizes" ref="pager"/></div> </div> 
        <div slot="footer" class="dialog-footer">
          <el-button @click="close()" >取 消</el-button>
        </div>
      </el-dialog>
     </div>
</template>
<script>
import { eventBus } from '@/eventBus'
import { parseTime,pickerOptions2 } from '@/utils/'
import { GetextractFailReject } from '@/api/finance/CarCash.js'
import { aflcLclExtractCashSettleList,aflcLclExtractCashSettleDelete } from '@/api/finance/CashPrice.js'
import Pager from '@/components/Pagination/index'
export default {
  components: {
    Pager
  },
  props: {
    params:{
        type:[Object,Array],
    },
    typetitle: {
        type: String,
        default: ''
    },
    /*add新增，edit编辑，view查看*/
    editType: {
      type: String,
    },
    dialogPaymentNotes:{
      type:Boolean,
      default:false
    },
    showFlag:{
      type:Boolean,
      default:false
    },
  },
  data() {
    return {
      defaultImg:'/static/test.jpg',
      formLabelWidth:'150px',
      pickerOptions2: {shortcuts: pickerOptions2},
      btnsize: 'mini',
      selectRowData: [],
      sizes: [10, 20, 50, 100],
      pagesize: 10, // 初始化加载数量
      page: 1, // 初始化页码
      totalCount: null,
      dataTotal: 0,
      tableDataAll: [],
      formAll:{
          extractCashId:null,
          fundAccountNum:null,
          fundSerial:null,
          settleEndTime:null,
          settleStartTime:null,
          createStartTime:null,
          createEndTime:null,
      },
      tableDataAll: [],
      settle:[],
      created:[],
    }
  },
  watch: {
    dialogPaymentNotes: {
      handler: function(val, oldVal) {
        if (!val) {
        this.$emit('getData');
        this.formAll = {
          extractCashId:this.params[0].id,
          fundAccountNum:null,
          fundSerial:null,
          settleEndTime:null,
          settleStartTime:null,
          createStartTime:null,
          createEndTime:null,
        }
        this.settle = []
        this.created = []
        }
        else{
        this.openDialog();
        this.btnStatus = true
        }
      }
    },
  },
  methods: {
    openDialog: function() {
        this.formAll.extractCashId = this.params[0].id
        this.firstblood()
    },
    close: function() {
        this.$emit('update:dialogPaymentNotes', false);
    },
    firstblood(){
        aflcLclExtractCashSettleList(this.page, this.pagesize,this.formAll).then(res=>{
        this.dataTotal = res.data.totalCount
        this.tableDataAll = res.data.list
        this.tableDataAll.forEach(item => {
            item.settleTime = parseTime(item.settleTime,"{y}-{m}-{d} {h}:{i}:{s}");
            item.createTime = parseTime(item.createTime,"{y}-{m}-{d} {h}:{i}:{s}");
        })

        })
    },
    updataClick(){
    if (this.btnStatus) {
    this.btnStatus = false   
    GetextractFailReject(this.formAll).then(res=>{
        this.$emit('update:dialogPaymentNotes', false);
        this.$message.success('驳回成功')
    }).catch(err=>{
        this.$emit('update:dialogPaymentNotes', false);
        this.$message.error(err.errorInfo)
    })
    }
    },
    sTime(i){
      if(i){
        this.formAll.settleStartTime = i[0];
        this.formAll.settleEndTime = i[1];
      }else{  
        this.formAll.settleStartTime = '';
        this.formAll.settleEndTime = '';
      }      
    },
    cTime(i){
      if(i){
        this.formAll.createStartTime = i[0];
        this.formAll.createEndTime = i[1];
      }else{  
        this.formAll.createStartTime = '';
        this.formAll.createEndTime = '';
      }      
    },
     // 判断选中与否
    getSelection(val) {
      console.log('选中内容', val)
      this.selectRowData = val
    },
    // 点击选中当前行
    clickDetails(row, event, column) {
      this.$refs.multipleTable.toggleRowSelection(row)
    },
    // 每页显示数据量变更
    handlePageChange(obj) {
      this.page = obj.pageNum
      this.pagesize = obj.pageSize
      this.firstblood()
    },
    getData_query(){
    this.firstblood()
    },
    clearSearch(){
      this.formAll = {
          extractCashId:this.params[0].id,
          fundAccountNum:null,
          fundSerial:null,
          settleEndTime:null,
          settleStartTime:null,
          createStartTime:null,
          createEndTime:null,
        }
      this.settle = []
      this.created = []
      if(this.page!= 1){
        this.page = 1;
        this.$refs.pager.inputval = this.page;
        this.$refs.pager.pageNum = this.page;
      }
      this.firstblood()
    },
    // 删除
    handclick(){
    if(this.selectRowData.length == 0){
        return this.$message.warning('请选择您要操作的数据');
    }
    else if (this.selectRowData.length > 1) {
        this.$message({
            message: '每次只能操作单条数据~',
            type: 'warning'
        })
      this.$refs.multipleTable.clearSelection()
    }
    else{
      aflcLclExtractCashSettleDelete(this.selectRowData[0].id).then(res=>{
        this.$message.success('删除成功')
        this.firstblood()
        this.$refs.multipleTable.clearSelection()
    }).catch(err=>{
        this.$message.error(err.errorInfo)
        this.firstblood()
        this.$refs.multipleTable.clearSelection()
    })
    }
    },
  }
}
</script>
<style lang="scss" >
.CashPaymentNotes{
    .el-dialog{
        width: 1100px!important;

    .btnSection{
        margin-bottom: 10px;
    }
    .el-input__inner{
    height: 30px!important;
    line-height: 30px!important;
    width: 220px;
    }
    .el-range-editor.el-input__inner{
        width: 220px;
        vertical-align: middle;
        .el-range__icon,.el-range-separator,.el-range__close-icon{
            line-height: 25px;
        }
    }
    .info_tab_footer{
      position: static
    }
    .is-scrolling-left{
      min-height: 200px;
    }
    .info_tab_footer{
      .el-input__inner{
        width: 50px;
      }
      .tms-pagination__sizes{
        line-height: 40px;
      }
      .el-input--suffix{
        .el-input__inner{
        width: 70px;
         }
      }
    }
}
}
</style>
