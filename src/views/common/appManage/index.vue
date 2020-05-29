<template>
    <div class="identicalStyle Marketing" style="height:100%" v-loading="loading">
          	<div class="classify_info">
            	<div class="btns_box">
                   <operate
                    btntext="新增"
                    :plain="true"
                    type="primary" 
                    btntype="primary"
                    icon="el-icon-circle-plus"
                    editType="add"
                    @getData="getDataList"
                    v-has:SYSTEM_APP_MANAGE_ADD_APK
                    btntitle="创建">
                    </operate>
                   <operate
                    btntext="修改"
                    :plain="true"
                    type="primary" 
                    btntype="primary"
                    icon="el-icon-edit"
                    editType="edit"
                    @getData="getDataList"
                    v-has:SYSTEM_APP_MANAGE_UPDATE_APK
                    :params="selectRowData"
                    btntitle="修改">
                    </operate>
                <el-button type="primary" plain icon="el-icon-delete" @click="delete_data" :size="btnsize" v-has:MARKETING_DRIVER_MANAGE_ORDER_NUM_REWARD_DELETE>删除</el-button>
            	</div>
            <div class="info_news">    
               <el-table style="width: 100%" ref="multipleTable" stripe border height="100%" @selection-change="getSelection" @row-click="clickDetails" highlight-current-row :data="tableDataAll"  >
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
            <el-table-column  label="app名称" prop="appName" sortable width="250">
            <template slot-scope="scoped">
                   <operate
                    type="primary" 
                    btntype="text"
                    editType="view"
                    @getData="getDataList"
                    :paramsView="scoped.row"
                    :btntext="scoped.row.appName"
                    btntitle="详情"
                    >
                    </operate>
            </template>
            </el-table-column>
            <el-table-column  label="app下载量" prop="appDownloadNum" sortable>
            </el-table-column>
            <el-table-column  label="app下载地址" prop="appDownloadUrl" sortable show-overflow-tooltip>
            </el-table-column>
            <el-table-column  label="app类型" prop="appType" sortable>
            </el-table-column>
            <el-table-column  label="app上传时间" prop="appUploadTime" sortable show-overflow-tooltip>
            </el-table-column>
            <el-table-column  label="app版本号" prop="appVersion" sortable show-overflow-tooltip>
            </el-table-column>
            <el-table-column  label="版本号名称" prop="appVersionName" sortable show-overflow-tooltip>
            </el-table-column>
            <el-table-column  label="更新内容" prop="remark" sortable show-overflow-tooltip>
            </el-table-column>
            <el-table-column  label="版本发布时间" prop="versionDate" sortable show-overflow-tooltip>
            </el-table-column>
            </el-table> 
                <!-- 页码 -->
       <div class="info_tab_footer">共计:{{ dataTotal }} <div class="show_pager"> <Pager :total="dataTotal" @change="handlePageChange"  :sizes="sizes" ref="pager"/></div> </div>  
        	</div> 
          </div>
      </div>
</template>
<script>
import { eventBus } from '@/eventBus'
import {data_get_aflcAppDownload_list,data_Del_aflcAppDownload} from '@/api/company/appManage.js'
import Pager from '@/components/Pagination/index'
import {parseTime} from '@/utils/'
import operate from './operate.vue'
export default {
  data(){
    return{
      loading:false,
      btnsize:'mini',
      sizes:[20,50,100],
      information:'操作不正确',
      pagesize:20,//每页显示数
      page:1,//当前页
      totalCount:null,
      dataTotal:null,
      selectRowData:{},
      tableDataAll:[],
	  formAllData:{
            areaCode: null,
            carType:null,
            commissionGrade:null,
            },
    }
  },
    components:{
        Pager,
        operate
    },
    methods:{
          // 列表刷新页面  
            firstblood(){
              this.loading = true
                data_get_aflcAppDownload_list(this.page,this.pagesize,{}).then(res => {
                    this.dataTotal = res.data.totalCount
                    this.tableDataAll = res.data.list;
                    this.tableDataAll.forEach(item => {
                        item.appUploadTime = parseTime(item.appUploadTime,"{y}-{m}-{d} {h}:{i}:{s}");
                        item.versionDate = parseTime(item.versionDate,"{y}-{m}-{d} {h}:{i}:{s}");
                        if(item.appType=='0'){
                            item.appType='安卓车主'
                        }
                        else if(item.appType=='1'){
                            item.appType='安卓货主'
                        }
                        else if(item.appType=='2'){
                            item.appType='IOS车主'
                        }
                        else{
                            item.appType='IOS货主'
                        }
                    })
                    this.loading = false
                })
            },
         //  查询
         getData_query(){
          this.page = 1;
          this.$refs.pager.inputval = this.page;
          this.$refs.pager.pageNum = this.page;             
          this.firstblood();
          },
        // 清空
        clearSearch(){
        this.formAllData =  {
        }
       if(this.page!= 1){
        this.page = 1;
        this.$refs.pager.inputval = this.page;
        this.$refs.pager.pageNum = this.page;
        }
        this.firstblood()    
        },

        // 判断选中与否
        getSelection(val){
        console.log('选中内容',val)
        this.selectRowData = val;
        },
        //点击选中当前行
        clickDetails(row, event, column){
        this.$refs.multipleTable.toggleRowSelection(row);
        },
        //每页显示数据量变更
            handlePageChange(obj) {
                this.page = obj.pageNum
                this.pagesize = obj.pageSize
                this.firstblood();
        },
        // 选择删除
        delete_data(){
          if(this.selectRowData.length == 0){
               this.$message.warning('请选择您要操作的用户');
               return
          }else if (this.selectRowData.length > 1) {
                this.$message({
                    message: '每次只能操作单条数据~',
                    type: 'warning'
                })
               this.$refs.multipleTable.clearSelection();
          }else {
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
                    data_Del_aflcAppDownload(this.selectRowData[0].id).then(res=>{
                        this.$message.success('删除成功');
                        this.firstblood();       
                        this.selectRowData=''; 
                    }).catch(err => {
                      console.log('rr',res)
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
           getDataList(){
                this.firstblood()
                this.$refs.multipleTable.clearSelection();
    }
   },
  mounted(){
    eventBus.$on('pushListtwo', () => {
                this.firstblood()
    })
    this.firstblood();
    },
}
</script>
<style lang="scss" >
.Marketing{
  .el-cascader{
    margin-top:-10px;
  }
}
</style>