<template>
    <div class="identicalStyle creatQRCode" v-loading="loading">
            <el-form  :inline="true" :model="searchInfo" ref="ruleForm" class="demo-ruleForm classify_searchinfo">
                <el-form-item label="姓名" prop="name">
                    <el-input v-model="searchInfo.name" clearable>
                    </el-input>            
                </el-form-item>
                <el-form-item label="主题" prop="topic">
                    <el-input v-model="searchInfo.topic" clearable>
                    </el-input>
                </el-form-item>
                <el-form-item label="渠道名称"   prop="channal">
                    <!-- <el-input v-model="searchInfo.channalName" clearable>
                    </el-input> -->
                    <selectChannel  @change = "getVal"  v-model="searchInfo.channal"/>
                </el-form-item>
                <el-form-item class="btnChoose fr"  style="margin-left:0;">
                    <el-button type="primary" icon="el-icon-search" plain :size="btnsize" @click="handleSearch('search')">搜索</el-button>
                    <el-button type="info" icon="fontFamily aflc-icon-qingkong" :size="btnsize" plain @click="handleSearch('clear')">清空</el-button>
                </el-form-item>
            </el-form>
            <div class="classify_info">
                <div class="btns_box">
                    <el-button type="primary" icon="el-icon-circle-plus" plain @click="handleClick('new')" :size="btnsize" v-has:SERVICE_QRCODE_ADD>新增</el-button>
                    <el-button type="primary" icon="el-icon-delete" plain @click="handleClick('delet')" :size="btnsize" v-has:SERVICE_QRCODE_DELETE>删除</el-button>
                </div>
                <div class="info_news">
                    <el-table
                        ref="multipleTable"
                        :data="tableData"
                        stripe
                        border
                        align = "center"
                        height="100%"
                        @selection-change = "getinfomation"
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
                            sortable
                            prop="name"
                            label="姓名"
                            min-width="150">
                        </el-table-column>
                        <el-table-column
                            prop="topic"
                            :show-overflow-tooltip="true"
                            sortable
                            label="主题"
                            min-width="200"
                            >
                        </el-table-column>
                        <el-table-column
                            prop="channalName"
                            :show-overflow-tooltip="true"
                            sortable
                            label="渠道名称"
                            min-width="200"
                            >
                        </el-table-column>
                        <el-table-column
                            prop="url"
                            :show-overflow-tooltip="true"
                            sortable
                            label="链接"
                            min-width="200"
                            >
                        </el-table-column>
                        <el-table-column
                            prop="qrcode"
                            sortable
                            label="二维码"
                            min-width="150">
                            <template slot-scope="scope">
                                <!-- <el-button
                                    :size="btnsize"
                                    type="primary"
                                    plain
                                    @click="handleclick(scope.row)"  v-showPicture :imgurl="twocodeurl ? twocodeurl : ''">查看</el-button> -->
                                    <el-button
                                    :size="btnsize"
                                    type="primary"
                                    plain
                                    @click="handleCheck(scope.row)">查看</el-button>
                            </template>
                        </el-table-column>
                        <el-table-column
                            prop="createTime"
                            sortable
                            label="创建时间"
                            min-width="160">
                            <template slot-scope="scope">
                                {{scope.row.createTime | parseTime}}
                            </template>
                        </el-table-column>
                        <el-table-column
                            prop="creater"
                            sortable
                            label="创建人"
                            min-width="150"
                            >
                        </el-table-column>
                    </el-table>
                </div>
            </div>   
                <!-- 页码 -->
            <div class="info_tab_footer">共计:{{ dataTotal }} <div class="show_pager"> <Pager :total="dataTotal" @change="handlePageChange"  :sizes="sizes"  ref="pager"/></div> </div>    

            <newQRCode :dialogVisible.sync = "dialogVisible" @close="shuaxin"/>
            
            <el-dialog
            class="QRCodeDialog"
            top="25vh"
            :visible.sync="dialogVisibleQRCode"
            :close-on-click-modal="false"
            width="26%">
                <vue-qr :logoSrc="config.imagePath" :text="config.value" :size="400" :margin="0" :dot-scale="1"></vue-qr>
            </el-dialog>
    </div>
</template>

<script type="text/javascript">

import { aflcQrcodeList,aflcQrcodeDelet } from '@/api/server/QRCode.js'
import { parseTime, pickerOptions2 } from '@/utils/index.js'
import Pager from '@/components/Pagination/index'
import newQRCode from './components/newQRDialog'  
import QRCode from 'qrcode'
import selectChannel from '@/components/selectTree/QRcode'
import vueQr from 'vue-qr'

export default{
      props: {
          isvisible: {
              type: Boolean,
              default: false
            }
        },
      components: {
            Pager,
            newQRCode,
            selectChannel,
            vueQr
        },
      data() {
          return {
                config: {
                    value: '',//显示的值、跳转的地址
                    imagePath: require('../../../assets/checkImg/icon2.png')//中间logo的地址
                },
                btnsize: 'mini',
                dialogVisible: false,
                timeOutAss: null,
                loading: false, // 加载
                sizes: [20, 50, 100, 400],
                pagesize: 20, // 初始化加载数量
                page: 1, // 初始化页码
                dataTotal: 0,
                searchInfo: {
                    name:'',
                    topic:'',
                    channal:'',
                },
                tableData: [],
                checkedinformation: [],
                dialogFormVisible: false,
                twocodeurl: '',
                dialogVisibleQRCode: false,
            }
        },
      watch: {
          isvisible: {
              handler(newVal, oldVal) {
                  if (newVal) {
                        this.firstblood()
                    } 
                },
                // 代表在wacth里声明了firstName这个方法之后立即先去执行handler方法
              immediate: true
            }
        },
      created() {

        },
      mounted() {
            // this.firstblood();

        },
      beforeDestroy() {
        },
      methods: {
             getVal(val){
                this.searchInfo.channal = val;
            },
          handlePageChange(obj) {
              this.page = obj.pageNum
                this.pagesize = obj.pageSize
                this.firstblood()
            },
            // 刷新页面
          firstblood() {
                this.loading = true
                aflcQrcodeList(this.page, this.pagesize, this.searchInfo).then(res => {
                    this.tableData = res.data.list;
                    this.dataTotal = res.data.totalCount;
                    this.loading = false;
                }).catch(err => {
                    this.loading = false;
                })
            },
          handleSearch(type) {
                switch (type) {
                    case 'search':
                        if(this.page!= 1){
                            this.page = 1;
                            this.$refs.pager.inputval = this.page;
                            this.$refs.pager.pageNum = this.page;
                        }
                        this.firstblood()
                        break
                    case 'clear':
                        if(this.page!= 1){
                            this.page = 1;
                            this.$refs.pager.inputval = this.page;
                            this.$refs.pager.pageNum = this.page;
                        }
                        this. searchInfo ={
                            name:'',
                            topic:'',
                            channal:'',
                        }
                        this.firstblood()
                        break
                }
            },
            handleClick(type){
                switch (type) {
                    case 'new':
                        this.dialogVisible = true;
                        break
                    case 'delet':
                        if(this.checkedinformation.length > 1 ){
                            this.$message({
                                type: 'warning',
                                message: '只支持单条数据操作！' 
                            })
                        }else if(this.checkedinformation.length == 1){
                            // console.log(this.checkedinformation[0].id)
                            let config = this.checkedinformation[0];
                            this.$confirm('确定要删除'+config.name+'该条二维码吗？', '提示', {
                                confirmButtonText: '确定',
                                cancelButtonText: '取消',
                                type: 'warning'
                            }).then( ()=>{
                                aflcQrcodeDelet(config.id).then(res => {
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
                        }
                        break;
                }
            },
            handleCheck(row){
                console.log(row.qrcode)
                // QRCode.toDataURL(row.qrcode, {
                //     // margin: 1,//二维码内边距，默认为4。单位px
                //     // height: 200,//二维码高度
                //     // width: 200,//二维码宽度
                //     // scal: 177,
                //     src: '',
                //     image:'../../../assets/checkImg/icon2.png',
                //     // color: {
                //     //     dark: '#000', // 二维码背景颜色
                //     //     // light: '#000' // 二维码前景颜色
                //     // },
                //     // rendererOpts: {
                //     //     margin: 0
                //     // }
                // }).then(url => {
                //     this.twocodeurl = url
                //     // console.log(url)
                // })

                // <vue-qr :logoSrc="config.imagePath" :text="config.value" :size="200" :margin="0"></vue-qr>
                this.config.value = row.qrcode;
                this.dialogVisibleQRCode = true;
            },
             // 判断是否选中
            getinfomation(selection) {
              this.checkedinformation = selection
            },
             // 点击选中当前行
            clickDetails(row, event, column) {
              this.$refs.multipleTable.toggleRowSelection(row)
            },
            shuaxin() {
              this.firstblood()
            },
        }
    }
</script>

<style type="text/css" lang="scss" scoped>
    .creatQRCode{
        height: 100%;
        .QRCodeDialog{
            .el-dialog__body{
                div{
                    text-align: center;
                }
            }
        }
    }
</style>
