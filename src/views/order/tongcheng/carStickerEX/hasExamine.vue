<template>
    <div class="identicalStyle hasExamine" v-loading="loading">
        <el-form  :inline="true" :model="listSystemObj.vo" ref="ruleForm" class="demo-ruleForm classify_searchinfo">
            <el-form-item label="订单号" prop="orderSerial">
                <el-input v-model="listSystemObj.vo.orderSerial" clearable></el-input>
            </el-form-item>
            <el-form-item label="车主姓名" prop="driverName">
                <el-input v-model="listSystemObj.vo.driverName" clearable></el-input>
            </el-form-item>
             <el-form-item label="手机号" prop="driverMobile">
                <el-input v-model="listSystemObj.vo.driverMobile" clearable></el-input>
            </el-form-item>
            <el-form-item label="卸货时间" prop="chooseTime">
                <el-date-picker
                    v-model="chooseTime"
                    type="daterange"
                    range-separator="-"
                    start-placeholder="开始日期"
                    end-placeholder="结束日期"
                    unlink-panels
                    align="right"
                    :default-time="['00:00:00', '23:59:59']"
                    value-format="timestamp">
                </el-date-picker>
            </el-form-item>
            <el-form-item class="btnChoose fr"  style="margin-left:0;">
                <el-button type="primary" icon="el-icon-search" plain :size="btnsize" @click="handleSearch('search')">搜索</el-button>
                <el-button type="info" icon="fontFamily aflc-icon-qingkong" :size="btnsize" plain @click="handleSearch('clear')">清空</el-button>
            </el-form-item>
        </el-form>
        <div class="classify_info">
            <div class="info_news">
                <el-table
                    ref="multipleTable"
                    :data="tableData"
                    stripe
                    border
                    align = "center"
                    height="100%"
                    tooltip-effect="dark"
                    style="width: 100%">
                    <!-- <el-table-column
                        label="选择"
                        type="selection"
                        width="50">
                    </el-table-column> -->
                    <el-table-column label="序号" width="60">
                        <template slot-scope="scope">
                            {{ (listSystemObj.currentPage - 1)*listSystemObj.pageSize + scope.$index + 1 }}
                        </template>
                    </el-table-column> 
                    <el-table-column
                        sortable
                        label="车辆45°照片"
                        prop="carFile"
                        min-width="150">
                        <template  slot-scope="scope"> 
                            <img  :src="scope.row.carFile" v-showPicture :imgurl="scope.row.carFile ? scope.row.carFile : ''"/>
                        </template>
                    </el-table-column>
                    <el-table-column
                        sortable
                        label="订单号"
                        prop="orderSerial"
                        min-width="250">
                        <template  slot-scope="scope">
                            <h4 class="needMoreInfo" @click="pushOrderSerial(scope.row)">{{ scope.row.orderSerial}}</h4>
                        </template>
                    </el-table-column>
                     <el-table-column
                        sortable
                        label="车主姓名"
                        prop="driverName"
                        min-width="150">
                    </el-table-column>
                    <el-table-column
                        prop="driverMobile"
                        sortable
                        label="手机号"
                        min-width="150">
                    </el-table-column>
                    <el-table-column
                        prop="unloadTime"
                        sortable
                        label="卸货时间"
                        min-width="160">
                        <template slot-scope="scope">
                            {{ scope.row.unloadTime | parseTime }}
                        </template>
                    </el-table-column>
                    <el-table-column
                        prop="status"
                        sortable
                        label="审核结果"
                        min-width="150">
                    </el-table-column>
                    <el-table-column
                        prop="updater"
                        sortable
                        label="操作人"
                        min-width="150">
                    </el-table-column>
                    <el-table-column
                        prop="updateTime"
                        sortable
                        label="操作时间"
                        min-width="160">
                        <template slot-scope="scope">
                            {{ scope.row.updateTime | parseTime }}
                        </template>
                    </el-table-column>
                </el-table>
            </div>
        </div>
        <!-- 页码 -->
        <div class="info_tab_footer">共计:{{ dataTotal }} <div class="show_pager"> <Pager :total="dataTotal" :sizes="pageSize" @change="handlePageChange" ref="pager"/></div> </div>    
    </div>
</template>

<script type="text/javascript">
import { CarStickerCheckList2 } from '@/api/order/carStickerEX.js'
import Pager from '@/components/Pagination/index'
export default{
    name:'hasExamine',
    props: {
        isvisible: {
            type: Boolean,
            default: false
        }
    },
    components: {
        Pager,
    },
    data() {
        return {
            btnsize: 'mini',
            loading: false, // 加载
            dialogVisible:false,
            chooseTime:[],
            dataTotal: 0,
            pageSize:[10,20,50,200],
            listSystemObj:{
                "currentPage": 1,
                "pageSize": 10,
                "vo": {
                    orderSerial:'',//订单号
                    driverName:'',//车主姓名
                    driverMobile:'',//手机号
                    // status:'AF0880102,AF0880103',
                    unloadTimeStartTime:'',
                    unloadTimeEndTime:'',
                }
            },
            tableData: [],
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
    mounted() {
    },
    methods: {
        handlePageChange(obj) {
            this.listSystemObj.currentPage = obj.pageNum;
            this.listSystemObj.pageSize = obj.pageSize;
            this.firstblood();
        },
        // 刷新页面
        firstblood() {
            this.loading = true
            CarStickerCheckList2(this.listSystemObj).then(res => {
                this.tableData = res.data.list;
                this.dataTotal = res.data.totalCount;
                this.loading = false;
            }).catch(err => {
                this.loading = false;
                this.$message({
                    type: 'info',
                    message: '操作失败，原因：' + (err.errorInfo ? err.errorInfo : err.text)
                })
            })
        },
        // 模糊查询 分类名称或者code
        handleSearch(type) {
            if(type == 'clear'){
                this.listSystemObj.vo ={
                    orderSerial:'',//订单号
                    driverName:'',//车主姓名
                    driverMobile:'',//手机号
                    // status:'AF0880102,AF0880103',
                    unloadTimeStartTime:'',
                    unloadTimeEndTime:'',
                }
                this.chooseTime = []
            }
            if(this.chooseTime){
                this.listSystemObj.vo.unloadTimeStartTime = this.chooseTime[0];
                this.listSystemObj.vo.unloadTimeEndTime = this.chooseTime[1];
            }
            if(this.listSystemObj.currentPage!= 1){
                this.listSystemObj.currentPage = 1;
                this.$refs.pager.inputval = this.listSystemObj.currentPage;
                this.$refs.pager.pageNum = this.listSystemObj.currentPage;
            }
            this.firstblood();
        },
        //详情弹窗
        pushOrderSerial(item){
            this.$router.push({name: '订单详情',query:{ orderSerial:item.orderSerial}});
        }
    }
}
</script>

<style type="text/css" lang="scss" scoped>
    .hasExamine{
        .cell{
            img{
                display: inline-block;
                width: 150px;
                height: 100px;
                vertical-align: middle;
                cursor: pointer;
            }
        }
    }
</style>
