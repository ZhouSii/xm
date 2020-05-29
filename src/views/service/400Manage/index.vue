<template>
    <div class="identicalStyle clearfix Manage_400" v-loading="loading">
            <searchInfo @change="getSearchParam"></searchInfo>
            <el-dialog
            :visible.sync="dialogVisible"
            :close-on-click-modal="false"
            width="30%"
            :before-close="handleClose">
                <div id="autoTest">
                    <audio :src="audioUrl" controls="controls" id="music" preload="auto" autoplay="autoplay"></audio>
                    <!-- <el-button type="primary" plain @click="playPause()" size="mini">{{playFlay?'暂停':'播放'}}</el-button> -->
                </div>
            </el-dialog>
            <div class="classify_info">
                <div class="btns_box" id="urlLoad">
                    <el-button type="primary" icon="el-icon-download" plain @click="handleSearch('export')" size="mini" v-has:CUSTOM_400_MANAGE_EXCEL>导出Excel</el-button>  
                </div>
                <div class="info_news">
                    <el-table
                        id="out-table-manage"
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
                        <el-table-column label="序号" sortable  width="80">
                            <template slot-scope="scope">
                            {{ (page - 1)*pagesize + scope.$index + 1 }}
                            </template>
                        </el-table-column>  
                        <el-table-column
                            prop="callerNo"
                            label="主叫号码"
                            width="150"
                            sortable
                            >
                        </el-table-column>
                        <el-table-column
                            label="用户类型"
                            width="160"
                            sortable
                            >
                            <template  slot-scope="scope">
                                <router-link :to="{ name: '货主详情',query:{ userId:scope.row.shipperId }}" v-if="scope.row.shipperId" target="_blank">货主</router-link>
                                <router-link :to="{ name: '车主详情',query:{ driverId:scope.row.driverId }}" v-if="scope.row.driverId" target="_blank">车主</router-link>
                                <!-- <router-link to='/users/shipperData'>物流公司</router-link> -->
                            </template>
                        </el-table-column>
                        <el-table-column
                            prop="linkman"
                            label="联系人"
                            width="160"
                            sortable
                            >
                        </el-table-column>
                        <el-table-column
                            :show-overflow-tooltip="true"
                            prop="calleeNo"
                            label="被叫号码"
                            width="160"
                            sortable
                            >
                        </el-table-column>
                        <el-table-column
                            prop="startTime"
                            label="开始时间"
                            width="160"
                            sortable
                            >
                            <template  slot-scope="scope">
                               {{scope.row.startTime | parseTime}}
                            </template>
                        </el-table-column>
                         <el-table-column
                            prop="onhookTime"
                            label="结束时间"
                            width="160"
                            sortable
                            >
                            <template  slot-scope="scope">
                               {{scope.row.onhookTime | parseTime}}
                            </template>
                        </el-table-column> 
                        <el-table-column
                            prop="statusName"
                            label="类型"
                            width="120"
                            sortable
                            >
                        </el-table-column>
                        <el-table-column
                            label="客户号码归属地"
                            prop="district"
                            sortable
                            >
                            <template  slot-scope="scope">
                               {{scope.row.district ? scope.row.district : '无'}}
                            </template>
                        </el-table-column>
                        <el-table-column
                            label="通话时长"
                            prop="minutes"
                            width="120"
                            sortable
                            >
                            <template  slot-scope="scope">
                                {{scope.row.minutes ? scope.row.minutes : '无'}}
                            </template>
                        </el-table-column>
                        <el-table-column
                            label="操作"
                            width="160"
                            sortable
                            >
                            <template  slot-scope="scope">
                                <!-- <el-button-group> -->
                                    <el-button type="primary" plain  :size="btnsize" @click="handleClick(scope.row,'play')">播放</el-button>
                                    <el-button type="primary" plain  :size="btnsize" @click="handleClick(scope.row,'download')">下载</el-button>
                                <!-- </el-button-group> -->
                            </template>
                        </el-table-column>
                    </el-table>
                </div>
            </div>
                <!-- 页码 -->
            <div class="info_tab_footer">共计:{{ dataTotal }} <div class="show_pager"> <Pager :total="dataTotal" @change="handlePageChange" ref="pager"/></div> </div>    
    </div>
</template>

<script type="text/javascript">

import FileSaver from 'file-saver'
import XLSX from 'xlsx'
import { aflcCallLog,getVoiceUrl,aflcExcelList } from '@/api/service/400.js'
import { parseTime } from '@/utils/index.js'
import Pager from '@/components/Pagination/index'
import searchInfo from './searchInfo'
import { SaveAsFile } from '@/utils/lodopFuncs'

    export default{
        components:{
            Pager,
            searchInfo,
        },
        data(){
            return{
                btnsize:'mini',
                serviceType:'couse',
                loading: false,//加载
                pagesize:20,//初始化加载数量
                page:1,//初始化页码
                dataTotal:0,
                searchInfo:{
                    status:null,
                    callerNo:'',//主叫号码    
                },
                tableData:[],
                dialogFormVisible_details:false,//详情弹窗
                DetailsOrderSerial:'',
                dialogVisible:false,//取消订单弹框
                checkedinformation:[],//选中数据
                playFlay:false,
                audioUrl:null,
                tableColumn:[{
                    'label': '序号',
                    'prop': '',
                },{
                    'label': '主叫号码',
                    'prop': 'callerNo',
                },{
                    'label': '用户类型',
                    'prop': 'typeName',
                },{
                    'label': '联系人',
                    'prop': 'linkman',
                },{
                    'label': '被叫号码',
                    'prop': 'calleeNo',
                },{
                    'label': '开始时间',
                    'prop': 'startTime',
                },{
                    'label': '结束时间',
                    'prop': 'onhookTime',
                },{
                    'label': '类型',
                    'prop': 'statusName',
                },{
                    'label': '客服号码归属地',
                    'prop': 'district',
                },{
                    'label': '通话时长',
                    'prop': 'minutes',
                }]
            }
        },
        watch:{

        },
        created(){

        },
        mounted(){
            this.firstblood();
        },  
        beforeDestroy(){
        },
        methods: {
            exportExcel() {
                /* generate workbook object from table */
                var wb = XLSX.utils.table_to_book(document.querySelector('#out-table-manage'))
                /* get binary string as output */
                var wbout = XLSX.write(wb, { bookType: 'xlsx', bookSST: true, type: 'array' })
                // console.log(wb)
                // console.log(wbout)
                try {
                    FileSaver.saveAs(new Blob([wbout], { type: 'application/octet-stream' }), '400管理'+ parseTime(new Date(), '{y}{m}{d}{h}{i}{s}')+'.xlsx')
                } catch (e) { if (typeof console !== 'undefined') console.log(e, wbout) }
                return wbout
            },
            playPause(){
                var autoTest = document.getElementById('music');
                if(autoTest !==null){
                    if(this.playFlay){
                        autoTest.pause();
                        this.playFlay = false;
                    }else{
                        autoTest.currentTime = 0;
                        autoTest.play();
                        this.playFlay = true;
                    }
                }
            },
            handlePageChange(obj) {
                this.page = obj.pageNum;
                this.pagesize = obj.pageSize;
                this.firstblood();
            },
            //刷新页面  
            firstblood(){
                this.loading = true;
                aflcCallLog(this.page,this.pagesize,this.searchInfo).then(res => {
                    this.tableData = res.data.list;
                    this.dataTotal = res.data.totalCount;
                    this.tableData.forEach(el => {
                        switch(el.status){
                            case 0:
                                el.statusName = '未接';
                                break;
                            case 1:
                                el.statusName = "已接";
                                break;
                            case 2:
                                el.statusName = "留言";
                                break;
                        }
                    })
                    this.loading = false;
                })
            },
            //模糊查询 分类名称或者code
            handleSearch(type){
                switch(type){
                    case 'cancel':

                        break;
                    case 'export':
                        aflcExcelList(this.searchInfo).then(res => {
                            res.data.forEach(el => {
                                el.typeName = el.shipperId ? '货主' :'' + el.driverId ? ' 车主 ' :'' + el.companyId ? '物流公司' :'';
                                el.startTime = parseTime(el.startTime, '{y}-{m}-{d} {h}:{i}:{s}');
                                el.onhookTime = parseTime(el.onhookTime, '{y}-{m}-{d} {h}:{i}:{s}');
                                switch(el.status){
                                    case 0:
                                        el.statusName = '未接';
                                        break;
                                    case 1:
                                        el.statusName = "已接";
                                        break;
                                    case 2:
                                        el.statusName = "留言";
                                        break;
                                }
                            })
                            SaveAsFile({
                                data: res.data ? res.data : [],
                                columns: this.tableColumn,
                                name: '400管理-' + parseTime(new Date(), '{y}{m}{d}{h}{i}{s}')
                            })
                        })
                        break;
                }
            },
             //判断是否选中
            getinfomation(selection){
                this.checkedinformation = selection;
            },
             //点击选中当前行
            clickDetails(row, event, column){
                this.$refs.multipleTable.toggleRowSelection(row);
            },
            //详情弹窗
            pushOrderSerial(item){
                // console.log(item)
                this.dialogFormVisible_details = true;
                this.DetailsOrderSerial = item.orderSerial;
            },
            getSearchParam(obj) {
                // console.log(obj)
                this.searchInfo = Object.assign(this.searchInfo, obj);
                if(this.page!= 1){
                    this.page = 1;
                    this.$refs.pager.inputval = this.page;
                    this.$refs.pager.pageNum = this.page;
                }
                this.firstblood();
            },
            shuaxin(){
                this.firstblood();
            },
            handleClick(row,type){
                getVoiceUrl(row.lsh,parseTime(row.startTime,'{y}-{m}-{d}')).then(res => {
                    this.audioUrl = res.data;
                    if(this.audioUrl && this.audioUrl != '0'){
                        // console.log('audioUrlaudioUrl',this.audioUrl)
                        switch(type){
                            case 'play':
                                this.dialogVisible = true;
                                break;
                            case 'download':
                                let aClick = document.createElement('a');
                                aClick.href = this.audioUrl;
                                // console.log('aClick',aClick)
                                let urlLoad = document.getElementById('urlLoad')
                                urlLoad.appendChild(aClick);
                                aClick.click();
                                urlLoad.removeChild(aClick);
                                break;
                        }
                    }else{
                        this.$message({
                            type: 'warning',
                            message: '文件不存在！'
                        })
                    }
                })
            },
            handleClose(){
                this.dialogVisible = false;
                var autoTest = document.getElementById('music');
                autoTest.pause();
            }
        }
    }
</script>

<style type="text/css" lang="scss">
    .Manage_400{
        height: 100%;
        .el-dialog{
            background: none;
            box-shadow: none;
            .el-dialog__header{
                padding: 0;
                .el-dialog__headerbtn .el-dialog__close {
                    color: #ffffff;
                }
                .el-dialog__headerbtn:focus .el-dialog__close, .el-dialog__headerbtn:hover .el-dialog__close {
                    color: #409EFF;
                }
            }
            .el-dialog__body{
                padding: 0;
                text-align: center;
            }
        }
        .info_news{
            .el-table{
                td{
                    .cell{
                        a{
                            color: #3e9ff1;
                        }
                    }
                }
            }
        }
    }
</style>
