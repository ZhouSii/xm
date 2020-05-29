<template>
    <div style="height:100%;"  class="identicalStyle District" v-loading="loading">
          <el-form :inline="true" class="classify_searchinfo">
            <el-form-item label="区代公司名称">
                <el-input v-model="formAllData.partnerCompany" placeholder="请输入"></el-input>
            </el-form-item>
            <el-form-item class="fr">
                <el-button type="primary" plain :size="btnsize"  @click="getdata_search" icon="el-icon-search">搜索</el-button>
                <el-button type="info" plain :size="btnsize" @click="clearSearch" icon="fontFamily aflc-icon-qingkong">清空</el-button>
            </el-form-item>            
    </el-form>
		<div class="classify_info" >
			<div class="btns_box">
                   <manageDistrictCread
                    btntext="新增"
                    :plain="true"
                    btntype="primary"
                    icon="el-icon-circle-plus"
                    editType="add"
                    btntitle="创建"
                    @getData="getDataList"
                    v-has:BUSINESS_AREA_MANAGE_AREA_ADD
                    >
                    </manageDistrictCread>
                   <manageDistrictDialog
                    btntext="修改"
                    :plain="true"
                    btntype="primary"
                    editType="edit"
                    btntitle="修改"
                    icon="el-icon-edit"
                    @getData="getDataList"
                    :params="selectRowData"
                    v-has:BUSINESS_AREA_MANAGE_AREA_UPDATE
                    >
                    </manageDistrictDialog>
                <el-button type="primary" plain :size="btnsize" @click="delete_data" icon="el-icon-delete" v-has:BUSINESS_AREA_MANAGE_AREA_DELETE>删除</el-button>
			</div>
            <div class="info_news">
            <el-table style="width: 100%" stripe border height="100%"  :data="tableDataAll"  ref="multipleTable"  @selection-change="getSelection" @row-click="clickDetails" highlight-current-row>
              <el-table-column
                            label="选择"
                            type="selection"
                            width="50">
              </el-table-column>
           <el-table-column label="序号"  width="60">
                            <template slot-scope="scope">
                             {{ (page - 1)*pagesize + scope.$index + 1 }}
                            </template>
            </el-table-column>
            <el-table-column  label="区代公司名称" sortable>
                        <template slot-scope="scoped">
                        <manageDistrictDialog
                            :btntext='scoped.row.partnerCompany'
                            btntype="text"
                            :plain="false"
                            editType="view"
                            btntitle="详情"
                            :params="scoped.row">
                        </manageDistrictDialog>
                        </template>
            </el-table-column>
            <el-table-column  label="联系人" prop="partnerName" sortable>
            </el-table-column>
            <el-table-column  label="手机号码" prop="mobile" sortable>
            </el-table-column> 
            <el-table-column  label="合同开始日期" prop="contractStartDate" sortable> 
            </el-table-column>       
            <el-table-column  label="合同结束日期" prop="contractEndDate" sortable>
            </el-table-column>                                                                                                       
            </el-table> 
        </div>
		</div>
         <div class="info_tab_footer">共计:{{ dataTotal }} <div class="show_pager"> <Pager :total="dataTotal" @change="handlePageChange" ref="pager"/></div> </div>
    </div>
</template>

<script>
import {data_get_aflcPartner_list,data_Del_aflcPartner} from '@/api/users/district/manageDistrict.js'
import manageDistrictCread from './manageDistrictCread.vue'
import { parseTime,formatTime } from '@/utils/index.js'
import manageDistrictDialog from './manageDistrictDialog.vue'
import Pager from '@/components/Pagination/index'
import { eventBus } from '@/eventBus'
export default {
    data(){
        return{
            loading:true,
            templateRadio: '',
            btnsize:'mini',
            restaurants:[],
            selectRowData:{},
            page:1,
            pagesize:20,
            dataTotal:0,
            tableDataAll:[],
            selectId:[],
            formAllData:{
                areaCode: null,
                partnerCompany:null,
                areaName:null,
            }
        }
    },
    components:{
    manageDistrictCread,
    manageDistrictDialog,
    Pager,
    },
    mounted(){
        this.firstblood();
        eventBus.$on('pushListtwo', () => {
                this.firstblood()
          })
    },
    methods:{
      getStr(val){
                this.formAllData.areaCode =val.area.code;
            },  
    // 列表刷新页面  
      firstblood(){
        this.loading = true
      data_get_aflcPartner_list(this.page,this.pagesize,this.formAllData).then(res=>{
                    this.dataTotal = res.data.totalCount
                    this.tableDataAll = res.data.list
                    this.tableDataAll.forEach(item => {
                        item.contractStartDate = parseTime(item.contractStartDate,"{y}-{m}-{d}");
                        item.contractEndDate = parseTime(item.contractEndDate,"{y}-{m}-{d}");
                    })
                    this.loading =false
        })
    },
    // 查询
    getdata_search(){
        this.page = 1;
        this.$refs.pager.inputval = this.page;
        this.$refs.pager.pageNum = this.page;
        this.firstblood();
    },
    // 清空查询
    clearSearch(){
                this.formAllData.areaCode = null;
                this.formAllData.areaName = null;
                this.formAllData.partnerCompany=null,
                this.page = 1;
                this.$refs.pager.inputval = this.page;
                this.$refs.pager.pageNum = this.page;
                this.firstblood();
                this.$refs.area.clearData();
    },
    getSelection(val){
     console.log('选中内容',val)
     this.selectRowData = val;
   },

    //点击选中当前行
    clickDetails(row, event, column){
      this.$refs.multipleTable.toggleRowSelection(row);
    }, 
    // 选择删除
        delete_data(){
                    if(!this.selectRowData.length){
                        this.$message.warning('请选择您要操作的区代公司');
                        return
                    }
                    if(this.selectRowData.length == 0){
                        this.$message.warning('请选择您要操作的区代公司');
                        return
                    }else if (this.selectRowData.length > 1) {
                            this.$message({
                                message: '每次只能操作单条数据~',
                                type: 'warning'
                            })
                        this.$refs.multipleTable.clearSelection();
                    }
                    else {
                this.delDataInformation()
            }
        },    
       //确认删除
            delDataInformation(){         
                   this.$confirm('确定要删除吗？', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(()=>{
                    data_Del_aflcPartner(this.selectRowData[0].id).then(res=>{
                        this.$message.success('删除成功');
                        this.firstblood();       
                        this.selectRowData=''; 
                    }).catch(err => {
                        this.$message({
                            type: 'info',
                            message: '操作失败，原因：' + err.text ? err.text : err
                        })
                    })
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消'
                    })
                })   
            },
        handlePageChange(obj) {
            this.page = obj.pageNum
            this.pagesize = obj.pageSize
            this.firstblood()
        },        
        getDataList(){
            this.firstblood()
            this.$refs.multipleTable.clearSelection();
            }       
    }
}
</script>
<style lang="scss">
.District{
.el-cascader{
        margin-top:-10px;
}
.btns_box{
    .el-button{
        font-size:12px;
    }
}
}
</style>

