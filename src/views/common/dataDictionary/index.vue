<template>
    <div class="DIC TwoColumns clearfix" v-loading="loading">
        <div class="columnsContainer">
            <div class="side_left">
                <el-tree
                    :data="treeData"
                    node-key="code"
                    :accordion = 'true'
                    :highlight-current = "true"
                    :expand-on-click-node = "false"
                    :default-expanded-keys="defaultexpanded"
                    @node-click="handleNodeClick"
                    :default-checked-keys="[]"
                    :props="defaultProps">
                </el-tree>
            </div>
            <div class="side_right">
                <!-- <transition name="show"> -->
                    <el-form :inline="true" @submit.stop.prevent.native :model="ruleForm" ref="ruleForm2"  class="demo-ruleForm classify_searchinfo" >
                        <el-form-item label="关键词查询" >
                            <el-input placeholder="只可搜索一级内容" v-model="input_search" clearable></el-input>
                        </el-form-item>
                        <el-form-item class="btnChoose fr"  style="margin-left:0;">
                            <el-button type="primary" :size="btnsize" icon="el-icon-search" plain  @click="handleSearch('search')">搜索</el-button>
                            <el-button type="info" :size="btnsize" icon="fontFamily aflc-icon-qingkong" plain @click="handleSearch('clear')">清空</el-button>
                        </el-form-item>
                    </el-form>
                <!-- </transition> -->
                <div class="side_right_bottom clearfix">
                    <div class="btns_box clearfix">
                        <el-button type="primary" :size="btnsize" plain icon="el-icon-circle-plus" @click="handleClick('add')" v-has:SYSTEM_DICT_ADD>新增</el-button>
                        <el-button type="primary" :size="btnsize" plain icon="el-icon-edit" @click="handleClick('revise')" v-has:SYSTEM_DICT_UPDATE>修改</el-button>
                        <el-button type="primary" :size="btnsize" plain icon="el-icon-delete" @click="handleClick('delet')" v-has:SYSTEM_DICT_DELETE>删除</el-button>
                        <el-button type="primary" :size="btnsize" plain icon="el-icon-bell" @click="handleClick('status')" v-has:SYSTEM_DICT_USE>启用/禁用</el-button>
                        <!-- <el-button type="danger" :size="btnsize" plain icon="el-icon-refresh" @click="handleClick('clearCache')">清除缓存</el-button> -->
                        <!-- <el-button type="primary" :size="btnsize" plain icon="el-icon-circle-plus" @click="handleClick('addexcel')" v-has:SYSTEM_DICT_DATA_EXPORT_EXCEL>导入数据字典Excel</el-button> -->
                        
                    </div>
                    <div class="info_news">
                        <el-table
                            ref="multipleTable"
                            :data="tableData"
                            stripe
                            border
                            height="100%"
                            @selection-change = "getinfomation"
                            @row-dblclick="moreinfo"
                            tooltip-effect="dark"
                            @row-click="clickDetails"
                            style="width: 100%"> 
                            <el-table-column
                                type="selection"
                                width="50">
                            </el-table-column>
                            <el-table-column label="序号" width="60">
                                <template slot-scope="scope">
                                    {{ (page - 1)*pagesize + scope.$index + 1 }}
                                </template>
                            </el-table-column>  
                            <el-table-column
                            prop="name"
                            sortable
                            :show-overflow-tooltip="true"
                            label="分类名称">
                            </el-table-column>
                            <el-table-column
                            sortable
                            prop="pidName"
                            label="上级分类">
                            <template  slot-scope="scope">
                                    {{ scope.row.pidName ? scope.row.pidName: '无'   }}
                                </template>
                            </el-table-column>
                            <el-table-column
                            sortable
                            prop="code"
                            label="编码">
                            </el-table-column>
                            <el-table-column
                            sortable
                            prop="value"
                            label="数据值">
                            </el-table-column>
                            <el-table-column
                            sortable
                            prop="status"
                            label="状态">
                                <template  slot-scope="scope">
                                    {{ scope.row.status == true ? '启用' : '禁用' }}
                                </template>
                            </el-table-column>
                            <el-table-column
                            sortable
                            prop="remark"
                            label="描述">
                            </el-table-column>
                            <el-table-column
                            sortable
                            prop="isDefault"
                            label="是否初始值">
                                <template  slot-scope="scope">
                                    {{ scope.row.isDefault == true ? '是' : '否' }}
                                </template>
                            </el-table-column>
                        </el-table>
                    </div>

                    <DicDialog :dialogAddDic.sync="dialogVisible" :reviseForm = 'reviseForm' :pid="pid" :pidName="pidname" :formtitle = 'formtitle' :isModify = "isModify"   @close = "shuaxin"/>
                     <addExcel :dialogVisibleExcel.sync="dialogVisibleExcel"  :formtitle = 'formtitleExcel'/>
                </div>
            </div>
        </div>
            <!-- 页码 -->
        <div class="info_tab_footer">共计:{{ dataTotal }} <div class="show_pager"> <Pager :total="dataTotal" @change="handlePageChange"  :sizes="sizes" ref="pager"/></div> </div> 
    </div>
</template>

<script type="text/javascript">

import { data_Dic,data_Trees,data_Search,data_CreatCode,data_AddForms,data_Delet,data_ChangeForms,data_CreatCode_top,data_changeStatus,data_clearCache} from '@/api/company/data_dic.js'
import '@/styles/dialog.scss'
import Pager from '@/components/Pagination/index'
import DicDialog from './component/addDictionary'
import addExcel from './component/addExcel'
    export default{
        data(){
            return{
                ruleForm:{},
                loading:true,
                sizes:[20,50,100,200],
                defaultexpanded:['1'],
                btnsize:'mini',
                isModify:false,
                dialogVisible:false,
                dialogVisibleExcel:false,
                showSearch:true,
                reviseForm:{},
                pid:null,
                pidname:'无',
                page:1,
                pagesize:20,
                formtitle:'新增分类信息',
                formtitleExcel:'导入数据字典信息',
                dataTotal:0,
                checkedinformation:[],
                input_search: '',
                tableData:[],
                treeData:[
                    {
                        name:'全部',
                        id:null,
                        code:'1',
                        children:[],
                    }
                ],
                defaultProps: {
                  children: 'children',
                  label: 'name'
                },
            }
        },
        components:{
            Pager,
            DicDialog,
            addExcel
        },
        watch:{
            pid:{
                handler(newValue,oldValue){
                    if(newValue){
                        this.showSearch = true;
                    }else{
                        this.showSearch = false;
                    }
                },
                immediate: true
            }
          
        },
        mounted(){
            this.firstblood()
            // window.onerror = function(a,b,c,d,e){
            //     debugger
            // }
        },  
        methods: {
            debg(){
                debugger
            },
            handlePageChange(obj) {
                this.page = obj.pageNum;
                this.pagesize = obj.pageSize;
                this.getInformation();
            },
            //双击
            moreinfo(row, event){
                if(this.page!= 1){
                    this.page = 1;
                    this.$refs.pager.inputval = this.page;
                    this.$refs.pager.pageNum = this.page;
                }
                this.pid = row.id;
                this.pidname = row.name ? row.name:'无';
                this.getInformation();
            },
            //点击选中当前行
            clickDetails(row, event, column){
                this.$refs.multipleTable.toggleRowSelection(row);
            },
            handleClick(type){
                if(this.checkedinformation.length === 0 && type != 'add'&& type!='clearCache'&&type!='addexcel'){
                    //未选择任何修改内容的提示
                    this.$message({
                        message: '请选择要操作的数据~',
                        type: 'warning'
                    })
                    return false
                }
                switch(type){
                    case 'add':
                        this.formtitle = '新增分类信息';
                        this.isModify = false;
                        this.dialogVisible = true;
                        break;
                    case 'revise':
                        if(this.checkedinformation.length >1){
                            this.$message({
                                message: '不可修改多个内容~',
                                type: 'warning'
                            })
                            return false
                        }else{
                            this.formtitle = '修改分类信息';
                            this.reviseForm =Object.assign({},this.checkedinformation[0]);
                            this.isModify = true;
                            this.dialogVisible = true;
                        }
                        break;
                    case 'delet':
                        let delID = [];
                        let isOK = true;
                        this.checkedinformation.map((item)=>{
                            if(item.isDefault == true){
                                isOK = false;
                            }
                            return delID.push(item.id)
                        })
                        if(!isOK){
                            this.$message({
                                message: '存在初始数据不可删除~',
                                type: 'warning'
                            })
                        }else{
                            console.log(this.checkedinformation[0].pid)
                            let config = delID.length>1 ?  delID.length + '条' : this.checkedinformation[0].name+'这条';
                            let currentForm = Object.assign({},this.checkedinformation[0])
                            this.$confirm('确定要删除'+config+'数据吗？', '提示', {
                                confirmButtonText: '确定',
                                cancelButtonText: '取消',
                                type: 'warning'
                            }).then( ()=>{
                                data_Delet(delID).then(res => {
                                    this.$message({
                                        type: 'success',
                                        message: '操作成功~'
                                    })
                                    if(currentForm.pid){
                                        this.getInformation();
                                    }else{
                                        this.firstblood();
                                    }
                                }).catch(res=>{
                                    this.$message.error('操作失败，失败原因：',err.errorInfo)
                                })
                            }).catch(() => {
                                this.$message({
                                    type: 'info',
                                    message: '已取消'
                                })
                            })
                        }
                        break;
                    case 'status':
                        let statusID = [];
                        let ifdefault = true;
                        this.checkedinformation.map((item)=>{
                            if(item.isDefault == true){
                                ifdefault = false;
                            }
                            return statusID.push(item.id)
                        })
                        if(!ifdefault){
                            this.$message({
                                message: '存在初始数据不可更改状态~',
                                type: 'warning'
                            })
                        }else{
                            data_changeStatus(statusID).then( res=>{
                                this.getInformation();
                            })
                        }
                        break;
                    case 'clearCache':
                        this.$confirm('确定要清除数据字典缓存吗?', '提示', {
                            confirmButtonText: '确定',
                            cancelButtonText: '取消',
                            type: 'warning'
                        }).then(() => {
                            this.$message.info('正在清除缓存,请稍等...')
                            data_clearCache().then(res=>{
                            this.$message({
                                type: 'success',
                                message: '清除缓存成功~'
                                })
                            }).catch(err=>{
                            this.$message({
                                type: 'error',
                                message: '清除缓存失败~'
                                })
                            })
                        }).catch(() => {
                            this.$message({
                                type: 'info',
                                message: '已取消'
                            })
                        })
                       
                        break;
                    case 'addexcel':
                    this.dialogVisibleExcel = true
                    break;
                    
                }
                // 清除选中状态，避免影响下个操作
                this.$refs.multipleTable.clearSelection();
            },
            shuaxin(){
                if(this.pid){
                    this.getInformation()
                }else{
                    this.firstblood();
                }
            },
            handleSearch(type){
                switch(type){
                    case 'search':
                        if(this.page!= 1){
                            this.page = 1;
                            this.$refs.pager.inputval = this.page;
                            this.$refs.pager.pageNum = this.page;
                        }
                        this.pid = null;
                        this.getdata_search();
                        break;
                    case 'clear' :
                        if(this.page!= 1){
                            this.page = 1;
                            this.$refs.pager.inputval = this.page;
                            this.$refs.pager.pageNum = this.page;
                        }
                        this.pid = null;
                        this.input_search = '';
                        this.getdata_search();
                        break;
                }
            },
            //判断是否选中
            getinfomation(selection){
                this.checkedinformation = selection;
                console.log(this.checkedinformation)
            },
            //数结构选择  渲染数据
            handleNodeClick(data,checked){
                if(this.page!= 1){
                    this.page = 1;
                    this.$refs.pager.inputval = this.page;
                    this.$refs.pager.pageNum = this.page;
                }
                this.pid = data.id;
                this.pidname = data.name;
                this.getInformation();
            },
            //初始化渲染数据
            firstblood(){
                data_Dic().then(res =>{ 
                    this.treeData[0].children = res.data;
                    this.getInformation();
                })
            },  
            //刷新数据
            getInformation(){
                this.loading = true;
                data_Trees(this.page,this.pagesize,this.pid).then(res =>{
                    if(res.data.length !=0){
                        this.tableData = res.data.list;
                        this.dataTotal= res.data.totalCount;
                    }else{
                        this.tableData = [];
                        this.dataTotal= 0;
                    }
                    this.loading = false;
                }).catch(err => {
                    this.$message({
                        type: 'info',
                        message: '操作失败，原因：' + err.errorInfo ? err.errorInfo : err.text
                    })
                    this.loading = false;
                })
            },
            //模糊查询 分类名称或者code
            getdata_search(){
                data_Search(this.page,this.pagesize,this.pid,this.input_search).then(res=>{
                    if(res.data.length !=0){
                        this.tableData = res.data.list;
                        this.dataTotal= res.data.totalCount;
                    }else{
                        this.tableData = [];
                        this.dataTotal= 0;
                    }
                })
            },
        }
    }
</script>

<style type="text/css" lang="scss">
    .DIC{
        .side_left {
            flex: 0 0 300px;
        }
       .side_left .el-tree .el-tree-node {
            width: 95%;
        }
        .show-enter-active,.show-leave-active{
            transition:all .5s;
        }
        .show-enter,.show-leave-to{
            margin-left: 100%;
        }
        .show-enter-to,.show-leave{
            margin-left:0px;
        }

        .side_right_bottom{
            transition:all .5s linear;
        }
    }
</style>