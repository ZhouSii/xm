<template>
    <div class="identicalStyle" style="height:100%" v-loading="loading">
        <div class="columnsContainer informManage">
            <div class="side_left">
                <div class="side_left_top">
                    <el-tree
                        ref="treeForm"
                        show-checkbox
                        :data="cityTree"
                        node-key="code"
                        :props="defaultProps"
                        :check-strictly="treestatus"
                        :default-expand-all='treestatus'
                        :highlight-current = "true"
                        @check="nodeClick">
                    </el-tree>
                </div>
            </div>
            <div class="side_right">
          <el-form :inline="true"  class="demo-ruleForm classify_searchinfo">
                <el-form-item label="提货所属区域" >
                <el-select clearable placeholder="请选择" v-model="area" @focus="CityMethod">
                    <el-option
                    v-for="item in CityList"
                    :key="item.code"
                    :label="item.name"
                    :value="item.code">
                    </el-option>
                </el-select>
                </el-form-item>
                <el-form-item label="姓名" >
                    <el-input placeholder="" v-model="formAllData.name" clearable></el-input>
                </el-form-item>
                <el-form-item label="联系电话" >
                    <el-input placeholder="" v-model="formAllData.mobile" clearable></el-input>
                </el-form-item>
                <el-form-item class="btnChoose fr">
                    <el-button type="primary" plain @click="getData_query" :size="btnsize" icon="el-icon-search">搜索</el-button>
                    <el-button type="info" plain @click="clearSearch"  :size="btnsize" icon="fontFamily aflc-icon-qingkong">清空</el-button>
                </el-form-item>
                </el-form>
                <div class="classify_info">
            		<div class="btns_box">
                        <el-button type="primary" :size="btnsize" icon="el-icon-circle-plus" plain @click="handleClick('add')" v-has:DISPATCH_LOCALOPERATIONNOTICE_BUSINESSMESSAGECONFIGURATION_ADD>新增</el-button>
                        <el-button type="primary" :size="btnsize" icon="el-icon-edit" plain @click="handleClick('edit')" v-has:DISPATCH_LOCALOPERATIONNOTICE_BUSINESSMESSAGECONFIGURATION_MODIFY>修改</el-button>
                        <el-button type="primary" :size="btnsize" icon="el-icon-delete" plain @click="handleClick('delete')" v-has:DISPATCH_LOCALOPERATIONNOTICE_BUSINESSMESSAGECONFIGURATION_DELETE>删除</el-button>
                    </div>
            <div class="info_news">
            <el-table ref="multipleTable" style="width: 100%" stripe border height="99%" @selection-change="getSelection" @row-click="clickDetails" highlight-current-row :data="tableDataAll"  tooltip-effect="dark">
            <el-table-column label="选择"  type="selection" width="50"></el-table-column>
           <el-table-column label="序号" sortable  width="60">
                <template slot-scope="scope">
                    {{ (page - 1)*pagesize + scope.$index + 1 }}
                </template>
            </el-table-column> 
            <el-table-column  label="提货所属区域" prop="belongCityName" sortable></el-table-column>
            <el-table-column  label="姓名" prop="name" sortable></el-table-column>
            <el-table-column  label="联系号码" prop="mobile" sortable></el-table-column>
            </el-table>
            </div>
            <!-- 页码 -->
         <div class="info_tab_footer">共计:{{ dataTotal }} <div class="show_pager"> <Pager :total="dataTotal" @change="handlePageChange"  :sizes="sizes" ref="pager"/></div> </div> 
        </div>          
        </div>
        <create :params="selectRowData" :editType="type"  :typetitle="typetitle" :dialogFormVisible_add.sync = "dialogFormVisible_add" @getData="getDataList"/>
        </div>
        </div>
</template>
<script>
import { aflcProvinceCode } from '@/api/common.js'
import Pager from '@/components/Pagination/index'
import { aflcMsgNoticeManagementList,aflcMsgNoticeManagementDelete,cityCode } from '@/api/dispatch/OperationsInformCity.js'
import create from './create'
import GetCityList from '@/components/GetCityList/city'
export default {
    name:'informManage',
    components: {
        Pager,
        create,
        GetCityList
    },
    data(){ 
        return{
        loading:false,
        cityTree:[],
        treestatus:false,
        defaultProps: {
                  children: 'children',
                  label: 'name'
        },
        btnsize:'mini',
        formAllData:{
         belongCity:null,   
         name:null,
         mobile:null
        },
        selectRowData: [],
        sizes: [20, 50, 100, 400],
        pagesize: 20, // 初始化加载数量
        page: 1, // 初始化页码
        totalCount: null,
        dataTotal: 0,
        tableDataAll: [],
        dialogFormVisible_add:false,
        type: '',//新增或者修改或者详情
        typetitle:'',//新增或者详情title
        cityCode:'',
        CityList:[],
        area:'',
        }
    },
    mounted() {
        this.getMoreInformation()
        this.firstblood('',false)
        },
    methods:{
        getStr(val){
        this.formAllData.belongCity = val.area.code
        },
        firstblood(code,bool){
        if(bool){
            this.formAllData.belongCity = code
        }
        aflcMsgNoticeManagementList(this.page, this.pagesize, this.formAllData).then(res=>{
        this.dataTotal = res.data.totalCount
        this.tableDataAll = res.data.list
        })
        },
        getMoreInformation(){
            aflcProvinceCode().then(res=>{
                this.cityTree = res.data;
           })
        },
        nodeClick(data){
        console.log(data)
        if(this.cityCode==data.code){
        this.$refs.treeForm.setCheckedNodes([])
        this.cityCode = null
        }
        else{
        this.cityCode = data.code
        this.$refs.treeForm.setCheckedNodes([data])
        this.GetcityCode(this.cityCode)
        }
        this.firstblood(this.cityCode,true);
        },
        GetcityCode(i){
        cityCode(i).then(res=>{
            this.CityList = res.data
        }).catch(err=>{
            this.CityList = err.data
        })
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
        this.firstblood('',false)
        },
        //  查询
        getData_query() {
        this.page = 1;
        this.$refs.pager.inputval = this.page;
        this.$refs.pager.pageNum = this.page;
        this.firstblood(this.area,true)
        },
        CityMethod(){
        if(!this.cityCode){
        return this.$message.warning('请在左边选择查询城市');
        }
        },
        // 清空
        clearSearch() {
        this.formAllData = {
            belongCity:null,   
            name:null,
            mobile:null,
        }
        if(this.page!= 1){
            this.page = 1;
            this.$refs.pager.inputval = this.page;
            this.$refs.pager.pageNum = this.page;
        }
        this.area = ''
        this.$refs.treeForm.setCheckedNodes([])
        this.cityCode = null
        this.firstblood('',false)
        },
        handleClick(type){
        if(this.selectRowData.length == 0 && type != 'add'){
            return this.$message.warning('请选择您要操作的数据');
        }
        else if (this.selectRowData.length > 1 && type != 'add') {
            this.$message({
                message: '每次只能操作单条数据~',
                type: 'warning'
            })
            this.$refs.multipleTable.clearSelection()
        }
        else{
            switch(type){
                case 'add' :
                this.type = "add";
                this.typetitle = '新增';
                this.dialogFormVisible_add = true;
                break;
                case 'edit' :
                this.type = "edit";
                this.typetitle = '修改';
                this.dialogFormVisible_add = true;
                this.selectRowData = this.selectRowData
                break;
                case 'delete':
                this.delDataInformation()
            }
        }
        },
        // 确认删除
        delDataInformation() {
        this.$confirm('确定要删除吗？', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
        }).then(() => {
            aflcMsgNoticeManagementDelete(this.selectRowData[0].id).then(res => {
            this.$message.success('删除成功')
            this.firstblood('',false)
            this.$refs.multipleTable.clearSelection()
            }).catch(err => {
            this.firstblood('',false)
            this.$refs.multipleTable.clearSelection()
            this.$message({
                type: 'info',
                message: '操作失败，原因：' + err.text ? err.text : err
            })
            })
        }).catch(() => {
            this.firstblood('',false)
            this.$refs.multipleTable.clearSelection()
            this.$message({
            type: 'info',
            message: '已取消'
            })
        })
        },
        getDataList() {
        this.firstblood('',false)
        this.$refs.multipleTable.clearSelection()
        }
    }    
}
</script>

<style lang="scss">
    .informManage{
        height:100%;    
        position: relative;
        margin-left:7px;
        padding-bottom: 0px;
        .side_left{
        height: 100%;
        position: relative;
            .side_left_top{
             height:100%;
             overflow-y: auto;
             overflow-x: hidden;
             }
            .side_left_bottom{
             position: absolute;
             bottom: 10px;
             right: 10px;
             vertical-align: bottom
             }
        }
        .el-tree-node__content{
        .el-checkbox{
            display: none;
        }
        }
        .el-tree-node__children{
            .el-checkbox{
                display: block
            }
        }  
}
</style>

