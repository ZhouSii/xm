<template>
    <div class="serviceOrder identicalStyle clearfix" v-loading="loading">
            <el-form :inline="true" :model="searchInfo" ref="ruleForm" class="demo-ruleForm classify_searchinfo">
                    <el-form-item label="关键字查询：" prop="pointName">
                        <el-input
                        placeholder="请输入内容"
                        v-model="searchInfo.keywords"
                        clearable>
                        </el-input>
                    </el-form-item>
                    <el-form-item class="btnChoose fr"  style="margin-left:0;">
                        <el-button type="primary" :size="btnsize" icon="el-icon-search" plain @click="handleSearch('search')">搜索</el-button>
                        <el-button type="info" :size="btnsize" icon="fontFamily aflc-icon-qingkong" plain @click="handleSearch('clear')">重置</el-button>
                    </el-form-item>
            </el-form>
            <div class="classify_info">
                <div class="btns_box">
                    <el-button type="primary" :size="btnsize" plain icon="el-icon-circle-plus" @click="handleClick('add')" v-has:SERVICE_SMALL_CAR_OTHER_SERVICE_ADD>新增</el-button>
                    <el-button type="primary" :size="btnsize" plain icon="el-icon-edit" @click="handleClick('revise')" v-has:SERVICE_SMALL_CAR_OTHER_SERVICE_UPDATE>修改</el-button>
                    <!-- <el-button type="primary" :size="btnsize" plain icon="el-icon-delete" @click="handleClick('delet')" v-has:SERVICE_SMALL_CAR_OTHER_SERVICE_DELETE>删除</el-button> -->
                    <el-button type="primary" :size="btnsize" plain icon="el-icon-bell" @click="handleClick('status')" v-has:SERVICE_SMALL_CAR_OTHER_SERVICE_USE>启用/禁用</el-button>
                </div>
                <div class="info_news">
                    <el-table
                        ref="multipleTable"
                        :data="tableData"
                        stripe
                        border
                        height="100%"
                        @selection-change = "getinfomation"
                        tooltip-effect="dark"
                        @row-click="clickDetails"
                        style="width: 100%"> 
                        <el-table-column
                            type="selection"
                            width="50">
                           </el-table-column>
                        <el-table-column
                          prop="serviceName"
                          sortable
                          label="服务分类">
                        </el-table-column>
                        <el-table-column
                          prop="extraName"
                          sortable
                          label="额外服务名称">
                        </el-table-column>
                        <el-table-column
                          prop="extraPrice"
                          sortable
                          label="额外服务金额">
                        </el-table-column>
                        <el-table-column
                          prop="usingStatus"
                          sortable
                          label="状态">
                             <template  slot-scope="scope">
                                {{ scope.row.usingStatus === '1' ? '启用' : '禁用' }}
                            </template>
                        </el-table-column>
                      </el-table>
                </div>
                <!-- 页码 -->
                <div class="info_tab_footer">共计:{{ dataTotal }} <div class="show_pager"> <Pager :total="dataTotal" @change="handlePageChange"  ref="pager"/></div> </div>   
                </div>
                <!-- 新增分类信息 -->
                 <div class="addclassify commoncss">
                    <el-dialog :title='formtitle'  :visible.sync="dialogFormVisible" >
                        <div class="chooseinfo-item">
                            <p><span>* </span>当前服务分类：</p>
                            <!-- <el-radio-group v-model="classfyradio" >
                                <el-radio   v-for="(obj,key) in formclassfy" :label="obj.code" :key='key' >{{obj.name}}</el-radio>
                            </el-radio-group> -->
                            <el-input disabled v-model="classfyradio" />
                        </div>
                        <div class="extrainfo"  v-for="(form,keys) in forms" :key='keys'>
                            <p><span>* </span>额外服务名称：</p>
                            <el-input
                                placeholder="请输入内容"
                                v-model="form.extraName"
                                clearable>
                            </el-input>
                            <el-checkbox v-model="form.isFree" true-label="1" false-label="0">收费</el-checkbox>
                            <p class="ifprice" v-if = "form.isFree === '1'">
                                <el-input
                                    v-number-only:point
                                    placeholder="请输入价格"
                                    maxlength="4"
                                    v-model="form.extraPrice"
                                    ref="pricefocus"
                                    clearable>
                                </el-input>
                                <span> 元</span> 
                            </p>
                            <div class="nomore">
                                <p><span>* </span>描述：</p>
                                <el-input
                                    type="textarea"
                                    :rows="3"
                                    placeholder="请输入最少5个字符最多300个字符"
                                    maxlength="300"
                                    ref="infofocus"
                                    v-model="form.extraDes"
                                    clearable>
                                </el-input>
                            </div>
                            <span  @click="addItem" class="addItem" v-if="keys == 0">
                            </span>
                            <span  @click="reduceItem(keys)" class="reduceItem" v-else>
                            </span>
                        </div>
                      <div slot="footer" class="dialog-footer">
                        <el-button type="primary" plain  icon="el-icon-success" @click="newInfoSave">保 存</el-button>
                        <el-button type="primary" plain icon="el-icon-error" @click="closeAddNewInfo">取 消</el-button>
                      </div>
                    </el-dialog>
                </div>

                <!-- 修改分类信息 -->
                <div class="changeclassify commoncss">
                    <el-dialog title='修改分类信息'  :visible.sync="dialogFormVisible_change">
                        <div class="chooseinfo-item">
                            <p><span>* </span>当前服务分类：</p>
                            <el-input
                                placeholder="请输入内容"
                                v-model="changeform.serviceName"
                                disabled
                                clearable>
                            </el-input>
                            <!-- <span class="onlyShow">{{changeform.serviceName}}</span> -->
                        </div>
                        <div class="extrainfo">
                            <p><span>* </span>额外服务名称</p>
                            <el-input
                                placeholder="请输入内容"
                                v-model="changeform.extraName"
                                clearable>
                            </el-input>
                            <el-checkbox v-model="changeform.isFree" true-label="1" false-label="0"  >收费</el-checkbox>
                            <p class="ifprice" v-if = "changeform.isFree === '1'">
                                <el-input
                                    v-number-only:point
                                    placeholder="请输入价格"
                                    maxlength="4"
                                    v-model="changeform.extraPrice"
                                     ref="pricefocus"
                                    clearable>
                                </el-input>
                                <span> 元</span>
                            </p>
                            <div class="nomore">
                                <p>描述</p>
                                <el-input
                                    type="textarea"
                                    :rows="3"
                                    placeholder="请输入最少5个字符最多300个字符"
                                    maxlength="300"
                                    ref="infofocus"
                                    v-model="changeform.extraDes"
                                    clearable>
                                </el-input>
                            </div>
                        </div>
                        <div slot="footer" class="dialog-footer">
                            <el-button type="primary" plain  icon="el-icon-success" @click="changeInfoSave" :disabled="btnShow">保 存</el-button>
                            <el-button type="primary" plain icon="el-icon-error" @click="dialogFormVisible_change = false">取 消</el-button>
                        </div>
                    </el-dialog>
                </div>
                 <!-- <ExtraDialog :dialogAddExtra.sync="dialogAddExtra" :reviseForm = 'reviseForm' :formtitle = 'formtitle' :isModify = "isModify"   @close = "shuaxin"/> -->
    </div>
</template>

<script type="text/javascript">

import { data_GetInformation, data_AddForms, data_DeletInfo, data_ChangeStatus } from '@/api/server/serverExtra.js'
import '@/styles/dialog.scss'
import Pager from '@/components/Pagination/index'
import { DicServiceType } from '@/api/common.js'
// import ExtraDialog from './newExtraPrice'

export default{
    data() {
        return {
            loading:true,
            dialogAddExtra:false,
            isModify:false,
            reviseForm:{},
            formtitle:'',
            btnsize: 'mini',
            searchInfo: {
                keywords: ''
            },
            btnShow:false,
            formclassfy: [],
            classfyradio: '',
            page: 1,
            pagesize: 20,
            formtitle: '新增额外服务',
            dialogFormVisible: false,
            dialogFormVisible_change: false,
            nowcode: '',
            dataTotal: 0,
            forms: [{
                'extraDes': '',
                'extraName': '',
                'isFree': '0',
                'extraPrice': 0
            }],
            changeform: {
                'extraId': '',
                'serivceCode': '',
                'extraDes': '',
                'extraName': '',
                'isFree': '0',
                'extraPrice': 0
            },
            checkedinformation: [],
            tableData: [],
        }
    },
        watch:{
            dialogFormVisible(newVal,oldVal){
                console.log(newVal,oldVal)
                if(newVal){
                    DicServiceType().then(res => {
                        res.data.forEach(el => {
                            el.code == 'AF01701' ?  this.classfyradio =  el.name : '小货车'
                        })
                    })

                }
            }
        },
      components: {
          Pager,
        //   ExtraDialog
        },

      mounted() {
            this.firstblood()
        },
      methods: {
            shuaxin(){
                this.firstblood();
            },
            // 获取翻页返回的数据
             handlePageChange(obj) {
              this.page = obj.pageNum
                this.pagesize = obj.pageSize
                this.firstblood()
            },
            // 点击选中当前行
            clickDetails(row, event, column) {
                this.$refs.multipleTable.toggleRowSelection(row)
               
            },
            // 添加子节点新增
            addItem() {
                // 业务逻辑判断
              this.forms.push({
                  extraDes: '',
                  extraName: '',
                  isFree: '',
                  serivceCode: ''
                }) 
            },
            // 删除子节点新增
            reduceItem(idx) {
              console.log(idx)
              this.forms.splice(idx, 1)
            },
            // 新增关闭返回初始内容
            closeAddNewInfo() {
              this.dialogFormVisible = false
                this.forms = [{
                  'extraDes': '',
                  'extraName': '',
                  'isFree': '0',
                  'extraPrice': 0
                }]
            },
            // 判断是否选中
            getinfomation(selection) {
              this.checkedinformation = selection;
              console.log(selection)
            },
            handleSearch(type) {
              switch (type) {
                  case 'search':
                        this.firstblood();
                        break;
                    case 'clear' :
                        this.searchInfo = {
                          keywords: ''
                        }
                        if(this.page!= 1){
                            this.page = 1;
                            this.$refs.pager.inputval = this.page;
                            this.$refs.pager.pageNum = this.page;
                        }
                        this.firstblood();
                        break;
                }
            },
            handleClick(type){
                if (this.checkedinformation.length == 0 && type != 'add') {
                    // 未选择任何修改内容的提示
                   return this.$message({
                        message: '请选择要操作的数据~',
                        type: 'warning'
                    })
                } else if (this.checkedinformation.length > 1  && type == 'revise') {
                    return this.$message({
                        message: '不可同时修改多条数据~',
                        type: 'warning'
                    })
                }
                switch(type){
                    case 'add':
                        // this.dialogAddExtra= true;
                        this.dialogFormVisible = true ;
                        break;
                    case 'revise':
                        this.dialogFormVisible_change = true ;
                        this.changeform = this.checkedinformation[0];
                        break;
                    case 'delet':
                        const delID = []
                        this.checkedinformation.map((item) => {
                            return delID.push(item.extraId)
                        })
                        let config = delID.length>1 ?  delID.length + '条' : this.checkedinformation[0].serviceName+'这条';
                        this.$confirm('确定要删除'+config+'数据吗？', '提示', {
                            confirmButtonText: '确定',
                            cancelButtonText: '取消',
                            type: 'warning'
                        }).then( ()=>{
                            data_DeletInfo(delID).then(res => {
                                this.$message({
                                    type: 'success',
                                    message: '删除成功'
                                })
                                this.firstblood();
                            }).catch(err=>{
                                this.$message({
                                    type: 'info',
                                    message: '删除失败，原因：' + err.errorInfo ? err.errorInfo : err.text
                                })
                            })
                        }).catch(() => {
                            this.$message({
                                type: 'info',
                                message: '已取消'
                            })
                        })
                        break;
                    case 'status':
                        const statusID = []
                        this.checkedinformation.map((item) => {
                            return statusID.push(item.extraId)
                        })
                        data_ChangeStatus(statusID).then(res => {
                            this.firstblood()
                        }).catch(err=>{
                            this.$message({
                                type: 'info',
                                message: '操作失败，原因：' + err.errorInfo ? err.errorInfo : err.text
                            })
                        })
                        break;
                }
            },
            // 刷新页面
            firstblood() {
                this.loading = true;
                data_GetInformation(this.page, this.pagesize, this.searchInfo).then(res => {
                    this.dataTotal = res.data.totalCount;
                    this.tableData = res.data.list;
                    this.loading = false;
                    // console.log(this.tableData)
                }).catch(err => {
                    this.$message({
                        type: 'info',
                        message: '操作失败，原因：' + err.errorInfo ? err.errorInfo : err.text
                    })
                    this.loading = false;
                })
            },
            // 保存信息
            newInfoSave() {
            //   if (!this.classfyradio) {
            //         this.$message({
            //             type: 'warning',
            //             message: '请选择服务类型'
            //         })
            //     }else {
                let isOK = true
                this.forms.map((item) => {
                    if (item.isFree === '1' && item.extraPrice == 0) {
                        isOK = false
                        this.$message({
                            type: 'warning',
                            message: '请填写额外收费价格'
                        })
                    }
                    if (!item.extraDes) {
                        isOK = false
                        this.$message({
                            type: 'warning',
                            message: '请填写额外服务描述'
                        })
                    }
                    item.serivceCode = 'AF01701';
                })
                
                if (isOK) {
                    this.btnShow = true;
                    data_AddForms(this.forms).then(res => {
                        // console.log(res)
                        this.$message({
                            type: 'success',
                            message: '新增成功!' 
                        })
                        this.btnShow = false;
                        this.dialogFormVisible = false
                        this.firstblood()
                        this.forms = [{
                            'extraDes': '',
                            'extraName': '',
                            'isFree': '0',
                            'extraPrice': 0
                        }]
                    }).catch(err => {
                        this.$message({
                            type: 'info',
                            message: '操作失败，原因：' + err.errorInfo ? err.errorInfo : err.text
                        })
                        this.btnShow = false;
                    })
                }
                // }
            },
            // 修改保存
            changeInfoSave() {
                console.log(this.changeform)
                if (this.changeform.isFree == '0') {
                  this.changeform.extraPrice = 0
                }
                const arr = []
                arr.push(this.changeform);
                this.btnShow = true;

                data_AddForms(arr).then(res => {
                    this.$message({
                        type: 'success',
                        message: '修改成功!' 
                    })
                    console.log(res)
                    this.btnShow = false;
                    this.dialogFormVisible_change = false   
                    this.firstblood()
                }).catch(err => {
                    this.$message({
                        type: 'info',
                        message: '操作失败，原因：' + err.errorInfo ? err.errorInfo : err.text
                    })
                    this.btnShow = false;
                })
            },
        }
    }
</script>

<style type="text/css" lang="scss">
    .serviceOrder{
        .addclassify,.changeclassify{
            .el-dialog{
                position: relative;
                width: 820px;
                .el-dialog__body{
                    margin:0 20px;
                    margin-bottom: 20px;
                    .el-input__inner{
                        color: #3e9ff1;
                        line-height: 26px;
                        font-size: 14px;
                        padding: 2px 10px;
                        height: 40px;
                        line-height: 40px;
                    }
                    .chooseinfo-item{
                        font-size: 12px;
                        line-height: 20px;
                        color:#666;
                        p{
                            display: inline-block;
                            span{
                                color:red;
                            }
                        }
                        .el-input{
                            width: 250px;
                        }
                    }
                    .extrainfo{
                        border:1px solid #e6e6e6;
                        width:680px;
                        padding:16px 0;
                        position: relative;
                        margin-top:15px;
                        p{
                            width: 110px;
                            text-align: right;
                            padding-right: 12px;
                            display: inline-block;
                            font-size: 12px;
                            line-height: 20px;
                            color:#666;
                            span{
                                color:red;
                            }
                        }
                        .ifprice{
                            width:200px;
                            text-align: left;
                            span{
                                color:#666;
                                margin-left:5px;
                            }
                        }
                        .nomore{
                            margin-top:14px;
                            .el-input{
                                width:560px;
                            }
                        }
                        .el-input{
                            width: 150px;
                        }
                        .el-textarea{
                            width: 560px;   
                            vertical-align: middle;
                            .el-textarea__inner{
                                font-size:12px;
                                line-height: 20px;
                                color: #3e9ff1;
                            }
                        }
                        .el-checkbox{
                            margin:0 10px;
                            .el-checkbox__input{
                                .el-checkbox__inner{
                                    width:16px;
                                    height:16px;
                                }
                            }
                            .el-checkbox__label{
                                padding-left:5px;
                                font-size: 12px;
                                line-height: 20px;
                                color:#666;
                            }
                        }
                        .addItem,.reduceItem{
                            top:0px;
                            left: 104%;
                        }
                    }
                }
            }
            
        }
    }
</style>
